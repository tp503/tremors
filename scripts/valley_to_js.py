#!/usr/bin/env python3
"""Emit js/valley-board.js from scripts/valley_network.py (single source of truth)."""

from __future__ import annotations

import json
from pathlib import Path

# Import graph from valley_network
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from valley_network import edges, nodes_data  # noqa: E402

# Blueprint Nxx -> engine slug (legacy ids kept where they match gameplay)
SLUG = {
    "N01": "edgar",
    "N02": "radio",
    "N03": "old_fred",
    "N04": "canyon_south",
    "N05": "clinic",
    "N06": "school",
    "N07": "rhonda",
    "N08": "horse_path_3",
    "N09": "canyon_mid",
    "N10": "canyon_north",
    "N11": "val_earl",
    "N12": "fuel",
    "N13": "water",
    "N14": "store",
    "N15": "bar",
    "N16": "trailer",
    "N17": "main_south",
    "N18": "main_central",
    "N19": "main_north",
    "N20": "melvin_trailer",
    "N21": "quonset",
    "N22": "caterpillar",
    "N23": "workshop",
    "N24": "nancy",
    "N25": "cottage",
    "N26": "west_flat_e",
    "N27": "west_flat_gate",
    "N28": "burt_gate",
    "N29": "burt",
    "N30": "cat_path",
    "N31": "cliff_approach",
    "N32": "highway",
}

TERRAIN = {
    "Fortified Hub": {"type": "building", "search": 3, "noiseMod": 1, "defence": 2},
    "Safe High Ground": {"type": "tower", "search": 2, "noiseMod": 1, "defence": 1},
    "Safe Boulders": {"type": "open", "search": 1, "noiseMod": 0, "defence": 0, "boulder": True},
    "Micro-Safe Roof": {"type": "building", "search": 2, "noiseMod": 1, "defence": 1},
    "Exposed Dirt": {"type": "road", "search": 1, "noiseMod": 1, "defence": 0},
    "Search Hub": {"type": "open", "search": 4, "noiseMod": 0, "defence": 0},
    "Hazard / Trap": {"type": "road", "search": 0, "noiseMod": 2, "defence": 0, "hazard": True},
}

SECTOR = {
    "N01": "A",
    "N02": "A",
    "N03": "A",
    "N04": "A",
    "N09": "A",
    "N10": "A",
    "N05": "D",
    "N06": "C",
    "N07": "C",
    "N08": "C",
    "N11": "B",
    "N12": "B",
    "N13": "B",
    "N14": "B",
    "N15": "B",
    "N16": "B",
    "N17": "B",
    "N18": "B",
    "N19": "B",
    "N20": "B",
    "N21": "B",
    "N24": "B",
    "N25": "B",
    "N26": "C",
    "N27": "C",
    "N28": "C",
    "N29": "C",
    "N22": "D",
    "N23": "D",
    "N30": "E",
    "N31": "E",
    "N32": "E",
}

NOTES = {
    "edgar": "Electrical tower west of the canyon road. Graboids cannot climb.",
    "radio": "Roadworks and telephone cut on the Bixby approach. The line is dead.",
    "old_fred": "Fred's sheep pens. Something left very little behind.",
    "rhonda": "Horse Path 2 — Rhonda's seismograph stakes along the boulder route.",
    "school": "Horse Path 1 — pole-vault rocks toward the water tower.",
    "horse_path_3": "Horse Path 3 — residual boulders; Graboids cannot surface here once known.",
    "highway": "Cliff Edge — stampede gambit and valley exit.",
    "burt": "Gummer Armory — basement rec room and the big guns.",
    "workshop": "Junkyard salvage; old mining foundations under the dirt.",
    "caterpillar": "Bulldozer site — Nestor's CAT and earth-mover trailer.",
}

# Engine overrides (gameplay types differ from blueprint category)
OVERRIDES = {
    "N12": {"type": "metal", "search": 2, "noiseMod": 2, "defence": 0},
    "N22": {"type": "metal", "search": 2, "noiseMod": 2, "defence": 1},
    "N23": {"type": "metal", "search": 3, "noiseMod": 2, "defence": 1},
}


def main() -> None:
    nodes = []
    for nid, data in nodes_data.items():
        slug = SLUG[nid]
        t = TERRAIN[data["type"]]
        x, y = data["pos"]
        node = {
            "id": slug,
            "blueprint": nid,
            "name": data["name"],
            "sector": SECTOR[nid],
            "x": x,
            "y": y,
            "type": t["type"],
            "search": t["search"],
            "noiseMod": t["noiseMod"],
            "defence": t["defence"],
            "terrain": data["type"],
            "note": NOTES.get(slug, f"{data['type']} — {data['name']}."),
        }
        if t.get("boulder"):
            node["boulder"] = True
        if t.get("hazard"):
            node["hazard"] = True
        if nid in OVERRIDES:
            node.update(OVERRIDES[nid])
        nodes.append(node)

    routes = sorted({tuple(sorted((SLUG[a], SLUG[b]))) for a, b in edges})

    solid = [n["id"] for n in nodes if n.get("boulder") or n["id"] in ("water", "edgar", "workshop")]

    streets = [
        {"id": "canyon", "name": "Canyon Rd", "x1": 45, "y1": 5, "x2": 45, "y2": 58},
        {"id": "main", "name": "Main St", "x1": 46, "y1": 58, "x2": 46, "y2": 88},
        {"id": "west_row", "name": "West lots", "x1": 38, "y1": 56, "x2": 38, "y2": 88},
        {"id": "burt_lane", "name": "Gummer lane", "x1": 32, "y1": 64, "x2": 5, "y2": 74},
        {"id": "south_rim", "name": "Cliff trail", "x1": 50, "y1": 90, "x2": 90, "y2": 95},
    ]

    board = {
        "nodes": nodes,
        "routes": routes,
        "streets": streets,
        "solidRockNodes": solid,
        "sectors": {
            "A": {"name": "North Canyon", "adjacent": ["B", "C", "D"]},
            "B": {"name": "Town Centre", "adjacent": ["A", "C", "D", "E"]},
            "C": {"name": "West Compound", "adjacent": ["A", "B", "D", "E"]},
            "D": {"name": "East Yard", "adjacent": ["A", "B", "C", "E"]},
            "E": {"name": "South Cliffs", "adjacent": ["B", "C", "D"]},
        },
    }

    out = Path(__file__).resolve().parents[1] / "js" / "valley-board.js"
    js = (
        "/* Auto-generated from scripts/valley_network.py — run: python scripts/valley_to_js.py */\n"
        "const VALLEY_BOARD = "
        + json.dumps(board, indent=2)
        + ";\n\n"
        "if (typeof module !== 'undefined') {\n"
        "  module.exports = { VALLEY_BOARD };\n"
        "}\n"
    )
    out.write_text(js, encoding="utf-8")
    print(f"Wrote {out} ({len(nodes)} nodes, {len(routes)} routes)")


if __name__ == "__main__":
    main()
