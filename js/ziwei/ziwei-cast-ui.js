/* ziwei-cast-ui.js — the hero "cast your chart" widget.
   Birth date (required) + time (optional) + timezone + gender -> ZiweiData.lunar.castFromBirth ->
   renders the twelve-palace board. When the hour is unknown, the board is locked (every star's
   position depends on the hour) and only the hour-independent facts show.

   THE FORM
   - Birth date: masked MM/DD/YYYY text field + a gold calendar button -> the .pcast-cal popover.
   - Birth time: OURS, not <input type="time">. Native time inputs draw a different control on every
     platform (iOS centres a 24-hour stub, Chrome bolts on its own AM/PM), cannot be styled, and put
     the tap target wherever the OS likes. Instead: two numeric segments that hand off to each other
     (two digits — or a digit no second digit could extend — advances hour -> minute; Backspace at the
     head of the minute steps back into the hour and eats one digit), a 24h / AM·PM zgToggle persisted
     as the pref "clock12", and a gold clock button (twin of the calendar button) that opens the
     .pcast-clock face. tstate {h,m} is the 24-hour truth; the segments only ever display it.
   - Birth timezone: the option labels ("China / Taiwan / Singapore (UTC+8)") are far longer than a
     half-width field, so the native select lies transparent over a short "UTC+8" plate, with the
     region spelled out beneath. Same trick as the dock's tz chip. Nothing is ever ellipsised.

   THE DOCK (#pcast-dock)
   The live readout is a FIXED-WIDTH plate that always prints something (a dim "no hour yet" before an
   hour exists). It used to collapse to zero width, so casting an hour shoved every control in the bar
   sideways: the geometry of an instrument must not depend on its reading.
   The beam is flanked by −/+ step buttons — a 4px track is not a thumb target — and its thumb and
   track thicken under a coarse pointer.
   State lives in ZiweiStudyChart (one source of truth); this file renders the reading and owns
   the sticky bottom chart dock: date chip, timezone select, a 24-hour Gregorian
   hour beam (scrub the clock and the whole page re-casts; the readout pairs 12-hour time with
   the branch hour and each branch boundary voices a pentatonic tick), a disclosure line that
   speaks ONLY when the reading is ambiguous (no hour yet, or the 23:xx late-子時 boundary), and
   the "Current lesson" slot the learning track's bottom bar mounts into.
   The dock runs a three-state machine on data-state = open | min | closed (persisted via the
   studyChart pref "dockState"; the old boolean "dockCollapsed" migrates to "min"): the collapse
   chevron minimizes to a pill, the ✕ hides it behind a body launcher, Escape-from-within tucks
   it to min. Interface sound is mute-toggleable, persisted as pref "muted".
   The beam IS the hour control — there is no separate hour <select> in the dock; it said the
   same thing a third time and squeezed the timezone select. "I don't know" lives on the form.
   Also ships two small shared APIs other scripts may reuse:
     window.ZodiTick(freq) — one soft UI tick (lazy AudioContext, gesture-only, calm-mode aware;
                             no arg = the original sweep, a frequency = a pitched percussive blip)
     window.zgToggle(cfg) — glowing segmented toggle with a sliding .zg-thumb
   Everything re-renders off "psa:studychart".
   Plain browser JS, file://-safe, no modules. */
(function () {
  "use strict";
  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  ready(function () {
    var form = document.getElementById("pcast-form");
    var result = document.getElementById("pcast-result");
    if (!form || !result || !window.ZiweiData || !window.ZiweiData.lunar) return;
    var L = window.ZiweiData.lunar;
    /* the one source of truth. Resolved before the form is built — the birth-time control reads
       the "clock12" pref while it is still assembling itself. */
    var SC = window.ZiweiStudyChart || null;

    /* ---- reference maps ---- */
    var PAL_EN = {
      "ming-gong": "Life", "xiong-di-gong": "Siblings", "fu-qi-gong": "Spouse", "zi-nu-gong": "Children",
      "cai-bo-gong": "Wealth", "ji-e-gong": "Health", "qian-yi-gong": "Travel", "nu-pu-gong": "Friends",
      "guan-lu-gong": "Career", "tian-zhai-gong": "Property", "fu-de-gong": "Fortune", "fu-mu-gong": "Parents"
    };
    /* Authored prose from the data files goes through this before any innerHTML. The strings are
       ours, not user input, but "&" and "<" appear in copy and a raw ampersand is invalid markup. */
    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    var palById = {};
    (window.ZiweiData.palaces || []).forEach(function (p) { palById[p.id] = p; });
    var starById = {};
    (window.ZiweiData.principalStars || []).forEach(function (s) { starById[s.id] = s; });
    /* year-stem -> the four transformation target star ids (hour-independent) */
    var HUA = {
      "甲": { lu: "lian-zhen", quan: "po-jun", ke: "wu-qu", ji: "tai-yang" },
      "乙": { lu: "tian-ji", quan: "tian-liang", ke: "zi-wei", ji: "tai-yin" },
      "丙": { lu: "tian-tong", quan: "tian-ji", ke: "wen-chang", ji: "lian-zhen" },
      "丁": { lu: "tai-yin", quan: "tian-tong", ke: "tian-ji", ji: "ju-men" },
      "戊": { lu: "tan-lang", quan: "tai-yin", ke: "you-bi", ji: "tian-ji" },
      "己": { lu: "wu-qu", quan: "tan-lang", ke: "tian-liang", ji: "wen-qu" },
      "庚": { lu: "tai-yang", quan: "wu-qu", ke: "tai-yin", ji: "tian-tong" },
      "辛": { lu: "ju-men", quan: "tai-yang", ke: "wen-qu", ji: "wen-chang" },
      "壬": { lu: "tian-liang", quan: "zi-wei", ke: "zuo-fu", ji: "wu-qu" },
      "癸": { lu: "po-jun", quan: "ju-men", ke: "tai-yin", ji: "tan-lang" }
    };
    var HUA_LABEL = { lu: "祿", quan: "權", ke: "科", ji: "忌" };
    var HUA_EN = { lu: "Flow", quan: "Power", ke: "Shine", ji: "Hook" };
    /* fixed board layout: branch index -> [row, col] on a 4x4 ring */
    var RING = { 5: [0, 0], 6: [0, 1], 7: [0, 2], 8: [0, 3], 4: [1, 0], 9: [1, 3], 3: [2, 0], 10: [2, 3], 2: [3, 0], 1: [3, 1], 0: [3, 2], 11: [3, 3] };
    var HOURS = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    var HOUR_RANGE = ["23–01", "01–03", "03–05", "05–07", "07–09", "09–11", "11–13", "13–15", "15–17", "17–19", "19–21", "21–23"];
    /* The hour we stand in when the reader has none. 12 falls in 午時 (11–13), the day's middle gate:
       the guess that is fewest branches away from whatever the truth turns out to be. It is a display
       assumption only — birth.hour stays null everywhere it is stored. */
    var NOON_HOUR = 12;
    /* the dock beam's <input type=range> max. Hours are 0..23, so 23 — and the tick notches,
       the thumb bloom, and the range itself all derive their position from this one number.
       Hard-coding it in three places is how the notches drifted off the thumb. */
    var BEAM_MAX = 23;

    var AUX_HANT = { "wen-chang": "文昌", "wen-qu": "文曲", "zuo-fu": "左輔", "you-bi": "右弼" };
    var AUX_PY = { "wen-chang": "Wénchāng", "wen-qu": "Wénqū", "zuo-fu": "Zuǒfǔ", "you-bi": "Yòubì" };
    var BRANCH_PY = ["zǐ", "chǒu", "yín", "mǎo", "chén", "sì", "wǔ", "wèi", "shēn", "yǒu", "xū", "hài"];
    function h(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
    function starName(id) { var s = starById[id]; return s ? s.hant : (AUX_HANT[id] || id); }
    /* the data stores elements as yin/yang pairs ("yin-earth", "yang-fire");
       the board only colors by the bare element — strip the polarity */
    function elemOf(e) { if (!e) return "none"; var p = String(e).split("-"); return p[p.length - 1] || "none"; }
    /* every star a non-reader can actually read: hant + pinyin + literal + editorial title + element */
    function starMeta(id) {
      var s = starById[id];
      if (s) return { hant: s.hant, py: s.pinyin || "", title: (s.editorial && s.editorial.title) || "", literal: s.literal || "", elem: elemOf(s.element) };
      return { hant: AUX_HANT[id] || id, py: AUX_PY[id] || "", title: "", literal: "", elem: "none" };
    }
    /* speak a star's name — never autoplays, only ever called from a tap or key press.
       ZiweiData.speak knows the 14 principal stars plus the four transformation-target
       auxiliaries; anything else falls through to the site-wide zaSpeak voice when a page
       ships it. */
    function speakStar(id, hant) {
      try {
        var ok = (window.ZiweiData && typeof window.ZiweiData.speak === "function") ? window.ZiweiData.speak(id) : false;
        if (!ok && !window.ZIWEI_SOUND_OPTOUT && typeof window.zaSpeak === "function") window.zaSpeak(hant);
      } catch (err) {}
    }
    /* one star chip, shared by board cells (.pcast-star) and reading lines (.pcast-star-full):
       pinyin on top so the latin reader lands first, hant beneath, data-elem for element color,
       a literal-translation tooltip (.pcast-star-tip, shown by CSS on hover/focus), and
       tap-to-pronounce. full=true adds the editorial title inline (.pcast-star-en). */
    function starEl(st, full) {
      var m = starMeta(st.id);
      var el = h("span", full ? "pcast-star-full" : "pcast-star");
      el.setAttribute("data-elem", m.elem);
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", (m.py ? m.py + " " : "") + m.hant + (m.literal ? " — " + m.literal : "") + " · tap to hear it spoken");
      if (m.py) el.appendChild(h("small", "pcast-star-py", m.py));
      var hant = h("b", "pcast-star-hant", m.hant);
      if (st.hua) hant.appendChild(h("sup", "pcast-hua pcast-hua-" + st.hua, HUA_LABEL[st.hua]));
      el.appendChild(hant);
      if (full && m.title) el.appendChild(h("span", "pcast-star-en", m.title));
      if (m.literal || m.title) {
        var tip = h("span", "pcast-star-tip");
        if (m.literal) tip.appendChild(h("span", "pcast-star-tip-lit", m.literal));
        if (m.title) tip.appendChild(h("span", "pcast-star-tip-title", m.title));
        el.appendChild(tip);
      }
      /* pronounce on the star itself; stop only this tap from bubbling into the cell's court-select */
      el.addEventListener("click", function (e) { e.stopPropagation(); speakStar(st.id, m.hant); });
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); speakStar(st.id, m.hant); } });
      return el;
    }
    function starFullEl(st) { return starEl(st, true); }

    /* ---- ZodiTick: the site's one soft UI tick. Lazy AudioContext (created on the first
       user gesture that asks for it), gain peaking ~0.05, hard stop. Never autoplays; silent
       entirely in calm mode (prefers-reduced-motion).
       ZodiTick(freq) — optional frequency. Called with NO argument it plays the original
       ~35ms 1400→900Hz sweep, byte-for-byte, so every existing caller (zgToggle, the dock
       collapse) is unchanged. Called WITH a frequency it plays a fixed-pitch percussive blip
       (~2ms attack, exponential decay to silence over ~70ms) — the dock's hour scrub asks for
       this so the twelve branch hours can each speak their own pentatonic pitch on one timbre. ---- */
    if (!window.ZodiTick) {
      window.ZodiTick = (function () {
        var ctx = null;
        return function (freq) {
          try {
            if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            if (!ctx) ctx = new AC();
            /* callers are all gesture handlers — resume here so the first tick isn't swallowed */
            if (ctx.state !== "running" && ctx.resume) ctx.resume();
            var t = ctx.currentTime;
            var osc = ctx.createOscillator(), g = ctx.createGain();
            osc.type = "triangle";
            if (typeof freq === "number" && isFinite(freq)) {
              /* pitched, percussive: struck rather than beeped. Kept in the 600–1400Hz band. */
              var f = Math.max(600, Math.min(1400, freq));
              osc.frequency.setValueAtTime(f, t);
              g.gain.setValueAtTime(0.0001, t);
              g.gain.exponentialRampToValueAtTime(0.05, t + 0.002);
              g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
              osc.connect(g); g.connect(ctx.destination);
              osc.start(t); osc.stop(t + 0.08);
            } else {
              /* the original soft tick — untouched, so existing callers sound identical */
              osc.frequency.setValueAtTime(1400, t);
              osc.frequency.exponentialRampToValueAtTime(900, t + 0.035);
              g.gain.setValueAtTime(0.0001, t);
              g.gain.exponentialRampToValueAtTime(0.05, t + 0.008);
              g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
              osc.connect(g); g.connect(ctx.destination);
              osc.start(t); osc.stop(t + 0.04);
            }
          } catch (err) {}
        };
      })();
    }

    /* ---- zgToggle: the glowing segmented toggle.
       cfg = { ariaLabel, value, options: [{ value, label, sub }], onChange(value) }
       Returns { el, set(value), value(), remeasure() }.
       Markup: .zg-toggle[role=tablist] > .zg-thumb + .zg-opt[role=tab]×n, each option
       <b>label</b><small>sublabel</small>. The absolutely-positioned .zg-thumb slides to
       the active option (left/width from offset measurement, re-measured on resize).
       Switching plays ZodiTick. Shared as window.zgToggle for other panels. ---- */
    function zgToggle(cfg) {
      var wrap = h("div", "zg-toggle");
      wrap.setAttribute("role", "tablist");
      if (cfg.ariaLabel) wrap.setAttribute("aria-label", cfg.ariaLabel);
      var thumb = h("span", "zg-thumb");
      thumb.setAttribute("aria-hidden", "true");
      wrap.appendChild(thumb);
      var cur = cfg.value, btns = [];
      (cfg.options || []).forEach(function (o) {
        var b = h("button", "zg-opt"); b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("data-value", String(o.value));
        b.appendChild(h("b", null, o.label));
        if (o.sub) b.appendChild(h("small", null, o.sub));
        b.addEventListener("click", function () {
          if (cur === o.value) return;
          set(o.value);
          tick(); /* mute-aware wrapper — the user's dock sound preference gates this too */
          if (cfg.onChange) cfg.onChange(o.value);
        });
        wrap.appendChild(b); btns.push(b);
      });
      function paint() {
        var active = null;
        btns.forEach(function (b) {
          var on = b.getAttribute("data-value") === String(cur);
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
          b.tabIndex = on ? 0 : -1;
          if (on) active = b;
        });
        if (active && active.offsetWidth) {
          thumb.style.left = active.offsetLeft + "px";
          thumb.style.width = active.offsetWidth + "px";
        }
      }
      function set(v) { cur = v; paint(); }
      function onResize() { if (!wrap.isConnected) { window.removeEventListener("resize", onResize); return; } paint(); }
      window.addEventListener("resize", onResize);
      /* offsets are 0 until the node joins the document — measure again on the next frame */
      if (window.requestAnimationFrame) window.requestAnimationFrame(paint); else window.setTimeout(paint, 0);
      return { el: wrap, set: set, value: function () { return cur; }, remeasure: paint };
    }
    window.zgToggle = zgToggle;

    /* ---- build the form controls ---- */
    var TZ = [
      ["auto", "Auto (device)"],
      ["-10", "Hawaii (UTC−10)"], ["-9", "Alaska (UTC−9)"], ["-8", "Pacific Time (UTC−8)"],
      ["-7", "Mountain Time (UTC−7)"], ["-6", "Central Time (UTC−6)"], ["-5", "Eastern Time (UTC−5)"],
      ["-4", "Atlantic (UTC−4)"], ["-3", "Brazil / Argentina (UTC−3)"],
      ["0", "UTC / London (UTC+0)"], ["1", "Central Europe (UTC+1)"], ["2", "Eastern Europe (UTC+2)"],
      ["3", "Moscow / Istanbul (UTC+3)"], ["3.5", "Iran (UTC+3:30)"], ["4", "Gulf (UTC+4)"],
      ["5", "Pakistan (UTC+5)"], ["5.5", "India (UTC+5:30)"], ["7", "Thailand / Vietnam (UTC+7)"],
      ["8", "China / Taiwan / Singapore (UTC+8)"], ["9", "Japan / Korea (UTC+9)"],
      ["9.5", "Central Australia (UTC+9:30)"], ["10", "Sydney (UTC+10)"], ["12", "New Zealand (UTC+12)"]
    ];
    form.innerHTML = "";
    /* the eyebrow names the INPUT, the button names the ACT. It used to say "Cast Your Court" three
       inches above a button reading "Cast My Court", which is the same words twice in one panel. */
    form.appendChild(h("p", "pcast-form-eyebrow", "Your birth moment"));
    form.appendChild(h("p", "pcast-form-optnote", "Enter your birth moment to see where the twelve palaces, stars, and timing doors begin. The chart is not the verdict of your life. It is the map you learn to read."));
    var row1 = h("div", "pcast-field pcast-date-field");
    var dl = labelFor("pcast-date", "Birth date"); dl.appendChild(h("span", "pcast-opt", " · MM/DD/YYYY")); row1.appendChild(dl);
    var dwrap = h("div", "pcast-date-wrap");
    var date = input("pcast-date", "text"); date.className = "pcast-input"; date.placeholder = "MM / DD / YYYY";
    date.setAttribute("inputmode", "numeric"); date.autocomplete = "off"; date.maxLength = 14;
    dwrap.appendChild(date);
    var calBtn = h("button", "pcast-cal-btn"); calBtn.type = "button"; calBtn.setAttribute("aria-label", "Open calendar");
    calBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><rect x="3" y="4.5" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    dwrap.appendChild(calBtn);
    row1.appendChild(dwrap);
    var cal = h("div", "pcast-cal"); cal.hidden = true; row1.appendChild(cal);
    cal.addEventListener("click", function (e) { e.stopPropagation(); }); // keep inside-clicks from the outside-close handler
    form.appendChild(row1);

    /* ---- calendar type: 陽曆 (solar / Gregorian) vs 農曆 (lunar), with a 閏月 (leap month) pill that
       only appears once the entered lunar year actually carries a leap twin of that month. Solar is
       the default — a Gregorian birth date is converted to lunar before casting. Lunar means the
       date is ALREADY lunar, so the court is cast from it directly with no conversion. Same shape as
       the Saju card, worn in the court's gold. ---- */
    var calType = "solar";
    var setCalType = function () {};
    var refreshLeap = function () {};
    (function buildCalType() {
      var field = h("div", "pcast-field");
      var lbl = h("label", "pcast-label", "Calendar"); lbl.id = "pcast-cal-lbl";
      lbl.appendChild(h("span", "pcast-opt", " · a lunar date is cast without conversion"));
      field.appendChild(lbl);
      var pills = h("div", "pcast-caltype");
      pills.setAttribute("role", "radiogroup");
      pills.setAttribute("aria-labelledby", "pcast-cal-lbl");
      var defs = [
        { cal: "solar", hant: "陽曆", en: "Solar",
          tip: "The standard Western (Gregorian) calendar — the date on your birth certificate or ID. Most people pick this." },
        { cal: "lunar", hant: "農曆", en: "Lunar",
          tip: "The traditional Chinese lunar calendar, still used on older family records and for festivals. Pick this only if your birthday was given to you in lunar months." },
        { cal: "lunar-leap", hant: "閏月", en: "Lunar leap",
          tip: "A rare 閏月 (intercalary “leap” month) inserted every few years. Only pick this if your record actually says 閏月." }
      ];
      var btns = {};
      defs.forEach(function (d, i) {
        var b = document.createElement("button");
        b.type = "button"; b.setAttribute("role", "radio"); b.setAttribute("data-cal", d.cal);
        b.setAttribute("aria-checked", d.cal === "solar" ? "true" : "false");
        b.tabIndex = d.cal === "solar" ? 0 : -1;
        b.title = d.tip; /* native hover as a baseline; the styled tooltip below is the rich version */
        var ko = h("span", "cal-ko", d.hant); ko.setAttribute("lang", "zh-Hant"); b.appendChild(ko);
        b.appendChild(h("span", "cal-en", d.en));
        var tip = h("span", "cal-tip", d.tip); tip.id = "pcast-caltip-" + d.cal;
        tip.setAttribute("role", "tooltip"); b.appendChild(tip);
        b.setAttribute("aria-describedby", tip.id);
        if (d.cal === "lunar-leap") b.hidden = true;
        b.addEventListener("click", function () { setCalType(d.cal); });
        btns[d.cal] = b; pills.appendChild(b);
      });
      field.appendChild(pills);
      form.appendChild(field);

      setCalType = function (cal) {
        if (btns[cal] && btns[cal].hidden) cal = "lunar"; /* leap requested while unavailable */
        calType = cal;
        Object.keys(btns).forEach(function (k) {
          var on = k === cal;
          btns[k].setAttribute("aria-checked", on ? "true" : "false");
          btns[k].tabIndex = on ? 0 : -1;
        });
      };

      pills.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        var order = defs.map(function (d) { return d.cal; }).filter(function (c) { return !btns[c].hidden; });
        var i = order.indexOf(calType), dir = e.key === "ArrowRight" ? 1 : -1;
        var next = order[(i + dir + order.length) % order.length];
        e.preventDefault(); setCalType(next); btns[next].focus();
      });

      /* 閏月 shows only when the entered year+month has a real leap twin (SC.leapMonthOf). */
      refreshLeap = function () {
        var p = parseDate(date.value), has = false;
        if (p && L.leapMonthOf) { try { has = (L.leapMonthOf(p.year) === p.month); } catch (e) { has = false; } }
        btns["lunar-leap"].hidden = !has;
        if (!has && calType === "lunar-leap") setCalType("lunar");
      };
      date.addEventListener("input", refreshLeap);
      refreshLeap();
    })();

    var calState = { y: 1995, m: 0, sel: null };
    function fmtDigits(s) { var d = s.replace(/\D/g, "").slice(0, 8); var o = d.slice(0, 2); if (d.length > 2) o += "/" + d.slice(2, 4); if (d.length > 4) o += "/" + d.slice(4, 8); return o; }
    date.addEventListener("input", function () { date.value = fmtDigits(date.value); if (parseDate(date.value) && !cal.hidden) { syncCalToInput(); renderCal(); } });
    calBtn.addEventListener("click", function (e) { e.stopPropagation(); if (cal.hidden) openCal(); else cal.hidden = true; });
    document.addEventListener("click", function (e) { if (!cal.hidden && !row1.contains(e.target)) cal.hidden = true; });
    function syncCalToInput() { var p = parseDate(date.value); if (p) { calState.y = p.year; calState.m = p.month - 1; calState.sel = { y: p.year, m: p.month - 1, d: p.day }; } }
    /* Exactly one popover at a time. Both triggers call stopPropagation to survive their own
       outside-click closers, which means neither can rely on the other's document listener to
       shut it — each opener must close its sibling by hand. (closeClock is a hoisted declaration
       defined further down with the time field; it is only ever CALLED after init.) */
    function openCal() { closeClock(); syncCalToInput(); cal.hidden = false; renderCal(); }
    function parseDate(v) { var m = (v || "").match(/^\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})\s*$/); if (!m) return null; var mo = +m[1], da = +m[2], yr = +m[3]; if (mo < 1 || mo > 12 || da < 1 || da > 31 || yr < 1900) return null; return { year: yr, month: mo, day: da }; }
    function renderCal() {
      cal.innerHTML = "";
      var head = h("div", "pcast-cal-head");
      head.appendChild(navBtn("‹", -1));
      var mid = h("div", "pcast-cal-selwrap");
      var mSel = document.createElement("select"); mSel.className = "pcast-cal-sel"; mSel.setAttribute("aria-label", "Month");
      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach(function (nm, i) { var o = document.createElement("option"); o.value = i; o.textContent = nm; if (i === calState.m) o.selected = true; mSel.appendChild(o); });
      mSel.addEventListener("change", function () { calState.m = +mSel.value; renderCal(); });
      var ySel = document.createElement("select"); ySel.className = "pcast-cal-sel"; ySel.setAttribute("aria-label", "Year");
      var nowY = new Date().getFullYear();
      for (var yy = nowY + 1; yy >= 1900; yy--) { var o2 = document.createElement("option"); o2.value = yy; o2.textContent = yy; if (yy === calState.y) o2.selected = true; ySel.appendChild(o2); }
      ySel.addEventListener("change", function () { calState.y = +ySel.value; renderCal(); });
      mid.appendChild(mSel); mid.appendChild(ySel); head.appendChild(mid);
      head.appendChild(navBtn("›", 1));
      cal.appendChild(head);
      var dow = h("div", "pcast-cal-dow"); ["S", "M", "T", "W", "T", "F", "S"].forEach(function (d) { dow.appendChild(h("span", null, d)); }); cal.appendChild(dow);
      var grid = h("div", "pcast-cal-grid");
      var first = new Date(calState.y, calState.m, 1).getDay();
      var days = new Date(calState.y, calState.m + 1, 0).getDate();
      for (var i = 0; i < first; i++) grid.appendChild(h("span", "pcast-cal-empty"));
      for (var dnum = 1; dnum <= days; dnum++) {
        var bd = h("button", "pcast-cal-day", String(dnum)); bd.type = "button";
        if (calState.sel && calState.sel.y === calState.y && calState.sel.m === calState.m && calState.sel.d === dnum) bd.classList.add("is-sel");
        (function (dd) { bd.addEventListener("click", function () { date.value = pad(calState.m + 1) + "/" + pad(dd) + "/" + calState.y; calState.sel = { y: calState.y, m: calState.m, d: dd }; cal.hidden = true; }); })(dnum);
        grid.appendChild(bd);
      }
      cal.appendChild(grid);
      function navBtn(t, dir) { var x = h("button", "pcast-cal-nav", t); x.type = "button"; x.addEventListener("click", function () { calState.m += dir; if (calState.m < 0) { calState.m = 11; calState.y--; } if (calState.m > 11) { calState.m = 0; calState.y++; } renderCal(); }); return x; }
    }
    /* ============================================================
       BIRTH TIME — a segmented field, a format toggle, and a clock face.
       tstate is the 24-hour truth. The two <input> segments are a VIEW of it: they may hold a
       half-typed "1" mid-keystroke, but every commit round-trips through tstate, and paintTime()
       is the only thing that ever writes a finished value back into them.
    ============================================================ */
    var row2 = h("div", "pcast-field pcast-time-field");
    var thead = h("div", "pcast-time-head");
    var tl = labelFor("pcast-time-h", "Birth time"); tl.appendChild(h("span", "pcast-opt", " · anchors your whole chart"));
    thead.appendChild(tl);
    row2.appendChild(thead);

    var tstate = { h: null, m: null };   /* 0–23 / 0–59, or null for "unknown" */
    var mode12 = readClockPref();
    /* The reader's own convention, remembered. A person who was told "half seven in the evening"
       should never have to convert it in their head to satisfy a form. */
    function readClockPref() {
      try { var p = SC && SC.getPref("clock12"); if (p === true || p === false) return p; } catch (e) {}
      return true; /* default to AM · PM (12h) until the reader chooses otherwise */
    }
    var clockToggle = zgToggle({
      ariaLabel: "Clock format",
      value: mode12 ? "12" : "24",
      options: [{ value: "24", label: "24h" }, { value: "12", label: "AM · PM" }],
      onChange: function (v) {
        mode12 = (v === "12");
        try { if (SC) SC.setPref("clock12", mode12); } catch (e) {}
        paintTime();
        if (clockOpen) paintClock();
      }
    });
    clockToggle.el.classList.add("zg-toggle-sm");
    thead.appendChild(clockToggle.el);

    var trow = h("div", "pcast-time-row");
    var tbox = h("div", "pcast-time-box");
    tbox.setAttribute("role", "group");
    tbox.setAttribute("aria-label", "Birth time");
    var segH = timeSeg("pcast-time-h", "Hour");
    var segM = timeSeg("pcast-time-m", "Minute");
    tbox.appendChild(segH);
    tbox.appendChild(h("span", "pcast-tsep", ":")).setAttribute("aria-hidden", "true");
    tbox.appendChild(segM);
    var apBtn = h("button", "pcast-tap", "AM"); apBtn.type = "button";
    apBtn.setAttribute("aria-label", "Toggle AM or PM");
    tbox.appendChild(apBtn);
    trow.appendChild(tbox);
    var clockBtn = h("button", "pcast-clock-btn"); clockBtn.type = "button";
    clockBtn.setAttribute("aria-label", "Open clock"); clockBtn.setAttribute("aria-expanded", "false");
    clockBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6.9V12l3.4 2.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    trow.appendChild(clockBtn);
    row2.appendChild(trow);

    /* The "I don't know" checkbox is BUILT here, beside the control it governs, but it is MOUNTED
       under the timezone (see row3). A reader without an hour still has a timezone, and the last
       thing they touch before pressing Cast should be a field they can actually answer. */
    var unkWrap = h("label", "pcast-check pcast-check-tz");
    var unk = input("pcast-unknown", "checkbox"); unkWrap.appendChild(unk); unkWrap.appendChild(h("span", null, "I don't know my birth time"));

    var clock = h("div", "pcast-clock"); clock.hidden = true;
    clock.setAttribute("role", "dialog"); clock.setAttribute("aria-label", "Pick your birth time");
    clock.addEventListener("click", function (e) { e.stopPropagation(); });
    row2.appendChild(clock);
    form.appendChild(row2);

    function timeSeg(id, label) {
      var i = document.createElement("input");
      i.id = id; i.name = id; i.className = "pcast-tseg"; i.type = "text";
      i.inputMode = "numeric"; i.autocomplete = "off"; i.maxLength = 2; i.placeholder = "--";
      i.setAttribute("aria-label", label);
      return i;
    }
    function segMax(el) { return el === segH ? (mode12 ? 12 : 23) : 59; }
    function caretAtEnd(el) { try { return el.selectionStart === el.selectionEnd && el.selectionStart === el.value.length; } catch (e) { return true; } }
    /* strict: nothing selected AND the caret is before the first digit. Backspace uses this, so a
       selected "00" is deleted by the browser first and only the NEXT press reaches into the hour. */
    function caretAtStart(el) { try { return el.selectionStart === 0 && el.selectionEnd === 0; } catch (e) { return true; } }
    /* loose: the caret (or the selection) begins at the head. ArrowLeft uses this — a segment is an
       atomic glyph, so stepping left out of a fully-selected minute should land in the hour, not
       collapse a selection the reader never made. */
    function caretAtHead(el) { try { return el.selectionStart === 0; } catch (e) { return true; } }
    /* True only while WE are moving focus between the two segments. A blur fired by our own hand-off
       must not run the normalize-and-repaint pass: that pass stamps a complete value back into the
       hour, which silently undid the digit a Backspace had just eaten out of it. */
    var handingOff = false;
    function focusSeg(el, where) {
      handingOff = true;
      try {
        el.focus();
        if (where === "all") el.select();
        else { var n = el.value.length; el.setSelectionRange(n, n); }
      } catch (e) {}
      handingOff = false;
    }

    /* Read the two segments back into tstate. Never repaints — the caret lives in there. */
    function commitSegs() {
      var hv = segH.value.replace(/\D/g, "");
      var mv = segM.value.replace(/\D/g, "");
      if (hv === "") { tstate.h = null; tstate.m = null; return; }
      var n = +hv;
      if (mode12) {
        if (n < 1 || n > 12) n = 12;
        tstate.h = (n % 12) + (apBtn.textContent === "PM" ? 12 : 0);
      } else {
        tstate.h = Math.min(23, n);
      }
      /* an hour with no minute is an hour on the hour — Purple Star seats stars by the two-hour
         branch, so a missing minute is never a missing fact */
      tstate.m = (mv === "") ? 0 : Math.min(59, +mv);
    }
    function paintTime() {
      var known = tstate.h != null;
      apBtn.hidden = !mode12;
      if (mode12) apBtn.textContent = (known && tstate.h >= 12) ? "PM" : "AM";
      segH.value = known ? (mode12 ? pad((tstate.h % 12) || 12) : pad(tstate.h)) : "";
      segM.value = known ? pad(tstate.m == null ? 0 : tstate.m) : "";
      segH.setAttribute("aria-label", mode12 ? "Hour, 1 to 12" : "Hour, 0 to 23");
      tbox.classList.toggle("is-set", known);
    }
    /* Any keystroke in the field is a claim that the hour IS known — untick the checkbox for them. */
    function onTimeEdited() {
      if (unk.checked) { unk.checked = false; setTimeDisabled(false); }
      if (clockOpen) paintClock();
    }
    function setTimeDisabled(off) {
      segH.disabled = segM.disabled = apBtn.disabled = clockBtn.disabled = off;
      tbox.classList.toggle("is-disabled", off);
      trow.classList.toggle("is-disabled", off);
    }
    function setMeridiem(pm) {
      if (tstate.h == null) { tstate.h = pm ? 12 : 0; tstate.m = 0; }
      else tstate.h = (tstate.h % 12) + (pm ? 12 : 0);
      onTimeEdited(); paintTime();
    }
    function bumpSeg(el, dir) {
      if (tstate.h == null) { tstate.h = 12; tstate.m = 0; }
      else if (el === segH) tstate.h = (tstate.h + dir + 24) % 24;
      else tstate.m = ((tstate.m == null ? 0 : tstate.m) + dir + 60) % 60;
      onTimeEdited(); paintTime(); focusSeg(el, "all");
    }
    /* Accumulate a digit, then hand off the moment no second digit could possibly follow:
       "3" in 24h is 03 (30 is not an hour), "1" waits, because 10/11/12 are all still open. */
    function pushDigit(el, d) {
      var max = segMax(el);
      var cur = el.value.replace(/\D/g, "");
      var cand = (cur.length === 1 && caretAtEnd(el)) ? cur + d : d;
      if (+cand > max) cand = d;
      el.value = cand;
      commitSegs();
      var full = cand.length >= 2 || (+cand) * 10 > max;
      if (full) {
        paintTime();
        if (el === segH) focusSeg(segM, "all"); else focusSeg(segM, "end");
      }
      onTimeEdited();
    }
    function onSegKey(e) {
      var el = e.target, k = e.key;
      if (k === "ArrowUp" || k === "ArrowDown") { e.preventDefault(); bumpSeg(el, k === "ArrowUp" ? 1 : -1); return; }
      if (k === "ArrowRight" && el === segH && caretAtEnd(el)) { e.preventDefault(); focusSeg(segM, "all"); return; }
      if (k === "ArrowLeft" && el === segM && caretAtHead(el)) { e.preventDefault(); focusSeg(segH, "end"); return; }
      if (k === "Backspace" && el === segM && caretAtStart(el)) {
        /* backing out of the minute deletes into the hour — one field, not two */
        e.preventDefault();
        segH.value = segH.value.slice(0, -1);
        commitSegs(); onTimeEdited();
        focusSeg(segH, "end");
        return;
      }
      if (k === "Delete" && el === segH && caretAtEnd(el)) {
        e.preventDefault();
        segM.value = segM.value.slice(1);
        commitSegs(); onTimeEdited();
        focusSeg(segM, "end");
        return;
      }
      if (k === ":" || k === "." || k === "/" || k === " ") { e.preventDefault(); if (el === segH) focusSeg(segM, "all"); return; }
      if (mode12 && /^[apAP]$/.test(k)) { e.preventDefault(); setMeridiem(k.toLowerCase() === "p"); return; }
      if (/^[0-9]$/.test(k)) { e.preventDefault(); pushDigit(el, k); return; }
      /* everything else that is a single printable character is not a time */
      if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) e.preventDefault();
    }
    [segH, segM].forEach(function (el) {
      el.addEventListener("keydown", onSegKey);
      /* clicking into a segment selects it, so the next digit replaces rather than appends. Skipped
         during a hand-off, where focusSeg has already placed the caret exactly where it belongs. */
      el.addEventListener("focus", function () {
        if (handingOff) return;
        window.setTimeout(function () { try { if (document.activeElement === el) el.select(); } catch (e) {} }, 0);
      });
      /* normalize only when focus truly LEAVES the control — see handingOff */
      el.addEventListener("blur", function () { if (handingOff) return; commitSegs(); paintTime(); });
      /* paste / IME / Android soft keyboards never fire keydown with a usable .key */
      el.addEventListener("input", function () {
        var v = el.value.replace(/\D/g, "").slice(0, 2);
        if (v !== el.value) el.value = v;
        commitSegs(); onTimeEdited();
      });
    });
    apBtn.addEventListener("click", function () { setMeridiem(apBtn.textContent === "AM"); tick(); });
    unk.addEventListener("change", function () {
      setTimeDisabled(unk.checked);
      if (unk.checked) { tstate.h = null; tstate.m = null; closeClock(); paintTime(); }
    });

    /* ---- the clock face: hour ring, then minute ring, the same gold as the calendar ---- */
    var clockOpen = false, clockStep = "hour";
    function clockH() { return tstate.h == null ? 12 : tstate.h; }
    function clockM() { return tstate.m == null ? 0 : tstate.m; }
    /* mirror of openCal: each opener closes its sibling by hand */
    function openClock() { cal.hidden = true; clockOpen = true; clockStep = "hour"; clock.hidden = false; clockBtn.setAttribute("aria-expanded", "true"); paintClock(); }
    function closeClock() { if (!clockOpen && clock.hidden) return; clockOpen = false; clock.hidden = true; clockBtn.setAttribute("aria-expanded", "false"); }
    clockBtn.addEventListener("click", function (e) { e.stopPropagation(); if (clock.hidden) openClock(); else closeClock(); });
    document.addEventListener("click", function (e) { if (clockOpen && !row2.contains(e.target)) closeClock(); });
    clock.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") { e.stopPropagation(); closeClock(); try { clockBtn.focus(); } catch (err) {} }
    });

    function paintClock() {
      clock.innerHTML = "";
      var head = h("div", "pcast-clock-head");
      var read = h("div", "pcast-clock-read");
      var hUnit = h("button", "pcast-clock-unit", mode12 ? pad((clockH() % 12) || 12) : pad(clockH()));
      hUnit.type = "button"; hUnit.setAttribute("aria-label", "Set the hour");
      hUnit.classList.toggle("is-on", clockStep === "hour");
      hUnit.addEventListener("click", function () { clockStep = "hour"; paintClock(); });
      var mUnit = h("button", "pcast-clock-unit", pad(clockM()));
      mUnit.type = "button"; mUnit.setAttribute("aria-label", "Set the minute");
      mUnit.classList.toggle("is-on", clockStep === "minute");
      mUnit.addEventListener("click", function () { clockStep = "minute"; paintClock(); });
      read.appendChild(hUnit);
      read.appendChild(h("span", "pcast-clock-colon", ":"));
      read.appendChild(mUnit);
      if (mode12) {
        var pills = h("div", "pcast-clock-ap");
        [["AM", false], ["PM", true]].forEach(function (p) {
          var b = h("button", "pcast-clock-appill", p[0]); b.type = "button";
          var on = (clockH() >= 12) === p[1];
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
          b.addEventListener("click", function () { setMeridiem(p[1]); tick(); paintClock(); });
          pills.appendChild(b);
        });
        read.appendChild(pills);
      }
      head.appendChild(read);
      /* the domain fact, live: which two-hour gate this moment falls in */
      var bi = branchOf(clockH());
      var br = h("p", "pcast-clock-branch");
      br.appendChild(h("b", null, HOURS[bi] + "時"));
      br.appendChild(document.createTextNode(" · " + HOUR_RANGE[bi] + " · the gate your stars are seated by"));
      head.appendChild(br);
      clock.appendChild(head);
      clock.appendChild(clockFace());

      var foot = h("div", "pcast-clock-foot");
      var clr = h("button", "pcast-clock-ghost", "I don't know"); clr.type = "button";
      clr.addEventListener("click", function () {
        tstate.h = null; tstate.m = null;
        unk.checked = true; setTimeDisabled(true); paintTime(); closeClock();
        try { unk.focus(); } catch (e) {}
      });
      var done = h("button", "pcast-clock-done", "Done"); done.type = "button";
      done.addEventListener("click", function () { closeClock(); try { clockBtn.focus(); } catch (e) {} });
      foot.appendChild(clr); foot.appendChild(done);
      clock.appendChild(foot);
    }
    /* Numbers laid on a circle by trig, not by a 12-cell grid: the hand has to point at them.
       12h -> one ring (12,1…11). 24h -> outer ring 00–11, inner ring 12–23, which is what a
       24-hour dial actually is. Minutes -> one ring of the twelve five-minute marks. */
    function clockFace() {
      var face = h("div", "pcast-clock-face");
      face.setAttribute("role", "group");
      face.setAttribute("aria-label", clockStep === "hour" ? "Hour" : "Minute");
      function seat(btn, i, r) {
        var a = (i / 12) * 2 * Math.PI - Math.PI / 2;
        btn.style.left = (50 + Math.cos(a) * r) + "%";
        btn.style.top = (50 + Math.sin(a) * r) + "%";
      }
      function num(label, on, r, i, onPick) {
        var b = h("button", "pcast-clock-num", label); b.type = "button";
        b.classList.toggle("is-on", on);
        if (r < 34) b.classList.add("is-inner");
        seat(b, i, r);
        b.addEventListener("click", function () { onPick(); tick(); });
        face.appendChild(b);
      }
      var handTurn;
      if (clockStep === "hour") {
        if (mode12) {
          for (var i = 0; i < 12; i++) {
            (function (i) {
              var h12 = i === 0 ? 12 : i;
              num(String(h12), ((clockH() % 12) || 12) === h12, 40, i, function () {
                tstate.h = (h12 % 12) + (clockH() >= 12 ? 12 : 0);
                if (tstate.m == null) tstate.m = 0;
                onTimeEdited(); paintTime(); clockStep = "minute"; paintClock();
              });
            })(i);
          }
        } else {
          for (var j = 0; j < 24; j++) {
            (function (j) {
              var outer = j < 12;
              num(pad(j), clockH() === j, outer ? 41 : 26, j % 12, function () {
                tstate.h = j;
                if (tstate.m == null) tstate.m = 0;
                onTimeEdited(); paintTime(); clockStep = "minute"; paintClock();
              });
            })(j);
          }
        }
        handTurn = ((clockH() % 12) / 12) * 360;
      } else {
        for (var k = 0; k < 12; k++) {
          (function (k) {
            var mv = k * 5;
            num(pad(mv), Math.round(clockM() / 5) % 12 === k, 40, k, function () {
              tstate.m = mv;
              if (tstate.h == null) tstate.h = 12;
              onTimeEdited(); paintTime(); paintClock();
            });
          })(k);
        }
        handTurn = (clockM() / 60) * 360;
      }
      var hand = h("span", "pcast-clock-hand"); hand.setAttribute("aria-hidden", "true");
      hand.style.transform = "translateX(-50%) rotate(" + handTurn + "deg)";
      face.appendChild(hand);
      face.appendChild(h("span", "pcast-clock-pin")).setAttribute("aria-hidden", "true");
      return face;
    }

    /* ============================================================
       BIRTH TIMEZONE + GENDER
       "China / Taiwan / Singapore (UTC+8)" cannot fit a half-width select, and a truncated
       timezone reads as a broken field. Show the offset — the only part that changes the chart —
       on a plate, keep the real <select> transparent above it for the platform picker and its
       free accessibility, and spell the region out underneath where it has room to breathe.
    ============================================================ */
    var row3 = h("div", "pcast-field pcast-field-2");
    var tzc = h("div", "pcast-tzcol");
    /* "read as birthplace-local" was a footnote under the button, three fields away from the control
       it describes. It belongs on the label of the field it governs. */
    var tzl = labelFor("pcast-tz", "Birth timezone");
    tzc.appendChild(tzl);
    var tzWrapF = h("div", "pcast-tzplate");
    var tzValF = h("span", "pcast-tzval", "UTC+8"); tzValF.setAttribute("aria-hidden", "true");
    var tzCaret = h("span", "pcast-tzcaret", "▾"); tzCaret.setAttribute("aria-hidden", "true");
    var tz = select("pcast-tz", TZ); tz.className = "pcast-tzsel";
    tzWrapF.appendChild(tzValF); tzWrapF.appendChild(tzCaret); tzWrapF.appendChild(tz);
    tzc.appendChild(tzWrapF);
    /* tzHint kept for syncTzForm to write into, but NOT mounted in the column — a hint line under
       one box and not the other is exactly what made this row uneven. The plate already shows the
       offset (the only part that changes the chart). The "I don't know" checkbox now rides ABOVE
       this row, so both columns are a clean label + box of equal height, fixed like the pills. */
    var tzHint = h("p", "pcast-tzhint", "");
    row3.appendChild(tzc);
    (function preselectTz() { var off = -new Date().getTimezoneOffset() / 60; for (var i = 0; i < TZ.length; i++) { if (TZ[i][0] === String(off)) { tz.value = TZ[i][0]; break; } } })();
    /* "Eastern Time (UTC−5)" -> plate "UTC−5", hint "Eastern Time". "Auto (device)" has no
       parenthesised offset, so we compute the device's and say so. */
    function syncTzForm() {
      var opt = tz.options[tz.selectedIndex];
      var lab = opt ? opt.text : "";
      if (tz.value === "auto") {
        tzValF.textContent = tzLabel(-new Date().getTimezoneOffset() / 60) || "UTC";
        tzHint.textContent = "Auto · your device's timezone";
      } else {
        var m = lab.match(/^(.*?)\s*\(([^)]*UTC[^)]*)\)\s*$/);
        tzValF.textContent = m ? m[2] : lab;
        tzHint.textContent = m ? m[1] : "";
      }
      tzWrapF.setAttribute("title", lab);
    }
    var gc = h("div"); gc.appendChild(labelFor("pcast-gender", "Gender"));
    var gender = select("pcast-gender", [["", "Prefer not to say"], ["female", "Female"], ["male", "Male"]]); gc.appendChild(gender); row3.appendChild(gc);
    form.appendChild(unkWrap); /* "I don't know my birth time" sits ABOVE the timezone/gender row */
    form.appendChild(row3);
    /* The button now says what the press DOES, and the sub-line says what you get for it. The old
       label ("Cast My Court") only repeated the eyebrow directly above it, so the form's loudest
       element carried no information the reader did not already have. */
    var go = h("button", "psa-btn pcast-go"); go.type = "submit";
    go.appendChild(h("b", "pcast-go-lab", "Cast my court"));
    go.appendChild(h("small", "pcast-go-sub", "twelve rooms · fourteen stars · your hour"));
    form.appendChild(go);

    paintTime();
    syncTzForm();

    function labelFor(id, txt) { var l = h("label", "pcast-label", txt); l.setAttribute("for", id); return l; }
    function input(id, type) { var i = document.createElement("input"); i.id = id; i.name = id; i.type = type; if (type === "date" || type === "time") i.className = "pcast-input"; return i; }
    function select(id, opts) { var s = document.createElement("select"); s.id = id; s.className = "pcast-input"; opts.forEach(function (o) { var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; s.appendChild(op); }); return s; }

    /* ---- casting ---- */
    var lastBirth = null;   // {year,month,day,gender}
    var courtCells = {}, courtRooms = {};   // for the interactive living court
    var boardMode = "palace";   // "palace" = teaching layout (Life top-left); "branch" = authentic chart
    var lastOut = null;
    function readBirth() {
      var p = parseDate(date.value);
      if (!p) return null;
      commitSegs(); /* the reader may submit with the caret still inside the hour segment */
      var b = { year: p.year, month: p.month, day: p.day, gender: gender.value || null };
      if (!unk.checked && tstate.h != null) { b.hour = tstate.h; b.minute = (tstate.m == null ? 0 : tstate.m); }
      else { b.hour = null; b.minute = null; }
      b.tzOffset = tz.value; /* "auto" is resolved to the device offset by ZiweiStudyChart.save */
      b.calendar = calType;  /* "solar" | "lunar" | "lunar-leap" — how to read year/month/day above */
      return b;
    }
    var lastStamp = null;       /* loop guard: serialized stamp of the last rendered birth */
    var scrollOnRender = false; /* scroll to the reading only on an explicit cast */

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = readBirth();
      if (!b) { date.focus(); return; }
      if (SC) {
        scrollOnRender = true;
        var saved = SC.save(b); /* broadcast -> the psa:studychart handler renders everything */
        if (window.ZiweiProgress) window.ZiweiProgress.castChart(false);
        if (saved) return;
        scrollOnRender = false;
      }
      /* fallback when the study-chart module is absent: render directly */
      lastBirth = b;
      var out = L.castFromBirth(b);
      lastOut = out;
      renderResult(out, b);
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
      buildSideRail(b);
    });

    /* Everything renders from the one study-chart event: the cast, the dock,
       every hour/tz change from the dock, and the restore-on-revisit broadcast. */
    document.addEventListener("psa:studychart", function (e) {
      var d = e.detail || {};
      var b = d.birth;
      if (!b) return;
      var s = SC ? SC.stamp(b) : JSON.stringify(b);
      var changed = s !== lastStamp;
      lastStamp = s;
      lastBirth = b;
      if (changed || result.hidden) {
        var out = d.out || L.castFromBirth(b);
        lastOut = out;
        renderResult(out, b);
        result.hidden = false;
        if (scrollOnRender) result.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      scrollOnRender = false;
      fillForm(b);
      buildDock(b);
    });

    /* Prefill the form on revisit (the deferred broadcast then renders the reading, no scroll). */
    if (SC) {
      var savedBirth = SC.get();
      if (savedBirth) fillForm(savedBirth);
    }
    function fillForm(b) {
      var want = pad(b.month) + "/" + pad(b.day) + "/" + b.year;
      if (date.value !== want) date.value = want;
      refreshLeap();                          /* the entered date decides whether 閏月 is offered */
      setCalType(b.calendar || "solar");      /* restore the calendar-type pill on revisit */
      if (b.hour == null) {
        tstate.h = null; tstate.m = null;
        if (!unk.checked) { unk.checked = true; setTimeDisabled(true); }
      } else {
        if (unk.checked) { unk.checked = false; setTimeDisabled(false); }
        tstate.h = b.hour; tstate.m = (b.minute == null ? 0 : b.minute);
      }
      paintTime();
      if (clockOpen) paintClock();
      var tzWant = (b.tzOffset == null) ? "auto" : String(b.tzOffset);
      tz.value = tzWant;
      if (tz.value !== tzWant) tz.value = "auto"; /* offset outside the option list */
      syncTzForm();
      if (b.gender) gender.value = b.gender;
    }
    /* keep the two timezone selects in sync form -> dock */
    tz.addEventListener("change", function () {
      syncTzForm();
      if (SC && SC.get()) SC.setTz(tz.value);
    });

    /* ============================================================
       THE STICKY BOTTOM CHART DOCK (replaces the floating left rail).
       Fixed to the viewport bottom, below the nav dropdowns (z-index 50 vs 119+).
       Also hosts the learning track's "Current lesson" bar in [data-dock-lesson].
    ============================================================ */
    function buildSideRail(birth) { buildDock(birth); } /* name shim for any older caller */

    function branchOf(hour) { return Math.floor((Number(hour) + 1) / 2) % 12; }
    function tzLabel(off) {
      if (off == null || isNaN(off)) return "";
      var sign = off < 0 ? "−" : "+";
      var a = Math.abs(off), hh = Math.floor(a), mm = Math.round((a - hh) * 60);
      return "UTC" + sign + hh + (mm ? ":" + (mm < 10 ? "0" + mm : mm) : "");
    }
    /* friendly timezone name for the beam label — the option text when we know it, UTC math when we don't */
    function clock12(hour, minute) {
      var m = (minute == null) ? 0 : minute;
      var ap = hour < 12 ? "AM" : "PM";
      var h12 = hour % 12; if (h12 === 0) h12 = 12;
      return h12 + ":" + pad(m) + " " + ap;
    }
    /* the beam's live readout: 12-hour clock + branch hour, e.g. "4:00 PM · 申時 15–17" */
    function beamCurLine(hour, minute) {
      if (hour == null) return "";
      var bi = branchOf(hour);
      return clock12(hour, minute) + " · " + HOURS[bi] + "時 " + HOUR_RANGE[bi];
    }
    /* The conversion line is now a DISCLOSURE line, not a restatement. The beam already
       prints the clock->branch math ("4:00 PM · 申時 15–17") and its label carries the
       timezone, so repeating it here only made the dock taller. This returns "" — and the
       element hides — whenever the reading is unambiguous, and speaks only when the reader
       needs to know something the beam cannot show them: no hour yet, or the 23:xx boundary
       where schools disagree. Honesty layer preserved, redundancy dropped. */
    /* The readout's placeholder. It exists so the plate is never empty and therefore never resizes:
       the bar's geometry cannot be allowed to depend on whether an hour has been chosen. */
    var BEAM_EMPTY = "--:-- · no hour yet";
    function convLine(birth) {
      if (birth.hour == null) return "Cast at noon 午時 while your hour is unknown. Slide to your real hour and the court redraws.";
      if (birth.hour === 23) {
        var bi = branchOf(birth.hour);
        return HOURS[bi] + "時 · late 子時 — counts toward the next day in some schools; we read it as 子";
      }
      return "";
    }

    /* mute lives in the studyChart pref "muted"; read it fresh so a toggle in one place is
       felt everywhere without wiring listeners. tick() is the one mute-aware entry point every
       caller in this file uses — ZodiTick still owns the reduced-motion guard on its own. */
    function isMuted() { try { return !!(SC && SC.getPref("muted") === true); } catch (err) { return false; } }
    function tick(freq) { if (isMuted()) return; try { window.ZodiTick(freq); } catch (err) {} }

    /* Twelve branch hours -> six major-pentatonic pitches, each voiced for two hours, rising
       子->亥. Pentatonic so no two hours ever clash and any scrub reads as melody, not noise;
       one octave (E5..E6) keeps every pitch inside the 600–1400Hz band the tick lives in. */
    var HOUR_PITCH = [659, 659, 784, 784, 880, 880, 1047, 1047, 1175, 1175, 1319, 1319];

    var dockEls = null;
    function ensureDock() {
      if (dockEls) return dockEls;
      var dock = document.getElementById("pcast-dock");
      if (!dock) { dock = h("div", "pcast-dock"); dock.id = "pcast-dock"; document.body.appendChild(dock); }
      dock.setAttribute("role", "region");
      dock.setAttribute("aria-label", "Chart time controls");
      dock.setAttribute("data-state", "open");
      var inner = h("div", "pcast-dock-inner");

      var chartRow = h("div", "pcast-dock-chart");
      chartRow.setAttribute("data-dock-chart", "");

      /* one hour per press. Reads the beam when no hour is set yet, so the first tap on "+" from
         an unknown hour lands at 13:00 rather than doing nothing. Same pentatonic voice as a scrub. */
      function stepBtn(dir, glyph, label) {
        var b = h("button", "pcast-dk-step", glyph); b.type = "button";
        b.setAttribute("aria-label", label);
        b.addEventListener("click", function () {
          if (!SC || !lastBirth) return;
          var cur = (lastBirth.hour == null) ? (+beamRange.value) : lastBirth.hour;
          var next = Math.min(BEAM_MAX, Math.max(0, cur + dir));
          if (next === cur && lastBirth.hour != null) return;
          var bi = branchOf(next);
          if (bi !== lastBranch) { lastBranch = bi; tick(HOUR_PITCH[bi]); }
          setBeamValue(next);
          beamCur.textContent = beamCurLine(next, null);
          beamCur.classList.remove("is-empty");
          SC.setHour(next);
        });
        return b;
      }

      /* identity chip: sigil + "Your chart" eyebrow over the birth date; tapping it jumps
         back up to the form to edit the birth date */
      var idBtn = h("button", "pcast-dk-id"); idBtn.type = "button";
      idBtn.setAttribute("aria-label", "Your chart — edit the birth date in the form above");
      idBtn.appendChild(h("span", "pcast-dk-sigil", "紫")).setAttribute("aria-hidden", "true");
      var idText = h("span", "pcast-dk-idtext");
      idText.appendChild(h("span", "pcast-dk-eyebrow", "Your chart"));
      var dateEl = h("span", "pcast-dk-date", "");
      idText.appendChild(dateEl);
      idBtn.appendChild(idText);
      idBtn.addEventListener("click", function () {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        try { date.focus({ preventScroll: true }); } catch (err) { date.focus(); }
      });
      chartRow.appendChild(idBtn);

      /* the hour beam: a 24-hour Gregorian scrubber, birthplace-local in the selected
         birth timezone. Slide the range (or tap an even-hour tick) ->
         ZiweiStudyChart.setHour(hour) -> the whole page re-casts through psa:studychart.
         The beam IS the hour control; there is no separate hour <select>.
         It is flanked by −/+ steps: a 4px track is a mouse instrument, and a thumb needs a
         thumb-sized target. The steps are the ONLY way most phone readers will move the hour. */
      var beamRow = h("div", "pcast-dk-beamrow");
      var stepDown = stepBtn(-1, "−", "One hour earlier");
      beamRow.appendChild(stepDown);
      var beam = h("div", "pcast-dk-beam");
      var beamRange = document.createElement("input");
      beamRange.type = "range";
      beamRange.className = "pcast-dk-beam-range";
      beamRange.min = "0"; beamRange.max = String(BEAM_MAX); beamRange.step = "1"; beamRange.value = "12";
      beamRange.setAttribute("aria-label", "Birth hour — 24 clock hours, birthplace-local");
      beam.appendChild(beamRange);
      var beamTicks = h("div", "pcast-dk-beam-ticks");
      var tickEls = [];
      for (var ti = 0; ti < 12; ti++) {
        (function (idx) {
          var hr = idx * 2;
          var lab = hr === 0 ? "12AM" : (hr === 12 ? "12PM" : String(hr % 12));
          var tk = h("button", "pcast-dk-tick");
          tk.type = "button";
          /* --dk-t is this notch's position on the SAME scale the range thumb rides:
             hour / BEAM_MAX, unitless. The CSS resolves it through
                left: thumbW/2 + var(--dk-t) * (100% - thumbW)
             which is exactly where the browser parks the thumb for that value. Do not
             lay these out with flex/space-between: that maps notch i to i/11, i.e. it
             pretends the scale ends at hour 22, and the label drifts off the thumb. */
          tk.style.setProperty("--dk-t", String(hr / BEAM_MAX));
          tk.setAttribute("aria-label", clock12(hr, 0) + " · " + HOURS[branchOf(hr)] + "時 " + HOUR_RANGE[branchOf(hr)]);
          tk.appendChild(h("b", null, lab));
          tk.addEventListener("click", function () { if (SC && lastBirth) SC.setHour(hr); });
          beamTicks.appendChild(tk);
          tickEls.push(tk);
        })(ti);
      }
      beam.appendChild(beamTicks);
      beamRow.appendChild(beam);
      var stepUp = stepBtn(1, "+", "One hour later");
      beamRow.appendChild(stepUp);
      chartRow.appendChild(beamRow);

      /* live readout: 12-hour clock + branch hour. An <output>, but aria-live="off" on purpose
         — a live region would machine-gun the screen reader on every step of a scrub.
         Fixed width (CSS), never empty (BEAM_EMPTY): the plate holds its ground. */
      var beamCur = document.createElement("output");
      beamCur.className = "pcast-dk-beam-cur";
      beamCur.setAttribute("aria-live", "off");
      chartRow.appendChild(beamCur);

      /* right-edge tool cluster: timezone, mute, unlock, minimize, close */
      var tools = h("div", "pcast-dk-tools");

      /* timezone: a real native <select> for the picker + free a11y, sat invisibly over a short
         "UTC+8" label Worker A styles. We keep the label text in sync with the chosen option. */
      var tzWrap = h("span", "pcast-dk-tzwrap");
      var tzVal = h("span", "pcast-dk-tzval", "UTC+8");
      tzVal.setAttribute("aria-hidden", "true");
      var tzSel = document.createElement("select");
      tzSel.className = "pcast-dk-sel"; tzSel.id = "pcast-dk-tz";
      tzSel.setAttribute("aria-label", "Birth timezone");
      TZ.forEach(function (o) { tzSel.appendChild(new Option(o[1], o[0])); });
      tzWrap.appendChild(tzVal);
      tzWrap.appendChild(tzSel);
      tools.appendChild(tzWrap);
      /* short offset from the option label's "(...UTC...)" chunk, else its first 8 chars */
      function syncTzVal() {
        var opt = tzSel.options[tzSel.selectedIndex];
        var lab = opt ? opt.text : "";
        var m = lab.match(/\(([^)]*UTC[^)]*)\)/);
        tzVal.textContent = m ? m[1] : lab.slice(0, 8);
      }

      var soundBtn = h("button", "pcast-dk-sound"); soundBtn.type = "button";
      soundBtn.appendChild(document.createTextNode("◍"));
      tools.appendChild(soundBtn);

      /* The ✦ unlock pill used to live here. It linked to "/", which the wordmark and the Home tab
         already do, so it was a third door to the same room inside a 44px instrument. Removed.
         It was load-bearing on phones, though: the page CSS hid the site-wide Reveal Dock outright
         while the chart dock existed, and ✦ carried the unlock path in its place. That suppression
         now keys on body.pcast-dock-open (see setDockState), so #pn-dock returns the moment this
         dock is minimized or closed. Do not re-hide it on pcast-dock-live. */

      var collapseBtn = h("button", "pcast-dk-collapse"); collapseBtn.type = "button";
      collapseBtn.textContent = "▾";
      collapseBtn.setAttribute("aria-expanded", "true");
      collapseBtn.setAttribute("aria-controls", "pcast-dock");
      collapseBtn.setAttribute("aria-label", "Minimize the chart dock");
      tools.appendChild(collapseBtn);

      var closeBtn = h("button", "pcast-dk-close"); closeBtn.type = "button";
      closeBtn.textContent = "✕";
      closeBtn.setAttribute("aria-label", "Hide the chart dock");
      tools.appendChild(closeBtn);

      chartRow.appendChild(tools);

      /* late-子時 disclosure — Worker A floats it above the bar so it never adds a row.
         When/why it shows is unchanged (see convLine): only ever for an ambiguous reading. */
      var conv = h("p", "pcast-dk-conv", ""); conv.id = "pcast-dk-conv"; conv.hidden = true;
      chartRow.appendChild(conv);

      inner.appendChild(chartRow);

      /* the minimized pill (shown only in data-state="min"); tapping it re-opens the dock */
      var mini = h("button", "pcast-dk-mini"); mini.type = "button";
      mini.appendChild(h("span", "pcast-dk-sigil", "紫")).setAttribute("aria-hidden", "true");
      var miniTxt = h("span", "pcast-dk-mini-txt", "");
      mini.appendChild(miniTxt);
      mini.appendChild(h("span", "pcast-dk-mini-caret", "▴")).setAttribute("aria-hidden", "true");
      inner.appendChild(mini);

      var lessonSlot = h("div", "pcast-dock-lesson");
      lessonSlot.setAttribute("data-dock-lesson", "");
      inner.appendChild(lessonSlot);
      dock.appendChild(inner);

      /* the closed-state launcher lives on <body>, a sibling of the dock, so it survives the
         dock's own hidden state. One per document. */
      var launcher = document.getElementById("pcast-dock-launcher");
      if (!launcher) {
        launcher = h("button", "pcast-dk-launcher", "紫");
        launcher.id = "pcast-dock-launcher"; launcher.type = "button";
        launcher.setAttribute("aria-label", "Show the chart dock");
        launcher.hidden = true;
        document.body.appendChild(launcher);
      }

      /* absorb the learning track's bottom bar if it was mounted to <body> first,
         so there is exactly one bottom dock, never two stacked */
      var strayBar = document.querySelector("body > .psa-continue-bar");
      if (strayBar) { lessonSlot.appendChild(strayBar); dock.classList.add("has-lesson"); }

      /* --dk-pos is where the thumb's CENTRE actually is, and therefore where the bloom belongs.
         A native range does not travel 0->100%: the centre runs from thumbW/2 to width-thumbW/2.
         Hand the browser its own formula back rather than approximating with a bare percentage,
         and the notches (which resolve --dk-t through the identical calc in CSS) line up for free.
         Written on the RANGE element, never on <html> — a per-frame custom-property write on the
         root invalidates style for the whole document (the bug we pulled out of js/nav.js). */
      function beamPos(v) {
        return "calc(var(--dk-thumb) / 2 + " + (v / BEAM_MAX) + " * (100% - var(--dk-thumb)))";
      }
      function setBeamValue(v) {
        beamRange.value = String(v);
        lastBranch = branchOf(v);                 /* keep the scrub tracker honest on programmatic sets */
        beamRange.style.setProperty("--dk-pos", beamPos(v));
      }

      /* scrub -> instant local readout + thumb bloom, a pentatonic tick only when the scrub
         crosses a branch-hour boundary (throttled ~70ms, never on programmatic sets), and a
         throttled re-cast (~120ms). */
      var beamTimer = null, lastBranch = branchOf(+beamRange.value), lastTickAt = 0;
      beamRange.addEventListener("input", function () {
        var hr = +beamRange.value;
        beamRange.style.setProperty("--dk-pos", beamPos(hr));
        beamCur.textContent = beamCurLine(hr, null);
        beamCur.classList.remove("is-empty");
        var bi = branchOf(hr);
        if (bi !== lastBranch) {
          lastBranch = bi;
          var now = (window.performance && performance.now) ? performance.now() : Date.now();
          if (now - lastTickAt >= 70) { lastTickAt = now; tick(HOUR_PITCH[bi]); }
        }
        if (beamTimer) window.clearTimeout(beamTimer);
        beamTimer = window.setTimeout(function () {
          beamTimer = null;
          if (SC && lastBirth) SC.setHour(hr);
        }, 120);
      });
      tzSel.addEventListener("change", function () {
        syncTzVal();
        if (!SC || !lastBirth) return;
        tz.value = tzSel.value;
        if (tz.value !== tzSel.value) tz.value = "auto";
        syncTzForm(); /* dock -> form: the plate and its region caption follow */
        SC.setTz(tzSel.value);
      });

      function padBody() {
        var hgt = dock.hidden ? 0 : dock.offsetHeight; /* 0 while closed or display:none */
        /* offsetHeight ALREADY contains .pcast-dock-inner's padding-bottom, which IS
           env(safe-area-inset-bottom). Adding the inset again here reserved the iPhone
           notch twice and left a dead band above the footer. Measure, don't re-add. */
        document.body.style.paddingBottom = hgt ? (hgt + 14) + "px" : "";
      }
      window.addEventListener("resize", padBody);
      if (window.ResizeObserver) { try { new ResizeObserver(padBody).observe(dock); } catch (err) {} }

      /* ---- the three-state machine: open | min | closed ----
         data-state is the single source of truth Worker A styles from; JS owns the attribute,
         the launcher/dock hidden flags, the aria, and the body padding. Persisted as the string
         pref "dockState". */
      function setDockState(next, persist) {
        if (next !== "open" && next !== "min" && next !== "closed") next = "open";
        dock.dataset.state = next;
        var open = next === "open";
        dock.hidden = next === "closed";
        launcher.hidden = next !== "closed";
        collapseBtn.setAttribute("aria-expanded", open ? "true" : "false");
        /* Only an OPEN chart dock owns the bottom edge, so only an open one may fold the site-wide
           Reveal Dock away on phones. Minimized or closed, #pn-dock comes back — otherwise a phone
           has no Reveal CTA anywhere, since .pn-cta is display:none below 760px. */
        document.body.classList.toggle("pcast-dock-open", open);
        if (persist && SC) { try { SC.setPref("dockState", next); } catch (err) {} }
        padBody();
      }
      collapseBtn.addEventListener("click", function () { setDockState("min", true); tick(); });
      closeBtn.addEventListener("click", function () { setDockState("closed", true); tick(); });
      mini.addEventListener("click", function () { setDockState("open", true); });
      launcher.addEventListener("click", function () {
        setDockState("open", true);
        /* focus return: bring the keyboard user to the control that mirrors the launcher */
        try { collapseBtn.focus(); } catch (err) {}
      });
      /* Escape tucks the dock away, but ONLY from within it — never a global handler, never a
         focus trap (this is a non-modal toolbar). The listener sits on the dock, so it only
         hears keydowns from focus already inside. */
      dock.addEventListener("keydown", function (e) {
        if ((e.key === "Escape" || e.key === "Esc") && dock.dataset.state === "open") {
          setDockState("min", true);
          try { mini.focus(); } catch (err) {}
          tick();
        }
      });

      /* the mute toggle. aria-pressed reads as "sound on": pressed/◍ = audible, unpressed/◌ =
         muted. Persisted as pref "muted". Un-muting confirms itself with a single tick. */
      function applyMute(muted) {
        soundBtn.setAttribute("aria-pressed", muted ? "false" : "true");
        soundBtn.textContent = muted ? "◌" : "◍";
        soundBtn.setAttribute("aria-label", muted ? "Unmute interface sound" : "Mute interface sound");
      }
      soundBtn.addEventListener("click", function () {
        var nowMuted = !isMuted();
        try { if (SC) SC.setPref("muted", nowMuted); } catch (err) {}
        applyMute(nowMuted);
        if (!nowMuted) tick(HOUR_PITCH[6]); /* a taste of the sound they just turned back on */
      });
      applyMute(isMuted());

      dockEls = {
        dock: dock, chartRow: chartRow, dateEl: dateEl, tzSel: tzSel, tzVal: tzVal, conv: conv,
        beamRow: beamRow, stepDown: stepDown, stepUp: stepUp,
        beamRange: beamRange, beamCur: beamCur, tickEls: tickEls, miniTxt: miniTxt,
        setDockState: setDockState, setBeamValue: setBeamValue, syncTzVal: syncTzVal,
        lessonSlot: lessonSlot, padBody: padBody
      };

      /* restore the visitor's last choice. Migrate the old boolean "dockCollapsed": if the new
         string pref is unset but the old one says collapsed, start minimized. Never auto-open a
         dock the user deliberately closed. */
      var startState = "open";
      if (SC) {
        try {
          var saved = SC.getPref("dockState");
          if (saved === "open" || saved === "min" || saved === "closed") startState = saved;
          else if (SC.getPref("dockCollapsed") === true) startState = "min";
        } catch (err) {}
      }
      setDockState(startState, false);
      return dockEls;
    }

    function buildDock(birth) {
      var els = ensureDock();
      els.dock.classList.add("has-chart");
      document.body.classList.add("pcast-dock-live");
      els.dateEl.textContent = pad(birth.month) + "/" + pad(birth.day) + "/" + birth.year;
      var tzWant = (birth.tzOffset == null) ? "auto" : String(birth.tzOffset);
      els.tzSel.value = tzWant;
      if (els.tzSel.value !== tzWant) els.tzSel.value = "auto";
      els.syncTzVal(); /* programmatic set — keep the short "UTC+8" label in step, no tick */
      /* disclosure only — empty for an unambiguous reading, and then it hides entirely */
      var cl = convLine(birth);
      els.conv.textContent = cl;
      els.conv.hidden = !cl;
      /* the beam is birthplace-local — carry the short offset ("UTC+8") in its aria-label so a
         screen-reader user hears which zone the hour reads in; the tz chip shows it visually */
      var tzs = tzLabel(birth.tzOffset);
      els.beamRange.setAttribute("aria-label", "Birth hour — 24 clock hours, birthplace-local" + (tzs ? " · " + tzs : ""));
      /* never blank: an empty plate collapses, and the whole bar slides sideways the moment an
         hour is chosen. Same width, hour or no hour. */
      var curLine = beamCurLine(birth.hour, birth.minute);
      els.beamCur.textContent = curLine || BEAM_EMPTY;
      els.beamCur.classList.toggle("is-empty", !curLine);
      /* sync the 24-hour beam: known hour lights the nearest even-hour tick; unknown hour
         parks the thumb at noon with nothing lit — the first slide sets the hour for real.
         setBeamValue is a programmatic set: it moves the thumb bloom and the scrub tracker
         WITHOUT firing a pentatonic tick. */
      var beamVal = (birth.hour == null) ? 12 : birth.hour;
      els.setBeamValue(beamVal); /* also seeds --dk-pos so the thumb bloom sits right before any scrub */
      var evenHour = (birth.hour == null) ? -1 : (Math.round(birth.hour / 2) * 2) % 24;
      els.tickEls.forEach(function (tk, i) {
        var on = (i * 2) === evenHour;
        tk.classList.toggle("is-on", on);
        tk.setAttribute("aria-pressed", on ? "true" : "false");
      });
      /* collapsed summary: YOUR CHART · date · branch · clock */
      els.miniTxt.textContent = "YOUR CHART · " + pad(birth.month) + "/" + pad(birth.day) + "/" + birth.year
        + (birth.hour == null ? "" : " · " + HOURS[branchOf(birth.hour)] + "時 · " + clock12(birth.hour, birth.minute));
      els.padBody();
    }

    /* ---- render the board ---- */
    function renderResult(out, birth) {
      result.innerHTML = "";
      courtCells = {}; courtRooms = {};
      /* A lunar date that doesn't exist that year (wrong month/day, or 閏月 chosen for a year with
         no leap twin) can't be cast — reading it as solar would draw the wrong court. Say so kindly
         instead of throwing. */
      if (!out || out.error === "lunar-date-invalid" || !out.lunar || !out.yearPillar) {
        var warn = h("div", "pcast-res-head pcast-bleed");
        warn.appendChild(h("h2", "pcast-res-title", "Check that date"));
        warn.appendChild(h("p", "pcast-res-meta", "That lunar month and day don't exist in " + (birth ? birth.year : "that year") + ". Check the month and day — and whether it was a 閏月 (leap month) — or switch to 陽曆 and enter your standard calendar date."));
        result.appendChild(warn);
        return;
      }
      var yp = out.yearPillar;
      /* pcast-bleed: the head must break out of .psa-cast-result's 1000px column exactly the way
         the reading below it does, or it floats inward and reads as centered over a full-bleed
         board. Same class, same left edge. */
      var head = h("div", "pcast-res-head pcast-bleed");
      head.appendChild(h("h2", "pcast-res-title", "Your reading"));
      var meta = h("p", "pcast-res-meta");
      var isLunarIn = (out.calendar === "lunar" || out.calendar === "lunar-leap");
      if (isLunarIn && out.solar) {
        /* the reader gave a lunar date — show the conversion, lunar → solar, then the year animal */
        meta.textContent = "lunar " + out.lunar.lunarYear + "/" + (out.lunar.leap ? "leap " : "") + out.lunar.lunarMonth + "/" + out.lunar.day
          + "  →  " + out.solar.year + "-" + pad(out.solar.month) + "-" + pad(out.solar.day)
          + "  ·  " + yp.name + " " + yp.animal + " year";
      } else {
        meta.textContent = birth.year + "-" + pad(birth.month) + "-" + pad(birth.day)
          + "  ·  lunar " + out.lunar.lunarYear + "/" + (out.lunar.leap ? "leap " : "") + out.lunar.lunarMonth + "/" + out.lunar.day
          + "  ·  " + yp.name + " " + yp.animal + " year";
      }
      head.appendChild(meta);
      result.appendChild(head);

      /* NO HOUR IS NOT NO READING. A locked board taught the reader nothing and lost them at the
         door. When the hour is unknown we cast at NOON_HOUR — 午時, the middle gate of the day,
         the least-wrong guess there is — and we say so, loudly, above the board. The stored birth
         still carries hour:null, so the dock keeps saying "no hour yet" and the moment a real hour
         arrives the court redraws from truth. The assumption lives on screen, never in the data. */
      var shown = out, assumed = false;
      if ((out.needHour || !out.chart) && birth.hour == null) {
        var probe = {}; for (var pk in birth) if (Object.prototype.hasOwnProperty.call(birth, pk)) probe[pk] = birth[pk];
        probe.hour = NOON_HOUR; probe.minute = 0;
        var pv = L.castFromBirth(probe);
        if (pv && pv.chart) { shown = pv; assumed = true; }
      }

      if (!shown.chart) {
        result.appendChild(hourMissingPanel(yp));
        result.appendChild(boardEl(null));
      } else {
        if (assumed) result.appendChild(noonPanel(yp));
        /* two columns: the board (what you see) left, the room-by-room reading
           (what it means) right — scrub the hour beam and watch both change.
           .pcast-bleed lets Worker B's CSS break the pair out to ~96vw. */
        var cols = h("div", "pcast-reading-cols pcast-bleed");
        var colBoard = h("div", "pcast-col-board");
        var colRooms = h("div", "pcast-col-rooms");
        colBoard.appendChild(summaryChips(shown.chart));
        colBoard.appendChild(layoutToggle());
        colBoard.appendChild(h("p", "pcast-branch-note", "The small glyph in each room's corner is its Earthly Branch 地支 — one of twelve fixed seats of the court (子, 丑, 寅 …). Your stars move from chart to chart; the twelve seats never do. Beginner view pins your Life room top-left; Advanced view seats every room at its true branch seat."));
        var bd = boardEl(shown.chart);
        if (assumed) bd.classList.add("is-assumed");
        colBoard.appendChild(bd);
        if (assumed) colBoard.appendChild(h("p", "pcast-assumed-cap", "Drawn at noon 午時. The stars are seated on an assumed hour, so read the rooms as a shape, not a verdict."));
        colBoard.appendChild(h("p", "pcast-court-hint", "Tap a room to light its triangle and mirror across your court."));
        var cap = h("p", "pcast-court-cap"); cap.id = "pcast-court-cap"; colBoard.appendChild(cap);
        /* what "triangle" and "mirror" even mean — rendered once, always visible under the cap */
        var explain = h("div", "pcast-court-explain");
        explain.innerHTML = "<p><b>Triangle 三方</b> — every room is read with two partners that always answer it; the three light up together and are read as one sentence, never alone.</p>"
          + "<p><b>Mirror 對宮</b> — the room straight across the court: its strongest single companion. What the mirror holds leans into this room, especially when the room itself is empty.</p>";
        colBoard.appendChild(explain);
        colBoard.appendChild(legendEl());
        colBoard.appendChild(elemLegendEl());
        colRooms.appendChild(readingEl(shown.chart, yp));
        cols.appendChild(colBoard);
        cols.appendChild(colRooms);
        result.appendChild(cols);
        selectCourt("ming-gong");
      }
    }
    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function summaryChips(chart) {
      var wrap = h("div", "pcast-chips");
      var lifePal = null;
      Object.keys(chart.palaces).forEach(function (pid) { if (chart.palaces[pid].branchIndex === chart.lifeIndex) lifePal = pid; });
      chip(wrap, "Life Palace", (palById[chart.lifeBranch] ? "" : "") + chart.lifeBranch + " · " + (PAL_EN["ming-gong"]));
      chip(wrap, "Bureau", chart.bureau.num + " · " + chart.bureau.hant + " (" + chart.bureau.standard + ")");
      chip(wrap, "Zi Wei sits in", chart.ziWeiBranch);
      return wrap;
    }
    function chip(wrap, k, v) { var c = h("div", "pcast-chip"); c.appendChild(h("span", "pcast-chip-k", k)); c.appendChild(h("span", "pcast-chip-v", v)); wrap.appendChild(c); }

    function layoutToggle() {
      return zgToggle({
        ariaLabel: "Board layout",
        value: boardMode,
        options: [
          { value: "palace", label: "Beginner", sub: "Life pinned top-left" },
          { value: "branch", label: "Advanced 地支", sub: "every room at its true seat" }
        ],
        onChange: function (v) { boardMode = v; renderResult(lastOut, lastBirth); }
      }).el;
    }
    var GRID_ORDER = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4]; // matches the teaching court's palace-fixed layout (Life top-left)
    function boardEl(chart) {
      var board = h("div", "pcast-board");
      if (!chart) board.classList.add("is-locked");
      var PAL_SORTED = (window.ZiweiData.palaces || []).slice().sort(function (a, b) { return a.branchOrder - b.branchOrder; });
      PAL_SORTED.forEach(function (pal, i) {
        var pos;
        if (boardMode === "branch" && chart && chart.palaces[pal.id]) { pos = RING[chart.palaces[pal.id].branchIndex]; }
        else { var gi = GRID_ORDER[i]; pos = [Math.floor(gi / 4), gi % 4]; }
        var cell = h("div", "pcast-cell");
        cell.style.gridRow = (pos[0] + 1); cell.style.gridColumn = (pos[1] + 1);
        if (!chart) { cell.appendChild(h("span", "pcast-cell-role", pal.hant + " " + (PAL_EN[pal.id] || ""))); board.appendChild(cell); return; }
        var pc = chart.palaces[pal.id]; if (!pc) { board.appendChild(cell); return; }
        cell.classList.add("pcast-cell-btn"); cell.setAttribute("role", "button"); cell.setAttribute("tabindex", "0");
        if (pal.id === "ming-gong") cell.classList.add("is-life");
        courtCells[pal.id] = cell;
        (function (pid) {
          cell.addEventListener("click", function () { selectCourt(pid); });
          cell.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectCourt(pid); } });
        })(pal.id);
        var bIdx = (pc.branchIndex != null) ? pc.branchIndex : HOURS.indexOf(pc.branch);
        var brPy = (bIdx >= 0 && BRANCH_PY[bIdx]) ? BRANCH_PY[bIdx] : "";
        var brEl = h("span", "pcast-cell-branch", pc.branch);
        if (brPy) brEl.appendChild(h("small", "pcast-cell-branch-py", brPy));
        brEl.title = pc.branch + (brPy ? " " + brPy : "") + " · Earthly Branch — this room's fixed seat in the court";
        cell.appendChild(brEl);
        cell.appendChild(h("span", "pcast-cell-role", pal.hant + " " + (PAL_EN[pal.id] || "")));
        var sw = h("div", "pcast-cell-stars");
        (pc.stars || []).forEach(function (st) { sw.appendChild(starEl(st, false)); });
        cell.appendChild(sw);
        if (pc.isBody) cell.appendChild(h("span", "pcast-cell-body", "身"));
        board.appendChild(cell);
      });
      var center = h("div", "pcast-board-center");
      if (chart) { center.appendChild(h("span", "pcast-center-hant", "紫微斗數")); center.appendChild(h("span", "pcast-center-sub", "your twelve palaces")); }
      else { center.appendChild(h("span", "pcast-center-lock", "\uD83D\uDD12")); center.appendChild(h("span", "pcast-center-sub", "birth hour needed")); }
      board.appendChild(center);
      return board;
    }

    function huaGrid(yp) {
      var t = HUA[yp.stem]; var grid = h("div", "pcast-hua-grid");
      ["lu", "quan", "ke", "ji"].forEach(function (f) {
        var c = h("div", "pcast-hua-cell pcast-hua-" + f);
        c.appendChild(h("span", "pcast-hua-badge", HUA_LABEL[f]));
        c.appendChild(h("span", "pcast-hua-star", starName(t[f])));
        c.appendChild(h("span", "pcast-hua-name", HUA_EN[f]));
        grid.appendChild(c);
      });
      return grid;
    }

    /* Shown when the reader has no hour and we have cast at noon for them. It has to do two jobs at
       once: hand over a full reading, and refuse to let the reader mistake an assumption for a fact.
       The four transformations are the anchor — they come from the birth YEAR, so they are true
       whatever hour turns out to be right, and saying so is what buys the rest of the page its
       credibility. */
    function noonPanel(yp) {
      var p = h("div", "pcast-missing pcast-noon");
      p.appendChild(h("p", "pcast-missing-h", "You didn't know your hour, so we cast you at noon."));
      p.appendChild(h("p", "pcast-missing-b", "In Purple Star the hour seats every star, and noon 午時 is the middle gate of the day: the least-wrong place to stand while you find out. Your whole court is drawn below. Read it as a shape rather than a verdict. Four things on this chart don't depend on the hour at all, because your birth year alone fixes which four stars are transformed for the whole of this life:"));
      p.appendChild(huaGrid(yp));
      p.appendChild(h("p", "pcast-missing-cta", "Slide the hour beam below, or enter your birth time above and cast again. The rooms will move. These four will not."));
      return p;
    }

    /* Last resort: no hour AND the caster could not be reached. Nothing to draw, so say the true thing. */
    function hourMissingPanel(yp) {
      var p = h("div", "pcast-missing");
      p.appendChild(h("p", "pcast-missing-h", "Your birth hour is missing — and in Purple Star the hour places every star."));
      p.appendChild(h("p", "pcast-missing-b", "Without it, the twelve rooms below can't be drawn. But your birth year alone already fixes which four stars are transformed this life:"));
      p.appendChild(huaGrid(yp));
      p.appendChild(h("p", "pcast-missing-cta", "Enter your exact birth time above and cast again to draw all twelve rooms and your full reading."));
      return p;
    }

    function legendEl() {
      var l = h("div", "pcast-legend");
      l.innerHTML = '<span><b class="pcast-hua-lu">祿</b> Flow</span><span><b class="pcast-hua-quan">權</b> Power</span><span><b class="pcast-hua-ke">科</b> Shine</span><span><b class="pcast-hua-ji">忌</b> Hook</span><span><b>身</b> Body Palace</span>';
      return l;
    }
    /* the five-element swatch row — Worker B colors each <i> by its data-elem */
    function elemLegendEl() {
      var l = h("div", "pcast-elem-legend");
      [["wood", "Wood 木"], ["fire", "Fire 火"], ["earth", "Earth 土"], ["metal", "Metal 金"], ["water", "Water 水"]].forEach(function (e) {
        var s = h("span");
        var sw = document.createElement("i");
        sw.setAttribute("data-elem", e[0]);
        s.appendChild(sw);
        s.appendChild(document.createTextNode(e[1]));
        l.appendChild(s);
      });
      l.appendChild(h("span", "pcast-elem-legend-cap", "star colors follow the star's element"));
      return l;
    }

    /* ---- the personalized reading ---- */
    var FORCE_MEAN = {
      lu: "resources and ease flow here",
      quan: "you gain drive and authority here",
      ke: "you earn recognition and a good name here",
      ji: "attention catches here — this is the life lesson to work with"
    };
    function primaryStar(stars) { for (var i = 0; i < (stars || []).length; i++) { if (starById[stars[i].id]) return stars[i].id; } return null; }
    function palLabel(pid) { return palById[pid] ? (palById[pid].hant + " " + (PAL_EN[pid] || "")) : pid; }

    /* interactive living court: light a palace's triangle + mirror and highlight its room */
    function selectCourt(pid) {
      if (!courtCells[pid]) return;
      Object.keys(courtCells).forEach(function (k) { courtCells[k].classList.remove("is-focal", "is-tri", "is-mirror"); });
      Object.keys(courtRooms).forEach(function (k) { courtRooms[k].classList.remove("is-hi"); });
      courtCells[pid].classList.add("is-focal");
      var tri = (palById[pid] && palById[pid].trineIds) || [];
      tri.forEach(function (t) { if (courtCells[t]) courtCells[t].classList.add("is-tri"); });
      var mir = palById[pid] && palById[pid].oppositeId;
      if (mir && courtCells[mir]) courtCells[mir].classList.add("is-mirror");
      if (courtRooms[pid]) courtRooms[pid].classList.add("is-hi");
      var cap = document.getElementById("pcast-court-cap");
      if (cap) {
        /* the technical line, then the same thing in plain speech \u2014
           "Your Wealth is read with Career and Life beside it, and Fortune across from it." */
        var triPlain = tri.map(function (t) { return PAL_EN[t] || t; });
        var live = "Your " + (PAL_EN[pid] || pid) + " is read with "
          + (triPlain.length ? triPlain.join(" and ") + " beside it" : "its court beside it")
          + (mir ? ", and " + (PAL_EN[mir] || mir) + " across from it." : ".");
        cap.innerHTML = "<b>" + palLabel(pid) + "</b> \u00b7 triangle: " + (tri.map(palLabel).join(" & ") || "\u2014") + " \u00b7 mirror: " + (mir ? palLabel(mir) : "\u2014")
          + '<span class="pcast-court-cap-live">' + live + "</span>";
      }
    }

    function readingEl(chart, yp) {
      var wrap = h("div", "pcast-reading");

      /* Life Palace focus */
      var life = chart.palaces["ming-gong"];
      var lifeB = h("div", "pcast-read-block pcast-read-life");
      lifeB.appendChild(h("p", "pcast-read-eyebrow", "Your Life Palace · 命宮"));
      var lifeH = h("h3", "pcast-read-h", life.branch + "  ·  ");
      if ((life.stars || []).length) {
        life.stars.forEach(function (s, i) {
          if (i) lifeH.appendChild(document.createTextNode(" · "));
          lifeH.appendChild(starFullEl(s));
        });
      } else {
        lifeH.appendChild(document.createTextNode("no principal star"));
      }
      lifeB.appendChild(lifeH);
      var lp = primaryStar(life.stars);
      if (lp && starById[lp].placements && starById[lp].placements["ming-gong"]) {
        lifeB.appendChild(h("p", "pcast-read-p", starById[lp].placements["ming-gong"].beginner));
      } else {
        var opp = palById["ming-gong"].oppositeId;
        lifeB.appendChild(h("p", "pcast-read-p", "Your Life Palace holds no principal star — and that is not a lack. Somewhere between four and six of the twelve rooms sit empty in almost every chart ever cast. An empty Life room is read as open: you take your tone from the room straight across the court — your " + palLabel(opp) + " Palace — and many readers treat this as a life that writes itself through where you go, not what you were handed. Read the two rooms as one sentence."));
      }
      wrap.appendChild(lifeB);

      /* Four Transformations, personalized */
      var starToPalace = {};
      Object.keys(chart.palaces).forEach(function (pid) { (chart.palaces[pid].stars || []).forEach(function (s) { starToPalace[s.id] = pid; }); });
      var tB = h("div", "pcast-read-block");
      tB.appendChild(h("p", "pcast-read-eyebrow", "Your Four Transformations · 四化 · from your " + yp.name + " year"));
      /* The stem of the year you were born re-colours four stars, once, permanently. It does not
         add stars or move them. It changes how the four it touches BEHAVE — which is why a chart
         with no transformation in a room still speaks, and a room with two is not twice as loud.
         Read this before the four lines below, or they read as a scorecard. They are not one. */
      tB.appendChild(h("p", "pcast-read-note",
        "Your birth-year stem re-colours four of your stars, and only those four. Nothing is added and nothing moves. "
        + "Three of these are usually called auspicious and one is not, but that is the shallow reading: "
        + "the Flow can make a room too easy to leave alone, and the Hook marks the room you will keep returning to until you learn it. "
        + "What each one tells you is where your attention goes without being asked."));
      var tList = h("div", "pcast-read-hua");
      /* ziwei-transformations.js exports the ARRAY as .transformations and the lookup as
         .transformationById — not a {items} wrapper. Prefer the lookup; fall back to the array. */
      var TRANS = window.ZiweiData.transformationById || {};
      if (!TRANS.lu) {
        TRANS = {};
        (window.ZiweiData.transformations || []).forEach(function (t) { TRANS[t.id] = t; });
      }
      ["lu", "quan", "ke", "ji"].forEach(function (fr) {
        var sid = null; Object.keys(chart.natalHua).forEach(function (k) { if (chart.natalHua[k] === fr) sid = k; });
        var pid = sid ? starToPalace[sid] : null;
        var t = TRANS[fr] || {};
        var pal = pid ? palById[pid] : null;
        var row = h("div", "pcast-read-hua-row pcast-hua-" + fr);
        row.appendChild(h("span", "pcast-read-hua-badge", HUA_LABEL[fr]));
        var txt = h("span", "pcast-read-hua-txt");

        /* the authored natalEffect is templated on {star}; the palace clause is the reader's own */
        var effect = (t.natalEffect || FORCE_MEAN[fr] || "").replace("{star}", sid ? starName(sid) : "that star");
        var where = pal
          ? ("in your " + palLabel(pid) + " Palace, the room that asks <em>" + esc(pal.question) + "</em>")
          : "elsewhere in your chart";

        var lines = "<b>" + HUA_EN[fr] + "</b> " + (t.hant ? "<span lang=\"zh-Hant\">" + t.hant + "</span> " : "")
          + "lands on <b>" + (sid ? starName(sid) : "—") + "</b> " + where + ". "
          + "<span class=\"pcast-hua-effect\">" + effect + ".</span>";
        if (pal && pal.domain) lines += " <span class=\"pcast-hua-domain\">" + esc(pal.domain) + "</span>";
        if (t.caution) lines += " <span class=\"pcast-hua-caution\">" + esc(t.caution) + "</span>";
        txt.innerHTML = lines;
        row.appendChild(txt);
        tList.appendChild(row);
      });
      tB.appendChild(tList);
      /* the practitioner layer, folded away: it is the same four forces read as a working reader
         reads them, and it is the wrong first thing to meet. */
      var tDeep = h("details", "pcast-read-deep");
      tDeep.appendChild(h("summary", null, "How a reader weighs these four"));
      var tDeepList = h("div", "pcast-read-deep-body");
      ["lu", "quan", "ke", "ji"].forEach(function (fr) {
        var t = TRANS[fr]; if (!t || !t.practitioner) return;
        var p = h("p", "pcast-read-deep-p");
        p.innerHTML = "<b>" + HUA_LABEL[fr] + " " + HUA_EN[fr] + "</b> " + esc(t.practitioner);
        tDeepList.appendChild(p);
      });
      tDeepList.appendChild(h("p", "pcast-read-deep-p pcast-muted",
        "No single force decides a room. A star carries its transformation into every room its triangle touches, so a Hook in one place is answered three rooms away. Read the geometry before the verdict."));
      tDeep.appendChild(tDeepList);
      tB.appendChild(tDeep);
      wrap.appendChild(tB);

      /* Room by room */
      var rB = h("div", "pcast-read-block");
      rB.appendChild(h("p", "pcast-read-eyebrow", "Room by room · your twelve palaces"));
      var rooms = h("div", "pcast-read-rooms");
      (window.ZiweiData.palaces || []).forEach(function (pal) {
        var pc = chart.palaces[pal.id]; if (!pc) return;
        var room = h("div", "pcast-read-room"); if (pal.id === "ming-gong") room.classList.add("is-life");
        room.setAttribute("data-pid", pal.id); courtRooms[pal.id] = room;
        var rh = h("div", "pcast-read-room-head");
        rh.appendChild(h("span", "pcast-read-room-name", pal.hant + " " + (PAL_EN[pal.id] || "")));
        rh.appendChild(h("span", "pcast-read-room-branch", pc.branch));
        room.appendChild(rh);
        if (pal.question) room.appendChild(h("p", "pcast-read-room-q", pal.question));
        var starsLine = h("p", "pcast-read-room-stars");
        if ((pc.stars || []).length) {
          pc.stars.forEach(function (s) { starsLine.appendChild(starFullEl(s)); });
        } else {
          starsLine.textContent = "— no principal star —";
        }
        room.appendChild(starsLine);
        var prim = primaryStar(pc.stars);
        var place = prim && starById[prim].placements ? starById[prim].placements[pal.id] : null;
        if (place) {
          room.appendChild(h("p", "pcast-read-room-p", place.beginner));
          /* The ladder was authored all the way down — beginner, intermediate, practitioner,
             misread, for all 14 stars in all 12 rooms — and only the first rung was ever rendered.
             The rest opens on demand: a reading you can descend is honest, a reading that opens at
             practitioner depth is a wall. `misread` matters most: it names what this placement is
             NOT, which is the only thing standing between a study chart and a fortune cookie. */
          var deep = h("details", "pcast-read-deep");
          deep.appendChild(h("summary", null, "Read this room deeper"));
          var body = h("div", "pcast-read-deep-body");
          if (place.intermediate) {
            var pi = h("p", "pcast-read-deep-p");
            pi.innerHTML = "<b>How it is read</b> " + esc(place.intermediate);
            body.appendChild(pi);
          }
          if (place.practitioner) {
            var pp = h("p", "pcast-read-deep-p");
            pp.innerHTML = "<b>What a reader checks</b> " + esc(place.practitioner);
            body.appendChild(pp);
          }
          if (place.misread) {
            var pm = h("p", "pcast-read-deep-p pcast-read-misread");
            pm.innerHTML = "<b>Commonly misread</b> " + esc(place.misread);
            body.appendChild(pm);
          }
          if (pal.oppositeId) {
            body.appendChild(h("p", "pcast-read-deep-p pcast-muted",
              "Never read this room alone. It answers with its two triangle partners and its mirror, the "
              + (PAL_EN[pal.oppositeId] || "opposite") + " Palace across the court."));
          }
          if (body.childNodes.length) { deep.appendChild(body); room.appendChild(deep); }
        } else if (pal.oppositeId) {
          room.appendChild(h("p", "pcast-read-room-p pcast-muted", "No principal star seats here — normal in every chart. The room borrows its voice from the " + (PAL_EN[pal.oppositeId] || "opposite") + " Palace across the court; read that room to hear this one."));
        }
        rooms.appendChild(room);
      });
      rB.appendChild(rooms);
      wrap.appendChild(rB);

      return wrap;
    }
  });
})();
