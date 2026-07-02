/* proverbs-hub.js — pond, filters, Mandarin TTS, daily draw. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- data ---------- */
  var DATA = [];
  try { DATA = JSON.parse(document.getElementById("pv-data").textContent); } catch (e) { DATA = []; }
  var byId = {};
  DATA.forEach(function (p) { byId[p.id] = p; });
  var ANIMAL_HANZI = {Rat:"鼠",Ox:"牛",Tiger:"虎",Rabbit:"兔",Dragon:"龍",Snake:"蛇",Horse:"馬",Goat:"羊",Monkey:"猴",Rooster:"雞",Dog:"狗",Pig:"豬"};

  /* ---------- Mandarin speech ---------- */
  var zhVoice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return;
    var vs = speechSynthesis.getVoices() || [];
    zhVoice = vs.filter(function (v) { return /^zh\b|zh[-_]/i.test(v.lang) || /Chinese|中文|普通话|國語/i.test(v.name); })[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, btn) {
    if (!window.speechSynthesis || !text) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN"; u.rate = 0.78; u.pitch = 1;
      if (zhVoice) u.voice = zhVoice;
      if (btn) { btn.classList.add("is-saying"); u.onend = u.onerror = function () { btn.classList.remove("is-saying"); }; }
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  /* delegated: any element with data-say speaks */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-say]");
    if (!b) return;
    var t = b.getAttribute("data-say");
    if (t) speak(t, b);
  });

  /* ---------- reveal panel ---------- */
  var reveal = document.getElementById("pvReveal");
  var elZh = document.getElementById("pvRevealZh"), elPy = document.getElementById("pvRevealPinyin"),
      elLit = document.getElementById("pvRevealLit"), elMean = document.getElementById("pvRevealMean"),
      elSoul = document.getElementById("pvRevealSoul"), elTag = document.getElementById("pvRevealTag"),
      elAnimal = document.getElementById("pvRevealAnimal"), elSrc = document.getElementById("pvRevealSrc"),
      elSay = document.getElementById("pvRevealSay"), elKeep = document.getElementById("pvKeep");
  var current = null;

  function rubyHTML(p) {
    return p.chars.map(function (c) {
      return c[1] ? "<ruby>" + c[0] + "<rt>" + c[1] + "</rt></ruby>" : '<span class="cx-punct">' + c[0] + "</span>";
    }).join("");
  }
  function render(p, tag) {
    if (!p) return;
    current = p;
    elTag.textContent = tag || "From the pond";
    elZh.innerHTML = rubyHTML(p);
    elPy.textContent = p.pinyin;
    elLit.textContent = "“" + p.literal + "”";
    elMean.textContent = p.meaning;
    elSoul.textContent = p.soul;
    var a = String(p.animal);
    elAnimal.textContent = (ANIMAL_HANZI[a] || "") + " Year of the " + a;
    elAnimal.setAttribute("href", "/chinese-zodiac/" + a.toLowerCase() + "/");
    elSrc.textContent = p.source ? "Source: " + p.source : "";
    elSay.setAttribute("data-say", p.trad);
    syncKeep();
    reveal.classList.remove("is-in");
    // reflow then fade in
    void reveal.offsetWidth;
    reveal.classList.add("is-in");
  }

  /* ---------- keep (light collectible in localStorage) ---------- */
  var KEY = "za_proverbs_kept";
  function kept() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function syncKeep() {
    if (!current) return;
    var on = kept().indexOf(current.id) !== -1;
    elKeep.setAttribute("aria-pressed", on ? "true" : "false");
    elKeep.firstChild.nodeValue = on ? "Kept " : "Keep ";
  }
  if (elKeep) elKeep.addEventListener("click", function () {
    if (!current) return;
    var list = kept(), i = list.indexOf(current.id);
    if (i === -1) list.push(current.id); else list.splice(i, 1);
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
    syncKeep();
  });

  /* ---------- daily proverb (deterministic by date) ---------- */
  function daySeed() {
    var d = new Date();
    return (d.getFullYear() * 1000 + (d.getMonth() + 1) * 50 + d.getDate());
  }
  function draw(random) {
    if (!DATA.length) return;
    var idx = random ? Math.floor(Math.random() * DATA.length) : (daySeed() % DATA.length);
    if (random && current) { // avoid repeating the same one twice in a row
      var guard = 0;
      while (DATA[idx].id === current.id && guard++ < 6) idx = Math.floor(Math.random() * DATA.length);
    }
    render(DATA[idx], random ? "From the pond" : "Proverb of the day");
  }

  /* ---------- the pond (canvas koi) ---------- */
  var pond = document.getElementById("pvPond");
  var canvas = document.getElementById("pvCanvas");
  var hint = document.getElementById("pvHint");
  var drawBtn = document.getElementById("pvDraw");
  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var koi = [], lotus = [], ripples = [], stars = [], raf = 0, t = 0;
  var KOI_COLORS = ["rgba(239,226,180,", "rgba(214,193,140,", "rgba(232,178,120,", "rgba(245,236,210,"];

  function size() {
    if (!canvas) return;
    var r = pond.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    var n = reduce ? 5 : 8;
    koi = [];
    for (var i = 0; i < n; i++) {
      koi.push({
        x: Math.random() * W, y: 60 + Math.random() * (H - 120),
        a: Math.random() * Math.PI * 2, sp: 0.15 + Math.random() * 0.35,
        len: 26 + Math.random() * 22, col: KOI_COLORS[i % KOI_COLORS.length],
        wob: Math.random() * Math.PI * 2
      });
    }
    lotus = [];
    for (var j = 0; j < 5; j++) lotus.push({ x: Math.random() * W, y: 40 + Math.random() * (H - 80), r: 14 + Math.random() * 16, a: Math.random() });
    stars = [];
    for (var k = 0; k < 40; k++) stars.push({ x: Math.random() * W, y: Math.random() * H * 0.5, r: Math.random() * 1.2 + 0.2, p: Math.random() });
  }
  function drawKoi(k) {
    var wob = Math.sin(t * 0.06 + k.wob) * 0.4;
    var ang = k.a + wob;
    ctx.save();
    ctx.translate(k.x, k.y);
    ctx.rotate(ang);
    // body
    var g = ctx.createLinearGradient(-k.len, 0, k.len * 0.5, 0);
    g.addColorStop(0, k.col + "0)");
    g.addColorStop(1, k.col + "0.9)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(k.len * 0.5, 0);
    ctx.quadraticCurveTo(0, -k.len * 0.28, -k.len * 0.5, 0);
    ctx.quadraticCurveTo(0, k.len * 0.28, k.len * 0.5, 0);
    ctx.fill();
    // tail
    var sw = Math.sin(t * 0.12 + k.wob) * 0.5;
    ctx.fillStyle = k.col + "0.28)";
    ctx.beginPath();
    ctx.moveTo(-k.len * 0.45, 0);
    ctx.quadraticCurveTo(-k.len * 0.8, -k.len * 0.28 + sw * 8, -k.len * 0.95, sw * 10);
    ctx.quadraticCurveTo(-k.len * 0.8, k.len * 0.28 + sw * 8, -k.len * 0.45, 0);
    ctx.fill();
    ctx.restore();
  }
  function step() {
    if (!ctx) return;
    t++;
    ctx.clearRect(0, 0, W, H);
    // faint stars on the water's dark sky
    for (var s = 0; s < stars.length; s++) {
      var st = stars[s]; if (!reduce) st.p += 0.01;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7);
      ctx.fillStyle = "rgba(245,236,210," + (0.15 + Math.abs(Math.sin(st.p)) * 0.3) + ")"; ctx.fill();
    }
    // moon glow reflection
    var mg = ctx.createRadialGradient(W * 0.5, -40, 10, W * 0.5, -40, H * 0.9);
    mg.addColorStop(0, "rgba(245,236,210,0.10)"); mg.addColorStop(1, "rgba(245,236,210,0)");
    ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H);
    // lotus pads
    for (var l = 0; l < lotus.length; l++) {
      var lp = lotus[l];
      ctx.beginPath(); ctx.arc(lp.x, lp.y, lp.r, 0.3, Math.PI * 2);
      ctx.fillStyle = "rgba(60,110,90,0.18)"; ctx.fill();
    }
    // ripples
    for (var r = ripples.length - 1; r >= 0; r--) {
      var rp = ripples[r]; rp.rad += 2.2; rp.life -= 0.02;
      if (rp.life <= 0) { ripples.splice(r, 1); continue; }
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.rad, 0, 7);
      ctx.strokeStyle = "rgba(239,226,180," + (rp.life * 0.5) + ")"; ctx.lineWidth = 1.2; ctx.stroke();
    }
    // koi
    for (var i = 0; i < koi.length; i++) {
      var k = koi[i];
      if (!reduce) {
        k.x += Math.cos(k.a) * k.sp; k.y += Math.sin(k.a) * k.sp;
        k.a += (Math.random() - 0.5) * 0.03;
        if (k.x < -40) k.x = W + 40; if (k.x > W + 40) k.x = -40;
        if (k.y < 40) k.a = Math.abs(k.a); if (k.y > H - 40) k.a = -Math.abs(k.a);
      }
      drawKoi(k);
    }
    if (!document.hidden) raf = requestAnimationFrame(step);
  }
  function ripple(x, y) { ripples.push({ x: x, y: y, rad: 2, life: 1 }); }
  function nudgeKoiToward(x, y) {
    // send the nearest koi darting toward the touch, then draw
    var best = null, bd = 1e9;
    for (var i = 0; i < koi.length; i++) {
      var dx = koi[i].x - x, dy = koi[i].y - y, d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = koi[i]; }
    }
    if (best) best.a = Math.atan2(y - best.y, x - best.x);
  }

  if (ctx) {
    size(); seed();
    if (!reduce) raf = requestAnimationFrame(step); else step();
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); size(); seed(); if (!reduce) raf = requestAnimationFrame(step); else step(); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(step);
    });
    pond.addEventListener("click", function (e) {
      if (e.target.closest(".pv-draw")) return; // button handles its own
      var r = pond.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      ripple(x, y); nudgeKoiToward(x, y);
      pond.classList.add("is-drawn");
      draw(true);
    });
  }
  if (drawBtn) drawBtn.addEventListener("click", function () {
    pond.classList.add("is-drawn");
    if (ctx) ripple(W * (0.3 + Math.random() * 0.4), H * (0.3 + Math.random() * 0.4));
    draw(true);
  });

  /* seed the reveal with today's proverb so it is never empty */
  draw(false);

  /* ---------- filtering ---------- */
  var grid = document.getElementById("pvGrid");
  var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll(".pv-card")) : [];
  var countEl = document.getElementById("pvCount");
  var emptyEl = document.getElementById("pvEmpty");
  var clearEl = document.getElementById("pvClear");
  var searchEl = document.getElementById("pvSearch");
  var state = { theme: "", cat: "", orient: "", animal: "", el: "", q: "" };
  var ATTR = { theme: "theme", cat: "cat", orient: "orient", animal: "animal", el: "el" };

  function apply() {
    var shown = 0;
    var q = state.q.trim();
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i], ok = true, g;
      for (g in ATTR) {
        if (state[g] && c.getAttribute("data-" + ATTR[g]) !== state[g]) { ok = false; break; }
      }
      if (ok && q && c.getAttribute("data-q").indexOf(q) === -1) ok = false;
      c.hidden = !ok;
      if (ok) shown++;
    }
    if (countEl) countEl.textContent = shown === cards.length ? (cards.length + " proverbs") : (shown + " of " + cards.length);
    if (emptyEl) emptyEl.hidden = shown !== 0;
    var any = state.theme || state.cat || state.orient || state.animal || state.el || state.q;
    if (clearEl) clearEl.hidden = !any;
  }
  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".pv-chip");
    if (!chip) return;
    var g = chip.getAttribute("data-group"), v = chip.getAttribute("data-val");
    state[g] = v;
    var sibs = chip.parentNode.querySelectorAll(".pv-chip");
    for (var i = 0; i < sibs.length; i++) sibs[i].classList.toggle("is-on", sibs[i] === chip);
    apply();
  });
  if (searchEl) searchEl.addEventListener("input", function () {
    state.q = searchEl.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    apply();
  });
  if (clearEl) clearEl.addEventListener("click", function () {
    state = { theme: "", cat: "", orient: "", animal: "", el: "", q: "" };
    if (searchEl) searchEl.value = "";
    var groups = document.querySelectorAll(".pv-chips");
    for (var i = 0; i < groups.length; i++) {
      var cs = groups[i].querySelectorAll(".pv-chip");
      for (var j = 0; j < cs.length; j++) cs[j].classList.toggle("is-on", cs[j].getAttribute("data-val") === "");
    }
    apply();
  });

  /* ---------- background starfield behind the whole page ---------- */
  (function () {
    var cv = document.getElementById("sky"); if (!cv || !cv.getContext) return;
    var x = cv.getContext("2d");
    function sz() { cv.width = innerWidth; cv.height = Math.max(innerHeight, document.body.scrollHeight); }
    sz(); addEventListener("resize", sz);
    var n = reduce ? 40 : 90;
    var st = Array.from({ length: n }, function () { return { x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.2 + 0.2, a: Math.random(), s: Math.random() * 0.02 + 0.004 }; });
    (function f() {
      x.clearRect(0, 0, cv.width, cv.height);
      for (var i = 0; i < st.length; i++) { var s = st[i]; if (!reduce) s.a += s.s; var al = 0.25 + Math.abs(Math.sin(s.a)) * 0.5; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fillStyle = "rgba(245,236,210," + al + ")"; x.fill(); }
      if (!document.hidden && !reduce) requestAnimationFrame(f);
    })();
  })();
})();
