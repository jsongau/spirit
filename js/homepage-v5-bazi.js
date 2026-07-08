/* ============================================================
   Zodi Animal — BaZi showcase (v5)
   Renders TODAY's Four Pillars (year, month, day, hour), recast at
   midnight Pacific. The day pillar is the self and is highlighted;
   its branch is the day animal, so it aligns with the Proverb of the
   Day and the zodiac day. Formulas are copied verbatim from the site's
   own calculator (js/bazi.js castChart), so the characters match the
   almanac. If a Zodi Animal has been revealed, the copy personalizes
   and surfaces the visitor's next power (year-animal) year as the hook.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  var STEM_PY = ["jiǎ", "yǐ", "bǐng", "dīng", "wù", "jǐ", "gēng", "xīn", "rén", "guǐ"];
  var BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  var BRANCH_PY = ["zǐ", "chǒu", "yín", "mǎo", "chén", "sì", "wǔ", "wèi", "shēn", "yǒu", "xū", "hài"];
  var ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var PHASES = ["Wood", "Fire", "Earth", "Metal", "Water"];          // stem element = PHASES[floor(stemIdx/2)]
  var BRANCH_EL = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];              // element index per branch (子..亥)
  var EL_COLOR = { Wood: "#6fae74", Fire: "#d1553b", Earth: "#c8a24c", Metal: "#c9cdd6", Water: "#6fa8c9" };

  function mod(n, m) { return ((n % m) + m) % m; }
  function jdn(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  function solarMonth(y, m, d) {
    var md = m * 100 + d;
    if (md < 204) return { branch: (md >= 106 ? 1 : 0), yr: y - 1 };
    var B = [[2, 4, 2], [3, 6, 3], [4, 5, 4], [5, 6, 5], [6, 6, 6], [7, 7, 7], [8, 8, 8], [9, 8, 9], [10, 8, 10], [11, 7, 11], [12, 7, 0]];
    var branch = 2;
    for (var i = 0; i < B.length; i++) { if (md >= B[i][0] * 100 + B[i][1]) branch = B[i][2]; }
    return { branch: branch, yr: y };
  }
  function castNow(y, m, d, hour) {
    var sm = solarMonth(y, m, d);
    var yStem = mod(sm.yr - 4, 10), yBr = mod(sm.yr - 4, 12);
    var mBr = sm.branch;
    var mStem = mod((yStem % 5) * 2 + 2 + mod(mBr - 2, 12), 10);
    var dIdx = mod(jdn(y, m, d) - 2451545 + 54, 60);
    var dStem = dIdx % 10, dBr = dIdx % 12;
    var hBr = Math.floor(mod(hour + 1, 24) / 2);
    var hStem = mod(dStem * 2 + hBr, 10);
    return {
      year:  { stem: yStem, branch: yBr },
      month: { stem: mStem, branch: mBr },
      day:   { stem: dStem, branch: dBr },
      hour:  { stem: hStem, branch: hBr }
    };
  }

  function pacificNow() {
    var y, m, d, h;
    try {
      var f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", hour12: false });
      f.formatToParts(new Date()).forEach(function (p) {
        if (p.type === "year") y = +p.value; else if (p.type === "month") m = +p.value;
        else if (p.type === "day") d = +p.value; else if (p.type === "hour") h = +p.value;
      });
      if (h === 24) h = 0;
    } catch (e) { var n = new Date(); y = n.getFullYear(); m = n.getMonth() + 1; d = n.getDate(); h = n.getHours(); }
    return { y: y, m: m, d: d, h: h };
  }

  function stemEl(idx) { return PHASES[Math.floor(idx / 2)]; }
  function branchEl(idx) { return PHASES[BRANCH_EL[idx]]; }

  function cell(hanzi, color) { return '<span class="bzhome-cell" style="color:' + color + '">' + hanzi + "</span>"; }
  function pillar(p, label, isSelf) {
    return '<div class="bzhome-pillar' + (isSelf ? " is-self" : "") + '">' +
      cell(STEMS[p.stem], EL_COLOR[stemEl(p.stem)]) +
      cell(BRANCHES[p.branch], EL_COLOR[branchEl(p.branch)]) +
      '<span class="bzhome-plabel">' + label + "</span></div>";
  }

  function loadProfile() {
    try { var raw = localStorage.getItem("zodi:home-v2:profile"); if (!raw) return null;
      var p = JSON.parse(raw); if (p && typeof p.e === "number" && p.name) return p; } catch (e) {}
    return null;
  }
  function nextAnimalYear(animalIdx, fromYear) {
    for (var y = fromYear; y < fromYear + 12; y++) { if (mod(y - 4, 12) === animalIdx) return y; }
    return fromYear;
  }

  function init() {
    var host = $("#bz-pillars"); if (!host) return;
    var t = pacificNow();
    var c = castNow(t.y, t.m, t.d, t.h);

    host.innerHTML =
      pillar(c.year, "Year", false) +
      pillar(c.month, "Month", false) +
      pillar(c.day, "Day · self", true) +
      pillar(c.hour, "Hour", false);

    var dayEl = stemEl(c.day.stem);
    var dayAnimal = ANIMALS[c.day.branch];
    var yearAnimal = ANIMALS[c.year.branch];
    var dayHanzi = STEMS[c.day.stem] + BRANCHES[c.day.branch];
    var dayPy = STEM_PY[c.day.stem] + " " + BRANCH_PY[c.day.branch];

    var cap = $("#bz-cap");
    if (cap) cap.innerHTML = "Today is a <b>" + dayEl + " " + dayAnimal + "</b> day (" + dayHanzi + " " + dayPy +
      "), in the Year of the " + yearAnimal + ". The same day animal names today's proverb.";

    // personalize when a Zodi Animal is known
    var P = loadProfile();
    if (P) {
      var sign = P.name, animalIdx = P.e, animal = ANIMALS[animalIdx];
      var el = P.el || "";
      var hook = $("#bz-hook");
      if (hook) hook.innerHTML = "You are the <b>" + sign + "</b>" + (el ? ", a " + el + " " + animal : ", born in the Year of the " + animal) +
        ". The Four Pillars read the chart beneath that animal, with the Day Master at the centre as the self.";
      var ny = nextAnimalYear(animalIdx, t.y);
      var beat = $("#bz-beat-years");
      if (beat) beat.innerHTML = "Your next " + animal + " year is <b>" + ny + "</b>. Cast your chart to see the luck pillars that turn between now and then.";
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
