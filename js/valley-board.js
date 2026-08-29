/* Auto-generated from scripts/valley_network.py — run: python scripts/valley_to_js.py */
const VALLEY_BOARD = {
  "nodes": [
    {
      "id": "edgar",
      "blueprint": "N01",
      "name": "Edgar's Tower",
      "sector": "A",
      "x": 15,
      "y": 5,
      "type": "tower",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Safe High Ground",
      "note": "Electrical tower west of the canyon road. Graboids cannot climb."
    },
    {
      "id": "radio",
      "blueprint": "N02",
      "name": "Roadworks / Tel Cut",
      "sector": "A",
      "x": 50,
      "y": 5,
      "type": "open",
      "search": 4,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Search Hub",
      "note": "Roadworks and telephone cut on the Bixby approach. The line is dead."
    },
    {
      "id": "old_fred",
      "blueprint": "N03",
      "name": "Old Fred's Farm",
      "sector": "A",
      "x": 75,
      "y": 10,
      "type": "open",
      "search": 4,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Search Hub",
      "note": "Fred's sheep pens. Something left very little behind."
    },
    {
      "id": "canyon_south",
      "blueprint": "N04",
      "name": "Canyon Rd South",
      "sector": "A",
      "x": 45,
      "y": 18,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 Canyon Rd South."
    },
    {
      "id": "clinic",
      "blueprint": "N05",
      "name": "Dr. Jim's Homestead",
      "sector": "D",
      "x": 45,
      "y": 30,
      "type": "open",
      "search": 4,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Search Hub",
      "note": "Search Hub \u2014 Dr. Jim's Homestead."
    },
    {
      "id": "school",
      "blueprint": "N06",
      "name": "Horse Path 1",
      "sector": "C",
      "x": 30,
      "y": 35,
      "type": "open",
      "search": 1,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Safe Boulders",
      "note": "Horse Path 1 \u2014 pole-vault rocks toward the water tower.",
      "boulder": true
    },
    {
      "id": "rhonda",
      "blueprint": "N07",
      "name": "Horse Path 2",
      "sector": "C",
      "x": 28,
      "y": 45,
      "type": "open",
      "search": 1,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Safe Boulders",
      "note": "Horse Path 2 \u2014 Rhonda's seismograph stakes along the boulder route.",
      "boulder": true
    },
    {
      "id": "horse_path_3",
      "blueprint": "N08",
      "name": "Horse Path 3",
      "sector": "C",
      "x": 26,
      "y": 55,
      "type": "open",
      "search": 1,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Safe Boulders",
      "note": "Horse Path 3 \u2014 residual boulders; Graboids cannot surface here once known.",
      "boulder": true
    },
    {
      "id": "canyon_mid",
      "blueprint": "N09",
      "name": "Canyon Rd Mid",
      "sector": "A",
      "x": 45,
      "y": 42,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 Canyon Rd Mid."
    },
    {
      "id": "canyon_north",
      "blueprint": "N10",
      "name": "Canyon Rd North",
      "sector": "A",
      "x": 45,
      "y": 54,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 Canyon Rd North."
    },
    {
      "id": "val_earl",
      "blueprint": "N11",
      "name": "Val & Earl's",
      "sector": "B",
      "x": 38,
      "y": 58,
      "type": "building",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Micro-Safe Roof",
      "note": "Micro-Safe Roof \u2014 Val & Earl's."
    },
    {
      "id": "fuel",
      "blueprint": "N12",
      "name": "Chang's Trailer",
      "sector": "B",
      "x": 38,
      "y": 64,
      "type": "metal",
      "search": 2,
      "noiseMod": 2,
      "defence": 0,
      "terrain": "Micro-Safe Roof",
      "note": "Micro-Safe Roof \u2014 Chang's Trailer."
    },
    {
      "id": "water",
      "blueprint": "N13",
      "name": "Water Tower",
      "sector": "B",
      "x": 38,
      "y": 70,
      "type": "tower",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Safe High Ground",
      "note": "Safe High Ground \u2014 Water Tower."
    },
    {
      "id": "store",
      "blueprint": "N14",
      "name": "Chang's Store",
      "sector": "B",
      "x": 38,
      "y": 76,
      "type": "building",
      "search": 3,
      "noiseMod": 1,
      "defence": 2,
      "terrain": "Fortified Hub",
      "note": "Fortified Hub \u2014 Chang's Store."
    },
    {
      "id": "bar",
      "blueprint": "N15",
      "name": "Melvin's Shack",
      "sector": "B",
      "x": 38,
      "y": 81,
      "type": "building",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Micro-Safe Roof",
      "note": "Micro-Safe Roof \u2014 Melvin's Shack."
    },
    {
      "id": "trailer",
      "blueprint": "N16",
      "name": "Nestor's Trailer",
      "sector": "B",
      "x": 38,
      "y": 86,
      "type": "building",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Micro-Safe Roof",
      "note": "Micro-Safe Roof \u2014 Nestor's Trailer."
    },
    {
      "id": "main_south",
      "blueprint": "N17",
      "name": "Main St South",
      "sector": "B",
      "x": 46,
      "y": 60,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 Main St South."
    },
    {
      "id": "main_central",
      "blueprint": "N18",
      "name": "Main St Central",
      "sector": "B",
      "x": 46,
      "y": 73,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 Main St Central."
    },
    {
      "id": "main_north",
      "blueprint": "N19",
      "name": "Main St North",
      "sector": "B",
      "x": 46,
      "y": 84,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 Main St North."
    },
    {
      "id": "melvin_trailer",
      "blueprint": "N20",
      "name": "Melvin's Trailer",
      "sector": "B",
      "x": 55,
      "y": 60,
      "type": "building",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Micro-Safe Roof",
      "note": "Micro-Safe Roof \u2014 Melvin's Trailer."
    },
    {
      "id": "quonset",
      "blueprint": "N21",
      "name": "Quonset Bldg",
      "sector": "B",
      "x": 55,
      "y": 66,
      "type": "building",
      "search": 3,
      "noiseMod": 1,
      "defence": 2,
      "terrain": "Fortified Hub",
      "note": "Fortified Hub \u2014 Quonset Bldg."
    },
    {
      "id": "caterpillar",
      "blueprint": "N22",
      "name": "Bulldozer Site",
      "sector": "D",
      "x": 72,
      "y": 65,
      "type": "metal",
      "search": 2,
      "noiseMod": 2,
      "defence": 1,
      "terrain": "Search Hub",
      "note": "Bulldozer site \u2014 Nestor's CAT and earth-mover trailer."
    },
    {
      "id": "workshop",
      "blueprint": "N23",
      "name": "Junkyard",
      "sector": "D",
      "x": 60,
      "y": 75,
      "type": "metal",
      "search": 3,
      "noiseMod": 2,
      "defence": 1,
      "terrain": "Exposed Dirt",
      "note": "Junkyard salvage; old mining foundations under the dirt."
    },
    {
      "id": "nancy",
      "blueprint": "N24",
      "name": "Nancy's House",
      "sector": "B",
      "x": 56,
      "y": 83,
      "type": "building",
      "search": 3,
      "noiseMod": 1,
      "defence": 2,
      "terrain": "Fortified Hub",
      "note": "Fortified Hub \u2014 Nancy's House."
    },
    {
      "id": "cottage",
      "blueprint": "N25",
      "name": "Abandoned Cottage",
      "sector": "B",
      "x": 56,
      "y": 88,
      "type": "building",
      "search": 2,
      "noiseMod": 1,
      "defence": 1,
      "terrain": "Micro-Safe Roof",
      "note": "Micro-Safe Roof \u2014 Abandoned Cottage."
    },
    {
      "id": "west_flat_e",
      "blueprint": "N26",
      "name": "West Flat East",
      "sector": "C",
      "x": 32,
      "y": 65,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 West Flat East."
    },
    {
      "id": "west_flat_gate",
      "blueprint": "N27",
      "name": "West Flat Gate",
      "sector": "C",
      "x": 20,
      "y": 68,
      "type": "road",
      "search": 1,
      "noiseMod": 1,
      "defence": 0,
      "terrain": "Exposed Dirt",
      "note": "Exposed Dirt \u2014 West Flat Gate."
    },
    {
      "id": "burt_gate",
      "blueprint": "N28",
      "name": "Gummer Gate",
      "sector": "C",
      "x": 10,
      "y": 70,
      "type": "building",
      "search": 3,
      "noiseMod": 1,
      "defence": 2,
      "terrain": "Fortified Hub",
      "note": "Fortified Hub \u2014 Gummer Gate."
    },
    {
      "id": "burt",
      "blueprint": "N29",
      "name": "Gummer Armory",
      "sector": "C",
      "x": 5,
      "y": 75,
      "type": "building",
      "search": 3,
      "noiseMod": 1,
      "defence": 2,
      "terrain": "Fortified Hub",
      "note": "Gummer Armory \u2014 basement rec room and the big guns."
    },
    {
      "id": "cat_path",
      "blueprint": "N30",
      "name": "Cat Path",
      "sector": "E",
      "x": 50,
      "y": 93,
      "type": "open",
      "search": 1,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Safe Boulders",
      "note": "Safe Boulders \u2014 Cat Path.",
      "boulder": true
    },
    {
      "id": "cliff_approach",
      "blueprint": "N31",
      "name": "Cliff Approach",
      "sector": "E",
      "x": 70,
      "y": 95,
      "type": "open",
      "search": 1,
      "noiseMod": 0,
      "defence": 0,
      "terrain": "Safe Boulders",
      "note": "Safe Boulders \u2014 Cliff Approach.",
      "boulder": true
    },
    {
      "id": "highway",
      "blueprint": "N32",
      "name": "Cliff Edge",
      "sector": "E",
      "x": 90,
      "y": 95,
      "type": "road",
      "search": 0,
      "noiseMod": 2,
      "defence": 0,
      "terrain": "Hazard / Trap",
      "note": "Cliff Edge \u2014 stampede gambit and valley exit.",
      "hazard": true
    }
  ],
  "routes": [
    [
      "bar",
      "store"
    ],
    [
      "bar",
      "trailer"
    ],
    [
      "burt",
      "burt_gate"
    ],
    [
      "burt_gate",
      "west_flat_gate"
    ],
    [
      "canyon_mid",
      "canyon_north"
    ],
    [
      "canyon_mid",
      "clinic"
    ],
    [
      "canyon_north",
      "main_south"
    ],
    [
      "canyon_south",
      "clinic"
    ],
    [
      "canyon_south",
      "edgar"
    ],
    [
      "canyon_south",
      "radio"
    ],
    [
      "cat_path",
      "cliff_approach"
    ],
    [
      "cat_path",
      "main_north"
    ],
    [
      "caterpillar",
      "quonset"
    ],
    [
      "caterpillar",
      "workshop"
    ],
    [
      "cliff_approach",
      "highway"
    ],
    [
      "clinic",
      "school"
    ],
    [
      "cottage",
      "main_north"
    ],
    [
      "cottage",
      "nancy"
    ],
    [
      "fuel",
      "val_earl"
    ],
    [
      "fuel",
      "water"
    ],
    [
      "fuel",
      "west_flat_e"
    ],
    [
      "horse_path_3",
      "rhonda"
    ],
    [
      "horse_path_3",
      "water"
    ],
    [
      "main_central",
      "main_north"
    ],
    [
      "main_central",
      "main_south"
    ],
    [
      "main_central",
      "quonset"
    ],
    [
      "main_central",
      "store"
    ],
    [
      "main_central",
      "water"
    ],
    [
      "main_central",
      "workshop"
    ],
    [
      "main_north",
      "nancy"
    ],
    [
      "main_north",
      "trailer"
    ],
    [
      "main_south",
      "melvin_trailer"
    ],
    [
      "main_south",
      "val_earl"
    ],
    [
      "main_south",
      "west_flat_e"
    ],
    [
      "melvin_trailer",
      "quonset"
    ],
    [
      "nancy",
      "workshop"
    ],
    [
      "old_fred",
      "radio"
    ],
    [
      "rhonda",
      "school"
    ],
    [
      "store",
      "water"
    ],
    [
      "west_flat_e",
      "west_flat_gate"
    ]
  ],
  "streets": [
    {
      "id": "canyon",
      "name": "Canyon Rd",
      "x1": 45,
      "y1": 5,
      "x2": 45,
      "y2": 58
    },
    {
      "id": "main",
      "name": "Main St",
      "x1": 46,
      "y1": 58,
      "x2": 46,
      "y2": 88
    },
    {
      "id": "west_row",
      "name": "West lots",
      "x1": 38,
      "y1": 56,
      "x2": 38,
      "y2": 88
    },
    {
      "id": "burt_lane",
      "name": "Gummer lane",
      "x1": 32,
      "y1": 64,
      "x2": 5,
      "y2": 74
    },
    {
      "id": "south_rim",
      "name": "Cliff trail",
      "x1": 50,
      "y1": 90,
      "x2": 90,
      "y2": 95
    }
  ],
  "solidRockNodes": [
    "edgar",
    "school",
    "rhonda",
    "horse_path_3",
    "water",
    "workshop",
    "cat_path",
    "cliff_approach"
  ],
  "sectors": {
    "A": {
      "name": "North Canyon",
      "adjacent": [
        "B",
        "C",
        "D"
      ]
    },
    "B": {
      "name": "Town Centre",
      "adjacent": [
        "A",
        "C",
        "D",
        "E"
      ]
    },
    "C": {
      "name": "West Compound",
      "adjacent": [
        "A",
        "B",
        "D",
        "E"
      ]
    },
    "D": {
      "name": "East Yard",
      "adjacent": [
        "A",
        "B",
        "C",
        "E"
      ]
    },
    "E": {
      "name": "South Cliffs",
      "adjacent": [
        "B",
        "C",
        "D"
      ]
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = { VALLEY_BOARD };
}
