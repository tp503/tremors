# Tremors: Perfection

Cooperative board-game prototype based on the 1990 film. One table, one death, everyone loses.

This repository is the dedicated home for the game. The design started as a [ChatGPT conversation](https://chatgpt.com/share/6a848aab-4a20-83eb-a0a1-aeb7af2477d3); the full thread is archived in [`docs/design-conversation.md`](docs/design-conversation.md). The prior Cloud Agent thread (chase, pacing, items) is archived in [`docs/prior-agent-conversation.md`](docs/prior-agent-conversation.md). Film geography for Perfection and the valley: [`docs/film-geography.md`](docs/film-geography.md). Compiled rules: [`docs/rules.md`](docs/rules.md).

## Play

Open `index.html` in a browser, or:

```bash
python -m http.server 8000
```

Then go to `http://localhost:8000/`. Printable board: `http://localhost:8000/print/map.html` (landscape letter / A4).

You run **Val, Earl, Rhonda, and Burt**. Noise is shared. Every action is at least 1 Noise unless Rhonda hasn't moved this turn or you spend a Quiet Move token. Graboids surface on Hunt 2 and chase the nearest character. First catch is Threatened; the same worm catching again is Grabbed. Search fills a shared item supply; two items can be rigged into a Pipe Bomb, Tripwire Bait, Fire Bomb, Line Rescue, or Field Generator.

## Tests

```bash
node js/engine.test.js
node js/simulate.js 20
```

## Status

Phase 1 (Perfection, 12-round calamity clock) is playable with the unpublished ruleset: Quiet ≤8 / Disturbed 9–14 / Frenzy 15+, Evacuate from round 8+. Phase 2 (valley fold-out) is specified in the design conversation, not built.