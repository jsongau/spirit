/* ============================================================
   THE DAILY ORACLE — v5 floating panel (indexv5 only).

   Replaces the old "Path of Awakening" checklist floater with a
   once-a-day symbolic message. The third eye is the seal: closed
   until the visitor opens today's Oracle, then it parts and one
   short piece of animal wisdom lifts into view. The visitor either
   receives the message or releases it; both are honoured and
   recorded, and a new Oracle is promised for the next local day.

   Self-injects into #zodi-oracle-slot, or floats bottom-right.
   data-zodi-no-oracle on <body> opts a page out.

   Reads (never writes) localStorage primal_oracle_v1 { birth, ... }
   and window.ENGINE.compute(birth) for personalization. Writes only
   its own namespaced object zodi_oracle_v1. Rewards flow through the
   shared window.ZodiKarma.award('daily_oracle', …) when present; on
   pages without the karma runtime the reward is a quiet local
   acknowledgement only (never a second karma balance).
   ============================================================ */
(function () {
  "use strict";

  if (document.body && document.body.hasAttribute("data-zodi-no-oracle")) return;
  if (document.getElementById("zodi-oracle-slot") && window.__ZODI_ORACLE__) return;
  window.__ZODI_ORACLE__ = true;

  var REDUCE = false;
  try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  var STORE = "zodi_oracle_v1";
  var REWARD_RECEIVED = 25;   /* ZK acknowledged on "I receive this" */
  var REWARD_RELEASED = 10;   /* a gentler acknowledgement on "Release it" */

  /* ---------- the message library (deterministic, never random) ---------- */
  var MESSAGES = [
    { id: "stillness-before-shape",
      statement: "The shell does not rush its unfolding. Neither should you.",
      interpretation: "Your instinct today may be to force an answer before it is ready. Leave room for the next chamber to form.",
      themes: ["earth", "stillness", "patience"], element: "Earth" },
    { id: "hidden-not-lost",
      statement: "Not everything hidden is meant to remain undiscovered.",
      interpretation: "Something you set aside is closer to the surface than it feels. You do not have to dig; you only have to look.",
      themes: ["observation", "reflection", "water"], element: "Water" },
    { id: "choice-to-remain",
      statement: "Strength is not always the first movement. Sometimes it is the choice to remain.",
      interpretation: "Holding your ground can be its own kind of courage. Not every pressure deserves a response.",
      themes: ["courage", "stillness", "boundaries"], element: "Earth" },
    { id: "current-knows",
      statement: "The river does not argue with the stone. It simply finds the way around.",
      interpretation: "Where you meet resistance today, soften rather than push. The path is usually beside the obstacle, not through it.",
      themes: ["water", "patience", "transformation"], element: "Water" },
    { id: "owl-listens",
      statement: "The owl hunts by listening, not by hurry.",
      interpretation: "You already hold more than you are using. Grow quiet and the next step will name itself.",
      themes: ["observation", "stillness", "reflection"], element: "Metal" },
    { id: "shed-skin",
      statement: "What protected you last season may be the very thing to shed.",
      interpretation: "An old habit once kept you safe. Notice whether it still fits, or whether it has begun to bind.",
      themes: ["transformation", "boundaries", "wood"], element: "Wood" },
    { id: "small-fire",
      statement: "A small fire, well tended, outlasts a large one left alone.",
      interpretation: "Give your attention to one thing today rather than scattering it. Steady warmth carries further than a flare.",
      themes: ["fire", "patience", "action"], element: "Fire" },
    { id: "root-before-reach",
      statement: "The tree reaches only as far as its roots allow.",
      interpretation: "Before you extend yourself further, tend to what holds you. Reach rests on quiet foundations.",
      themes: ["wood", "patience", "structure"], element: "Wood" },
    { id: "tide-returns",
      statement: "The tide does not apologize for going out.",
      interpretation: "Rest is not retreat. If your energy has pulled back today, let it, and trust that it returns on its own clock.",
      themes: ["water", "reflection", "stillness"], element: "Water" },
    { id: "wolf-and-pack",
      statement: "The wolf is strong, but the pack is why it survives.",
      interpretation: "You are not meant to carry this alone. Naming what you need is not weakness; it is how the circle holds.",
      themes: ["relationships", "courage", "boundaries"] },
    { id: "crane-one-leg",
      statement: "The crane stands on one leg and is not afraid to fall.",
      interpretation: "Balance is not stillness; it is a thousand small corrections. Trust yourself to adjust as you go.",
      themes: ["patience", "stillness", "action"] },
    { id: "seed-dark",
      statement: "The seed does its first work in the dark, unseen.",
      interpretation: "Progress you cannot yet measure is still progress. Do not mistake quiet for absence.",
      themes: ["wood", "patience", "reflection"], element: "Wood" },
    { id: "hawk-height",
      statement: "The hawk climbs to see the whole field, not to leave it.",
      interpretation: "Step back today for perspective, not for distance. Height is only useful if you return with what you saw.",
      themes: ["observation", "reflection", "fire"], element: "Fire" },
    { id: "stone-water-time",
      statement: "Water shapes stone not by force, but by returning.",
      interpretation: "The change you want will not come in one push. Come back to it, gently, again and again.",
      themes: ["water", "patience", "transformation"], element: "Water" },
    { id: "fox-two-paths",
      statement: "The fox does not mourn the path it did not take.",
      interpretation: "A decision made is worth more than a perfect one imagined. Choose, and let the other road close without grief.",
      themes: ["action", "reflection", "courage"] },
    { id: "bear-winter",
      statement: "The bear does not fight the winter. It waits inside it.",
      interpretation: "Some seasons are for gathering, not spending. If this is a quiet time, let it be quiet on purpose.",
      themes: ["stillness", "patience", "earth"], element: "Earth" },
    { id: "spider-thread",
      statement: "The spider trusts a single thread before it trusts the web.",
      interpretation: "Begin with one small commitment today. The larger structure holds because the first strand did.",
      themes: ["structure", "action", "patience"] },
    { id: "moth-flame",
      statement: "Not every light is meant to be reached.",
      interpretation: "Desire and wisdom do not always point the same way. Ask whether the thing pulling you would warm you or burn you.",
      themes: ["boundaries", "reflection", "fire"], element: "Fire" },
    { id: "deer-edge",
      statement: "The deer steps into the clearing slowly, and lives.",
      interpretation: "Caution is not fear. Move into the open on your own terms; there is no shame in the pause before.",
      themes: ["observation", "boundaries", "stillness"] },
    { id: "ant-grain",
      statement: "The ant does not carry the hill. It carries one grain.",
      interpretation: "The task is only heavy when you hold all of it at once. Today, one grain is enough.",
      themes: ["patience", "action", "earth"], element: "Earth" },
    { id: "swan-still-water",
      statement: "The swan is calm above and tireless beneath.",
      interpretation: "Ease on the surface is often built on unseen effort. Be gentle with yourself for the work no one is applauding.",
      themes: ["reflection", "patience", "water"], element: "Water" },
    { id: "eagle-molt",
      statement: "The eagle grows still while its feathers renew.",
      interpretation: "You cannot fly and rebuild at the same time. If you feel grounded, you may simply be becoming.",
      themes: ["transformation", "stillness", "metal"], element: "Metal" },
    { id: "tortoise-pace",
      statement: "The tortoise never doubts it will arrive.",
      interpretation: "Speed is not the only proof of motion. Trust a slow, certain pace over an anxious, uncertain sprint.",
      themes: ["patience", "stillness", "earth"], element: "Earth" },
    { id: "bamboo-bend",
      statement: "The bamboo that bends outlives the oak that resists.",
      interpretation: "Flexibility is not surrender. Bend with today's pressure and you will still be standing when it passes.",
      themes: ["wood", "transformation", "patience"], element: "Wood" },
    { id: "heron-patience",
      statement: "The heron is paid for its patience, not its hunger.",
      interpretation: "Wanting a thing badly does not make it arrive sooner. Stand still in the shallows and let it come to you.",
      themes: ["patience", "stillness", "water"], element: "Water" },
    { id: "cat-boundary",
      statement: "The cat gives its warmth, never its freedom.",
      interpretation: "You can be close to someone and still keep what is yours. Affection and boundaries are not enemies.",
      themes: ["boundaries", "relationships", "reflection"] },
    { id: "salmon-upstream",
      statement: "The salmon does not swim upstream by hating the river.",
      interpretation: "Hard effort does not require resentment. You can work against the current and still be at peace with it.",
      themes: ["courage", "action", "water"], element: "Water" },
    { id: "firefly-dusk",
      statement: "The firefly gives its small light without asking if it is enough.",
      interpretation: "You do not have to illuminate everything. A little of your warmth, offered freely, is already worth something.",
      themes: ["fire", "relationships", "reflection"], element: "Fire" }
  ];

  /* element → the themes that resonate with it, for affinity matching */
  var ELEMENT_THEMES = {
    Wood:  ["wood", "growth", "patience", "transformation", "structure"],
    Fire:  ["fire", "courage", "action", "relationships", "observation"],
    Earth: ["earth", "stillness", "boundaries", "structure", "patience"],
    Metal: ["metal", "observation", "boundaries", "reflection", "stillness"],
    Water: ["water", "reflection", "transformation", "patience", "stillness"]
  };

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function todayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function cap(s) { return String(s || "").charAt(0).toUpperCase() + String(s || "").slice(1); }
  /* djb2 string hash — stable, deterministic, not Math.random */
  function hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h >>> 0;
  }
  function messageById(id) {
    for (var i = 0; i < MESSAGES.length; i++) if (MESSAGES[i].id === id) return MESSAGES[i];
    return null;
  }

  /* ---------- persona from the revealed animal (read-only) ---------- */
  function persona() {
    var o = {};
    try { o = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}") || {}; } catch (e) {}
    if (!o.birth || !window.ENGINE || !window.ENGINE.compute) return null;
    try {
      var c = window.ENGINE.compute(o.birth);
      if (!c || !c.primal) return null;
      return {
        name: c.primal,
        slug: String(c.primal).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        element: c.element || null
      };
    } catch (e) { return null; }
  }

  /* ---------- deterministic daily selection ---------- */
  function selectDaily(key, p) {
    var pool = MESSAGES, seedTail = "menagerie";
    if (p) {
      seedTail = p.slug || "menagerie";
      if (p.element && ELEMENT_THEMES[p.element]) {
        var aff = ELEMENT_THEMES[p.element];
        var filtered = MESSAGES.filter(function (m) {
          if (m.element === p.element) return true;
          for (var i = 0; i < m.themes.length; i++) if (aff.indexOf(m.themes[i]) !== -1) return true;
          return false;
        });
        if (filtered.length) pool = filtered;   /* graceful fallback to full library */
      }
    }
    var idx = hash(key + "|" + seedTail) % pool.length;
    return pool[idx].id;
  }

  /* ---------- state (own namespaced object; never touches primal_oracle_v1) ---------- */
  function readState() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) { s = {}; }
    return {
      date: s.date || "",
      messageId: s.messageId || "",
      opened: !!s.opened,
      response: s.response === "received" || s.response === "released" ? s.response : "",
      rewarded: !!s.rewarded,
      rewardAmt: parseInt(s.rewardAmt, 10) || 0,
      streak: parseInt(s.streak, 10) || 0,
      lastVisit: s.lastVisit || ""
    };
  }
  function saveState(s) {
    try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) {}
  }
  /* roll the daily fields forward if the local calendar day has changed */
  function ensureToday(s, p) {
    var key = todayKey();
    if (s.date !== key || !messageById(s.messageId)) {
      s.date = key;
      s.messageId = selectDaily(key, p);
      s.opened = false;
      s.response = "";
      s.rewarded = false;
      s.rewardAmt = 0;
      saveState(s);
    }
    return s;
  }
  function phaseOf(s) { return s.response ? s.response : s.opened ? "open" : "sealed"; }

  /* ---------- streak + reward, awarded at most once per local day ---------- */
  function completeToday(s) {
    var key = todayKey();
    if (s.lastVisit !== key) {                 /* first completion of this day */
      var y = new Date(); y.setDate(y.getDate() - 1);
      if (s.lastVisit === todayKey(y)) s.streak = (s.streak || 0) + 1;
      else s.streak = 1;                        /* first ever, or a gap resets to 1 */
      s.lastVisit = key;
    }
    if (!s.rewarded) {
      s.rewarded = true;
      s.rewardAmt = s.response === "received" ? REWARD_RECEIVED : REWARD_RELEASED;
      /* reuse the shared ledger when it exists; inert (never a 2nd counter) otherwise */
      try {
        if (window.ZodiKarma && typeof window.ZodiKarma.award === "function") {
          window.ZodiKarma.award("daily_oracle", { event: "daily-oracle-" + key, response: s.response });
        }
      } catch (e) {}
    }
    saveState(s);
  }

  /* ---------- the third eye (inline SVG) ----------
     Closed, it rests as a serene, downcast lid — a single graceful gold
     arc with soft lashes and a third-eye urna dot, calm like a meditating
     Buddha. Opening dissolves that lid upward and the iris rises beneath. */
  function eyeSVG() {
    var ALMOND = "M8 48 C28 20, 92 20, 112 48 C92 76, 28 76, 8 48 Z";
    return '' +
    '<svg class="orc-eye" viewBox="0 0 120 84" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<radialGradient id="orcC" cx="50%" cy="42%" r="60%">' +
          '<stop offset="0%" stop-color="#2b4bd8"/><stop offset="72%" stop-color="#122a86"/><stop offset="100%" stop-color="#0a1750"/>' +
        '</radialGradient>' +
        '<radialGradient id="orcI" cx="45%" cy="40%" r="65%">' +
          '<stop offset="0%" stop-color="#b79bf0"/><stop offset="55%" stop-color="#7a55c8"/><stop offset="100%" stop-color="#3d2a78"/>' +
        '</radialGradient>' +
        '<linearGradient id="orcL" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#efe2b4"/><stop offset="100%" stop-color="#b99c5e"/>' +
        '</linearGradient>' +
        '<radialGradient id="orcU" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#efe2b4"/><stop offset="100%" stop-color="#efe2b4" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<clipPath id="orcClip"><path d="' + ALMOND + '"/></clipPath>' +
      '</defs>' +
      '<g class="orc-rays" stroke="url(#orcL)" stroke-width="1.5" stroke-linecap="round" opacity=".7">' +
        '<line x1="60" y1="9" x2="60" y2="2"/><line x1="41" y1="13" x2="37" y2="7"/>' +
        '<line x1="79" y1="13" x2="83" y2="7"/><line x1="26" y1="22" x2="20" y2="18"/>' +
        '<line x1="94" y1="22" x2="100" y2="18"/>' +
      '</g>' +
      '<g clip-path="url(#orcClip)">' +
        '<rect x="0" y="16" width="120" height="62" fill="oklch(0.13 0.02 275)"/>' +
        /* the open eye — iris + bright rim, faded in as the lid lifts away */
        '<g class="orc-open-layer">' +
          '<circle cx="60" cy="48" r="22" fill="url(#orcC)"/>' +
          '<circle cx="60" cy="48" r="15.5" fill="#eef2f7"/>' +
          '<circle cx="60" cy="48" r="11" fill="#57c8d8"/>' +
          '<circle cx="60" cy="48" r="7.4" fill="url(#orcI)"/>' +
          '<circle cx="60" cy="48" r="3.4" fill="#0a0c18"/>' +
          '<path d="M63.5 42.2 l1 2.3 2.3 1 -2.3 1 -1 2.3 -1-2.3 -2.3-1 2.3-1 Z" fill="#efe2b4"/>' +
          '<ellipse cx="54.5" cy="42.5" rx="3.4" ry="2.1" fill="#ffffff" opacity=".55"/>' +
        '</g>' +
        /* the serene closed lid — a calm, downcast Buddha gaze */
        '<g class="orc-closed-layer">' +
          '<path d="' + ALMOND + '" fill="oklch(0.145 0.025 274)"/>' +
          /* upper lid crease, a soft fold above the closed line */
          '<path d="M30 42.5 C45 37, 75 37, 90 42.5" fill="none" stroke="url(#orcL)" stroke-width="1.3" stroke-linecap="round" opacity=".3"/>' +
          /* the closed eyelid: one graceful, gently downcast arc */
          '<path d="M14 49 C36 39.5, 84 39.5, 106 49" fill="none" stroke="url(#orcL)" stroke-width="3" stroke-linecap="round"/>' +
          /* downcast lashes */
          '<g stroke="url(#orcL)" stroke-width="1.2" stroke-linecap="round" opacity=".6">' +
            '<path d="M37 49.9 l-3 5"/><path d="M49 50.4 l-2 5"/>' +
            '<path d="M83 49.9 l3 5"/><path d="M71 50.4 l2 5"/>' +
          '</g>' +
        '</g>' +
      '</g>' +
      /* the almond rim belongs to the open eye — it arrives as the lid lifts */
      '<path class="orc-rim-open" d="' + ALMOND + '" fill="none" stroke="url(#orcL)" stroke-width="2.4"/>' +
    '</svg>';
  }
  /* frac: 1 = eye open (iris + rim shown), 0 = serene lid fully closed */
  function setAperture(root, frac) {
    var f = Math.max(0, Math.min(1, frac));
    var lid = root.querySelector(".orc-closed-layer");
    var open = root.querySelector(".orc-open-layer");
    var rim = root.querySelector(".orc-rim-open");
    if (lid) { lid.style.opacity = (1 - f).toFixed(3); lid.style.transform = "translateY(" + (-f * 7).toFixed(1) + "px)"; }
    if (open) { open.style.opacity = f.toFixed(3); }   /* iris fades in as the lid lifts */
    if (rim) { rim.style.opacity = f.toFixed(3); }      /* the open eye earns its bright rim */
  }
  function apertureFor(phase, expanded) {
    if (phase === "open") return expanded ? 1 : 0.12;
    if (phase === "received") return 0.5;
    if (phase === "released") return 0.15;
    return 0; /* sealed */
  }

  /* ---------- date label: TUESDAY · JULY 7 ---------- */
  var WD = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  var MO = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  function dateLabel() { var d = new Date(); return WD[d.getDay()] + " · " + MO[d.getMonth()] + " " + d.getDate(); }

  function countdownLabel() {
    var now = new Date();
    var next = new Date(now); next.setHours(24, 0, 0, 0);      /* next local midnight, DST-safe */
    var diff = Math.max(0, next - now);
    var h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000);
    return h + "H " + pad(m) + "M";
  }

  function attribution(p, msg) {
    var label, themeLine;
    if (p && p.name) {
      label = p.name.toUpperCase() + " WISDOM";
      var t = msg.themes.slice(0, 2).map(cap).join(" · ");
      themeLine = (p.element ? p.element + " · " : "") + t;
    } else {
      label = "MENAGERIE WISDOM";
      themeLine = msg.themes.slice(0, 3).map(cap).join(" · ");
    }
    return { label: label, themeLine: themeLine };
  }

  /* ---------- render (single source of truth for the panel DOM) ---------- */
  var slot, floating, expanded = false, justOpened = false, cdTimer = null;

  function header(phase, kicker, withToggle) {
    return '<div class="orc-head">' +
      '<span class="orc-eye-wrap" aria-hidden="true">' + eyeSVG() + '<span class="orc-halo"></span></span>' +
      '<span class="orc-kicker">' + kicker + '</span>' +
      (withToggle
        ? '<button class="orc-toggle" type="button" data-action="toggle" aria-expanded="' + (expanded ? "true" : "false") + '">' +
          '<span class="orc-sr">' + (expanded ? "Collapse the Oracle" : "Expand the Oracle") + '</span>' +
          '<span class="orc-chev" aria-hidden="true"></span></button>'
        : "") +
      "</div>";
  }

  function render() {
    var s = ensureToday(readState(), persona());
    var p = persona();
    var msg = messageById(s.messageId) || MESSAGES[0];
    var phase = phaseOf(s);
    var attr = attribution(p, msg);
    var body = "";

    if (phase === "sealed") {
      body =
        header(phase, "THE DAILY ORACLE", false) +
        '<div class="orc-body orc-body--sealed">' +
          '<p class="orc-lead">One message waits behind the veil.</p>' +
          '<button class="orc-btn orc-btn--primary" type="button" data-action="open">Open today&rsquo;s Oracle</button>' +
          '<p class="orc-meta">Available once each day</p>' +
        "</div>";
    } else if (phase === "open" && !expanded) {
      body =
        header(phase, "THE DAILY ORACLE", true) +
        '<div class="orc-body orc-body--mini">' +
          '<p class="orc-mini-line">Today&rsquo;s message has been opened.</p>' +
          '<button class="orc-btn orc-btn--ghost" type="button" data-action="view">View message</button>' +
        "</div>";
    } else if (phase === "open") {
      body =
        header(phase, "TODAY&rsquo;S ORACLE", true) +
        '<div class="orc-body orc-body--reveal" role="group" aria-label="Today’s Oracle">' +
          '<p class="orc-date">' + dateLabel() + "</p>" +
          '<blockquote class="orc-statement" aria-live="polite">&ldquo;' + esc(msg.statement) + "&rdquo;</blockquote>" +
          '<p class="orc-interp">' + esc(msg.interpretation) + "</p>" +
          '<p class="orc-attr">' + esc(attr.label) + '<span class="orc-attr-themes">' + esc(attr.themeLine) + "</span></p>" +
          '<div class="orc-actions">' +
            '<button class="orc-btn orc-btn--primary" type="button" data-action="receive">I receive this</button>' +
            '<button class="orc-btn orc-btn--quiet" type="button" data-action="release">Release it</button>' +
          "</div>" +
        "</div>";
    } else if (!expanded) {
      /* received / released — compact confirmation */
      var doneWord = phase === "received" ? "Received" : "Released";
      body =
        header(phase, "THE DAILY ORACLE", true) +
        '<div class="orc-body orc-body--done">' +
          '<p class="orc-done-line">' + doneWord + ' today <span aria-hidden="true">·</span> new message tomorrow</p>' +
          '<div class="orc-done-row">' +
            '<button class="orc-btn orc-btn--ghost" type="button" data-action="view">View message</button>' +
            '<span class="orc-countdown" data-countdown>NEXT ORACLE · ' + countdownLabel() + "</span>" +
          "</div>" +
        "</div>";
    } else {
      /* received / released — expanded recap */
      var isRec = phase === "received";
      var heading = isRec ? "The message is yours." : "The message returns to the stars.";
      var support = isRec ? "Carry it with you today." : "Not every message belongs to every moment.";
      var reward = s.rewardAmt
        ? '<p class="orc-reward"><span class="orc-zk">+' + s.rewardAmt + ' ZK</span></p>' : "";
      body =
        header(phase, "TODAY&rsquo;S ORACLE", true) +
        '<div class="orc-body orc-body--recap" role="group" aria-label="Today’s Oracle">' +
          '<p class="orc-done-head" aria-live="polite">' + heading + "</p>" +
          '<p class="orc-done-support">' + support + "</p>" +
          '<blockquote class="orc-statement orc-statement--sm">&ldquo;' + esc(msg.statement) + "&rdquo;</blockquote>" +
          '<p class="orc-attr">' + esc(attr.label) + '<span class="orc-attr-themes">' + esc(attr.themeLine) + "</span></p>" +
          reward +
          '<p class="orc-return">A new Oracle arrives tomorrow.</p>' +
          '<div class="orc-done-row">' +
            '<span class="orc-streak">Oracle streak · ' + (s.streak || 1) + (s.streak === 1 || !s.streak ? " day" : " days") + "</span>" +
            '<span class="orc-countdown" data-countdown>NEXT · ' + countdownLabel() + "</span>" +
          "</div>" +
        "</div>";
    }

    slot.innerHTML =
      '<section class="orc-card' + (floating ? " orc-float" : "") + '" data-oracle-state="' +
      (phase === "open" ? (expanded ? "revealed" : "opened-collapsed") : phase === "sealed" ? "sealed" : phase + (expanded ? "" : "-collapsed")) +
      '" aria-label="The Daily Oracle">' + body + "</section>";

    var card = slot.querySelector(".orc-card");

    /* eye aperture: animate the parting only on the deliberate open */
    var target = apertureFor(phase, expanded);
    if (justOpened && !REDUCE) {
      setAperture(card, 0);
      requestAnimationFrame(function () { requestAnimationFrame(function () { setAperture(card, target); }); });
    } else {
      setAperture(card, target);
    }
    justOpened = false;

    startCountdown();
    dodgeFooter();
  }

  /* ---------- interactions (delegated; wired once) ---------- */
  function onClick(e) {
    var btn = e.target.closest ? e.target.closest("[data-action]") : null;
    if (!btn || !slot.contains(btn)) return;
    var action = btn.getAttribute("data-action");
    var s = ensureToday(readState(), persona());

    if (action === "open") {
      s.opened = true; saveState(s);
      expanded = true; justOpened = true; render();
    } else if (action === "toggle") {
      expanded = !expanded; render();
    } else if (action === "view") {
      expanded = true; render();
    } else if (action === "receive" || action === "release") {
      s.response = action === "receive" ? "received" : "released";
      s.opened = true;
      completeToday(s);
      expanded = true; render();           /* show the recap, then let the user collapse */
      /* settle to the compact confirmation shortly after, so it stops blocking the page */
      setTimeout(function () {
        var cur = ensureToday(readState(), persona());
        if (cur.response) { expanded = false; render(); }
      }, REDUCE ? 400 : 2600);
    }
  }

  /* ---------- countdown: one lightweight timer, minutes granularity ---------- */
  function startCountdown() {
    if (cdTimer) { clearInterval(cdTimer); cdTimer = null; }
    var el = slot.querySelector("[data-countdown]");
    if (!el) return;
    var prefix = el.textContent.split("·")[0].trim();
    cdTimer = setInterval(function () {
      var node = slot.querySelector("[data-countdown]");
      if (!node) { clearInterval(cdTimer); cdTimer = null; return; }
      /* a new local day has begun — reset to the fresh sealed Oracle */
      var s = readState();
      if (s.date && s.date !== todayKey()) { expanded = false; render(); return; }
      node.textContent = prefix + " · " + countdownLabel();
    }, 30000);
  }

  /* ---------- keep the float above the footer ---------- */
  var dodgeRaf = null;
  function dodgeFooter() {
    if (!floating) return;
    var foot = document.querySelector("footer.v2-foot");
    if (!foot) return;
    if (dodgeRaf) return;
    dodgeRaf = requestAnimationFrame(function () {
      dodgeRaf = null;
      var card = slot.querySelector(".orc-card");
      if (!card) return;
      var r = foot.getBoundingClientRect();
      var overlap = window.innerHeight - r.top;
      card.style.bottom = (overlap > 0 ? overlap + 14 : 18) + "px";
    });
  }

  /* ---------- mobile: hush the tray while the birth form is in use ---------- */
  function wireFormHush() {
    var hush = function (on) {
      var card = slot.querySelector(".orc-card");
      if (card) card.classList.toggle("orc-hushed", on);
    };
    document.addEventListener("focusin", function (e) {
      var t = e.target;
      if (!t) return;
      var isField = t.matches && t.matches("input, select, textarea");
      if (isField && window.matchMedia("(max-width:720px)").matches) hush(true);
    });
    document.addEventListener("focusout", function () {
      setTimeout(function () {
        var a = document.activeElement;
        if (!a || !(a.matches && a.matches("input, select, textarea"))) hush(false);
      }, 120);
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    slot = document.getElementById("zodi-oracle-slot");
    if (!slot) {
      floating = true;
      slot = document.createElement("div");
      slot.id = "zodi-oracle-slot";
      document.body.appendChild(slot);
    }
    expanded = false;               /* always boot compact/collapsed */
    render();
    slot.addEventListener("click", onClick);
    if (floating) {
      window.addEventListener("scroll", dodgeFooter, { passive: true });
      window.addEventListener("resize", dodgeFooter);
      wireFormHush();
    }
  });
})();
