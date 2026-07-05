/* ============================================================
   bazi.js — interactive modules for the BaZi sub-hub.
   Reads window.BAZI (inlined per page by build/generate-bazi.mjs,
   the same pattern as window.PNAV). Vanilla JS, no dependencies,
   no localStorage, keyboard-accessible, reduced-motion aware.

   Modules (each mounts into an element with a data-bz attribute):
     data-bz="hidden"   Hidden-Stem Explorer  (elements inside the element)
     data-bz="stems"    The Ten Heavenly Stems reference
     data-bz="branches" The Twelve Earthly Branches reference
     data-bz="tengods"  Ten Gods Finder (pick Day Master + another element)
     data-bz="pairing"  You & Them two-chart pairing (shareable)
   ============================================================ */
(function () {
  "use strict";
  var B = window.BAZI;
  if (!B) return;

  var PHASES = ["Wood", "Fire", "Earth", "Metal", "Water"];
  var COLOR = B.phaseColors || {};
  var stemByChar = {}, branchByChar = {}, branchByAnimal = {};
  (B.stems || []).forEach(function (s) { stemByChar[s.char] = s; });
  (B.branches || []).forEach(function (b) { branchByChar[b.char] = b; branchByAnimal[b.animal] = b; });

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""); }
  function phaseStyle(phase) {
    var c = COLOR[phase] || "#d6a44c";
    return 'style="--bz-c:' + c + '"';
  }
  function elPill(phase, label, link) {
    var inner = '<span class="bz-dot" style="background:' + (COLOR[phase] || "#d6a44c") + '"></span>' + label;
    if (link) return '<a class="bz-el" href="' + link + '">' + inner + '</a>';
    return '<span class="bz-el">' + inner + '</span>';
  }

  /* ---------- 1. Hidden-Stem Explorer ---------- */
  function mountHidden(root) {
    var lead = el("p", "bz-lead", "Tap an animal. Its Earthly Branch opens to show the elements hidden inside it, the phases that make up your animal underneath its surface.");
    root.appendChild(lead);
    var grid = el("div", "bz-grid bz-grid-anim");
    var panel = el("div", "bz-panel");
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = '<p class="bz-hint">Pick an animal above to open it.</p>';

    (B.branches || []).forEach(function (b) {
      var btn = el("button", "bz-chip", '<span class="bz-glyph" ' + phaseStyle(b.phase) + '>' + b.char + "</span><span class='bz-chip-t'>" + b.animal + "</span>");
      btn.type = "button";
      btn.setAttribute("aria-label", b.animal + ", branch " + b.char);
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(grid.querySelectorAll(".bz-chip"), function (c) { c.classList.remove("is-on"); });
        btn.classList.add("is-on");
        renderBranch(panel, b);
      });
      grid.appendChild(btn);
    });
    root.appendChild(grid);
    root.appendChild(panel);
  }
  function renderBranch(panel, b) {
    var roleName = { primary: "Primary (本气)", middle: "Middle (中气)", residual: "Residual (余气)" };
    var pills = b.hidden.map(function (h) {
      return '<div class="bz-hidrow"><span class="bz-role">' + (roleName[h.role] || h.role) + "</span>" +
        elPill(h.phase, h.stem + " " + h.phase, "/elements/phases/" + slug(h.phase) + "/") + "</div>";
    }).join("");
    var count = b.hidden.length;
    var wow = count === 1
      ? "This is a cardinal branch: it holds a single element in near-pure form."
      : "So the " + b.animal + " is not one element. On the surface it is " + b.phase +
        ", but it carries " + count + " elements inside.";
    panel.innerHTML =
      '<div class="bz-panel-head"><span class="bz-glyph bz-glyph-lg" ' + phaseStyle(b.phase) + '>' + b.char + "</span>" +
      "<div><h3>" + b.animal + " " + b.char + ' <span class="bz-pin">' + b.pinyin + "</span></h3>" +
      '<p class="bz-sub">' + cap(b.phase) + " on the surface · " + b.season + " · " + b.type + " branch</p></div></div>" +
      '<p class="bz-wow">' + wow + "</p>" +
      '<div class="bz-hidwrap">' + pills + "</div>" +
      '<div class="bz-actions"><a class="bz-pill" href="/chinese-zodiac/' + slug(b.animal) + '/">Meet the ' + b.animal + "</a>" +
      '<a class="bz-pill" href="/elements/phases/' + slug(b.phase) + '/">' + b.phase + " phase</a></div>";
  }

  /* ---------- 2. Stems reference ---------- */
  function mountStems(root) {
    var lead = el("p", "bz-lead", "The five phases, each in a bold yang temper and a quiet yin one. When one of these is the stem of your day pillar, it becomes your Day Master, the character that stands for you.");
    root.appendChild(lead);
    var grid = el("div", "bz-grid bz-grid-stem");
    var panel = el("div", "bz-panel");
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = '<p class="bz-hint">Pick a stem to read its temperament.</p>';
    (B.stems || []).forEach(function (s) {
      var btn = el("button", "bz-chip", '<span class="bz-glyph" ' + phaseStyle(s.phase) + '>' + s.char + "</span><span class='bz-chip-t'>" + s.polarity + " " + s.phase + "</span>");
      btn.type = "button";
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(grid.querySelectorAll(".bz-chip"), function (c) { c.classList.remove("is-on"); });
        btn.classList.add("is-on");
        panel.innerHTML =
          '<div class="bz-panel-head"><span class="bz-glyph bz-glyph-lg" ' + phaseStyle(s.phase) + '>' + s.char + "</span>" +
          "<div><h3>" + s.char + ' <span class="bz-pin">' + s.pinyin + "</span></h3>" +
          '<p class="bz-sub">' + cap(s.polarity) + " " + s.phase + "</p></div></div>" +
          "<p class=\"bz-wow\">Its picture is " + s.imagery + ".</p>" +
          '<div class="bz-chipline">' + s.keywords.map(function (k) { return '<span class="bz-tag">' + k + "</span>"; }).join("") + "</div>" +
          '<div class="bz-actions"><a class="bz-pill" href="/elements/phases/' + slug(s.phase) + '/">' + s.phase + " phase</a></div>";
      });
      grid.appendChild(btn);
    });
    root.appendChild(grid);
    root.appendChild(panel);
  }

  /* ---------- 3. Branches reference ---------- */
  function mountBranches(root) {
    var lead = el("p", "bz-lead", "The twelve branches carry the zodiac animals, the four seasons, and the twelve double-hours. Tap any one for its element, season, and the hours it rules.");
    root.appendChild(lead);
    var grid = el("div", "bz-grid bz-grid-anim");
    var panel = el("div", "bz-panel");
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = '<p class="bz-hint">Pick a branch to see its details.</p>';
    (B.branches || []).forEach(function (b) {
      var btn = el("button", "bz-chip", '<span class="bz-glyph" ' + phaseStyle(b.phase) + '>' + b.char + "</span><span class='bz-chip-t'>" + b.animal + "</span>");
      btn.type = "button";
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(grid.querySelectorAll(".bz-chip"), function (c) { c.classList.remove("is-on"); });
        btn.classList.add("is-on");
        panel.innerHTML =
          '<div class="bz-panel-head"><span class="bz-glyph bz-glyph-lg" ' + phaseStyle(b.phase) + '>' + b.char + "</span>" +
          "<div><h3>" + b.animal + " " + b.char + ' <span class="bz-pin">' + b.pinyin + "</span></h3>" +
          '<p class="bz-sub">' + cap(b.polarity) + " " + b.phase + "</p></div></div>" +
          '<div class="bz-cellrow"><div class="bz-cell"><span class="bz-k">Season</span>' + b.season + "</div>" +
          '<div class="bz-cell"><span class="bz-k">Hours</span>' + b.hour + "</div>" +
          '<div class="bz-cell"><span class="bz-k">Type</span>' + b.type + " branch</div></div>" +
          '<div class="bz-actions"><a class="bz-pill" href="/chinese-zodiac/' + slug(b.animal) + '/">Meet the ' + b.animal + "</a>" +
          '<a class="bz-pill" href="/elements/phases/' + slug(b.phase) + '/">' + b.phase + " phase</a></div>";
      });
      grid.appendChild(btn);
    });
    root.appendChild(grid);
    root.appendChild(panel);
  }

  /* ---------- 4. Ten Gods Finder ---------- */
  function godFor(dayPhase, dayPol, otherPhase, otherPol) {
    var gen = B.generating || {}, ctl = B.controlling || {};
    var samePol = dayPol === otherPol;
    var group;
    if (dayPhase === otherPhase) group = "companion";
    else if (gen[otherPhase] === dayPhase) group = "resource";
    else if (gen[dayPhase] === otherPhase) group = "output";
    else if (ctl[dayPhase] === otherPhase) group = "wealth";
    else if (ctl[otherPhase] === dayPhase) group = "power";
    var key;
    if (group === "resource") key = samePol ? "pian-yin" : "zheng-yin";
    else if (group === "output") key = samePol ? "shi-shen" : "shang-guan";
    else if (group === "wealth") key = samePol ? "pian-cai" : "zheng-cai";
    else if (group === "power") key = samePol ? "qi-sha" : "zheng-guan";
    else if (group === "companion") key = samePol ? "bi-jian" : "jie-cai";
    return (B.tenGods || []).filter(function (g) { return g.key === key; })[0];
  }
  function mountTenGods(root) {
    root.appendChild(el("p", "bz-lead", "The Ten Gods are relationships. Pick your Day Master, then pick another element in a chart, and see which of the ten roles it plays."));
    var form = el("div", "bz-finder");
    form.appendChild(selectorBlock("Your Day Master", "dm"));
    form.appendChild(selectorBlock("Another element", "ot"));
    root.appendChild(form);
    var out = el("div", "bz-panel");
    out.setAttribute("aria-live", "polite");
    out.innerHTML = '<p class="bz-hint">Choose both to reveal the god.</p>';
    root.appendChild(out);

    function selectorBlock(label, k) {
      var wrap = el("div", "bz-selblock");
      wrap.innerHTML = '<span class="bz-sellabel">' + label + "</span>";
      var ph = el("select", "bz-select");
      ph.setAttribute("data-role", k + "-phase");
      ph.setAttribute("aria-label", label + " phase");
      ph.innerHTML = '<option value="">Element…</option>' + PHASES.map(function (p) { return '<option value="' + p + '">' + p + "</option>"; }).join("");
      var pol = el("select", "bz-select");
      pol.setAttribute("data-role", k + "-pol");
      pol.setAttribute("aria-label", label + " polarity");
      pol.innerHTML = '<option value="yang">yang</option><option value="yin">yin</option>';
      ph.addEventListener("change", compute);
      pol.addEventListener("change", compute);
      wrap.appendChild(ph); wrap.appendChild(pol);
      return wrap;
    }
    function val(sel) { var n = form.querySelector('[data-role="' + sel + '"]'); return n ? n.value : ""; }
    function compute() {
      var dp = val("dm-phase"), dpo = val("dm-pol"), op = val("ot-phase"), opo = val("ot-pol");
      if (!dp || !op) { out.innerHTML = '<p class="bz-hint">Choose both to reveal the god.</p>'; return; }
      var g = godFor(dp, dpo, op, opo);
      if (!g) { out.innerHTML = '<p class="bz-hint">Pick two elements.</p>'; return; }
      out.innerHTML =
        '<div class="bz-panel-head"><span class="bz-glyph bz-glyph-lg" ' + phaseStyle(op) + '>' + g.char + "</span>" +
        "<div><h3>" + g.en + " · " + g.archetype + '<br><span class="bz-pin">' + g.char + " " + g.pinyin + "</span></h3></div></div>" +
        "<p class=\"bz-wow\">To a " + dpo + " " + dp + " Day Master, " + opo + " " + op + " " + g.relation + ", so it reads as <b>" + g.en + "</b>.</p>" +
        "<p class=\"bz-sub\">Governs " + g.governs + ".</p>" +
        '<p class="bz-note-inline">Shadow side when it runs strong: ' + g.shadow + '. A single god is never read alone; the whole chart shapes it.</p>' +
        '<div class="bz-actions"><a class="bz-pill" href="/bazi/ten-gods/">All ten gods</a></div>';
    }
  }

  /* ---------- 5. You & Them pairing ---------- */
  function stemRelation(a, b) {
    var combos = (B.interactions && B.interactions.stemCombos) || [];
    for (var i = 0; i < combos.length; i++) {
      if ((combos[i].a === a.char && combos[i].b === b.char) || (combos[i].a === b.char && combos[i].b === a.char))
        return { kind: "combine", text: "Your day stems form the " + combos[i].name + " combination. This is the most harmonious pairing: natural attraction, easy communication, quick to make up." };
    }
    var gen = B.generating || {}, ctl = B.controlling || {};
    if (a.phase === b.phase) return { kind: "same", text: "You share the same element. Familiar and easy in many ways; the work is to keep two of one kind from competing." };
    if (gen[a.phase] === b.phase || gen[b.phase] === a.phase) return { kind: "generate", text: "One of you generates the other's element. A nourishing, supportive current runs between you." };
    if (ctl[a.phase] === b.phase || ctl[b.phase] === a.phase) return { kind: "control", text: "One element controls the other. Real chemistry with real edges; handle it with awareness and it sharpens you both." };
    return { kind: "neutral", text: "Your elements neither feed nor check each other directly. A steady, low-friction baseline to build on." };
  }
  function animalRelation(a, b) {
    var six = B.sixHarmonyAnimals || [];
    for (var i = 0; i < six.length; i++) if (pairEq(six[i], a, b)) return { kind: "harmony", text: a + " and " + b + " are a six-harmony pair, an easy, quiet rapport." };
    var tri = (B.interactions && B.interactions.threeHarmonies) || [];
    for (var j = 0; j < tri.length; j++) if (tri[j].animals.indexOf(a) > -1 && tri[j].animals.indexOf(b) > -1) return { kind: "trine", text: a + " and " + b + " belong to the same " + tri[j].to + " trine, natural allies." };
    var cl = (B.interactions && B.interactions.sixClashes) || [];
    var ba = branchByAnimal[a], bb = branchByAnimal[b];
    if (ba && bb) for (var k = 0; k < cl.length; k++) if ((cl[k].a === ba.char && cl[k].b === bb.char) || (cl[k].a === bb.char && cl[k].b === ba.char)) return { kind: "clash", text: a + " and " + b + " sit opposite as a six-clash: strong attraction and real friction at once." };
    var hm = (B.interactions && B.interactions.sixHarms) || [];
    if (ba && bb) for (var m = 0; m < hm.length; m++) if (pairEqChar(hm[m], ba.char, bb.char)) return { kind: "harm", text: a + " and " + b + " form a harm pair, a quieter friction worth naming early." };
    return { kind: "neutral", text: a + " and " + b + " carry no strong harmony or clash, an open, unforced baseline." };
  }
  function pairEq(pair, a, b) { return (pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a); }
  function pairEqChar(pair, a, b) { return (pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a); }

  function mountPairing(root) {
    root.appendChild(el("p", "bz-lead", "Two people, side by side. Pick each person's animal (and day stem if you know it) and see where you complement and where you rub. A lens, never a verdict."));
    var form = el("div", "bz-finder bz-finder-2");
    form.appendChild(personBlock("You", "p1"));
    form.appendChild(personBlock("Them", "p2"));
    root.appendChild(form);
    var out = el("div", "bz-panel");
    out.setAttribute("aria-live", "polite");
    out.innerHTML = '<p class="bz-hint">Pick both animals to read the pairing.</p>';
    root.appendChild(out);
    var btnRow = el("div", "bz-actions");
    var shareBtn = el("button", "bz-pill bz-share", "Copy result to share");
    shareBtn.type = "button"; shareBtn.style.display = "none";
    btnRow.appendChild(shareBtn);
    root.appendChild(btnRow);
    var lastText = "";

    function personBlock(label, k) {
      var wrap = el("div", "bz-selblock");
      wrap.innerHTML = '<span class="bz-sellabel">' + label + "</span>";
      var an = el("select", "bz-select");
      an.setAttribute("data-role", k + "-animal");
      an.setAttribute("aria-label", label + " animal");
      an.innerHTML = '<option value="">Animal…</option>' + (B.branches || []).map(function (b) { return '<option value="' + b.animal + '">' + b.animal + "</option>"; }).join("");
      var st = el("select", "bz-select");
      st.setAttribute("data-role", k + "-stem");
      st.setAttribute("aria-label", label + " day stem (optional)");
      st.innerHTML = '<option value="">Day stem (optional)…</option>' + (B.stems || []).map(function (s) { return '<option value="' + s.char + '">' + s.char + " · " + s.polarity + " " + s.phase + "</option>"; }).join("");
      an.addEventListener("change", compute);
      st.addEventListener("change", compute);
      wrap.appendChild(an); wrap.appendChild(st);
      return wrap;
    }
    function val(r) { var n = form.querySelector('[data-role="' + r + '"]'); return n ? n.value : ""; }
    function compute() {
      var a1 = val("p1-animal"), a2 = val("p2-animal"), s1 = val("p1-stem"), s2 = val("p2-stem");
      if (!a1 || !a2) { out.innerHTML = '<p class="bz-hint">Pick both animals to read the pairing.</p>'; shareBtn.style.display = "none"; return; }
      var ar = animalRelation(a1, a2);
      var blocks = '<div class="bz-pairhead"><span>' + a1 + '</span><span class="bz-amp">&amp;</span><span>' + a2 + "</span></div>";
      blocks += '<div class="bz-layer"><span class="bz-k">The animals</span><p>' + ar.text + "</p></div>";
      var shareLine = a1 + " & " + a2 + ": " + ar.text;
      if (s1 && s2) {
        var sr = stemRelation(stemByChar[s1], stemByChar[s2]);
        blocks += '<div class="bz-layer"><span class="bz-k">The two Day Masters</span><p>' + sr.text + "</p></div>";
        shareLine += " | Day Masters " + s1 + "/" + s2 + ": " + sr.text;
      } else {
        blocks += '<div class="bz-layer bz-layer-soft"><span class="bz-k">The two Day Masters</span><p>Add both day stems above for the deeper read. In a full reading this layer, and the useful-god complement, matter more than the animals.</p></div>';
      }
      blocks += '<p class="bz-note-inline">' + ((B.compatibility && B.compatibility.integrity) || "A lens on a relationship, never a verdict.") + "</p>";
      blocks += '<div class="bz-actions"><a class="bz-pill" href="/bazi/compatibility/">How pairing works</a>' +
        '<a class="bz-pill" href="/chinese-zodiac/' + slug(a1) + '/">' + a1 + "</a>" +
        '<a class="bz-pill" href="/chinese-zodiac/' + slug(a2) + '/">' + a2 + "</a></div>";
      out.innerHTML = blocks;
      lastText = shareLine + " — read yours at zodianimal.com/bazi/compatibility/";
      shareBtn.style.display = "";
    }
    shareBtn.addEventListener("click", function () {
      if (!lastText) return;
      if (navigator.share) { navigator.share({ text: lastText }).catch(function () {}); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(lastText).then(function () {
          shareBtn.textContent = "Copied";
          setTimeout(function () { shareBtn.textContent = "Copy result to share"; }, 1800);
        }).catch(function () {});
      }
    });
  }

  /* ---------- 6. Worked example chart diagram ---------- */
  function mountChart(root) {
    var E = B.example; if (!E) return;
    root.appendChild(el("p", "bz-chart-title", E.title));
    root.appendChild(el("p", "bz-chart-note", "<b>" + E.label + "</b> " + E.note));
    var grid = el("div", "bz-chart");
    var panel = el("div", "bz-panel");
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = '<p class="bz-hint">Tap any character in the chart to read what it means and where it leads.</p>';

    E.pillars.forEach(function (p) {
      var col = el("div", "bz-pcol" + (p.isSelf ? " is-self" : ""));
      col.appendChild(el("div", "bz-pcap", p.label + (p.isSelf ? ' <span class="bz-selfmark">the self</span>' : "")));
      col.appendChild(cellBtn(p.stem, p, "stem"));
      col.appendChild(cellBtn(p.branch, p, "branch"));
      grid.appendChild(col);
    });
    root.appendChild(grid);
    root.appendChild(panel);

    var read = el("div", "bz-readout");
    read.innerHTML =
      '<div class="bz-portrait"><span class="bz-k">The whole picture</span><p>' + E.portrait + "</p></div>" +
      '<div class="bz-two-soft"><div class="bz-rcard"><span class="bz-k">Strength</span><p>' + E.strength + '</p><a class="bz-pill" href="/bazi/day-master/">Day Master &amp; strength</a></div>' +
      '<div class="bz-rcard"><span class="bz-k">What it leans on</span><p>' + E.favourable + '</p><a class="bz-pill" href="/bazi/day-master/">The useful god</a></div></div>' +
      '<p class="bz-note-inline">' + E.share + "</p>";
    root.appendChild(read);

    function cellBtn(node, p, kind) {
      var isSelf = kind === "stem" && p.isSelf;
      var btn = el("button", "bz-pcell" + (isSelf ? " is-self" : ""));
      btn.type = "button";
      var god = node.god ? '<span class="bz-god">' + node.god + "</span>" : "";
      var hidden = "";
      if (kind === "branch" && node.hidden) {
        hidden = '<span class="bz-hidmini">' + node.hidden.map(function (h) { return '<i style="background:' + (COLOR[h.phase] || "#d6a44c") + '"></i>'; }).join("") + "</span>";
      }
      var sub = kind === "stem" ? (node.arch || node.phase) : node.animal;
      btn.innerHTML = god + '<span class="bz-pglyph" ' + phaseStyle(node.phase) + ">" + node.char + '</span><span class="bz-pt">' + sub + "</span>" + hidden;
      btn.setAttribute("aria-label", node.char + " " + (kind === "stem" ? "" : node.animal));
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(grid.querySelectorAll(".bz-pcell"), function (c) { c.classList.remove("is-on"); });
        btn.classList.add("is-on");
        renderCell(node, p, kind);
      });
      return btn;
    }
    function renderCell(node, p, kind) {
      var roleName = { primary: "Primary", middle: "Middle", residual: "Residual" };
      var head = kind === "stem"
        ? node.char + " " + node.pinyin + " · " + (node.god === "日主" ? "the self, your Day Master" : node.godEn + " (" + node.god + "), " + node.arch)
        : node.char + " " + node.pinyin + " · " + node.animal + " (" + node.phase + ")";
      var hid = "";
      if (kind === "branch" && node.hidden) {
        hid = '<div class="bz-hidwrap">' + node.hidden.map(function (h) {
          return '<div class="bz-hidrow"><span class="bz-role">' + (roleName[h.role] || h.role) + "</span>" +
            elPill(h.phase, h.char + " " + h.phase, "/elements/phases/" + slug(h.phase) + "/") +
            '<span class="bz-godtag">' + h.god + "</span></div>";
        }).join("") + "</div><p class=\"bz-sub\">" + node.hiddenNote + "</p>";
      }
      var learn = kind === "stem"
        ? (node.god === "日主"
            ? '<a class="bz-pill" href="/bazi/day-master/">About the Day Master</a>'
            : '<a class="bz-pill" href="/bazi/ten-gods/">About the Ten Gods</a><a class="bz-pill" href="/bazi/heavenly-stems/">About the stems</a>')
        : '<a class="bz-pill" href="/bazi/earthly-branches/">About the branches</a><a class="bz-pill" href="/bazi/hidden-stems/">About hidden stems</a><a class="bz-pill" href="/chinese-zodiac/' + slug(node.animal) + '/">Meet the ' + node.animal + "</a>";
      panel.innerHTML =
        '<div class="bz-panel-head"><span class="bz-glyph bz-glyph-lg" ' + phaseStyle(node.phase) + ">" + node.char + "</span>" +
        "<div><h3>" + head + '</h3><p class="bz-sub">' + p.label + " pillar · " + p.sub + "</p></div></div>" +
        '<p class="bz-wow">' + node.meaning + "</p>" + hid +
        '<div class="bz-actions">' + learn + "</div>";
    }
  }

  function cap(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

  var MOUNTS = { hidden: mountHidden, stems: mountStems, branches: mountBranches, tengods: mountTenGods, pairing: mountPairing, chart: mountChart };
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-bz]"), function (root) {
      var kind = root.getAttribute("data-bz");
      if (MOUNTS[kind] && !root.getAttribute("data-bz-done")) {
        root.setAttribute("data-bz-done", "1");
        try { MOUNTS[kind](root); } catch (e) { /* fail quiet */ }
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
