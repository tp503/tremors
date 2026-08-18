# Design conversation (source)

Archived from the ChatGPT share that defined this game:

<https://chatgpt.com/share/6a848aab-4a20-83eb-a0a1-aeb7af2477d3>

The playable prototype implements Phase 1 of this conversation: shared noise, calamity clock, node/sector map, condition tracks instead of hit points, and cooperative play where one death ends the game.

---

This is a copy of a shared ChatGPT chat. It won't be added to memory.

Report conversation

Yesterday 4:38 PM

#### You said:

I want to create a board game based on the movie tremors. I want there to be pressure on players from making noise leading to increased danger. What mechanics could achieve this?

  
#### ChatGPT said:

Absolutely. **Noise → danger** is probably the strongest thematic mechanic you could build around _Tremors_, because it creates the same feeling as the film: _“We need to do something… but doing it might get us killed.”_

I'd avoid making noise simply a penalty. Make it a **resource players deliberately spend**, so every action becomes a risk/reward decision.

### 1\. A shared "Noise Meter"

Have a track from, say, **0–10**.

Players perform actions that generate different amounts of noise:

| Action            | Noise |
| ----------------- | ----- |
| Move carefully    | +0    |
| Normal movement   | +1    |
| Run               | +2    |
| Search a building | +1    |
| Smash something   | +2    |
| Fire a gun        | +3    |
| Use machinery     | +3    |
| Dynamite          | +5    |

The important bit is that **noise is shared**. One player's stupid decision affects everyone.

At certain thresholds, the Graboid threat escalates:

**0–2:** Quiet  
**3–5:** Something is moving  
**6–8:** Graboid becomes aggressive  
**9–10:** Attack!

But I'd make the consequences more interesting than simply "monster attacks."

---

### 2\. The Graboid should react to _where_ the noise happens

This could be the really clever part.

Put **noise tokens on the map**, rather than only tracking one global number.

For example:

> 🔊 Noise 3 — Supply Shed  
> 🔊 Noise 2 — Farmhouse  
> 🔊 Noise 1 — Road

At the end of a round, the Graboid moves towards the **loudest concentration of noise**.

Now players can intentionally create distractions.

**Player A:** "We're trapped in the barn."

**Player B:** "I'll throw a toolbox over by the gas station."

**Player C:** "That's going to make 2 noise."

**Player A:** "Good. Let's hope it thinks we're over there."

That's very _Tremors_.

---

### 3\. Noise should decay

Noise shouldn't permanently accumulate.

At the end of each round, remove **1 noise from each location**.

This creates an interesting tension:

> "Do we wait for things to quiet down?"

Waiting is safe from the Graboid—but you're also burning precious time.

You could have a **Doom/Time track** representing nightfall, rescue arriving, ammunition running out, etc.

So players constantly choose between:

**Act now and make noise**  
vs.  
**Wait and risk running out of time**

---

### 4\. Give players a "Quiet" action

I'd make this fundamental.

Each character could have two broad types of actions:

**Quiet actions**

* Walk
* Hide
* Observe
* Plan
* Search carefully
* Set traps

**Loud actions**

* Run
* Shoot
* Drive
* Break doors
* Operate machinery
* Create distractions

The interesting thing is that **quiet actions are less efficient**.

For example:

> Search building carefully: 2 actions, 0 noise  
> Search building quickly: 1 action, +2 noise

Now the player is constantly thinking:

**"How desperate are we?"**

---

### 5\. A hidden/uncertain Graboid system

Don't always tell players exactly where the creature is.

Have a **Graboid movement deck** or tokens that determine its location based on noise.

For example, the creature has three possible states:

**Hunting** → moves toward loudest noise  
**Circling** → moves around the noise location  
**Attacking** → emerges from underground

Players might know:

> "Something is underneath the north side of the map."

But not exactly where.

You could have facedown **"Burrow" tokens** representing possible locations.

When players make noise, reveal information.

That gives you the classic:

> _THUMP_  
> "Did you hear that?"  
> _THUMP THUMP_  
> "It's under us."

---

### 6\. Make the ground itself dangerous

I'd strongly consider making **movement over different terrain generate different noise**.

For example:

* Grass → 0
* Dirt → 0
* Wooden floor → 1
* Metal → 2
* Gravel → 2
* Vehicle → 3
* Roof → 3

Then the map becomes a puzzle.

Players aren't just asking:

> "Where do I want to go?"

They're asking:

> **"How do I get there without waking the Graboid?"**

You could even have safe routes that are longer but quiet.

---

### 7\. Noise as a weapon

This is where the mechanic becomes particularly fun.

Players can **deliberately generate noise to manipulate the Graboid**.

For example:

**Firecracker:** +2 noise at chosen location  
**Car engine:** +4 noise, but lasts several rounds  
**Radio:** +1 noise each round  
**Dynamite:** +5 noise

So noise becomes a tactical resource.

You might have a situation like:

> "We need to get across the bridge."
> 
> "The Graboid is between us and the bridge."
> 
> "What if we start the truck?"
> 
> "That'll attract it."
> 
> "Exactly."

That feels much more like the movie than simply rolling for monster attacks.

---

### 8\. Introduce a "Panic" mechanic

This could make the game progressively nastier.

Whenever a Graboid attacks, a player gains **Panic**.

Panic makes you less effective:

**0 Panic:** normal  
**1 Panic:** –1 action when threatened  
**2 Panic:** movement generates +1 noise  
**3 Panic:** character panics/runs automatically

Now you've got a vicious feedback loop:

**Danger → Panic → more noise → more danger**

And players have to help each other stay calm.

---

### 9\. The best version: "Noise budget"

I'd actually give the players a **limited amount of noise they can safely make each round**.

Imagine the group has a shared dial:

### SAFE NOISE: 0–4

You can do things without too much consequence.

### DANGER: 5–7

The Graboid starts actively hunting.

### CRITICAL: 8+

Something bad happens.

But players can deliberately exceed the limit.

So you get conversations like:

> "I need one more action to get the explosives."
> 
> "That puts us at 7."
> 
> "We can handle 7."
> 
> "No, last time we hit 7 it came up under us."
> 
> "We've got no choice."
> 
> **+3 NOISE**
> 
> _Graboid activation._

That is the kind of decision-making I'd aim for.

---

## A mechanic I'd particularly recommend

I'd combine **three systems**:

**1\. Local noise tokens**  
→ tells the Graboid where to go.

**2\. A global threat track**  
→ tells you how aggressive the Graboid is.

**3\. A time/doom track**  
→ prevents players from simply sitting still until everything becomes quiet.

That gives you a really nice triangle:

**ACT** → make noise → **DANGER**

**WAIT** → stay quiet → **TIME RUNS OUT**

**DISTRACT** → make noise somewhere else → **MOVE THE MONSTER**

And importantly, **none of the choices are obviously correct**.

That's the heart of a good _Tremors_ board game.

If you're aiming for something more like **a 60–90 minute semi-cooperative game for 2–5 players**, I can also flesh this into an actual core rules system—turn structure, Graboid AI, character abilities, map design, dice/cards, win conditions and a first playable prototype.

  
#### You said:

Could have per turn noise total for all players, so collective noise has thresholds that cause bad things like more aggressive graboids, more graboids, more graboids movement or something. Also need a thematic set of objectives. I was thinking phase 1 in town, then board folds out to perfection valley for phase 2 escape

Show moreShow less

  
#### ChatGPT said:

Yes — I think the **per-turn collective noise total** is actually cleaner than individual noise tokens, especially if you want the game to feel like a tense _Tremors_ scenario rather than a fiddly simulation.

The two-phase structure is also excellent. I'd make the game essentially a **pressure cooker that starts in Perfection and then explodes into an escape across the valley**.

## Core structure

### Phase 1 — Perfection

Players have a set of objectives they need to complete around town before they can escape.

Each round:

1. Players secretly/individually choose actions.
2. Resolve player actions.
3. **Add up all noise generated this round.**
4. Compare the total against the **Noise Thresholds**.
5. Apply a Graboid response.
6. Reset noise to zero.

So players are constantly thinking:

> "I've got one action left. I can do it, but it'll generate 2 noise. What have everyone else done?"

That creates a nice collective dilemma.

---

# The Noise track

I'd make it something like:

| Noise this round | Consequence                                       |
| ---------------- | ------------------------------------------------- |
| 0–3              | Quiet                                             |
| 4–6              | **Movement** — Graboids move                      |
| 7–9              | **Hunting** — additional Graboid movement + event |
| 10–12            | **Frenzy** — aggressive behaviour / attack        |
| 13+              | **Stampede** — new Graboid enters                 |

But I'd make the thresholds **variable**.

For example, at the beginning of the game:

> **Noise Limit: 6**

Once the players trigger a major event, the limit drops:

> **Noise Limit: 5**

Later:

> **Noise Limit: 4**

This represents the Graboids becoming increasingly aware of the survivors.

So the game progressively tightens the noose.

---

# More importantly: different thresholds do different things

Rather than simply:

> "You made 8 noise, draw a bad card."

I'd have a **Graboid Response table**.

### 4 Noise — Stirring

One Graboid moves towards the players' general location.

### 6 Noise — Hunting

All active Graboids move 1 space.

### 8 Noise — Aggressive

Graboids move 2 spaces **or** one makes a surprise attack.

### 10 Noise — Feeding Frenzy

Spawn a new Graboid **or** activate an existing Graboid twice.

### 12 Noise — Underground

Every Graboid disappears underground and re-emerges somewhere advantageous.

That gives players a reason to care about _how much_ noise they generate.

---

# And I'd introduce "noise spikes"

Some actions shouldn't just add noise — they should be **events**.

For example:

**Start the bulldozer: +5 noise**

**Fire shotgun: +3**

**Fire dynamite: +6**

**Drive truck: +4**

But perhaps:

> **Dynamite: +6 noise and immediately resolve the 8-noise effect.**

That's terrifying.

You can imagine the table:

> "We're already at 5."
> 
> "We need the dynamite."
> 
> "That's +6."
> 
> "Yep."
> 
> "...do it."

---

# Phase 1: Perfection objectives

I'd avoid making these simply "collect five things."

They should feel like **the characters preparing the town for the inevitable escape**.

I'd divide objectives into categories.

### Communication

* Repair the radio.
* Contact the outside world.
* Establish a signal.
* Discover that the roads are blocked.

### Supplies

* Find ammunition.
* Collect food/water.
* Get medical supplies.
* Locate fuel.

### Vehicles

* Repair a vehicle.
* Find keys.
* Get fuel.
* Clear an exit route.

### Weapons / defence

* Retrieve the rifle.
* Collect dynamite.
* Prepare an improvised weapon.
* Reinforce a building.

### Information

This is particularly important.

Players should gradually discover:

> **The Graboids are everywhere.**

For example, objectives could reveal:

**"Investigate the tremors."**

→ Place first Graboid.

**"Search the construction site."**

→ Discover that Graboids can't cross certain terrain.

**"Examine the dead sheep."**

→ Learn something about their hunting behaviour.

That makes the first phase feel like an unfolding story rather than a checklist.

---

# The Phase 1 climax

I wouldn't let players simply complete the objectives and say:

> "Okay, now we go to Phase 2."

I'd have a **trigger event**.

Once enough objectives are completed:

## "The Last Road"

The players discover that **the road out of Perfection is blocked**.

Then perhaps they get a choice:

### Route A — The Road

Fastest.

Extremely noisy.

### Route B — The Mountains

Longer.

Much quieter.

### Route C — The Valley

Dangerous but contains additional supplies.

And that's when you **fold out the second board**.

That's a fantastic physical moment.

---

# Phase 2 — Perfection Valley

I'd make this fundamentally different from Phase 1.

Phase 1 is:

**Explore → prepare → investigate → survive**

Phase 2 is:

**MOVE → ESCAPE → DON'T STOP**

The board unfolds and suddenly the players have a much larger landscape.

4

You could have:

* Perfection
* Highway
* Desert
* Mountains
* Mine
* Old observatory
* Dry riverbed
* Power station
* Cliffs
* Rocky terrain

And the players need to reach an **extraction point**.

---

# The clever bit: the valley changes the noise rules

Now you can have different terrain produce different noise.

| Terrain      | Noise |
| ------------ | ----- |
| Sand         | 0     |
| Dirt         | 1     |
| Rocks        | 2     |
| Road         | 2     |
| Vehicle      | 4     |
| Metal bridge | 3     |

So suddenly the map itself becomes a puzzle.

A player might say:

> "We can go straight across the road and get there in three turns."

Someone else:

> "Yeah, but we'll generate 6 noise every turn."

Another:

> "Go through the rocks. It'll take twice as long."

And someone inevitably says:

> "I'll drive the truck."

Everyone:

> **"NO."**

😂

---

# Give the players a reason to split up

This could be particularly good.

Certain objectives require players to separate:

> **Turn off the generator.**

> **Retrieve the fuel.**

> **Open the mountain gate.**

> **Activate the radio tower.**

But splitting up increases vulnerability.

So you get another core tension:

**Stay together = safer, slower**

**Split up = faster, dangerous**

---

# One thematic objective I'd definitely include

### "Get to the high ground."

The players eventually realise that **Graboids can't reach certain elevated terrain**.

So the final objective isn't simply:

> Reach the exit.

It's:

> **Reach the mountains.**

That gives the entire second phase a narrative purpose.

And then the final few turns could be absolutely brutal.

Players are exhausted, resources are running out, the noise thresholds are low, and the Graboids are getting increasingly aggressive.

Then someone has to make the decision:

> "We need to cross the valley."

> "That's going to generate 10 noise."

> "I know."

> "That'll spawn another Graboid."

> "I know."

> "Then we're probably dead."

> "Unless we run."

**And everyone runs.**

That feels like _Tremors_.

---

## One further idea I'd strongly consider: Graboid "intelligence"

Don't make the Graboids completely random.

Give them a simple AI:

**Hear → investigate → hunt → attack**

But let the players learn their behaviour during Phase 1.

Then Phase 2 tests whether they've actually understood the creature.

For example, players discover:

* Graboids prioritise the loudest noise.
* They can't sense stationary players well.
* They avoid certain terrain.
* They can detect vehicles from further away.
* Multiple Graboids can converge on the same noise.
* Explosions attract everything nearby.

That means **information gathered in Phase 1 directly improves your chances in Phase 2**.

That could make the whole game feel like one escalating story rather than two separate games.

  
Yesterday 9:58 PM

#### You said:

Can you flesh out the objectives, including consequences of passing/fail. There could be multiple objectives ves on cards and you pick Randomly each game. Some could be Essential, some optional but with cost of failure. All should be thematic and some could have involve known characters.

  
#### ChatGPT said:

Yes. I think the objective deck could become one of the best parts of the game. The key is that **objectives should create problems, not just tasks**. Completing them gives the players tools, information or safer routes into Phase 2; failing them should alter the board and make the escape harder rather than simply saying "lose."

The film gives you a surprisingly good foundation: the road is blocked, phones/communications fail, Rhonda's seismic observations matter, Burt and Heather have supplies, Walter has the store and horses, Nancy has Mindy to worry about, Miguel has the ranch, and the final escape depends on the heavy loader. IMDb+1

## How I'd structure the objective deck

I'd use **three card types**:

**Essential** — these must be completed to unlock Phase 2.

**Optional** — not needed to escape, but provide significant benefits. Failure has a consequence.

**Character** — tied to a named character. Some are Essential, some Optional. They create narrative situations and give the characters personality.

At the start of a game, perhaps draw:

* **4 Essential objectives**
* **4 Optional objectives**
* **2 Character objectives**

Then shuffle them into a loose sequence, so you don't know exactly what you're going to need.

That means one game might be about getting the radio working and saving Miguel's cattle, while another revolves around Burt's arsenal and recovering the Caterpillar.

---

# ESSENTIAL OBJECTIVES

These should feel like the things the survivors **have to accomplish to escape Perfection**.

### 1\. The Road Is Blocked

**Objective:** Investigate the roadblock.

The players must reach the blocked highway and discover what happened.

**Pass:**  
Reveal the _Blocked Road_ location and gain the **Alternative Route** objective.

**Fail:**  
The players realise the road cannot be cleared. Put a permanent **Danger Zone** on the road and increase the Graboid aggression level by 1.

This is a good early objective because it establishes that **escape isn't going to be straightforward**, mirroring the film. IMDb

---

### 2\. Get the Radio Working

**Objective:** Repair Walter's CB/radio and establish contact outside Perfection.

**Pass:**  
Players may communicate with the outside world and gain one **Rescue** token.

**Fail:**  
No rescue attempt is possible. Every 2 rounds, add 1 to the global **Desperation** track.

**Twist:** Repairing it generates noise.

That makes this a great example of the central mechanic:

> "We need the radio, but fixing it is going to attract something."

---

### 3\. Find Rhonda's Seismograph

**Objective:** Reach Rhonda's equipment and recover her seismic readings.

**Pass:**  
Players learn **Graboid Movement Rules**: reveal one piece of information about how Graboids hunt.

For example:

> Graboids always investigate the greatest noise source within X spaces.

**Fail:**  
The players don't know where the creatures are heading. Add a **Blind Hunting** modifier to Phase 2.

Rhonda is particularly useful because her role in the movie is literally turning observations of the tremors into knowledge about the creatures. IMDb

---

### 4\. Secure a Heavy Vehicle

**Objective:** Locate and prepare the Caterpillar loader.

**Pass:**  
The **Loader** becomes available in Phase 2.

**Fail:**  
The loader starts damaged. It requires an additional repair objective during the escape.

This should be one of your most important objectives because the loader is ultimately the solution the characters devise for getting across the valley. IMDb

---

### 5\. Find the Safe Ground

**Objective:** Determine which terrain is safe from Graboids.

**Pass:**  
Reveal the **Solid Rock** areas of the valley.

**Fail:**  
Phase 2 begins with some terrain unexplored. Players don't know which routes are safe until they physically investigate them.

This creates an information advantage without making failure immediately catastrophic.

---

### 6\. Get Everyone to the Meeting Point

**Objective:** Establish a safe location where survivors can gather.

**Pass:**  
Create the **Assembly Point** on the town map.

**Fail:**  
Survivors begin Phase 2 scattered across three starting locations.

This is a really useful objective because it turns **NPC positioning into a concern**.

---

# OPTIONAL OBJECTIVES

These shouldn't feel like side quests. They should be **tempting choices that make the final escape easier**.

### 7\. Walter's Store

**Objective:** Search Walter's store for useful supplies.

**Pass:**  
Gain 3 random Supply cards.

**Fail:**  
Place a **Looted** marker. No further supplies can be obtained there.

**Special:** If Walter is still alive/present, he contributes an extra item.

Walter's store is an obvious treasure location because it's one of the town's central gathering points. IMDb

---

### 8\. Burt's Arsenal

**Objective:** Help Burt retrieve weapons from his home.

**Pass:**  
Gain **2 weapons + 1 ammunition cache + 1 explosive**.

**Fail:**  
Burt refuses to leave without his equipment.

That could become extremely interesting:

> If this objective fails, Burt is still at his house when Phase 2 begins.

Now the players may have to decide whether to risk going back for him.

Burt's enormous weapons collection is firmly established in the film. IMDb+1

---

### 9\. Gather Fuel

**Objective:** Find fuel for vehicles/generator.

**Pass:**  
Gain 3 Fuel.

**Fail:**  
All vehicle movement generates +1 additional Noise during Phase 2.

That's a nice consequence because it ties directly into your signature mechanic.

---

### 10\. Recover the Medical Supplies

**Objective:** Search the doctor's home/clinic.

**Pass:**  
Gain 2 Medical supplies.

**Fail:**  
Place one **Injury** card into the survivor deck.

This also gives Jim and Megan a logical presence without requiring you to make them playable.

---

### 11\. Save the Horses

**Objective:** Bring Walter's horses to safety.

**Pass:**  
Gain **2 Quiet Movement** resources for Phase 2.

**Fail:**  
Remove the horses.

That sounds minor, but it could make an alternative escape route unavailable.

The horses are actually used as part of the characters' attempt to get help in the film. IMDb

---

### 12\. Salvage the Trailer

**Objective:** Find the old metal trailer that can be attached to the loader.

**Pass:**  
Unlock the **People Carrier** upgrade for the Caterpillar.

**Fail:**  
The loader can carry only 2 survivors at a time.

That could be brutal.

---

# CHARACTER OBJECTIVES

This is where I'd really lean into the movie.

Instead of having generic "fetch item" cards, a character objective should feel like a **little scene from Tremors**.

---

## BURT — "You People Got a Problem With Being Prepared?"

**Objective:** Recover Burt's ammunition and weapon stores.

**Pass:**  
Add Burt's **Arsenal** card to the team supply.

**Failure:**  
Burt begins Phase 2 with only his personal weapon.

**Extra rule:**  
Completing the objective generates **+4 Noise**.

That creates an excellent choice:

> We desperately need the weapons... but raiding Burt's basement is loud.

Burt's preparedness and arsenal are central to his character in the film. IMDb

---

## HEATHER — "Keep Everyone Calm"

**Objective:** Heather must coordinate the survivors and stop panic spreading.

Players must have at least three survivors at the designated safe location.

**Pass:**  
Reduce **Panic** by 2.

**Fail:**  
Increase Panic by 2.

Heather becomes the character who stabilises the group rather than simply being another shooter.

---

## RHONDA — "Something Doesn't Add Up"

**Objective:** Collect enough seismic readings to determine Graboid behaviour.

**Pass:**  
Reveal two hidden Graboid movement rules.

**Fail:**  
The Graboid AI gains the **Unpredictable** trait.

This is one of my favourites because it rewards players for understanding the creature rather than simply killing it.

Rhonda's seismology work and her use of the readings to understand Graboid behaviour are directly grounded in the film. IMDb

---

## WALTER — "The Store Has Everything"

**Objective:** Walter needs to inventory the store before everyone leaves.

**Pass:**  
Draw 4 Supply cards and keep 3.

**Fail:**  
Discard one random supply category from the game.

**Twist:**\*\*

Walter refuses to leave until it is completed.

So suddenly:

> "We're trying to get everyone out."

> "Walter is still in the store."

> "Of course he is."

---

## NANCY — "Where's Mindy?"

This could be a **timed objective**.

**Objective:** Find Mindy and bring her to safety.

**Pass:**  
Gain **Mindy's Lucky Pogo** / **Quiet Movement** ability.

**Fail:**  
Mindy begins Phase 2 separated from the group, creating a rescue objective.

This is particularly thematic because Nancy is specifically trying to find Mindy while the town is becoming overwhelmed. IMDb

---

## MIGUEL — "The Herd"

**Objective:** Secure Miguel's remaining cattle.

**Pass:**  
Gain livestock as a distraction resource.

**Fail:**  
Remove the cattle and add **+1 permanent Graboid aggression**.

This one could be extremely clever.

During Phase 2:

> **Release cattle:** +5 Noise at a chosen location.

The players can essentially use the herd to **draw a Graboid away**.

Very _Tremors_.

---

## MELVIN — "Hey! Watch This!"

**Objective:** Melvin attempts a prank.

The player can choose whether to indulge him.

**Pass:**  
Gain a powerful **Distraction** card.

**Failure:**  
Melvin creates +5 Noise and immediately triggers the current Graboid threshold.

This could be a fun push-your-luck card.

The film actually has Melvin fooling everyone with a fake Graboid attack, after which Burt warns him how close he came to being shot. IMDb+1

---

# A particularly good objective: "The Basement"

This could be a special **high-risk optional objective**.

### THE BASEMENT

**Objective:** Search an enclosed building that may contain valuable supplies.

**Reward:** Draw 5 Supply cards. Keep 3.

**But:**  
The search generates **Noise every turn**.

At any point the players can abandon the search.

If they complete it:

> Gain the supplies **and** a powerful piece of equipment.

If they fail:

> The Graboid breaches the building and the location becomes inaccessible.

This captures the movie's great recurring idea that **being inside a building does not necessarily protect you**. The Graboids eventually begin attacking structures rather than merely waiting for people to come outside. IMDb

---

# Some objectives should have "success at a cost"

I think this is very important.

Don't make every card:

**PASS = good / FAIL = bad**

Some should say:

### "Complete the objective OR abandon it."

Then the players choose.

For example:

**Recover Dynamite**

**Complete:**  
Gain 2 Dynamite.  
**Cost:** +6 Noise immediately.

**Abandon:**  
No Dynamite, but no noise.

That makes objectives part of the strategic decision-making rather than merely a checklist.

---

# I'd also introduce three kinds of failure

This would make the deck much more interesting.

### Soft failure

You lose the reward.

> Fail to gather fuel → no fuel.

### Escalation

The board becomes more dangerous.

> Fail radio repair → Noise Threshold decreases by 1.

### Story failure

The situation changes permanently.

> Fail "Save Mindy" → Mindy starts Phase 2 somewhere else.

That last type is especially powerful because **failure creates new objectives**.

---

# The really interesting part: Objective chains

Some cards shouldn't stand alone.

For example:

**1\. The Radio Is Dead**

↓

**2\. Find Spare Parts**

↓

**3\. Repair the CB**

↓

**4\. Call for Help**

You don't necessarily put all four into every game.

Instead, the first card says:

> **Draw Objective: Radio**

and then that card determines which follow-up gets added.

So the deck becomes **modular story generation**.

Another chain:

**Rhonda's Readings**

→ **Determine Graboid Behaviour**

→ **Find Solid Rock**

→ **Map Safe Route**

That would make the Rhonda storyline feel like an investigation.

---

# And then Phase 1 should end with one of several possible "Escape Plans"

This is where I think your folding board idea gets really strong.

Once the required Essential objectives are complete, reveal an **Escape Plan card**.

For example:

### ESCAPE PLAN: THE LOADER

Requires:

* Heavy Vehicle
* Trailer
* Fuel

**Phase 2:** Slow but carries everyone.

### ESCAPE PLAN: THE MOUNTAIN ROUTE

Requires:

* Seismic Information
* Safe Ground
* Climbing Gear

**Phase 2:** Longer route but generates less Noise.

### ESCAPE PLAN: THE DISTRACTION

Requires:

* Explosives
* Fuel
* Decoy

**Phase 2:** Very short route, but starts with multiple active Graboids.

So the objectives you've successfully completed determine **what sort of Phase 2 you get**.

That's the direction I'd take this in: **Phase 1 isn't just preparing for Phase 2; it determines how Phase 2 plays.**

And there is a lovely thematic logic to it: in the film, the survivors gradually move from _"What is killing us?"_ to _"How do we understand it?"_ to _"How do we get out?"_ before arriving at the improvised heavy-vehicle escape plan. IMDb

### A possible objective deck

For a first prototype, I'd aim for about **30 cards**:

**10 Essential**

* The Road Is Blocked
* The Radio
* Rhonda's Readings
* Safe Ground
* Heavy Vehicle
* Fuel
* The Meeting Point
* The Trailer
* Secure the Escape Route
* The Final Preparations

**12 Optional**

* Walter's Store
* Burt's Arsenal
* Medical Supplies
* Save the Horses
* Gather Food
* Gather Water
* Salvage Fuel
* Search the Mine
* Recover Explosives
* Secure the Generator
* Find the Old Jeep
* Rescue a Stranded Survivor

**8 Character**

* Burt — The Arsenal
* Heather — Keep Everyone Calm
* Rhonda — Something Doesn't Add Up
* Walter — The Store Has Everything
* Nancy — Where's Mindy?
* Miguel — The Herd
* Melvin — Watch This!
* Val & Earl — One Last Job

That gives you enough variety that **the same map can tell a different story every game**, while the noise system ties all the objectives together.

Sources

  
Today 7:33 AM

#### You said:

Plan the map details, starting with the town. Don't create one, just talk me through the best options on how it could work, eg hexes, nodes and edges, etc. each phase needs to last around 20-30 minutes.

  
#### ChatGPT said:

Yes. For this game I'd strongly favour a **hybrid node-and-area map**, rather than traditional hexes. You want the map to support tactical movement, but you also want the locations to feel like _places from Tremors_, because the objectives are going to say things like "Get to Burt & Heather's house" rather than "move to hex 17."

The fact that each phase is only **20–30 minutes** is important: the map should create decisions quickly and avoid players spending half the game calculating movement.

## 1\. My preferred approach: location nodes connected by routes

Think of Perfection as perhaps **12–16 major locations**, connected by roads, tracks and paths.

Something roughly like:

```
                 [Mountain Road]
                       |
                 [Store / Centre]
                  /     |      \
          [Walter]   [Road]   [Bar]
             |         |        |
       [Burt & Heather] |    [Clinic]
             |         |        |
          [Ranch] ---- [School]
                       |
                  [Workshop]
                       |
                 [Highway / Exit]

```

But the actual board wouldn't necessarily be laid out this neatly.

Each location is a **node**, and the lines between them are **edges/routes**.

This has several advantages.

### Locations are meaningful

A card can say:

> **Burt's Arsenal:** Search Burt & Heather's house.

rather than requiring players to identify a specific hex.

### Routes can have characteristics

An edge can be:

* Road
* Dirt track
* Open ground
* Rocky ground
* Building interior
* Dangerous crossing

And each can have a **movement cost and Noise value**.

For example:

| Route        | Movement | Noise |
| ------------ | -------- | ----- |
| Dirt road    | 1        | +1    |
| Gravel       | 1        | +2    |
| Open ground  | 2        | 0     |
| Rocky        | 2        | 0     |
| Vehicle road | 1        | +2    |

That makes movement itself part of your central game mechanic.

---

# 2\. Don't make every location a node

I'd have **three scales of location**.

### Major locations

These are objective locations.

Examples:

* Walter's store
* Burt & Heather's house
* Rhonda's camp
* Miguel's ranch
* Clinic
* Workshop
* School
* Fuel station
* Water tower
* Radio tower
* Highway
* Mountain pass

These get proper spaces on the board.

### Minor locations

These are represented by icons along routes.

Examples:

* Abandoned vehicle
* Water tank
* Equipment shed
* Dead livestock
* Farmhouse
* Construction site

They can contain supplies or trigger events without needing a big location.

### Terrain

Everything between locations is simply terrain.

This is important because **Graboids should care about where players are, not just which named building they're in.**

---

# 3\. Give every location a "noise profile"

This could be a really nice design layer.

Some locations are naturally quiet.

**Fields**

> Noise generated here: ×0.5

Others amplify noise.

**Metal workshop**

> Noise generated here: ×2

And some offer protection.

**Solid building**

> Graboid cannot directly attack while players remain inside — but noise can still attract it.

That gives locations mechanical identity beyond "draw two cards here."

For example:

### Burt's House

* Search value: ★★★
* Noise: +1
* Defence: High
* Special: Arsenal

### Walter's Store

* Search value: ★★
* Noise: +1
* Special: Supplies

### Open Field

* Search value: 0
* Noise: +0
* Defence: None
* Graboid danger: Extreme

### Workshop

* Search value: ★★★
* Noise: +2
* Special: Vehicle repairs

---

# 4\. The critical thing: buildings should be safe, but not _too_ safe

I'd avoid the classic board-game mistake of making buildings simply "safe zones."

Instead:

### Inside a building

Graboids **can't immediately attack you**.

But:

* Noise still attracts them.
* Some events can damage the building.
* A Graboid can surround the building.
* Leaving becomes dangerous.

This creates situations where the players effectively say:

> "We're safe in here."

Then:

**Noise: 6**

> **GRABOID HUNTING**

And now the players have a problem.

They're safe **for now**, but they've attracted something outside.

---

# 5\. I'd use a small number of "safe ground" spaces

This is where your Tremors theme can really shine.

The town board should contain several areas that are effectively **Graboid-proof**:

* Buildings
* Large rocks
* Foundations
* Raised structures
* Rooftops

But they're not necessarily connected.

So the players need to navigate:

**Safe → dangerous → safe**

rather than simply walking around freely.

This also prepares players for the Phase 2 revelation that **high ground is their ultimate escape**.

---

# 6\. How I would handle Graboids

This is where I would _not_ use the same movement system as the players.

Players use:

**nodes + routes**

Graboids use:

**underground zones + noise attraction**

Imagine the town divided into perhaps **6 underground sectors**.

The players don't necessarily see the Graboids.

You might have:

> **Graboid A — Sector 3**

and it moves toward the noise generated in adjacent sectors.

This gives you the classic feeling of:

> "It's somewhere around here."

rather than:

> "The monster is sitting on hex C7."

That's much scarier.

---

# 7\. Use "tremor" markers

I'd make these one of the physical signatures of the game.

When the Graboid moves underground, don't necessarily reveal its location.

Instead:

**THUMP**

Place a Tremor marker.

Players know:

> Something moved from this direction.

But not necessarily exactly where.

If multiple Tremor markers converge, players can start deducing where the Graboid is.

This makes Rhonda's objectives especially valuable because she can potentially turn this hidden information into useful information.

---

# 8\. Town should be fairly compact

For a **20–30 minute Phase 1**, I'd target roughly:

### 12 major locations

### 6–10 minor locations

### 4–6 major routes

The important thing is that **most places should be 1–3 movements away from each other**.

You don't want:

> "I need to get to the radio tower."

> "That's seven turns away."

That's too slow.

You want:

> "The radio tower is two moves away, but the route crosses open ground."

Now the question is interesting.

---

# 9\. I'd give the town a central "hub"

Something like:

### Perfection Centre

This is where players naturally regroup.

It could contain:

* Store
* Bar
* Road junction
* Telephone/CB
* Community area

It becomes the **strategic centre of the map**.

But there's a catch:

### It's noisy.

Several roads converge there, so it's easy for Graboids to reach.

That means the safest place to regroup is also potentially the place that becomes most dangerous.

---

# 10\. Give the town asymmetry

Don't make the board a neat grid.

I'd deliberately create:

### North

Mountains / rocky terrain

### Centre

Dense town / buildings / roads

### East

Ranches / open ground

### South

Workshop / highway / escape route

### West

Fields / isolated buildings / dangerous open terrain

This makes the board immediately readable.

And more importantly, **the escape direction becomes geographically meaningful**.

---

# 11\. A possible town layout

Conceptually, I'd aim for something like:

```
                     MOUNTAINS
                 [Rocky Ground]
                      |
                [Radio Tower]
                      |
        [Rhonda] -- [North Road]
            |            |
        [Ranch] ---- [TOWN CENTRE]
            |          /     \
        [Cattle]  [Store]  [Burt]
            |          \     /
        [Open Field] -- [Workshop]
                         |
                    [Fuel Depot]
                         |
                     [Highway]
                         |
                  → VALLEY BOARD

```

But I'd add several alternative connections so that players have choices.

The important thing is that **the highway shouldn't simply be the obvious exit**.

It might initially look like the escape route, only for the players to discover that it's blocked.

That's your first big objective.

---

# 12\. Make Phase 1 a "shrinking map"

This could be fantastic.

At the beginning, almost the entire town is accessible.

As Graboids become more aggressive, certain routes become **dangerous**.

For example:

**Graboid Breach**

> This road is now considered Open Ground.

Or:

**Collapsed Building**

> Remove this connection.

Or:

**Burrowed Road**

> Vehicles may no longer use this route.

So the map gradually becomes less accessible.

The players aren't merely racing against time.

**The town is closing around them.**

That would make the final transition to Phase 2 feel earned.

---

# 13\. Then the fold-out becomes dramatically different

I'd make Phase 1's board relatively **dense and enclosed**.

Lots of:

* buildings
* short routes
* intersections
* hiding places
* objectives

Then unfold the second board and suddenly have:

**wide open spaces.**

The visual transition itself tells the players:

> _You're leaving civilisation._

And mechanically, Phase 2 becomes much more about **route planning and noise management**.

---

# 14\. Phase 2 should probably be a point-to-point map too

I'd resist switching to hexes just because the valley is larger.

Instead, I'd use **larger terrain areas connected by routes**, perhaps 15–20 spaces.

Something like:

```
                 HIGH GROUND
                /           \
        Rocky Ridge       Old Mine
             |               |
        Dry Riverbed ---- Canyon
             |               |
       Desert Crossing ---- Road
             |               |
          Quarry ------- Valley
             |
        Perfection

```

But each area is physically much larger than a town node.

You can then have **multiple routes between major areas**, allowing players to choose:

> Short + noisy

or

> Long + quiet.

---

# 15\. One thing I'd absolutely avoid

### Traditional hex-by-hex movement.

I think it would make the game feel too much like a generic tactical skirmish game.

You don't want players thinking:

> "I have 4 movement points and the Graboid has 5."

You want:

> "We need to get from the workshop to the radio tower. We can take the road, but that'll make noise, or go through the fields and risk being exposed."

The latter is much more _Tremors_.

---

# My recommended physical design

For the first prototype I'd build:

### Phase 1 — Perfection

**\~12 major locations**

**\~8 minor locations**

**\~20–25 connections**

Each connection has:

* Movement cost
* Noise value
* Terrain type

Each major location has:

* Search/action spaces
* 1–2 objective hooks
* Special ability/resource
* Safe/unsafe status

Underneath that, divide the town into **5–6 hidden Graboid sectors**.

### Phase 2 — Valley

**\~15 major terrain spaces**

**\~25 connections**

More open, fewer safe locations.

Multiple possible escape routes.

And crucially, **Phase 2 should inherit the consequences of Phase 1**:

* Failed fuel objective → vehicle noisy
* Failed Rhonda objective → weaker Graboid information
* Failed Burt objective → fewer weapons
* Failed rescue objective → NPCs start separated
* Damaged loader → slower escape
* High aggression → more starting Graboids

That gives you a really satisfying structure:

**Phase 1 isn't "Level 1."**

It's the players **creating the conditions under which their escape will happen**.

Then the board folds out, and they discover whether the decisions they made during those first 20–30 minutes were actually good enough.

  
#### You said:

We could put pressure on players by having a "calamity" deck which controls events like graboid breach or collapsed buildings. These could be perfect turn or we could have a limited number of rounds in phase 1 with a turn track showing when to draw from the deck, eg turns 4, 7, 9, 11, 12... Followed by a forcing element kicking them out to phase 2.

Show moreShow less

  
#### ChatGPT said:

Yes — I think this is **better than a conventional countdown timer**, because the players can see that something is coming without knowing exactly what it will be. It also lets you create a scripted _Tremors_\-style escalation while keeping replayability.

I'd make the **Calamity deck the clock**.

## The basic structure

Phase 1 has a fixed number of rounds — perhaps **12**.

At the top of the board is a track:

**1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10 — 11 — 12 — ESCAPE**

Certain spaces have a **Calamity icon**:

> **4 → 7 → 9 → 11 → 12**

When the round ends on one of those spaces, draw a Calamity.

The players therefore know:

> "We've got three turns before something happens."

But they don't know **what**.

That's exactly the kind of pressure I'd want.

---

# Don't make the Calamities purely random

I'd have **three levels of Calamity**.

### Early game — Something's Wrong

Turns 4–6

Mostly disruption and information.

Examples:

* Tremor detected
* Livestock disappears
* Power failure
* Road damage
* Strange vibration
* Someone sees something underground

### Mid game — Perfection Is Falling Apart

Turns 7–10

Actual threats begin.

* Graboid breach
* Building collapse
* Route blocked
* NPC trapped
* New Graboid appears
* Safe location becomes unsafe

### Late game — Get Out

Turns 11–12

Major disasters.

* Multiple Graboid attack
* Highway collapses
* Building destroyed
* Power goes out
* Fire
* Graboid breaches town centre

This gives you a natural narrative arc:

**Something is happening → We're in serious trouble → GET OUT.**

---

# The really nice part: noise can manipulate the Calamity deck

I'd make Noise affect **which Calamity happens**.

For example, each Calamity card has a requirement:

> **GRABOID BREACH**  
> Requires Noise ≥ 6 this round.

If the requirement isn't met, draw again or resolve the alternative effect.

Or have cards with:

### QUIET

If noise was 0–3:

> Minor event.

### NOISY

If noise was 4–7:

> Graboid movement.

### VERY NOISY

If noise was 8+:

> Graboid breach.

Now players are effectively controlling the **severity of the clock**.

That is much more interesting than "draw a bad card."

---

# I'd actually have two decks

This could be excellent.

### Calamity deck

Things that happen because **time is passing**.

### Noise deck

Things that happen because **the players are making too much noise**.

The two systems then interact.

For example:

**Round 7:** Calamity card says:

> **TREMOR**  
> Move one Graboid towards the highest-noise area.

But if the players generated 8+ noise:

> **TREMOR → BREACH**  
> A Graboid immediately emerges.

So the same event can become much worse because of player behaviour.

---

# Or even better: a single deck with escalation

I think I'd probably go with **one deck**, because it's easier to run.

Each card has three outcomes:

### QUIET

Noise 0–3

### DISTURBED

Noise 4–7

### FRENZY

Noise 8+

For example:

---

### CALAMITY: COLLAPSE

**Quiet:**  
An abandoned building collapses. Remove one minor location.

**Disturbed:**  
A route collapses. Remove one connection.

**Frenzy:**  
A building collapses **with survivors inside**. Place a Rescue objective.

---

That is _very_ elegant.

The players know:

> "Calamity is happening next turn."

But they also know:

> "If we make loads of noise, we're going to get the nasty version."

---

# The turn track could itself tell a story

I'd avoid evenly spaced calamities.

Your example of:

**4, 7, 9, 11, 12**

is really good.

I'd perhaps make the track:

| Round  | Event            |
| ------ | ---------------- |
| 1      | —                |
| 2      | —                |
| 3      | —                |
| **4**  | ⚠ Calamity       |
| 5      | —                |
| 6      | —                |
| **7**  | ⚠ Calamity       |
| 8      | —                |
| **9**  | ⚠ Calamity       |
| 10     | —                |
| **11** | ⚠ Calamity       |
| **12** | ☠ Final Calamity |

That means the gap between calamities progressively shrinks.

**3 turns → 2 turns → 2 turns → 1 turn → 1 turn**

That's a fantastic pressure curve.

Players get breathing room early.

Then the game starts accelerating.

---

# And I would make the final Calamity mandatory

Round 12 shouldn't simply be:

> Draw a card.

It should be:

## PERFECTION FALLS

Something major happens regardless of the card.

For example:

> The town is no longer viable.  
> All remaining players and essential NPCs must leave Perfection.

Then the board **folds out**.

This is your physical "Act II" moment.

---

# The forcing mechanism is important

I wouldn't allow players to say:

> "We'll just stay in Burt's house."

At the end of Round 12:

### **EVACUATION**

* Remove all remaining town objectives.
* Lock all town locations.
* Spawn the Phase 2 Graboids.
* Move survivors to the chosen escape starting point.
* Resolve any unresolved Essential objectives as failures.
* Unfold the valley board.

The players don't necessarily **win Phase 1**.

They are simply **forced to leave before Perfection becomes completely untenable**.

That feels much more cinematic.

---

# You could even have the Calamity deck alter the map

This is where I think the mechanic becomes really strong.

A Calamity doesn't necessarily damage players.

It damages **the board**.

For example:

### ROAD COLLAPSE

Remove this edge.

### BUILDING BREACH

This location is no longer safe.

### POWER FAILURE

Remove electricity-dependent actions.

### FIRE

Place a fire marker. Entering/leaving generates +2 Noise.

### FLOODING

Remove one route.

### GRABOID BURROW

Place a hidden Graboid marker.

### PANIC

Move an NPC toward the nearest perceived safe location.

So **the map gets progressively worse**.

That means players aren't simply losing health.

They're losing **options**.

And that's much more interesting.

---

# Calamities should sometimes create opportunities

Don't make every card bad.

For example:

### GRABOID ATTACK

A Graboid attacks a building.

**Bad:** Building becomes unsafe.

**Good:** It leaves a huge open area where players can now identify its location.

Or:

### COLLAPSED ROAD

Road is destroyed.

**Bad:** Route lost.

**Good:** The rubble creates solid ground that Graboids cannot burrow through.

That gives players interesting tactical adaptations.

---

# One particularly thematic mechanic: "calamity previews"

I'd let players see **the next Calamity card** under certain circumstances.

Rhonda might have:

> **SEISMIC WARNING**  
> Once per game, look at the next Calamity.

Or the radio:

> **WEATHER REPORT**  
> Reveal the next Calamity but not its severity.

That makes information itself a resource.

And you could have an objective:

### "Read the Tremors"

**Success:** Look at the next two Calamity cards and reorder them.

Suddenly Rhonda isn't just providing flavour — she's mechanically helping the group manage the clock.

---

# I'd also tie Essential objectives to the clock

This is important.

Some objectives should have **deadlines**.

For example:

### REPAIR THE RADIO

Complete before Round 7.

**Success:** Radio available.

**Failure:** Radio is destroyed by the Round 7 Calamity and the rescue route is lost.

That creates genuine urgency.

Players can't just say:

> "We'll get around to it."

---

# This gives you three simultaneous pressures

And I think this is the core of your game:

### 1\. NOISE

**What are we doing right now?**

> "Can we afford to make this much noise?"

### 2\. CALAMITY CLOCK

**How much time do we have?**

> "We've got two turns before something happens."

### 3\. OBJECTIVES

**What do we need to accomplish before we leave?**

> "We need the fuel, radio and loader."

Those three systems collide.

And crucially, **players can't optimise all three simultaneously**.

That's where your tension comes from.

---

## I'd prototype Phase 1 like this

**12 rounds**

**Calamities:** 4, 7, 9, 11, 12

**Players:** 2–5

**Each round:**

1. Players take their actions.
2. Resolve noise.
3. Resolve Graboid behaviour.
4. Advance the clock.
5. If the space has a Calamity symbol, draw a card.
6. Resolve Calamity based on that round's Noise.
7. Check objectives.
8. Start next round.

Then:

### Round 12 — PERFECTION FALLS

Resolve the final Calamity → force unresolved Essential consequences → **fold out the valley**.

That gives you a very clean **20–30 minute first act** while still allowing the actual game state to be wildly different from game to game.

And I'd make the **Calamity deck perhaps 24–30 cards**, with roughly a third involving Graboids, a third damaging/changing the town, and a third involving people, resources and environmental problems. That would give you enough variety without making the system feel random for randomness' sake.

  
Today 3:14 PM

#### You said:

Can you detail the card deck in a table, keeping them thematic with plenty of flavour text referencing the movie.

  
#### ChatGPT said:

Absolutely. I’d make the **Calamity deck one of the main sources of narrative** rather than a generic "bad event" deck. It should repeatedly recreate situations and ideas from the 1990 film: the blocked road, the strange tremors, buildings becoming unsafe, Burt’s weapons, the refrigerator noise, Mindy’s pogo stick, the Graboids learning, and finally the Caterpillar escape. IMDb+1

I’d start with **30 Calamity cards**. Each card has the same structure:

**Title → flavour → effect → Noise escalation**

The important design feature is that **Noise determines how bad the calamity becomes**. That makes your two systems reinforce each other.

### Suggested severity bands

| Noise this round  | Effect                              |
| ----------------- | ----------------------------------- |
| **0–3 Quiet**     | Unease / minor disruption           |
| **4–7 Disturbed** | Significant problem                 |
| **8+ Frenzy**     | Major disaster / Graboid escalation |

I'd also give some cards a special **"Already in Trouble"** condition so that the deck gets nastier as the game progresses.

---

# Calamity Deck — 30 cards

| #      | Calamity                       | Flavour text                                                                                                                                | Quiet: 0–3                                               | Disturbed: 4–7                                                         | Frenzy: 8+                                                                                                                     |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **1**  | **THE ROAD IS BLOCKED**        | _The route out of Perfection isn't looking promising. A landslide has done what the Graboids couldn't: it has cut the town off from Bixby._ | Place a **Blocked Route** token on the highway.          | Block the highway and one adjacent route.                              | A major collapse closes the highway completely. **Essential objective: Find Another Way Out** enters play.                     |
| **2**  | **STRANGE TREMORS**            | _There are no earthquakes on Rhonda's readings. Whatever is moving down there, it isn't following the rules._                               | Place 1 hidden Tremor marker.                            | Place 2\. Reveal one as a false lead.                                  | Activate the nearest hidden Graboid. It moves toward the highest-noise location.                                               |
| **3**  | **UNDERGROUND**                | _Something passes beneath the town. You don't see it. You don't need to._                                                                   | Nothing happens except a Tremor marker.                  | Move one Graboid one sector.                                           | Move **all** active Graboids toward the loudest location.                                                                      |
| **4**  | **THE DEAD SHEEP**             | _Fred's livestock didn't wander off. Whatever did this left very little behind. Nobody wants to be next._                                   | Reveal one unexplored location.                          | Remove one livestock/supply token.                                     | Increase Graboid Aggression by 1 and place a Tremor marker at the nearest ranch.                                               |
| **5**  | **EDGAR'S TOWER**              | _Someone climbed a utility tower carrying a rifle. Whatever chased him didn't have to follow him up._                                       | Gain a clue about Graboid behaviour.                     | Advance the **Desperation** track 1.                                   | Place a permanent **Unsafe Open Ground** zone beneath the tower.                                                               |
| **6**  | **TREMOR BREACH**              | _The ground moves. Dirt sprays. Then the town remembers exactly what is under it._                                                          | Nothing visible. Add a Tremor marker.                    | A Graboid surfaces at the loudest nearby area.                         | A Graboid **bursts into a town location**. That location immediately becomes unsafe.                                           |
| **7**  | **THEY'RE LEARNING**           | _The creatures aren't just following noise anymore. They're beginning to understand the pattern._                                           | No effect.                                               | Reveal one Graboid Behaviour card.                                     | Add the **Adaptive Graboids** rule: the first repeated tactic players use this round gets countered next round.                |
| **8**  | **THE FOUNDATION**             | _Being on top of something seemed like a good idea. Then the thing underneath started digging._                                             | Buildings remain safe.                                   | Mark one building as **Compromised**.                                  | A building becomes **Unsafe**. Any survivors there must move immediately.                                                      |
| **9**  | **POWER FAILURE**              | _The lights flicker. Then everything goes dark. Somewhere nearby, something starts moving._                                                 | Disable one powered location.                            | Disable all powered locations in one district.                         | Darkness causes **+1 Noise** for all actions until repaired.                                                                   |
| **10** | **THE REFRIGERATOR**           | _Nobody notices the refrigerator until it starts running. Suddenly, that familiar hum sounds like a dinner bell._                           | A powered location generates +1 Noise next round.        | Choose a powered location: it generates +2 Noise next round.           | A Graboid immediately moves toward the refrigerator's location.                                                                |
| **11** | **WHERE'S MINDY?**             | _Someone hears music. Someone else hears the unmistakable sound of a pogo stick. Everyone else hears impending disaster._                   | Place Mindy at a nearby safe location.                   | Mindy moves one space toward open ground.                              | Mindy becomes **Exposed**. A Graboid immediately hunts her location.                                                           |
| **12** | **THE POGO STICK**             | _It doesn't matter how often everyone says "stop jumping." Apparently the message isn't getting through._                                   | No effect.                                               | Generate +2 Noise at Mindy's location.                                 | Generate +4 Noise and immediately move the nearest Graboid toward her.                                                         |
| **13** | **THE BARBED WIRE**            | _The safest route through town has become exactly the opposite of safe._                                                                    | Place a **Hazard** marker.                               | The route requires an extra action to cross.                           | Any player crossing it must make a Noise check or become **Injured**.                                                          |
| **14** | **WALTER'S STORE**             | _The store is supposed to be the place where everyone gathers. Right now that feels less reassuring than it used to._                       | Store remains safe.                                      | Store becomes a **High-Value Noise Location**.                         | A Graboid attacks beneath the store. All players there must flee.                                                              |
| **15** | **NO SIGNAL**                  | _The radio crackles, cuts out and then gives you nothing. Bixby is still 38 miles away. It may as well be 380._                             | No effect.                                               | Radio objective is delayed one round.                                  | **Radio objective fails** unless already completed.                                                                            |
| **16** | **BURT'S ARSENAL**             | _Burt has spent years preparing for practically everything. Unfortunately, "giant underground predator" wasn't on the list._                | Burt gains one weapon.                                   | Burt gains a weapon but generates +2 Noise preparing it.               | **Weapon Cache discovered:** gain a powerful weapon, but immediately trigger a Graboid response.                               |
| **17** | **THE TUMBLER**                | _Burt's ammunition is getting polished. The machine is running. Heather has noticed something in the distance._                             | No consequence.                                          | Put **Machine Running** into play: +1 Noise each round until stopped.  | A Graboid moves directly toward Burt & Heather's location. This echoes the ammunition-polishing scene that attracts a Graboid. |
| **18** | **WRONG HOUSE**                | _The creatures don't know where everyone is hiding. They're trying buildings at random. For now._                                           | Nothing.                                                 | Roll for one occupied building: it becomes **Threatened**.             | The Graboid attacks the most occupied building.                                                                                |
| **19** | **THE TRAILER**                | _Nestor's trailer looked like shelter. The Graboids have another opinion._                                                                  | No effect.                                               | Trailer becomes unstable.                                              | Trailer is knocked over / destroyed. Any survivor there becomes **Exposed**.                                                   |
| **20** | **THE WATER TOWER**            | _The town suddenly has an excellent view. Unfortunately, the thing underneath has an excellent view of the town too._                       | Water tower becomes a safe observation point.            | Climbing to it costs an extra action.                                  | Water tower becomes **Compromised**. A Graboid attacks its base.                                                               |
| **21** | **A DECOY**                    | _Sometimes the best way to survive a Graboid is to persuade it that somebody else is more interesting._                                     | Gain a **Distraction** token.                            | Gain one, but place a Tremor marker.                                   | The distraction works spectacularly: redirect one Graboid, but spawn another movement activation.                              |
| **22** | **THE DEEPENING SILENCE**      | _Everything goes quiet. Nobody talks. Nobody moves. Somewhere below, something waits._                                                      | Remove one Noise marker / lower local threat.            | All players must decide: move cautiously or lose an action.            | **Ambush:** activate the nearest hidden Graboid before the next player acts.                                                   |
| **23** | **THE GROUND GIVES WAY**       | _A patch of earth collapses. The town suddenly has one less piece of itself._                                                               | Remove a minor route.                                    | Remove a route between two major locations.                            | Remove a route **and** create a new Graboid entrance point.                                                                    |
| **24** | **PANIC**                      | _There are only two options: stay where you are and hope, or run and hope. Neither sounds especially good._                                 | Nothing.                                                 | All NPCs move one space toward the nearest Safe Ground.                | Every exposed NPC generates +1 Noise as they flee; then activate the nearest Graboid.                                          |
| **25** | **THE BOMBS**                  | _Burt doesn't call them bombs. He calls them something considerably less reassuring._                                                       | Gain one explosive.                                      | Gain one explosive, +2 Noise.                                          | Gain one explosive and immediately trigger a **Graboid Frenzy**.                                                               |
| **26** | **BROKE INTO THE WRONG PLACE** | _The creature picks the wrong building. Then everyone inside makes it regret the decision._                                                 | If Burt is present, gain a defensive bonus.              | Defeat / repel a Graboid from one building.                            | If Burt is present, he can destroy one attacking Graboid—but the resulting gunfire adds **+3 Noise**.                          |
| **27** | **THEY'RE TESTING US**         | _First the store. Then the houses. Then the trailer. The next target won't be random._                                                      | Reveal one location that will be targeted next Calamity. | Reveal two.                                                            | Choose: **reveal the next Calamity** or immediately activate a Graboid.                                                        |
| **28** | **THE CATERPILLAR**            | _Thirty tons of machinery is suddenly looking less like construction equipment and more like a lifeboat._                                   | Reveal the Loader location.                              | Loader requires repair before use.                                     | Loader is damaged **and** generates +2 Noise whenever moved until repaired.                                                    |
| **29** | **NO WAY BACK**                | _Perfection was never exactly easy to leave. Now the town is actively refusing to let anyone go._                                           | Place one blocked route.                                 | Block two routes.                                                      | All remaining Essential objectives immediately become **Urgent**.                                                              |
| **30** | **GET OUT OF PERFECTION**      | _There comes a point where staying isn't brave anymore. It's just stupid._                                                                  | **Final evacuation warning.** One round remains.         | The evacuation begins immediately; skip remaining optional objectives. | **PERFECTION FALLS:** resolve the Phase 2 transition immediately. All unresolved Essential objectives become failed.           |

---

# A few cards I'd treat differently

I'd make perhaps **5–6 cards "major events"** that dramatically change the map rather than simply causing damage:

**The Road Is Blocked**  
**The Foundation**  
**Power Failure**  
**Ground Gives Way**  
**No Way Back**  
**Get Out of Perfection**

These are the cards that make players look at the physical board and realise:

> _"Oh. We don't have that route anymore."_

That's much more interesting than losing two health.

---

# The film references should be recognisable without becoming quote bingo

I'd deliberately reference **specific scenes and ideas** rather than fill every card with dialogue. For example:

* Edgar stranded on the tower
* Old Fred's sheep
* the blocked highway
* Rhonda's anomalous seismic readings
* the concrete aqueduct
* Mindy's pogo stick
* the refrigerator
* Burt's basement arsenal
* the ammunition tumbler
* the trailer being overturned
* the water tower
* the Caterpillar
* the bombs
* the boulder escape
* the Graboids learning to attack buildings

Those are all recognisable moments from the film and give the deck a strong sense of place.

I'd keep actual dialogue snippets **very short** and use original flavour text for the rest. That lets the cards feel like _Tremors_ without simply reproducing the screenplay. For example, "Graboids. That's it." is a brief recognisable nod to Walter naming the creatures.

---

# One design change I'd make to the deck

I wouldn't shuffle these 30 cards completely.

I'd divide them into **three stacks**:

### Act I — Unease

Cards 1–10

Mostly clues, blocked routes, strange tremors and the first evidence that something is wrong.

### Act II — Perfection Under Siege

Cards 11–25

Buildings, NPCs, Graboids learning, equipment, panic, power failure, etc.

### Act III — Get Out

Cards 26–30

Very dangerous cards that prepare/force the transition to the valley.

Then your **Round 4 / 7 / 9 / 11 / 12** markers determine which stack to draw from.

That gives you the best of both worlds:

**Narrative progression + replayability.**

The exact card sequence changes every game, but the game still feels like it's moving through a recognisable _Tremors_ escalation.

One other thing I particularly like: **"Get Out of Perfection" should not necessarily be the same card every game.** You could have 3–4 possible final calamities, such as **Perfection Falls**, **The Highway Collapses**, **All Routes Compromised**, and **The Graboids Converge**. That would determine the starting conditions and perhaps even the available escape route in Phase 2.

Sources

  
#### You said:

What are the options for player characters? I would like to play as Burt, Val, earl or Rhonda. What attributes/ unique abilities could they have. Do we give them hit points or could graboid damage cause other negative effects?

  
#### ChatGPT said:

I think **Burt, Val, Earl and Rhonda are an excellent core four**. They also naturally give you four different play styles, which is useful for a cooperative game.

I'd be cautious about conventional HP. _Tremors_ isn't really about gradually whittling down health — it's about **getting into an increasingly impossible situation**. A player being hit by a Graboid should create a problem that changes what they can do.

## I'd use a "Condition" system rather than HP

Characters have perhaps **3 condition slots**:

**Healthy → Shaken → Injured → Incapacitated**

But the effects are asymmetric and thematic.

For example:

### Shaken

_"That was too close."_

* +1 Noise when moving quickly
* Can't perform certain risky actions

### Injured

_"You're bleeding. You're slowing everyone down."_

* \-1 action per turn
* Can't carry heavy equipment
* Other players can spend an action helping you

### Incapacitated

_"You're down."_

* Can't move independently
* Another player must rescue/carry you
* If left behind at the Phase 2 transition, you become a rescue objective

This is much more interesting than:

> Burt has 8 HP. Graboid does 3 damage.

And it creates a really nice cooperative question:

> **"Do we stop and help Earl, or do we keep moving?"**

---

# The four core characters

I'd give each character **3–4 attributes**, but keep them simple enough that you can understand a character immediately.

I'd probably use:

### Movement

How well they get around.

### Nerve

Ability to resist panic / remain effective under pressure.

### Search

Finding useful things.

### Combat

Dealing with immediate threats.

But I'd make **Noise** a major differentiator too.

---

# BURT GUMMER

### Role: Heavy weapons / defence / preparation

**Movement:** 2  
**Nerve:** 4  
**Search:** 3  
**Combat:** 5

Burt should be extremely good at dealing with problems **once he's prepared**.

### Ability: "Prepared for Anything"

Once per round, Burt can spend a Supply/Equipment token to prevent an incoming negative effect.

Examples:

* Ignore an Injury.
* Prevent equipment breaking.
* Ignore a building breach.
* Cancel a Graboid attack.

But he has to **have the right gear**.

That captures Burt beautifully: he's powerful because he's prepared.

---

### Ability: "Big Guns"

Burt can use heavy weapons other characters can't.

But:

**Heavy weapon → +2 Noise**

So Burt is the ultimate example of your central dilemma.

> "Burt can kill it."

> "Yes."

> "But shooting it will bring another one."

> "Also yes."

---

### Ability: "Burt's Arsenal"

At the beginning of the game, Burt gets to draw **3 Equipment cards and choose 2**.

This means he starts each game differently.

Possible equipment:

* Rifle
* Shotgun
* Explosives
* Ammunition
* Binoculars
* Improvised weapon

---

### Burt's weakness

He should be **bad at subtlety**.

Perhaps:

> **Heavy Equipment:** Burt generates +1 additional Noise when using equipment.

That gives him a very clear identity:

**The best problem solver, but potentially the biggest contributor to the problem.**

---

# VAL McKEE

### Role: Scout / movement / improvisation

**Movement:** 4  
**Nerve:** 3  
**Search:** 3  
**Combat:** 3

Val should be the character who can **get somewhere and get back**.

### Ability: "Fast"

Val can move one additional space when taking a Move action.

But:

> The extra movement generates +1 Noise.

This is important.

He's not just "the fast character."

He's the character who can **push his luck**.

---

### Ability: "Val's Luck"

Once per round, Val can reroll a failed test.

But if the reroll fails:

> +1 Noise.

So Val is an improviser.

---

### Ability: "Don't Wait Around"

If Val begins his turn in an unsafe location, he gets +1 Movement.

That's a very thematic "get out of here" ability.

---

# EARL BASSETT

### Role: Teamwork / resilience / rescue

**Movement:** 3  
**Nerve:** 5  
**Search:** 2  
**Combat:** 3

Earl shouldn't be the strongest character individually.

He should be the character who makes **everyone else better**.

### Ability: "Earl Knows When to Run"

Once per round, when another player generates Noise, Earl can:

> Move 1 space toward them without spending an action.

That creates some fantastic moments.

> "Rhonda just made 4 Noise."

> "Earl is going after her."

---

### Ability: "Keep Moving"

Earl can spend an action to remove **Shaken** from another character.

That makes him the team's emotional stabiliser.

---

### Ability: "We're Going Together"

When Earl and another survivor occupy the same location:

> Both gain +1 Nerve.

But perhaps:

> If one becomes Injured, the other becomes Shaken.

This encourages teamwork without making it compulsory.

---

# RHONDA LEBECK

### Role: Intelligence / prediction / Graboid specialist

**Movement:** 3  
**Nerve:** 3  
**Search:** 5  
**Combat:** 2

Rhonda should be the most mechanically unusual character.

She's not there to shoot Graboids.

She's there to **understand them**.

---

### Ability: "Seismologist"

Whenever a Noise threshold is reached, Rhonda may look at the top card of the **Calamity deck**.

She can then:

* Leave it on top
* Put it on the bottom

Perhaps once per round.

This is _extremely_ powerful because she effectively helps the team manage the future.

---

### Ability: "I Know Where It Is"

If Rhonda is in a location with a Tremor marker, she can spend an action to identify:

* Graboid location
* Direction of movement
* Whether it is hunting

That gives her information nobody else has.

---

### Ability: "Don't Move"

This could be particularly thematic.

If Rhonda takes no movement action during her turn:

> Her next action generates **0 Noise**, regardless of its normal Noise value.

She's the character most capable of **deliberately controlling the team's noise profile**.

---

# The four characters then create a really nice team

| Character  | Strength                 | Weakness               |
| ---------- | ------------------------ | ---------------------- |
| **Burt**   | Combat / equipment       | Noise                  |
| **Val**    | Movement / risk          | Fragility              |
| **Earl**   | Teamwork / rescue        | Low specialist ability |
| **Rhonda** | Information / prediction | Combat                 |
| **Allan?** | —                        | —                      |

That means the team doesn't have a mandatory "tank/healer/DPS" structure.

Instead:

**Burt solves problems.**

**Val gets places.**

**Earl keeps people together.**

**Rhonda tells everyone what the hell is happening.**

That's much more appropriate for _Tremors_.

---

# I'd also make "Noise tolerance" an attribute

This could be even more interesting than Nerve.

Each character has a **Noise threshold**:

### Burt — 2

### Val — 2

### Earl — 1

### Rhonda — 1

But I'm not sure I actually like that because it becomes another number to track.

Instead, give each character a **personal Panic track**.

When something terrifying happens, they gain Panic.

### Panic 0

Normal.

### Panic 1 — Shaken

Character gains their personal negative effect.

### Panic 2 — Frightened

Character's movement/actions become less reliable.

### Panic 3 — Panic

Character **must move toward the nearest Safe Ground** when possible.

This is much more cinematic.

---

# Graboid damage could be particularly nasty

Rather than:

> "You lose 3 HP."

I'd have **three types of Graboid attack**.

## 1\. Near Miss

The character escapes.

Gain:

**Shaken**

> +1 Noise when moving.

---

## 2\. Knockdown

The character is knocked down.

Gain:

**Injured**

> Lose 1 action next turn.

---

## 3\. Grabbed

This is the big one.

The Graboid has actually caught them.

The player is **Restrained**.

Another character must:

* Rescue them
* Kill/repel the Graboid
* Use equipment
* Or abandon them

This is where the cooperative drama happens.

---

# "Death" should be relatively rare

I'd make character death a **consequence of being left in danger**, rather than simply failing a combat roll.

For example:

### Grabbed

You have one round to escape.

If you aren't rescued:

> **Dragged Underground**

Remove the character from the board.

But that doesn't necessarily mean they're dead.

Instead, add:

### RESCUE OBJECTIVE — "WHERE DID THEY TAKE HIM?"

Now the team has to decide whether to go after them.

That could be especially good in Phase 2.

---

# And I'd give each character a "Signature Moment"

Once per game, each character can do something outrageous from the movie.

### Burt — "You Should Have Seen My Gun Collection"

Fire a heavy weapon with no ammunition cost.

**But:** +5 Noise.

---

### Val — "Run!"

Move up to 4 spaces immediately.

Ignore terrain.

**But:** Gain Shaken.

---

### Earl — "Let's Get the Hell Out of Here"

All characters at Earl's location may move 1 space immediately.

No additional Noise.

---

### Rhonda — "They're Under Us"

Reveal **all hidden Graboids/Tremor markers** in her area.

Then rearrange one of them.

---

These should be **once per game**, so they become memorable moments rather than routine abilities.

---

# One more thing I'd consider: characters can evolve

Between Phase 1 and Phase 2, don't simply restore everyone.

Instead, let their Phase 1 experiences matter.

For example:

**Burt completed Arsenal objective:**

> Upgrade: **Heavy Weapons**

**Rhonda completed Seismic objective:**

> Upgrade: **Graboid Sense**

**Val rescued someone:**

> Upgrade: **Team Runner**

**Earl suffered an injury:**

> Starts Phase 2 **Injured**, but gains **Hardened**: +1 Nerve.

That means the transition between boards feels like:

> **"This is what we've been through. Now let's get out."**

rather than simply starting Level 2 with refreshed characters.

For a first prototype, though, I'd keep it to **four core characters with 3 attributes, 2 passive abilities, 1 weakness and 1 once-per-game Signature Moment each**. That's enough asymmetry to make choosing Burt vs Rhonda genuinely meaningful without burying the excellent noise/cal amity system under character bookkeeping.

  
#### You said:

I like a game where everyone wins or no-one does. A single player death ends the game. Provide opportunities to restore other players, and limited chances to rescue them. Graboid tokens represent underground graboids, but when they surface we can use a model. At this point it should be a huge problem that can't be ignored.

Show moreShow less

  
#### ChatGPT said:

Yes. That pushes the design toward a **fully cooperative survival game**, which I think is much stronger for _Tremors_. The key change I'd make is that **the players aren't managing their own survival independently; they're managing the survival state of the whole group**.

The Graboid model should also be a major escalation event: once one surfaces, the game changes from _"manage the threat"_ to _"deal with this monster right now."_

## 1\. The win condition

I'd make it brutally simple:

### Everyone escapes alive = WIN

### One survivor dies = GAME OVER

There shouldn't be individual victory points or "you survived but Earl didn't, so you still win."

That gives every character's survival enormous importance.

It also makes rescue decisions meaningful:

> "We could leave Rhonda and probably escape."

> "No. We can't."

That feels much more like the film's group-survival dynamic.

---

# 2\. I'd separate "Injured" from "Dying"

Rather than HP, characters have a small **Condition track**:

**Healthy → Injured → Critical → Dead**

But getting attacked doesn't automatically kill you.

### Healthy

No penalty.

### Injured

A negative character-specific effect.

For example:

**Burt:** Heavy equipment becomes harder to use.  
**Val:** loses 1 movement.  
**Earl:** can't assist two characters simultaneously.  
**Rhonda:** loses some seismic abilities.

### Critical

The character is **Dying**.

They have perhaps **2 rounds to receive treatment**.

If they aren't restored:

> **Dead → immediate game loss.**

This gives the other players a window to save them.

---

# 3\. Healing shouldn't be trivial

I'd have **Medical Supplies** as a scarce resource.

A character can spend an action on another character:

### First Aid

Remove **Injured**.

But:

### Critical characters require serious treatment.

Perhaps:

**Medical Kit + 2 actions**

to move:

> Critical → Injured

Then another treatment can restore:

> Injured → Healthy

That means a badly hurt player takes **time and resources** to recover.

And time is exactly what the players don't have.

---

# 4\. The really important resource: Rescue tokens

I'd introduce something like **3 Rescue opportunities per game**.

These represent things such as:

* rope
* rescue harness
* vehicle extraction
* improvised pulley
* another player physically dragging them out

When a player becomes **Grabbed**, the group can spend a Rescue token.

### Rescue

Immediately pull the character free.

**But:**

* Rescue token is permanently spent.
* The rescuing character takes Shaken.
* The rescue generates Noise.

So the group knows:

> "We can save them, but we've only got three chances."

That creates exactly the kind of pressure you're looking for.

---

# 5\. Getting Grabbed should be a huge event

This is where I'd distinguish **normal Graboid attacks** from **surface attacks**.

A buried Graboid is represented by a token.

It is scary but abstract:

> **Graboid token → movement → noise → uncertainty**

But when it surfaces:

## PUT THE MODEL ON THE BOARD.

No ambiguity.

This is now a **boss-level threat**.

---

# 6\. What happens when a Graboid surfaces?

I'd have the model immediately perform a **Surface Attack**.

For example:

### SURFACE

The Graboid model is placed at the relevant location.

Then:

**1\. It attacks the nearest exposed character.**

**2\. The location becomes Dangerous.**

**3\. The Graboid enters Hunting mode.**

**4\. The model remains on the board until killed, driven away or buried.**

That fourth point is important.

Don't just have:

> "Graboid attacks → roll → it disappears."

Once it's surfaced, everyone has a problem.

---

# 7\. A surfaced Graboid should affect the whole board

I'd give it a **Threat Radius**.

For example:

### 3 spaces / locations around the model

Players inside its threat radius:

* Cannot safely end movement in open ground.
* Must make a Noise test to perform certain actions.
* Risk attack when moving.

That means one surfaced Graboid effectively creates a **moving exclusion zone**.

The players have to reorganise around it.

---

# 8\. It should be incredibly difficult to kill

I'd avoid normal combat HP for the Graboid too.

Instead give each surfaced Graboid a small number of **Weakness states**:

### Hunting

Fully active.

### Wounded

One effective attack has disrupted it.

### Enraged

Its movement and attacks become more dangerous.

### Defeated

Removed.

Perhaps killing one requires something specific:

> Explosives  
> Heavy weapon  
> Environmental trap  
> Special objective

This means Burt isn't simply "the guy who shoots monsters."

The team needs to **solve the problem**.

---

# 9\. And killing a Graboid should create noise

This is essential.

Imagine Burt finally gets the shot.

**BOOM.**

The Graboid dies.

Everyone celebrates.

Then:

> **+6 Noise**

And another underground Graboid token moves toward them.

That creates the perfect _Tremors_ dilemma:

> **Winning the immediate battle may make the wider situation worse.**

---

# 10\. Underground tokens should behave differently

I think your token/model distinction is excellent.

### Graboid token

Represents:

> "Something is underneath us."

It isn't really a combat unit yet.

It:

* moves toward noise
* creates Tremor clues
* can surround players
* can threaten multiple locations
* can surface

### Graboid model

Represents:

> "**It's HERE.**"

It:

* has an actual position
* attacks
* blocks routes
* threatens buildings
* forces players to respond
* remains on the board
* can pursue characters

This creates a wonderful physical language:

**Token = anxiety**

**Model = crisis**

---

# 11\. Don't let players casually ignore a surfaced Graboid

I'd give every surfaced Graboid an **Immediate Threat** card.

For example:

## GRABOID SURFACES

> **The ground erupts.**

Until this Graboid is defeated or driven away:

* Open-ground movement within its threat radius is dangerous.
* Players cannot complete certain objectives in its area.
* At the beginning of each round, it makes a Hunt action.
* Noise generated within its radius gets +1.

That last rule makes the situation snowball.

---

# 12\. Multiple surfaced Graboids should be catastrophic

This should be something the players desperately avoid.

I'd probably have:

### 1 surfaced Graboid

**Major problem**

### 2 surfaced Graboids

**Crisis**

### 3 surfaced Graboids

**Almost certainly doomed**

Not because the rules say "you lose," but because they create overlapping threat areas and consume the team's resources.

This also gives the Noise system a natural escalation:

> Too much noise → more tokens activate → tokens surface → physical monsters appear → monsters create more noise → more Graboids converge.

That's your central **doom loop**.

---

# 13\. Rescue becomes much more interesting around a surfaced Graboid

Imagine Val is grabbed.

The model is sitting right next to him.

Now the team has a decision:

### Option A — Fight the Graboid

Spend ammunition / explosives.

Huge Noise.

Potentially draw another Graboid.

### Option B — Rescue Val

Someone risks moving into the threat zone.

Spend a Rescue token.

Maybe Val survives but becomes Critical.

### Option C — Distract it

Create a massive noise spike somewhere else.

The Graboid leaves Val.

But the rest of the group is now in danger.

That is exactly the kind of cooperative dilemma I'd want.

---

# 14\. Give each character a different rescue relationship

This could make your four characters even more distinct.

### Burt

**Covering Fire**

Can protect a rescuer from a distance.

But generates huge Noise.

### Val

**Fast Extraction**

Can rescue a character and immediately move away.

### Earl

**Drag Them Out**

Can carry an incapacitated character without the normal movement penalty.

### Rhonda

**Predict the Attack**

Can determine where a surfaced Graboid will strike next.

So everyone contributes to rescue differently.

---

# 15\. What happens when someone is Critical?

I'd avoid simply making them sit there.

Give them a special state:

## DOWNED

The character is placed on their side.

They cannot move voluntarily.

They can:

* crawl slowly
* perform limited actions
* call for help
* use one personal ability

But every round they remain Downed:

> **Deterioration**

After two Deterioration markers:

**Dead → immediate game loss.**

That makes rescuing someone urgent.

But then you can introduce an incredibly useful piece of equipment:

### STIMULANT / MEDICAL KIT

Reset Deterioration by 1.

That gives the group a precious second chance.

---

# 16\. I would actually limit "resurrection"

Don't let players simply heal from death.

Death should be final.

But there should be **several ways of pulling someone back from the brink**.

For example:

**First Aid:** Injured → Healthy

**Medical Kit:** Critical → Injured

**Rescue:** Grabbed → Critical

**Character ability:** remove one Deterioration

**Safe location:** At the end of a round there, remove one Deterioration

That gives you several layers of recovery without making damage meaningless.

---

# 17\. Phase 2 can make this much nastier

In Perfection, buildings and safe locations give players opportunities to recover.

In the valley:

### Very few safe locations.

So suddenly:

> **Downed in Perfection = problem**

becomes:

> **Downed in the valley = emergency.**

And you can make the final escape particularly tense by having the team **unable to fully heal once Phase 2 starts**.

They carry their wounds into the valley.

That gives Phase 1 objectives concerning medicine a genuine purpose.

---

# 18\. I'd make the surfaced Graboid physically impressive

This is one area where component design can reinforce the game beautifully.

An underground token might simply be:

**small Graboid marker**

Once it surfaces, replace it with:

**large Graboid miniature**

And perhaps put a **Threat Ring** around the model.

Players immediately understand:

> "This is different."

You don't even need a large number of models. **One model per currently surfaced Graboid** is enough because the psychological impact comes from the transformation.

---

# The resulting game loop is really strong

You'd have something like:

**Players act**

↓

**They generate Noise**

↓

**Calamity/Noise effects occur**

↓

**Underground Graboid tokens respond**

↓

**One may surface**

↓

### **MODEL ON BOARD**

↓

**Immediate crisis**

↓

Players either:

**fight / flee / distract / rescue / hide**

↓

They survive the immediate crisis...

↓

...but the Noise they've generated attracts more danger.

That's a very clean mechanical representation of _Tremors_.

And because **one death means everyone loses**, the late game becomes increasingly about making sure nobody gets left behind rather than simply optimising individual objectives.

I particularly like the combination of **Downed → Deteriorating → Dead** with **limited Rescue tokens**. It gives you the ability to make Graboid attacks frightening without having to make them constantly lethal. A player can survive being attacked, but the table immediately has to decide **how much they're willing to spend to save them**.

  
#### You said:

Encounter mechanics need detail. We had underground tokens in sectors as a separate broader layer to the map nodes. Should the graboid surface at the noisiest node in that sector, or utilise a dice roll somehow? When a player and graboid share a node, what happens? Should they automatically lose a health point (ie. Healthy - injured) per turn until they escape or are rescued?

Show moreShow less

  
#### ChatGPT said:

Yes. I think the **sector layer + node layer** is the right architecture, and I'd make the Graboid encounter system deliberately deterministic _with a small amount of uncertainty_. Too much dice rolling would undermine the cleverness of the noise system.

The core principle I'd use is:

> **Noise tells the Graboid where to look. Dice determine exactly how it attacks.**

That gives players agency without making the creature predictable.

---

# 1\. Two-layer Graboid movement

Your map effectively has two levels:

### Surface layer

The actual town locations/nodes.

### Underground layer

Perhaps **5–6 large sectors** covering groups of nodes.

For example:

```
          SECTOR A
      [Radio] [Ranch]
          \     /
           [Store]
              |
          SECTOR B
      [Burt]--[Centre]--[Workshop]
                       |
                    [Fuel]
                       |
                   SECTOR C
                   [Highway]

```

A Graboid token exists **in a sector**, not at a node.

Players don't normally know exactly where it is.

That's excellent because the underground layer represents:

> **"It's somewhere around here."**

---

# 2\. How does a Graboid choose where to surface?

I'd use **noise first, dice second**.

Suppose Sector B contains:

* Burt's house: 2 Noise
* Store: 1 Noise
* Workshop: 4 Noise
* Centre: 0 Noise

The Graboid is in Sector B.

It wants to surface at:

> **Workshop — 4 Noise**

No dice required.

This rewards the players for understanding their own noise.

---

# 3\. But what if two nodes are equally noisy?

This is where I'd introduce a **small die roll**.

Say:

* Store = 3
* Workshop = 3

Roll a **Graboid die**.

Each node could have a letter/number corresponding to faces.

Or simply:

> Each tied node gets a card/token and draw randomly.

I actually prefer **cards/tokens** over dice because it keeps the game deterministic and avoids a "why did it randomly choose that?" feeling.

But a D6 would absolutely work for prototyping.

---

# 4\. I would add one more factor: proximity

A Graboid shouldn't necessarily surface at the loudest node if that node is at the opposite end of its sector.

I'd use:

### Surface Priority

1. Highest Noise
2. Closest noisy node
3. Random if tied

That makes the creature feel logical.

However, there's a potential issue:

> Players could simply concentrate all noise at one node and manipulate the monster.

**I'd embrace that.**

That's _Tremors_.

Players should be able to deliberately make a noise somewhere to lure a Graboid.

---

# 5\. Give players a way to intentionally trigger a surface

This could be a really fun tactic.

### Create a Diversion

A player can spend an action:

> Generate +3 Noise at an adjacent node.

If a Graboid is in that sector, it moves toward that node.

So the team can say:

> "We need to get across the road."

> "The Graboid is in Sector C."

> "I'll make noise at the quarry."

> "Then it'll surface there."

> "Exactly."

This is a very satisfying interaction.

---

# 6\. But don't make surfacing automatic

This is where I'd introduce the die.

A Graboid token should have a **Hunt Level**:

### 0 — Hidden

### 1 — Hunting

### 2 — Agitated

### 3 — Surfacing

Noise pushes the Graboid up the track.

For example:

**+1 Hunt** if its sector contains noise.

**+2 Hunt** if its sector contains 5+ noise.

**+3 Hunt** if its sector contains 8+ noise.

When it reaches **3**, it surfaces.

Then:

> **Find the noisiest node → place model there.**

So players know:

> "It's getting close."

That is more interesting than a simple random surface.

---

# 7\. Alternatively: the "Surface roll"

If you want more uncertainty, I'd make it:

### At the end of each round:

If a Graboid's sector has generated **4+ Noise**, roll a D6.

**1–3:** It remains underground.

**4–5:** It moves within the sector.

**6:** It surfaces.

Modify the roll:

**+1** if Noise ≥ 7  
**+1** if Noise ≥ 10  
**+1** if it was already Agitated.

This gives you the occasional:

> "Oh shit."

when something surfaces earlier than expected.

I'd personally prototype **this** against the deterministic Hunt track and see which produces better tension.

---

# 8\. What happens when the model surfaces?

This needs to be **immediately frightening**.

I'd have a three-step procedure:

### 1\. Surface

Place the model at the selected node.

### 2\. Ambush

Resolve an immediate attack against the most vulnerable exposed character at that node.

### 3\. Establish the Threat

Place a **Graboid Threat marker** around the node.

Now it's a physical monster.

---

# 9\. When a player and Graboid share a node

I agree with your instinct that **something bad should happen automatically**.

But I wouldn't make it:

> "Lose 1 HP every turn."

That's too predictable and makes the monster feel like a stationary damage aura.

Instead:

## The player becomes ENGAGED.

An engaged player cannot simply perform normal actions.

At the beginning of their turn:

### If they remain engaged:

They suffer **Graboid Pressure**.

Then they must either:

**Escape**

**Be rescued**

**Fight**

**Distract**

or potentially **become Grabbed**.

---

# 10\. I'd use a "Hold" system

When a Graboid and player occupy the same node:

### Round 1 — Threatened

The player is still mobile.

They gain **Shaken** or another minor condition.

They must escape before the next Graboid activation.

### Round 2 — Grabbed

If the player is still there when the Graboid activates:

> The player becomes **Grabbed**.

Now they're effectively incapacitated.

### Round 3 — Dragged

If they remain Grabbed after another activation:

> **Dragged Underground → Dead**

Unless another player performs a successful rescue.

That creates a **very tight rescue window**.

---

# 11\. This is better than automatic health loss

Imagine:

> Val and Graboid share a node.

Instead of:

**Val loses 1 HP.**

You get:

### VAL — THREATENED

Val has until the next Graboid activation to escape.

He could:

* Run
* Use an ability
* Shoot
* Have Earl rescue him
* Have Burt create a distraction
* Have Rhonda predict the attack

Now **the whole team has something to do**.

---

# 12\. The Graboid's attack should have different outcomes

I'd use a simple **Graboid Attack deck** rather than a big combat table.

When it attacks:

### 1\. MISS

The ground erupts but the player escapes.

### 2\. KNOCKDOWN

Player becomes **Injured**.

### 3\. PINNED

Player cannot move until helped.

### 4\. GRABBED

Player enters the rescue sequence.

### 5\. DRAGGED

Only possible if already Grabbed.

This gives you uncertainty at the moment of attack while keeping the underlying behaviour predictable.

---

# 13\. The model should physically remain engaged

I'd make the Graboid model **block the node**.

If a node contains the model:

### Other players may enter it

—but entering costs an additional action and exposes them to attack.

That makes rescue genuinely dangerous.

Earl can't simply walk over and press:

> "Rescue."

He has to say:

> "I'm going in."

And now **Earl is in the threat zone too.**

---

# 14\. Rescue becomes a proper mini-system

If Val is Grabbed:

### Rescue options

**Earl — Drag Him Out**

Spend 2 actions.

Roll / test.

**Burt — Covering Fire**

Attack the Graboid.

If successful, Val escapes.

But:

> +4 Noise.

**Rhonda — Predict the Movement**

Spend an action.

Val gets an automatic escape opportunity.

**Val — Fight**

Spend an action to attempt to free himself.

Harder than being rescued.

That gives each character a reason to participate.

---

# 15\. I'd give the Graboid an "attention" state

This is another useful mechanic.

The model can be:

### Hunting

Moves toward noise.

### Engaged

Has a player at its node.

### Distracted

Moves toward a different noise source.

### Enraged

Triggered by heavy damage/explosions.

An **Enraged Graboid** might:

* Move twice
* Ignore normal noise priorities
* Attack buildings
* Destroy terrain

That makes combat potentially dangerous even if successful.

---

# 16\. What happens when players attack the Graboid?

This should NOT be a conventional combat system.

I'd give the Graboid perhaps **three weaknesses**.

For example:

### Heavy Weapon

**Burt:** 1 damage

### Explosive

**Any player:** 2 damage

### Environmental Trap

**Any player:** 3 damage

When it reaches its damage threshold:

> **Defeated**

But every attack generates substantial Noise.

So:

> Kill a Graboid = immediate safety + massive future danger.

That is exactly the sort of tradeoff you want.

---

# 17\. A Graboid should sometimes retreat

Don't always kill it.

If sufficiently wounded:

> **BURROW**

The model is removed.

Return a Graboid token to that sector.

This is brilliant for tension because the players don't know whether they've actually solved the problem.

Burt shoots it.

It disappears.

Everyone:

> "Great."

Rhonda:

> "No. It's still under us."

---

# 18\. The Graboid model therefore represents a temporary "boss encounter"

I'd think about the distinction like this:

### Graboid token

**Threat**

> Where is it?

> What is it doing?

> Where will it surface?

### Graboid model

**Encounter**

> How do we survive this?

> Can we rescue Val?

> Do we fight it?

> Can we lure it away?

> Can we escape?

That makes the transition from token → model feel significant every time.

---

# My preferred complete encounter sequence

I'd prototype this first:

### UNDERGROUND

Graboid token occupies a sector.

↓

### HUNT

Players generate noise.

Graboid moves toward the **highest-noise node in its sector**.

↓

### AGITATED

If sector Noise reaches threshold, place an **Agitated** marker.

↓

### SURFACE

When the surface condition is met:

**Highest-noise node in sector = surface point.**

Ties = D6.

↓

### AMBUSH

Graboid immediately attacks the most vulnerable exposed character there.

↓

### MODEL ON BOARD

The Graboid is now a major physical threat.

↓

### ENGAGED

Player sharing its node becomes **Threatened**.

↓

### GRAB

If still there at the next activation → **Grabbed**.

↓

### RESCUE WINDOW

The team has **one further activation** to rescue them.

↓

### DRAGGED UNDERGROUND

If unsuccessful:

**Character dies → everyone loses.**

---

## One adjustment I'd make to your Health idea

I **would** keep a Healthy → Injured state, but use it for **near misses and knockdowns**, not as the primary Graboid encounter mechanic.

So:

**Attack**

→ Miss = nothing  
→ Knockdown = Healthy → Injured  
→ Grab = enters rescue sequence

And then:

**Injured + second serious attack = Critical**

**Critical + failed rescue = Dead**

That gives you multiple ways to get into trouble without making every encounter simply subtract 1 health.

It also means **a surfaced Graboid is never something you can casually ignore**. Even if it doesn't attack immediately, its presence changes what everyone can safely do, blocks routes, threatens rescue attempts, and can force the team to spend precious resources.

Most importantly, **the noise system determines where the monster goes, but the players determine how they respond once it arrives.** That's a very good core loop for this game.

ChatGPT is AI and can make mistakes.

  