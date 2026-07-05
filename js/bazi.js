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

  /* ---- calendar engine (verified: 2000-01-01 = 己卯 year, 丙子 month, 戊午 day) ---- */
  var STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  var BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  function mod(n, m) { return ((n % m) + m) % m; }
  function jdn(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  // approximate solar-month boundaries (the 12 jie), ±1 day near a term
  function solarMonth(y, m, d) {
    var md = m * 100 + d;
    if (md < 204) return { branch: (md >= 106 ? 1 : 0), yr: y - 1 }; // Jan6+ = Ox, else Rat; belongs to prior BaZi year
    var B = [[2, 4, 2], [3, 6, 3], [4, 5, 4], [5, 6, 5], [6, 6, 6], [7, 7, 7], [8, 8, 8], [9, 8, 9], [10, 8, 10], [11, 7, 11], [12, 7, 0]];
    var branch = 2;
    for (var i = 0; i < B.length; i++) { if (md >= B[i][0] * 100 + B[i][1]) branch = B[i][2]; }
    return { branch: branch, yr: y };
  }
  // near a solar-term boundary? (within 1 day) -> flag provisional
  function nearBoundary(m, d) {
    var b = [[2, 4], [3, 6], [4, 5], [5, 6], [6, 6], [7, 7], [8, 8], [9, 8], [10, 8], [11, 7], [12, 7], [1, 6]];
    for (var i = 0; i < b.length; i++) { if (b[i][0] === m && Math.abs(b[i][1] - d) <= 1) return true; }
    return false;
  }
  // birthplace table: [name, longitude east+, standard UTC offset hours]
  var CITIES = [
    ["New York, USA", -74.0, -5], ["Los Angeles, USA", -118.2, -8], ["Chicago, USA", -87.6, -6],
    ["Toronto, Canada", -79.4, -5], ["Vancouver, Canada", -123.1, -8], ["Mexico City", -99.1, -6],
    ["São Paulo, Brazil", -46.6, -3], ["London, UK", -0.13, 0], ["Paris, France", 2.35, 1],
    ["Berlin, Germany", 13.4, 1], ["Madrid, Spain", -3.7, 1], ["Rome, Italy", 12.5, 1],
    ["Moscow, Russia", 37.6, 3], ["Cairo, Egypt", 31.2, 2], ["Lagos, Nigeria", 3.4, 1],
    ["Johannesburg", 28.0, 2], ["Dubai, UAE", 55.3, 4], ["Delhi, India", 77.2, 5.5],
    ["Bangkok, Thailand", 100.5, 7], ["Jakarta, Indonesia", 106.8, 7], ["Singapore", 103.8, 8],
    ["Kuala Lumpur", 101.7, 8], ["Beijing, China", 116.4, 8], ["Shanghai, China", 121.47, 8],
    ["Hong Kong", 114.17, 8], ["Taipei, Taiwan", 121.5, 8], ["Seoul, South Korea", 126.98, 9],
    ["Tokyo, Japan", 139.7, 9], ["Manila, Philippines", 121.0, 8], ["Sydney, Australia", 151.2, 10],
    ["Auckland, NZ", 174.76, 12]
  ];
  function dayOfYear(y, m, d) { return jdn(y, m, d) - jdn(y, 1, 1) + 1; }
  function solarOffsetMin(lon, utc, y, m, d) {
    var stdMer = utc * 15;
    var lonOff = (lon - stdMer) * 4;
    var N = dayOfYear(y, m, d);
    var Bd = 360 * (N - 81) / 364, Br = Bd * Math.PI / 180;
    var eot = 9.87 * Math.sin(2 * Br) - 7.53 * Math.cos(Br) - 1.5 * Math.sin(Br);
    return lonOff + eot;
  }
  function fmtHM(minOfDay) {
    var mm = Math.round(mod(minOfDay, 1440)); var h = Math.floor(mm / 60), q = mm % 60;
    var ap = h < 12 ? "am" : "pm", h12 = (h % 12) || 12;
    return h12 + ":" + (q < 10 ? "0" + q : q) + " " + ap;
  }
  function castChart(o) {
    var y = o.year, m = o.month, d = o.day;
    var sm = solarMonth(y, m, d);
    var yStem = mod(sm.yr - 4, 10), yBr = mod(sm.yr - 4, 12);
    var mBr = sm.branch;
    var mStem = mod((yStem % 5) * 2 + 2 + mod(mBr - 2, 12), 10);
    var dIdx = mod(jdn(y, m, d) - 2451545 + 54, 60);
    var dStem = dIdx % 10, dBr = dIdx % 12;
    var out = { dayStem: STEMS[dStem], dayStemIdx: dStem, notes: [] };
    out.pillars = [
      { label: "Year", sub: "ancestry, early life", stem: STEMS[yStem], branch: BRANCHES[yBr] },
      { label: "Month", sub: "upbringing, the season", stem: STEMS[mStem], branch: BRANCHES[mBr] },
      { label: "Day", sub: "the self and the partner", isSelf: true, stem: STEMS[dStem], branch: BRANCHES[dBr] }
    ];
    if (o.known) {
      var clockMin = o.hour * 60 + (o.minute || 0);
      var offset = 0, applied = false;
      if (o.lon != null && o.utc != null) { offset = solarOffsetMin(o.lon, o.utc, y, m, d); applied = true; }
      var solarMin = mod(clockMin + offset, 1440);
      var hBr = Math.floor(mod(solarMin / 60 + 1, 24) / 2);
      var clockBr = Math.floor(mod(o.hour + 1, 24) / 2);
      var hStem = mod(dStem * 2 + hBr, 10);
      out.pillars.push({ label: "Hour", sub: "later years, output, legacy", stem: STEMS[hStem], branch: BRANCHES[hBr] });
      var pos = mod(solarMin + 60, 120); var nearHr = Math.min(pos, 120 - pos) < 20;
      out.solar = { applied: applied, offset: offset, clock: fmtHM(clockMin), solar: fmtHM(solarMin),
        hourBranch: BRANCHES[hBr], crossed: hBr !== clockBr, near: nearHr };
      if (nearHr) out.notes.push("Your true solar time is close to an hour (时辰) boundary, so the hour pillar could go either way. If you can, confirm the exact minute.");
    }
    if (nearBoundary(m, d)) out.notes.push("Your birth date is within a day of a season boundary, so the month and year pillars may shift. Confirm with a professional almanac.");
    return out;
  }

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

  /* ---------- 7. Cast your own chart ---------- */
  /* ---- auto-reading engine (deterministic; spec: docs/bazi/example/09) ---- */
  var GROUP_OF_KEY = { "zheng-yin":"resource","pian-yin":"resource","shi-shen":"output","shang-guan":"output","zheng-cai":"wealth","pian-cai":"wealth","zheng-guan":"power","qi-sha":"power","bi-jian":"companion","jie-cai":"companion" };
  var GROUP_NAME = { resource:"Resource", companion:"Companion", output:"Output", wealth:"Wealth", power:"Authority" };
  function invGen(ph){ for (var k in B.generating) if (B.generating[k]===ph) return k; }
  function invCtl(ph){ for (var k in B.controlling) if (B.controlling[k]===ph) return k; }
  function groupOfPhase(dm, o){ if (o===dm) return "companion"; if (B.generating[o]===dm) return "resource"; if (B.generating[dm]===o) return "output"; if (B.controlling[dm]===o) return "wealth"; if (B.controlling[o]===dm) return "power"; return "companion"; }
  function joinNames(a){ a=a.filter(Boolean); if(a.length<=1) return a[0]||""; if(a.length===2) return a[0]+" and "+a[1]; return a.slice(0,-1).join(", ")+", and "+a[a.length-1]; }
  function lowerFirst(s){ return s ? s.charAt(0).toLowerCase()+s.slice(1) : s; }
  function elChip(ph){ return '<span class="bz-el" style="border-color:'+(COLOR[ph]||"#d6a44c")+'"><span class="bz-dot" style="background:'+(COLOR[ph]||"#d6a44c")+'"></span>'+ph+"</span>"; }

  function deriveStrength(chart){
    var dm = stemByChar[chart.dayStem]; var ROLE={primary:1,middle:.5,residual:.25}; var SIGN={resource:1,companion:1,output:-1,wealth:-1,power:-1};
    var sum=0;
    chart.pillars.forEach(function(p){
      if(!p.isSelf){ var s=stemByChar[p.stem]; sum += SIGN[groupOfPhase(dm.phase,s.phase)]; }
      var b=branchByChar[p.branch]; (b.hidden||[]).forEach(function(h){ sum += SIGN[groupOfPhase(dm.phase,h.phase)]*(ROLE[h.role]||.25); });
    });
    var mp=branchByChar[chart.pillars[1].branch].phase, sb=0;
    if(mp===dm.phase) sb=3; else if(B.generating[mp]===dm.phase) sb=2; else if(B.generating[dm.phase]===mp) sb=-2; else if(B.controlling[mp]===dm.phase) sb=-3; else if(B.controlling[dm.phase]===mp) sb=-1;
    var score=sum+sb; var verdict=score>=2?"strong":(score<=-2?"weak":"balanced");
    return { score:score, verdict:verdict, near:Math.abs(score)<=1, dm:dm };
  }
  function deriveUseful(chart, st){
    var dm=st.dm.phase, useful=[], soft=false;
    if(st.verdict==="weak") useful=[invGen(dm), dm];
    else if(st.verdict==="strong") useful=[B.generating[dm], B.controlling[dm]];
    var mc=chart.pillars[1].branch, climate="temperate";
    if(["巳","午","未"].indexOf(mc)>-1){ climate="hot"; if(useful.indexOf("Water")<0) useful.push("Water"); }
    else if(["亥","子","丑"].indexOf(mc)>-1){ climate="cold"; if(useful.indexOf("Fire")<0) useful.push("Fire"); }
    if(st.verdict==="balanced" && climate==="temperate"){ useful=[B.generating[dm]]; soft=true; }
    var seen={}; useful=useful.filter(function(e){ if(!e||seen[e])return false; seen[e]=1; return true; }).slice(0,3);
    return { useful:useful, climate:climate, soft:soft };
  }
  function tallyGods(chart){
    var dm=stemByChar[chart.dayStem], ROLE={primary:1,middle:.5,residual:.25};
    var groups={resource:0,companion:0,output:0,wealth:0,power:0}, present={};
    function add(ph,pol,w,rev){ var g=godFor(dm.phase,dm.polarity,ph,pol); if(!g)return; groups[GROUP_OF_KEY[g.key]]+=w; if(!present[g.char])present[g.char]={char:g.char,en:g.en,key:g.key,group:GROUP_OF_KEY[g.key],revealed:false,weight:0}; present[g.char].weight+=w; if(rev)present[g.char].revealed=true; }
    chart.pillars.forEach(function(p){ if(!p.isSelf){ var s=stemByChar[p.stem]; add(s.phase,s.polarity,1,true); } var b=branchByChar[p.branch]; (b.hidden||[]).forEach(function(h){ var hs=stemByChar[h.stem]; add(hs.phase,hs.polarity,ROLE[h.role]||.25,false); }); });
    return { groups:groups, present:present };
  }
  function termList(){ return [[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,8],[9,8],[10,8],[11,7],[12,7],[1,6]]; }
  function startAgeApprox(y,m,d,fwd){
    var all=[]; [y-1,y,y+1].forEach(function(yy){ termList().forEach(function(t){ all.push(new Date(yy,t[0]-1,t[1])); }); });
    all.sort(function(a,b){return a-b;}); var bd=new Date(y,m-1,d), next=null,prev=null;
    for(var i=0;i<all.length;i++){ if(all[i]>bd){ next=all[i]; prev=all[i-1]; break; } }
    if(!next||!prev) return 4;
    var days=(fwd?(next-bd):(bd-prev))/86400000;
    return Math.max(1, Math.min(10, Math.round(days/3)));
  }

  function mountCast(root) {
    var gen = B.generating || {}, ctl = B.controlling || {};
    var MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var hourLabels = ["12 am","1 am","2 am","3 am","4 am","5 am","6 am","7 am","8 am","9 am","10 am","11 am","12 pm","1 pm","2 pm","3 pm","4 pm","5 pm","6 pm","7 pm","8 pm","9 pm","10 pm","11 pm"];
    function opts(a, b, sel) { var s = ""; for (var i = a; i <= b; i++) s += '<option' + (i === sel ? " selected" : "") + ">" + i + "</option>"; return s; }

    var dateRow = el("div", "bz-cast-form");
    dateRow.innerHTML =
      '<div class="bz-selblock bz-span2"><span class="bz-sellabel">Birth date</span><input class="bz-select bz-date" type="date" data-c="date" min="1900-01-01" max="2100-12-31" value="1990-07-15"></div>' +
      '<div class="bz-selblock bz-span2"><span class="bz-sellabel">Sex <span class="gloss" tabindex="0" data-tip="Used only to set the direction of the luck pillars (大运), which run forward or backward depending on birth sex and the birth-year polarity.">for luck 大运</span></span><select class="bz-select" data-c="sex"><option value="">Choose…</option><option value="female">Female</option><option value="male">Male</option></select></div>';
    root.appendChild(dateRow);

    var mode = "general";
    var toggle = el("div", "bz-modes"); toggle.setAttribute("role", "radiogroup"); toggle.setAttribute("aria-label", "Birth time");
    [["general", "I don't know my time"], ["known", "I know my time"], ["explore", "Explore the hour"]].forEach(function (mm) {
      var b = el("button", "bz-mode"); b.type = "button"; b.textContent = mm[1]; b.setAttribute("data-mode", mm[0]); b.setAttribute("role", "radio");
      b.addEventListener("click", function () { setMode(mm[0]); });
      toggle.appendChild(b);
    });
    root.appendChild(toggle);

    var controls = el("div", "bz-cast-controls"); root.appendChild(controls);
    var btnRow = el("div", "bz-actions"); var cast = el("button", "pill primary", "Cast my chart"); cast.type = "button"; btnRow.appendChild(cast); root.appendChild(btnRow);
    var out = el("div", "bz-panel"); out.setAttribute("aria-live", "polite");
    root.appendChild(out);

    var exploreHour = 15;
    setMode("general");

    function setMode(mm) {
      mode = mm;
      Array.prototype.forEach.call(toggle.querySelectorAll(".bz-mode"), function (b) { var on = b.getAttribute("data-mode") === mm; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", on ? "true" : "false"); });
      renderControls();
      cast.style.display = (mode === "explore") ? "none" : "";
      if (mode === "explore") doExplore();
      else out.innerHTML = '<p class="bz-hint">Pick your birth date, then cast your chart.</p>';
    }
    function renderControls() {
      if (mode === "known") {
        var cityOpts = '<option value="">Use clock time as-is (skip)</option>' + CITIES.map(function (c, i) { return '<option value="' + i + '">' + c[0] + "</option>"; }).join("") + '<option value="other">Other, enter longitude…</option>';
        controls.innerHTML =
          '<div class="bz-cast-form">' +
          '<div class="bz-selblock bz-span2"><span class="bz-sellabel">Time of birth</span><input class="bz-select bz-date" type="time" data-c="time" value="12:00"></div>' +
          '<div class="bz-selblock bz-span2"><span class="bz-sellabel">Birthplace <span class="gloss" tabindex="0" data-tip="真太阳时 zhēn tài yáng shí, true solar time. BaZi runs on the sun at your birthplace, so your longitude and the date shift the real hour. Optional.">true solar time</span></span><select class="bz-select" data-c="place">' + cityOpts + "</select></div>" +
          "</div>" +
          '<div data-adv style="display:none"><div class="bz-cast-form"><div class="bz-selblock"><span class="bz-sellabel">Longitude (east +, west −)</span><input class="bz-select" data-c="lon" type="number" step="0.1" min="-180" max="180" value="0"></div><div class="bz-selblock"><span class="bz-sellabel">UTC offset (hours)</span><input class="bz-select" data-c="utc" type="number" step="0.5" min="-12" max="14" value="0"></div></div></div>';
        var pl = controls.querySelector('[data-c="place"]');
        pl.addEventListener("change", function (e) { controls.querySelector("[data-adv]").style.display = (e.target.value === "other") ? "" : "none"; });
      } else if (mode === "explore") {
        controls.innerHTML =
          '<div class="bz-explore-banner">Exploring. Step the hour to watch the Hour pillar and its Ten God change. A teaching view, not your real chart.</div>' +
          '<div class="bz-stepper"><button type="button" class="bz-pill" data-step="-1">earlier</button><span class="bz-stepper-label" data-explabel></span><button type="button" class="bz-pill" data-step="1">later</button></div>';
        Array.prototype.forEach.call(controls.querySelectorAll("[data-step]"), function (bn) { bn.addEventListener("click", function () { exploreHour = mod(exploreHour + parseInt(bn.getAttribute("data-step"), 10), 24); doExplore(); }); });
        updateExpLabel();
      } else {
        controls.innerHTML = '<p class="bz-note-inline">Most people do not know their exact birth time, and that is fine. A general reading still gives you your Day Master, its strength, your useful element, and your full ten-year luck timeline. Only the hour pillar, and anything resting on it, stays open.</p>';
      }
    }
    function updateExpLabel() { var n = controls.querySelector("[data-explabel]"); if (n) n.textContent = hourLabels[exploreHour]; }
    function dv(c) { var n = dateRow.querySelector('[data-c="' + c + '"]'); return n ? n.value : ""; }
    function cv(c) { var n = controls.querySelector('[data-c="' + c + '"]'); return n ? n.value : ""; }
    function birthParts() { var v = dv("date"); if (!v) return null; var p = v.split("-"); return { y: parseInt(p[0], 10), m: parseInt(p[1], 10), d: parseInt(p[2], 10) }; }
    function timeParts() { var v = cv("time"); if (!v) return { h: 12, min: 0 }; var p = v.split(":"); return { h: parseInt(p[0], 10) || 0, min: parseInt(p[1], 10) || 0 }; }
    function dateOK() { var b = birthParts(); return !!(b && b.y >= 1900 && b.y <= 2100); }
    function place() {
      var pv = cv("place");
      if (mode !== "known" || pv === "" || pv == null) return null;
      if (pv === "other") { var lon = parseFloat(cv("lon")), utc = parseFloat(cv("utc")); if (isNaN(lon) || isNaN(utc)) return null; return { lon: lon, utc: utc, name: "your longitude" }; }
      var c = CITIES[parseInt(pv, 10)]; return c ? { lon: c[1], utc: c[2], name: c[0] } : null;
    }
    function reduceMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    function scrollToResult() { try { setTimeout(function () { out.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60); } catch (e) {} }
    function showCasting() { out.innerHTML = '<div class="bz-casting"><div class="bz-casting-glyphs"><span>八</span><span>字</span></div><p>Casting your four pillars…</p></div>'; }
    function doReveal(chart, ropt) {
      if (reduceMotion()) { render(chart, ropt); scrollToResult(); return; }
      showCasting(); scrollToResult();
      setTimeout(function () { render(chart, ropt); }, 560);
    }
    cast.addEventListener("click", function () {
      if (!dateOK()) { out.innerHTML = '<p class="bz-hint">Please pick a birth date (year 1900 to 2100).</p>'; return; }
      var b = birthParts(), y = b.y, m = b.m, d = b.d, sex = dv("sex");
      if (mode === "general") { doReveal(castChart({ year: y, month: m, day: d, known: false }), { birth:{y:y,m:m,d:d}, sex:sex, animate:true }); return; }
      var pl = place(), tp = timeParts();
      var o = { year: y, month: m, day: d, hour: tp.h, minute: tp.min, known: true };
      if (pl) { o.lon = pl.lon; o.utc = pl.utc; }
      doReveal(castChart(o), { placeName: pl ? pl.name : null, birth:{y:y,m:m,d:d}, sex:sex, animate:true });
    });
    function doExplore() {
      if (!dateOK()) { out.innerHTML = '<p class="bz-hint">Pick a birth date first, then explore the hour.</p>'; return; }
      updateExpLabel();
      var b = birthParts();
      render(castChart({ year: b.y, month: b.m, day: b.d, hour: exploreHour, minute: 0, known: true }), { explore: true, birth:{y:b.y,m:b.m,d:b.d}, sex:dv("sex") });
    }

    function godOf(node) { var g = godFor(dmPhase(), dmPol(), node.phase, node.polarity); return g ? g : null; }
    var _dm;
    function dmPhase() { return _dm.phase; }
    function dmPol() { return _dm.polarity; }

    function glossI(label, tip) { return '<span class="gloss" tabindex="0" data-tip="' + String(tip).replace(/"/g, "&quot;") + '">' + label + "</span>"; }
    function render(c, opt) {
      opt = opt || {};
      _dm = stemByChar[c.dayStem];
      var dm = _dm, GD = B.godDeep || {};
      var hasHour = c.pillars.length >= 4;
      var st = deriveStrength(c), uf = deriveUseful(c, st), tal = tallyGods(c);

      // --- chart grid (cells open the floater) ---
      var grid = '<div class="bz-chart">';
      c.pillars.forEach(function (p) {
        var s = stemByChar[p.stem], b = branchByChar[p.branch];
        var gg = p.isSelf ? null : godOf(s);
        var sGod = p.isSelf ? "the self" : (gg ? gg.char : "");
        var hid = (b.hidden || []).map(function (h) { return '<i style="background:' + (COLOR[h.phase] || "#d6a44c") + '" title="' + h.stem + '"></i>'; }).join("");
        var gAttr = p.isSelf ? 'data-god="日主"' : (gg ? 'data-god="' + gg.char + '"' : "");
        grid += '<div class="bz-pcol' + (p.isSelf ? " is-self" : "") + (opt.explore && p.label === "Hour" ? " is-explore" : "") + '"><div class="bz-pcap">' + p.label + (p.isSelf ? ' <span class="bz-selfmark">you</span>' : "") + "</div>" +
          '<div class="bz-pcell' + (p.isSelf ? " is-self" : "") + '" ' + gAttr + ' tabindex="0" role="button"><span class="bz-god">' + sGod + '</span><span class="bz-pglyph" ' + phaseStyle(s.phase) + ">" + s.char + '</span><span class="bz-pt">' + s.polarity + " " + s.phase + "</span></div>" +
          '<div class="bz-pcell" data-concept="sub" tabindex="0" role="button"><span class="bz-pglyph" ' + phaseStyle(b.phase) + ">" + b.char + '</span><span class="bz-pt">' + b.animal + '</span><span class="bz-hidmini">' + hid + "</span></div></div>";
      });
      if (!hasHour) grid += '<div class="bz-pcol bz-hour-unknown"><div class="bz-pcap">Hour</div><div class="bz-pcell bz-cell-unknown"><span class="bz-pglyph">?</span><span class="bz-pt">unknown</span></div><div class="bz-pcell bz-cell-unknown"><span class="bz-pglyph">?</span><span class="bz-pt">unknown</span></div></div>';
      grid += '</div><p class="bz-tap-hint">Tap any character for its full meaning.</p>';

      // --- solar ---
      var solar = "";
      if (c.solar && c.solar.applied) {
        var hAnimal = branchByChar[c.pillars[3].branch].animal;
        solar = '<div class="bz-solar"><span class="bz-k">' + glossI("True solar time", "真太阳时 zhēn tài yáng shí. BaZi runs on the sun at your birthplace, so your longitude and the date shift the real hour.") + '</span><p>' + c.solar.clock + ' clock time' + (opt.placeName ? ' near ' + opt.placeName : '') + ' becomes <b>' + c.solar.solar + '</b> true solar time, putting your birth in the <b>' + hAnimal + '</b> hour (' + c.pillars[3].branch + ').' + (c.solar.crossed ? ' Your longitude shifts this to a different hour than the clock alone.' : '') + '</p></div>';
      }

      // --- strength + useful element ---
      var img = "A " + dm.polarity + " " + dm.phase + " self (" + dm.imagery + ")";
      var STR = { strong: img + " with power to spare, built to lead and carry weight, and at its best with real outlets for that force.", balanced: img + " near the balance the tradition prizes, tending to adapt and hold its own without being ruled by any one pull.", weak: img + " that thrives on support, doing its best work backed by good mentors, steady allies, and enough rest." };
      var ufLine;
      if (uf.soft) ufLine = "Near balance, it leans lightly toward " + joinNames(uf.useful) + ", room to express and make more than any single need.";
      else {
        var why = st.verdict === "weak" ? "A weak self is fed by its own kind and by what supports it." : (st.verdict === "strong" ? "A strong self does best with outlets to pour its force into." : "");
        var clim = uf.climate === "hot" ? " Born in high summer it also runs warm, so a note of Water tends to cool it." : (uf.climate === "cold" ? " Born in deep winter it also runs cold, so a note of Fire tends to warm it." : "");
        ufLine = "This chart leans on " + joinNames(uf.useful) + ". " + why + clim;
      }
      var strengthBlock = '<div class="bz-read-sec"><span class="bz-k">' + glossI("Strength", "身强 shēn qiáng or 身弱 shēn ruò, whether the Day Master is strong or weak. Neither is better; the aim is balance.") + ' &amp; what it leans on</span><p><b>' + cap(st.verdict) + ' chart.</b> ' + STR[st.verdict] + '</p><p>' + ufLine + '</p><div class="bz-chipline">' + uf.useful.map(elChip).join(" ") + '</div></div>';

      // --- per-pillar reading ---
      var AREA = { Year: "roots, early life, and the family you come from", Month: "your upbringing and the ground your working life grows from, and the season that sets your strength", Hour: "your later years, what you produce, and what you leave" };
      var BRC = { resource: "brings support and learning here.", companion: "brings allies and self-reliance here.", output: "brings expression and output here.", wealth: "brings work, resources, and things to handle here.", power: "brings structure, duty, and pressure here." };
      var pillarBlock = '<div class="bz-read-sec"><span class="bz-k">The four pillars, one by one</span><div class="bz-reads">';
      c.pillars.forEach(function (p) {
        var s = stemByChar[p.stem], b = branchByChar[p.branch], stemLine;
        if (p.isSelf) stemLine = "At the center stands you: " + img + ", " + dm.keywords.slice(0, 3).join(", ") + ". Everything else is read as how it meets this self.";
        else { var g = godOf(s), gd = GD[g.char], ess = gd ? lowerFirst(gd.essence) : g.governs + "."; stemLine = "In the " + p.label + " pillar (" + (AREA[p.label] || p.sub) + ") stands " + s.imagery + " (" + s.phase + "), your <b>" + g.en + "</b> (" + g.char + "): " + ess; }
        var brc = BRC[groupOfPhase(dm.phase, b.phase)] || "";
        var hiddenList = (b.hidden || []).map(function (h) { var hs = stemByChar[h.stem], hg = godFor(dm.phase, dm.polarity, hs.phase, hs.polarity); return h.stem + " " + h.phase + " (" + hg.en + ")"; }).join(", ");
        var branchLine = "Beneath it, the " + b.animal + " (" + b.phase + " branch) " + brc + " Hidden inside: " + hiddenList + "." + (p.isSelf ? " This is your spouse palace, coloring your closest partnership." : "");
        pillarBlock += '<div class="bz-read"><span class="bz-k">' + p.label + " · " + s.char + b.char + '</span><p>' + stemLine + '</p><p>' + branchLine + '</p></div>';
      });
      if (!hasHour) pillarBlock += '<p class="bz-hidline" style="grid-column:1/-1">The Hour pillar is unread without a birth time, so later years, children, and output stay open.</p>';
      pillarBlock += '</div></div>';

      // --- ten gods summary ---
      var tg = tal.groups, pres = tal.present, lines = [];
      if (tg.power < 0.25) lines.push("No Officer or Authority star appears, a self-made signature: this chart leans on its own initiative rather than a set ladder to climb.");
      var domG = Object.keys(tg).reduce(function (a, b) { return tg[b] > tg[a] ? b : a; });
      if (tg[domG] >= 3) { var DL = { output: "Output runs strong, a maker's chart: it tends to think by producing and does best with something to build or express.", resource: "Resource runs strong, a learner's and nurturer's chart: it gathers knowledge, backing, and care, and gives the same.", wealth: "Wealth runs strong, a practical, results-facing chart drawn to tangible work and real resources.", power: "Authority runs strong, a chart shaped early by structure, duty, and responsibility.", companion: "Companions run strong, a chart of drive, independence, and peers, for camaraderie and rivalry alike." }[domG]; if (DL) lines.push(DL); }
      if (tg.companion >= 3 && tg.wealth < 1) lines.push("Peers crowd the chart while Wealth is thin, the classical 比劫争财, rivals dividing a small pot: this self does best setting clear boundaries around what is its own.");
      if (st.verdict === "weak" && tg.wealth >= 2) lines.push("Wealth is present but the self is light (财多身弱): plenty to handle, and a chart that fares best building support before it reaches.");
      var presList = Object.keys(pres).map(function (ch) { var g = pres[ch]; return '<span class="bz-godtag2" data-god="' + ch + '" tabindex="0" role="button">' + ch + " <i>" + g.en + "</i> <em>" + (g.revealed ? "主星" : "副星") + "</em></span>"; }).join("");
      var godsBlock = '<div class="bz-read-sec"><span class="bz-k">Your Ten Gods (' + glossI("主星 / 副星", "主星 zhǔ xīng are the gods on your visible stems; 副星 fù xīng are the gods of the hidden stems. Tap any to learn it.") + ')</span><div class="bz-godtags">' + presList + '</div>' + (lines.length ? "<p>" + lines.join(" ") + "</p>" : "") + "</div>";

      // --- luck pillars ---
      var luckArc = "", luckBlock;
      if (!opt.sex) luckBlock = '<div class="bz-read-sec"><span class="bz-k">Your luck decades (大运)</span><p class="bz-note-inline">Choose your sex in the form above (it sets the direction of the luck pillars) to see your ten-year decades.</p></div>';
      else {
        var yPol = stemByChar[c.pillars[0].stem].polarity;
        var fwd = (opt.sex === "male" && yPol === "yang") || (opt.sex === "female" && yPol === "yin");
        var sa = opt.birth ? startAgeApprox(opt.birth.y, opt.birth.m, opt.birth.d, fwd) : 4;
        var birthY = opt.birth ? opt.birth.y : null, curY = new Date().getFullYear();
        var curAge = birthY ? (curY - birthY) : null;
        var si = STEMS.indexOf(c.pillars[1].stem), bi = BRANCHES.indexOf(c.pillars[1].branch), cells = "", good = [];
        for (var k = 0; k < 8; k++) {
          si = mod(si + (fwd ? 1 : -1), 10); bi = mod(bi + (fwd ? 1 : -1), 12);
          var ds = B.stems[si], db = B.branches[bi], g2 = godFor(dm.phase, dm.polarity, ds.phase, ds.polarity);
          var feeds = uf.useful.indexOf(ds.phase) > -1 || uf.useful.indexOf(db.phase) > -1 || uf.useful.indexOf(B.generating[ds.phase]) > -1;
          var drains = uf.useful.indexOf(B.controlling[ds.phase]) > -1;
          var cl = feeds && !drains ? "supportive" : (drains && !feeds ? "demanding" : "mixed"), ageF = sa + k * 10, ageT = ageF + 9;
          var yF = birthY ? birthY + ageF : null;
          var when = (curAge == null) ? "" : (curAge > ageT ? " is-past" : (curAge >= ageF ? " is-now" : ""));
          if (cl === "supportive" && (curAge == null || ageF >= curAge)) good.push(ageF);
          var nowTag = when.indexOf("is-now") > -1 ? '<span class="bz-now">now</span>' : "";
          cells += '<div class="bz-luckcell' + (cl === "supportive" ? " is-good" : (cl === "demanding" ? " is-hard" : "")) + when + '" data-god="' + g2.char + '" tabindex="0" role="button">' + nowTag + "<b>" + ds.char + db.char + "</b><i>age " + ageF + (yF ? " · " + yF : "") + "</i><em>" + g2.en + "</em></div>";
        }
        var avg = good.length ? good.reduce(function (a, b) { return a + b; }, 0) / good.length : 0;
        luckArc = !good.length ? "moves through an even mix of supportive and demanding seasons" : (avg < sa + 25 ? "opens with supportive seasons early, favouring a strong start" : (avg < sa + 50 ? "gathers its most supportive seasons in the middle years, coming into its own with time" : "saves its most supportive seasons for later, a long game that rewards patience"));
        luckBlock = '<div class="bz-read-sec"><span class="bz-k">Your luck decades (' + glossI("大运", "大运 dà yùn, the ten-year luck pillars: moving seasons of life laid over the fixed chart. Tendencies, never a schedule.") + '), from about age ' + sa + '</span><p><b>Green</b> is a supportive decade for your chart; <b>amber</b> is more demanding, its elements working against what you lean on. Dimmed blocks are behind you, the ringed one is where you are now, and the rest lie ahead. Tap any for the god it brings.</p><div class="bz-luckrow">' + cells + '</div></div>';
      }

      // --- synthesis ---
      var domEntry = Object.keys(pres).map(function (k) { return pres[k]; }).filter(function (g) { return g.group === domG; }).sort(function (a, b) { return (b.weight + (b.revealed ? .5 : 0)) - (a.weight + (a.revealed ? .5 : 0)); })[0];
      var domName = domEntry ? domEntry.en : "", domGloss = domEntry && GD[domEntry.char] ? lowerFirst(GD[domEntry.char].essence) : "", domLean = domEntry && GD[domEntry.char] ? lowerFirst(GD[domEntry.char].career) : "";
      var VERB = { output: "make and express", wealth: "build and provide", power: "lead and take responsibility", resource: "learn, protect, and pass on", companion: "stand on its own and gather equals" };
      var SM = { strong: "a self with force to spare", balanced: "a self near the prized point of balance", weak: "a self that runs on support" };
      var SD = { strong: "do its best work with outlets and something real to carry", balanced: "adapt and hold its own without being ruled by any one pull", weak: "flourish with good backing, steady allies, and room to rest" };
      var arcTxt = opt.sex ? luckArc : "moves through a mix of seasons (add your sex above for the luck direction)";
      var synth = '<div class="bz-portrait bz-synth"><span class="bz-k">What this life means</span><p>At heart, this is a ' + dm.polarity + " " + dm.phase + " self, " + dm.keywords.slice(0, 3).join(", ") + ". It reads as a <b>" + st.verdict + "</b> chart, " + SM[st.verdict] + ", so it tends to " + SD[st.verdict] + ". " + (domName ? "Its strongest current is <b>" + domName + "</b>, " + domGloss + " so this life leans toward " + domLean + " " : "") + "The elements it most leans on are " + joinNames(uf.useful) + ". Across the decades it " + arcTxt + ", so the season of life matters as much as the chart. Read whole, this is a life built to <b>" + (VERB[domG] || "find its own balance") + "</b>: not a fate written down, but a grain to work with, most itself when it leans into " + uf.useful[0] + " and gives its " + (domName || "gifts") + " real room.</p></div>";

      // --- notes / hedges ---
      var extra = []; if (st.near) extra.push("This chart sits near the balance line, so read the strength lightly; small details could tip it.");
      var notes = c.notes.concat(extra).map(function (n) { return "<p>" + n + "</p>"; }).join("");
      var banner = opt.explore ? '<p class="bz-note-inline"><b>Exploring the ' + hourLabels[exploreHour] + ' hour.</b> A teaching view, not your real chart.</p>' : "";
      var generalNote = (!hasHour && !opt.explore) ? '<div class="bz-note-inline"><b>A general reading.</b> Your Day Master, strength, useful element, and full luck timeline all hold without the hour. Only the hour pillar (later years, children, output) stays open. Add your time later for that chapter.</div>' : "";
      var links = '<div class="bz-actions"><a class="bz-pill" href="/bazi/day-master/">More on the Day Master</a><a class="bz-pill" href="/bazi/ten-gods/">More on the Ten Gods</a><a class="bz-pill" href="/bazi/luck-pillars/">How luck works</a><a class="bz-pill" href="/chinese-zodiac/' + slug(branchByChar[c.pillars[0].branch].animal) + '/">Your year animal</a></div>';

      // year ahead (流年 annual pillar)
      var nowY = new Date().getFullYear();
      var ys = B.stems[mod(nowY - 4, 10)], yb = B.branches[mod(nowY - 4, 12)];
      var yGod = godFor(dm.phase, dm.polarity, ys.phase, ys.polarity);
      var yFeeds = uf.useful.indexOf(ys.phase) > -1 || uf.useful.indexOf(yb.phase) > -1 || uf.useful.indexOf(B.generating[ys.phase]) > -1;
      var yDrains = uf.useful.indexOf(B.controlling[ys.phase]) > -1;
      var yClim = yFeeds && !yDrains ? "a supportive year for " + uf.useful[0] + ", when your own leanings tend to be met and work flows more easily" : (yDrains && !yFeeds ? "a demanding year that asks more of you, so lean on " + uf.useful[0] + " on purpose" : "a mixed year, some of it meeting you and some testing you");
      var yearBlock = '<div class="bz-read-sec"><span class="bz-k">The year ahead (' + glossI("流年", "流年 liú nián, the annual pillar: the current year read against your chart. A season, not a schedule.") + " " + nowY + ", " + ys.char + yb.char + " " + yb.animal + ')</span><p>This reads as a <b>' + yGod.en + '</b> year for you: ' + yClim + '. The BaZi year turns at the Start of Spring (立春). Read it as the weather of a year, never a schedule of events.</p></div>';

      // shareable card
      var oneLine = dm.polarity + " " + dm.phase + " Day Master · " + cap(st.verdict) + " · leans on " + joinNames(uf.useful);
      var shareTxt = "My BaZi: a " + dm.polarity + " " + dm.phase + " self (" + dm.imagery + "), a " + st.verdict + " chart that leans on " + joinNames(uf.useful) + ". " + (domName ? "Strongest current: " + domName + ". " : "") + "Cast yours at zodianimal.com/bazi/chart/";
      var shareCard = '<div class="bz-sharecard"><div class="bz-share-glyph" ' + phaseStyle(dm.phase) + ">" + dm.char + '</div><div class="bz-share-body"><div class="bz-share-line">' + oneLine + '</div><button type="button" class="bz-pill bz-sharebtn">Copy my reading to share</button></div></div>';

      var hourSel = "";
      if (opt.birth) {
        var HR = ["11pm to 1am", "1 to 3am", "3 to 5am", "5 to 7am", "7 to 9am", "9 to 11am", "11am to 1pm", "1 to 3pm", "3 to 5pm", "5 to 7pm", "7 to 9pm", "9 to 11pm"];
        var ho = '<option value="">Unknown (general reading)</option>';
        for (var hi = 0; hi < 12; hi++) { var ba = B.branches[hi]; ho += '<option value="' + hi + '"' + (hasHour && c.pillars[3].branch === ba.char ? " selected" : "") + ">" + HR[hi] + " · " + ba.animal + " " + ba.char + "</option>"; }
        hourSel = '<div class="bz-read-sec bz-hoursel"><span class="bz-k">Your birth hour ' + glossI("(时辰)", "时辰 shí chen, the two-hour block of your birth. It sets the fourth pillar: later life, children, and what you make. Swap it to see the reading change.") + ' — swap to see how it changes</span><select class="bz-select" data-hoursel>' + ho + '</select></div>';
      }
      var castlead = '<p class="bz-castlead">Your Day Master is <b>' + dm.char + " " + dm.pinyin + "</b>, " + dm.polarity + " " + dm.phase + ". " + cap(dm.imagery) + ". This is you, the character every other part of the chart is read against.</p>";
      var pieces = [castlead, grid, hourSel, solar, shareCard, strengthBlock, pillarBlock, godsBlock, luckBlock, yearBlock, synth, generalNote, (notes ? '<div class="bz-note-inline">' + notes + "</div>" : ""), links, '<p class="bz-note-inline">A reading of tendencies from a classical system, a mirror and a grain to work with, not a verdict and not a prediction. What you do with it is yours.</p>'].filter(Boolean);
      var body = opt.animate ? '<div class="bz-anim">' + pieces.map(function (p, i) { return '<div class="bz-reveal-step" style="animation-delay:' + (i * 75) + 'ms">' + p + "</div>"; }).join("") + "</div>" : pieces.join("");
      out.innerHTML = banner + body;

      if (window.__bzFloat) {
        Array.prototype.forEach.call(out.querySelectorAll("[data-god]"), function (cell) { cell.addEventListener("click", function () { window.__bzFloat.openGod(cell.getAttribute("data-god")); }); });
        Array.prototype.forEach.call(out.querySelectorAll("[data-concept]"), function (cell) { cell.addEventListener("click", function () { window.__bzFloat.openConcept(cell.getAttribute("data-concept")); }); });
      }
      var sbtn = out.querySelector(".bz-sharebtn");
      if (sbtn) sbtn.addEventListener("click", function () {
        if (navigator.share) { navigator.share({ text: shareTxt }).catch(function () {}); return; }
        if (navigator.clipboard) navigator.clipboard.writeText(shareTxt).then(function () { sbtn.textContent = "Copied to clipboard"; setTimeout(function () { sbtn.textContent = "Copy my reading to share"; }, 1900); }).catch(function () {});
      });
      var hsel = out.querySelector("[data-hoursel]");
      if (hsel) hsel.addEventListener("change", function () {
        var v = hsel.value, bo = opt.birth; if (!bo) return;
        if (v === "") render(castChart({ year: bo.y, month: bo.m, day: bo.d, known: false }), { birth: bo, sex: opt.sex, animate: false });
        else render(castChart({ year: bo.y, month: bo.m, day: bo.d, hour: parseInt(v, 10) * 2, minute: 0, known: true }), { birth: bo, sex: opt.sex, animate: false });
      });
    }
  }

  function cap(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

  var MOUNTS = { hidden: mountHidden, stems: mountStems, branches: mountBranches, tengods: mountTenGods, pairing: mountPairing, chart: mountChart, cast: mountCast };
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-bz]"), function (root) {
      var kind = root.getAttribute("data-bz");
      if (MOUNTS[kind] && !root.getAttribute("data-bz-done")) {
        root.setAttribute("data-bz-done", "1");
        try { MOUNTS[kind](root); } catch (e) { /* fail quiet */ }
      }
    });
  }
  function reveals() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    var bands = document.querySelectorAll("section.band");
    if (!bands.length) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(bands, function (b, i) {
      if (i === 0) return; // never hide the first band
      b.classList.add("reveal");
      io.observe(b);
    });
  }
  function boot() { init(); reveals(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
