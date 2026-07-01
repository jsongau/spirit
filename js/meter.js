/* ============================================================
   THE PRIMAL ORACLE - meter.js
   A thin VIEW layer over window.GAME. Never a second source of
   truth. It reads the acts GAME already records (po_game.seen)
   and the rites the Oracle records (primal_oracle_v1.rites),
   computes a depth-weighted awakening fill, and paints it into
   every meter mount present on the page.

   Mounts painted (all optional, no-op when absent):
     #awakening-slot     the sticky rail slot on the homepage
     #home-dock-meter     the mobile dock companion
     .pn-orb[data-orb]    the compact nav orb on every page

   Ethics (hard requirements honored here):
     - fills ONLY from real acts, never from time
     - NEVER decays (it is a max of the acts done, monotonic)
     - NEVER gates the core reading (pure view, no gate)
     - no streak, no leaderboard, no share-to-unlock
     - NO birth date anywhere in the meter or any string built

   Storage is never assumed: every read is wrapped in try/catch
   with an in-memory fallback, so a blocked-storage iframe still
   shows a session-only meter.
   ============================================================ */

(function () {
  "use strict";

  var TOTAL = 144;

  /* ---------- reduced motion ---------- */
  var reduced = false;
  try {
    reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  /* ---------- in-memory fallback (blocked storage) ---------- */
  // Holds the best fill we have seen this session, so a meter in a
  // sandboxed iframe (where localStorage throws) still fills within
  // the session and never regresses.
  var mem = { fill: 0 };

  /* ---------- safe reads ---------- */
  function readGame() {
    try { return JSON.parse(localStorage.getItem("po_game")) || {}; }
    catch (e) { return {}; }
  }
  function readOracle() {
    try { return JSON.parse(localStorage.getItem("primal_oracle_v1")) || {}; }
    catch (e) { return {}; }
  }
  function seenCount() {
    // Prefer GAME.count() (single source of truth); fall back to a
    // direct read only if GAME is not present yet.
    try {
      if (window.GAME && typeof GAME.count === "function") return GAME.count();
    } catch (e) {}
    try {
      var g = readGame();
      return Array.isArray(g.seen) ? g.seen.length : 0;
    } catch (e) { return 0; }
  }
  function rites() {
    var o = readOracle();
    var r = (o && o.rites) || {};
    return {
      revealed: !!r.revealed,
      read:     !!r.read,
      stones:   !!r.stones,
      match:    !!r.match,
      shared:   !!r.shared,
      returned: !!r.returned
    };
  }

  /* ---------- the model ----------
     Depth acts (the substantive readings that differentiate the
     site) are worth more than breadth (opening a neighbour). The
     reveal is the endowed start: on its own it lifts the meter to
     the first tier boundary, so a new visitor reads as Stirring,
     never a blank Sleeper.

     Weights sum to 0.82 for the six rites; the remaining 0.18 is
     the breadth contribution from widening the menagerie, so the
     ceiling is exactly 1.0.
  */
  var RITE_WEIGHT = {
    revealed: 0.26,  // the endowed gift: reveal alone reaches Stirring
    read:     0.22,  // the five gates, a depth act
    stones:   0.10,  // receive your keeper stones
    match:    0.12,  // read a bond
    shared:   0.08,  // pass the Oracle onward (capped low, never required)
    returned: 0.04   // returned on a new day (honest, no streak pressure)
  };
  var BREADTH_MAX = 0.18;

  // The nearest unfinished door, surfaced in .spirit-next. Order is
  // the natural path of understanding. Each line is real, unread
  // content the visitor genuinely has not opened yet.
  var DOORS = [
    { id: "revealed", copy: "Begin by naming your animal" },
    { id: "read",     copy: "Next, read your five gates" },
    { id: "stones",   copy: "Next, receive your keeper stones" },
    { id: "match",    copy: "Next, test a match" },
    { id: "shared",   copy: "Next, pass the Oracle onward" },
    { id: "returned", copy: "Next, return on a new day" }
  ];

  // The four tiers by fill threshold.
  var TIERS = [
    { id: "sleeper",  name: "Sleeper",  min: 0.00 },
    { id: "stirring", name: "Stirring", min: 0.26 },
    { id: "waking",   name: "Waking",   min: 0.55 },
    { id: "awakened", name: "Awakened", min: 0.85 }
  ];

  function tierFor(fill) {
    var t = TIERS[0];
    for (var i = 0; i < TIERS.length; i++) {
      if (fill >= TIERS[i].min) t = TIERS[i];
    }
    return t;
  }

  function nextDoor(r, fill) {
    for (var i = 0; i < DOORS.length; i++) {
      if (!r[DOORS[i].id]) return DOORS[i].copy;
    }
    // Every rite done. If breadth can still grow, invite it; else rest.
    if (fill < 1) return "Widen the menagerie, meet a new crossing";
    return "The eye is open. Every sky agrees on you.";
  }

  // Compute the current awakening state as a plain object.
  function compute() {
    var r = rites();
    var depth = 0;
    for (var k in RITE_WEIGHT) {
      if (RITE_WEIGHT.hasOwnProperty(k) && r[k]) depth += RITE_WEIGHT[k];
    }
    var seen = seenCount();
    // Breadth beyond your own first animal, gently capped.
    var extra = Math.max(0, seen - 1);
    var breadth = Math.min(BREADTH_MAX, (extra / (TOTAL - 1)) * BREADTH_MAX);

    var fill = Math.min(1, depth + breadth);

    // Monotonic within a session even if storage is denied.
    if (fill < mem.fill) fill = mem.fill;
    mem.fill = fill;

    var awake = r.revealed || seen > 0 || fill > 0;
    var tier = tierFor(fill);
    var valuenow = Math.round(fill * TOTAL);

    return {
      fill: fill,
      awake: awake,
      tier: tier,
      seen: seen,
      valuenow: valuenow,
      next: nextDoor(r, fill)
    };
  }

  /* ---------- painting ---------- */

  function setFill(el, fill) {
    // Under reduced motion the CSS transition is already suppressed by
    // the stylesheet; setting the property is instant either way. We
    // simply set it; no JS animation loop is ever run.
    el.style.setProperty("--awaken", fill.toFixed(4));
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;",
               '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Full mounts: the rail slot and the mobile dock.
  function paintFull(mount, st) {
    if (!mount) return;
    var beginBlock = st.awake ? "" :
      '<p class="spirit-begin">Begin your awakening</p>';

    mount.innerHTML =
      '<div class="spirit-meter" data-tier="' + st.tier.id + '"' +
        ' data-state="' + (st.awake ? "awake" : "asleep") + '"' +
        ' role="progressbar" aria-valuemin="0" aria-valuemax="' + TOTAL + '"' +
        ' aria-valuenow="' + st.valuenow + '"' +
        ' aria-label="Your awakening"' +
        ' style="--awaken:' + st.fill.toFixed(4) + '">' +
        '<div class="spirit-orb" aria-hidden="true"></div>' +
        '<p class="spirit-count">' + st.seen + ' of ' + TOTAL + ' met</p>' +
        '<p class="spirit-tier">' + esc(st.tier.name) + '</p>' +
        '<p class="spirit-next">' + esc(st.next) + '</p>' +
        beginBlock +
      '</div>';
    // Ensure the fill var is live on the meter node too (belt and braces).
    var meterEl = mount.firstChild;
    if (meterEl && meterEl.style) setFill(meterEl, st.fill);
  }

  // Compact mount: the nav orb. Render only a mini orb, and un-hide
  // the .pn-orb (remove hidden) once JS runs, so JS-off shows nothing.
  function paintOrb(orb, st) {
    if (!orb) return;
    var label = "Awakening, tier " + st.tier.name;
    orb.innerHTML =
      '<span class="spirit-orb spirit-orb--mini" role="progressbar"' +
        ' aria-valuemin="0" aria-valuemax="' + TOTAL + '"' +
        ' aria-valuenow="' + st.valuenow + '"' +
        ' aria-label="' + esc(label) + '"' +
        ' data-tier="' + st.tier.id + '"' +
        ' data-state="' + (st.awake ? "awake" : "asleep") + '"' +
        ' style="--awaken:' + st.fill.toFixed(4) + '"></span>';
    orb.removeAttribute("hidden");
    orb.setAttribute("aria-hidden", "false");
  }

  function paint() {
    var st;
    try { st = compute(); }
    catch (e) { return; }

    try { paintFull(document.getElementById("awakening-slot"), st); } catch (e) {}
    try { paintFull(document.getElementById("home-dock-meter"), st); } catch (e) {}

    try {
      var orbs = document.querySelectorAll(".pn-orb[data-orb]");
      for (var i = 0; i < orbs.length; i++) {
        try { paintOrb(orbs[i], st); } catch (e) {}
      }
    } catch (e) {}
  }

  /* ---------- live repaint ---------- */
  // Repaint when a real act fires. We listen for the awakening event
  // GAME dispatches after a discovery, the reveal and share events the
  // home / app layer dispatch, and the cross-tab storage event.
  var LISTEN = ["po:awaken", "po:reveal", "po:shared", "po:revealed",
                "po:discovered", "po:awakened", "storage"];
  LISTEN.forEach(function (name) {
    try { window.addEventListener(name, paint); } catch (e) {}
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", paint);
  } else {
    paint();
  }

  /* ---------- public, read-only view API ---------- */
  window.METER = {
    paint: paint,
    // fill: current awakening measure 0..1
    fill: function () { try { return compute().fill; } catch (e) { return 0; } },
    // state: the full computed view object
    state: function () { try { return compute(); } catch (e) { return null; } }
  };
})();
