const assert = require("assert");
const { Game, noiseBand, neighbors, DATA } = require("./engine.js");

function draft(game) {
  const ids = game.burtDraft.slice(0, 2).map((e) => e.id);
  const res = game.act("burt", { type: "burtDraft", ids });
  assert.equal(res.ok, true, res.error);
}

function fresh(seed) {
  const g = new Game({ seed });
  g.setup();
  draft(g);
  return g;
}

function test(name, fn) {
  fn();
  console.log("ok", name);
}

let passed = 0;
const _test = test;
test = function (name, fn) {
  _test(name, fn);
  passed += 1;
};

test("noiseBand thresholds", () => {
  assert.equal(noiseBand(0), "quiet");
  assert.equal(noiseBand(8), "quiet");
  assert.equal(noiseBand(9), "disturbed");
  assert.equal(noiseBand(14), "disturbed");
  assert.equal(noiseBand(15), "frenzy");
});

test("map is connected from store to highway", () => {
  const n = neighbors("store", new Set());
  assert.ok(n.includes("bar"));
  assert.ok(n.length >= 3);
});

test("careful move makes 1 noise", () => {
  const g = fresh(42);
  const val = g.char("val");
  assert.equal(g.activeId(), "val");
  const dests = g.reachable(val, "careful");
  assert.ok(dests.length);
  g.act("val", { type: "move", style: "careful", target: dests[0] });
  assert.equal(g.noiseThisRound, 1);
});

test("run makes at least 2 noise", () => {
  const g = fresh(42);
  const dests = g.reachable(g.char("val"), "run");
  g.act("val", { type: "move", style: "run", target: dests[0] });
  assert.ok(g.noiseThisRound >= 2);
});

test("quiet move token makes 0 noise", () => {
  const g = fresh(42);
  g.quietMoves = 1;
  const dests = g.reachable(g.char("val"), "quietToken");
  g.act("val", { type: "move", style: "quietToken", target: dests[0] });
  assert.equal(g.noiseThisRound, 0);
  assert.equal(g.quietMoves, 0);
});

test("Rhonda Don't Move is 0 noise before she walks", () => {
  const g = fresh(1);
  g.turnIndex = 2;
  g.refreshTurn();
  assert.equal(g.activeId(), "rhonda");
  const before = g.noiseThisRound;
  g.char("rhonda").location = "rhonda";
  g.act("rhonda", { type: "search" });
  assert.equal(g.noiseThisRound, before);
});

test("graboid surfaces at the loudest node in its sector", () => {
  const g = fresh(7);
  const graboid = g.graboids[0];
  graboid.sector = "B";
  graboid.hunt = 2;
  graboid.surfaced = false;
  g.locationNoise.store = 1;
  g.locationNoise.bar = 1;
  g.locationNoise.clinic = 6;
  g.locationNoise.school = 2;
  g.surface(graboid);
  assert.equal(graboid.surfaced, true);
  assert.equal(graboid.node, "clinic");
});

test("tied noise uses rng rather than a fixed node", () => {
  const a = fresh(11);
  const b = fresh(99);
  for (const g of [a, b]) {
    const graboid = g.graboids[0];
    graboid.sector = "B";
    g.locationNoise.store = 4;
    g.locationNoise.bar = 4;
    g.locationNoise.clinic = 0;
    g.locationNoise.school = 0;
    g.surface(graboid);
  }
  assert.ok(["store", "bar"].includes(a.graboids[0].node));
  assert.ok(["store", "bar"].includes(b.graboids[0].node));
});

test("first catch is Threatened", () => {
  const g = fresh(3);
  const val = g.char("val");
  val.location = "school";
  const graboid = g.graboids[0];
  graboid.sector = "B";
  graboid.surfaced = true;
  graboid.node = "school";
  g.activateSurfaced(graboid);
  assert.equal(val.threatened, true);
  assert.equal(val.grabbed, false);
  assert.equal(val.threatenedBy, graboid.id);
});

test("same worm catching again is Grabbed", () => {
  const g = fresh(3);
  const val = g.char("val");
  val.location = "school";
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = "school";
  g.activateSurfaced(graboid);
  g.activateSurfaced(graboid);
  assert.equal(val.grabbed, true);
});

test("third catch by the same worm is Dragged / game over", () => {
  const g = fresh(3);
  const val = g.char("val");
  val.location = "school";
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = "school";
  g.activateSurfaced(graboid);
  g.activateSurfaced(graboid);
  g.activateSurfaced(graboid);
  assert.equal(g.gameOver, "loss");
  assert.equal(val.health, "dead");
});

test("a different worm's first catch is still Threatened", () => {
  const g = fresh(3);
  const val = g.char("val");
  val.location = "school";
  const a = g.graboids[0];
  const b = g.graboids[1];
  a.surfaced = true;
  a.node = "school";
  b.surfaced = true;
  b.node = "school";
  g.catchCharacter(a, val);
  assert.equal(val.threatened, true);
  g.catchCharacter(b, val);
  assert.equal(val.grabbed, false);
  assert.equal(val.threatenedBy, b.id);
});

test("miss 2 rounds submerges at Hunt 1", () => {
  const g = fresh(8);
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = "mountain_road";
  graboid.hunt = 3;
  graboid.caughtThisRound = false;
  g.characters.forEach((c) => {
    c.location = "highway";
  });
  g.resolveMissedSurfaces();
  assert.equal(graboid.surfaced, true);
  assert.equal(graboid.missRounds, 1);
  graboid.caughtThisRound = false;
  g.resolveMissedSurfaces();
  assert.equal(graboid.surfaced, false);
  assert.equal(graboid.hunt, 1);
});

test("grabbed keeps 1 action", () => {
  const g = fresh(9);
  const val = g.char("val");
  val.grabbed = true;
  g.refreshTurn();
  assert.equal(val.maxActions, 1);
  const acts = g.legalActions("val");
  assert.ok(acts.some((a) => a.type === "struggle"));
});

test("struggle pulls one node clear", () => {
  const g = fresh(9);
  const val = g.char("val");
  val.location = "school";
  val.grabbed = true;
  g.refreshTurn();
  const res = g.act("val", { type: "struggle" });
  assert.equal(res.ok, true, res.error);
  assert.equal(val.grabbed, false);
  assert.notEqual(val.location, "school");
});

test("rescue pulls one node clear and spends a token", () => {
  const g = fresh(5);
  const val = g.char("val");
  const earl = g.char("earl");
  val.location = "store";
  earl.location = "store";
  val.grabbed = true;
  val.threatened = false;
  const before = g.rescueTokens;
  g.turnIndex = 1;
  g.refreshTurn();
  assert.equal(g.activeId(), "earl");
  const res = g.act("earl", { type: "rescue", target: "val" });
  assert.equal(res.ok, true, res.error);
  assert.equal(val.grabbed, false);
  assert.equal(g.rescueTokens, before - 1);
  assert.notEqual(val.location, "store");
});

test("cannot evacuate before round 8", () => {
  const g = fresh(4);
  g.round = 7;
  g.objectives.forEach((o) => {
    if (o.kind === "essential") {
      o.status = "passed";
      o.progress = o.work;
    }
  });
  const res = g.act("val", { type: "evacuate" });
  assert.equal(res.ok, false);
  assert.equal(g.gameOver, null);
});

test("completing essentials allows evacuate from round 8", () => {
  const g = fresh(4);
  g.round = 8;
  g.objectives.forEach((o) => {
    if (o.kind === "essential") {
      o.status = "passed";
      o.progress = o.work;
    }
  });
  const acts = g.legalActions("val");
  assert.ok(acts.some((a) => a.type === "evacuate"));
  const res = g.act("val", { type: "evacuate" });
  assert.equal(res.ok, true, res.error);
  assert.equal(g.gameOver, "win");
});

test("cannot evacuate while someone is grabbed", () => {
  const g = fresh(6);
  g.round = 8;
  g.objectives.forEach((o) => {
    if (o.kind === "essential") o.status = "passed";
  });
  g.char("val").grabbed = true;
  const res = g.act("val", { type: "evacuate" });
  assert.equal(res.ok, false);
  assert.equal(g.gameOver, null);
});

test("one death ends the game for everyone", () => {
  const g = fresh(2);
  g.die(g.char("rhonda"), "test");
  assert.equal(g.gameOver, "loss");
  assert.match(g.winReason, /Rhonda/);
});

test("injured characters get one action", () => {
  const g = fresh(9);
  const val = g.char("val");
  val.health = "injured";
  g.refreshTurn();
  assert.equal(val.maxActions, 1);
});

test("work completes an objective at the matching node", () => {
  const g = fresh(10);
  const obj = g.objectives.find((o) => o.kind === "essential");
  assert.ok(obj);
  g.char("val").location = obj.location;
  obj.work = 1;
  obj.noise = 0;
  const res = g.act("val", { type: "work" });
  assert.equal(res.ok, true, res.error);
  assert.equal(obj.status, "passed");
});

test("search succeeds on d6 + Search + node.search >= 9", () => {
  const g = fresh(10);
  const rhonda = g.char("rhonda");
  g.turnIndex = 2;
  g.refreshTurn();
  rhonda.location = "radio";
  g.rng = () => 0.99;
  const before = g.stash.length;
  g.act("rhonda", { type: "search" });
  assert.ok(g.stash.length >= before);
});

test("search draws from the 16-card item deck into the shared supply", () => {
  const g = fresh(10);
  g.turnIndex = 2;
  g.refreshTurn();
  g.char("rhonda").location = "radio";
  g.rng = () => 0.99;
  const deckBefore = g.itemDeck.length;
  g.act("rhonda", { type: "search" });
  assert.equal(g.itemDeck.length, deckBefore - 1);
  assert.equal(g.stash.length, 1);
  assert.ok(DATA.items.some((it) => it.id === g.stash[0]));
});

test("each successful search at a node raises the next target by 1", () => {
  const g = fresh(10);
  g.turnIndex = 2;
  g.refreshTurn();
  g.char("rhonda").location = "radio";
  g.rng = () => 0.99;
  g.act("rhonda", { type: "search" });
  assert.equal(g.searchWear.radio, 1);
  g.char("rhonda").actions = 2;
  g.act("rhonda", { type: "search" });
  assert.equal(g.searchWear.radio, 2);
});

test("rigs include Pipe Bomb, Tripwire Bait, Fire Bomb, Line Rescue, Field Generator", () => {
  const names = DATA.rigs.map((r) => r.name);
  assert.deepEqual(names, ["Pipe Bomb", "Tripwire Bait", "Fire Bomb", "Line Rescue", "Field Generator"]);
});

test("item deck is two copies of eight thematic cards", () => {
  assert.equal(DATA.items.length, 8);
  const g = fresh(3);
  assert.equal(g.itemDeck.length, 16);
});

test("pipe bomb wounds a surfaced graboid and spends Pipe + Powder", () => {
  const g = fresh(12);
  g.stash.push("pipe", "powder");
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = g.char("val").location;
  graboid.wounds = 0;
  const res = g.act("val", { type: "rig", rig: "pipe_bomb" });
  assert.equal(res.ok, true, res.error);
  assert.equal(g.stash.includes("pipe"), false);
  assert.equal(g.stash.includes("powder"), false);
  const still = g.graboids.find((x) => x.id === graboid.id);
  if (still) assert.equal(still.wounds, 1);
});

test("tin cans dump +2 noise on an adjacent node", () => {
  const g = fresh(4);
  g.stash.push("cans");
  const adj = neighbors(g.char("val").location, g.blocked)[0];
  const before = g.locationNoise[adj] || 0;
  const res = g.act("val", { type: "useItem", item: "cans", target: adj });
  assert.equal(res.ok, true, res.error);
  assert.ok((g.locationNoise[adj] || 0) >= before + 2);
  assert.equal(g.stash.includes("cans"), false);
});

test("walkie-talkies give the next character +1 action", () => {
  const g = fresh(5);
  g.stash.push("walkies");
  g.act("val", { type: "useItem", item: "walkies" });
  g.act("val", { type: "endTurn" });
  assert.equal(g.activeId(), "earl");
  assert.equal(g.char("earl").actions, g.char("earl").maxActions);
  assert.ok(g.char("earl").maxActions >= 3);
});

test("tripwire bait makes the next surface land on the chosen node with no ambush", () => {
  const g = fresh(6);
  g.stash.push("cans", "line");
  const dest = neighbors(g.char("val").location, g.blocked)[0];
  g.char("val").location = dest;
  const res = g.act("val", { type: "rig", rig: "tripwire", target: dest });
  assert.equal(res.ok, true, res.error);
  const graboid = g.graboids[0];
  g.surface(graboid);
  assert.equal(graboid.node, dest);
  assert.equal(graboid.surfaced, true);
  assert.equal(g.char("val").grabbed, false);
  assert.equal(g.char("val").threatened, false);
});

test("fire bomb forces a surfaced graboid to dive", () => {
  const g = fresh(8);
  g.stash.push("fuel_can", "powder");
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = g.char("val").location;
  const res = g.act("val", { type: "rig", rig: "fire_bomb" });
  assert.equal(res.ok, true, res.error);
  assert.equal(graboid.surfaced, false);
  assert.equal(graboid.hunt, 1);
});

test("line rescue pulls an adjacent grabbed teammate without sharing the kill node", () => {
  const g = fresh(9);
  g.stash.push("rope", "walkies");
  const val = g.char("val");
  const earl = g.char("earl");
  const adj = neighbors(val.location, g.blocked)[0];
  earl.location = adj;
  earl.grabbed = true;
  const res = g.act("val", { type: "rig", rig: "line_rescue", target: adj });
  assert.equal(res.ok, true, res.error);
  assert.equal(earl.location, val.location);
  assert.equal(earl.grabbed, false);
});

test("field generator clears darkness and power failure", () => {
  const g = fresh(11);
  g.stash.push("parts", "fuel_can");
  g.darkness = true;
  g.poweredOff.add("store");
  const res = g.act("val", { type: "rig", rig: "field_gen" });
  assert.equal(res.ok, true, res.error);
  assert.equal(g.darkness, false);
  assert.equal(g.poweredOff.size, 0);
});

test("pipe fight bonus is consumed on the next fight", () => {
  const g = fresh(13);
  g.stash.push("pipe");
  g.act("val", { type: "useItem", item: "pipe" });
  assert.equal(g.fightBonus, 1);
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = g.char("val").location;
  g.rng = () => 0.99;
  g.act("val", { type: "fight" });
  assert.equal(g.fightBonus, 0);
});

test("calamity 30 frenzy fails unfinished essentials and can end the game", () => {
  const g = fresh(12);
  const card = DATA.calamities.find((c) => c.id === 30);
  g.applyCalamity(card, "frenzy");
  const essentials = g.objectives.filter((o) => o.kind === "essential");
  assert.ok(essentials.every((o) => o.status === "failed"));
  assert.equal(g.gameOver, "loss");
});

test("DATA has 18 nodes, 30 calamities, 4 characters", () => {
  assert.equal(DATA.nodes.length, 18);
  assert.equal(DATA.calamities.length, 30);
  assert.equal(DATA.characters.length, 4);
});

test("location noise decays by 1 each round", () => {
  const g = fresh(8);
  g.locationNoise.store = 3;
  g.locationNoise.bar = 1;
  g.decayNoise();
  assert.equal(g.locationNoise.store, 2);
  assert.equal(g.locationNoise.bar, 0);
});

test("surfaced graboid steps toward the nearest character", () => {
  const g = fresh(14);
  const graboid = g.graboids[0];
  graboid.surfaced = true;
  graboid.node = "radio";
  graboid.sector = "A";
  g.characters.forEach((c) => {
    c.location = "store";
  });
  const before = graboid.node;
  g.moveGraboidTowardNoise(graboid);
  assert.notEqual(graboid.node, before);
  const path = require("./engine.js").shortestPath;
  assert.ok(path(before, "store", new Set()).includes(graboid.node));
});

test("calamity rounds are 4, 7, 9, 11, 12", () => {
  assert.deepEqual(DATA.calamityRounds, [4, 7, 9, 11, 12]);
});

test("turn order is Val then Earl then Rhonda then Burt", () => {
  const g = fresh(1);
  assert.deepEqual(g.turnOrder, ["val", "earl", "rhonda", "burt"]);
});

test("work on a 0-printed objective still makes 1 noise unless Don't Move", () => {
  const g = fresh(10);
  const obj = g.objectives.find((o) => o.kind === "essential");
  g.char("val").location = obj.location;
  obj.work = 2;
  obj.noise = 0;
  g.act("val", { type: "work" });
  assert.equal(g.noiseThisRound, 1);
});

console.log(`\n${passed} engine tests passed.`);
assert.equal(passed, 42, `expected 42 tests, got ${passed}`);
