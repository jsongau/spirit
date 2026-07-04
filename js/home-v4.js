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
     1b. SUB-BAR HEIGHT KNOB — measure the sticky .omv4-sub into
     :root --v4-sub-h so the rail's sticky top (bar + sub-bar) can
     never drift from the real rendered band (no magic numbers).
     ============================================================ */
  function initSubHeight() {
    var sub = $(".omv4-sub");
    if (!sub) return;
    var raf = 0;
    function apply() {
      raf = 0;
      try {
        var h = sub.getBoundingClientRect().height;
        if (h > 0) document.documentElement.style.setProperty("--v4-sub-h", h + "px");
      } catch (e) {}
    }
    function queue() { if (!raf) raf = window.requestAnimationFrame(apply); }
    apply();
    on(window, "resize", queue);
    try {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
    } catch (e) {}
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
    paintRevealCta(revealed);
    tidyPairing(a, revealed);
  }

  /* keep the pairing line in the canvas "Sign × Year" mono format after
     home.js paints it ("Cancer and the Water Snake" → "Cancer × Snake 蛇").
     Idempotent; runs on the same events/poll home.js repaints on. */
  function tidyPairing(a, revealed) {
    if (!revealed || !a || !a.sign || !a.animal) return;
    var line = a.sign + " × " + a.animal + (a.cn ? " " + a.cn : "");
    var el = $("#identity-name .id-pairing");
    if (el && el.textContent !== line) el.textContent = line;
  }

  /* ============================================================
     5. RAIL SHARE ROW (canvas sharing widget)
     Always available: before the reveal it shares the generic
     invitation; after the reveal it switches to the personalized
     line. Instagram has no web share intent, so it copies the
     caption and confirms with a toast.
     ============================================================ */
  function siteHost() {
    var origin = "www.zodianimal.com";
    try { if (location.origin && location.origin.indexOf("http") === 0) origin = location.host; } catch (e) {}
    return origin;
  }

  function shareLine(a) {
    var pair = (a.sign && a.animal) ? (a.sign + " × " + a.animal + ". ") : "";
    return "I am the " + a.primal + ". " + pair + "Which of the 144 are you? " + siteHost();
  }

  function genericShareLine() {
    return "Which of the 144 animals are you? " + siteHost();
  }

  function currentShareLine() {
    var a = resolveAnimal();
    return (a && a.primal) ? shareLine(a) : genericShareLine();
  }

  function toast(title, sub) {
    var t = $("#toast");
    if (!t) return;
    t.innerHTML = "<strong></strong><span></span>";
    t.firstChild.textContent = title;
    t.lastChild.textContent = sub || "";
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  function markShared() {
    try { window.dispatchEvent(new CustomEvent("po:shared")); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("po:awaken")); } catch (e) {}
  }

  // one clipboard path for the rail row, the modal, and Instagram copies
  function copyPlain(text, done) {
    function legacy() {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.parentNode.removeChild(ta);
        if (done) done();
      } catch (e) {}
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { if (done) done(); })
          .catch(legacy);
        return;
      }
    } catch (e) {}
    legacy();
  }

  function copyLine(text, btn) {
    copyPlain(text, function () {
      if (btn) {
        var lbl = $(".lbl", btn);
        if (lbl) {
          var was = lbl.textContent;
          lbl.textContent = "Copied";
          setTimeout(function () { lbl.textContent = was; }, 1600);
        }
      }
      markShared();
    });
  }

  var shareWired = false;
  function paintShare(a, revealed) {
    var card = $("#rail-share");
    if (!card) return;
    card.hidden = false; // always available; the line personalizes on reveal

    var line = (revealed && a) ? shareLine(a) : genericShareLine();
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
        copyLine(currentShareLine(), copyBtn);
      });
      on(ig, "click", function () {
        copyLine(currentShareLine(), ig);
        toast("Caption copied", "Paste it in Instagram.");
      });
    }
  }

  /* ============================================================
     5b. RAIL CTA — "Reveal my animal" before the naming, then
     "Challenge a friend" (to /vs.html) once the reveal is stored.
     A capturing listener owns the click so the legacy home.js
     share wiring on the same button never double-fires.
     ============================================================ */
  function slugOf(a) {
    if (a && a.slug) return a.slug;
    if (!a || !a.primal) return "";
    return String(a.primal).toLowerCase().replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function paintRevealCta(revealed) {
    var cta = $("#identity-share");
    if (!cta) return;
    var mode = revealed ? "challenge" : "reveal";
    if (cta.getAttribute("data-mode") === mode) return;
    cta.setAttribute("data-mode", mode);
    cta.innerHTML = "";
    cta.appendChild(document.createTextNode(revealed ? "Challenge a friend " : "Reveal my animal "));
    var star = document.createElement("span");
    star.setAttribute("aria-hidden", "true");
    star.textContent = "✦";
    cta.appendChild(star);
  }

  function initRevealCta() {
    if (!$("#identity-share")) return;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("#identity-share") : null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation(); // capture phase: home.js's own handler never runs
      var a = resolveAnimal();
      if (a && a.primal) {
        openChallengeModal(a, btn);
        return;
      }
      // pre-reveal: walk them to the reader and focus the first segment
      var read = $("#read");
      if (read && read.scrollIntoView) {
        read.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
      }
      var seg = $("#omSeg");
      var target = (seg && !seg.hidden) ? $(".om-seg-m", seg) : $("#birthDate");
      if (target) {
        window.setTimeout(function () {
          try { target.focus({ preventScroll: true }); }
          catch (er) { try { target.focus(); } catch (er2) {} }
        }, REDUCE ? 0 : 350);
      }
    }, true);
  }

  /* ============================================================
     5c. CHALLENGE MODAL — "Send this to someone". Opens from the
     rail CTA and from #challengeBtn once an animal is named (both
     keep working as plain links/buttons with JS off or pre-reveal).
     Token-styled panel, blurred backdrop, Esc / backdrop / ✕ close,
     focus trap, aria-modal, scroll lock.
     ============================================================ */
  var chModal = null, chOpener = null, chKeyHandler = null;

  function challengeUrl(a) {
    var slug = slugOf(a);
    var origin = "https://www.zodianimal.com";
    try { if (location.origin && location.origin.indexOf("http") === 0) origin = location.origin; } catch (e) {}
    return origin + "/vs.html" + (slug ? "?with=" + encodeURIComponent(slug) : "");
  }

  function challengeLine(a, url) {
    var mid = (a.sign && a.animal) ? (a.sign + " × " + a.animal + ". ") : "";
    return "I am the " + a.primal + ". " + mid + "What are you? " + url;
  }

  var CH_ICONS = {
    sms: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="4"></rect><path d="M8 17v4l4-4"></path></svg>',
    email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>',
    x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14"></path><path d="M19 5L5 19"></path></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"></circle></svg>'
  };

  function buildChallengeModal() {
    if (chModal) return chModal;
    chModal = document.createElement("div");
    chModal.className = "v4-modal";
    chModal.id = "challengeModal";
    chModal.hidden = true;
    chModal.innerHTML =
      '<div class="v4-modal-backdrop" data-close></div>' +
      '<div class="v4-modal-panel" role="dialog" aria-modal="true" aria-labelledby="challengeModalTitle">' +
        '<button class="v4-modal-close" type="button" data-close aria-label="Close">&#10005;</button>' +
        '<p class="v4-modal-kicker">Challenge a friend</p>' +
        '<h3 class="v4-modal-title" id="challengeModalTitle">Send this to someone</h3>' +
        '<p class="v4-modal-sub"></p>' +
        '<div class="v4-copyrow">' +
          '<input id="challengeUrl" readonly aria-label="Your challenge link">' +
          '<button id="challengeCopy" type="button">Copy</button>' +
        '</div>' +
        '<div class="v4-modal-actions">' +
          '<a data-modal-share="sms" href="#"><span class="ic">' + CH_ICONS.sms + '</span>SMS</a>' +
          '<a data-modal-share="email" href="#"><span class="ic">' + CH_ICONS.email + '</span>Email</a>' +
          '<a data-modal-share="x" href="#" target="_blank" rel="noopener"><span class="ic">' + CH_ICONS.x + '</span>X</a>' +
          '<button data-modal-share="instagram" type="button"><span class="ic">' + CH_ICONS.instagram + '</span>Instagram</button>' +
        '</div>' +
        '<p class="v4-modal-note">They answer with a birthday. The wheel names the pair.</p>' +
      '</div>';
    document.body.appendChild(chModal);

    $all("[data-close]", chModal).forEach(function (el) {
      on(el, "click", closeChallengeModal);
    });

    var copyBtn = $("#challengeCopy", chModal);
    on(copyBtn, "click", function () {
      var input = $("#challengeUrl", chModal);
      copyPlain(input ? input.value : "", function () {
        copyBtn.classList.add("is-copied");
        copyBtn.textContent = "Copied ✓";
        window.setTimeout(function () {
          copyBtn.classList.remove("is-copied");
          copyBtn.textContent = "Copy";
        }, 1800);
        markShared();
      });
    });

    on($('[data-modal-share="instagram"]', chModal), "click", function () {
      copyPlain(chModal._line || "", function () {
        toast("Caption copied", "Paste it in Instagram.");
        markShared();
      });
    });
    ["sms", "email", "x"].forEach(function (k) {
      on($('[data-modal-share="' + k + '"]', chModal), "click", markShared);
    });

    return chModal;
  }

  function openChallengeModal(a, opener) {
    if (!a || !a.primal) return;
    var m = buildChallengeModal();
    var url = challengeUrl(a);
    m._line = challengeLine(a, url);

    var input = $("#challengeUrl", m);
    if (input) input.value = url;
    var sub = $(".v4-modal-sub", m);
    if (sub) sub.textContent = "You are the " + a.primal + ". Send the link; whoever opens it answers with a birthday and the wheel reads the pair.";

    var sms = $('[data-modal-share="sms"]', m);
    var email = $('[data-modal-share="email"]', m);
    var x = $('[data-modal-share="x"]', m);
    if (sms) sms.href = "sms:?&body=" + encodeURIComponent(m._line);
    if (email) email.href = "mailto:?subject=" + encodeURIComponent("What animal are you?") + "&body=" + encodeURIComponent(m._line);
    if (x) x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(m._line);

    chOpener = opener || document.activeElement;
    m.hidden = false;
    document.body.classList.add("v4-modal-open");
    var first = $("#challengeCopy", m) || $(".v4-modal-close", m);
    if (first) { try { first.focus(); } catch (e) {} }

    chKeyHandler = function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeChallengeModal(); return; }
      if (e.key !== "Tab") return;
      var f = $all('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', m);
      if (!f.length) return;
      var head = f[0], tail = f[f.length - 1];
      var inside = m.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === head || !inside)) {
        e.preventDefault(); tail.focus();
      } else if (!e.shiftKey && (document.activeElement === tail || !inside)) {
        e.preventDefault(); head.focus();
      }
    };
    document.addEventListener("keydown", chKeyHandler, true);
  }

  function closeChallengeModal() {
    if (!chModal || chModal.hidden) return;
    chModal.hidden = true;
    document.body.classList.remove("v4-modal-open");
    if (chKeyHandler) {
      document.removeEventListener("keydown", chKeyHandler, true);
      chKeyHandler = null;
    }
    if (chOpener && chOpener.focus) { try { chOpener.focus(); } catch (e) {} }
    chOpener = null;
  }

  // the result section's "Challenge a friend" opens the same modal
  // (pre-reveal / JS-off it stays the plain /vs.html link)
  function initChallengeBtn() {
    var btn = $("#challengeBtn");
    if (!btn) return;
    on(btn, "click", function (e) {
      var a = resolveAnimal();
      if (!a || !a.primal) return; // let the link navigate
      if (e && e.preventDefault) e.preventDefault();
      openChallengeModal(a, btn);
    });
  }

  /* ============================================================
     5d. START OVER — a quiet reset with a confirm step. Clears the
     reveal keys inside the SITE'S OWN storage (primal_oracle_v1:
     birth / recent / rites; po_game: seen / celebrated — the exact
     keys app.js, home.js, game.js and meter.js read) and reloads,
     so every existing painter reboots from clean storage: rail back
     to the invitation, CTA back to "Reveal my animal", unlock cards
     re-veil, share row generic, eye asleep. No second source of
     truth — an in-place repaint would leak, because app.js and
     meter.js hold in-memory copies that re-save the old state.
     (email + streak/lastVisit survive; they are not reveal state.)
     ============================================================ */
  function resetOracle() {
    try {
      var o = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}") || {};
      delete o.birth; delete o.recent; delete o.rites;
      localStorage.setItem("primal_oracle_v1", JSON.stringify(o));
    } catch (e) {
      try { localStorage.removeItem("primal_oracle_v1"); } catch (e2) {}
    }
    try {
      var g = JSON.parse(localStorage.getItem("po_game") || "{}") || {};
      delete g.seen; delete g.celebrated;
      localStorage.setItem("po_game", JSON.stringify(g));
    } catch (e) {
      try { localStorage.removeItem("po_game"); } catch (e2) {}
    }
    try { location.replace(location.pathname); }
    catch (e) { try { location.reload(); } catch (e2) {} }
  }

  function initReset() {
    var start = $("#identity-reset");
    var confirmRow = $(".identity-reset-confirm");
    var yes = $("#identity-reset-yes");
    var no = $("#identity-reset-no");
    if (!start || !confirmRow || !yes || !no) return;

    function arm(open) {
      start.hidden = open;
      confirmRow.hidden = !open;
      try { (open ? no : start).focus(); } catch (e) {}
    }
    on(start, "click", function () { arm(true); });
    on(no, "click", function () { arm(false); });
    on(document, "keydown", function (e) {
      if (e.key === "Escape" && !confirmRow.hidden) arm(false);
    });
    on(yes, "click", function () {
      yes.disabled = true;
      resetOracle();
    });
  }

  /* ============================================================
     6. THIRD EYE HUD — starts as a small collapsed chip so it can
     never overlap content; expands bottom-right on demand. The
     close button collapses it back to the chip. State is per
     session; app.js keeps owning all the HUD text and rites.
     ============================================================ */
  function initHud() {
    var hud = $(".eyeHud");
    var close = $("#eyeHudClose");
    if (!hud) return;

    // the chip label, shown only while collapsed (CSS gates it). The
    // served markup already ships it (collapsed-by-default contract);
    // only create one if a legacy page lacks it.
    var lbl = $(".eyeHud-chip-lbl", hud);
    if (!lbl) {
      lbl = document.createElement("span");
      lbl.className = "eyeHud-chip-lbl";
      lbl.textContent = "Awakening";
      hud.appendChild(lbl);
    }

    var open = false; // collapsed is the default, always
    try { open = sessionStorage.getItem("v4_hud_open") === "1"; } catch (e) {}

    function setState(isOpen) {
      hud.classList.toggle("is-collapsed", !isOpen);
      if (isOpen) {
        hud.removeAttribute("role");
        hud.removeAttribute("tabindex");
        hud.removeAttribute("aria-expanded");
      } else {
        hud.setAttribute("role", "button");
        hud.setAttribute("tabindex", "0");
        hud.setAttribute("aria-expanded", "false");
      }
      try { sessionStorage.setItem("v4_hud_open", isOpen ? "1" : "0"); } catch (e) {}
    }
    setState(open);

    on(hud, "click", function () {
      if (hud.classList.contains("is-collapsed")) setState(true);
    });
    on(hud, "keydown", function (e) {
      if (!hud.classList.contains("is-collapsed")) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setState(true); }
    });
    on(close, "click", function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
      setState(false);
      try { hud.focus(); } catch (er) {}
    });
  }

  /* ============================================================
     6b. BAR CTA — the pn-bar's "Reveal my animal" links to
     /index.html#read everywhere; on the homepage we intercept it,
     glide to the reader, and focus the first segment (the same
     walk the rail CTA does pre-reveal).
     ============================================================ */
  function initBarCta() {
    if (!$("#read")) return; // not the homepage: let the anchor navigate
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest(".pn-cta") : null;
      if (!a) return;
      var read = $("#read");
      if (!read) return;
      e.preventDefault();
      if (read.scrollIntoView) {
        read.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
      }
      var seg = $("#omSeg");
      var target = (seg && !seg.hidden) ? $(".om-seg-m", seg) : $("#birthDate");
      if (target) {
        window.setTimeout(function () {
          try { target.focus({ preventScroll: true }); }
          catch (er) { try { target.focus(); } catch (er2) {} }
        }, REDUCE ? 0 : 350);
      }
    });
  }

  /* ============================================================
     UNLOCK-CARD VEILS (click-to-reveal reading variety).
     The card copy ships fully visible in the served HTML (SEO /
     no-JS). With JS live and the animal not yet revealed, each
     card's .u-body is veiled (CSS blur + one-line clip, never
     display:none) behind a small "Reveal" affordance; clicking the
     card or the button lifts the veil with a smooth transition.
     Once the visitor's animal is revealed (data-revealed="1" on
     #unlockGrid, painted by paintUnlocks) every veil lifts itself.
     ============================================================ */
  function initVeils() {
    var grid = $("#unlockGrid");
    if (!grid) return;
    if (grid.getAttribute("data-revealed") === "1") return; // already open

    var cards = [].slice.call(grid.querySelectorAll(".unlockCard"));
    cards.forEach(function (card) {
      var body = card.querySelector(".u-body");
      if (!body) return;
      card.classList.add("is-veiled");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "u-reveal";
      btn.textContent = "Reveal ✦";
      var h = card.querySelector("h3");
      btn.setAttribute("aria-expanded", "false");
      if (h && h.textContent) btn.setAttribute("aria-label", "Reveal: " + h.textContent);
      body.insertAdjacentElement("afterend", btn);

      function unveil() {
        card.classList.remove("is-veiled");
        btn.setAttribute("aria-expanded", "true");
      }
      btn.addEventListener("click", function (e) { e.stopPropagation(); unveil(); });
      card.addEventListener("click", function () {
        if (card.classList.contains("is-veiled")) unveil();
      });
    });

    /* the naming lifts every veil: watch the flag paintUnlocks sets */
    try {
      var mo = new MutationObserver(function () {
        if (grid.getAttribute("data-revealed") === "1") {
          cards.forEach(function (card) { card.classList.remove("is-veiled"); });
          mo.disconnect();
        }
      });
      mo.observe(grid, { attributes: true, attributeFilter: ["data-revealed"] });
    } catch (e) {}
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    try { initMoon(); } catch (e) {}
    try { initSubHeight(); } catch (e) {}
    try { initSeason(); } catch (e) {}
    try { initSegments(); } catch (e) {}
    try { initHud(); } catch (e) {}
    try { initRevealCta(); } catch (e) {}
    try { initChallengeBtn(); } catch (e) {}
    try { initReset(); } catch (e) {}
    try { initBarCta(); } catch (e) {}
    try { paintUnlocks(); } catch (e) {}
    try { initVeils(); } catch (e) {}

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
