const navSignsStyle = {
  "version": 8,
  "name": "Nautical light theme",
  "sources": {
    "nautical": {
      "type": "vector",
      "url": "http://stagerserver.local/tileproxy/mapsources/skippo/s57.json"
    }
  },
  "sprite": "http://stagerserver.local/tileproxy/mapsources/skippo/sprite/sprite",
  "glyphs": "http://stagerserver.local/map/styles/fonts/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "VEGATN-Point",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "VEGATN",
      "filter": ["match", ["geometry-type"], ["Point"], true, false],
      "minzoom": 13,
      "layout": {
        "icon-image": [
          "case",
          ["==", ["get", "CATVEG"], "[13]"],
          "C31_Tree_in_general",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {}
    },

    {
      "id": "CTRPNT",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "CTRPNT",
      "filter": ["==", ["get", "CATCTR"], 1],
      "minzoom": 13,
      "layout": {
        "icon-image": "B20_Triangulation_point",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {}
    },
    {
      "id": "WRECKS-HG-Symbol",
      "filter": ["has", "SYMBOL"],
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "WRECKS",
      "layout": {
        "icon-image": "K28_1_Wreck_dangerous",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "WRECKS-DK-Symbol",
      "filter": ["==", ["get", "COUNTRY_CODE"], "DK"],
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "WRECKS",
      "layout": {
        "icon-image": [
          "case",
          ["has", "CATWRK"],
          [
            "match",
            ["get", "CATWRK"],
            [1],
            "K29_Wreck_notdangerous",
            [2],
            "K28_1_Wreck_dangerous",
            [3],
            "K31_Foul_ground",
            [4],
            "K28_1_Wreck_dangerous",
            [5],
            "K24_Wreck_showing_hull",
            [
              "case",
              ["all", ["has", "VALSOU"], [">=", ["get", "VALSOU"], 6]],
              "K29_Wreck_notdangerous",
              "K28_1_Wreck_dangerous"
            ]
          ],
          [
            "case",
            ["all", ["has", "VALSOU"], [">=", ["get", "VALSOU"], 6]],
            "K29_Wreck_notdangerous",
            "K28_1_Wreck_dangerous"
          ]
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "WRECKS-FI-NO-SE-Symbol",
      "filter": [
        "any",
        ["==", ["get", "COUNTRY_CODE"], "FI"],
        ["==", ["get", "COUNTRY_CODE"], "NO"],
        ["==", ["get", "COUNTRY_CODE"], "SE"]
      ],
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "WRECKS",
      "layout": {
        "icon-image": [
          "case",
          ["has", "CATWRK"],
          [
            "match",
            ["get", "CATWRK"],
            [1],
            "K29_Wreck_notdangerous",
            [2],
            "K28_Wreck_dangerous",
            [3],
            "K31_Foul_ground",
            [4],
            "K28_Wreck_dangerous",
            [5],
            "K24_Wreck_showing_hull",
            [
              "case",
              ["all", ["has", "VALSOU"], [">=", ["get", "VALSOU"], 6]],
              "K29_Wreck_notdangerous",
              "K28_Wreck_dangerous"
            ]
          ],
          [
            "case",
            ["all", ["has", "VALSOU"], [">=", ["get", "VALSOU"], 6]],
            "K29_Wreck_notdangerous",
            "K28_Wreck_dangerous"
          ]
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "OBSTRN-Point-Symbol",
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "OBSTRN",
      "filter": [
        "all",
        ["==", ["geometry-type"], "Point"],
        [">=", ["zoom"], ["match", ["get", "PRIO"], 1, 13, 14]]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATOBS"],
          [1],
          "K43_1_Submerged_stump",
          [2],
          [
            "case",
            ["has", "VALSOU"],
            [
              "case",
              [">", ["get", "VALSOU"], 6],
              "K41_Obstruction",
              [
                "case",
                ["==", ["get", "COUNTRY_CODE"], "DK"],
                "K40_1_Obstruction",
                "K40_Obstruction"
              ]
            ],
            "K40_Obstruction"
          ],
          [5],
          [
            "case",
            ["==", ["get", "COUNTRY_CODE"], "DK"],
            "K46_1_Fish_haven",
            "K46_Fish_haven"
          ],
          [7],
          "K31_Foul_ground",
          [
            "case",
            ["has", "VALSOU"],
            [
              "case",
              [">", ["get", "VALSOU"], 6],
              "K41_Obstruction",
              [
                "case",
                ["==", ["get", "COUNTRY_CODE"], "DK"],
                "K40_1_Obstruction",
                "K40_Obstruction"
              ]
            ],
            [
              "case",
              ["==", ["get", "COUNTRY_CODE"], "DK"],
              "K40_1_Obstruction",
              "K40_Obstruction"
            ]
          ]
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "center"
      }
    },

    {
      "id": "HULKES_POINT",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "HULKES_POINT",
      "minzoom": 15,
      "layout": {
        "icon-image": "F34_Hulk",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-font": ["Roboto"],
        "text-field": ["case", ["has", "OBJNAM"], ["get", "OBJNAM"], "Hulk"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-variable-anchor": [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left"
        ],
        "text-offset": [0.75, 0.75],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "OBSTRN-Area-Text",
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "OBSTRN",
      "filter": ["match", ["geometry-type"], ["Polygon"], true, false],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATOBS"],
          [1],
          "K43_1_Submerged_stump",
          [2],
          "NO_SYMBOL",
          [5],
          [
            "case",
            ["==", ["get", "COUNTRY_CODE"], "DK"],
            "K46_1_Fish_haven",
            "K46_Fish_haven"
          ],
          [7],
          "K31_Foul_ground",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "center",

        "text-field": [
          "match",
          ["get", "CATOBS"],
          [1, 7],
          "",
          [2],
          "Well",
          [5],
          "",
          [6],
          "",
          [8],
          "Ice boom",
          [10],
          "",
          "Obstn"
        ],
        "text-font": ["Roboto Italic"],
        "text-optional": true,
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.75, 0.75],
        "text-variable-anchor": [
          "top-left",
          "bottom-left",
          "top-right",
          "bottom-right"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "OBSTRN-Line-Text",
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "OBSTRN",
      "filter": ["match", ["geometry-type"], ["LineString"], true, false],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATOBS"],
          [1],
          "K43_1_Submerged_stump",
          [2],
          "K40_Obstruction",
          [7],
          "K31_Foul_ground",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "center",

        "text-field": [
          "match",
          ["get", "CATOBS"],
          [1, 7],
          "",
          [2],
          "Well",
          [5],
          "",
          [6],
          "",
          [8],
          "Ice boom",
          [10],
          "",
          "Obstn"
        ],
        "text-font": ["Roboto Italic"],
        "text-optional": true,
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.75, 0.75],
        "text-variable-anchor": [
          "top-left",
          "bottom-left",
          "top-right",
          "bottom-right"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "LIGHTS-symbol-flood-light",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LIGHTS",
      "filter": ["match", ["get", "CATLIT"], "[8]", true, false],
      "layout": {
        "icon-image": [
          "match",
          ["get", "COLOUR"],
          ["[1]"],
          "P63_Flood_light_white",
          ["[3]"],
          "P63_Flood_light_red",
          ["[4]"],
          "P63_Flood_light_green",
          ["[6]"],
          "P63_Flood_light_white",
          ["[12]"],
          "P63_Flood_light_magenta",
          "P63_Flood_light_unknown"
        ],
        "icon-rotate": -65,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.75,
          15,
          0.75,
          17,
          1.5
        ]
      }
    },
    {
      "id": "LIGHTS-symbol-other",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LIGHTS",
      "filter": ["match", ["get", "CATLIT"], "[8]", false, true],
      "layout": {
        "icon-image": [
          "match",
          ["get", "COLOUR"],
          ["[1]"],
          "Light_Flare_white",
          ["[3]"],
          "Light_Flare_red",
          ["[4]"],
          "Light_Flare_green",
          ["[5]"],
          "Light_Flare_blue",
          ["[6]"],
          "Light_Flare_white",
          ["[11]"],
          "Light_Flare_orange",
          "Light_Flare_magenta"
        ],
        "icon-rotate": [
          "match",
          ["get", "COLOUR"],
          ["[1]"],
          35,
          ["[3]"],
          65,
          ["[4]"],
          55,
          ["[5]"],
          35,
          ["[6]"],
          45,
          ["[11]"],
          55,
          55
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.75,
          15,
          0.75,
          17,
          1.5
        ]
      }
    },

    {
      "id": "FSHFAC_POINT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "FSHFAC_POINT",
      "filter": ["match", ["geometry-type"], ["Point"], true, false],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATFIF"],
          [1],
          "K44_1_Fishing_stakes",
          [2],
          "K48_Marine_farm",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },
    {
      "id": "MARCUL_POINT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "MARCUL_POINT",
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATMFA"],
          [2],
          "K47_Shellfish_beds",
          [3],
          "K48_Marine_farm",
          [4],
          "K48_Marine_farm",
          "K48_Marine_farm"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "HRBFAC-symbol",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "HRBFAC",
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATHAF"],
          ["[4]"],
          "F10_Fishing_harbor",
          ["[5]"],
          "U1_1_Marina",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "LNDARE_POINT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LNDARE_POINT",
      "filter": [
        ">=",
        ["zoom"],
        ["match", ["get", "PRIO"], 1, 12, 2, 13, 3, 14, 15]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "COUNTRY_CODE"],
          "FI",
          "K10b_LandPoint",
          "K10_LandPoint"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "UWTROC",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "UWTROC",
      "filter": [
        ">=",
        ["zoom"],
        ["match", ["get", "PRIO"], 1, 12, 2, 13, 3, 14, 15]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "WATLEV"],
          1,
          "K11b_Rock_uncovers",
          2,
          [
            "match",
            ["get", "COUNTRY_CODE"],
            "FI",
            "K10b_LandPoint",
            "K10_LandPoint"
          ],
          3,
          [
            "match",
            ["get", "COUNTRY_CODE"],
            "FI",
            "K13b_Dangerous_underwater_rk",
            "K13a_Dangerous_underwater_rk"
          ],
          4,
          "K11b_Rock_uncovers",
          5,
          [
            "match",
            ["get", "COUNTRY_CODE"],
            "FI",
            "K12b_Rock_awash",
            "K12a_Rock_awash"
          ],
          6,
          "K11b_Rock_uncovers",
          7,
          "K11b_Rock_uncovers",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-field": [
          "case",
          ["has", "VALSOU"],
          ["concat", "(", ["get", "VALSOU"], ")"],
          ""
        ],
        "text-font": ["Roboto Italic"],
        "text-optional": true,
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.35, 0.35],
        "text-variable-anchor": [
          "top-left",
          "bottom-left",
          "top-right",
          "bottom-right",
          "top",
          "left",
          "right",
          "bottom"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "RTPBCN",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "RTPBCN",
      "layout": {
        "icon-image": [
          "case",
          ["==", ["get", "master"], true],
          "S1_RTBCN_with_master",
          "S1_RTBCN"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "SILTNK-point-icon",
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SILTNK",
      "filter": [
        "all",
        ["match", ["geometry-type"], ["Point"], true, false],
        ["match", ["get", "CATSIL"], [4], true, false]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATSIL"],
          [4],
          "E21_Water_tower",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {}
    },

    {
      "id": "OFSPLF",
      "minzoom": 13,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "OFSPLF",
      "layout": {
        "icon-image": "L2_Platform",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-font": ["Roboto"],
        "text-field": ["get", "OBJNAM"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-variable-anchor": [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left"
        ],
        "text-offset": [0.75, 0.75],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "RESARE_POINT_icon",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "RESARE_POINT",
      "filter": ["match", ["get", "CATREA"], ["[4]", "[14]"], false, true],
      "layout": {
        "icon-image": [
          "case",
          ["match", ["get", "CATREA"], ["[5]", "[4,5]"], true, false],
          "N22_1_Bird_Sanctuary",
          ["match", ["get", "CATREA"], ["[7]"], true, false],
          "N22_2_Seal_Sanctuary",
          ["match", ["get", "CATREA"], ["[5,7]"], true, false],
          "N22_3_Bird_Seal_Sanctuary",
          ["match", ["get", "CATREA"], ["[3]", "[9]"], true, false],
          "N2_2_EntryProhibitedPoint",
          ["match", ["get", "RESTRN"], ["[3]", "[3,8]"], true, false],
          "N21_1_Fishing_ProhibitedPoint",
          ["match", ["get", "RESTRN"], ["[3,7]"], true, false],
          "N20_Fishing_Entry_Prohibited_Point",
          ["match", ["get", "RESTRN"], ["[1]"], true, false],
          "N20_AnchoringProhibitedPoint",
          ["match", ["get", "RESTRN"], ["[7]"], true, false],
          "N2_2_EntryProhibitedPoint",
          ["match", ["get", "RESTRN"], ["[8]"], true, false],
          "Dredging_prohibited",
          ["match", ["get", "RESTRN"], ["[11]"], true, false],
          "N21_2_Diving_ProhibitedPoint",
          [
            "match",
            ["get", "RESTRN"],
            ["[1,3]", "[1,3,5,9,18,20,24]"],
            true,
            false
          ],
          "N20_Anchoring_Fishing_Prohibited_Point",
          ["match", ["get", "RESTRN"], ["[1,5]"], true, false],
          "N20_AnchoringProhibitedPoint",
          ["match", ["get", "RESTRN"], ["[1,7]"], true, false],
          "N20_Anchoring_Entry_Prohibited_Point",
          ["match", ["get", "RESTRN"], ["[1,11]"], true, false],
          "N20_Anchoring_Diving_Prohibited_Point",
          ["match", ["get", "RESTRN"], ["[1,3,11]"], true, false],
          "N20_Anchoring_Fishing_Diving_Prohibited_Point",
          ["match", ["get", "RESTRN"], ["[1,3,7,11]"], true, false],
          "N20_Anchoring_Fishing_Entry_Diving_Prohibited_Point",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "OSPARE_POINT_restriction_symbol",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "OSPARE_POINT",
      "filter": ["has", "RESTRN"],
      "layout": {
        "icon-image": [
          "case",
          ["match", ["get", "RESTRN"], ["[1]"], true, false],
          "N20_AnchoringProhibitedPoint",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [1, 1.25],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": ["to-string", ["get", "OBJNAM"]]
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },
    {
      "id": "LNDELV_POINT",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LNDELV_POINT",
      "minzoom": 10,
      "layout": {
        "icon-image": "K10_LandPoint",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-field": ["get", "ELEVAT"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-font": ["Roboto"],
        "text-variable-anchor": [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left"
        ],
        "text-offset": [0.15, 0.15],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "SWPARE_POINT_depth",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SWPARE_POINT",
      "filter": ["has", "DRVAL1"],
      "minzoom": 14,
      "layout": {
        "icon-image": "I24_Swept_area",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-optional": false,
        "text-font": ["Roboto Italic"],
        "text-field": [
          "number-format",
          ["get", "DRVAL1"],
          {
            "locale": "sv-se",
            "min-fraction-digits": 0,
            "max-fraction-digits": 1
          }
        ],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-variable-anchor": ["center"],
        "text-offset": [0, 1],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "CBLOHD-symbol",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "CBLOHD_POINT",
      "filter": ["any", ["has", "VERCLR"], ["has", "VERCSA"]],
      "minzoom": 14,
      "layout": {
        "icon-image": "Vertical_clearance_2",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "top",
        "icon-rotation-alignment": "viewport",

        "text-optional": false,
        "text-font": ["Roboto"],
        "text-field": [
          "case",
          ["has", "VERCSA"],
          [
            "number-format",
            ["get", "VERCSA"],
            {
              "locale": "sv-se",
              "min-fraction-digits": 0,
              "max-fraction-digits": 1
            }
          ],
          [
            "number-format",
            ["get", "VERCLR"],
            {
              "locale": "sv-se",
              "min-fraction-digits": 0,
              "max-fraction-digits": 1
            }
          ]
        ],
        "text-anchor": "top",
        "text-offset": [0, 1.5],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-rotation-alignment": "viewport"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "CONVYR-symbol",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "CONVYR_POINT",
      "filter": ["has", "VERCLR"],
      "minzoom": 14,
      "layout": {
        "icon-image": "Vertical_clearance_2",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "top",
        "icon-rotation-alignment": "viewport",

        "text-optional": false,
        "text-font": ["Roboto"],
        "text-field": [
          "number-format",
          ["get", "VERCLR"],
          {
            "locale": "sv-se",
            "min-fraction-digits": 0,
            "max-fraction-digits": 1
          }
        ],
        "text-anchor": "top",
        "text-offset": [0, 1.5],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-rotation-alignment": "viewport"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },
    {
      "id": "DWRTPT_POINT",
      "minzoom": 10,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "DWRTPT_POINT",
      "layout": {
        "icon-image": "Direction_arrow",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-rotate": ["get", "ORIENT"],
        "icon-rotation-alignment": "map",

        "text-font": ["Roboto Bold"],
        "text-field": ["concat", "DW ", ["to-string", ["get", "DRVAL1"]], " m"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 2.75]
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "PRCARE_POINT",
      "minzoom": 10,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "PRCARE_POINT",
      "layout": {
        "icon-image": "M16_Precautionary_area",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-font": ["Roboto"],
        "text-field": "Precautionary Area",
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [1.1, 1.1],
        "text-variable-anchor": [
          "left",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "bottom"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "TWRTPT_POINT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "TWRTPT_POINT",
      "layout": {
        "icon-image": "Two_way_direction",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-rotate": ["get", "ORIENT"],
        "icon-rotation-alignment": "map",

        "text-font": ["Roboto Bold"],
        "text-field": ["concat", ["to-string", ["get", "DRVAL1"]], " m"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 3.25]
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "TSSLPT_POINT",
      "minzoom": 10,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "TSSLPT_POINT",
      "layout": {
        "icon-image": "M10_Mandatory_direction",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-rotate": ["get", "ORIENT"],
        "icon-rotation-alignment": "map"
      },
      "paint": {}
    },

    {
      "id": "RECTRC-symbol",
      "minzoom": 10,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "RECTRC",
      "filter": [
        "all",
        ["has", "ORIENT"],
        ["==", ["get", "CATTRK"], 1],
        ["!=", ["get", "COUNTRY_CODE"], "DK"]
      ],
      "layout": {
        "icon-allow-overlap": false,
        "icon-ignore-placement": false,
        "icon-image": "Direction_arrow",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-rotation-alignment": "map",
        "icon-rotate": 90,
        "symbol-placement": "line",
        "symbol-spacing": 400
      },
      "paint": {}
    },
    {
      "id": "RCTLPT",
      "minzoom": 10,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "RCTLPT",
      "layout": {
        "icon-image": "M11_Recommended_direction",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-rotate": ["get", "ORIENT"],
        "icon-rotation-alignment": "map"
      },
      "paint": {}
    },

    {
      "id": "AIRARE_symbol",
      "minzoom": 11,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "AIRARE",
      "layout": {
        "icon-image": "D17_Airport",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-field": ["get", "OBJNAM"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-font": ["Roboto"],
        "text-offset": [1.1, 1.1],
        "text-variable-anchor": [
          "left",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "bottom"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "CRANES",
      "minzoom": 14,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "CRANES",
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATCRN"],
          [2],
          "F53_2_Crane",
          [4],
          "F53_1_Crane",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-field": [
          "case",
          ["has", "LIFCAP"],
          ["concat", "(", ["get", "LIFCAP"], " t)"],
          ""
        ],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-font": ["Roboto"],
        "text-offset": [0.75, 0.75],
        "text-variable-anchor": [
          "left",
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BERTHS",
      "minzoom": 15,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BERTHS",
      "layout": {
        "icon-image": [
          "case",
          [">", ["length", ["get", "OBJNAM"]], 3],
          "Berths_wide",
          [">", ["length", ["get", "OBJNAM"]], 2],
          "Berths_medium",
          "Berths_circle"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-offset": [0, -1],

        "text-field": ["to-string", ["get", "OBJNAM"]],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          10,
          15,
          10,
          17,
          20
        ],
        "text-font": ["Roboto Bold"],
        "text-variable-anchor": ["center"]
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "BUISGL-icon",
      "minzoom": 14,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BUISGL",
      "layout": {
        "icon-image": [
          "match",
          ["get", "FUNCTN"],
          ["[2]"],
          "F60_Harbor_marsters_office",
          ["[3]"],
          "F61_Custom_office",
          ["[4]"],
          "F62_2_Hospital",
          ["[5]"],
          "F62_2_Hospital",
          ["[6]"],
          "F63_Post_office",
          ["[20]"],
          "E10_Church",
          ["case", ["==", ["geometry-type"], "Point"], "Building", "NO_SYMBOL"]
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {}
    },

    {
      "id": "ACHARE_POINT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "ACHARE_POINT",
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 1.25],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": ["get", "OBJNAM"],

        "icon-image": "N12_Anchorage",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },
    {
      "id": "ACHBRT_POINT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "ACHBRT_POINT",
      "layout": {
        "text-optional": false,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0],
        "text-variable-anchor": ["center"],
        "text-justify": "auto",
        "text-field": ["get", "OBJNAM"],

        "icon-image": "N11_1_Designated_Anchor_Berth",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)",
        "icon-translate": [0, -1]
      }
    },

    {
      "id": "PILBOP",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "PILBOP",
      "layout": {
        "icon-image": "T1_pilot_boarding_place",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 1.5],
        "text-variable-anchor": [
          "top",
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
          "bottom"
        ],
        "text-justify": "auto",
        "text-field": ["get", "OBJNAM"]
      },
      "paint": {
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "LNDMRK-point",
      "minzoom": 9,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LNDMRK",
      "filter": [
        "all",
        ["==", ["geometry-type"], "Point"],
        [
          "any",
          [">=", ["zoom"], 11],
          ["==", ["get", "COUNTRY_CODE"], "SE"],
          ["==", ["get", "COUNTRY_CODE"], "NO"]
        ]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "FUNCTN"],
          ["[20]"],
          "E10_Church",
          [
            "match",
            ["get", "CATLMK"],
            ["[]"],
            "F22_Post",
            ["[1]"],
            "Q100_Cairn",
            ["[3]"],
            "E22_Chimney",
            ["[6]"],
            "E23_Flare_stack",
            ["[7]"],
            [
              "match",
              ["get", "FUNCTN"],
              ["[30,31]", "[30,31,33]"],
              "E28_Radio_mast",
              "E2x_Mast"
            ],
            ["[9]", "[13]"],
            "E24_Monument",
            ["[15]"],
            "S26_Pylon",
            ["[17]"],
            [
              "match",
              ["get", "FUNCTN"],
              ["[30,31]", "[30,31,33]"],
              "E29_Radio_tower",
              "E20_Tower"
            ],
            ["[18]"],
            "E25_Windmill",
            ["[19]"],
            "E26_Windmotor",
            ["[17,20]", "[20]"],
            "E10_Church",
            "NO_SYMBOL"
          ]
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.5, 0.75],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": [
          "concat",
          ["case", ["has", "OBJNAM"], ["concat", ["get", "OBJNAM"], "\n"], ""],
          ["get", "LIGHTS_TEXT"]
        ]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "PYLONS",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "PYLONS",
      "layout": {
        "icon-image": "S26_Pylon",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-field": "Pyl",
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.75, 0.75],
        "text-variable-anchor": [
          "left",
          "top-left",
          "bottom-left",
          "top-right",
          "right",
          "top",
          "bottom-right",
          "bottom"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "SISTAT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SISTAT",
      "layout": {
        "icon-image": "S20_Signal_station",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-field": [
          "concat",
          ["case", ["has", "OBJNAM"], ["concat", ["get", "OBJNAM"], "\n"], ""],
          [
            "match",
            ["get", "CATSIT"],
            ["[1]"],
            "SS (Port Control)",
            ["[3]"],
            "SS (INT)",
            ["[6]"],
            "SS (Lock)",
            ["[8]"],
            "SS (Bridge)",
            ["[10]"],
            "SS (Traffic)",
            "SS"
          ]
        ],
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.75, 0.75],
        "text-variable-anchor": [
          "left",
          "top-left",
          "bottom-left",
          "top-right",
          "right",
          "top",
          "bottom-right",
          "bottom"
        ],
        "text-justify": "auto"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "PILPNT",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "PILPNT",
      "layout": {
        "icon-image": [
          "match",
          ["get", "CATPLE"],
          1,
          ["case", ["has", "LIGHTS_TEXT"], "P1_Light-fixed", "F22_Post"],
          3,
          ["case", ["has", "LIGHTS_TEXT"], "P1_Light-fixed", "F22_Post"],
          "P1_Light-fixed"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.75, 1.1],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": [
          "concat",
          ["case", ["has", "OBJNAM"], ["concat", ["get", "OBJNAM"], "\n"], ""],
          ["get", "LIGHTS_TEXT"]
        ]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },
    {
      "id": "MORFAC",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "MORFAC",
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0.75],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": [
          "concat",
          ["case", ["has", "OBJNAM"], ["concat", ["get", "OBJNAM"], "\n"], ""],
          ["get", "LIGHTS_TEXT"]
        ],
        "icon-image": [
          "match",
          ["get", "CATMOR"],
          1,
          "F20_Dolphin",
          2,
          "F21_Deviation_dolphin",
          3,
          "F20_Dolphin",
          5,
          "F22_Post",
          7,
          "Q40a_Mooring_buoy",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "TOPMAR",
      "minzoom": 9,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "TOPMAR",
      "filter": [
        "any",
        [">=", ["zoom"], 11],
        ["==", ["get", "COUNTRY_CODE"], "SE"],
        ["==", ["get", "COUNTRY_CODE"], "NO"]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "TOPSHP"],
          [1],
          [
            "match",
            ["get", "BCNSHP"],
            [1, 4, 5, 99],
            "Q9_Cone_point_up_D",
            [
              "match",
              ["get", "BOYSHP"],
              [4, 5, 99],
              [
                "match",
                ["get", "COLOUR"],
                ["[4]"],
                "Q9_Cone_point_up_A_G",
                "Q9_Cone_point_up_A"
              ],
              [1],
              [
                "match",
                ["get", "COLOUR"],
                ["[4]"],
                "Q9_Cone_point_up_B_G",
                "Q9_Cone_point_up_B"
              ],
              "Q9_Cone_point_up_D"
            ]
          ],
          [2],
          [
            "match",
            ["get", "BCNSHP"],
            [1, 4, 5, 99],
            "Q9_Cone_point_down_D",
            "Q9_Cone_point_down_A"
          ],
          [3],
          [
            "match",
            ["get", "BCNSHP"],
            [1, 4, 5, 99],
            "Q9_Sphere_D",
            [
              "match",
              ["get", "BOYSHP"],
              [3],
              "Q9_Sphere_E",
              [4, 5, 99],
              "Q9_Sphere_A",
              "Q9_Sphere_D"
            ]
          ],
          [4],
          [
            "match",
            ["get", "BCNSHP"],
            [1, 4, 5, 99],
            "Q9_2_spheres_D",
            [
              "match",
              ["get", "BOYSHP"],
              [4, 5, 99],
              "Q9_2_spheres_A",
              "Q9_2_spheres_D"
            ]
          ],
          [5],
          [
            "match",
            ["get", "BCNSHP"],
            [1, 3, 4, 5, 99],
            "Q9_Cylinder_D",
            [
              "match",
              ["get", "BOYSHP"],
              [1],
              [
                "match",
                ["get", "COLOUR"],
                ["[3]"],
                "Q9_Cylinder_B_R",
                "Q9_Cylinder_B"
              ],
              [2, 3],
              [
                "match",
                ["get", "COLOUR"],
                ["[3]"],
                "Q9_Cylinder_E_R",
                "Q9_Cylinder_E"
              ],
              [4, 5, 99],
              [
                "match",
                ["get", "COLOUR"],
                ["[3]"],
                "Q9_Cylinder_A_R",
                "Q9_Cylinder_A"
              ],
              "Q9_Cylinder_D"
            ]
          ],
          [7],
          [
            "match",
            ["get", "BOYSHP"],
            [1],
            "Q9_Xshape_B",
            [2, 3],
            "Q9_Xshape_E",
            [6, 7],
            "Q9_Xshape_C",
            [4, 5, 99],
            "Q9_Xshape_A",
            [
              "match",
              ["get", "BCNSHP"],
              [1, 4, 5, 99],
              "Q9_Xshape_D",
              "Q9_Xshape_D"
            ]
          ],
          [10],
          "Q9_2_cones_point_to_point_A",
          [11],
          "Q9_2_cones_base_to_base_A",
          [12],
          "Q9_Rhombus_D",
          [13],
          [
            "match",
            ["get", "BOYSHP"],
            [4, 5, 99],
            "Q9_2_cones_points_upward_A",
            "Q9_2_cones_points_upward_D"
          ],
          [14],
          [
            "match",
            ["get", "BOYSHP"],
            [4, 5, 99],
            "Q9_2_cones_points_downward_A",
            "Q9_2_cones_points_downward_D"
          ],
          [17],
          [
            "match",
            ["get", "BOYSHP"],
            [1],
            "Q9_Flag_B",
            [2, 3],
            "Q9_Flag_E",
            "Q9_Flag_A"
          ],
          [18],
          "Q9_Sphere_over_rhombus_D",
          [19],
          "Q9_Square_D",
          [21],
          "Q9_Rectangle_vertical_D",
          [24],
          "Q9_Triangle_point_up_D",
          [25],
          "Q9_Triangle_point_down_D",
          [26],
          "Q9_Circle_D",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "BEACONS-colour",
      "minzoom": 9,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BEACONS",
      "filter": [
        "any",
        [">=", ["zoom"], 11],
        ["==", ["get", "COUNTRY_CODE"], "SE"],
        ["==", ["get", "COUNTRY_CODE"], "NO"]
      ],
      "layout": {
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-field": ["get", "COLOUR_TEXT"],
        "text-offset": [0.5, 0.75],
        "text-variable-anchor": [
          "top",
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
          "right",
          "left"
        ]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BEACONS-outer",
      "minzoom": 9,
      "maxzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BEACONS",
      "filter": [
        "any",
        [">=", ["zoom"], 11],
        ["==", ["get", "COUNTRY_CODE"], "SE"],
        ["==", ["get", "COUNTRY_CODE"], "NO"]
      ],
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0.75],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": [
          "concat",
          [
            "case",
            ["has", "OBJNAM"],
            [
              "concat",
              ["get", "OBJNAM"],
              [
                "case",
                ["has", "STATUS_TEXT"],
                ["concat", " ", ["get", "STATUS_TEXT"]],
                ""
              ],
              "\n"
            ],
            ""
          ],
          ["get", "LIGHTS_TEXT"]
        ],
        "icon-image": [
          "match",
          ["get", "BCNSHP"],
          [1, 2],
          "Q90_Stake_pole",
          3,
          "P1_Light-fixed",
          4,
          "Q111_Lattice_beacon",
          6,
          "Q100_Cairn",
          "Q81_Beacon"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BEACONS",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BEACONS",
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0.75],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": [
          "concat",
          [
            "case",
            ["has", "OBJNAM"],
            [
              "concat",
              ["get", "OBJNAM"],
              [
                "case",
                ["has", "STATUS_TEXT"],
                ["concat", " ", ["get", "STATUS_TEXT"]],
                ""
              ],
              "\n"
            ],
            ""
          ],
          ["get", "LIGHTS_TEXT"]
        ],
        "icon-image": [
          "match",
          ["get", "BCNSHP"],
          [1, 2],
          "Q90_Stake_pole",
          3,
          "Q110_Beacon_tower",
          4,
          "Q111_Lattice_beacon",
          6,
          "Q100_Cairn",
          "Q81_Beacon"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BOYS-colour",
      "minzoom": 9,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BOYS",
      "filter": [
        "any",
        [">=", ["zoom"], 11],
        ["==", ["get", "COUNTRY_CODE"], "SE"],
        ["==", ["get", "COUNTRY_CODE"], "NO"]
      ],
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.5, 0.75],
        "text-variable-anchor": [
          "top",
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
          "right",
          "left"
        ],
        "text-justify": "auto",
        "text-field": ["get", "COLOUR_TEXT"]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },
    {
      "id": "BOYS",
      "minzoom": 9,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BOYS",
      "filter": [
        "any",
        [">=", ["zoom"], 11],
        ["==", ["get", "COUNTRY_CODE"], "SE"],
        ["==", ["get", "COUNTRY_CODE"], "NO"]
      ],
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0.75],
        "text-variable-anchor": ["top", "top-right", "top-left"],
        "text-justify": "auto",
        "text-field": [
          "concat",
          ["case", ["has", "OBJNAM"], ["concat", ["get", "OBJNAM"], "\n"], ""],
          ["get", "LIGHTS_TEXT"]
        ],
        "icon-image": [
          "match",
          ["get", "BOYSHP"],
          [1],
          [
            "match",
            ["get", "COLOUR"],
            ["[2]"],
            "Q20b_Conical_buoy",
            ["[3]"],
            "Q20b_Conical_buoy_R",
            ["[4]"],
            "Q20b_Conical_buoy_G",
            "Q20a_Conical_buoy"
          ],
          [2],
          [
            "match",
            ["get", "COLOUR"],
            ["[3]"],
            "Q21b_Can_buoy_R",
            ["[4]"],
            "Q21b_Can_buoy_G",
            "Q21a_Can_buoy"
          ],
          [3],
          [
            "match",
            ["get", "COLPAT"],
            ["[2]"],
            "Q22c_Spherical_buoy",
            "Q22a_Spherical_buoy"
          ],
          [4],
          [
            "match",
            ["get", "COLPAT"],
            ["[2]"],
            "Q23c_Pillar_buoy",
            [
              "match",
              ["get", "COLOUR"],
              ["[2]"],
              "Q23b_Pillar_buoy",
              ["[3]"],
              "Q23b_Pillar_buoy_R",
              ["[4]"],
              "Q23b_Pillar_buoy_G",
              "Q23_Pillar_buoy"
            ]
          ],
          [5],
          [
            "match",
            ["get", "COLOUR"],
            ["[3]"],
            "Q24_Spar_buoy_R",
            ["[4]"],
            "Q24_Spar_buoy_G",
            "Q24_Spar_buoy"
          ],
          [6],
          "Q25a_Barrel_buoy",
          [7],
          "Q26_Super_buoy",
          "Q24_Spar_buoy"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BEACONS-radar-reflectors",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BEACONS",
      "filter": ["has", "CONRAD"],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CONRAD"],
          [1],
          "S5_Radar_conspicuous",
          [2],
          "S4_Radar_reflector",
          [3],
          "S4_Radar_reflector",
          "S4_Radar_reflector"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "BOYS-radar-reflectors",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BOYS",
      "filter": ["has", "CONRAD"],
      "layout": {
        "icon-image": [
          "match",
          ["get", "CONRAD"],
          [1],
          "S5_Radar_conspicuous",
          [2],
          "S4_Radar_reflector",
          [3],
          "S4_Radar_reflector",
          "S4_Radar_reflector"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "POINTR-icon",
      "minzoom": 14,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "POINTR",
      "layout": {
        "icon-image": [
          "match",
          ["get", "SYMBOL"],
          "391.121",
          "Swimming",
          "391.107",
          "Antiquities",
          "391.002",
          "D18_Heliport",
          "NO_SYMBOL"
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      }
    },

    {
      "id": "SMCFAC-point-berth-longside",
      "minzoom": 16,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SMCFAC",
      "filter": [
        "all",
        ["==", ["geometry-type"], "Point"],
        ["==", ["get", "CATSCF"], 1],
        ["match", ["get", "SYMBOL"], ["392.002"], true, false]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "SYMBOL"],
          ["392.002"],
          "Berth_longside",
          "NO_SYMBOL"
        ],
        "icon-rotate": ["*", -1, ["get", "ANGLE"]],
        "icon-rotation-alignment": "map",
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          0.5,
          17,
          1,
          20,
          2
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": false
      }
    },

    {
      "id": "SMCFAC-point-berth-front",
      "minzoom": 15,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SMCFAC",
      "filter": [
        "all",
        ["==", ["geometry-type"], "Point"],
        ["==", ["get", "CATSCF"], 1],
        ["match", ["get", "SYMBOL"], ["392.002"], false, true]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "SYMBOL"],
          ["391.502"],
          "Visitors_Berth_piles",
          ["391.504"],
          "Visitors_Berth_Y-booms",
          ["391.508"],
          "Visitors_Berth_buoy_from_the_stern",
          ["391.509"],
          "Visitors_Berth_mooring_line",
          ["391.512"],
          "Visitors_Berth_anchor_from_the_stern",
          ["391.602"],
          "Assigned_Berth_piles",
          ["391.604"],
          "Assigned_Berth_Y-booms",
          ["391.608"],
          "Assigned_Berth_buoy_from_the_stern",
          ["391.609"],
          "Assigned_Berth_mooring_line",
          ["391.612"],
          "Assigned_Berth_anchor_from_the_stern",
          ["392.002"],
          "Berth_longside",
          "NO_SYMBOL"
        ],
        "icon-rotate": ["*", -1, ["get", "ANGLE"]],
        "icon-rotation-alignment": "map",
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0.5,
          16,
          1,
          17,
          2
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": false,
        "icon-offset": [0, -1]
      }
    },

    {
      "id": "SMCFAC-point-berth-side",
      "minzoom": 15,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SMCFAC",
      "filter": [
        "all",
        ["==", ["geometry-type"], "Point"],
        ["==", ["get", "CATSCF"], 1],
        ["match", ["get", "SYMBOL"], ["391.5", "391.6"], true, false]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "SYMBOL"],
          ["391.5"],
          "Visitors_Berth_alongside",
          ["391.6"],
          "Assigned_Berth_alongside",
          "NO_SYMBOL"
        ],
        "icon-rotate": ["*", -1, ["get", "ANGLE"]],
        "icon-rotation-alignment": "map",
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0.5,
          16,
          1,
          17,
          2
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": false,
        "icon-offset": [0, -1]
      }
    },

    {
      "id": "SMCFAC-point-simple",
      "minzoom": 14,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "SMCFAC",
      "filter": [
        "all",
        ["==", ["geometry-type"], "Point"],
        ["!=", ["get", "CATSCF"], 1]
      ],
      "layout": {
        "icon-image": [
          "match",
          ["get", "SYMBOL"],
          ["392.0"],
          "Mountain_loop",
          ["390.005"],
          "Q40a_Mooring_buoy",
          ["359.0"],
          "U26_2_Sewerage_pump_out_station_on_water",
          ["359.003"],
          "U26_Sewerage_pump_out_station",
          ["391.027"],
          "U23_Public_toilet",
          ["391.005"],
          "Dry_toilet",
          ["391.047"],
          "U18_Fuel_station",
          ["391.073"],
          "F53_1_Crane",
          "NO_SYMBOL"
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2]
      }
    },

    {
      "id": "BRIDGE_POINT_HORCLR",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BRIDGE_POINT",
      "filter": ["has", "HORCLR"],
      "minzoom": 14,
      "layout": {
        "icon-image": "Horisontal_clearance",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "top",

        "text-optional": false,
        "text-font": ["Roboto"],
        "text-field": [
          "number-format",
          ["get", "HORCLR"],
          {
            "locale": "sv-se",
            "min-fraction-digits": 0,
            "max-fraction-digits": 1
          }
        ],
        "text-anchor": "top",
        "text-offset": [0, 2],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-rotation-alignment": "viewport"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },
    {
      "id": "BRIDGE_POINT_VERCLR",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BRIDGE_POINT",
      "filter": ["has", "VERCLR"],
      "minzoom": 14,
      "layout": {
        "icon-image": "Vertical_clearance",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "center",

        "text-optional": false,
        "text-font": ["Roboto"],
        "text-field": [
          "concat",
          "(",
          [
            "number-format",
            ["get", "VERCLR"],
            {
              "locale": "sv-se",
              "min-fraction-digits": 0,
              "max-fraction-digits": 1
            }
          ],
          ")"
        ],
        "text-anchor": "center",
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0.05]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BRIDGE_POINT_VERCCL",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BRIDGE_POINT",
      "filter": ["has", "VERCCL"],
      "minzoom": 14,
      "layout": {
        "icon-image": "Vertical_clearance",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "left",

        "text-optional": false,
        "text-font": ["Roboto"],
        "text-field": [
          "concat",
          "(",
          [
            "number-format",
            ["get", "VERCCL"],
            {
              "locale": "sv-se",
              "min-fraction-digits": 0,
              "max-fraction-digits": 1
            }
          ],
          ")"
        ],
        "text-anchor": "left",
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [1.5, 0.05]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BRIDGE_POINT_VERCOP",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BRIDGE_POINT",
      "filter": ["has", "VERCOP"],
      "minzoom": 14,
      "layout": {
        "icon-image": "Vertical_clearance",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "bottom",

        "text-optional": false,
        "text-font": ["Roboto"],
        "text-field": [
          "concat",
          "(open ",
          [
            "number-format",
            ["get", "VERCOP"],
            {
              "locale": "sv-se",
              "min-fraction-digits": 0,
              "max-fraction-digits": 1
            }
          ],
          ")"
        ],
        "text-anchor": "bottom",
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, -1.9]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },

    {
      "id": "BRIDGE_POINT_OPENING",
      "type": "symbol",
      "source": "nautical",
      "source-layer": "BRIDGE_POINT",
      "filter": [
        "match",
        ["get", "CATBRG"],
        ["[2]", "[3]", "[4]", "[5]", "[6]", "[7]"],
        true,
        false
      ],
      "minzoom": 14,
      "layout": {
        "icon-image": "Opening_bridge",
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "center"
      },
      "paint": {}
    },
    {
      "id": "RDOCAL_point",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "RDOCAL",
      "filter": ["match", ["geometry-type"], ["Point"], true, false],
      "layout": {
        "icon-image": [
          "match",
          ["get", "TRAFIC"],
          [1],
          "M40_2_Radio_reporting",
          [2],
          "M40_2_Radio_reporting",
          [3],
          "M40_2_Radio_reporting",
          [4],
          "M40_1_Radio_reporting",
          "NO_SYMBOL"
        ],

        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-rotate": ["get", "ORIENT"],
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "text-optional": false,
        "text-font": ["Roboto Medium"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0, 0],
        "text-anchor": "center",
        "text-field": [
          "case",
          ["has", "OBJNAM"],
          ["get", "OBJNAM"],
          ["has", "COMCHA"],
          ["get", "COMCHA"],
          ""
        ]
      },
      "paint": {
        "icon-translate": [0, -1],
        "text-color": "hsl(336, 91%, 65%)"
      }
    },

    {
      "id": "LIGHTHOUSES-colour",
      "minzoom": 12,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LIGHTHOUSES",
      "layout": {
        "text-optional": true,
        "text-font": ["Roboto"],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          15,
          11,
          17,
          22
        ],
        "text-offset": [0.5, 0.75],
        "text-variable-anchor": [
          "top",
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
          "right",
          "left"
        ],
        "text-justify": "auto",
        "text-field": ["get", "COLOUR_TEXT"]
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)"
      }
    },
    {
      "id": "LIGHTHOUSES-icon",
      "minzoom": 8,
      "type": "symbol",
      "source": "nautical",
      "source-layer": "LIGHTHOUSES",
      "filter": [
        ">=",
        ["zoom"],
        ["match", ["get", "COUNTRY_CODE"], "FI", 10, 9]
      ],
      "layout": {
        "icon-image": [
          "step",
          ["zoom"],
          "P1_Light-fixed",
          11,
          [
            "case",
            ["get", "HAS_TOPMARK"],
            "P1_Light-fixed_topmark",
            "P1_Light-fixed"
          ]
        ],
        "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 2],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {}
    }
  ]
};

