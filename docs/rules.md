# Tremors: Perfection — Prototype Rules

Compiled from the design conversation (noise as a shared resource, two-phase escape, calamity clock, condition tracks rather than hit points, and fully cooperative play). This is a **playable Phase 1 prototype**, not a finished published game.

## Win and lose

- **Everyone escapes alive = win.**
- **One survivor dies = game over.**
- Phase 1 win: complete every Essential objective, then **Evacuate from round 8+**, or still have them done when round 12 ends.
- Death comes from being **Dragged underground** after a failed rescue, or from **Critical** bleeding out.

## Players

Solo-friendly: one person runs all four characters in order **Val → Earl → Rhonda → Burt**.

| Character | Role | M / N / S / C | Weakness |
| --- | --- | --- | --- |
| Burt Gummer | Prepared firepower | 2 / 4 / 3 / 5 | +1 Noise when using equipment |
| Val McKee | Scout | 4 / 3 / 3 / 3 | Fragile; Fast costs extra Noise |
| Earl Bassett | Rescue / glue | 3 / 5 / 2 / 3 | Needs people nearby |
| Rhonda LeBeck | Intel | 3 / 3 / 5 / 2 | Combat 2 |

Each character has two passive abilities and **one Signature Moment** (once per game). Burt drafts 2 of 3 starting equipment cards.

## Map

**Node-and-route map**, not hexes. Eighteen named locations in five underground **sectors** (A north, B centre, C west, D east, E south). Names follow the 1990 film (see `docs/film-geography.md`); the board compresses the film's southern Bixby-road locations into a ring around town.

- Graboid **tokens** occupy a **sector**.
- When a Graboid **surfaces**, a **model** is placed on a **node**.
- Routes can be blocked by calamities. Buildings protect until Compromised or Unsafe. Towers cannot be grabbed. Solid Rock (Aqueduct / North Cliffs) can be revealed by an objective.

| Sector | Nodes |
| --- | --- |
| A north | North Cliffs, Telephone Line, Edgar's Pylon, Old Fred's Ranch |
| B centre | Chang's Market, Melvin's Place, Jim & Megan's, Horse Corral |
| C west | Burt & Heather's, Gas Pumps, Water Tower |
| D east | Rhonda's Camp, Nancy's House, Nestor's Trailer |
| E south | Garbage Dump, Junkyard (Caterpillar), Concrete Aqueduct, Bixby Road |

## Turn structure (Phase 1, 12 rounds)

Each character: **2 actions** (1 if Injured or Grabbed, 0 if Critical). Grabbed's action is **Struggle**.

**Every action is at least 1 Noise**, unless Rhonda has not moved this turn (Don't Move) or you spend a Quiet Move token.

Typical actions:

| Action | Noise |
| --- | --- |
| Move carefully (1 space) | +1 |
| Move (up to Movement) | +1 |
| Run | +2 |
| Quiet Move token | 0 |
| Search | +1 (d6 + Search + node.search ≥ 9) |
| Work an objective | max(1, printed) |
| Diversion on an adjacent node | +3 |
| Fight | +3, more with heavy guns |
| Rescue | +2, spend a Rescue token, pull one node clear |
| Struggle | +1, pull one node clear |
| Stay quiet | +1, dump remaining actions |

After all four characters act:

1. Sum **Noise this round**.
2. **Graboid response** from the total. Surfaced worms chase the nearest character.
3. If the round is **4, 7, 9, 11, or 12**, draw a **Calamity**. Severity is Quiet (0–8) / Disturbed (9–14) / Frenzy (15+).
4. Critical timers tick. Location noise **decays by 1**. Round noise resets. A surfaced Graboid that misses two rounds submerges at Hunt 1.

## Noise and Graboids

Noise is **shared**. It is also placed on the node where it happened.

Hunt track (underground token):

- Sector noise 1–4: +1 Hunt
- 5–7: +2 Hunt
- 8+: +3 Hunt
- Hunt 2: **Surface** at the **loudest node in that sector**. Ties pick at random.

Response table (round total):

- 0–8 Quiet
- 9–11 Movement
- 12–14 Hunting (move and extra Hunt)
- 15–19 Feeding Frenzy (double activation)
- 20+ Stampede (another Graboid enters)

Killing a surfaced Graboid requires **2 wounds** and immediately generates **+6 Noise**.

## Encounter (model on the board)

Sharing a surfaced Graboid's node is a problem the table cannot ignore:

1. **Threatened** — first catch by that worm; still mobile. Leave.
2. **Grabbed** — the **same** worm catching you again. Keep 1 action (Struggle). Rescue or Struggle pulls one node clear.
3. **Dragged** — a further catch while Grabbed. Dead. Everyone loses.

Attacks are a d6 (miss / knockdown / pinned / grabbed). Burt may burn equipment once per round to cancel an attack at his node (**Prepared for Anything**).

Conditions: **Healthy → Injured → Critical (2 rounds) → Dead**. Shaken is a separate flag (+1 Noise on ordinary movement).

## Objectives

Drawn each game: **3 Essential**, **2 Optional**, **1 Character** (prototype counts; the conversation suggested 4/4/2 for a longer physical session).

Work them on-site. Failure is not "lose immediately" — it changes the board (blocked routes, extra aggression, scattered starting positions, damaged loader).

## Search and items

Search is the item economy. Roll **d6 + Search + the node's Search rating** against **9**, then **+1 per prior find at that node**. Success draws from a **16-card deck** (two each of eight items) into a **shared team supply**.

Items are minor alone (each use is an action and the 1-noise floor):

| Item | Solo use |
| --- | --- |
| Tin Cans | +2 Noise diversion on an adjacent node |
| Fishing Line | Reveal Graboids in your sector |
| Pipe | Next Fight +1 Combat |
| Black Powder | Next Fight +2 Combat, +2 Noise now |
| Fuel Can | +1 Fuel |
| Rope | Pull a Pinned/Threatened teammate here or adjacent one node clear |
| Radio Parts | +1 Work on the radio or loader objective here |
| Walkie-Talkies | Next character gains +1 action |

Five **Rig** recipes spend two specific items as one action:

| Rig | Parts | Effect |
| --- | --- | --- |
| Pipe Bomb | Pipe + Powder | 1 wound at range, no fight roll |
| Tripwire Bait | Cans + Line | Next Graboid surfaces at a node you choose, **no ambush** |
| Fire Bomb | Fuel + Powder | Force a surfaced worm here to dive at Hunt 1 |
| Line Rescue | Rope + Walkies | Pull a Grabbed teammate from an adjacent node onto yours |
| Field Generator | Parts + Fuel | Clear Power Failure / Darkness; dump 2 lingering noise |

Tripwire Bait is the signature play: it turns the Hunt rule into a tool.

## Calamity deck

30 cards in three acts. Not fully shuffled: Act I on round 4, Act II on 7 and 9, Act III on 11, **Get Out of Perfection** on 12. Noise chooses which text on the card fires.

## Phase 2 (not fully built)

The conversation's second board is the valley fold-out: sand 0 / dirt 1 / rocks 2 / road 2 / vehicle 4, extraction on high ground, loader as lifeboat. **Evacuate** is only legal from **round 8+**, with essentials done and nobody grabbed or dead. This prototype stops at a successful Evacuate from town.

## What the prototype is for

Prove the core loop: **act vs stay quiet**, **lure vs hide**, **spend a Rescue token or lose the table**, **calamity clock tightening 4 → 7 → 9 → 11 → 12**.
