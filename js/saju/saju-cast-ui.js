/* saju-cast-ui.js — owns #scast-dock, the moonlight instrument on /elements/saju/.

   This file renders NOTHING of the reading itself (the page's inline models do
   that). It owns exactly one thing: the sticky bottom chart dock — the identity
   chip that wears the reader's Day Master, the 24-hour Korean hour beam, the
   true-solar conversion line, the palette toggle, the mute, and the three-state
   machine (open | min | closed).

   It CONSUMES window.SajuStudyChart:
     get / summary / setHour / getPref / setPref / makeToggle
   and re-renders off ONE document event, "saju:studychart"
     detail = { birth, out }   (out = the raw SajuEngine cast, or null)

   THE TRAP (already found once): summary().hourStr / hourIndex / hourRange are
   the NAIVE clock→branch map. After true-solar correction the real hour pillar
   can sit in a DIFFERENT branch. So the settled readout, the conversion line,
   and the mini pill all read out.pillars.hour.branch — the CORRECTED one — never
   the naive summary values. (The naive branch is used only for the instantaneous
   scrub readout and the pentatonic tick, before the throttled re-cast lands.)

   The dock wears the Day Master: data-el on #scast-dock ← the element of
   out.day_master. sajuPalette="moonlight" forces data-el="none" (moonlight),
   removing hue as an information channel — the accessible mode.

   Sound is 궁상각치우: each branch sounds the 오음 note of its OWN element, the
   four Earth branches (진술축미) separated by octave so the scale still rises.
   Sine, 2ms attack / 70ms decay, gain 0.05. Fires only on a branch-boundary
   crossing while scrubbing, throttled 70ms, gesture-only, lazy AudioContext.
   Silent under prefers-reduced-motion. Nothing ever autoplays.

   Plain browser JS. No modules. file:// safe. Idempotent. */
(function () {
  "use strict";
  if (window.__sajuCastUI) return;
  window.__sajuCastUI = true;

  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  ready(function () {
    var SC = window.SajuStudyChart;
    if (!SC) return;
    var ENG = window.SajuEngine || null;

    /* ---- reference tables (branch-indexed: 0=자 … 11=해) ---- */
    var BRANCH_KO  = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
    var BRANCH_ROM = ["Ja", "Chuk", "In", "Myo", "Jin", "Sa", "O", "Mi", "Sin", "Yu", "Sul", "Hae"];
    /* the two-hour clock span of each branch (자 straddles midnight) */
    var BRANCH_RANGE = ["23–01", "01–03", "03–05", "05–07", "07–09", "09–11",
                        "11–13", "13–15", "15–17", "17–19", "19–21", "21–23"];

    /* 궁상각치우 — each branch's note is the 오음 of its OWN element, from
       SajuEngine.REF.BRANCH_EL. do=C 궁 土 · re=D 상 金 · mi=E 각 木 · sol=G 치 火 · la=A 우 水.
       The four Earth branches (축진미술) would all be 궁/do; the spec's octave-by-position
       rule separates them (축 do4 · 진 do5 · 미 do5 · 술 do6) so the scale still rises. Every
       other element also rises an octave on its second branch, so the whole day ascends and
       no interval in the C-major-pentatonic set is ever dissonant. Frequencies A4=440 ET. */
    var BRANCH_FREQ = [
      440.00,   /* 0  자 水 우 la  A4 */
      261.63,   /* 1  축 土 궁 do  C4 (do4) */
      329.63,   /* 2  인 木 각 mi  E4 */
      659.25,   /* 3  묘 木 각 mi  E5 */
      523.25,   /* 4  진 土 궁 do  C5 (do5) */
      392.00,   /* 5  사 火 치 sol G4 */
      783.99,   /* 6  오 火 치 sol G5 */
      523.25,   /* 7  미 土 궁 do  C5 (do5) */
      587.33,   /* 8  신 金 상 re  D5 */
      1174.66,  /* 9  유 金 상 re  D6 */
      1046.50,  /* 10 술 土 궁 do  C6 (do6) */
      880.00    /* 11 해 水 우 la  A5 */
    ];

    var BEAM_MAX = 23;   /* clock hours 0..23; the ONE number the thumb, notches and bloom derive from */
    var BEAM_EMPTY = "--:-- · 시 미정";   /* the readout's placeholder — the plate is never empty, never resizes */

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function mod(n, m) { return ((n % m) + m) % m; }
    /* preview's branchOf: 자 covers hours 23 & 0, 축 covers 1 & 2, … */
    function branchOf(hr) { return Math.floor((mod(hr, 24) + 1) % 24 / 2); }
    function clock12(hr) { var h = mod(hr, 24) % 12; if (h === 0) h = 12; return h + ":00 " + (mod(hr, 24) < 12 ? "AM" : "PM"); }
    function isoDate(b) { return b.year + "-" + pad(b.month) + "-" + pad(b.day); }
    function elLower(out) {
      if (!out || out.error || !out.day_master || !out.day_master.element) return null;
      return String(out.day_master.element).toLowerCase();
    }
    function branchLabel(idx) { return BRANCH_KO[idx] + "시 " + BRANCH_RANGE[idx]; }  /* "술시 19–21" */

    /* ---- sound: own lazy AudioContext, created only inside a gesture handler ---- */
    var actx = null;
    function reduceMotion() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    function soundOn() { try { return SC.getPref("sajuSound") !== false; } catch (e) { return true; } }
    function tone(freq) {
      if (!soundOn() || reduceMotion()) return;   /* muted or calm-mode: never even build a ctx */
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        if (!actx) actx = new AC();
        if (actx.state !== "running" && actx.resume) actx.resume();
        var t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq || 523.25, t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.05, t + 0.002);   /* 2ms attack */
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);  /* 70ms decay */
        o.connect(g); g.connect(actx.destination);
        o.start(t); o.stop(t + 0.09);
      } catch (e) {}
    }

    function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

    /* ---- module state (last event) ---- */
    var lastBirth = null, lastOut = null;
    var dockEls = null;

    /* --dk-pos is where the thumb's CENTRE is, and therefore where the bloom belongs.
       Hand the browser its own formula back; the notches resolve --dk-t through the same
       calc in CSS, so they line up for free. Written on the range element only, never on
       <html> — a per-frame custom-property write on the root restyles the whole document. */
    function beamPos(v) { return "calc(var(--dk-thumb) / 2 + " + (v / BEAM_MAX) + " * (100% - var(--dk-thumb)))"; }

    function ensureDock() {
      if (dockEls) return dockEls;

      var dock = document.getElementById("scast-dock");
      if (!dock) { dock = el("div"); dock.id = "scast-dock"; document.body.appendChild(dock); }
      dock.setAttribute("role", "region");
      dock.setAttribute("aria-label", "Chart time controls");
      dock.setAttribute("data-state", "open");
      dock.setAttribute("data-el", "none");

      var inner = el("div", "scast-dock-inner");

      /* the conversion line floats ABOVE the 44px row (see CSS); hidden until a known hour */
      var conv = el("p", "scast-dk-conv");
      conv.id = "scast-dk-conv";
      conv.hidden = true;
      inner.appendChild(conv);

      var chart = el("div", "scast-chart");

      /* identity chip: sigil (the reader's Day Master stem) + eyebrow over the date */
      var idBtn = el("button", "scast-dk-id"); idBtn.type = "button";
      idBtn.setAttribute("aria-label", "Your Saju chart");
      var sigil = el("span", "scast-dk-sigil", "☾");  /* ☾ moonlight glyph before a cast */
      sigil.setAttribute("aria-hidden", "true");
      idBtn.appendChild(sigil);
      var idText = el("span", "scast-dk-idtext");
      idText.appendChild(el("span", "scast-dk-eyebrow", "Your chart"));
      var dateEl = el("span", "scast-dk-date", "");
      idText.appendChild(dateEl);
      idBtn.appendChild(idText);
      idBtn.setAttribute("aria-label", "Your Saju chart — edit the birth details in the form above");
      idBtn.addEventListener("click", function () {
        var field = document.getElementById("sMask") || document.getElementById("gateForm") || document.querySelector("form");
        if (field && field.scrollIntoView) { try { field.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { field.scrollIntoView(); } }
        var mask = document.getElementById("sMask");
        if (mask) { try { mask.focus({ preventScroll: true }); } catch (e) { try { mask.focus(); } catch (e2) {} } }
      });
      chart.appendChild(idBtn);

      /* the hour beam: a 24-hour clock scrubber, birthplace-local. Scrub (or tap an even-hour
         tick, or the −/+ steps) → SajuStudyChart.setHour(hour) → saju:studychart → the page
         re-casts. The beam IS the hour control; there is no birth-hour <select>. It is flanked
         by −/+ step buttons — a thin track is a mouse instrument, and most phone readers will
         only ever move the hour with the steps (mirrors the Purple Star dock). */
      var beamRow = el("div", "scast-dk-beamrow");
      function stepBtn(dir, glyph, label) {
        var b = el("button", "scast-dk-step", glyph); b.type = "button";
        b.setAttribute("aria-label", label);
        b.addEventListener("click", function () {
          if (!lastBirth) return;
          var base = (lastBirth.hour == null) ? (+range.value) : lastBirth.hour;
          var next = Math.min(BEAM_MAX, Math.max(0, base + dir));
          if (next === base && lastBirth.hour != null) return;
          var bi = branchOf(next);
          range.value = String(next);
          range.style.setProperty("--dk-pos", beamPos(next));
          cur.innerHTML = clock12(next) + " · <b>" + branchLabel(bi) + "</b>";
          cur.classList.remove("is-empty");
          tone(BRANCH_FREQ[bi]);
          SC.setHour(next);
        });
        return b;
      }
      beamRow.appendChild(stepBtn(-1, "−", "One hour earlier"));
      var beam = el("div", "scast-dk-beam");
      var range = document.createElement("input");
      range.type = "range"; range.className = "scast-dk-beam-range";
      range.min = "0"; range.max = String(BEAM_MAX); range.step = "1"; range.value = "12";
      range.setAttribute("aria-label", "Birth hour — 24 clock hours, birthplace-local");
      beam.appendChild(range);
      var ticksWrap = el("div", "scast-dk-beam-ticks");
      var tickEls = [];
      for (var ti = 0; ti < 12; ti++) {
        (function (idx) {
          var hr = idx * 2, bi = branchOf(hr);
          var tk = el("button", "scast-dk-tick"); tk.type = "button";
          /* --dk-t: this notch on the SAME scale the thumb rides — hour/BEAM_MAX, unitless.
             CSS resolves it through left: thumbW/2 + var(--dk-t) * (100% - thumbW). */
          tk.style.setProperty("--dk-t", String(hr / BEAM_MAX));
          tk.setAttribute("aria-label", clock12(hr) + " · " + BRANCH_KO[bi] + "시 " + BRANCH_ROM[bi] + "si " + BRANCH_RANGE[bi]);
          tk.appendChild(el("b", null, hr === 0 ? "12AM" : (hr === 12 ? "12PM" : String(hr % 12))));
          tk.addEventListener("click", function () { if (lastBirth) { SC.setHour(hr); tone(BRANCH_FREQ[branchOf(hr)]); } });
          ticksWrap.appendChild(tk); tickEls.push(tk);
        })(ti);
      }
      beam.appendChild(ticksWrap);
      beamRow.appendChild(beam);
      beamRow.appendChild(stepBtn(1, "+", "One hour later"));
      chart.appendChild(beamRow);

      /* live readout — an <output>, aria-live="off" on purpose: a live region would
         machine-gun the screen reader on every step of a scrub. Fixed width, never empty
         (BEAM_EMPTY) so the instrument's geometry never lurches when an hour is chosen. */
      var cur = document.createElement("output");
      cur.className = "scast-dk-beam-cur is-empty";
      cur.setAttribute("aria-live", "off");
      cur.textContent = BEAM_EMPTY;
      chart.appendChild(cur);

      /* right-edge tools: palette toggle, mute, minimize, close */
      var tools = el("div", "scast-dk-tools");

      /* palette toggle (전통 / Moonlight), persisted as sajuPalette by makeToggle itself */
      var pal = SC.makeToggle("sajuPalette", [["tradition", "전통"], ["moonlight", "Moonlight"]], function () { applyPalette(); });
      pal.el.setAttribute("aria-label", "Colour palette — Moonlight uses one pale palette and removes hue as an information channel (also the accessible mode)");
      pal.el.title = "Moonlight: one pale palette, no hue as an information channel — the accessible mode.";
      pal.setAvailable(true);
      tools.appendChild(pal.el);

      var soundBtn = el("button", "scast-dk-sound"); soundBtn.type = "button";
      soundBtn.textContent = "◍";  /* ◍ */
      tools.appendChild(soundBtn);

      var collapseBtn = el("button", "scast-dk-collapse"); collapseBtn.type = "button";
      collapseBtn.textContent = "▾";  /* ▾ */
      collapseBtn.setAttribute("aria-expanded", "true");
      collapseBtn.setAttribute("aria-controls", "scast-dock");
      collapseBtn.setAttribute("aria-label", "Minimize the chart dock");
      tools.appendChild(collapseBtn);

      var closeBtn = el("button", "scast-dk-close"); closeBtn.type = "button";
      closeBtn.textContent = "✕";  /* ✕ */
      closeBtn.setAttribute("aria-label", "Hide the chart dock");
      tools.appendChild(closeBtn);

      chart.appendChild(tools);
      inner.appendChild(chart);

      /* minimized pill (shown only in data-state="min") */
      var mini = el("button", "scast-dk-mini"); mini.type = "button";
      var miniSigil = el("span", "scast-dk-sigil", "☾"); miniSigil.setAttribute("aria-hidden", "true");
      mini.appendChild(miniSigil);
      var miniTxt = el("span", "scast-dk-mini-txt", "");
      mini.appendChild(miniTxt);
      var miniCaret = el("span", null, "▴"); miniCaret.setAttribute("aria-hidden", "true");
      mini.appendChild(miniCaret);
      inner.appendChild(mini);

      dock.appendChild(inner);

      /* the closed-state launcher lives on <body> (a sibling of the dock) so it survives the
         dock's own hidden state. One per document, addressed by id (#scast-launcher). */
      var launcher = document.getElementById("scast-launcher");
      if (!launcher) {
        launcher = el("button", null, "☾");
        launcher.id = "scast-launcher"; launcher.type = "button";
        launcher.setAttribute("aria-label", "Show the chart dock");
        launcher.hidden = true;
        document.body.appendChild(launcher);
      }

      /* ---- body padding so the fixed dock never covers the footer ---- */
      function padBody() {
        var hgt = (dock.dataset.state === "closed" || dock.hidden) ? 0 : dock.offsetHeight;
        document.body.style.paddingBottom = hgt ? (hgt + 14) + "px" : "";
      }
      window.addEventListener("resize", padBody);
      if (window.ResizeObserver) { try { new ResizeObserver(padBody).observe(dock); } catch (e) {} }

      /* ---- the three-state machine: open | min | closed ----
         data-state is the single source of truth the CSS styles from. Persisted as sajuDockState.
         Only an OPEN dock owns the bottom edge, so only an open one folds #pn-dock on phones. */
      function setState(next, persist) {
        if (next !== "open" && next !== "min" && next !== "closed") next = "open";
        dock.dataset.state = next;
        dock.hidden = (next === "closed");
        launcher.hidden = (next !== "closed");
        collapseBtn.setAttribute("aria-expanded", next === "open" ? "true" : "false");
        document.body.classList.toggle("scast-dock-open", next === "open");
        if (persist) { try { SC.setPref("sajuDockState", next); } catch (e) {} }
        padBody();
      }
      collapseBtn.addEventListener("click", function () { setState("min", true); tone(BRANCH_FREQ[6]); });
      closeBtn.addEventListener("click", function () { setState("closed", true); tone(BRANCH_FREQ[4]); });
      mini.addEventListener("click", function () { setState("open", true); tone(BRANCH_FREQ[9]); });
      launcher.addEventListener("click", function () {
        setState("open", true); tone(BRANCH_FREQ[9]);
        try { collapseBtn.focus(); } catch (e) {}   /* focus return to the control that mirrors the launcher */
      });
      /* Escape tucks the dock away — but ONLY from within it. The listener sits on the dock, so
         it hears keydowns from focus already inside: non-modal toolbar, no focus trap, no global key. */
      dock.addEventListener("keydown", function (e) {
        if ((e.key === "Escape" || e.key === "Esc") && dock.dataset.state === "open") {
          setState("min", true);
          try { mini.focus(); } catch (err) {}
          tone(BRANCH_FREQ[6]);
        }
      });

      /* ---- mute toggle. aria-pressed reads as "sound on": ◍/pressed = audible, ◌/unpressed =
         muted. Persisted as sajuSound. Un-muting confirms itself with one tick. ---- */
      function applyMute() {
        var muted = !soundOn();
        soundBtn.setAttribute("aria-pressed", muted ? "false" : "true");
        soundBtn.textContent = muted ? "◌" : "◍";  /* ◌ : ◍ */
        soundBtn.setAttribute("aria-label", muted ? "Unmute interface sound" : "Mute interface sound");
      }
      soundBtn.addEventListener("click", function () {
        var nowOn = !soundOn();
        try { SC.setPref("sajuSound", nowOn); } catch (e) {}
        applyMute();
        if (nowOn) tone(BRANCH_FREQ[7]);   /* one confirmation tick of the sound they just restored */
      });
      applyMute();

      /* ---- scrub: instant local readout + thumb bloom, a 오음 tick ONLY on a branch-boundary
         crossing (throttled 70ms, never on programmatic sets), and a throttled re-cast (~120ms).
         The instant readout is the NAIVE branch; the settled/corrected readout arrives on the
         saju:studychart event (renderDock), which reads out.pillars.hour.branch. ---- */
      var beamTimer = null, lastScrubBranch = branchOf(+range.value), lastTickAt = 0;
      range.addEventListener("input", function () {
        var hr = +range.value;
        range.style.setProperty("--dk-pos", beamPos(hr));
        var bi = branchOf(hr);
        cur.innerHTML = clock12(hr) + " · <b>" + branchLabel(bi) + "</b>";
        cur.classList.remove("is-empty");
        if (bi !== lastScrubBranch) {
          lastScrubBranch = bi;
          var now = (window.performance && performance.now) ? performance.now() : Date.now();
          if (now - lastTickAt >= 70) { lastTickAt = now; tone(BRANCH_FREQ[bi]); }
        }
        if (beamTimer) window.clearTimeout(beamTimer);
        beamTimer = window.setTimeout(function () { beamTimer = null; if (lastBirth) SC.setHour(hr); }, 120);
      });

      dockEls = {
        dock: dock, sigil: sigil, miniSigil: miniSigil, dateEl: dateEl, cur: cur, conv: conv,
        range: range, tickEls: tickEls, miniTxt: miniTxt, launcher: launcher,
        setState: setState, padBody: padBody,
        setLastScrubBranch: function (b) { lastScrubBranch = b; }
      };

      /* restore the reader's last dock state (never auto-open one they deliberately closed) */
      var start = "open";
      try { var s = SC.getPref("sajuDockState"); if (s === "open" || s === "min" || s === "closed") start = s; } catch (e) {}
      setState(start, false);
      return dockEls;
    }

    /* palette: moonlight forces data-el="none" (hue removed); tradition wears the element */
    function applyPalette() {
      if (!dockEls) return;
      var moonlight = false;
      try { moonlight = SC.getPref("sajuPalette") === "moonlight"; } catch (e) {}
      var element = elLower(lastOut);
      dockEls.dock.setAttribute("data-el", moonlight ? "none" : (element || "none"));
    }

    /* build the conversion line from the real engine chain + its disclosures */
    function buildConv(out) {
      if (!out || out.error || !out.pillars) return "";
      if (out.three_pillar_mode || !out.pillars.hour) {
        /* no hour yet — invite the reader to find it on the beam, and remind them their
           Zodi Animal (the year branch) is already set, so the reading isn't empty. */
        var yba = out.pillars.year && out.pillars.year.branch;
        var animal = yba && yba.animal ? yba.animal : "";
        return "시주 미정 · slide to find your hour" + (animal ? " — your " + animal + " is already set" : "");
      }
      var hb = out.pillars.hour.branch;
      var hbLabel = "<b>" + branchLabel(hb.index) + "</b>";
      var solar = out.solar_time;
      var eraLabel = (out.time_resolution && out.time_resolution.standard_time) ? out.time_resolution.standard_time : "";
      var clock = (solar && solar.clock) ? solar.clock : ((out.input && out.input.time) ? out.input.time : "");
      var head = clock + (eraLabel ? " " + eraLabel : "");

      var line;
      if (solar && solar.applied) {
        line = head + " → " + solar.true_solar + " true solar → " + hbLabel;
      } else {
        line = head + " → " + hbLabel;   /* correction skipped — no fake true-solar value */
      }

      /* disclosures — never fake numbers, always name what was skipped and why */
      var codes = {};
      (out.warnings || []).forEach(function (w) { if (w && w.code) codes[w.code] = w; });
      var notes = [];
      if (codes.NO_LONGITUDE) notes.push("birthplace unknown, no solar correction");
      if (codes.FOREIGN_LONGITUDE_NO_OFFSET) notes.push("foreign birthplace, no UTC offset — solar correction skipped");
      if (codes.PRE_STANDARD_TIME) notes.push("pre-1908 local mean time, reduced precision");
      if (codes.ZI_HOUR_ROLLOVER) {
        var db = out.rule_profile && out.rule_profile.dayBoundary;
        notes.push("23:00시 — 야자시/조자시 fork; reading "
          + (db === "zi2300" ? "the next day’s 일주 (조자시)" : "this day’s 일주 (야자시)"));
      }
      if (codes.NEAR_HOUR_EDGE) {
        var adj = "";
        (out.variants || []).forEach(function (v) {
          if (v && v.code === "NEAR_HOUR_EDGE" && v.pillars && v.pillars.hour) adj = v.pillars.hour.branch.ko + "시";
        });
        notes.push("within 20 min of the 시 edge" + (adj ? " — adjacent hour " + adj : ""));
      }
      if (notes.length) line += " · " + notes.join(" · ");
      return line;
    }

    /* render the dock off the settled event — corrected values only */
    function renderDock(birth, out) {
      var els = ensureDock();
      lastBirth = birth; lastOut = out;
      document.body.classList.add("scast-dock-live");

      /* identity + palette */
      var dmChar = (out && out.day_master && out.day_master.char) ? out.day_master.char : "☾";
      els.sigil.textContent = dmChar;
      els.miniSigil.textContent = dmChar;
      els.launcher.textContent = dmChar;
      els.dateEl.textContent = isoDate(birth);
      applyPalette();

      var known = !!(out && !out.error && out.pillars && out.pillars.hour);
      var hb = known ? out.pillars.hour.branch : null;

      /* seed the beam: known hour parks the thumb there and lights the nearest even-hour tick;
         an unknown/three-pillar hour parks the thumb at noon, lights nothing, asserts nothing —
         the beam stays operable, so the first deliberate scrub sets a real hour and re-casts. */
      var beamVal = (birth.hour == null) ? 12 : birth.hour;
      els.range.value = String(beamVal);
      els.range.style.setProperty("--dk-pos", beamPos(beamVal));
      els.setLastScrubBranch(branchOf(beamVal));
      var evenHour = (birth.hour == null) ? -1 : (Math.round(birth.hour / 2) * 2) % 24;
      els.tickEls.forEach(function (tk, i) {
        var on = (i * 2) === evenHour && birth.hour != null;
        tk.classList.toggle("is-on", on);
        tk.setAttribute("aria-pressed", on ? "true" : "false");
      });

      /* settled readout — CORRECTED branch (never the naive summary value). The plate always
         prints: a known hour shows the corrected branch, an unknown one shows BEAM_EMPTY. */
      if (known && birth.hour != null) {
        els.cur.innerHTML = clock12(birth.hour) + " · <b>" + branchLabel(hb.index) + "</b>";
        els.cur.classList.remove("is-empty");
      } else {
        els.cur.textContent = BEAM_EMPTY;
        els.cur.classList.add("is-empty");
      }

      /* conversion line */
      var cl = buildConv(out);
      els.conv.innerHTML = cl;
      els.conv.hidden = !cl;

      /* mini pill summary */
      els.miniTxt.textContent = "YOUR CHART · " + isoDate(birth)
        + (known && birth.hour != null ? " · " + BRANCH_KO[hb.index] + "시 · " + clock12(birth.hour) : "");

      els.padBody();
    }

    /* Everything re-renders off the ONE event — the cast, every hour scrub, the palette
       toggle, and the restore-on-revisit broadcast. Nothing else drives the dock. */
    document.addEventListener("saju:studychart", function (e) {
      var d = e.detail || {};
      if (!d.birth) return;
      renderDock(d.birth, d.out || (SC.cast ? SC.cast() : null));
    });

    /* if a chart is already saved but the deferred broadcast hasn't fired yet, seed from summary */
    try {
      var sum = SC.summary && SC.summary();
      if (sum && sum.birth) renderDock(sum.birth, sum.out);
    } catch (e) {}
  });
})();
