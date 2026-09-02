# Valley rules — engine implementation checklist

Ordered by **impact and dependency**. Each item lists files to touch and acceptance criteria. Target spec: `docs/rules-valley.md`.

**Base branch for map data:** `cursor/valley-network-blueprint-7890` (32-node `js/valley-board.js`, legacy slug mapping).

**Legend:** ✅ done on valley branch · 🔲 not started · ⚠️ partial

---

## Tier 0 — Already done (valley branch)

| # | Item | Evidence |
| --- | --- | --- |
| 0.1 | ✅ 32-node graph N01–N32 with edges | `scripts/valley_network.py` |
| 0.2 | ✅ Fault line definitions | `fault_lines` in network script + `js/valley-board.js` |
| 0.3 | ✅ Terrain category per node | `type` field on each node |
| 0.4 | ✅ Legacy ID mapping (radio→N02, etc.) | `scripts/valley_to_js.py`, `SLUG` map |
| 0.5 | ✅ Engine loads valley board in browser | `index.html` script order, `js/data.js` |
| 0.6 | ✅ Scaled constants (14 rounds, calamity 4/7/10/12/14) | `js/data.js` on valley branch |
| 0.7 | ✅ Thematic 300 DPI map PNG | `docs/Perfection_Valley_Full_Board_Map.png` |
| 0.8 | ⚠️ Fault lines in data only — **not used by AI** | `js/engine.js` |

---

## Tier 1 — Map passability (blocks everything else)

**Goal:** Movement and Graboid pathing respect terrain types.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 1.1 | 🔲 Add `terrainRules` to data: which types humans/Graboids may enter | `js/data.js`, `js/valley-board.js` | Unit test: worm cannot path through N06 |
| 1.2 | 🔲 `canEnter(node, actor)` helper | `js/engine.js` | Graboid rejected at boulder/high ground |
| 1.3 | 🔲 Human **boulder hop** and **roof leap** actions | `js/engine.js`, `js/ui.js` | Legal only on correct edge types |
| 1.4 | 🔲 Pathfinding uses typed edges (BFS/A* on allowed nodes) | `js/engine.js` | Shortest dirt path matches Gemini examples |
| 1.5 | 🔲 Update `engine.test.js` for 32-node graph | `js/engine.test.js` | All tests pass on valley board |

**Engine impact:** High — replaces sector-only distance with graph distance.

---

## Tier 2 — Graboid Vector Hunt + heading

**Goal:** Underground worms move toward noise on the node graph, not only sector loudest.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 2.1 | 🔲 Store per-Graboid `nodeId` + `headingEdge` (not sector-only) | `js/engine.js` | Worm position visible in state dump |
| 2.2 | 🔲 **Vector Hunt:** move up to 3 hops toward max-noise node | `js/engine.js` | Sim: worm on N04 reaches N17 in one Hunting round |
| 2.3 | 🔲 Tie-break: momentum → hop count → human density → random | `js/engine.js` | Deterministic test fixtures |
| 2.4 | 🔲 **Subterranean Drift** on quiet round (1 hop forward / bedrock turn) | `js/engine.js` | Two silent rounds → drift toward dirt human |
| 2.5 | 🔲 Keep **surface + chase** for surfaced models (prototype) | `js/engine.js` | No regression on Threatened track |
| 2.6 | 🔲 Sim harness strategies updated for 32-node | `js/simulate.js` | Win rate report printed |

**Engine impact:** High — core Gemini movement loop.

---

## Tier 3 — Fault line transit

**Goal:** Graboids use N04↔N26, N09↔N27, N22↔N31 shortcuts.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 3.1 | 🔲 Add fault edges to Graboid adjacency (not human) | `js/engine.js` | Human cannot walk fault |
| 3.2 | 🔲 **Subsurface Transit** on Frenzy / Hunting / flagged calamity | `js/engine.js` | Worm jumps N22→N31 in one activation |
| 3.3 | 🔲 UI: show fault lines on map | `js/ui.js`, `styles.css` | Dashed red overlay |

**Engine impact:** Medium — depends on Tier 1–2.

---

## Tier 4 — Noise spillover

**Goal:** Loud actions radiate noise across the graph.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 4.1 | 🔲 `placeNoise(nodeId, amount, { spillover: true })` | `js/engine.js` | Shotgun 4 at N14 places 3 on neighbors |
| 4.2 | 🔲 Bedrock blocks spillover paths (shortest dirt-only) | `js/engine.js` | Noise does not pass through N06 |
| 4.3 | 🔲 Sprint places +3 at destination (not only +2 run) | `js/engine.js` | Matches merged rules table |
| 4.4 | 🔲 Tests for spillover + round total | `js/engine.test.js` | Band crosses Disturbed when clustered |

**Engine impact:** Medium — changes band math; retune sim after.

---

## Tier 5 — Erosion tokens

**Goal:** Structures degrade instead of one-way Compromised latch.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 5.1 | 🔲 `erosion[nodeId]` counter on Fortified / Micro-Safe | `js/engine.js` | State serializes |
| 5.2 | 🔲 Graboid slam adds +1 erosion; 3 = collapse to Exposed Dirt | `js/engine.js` | N14 collapses after 3 slams |
| 5.3 | 🔲 Calamity text can add erosion / collapse safe islands | `js/data.js`, calamities | Card resolves |
| 5.4 | 🔲 UI erosion markers | `js/ui.js` | Visible on map |

**Engine impact:** Medium — replaces building protection logic.

---

## Tier 6 — Win paths

**Goal:** Truck escape and cliff trick wins.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 6.1 | 🔲 Key items: Truck Battery, Starter Motor (inventory flags) | `js/data.js`, `js/engine.js` | Pickup at N22/N23 |
| 6.2 | 🔲 Truck repair sequence: 4 Work at truck node with both parts | `js/engine.js` | Unlocks Evacuate |
| 6.3 | 🔲 **Cliff trick:** Graboid entering N32 removed | `js/engine.js` | Test: worm on N31 moves to N32 → dead |
| 6.4 | 🔲 Win check: all worms dead + survivors on safe terrain | `js/engine.js` | Distinct from Evacuate win |
| 6.5 | 🔲 Update `simulate.js` win/loss reasons | `js/simulate.js` | Logs cliff vs truck vs timeout |

**Engine impact:** Medium — new end states.

---

## Tier 7 — Location search decks

**Goal:** Search draws from Chang's / Junkyard / Armory piles.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 7.1 | 🔲 Split item catalog into 3 deck arrays (from PDF table) | `js/data.js` | Decks shuffle independently |
| 7.2 | 🔲 Search at N14/N22/N29 draws correct deck | `js/engine.js` | Node type routes deck |
| 7.3 | 🔲 Truck parts only from Junkyard deck | `js/engine.js` | Cannot get Battery at Chang's |
| 7.4 | 🔲 Print assets for location decks | `print/` | Optional PDF |

**Engine impact:** Lower — content-heavy; Phase 1 global deck still works until then.

---

## Tier 8 — Graboid Behavior deck (optional spice)

**Goal:** Disturbed/Frenzy triggers AI/Event cards, not every turn.

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 8.1 | 🔲 5-card behavior deck data (Gemini titles) | `js/data.js` | JSON matches PDF |
| 8.2 | 🔲 Draw on Disturbed+ or specific calamities | `js/engine.js` | Seismic mutation then AI mod |
| 8.3 | 🔲 Implement 5 AI modifiers (simplified) | `js/engine.js` | At least Sensory Adaptation + Tentacle Probe |
| 8.4 | 🔲 Print behavior cards | `print/calamities.html` or new file | Table reference |

**Engine impact:** Lower — defer until Tier 2 stable.

---

## Tier 9 — Docs, print, balance

| # | Task | Files | Acceptance |
| --- | --- | --- | --- |
| 9.1 | 🔲 Sync `print/rules.html` to valley spec | `print/rules.html` | Matches `docs/rules-valley.md` |
| 9.2 | 🔲 Replace `print/map.html` with 32-node layout or link PNG | `print/map.html` | Printable playtest |
| 9.3 | 🔲 Update `index.html` help text | `index.html` | Round 14, evac 10+ |
| 9.4 | 🔲 Balance pass: target ~40–50% turtle win on 32-node | `js/simulate.js`, tuning | Report in PR |
| 9.5 | 🔲 Add `docs/rules-valley.md` link to README | `README.md` | Discoverability |

---

## Suggested sprint order

```
Tier 1 → Tier 2 → Tier 3 → Tier 4 → sim retune
         ↓
Tier 5 + Tier 6 (parallel) → Tier 9.1–9.3
         ↓
Tier 7 + Tier 8 (content pass)
```

**Minimum playable valley (MVP):** Tiers 1–2 + existing calamities + Evacuate at round 10. Adds terrain and Vector Hunt without spillover, erosion, or new win paths.

**Full merged spec:** All tiers through 9.

---

## Test commands

```bash
node js/engine.test.js
node js/simulate.js 80
python3 scripts/valley_network.py   # regenerate blueprint PNG
python3 scripts/valley_to_js.py     # regenerate js/valley-board.js
```

---

## PR tracking

| PR / branch | Scope |
| --- | --- |
| `cursor/valley-network-blueprint-7890` | Map data + engine wired to 32 nodes (partial) |
| `cursor/valley-merged-rules-7890` | Merged rules doc + this checklist |
| *(future)* | Tier 1–2 engine implementation |
