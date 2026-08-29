# Tremors: Perfection

Cooperative board-game prototype based on the 1990 film. One table, one death, everyone loses.

This repository is the dedicated home for the game. The design started as a [ChatGPT conversation](https://chatgpt.com/share/6a848aab-4a20-83eb-a0a1-aeb7af2477d3); the full thread is archived in [`docs/design-conversation.md`](docs/design-conversation.md). The prior Cloud Agent thread (chase, pacing, items) is archived in [`docs/prior-agent-conversation.md`](docs/prior-agent-conversation.md). Film geography for Perfection and the valley: [`docs/film-geography.md`](docs/film-geography.md). Screenplay quotes reference (Wilson & Maddock draft): [`docs/movie-script-quotes.md`](docs/movie-script-quotes.md). Compiled rules: [`docs/rules.md`](docs/rules.md).

## Play

Open `index.html` in a browser, or:

```bash
python -m http.server 8000
```

Then go to `http://localhost:8000/`. Printable **town** board: `http://localhost:8000/print/map.html` (landscape letter / A4), also `print/perfection-map.pdf`. Playtest rules (two letter pages): `http://localhost:8000/print/rules.html`, also `print/perfection-rules.pdf`. **Objective cards** (17 + setup): `print/objectives.html`, also `print/perfection-objectives.pdf`. **Calamity deck** (30 + setup): `print/calamities.html`, also `print/perfection-calamities.pdf`.

**Phase 2 valley blueprint** (32-node network graph, design reference only): `docs/valley-network-blueprint.png`. Regenerate with `pip install -r scripts/requirements.txt && python scripts/valley_network.py` (add `--show` on Windows to open the plot window).

You run **Val, Earl, Rhonda, and Burt**. Noise is shared. Every action is at least 1 Noise unless Rhonda hasn't moved this turn or you spend a Quiet Move token. Graboids surface on Hunt 2 and chase the nearest character. First catch is Threatened; the same worm catching again is Grabbed. Search fills a shared item supply; two items can be rigged into a Pipe Bomb, Tripwire Bait, Fire Bomb, Line Rescue, or Field Generator.

## Tests

```bash
node js/engine.test.js
node js/simulate.js 20
```

## Status

Phase 2 is the **full Perfection Valley** board (32 nodes, 14-round calamity clock) with the unpublished ruleset: Quiet ≤8 / Disturbed 9–14 / Frenzy 15+, Evacuate from round 10+. Blueprint graph: `docs/valley-network-blueprint.png` (regenerate with `python scripts/valley_to_js.py`).