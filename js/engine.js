/* Tremors: Perfection — cooperative rules engine. */

const TremorsEngine = (() => {
  const DATA = typeof TREMORS_DATA !== "undefined" ? TREMORS_DATA : require("./data.js").TREMORS_DATA;

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function rng() {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function nodeById(id) {
    return DATA.nodes.find((n) => n.id === id);
  }

  function sectorOf(nodeId) {
    return nodeById(nodeId).sector;
  }

  function neighbors(nodeId, blocked) {
    const out = [];
    for (const [a, b] of DATA.routes) {
      const key = `${a}|${b}`;
      const rev = `${b}|${a}`;
      if (blocked.has(key) || blocked.has(rev)) continue;
      if (a === nodeId) out.push(b);
      if (b === nodeId) out.push(a);
    }
    return out;
  }

  function shortestPath(from, to, blocked) {
    if (from === to) return [from];
    const q = [[from]];
    const seen = new Set([from]);
    while (q.length) {
      const path = q.shift();
      const last = path[path.length - 1];
      for (const n of neighbors(last, blocked)) {
        if (seen.has(n)) continue;
        const next = path.concat(n);
        if (n === to) return next;
        seen.add(n);
        q.push(next);
      }
    }
    return null;
  }

  function noiseBand(n) {
    if (n <= 3) return "quiet";
    if (n <= 7) return "disturbed";
    return "frenzy";
  }

  function responseFor(n) {
    return DATA.responseTable.find((r) => n >= r.min && n <= r.max) || DATA.responseTable[DATA.responseTable.length - 1];
  }

  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickN(arr, n, rng) {
    return shuffle(arr, rng).slice(0, n);
  }

  function defaultActions(health) {
    if (health === "critical" || health === "dead" || health === "grabbed") return 0;
    if (health === "injured") return 1;
    return 2;
  }

  class Game {
    constructor(options = {}) {
      this.seed = options.seed == null ? Date.now() : options.seed;
      this.rng = options.rng || mulberry32(this.seed);
      this.log = [];
      this.uiQueue = [];
      this.listeners = [];
    }

    onChange(fn) {
      this.listeners.push(fn);
    }

    emit() {
      for (const fn of this.listeners) fn(this.getState());
    }

    note(html) {
      this.log.unshift({ round: this.round, text: html });
      if (this.log.length > 80) this.log.pop();
    }

    d6() {
      return 1 + Math.floor(this.rng() * 6);
    }

    setup(opts = {}) {
      if (opts.seed != null) {
        this.seed = opts.seed;
        this.rng = mulberry32(this.seed);
      }
      this.log = [];
      this.round = 1;
      this.phase = 1;
      this.gameOver = null;
      this.winReason = null;
      this.noiseThisRound = 0;
      this.noiseLimit = DATA.startingNoiseLimit;
      this.desperation = 0;
      this.aggression = 0;
      this.rescueTokens = DATA.startingRescueTokens;
      this.medicalKits = DATA.startingMedicalKits;
      this.quietMoves = 0;
      this.distractions = 0;
      this.fuel = 0;
      this.fuelNoisePenalty = false;
      this.loaderReady = false;
      this.loaderDamaged = false;
      this.solidRockKnown = false;
      this.assemblyPoint = false;
      this.radioFailed = false;
      this.desperationTick = false;
      this.darkness = false;
      this.adaptiveNoise = false;
      this.lastMoveStyle = null;
      this.injuryUpgrade = false;
      this.unpredictable = false;
      this.mindy = { location: "nancy", exposed: false, present: false };
      this.tumbler = false;
      this.fridgeNoise = 0;
      this.storeHighValue = false;
      this.barbed = 0;
      this.urgentEssentials = false;
      this.rhondaPeekPending = false;
      this.rhondaDontMove = false;
      this.earlFreeMoveReady = false;
      this.pendingChoice = null;
      this.locationNoise = {};
      this.tremors = {};
      this.blocked = new Set();
      this.compromised = new Set();
      this.unsafe = new Set();
      this.poweredOff = new Set();
      this.inaccessible = new Set();
      DATA.nodes.forEach((n) => {
        this.locationNoise[n.id] = 0;
        this.tremors[n.id] = 0;
      });

      this.characters = DATA.characters.map((c) => ({
        id: c.id,
        location: c.start,
        health: "healthy",
        shaken: false,
        threatened: false,
        grabbed: false,
        pinned: false,
        exposed: false,
        criticalTimer: 0,
        equipment: [],
        signatureUsed: false,
        preparedReady: c.id === "burt",
        luckUsed: false,
        knowsWhenUsed: false,
        seismologistUsed: false,
        movedThisTurn: false,
        quietNext: false,
        actions: defaultActions("healthy"),
        maxActions: defaultActions("healthy"),
        acted: false,
      }));

      const burtGear = pickN(DATA.equipment, 3, this.rng);
      this.burtDraft = burtGear;
      this.characters.find((c) => c.id === "burt").equipment = burtGear.slice(0, 2).map((e) => e.id);

      this.objectives = [
        ...pickN(DATA.objectives.essential, opts.essentialCount || 3, this.rng).map((o) => ({ ...o, kind: "essential", status: "active", progress: 0 })),
        ...pickN(DATA.objectives.optional, opts.optionalCount || 2, this.rng).map((o) => ({ ...o, kind: "optional", status: "active", progress: 0 })),
        ...pickN(DATA.objectives.character, opts.characterCount || 1, this.rng).map((o) => ({ ...o, kind: "character", status: "active", progress: 0 })),
      ];

      const act1 = shuffle(DATA.calamities.filter((c) => c.act === 1), this.rng);
      const act2 = shuffle(DATA.calamities.filter((c) => c.act === 2), this.rng);
      const act3 = shuffle(
        DATA.calamities.filter((c) => c.act === 3 && c.id !== 30),
        this.rng
      );
      this.calamityDecks = {
        1: act1,
        2: act2,
        3: act3.concat(DATA.calamities.filter((c) => c.id === 30)),
      };

      this.graboids = [
        { id: "g1", sector: pickN(["A", "C", "D"], 1, this.rng)[0], hunt: 0, surfaced: false, node: null, wounds: 0, threat: false },
        { id: "g2", sector: pickN(["B", "E"], 1, this.rng)[0], hunt: 0, surfaced: false, node: null, wounds: 0, threat: false },
      ];

      this.turnOrder = ["val", "earl", "rhonda", "burt"];
      this.turnIndex = 0;
      this.refreshTurn();
      this.pendingChoice = {
        type: "burtDraft",
        options: this.burtDraft,
        pick: 2,
      };
      this.note("Something is wrong under Perfection. Complete the essential work before the town falls. Burt: pick 2 pieces of kit.");
      this.emit();
      return this;
    }

    getState() {
      return {
        seed: this.seed,
        round: this.round,
        phase: this.phase,
        gameOver: this.gameOver,
        winReason: this.winReason,
        noiseThisRound: this.noiseThisRound,
        noiseLimit: this.noiseLimit,
        noiseBand: noiseBand(this.noiseThisRound),
        response: responseFor(this.noiseThisRound),
        desperation: this.desperation,
        aggression: this.aggression,
        rescueTokens: this.rescueTokens,
        medicalKits: this.medicalKits,
        quietMoves: this.quietMoves,
        distractions: this.distractions,
        fuel: this.fuel,
        loaderReady: this.loaderReady,
        loaderDamaged: this.loaderDamaged,
        solidRockKnown: this.solidRockKnown,
        darkness: this.darkness,
        mindy: clone(this.mindy),
        locationNoise: { ...this.locationNoise },
        tremors: { ...this.tremors },
        blocked: [...this.blocked],
        compromised: [...this.compromised],
        unsafe: [...this.unsafe],
        poweredOff: [...this.poweredOff],
        inaccessible: [...this.inaccessible],
        characters: clone(this.characters),
        graboids: clone(this.graboids),
        objectives: clone(this.objectives),
        calamityUpcoming: DATA.calamityRounds.includes(this.round),
        calamityRounds: DATA.calamityRounds,
        maxRound: DATA.maxRound,
        activeId: this.activeId(),
        pendingChoice: this.pendingChoice ? clone(this.pendingChoice) : null,
        log: this.log.slice(0, 24),
        nextCalamityTitle: this.rhondaPeekPending ? null : undefined,
      };
    }

    activeId() {
      return this.turnOrder[this.turnIndex];
    }

    char(id) {
      return this.characters.find((c) => c.id === id);
    }

    def(id) {
      return DATA.characters.find((c) => c.id === id);
    }

    refreshTurn() {
      const c = this.char(this.activeId());
      const healthForActions = c.grabbed ? "grabbed" : c.health;
      c.maxActions = defaultActions(healthForActions);
      if (c.pinned) c.maxActions = Math.min(c.maxActions, 1);
      c.actions = c.maxActions;
      c.acted = false;
      c.movedThisTurn = false;
      c.luckUsed = false;
      c.seismologistUsed = false;
      if (c.id === "burt") c.preparedReady = true;
      if (c.id === "val") {
        const node = nodeById(c.location);
        if (this.unsafe.has(c.location) || c.threatened || node.type === "open") {
          c.bonusMove = 1;
        } else c.bonusMove = 0;
      }
      this.rhondaDontMove = c.id === "rhonda";
    }

    movementOf(c) {
      let m = this.def(c.id).movement;
      if (c.id === "val" && c.health === "injured") m -= 1;
      if (c.id === "val" && c.bonusMove) m += 1;
      return Math.max(1, m);
    }

    addNoise(nodeId, amount, source) {
      if (amount <= 0) return;
      if (this.darkness) amount += 1;
      const node = nodeById(nodeId);
      amount += node.noiseMod > 1 && source !== "careful" ? 1 : 0;
      if (this.fuelNoisePenalty && node.type === "metal") amount += 1;
      if (this.storeHighValue && nodeId === "store") amount += 1;
      this.noiseThisRound += amount;
      this.locationNoise[nodeId] += amount;
      this.note(`Noise +${amount} at ${node.name} (${source || "action"}). Round total ${this.noiseThisRound}.`);
      const earl = this.char("earl");
      const actor = this.char(this.activeId());
      if (earl && actor && actor.id !== "earl" && !earl.knowsWhenUsed && !earl.grabbed && earl.health !== "critical") {
        this.earlFreeMoveReady = { toward: nodeId };
      }
      if (this.noiseThisRound >= this.noiseLimit) {
        const rhonda = this.char("rhonda");
        if (rhonda && !rhonda.seismologistUsed && rhonda.health !== "critical" && rhonda.health !== "dead") {
          this.offerRhondaPeek();
        }
      }
    }

    offerRhondaPeek() {
      const rhonda = this.char("rhonda");
      if (!rhonda || rhonda.seismologistUsed) return;
      if (!DATA.calamityRounds.includes(this.round) && this.round !== DATA.maxRound) return;
      const card = this.peekCalamity();
      if (!card) return;
      rhonda.seismologistUsed = true;
      if (rhonda.health === "injured") {
        this.note(`Rhonda glimpses the next calamity: <b>${card.title}</b>. She is injured and cannot bury it.`);
        return;
      }
      this.pendingChoice = {
        type: "rhondaPeek",
        title: card.title,
        flavour: card.flavour,
      };
    }

    peekCalamity() {
      const act = this.round <= 4 ? 1 : this.round <= 9 ? 2 : 3;
      const deck = this.calamityDecks[act];
      return deck[0] || null;
    }

    resolveRhondaPeek(bury) {
      if (!this.pendingChoice || this.pendingChoice.type !== "rhondaPeek") return;
      const act = this.round <= 4 ? 1 : this.round <= 9 ? 2 : 3;
      const deck = this.calamityDecks[act];
      if (bury && deck.length > 1) {
        const card = deck.shift();
        deck.push(card);
        this.note(`Rhonda buries <b>${card.title}</b>.`);
      } else {
        this.note(`Rhonda keeps <b>${deck[0].title}</b> on top.`);
      }
      this.pendingChoice = null;
      this.emit();
    }

    legalActions(charId) {
      if (this.gameOver || this.pendingChoice) return [];
      const c = this.char(charId);
      if (!c || charId !== this.activeId()) return [];
      const acts = [];
      if (c.grabbed) {
        if (this.rescueTokens > 0 && c.actions > 0) {
          acts.push({ type: "struggle", label: "Struggle free (spend Rescue token, +2 Noise)" });
        }
        acts.push({ type: "endTurn", label: "Wait for rescue" });
        return acts;
      }
      if (c.health === "critical") {
        acts.push({ type: "endTurn", label: "Hold on" });
        return acts;
      }
      if (c.actions <= 0) {
        acts.push({ type: "endTurn", label: "End turn" });
        if (c.id === "earl" && this.earlFreeMoveReady) {
          acts.push({ type: "earlReact", label: "Earl: move 1 toward the noise" });
        }
        return acts;
      }

      const moveStyles = [
        { style: "careful", label: "Move carefully (1 space, 0 Noise)" },
        { style: "normal", label: "Move (1 Noise)" },
        { style: "run", label: "Run (2 Noise)" },
      ];
      for (const ms of moveStyles) {
        acts.push({ type: "move", style: ms.style, label: ms.label, needsTarget: "node" });
      }
      if (c.id === "val") {
        acts.push({ type: "move", style: "fast", label: "Fast (+1 space, extra +1 Noise)", needsTarget: "node" });
      }
      if (this.quietMoves > 0) {
        acts.push({ type: "move", style: "quietToken", label: "Quiet Move token (0 Noise)", needsTarget: "node" });
      }

      const here = nodeById(c.location);
      if (!c.pinned) {
        acts.push({ type: "search", label: `Search ${here.name} (+1 Noise)` });
        acts.push({ type: "work", label: "Work an objective here" });
        acts.push({ type: "distract", label: "Create a diversion (+3 Noise at adjacent node)", needsTarget: "adjacent" });
        acts.push({ type: "hide", label: "Stay quiet (end remaining actions, 0 Noise)" });
      }

      const othersHere = this.characters.filter((o) => o.id !== c.id && o.location === c.location);
      for (const o of othersHere) {
        if ((o.grabbed || o.threatened) && this.rescueTokens > 0) {
          acts.push({ type: "rescue", target: o.id, label: `Rescue ${this.def(o.id).name} (token, +2 Noise)` });
        }
        if ((o.health === "injured" || o.health === "critical") && this.medicalKits > 0) {
          acts.push({ type: "aid", target: o.id, label: `First aid on ${this.def(o.id).name}` });
        }
        if (o.pinned) {
          acts.push({ type: "unpin", target: o.id, label: `Help ${this.def(o.id).name} up` });
        }
        if (c.id === "earl" && o.shaken) {
          acts.push({ type: "calm", target: o.id, label: `Keep Moving: remove Shaken from ${this.def(o.id).name}` });
        }
      }

      const surfacedHere = this.graboids.find((g) => g.surfaced && g.node === c.location);
      if (surfacedHere) {
        acts.push({ type: "fight", label: "Fight the Graboid" });
      }
      if (c.id === "rhonda") {
        acts.push({ type: "identify", label: "I Know Where It Is (reveal Graboid in this sector)" });
      }
      if (!c.signatureUsed) {
        acts.push({ type: "signature", label: `Signature: ${this.def(c.id).signature.name}` });
      }
      if (this.distractions > 0) {
        acts.push({ type: "useDistract", label: "Throw a distraction (+3 Noise adjacent)", needsTarget: "adjacent" });
      }
      if (c.id === "earl" && this.earlFreeMoveReady) {
        acts.push({ type: "earlReact", label: "Earl: move 1 toward the noise (free)" });
      }
      const essentials = this.objectives.filter((o) => o.kind === "essential");
      if (essentials.length && essentials.every((o) => o.status === "passed") && !this.gameOver) {
        acts.push({ type: "evacuate", label: "Evacuate Perfection (everyone alive, essentials done)" });
      }
      acts.push({ type: "endTurn", label: "End turn" });
      return acts;
    }

    reachable(c, style) {
      const blocked = this.blocked;
      const start = c.location;
      let points = 1;
      if (style === "careful") points = 1;
      else if (style === "normal") points = this.movementOf(c);
      else if (style === "run") points = this.movementOf(c) + 1;
      else if (style === "fast") points = this.movementOf(c) + 1;
      else if (style === "quietToken") points = this.movementOf(c);
      if (c.pinned) points = 0;
      if (this.barbed && start === "school") points = Math.max(0, points - this.barbed);
      const reach = new Set();
      const q = [{ id: start, d: 0 }];
      const seen = { [start]: 0 };
      while (q.length) {
        const cur = q.shift();
        if (cur.d >= points) continue;
        for (const n of neighbors(cur.id, blocked)) {
          if (this.inaccessible.has(n)) continue;
          const nd = cur.d + 1;
          if (seen[n] != null && seen[n] <= nd) continue;
          seen[n] = nd;
          reach.add(n);
          q.push({ id: n, d: nd });
        }
      }
      reach.delete(start);
      return [...reach];
    }

    act(charId, action) {
      if (this.gameOver) return { ok: false, error: "Game over" };
      if (action.type === "rhondaPeek") {
        this.resolveRhondaPeek(action.bury);
        return { ok: true };
      }
      if (action.type === "burtDraft") return this.resolveBurtDraft(action.ids);
      if (action.type === "valRun") {
        this.resolveValRun(action.target);
        return { ok: true };
      }
      if (action.type === "earlExodus") {
        this.resolveEarlExodus(action.moves);
        return { ok: true };
      }
      if (this.pendingChoice) {
        return { ok: false, error: "Resolve the pending choice first." };
      }
      const c = this.char(charId);
      if (!c || charId !== this.activeId()) return { ok: false, error: "Not this character's turn." };

      const spend = () => {
        if (c.actions <= 0) return false;
        c.actions -= 1;
        c.acted = true;
        return true;
      };

      switch (action.type) {
        case "move":
          return this.doMove(c, action, spend);
        case "search":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doSearch(c);
        case "work":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doWork(c);
        case "distract":
        case "useDistract":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doDistract(c, action.target, action.type === "useDistract");
        case "hide":
          return this.doHide(c);
        case "rescue":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doRescue(c, action.target);
        case "aid":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doAid(c, action.target);
        case "unpin":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doUnpin(c, action.target);
        case "calm":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doCalm(c, action.target);
        case "fight":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doFight(c);
        case "identify":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doIdentify(c);
        case "signature":
          return this.doSignature(c);
        case "struggle":
          if (!spend()) return { ok: false, error: "No actions left." };
          return this.doStruggle(c);
        case "earlReact":
          return this.doEarlReact();
        case "endTurn":
          this.endTurn();
          return { ok: true };
        case "evacuate":
          return this.doEvacuate();
        case "burtDraft":
          return this.resolveBurtDraft(action.ids);
        default:
          return { ok: false, error: "Unknown action" };
      }
    }

    noiseForMove(c, style) {
      if (c.quietNext) return 0;
      let n = 0;
      if (style === "careful" || style === "quietToken") n = 0;
      else if (style === "normal") n = 1;
      else if (style === "run") n = 2;
      else if (style === "fast") n = 2;
      if (c.shaken && style !== "careful" && style !== "quietToken") n += 1;
      if (this.adaptiveNoise && this.lastMoveStyle === style && style !== "careful") n += 1;
      return n;
    }

    doMove(c, action, spend) {
      if (c.pinned) return { ok: false, error: "Pinned. Someone must help you up." };
      const dest = action.target;
      if (!dest) return { ok: false, error: "Pick a destination." };
      const reach = this.reachable(c, action.style);
      if (!reach.includes(dest)) return { ok: false, error: "Cannot reach that node with this move." };
      if (this.barbed >= 2 && (c.location === "school" || dest === "school") && this.rng() < 0.5) {
        this.hurt(c, "injured", "Barbed wire.");
      }
      if (!spend()) return { ok: false, error: "No actions left." };
      if (action.style === "quietToken") this.quietMoves -= 1;
      const n = this.noiseForMove(c, action.style);
      c.location = dest;
      c.movedThisTurn = true;
      if (c.id === "rhonda") this.rhondaDontMove = false;
      this.lastMoveStyle = action.style;
      this.addNoise(dest, n, action.style);
      const g = this.graboids.find((x) => x.surfaced && x.node === dest);
      if (g) {
        this.note(`${this.def(c.id).name} entered a surfaced Graboid's node.`);
        this.engage(c, g, "enter");
      }
      if (c.threatened && dest !== action.from) {
        c.threatened = false;
        this.note(`${this.def(c.id).name} slipped off the Threatened node.`);
      }
      this.checkTogether(c);
      this.emit();
      return { ok: true };
    }

    doHide(c) {
      c.actions = 0;
      c.acted = true;
      if (c.id === "rhonda" && !c.movedThisTurn) c.quietNext = true;
      this.note(`${this.def(c.id).name} stays still.`);
      this.emit();
      return { ok: true };
    }

    doSearch(c) {
      const here = nodeById(c.location);
      let noise = c.quietNext ? 0 : 1;
      c.quietNext = false;
      this.addNoise(c.location, noise, "search");
      const def = this.def(c.id);
      let roll = this.d6() + def.search;
      if (c.id === "val" && !c.luckUsed && roll < 6) {
        c.luckUsed = true;
        const retry = this.d6() + def.search;
        if (retry < 6) {
          this.addNoise(c.location, 1, "Val's luck fails");
        }
        roll = Math.max(roll, retry);
      }
      if (roll >= 6) {
        const finds = ["a scrap of useful kit", "a half-full canteen", "local knowledge", "a loose board that will make a quieter path"];
        const find = finds[Math.floor(this.rng() * finds.length)];
        if (this.rng() < 0.35) {
          this.medicalKits += 1;
          this.note(`${def.name} searches ${here.name} and finds medical supplies.`);
        } else if (this.rng() < 0.3) {
          this.distractions += 1;
          this.note(`${def.name} searches ${here.name} and rigs a distraction.`);
        } else {
          this.note(`${def.name} searches ${here.name}: ${find}.`);
        }
      } else {
        this.note(`${def.name} searches ${here.name} and comes up empty (roll ${roll}).`);
      }
      this.emit();
      return { ok: true };
    }

    doWork(c) {
      const obj = this.objectives.find((o) => o.status === "active" && o.location === c.location);
      if (!obj) {
        this.note("Nothing to work here.");
        this.emit();
        return { ok: true };
      }
      let noise = c.quietNext ? 0 : obj.noise;
      c.quietNext = false;
      this.addNoise(c.location, noise, obj.name);
      obj.progress += 1;
      this.note(`${this.def(c.id).name} works on <b>${obj.name}</b> (${obj.progress}/${obj.work}).`);
      if (obj.progress >= obj.work) this.completeObjective(obj);
      this.emit();
      return { ok: true };
    }

    completeObjective(obj) {
      obj.status = "passed";
      this.note(`Objective complete: <b>${obj.name}</b>. ${obj.pass}`);
      switch (obj.id) {
        case "radio_working":
          this.rescueTokens += 1;
          break;
        case "seismograph":
          this.note("Intel: Graboids always investigate the greatest noise in their sector.");
          this.graboids.forEach((g) => this.note(`${g.id} is in sector ${g.sector}, Hunt ${g.hunt}${g.surfaced ? ", SURFACED" : ""}.`));
          break;
        case "heavy_vehicle":
          this.loaderReady = !this.loaderDamaged;
          this.fuel += 1;
          break;
        case "safe_ground":
          this.solidRockKnown = true;
          break;
        case "meeting_point":
          this.assemblyPoint = true;
          break;
        case "walters_store":
          this.medicalKits += 1;
          this.distractions += 1;
          break;
        case "burts_arsenal":
        case "char_burt":
        case "basement":
          this.giveBurt("explosives");
          this.giveBurt("ammo");
          break;
        case "gather_fuel":
          this.fuel += 3;
          break;
        case "medical":
          this.medicalKits += 2;
          break;
        case "horses":
        case "char_mindy":
          this.quietMoves += obj.id === "horses" ? 2 : 1;
          if (obj.id === "char_mindy") this.mindy.present = false;
          break;
        case "trailer_salvage":
          this.loaderReady = this.loaderReady;
          this.note("People Carrier unlocked.");
          break;
        case "char_rhonda":
          this.graboids.forEach((g) => this.note(`Rhonda pins ${g.id}: sector ${g.sector}, Hunt ${g.hunt}.`));
          break;
        case "char_val_earl":
          this.distractions += 1;
          break;
        default:
          break;
      }
      this.checkWin();
    }

    failObjective(obj, reason) {
      if (obj.status !== "active") return;
      obj.status = "failed";
      this.note(`Objective failed: <b>${obj.name}</b>. ${obj.fail} ${reason || ""}`);
      switch (obj.id) {
        case "road_blocked":
          this.aggression += 1;
          this.unsafe.add("highway");
          this.blockRoute("highway", "workshop");
          this.noiseLimit = Math.max(4, this.noiseLimit - 1);
          break;
        case "radio_working":
          this.radioFailed = true;
          this.desperation += 1;
          this.desperationTick = true;
          break;
        case "seismograph":
          this.unpredictable = true;
          break;
        case "heavy_vehicle":
          this.loaderDamaged = true;
          break;
        case "gather_fuel":
          this.fuelNoisePenalty = true;
          break;
        case "medical":
          this.injuryUpgrade = true;
          break;
        case "char_rhonda":
          this.unpredictable = true;
          break;
        case "basement":
          this.inaccessible.add("burt");
          this.compromised.add("burt");
          break;
        default:
          break;
      }
    }

    giveBurt(equipId) {
      const burt = this.char("burt");
      if (!burt.equipment.includes(equipId)) burt.equipment.push(equipId);
    }

    doDistract(c, target, spendToken) {
      if (!target) return { ok: false, error: "Pick an adjacent node." };
      if (!neighbors(c.location, this.blocked).includes(target)) return { ok: false, error: "Not adjacent." };
      if (spendToken) {
        if (this.distractions <= 0) return { ok: false, error: "No distraction tokens." };
        this.distractions -= 1;
      }
      this.addNoise(target, 3, "diversion");
      this.note(`${this.def(c.id).name} throws a diversion at ${nodeById(target).name}.`);
      this.emit();
      return { ok: true };
    }

    doRescue(c, targetId) {
      const t = this.char(targetId);
      if (!t) return { ok: false, error: "No target." };
      if (t.location !== c.location) return { ok: false, error: "Must share the node." };
      if (this.rescueTokens <= 0) return { ok: false, error: "No Rescue tokens left." };
      this.rescueTokens -= 1;
      t.grabbed = false;
      t.threatened = false;
      t.pinned = false;
      t.health = t.health === "critical" ? "injured" : t.health === "healthy" ? "injured" : t.health;
      c.shaken = true;
      this.addNoise(c.location, 2, "rescue");
      this.note(`${this.def(c.id).name} pulls ${this.def(t.id).name} free. Rescue tokens: ${this.rescueTokens}.`);
      this.emit();
      return { ok: true };
    }

    doStruggle(c) {
      if (this.rescueTokens <= 0) return { ok: false, error: "No Rescue tokens." };
      this.rescueTokens -= 1;
      c.grabbed = false;
      c.threatened = false;
      c.health = "injured";
      c.shaken = true;
      this.addNoise(c.location, 2, "struggle");
      this.note(`${this.def(c.id).name} burns a Rescue token and tears free.`);
      this.emit();
      return { ok: true };
    }

    doAid(c, targetId) {
      const t = this.char(targetId);
      if (!t || t.location !== c.location) return { ok: false, error: "Must share the node." };
      if (this.medicalKits <= 0) return { ok: false, error: "No medical kits." };
      if (t.health === "critical") {
        this.medicalKits -= 1;
        t.health = "injured";
        t.criticalTimer = 0;
        this.note(`${this.def(c.id).name} stabilises ${this.def(t.id).name}: Critical → Injured.`);
      } else if (t.health === "injured") {
        this.medicalKits -= 1;
        t.health = "healthy";
        t.shaken = false;
        this.note(`${this.def(c.id).name} patches ${this.def(t.id).name}: Injured → Healthy.`);
      } else {
        this.note("They don't need aid.");
      }
      this.emit();
      return { ok: true };
    }

    doUnpin(c, targetId) {
      const t = this.char(targetId);
      if (!t || t.location !== c.location) return { ok: false, error: "Must share the node." };
      t.pinned = false;
      this.note(`${this.def(c.id).name} hauls ${this.def(t.id).name} to their feet.`);
      this.emit();
      return { ok: true };
    }

    doCalm(c, targetId) {
      const t = this.char(targetId);
      if (!t || t.location !== c.location) return { ok: false, error: "Must share the node." };
      t.shaken = false;
      this.note(`Earl: "Keep moving." ${this.def(t.id).name} is no longer Shaken.`);
      this.emit();
      return { ok: true };
    }

    doFight(c) {
      const g = this.graboids.find((x) => x.surfaced && x.node === c.location);
      if (!g) return { ok: false, error: "No surfaced Graboid here." };
      const def = this.def(c.id);
      let combat = def.combat;
      let extraNoise = 3;
      const hasHeavy = c.equipment.some((e) => {
        const eq = DATA.equipment.find((x) => x.id === e);
        return eq && eq.heavy;
      });
      if (c.id === "burt" && hasHeavy) {
        combat += 1;
        extraNoise += 2;
        extraNoise += 1; // heavy equipment weakness
        if (c.health === "injured") combat -= 1;
      }
      if (c.equipment.includes("explosives")) {
        extraNoise = 5;
        combat += 2;
      }
      if (c.quietNext) {
        extraNoise = 0;
        c.quietNext = false;
      }
      this.addNoise(c.location, extraNoise, "fight");
      let roll = this.d6() + combat;
      if (c.id === "val" && !c.luckUsed && roll < 8) {
        c.luckUsed = true;
        const retry = this.d6() + combat;
        if (retry < 8) this.addNoise(c.location, 1, "Val's luck fails");
        roll = Math.max(roll, retry);
      }
      if (c.equipment.includes("ammo") && roll < 8) {
        c.equipment = c.equipment.filter((e) => e !== "ammo");
        roll = this.d6() + combat;
        this.note("Ammunition spent for a reroll.");
      }
      if (roll >= 8) {
        g.wounds += 1;
        this.note(`${def.name} wounds the Graboid (roll ${roll}). Wounds: ${g.wounds}/2.`);
        if (g.wounds >= 2) this.killGraboid(g);
      } else {
        this.note(`${def.name} fires and misses anything that matters (roll ${roll}).`);
        this.engage(c, g, "missedShot");
      }
      this.emit();
      return { ok: true };
    }

    killGraboid(g) {
      this.note(`The Graboid at ${nodeById(g.node).name} is down. The shot will be heard in the next county.`);
      this.addNoise(g.node, 6, "kill shot");
      g.surfaced = false;
      g.node = null;
      g.hunt = 0;
      g.wounds = 0;
      g.threat = false;
      g.sector = pickN(["A", "B", "C", "D", "E"].filter((s) => s !== g.sector), 1, this.rng)[0];
      this.characters.forEach((c) => {
        if (c.threatened || c.grabbed) {
          c.threatened = false;
          c.grabbed = false;
        }
      });
      this.aggression += 1;
      this.noiseLimit = Math.max(4, DATA.startingNoiseLimit - this.aggression);
    }

    doIdentify(c) {
      const sector = sectorOf(c.location);
      const here = this.graboids.filter((g) => g.sector === sector);
      if (!here.length) {
        this.note("Rhonda listens. This sector is quiet. For now.");
      } else {
        here.forEach((g) => {
          this.note(`Rhonda: ${g.id} is ${g.surfaced ? "SURFACED at " + nodeById(g.node).name : "underground in sector " + g.sector}, Hunt ${g.hunt}.`);
        });
      }
      this.emit();
      return { ok: true };
    }

    doSignature(c) {
      if (c.signatureUsed) return { ok: false, error: "Already used." };
      c.signatureUsed = true;
      const def = this.def(c.id);
      this.note(`Signature moment: <b>${def.signature.name}</b>`);
      if (c.id === "burt") {
        c.actions = Math.max(0, c.actions - 1);
        const g = this.graboids.find((x) => x.surfaced && x.node === c.location);
        this.addNoise(c.location, 5, "gun collection");
        if (g) {
          g.wounds += 1;
          this.note("Burt empties something unreasonably large. Graboid wounded.");
          if (g.wounds >= 2) this.killGraboid(g);
        }
      } else if (c.id === "val") {
        c.shaken = true;
        this.pendingChoice = { type: "valRun", hops: 4, remaining: 4 };
      } else if (c.id === "earl") {
        this.pendingChoice = { type: "earlExodus", from: c.location };
      } else if (c.id === "rhonda") {
        const sector = sectorOf(c.location);
        this.graboids.forEach((g) => {
          if (g.sector === sector) this.note(`Revealed ${g.id}: Hunt ${g.hunt}, ${g.surfaced ? "surfaced" : "buried"}.`);
        });
        const buried = this.graboids.find((g) => !g.surfaced && g.sector === sector);
        if (buried) {
          const adj = DATA.sectors[sector].adjacent;
          buried.sector = adj[Math.floor(this.rng() * adj.length)];
          this.note(`Rhonda reroutes ${buried.id} to sector ${buried.sector}.`);
        }
      }
      this.emit();
      return { ok: true };
    }

    resolveValRun(target) {
      const c = this.char("val");
      if (!this.pendingChoice || this.pendingChoice.type !== "valRun") return;
      if (!neighbors(c.location, this.blocked).includes(target)) return;
      c.location = target;
      this.pendingChoice.remaining -= 1;
      this.note(`Val runs to ${nodeById(target).name}.`);
      if (this.pendingChoice.remaining <= 0) this.pendingChoice = null;
      this.emit();
    }

    resolveEarlExodus(moves) {
      if (!this.pendingChoice || this.pendingChoice.type !== "earlExodus") return;
      const from = this.pendingChoice.from;
      for (const [id, dest] of Object.entries(moves || {})) {
        const c = this.char(id);
        if (!c || c.location !== from) continue;
        if (dest && neighbors(from, this.blocked).includes(dest)) {
          c.location = dest;
          this.note(`${this.def(id).name} moves with Earl to ${nodeById(dest).name}.`);
        }
      }
      this.pendingChoice = null;
      this.emit();
    }

    resolveBurtDraft(ids) {
      if (!this.pendingChoice || this.pendingChoice.type !== "burtDraft") return { ok: false, error: "No draft." };
      const chosen = (ids || []).filter((id) => this.burtDraft.some((e) => e.id === id)).slice(0, 2);
      if (chosen.length !== 2) return { ok: false, error: "Pick two." };
      this.char("burt").equipment = chosen;
      this.pendingChoice = null;
      this.note(`Burt takes ${chosen.map((id) => DATA.equipment.find((e) => e.id === id).name).join(" and ")}.`);
      this.emit();
      return { ok: true };
    }

    doEvacuate() {
      const essentials = this.objectives.filter((o) => o.kind === "essential");
      if (!essentials.every((o) => o.status === "passed")) return { ok: false, error: "Essentials unfinished." };
      if (this.characters.some((c) => c.health === "dead" || c.grabbed)) {
        return { ok: false, error: "Cannot leave anyone grabbed or dead." };
      }
      this.gameOver = "win";
      this.winReason = "You call the escape while everyone is still breathing. The valley fold-out can wait for the next prototype.";
      this.note(`<b>YOU ESCAPE PERFECTION.</b> ${this.winReason}`);
      this.emit();
      return { ok: true };
    }

    doEarlReact() {
      const earl = this.char("earl");
      if (!this.earlFreeMoveReady || earl.knowsWhenUsed) return { ok: false, error: "Not available." };
      const dest = this.stepToward(earl.location, this.earlFreeMoveReady.toward);
      if (dest) {
        earl.location = dest;
        this.note(`Earl cuts toward the noise at ${nodeById(dest).name}.`);
      }
      earl.knowsWhenUsed = true;
      this.earlFreeMoveReady = false;
      this.emit();
      return { ok: true };
    }

    stepToward(from, to) {
      const path = shortestPath(from, to, this.blocked);
      if (!path || path.length < 2) return null;
      return path[1];
    }

    checkTogether(c) {
      const earl = this.char("earl");
      if (!earl) return;
      const other = this.characters.find((o) => o.id !== "earl" && o.location === earl.location);
      if (other && other.health === "injured") earl.shaken = true;
    }

    hurt(c, level, reason) {
      const order = ["healthy", "injured", "critical", "dead"];
      if (level === "injured" && c.health === "healthy") {
        if (this.injuryUpgrade) level = "critical";
      }
      const idx = order.indexOf(c.health);
      const target = order.indexOf(level);
      if (target > idx) {
        c.health = level;
        if (level === "critical") c.criticalTimer = 2;
        if (level === "dead") this.die(c, reason);
        else this.note(`${this.def(c.id).name} is now ${level}. ${reason || ""}`);
      }
    }

    die(c, reason) {
      c.health = "dead";
      this.gameOver = "loss";
      this.winReason = `${this.def(c.id).name} is dead. ${reason || "One survivor dies, everyone loses."}`;
      this.note(`<b>GAME OVER.</b> ${this.winReason}`);
      this.emit();
    }

    engage(c, g, why) {
      const node = nodeById(c.location);
      const buildingSafe = node.type === "building" && !this.compromised.has(c.location) && !this.unsafe.has(c.location) && why !== "surface";
      if (buildingSafe && why !== "enter") {
        this.note(`The Graboid tests ${node.name}. The walls still hold — for now.`);
        this.compromised.add(c.location);
        return;
      }
      if (node.type === "tower" && why !== "enter") {
        this.note(`${this.def(c.id).name} is up high. The Graboid cannot grab them — yet. Open ground below is Unsafe.`);
        this.unsafe.add(c.location);
        return;
      }
      if (this.solidRockKnown && (c.location === "aqueduct" || c.location === "mountain_road")) {
        this.note("Solid rock. The Graboid shears off.");
        return;
      }
      const burt = this.char("burt");
      if (burt && burt.preparedReady && burt.location === c.location && burt.equipment.length) {
        burt.preparedReady = false;
        const spent = burt.equipment.pop();
        this.note(`Burt is prepared. He burns ${spent} and the attack doesn't land.`);
        return;
      }
      this.resolveAttack(c, g);
    }

    resolveAttack(c, g) {
      const roll = this.d6();
      let result;
      if (c.grabbed) result = "dragged";
      else if (c.threatened && roll >= 4) result = "grabbed";
      else if (roll <= 2) result = "miss";
      else if (roll === 3) result = "knockdown";
      else if (roll === 4) result = "pinned";
      else result = "grabbed";

      if (result === "miss") {
        c.shaken = true;
        this.note(`Near miss on ${this.def(c.id).name}. They're Shaken.`);
      } else if (result === "knockdown") {
        this.hurt(c, "injured", "Knocked down.");
        c.shaken = true;
      } else if (result === "pinned") {
        c.pinned = true;
        c.threatened = true;
        this.hurt(c, "injured", "Pinned.");
        this.note(`${this.def(c.id).name} is Pinned. Someone must help them.`);
      } else if (result === "grabbed") {
        c.grabbed = true;
        c.threatened = false;
        c.pinned = true;
        this.hurt(c, "injured", "Grabbed.");
        this.note(`<b>${this.def(c.id).name} is GRABBED.</b> You have until the next Graboid activation to rescue them.`);
      } else if (result === "dragged") {
        this.die(c, "Dragged underground.");
      }
    }

    endTurn() {
      const c = this.char(this.activeId());
      c.actions = 0;
      c.acted = true;
      if (c.id === "rhonda" && !c.movedThisTurn) c.quietNext = true;
      this.turnIndex += 1;
      if (this.turnIndex >= this.turnOrder.length) {
        this.endRound();
      } else {
        this.refreshTurn();
        this.note(`— ${this.def(this.activeId()).name}'s turn —`);
      }
      this.emit();
    }

    sectorNoise(sector) {
      return DATA.nodes.filter((n) => n.sector === sector).reduce((s, n) => s + (this.locationNoise[n.id] || 0), 0);
    }

    loudestNodeInSector(sector) {
      const nodes = DATA.nodes.filter((n) => n.sector === sector && !this.inaccessible.has(n.id));
      let best = -1;
      const tops = [];
      for (const n of nodes) {
        const v = this.locationNoise[n.id] || 0;
        if (v > best) {
          best = v;
          tops.length = 0;
          tops.push(n.id);
        } else if (v === best) tops.push(n.id);
      }
      if (this.solidRockKnown) {
        const filtered = tops.filter((id) => id !== "aqueduct" && id !== "mountain_road");
        if (filtered.length) return filtered[Math.floor(this.rng() * filtered.length)];
      }
      return tops[Math.floor(this.rng() * tops.length)];
    }

    loudestSector() {
      const scores = {};
      for (const s of Object.keys(DATA.sectors)) scores[s] = this.sectorNoise(s);
      let best = -1;
      let id = "B";
      for (const [k, v] of Object.entries(scores)) {
        if (v > best) {
          best = v;
          id = k;
        }
      }
      return id;
    }

    moveGraboidTowardNoise(g) {
      if (g.surfaced) {
        const dest = this.loudestNodeInSector(g.sector);
        if (dest && dest !== g.node) {
          const step = this.stepToward(g.node, dest);
          if (step && sectorOf(step) === g.sector) {
            g.node = step;
            this.note(`The surfaced Graboid slides to ${nodeById(step).name}.`);
          } else if (step) {
            g.node = step;
            g.sector = sectorOf(step);
            this.note(`The surfaced Graboid crosses into ${nodeById(step).name}.`);
          }
        }
        this.activateSurfaced(g);
        return;
      }
      const loud = this.loudestSector();
      if (loud !== g.sector && DATA.sectors[g.sector].adjacent.includes(loud)) {
        g.sector = loud;
        this.note(`${g.id} burrows toward sector ${loud}.`);
      } else if (loud !== g.sector) {
        const adj = DATA.sectors[g.sector].adjacent;
        const step = adj.find((s) => DATA.sectors[s].adjacent.includes(loud) || s === loud) || adj[0];
        g.sector = step;
        this.note(`${g.id} shifts to sector ${step}.`);
      }
    }

    raiseHunt(g) {
      const sn = this.sectorNoise(g.sector);
      let add = 0;
      if (sn >= 8) add = 3;
      else if (sn >= 5) add = 2;
      else if (sn >= 1) add = 1;
      if (this.unpredictable && this.rng() < 0.3) add = Math.max(0, add - 1);
      g.hunt = Math.min(3, g.hunt + add + this.aggression);
      if (sn >= 1) this.note(`${g.id} Hunt ${g.hunt} (sector ${g.sector} noise ${sn}).`);
      if (g.hunt >= DATA.huntSurface && !g.surfaced) this.surface(g);
    }

    surface(g) {
      const node = this.loudestNodeInSector(g.sector);
      if (this.solidRockKnown && (node === "aqueduct" || node === "mountain_road")) {
        this.note(`${g.id} tries to surface on solid rock and shears away.`);
        g.hunt = 2;
        return;
      }
      g.surfaced = true;
      g.node = node;
      g.threat = true;
      g.hunt = 3;
      this.unsafe.add(node);
      this.note(`<b>GRABOID SURFACES at ${nodeById(node).name}.</b> This is no longer abstract.`);
      const victims = this.characters
        .filter((c) => c.location === node && c.health !== "dead")
        .sort((a, b) => {
          const rank = (c) => (c.grabbed ? 0 : c.threatened ? 1 : c.health === "injured" ? 2 : 3);
          return rank(a) - rank(b);
        });
      if (victims[0]) this.engage(victims[0], g, "surface");
      else this.note("Nobody is standing on the burst point. The model is still on the board.");
    }

    activateSurfaced(g) {
      const victims = this.characters.filter((c) => c.location === g.node && c.health !== "dead");
      for (const v of victims) {
        if (v.grabbed) {
          this.die(v, "The Graboid finishes the job. Dragged underground.");
          return;
        }
        if (v.threatened) {
          v.grabbed = true;
          v.threatened = false;
          this.note(`<b>${this.def(v.id).name} is GRABBED.</b> One more activation and they are gone.`);
        } else {
          v.threatened = true;
          v.shaken = true;
          this.note(`${this.def(v.id).name} is Threatened. Get them off that node.`);
        }
      }
    }

    graboidPhase() {
      const resp = responseFor(this.noiseThisRound);
      this.note(`Graboid response: <b>${resp.label}</b> (${this.noiseThisRound} noise). ${resp.effect}`);
      const activate = (g) => {
        if (!g.surfaced) this.raiseHunt(g);
        else this.activateSurfaced(g);
      };
      if (resp.id === "quiet") {
        this.graboids.forEach((g) => {
          if (!g.surfaced) this.raiseHunt(g);
        });
      } else if (resp.id === "movement") {
        this.graboids.forEach((g) => {
          this.moveGraboidTowardNoise(g);
          if (!g.surfaced) this.raiseHunt(g);
        });
      } else if (resp.id === "hunting") {
        this.graboids.forEach((g) => {
          this.moveGraboidTowardNoise(g);
          g.hunt = Math.min(3, g.hunt + 1);
          activate(g);
        });
      } else if (resp.id === "frenzy") {
        this.graboids.forEach((g) => {
          this.moveGraboidTowardNoise(g);
          activate(g);
          if (!this.gameOver) this.moveGraboidTowardNoise(g);
        });
      } else if (resp.id === "stampede") {
        this.graboids.forEach((g) => {
          this.moveGraboidTowardNoise(g);
          activate(g);
        });
        if (this.graboids.length < 4) {
          const used = this.graboids.map((g) => g.sector);
          const free = ["A", "B", "C", "D", "E"].filter((s) => !used.includes(s));
          const sector = (free.length ? free : ["B"])[0];
          this.graboids.push({
            id: "g" + (this.graboids.length + 1),
            sector,
            hunt: 1,
            surfaced: false,
            node: null,
            wounds: 0,
            threat: false,
          });
          this.note(`Stampede: another Graboid enters sector ${sector}.`);
        }
      }
    }

    drawCalamity() {
      const act = this.round <= 4 ? 1 : this.round <= 9 ? 2 : 3;
      let deck = this.calamityDecks[act];
      if (!deck.length) deck = this.calamityDecks[3];
      let card;
      if (this.round === 12) {
        const getOut = deck.find((c) => c.id === 30) || DATA.calamities.find((c) => c.id === 30);
        card = getOut;
        this.calamityDecks[act] = deck.filter((c) => c.id !== 30);
      } else {
        card = deck.shift();
      }
      const band = noiseBand(this.noiseThisRound);
      const text = card[band];
      this.note(`⚠ Calamity: <b>${card.title}</b> <i>(${band})</i> — ${card.flavour}`);
      this.note(text);
      this.applyCalamity(card, band);
    }

    blockRoute(a, b) {
      this.blocked.add(`${a}|${b}`);
      this.blocked.add(`${b}|${a}`);
    }

    applyCalamity(card, band) {
      const loudNode = this.loudestNodeInSector(this.loudestSector());
      const nearestG = () => {
        const s = sectorOf(loudNode);
        return this.graboids.find((g) => g.sector === s) || this.graboids[0];
      };
      switch (card.id) {
        case 1:
          this.blockRoute("highway", "workshop");
          if (band !== "quiet") this.blockRoute("highway", "caterpillar");
          if (band === "frenzy") {
            const road = this.objectives.find((o) => o.id === "road_blocked" && o.status === "active");
            if (road) this.note("Find Another Way Out is now the only option. Finish Safe Ground or the radio.");
          }
          break;
        case 2:
          this.tremors[loudNode] += 1;
          if (band !== "quiet") this.tremors[this.loudestNodeInSector("A")] += 1;
          if (band === "frenzy") {
            const g = nearestG();
            this.moveGraboidTowardNoise(g);
            g.hunt = Math.min(3, g.hunt + 1);
          }
          break;
        case 3:
          this.tremors[loudNode] += 1;
          if (band === "disturbed") this.moveGraboidTowardNoise(this.graboids[0]);
          if (band === "frenzy") this.graboids.filter((g) => !g.surfaced).forEach((g) => this.moveGraboidTowardNoise(g));
          break;
        case 4:
          if (band === "frenzy") {
            this.aggression += 1;
            this.tremors.ranch += 1;
            this.noiseLimit = Math.max(4, DATA.startingNoiseLimit - this.aggression);
          }
          if (band === "disturbed") this.quietMoves = Math.max(0, this.quietMoves - 1);
          break;
        case 5:
          if (band === "disturbed") this.desperation += 1;
          if (band === "frenzy") this.unsafe.add("edgar");
          else this.note("Clue: Graboids cannot climb. Towers are grab-safe.");
          break;
        case 6:
          this.tremors[loudNode] += 1;
          if (band === "disturbed") nearestG().hunt = Math.min(3, nearestG().hunt + 2);
          if (band === "frenzy") this.surface(nearestG());
          break;
        case 7:
          if (band === "disturbed") this.note(`${this.graboids[0].id} Hunt is ${this.graboids[0].hunt}.`);
          if (band === "frenzy") this.adaptiveNoise = true;
          break;
        case 8: {
          const occupiedB = this.characters.map((c) => c.location).find((id) => nodeById(id).type === "building");
          if (occupiedB && band === "disturbed") this.compromised.add(occupiedB);
          if (occupiedB && band === "frenzy") {
            this.unsafe.add(occupiedB);
            this.note(`${nodeById(occupiedB).name} is Unsafe. Get out.`);
          }
          break;
        }
        case 9:
          this.poweredOff.add("store");
          if (band !== "quiet") {
            this.poweredOff.add("fuel");
            this.poweredOff.add("radio");
          }
          if (band === "frenzy") this.darkness = true;
          break;
        case 10:
          this.fridgeNoise = band === "quiet" ? 1 : 2;
          if (band === "frenzy") {
            const g = this.graboids.find((x) => x.sector === "B") || this.graboids[0];
            g.sector = "B";
            g.hunt = Math.min(3, g.hunt + 1);
          }
          break;
        case 11:
          this.mindy.present = true;
          this.mindy.location = band === "quiet" ? "nancy" : "school";
          this.mindy.exposed = band === "frenzy";
          if (band === "frenzy") {
            const g = nearestG();
            g.sector = "B";
            this.raiseHunt(g);
          }
          break;
        case 12:
          if (this.mindy.present && band !== "quiet") {
            this.addNoise(this.mindy.location, band === "frenzy" ? 4 : 2, "pogo stick");
            if (band === "frenzy") {
              const g = nearestG();
              g.sector = sectorOf(this.mindy.location);
              this.moveGraboidTowardNoise(g);
            }
          }
          break;
        case 13:
          this.barbed = band === "quiet" ? 0 : band === "disturbed" ? 1 : 2;
          break;
        case 14:
          if (band === "disturbed") this.storeHighValue = true;
          if (band === "frenzy") {
            this.unsafe.add("store");
            this.characters.filter((c) => c.location === "store").forEach((c) => {
              c.threatened = true;
            });
          }
          break;
        case 15: {
          const radio = this.objectives.find((o) => o.id === "radio_working");
          if (radio && radio.status === "active") {
            if (band === "disturbed") radio.work += 1;
            if (band === "frenzy") this.failObjective(radio, "No signal.");
          }
          break;
        }
        case 16:
          this.giveBurt("rifle");
          if (band === "disturbed") this.addNoise("burt", 2, "arsenal");
          if (band === "frenzy") {
            this.giveBurt("explosives");
            const g = this.graboids.find((x) => x.sector === "C") || this.graboids[0];
            g.sector = "C";
            this.raiseHunt(g);
          }
          break;
        case 17:
          if (band === "disturbed") this.tumbler = true;
          if (band === "frenzy") {
            const g = this.graboids.find((x) => x.sector === "C") || this.graboids[0];
            g.sector = "C";
            g.hunt = Math.min(3, g.hunt + 1);
          }
          break;
        case 18: {
          const occ = {};
          this.characters.forEach((c) => {
            occ[c.location] = (occ[c.location] || 0) + 1;
          });
          const top = Object.entries(occ).sort((a, b) => b[1] - a[1])[0];
          if (top && band === "disturbed") this.characters.filter((c) => c.location === top[0]).forEach((c) => (c.threatened = true));
          if (top && band === "frenzy") {
            const g = this.graboids.find((x) => x.sector === sectorOf(top[0])) || this.graboids[0];
            g.sector = sectorOf(top[0]);
            this.surface(g);
          }
          break;
        }
        case 19:
          if (band === "disturbed") this.compromised.add("trailer");
          if (band === "frenzy") {
            this.unsafe.add("trailer");
            this.characters.filter((c) => c.location === "trailer").forEach((c) => {
              c.exposed = true;
              c.shaken = true;
            });
          }
          break;
        case 20:
          if (band === "frenzy") {
            this.compromised.add("water");
            const g = this.graboids.find((x) => x.sector === "C") || this.graboids[0];
            g.hunt = Math.min(3, g.hunt + 1);
          }
          break;
        case 21:
          this.distractions += 1;
          if (band !== "quiet") this.tremors[loudNode] += 1;
          if (band === "frenzy") {
            this.moveGraboidTowardNoise(this.graboids[0]);
            if (this.graboids[1]) this.graboids[1].hunt = Math.min(3, this.graboids[1].hunt + 1);
          }
          break;
        case 22:
          if (band === "quiet") {
            const loud = loudNode;
            this.locationNoise[loud] = Math.max(0, this.locationNoise[loud] - 1);
          }
          if (band === "disturbed") {
            this.characters.forEach((c) => {
              c.mustHideOrLose = true;
            });
          }
          if (band === "frenzy") {
            const g = this.graboids.filter((x) => !x.surfaced).sort((a, b) => b.hunt - a.hunt)[0];
            if (g) g.hunt = Math.min(3, g.hunt + 2);
          }
          break;
        case 23:
          this.blockRoute("school", "trailer");
          if (band !== "quiet") this.blockRoute("workshop", "highway");
          if (band === "frenzy") {
            const g = this.graboids.find((x) => x.sector === "E") || this.graboids[0];
            g.sector = "E";
            g.hunt = Math.min(3, g.hunt + 1);
          }
          break;
        case 24:
          if (band === "disturbed") {
            this.desperation += 1;
            const r = this.characters[Math.floor(this.rng() * this.characters.length)];
            r.shaken = true;
          }
          if (band === "frenzy") {
            this.characters.filter((c) => nodeById(c.location).type === "open").forEach((c) => this.addNoise(c.location, 1, "panic"));
            this.moveGraboidTowardNoise(nearestG());
          }
          break;
        case 25:
          this.giveBurt("explosives");
          if (band === "disturbed") this.addNoise("burt", 2, "bombs");
          if (band === "frenzy") {
            this.noiseThisRound += 10;
            this.graboidPhase();
          }
          break;
        case 26:
          if (band === "quiet") this.char("burt").preparedReady = true;
          if (band === "disturbed") {
            const g = this.graboids.find((x) => x.surfaced);
            if (g) g.wounds += 1;
            else this.graboids[0].hunt = Math.max(0, this.graboids[0].hunt - 1);
          }
          if (band === "frenzy") {
            const burt = this.char("burt");
            const g = this.graboids.find((x) => x.surfaced && x.node === burt.location);
            if (g) {
              this.addNoise(burt.location, 3, "wrong place");
              this.killGraboid(g);
            }
          }
          break;
        case 27:
          if (band !== "frenzy") {
            const next = this.peekCalamity();
            if (next) this.note(`They're testing us. Next calamity would be: ${next.title}.`);
          } else {
            this.surface(nearestG());
          }
          break;
        case 28:
          if (band === "quiet") this.fuel += 1;
          if (band === "disturbed") {
            const v = this.objectives.find((o) => o.id === "heavy_vehicle" && o.status === "active");
            if (v) v.work += 1;
          }
          if (band === "frenzy") this.loaderDamaged = true;
          break;
        case 29:
          this.blockRoute("highway", "aqueduct");
          if (band !== "quiet") this.blockRoute("highway", "caterpillar");
          if (band === "frenzy") this.urgentEssentials = true;
          break;
        case 30:
          if (band === "quiet") this.note("One round remains.");
          if (band === "disturbed") {
            this.objectives.filter((o) => o.kind === "optional" && o.status === "active").forEach((o) => {
              o.status = "abandoned";
            });
          }
          if (band === "frenzy") {
            this.objectives.filter((o) => o.kind === "essential" && o.status === "active").forEach((o) => this.failObjective(o, "Perfection falls."));
            this.checkWin(true);
          }
          break;
        default:
          break;
      }
    }

    decayNoise() {
      for (const id of Object.keys(this.locationNoise)) {
        this.locationNoise[id] = Math.max(0, this.locationNoise[id] - 1);
      }
    }

    tickCritical() {
      for (const c of this.characters) {
        if (c.health === "critical") {
          c.criticalTimer -= 1;
          if (c.criticalTimer <= 0) this.die(c, "Bleed-out. Nobody got to them in time.");
        }
      }
    }

    failUnfinishedIfForced() {
      if (!this.urgentEssentials) return;
      this.objectives.filter((o) => o.kind === "essential" && o.status === "active").forEach((o) => {
        this.failObjective(o, "Urgent: you ran out of time.");
      });
    }

    endRound() {
      if (this.gameOver) return;
      this.note(`— End of round ${this.round} —`);
      if (this.fridgeNoise) {
        this.addNoise("store", this.fridgeNoise, "refrigerator");
        this.fridgeNoise = 0;
      }
      if (this.tumbler) this.addNoise("burt", 1, "tumbler");
      if (this.mindy.present && this.mindy.exposed) this.addNoise(this.mindy.location, 1, "Mindy");

      this.graboidPhase();
      if (this.gameOver) return;

      if (DATA.calamityRounds.includes(this.round)) this.drawCalamity();
      if (this.gameOver) return;

      this.tickCritical();
      if (this.gameOver) return;

      if (this.desperationTick && this.round % 2 === 0) this.desperation += 1;
      this.failUnfinishedIfForced();
      this.urgentEssentials = false;
      this.decayNoise();
      this.noiseThisRound = 0;
      this.characters.forEach((c) => {
        c.knowsWhenUsed = false;
      });
      this.earlFreeMoveReady = false;

      if (this.round >= DATA.maxRound) {
        this.checkWin(true);
        return;
      }
      this.round += 1;
      this.turnIndex = 0;
      this.refreshTurn();
      this.note(`— Round ${this.round}. ${this.def(this.activeId()).name}'s turn —`);
      this.checkWin();
    }

    checkWin(forcedEnd) {
      if (this.gameOver) return;
      if (this.characters.some((c) => c.health === "dead")) {
        this.gameOver = "loss";
        return;
      }
      const essentials = this.objectives.filter((o) => o.kind === "essential");
      const allPassed = essentials.every((o) => o.status === "passed");
      const anyFailed = essentials.some((o) => o.status === "failed");
      if (allPassed && (forcedEnd || this.round >= DATA.maxRound || this.desperation >= 5)) {
        this.gameOver = "win";
        this.winReason = "Everyone is alive and the essential work is done. The valley is waiting.";
        this.note(`<b>YOU ESCAPE PERFECTION.</b> ${this.winReason}`);
        this.emit();
        return;
      }
      if (allPassed && this.assemblyPoint && this.loaderReady && this.round >= 8) {
        this.gameOver = "win";
        this.winReason = "Loader ready, people gathered, essentials done. You roll out before the town finishes dying.";
        this.note(`<b>EARLY ESCAPE.</b> ${this.winReason}`);
        this.emit();
        return;
      }
      if (forcedEnd) {
        if (anyFailed || !allPassed) {
          this.gameOver = "loss";
          this.winReason = "Perfection falls with essential work unfinished. There is no valley left to run to.";
          this.note(`<b>GAME OVER.</b> ${this.winReason}`);
        } else {
          this.gameOver = "win";
          this.winReason = "You made it out.";
          this.note(`<b>YOU ESCAPE PERFECTION.</b>`);
        }
        this.emit();
      }
    }
  }

  return { Game, DATA, mulberry32, noiseBand, neighbors, shortestPath, nodeById };
})();

if (typeof module !== "undefined") {
  module.exports = TremorsEngine;
}
