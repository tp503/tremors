# Tremors: Perfection

Cooperative board-game prototype based on the 1990 film. One table, one death, everyone loses.

This repository is the dedicated home for the game. The design started as a [ChatGPT conversation](https://chatgpt.com/share/6a848aab-4a20-83eb-a0a1-aeb7af2477d3); the full thread is archived in [`docs/design-conversation.md`](docs/design-conversation.md). Compiled rules: [`docs/rules.md`](docs/rules.md).

## Play

Open `index.html` in a browser, or:

```bash
python -m http.server 8000
```

Then go to `http://localhost:8000/`.

You run **Val, Earl, Rhonda, and Burt**. Noise is shared. Graboids hunt by sector and surface on the loudest node. Sharing that node is Threatened → Grabbed → Dragged.

## Tests

```bash
node js/engine.test.js
```

## Status

Phase 1 (Perfection, 12-round calamity clock) is playable. Phase 2 (valley fold-out) is specified in the design conversation, not built.
