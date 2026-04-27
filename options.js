var defaultOptions = {
	// По умолчанию - это конфигурация с ресурсами из Интернета. Но практически полезно
	// использовать локальные источники. Приведённые примеры используют GaladrielCache
	// This is online configuration by default. But it is practically useful to use local sources.
	// This use GaladrielCache.
	// Хост и порт источника управления. Если нет - то имя сервера, если нет - то [::1]:
	// Если не указано - точку обзора придётся указывать руками
	// Backend host & port. If not then it is the host name. If it is not, then it is a [::1]:
	//"gpsdProxyHost" : "127.0.0.1",
	//"gpsdProxyHost" : "192.168.10.10",
	//"gpsdProxyHost" : "stagerserver.local",
	//"gpsdProxyPort" : "3838",	// gpsdPROXY
	//"gpsdProxyHost" : "[::1]",
	//"gpsdProxyPort" : "3839",	// gpsdPROXY or gpsd2websocket
	
	// Источник высот
	// Должен быть файлом описания тайлов в нотации mbtiles v.2 и указываться ПОЛНЫМ url (ну, таков каприз людей из mapbox).
	// DEM source 
	// Must be a tile source description mbtiles v.2 file and be determined a FULL url.
	//"DEMsource" : "http://stagerserver.local/tileproxy/mapsources/mapterhorn/tilejson.json",
	"DEMsource" : "https://tiles.mapterhorn.com/tilejson.json",
	
	// Карта поверх рельефа. Должна быть растровой.
	// The map is on top of the terrain. It must be raster.
	//"DEMtexture" : "http://stagerserver.local/tileproxy/tiles.php?z={z}&x={x}&y={y}&r=osmmapMapnik",
	//"DEMtexture" : "http://stagerserver.local/tileproxy/tiles.php?z={z}&x={x}&y={y}&r=eniroTopo",
	"DEMtexture" : "https://mt0.google.com/vt/lyrs=s@176103410&s=Galileo&scale=1&hl=en&x={x}&y={y}&z={z}",
	//"DEMtexture" : "http://stagerserver.local/tileproxy/tiles.php?z={z}&x={x}&y={y}&r=GoogleSAT",
	//"DEMtexture" : "http://stagerserver.local/tileproxy/tiles.php?z={z}&x={x}&y={y}&r=ESRI_Sat",
	
	// Следующие данные описываются стилями в нотации mbtiles v.8. Эти стили объединяются
	// с встроенным стилем в указанной последовательности. Соответственно, если в стилях
	// имеются одноимённый объекты - последний заменит предыдущий.
	// В частности, sprite и glyphs будут от последнего стиля, в котором они указаны.
	// Разумеется, все эти данные могут быть указаны в одном файле стиля.
	// The following data is described by styles in mbtiles v.8 notation. These styles are combined
	// with the embedded style in the specified sequence. Therefore, if the styles
	// have objects of the same name, the latter will replace the previous one.	
	// Of course, all this data can be specified in a single style file.
	//
	// Источник изображений зданий.
	// Должен быть файлом стиля в нотации mbtiles v.8, обёрнутым в переменную javascript. CORS - зло.
	// The source of the buildings view.
	// It should be a style file in mbtiles v.8 notation wrapped in a javascript variable. CORS is evil.
	//"buildingsSource" : "3d-buildings.js",
	"buildingsSource" : "3d-buildings_online.js",
	
	// Источник подписей к карте. 
	// Должен быть файлом стиля в нотации mbtiles v.8, обёрнутым в переменную javascript. CORS - зло.
	// The source of the captions to the map.
	// It should be a style file in mbtiles v.8 notation wrapped in a javascript variable. CORS is evil.
	//"toponymosSource" : "toponymos.js",
	"toponymosSource" : "toponymos_online.js",

	// Источник навигационных знаков.
	// Должен быть файлом стиля в нотации mbtiles v.8, обёрнутым в переменную javascript. CORS - зло.
	// Source of navigation signs.
	// It should be a style file in mbtiles v.8 notation wrapped in a javascript variable. CORS is evil.
	//"navigationSignsSource" : "skippoNavSigns.js",
	"navigationSignsSource" : "skippoNavSigns_online.js",

	// Высота точки зрения над поверхностью, метры.
	// Height of the viewpoint above the surface, meters
	"defaultCameraHeight" : 2,
	
	// Начальная точка зрения
	"defaultViewPoint" : [44.7837, 37.3775],	// Lat Lng, {"lat": ,"lng": }, etc.
	// Начальная точка наблюдения
	"defaultTargetPoint" : [44.7927, 37.404],	// Lat Lng, {"lat": ,"lng": }, etc.
	
	// Клиентское устройство без органов управления:
	// Client device does not have any controls
	"kioskMode" : false,
};
