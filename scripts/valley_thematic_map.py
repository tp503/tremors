#!/usr/bin/env python3
"""Render the movie-style Perfection Valley tactical board map (300 DPI PNG)."""

from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.patches as patches  # noqa: E402
import matplotlib.pyplot as plt  # noqa: E402
import matplotlib.patheffects as path_effects  # noqa: E402

from valley_network import (  # noqa: E402
    category_colors,
    edges,
    fault_lines,
    node_shapes,
    nodes_data,
)

THEMATIC_COLORS = {
    "Fortified Hub": "#1E90FF",
    "Safe High Ground": "#2E8B57",
    "Safe Boulders": "#708090",
    "Micro-Safe Roof": "#00CED1",
    "Exposed Dirt": "#DC143C",
    "Search Hub": "#FF8C00",
    "Hazard / Trap": "#9400D3",
}


def draw_background(ax: plt.Axes) -> None:
    cliff_poly = plt.Polygon(
        [[65, 100], [100, 100], [100, 40], [80, 40], [75, 70], [60, 90]],
        closed=True,
        facecolor="#A65233",
        edgecolor="#6D321B",
        alpha=0.6,
        linewidth=2,
        zorder=1,
    )
    ax.add_patch(cliff_poly)
    ax.text(
        88,
        70,
        "BIXBY CANYON\nCLIFFS",
        fontsize=16,
        fontweight="bold",
        color="#4A2011",
        rotation=-75,
        ha="center",
        alpha=0.7,
        zorder=2,
    )

    south_mountain = plt.Polygon(
        [[0, 0], [100, 0], [100, 8], [60, 3], [0, 8]],
        closed=True,
        facecolor="#8C6D53",
        edgecolor="#5E4735",
        alpha=0.5,
        zorder=1,
    )
    ax.add_patch(south_mountain)
    ax.text(
        20,
        3,
        "SIERRA MOUNTAIN RANGE",
        fontsize=10,
        fontweight="bold",
        color="#3D2D21",
        alpha=0.7,
        zorder=2,
    )

    canyon_rd_x = [50, 45, 45, 45, 46, 46, 46, 50, 70, 90]
    canyon_rd_y = [5, 18, 30, 42, 60, 73, 84, 93, 95, 95]
    ax.plot(
        canyon_rd_x,
        canyon_rd_y,
        color="#C2A675",
        linewidth=18,
        solid_capstyle="round",
        alpha=0.7,
        zorder=2,
    )
    ax.plot(
        canyon_rd_x,
        canyon_rd_y,
        color="#A88B58",
        linewidth=2,
        linestyle="--",
        alpha=0.8,
        zorder=3,
    )

    gummer_wall = patches.Rectangle(
        (2, 66),
        16,
        14,
        linewidth=2,
        edgecolor="#404040",
        facecolor="#8C8C8C",
        alpha=0.3,
        linestyle="-.",
        zorder=2,
    )
    ax.add_patch(gummer_wall)
    ax.text(
        10,
        78,
        "GUMMER\nCOMPOUND",
        fontsize=9,
        fontweight="bold",
        color="#262626",
        ha="center",
        zorder=3,
    )

    town_zone = patches.Rectangle(
        (34, 56),
        30,
        34,
        linewidth=2,
        edgecolor="#B22222",
        facecolor="#F5DEB3",
        alpha=0.35,
        linestyle="--",
        zorder=2,
    )
    ax.add_patch(town_zone)
    ax.text(
        49,
        57,
        "CITY OF PERFECTION (VARIABLE DENSITY HUB)",
        fontsize=8,
        fontweight="bold",
        color="#8B0000",
        ha="center",
        zorder=3,
    )


def draw_network(ax: plt.Axes) -> None:
    for src, dst in fault_lines:
        p1, p2 = nodes_data[src]["pos"], nodes_data[dst]["pos"]
        ax.plot(
            [p1[0], p2[0]],
            [p1[1], p2[1]],
            color="#8B0000",
            linestyle=":",
            linewidth=2.5,
            alpha=0.75,
            zorder=4,
        )

    for src, dst in edges:
        p1, p2 = nodes_data[src]["pos"], nodes_data[dst]["pos"]
        ax.plot(
            [p1[0], p2[0]],
            [p1[1], p2[1]],
            color="#2B2B2B",
            linestyle="-",
            linewidth=2,
            alpha=0.85,
            zorder=4,
        )

    for node_id, data in nodes_data.items():
        x, y = data["pos"]
        shape = node_shapes[data["type"]]
        color = THEMATIC_COLORS[data["type"]]

        ax.scatter(x, y, s=1200, c="#1A1A1A", marker=shape, alpha=0.6, zorder=5)
        ax.scatter(
            x,
            y,
            s=950,
            c=color,
            marker=shape,
            edgecolors="#FFFFFF",
            linewidths=2,
            zorder=6,
        )

        txt = ax.text(
            x,
            y - 2.6,
            f"{node_id}\n{data['name']}",
            fontsize=6.5,
            fontweight="bold",
            ha="center",
            va="top",
            color="#000000",
            zorder=7,
        )
        txt.set_path_effects([path_effects.withStroke(linewidth=2, foreground="#FFFFFF")])


def draw_annotations(ax: plt.Axes) -> None:
    title_box = patches.Rectangle(
        (3, 85),
        30,
        13,
        linewidth=3,
        edgecolor="#3D2D21",
        facecolor="#F4ECD8",
        zorder=8,
    )
    ax.add_patch(title_box)
    ax.text(
        18,
        95,
        "WELCOME TO\nPERFECTION VALLEY",
        fontsize=16,
        fontweight="black",
        color="#8B0000",
        ha="center",
        zorder=9,
    )
    ax.text(
        18,
        91,
        "NEVADA  •  EST. 1902  •  POP. 14",
        fontsize=9,
        fontweight="bold",
        color="#3D2D21",
        ha="center",
        zorder=9,
    )
    ax.text(
        18,
        87,
        "TACTICAL BOARD MAP & NODE OVERLAY",
        fontsize=7.5,
        fontweight="bold",
        color="#555555",
        ha="center",
        zorder=9,
    )

    ax.annotate(
        "N",
        xy=(8, 22),
        xytext=(8, 14),
        arrowprops=dict(facecolor="#8B0000", width=3, headwidth=10),
        fontsize=12,
        fontweight="bold",
        color="#8B0000",
        ha="center",
        zorder=9,
    )

    legend_handles = [
        plt.Line2D(
            [0],
            [0],
            marker="s",
            color="w",
            label="Fortified Hub (Safe)",
            markerfacecolor=THEMATIC_COLORS["Fortified Hub"],
            markersize=10,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            marker="^",
            color="w",
            label="Safe High Ground",
            markerfacecolor=THEMATIC_COLORS["Safe High Ground"],
            markersize=10,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            marker="h",
            color="w",
            label="Safe Boulders (Impassable to Worms)",
            markerfacecolor=THEMATIC_COLORS["Safe Boulders"],
            markersize=10,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            marker="s",
            color="w",
            label="Micro-Safe Roof",
            markerfacecolor=THEMATIC_COLORS["Micro-Safe Roof"],
            markersize=10,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            marker="o",
            color="w",
            label="Exposed Dirt (Breach Zone)",
            markerfacecolor=THEMATIC_COLORS["Exposed Dirt"],
            markersize=10,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            marker="D",
            color="w",
            label="Search Hub",
            markerfacecolor=THEMATIC_COLORS["Search Hub"],
            markersize=10,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            marker="*",
            color="w",
            label="Hazard / Trap Node",
            markerfacecolor=THEMATIC_COLORS["Hazard / Trap"],
            markersize=12,
            markeredgecolor="#000",
        ),
        plt.Line2D(
            [0],
            [0],
            color="#8B0000",
            linestyle=":",
            linewidth=2,
            label="Graboid Subterranean Fault Line",
        ),
    ]
    ax.legend(
        handles=legend_handles,
        title="Map Legend & Node Types",
        loc="lower right",
        frameon=True,
        facecolor="#F4ECD8",
        edgecolor="#3D2D21",
        fontsize=8,
        title_fontsize=9,
    )


def render(output: Path, show: bool = False) -> None:
    fig, ax = plt.subplots(figsize=(18, 22), dpi=300, facecolor="#D2B48C")
    ax.set_facecolor("#E8D3A7")
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)

    draw_background(ax)
    draw_network(ax)
    draw_annotations(ax)

    ax.axis("off")
    fig.tight_layout()
    output.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output, dpi=300, bbox_inches="tight", facecolor=fig.get_facecolor())
    print(f"Saved {output}")
    if show:
        plt.show()
    else:
        plt.close(fig)


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=root / "docs" / "Perfection_Valley_Full_Board_Map.png",
        help="PNG output path",
    )
    parser.add_argument("--show", action="store_true", help="Open interactive window")
    args = parser.parse_args()
    render(args.output, show=args.show)


if __name__ == "__main__":
    main()
