# Tremors: Perfection Valley — Merged Rules (design target)

Unified rules combining the **playable prototype** (`docs/rules.md`, `js/engine.js`) with the **Gemini movement/terrain spec** (`Board Game Movement Mechanics Explained.pdf`) and the **32-node valley map** (`scripts/valley_network.py`, branch `cursor/valley-network-blueprint-7890`).

**Status:** Design document. The digital prototype on `main` still runs Phase 1 (14 nodes). The valley branch loads the 32-node graph but does not yet enforce terrain, fault lines, spillover, or erosion. See `docs/valley-engine-checklist.md` for implementation order.

Printable Phase 1 copy remains at `print/rules.html`. This doc supersedes it for valley playtests once the engine catches up.

---

## Design principles (what we kept from each source)

| Source | Keep |
| --- | --- |
| **Prototype** | Four film characters, solo-friendly turn order, 1-noise action floor, calamity clock, Threatened → Grabbed → Dragged, Rescue tokens, item rigs, sim-tuned noise bands |
| **Gemini** | 32-node typed terrain, Vector Hunt pathing, fault-line shortcuts, noise spillover on loud actions, erosion on structures, location search decks, Semi-Truck + Cliff Trick win paths |
| **Dropped from Gemini** | Stealth Walk at 0 Noise, instant death on Agility fail, per-turn Event deck (replaced by calamity + optional Frenzy events), free-order 3 AP turns, 5 HP Graboid math |

---

## Win and lose

**Co-op:** one survivor Dragged or bled out from Critical = everyone loses.

### Win (any one, after Essentials are complete)

1. **Semi-Truck Escape** — Scavenge **Truck Battery** and **Starter Motor** from Junkyard / CAT Site (N22–N23), deliver both to the **Semi-Truck** node (treat as N04 Canyon Rd South or a dedicated truck pad adjacent to N04), spend **4 Work** total to start the engine, then **Evacuate** with all survivors on the truck node or an adjacent road node from **round 10+**.

2. **Bixby Cliff Trick** — With no active surfaced Graboids blocking the Cat Path, bait the last worm onto **Cat Path → Cliff Approach → Cliff Edge (N30→N31→N32)**. If it charges onto N32, it falls — remove that Graboid. Win when **all Graboids are eliminated** and every survivor is on a **Safe Boulder** or **Safe High Ground** node.

3. **Timed survival (fallback)** — All Essentials done and nobody dead when **round 14** ends (matches valley-branch calamity schedule).

### Lose

- Any survivor **Dragged** or dies from **Critical**.
- Both escape routes permanently destroyed (Semi-Truck wrecked **and** Cat Path collapsed — calamity or 3 erosion on key structures).
- Optional hard mode: all survivors eaten (Gemini instant-breach variant — not default).

### Essentials (draw 3; must complete all)

Same thematic set as Phase 1, mapped to valley node IDs via legacy slugs in `valley_to_js.py`:

| Objective | Valley node | Work | Fail consequence |
| --- | --- | --- | --- |
| Get the Radio Working | N02 Roadworks | 2 | Desperation +1 now, +1 every 2 rounds |
| Secure a Heavy Vehicle | N22 Bulldozer Site | 3 | Loader starts damaged |
| The Road Is Blocked | N32 / N04 highway | 1 | Danger Zone, Aggression +1 |
| Find Rhonda's Seismograph | N07 Horse Path 2 (camp) | 0 | Blind hunting |
| Find the Safe Ground | N23 Junkyard | 0 | Solid-rock pads stay hidden |
| Meeting Point | N14 Chang's Store | 1 | Forced scatter on breach |

Draw **2 Optional** and **1 Character** as in Phase 1 (`print/objectives.html`).

---

## Players and turn structure

**Solo-friendly:** run **Val → Earl → Rhonda → Burt** in fixed order.

Each character: **2 actions** (1 if Injured, Grabbed, or Pinned; 0 if Critical). Grabbed's action is **Struggle**.

**Every action is at least 1 Noise**, unless Rhonda took no Move this turn (**Don't Move**) or you spend a **Quiet Move** token (0 Noise).

**14 rounds.** Calamity on **4 / 7 / 10 / 12 / 14**. Start with **4 Rescue**, **3 Medkits**. **Evacuate** legal from **round 10+** only.

After all four characters act:

1. Sum **Noise this round** → Graboid **response band** (below).
2. Apply **noise spillover** from loud sources (if any).
3. **Graboid phase** — Hunt, Vector Hunt, surface, chase, attacks.
4. If calamity round: draw Calamity; severity from round noise (Quiet / Disturbed / Frenzy).
5. On **Disturbed+**: optionally resolve one **Graboid Behavior** entry (see checklist — phase 2 feature).
6. Critical timers tick. Node noise **decays by 1**. Round noise resets. Surfaced Graboid with no catch for **2 rounds** submerges at Hunt 1.

Character stats, passives, and Signature Moments: unchanged from `print/rules.html`.

---

## Map: 32 nodes (N01–N32)

Single board for the full valley. Topology and coordinates: `scripts/valley_network.py`, `docs/Perfection_Valley_Full_Board_Map.png` (valley branch).

### Terrain types

| Type | Example nodes | Graboids | Humans |
| --- | --- | --- | --- |
| **Exposed Dirt** | N04, N09–N10, N17–N19, N23, N26–N27 | Full tunnel/breach | Walk 1 action; **Sprint** 2 nodes, +3 Noise at destination |
| **Micro-Safe Roof** | N11–N12, N15–N16, N20, N25 | Undermine only; no instant dirt breach | **Roof leap** 1 action between adjacent roof nodes (no dirt step) |
| **Fortified Hub** | N14, N21, N24, N28–N29 | Structural attack; 1 Erosion per slam | Multi-search; 3 Erosion before collapse |
| **Safe Boulders** | N06–N08 Horse Path, N30–N31 Cat Path | **Impassable** — path around | 1 action per hop; 100% breach-safe |
| **Safe High Ground** | N01 Edgar's Tower, N13 Water Tower | Impassable | Ladder access; immune to tentacle drag |
| **Search Hub** | N02, N03, N05, N22 | As dirt unless noted | Location-specific search deck |
| **Hazard / Trap** | N32 Cliff Edge | Worm that enters is removed (cliff kill) | Bait only |

### Fault lines (Graboid-only)

Dashed shortcuts, not walkable:

- N04 ↔ N26 (Canyon South ↔ West Flat East)
- N09 ↔ N27 (Canyon Mid ↔ West Flat Gate)
- N22 ↔ N31 (Bulldozer Site ↔ Cliff Approach)

Used in **Subsurface Transit** (Frenzy, Hunting band, or specific calamity/behavior text): up to **5 nodes** along fault edges in one activation.

### Bedrock acoustic shadow

Graboids path **around** boulder nodes (N06–N08, N30–N31). Noise cannot propagate *through* bedrock; spillover and sensing distance follow **shortest dirt path**. If shortest dirt-path distance exceeds sensing radius, ignore that noise source.

---

## Movement and noise

### Human movement

| Action | Cost | Noise | Notes |
| --- | --- | --- | --- |
| Move | 1 action | +1 | Up to Movement stat along edges |
| Move carefully | 1 action | +1 | 1 node; ignores Shaken extra |
| Run / Sprint | 1 action | +2 (+3 at destination if 2 nodes) | Gemini sprint noise applies at **destination node** |
| Roof leap | 1 action | +1 | Adjacent Micro-Safe Roof only |
| Boulder hop | 1 action | +1 | Safe Boulder chain only |
| Quiet Move token | 1 action | 0 | Spend token |
| Search | 1 action | +1 | Location deck at Search Hub / Fortified Hub |
| Work objective | 1 action | max(1, printed) | On-site |
| Diversion | 1 action | +3 | +2 on adjacent node (items may add more) |
| Fight | 1 action | +3+ | Surfaced worm same node |
| Rescue / Struggle | 1 action | +2 / +1 | As Phase 1 |

**No 0-Noise movement** except Quiet Move token and Rhonda Don't Move on her next non-move action.

### Noise spillover (new)

When an action generates **3+ Noise** at a node (Sprint, Shotgun, Pipe Bomb, etc.), also place spillover on connected nodes: **−1 Noise per hop** (minimum 0). Example: 4 Noise shotgun on N14 → N14:4, adjacent:3, two hops:2.

Round total for response bands still uses **sum of all Noise generated this round** (including spillover tokens placed).

### Loud action reference

| Source | Noise at node |
| --- | --- |
| Ordinary action floor | 1 |
| Sprint destination | 3 |
| Diversion / Tin Cans | +2–3 |
| Shotgun | 4 |
| Pipe Bomb detonation | 6 |
| Elephant Gun / Burt Signature | 8 |
| Kill surfaced Graboid (2 wounds) | +6 immediate |

---

## Graboid AI (merged)

Each Graboid tracks: **Hunt** (0–4, surface at 2), **sector** (legacy) or **node position** (valley target), **heading** (for momentum ties), **surfaced** yes/no.

### Response table (round total — unchanged)

| Round total | Response |
| --- | --- |
| 0–8 Quiet | No extra underground move; Hunt still ticks from node noise |
| 9–11 Movement | Vector Hunt 1 toward loudest prey/noise |
| 12–14 Hunting | Vector Hunt + **+1 Hunt** all underground worms |
| 15–19 Feeding Frenzy | **Double activation** or Subsurface Transit |
| 20+ Stampede | New Graboid enters; all hunt aggressively |

### Node noise → Hunt (per sector, unchanged)

Sector lingering noise: 1–4 → +1 Hunt; 5–7 → +2; 8+ → +3. At Hunt 2, **surface** at **loudest node in sector** (ties: momentum → shortest path → human count → random).

### Vector Hunt (when moving toward noise)

Move up to **3 nodes** along valid Graboid edges toward the **highest Noise** node in sensing range:

- May use **dirt**, **under roof foundations**, and **fault lines** (if Transit active).
- Cannot enter **Safe Boulders** or **Safe High Ground**.
- **Linear momentum:** on tied noise targets, prefer smallest turn angle from current heading.

### Silent round (0 round noise from players)

1. **Subterranean Drift:** each active worm moves **1 node** forward along previous heading.
2. Blocked by bedrock → turn 90° clockwise to nearest open dirt.
3. **Two consecutive silent rounds:** nearest worm Drifts 1 toward closest human on **Exposed Dirt**.

### Surfaced Graboid

- **Chase** nearest character 1–3 nodes by response band (prototype rule — kept).
- Sharing node: **Threatened → Grabbed → Dragged** (prototype — not instant Agility eat).
- **Tentacle** (Frenzy/Behavior cards only): extend to adjacent node without full surface; LoS required through open edge.

### Graboid wounds

**2 wounds** to kill (prototype). Pipe Bomb ingested on breach = instant kill but +6 Noise (Gemini flavor, prototype wound count).

---

## Structures and erosion

Replace binary Compromised/Unsafe with **Erosion tokens**:

| Terrain | On Graboid attack |
| --- | --- |
| Exposed Dirt | Surface breach; Threatened track |
| Micro-Safe Roof | +1 Erosion; occupants Agility-style check → Threatened on fail |
| Fortified Hub | +1 Erosion; 3 tokens = **collapse** to Exposed Dirt |
| Safe Boulders / High Ground | No erosion |

Collapsed structure = Exposed Dirt node; all occupants Injured + Threatened check.

---

## Search and items

### Phase A (current engine)

Global 16-card deck + 5 rigs (`js/data.js`) — works today.

### Phase B (merged target)

Location decks when searching at:

| Node | Deck theme |
| --- | --- |
| N14 Chang's Store | Utility, decoys, hazards (Handy Rock, Flares, CB Batteries, chimes event) |
| N22–N23 Junkyard / CAT | Truck parts, RC Decoy, Vaulting Pole, Shotgun |
| N29 Gummer Armory | Elephant Gun, Pipe Bombs, Heavy Ammo, Seismic Sensor |

Cross-location **crafting:** Pipe Bomb Ingredients (Chang's) + assembly at N24 Nancy's or N29 Armory.

Gemini card catalog in the PDF is the **content backlog**; rig recipes from Phase 1 remain valid shortcuts.

---

## Calamities and Graboid behaviors

**Primary clock:** 30-card calamity deck, acts on rounds **4 / 7 / 10 / 12 / 14** (valley schedule). Round noise picks Quiet / Disturbed / Frenzy text.

**Secondary spice (optional):** On Disturbed or Frenzy, draw from a small **Graboid Behavior** deck (5 Gemini AI/Event cards: Sensory Adaptation, Blind Charge, Subterranean Ambush, Tentacle Probe, Ground Subsidence) — **Seismic** mutation first, then AI modifier for one round. Do not draw every turn; only on high bands or flagged calamities.

---

## Quick reference: prototype vs valley target

| | Phase 1 (`docs/rules.md`) | Valley target (this doc) |
| --- | --- | --- |
| Nodes | 14 | 32 |
| Rounds | 12 | 14 |
| Calamity | 4/7/9/11/12 | 4/7/10/12/14 |
| Evacuate | Round 8+ | Round 10+ |
| Rescue / Medkits | 3 / 2 | 4 / 3 |
| Win | Evacuate town | Truck, cliff kill, or round 14 |
| Map mechanic | Sectors | Terrain + fault lines + spillover |
| Graboid move | Hunt + chase | Hunt + Vector Hunt + fault transit |

---

## Related files

- `docs/rules.md` — Phase 1 prototype (implemented)
- `docs/valley-engine-checklist.md` — implementation order for engine
- `docs/film-geography.md` — film ↔ node mapping
- `scripts/valley_network.py` — 32-node graph source
- `Board Game Movement Mechanics Explained.pdf` — Gemini export (user upload)
