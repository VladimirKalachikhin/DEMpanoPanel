/*
calculateCameraOptionsFROMcustom(fromLatLng,bearing)

bearingFromTo(latlng1,latlng2)
equirectangularDistance(from,to)
haversineDistance(latlng1,latlng2)
destinationPoint(latlng1,bearing,d)

storageHandler
*/
function internalisationApply(){
/**/
// Поищем национальные названия
let i18nFileNames = navigator.language.split(',').map((l)=>l.split(';')[0]);
// Здесь игнорируются двойные локали (en-US), поэтому американскую локализацию сделать нельзя. Удмуртскую тоже.
i18nFileNames = Array.from(new Set(i18nFileNames.map((l)=>l.split('-')[0].toLowerCase())));	// unique через set
//console.log('[internalisationApply] navigator.language=',navigator.language,'i18nFileNames:',i18nFileNames);
// Мы получили массив локализаций в порядке убывания предпочтения, но из-зи злопаршивого CORS
// мы не можем загрузить файл, который можно загрузить синхронно, а только js, который, сцуко,
// загружается асинхронно, а асинхронная рекурсия в javascript карается, потому упс.
// Мы возьмём только одну, самую предпочтительную локализацию, а швейцарские французы
// пусть смотрят на английском.
const i18nFileName = 'internationalisation/'+i18nFileNames.shift()+'.js';
getScript(i18nFileName,()=>{
	i18n = i18nLocal;
	i18fieldsUpdate();
});
}; // end function internalisationApply

function i18fieldsUpdate(){
for(const fieldName in i18n){
	document.getElementById(fieldName).innerHTML = i18n[fieldName];
};
}; // end function i18fieldsUpdate


maplibregl.Map.prototype.calculateCameraOptionsFROMcustom = function (fromLatLng,bearing,cameraHeight=0,fakeDistance=null){
/* Идея в том, чтобы позиционировать center не в 10 километрах от fromLatLng, как штатная функция,
а на другом расстоянии

Идея сделать функцию методом себя не оправдывает: польза абстракная, а накладные расходы и
общее неудобство - вполне реальные.
*/
const fakeDistances = [1000,500,300,100];	// возможные дистанции от камеры до center требуемого вида. Чем больше - тем лучше.
const defaultFakeDistance = 300;	// дистанция от камеры, если нет возможности искать лучшую
let deltaElevation = 5;	// разница в высотах в метрах, которые считаются одной высотой
let isTerrain = false;	// флаг, что рельеф есть и загружен

const cameraLngLat = point2maplibre(fromLatLng);
//console.log('[calculateCameraOptionsFROMcustom] cameraLngLat:',cameraLngLat);
let targetLngLat;
//console.log('[calculateCameraOptionsFROMcustom] isStyleLoaded=',this.isStyleLoaded(),'fromLatLng:',fromLatLng,'getCameraTargetElevation=',this.getCameraTargetElevation(),'queryTerrainElevation=',this.queryTerrainElevation(cameraLngLat));
// Беда в том, что "в первый раз" высота определяется неправильно, метров на 100. А в последующие - 
// правильно. Почему так и от чего зависит - непонятно.
// Ещё если сперва определить какую-то большую высоту, а потом 0 - то оно иногда падает с 
// Uncaught RangeError: Out of range source coordinates for DEM data. x: Infinity, y: Infinity, dim: 512
// Поэтому тут пурга с try.
let elevation;
try {	// хотя, вроде бы, try не образует контекста? Ну их нахрен...
	elevation = this.queryTerrainElevation(cameraLngLat);
	if(elevation !== null) isTerrain = true;
	else elevation = 0;
}
catch (error){
	console.log('[calculateCameraOptionsFROMcustom] ошибка в queryTerrainElevation:',error);
	elevation = 0
};
console.log('[calculateCameraOptionsFROMcustom] elevation=',elevation,'isTerrain=',isTerrain,'fakeDistance=',fakeDistance);
if((fakeDistance === null) || (fakeDistance === undefined)){
	if(isTerrain){
// Суть этого цирка в том, что jumpTo ничего не знает о точке зрения, и строит сцену так, что
// её "пол" находится на уровне земли точки center, а высота камеры над полом определяется pitch.
// Поэтому, если мы хотим, чтобы сцена выглядела с уровня земли точки fromLatLng, нужно
// подобрать точку center примерно с такой же высотой.
		for(const dist of fakeDistances){
			targetLngLat = destinationPoint(fromLatLng,bearing,dist);
			targetLngLat = [targetLngLat.lng,targetLngLat.lat];
			const ele = this.queryTerrainElevation(targetLngLat);
			//const delta = (deltaElevation*dist)/100;	// так себе результат
			const delta = deltaElevation;
			console.log('[calculateCameraOptionsFROMcustom] Высота в точке fakeDistance=',dist,ele,'допустимая разница высот',delta);
			if((ele-elevation) < delta) {	// т.е., точка не выше, а что ниже - пофиг.
				fakeDistance = dist;
				break;
			};
		};
		if(!fakeDistance) fakeDistance = defaultFakeDistance;
	}
	else {
		fakeDistance = defaultFakeDistance;
		targetLngLat = destinationPoint(fromLatLng,bearing,fakeDistance);
		targetLngLat = [targetLngLat.lng,targetLngLat.lat];
	};
}
else {
	targetLngLat = destinationPoint(fromLatLng,bearing,fakeDistance);
	targetLngLat = [targetLngLat.lng,targetLngLat.lat];
};
console.log('[calculateCameraOptionsFROMcustom] targetLngLat:',targetLngLat,'fakeDistance',fakeDistance,'getVerticalFieldOfView',map.getVerticalFieldOfView());

elevation += cameraHeight;
let cameraOptions = this.calculateCameraOptionsFromTo(
	cameraLngLat, 
	elevation,	// cameraAltitude
	targetLngLat, 
	elevation	// targetAltitude Теоретически параметр не обязателен, но если не указывать содержательное значение - иногда оно падает где-то в глубине.
);
//console.log('[calculateCameraOptionsFROMcustom] calculated cameraOptions:',JSON.stringify(cameraOptions,null," "));

// Иногда calculateCameraOptionsFromTo вычисляет pitch > 90. Оно бы и хорошо, но jumpTo
// падает в Firefox, если pitch > 90. В Opera и Chrome - не падает.
//if(!cameraOptions.pitch || (cameraOptions.pitch>90)) cameraOptions.pitch = 90;
// Вычислим наклон камеры исходя из высоты камеры и дистанции до center
let pitch = (Math.atan(fakeDistance/cameraHeight)/Math.PI)*180;
if(pitch > 89.7) pitch = 89.7;	// Это какая-то сакральная цифра. Если больше - домики не рисуются.
//const pitch = 87.03;
console.log('[calculateCameraOptionsFROMcustom] pitch=',pitch);
cameraOptions.pitch = pitch;
if(cameraOptions.pitch > 89.7) cameraOptions.pitch = 89.7;	// Это какая-то сакральная цифра. Если больше - домики не рисуются.
console.log('[calculateCameraOptionsFROMcustom] cameraOptions.pitch=',cameraOptions.pitch);
cameraOptions.elevation = elevation;
//cameraOptions.zoom *= 1.1;
return cameraOptions;
}; // end function calculateCameraOptionsFROMcustom


function panoLEFT(){
/*
Global: map, hRotateDelta, options, cameraOptions
*/
//console.log('[panoLEFT] cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));
let bearing = map.getBearing() - hRotateDelta;
if(bearing < 0) bearing = 360 + bearing;
cameraOptions = {...cameraOptions, ...map.calculateCameraOptionsFROMcustom(cameraOptions.cameraCenter,bearing,options.cameraHeight,fakeDistance)};
//console.log('[panoLEFT] fromLatLng:',options.fromLatLng,'cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));
if(cameraOptions.userPitch !== undefined) cameraOptions.pitch = cameraOptions.userPitch;

map.jumpTo(cameraOptions);
//map.flyTo(cameraOptions);
//map.easeTo(cameraOptions);

cameraOptions.userDirection -= hRotateDelta;
updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function panoLEFT


function panoRIGHT(){
/*
Global: map, hRotateDelta, options, cameraOptions
*/
let bearing = map.getBearing() + hRotateDelta;
if(bearing >= 360) bearing = 360 - bearing;
cameraOptions = {...cameraOptions, ...map.calculateCameraOptionsFROMcustom(cameraOptions.cameraCenter,bearing,options.cameraHeight,fakeDistance)};
//console.log('[panoRIGHT] fromLatLng:',options.fromLatLng,'cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));
if(cameraOptions.userPitch !== undefined) cameraOptions.pitch = cameraOptions.userPitch;

map.jumpTo(cameraOptions);		
//map.flyTo(cameraOptions);		
//map.easeTo(cameraOptions);		

cameraOptions.userDirection += hRotateDelta;
updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function panoRIGHT


function viewpointUP(){
/*
Global: map, vRotateDelta, cameraOptions
*/
cameraOptions.pitch -= vRotateDelta;
if(cameraOptions.pitch < 0) cameraOptions.pitch = 0;
cameraOptions.userPitch = cameraOptions.pitch;
//console.log('UP, fromLatLng:',options.fromLatLng,'cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));

//map.jumpTo(cameraOptions);		
map.easeTo({"pitch":cameraOptions.pitch});		

updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function viewportUP


function viewpointDOWN(){
/*
Global: map, vRotateDelta, cameraOptions
*/
cameraOptions.pitch += vRotateDelta;
if(cameraOptions.pitch > 89.7) cameraOptions.pitch = 89.7;
cameraOptions.userPitch = cameraOptions.pitch;
//console.log('DOWN, fromLatLng:',options.fromLatLng,'cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));

//map.jumpTo(cameraOptions);		
map.easeTo({"pitch":cameraOptions.pitch});		

updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function viewportDOWN


/*/ Чёта оно непонятно как рисует... И высоту тоже - непонятно.
function stepUP(){
// Global: map, distanceDelta
cameraOptions.cameraCenter = destinationPoint(cameraOptions.cameraCenter,cameraOptions.bearing,distanceDelta);
let elevation = map.queryTerrainElevation(point2maplibre(cameraOptions.cameraCenter));
if(elevation !== null) cameraOptions.elevation = elevation + options.cameraHeight;
console.log('[stepUP] cameraOptions.cameraCenter:',cameraOptions.cameraCenter,'cameraOptions.elevation:',cameraOptions.elevation);

map.panBy([0, -distanceDelta],{"elevation":cameraOptions.elevation});	// оно просто двигает всё вперёд, но почему-то устанавливает elevation в 0
//console.log('[stepUP] center:',map.getCenter(),'elevation:',map.getCenterElevation(),'zoom:',map.getZoom(),'pitch:',map.getPitch(),'bearing:',map.getBearing(),'getVerticalFieldOfView=',map.getVerticalFieldOfView());
cameraOptions.center = map.getCenter();

updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function stepUP

function stepBACK(){
// Global: map, distanceDelta
cameraOptions.cameraCenter = destinationPoint(cameraOptions.cameraCenter,(cameraOptions.bearing+180)%360,distanceDelta);
let elevation = map.queryTerrainElevation(point2maplibre(cameraOptions.cameraCenter));
if(elevation !== null) cameraOptions.elevation = elevation + options.cameraHeight;
console.log('[stepBACK] cameraOptions.cameraCenter:',cameraOptions.cameraCenter,'cameraOptions.elevation:',cameraOptions.elevation);

map.panBy([0, distanceDelta],{"elevation":cameraOptions.elevation});
console.log('[stepBACK] center:',map.getCenter(),'elevation:',map.getCenterElevation(),'zoom:',map.getZoom(),'pitch:',map.getPitch(),'bearing:',map.getBearing(),'getVerticalFieldOfView=',map.getVerticalFieldOfView());
cameraOptions.center = map.getCenter();

updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function stepBACK
/*/
function stepUP(){
// Global: map, distanceDelta
cameraOptions.cameraCenter = destinationPoint(cameraOptions.cameraCenter,cameraOptions.bearing,distanceDelta);
let elevation = map.queryTerrainElevation(point2maplibre(cameraOptions.cameraCenter));
if(elevation !== null) cameraOptions.elevation = elevation + options.cameraHeight;
//console.log('[stepUP] cameraOptions.cameraCenter:',cameraOptions.cameraCenter,'cameraOptions.elevation:',cameraOptions.elevation);

cameraOptions = {...cameraOptions, ...map.calculateCameraOptionsFROMcustom(cameraOptions.cameraCenter,cameraOptions.bearing,options.cameraHeight,fakeDistance)};
//console.log('[stepUP] cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));
if(cameraOptions.userPitch !== undefined) cameraOptions.pitch = cameraOptions.userPitch;

map.jumpTo(cameraOptions);		
//map.flyTo(cameraOptions);		
//map.easeTo(cameraOptions);		

updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function stepUP


function stepBACK(){
// Global: map, distanceDelta
cameraOptions.cameraCenter = destinationPoint(cameraOptions.cameraCenter,(cameraOptions.bearing+180)%360,distanceDelta);
let elevation = map.queryTerrainElevation(point2maplibre(cameraOptions.cameraCenter));
if(elevation !== null) cameraOptions.elevation = elevation + options.cameraHeight;
//console.log('[stepBACK] cameraOptions.cameraCenter:',cameraOptions.cameraCenter,'cameraOptions.elevation:',cameraOptions.elevation);

cameraOptions = {...cameraOptions, ...map.calculateCameraOptionsFROMcustom(cameraOptions.cameraCenter,cameraOptions.bearing,options.cameraHeight,fakeDistance)};
//console.log('[stepBACK] cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));
if(cameraOptions.userPitch !== undefined) cameraOptions.pitch = cameraOptions.userPitch;

map.jumpTo(cameraOptions);		
//map.flyTo(cameraOptions);		
//map.easeTo(cameraOptions);		

updPointInput();	// запишем точки обзора в пользовательский интерфейс
}; // end function stepBACK



function updPointInput(){
/* Записывает координаты из options в поля ввода на экране */
if(overlayPanel.hidden) return;	// а надо? ну и писалось бы... 
let p = point2maplibre(options.fromLatLng);	// это возвращает массив из двух чисел, вне зависимости от формата options.fromLatLng
//console.log('[updPointInput] p:',p);
viewPointInput.value = `${p[1]} ${p[0]}`;
if(options.toLatLng){	// оно всегда точка или пусто
	p = point2maplibre(options.toLatLng);	// это возвращает массив из двух чисел, вне зависимости от формата options.fromLatLng
	targetPointInput.value = `${p[1]} ${p[0]}`;
}
else if(options.bearing) targetPointInput.value = options.bearing;
}; // end function updPointInput


function viewPointsHandler(){
/* Берёт новые fromLatLng и toLatLng из полей viewPointInput и targetPointInput
 пользовательского интерфейса */
const fromLatLng = posFromString(viewPointInput.value);
//console.log('[viewPointsHandler] fromLatLng:',fromLatLng);
viewPointInput.value = '';
if(fromLatLng.lat) viewPointInput.value = `${fromLatLng.lat} ${fromLatLng.lon}`; 	// тогда .lon там тоже есть

const toLatLng = posFromString(targetPointInput.value);
//console.log('[viewPointsHandler] toLatLng:',toLatLng);
targetPointInput.value = '';
if(toLatLng.lat) targetPointInput.value = `${toLatLng.lat} ${toLatLng.lon}`;	// тогда .lon там тоже есть
else if(toLatLng.bearing != undefined) targetPointInput.value = toLatLng.bearing;

if(viewPointInput.value && targetPointInput.value){	// Новые значения точки зрения и объекта наблюдения
	options.fromLatLng = viewPointInput.value.split(' ');
	const toLatLng = targetPointInput.value.split(' ');
	if(toLatLng.length == 1){	// там азимут
		options.toLatLng = null;
		options.bearing = toLatLng[0];
	}
	else {
		options.toLatLng = toLatLng;
		options.bearing = bearingFromTo(options.fromLatLng,options.toLatLng);
	};
	const p = point2maplibre(options.fromLatLng);	// это возвращает массив из двух чисел, вне зависимости от формата options.fromLatLng
	cameraOptions.cameraCenter = {"lng":p[0],"lat":p[1]};
	cameraOptions.bearing = options.bearing;
	cameraOptions.userDirection = 0;
	cameraOptions = {...cameraOptions, ...map.calculateCameraOptionsFROMcustom(cameraOptions.cameraCenter,cameraOptions.bearing,options.cameraHeight,fakeDistance)};
	//console.log('[viewPointsHandler] fromLatLng:',options.fromLatLng,'cameraOptions:',JSON.stringify(cameraOptions,null,"\t"));
	map.jumpTo(cameraOptions);	// Покажем панораму	
	storageHandler.save('options',options);
};
}; // end function viewPointsHandler


function updField(str=''){
/* Дополняет поле строкой */
//console.log('[clearField] currentInputField:',currentInputField);
if(!currentInputField) return;
switch(currentInputField.id){
case 'viewPointInput':
case 'targetPointInput':
	currentInputField.focus();
	if(str) currentInputField.value += str;
	else {
		currentInputField.value = '';
		currentInputField = undefined;
	};
};
}; // end function clearField


function opionsFromCameraOptions(){
/* Заполнение options по данным cameraOptions, сохранение и обновление полей на экране */
options.toLatLng = undefined;	// в cameraOptions нет этой точки
options.fromLatLng = cameraOptions.cameraCenter;
options.bearing = cameraOptions.bearing;
//console.log('[opionsFromCameraOptions] options:',options);
updPointInput();	// запишем точки обзора в пользовательский интерфейс
storageHandler.save('options',options);
}; // end function opionsFromCameraOptions


function followSwitchHandler(){
/* Переключатель Следовать текущим координатам */
if(followSwitch.checked){	// включен
	//console.log('[followSwitchHandler] включили!');
	bearingMark.hidden = false;	// включим кораблик в компасе.
}
else{	// выключен
	//console.log('[followSwitchHandler] выключили!');
	if(optionsUpdateProcess) clearInterval(optionsUpdateProcess);	// остановим периодическое сохранение options
	optionsUpdateProcess = null;
	bearingMark.hidden = true;	// Выключим кораблик в компасе
};
storageHandler.save('followSwitch',followSwitch.checked);
}; // end function followSwitchHandler




function posFromString(stringPos){
/* Получает строку предположительно с координатами, и перемещает туда центр карты */
if(!stringPos) return {};
stringPos = stringPos.trim();
//console.log('[posFromString] stringPos=',stringPos);
	// Это написано с использованием аж трёх ИИ, сам я так и ниасилил регулярные выражения
	// Но за то время, что я убил, добиваясь от ИИ правильного результата, я написал бы сам.
	// Ещё и понимал бы, что здесь написано.
	// Напиши регулярное выражение для javascript regex, извлекающее из строки первое число, следующее за указанной подстрокой через любое количество любых нецифровых символов. Число может быть отрицательными.
	function extractNumberAfterKeyword(str, keyword) {
		// Используем экранирование специальных символов регулярного выражения внутри keywor'd'
		const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
		// Регулярное выражение теперь включает аргумент keyword
		const regex = new RegExp(`${escapedKeyword}[^\\d.-]*(-?\\d+(?:\\.\\d+)?)`, 'i');
		// Выполняем поиск соответствия регулярному выражению
		const match = str.match(regex);
		//console.log('[extractNumberAfterKeyword] match:',match);
		if (match && match.length > 1) { // Если найдено совпадение и оно имеет значение
		    return parseFloat(match[1]); // Возвращаем найденное число
		};
		return null; // Если ничего не нашли — возвращаем null
	};

let error,position,x,y,z;
const oneNumberRegex = /^(?=.*\d)[^\d]*\d+[.,]?\d*[^\d]*$/;	// есть ли в строке ровно одно число?
if(oneNumberRegex.test(stringPos)){	
	//console.log('[posFromString] в строке только одно число - это азимут?');
	let azimuth = Number(extractNumberAfterKeyword(stringPos, ''));
	if((azimuth > 360)||(azimuth < -180)) return null;	// это не азимут
	else return {"bearing":azimuth};
	//else return azimuth;
}
else {	// в строке непонятно что
	try {
		// Разберём строку как координаты https://github.com/otto-dev/coordinate-parser
		// Писал это дело законченный мудак, и там, кроме кучи бессмысленных объектных наворотов,
		// совершенно шизоидная логика. Исправить её невозможно - проще написать снова. Поэтому
		// проще то, что в этом парсере не предусмотрено, отдельно привести к виду, парсером
		// понимаемому.
		position = new Coordinates(stringPos);
		position = {lon:position.longitude,lat:position.latitude};
		//console.log('[posFromString] Координаты разобраны успешно, position:',position);
	} 
	catch (error) { 	// coordinate-parser обломался, строка - не координаты.
		//console.log('[flyByString] Координаты йок, stringPos=',stringPos,error);
		// это возможно, строка с lon lat
		position = {lon:extractNumberAfterKeyword(stringPos, 'lon'),lat:extractNumberAfterKeyword(stringPos, 'lat')};
		//console.log('[posFromString] 1 lon=',lon,'lat=',lat);
		if(position.lon == null){
			position.lon = extractNumberAfterKeyword(stringPos, 'lng');
			if(position.lon == null){
				position.lon = extractNumberAfterKeyword(stringPos, 'longitude');
			};
		};
		if(position.lat == null){
			position.lat = extractNumberAfterKeyword(stringPos, 'lat');
			if(position.lat == null){
				position.lat = extractNumberAfterKeyword(stringPos, 'latitude');
			};
		};
		if((position.lon == null) || (position.lat == null)){	// координат так и не нашли
			//console.log("А не номер тайла ли там?");
			x = extractNumberAfterKeyword(stringPos, 'x');
			y = extractNumberAfterKeyword(stringPos, 'y');
			z = extractNumberAfterKeyword(stringPos, 'z');
			//console.log('[flyByString] номер тайла z,x,y:',z,x,y);
			if((x == null) || (y == null) || (z == null)){	// координат так и не нашли
				//console.log("Может быть, там номер тайла просто в виде трёх чисел zxy?");
				const regex = /[-+]?\d*\.?\d+/g;	// все числа
				let zxy = stringPos.match(regex);	// вот какой кретин придумал возвращать null при неудаче поиска? Почему не пустой массив?
				if(zxy) {
					zxy = zxy.map(Number);
					//console.log(zxy);
					if((zxy.length == 3) && isValidTile(zxy[0],zxy[1],zxy[2])){
						position = tileNum2degree(zxy[0],zxy[1],zxy[2]);
						z=zxy[0];
						//console.log('[posFromString] Да, это 3 числа. position=',position,'z=',z);
					}
					else position = null;
				}
				else position = null;
			}
			else{
				position = tileNum2degree(z,x,y);
				position.lon = position.lng
				//console.log('[posFromString] Да, там номер тайла. position=',position,'z=',z);
			};
		};
	};
	if(position){	// координаты нашли
		//console.log('[posFromString] 3 position=',position,'z=',z);
		return position;
	};
};
return {};
}; // end function posFromString


function point2maplibre(fromLatLng){
/* Преобразовает координаты из какой-нибудь нотации в нотацию maplibre */
const lat = fromLatLng.lat || fromLatLng.latitude || fromLatLng[0];
const lon = fromLatLng.lng || fromLatLng.lon || fromLatLng.longitude || fromLatLng[1];
return [lon,lat];
}; // end function point2maplibre





function bearingFromTo(latlng1, latlng2) {
/**/
//console.log(latlng1,latlng2)
const rad = Math.PI/180;
let lat1,lat2,lon1,lon2;
lat1 = (latlng1.lat || latlng1.latitude || latlng1[0])  * rad;
lat2 = (latlng2.lat || latlng2.latitude || latlng2[0])  * rad;
lon1 = (latlng1.lng || latlng1.lon || latlng1.longitude || latlng1[1]) * rad;
lon2 = (latlng2.lng || latlng2.lon || latlng2.longitude || latlng2[1]) * rad;
//console.log('lat1=',lat1,'lat2=',lat2,'lon1=',lon1,'lon2=',lon2)

let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
//console.log('x',x,'y',y)

let bearing = ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
if(bearing >= 360) bearing = bearing-360;

return bearing;
} // end function bearingFromTo


function equirectangularDistance(fromIn,toIn){
// https://www.movable-type.co.uk/scripts/latlong.html
// from,to: {longitude: xx, latitude: xx}
let from = {};
if(fromIn.lat) from.latitude = fromIn.lat;
else if(fromIn.latitude) from.latitude = fromIn.latitude
if(fromIn.lon) from.longitude = fromIn.lon;
else if(fromIn.lng) from.longitude = fromIn.lng
else if(fromIn.longitude) from.longitude = fromIn.longitude

let to = {};
if(toIn.lat) to.latitude = toIn.lat;
else if(toIn.latitude) to.latitude = toIn.latitude
if(toIn.lon) to.longitude = toIn.lon;
else if(toIn.lng) to.longitude = toIn.lng
else if(toIn.longitude) to.longitude = toIn.longitude

const rad = Math.PI/180;
const φ1 = from.latitude * rad;
const φ2 = to.latitude * rad;
const Δλ = (to.longitude-from.longitude) * rad;
const R = 6371e3;	// метров
const x = Δλ * Math.cos((φ1+φ2)/2);
const y = (φ2-φ1);
const d = Math.sqrt(x*x + y*y) * R;	// метров
return d;
} // end function equirectangularDistance


function haversineDistance(latlng1, latlng2){
/* http://www.movable-type.co.uk/scripts/latlong.html
This uses the ‘haversine’ formula to calculate the great-circle distance between two points
 – that is, the shortest distance over the earth’s surface
 – giving an ‘as-the-crow-flies’ distance between the points
*/
const rad = Math.PI/180;
let lat1,lat2,lon1,lon2;
lat1 = latlng1.lat || latlng1.latitude || latlng1[0];
lat2 = latlng2.lat || latlng2.latitude || latlng2[0];
lon1 = latlng1.lng || latlng1.lon || latlng1.longitude || latlng1[1];
lon2 = latlng2.lng || latlng2.lon || latlng2.longitude || latlng2[1];
//console.log('lat1=',lat1,'lat2=',lat2,'lon1=',lon1,'lon2=',lon2)

const R = 6371e3; // metres
const φ1 = lat1 * rad; // φ, λ in radians
const φ2 = lat2 * rad;
const Δφ = (lat2-lat1) * rad;
const Δλ = (lon2-lon1) * rad;

const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

const d = R * c; // in metres
return d;
}; // end function haversine_distance


function destinationPoint(latlng1,bearing,distance){
/*  http://www.movable-type.co.uk/scripts/latlong.html
Given a start point, initial bearing, and distance, this will calculate the destina­tion point 
travelling along a (shortest distance) great circle arc.
*/
const R = 6371e3; // metres
const rad = Math.PI/180;
lat1 = latlng1.lat || latlng1.latitude || latlng1[0];
lon1 = latlng1.lng || latlng1.lon || latlng1.longitude || latlng1[1];
const φ1 = lat1 * rad; // φ, λ in radians
const λ1 = lon1 * rad;
const brng = bearing * rad;

const φ2 = Math.asin( Math.sin(φ1)*Math.cos(distance/R) +
                      Math.cos(φ1)*Math.sin(distance/R)*Math.cos(brng) );
const λ2 = λ1 + Math.atan2(Math.sin(brng)*Math.sin(distance/R)*Math.cos(φ1),
                           Math.cos(distance/R)-Math.sin(φ1)*Math.sin(φ2));

let lon2 = λ2 / rad;
lon2 = (lon2+540)%360-180;	//  	The longitude can be normalised to −180…+180
const lat2 = φ2 / rad;

return({"lng":lon2,"lat":lat2});
}; // end function destinationPoint


function tileNum2degree(zoom,xtile,ytile) {
/* Tile numbers to lon./lat. left top corner
// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
*/
const n = Math.pow(2, zoom)
const lon_deg = xtile / n * 360.0 - 180.0;
const nn = Math.PI - (2 * Math.PI * ytile) / Math.pow(2, zoom);
const lat_deg = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(nn) - Math.exp(-nn)));
return {'lat': lat_deg,'lng': lon_deg};
}; // end function tileNum2degree


function isValidTile(z, x, y) {
/* проверяет, номер тайла ли */
if (!Number.isInteger(z) || z < 0 || z > 22) return false;
const max = (1 << z) - 1;	// 2^z - 1   Максимальное количество тайлов в строке или колонке на уровне z
if (!Number.isInteger(x) || x < 0 || x > max) return false;
if (!Number.isInteger(y) || y < 0 || y > max) return false;
return true;
}; // end function isValidTile





const storageHandler = {
	_storageName : 'DEMview',
	_store: {'empty':true},	// типа, флаг, что ещё не считывали из хранилища. Так проще и быстрей в этом кривом языке.
	storage: false,	// теоретически, можно указать, куда именно записывать? Но только мимо проверки доступности.
	//storage: 'cookie',
	//storage: 'storage',
	save: function(key,value=null){
		/* сохраняет key->value, но можно передать список пар одним параметром 
		или просто строку с именем переменной */
		let values = {};
		if(arguments.length == 2){	// два аргумента - это key->value
			values[key] = value;
		}
		else if(typeof key == 'object') {	// один, но список key->value
			values = key;
		}
		else {	// один, тогда это строка - имя переменной
			//values[key] = window[key];	// это обломается, если key - не глобальная переменная, объявленная через var
			// поэтому нижесказанное - единственный способ получить значение объекта по его имени.
			// Он сработает и с локальным объектом, и с объектами, объявленными через let и const
			values[key] = eval(key);
			//console.log('[storageHandler] save key=',key,window[key]);
		};
		//console.log('[storageHandler] save',values,'to storage:',this.storage,'store:',this._store);
		for(let key in values){
			this._store[key] = values[key];
		};
		this._store.empty = false;
		this._saveStore();
	},
	restore: function(key){
		//alert('[storageHandler] restore '+key);
		if(this._store.empty){
			this._restoreStore();
			this._store.empty = false;
		};
		return this._store[key.trim()];
	},
	restoreAll: function(){
		if(this._store.empty){
			this._restoreStore();
			this._store.empty = false;
		};
		delete this._store.empty;
		for(let varName in this._store){
			window[varName] = this._store[varName];	// window[varName] - создаётся глобальная переменная с именем, являющимся значением varName
		};
		this._store.empty = false;
	},
	del: function(key){
		if(this._store.empty){
			this._restoreStore();
			this._store.empty = false;
		};
		delete this._store[key.trim()];
		this._saveStore();
	},
	_findStorage: function(){
		try {
			window.localStorage.setItem("__storage_test__", "__storage_test__");
			window.localStorage.removeItem("__storage_test__");
			this.storage='storage';
		}
		catch (err) {
			this.storage='cookie';	// куки-то всегда можно, да?
		};
	},
	_saveStore: function(){
		if(!this.storage) this._findStorage();
		switch(this.storage){
		case 'storage':
			//console.log('_saveStore:',JSON.stringify(this._store));
			window.localStorage.setItem(this._storageName, JSON.stringify(this._store));
			break;
		case 'cookie':
			let expires = new Date(Date.now() + (60*24*60*60*1000));	// протухнет через два месяца
			expires = expires.toUTCString();
			document.cookie = this._storageName+"="+JSON.stringify(this._store)+"; expires="+expires+"; path=/; SameSite=Lax;";
			break;
		default:
			console.log('storageHandler: the parameters are not saved, there is nowhere');
		};
	},
	_restoreStore: function(){
		if(!this.storage) this._findStorage();
		switch(this.storage){
		case 'storage':
			this._store = JSON.parse(window.localStorage.getItem(this._storageName));
			//console.log('_restoreStore:',JSON.stringify(this._store));
			if(!this._store) this._store = {'empty':true};
			break;
		case 'cookie':
			this._store = JSON.parse(document.cookie.match(new RegExp(
				"(?:^|; )" + this._storageName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			))[1]);
			if(!this._store) this._store = {'empty':true};
			break;
		default:
			console.log('storageHandler: no saved parameters, there is nowhere');
		};
	}
}; // end storageHandler




function getScript(scriptName,callable){
/* Вся эта горбатая пурга - исключительно потому, что CORS запрещает загрузку объекта
по протоколу file://
Поэтому, для поддержки использования без веб-сервера, сделано так через жопу.
Но эта жопа загружает скрипт асинхронно...
*/
//console.log('[getScript] scriptName:',scriptName);
//if(!scriptName) return;

let script = document.createElement('script');
script.async = false;	// но это вообще ни на что не влияет
script.onerror = () => {
	console.log("[getScript] Error: not found script file",scriptName);
	return;
};
script.onload = () => {
	console.log("[getScript] The script file",scriptName,"is loaded, try callable.");
	callable();
};
script.src = scriptName;
document.head.appendChild(script);	// Это, собственно, и вызовет загрузку. При этом скрипт переместится в конец списка скриптов. И что?
//console.log('[getScript] script:',script);
}; // end function getScript


function mergeV8styles(styleFROM,styleTO){
/* Объединяет sources и layers двух стилей */
for(const sourceName in styleFROM.sources){
	styleTO.sources[sourceName] = styleFROM.sources[sourceName];
};
//console.log('mainStyle:',mainStyle);
for(const layer of styleFROM.layers){
	styleTO.layers.push(layer);
};
// а возвращать ничего не надо, ибо javascrpt, ..., и всё по ссылке
return styleTO;	// но всё же вернём, а то уж очень противно
}; // end function mergeV8styles

