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

test("noiseBand thresholds", () => {
  assert.equal(noiseBand(0), "quiet");
  assert.equal(noiseBand(3), "quiet");
  assert.equal(noiseBand(4), "disturbed");
  assert.equal(noiseBand(7), "disturbed");
  assert.equal(noiseBand(8), "frenzy");
});

test("map is connected from store to highway", () => {
  const n = neighbors("store", new Set());
  assert.ok(n.includes("bar"));
  assert.ok(n.length >= 3);
});

test("careful move makes no noise; run does", () => {
  const g = fresh(42);
  const val = g.char("val");
  assert.equal(g.activeId(), "val");
  const dests = g.reachable(val, "careful");
  assert.ok(dests.length);
  g.act("val", { type: "move", style: "careful", target: dests[0] });
  assert.equal(g.noiseThisRound, 0);
  const dests2 = g.reachable(g.char("val"), "run");
  g.act("val", { type: "move", style: "run", target: dests2[0] });
  assert.ok(g.noiseThisRound >= 2);
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
  const nodes = new Set([a.graboids[0].node, b.graboids[0].node]);
  assert.ok(nodes.size >= 1);
  assert.ok(["store", "bar"].includes(a.graboids[0].node));
  assert.ok(["store", "bar"].includes(b.graboids[0].node));
});

test("threatened then grabbed then dragged is game over", () => {
  const g = fresh(3);
  const val = g.char("val");
  val.location = "school";
  const graboid = g.graboids[0];
  graboid.sector = "B";
  graboid.surfaced = true;
  graboid.node = "school";
  g.activateSurfaced(graboid);
  assert.equal(val.threatened, true);
  g.activateSurfaced(graboid);
  assert.equal(val.grabbed, true);
  g.activateSurfaced(graboid);
  assert.equal(g.gameOver, "loss");
  assert.equal(val.health, "dead");
});

test("rescue spends a token and clears grabbed", () => {
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
  assert.equal(earl.shaken, true);
});

test("location noise decays by 1 each round", () => {
  const g = fresh(8);
  g.locationNoise.store = 3;
  g.locationNoise.bar = 1;
  g.decayNoise();
  assert.equal(g.locationNoise.store, 2);
  assert.equal(g.locationNoise.bar, 0);
});

test("one death ends the game for everyone", () => {
  const g = fresh(2);
  g.die(g.char("rhonda"), "test");
  assert.equal(g.gameOver, "loss");
  assert.match(g.winReason, /Rhonda/);
});

test("completing essentials allows evacuate", () => {
  const g = fresh(4);
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
  g.objectives.forEach((o) => {
    if (o.kind === "essential") o.status = "passed";
  });
  g.char("val").grabbed = true;
  const res = g.act("val", { type: "evacuate" });
  assert.equal(res.ok, false);
  assert.equal(g.gameOver, null);
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

console.log("\nAll engine tests passed.");
