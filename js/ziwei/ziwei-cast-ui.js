/* ziwei-cast-ui.js — the hero "cast your chart" widget.
   Birth date (required) + time (optional) + timezone + gender -> ZiweiData.lunar.castFromBirth ->
   renders the twelve-palace board. When the hour is unknown, the board is locked (every star's
   position depends on the hour) and only the hour-independent facts show; a sticky floating
   hour-scrubber lets the reader try all twelve two-hour branches and watch the chart change.
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
    function h(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
    function starName(id) { var s = starById[id]; return s ? s.hant : (AUX_HANT[id] || id); }

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
    var row1 = h("div", "pcast-field pcast-date-field");
    var dl = labelFor("pcast-date", "Birth date"); dl.appendChild(h("span", "pcast-opt", " · MM/DD/YYYY")); row1.appendChild(dl);
    var dwrap = h("div", "pcast-date-wrap");
    var date = input("pcast-date", "text"); date.className = "pcast-input"; date.placeholder = "MM / DD / YYYY";
    date.setAttribute("inputmode", "numeric"); date.autocomplete = "off"; date.required = true; date.maxLength = 14;
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
    var tl = labelFor("pcast-time", "Birth time"); var opt = h("span", "pcast-opt", " · sets your Life Palace"); tl.appendChild(opt);
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
    function readBirth() {
      var p = parseDate(date.value);
      if (!p) return null;
      var b = { year: p.year, month: p.month, day: p.day, gender: gender.value || null };
      if (!unk.checked && time.value) b.hour = +time.value.split(":")[0];
      else b.hour = null;
      return b;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = readBirth();
      if (!b) { date.focus(); return; }
      lastBirth = b;
      var out = L.castFromBirth(b);
      renderResult(out, b);
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    /* ---- render the board ---- */
    function renderResult(out, birth) {
      result.innerHTML = "";
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
        result.appendChild(summaryChips(out.chart));
        result.appendChild(boardEl(out.chart));
        result.appendChild(legendEl());
        result.appendChild(readingEl(out.chart, yp));
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

    function boardEl(chart) {
      var board = h("div", "pcast-board");
      if (!chart) board.classList.add("is-locked");
      var byBranch = {};
      if (chart) Object.keys(chart.palaces).forEach(function (pid) { var p = chart.palaces[pid]; byBranch[p.branchIndex] = { pid: pid, stars: p.stars, isBody: p.isBody }; });
      for (var bi = 0; bi < 12; bi++) {
        var cell = h("div", "pcast-cell");
        cell.style.gridRow = (RING[bi][0] + 1); cell.style.gridColumn = (RING[bi][1] + 1);
        cell.appendChild(h("span", "pcast-cell-branch", L.BRANCHES[bi]));
        if (chart) {
          var info = byBranch[bi];
          if (bi === chart.lifeIndex) cell.classList.add("is-life");
          if (info && info.pid) {
            var role = h("span", "pcast-cell-role", (palById[info.pid] ? palById[info.pid].hant : "") + " " + (PAL_EN[info.pid] || ""));
            cell.appendChild(role);
            var sw = h("div", "pcast-cell-stars");
            (info.stars || []).forEach(function (st) {
              var se = h("span", "pcast-star", starName(st.id));
              if (st.hua) { var b = h("sup", "pcast-hua pcast-hua-" + st.hua, HUA_LABEL[st.hua]); se.appendChild(b); }
              sw.appendChild(se);
            });
            cell.appendChild(sw);
            if (info.isBody) cell.appendChild(h("span", "pcast-cell-body", "身"));
          }
        }
        board.appendChild(cell);
      }
      var center = h("div", "pcast-board-center");
      if (chart) { center.appendChild(h("span", "pcast-center-hant", "紫微斗數")); center.appendChild(h("span", "pcast-center-sub", "your twelve palaces")); }
      else { center.appendChild(h("span", "pcast-center-lock", "🔒")); center.appendChild(h("span", "pcast-center-sub", "birth hour needed")); }
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

    /* ---- the personalized reading ---- */
    var FORCE_MEAN = {
      lu: "resources and ease flow here",
      quan: "you gain drive and authority here",
      ke: "you earn recognition and a good name here",
      ji: "attention catches here — this is the life lesson to work with"
    };
    function primaryStar(stars) { for (var i = 0; i < (stars || []).length; i++) { if (starById[stars[i].id]) return stars[i].id; } return null; }
    function palLabel(pid) { return palById[pid] ? (palById[pid].hant + " " + (PAL_EN[pid] || "")) : pid; }

    function readingEl(chart, yp) {
      var wrap = h("div", "pcast-reading");

      /* Life Palace focus */
      var life = chart.palaces["ming-gong"];
      var lifeB = h("div", "pcast-read-block pcast-read-life");
      lifeB.appendChild(h("p", "pcast-read-eyebrow", "Your Life Palace · 命宮"));
      var lifeStars = (life.stars || []).map(function (s) { return starName(s.id); }).join(" · ") || "no principal star";
      lifeB.appendChild(h("h3", "pcast-read-h", life.branch + "  ·  " + lifeStars));
      var lp = primaryStar(life.stars);
      if (lp && starById[lp].placements && starById[lp].placements["ming-gong"]) {
        lifeB.appendChild(h("p", "pcast-read-p", starById[lp].placements["ming-gong"].beginner));
      } else {
        var opp = palById["ming-gong"].oppositeId;
        lifeB.appendChild(h("p", "pcast-read-p", "Your Life Palace holds no principal star, so it takes its tone from the room across the court — the " + palLabel(opp) + " Palace. Read the two together."));
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
        var rh = h("div", "pcast-read-room-head");
        rh.appendChild(h("span", "pcast-read-room-name", pal.hant + " " + (PAL_EN[pal.id] || "")));
        rh.appendChild(h("span", "pcast-read-room-branch", pc.branch));
        room.appendChild(rh);
        if (pal.question) room.appendChild(h("p", "pcast-read-room-q", pal.question));
        var starsLine = (pc.stars || []).map(function (s) { return starName(s.id) + (s.hua ? " " + HUA_LABEL[s.hua] : ""); }).join(" · ");
        room.appendChild(h("p", "pcast-read-room-stars", starsLine || "— no principal star —"));
        var prim = primaryStar(pc.stars);
        if (prim && starById[prim].placements && starById[prim].placements[pal.id]) {
          room.appendChild(h("p", "pcast-read-room-p", starById[prim].placements[pal.id].beginner));
        } else if (pal.oppositeId) {
          room.appendChild(h("p", "pcast-read-room-p pcast-muted", "Empty of principal stars — read it through its opposite, the " + (PAL_EN[pal.oppositeId] || "opposite") + " Palace."));
        }
        rooms.appendChild(room);
      });
      rB.appendChild(rooms);
      wrap.appendChild(rB);

      return wrap;
    }
  });
})();
