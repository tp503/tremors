#!/usr/bin/env node
/* Turtle bot: minimum noise, essentials only, evacuate from round 8. */

const { Game, neighbors, shortestPath, DATA } = require("./engine.js");

function draft(game) {
  if (!game.pendingChoice || game.pendingChoice.type !== "burtDraft") return;
  const ids = game.burtDraft.slice(0, 2).map((e) => e.id);
  game.act("burt", { type: "burtDraft", ids });
}

function resolvePending(game) {
  const p = game.pendingChoice;
  if (!p) return;
  if (p.type === "burtDraft") return draft(game);
  if (p.type === "rhondaPeek") {
    const bury = /frenzy|falls|stampede|converge/i.test(p.title + p.flavour);
    game.act("rhonda", { type: "rhondaPeek", bury });
    return;
  }
  if (p.type === "valRun") {
    game.pendingChoice = null;
    return;
  }
  if (p.type === "earlExodus") {
    game.act("earl", { type: "earlExodus", moves: {} });
    return;
  }
  game.pendingChoice = null;
}

function graboidNodes(game) {
  return new Set(game.graboids.filter((g) => g.surfaced && g.node).map((g) => g.node));
}

function safestStep(game, from, dest) {
  const path = shortestPath(from, dest, game.blocked);
  if (!path || path.length < 2) return null;
  const worms = graboidNodes(game);
  if (!worms.has(path[1])) return path[1];
  const alts = neighbors(from, game.blocked).filter((n) => !worms.has(n) && !game.inaccessible.has(n));
  if (!alts.length) return path[1];
  alts.sort((a, b) => {
    const pa = shortestPath(a, dest, game.blocked);
    const pb = shortestPath(b, dest, game.blocked);
    return (pa ? pa.length : 99) - (pb ? pb.length : 99);
  });
  return alts[0];
}

function nearestEssential(game, from) {
  let best = null;
  let bestLen = Infinity;
  for (const o of game.objectives) {
    if (o.kind !== "essential" || o.status !== "active") continue;
    if (game.inaccessible.has(o.location)) continue;
    const path = shortestPath(from, o.location, game.blocked);
    if (!path) continue;
    if (path.length < bestLen) {
      bestLen = path.length;
      best = o;
    }
  }
  return best;
}

function fleeTarget(game, c) {
  const worms = graboidNodes(game);
  const opts = neighbors(c.location, game.blocked).filter((n) => !worms.has(n) && !game.inaccessible.has(n));
  return opts[0] || null;
}

function tryAct(game, id, action) {
  const res = game.act(id, action);
  if (!res || !res.ok) {
    if (!game.gameOver && game.activeId() === id && !game.pendingChoice) {
      game.act(id, { type: "endTurn" });
    }
  }
  return res;
}

function turtleAct(game) {
  if (game.pendingChoice) {
    resolvePending(game);
    return;
  }
  const id = game.activeId();
  const c = game.char(id);
  const acts = game.legalActions(id);
  const emergency = c.grabbed || c.threatened || graboidNodes(game).has(c.location);

  const evac = acts.find((a) => a.type === "evacuate");
  const struggle = acts.find((a) => a.type === "struggle");
  if (struggle) {
    tryAct(game, id, struggle);
    return;
  }
  const rescue = acts.find((a) => a.type === "rescue");
  if (rescue) {
    tryAct(game, id, rescue);
    return;
  }

  const grabbed = game.characters.find((o) => o.grabbed && o.health !== "dead");
  if (grabbed && grabbed.id !== id && !emergency) {
    const step = safestStep(game, c.location, grabbed.location);
    if (step && acts.some((a) => a.type === "move")) {
      tryAct(game, id, { type: "move", style: "careful", target: step });
      return;
    }
  }

  if (evac) {
    const r = game.act(id, evac);
    if (r && r.ok) return;
  }

  if (emergency) {
    const dest = fleeTarget(game, c);
    if (dest && acts.some((a) => a.type === "move")) {
      tryAct(game, id, { type: "move", style: "careful", target: dest });
      return;
    }
  }

  if (!emergency && game.noiseThisRound >= 6) {
    game.act(id, { type: "endTurn" });
    return;
  }

  const objHere = game.objectives.find((o) => o.status === "active" && o.kind === "essential" && o.location === c.location);
  if (objHere && acts.some((a) => a.type === "work") && (id === "rhonda" || game.noiseThisRound < 5)) {
    tryAct(game, id, { type: "work" });
    return;
  }

  const line = acts.find((a) => a.type === "rig" && a.rig === "line_rescue");
  if (line) {
    const victim = game.characters.find(
      (o) => o.id !== id && (o.grabbed || o.threatened) && neighbors(c.location, game.blocked).includes(o.location)
    );
    if (victim) {
      tryAct(game, id, { type: "rig", rig: "line_rescue", target: victim.location });
      return;
    }
  }

  const bomb = acts.find((a) => a.type === "rig" && a.rig === "pipe_bomb");
  const fire = acts.find((a) => a.type === "rig" && a.rig === "fire_bomb");
  const worms = [...graboidNodes(game)];
  const adjWorm = worms.some((n) => n === c.location || neighbors(c.location, game.blocked).includes(n));
  if (bomb && adjWorm) {
    tryAct(game, id, bomb);
    return;
  }
  if (fire && graboidNodes(game).has(c.location)) {
    tryAct(game, id, fire);
    return;
  }

  const target = nearestEssential(game, c.location);
  if (target && target.location !== c.location && c.actions > 0 && game.noiseThisRound < 5) {
    const step = safestStep(game, c.location, target.location);
    if (step) {
      const style = game.quietMoves > 0 ? "quietToken" : "careful";
      const reach = game.reachable(c, style);
      if (reach.includes(step)) {
        tryAct(game, id, { type: "move", style, target: step });
        return;
      }
      if (reach.length) {
        tryAct(game, id, { type: "move", style: "careful", target: reach[0] });
        return;
      }
    }
  }

  const here = DATA.nodes.find((n) => n.id === c.location);
  const essentialsLeft = game.objectives.some((o) => o.kind === "essential" && o.status === "active");
  if (
    !emergency &&
    here &&
    here.search >= 3 &&
    game.noiseThisRound < 4 &&
    game.itemDeck.length > 0 &&
    acts.some((a) => a.type === "search") &&
    (!essentialsLeft || (id === "rhonda" && here.search >= 4))
  ) {
    tryAct(game, id, { type: "search" });
    return;
  }

  game.act(id, { type: "endTurn" });
}

function play(seed) {
  const game = new Game({ seed });
  game.setup();
  draft(game);
  let guard = 0;
  while (!game.gameOver && guard++ < 1000) {
    turtleAct(game);
  }
  if (!game.gameOver) {
    game.gameOver = "loss";
    game.winReason = "Simulation stalled.";
  }
  return game;
}

function main() {
  const n = Math.max(1, parseInt(process.argv[2] || "20", 10));
  let wins = 0;
  const reasons = {};
  for (let i = 0; i < n; i++) {
    const g = play(1000 + i * 17);
    if (g.gameOver === "win") wins += 1;
    const key = g.gameOver + ": " + (g.winReason || "").slice(0, 80);
    reasons[key] = (reasons[key] || 0) + 1;
  }
  const pct = ((100 * wins) / n).toFixed(1);
  console.log(`Turtle ${n} games: ${wins} wins (${pct}%)`);
  Object.entries(reasons)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`  ${v}\t${k}`));
}

if (require.main === module) main();

module.exports = { play };
