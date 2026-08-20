(function () {
  const { Game, DATA } = TremorsEngine;
  const game = new Game({ seed: (Date.now() ^ 0x9e3779b9) >>> 0 }).setup();

  const svg = document.getElementById("map");
  const actionList = document.getElementById("actionList");
  const party = document.getElementById("party");
  const graboidsEl = document.getElementById("graboids");
  const supplyEl = document.getElementById("supply");
  const objectivesEl = document.getElementById("objectives");
  const logEl = document.getElementById("log");
  const turnTitle = document.getElementById("turnTitle");
  const turnStatus = document.getElementById("turnStatus");
  const mapHint = document.getElementById("mapHint");
  const modal = document.getElementById("modal");
  const modalCard = document.getElementById("modalCard");
  const help = document.getElementById("help");

  let pendingAction = null;

  document.getElementById("helpBtn").onclick = () => help.classList.remove("hidden");
  document.getElementById("helpClose").onclick = () => help.classList.add("hidden");
  help.addEventListener("click", (e) => {
    if (e.target === help) help.classList.add("hidden");
  });

  function sectorColor(s) {
    return { A: "#d9c08a", B: "#c9b07a", C: "#b89464", D: "#c4a878", E: "#a67c4e" }[s] || "#c4a06a";
  }

  function tokenColor(id) {
    return DATA.characters.find((c) => c.id === id).color;
  }

  function drawMap(state) {
    const blocked = new Set(state.blocked);
    const ns = "http://www.w3.org/2000/svg";
    svg.replaceChildren();

    const streets = document.createElementNS(ns, "g");
    for (const s of DATA.streets || []) {
      const road = document.createElementNS(ns, "line");
      road.setAttribute("x1", s.x1);
      road.setAttribute("y1", s.y1);
      road.setAttribute("x2", s.x2);
      road.setAttribute("y2", s.y2);
      road.setAttribute("stroke", "#c4a06a");
      road.setAttribute("stroke-width", "2.4");
      road.setAttribute("stroke-linecap", "round");
      road.setAttribute("opacity", "0.55");
      streets.appendChild(road);
      const label = document.createElementNS(ns, "text");
      if (s.id === "main") {
        label.setAttribute("x", s.x1 + 2.4);
        label.setAttribute("y", 24);
      } else {
        label.setAttribute("x", s.x2 - 1);
        label.setAttribute("y", s.y1 - 1.2);
        label.setAttribute("text-anchor", "end");
      }
      label.setAttribute("fill", "#6a4a28");
      label.setAttribute("font-size", "2.1");
      label.setAttribute("font-family", "Georgia, serif");
      label.textContent = s.name;
      streets.appendChild(label);
    }
    svg.appendChild(streets);

    const routes = document.createElementNS(ns, "g");
    for (const [a, b] of DATA.routes) {
      const na = DATA.nodes.find((n) => n.id === a);
      const nb = DATA.nodes.find((n) => n.id === b);
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", na.x);
      line.setAttribute("y1", na.y);
      line.setAttribute("x2", nb.x);
      line.setAttribute("y2", nb.y);
      const isBlocked = blocked.has(`${a}|${b}`) || blocked.has(`${b}|${a}`);
      line.setAttribute("stroke", isBlocked ? "#5a2018" : "#5a403088");
      line.setAttribute("stroke-width", isBlocked ? "0.7" : "0.45");
      line.setAttribute("stroke-dasharray", isBlocked ? "1 0.7" : "0");
      routes.appendChild(line);
    }
    svg.appendChild(routes);

    const targets = pendingAction && pendingAction.targets ? pendingAction.targets : [];

    for (const node of DATA.nodes) {
      const g = document.createElementNS(ns, "g");
      g.classList.add("node-hit");
      g.dataset.node = node.id;
      const noise = state.locationNoise[node.id] || 0;
      const r = 3.1 + Math.min(2.2, noise * 0.35);
      const circ = document.createElementNS(ns, "circle");
      circ.setAttribute("cx", node.x);
      circ.setAttribute("cy", node.y);
      circ.setAttribute("r", r);
      let fill = sectorColor(node.sector);
      if (state.unsafe.includes(node.id)) fill = "#c45a3a";
      if (state.compromised.includes(node.id)) fill = "#d4a017";
      if (state.inaccessible.includes(node.id)) fill = "#444";
      if (targets.includes(node.id)) fill = "#7ec8e3";
      circ.setAttribute("fill", fill);
      circ.setAttribute("stroke", targets.includes(node.id) ? "#0b3c5d" : "#1c140c");
      circ.setAttribute("stroke-width", targets.includes(node.id) ? "0.55" : "0.35");
      g.appendChild(circ);

      if (noise > 0) {
        const halo = document.createElementNS(ns, "circle");
        halo.setAttribute("cx", node.x);
        halo.setAttribute("cy", node.y);
        halo.setAttribute("r", r + 1.1);
        halo.setAttribute("fill", "none");
        halo.setAttribute("stroke", "#8b1c14");
        halo.setAttribute("stroke-width", "0.25");
        halo.setAttribute("opacity", String(Math.min(1, 0.3 + noise * 0.15)));
        g.insertBefore(halo, circ);
      }

      const label = document.createElementNS(ns, "text");
      label.setAttribute("x", node.x);
      label.setAttribute("y", node.y - r - 0.7);
      label.setAttribute("text-anchor", "middle");
      label.classList.add("node-label");
      label.textContent = node.name;
      g.appendChild(label);

      const sub = document.createElementNS(ns, "text");
      sub.setAttribute("x", node.x);
      sub.setAttribute("y", node.y + r + 1.6);
      sub.setAttribute("text-anchor", "middle");
      sub.classList.add("node-sub");
      const bits = [`${node.sector}`];
      if (noise) bits.push(`N${noise}`);
      if (state.tremors[node.id]) bits.push("tremor");
      sub.textContent = bits.join(" · ");
      g.appendChild(sub);

      const here = state.characters.filter((c) => c.location === node.id);
      here.forEach((c, i) => {
        const t = document.createElementNS(ns, "circle");
        const ang = (Math.PI * 2 * i) / Math.max(here.length, 1) - Math.PI / 2;
        t.setAttribute("cx", node.x + Math.cos(ang) * 1.5);
        t.setAttribute("cy", node.y + Math.sin(ang) * 1.5);
        t.setAttribute("r", "0.95");
        t.setAttribute("fill", tokenColor(c.id));
        t.setAttribute("stroke", "#fff8e8");
        t.setAttribute("stroke-width", "0.2");
        g.appendChild(t);
      });

      const worm = state.graboids.find((gr) => gr.surfaced && gr.node === node.id);
      if (worm) {
        const w = document.createElementNS(ns, "ellipse");
        w.setAttribute("cx", node.x);
        w.setAttribute("cy", node.y + 0.2);
        w.setAttribute("rx", "2.4");
        w.setAttribute("ry", "1.1");
        w.setAttribute("fill", "#4a1410");
        w.setAttribute("stroke", "#f0dcb4");
        w.setAttribute("stroke-width", "0.2");
        g.appendChild(w);
      }

      g.addEventListener("click", () => onNodeClick(node.id));
      svg.appendChild(g);
    }
  }

  function onNodeClick(nodeId) {
    if (!pendingAction) return;
    const act = pendingAction;
    pendingAction = null;
    mapHint.textContent = "Select an action, then click a highlighted node if a target is needed.";
    const res = game.act(game.activeId(), { ...act, target: nodeId });
    if (!res.ok) mapHint.textContent = res.error;
    render();
  }

  function healthBadge(c) {
    if (c.health === "dead") return "dead";
    if (c.grabbed) return "grabbed";
    if (c.threatened) return "threatened";
    if (c.health === "critical") return "critical";
    if (c.pinned) return "pinned";
    if (c.health === "injured") return "injured";
    if (c.shaken) return "shaken";
    return "healthy";
  }

  function renderMeters(state) {
    const track = document.getElementById("roundTrack");
    track.replaceChildren();
    for (let r = 1; r <= state.maxRound; r++) {
      const li = document.createElement("li");
      li.textContent = r;
      if (DATA.calamityRounds.includes(r)) {
        li.classList.add("warn");
        li.title = "Calamity";
        li.textContent = r === 12 ? "☠" : "⚠" + r;
      }
      if (r === state.round) li.classList.add("now");
      if (r < state.round) li.classList.add("done");
      track.appendChild(li);
    }

    const meter = document.getElementById("noiseMeter");
    meter.replaceChildren();
    for (let i = 0; i < 20; i++) {
      const s = document.createElement("span");
      if (i < state.noiseThisRound) {
        s.classList.add("on");
        s.classList.add(i < 9 ? "quiet" : i < 15 ? "disturbed" : "frenzy");
      }
      meter.appendChild(s);
    }
    document.getElementById("noiseCaption").textContent =
      `${state.noiseThisRound} — ${state.response.label}. Limit ${state.noiseLimit}. ${state.response.effect}`;
    document.getElementById("resRescue").textContent = state.rescueTokens;
    document.getElementById("resMed").textContent = state.medicalKits;
    document.getElementById("resQuiet").textContent = state.quietMoves;
    document.getElementById("resDist").textContent = state.distractions;
    document.getElementById("resFuel").textContent = state.fuel;
    document.getElementById("resStash").textContent = (state.stash || []).length;
    document.getElementById("resAgg").textContent = state.aggression;
  }

  function renderSupply(state) {
    supplyEl.replaceChildren();
    if (!(state.stash || []).length) {
      const empty = document.createElement("p");
      empty.className = "caption";
      empty.textContent = `Empty. ${state.itemDeckLeft || 0} cards left in the search deck.`;
      supplyEl.appendChild(empty);
      return;
    }
    const counts = {};
    for (const id of state.stash) counts[id] = (counts[id] || 0) + 1;
    for (const [id, n] of Object.entries(counts)) {
      const item = DATA.items.find((x) => x.id === id);
      const row = document.createElement("div");
      row.className = "supply-row";
      row.innerHTML = `<b>${n}× ${item ? item.name : id}</b><div>${item ? item.text : ""}</div>`;
      supplyEl.appendChild(row);
    }
    const rigs = DATA.rigs.filter((r) => {
      const need = {};
      for (const p of r.parts || []) need[p] = (need[p] || 0) + 1;
      return Object.entries(need).every(([id, n]) => (counts[id] || 0) >= n);
    });
    if (rigs.length) {
      const hint = document.createElement("p");
      hint.className = "caption";
      hint.textContent = "Ready to rig: " + rigs.map((r) => r.name).join(", ");
      supplyEl.appendChild(hint);
    }
    const deck = document.createElement("p");
    deck.className = "caption";
    deck.textContent = `${state.itemDeckLeft || 0} cards left in the search deck.`;
    supplyEl.appendChild(deck);
  }

  function renderParty(state) {
    party.replaceChildren();
    for (const c of state.characters) {
      const def = DATA.characters.find((d) => d.id === c.id);
      const card = document.createElement("div");
      card.className = "char-card" + (c.id === state.activeId ? " active" : "");
      card.style.setProperty("--color", def.color);
      const node = DATA.nodes.find((n) => n.id === c.location);
      card.innerHTML = `<b>${def.name}</b>
        <div>${def.role}</div>
        <div>${node.name} · ${c.actions} action(s) · M${def.movement} N${def.nerve} S${def.search} C${def.combat}</div>
        <div class="badges"></div>`;
      const badges = card.querySelector(".badges");
      const hb = document.createElement("span");
      hb.className = "badge" + (c.health !== "healthy" || c.grabbed || c.threatened ? " warn" : " ok");
      hb.textContent = healthBadge(c);
      badges.appendChild(hb);
      (c.equipment || []).forEach((id) => {
        const eq = DATA.equipment.find((e) => e.id === id);
        const b = document.createElement("span");
        b.className = "badge";
        b.textContent = eq ? eq.name : id;
        badges.appendChild(b);
      });
      party.appendChild(card);
    }
  }

  function renderGraboids(state) {
    graboidsEl.replaceChildren();
    for (const g of state.graboids) {
      const d = document.createElement("div");
      d.className = "graboid" + (g.surfaced ? " surfaced" : "");
      const loc = g.surfaced ? DATA.nodes.find((n) => n.id === g.node).name : `underground · sector ${g.sector}`;
      d.innerHTML = `<b>${g.surfaced ? "SURFACED MODEL" : g.id}</b><div>${loc}</div><div>Hunt ${g.hunt}/${DATA.huntSurface} · Wounds ${g.wounds}/2 · sector ${g.sector}</div>`;
      graboidsEl.appendChild(d);
    }
  }

  function renderObjectives(state) {
    objectivesEl.replaceChildren();
    for (const o of state.objectives) {
      const d = document.createElement("div");
      d.className = `obj ${o.kind} ${o.status}`;
      const loc = DATA.nodes.find((n) => n.id === o.location);
      d.innerHTML = `<div class="kind">${o.kind} · ${o.status} · ${o.progress}/${o.work}</div>
        <b>${o.name}</b>
        <div>${loc.name}</div>
        <div>${o.flavour}</div>`;
      objectivesEl.appendChild(d);
    }
  }

  function renderLog(state) {
    logEl.replaceChildren();
    for (const row of state.log) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="round-tag">R${row.round}</span>${row.text}`;
      logEl.appendChild(li);
    }
  }

  function renderActions(state) {
    actionList.replaceChildren();
    if (state.gameOver) {
      const banner = document.createElement("div");
      banner.className = "end-banner " + (state.gameOver === "win" ? "win" : "loss");
      banner.textContent = (state.gameOver === "win" ? "ESCAPE. " : "EVERYONE LOSES. ") + state.winReason;
      actionList.appendChild(banner);
      const again = document.createElement("button");
      again.className = "primary";
      again.textContent = "New game";
      again.onclick = () => {
        game.setup({ seed: (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0 });
        pendingAction = null;
        render();
      };
      actionList.appendChild(again);
      turnTitle.textContent = "Game over";
      turnStatus.textContent = "";
      return;
    }

    const active = DATA.characters.find((c) => c.id === state.activeId);
    const ch = state.characters.find((c) => c.id === state.activeId);
    turnTitle.textContent = `${active.name}'s turn`;
    turnStatus.textContent = `${ch.actions} action(s) left · ${ch.health}${ch.shaken ? " · shaken" : ""}`;

    const acts = game.legalActions(state.activeId);
    for (const a of acts) {
      const btn = document.createElement("button");
      btn.textContent = a.label;
      if (a.type === "evacuate") btn.className = "primary";
      if (a.type === "fight" || a.type === "struggle") btn.className = "danger";
      btn.onclick = () => runAction(a, state);
      actionList.appendChild(btn);
    }
  }

  function runAction(a, state) {
    const c = state.characters.find((x) => x.id === state.activeId);
    if (a.needsTarget === "node") {
      const reach = game.reachable(game.char(c.id), a.style);
      if (!reach.length) {
        mapHint.textContent = "No legal destinations for that move.";
        return;
      }
      pendingAction = { type: a.type, style: a.style, targets: reach };
      mapHint.textContent = "Click a highlighted node.";
      drawMap(game.getState());
      return;
    }
    if (a.needsTarget === "adjacent" || a.needsTarget === "here_or_adjacent") {
      const adj = TremorsEngine.neighbors(c.location, new Set(state.blocked));
      const targets = a.needsTarget === "here_or_adjacent" ? [c.location, ...adj] : adj;
      pendingAction = { type: a.type, item: a.item, rig: a.rig, targets };
      mapHint.textContent =
        a.needsTarget === "here_or_adjacent"
          ? "Click this node or an adjacent one."
          : "Click an adjacent node.";
      drawMap(game.getState());
      return;
    }
    const res = game.act(state.activeId, a);
    if (!res.ok) mapHint.textContent = res.error;
    render();
  }

  function renderModal(state) {
    const p = state.pendingChoice;
    if (!p) {
      modal.classList.add("hidden");
      return;
    }
    modal.classList.remove("hidden");
    if (p.type === "burtDraft") {
      modalCard.innerHTML = `<h2>Burt's Arsenal</h2><p>Draw 3, keep 2. The leftover stays in the dust.</p>`;
      const picked = new Set();
      const row = document.createElement("div");
      row.className = "choice-row";
      p.options.forEach((eq) => {
        const b = document.createElement("button");
        b.textContent = `${eq.name} — ${eq.text}`;
        b.onclick = () => {
          if (picked.has(eq.id)) picked.delete(eq.id);
          else if (picked.size < 2) picked.add(eq.id);
          b.classList.toggle("primary", picked.has(eq.id));
        };
        row.appendChild(b);
      });
      const go = document.createElement("button");
      go.className = "primary";
      go.textContent = "Take these two";
      go.onclick = () => {
        const res = game.act("burt", { type: "burtDraft", ids: [...picked] });
        if (!res.ok) mapHint.textContent = res.error;
        render();
      };
      modalCard.appendChild(row);
      modalCard.appendChild(go);
    } else if (p.type === "rhondaPeek") {
      modalCard.innerHTML = `<h2>Seismologist</h2><p>Next calamity: <b>${p.title}</b></p><p>${p.flavour}</p>`;
      const row = document.createElement("div");
      row.className = "choice-row";
      const keep = document.createElement("button");
      keep.textContent = "Leave it on top";
      keep.onclick = () => {
        game.act("rhonda", { type: "rhondaPeek", bury: false });
        render();
      };
      const bury = document.createElement("button");
      bury.className = "primary";
      bury.textContent = "Bury it";
      bury.onclick = () => {
        game.act("rhonda", { type: "rhondaPeek", bury: true });
        render();
      };
      row.appendChild(keep);
      row.appendChild(bury);
      modalCard.appendChild(row);
    } else if (p.type === "valRun") {
      modalCard.innerHTML = `<h2>Run!</h2><p>Click adjacent nodes on the map. ${p.remaining} hops left. Close this and use the highlighted board.</p>`;
      const adj = TremorsEngine.neighbors(game.char("val").location, new Set(state.blocked));
      pendingAction = { type: "valRun", targets: adj };
      const done = document.createElement("button");
      done.textContent = "I'm done running";
      done.onclick = () => {
        game.pendingChoice = null;
        pendingAction = null;
        render();
      };
      modalCard.appendChild(done);
    } else if (p.type === "earlExodus") {
      modalCard.innerHTML = `<h2>Let's get the hell out of here</h2><p>Each character at Earl's node may step to an adjacent location.</p>`;
      const from = p.from;
      const here = state.characters.filter((c) => c.location === from);
      const moves = {};
      here.forEach((c) => {
        const wrap = document.createElement("p");
        wrap.textContent = DATA.characters.find((d) => d.id === c.id).name + ": ";
        const sel = document.createElement("select");
        const stay = document.createElement("option");
        stay.value = "";
        stay.textContent = "Stay";
        sel.appendChild(stay);
        TremorsEngine.neighbors(from, new Set(state.blocked)).forEach((n) => {
          const opt = document.createElement("option");
          opt.value = n;
          opt.textContent = DATA.nodes.find((x) => x.id === n).name;
          sel.appendChild(opt);
        });
        sel.onchange = () => {
          moves[c.id] = sel.value;
        };
        wrap.appendChild(sel);
        modalCard.appendChild(wrap);
      });
      const go = document.createElement("button");
      go.className = "primary";
      go.textContent = "Move";
      go.onclick = () => {
        game.act("earl", { type: "earlExodus", moves });
        render();
      };
      modalCard.appendChild(go);
    }
  }

  function render() {
    const state = game.getState();
    if (state.pendingChoice && state.pendingChoice.type === "valRun") {
      pendingAction = {
        type: "valRun",
        targets: TremorsEngine.neighbors(game.char("val").location, new Set(state.blocked)),
      };
    }
    renderMeters(state);
    drawMap(state);
    renderParty(state);
    renderSupply(state);
    renderGraboids(state);
    renderObjectives(state);
    renderLog(state);
    renderActions(state);
    renderModal(state);
  }

  window.__tremors = game;
  render();
})();
