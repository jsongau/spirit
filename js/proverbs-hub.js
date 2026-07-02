/* proverbs-hub.js - pond, twelve pond cards, filters, Mandarin TTS, streak.
   Per-card sharing is owned by proverbs-share.js (the [data-share] modal). */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- daily streak (shared key with the collection page) ---------- */
  try {
    var _sk = "za_proverbs_streak";
    var _today = new Date().toISOString().slice(0, 10);
    var _s = JSON.parse(localStorage.getItem(_sk) || "null") || { last: "", count: 0 };
    if (_s.last !== _today) {
      var _y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      _s.count = (_s.last === _y) ? (_s.count + 1) : 1;
      _s.last = _today;
      localStorage.setItem(_sk, JSON.stringify(_s));
    }
  } catch (e) {}
  var ANIMAL_HANZI = {Rat:"鼠",Ox:"牛",Tiger:"虎",Rabbit:"兔",Dragon:"龍",Snake:"蛇",Horse:"馬",Goat:"羊",Monkey:"猴",Rooster:"雞",Dog:"狗",Pig:"豬"};

  /* ---------- Mandarin speech ---------- */
  var zhVoice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return;
    var vs = speechSynthesis.getVoices() || [];
    var best = null, bs = -1;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i], nm = (v.name || "").toLowerCase(), lg = (v.lang || "").toLowerCase();
      if (!(/^zh\b|zh[-_]/.test(lg) || /chinese|中文|普通话|国语|國語|mandarin/i.test(v.name || ""))) continue;
      var sc = 0;
      if (/tingting|ting-ting|meijia|mei-jia|sinji|li-mu|yu-shu|han-?yu/.test(nm)) sc += 100; // Apple premium (Safari/macOS)
      if (/google/.test(nm)) sc += 60;                                                        // Google network voice (Chrome)
      if (/普通话|mandarin|zh-cn|zh_cn|cmn/.test(nm + lg)) sc += 25;                            // Mandarin over Cantonese/Taiwan
      if (v.localService === false) sc += 12;                                                 // network voices are usually clearer
      if (/female|woman/.test(nm)) sc += 4;
      if (sc > bs) { bs = sc; best = v; }
    }
    zhVoice = best;
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

  /* ---------- the pond draws a current: highlight one pond card ---------- */
  var pondCards = Array.prototype.slice.call(document.querySelectorAll(".pv-pond-card"));
  var brief = document.getElementById("pvBrief");
  var lastDrawn = null;

  function drawPond() {
    if (!pondCards.length) return;
    var pick = pondCards[Math.floor(Math.random() * pondCards.length)];
    if (pondCards.length > 1 && pick === lastDrawn) {
      var guard = 0;
      while (pick === lastDrawn && guard++ < 6) pick = pondCards[Math.floor(Math.random() * pondCards.length)];
    }
    if (lastDrawn && lastDrawn !== pick) lastDrawn.classList.remove("is-drawn");
    pick.classList.add("is-drawn");
    lastDrawn = pick;
    if (brief) {
      var name = pick.getAttribute("data-name") || "";
      var b = pick.getAttribute("data-brief") || "";
      var count = pick.getAttribute("data-count") || "";
      brief.textContent = "The water leans toward " + name + ". " + b + ". " + count + " proverbs wait there.";
    }
    if (pick.scrollIntoView) {
      try { pick.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "nearest" }); } catch (e) {}
    }
  }

  /* ---------- the pond (canvas koi) ---------- */
  var pond = document.getElementById("pvPond");
  var canvas = document.getElementById("pvCanvas");
  var hint = document.getElementById("pvHint");
  var drawBtn = document.getElementById("pvDraw");
  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var koi = [], lotus = [], ripples = [], stars = [], raf = 0, t = 0;
  /* [body base, body edge, fin/tail tint] as rgb triplets */
  var KOI_SKINS = [
    { body: "239,226,180", edge: "255,244,206", fin: "245,236,210" },
    { body: "214,193,140", edge: "236,214,160", fin: "239,226,180" },
    { body: "232,178,120", edge: "247,201,150", fin: "236,196,150" },
    { body: "222,150,120", edge: "240,182,150", fin: "236,178,150" },
    { body: "245,236,210", edge: "255,250,235", fin: "245,236,210" }
  ];

  function size() {
    if (!canvas) return;
    var r = pond.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    var n = reduce ? 5 : 8; // capped either way
    koi = [];
    for (var i = 0; i < n; i++) {
      koi.push({
        x: Math.random() * W, y: 60 + Math.random() * (H - 120),
        a: Math.random() * Math.PI * 2, sp: 0.15 + Math.random() * 0.35,
        len: 30 + Math.random() * 22, skin: KOI_SKINS[i % KOI_SKINS.length],
        wob: Math.random() * Math.PI * 2, glow: 0.5 + Math.random() * 0.5
      });
    }
    lotus = [];
    for (var j = 0; j < 5; j++) lotus.push({ x: Math.random() * W, y: 40 + Math.random() * (H - 80), r: 14 + Math.random() * 16, a: Math.random() });
    stars = [];
    for (var k = 0; k < 40; k++) stars.push({ x: Math.random() * W, y: Math.random() * H * 0.5, r: Math.random() * 1.2 + 0.2, p: Math.random() });
  }
  function drawKoi(k) {
    var wob = reduce ? 0 : Math.sin(t * 0.06 + k.wob) * 0.4;
    var ang = k.a + wob;
    var L = k.len, sk = k.skin;
    ctx.save();
    ctx.translate(k.x, k.y);
    ctx.rotate(ang);

    // soft reflection on the water beneath the fish
    var glow = ctx.createRadialGradient(0, 0, 2, 0, 0, L * 0.95);
    glow.addColorStop(0, "rgba(" + sk.body + "," + (0.16 * k.glow) + ")");
    glow.addColorStop(1, "rgba(" + sk.body + ",0)");
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(0, 0, L * 0.95, 0, 7); ctx.fill();

    // flowing double-lobed tail (behind the body)
    var sw = reduce ? 0 : Math.sin(t * 0.12 + k.wob) * 0.6;
    ctx.fillStyle = "rgba(" + sk.fin + ",0.24)";
    ctx.beginPath();
    ctx.moveTo(-L * 0.42, 0);
    ctx.quadraticCurveTo(-L * 0.72, -L * 0.10 + sw * 6, -L * 0.98, -L * 0.30 + sw * 12);
    ctx.quadraticCurveTo(-L * 0.66, -L * 0.06 + sw * 5, -L * 0.60, 0);
    ctx.quadraticCurveTo(-L * 0.66, L * 0.06 + sw * 5, -L * 0.98, L * 0.30 + sw * 12);
    ctx.quadraticCurveTo(-L * 0.72, L * 0.10 + sw * 6, -L * 0.42, 0);
    ctx.closePath();
    ctx.fill();

    // pelvic/side fins that flutter as it swims
    var fin = reduce ? 0 : Math.sin(t * 0.16 + k.wob) * 0.5;
    ctx.fillStyle = "rgba(" + sk.fin + ",0.20)";
    ctx.beginPath();
    ctx.moveTo(-L * 0.02, L * 0.16);
    ctx.quadraticCurveTo(-L * 0.24, L * 0.40 + fin * 6, -L * 0.34, L * 0.20);
    ctx.quadraticCurveTo(-L * 0.20, L * 0.16, -L * 0.02, L * 0.16);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-L * 0.02, -L * 0.16);
    ctx.quadraticCurveTo(-L * 0.24, -L * 0.40 - fin * 6, -L * 0.34, -L * 0.20);
    ctx.quadraticCurveTo(-L * 0.20, -L * 0.16, -L * 0.02, -L * 0.16);
    ctx.fill();

    // body: a rounder teardrop with a bright core and soft edge
    var g = ctx.createLinearGradient(-L * 0.45, 0, L * 0.55, 0);
    g.addColorStop(0, "rgba(" + sk.body + ",0)");
    g.addColorStop(0.35, "rgba(" + sk.body + ",0.85)");
    g.addColorStop(0.72, "rgba(" + sk.edge + ",0.95)");
    g.addColorStop(1, "rgba(" + sk.edge + ",0.7)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(L * 0.55, 0);
    ctx.quadraticCurveTo(L * 0.32, -L * 0.30, -L * 0.06, -L * 0.26);
    ctx.quadraticCurveTo(-L * 0.42, -L * 0.20, -L * 0.46, 0);
    ctx.quadraticCurveTo(-L * 0.42, L * 0.20, -L * 0.06, L * 0.26);
    ctx.quadraticCurveTo(L * 0.32, L * 0.30, L * 0.55, 0);
    ctx.closePath();
    ctx.fill();

    // dorsal fin along the top ridge
    ctx.fillStyle = "rgba(" + sk.fin + ",0.28)";
    ctx.beginPath();
    ctx.moveTo(L * 0.16, -L * 0.24);
    ctx.quadraticCurveTo(L * 0.02, -L * 0.44 - fin * 4, -L * 0.14, -L * 0.24);
    ctx.quadraticCurveTo(0, -L * 0.22, L * 0.16, -L * 0.24);
    ctx.fill();

    // a faint eye for a little life
    ctx.fillStyle = "rgba(20,26,40,0.5)";
    ctx.beginPath(); ctx.arc(L * 0.34, -L * 0.06, L * 0.035, 0, 7); ctx.fill();

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
    if (!document.hidden && !reduce) raf = requestAnimationFrame(step);
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
    // pause the koi loop while the pond is scrolled out of view (big win on the long hub)
    if (!reduce && "IntersectionObserver" in window) {
      var pondVis = true;
      new IntersectionObserver(function (es) {
        var vis = es[0].isIntersecting;
        if (vis && !pondVis) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
        else if (!vis && pondVis) { cancelAnimationFrame(raf); }
        pondVis = vis;
      }, { threshold: 0 }).observe(pond);
    }
    pond.addEventListener("click", function (e) {
      if (e.target.closest(".pv-draw")) return; // button handles its own
      var r = pond.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      ripple(x, y); nudgeKoiToward(x, y);
      pond.classList.add("is-drawn");
      drawPond();
    });
  }
  if (drawBtn) drawBtn.addEventListener("click", function () {
    pond.classList.add("is-drawn");
    if (ctx) ripple(W * (0.3 + Math.random() * 0.4), H * (0.3 + Math.random() * 0.4));
    drawPond();
  });

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

  /* ---------- filter bar: manual toggle + auto-collapse on scroll ----------
     The sticky bar is tall enough to hide cards once scrolled, so it collapses
     to just its header row. Two independent signals drive that:
       .is-collapsed  the reader tapped the toggle (their explicit choice)
       .is-compact    auto: they scrolled down past the bar's sticky point
     A manual toggle is honored (userSet) until they return to the very top,
     where auto takes back over. The scroll handler is rAF-throttled. */
  (function () {
    var controls = document.querySelector(".pv-controls");
    var toggle = document.getElementById("pvFilterToggle");
    if (!controls) return;

    var userSet = false; // has the reader made an explicit choice this scroll session

    // "open" means the body is visible: neither collapse signal is set
    function isOpen() {
      return !controls.classList.contains("is-collapsed") && !controls.classList.contains("is-compact");
    }
    function setOpen(open) {
      controls.classList.toggle("is-collapsed", !open);
      if (open) controls.classList.remove("is-compact");
      if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (toggle) toggle.addEventListener("click", function () {
      userSet = true;
      setOpen(!isOpen());
    });

    // auto: collapse to the header once the reader scrolls below the bar's top
    var ticking = false;
    function evaluate() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var top = 0;
      try { top = controls.getBoundingClientRect().top + y; } catch (e) {}
      var stickTop = 56; // matches .pv-controls top offset
      if (y <= Math.max(0, top - stickTop - 8)) {
        // back at/above the bar's resting place: auto takes over again
        userSet = false;
        controls.classList.remove("is-compact", "is-collapsed");
        if (toggle) toggle.setAttribute("aria-expanded", "true");
        return;
      }
      if (userSet) return; // respect the reader's explicit choice while scrolled
      // scrolled down and no manual override: compact it so the grid shows
      controls.classList.add("is-compact");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      if (window.requestAnimationFrame) requestAnimationFrame(evaluate);
      else setTimeout(evaluate, 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    evaluate();
  })();

  /* ---------- background starfield behind the whole page ---------- */
  (function () {
    var cv = document.getElementById("sky"); if (!cv || !cv.getContext) return;
    var x = cv.getContext("2d");
    function sz() { cv.width = innerWidth; cv.height = innerHeight; }
    sz(); addEventListener("resize", sz);
    var n = reduce ? 28 : 56;
    var st = Array.from({ length: n }, function () { return { x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.2 + 0.2, a: Math.random(), s: Math.random() * 0.02 + 0.004 }; });
    (function f() {
      x.clearRect(0, 0, cv.width, cv.height);
      for (var i = 0; i < st.length; i++) { var s = st[i]; if (!reduce) s.a += s.s; var al = 0.25 + Math.abs(Math.sin(s.a)) * 0.5; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fillStyle = "rgba(245,236,210," + al + ")"; x.fill(); }
      if (!document.hidden && !reduce) requestAnimationFrame(f);
    })();
  })();
})();
