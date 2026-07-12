/* ============================================================
   constellation.js — Catch-144, Phase 1 (guest-only, no backend)
   Canon (docs/catch-144/00-MASTER-BUILD-PLAN.md):
     · a Wisp surfaces on an animal page → you Still it → it is kept
       → a star lights in Your Constellation.
     · seen != kept. A star lights ONLY on a deliberate Still, in its
       own key: zodi_constellation. (game.js is not on v2 pages, so there
       is no auto-seen to fight and no second particle engine to duplicate.)
     · The animal pages are the business. Fixed-position (CLS 0), defer +
       idle, never on the critical path. First read is never hijacked:
       a first-time visitor gets a quiet dock, not the overlay.
   Zero Pokemon trade dress: no sphere, no throw, no shake-suspense.
   Vanilla IIFE, self-injected CSS, reduced-motion honored.
   ============================================================ */
(function () {
  'use strict';
  if (window.CONSTELLATION) return;

  var KEY = 'zodi_constellation';
  var TOTAL = 144;
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MILESTONES = [
    [1, 'First Kindling'], [10, 'Waking Sky'], [50, 'Turning Wheel'],
    [100, 'Nearly Whole'], [144, 'The Whole Wheel']
  ];

  /* ---------- storage ---------- */
  function read() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); if (!o || typeof o !== 'object') o = {}; if (!o.kept) o.kept = {}; return o; }
    catch (e) { return { kept: {} }; }
  }
  function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); return true; } catch (e) { return false; } }
  function count(o) { return Object.keys((o || read()).kept).length; }
  function has(slug, o) { return !!(o || read()).kept[slug]; }
  function keep(slug) {
    var o = read();
    if (o.kept[slug]) return { o: o, isNew: false, n: count(o) };
    o.kept[slug] = Date.now(); o.ret = true; write(o);
    return { o: o, isNew: true, n: count(o) };
  }
  function isOff() { return read().off === true; }
  function setOff(v) { var o = read(); o.off = !!v; write(o); }
  function markReturning() { var o = read(); if (!o.ret) { o.ret = true; write(o); } }

  function brass() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--brass').trim();
    return v || '#cbb279';
  }

  /* ---------- self-injected CSS ---------- */
  function injectCSS() {
    if (document.getElementById('cx-style')) return;
    var s = document.createElement('style');
    s.id = 'cx-style';
    s.textContent = [
      '#cx-node{position:fixed;width:140px;height:140px;z-index:9990;display:grid;place-items:center;opacity:0;transition:opacity .4s ease;pointer-events:none}',
      '#cx-node.on{opacity:1;pointer-events:auto}',
      '#cx-node canvas{position:absolute;inset:0;width:100%;height:100%}',
      '#cx-ring{position:absolute;inset:2px;pointer-events:none}',
      '#cx-ring circle{fill:none;stroke:var(--brass,#cbb279);stroke-width:1.25;opacity:0;stroke-dasharray:427;stroke-dashoffset:427;transform:rotate(-90deg);transform-origin:50% 50%}',
      '#cx-sig{position:absolute;width:92px;height:92px;opacity:0;transform:scale(.9);pointer-events:none}',
      '#cx-sig svg{width:100%;height:100%}',
      '#cx-node button{position:absolute;inset:0;background:none;border:0;border-radius:50%;cursor:pointer;padding:0}',
      '#cx-node button:focus-visible{outline:2px solid var(--brass,#cbb279);outline-offset:6px;border-radius:50%}',
      '#cx-node .rm{display:none}',
      '#cx-sparks{position:fixed;z-index:9998;pointer-events:none}',
      '#cx-toast{position:fixed;left:50%;bottom:1.6rem;transform:translate(-50%,14px);z-index:9999;max-width:min(92vw,540px);background:var(--panel,#1a1c30);border:1px solid color-mix(in oklab,var(--brass,#cbb279) 34%,transparent);border-radius:16px;padding:.7rem 1rem;opacity:0;transition:opacity .4s ease,transform .4s ease;font-family:var(--sans,system-ui,sans-serif);color:var(--ivory,#ebe8de);font-size:.92rem;line-height:1.4;box-shadow:0 10px 40px rgba(0,0,0,.45)}',
      '#cx-toast.in{opacity:1;transform:translate(-50%,0)}',
      '#cx-toast .cx-head{display:flex;gap:.6em;align-items:baseline}',
      '#cx-toast .star{color:var(--brass-bright,#e8d9ae)}',
      '#cx-toast .mile{font-family:var(--mono,monospace);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--brass,#cbb279)}',
      '#cx-toast .lose{display:block;color:var(--muted,#a9aaba);font-size:.82rem;margin-top:.35em}',
      '#cx-toast .cta{display:inline-flex;gap:.5em;margin-top:.6em;font-family:var(--mono,monospace);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--brass,#cbb279);text-decoration:none;border-bottom:1px solid color-mix(in oklab,var(--brass,#cbb279) 40%,transparent);padding-bottom:1px}',
      '#cx-dock{position:fixed;left:1rem;bottom:1rem;z-index:9990;display:inline-flex;align-items:center;gap:.5em;background:var(--panel,#1a1c30);border:1px solid color-mix(in oklab,var(--brass,#cbb279) 30%,transparent);color:var(--ivory,#ebe8de);border-radius:999px;padding:.5em .95em;font-family:var(--mono,monospace);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;opacity:0;transform:translateY(8px);transition:opacity .4s,transform .4s,border-color .2s;box-shadow:0 8px 30px rgba(0,0,0,.4)}',
      '#cx-dock.on{opacity:1;transform:translateY(0)}',
      '#cx-dock:hover{border-color:var(--brass,#cbb279)}',
      '#cx-dock .star{color:var(--brass-bright,#e8d9ae);font-size:1em}',
      /* menagerie */
      '.cx-band{margin:0 0 1.1rem;padding:1rem 1.15rem;border:1px solid color-mix(in oklab,var(--brass,#cbb279) 22%,transparent);border-radius:14px;background:color-mix(in oklab,var(--panel,#1a1c30) 70%,transparent);font-family:var(--sans,system-ui,sans-serif)}',
      '.cx-band h3{margin:0 0 .5rem;font-family:var(--mono,monospace);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted,#a9aaba);display:flex;justify-content:space-between;align-items:center}',
      '.cx-band .rest{font:inherit;font-family:var(--mono,monospace);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--brass,#cbb279);background:none;border:1px solid color-mix(in oklab,var(--brass,#cbb279) 30%,transparent);border-radius:999px;padding:.3em .8em;cursor:pointer}',
      '.cx-count{font-family:var(--serif,Georgia,serif);font-size:1.5rem;color:var(--ivory,#ebe8de);line-height:1}',
      '.cx-count b{color:var(--brass-bright,#e8d9ae)}',
      '.cx-bar{height:6px;border-radius:999px;background:var(--field,#0b0c15);margin:.6rem 0 .5rem;overflow:hidden}',
      '.cx-bar i{display:block;height:100%;background:var(--brass,#cbb279);border-radius:999px;transition:width .6s ease}',
      '.cx-lose{color:var(--muted,#a9aaba);font-size:.85rem;line-height:1.5;margin:.3rem 0 0}',
      '#grid.cx-mode .beast{opacity:.32;transition:opacity .3s,filter .3s;filter:grayscale(.4)}',
      '#grid.cx-mode .beast.cx-kept{opacity:1;filter:none;box-shadow:inset 0 0 0 1px color-mix(in oklab,var(--brass,#cbb279) 60%,transparent)}',
      '#cx-toggle{font-family:var(--mono,monospace);font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:var(--brass,#cbb279);background:none;border:1px solid color-mix(in oklab,var(--brass,#cbb279) 30%,transparent);border-radius:999px;padding:.45em 1em;cursor:pointer;margin:0 0 1rem}',
      '#cx-toggle.act{background:color-mix(in oklab,var(--brass,#cbb279) 14%,transparent);border-color:var(--brass,#cbb279)}',
      '@media (prefers-reduced-motion:reduce){#cx-node canvas{display:none}#cx-node{transition:none}#cx-node .rm{display:block;position:absolute;left:50%;top:100%;transform:translateX(-50%);white-space:nowrap;padding-top:.4em;font-family:var(--mono,monospace);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--brass,#cbb279)}}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ---------- shared toast + celebrate ---------- */
  var toastEl, toastTimer;
  function toast(inner, hold) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'cx-toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = inner;
    requestAnimationFrame(function () { toastEl.classList.add('in'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('in'); }, hold || 6000);
  }
  function burst(cx, cy) {
    if (RM) return;
    var W = 260, dpr = Math.min(devicePixelRatio || 1, 2);
    var c = document.createElement('canvas'); c.id = 'cx-sparks';
    c.width = W * dpr; c.height = W * dpr; c.style.width = c.style.height = W + 'px';
    c.style.left = (cx - W / 2) + 'px'; c.style.top = (cy - W / 2) + 'px';
    document.body.appendChild(c);
    var k = c.getContext('2d'); k.scale(dpr, dpr);
    var col = brass();
    var ps = []; for (var i = 0; i < 16; i++) ps.push({ a: i / 16 * Math.PI * 2 + Math.random() * .3, v: 36 + Math.random() * 42, r: .8 + Math.random() * 1.2, gold: Math.random() < .7 });
    var t0 = performance.now();
    (function f(now) {
      var t = (now - t0) / 700;
      if (t >= 1) { c.remove(); return; }
      k.clearRect(0, 0, W, W);
      var e = 1 - Math.pow(1 - t, 3);
      k.beginPath(); k.arc(W / 2, W / 2, 18 + 84 * e, 0, 6.2832); k.strokeStyle = col; k.globalAlpha = .32 * (1 - t); k.lineWidth = 1.2; k.stroke();
      for (var j = 0; j < ps.length; j++) { var p = ps[j], d = p.v * e; k.beginPath(); k.arc(W / 2 + Math.cos(p.a) * d, W / 2 + Math.sin(p.a) * d - 8 * t, p.r * (1 - t * .5), 0, 6.2832); k.fillStyle = p.gold ? col : '#ebe8de'; k.globalAlpha = .8 * (1 - t); k.fill(); }
      k.globalAlpha = 1; requestAnimationFrame(f);
    })(t0);
  }

  /* ---------- the commit copy (zodi voice: stakes, never a paywall) ---------- */
  function commitToast(name, n) {
    var mile = null; for (var i = 0; i < MILESTONES.length; i++) if (MILESTONES[i][0] === n) mile = MILESTONES[i][1];
    var head = '<div class="cx-head"><span class="star" aria-hidden="true">✦</span><span>Stilled. ' + esc(name) + ' joins your constellation. <b>' + n + '</b>&#8202;/&#8202;' + TOTAL + '</span></div>';
    var body = '';
    if (mile) head = '<div class="cx-head"><span class="mile">' + mile + '</span></div>' + '<div style="margin-top:.3em">' + esc(name) + ' makes ' + n + ' stilled.</div>';
    // loss-warning from catch #1; the stronger stake at #5
    if (n >= 5) {
      body = '<span class="lose">' + n + ' reflections, and every one lives in this browser alone. Keep a free account and they hold, on every device.</span>'
        + '<a class="cta" href="/account.html">Keep my constellation</a>';
    } else if (n >= 1) {
      body = '<span class="lose">Kept here in this browser for now. An account will keep them anywhere.</span>';
    }
    toast(head + body, n >= 5 ? 9000 : 6000);
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ============================================================
     ANIMAL PAGE — the Wisp
     ============================================================ */
  function animalPage(slug, name) {
    if (isOff()) return;
    if (has(slug)) return;                       // already kept — no spawn
    var anchor = document.querySelector('.pf-hero__art');
    if (!anchor) return;
    injectCSS();                                 // styles for both dock and wisp

    // engaged (>=1 kept OR a returning visitor) gets the wisp; a true
    // first-timer gets a quiet dock so their first read is never hijacked.
    var o = read();
    var engaged = count(o) >= 1 || o.ret === true;
    markReturning();                             // next visit is engaged

    if (engaged) spawnWisp(slug, name, anchor);
    else spawnDock(slug, name, anchor);
  }

  function spawnDock(slug, name, anchor) {
    var d = document.createElement('button');
    d.id = 'cx-dock'; d.type = 'button';
    d.innerHTML = '<span class="star" aria-hidden="true">✦</span> Still the ' + esc(name);
    d.setAttribute('aria-label', 'A reflection of the ' + name + ' lingers. Activate to still it.');
    document.body.appendChild(d);
    requestAnimationFrame(function () { d.classList.add('on'); });
    d.addEventListener('click', function () { d.remove(); spawnWisp(slug, name, anchor, true); });
  }

  function spawnWisp(slug, name, anchor, immediate) {
    injectCSS();
    var node = document.createElement('div');
    node.id = 'cx-node';
    node.innerHTML =
      '<canvas aria-hidden="true"></canvas>' +
      '<svg id="cx-ring" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="68"/></svg>' +
      '<div id="cx-sig" aria-hidden="true"></div>' +
      '<button type="button" aria-label="A reflection of the ' + esc(name) + ' surfaces. Activate to still it."></button>' +
      '<span class="rm" aria-hidden="true">Still the reflection</span>';
    document.body.appendChild(node);
    var canvas = node.querySelector('canvas');
    var ring = node.querySelector('#cx-ring circle');
    var sigBox = node.querySelector('#cx-sig');
    var btn = node.querySelector('button');
    var sr = ensureSR();

    var DPR = Math.min(devicePixelRatio || 1, 2), SZ = 140;
    canvas.width = SZ * DPR; canvas.height = SZ * DPR;
    var g = canvas.getContext('2d'); g.scale(DPR, DPR);
    var col = brass();
    // procedural "unsettled points" (no inline sigil on v2 pages to read)
    var PTS = []; for (var i = 0; i < 9; i++) PTS.push({ tx: Math.random(), ty: Math.random(), a: Math.random() * 6.28, d: 16 + Math.random() * 26, w: .3 + Math.random() * .5 });

    var state = 'DRIFT', t0 = performance.now(), stillT = 0, cancelEase = 0, raf = 0, anchorPt = { x: 0, y: 0 };
    var eO = function (x) { return 1 - Math.pow(1 - x, 3); };

    function place() {
      var r = anchor.getBoundingClientRect();
      anchorPt.x = r.left + r.width / 2; anchorPt.y = r.top + r.height / 2;
      node.style.visibility = (r.bottom < -60 || r.top > innerHeight + 60) ? 'hidden' : 'visible';
    }
    var ticking = false;
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { place(); ticking = false; }); } }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', place);
    place();
    requestAnimationFrame(function () { node.classList.add('on'); });
    sr.textContent = 'A reflection of the ' + name + ' surfaces. Activate to still it.';

    function drawWater(now) {
      var t = (now - t0) / 1000; g.clearRect(0, 0, SZ, SZ);
      var calm = 0;
      if (state === 'STILL') calm = Math.min(1, (now - stillT) / 620);
      if (cancelEase > 0) calm = cancelEase;
      var amp = 1 - eO(calm), pulse = .5 + .5 * Math.sin(t * 6.2832 / 3.2);
      for (var i2 = 0; i2 < 3; i2++) { var r2 = 26 + i2 * 15 + Math.sin(t * 1.1 + i2 * 1.9) * 4 * amp; g.beginPath(); g.arc(SZ / 2, SZ / 2, r2, 0, 6.2832); g.strokeStyle = col; g.globalAlpha = amp * (.16 + .1 * pulse) * (1 - i2 * .26); g.lineWidth = 1; g.stroke(); }
      for (var j = 0; j < PTS.length; j++) { var p = PTS[j], sw = amp * p.d, x = SZ / 2 + (p.tx - .5) * 92 + Math.cos(p.a + t * p.w) * sw, y = SZ / 2 + (p.ty - .5) * 92 + Math.sin(p.a + t * p.w * 1.3) * sw; g.beginPath(); g.arc(x, y, 1.1, 0, 6.2832); g.fillStyle = col; g.globalAlpha = .35 + .45 * (1 - amp); g.fill(); }
      g.globalAlpha = 1;
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      var dx = 0, dy = 0;
      if (state === 'DRIFT') { var tt = (now - t0) / 1000; dx = Math.sin(tt * .9) * 10; dy = Math.sin(tt * 1.27) * 8; }
      node.style.left = (anchorPt.x - 70 + dx) + 'px'; node.style.top = (anchorPt.y - 70 + dy) + 'px';
      if (!RM) drawWater(now);
      if (cancelEase > 0) cancelEase = Math.max(0, cancelEase - .04);
      if (state === 'STILL') {
        var el = now - stillT; ring.style.opacity = .9; ring.style.strokeDashoffset = 427 * (1 - Math.min(1, el / 900));
        if (el >= 620) { var k2 = Math.min(1, (el - 620) / 280); sigBox.style.opacity = k2; sigBox.style.transform = 'scale(' + (.9 + .1 * k2) + ')'; canvas.style.opacity = 1 - k2; }
        if (el >= 900) commit(now);
      }
      if (state === 'RISE') {
        var e2 = now - stillT - 900, k3 = Math.min(1, e2 / 500);
        sigBox.style.transform = 'scale(1) translateY(' + (-24 * eO(k3)) + 'px)'; sigBox.style.opacity = 1 - k3;
        if (e2 >= 620) { teardown(); }
      }
    }
    function still() {
      if (state !== 'DRIFT') return;
      if (RM) { commit(performance.now()); return; }
      state = 'STILL'; stillT = performance.now();
      loadSigil(slug, sigBox);
    }
    function cancelStill() {
      if (state !== 'STILL' || performance.now() - stillT >= 900) return;
      state = 'DRIFT'; cancelEase = 1; ring.style.opacity = 0; ring.style.strokeDashoffset = 427; sigBox.style.opacity = 0; canvas.style.opacity = 1;
    }
    function commit(now) {
      if (state === 'RISE') return;
      state = 'RISE'; if (RM) stillT = now - 900;
      btn.disabled = true;
      anchor.classList.add('cx-kindled');
      setTimeout(function () { anchor.classList.remove('cx-kindled'); }, 900);
      var res = keep(slug);
      burst(anchorPt.x, anchorPt.y);
      commitToast(name, res.n);
      sr.textContent = name + ' is stilled. ' + res.n + ' of ' + TOTAL + ' in your constellation.';
      if (anchor.tabIndex < 0 || anchor.tabIndex === undefined) anchor.tabIndex = -1;
      try { anchor.focus({ preventScroll: true }); } catch (e) {}
      if (RM) { teardown(); }
    }
    function teardown() {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll); removeEventListener('resize', place);
      node.classList.remove('on'); setTimeout(function () { node.remove(); }, 420);
    }

    btn.addEventListener('click', still);
    var onKey = function (e) { if (e.key === 'Escape') cancelStill(); };
    addEventListener('keydown', onKey);
    raf = requestAnimationFrame(frame);
    if (immediate) { /* dock->wisp: user already acted, but still require the Still click */ }
    // expose for tests
    window.CONSTELLATION._still = still;
  }

  // fetch + inline the brass sigil for the reveal; silent fallback (just glow)
  function loadSigil(slug, box) {
    fetch('/img/sigils/' + slug + '.svg').then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (svg) {
        if (!svg || !/<svg/i.test(svg)) return;
        box.innerHTML = svg.replace(/<\?xml[\s\S]*?\?>/, '').replace(/role="img"/, 'role="presentation"');
      }).catch(function () {});
  }

  function ensureSR() {
    var el = document.getElementById('cx-sr');
    if (!el) { el = document.createElement('div'); el.id = 'cx-sr'; el.setAttribute('aria-live', 'polite'); el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap'; document.body.appendChild(el); }
    return el;
  }

  /* ============================================================
     MENAGERIE — Your Constellation view
     ============================================================ */
  function menagerie() {
    var grid = document.getElementById('grid');
    if (!grid) return;
    injectCSS();
    var toggle = document.createElement('button');
    toggle.id = 'cx-toggle'; toggle.type = 'button';
    toggle.textContent = '✦ Your constellation';
    grid.parentNode.insertBefore(toggle, grid);
    var band = null, on = false;
    toggle.addEventListener('click', function () {
      on = !on; toggle.classList.toggle('act', on);
      if (on) { render(); grid.classList.add('cx-mode'); }
      else { grid.classList.remove('cx-mode'); if (band) { band.remove(); band = null; } paint(false); }
    });
    function paint(mode) {
      var o = read(), cells = grid.querySelectorAll('.beast');
      for (var i = 0; i < cells.length; i++) { var s = cells[i].getAttribute('data-slug'); cells[i].classList.toggle('cx-kept', mode && !!o.kept[s]); }
    }
    function render() {
      var o = read(), n = count(o);
      if (!band) { band = document.createElement('div'); band.className = 'cx-band'; grid.parentNode.insertBefore(band, toggle.nextSibling); }
      var pct = Math.round(n / TOTAL * 100);
      band.innerHTML =
        '<h3><span>Your constellation</span>' + (n ? '<button class="rest" type="button">' + (o.off ? 'Wake the water' : 'Rest the water') + '</button>' : '') + '</h3>' +
        '<div class="cx-count"><b>' + n + '</b> / ' + TOTAL + ' stilled</div>' +
        '<div class="cx-bar"><i style="width:' + pct + '%"></i></div>' +
        (n ? '<p class="cx-lose">' + (n >= 1 ? 'These ' + n + ' live in this browser only. One free account and they follow you anywhere.' : '') + '</p>'
           : '<p class="cx-lose">No reflections stilled yet. Visit any animal and still the wisp that surfaces over its sigil.</p>');
      var rest = band.querySelector('.rest');
      if (rest) rest.addEventListener('click', function () { setOff(!isOff()); render(); });
      paint(true);
    }
  }

  /* ============================================================
     ACCOUNT PAGE — a small mirror of the saved constellation.
     zodi-auth.js migrates + hydrates localStorage on sign-in; we
     read that (and re-read on the zodi:constellation event it fires).
     ============================================================ */
  function accountCard(tries) {
    tries = tries || 0;
    var signedIn = false;
    try { signedIn = localStorage.getItem('zodi_signed_in') === '1'; } catch (e) {}
    if (!signedIn) { if (tries < 6) setTimeout(function () { accountCard(tries + 1); }, 1500); return; }
    var host = document.getElementById('zodi-dash-view');
    if (!host || document.getElementById('cx-acct')) return;
    injectCSS();
    var card = document.createElement('div'); card.id = 'cx-acct'; card.className = 'cx-band';
    function paint() {
      var n = count(), pct = Math.round(n / TOTAL * 100);
      card.innerHTML = '<h3><span>Your constellation</span></h3>' +
        '<div class="cx-count"><b>' + n + '</b> / ' + TOTAL + ' stilled</div>' +
        '<div class="cx-bar"><i style="width:' + pct + '%"></i></div>' +
        '<p class="cx-lose">Saved to your account. It follows you to every device you sign in on. ' +
        '<a href="/menagerie.html" style="color:var(--brass,#cbb279)">See the wheel</a></p>';
    }
    paint(); host.appendChild(card);
    addEventListener('zodi:constellation', paint);
  }

  /* ---------- boot ---------- */
  function boot() {
    var path = location.pathname;
    var m = path.match(/\/animals\/([a-z0-9-]+)\/?$/);
    if (m) {
      var h1 = document.querySelector('h1');
      animalPage(m[1], h1 ? h1.textContent.trim() : m[1]);
    } else if (document.getElementById('grid') && /menagerie/.test(path)) {
      menagerie();
    } else if (/account/.test(path) && document.getElementById('zodi-dash-view')) {
      accountCard(0);
    }
  }
  window.CONSTELLATION = { boot: boot, read: read, count: count, _still: null };
  if (document.readyState === 'complete') schedule();
  else addEventListener('load', schedule);
  function schedule() { if (window.requestIdleCallback) requestIdleCallback(boot, { timeout: 1400 }); else setTimeout(boot, 1200); }
})();
