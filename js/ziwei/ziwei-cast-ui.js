/* ziwei-cast-ui.js — the hero "cast your chart" widget.
   Birth date (required) + time (optional) + timezone + gender -> ZiweiData.lunar.castFromBirth ->
   renders the twelve-palace board. When the hour is unknown, the board is locked (every star's
   position depends on the hour) and only the hour-independent facts show.
   State lives in ZiweiStudyChart (one source of truth); this file renders the reading and owns
   the sticky bottom chart dock (#pcast-dock): date chip, birth-hour + timezone selects, a live
   clock->branch conversion line, a collapsible dock (.pcast-dk-collapse / .pcast-dk-mini,
   persisted via the studyChart pref "dockCollapsed"), a 24-hour Gregorian hour beam (scrub the
   clock and the whole page re-casts; live readout pairs 12-hour time with the branch hour),
   and the "Current lesson" slot the learning track's bottom bar mounts into.
   Also ships two small shared APIs other scripts may reuse:
     window.ZodiTick()  — one soft UI tick (lazy AudioContext, gesture-only, calm-mode aware)
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

    /* ---- reference maps ---- */
    var PAL_EN = {
      "ming-gong": "Life", "xiong-di-gong": "Siblings", "fu-qi-gong": "Spouse", "zi-nu-gong": "Children",
      "cai-bo-gong": "Wealth", "ji-e-gong": "Health", "qian-yi-gong": "Travel", "nu-pu-gong": "Friends",
      "guan-lu-gong": "Career", "tian-zhai-gong": "Property", "fu-de-gong": "Fortune", "fu-mu-gong": "Parents"
    };
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

    var AUX_HANT = { "wen-chang": "文昌", "wen-qu": "文曲", "zuo-fu": "左輔", "you-bi": "右弼" };
    var AUX_PY = { "wen-chang": "Wénchāng", "wen-qu": "Wénqǔ", "zuo-fu": "Zuǒfǔ", "you-bi": "Yòubì" };
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
       ZiweiData.speak knows the 14 principal stars; aux stars fall through to the
       site-wide zaSpeak voice when a page ships it. */
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
       user gesture that asks for it), a ~35ms triangle blip 1400→900Hz, gain peaking ~0.05,
       hard stop. Never autoplays; silent entirely in calm mode (prefers-reduced-motion). ---- */
    if (!window.ZodiTick) {
      window.ZodiTick = (function () {
        var ctx = null;
        return function () {
          try {
            if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            if (!ctx) ctx = new AC();
            if (ctx.state === "suspended" && ctx.resume) ctx.resume();
            var t = ctx.currentTime;
            var osc = ctx.createOscillator(), g = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(1400, t);
            osc.frequency.exponentialRampToValueAtTime(900, t + 0.035);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.05, t + 0.008);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(t); osc.stop(t + 0.04);
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
          try { window.ZodiTick(); } catch (err) {}
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
    form.appendChild(h("p", "pcast-form-eyebrow", "Cast your chart"));
    form.appendChild(h("p", "pcast-form-optnote", "Optional — the page works without it. Add your birth date for a reading of your own."));
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

    var calState = { y: 1995, m: 0, sel: null };
    function fmtDigits(s) { var d = s.replace(/\D/g, "").slice(0, 8); var o = d.slice(0, 2); if (d.length > 2) o += "/" + d.slice(2, 4); if (d.length > 4) o += "/" + d.slice(4, 8); return o; }
    date.addEventListener("input", function () { date.value = fmtDigits(date.value); if (parseDate(date.value) && !cal.hidden) { syncCalToInput(); renderCal(); } });
    calBtn.addEventListener("click", function (e) { e.stopPropagation(); if (cal.hidden) openCal(); else cal.hidden = true; });
    document.addEventListener("click", function (e) { if (!cal.hidden && !row1.contains(e.target)) cal.hidden = true; });
    function syncCalToInput() { var p = parseDate(date.value); if (p) { calState.y = p.year; calState.m = p.month - 1; calState.sel = { y: p.year, m: p.month - 1, d: p.day }; } }
    function openCal() { syncCalToInput(); cal.hidden = false; renderCal(); }
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
    var row2 = h("div", "pcast-field");
    var tl = labelFor("pcast-time", "Birth time"); var opt = h("span", "pcast-opt", " · anchors your whole chart"); tl.appendChild(opt);
    row2.appendChild(tl);
    var time = input("pcast-time", "time"); row2.appendChild(time);
    var unkWrap = h("label", "pcast-check");
    var unk = input("pcast-unknown", "checkbox"); unkWrap.appendChild(unk); unkWrap.appendChild(h("span", null, "I don't know my birth time"));
    row2.appendChild(unkWrap);
    form.appendChild(row2);
    var row3 = h("div", "pcast-field pcast-field-2");
    var tzc = h("div"); tzc.appendChild(labelFor("pcast-tz", "Birth timezone"));
    var tz = select("pcast-tz", TZ); tzc.appendChild(tz); row3.appendChild(tzc);
    (function preselectTz() { var off = -new Date().getTimezoneOffset() / 60; for (var i = 0; i < TZ.length; i++) { if (TZ[i][0] === String(off)) { tz.value = TZ[i][0]; break; } } })();
    var gc = h("div"); gc.appendChild(labelFor("pcast-gender", "Gender"));
    var gender = select("pcast-gender", [["", "Prefer not to say"], ["female", "Female"], ["male", "Male"]]); gc.appendChild(gender); row3.appendChild(gc);
    form.appendChild(row3);
    var go = h("button", "psa-btn pcast-go", "Cast my chart"); go.type = "submit"; form.appendChild(go);
    var note = h("p", "pcast-note", "Read as birthplace-local time. Your data stays in your browser — nothing is sent anywhere.");
    form.appendChild(note);

    function labelFor(id, txt) { var l = h("label", "pcast-label", txt); l.setAttribute("for", id); return l; }
    function input(id, type) { var i = document.createElement("input"); i.id = id; i.name = id; i.type = type; if (type === "date" || type === "time") i.className = "pcast-input"; return i; }
    function select(id, opts) { var s = document.createElement("select"); s.id = id; s.className = "pcast-input"; opts.forEach(function (o) { var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; s.appendChild(op); }); return s; }

    unk.addEventListener("change", function () { time.disabled = unk.checked; if (unk.checked) time.value = ""; });

    /* ---- casting ---- */
    var lastBirth = null;   // {year,month,day,gender}
    var courtCells = {}, courtRooms = {};   // for the interactive living court
    var boardMode = "palace";   // "palace" = teaching layout (Life top-left); "branch" = authentic chart
    var lastOut = null;
    function readBirth() {
      var p = parseDate(date.value);
      if (!p) return null;
      var b = { year: p.year, month: p.month, day: p.day, gender: gender.value || null };
      if (!unk.checked && time.value) { var tp = time.value.split(":"); b.hour = +tp[0]; b.minute = +(tp[1] || 0); }
      else { b.hour = null; b.minute = null; }
      b.tzOffset = tz.value; /* "auto" is resolved to the device offset by ZiweiStudyChart.save */
      return b;
    }
    var SC = window.ZiweiStudyChart || null;
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
      if (b.hour == null) {
        if (!unk.checked) { unk.checked = true; time.value = ""; time.disabled = true; }
      } else {
        if (unk.checked) { unk.checked = false; time.disabled = false; }
        time.value = pad(b.hour) + ":" + pad(b.minute == null ? 0 : b.minute);
      }
      var tzWant = (b.tzOffset == null) ? "auto" : String(b.tzOffset);
      tz.value = tzWant;
      if (tz.value !== tzWant) tz.value = "auto"; /* offset outside the option list */
      if (b.gender) gender.value = b.gender;
    }
    /* keep the two timezone selects in sync form -> dock */
    tz.addEventListener("change", function () {
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
    function tzName(off) {
      if (off == null || isNaN(off)) return "";
      var key = String(off);
      for (var i = 1; i < TZ.length; i++) { if (TZ[i][0] === key) return TZ[i][1]; }
      return tzLabel(off);
    }
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
    function convLine(birth) {
      if (birth.hour == null) return "Pick an hour to unlock the full court — try your best guesses.";
      var bi = branchOf(birth.hour);
      var tzs = tzLabel(birth.tzOffset);
      var line;
      if (birth.minute != null) line = pad(birth.hour) + ":" + pad(birth.minute) + (tzs ? " in " + tzs : "") + " → " + HOURS[bi] + "時 " + HOUR_RANGE[bi];
      else line = HOURS[bi] + "時 · " + HOUR_RANGE[bi] + (tzs ? " · read in " + tzs : "");
      if (birth.hour === 23) line += " · late 子時 — counts toward the next day in some schools; we read it as 子";
      return line;
    }

    var dockEls = null;
    function ensureDock() {
      if (dockEls) return dockEls;
      var dock = document.getElementById("pcast-dock");
      if (!dock) { dock = h("div", "pcast-dock"); dock.id = "pcast-dock"; document.body.appendChild(dock); }
      var inner = h("div", "pcast-dock-inner");

      /* collapsed summary strip — Worker B's CSS shows it only while the dock
         carries .is-collapsed and hides everything else */
      var mini = h("div", "pcast-dk-mini");
      var miniTxt = h("span", "pcast-dk-mini-txt", "");
      mini.appendChild(miniTxt);
      inner.appendChild(mini);

      var chartRow = h("div", "pcast-dock-chart");
      chartRow.setAttribute("data-dock-chart", "");
      chartRow.hidden = true;

      var idBtn = h("button", "pcast-dk-id"); idBtn.type = "button";
      idBtn.setAttribute("aria-label", "Your chart — edit the birth date in the form above");
      idBtn.appendChild(h("span", "pcast-dk-eyebrow", "Your chart"));
      var dateEl = h("span", "pcast-dk-date", "");
      idBtn.appendChild(dateEl);
      idBtn.addEventListener("click", function () {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        try { date.focus({ preventScroll: true }); } catch (err) { date.focus(); }
      });
      chartRow.appendChild(idBtn);

      var hourWrap = h("label", "pcast-dk-field");
      hourWrap.appendChild(h("span", "pcast-dk-lab", "Birth hour"));
      var hourSel = document.createElement("select");
      hourSel.className = "pcast-dk-sel"; hourSel.id = "pcast-dk-hour";
      hourSel.setAttribute("aria-label", "Birth hour");
      hourWrap.appendChild(hourSel);
      chartRow.appendChild(hourWrap);

      var tzWrap = h("label", "pcast-dk-field");
      tzWrap.appendChild(h("span", "pcast-dk-lab", "Birth timezone"));
      var tzSel = document.createElement("select");
      tzSel.className = "pcast-dk-sel"; tzSel.id = "pcast-dk-tz";
      tzSel.setAttribute("aria-label", "Birth timezone");
      TZ.forEach(function (o) { tzSel.appendChild(new Option(o[1], o[0])); });
      tzWrap.appendChild(tzSel);
      chartRow.appendChild(tzWrap);

      var conv = h("p", "pcast-dk-conv", ""); conv.id = "pcast-dk-conv";
      chartRow.appendChild(conv);

      /* the hour beam: a 24-hour Gregorian scrubber, birthplace-local in the selected
         birth timezone. Slide the range (or tap an even-hour tick) ->
         ZiweiStudyChart.setHour(hour) -> the whole page re-casts through psa:studychart.
         The live readout pairs the 12-hour clock with the branch hour so the two clocks
         teach each other; #pcast-dk-conv stays the precise conversion line. */
      var beam = h("div", "pcast-dk-beam");
      var beamLab = h("span", "pcast-dk-beam-lab", "Slide the birth hour");
      beam.appendChild(beamLab);
      var beamCur = h("span", "pcast-dk-beam-cur", "");
      beam.appendChild(beamCur);
      var beamRange = document.createElement("input");
      beamRange.type = "range";
      beamRange.className = "pcast-dk-beam-range";
      beamRange.min = "0"; beamRange.max = "23"; beamRange.step = "1"; beamRange.value = "12";
      beamRange.setAttribute("aria-label", "Birth hour — 24 clock hours, birthplace-local");
      beam.appendChild(beamRange);
      var beamTicks = h("div", "pcast-dk-beam-ticks");
      var tickEls = [];
      for (var ti = 0; ti < 12; ti++) {
        (function (idx) {
          var hr = idx * 2;
          var lab = hr === 0 ? "12AM" : (hr === 12 ? "12PM" : String(hr % 12));
          var tick = h("button", "pcast-dk-tick");
          tick.type = "button";
          tick.setAttribute("aria-label", clock12(hr, 0) + " · " + HOURS[branchOf(hr)] + "時 " + HOUR_RANGE[branchOf(hr)]);
          tick.appendChild(h("b", null, lab));
          tick.addEventListener("click", function () { if (SC && lastBirth) SC.setHour(hr); });
          beamTicks.appendChild(tick);
          tickEls.push(tick);
        })(ti);
      }
      beam.appendChild(beamTicks);
      chartRow.appendChild(beam);

      /* mobile: the site-wide Reveal Dock (#pn-dock) is hidden while the chart dock is live
         (see page CSS); this compact ✦ pill keeps the unlock path one tap away */
      var zodi = document.createElement("a");
      zodi.className = "pcast-dk-zodi"; zodi.href = "/";
      zodi.setAttribute("aria-label", "Unlock Your Zodi Animal");
      zodi.textContent = "✦";
      chartRow.appendChild(zodi);

      inner.appendChild(chartRow);
      var lessonSlot = h("div", "pcast-dock-lesson");
      lessonSlot.setAttribute("data-dock-lesson", "");
      inner.appendChild(lessonSlot);
      dock.appendChild(inner);

      /* absorb the learning track's bottom bar if it was mounted to <body> first,
         so there is exactly one bottom dock, never two stacked */
      var strayBar = document.querySelector("body > .psa-continue-bar");
      if (strayBar) { lessonSlot.appendChild(strayBar); dock.classList.add("has-lesson"); }

      hourSel.addEventListener("change", function () {
        if (!SC || !lastBirth) return;
        var hour = hourSel.value === "" ? null : +hourSel.value;
        SC.setHour(hour);
      });
      /* scrub -> instant local readout, throttled re-cast (~120ms) */
      var beamTimer = null;
      beamRange.addEventListener("input", function () {
        var hr = +beamRange.value;
        beamCur.textContent = beamCurLine(hr, null);
        if (beamTimer) window.clearTimeout(beamTimer);
        beamTimer = window.setTimeout(function () {
          beamTimer = null;
          if (SC && lastBirth) SC.setHour(hr);
        }, 120);
      });
      tzSel.addEventListener("change", function () {
        if (!SC || !lastBirth) return;
        tz.value = tzSel.value;
        if (tz.value !== tzSel.value) tz.value = "auto";
        SC.setTz(tzSel.value);
      });

      function padBody() {
        var hgt = dock.offsetHeight; /* 0 while display:none */
        document.body.style.paddingBottom = hgt ? (hgt + 14) + "px" : "";
      }
      window.addEventListener("resize", padBody);
      if (window.ResizeObserver) { try { new ResizeObserver(padBody).observe(dock); } catch (err) {} }

      /* collapse chevron at the dock's right edge — Jay wants to see the whole board.
         Collapsed state persists as the studyChart pref "dockCollapsed". */
      var collapseBtn = h("button", "pcast-dk-collapse");
      collapseBtn.type = "button";
      collapseBtn.textContent = "▾";
      collapseBtn.setAttribute("aria-expanded", "true");
      collapseBtn.setAttribute("aria-label", "Collapse the chart dock");
      function setCollapsed(on, persist) {
        on = !!on;
        dock.classList.toggle("is-collapsed", on);
        collapseBtn.textContent = on ? "▴" : "▾";
        collapseBtn.setAttribute("aria-expanded", on ? "false" : "true");
        collapseBtn.setAttribute("aria-label", on ? "Expand the chart dock" : "Collapse the chart dock");
        if (persist && SC) { try { SC.setPref("dockCollapsed", on); } catch (err) {} }
        padBody();
      }
      collapseBtn.addEventListener("click", function () {
        setCollapsed(!dock.classList.contains("is-collapsed"), true);
        try { window.ZodiTick(); } catch (err) {}
      });
      inner.appendChild(collapseBtn);
      /* tapping the collapsed summary opens the dock back up too */
      mini.addEventListener("click", function () { if (dock.classList.contains("is-collapsed")) setCollapsed(false, true); });

      dockEls = { dock: dock, chartRow: chartRow, dateEl: dateEl, hourSel: hourSel, tzSel: tzSel, conv: conv, beamRange: beamRange, beamLab: beamLab, beamCur: beamCur, tickEls: tickEls, miniTxt: miniTxt, setCollapsed: setCollapsed, lessonSlot: lessonSlot, padBody: padBody };
      /* restore the visitor's last collapse choice */
      if (SC) { try { if (SC.getPref("dockCollapsed")) setCollapsed(true, false); } catch (err) {} }
      return dockEls;
    }

    function buildDock(birth) {
      var els = ensureDock();
      els.dock.classList.add("has-chart");
      document.body.classList.add("pcast-dock-live");
      els.chartRow.hidden = false;
      els.dateEl.textContent = pad(birth.month) + "/" + pad(birth.day) + "/" + birth.year;
      els.hourSel.innerHTML = "";
      var curIdx = (birth.hour == null) ? -1 : branchOf(birth.hour);
      els.hourSel.appendChild(new Option("I don't know", "", birth.hour == null, birth.hour == null));
      for (var i = 0; i < 12; i++) {
        /* representative clock hour for branch i is i*2 (branchOf(i*2) === i);
           the old siderail's i*2+1 landed every pick one branch late */
        var val = (i === curIdx && birth.hour != null) ? birth.hour : i * 2;
        els.hourSel.appendChild(new Option(HOURS[i] + "時 · " + HOUR_RANGE[i], val, false, i === curIdx));
      }
      var tzWant = (birth.tzOffset == null) ? "auto" : String(birth.tzOffset);
      els.tzSel.value = tzWant;
      if (els.tzSel.value !== tzWant) els.tzSel.value = "auto";
      els.conv.textContent = convLine(birth);
      /* the beam is birthplace-local — say which timezone it's reading in */
      var tzn = tzName(birth.tzOffset);
      els.beamLab.textContent = "Slide the birth hour" + (tzn ? " · " + tzn : "");
      els.beamCur.textContent = beamCurLine(birth.hour, birth.minute);
      /* sync the 24-hour beam: known hour lights the nearest even-hour tick; unknown hour
         parks the thumb at noon with nothing lit — the first slide sets the hour for real */
      var beamVal = (birth.hour == null) ? 12 : birth.hour;
      if (+els.beamRange.value !== beamVal) els.beamRange.value = String(beamVal);
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
      var yp = out.yearPillar;
      var head = h("div", "pcast-res-head");
      head.appendChild(h("h2", "pcast-res-title", "Your reading"));
      var meta = h("p", "pcast-res-meta");
      meta.textContent = birth.year + "-" + pad(birth.month) + "-" + pad(birth.day)
        + "  ·  lunar " + out.lunar.lunarYear + "/" + (out.lunar.leap ? "leap " : "") + out.lunar.lunarMonth + "/" + out.lunar.day
        + "  ·  " + yp.name + " " + yp.animal + " year";
      head.appendChild(meta);
      result.appendChild(head);

      if (out.needHour || !out.chart) {
        result.appendChild(hourMissingPanel(yp));
        result.appendChild(boardEl(null));
      } else {
        /* two columns: the board (what you see) left, the room-by-room reading
           (what it means) right — scrub the hour beam and watch both change.
           .pcast-bleed lets Worker B's CSS break the pair out to ~96vw. */
        var cols = h("div", "pcast-reading-cols pcast-bleed");
        var colBoard = h("div", "pcast-col-board");
        var colRooms = h("div", "pcast-col-rooms");
        colBoard.appendChild(summaryChips(out.chart));
        colBoard.appendChild(layoutToggle());
        colBoard.appendChild(h("p", "pcast-branch-note", "The small glyph in each room's corner is its Earthly Branch 地支 — one of twelve fixed seats of the court (子, 丑, 寅 …). Your stars move from chart to chart; the twelve seats never do. Beginner view pins your Life room top-left; Advanced view seats every room at its true branch seat."));
        colBoard.appendChild(boardEl(out.chart));
        colBoard.appendChild(h("p", "pcast-court-hint", "Tap a room to light its triangle and mirror across your court."));
        var cap = h("p", "pcast-court-cap"); cap.id = "pcast-court-cap"; colBoard.appendChild(cap);
        /* what "triangle" and "mirror" even mean — rendered once, always visible under the cap */
        var explain = h("div", "pcast-court-explain");
        explain.innerHTML = "<p><b>Triangle 三方</b> — every room is read with two partners that always answer it; the three light up together and are read as one sentence, never alone.</p>"
          + "<p><b>Mirror 對宮</b> — the room straight across the court: its strongest single companion. What the mirror holds leans into this room, especially when the room itself is empty.</p>";
        colBoard.appendChild(explain);
        colBoard.appendChild(legendEl());
        colBoard.appendChild(elemLegendEl());
        colRooms.appendChild(readingEl(out.chart, yp));
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

    function hourMissingPanel(yp) {
      var p = h("div", "pcast-missing");
      p.appendChild(h("p", "pcast-missing-h", "Your birth hour is missing — and in Purple Star the hour places every star."));
      p.appendChild(h("p", "pcast-missing-b", "Without it, the twelve rooms below can't be drawn. But your birth year alone already fixes which four stars are transformed this life:"));
      var t = HUA[yp.stem]; var grid = h("div", "pcast-hua-grid");
      ["lu", "quan", "ke", "ji"].forEach(function (f) {
        var c = h("div", "pcast-hua-cell pcast-hua-" + f);
        c.appendChild(h("span", "pcast-hua-badge", HUA_LABEL[f]));
        c.appendChild(h("span", "pcast-hua-star", starName(t[f])));
        c.appendChild(h("span", "pcast-hua-name", HUA_EN[f]));
        grid.appendChild(c);
      });
      p.appendChild(grid);
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
      var tList = h("div", "pcast-read-hua");
      ["lu", "quan", "ke", "ji"].forEach(function (fr) {
        var sid = null; Object.keys(chart.natalHua).forEach(function (k) { if (chart.natalHua[k] === fr) sid = k; });
        var pid = sid ? starToPalace[sid] : null;
        var row = h("div", "pcast-read-hua-row pcast-hua-" + fr);
        row.appendChild(h("span", "pcast-read-hua-badge", HUA_LABEL[fr]));
        var txt = h("span", "pcast-read-hua-txt");
        var where = pid ? ("in your " + palLabel(pid) + " Palace") : "elsewhere in your chart";
        txt.innerHTML = "<b>" + HUA_EN[fr] + "</b> lands on <b>" + (sid ? starName(sid) : "—") + "</b> " + where + " — " + FORCE_MEAN[fr] + ".";
        row.appendChild(txt);
        tList.appendChild(row);
      });
      tB.appendChild(tList);
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
        if (prim && starById[prim].placements && starById[prim].placements[pal.id]) {
          room.appendChild(h("p", "pcast-read-room-p", starById[prim].placements[pal.id].beginner));
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
