/* Пурга с оборачиванием json в javascript вызвана кретинским CORS, который 
предполагает, что ресурсы могут быть загружены с того же url, что и сам скрипт, но не по
протоколу file. В результате загрузить json из скрипта, запущенного как file, невозможно.
Зато возможно загрузить javascript.
Дебилы, ...
*/
const buildingsStyle = {
"version": 8,
"sources": {
	"openmaptiles": {
		"type": "vector",
		"url": "http://stagerserver.local/tileproxy/mapsources/openfreemap/planet.json",
	}
},
"layers": [
	{
		"id": "3d-buildings",
		"source": "openmaptiles",
		"source-layer": "building",
		"type": "fill-extrusion",
		"minzoom": 10,
		"filter": ["!=", ["get", "hide_3d"], true],
		"paint": {
			"fill-extrusion-color": [
				"interpolate",
				["linear"],
				["get", "render_height"], 0, "lightgray", 200, "royalblue", 400, "lightblue"
			],
			"fill-extrusion-height": [
				"interpolate",
				["linear"],
				["zoom"],
				15,	0,
				16,	["get", "render_height"]
			],
			"fill-extrusion-base": ["case",
				[">=", ["get", "zoom"], 16],
				["get", "render_min_height"], 0
			]
		}
	},
]
};

