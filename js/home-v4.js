/* ============================================================
   home-v4.js — homepage v4 canvas-port interactions
   ------------------------------------------------------------
   Ports the interaction layer of the "Zodi Animal Home" design
   canvas onto the production homepage. Progressive enhancement
   only; every feature no-ops when its markup is absent.

   Owns:
     1. Moon chip + popover in the sticky sub-bar, and the rail
        moon card (PHASE_MEANING copy from the canvas).
     2. The seasonal hero eyebrow tag ("… · autumn sky").
     3. Segmented MM/DD/YYYY reader inputs that sync the hidden
        native #birthDate (app.js keeps owning the submit), plus
        the live oracle hint line.
     4. Locked/open state for the "What unlocks" band and the
        rail unlocks card, driven by the same reveal state the
        site already stores (primal_oracle_v1 / po_game).
     5. The rail share icon row (SMS / Copy / Email / Instagram
        / X), shown after reveal.
     6. A dismiss control for the Third Eye HUD.

   Never writes birth data. Reads localStorage defensively.
   ============================================================ */

(function () {
  "use strict";

  function $(sel, root) {
    try { return (root || document).querySelector(sel); } catch (e) { return null; }
  }
  function $all(sel, root) {
    try { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function on(el, ev, fn) { if (el && el.addEventListener) el.addEventListener(ev, fn); }

  var REDUCE = false;
  try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  /* ============================================================
     1. THE MOON — canvas moon() port (PHASE_MEANING copy)
     ============================================================ */
  var PHASE_GLYPHS = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  var PHASE_NAMES = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
                     "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  var PHASE_MEANING = [
    "The sky is dark and open. The month begins here, so name the one thing you want from it.",
    "The first sliver of light. Whatever you started at the new moon wants its first small step now.",
    "Half lit, half dark. This is the phase of the first real obstacle. Push through it or drop the plan on purpose.",
    "Almost full. Refine what you are making before it peaks. Small corrections now save the whole thing.",
    "Fully lit. See things as they are, celebrate what landed, and set your stones out to charge.",
    "The light is receding after the peak. Share what you learned, thank who helped, and finish what is still open.",
    "Half dark and dimming. Cut one thing that no longer serves the month you set.",
    "The last sliver. Rest and empty out. The next turn of the wheel is days away."
  ];
  var PHASE_FAVORS = [
    "intentions, quiet starts",
    "first steps, small commitments",
    "decisions, effort",
    "editing, adjustment",
    "clarity, charging stones",
    "gratitude, teaching, finishing",
    "release, letting go",
    "rest, reflection"
  ];

  function moonNow() {
    var synodic = 29.530588853;
    var ref = Date.UTC(2000, 0, 6, 18, 14);
    var days = (Date.now() - ref) / 864e5;
    var phase = ((days % synodic) + synodic) % synodic / synodic;
    var idx = Math.round(phase * 8) % 8;
    var illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
    return {
      glyph: PHASE_GLYPHS[idx], name: PHASE_NAMES[idx], pct: illum + "%",
      meaning: PHASE_MEANING[idx], favor: PHASE_FAVORS[idx],
      meaningShort: PHASE_MEANING[idx].split(". ")[0] + "."
    };
  }

  function initMoon() {
    var m = moonNow();

    // sub-bar chip + popover
    var chip = $("#moonChip");
    var pop = $("#moonPop");
    if (chip) {
      chip.innerHTML = '<span class="g" aria-hidden="true">' + m.glyph + "</span> " + m.pct;
      chip.setAttribute("title", m.name);
      chip.setAttribute("aria-label", "Moon phase tonight: " + m.name + ", " + m.pct + " illuminated");
      chip.hidden = false;
    }
    if (pop) {
      var pg = $(".pop-glyph", pop), pn = $(".pop-name", pop),
          pp = $(".pop-pct", pop), pm = $(".pop-meaning", pop), pf = $(".pop-favors", pop);
      if (pg) pg.textContent = m.glyph;
      if (pn) pn.textContent = m.name;
      if (pp) pp.textContent = m.pct + " illuminated tonight";
      if (pm) pm.textContent = m.meaning;
      if (pf) pf.textContent = "Favors " + m.favor;
    }
    if (chip && pop) {
      on(chip, "click", function () {
        var open = !pop.hidden;
        pop.hidden = open;
        chip.setAttribute("aria-expanded", String(!open));
      });
      on(document, "click", function (e) {
        if (pop.hidden) return;
        if (pop.contains(e.target) || chip.contains(e.target)) return;
        pop.hidden = true;
        chip.setAttribute("aria-expanded", "false");
      });
      on(document, "keydown", function (e) {
        if (e.key === "Escape" && !pop.hidden) {
          pop.hidden = true;
          chip.setAttribute("aria-expanded", "false");
          try { chip.focus(); } catch (er) {}
        }
      });
    }

    // rail moon card
    var rail = $("#moon-rail");
    if (rail) {
      var rg = $(".moon-rail-glyph", rail), rl = $(".moon-rail-label", rail),
          rm = $(".moon-rail-meaning", rail);
      if (rg) rg.textContent = m.glyph;
      if (rl) rl.textContent = m.name + " · " + m.pct;
      if (rm) rm.textContent = m.meaningShort;
      rail.hidden = false;
    }
  }

  /* ============================================================
     2. SEASON TAG — "Two zodiacs · one animal · autumn sky"
     ============================================================ */
  function initSeason() {
    var tag = $("#seasonTag");
    var name = $("#seasonName");
    if (!tag || !name) return;
    var s = "";
    try { s = document.documentElement.dataset.season || ""; } catch (e) {}
    if (!s) {
      var mo = new Date().getMonth();
      s = mo >= 2 && mo <= 4 ? "spring" : mo >= 5 && mo <= 7 ? "summer" : mo >= 8 && mo <= 10 ? "autumn" : "winter";
    }
    name.textContent = s;
    tag.hidden = false;
  }

  /* ============================================================
     3. SEGMENTED READER INPUTS (canvas MM/DD/YYYY reader)
     The native #birthDate stays the source of truth for app.js;
     we hide it, mirror into it, and drive the hint line.
     ============================================================ */
  function initSegments() {
    var wrap = $("#omSeg");
    var native = $("#birthDate");
    var msg = $("#formMsg");
    var form = $("#birthForm");
    if (!wrap || !native || !form) return;

    var mI = $(".om-seg-m", wrap), dI = $(".om-seg-d", wrap), yI = $(".om-seg-y", wrap);
    if (!mI || !dI || !yI) return;

    wrap.hidden = false;
    document.body.classList.add("js-seg");
    // the native input is hidden now; a hidden required control would
    // block form submission, and app.js already handles the empty case
    try { native.removeAttribute("required"); } catch (e) {}

    function vals() { return { mm: mI.value, dd: dI.value, yyyy: yI.value }; }

    function sync() {
      var v = vals();
      if (v.mm.length === 2 && v.dd.length === 2 && v.yyyy.length === 4) {
        native.value = v.yyyy + "-" + v.mm + "-" + v.dd;
      } else {
        native.value = "";
      }
    }

    function setHint(line, err) {
      if (!msg) return;
      msg.textContent = line;
      msg.classList.toggle("is-err", !!err);
    }

    function hint(touched) {
      var v = vals();
      if (!touched) { setHint("Type it like 07 14 1992. Nothing is sent anywhere.", false); return; }
      if (!window.ENGINE) { setHint(" ", false); return; }
      var m = +v.mm, d = +v.dd, y = +v.yyyy;
      if (v.mm.length === 2 && v.dd.length === 2 && (m < 1 || m > 12 || d < 1 || d > 31)) {
        setHint("That date is not on the wheel. Check the month and day.", true); return;
      }
      if (v.mm.length === 2 && v.dd.length === 2 && v.yyyy.length === 4) {
        if (y < 1940 || y > 2032) { setHint("The Oracle reads years 1940 to 2032.", true); return; }
        var r = null;
        try { r = window.ENGINE.compute(v.yyyy + "-" + v.mm + "-" + v.dd); } catch (e) { r = null; }
        if (!r) { setHint("That date is not on the wheel.", true); return; }
        setHint((r.glyph || "") + " " + r.sign + " sun · year of the " + r.animal + " " + (r.cn || ""), false);
        return;
      }
      if (v.mm.length === 2 && v.dd.length === 2 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        var s = null;
        try { s = window.ENGINE.compute("2000-" + v.mm + "-" + v.dd); } catch (e) { s = null; }
        if (s) { setHint((s.glyph || "") + " " + s.sign + " sun. Now the year.", false); return; }
      }
      setHint("The oracle is listening.", false);
    }

    function seg(input, max, next) {
      on(input, "input", function () {
        input.value = input.value.replace(/[^0-9]/g, "").slice(0, max);
        sync();
        hint(true);
        if (input.value.length === max && next) { try { next.focus(); } catch (e) {} }
      });
    }
    function back(input, prev) {
      on(input, "keydown", function (e) {
        if (e.key === "Backspace" && input.value === "" && prev) { try { prev.focus(); } catch (er) {} }
      });
    }

    seg(mI, 2, dI);
    seg(dI, 2, yI);
    seg(yI, 4, null);
    back(dI, mI);
    back(yI, dI);

    // seed the segments from a stored birth date so returning
    // visitors see their date already on the wheel (local only)
    try {
      var st = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}");
      if (st && typeof st.birth === "string" && /^\d{4}-\d{2}-\d{2}$/.test(st.birth)) {
        yI.value = st.birth.slice(0, 4);
        mI.value = st.birth.slice(5, 7);
        dI.value = st.birth.slice(8, 10);
        sync();
      }
    } catch (e) {}

    // guard the submit: app.js shows its own message when the native
    // input is empty; make the hint agree with the segment state
    on(form, "submit", function () { sync(); });

    hint(false);
  }

  /* ============================================================
     4. UNLOCK STATE — locked/open cards + rail unlocks meter
     ============================================================ */
  function resolveAnimal() {
    try {
      if (window.HOME && typeof window.HOME.resolveAnimal === "function") {
        return window.HOME.resolveAnimal();
      }
    } catch (e) {}
    // minimal fallback: same storage home.js reads
    try {
      var o = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}");
      if (o && o.birth && window.ENGINE) {
        var c = window.ENGINE.compute(o.birth);
        if (c && c.primal) return c;
      }
      if (o && o.recent && o.recent.length && o.recent[0].primal) return o.recent[0];
    } catch (e) {}
    return null;
  }

  function paintUnlocks() {
    var a = resolveAnimal();
    var revealed = !!(a && a.primal);

    var grid = $("#unlockGrid");
    if (grid) {
      grid.setAttribute("data-revealed", revealed ? "1" : "0");
      $all(".u-tag", grid).forEach(function (t) { t.textContent = revealed ? "open" : "locked"; });
    }

    var railCard = $("#rail-unlocks");
    if (railCard) {
      railCard.setAttribute("data-revealed", revealed ? "1" : "0");
      var kicker = $("#unlocksKicker");
      if (kicker) kicker.textContent = revealed ? "Unlocked" : "Waiting to unlock";

      // meter: reuse the sitewide awakening measure when present
      var fill = 0;
      try { if (window.METER && typeof window.METER.fill === "function") fill = window.METER.fill() || 0; } catch (e) {}
      var pct = Math.round(Math.min(1, Math.max(0, fill)) * 100);
      var bar = $("#railMeterFill");
      if (bar) bar.style.width = pct + "%";
      var line = $("#railMeterLine");
      if (line) {
        var tier = "";
        try {
          var stt = window.METER && window.METER.state ? window.METER.state() : null;
          if (stt && stt.tier && stt.tier.name) tier = stt.tier.name;
        } catch (e) {}
        var streak = 1;
        try {
          var o = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}");
          if (o && o.streak) streak = o.streak;
        } catch (e) {}
        line.textContent = (tier ? tier + " · " : "") + pct + "% · 🌒 " +
          streak + (streak === 1 ? " night" : " nights");
      }
    }

    paintShare(a, revealed);
  }

  /* ============================================================
     5. RAIL SHARE ROW (canvas sharing widget)
     ============================================================ */
  function shareLine(a) {
    var origin = "zodianimal.com";
    try { if (location.origin && location.origin.indexOf("http") === 0) origin = location.host; } catch (e) {}
    var pair = (a.sign && a.animal) ? (a.sign + " × " + a.animal + ". ") : "";
    return "I am the " + a.primal + ". " + pair + "Which of the 144 are you? " + origin;
  }

  function markShared() {
    try { window.dispatchEvent(new CustomEvent("po:shared")); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("po:awaken")); } catch (e) {}
  }

  function copyLine(text, btn) {
    var done = function () {
      if (btn) {
        var lbl = $(".lbl", btn);
        if (lbl) {
          var was = lbl.textContent;
          lbl.textContent = "Copied";
          setTimeout(function () { lbl.textContent = was; }, 1600);
        }
      }
      markShared();
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
        return;
      }
    } catch (e) {}
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.parentNode.removeChild(ta);
      done();
    } catch (e) {}
  }

  var shareWired = false;
  function paintShare(a, revealed) {
    var card = $("#rail-share");
    if (!card) return;
    if (!revealed) { card.hidden = true; return; }
    card.hidden = false;

    var line = shareLine(a);
    var sms = $('[data-share="sms"]', card);
    var email = $('[data-share="email"]', card);
    var x = $('[data-share="x"]', card);
    if (sms) sms.href = "sms:?&body=" + encodeURIComponent(line);
    if (email) email.href = "mailto:?subject=" + encodeURIComponent("Which of the 144 animals are you?") +
      "&body=" + encodeURIComponent(line);
    if (x) x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(line);

    if (!shareWired) {
      shareWired = true;
      on(sms, "click", markShared);
      on(email, "click", markShared);
      on(x, "click", markShared);
      var copyBtn = $('[data-share="copy"]', card);
      var ig = $('[data-share="instagram"]', card);
      on(copyBtn, "click", function () {
        var cur = resolveAnimal();
        copyLine(cur && cur.primal ? shareLine(cur) : "", copyBtn);
      });
      on(ig, "click", function () {
        var cur = resolveAnimal();
        copyLine(cur && cur.primal ? shareLine(cur) : "", ig);
      });
    }
  }

  /* ============================================================
     6. THIRD EYE HUD dismiss
     ============================================================ */
  function initHud() {
    var hud = $(".eyeHud");
    var close = $("#eyeHudClose");
    if (!hud) return;
    var hidden = false;
    try { hidden = sessionStorage.getItem("v4_hud_hidden") === "1"; } catch (e) {}
    if (hidden) hud.hidden = true;
    on(close, "click", function () {
      hud.hidden = true;
      try { sessionStorage.setItem("v4_hud_hidden", "1"); } catch (e) {}
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    try { initMoon(); } catch (e) {}
    try { initSeason(); } catch (e) {}
    try { initSegments(); } catch (e) {}
    try { initHud(); } catch (e) {}
    try { paintUnlocks(); } catch (e) {}

    ["po:reveal", "po:awaken", "po:awakened", "po:revealed", "po:discovered", "po:shared", "storage"]
      .forEach(function (name) {
        try { window.addEventListener(name, function () { paintUnlocks(); }); } catch (e) {}
      });

    // short storage poll (mirrors home.js) so a reveal that writes
    // storage without an event still flips the locks
    var polls = 0;
    var timer = window.setInterval(function () {
      polls++;
      try { paintUnlocks(); } catch (e) {}
      if (polls > 90) window.clearInterval(timer);
    }, 700);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
