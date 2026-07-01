/* ============================================================
   THE PRIMAL ORACLE — game.js
   A tasteful, celestial collection layer. Self-contained.
   Exposes window.GAME. Requires no other script; load after DOM.
   Storage key "po_game" = {seen:[{slug,name,at}], celebrated:{}}.
   Reads (never writes) "primal_oracle_v1" to sense rites/share.
   ============================================================ */

(function () {
  "use strict";

  var TOTAL = 144;
  var KEY   = "po_game";
  var ORACLE_KEY = "primal_oracle_v1";

  /* ---------- safe storage ---------- */
  function readGame() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function writeGame(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }
  function readOracle() {
    try { return JSON.parse(localStorage.getItem(ORACLE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function ensure(s) {
    if (!s || typeof s !== "object") s = {};
    if (!Array.isArray(s.seen)) s.seen = [];
    if (!s.celebrated || typeof s.celebrated !== "object") s.celebrated = {};
    return s;
  }

  var reduced = false;
  try {
    reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  /* ---------- minimal, self-injected CSS ---------- */
  function injectCSS() {
    if (document.getElementById("pg-style")) return;
    var css =
      "#pg-canvas{position:fixed;inset:0;z-index:9998;pointer-events:none}" +
      "#pg-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(30px);" +
        "z-index:9999;background:linear-gradient(180deg,#1b1e33,#10121f);" +
        "border:1px solid var(--brass,#9a7c3b);border-radius:12px;padding:12px 20px;" +
        "display:flex;flex-direction:column;gap:2px;align-items:flex-start;max-width:min(88vw,360px);" +
        "opacity:0;pointer-events:none;transition:opacity .35s ease,transform .35s ease;" +
        "box-shadow:0 20px 50px rgba(0,0,0,.45)}" +
      "#pg-toast.pg-show{opacity:1;transform:translateX(-50%) translateY(0)}" +
      "#pg-toast .pg-t{font-family:var(--serif,Georgia,serif);color:var(--moon,#f5ecd2);font-size:1.05rem;line-height:1.2}" +
      "#pg-toast .pg-s{color:var(--brass-bright,#efe2b4);font-size:.84rem;line-height:1.3}" +
      ".pg-collection{font-family:var(--sans,system-ui,sans-serif);color:var(--body,#413b2c)}" +
      ".pg-collection .pg-count{font-family:var(--serif,Georgia,serif);color:var(--moon,#2b2518);" +
        "font-size:1.15rem;letter-spacing:.2px}" +
      ".pg-collection .pg-count b{color:var(--brass,#9a7c3b);font-weight:600}" +
      ".pg-collection .pg-recent{margin-top:6px;font-size:.9rem;color:var(--muted,#6f6853)}" +
      ".pg-collection .pg-recent a{color:var(--brass-bright,#7a5f22)}" +
      "@media (prefers-reduced-motion: reduce){#pg-toast{transition:opacity .2s ease}}";
    var el = document.createElement("style");
    el.id = "pg-style";
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  /* ---------- toast ---------- */
  var toastTimer = null;
  function ensureToast() {
    var t = document.getElementById("pg-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "pg-toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    return t;
  }
  function toast(title, sub) {
    try {
      injectCSS();
      var t = ensureToast();
      t.innerHTML = "";
      var a = document.createElement("div");
      a.className = "pg-t";
      a.textContent = title || "";
      t.appendChild(a);
      if (sub) {
        var b = document.createElement("div");
        b.className = "pg-s";
        b.textContent = sub;
        t.appendChild(b);
      }
      // reflow so re-triggering animates
      void t.offsetWidth;
      t.classList.add("pg-show");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { t.classList.remove("pg-show"); }, 3200);
    } catch (e) {}
  }

  /* ---------- celebrate: soft ring + gold/ivory sparks ---------- */
  function celebrate(opts) {
    opts = opts || {};
    if (opts.text) toast(opts.text, opts.sub || "");

    if (reduced) return; // reduced-motion: toast only, no burst

    try {
      injectCSS();
      var cv = document.createElement("canvas");
      cv.id = "pg-canvas";
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = window.innerWidth, H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      document.body.appendChild(cv);
      var ctx = cv.getContext("2d");
      ctx.scale(dpr, dpr);

      var cx = W / 2, cy = H * 0.42;
      var colors = ["#efe2b4", "#d6c18c", "#9a7c3b", "#f6f1e6", "#fffaf0"];
      var N = 46;
      var parts = [];
      for (var i = 0; i < N; i++) {
        var ang = (Math.PI * 2 * i) / N + Math.random() * 0.3;
        var sp = 2.6 + Math.random() * 4.4;
        parts.push({
          x: cx, y: cy,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 1.2,
          r: 1.2 + Math.random() * 2.2,
          c: colors[(Math.random() * colors.length) | 0],
          life: 0
        });
      }

      var DUR = 1200;
      var start = null;

      function frame(ts) {
        if (start == null) start = ts;
        var t = ts - start;
        var k = t / DUR;              // 0..1
        if (k >= 1) { cleanup(); return; }
        ctx.clearRect(0, 0, W, H);

        // soft expanding ring
        var ringR = 8 + k * 120;
        var ringA = Math.max(0, 1 - k) * 0.55;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(214,193,140," + ringA + ")";
        ctx.lineWidth = 2;
        ctx.stroke();

        // gentle inner glow ring
        ctx.beginPath();
        ctx.arc(cx, cy, ringR * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(245,236,210," + (ringA * 0.6) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();

        // sparks
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          p.vy += 0.06;            // faint gravity
          p.vx *= 0.985; p.vy *= 0.985;
          p.x += p.vx; p.y += p.vy;
          var a = Math.max(0, 1 - k) * (0.7 + Math.abs(Math.sin(k * 6 + i)) * 0.3);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = hexA(p.c, a);
          ctx.fill();
        }
        raf = window.requestAnimationFrame(frame);
      }

      var raf = window.requestAnimationFrame(frame);
      var kill = setTimeout(cleanup, DUR + 200);

      function cleanup() {
        try { window.cancelAnimationFrame(raf); } catch (e) {}
        try { clearTimeout(kill); } catch (e) {}
        if (cv && cv.parentNode) cv.parentNode.removeChild(cv);
      }
    } catch (e) {}
  }

  function hexA(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var r = parseInt(h.substr(0,2),16),
        g = parseInt(h.substr(2,2),16),
        b = parseInt(h.substr(4,2),16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  /* ---------- discovered ---------- */
  function slugify(s) {
    return String(s || "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function discovered(slug, name) {
    var s = ensure(readGame());
    slug = slug || slugify(name);
    if (!slug) return s.seen.length;
    var exists = false;
    for (var i = 0; i < s.seen.length; i++) {
      if (s.seen[i].slug === slug) { exists = true; break; }
    }
    if (!exists) {
      s.seen.unshift({ slug: slug, name: name || slug, at: Date.now() });
      writeGame(s);
      // View layer hook (meter.js). Backward compatible: dispatch after a
      // successful discovery write so the awakening meter repaints live.
      try { window.dispatchEvent(new CustomEvent("po:awaken")); } catch (e) {}
    }
    // recompute badges (may fire a milestone), then return total
    evaluate(s);
    return s.seen.length;
  }

  function count() {
    return ensure(readGame()).seen.length;
  }

  /* ---------- badges / milestones ---------- */
  // Each: id, test(game, oracle) -> bool, title, sub (initiation copy)
  var BADGES = [
    { id: "first_animal",
      title: "First animal",
      sub: "You have met your first animal. The pattern begins.",
      test: function (g) { return g.seen.length >= 1; } },
    { id: "three_discovered",
      title: "Three discovered",
      sub: "You have met three animals. The pattern begins to show.",
      test: function (g) { return g.seen.length >= 3; } },
    { id: "first_match",
      title: "First match tested",
      sub: "You have weighed two skies against each other.",
      test: function (g, o) { return !!(o.rites && o.rites.match); } },
    { id: "first_circle",
      title: "First circle",
      sub: "Your circle takes shape. You are not reading alone.",
      test: function (g, o) {
        var n = (o.recent && o.recent.length) || 0;
        return g.seen.length >= 2 || n >= 2;
      } },
    { id: "shared_oracle",
      title: "Shared the Oracle",
      sub: "You have passed the Oracle onward. It travels now.",
      test: function (g, o) { return !!(o.rites && o.rites.shared); } },
    { id: "ten_animals",
      title: "Ten animals",
      sub: "You have met ten animals. You begin to see the whole wheel.",
      test: function (g) { return g.seen.length >= 10; } }
  ];

  // Returns the earned list (array of {id,title,sub,earned}).
  function badges() {
    var g = ensure(readGame());
    var o = readOracle();
    return BADGES.map(function (b) {
      var earned = false;
      try { earned = !!b.test(g, o); } catch (e) {}
      return { id: b.id, title: b.title, sub: b.sub, earned: earned };
    });
  }

  // Evaluate and celebrate any newly earned badge exactly once.
  function evaluate(g) {
    g = ensure(g || readGame());
    var o = readOracle();
    var changed = false;
    for (var i = 0; i < BADGES.length; i++) {
      var b = BADGES[i];
      var earned = false;
      try { earned = !!b.test(g, o); } catch (e) {}
      if (earned && !g.celebrated[b.id]) {
        g.celebrated[b.id] = Date.now();
        changed = true;
        // stagger so several earned at once don't stack on one frame
        (function (badge, order) {
          setTimeout(function () {
            celebrate({ text: badge.title, sub: badge.sub });
          }, 120 * order);
        })(b, i);
      }
    }
    if (changed) writeGame(g);
  }

  /* ---------- collection panel ---------- */
  function renderCollection() {
    var host;
    try { host = document.querySelector("[data-game-collection]"); }
    catch (e) { host = null; }
    if (!host) return;
    injectCSS();
    var g = ensure(readGame());
    var n = g.seen.length;
    host.classList.add("pg-collection");
    host.innerHTML = "";

    var line = document.createElement("div");
    line.className = "pg-count";
    if (n === 0) {
      line.innerHTML = "You have met <b>none</b> of the 144 animals yet. Begin with your own.";
    } else {
      line.innerHTML = "You have met <b>" + n + "</b> of " + TOTAL + " animals.";
    }
    host.appendChild(line);

    if (n > 0) {
      var recent = document.createElement("div");
      recent.className = "pg-recent";
      var few = g.seen.slice(0, 4);
      var links = few.map(function (a) {
        var s = a.slug || slugify(a.name);
        var nm = escapeHTML(a.name || s);
        return '<a href="animals/' + encodeURIComponent(s) + '/">' + nm + "</a>";
      });
      recent.innerHTML = "Most recent: " + links.join(", ") + ".";
      host.appendChild(recent);
    }
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    try {
      injectCSS();
      renderCollection();
      // evaluate on load so returning visitors see badges they earned
      // through the oracle (match, share) without a fresh discover.
      evaluate();
    } catch (e) {}
  }

  window.GAME = {
    discovered: discovered,
    celebrate: celebrate,
    toast: toast,
    count: count,
    badges: badges
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
