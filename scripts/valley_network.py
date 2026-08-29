#!/usr/bin/env python3
"""Render the 32-node Perfection Valley board network blueprint."""

from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import networkx as nx

# Define the 32 nodes with IDs, labels, (X, Y) coordinates, and terrain categories
nodes_data = {
    "N01": {"name": "Edgar's Tower", "pos": (15, 5), "type": "Safe High Ground"},
    "N02": {"name": "Roadworks / Tel Cut", "pos": (50, 5), "type": "Search Hub"},
    "N03": {"name": "Old Fred's Farm", "pos": (75, 10), "type": "Search Hub"},
    "N04": {"name": "Canyon Rd South", "pos": (45, 18), "type": "Exposed Dirt"},
    "N05": {"name": "Dr. Jim's Homestead", "pos": (45, 30), "type": "Search Hub"},
    "N06": {"name": "Horse Path 1", "pos": (30, 35), "type": "Safe Boulders"},
    "N07": {"name": "Horse Path 2", "pos": (28, 45), "type": "Safe Boulders"},
    "N08": {"name": "Horse Path 3", "pos": (26, 55), "type": "Safe Boulders"},
    "N09": {"name": "Canyon Rd Mid", "pos": (45, 42), "type": "Exposed Dirt"},
    "N10": {"name": "Canyon Rd North", "pos": (45, 54), "type": "Exposed Dirt"},
    "N11": {"name": "Val & Earl's", "pos": (38, 58), "type": "Micro-Safe Roof"},
    "N12": {"name": "Chang's Trailer", "pos": (38, 64), "type": "Micro-Safe Roof"},
    "N13": {"name": "Water Tower", "pos": (38, 70), "type": "Safe High Ground"},
    "N14": {"name": "Chang's Store", "pos": (38, 76), "type": "Fortified Hub"},
    "N15": {"name": "Melvin's Shack", "pos": (38, 81), "type": "Micro-Safe Roof"},
    "N16": {"name": "Nestor's Trailer", "pos": (38, 86), "type": "Micro-Safe Roof"},
    "N17": {"name": "Main St South", "pos": (46, 60), "type": "Exposed Dirt"},
    "N18": {"name": "Main St Central", "pos": (46, 73), "type": "Exposed Dirt"},
    "N19": {"name": "Main St North", "pos": (46, 84), "type": "Exposed Dirt"},
    "N20": {"name": "Melvin's Trailer", "pos": (55, 60), "type": "Micro-Safe Roof"},
    "N21": {"name": "Quonset Bldg", "pos": (55, 66), "type": "Fortified Hub"},
    "N22": {"name": "Bulldozer Site", "pos": (72, 65), "type": "Search Hub"},
    "N23": {"name": "Junkyard", "pos": (60, 75), "type": "Exposed Dirt"},
    "N24": {"name": "Nancy's House", "pos": (56, 83), "type": "Fortified Hub"},
    "N25": {"name": "Abandoned Cottage", "pos": (56, 88), "type": "Micro-Safe Roof"},
    "N26": {"name": "West Flat East", "pos": (32, 65), "type": "Exposed Dirt"},
    "N27": {"name": "West Flat Gate", "pos": (20, 68), "type": "Exposed Dirt"},
    "N28": {"name": "Gummer Gate", "pos": (10, 70), "type": "Fortified Hub"},
    "N29": {"name": "Gummer Armory", "pos": (5, 75), "type": "Fortified Hub"},
    "N30": {"name": "Cat Path", "pos": (50, 93), "type": "Safe Boulders"},
    "N31": {"name": "Cliff Approach", "pos": (70, 95), "type": "Safe Boulders"},
    "N32": {"name": "Cliff Edge", "pos": (90, 95), "type": "Hazard / Trap"},
}

# Undirected edge network
edges = [
    ("N01", "N04"), ("N02", "N03"), ("N02", "N04"), ("N04", "N05"),
    ("N05", "N06"), ("N05", "N09"), ("N06", "N07"), ("N07", "N08"),
    ("N08", "N13"), ("N09", "N10"), ("N10", "N17"), ("N11", "N12"),
    ("N11", "N17"), ("N12", "N13"), ("N12", "N26"), ("N13", "N14"),
    ("N13", "N18"), ("N14", "N15"), ("N14", "N18"), ("N15", "N16"),
    ("N16", "N19"), ("N17", "N18"), ("N17", "N20"), ("N17", "N26"),
    ("N18", "N19"), ("N18", "N21"), ("N18", "N23"), ("N19", "N24"),
    ("N19", "N25"), ("N19", "N30"), ("N20", "N21"), ("N21", "N22"),
    ("N22", "N23"), ("N23", "N24"), ("N24", "N25"), ("N26", "N27"),
    ("N27", "N28"), ("N28", "N29"), ("N30", "N31"), ("N31", "N32"),
]

# Graboid-only subterranean fault channels (not walkable surface routes)
fault_lines = [("N04", "N26"), ("N09", "N27"), ("N22", "N31")]

node_shapes = {
    "Fortified Hub": "s",
    "Safe High Ground": "^",
    "Safe Boulders": "h",
    "Micro-Safe Roof": "s",
    "Exposed Dirt": "o",
    "Search Hub": "D",
    "Hazard / Trap": "*",
}

category_colors = {
    "Fortified Hub": "#1f77b4",
    "Safe High Ground": "#2ca02c",
    "Safe Boulders": "#7f7f7f",
    "Micro-Safe Roof": "#17becf",
    "Exposed Dirt": "#d62728",
    "Search Hub": "#ff7f0e",
    "Hazard / Trap": "#9467bd",
}


def build_graph() -> nx.Graph:
    graph = nx.Graph()
    for node_id, data in nodes_data.items():
        graph.add_node(node_id, name=data["name"], pos=data["pos"], type=data["type"])
    graph.add_edges_from(edges)
    return graph


def render(output: Path | None = None, show: bool = False) -> None:
    graph = build_graph()
    pos = {node: data["pos"] for node, data in nodes_data.items()}
    node_colors = [category_colors[data["type"]] for data in nodes_data.values()]
    labels = {node: f"{node}\n{data['name']}" for node, data in nodes_data.items()}

    fig, ax = plt.subplots(figsize=(16, 12), facecolor="#f4ecd8")
    ax.set_facecolor("#f4ecd8")

    nx.draw_networkx_edges(
        graph, pos, ax=ax, edge_color="#555555", width=2, alpha=0.7, style="solid"
    )
    nx.draw_networkx_nodes(
        graph,
        pos,
        ax=ax,
        node_color=node_colors,
        node_size=1100,
        edgecolors="#333333",
        linewidths=1.5,
    )
    nx.draw_networkx_labels(
        graph, pos, labels=labels, font_size=7, font_weight="bold", font_family="sans-serif"
    )

    legend_handles = [
        plt.Line2D(
            [0],
            [0],
            marker="o",
            color="w",
            label=cat,
            markerfacecolor=col,
            markersize=10,
            markeredgecolor="#333",
        )
        for cat, col in category_colors.items()
    ]
    ax.legend(
        handles=legend_handles,
        title="Node Types",
        loc="lower right",
        frameon=True,
        facecolor="#ffffff",
        edgecolor="#cccccc",
    )

    ax.set_title(
        "PERFECTION VALLEY - Board Game Node Network Blueprint",
        fontsize=16,
        fontweight="bold",
        pad=20,
    )
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.grid(True, linestyle=":", alpha=0.4, color="#a09070")
    fig.tight_layout()

    if output is not None:
        output.parent.mkdir(parents=True, exist_ok=True)
        fig.savefig(output, dpi=150, bbox_inches="tight", facecolor=fig.get_facecolor())
        print(f"Saved {output}")

    if show:
        plt.show()
    else:
        plt.close(fig)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "docs" / "valley-network-blueprint.png",
        help="PNG output path (default: docs/valley-network-blueprint.png)",
    )
    parser.add_argument("--show", action="store_true", help="Open interactive window")
    args = parser.parse_args()
    render(output=args.output, show=args.show)


if __name__ == "__main__":
    main()
