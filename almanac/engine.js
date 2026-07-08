/* ============================================================
   Zodi Almanac calendar engine (moved to /almanac/engine.js)
   Chinese output uses traditional characters, matching the Proverbs Pond.
   - Solar terms: computed from the sun's apparent longitude
     (Meeus low-precision series, good to about a minute).
   - Lunar months: computed from astronomical new moons (Meeus
     lunation series) with the traditional rules: calendar days
     run on UTC+8, the month holding the winter solstice is
     month 11, and in a 13-month sui the first month without a
     major term is the leap month.
   - Day pillars: same verified formula as js/bazi.js
     (2000-01-01 = wu-wu day).
   - Everything runs in the browser. No network calls.
   Engine is exported for node unit tests (see test block at end).
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- shared tables ---------------- */
  var STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  var STEM_PY = ["jiǎ", "yǐ", "bǐng", "dīng", "wù", "jǐ", "gēng", "xīn", "rén", "guǐ"];
  var BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  var BRANCH_PY = ["zǐ", "chǒu", "yín", "mǎo", "chén", "sì", "wǔ", "wèi", "shēn", "yǒu", "xū", "hài"];
  var ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var ANIMAL_CN = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
  var PHASES = ["Wood", "Fire", "Earth", "Metal", "Water"];
  var PHASE_CN = ["木", "火", "土", "金", "水"];
  var EL_COLOR = { Wood: "#6fae74", Fire: "#d1553b", Earth: "#c8a24c", Metal: "#c9cdd6", Water: "#6fa8c9" };

  // na yin: 30 pairs across the 60-cycle (index = floor(cycleIdx/2))
  var NAYIN = [
    ["海中金", "Sea Gold", 3], ["爐中火", "Furnace Fire", 1], ["大林木", "Forest Wood", 0],
    ["路旁土", "Roadside Earth", 2], ["劍鋒金", "Sword Metal", 3], ["山頭火", "Hilltop Fire", 1],
    ["澗下水", "Stream Water", 4], ["城頭土", "Rampart Earth", 2], ["白蠟金", "Wax Metal", 3],
    ["楊柳木", "Willow Wood", 0], ["泉中水", "Spring Water", 4], ["屋上土", "Rooftop Earth", 2],
    ["霹靂火", "Thunder Fire", 1], ["松柏木", "Pine Wood", 0], ["長流水", "River Water", 4],
    ["沙中金", "Sand Gold", 3], ["山下火", "Hillside Fire", 1], ["平地木", "Meadow Wood", 0],
    ["壁上土", "Wall Earth", 2], ["金箔金", "Foil Gold", 3], ["覆燈火", "Lamp Fire", 1],
    ["天河水", "Sky-River Water", 4], ["大驛土", "Highway Earth", 2], ["釵釧金", "Hairpin Gold", 3],
    ["桑柘木", "Mulberry Wood", 0], ["大溪水", "Valley Water", 4], ["沙中土", "Sand Earth", 2],
    ["天上火", "Sky Fire", 1], ["石榴木", "Pomegranate Wood", 0], ["大海水", "Ocean Water", 4]
  ];

  // 24 solar terms keyed by sun longitude / 15 (index 0 = 315deg Li Chun)
  // stored in Li Chun order for the CN year; helper maps longitude->entry
  var TERMS = [
    { lon: 315, cn: "立春", py: "lì chūn", en: "Spring Begins" },
    { lon: 330, cn: "雨水", py: "yǔ shuǐ", en: "Rain Water" },
    { lon: 345, cn: "驚蟄", py: "jīng zhé", en: "Insects Awaken" },
    { lon: 0, cn: "春分", py: "chūn fēn", en: "Spring Equinox" },
    { lon: 15, cn: "清明", py: "qīng míng", en: "Clear and Bright" },
    { lon: 30, cn: "穀雨", py: "gǔ yǔ", en: "Grain Rain" },
    { lon: 45, cn: "立夏", py: "lì xià", en: "Summer Begins" },
    { lon: 60, cn: "小滿", py: "xiǎo mǎn", en: "Grain Buds" },
    { lon: 75, cn: "芒種", py: "máng zhòng", en: "Grain in Ear" },
    { lon: 90, cn: "夏至", py: "xià zhì", en: "Summer Solstice" },
    { lon: 105, cn: "小暑", py: "xiǎo shǔ", en: "Minor Heat" },
    { lon: 120, cn: "大暑", py: "dà shǔ", en: "Major Heat" },
    { lon: 135, cn: "立秋", py: "lì qiū", en: "Autumn Begins" },
    { lon: 150, cn: "處暑", py: "chǔ shǔ", en: "End of Heat" },
    { lon: 165, cn: "白露", py: "bái lù", en: "White Dew" },
    { lon: 180, cn: "秋分", py: "qiū fēn", en: "Autumn Equinox" },
    { lon: 195, cn: "寒露", py: "hán lù", en: "Cold Dew" },
    { lon: 210, cn: "霜降", py: "shuāng jiàng", en: "Frost Descends" },
    { lon: 225, cn: "立冬", py: "lì dōng", en: "Winter Begins" },
    { lon: 240, cn: "小雪", py: "xiǎo xuě", en: "Minor Snow" },
    { lon: 255, cn: "大雪", py: "dà xuě", en: "Major Snow" },
    { lon: 270, cn: "冬至", py: "dōng zhì", en: "Winter Solstice" },
    { lon: 285, cn: "小寒", py: "xiǎo hán", en: "Minor Cold" },
    { lon: 300, cn: "大寒", py: "dà hán", en: "Major Cold" }
  ];
  function termByLon(lon) {
    for (var i = 0; i < TERMS.length; i++) if (TERMS[i].lon === lon) return TERMS[i];
    return null;
  }

  // Twelve Day Officers (jian chu cycle). good/avoid follow the common
  // almanac reading of each officer, kept short and practical.
  var OFFICERS = [
    { cn: "建", en: "Establish", tone: "A founding day. Energy favors starts.",
      good: ["Start a project", "Take a new role", "Sign up", "Travel"], avoid: ["Dig or demolish", "Major cleaning out"] },
    { cn: "除", en: "Clear", tone: "A clearing day. Remove what blocks you.",
      good: ["Clean and declutter", "End a bad habit", "See a doctor", "Resolve a quarrel"], avoid: ["Weddings", "Openings"] },
    { cn: "滿", en: "Full", tone: "An abundant day. Good for gathering.",
      good: ["Celebrations", "Signing deals", "Gratitude and offerings", "Stocking up"], avoid: ["Funerals", "Risky ventures"] },
    { cn: "平", en: "Balance", tone: "A level day. Keep things steady.",
      good: ["Routine work", "Repairs", "Negotiation", "Making peace"], avoid: ["Big launches", "Gambling on outcomes"] },
    { cn: "定", en: "Settle", tone: "A fixing day. Lock in what matters.",
      good: ["Sign contracts", "Engagements", "Move into a home", "Hire"], avoid: ["Lawsuits", "Long journeys"] },
    { cn: "執", en: "Hold", tone: "A gripping day. Follow through.",
      good: ["Finish tasks", "Collect debts", "Repairs", "Catch loose ends"], avoid: ["Moving house", "Opening a business"] },
    { cn: "破", en: "Break", tone: "A breaking day. Only demolition thrives.",
      good: ["Demolish", "Break bad patterns", "Deep cleaning"], avoid: ["Weddings", "Contracts", "Openings", "Travel"] },
    { cn: "危", en: "Danger", tone: "A careful day. Move slowly and check twice.",
      good: ["Quiet reflection", "Safety checks", "Rest"], avoid: ["Climbing and heights", "Risky sports", "Big decisions"] },
    { cn: "成", en: "Success", tone: "A completing day. Things want to conclude well.",
      good: ["Open a business", "Weddings", "Launches", "Enroll in study"], avoid: ["Lawsuits", "Quarrels"] },
    { cn: "收", en: "Receive", tone: "A harvesting day. Gather and store.",
      good: ["Collect payments", "Harvest results", "Buy property", "Save"], avoid: ["Funerals", "New launches"] },
    { cn: "開", en: "Open", tone: "An opening day. Doors swing easily.",
      good: ["Grand openings", "First meetings", "Start studies", "Publish"], avoid: ["Funerals", "Digging"] },
    { cn: "閉", en: "Close", tone: "A sealing day. Good for endings and privacy.",
      good: ["Close accounts", "Seal agreements", "Rest", "Store valuables"], avoid: ["Openings", "Surgery if avoidable", "Travel"] }
  ];

  /* ---------------- astronomy ---------------- */
  var RAD = Math.PI / 180;
  function mod(n, m) { return ((n % m) + m) % m; }

  function jdnFromDate(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  function dateFromJdn(J) {
    var a = J + 32044, b = Math.floor((4 * a + 3) / 146097), c = a - Math.floor(146097 * b / 4);
    var d1 = Math.floor((4 * c + 3) / 1461), e = c - Math.floor(1461 * d1 / 4), m1 = Math.floor((5 * e + 2) / 153);
    return { y: 100 * b + d1 - 4800 + Math.floor(m1 / 10), m: m1 + 3 - 12 * Math.floor(m1 / 10), d: e - Math.floor((153 * m1 + 2) / 5) + 1 };
  }
  // ΔT in seconds (Espenak/Meeus 2005-2050 polynomial; fine for browsing years)
  function deltaT(y) { var t = y - 2000; return 62.92 + 0.32217 * t + 0.005589 * t * t; }
  // JD in Terrestrial Time -> integer JDN of the civil date in UTC+8
  function jdTTtoCstJdn(jdTT, y) {
    var jdUT = jdTT - deltaT(y) / 86400;
    return Math.floor(jdUT + 8 / 24 + 0.5);
  }

  // Sun apparent longitude in degrees (Meeus low precision)
  function sunLon(jdTT) {
    var T = (jdTT - 2451545) / 36525;
    var L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    var M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * RAD)
      + (0.019993 - 0.000101 * T) * Math.sin(2 * M * RAD)
      + 0.000289 * Math.sin(3 * M * RAD);
    var Om = 125.04 - 1934.136 * T;
    return mod(L0 + C - 0.00569 - 0.00478 * Math.sin(Om * RAD), 360);
  }
  // signed distance from sun longitude to target angle, in (-180, 180]
  function lonDiff(jd, target) { return mod(sunLon(jd) - target + 180, 360) - 180; }
  // find jdTT where sun longitude = target, near jdGuess (bracket +-4d)
  function findTerm(target, jdGuess) {
    var lo = jdGuess - 4, hi = jdGuess + 4;
    // widen until sign change (sun moves ~1 deg/day so 8d window is plenty)
    while (lonDiff(lo, target) > 0) lo -= 2;
    while (lonDiff(hi, target) < 0) hi += 2;
    for (var i = 0; i < 40; i++) {
      var mid = (lo + hi) / 2;
      if (lonDiff(mid, target) < 0) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }
  // all solar terms with jdTT in [jd0, jd1]
  function termsInRange(jd0, jd1) {
    var out = [];
    // walk in ~15.2 day steps from the first multiple of 15 after jd0
    var lonStart = sunLon(jd0);
    var k = Math.ceil(lonStart / 15);
    var jd = jd0;
    while (true) {
      var target = mod(k * 15, 360);
      var guess = jd + mod(target - sunLon(jd) + 360, 360) * (365.2422 / 360);
      var t = findTerm(target, guess);
      if (t > jd1) break;
      if (t >= jd0) out.push({ jdTT: t, lon: target });
      jd = t; k++;
      if (out.length > 200) break;
    }
    return out;
  }

  // New/full moon JDE (Meeus ch. 49). phase 0 = new, 0.5 = full
  function moonPhaseJd(k, phase) {
    k = k + phase;
    var T = k / 1236.85, T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    var jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 0.000000150 * T3 + 0.00000000073 * T4;
    var E = 1 - 0.002516 * T - 0.0000074 * T2;
    var M = (2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3) * RAD;
    var Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4) * RAD;
    var F = (160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4) * RAD;
    var Om = (124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3) * RAD;
    var s = Math.sin, c;
    if (phase === 0) {
      c = -0.40720 * s(Mp) + 0.17241 * E * s(M) + 0.01608 * s(2 * Mp) + 0.01039 * s(2 * F)
        + 0.00739 * E * s(Mp - M) - 0.00514 * E * s(Mp + M) + 0.00208 * E * E * s(2 * M)
        - 0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F) + 0.00056 * E * s(2 * Mp + M)
        - 0.00042 * s(3 * Mp) + 0.00042 * E * s(M + 2 * F) + 0.00038 * E * s(M - 2 * F)
        - 0.00024 * E * s(2 * Mp - M) - 0.00017 * s(Om) - 0.00007 * s(Mp + 2 * M);
    } else {
      c = -0.40614 * s(Mp) + 0.17302 * E * s(M) + 0.01614 * s(2 * Mp) + 0.01043 * s(2 * F)
        + 0.00734 * E * s(Mp - M) - 0.00515 * E * s(Mp + M) + 0.00209 * E * E * s(2 * M)
        - 0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F) + 0.00056 * E * s(2 * Mp + M)
        - 0.00042 * s(3 * Mp) + 0.00042 * E * s(M + 2 * F) + 0.00038 * E * s(M - 2 * F)
        - 0.00024 * E * s(2 * Mp - M) - 0.00017 * s(Om) - 0.00007 * s(Mp + 2 * M);
    }
    return jde + c;
  }
  // new moons (CST civil dates as JDN) covering [jdn0, jdn1]
  function newMoonsInRange(jdn0, jdn1) {
    var yApprox = dateFromJdn(jdn0).y;
    var k = Math.floor((yApprox - 2000) * 12.3685) - 3;
    var out = [];
    while (true) {
      var jde = moonPhaseJd(k, 0);
      var cj = jdTTtoCstJdn(jde, dateFromJdn(Math.floor(jde)).y);
      if (cj > jdn1 + 40) break;
      if (cj >= jdn0 - 40) out.push({ k: k, jdn: cj, jdTT: jde });
      k++;
      if (out.length > 80) break;
    }
    return out;
  }

  /* ---------------- Chinese lunisolar calendar ---------------- */
  // builds lunar months covering the sui that contains gregorian year gy,
  // plus neighbors; cached by year
  var suiCache = {};
  function buildMonths(gy) {
    if (suiCache[gy]) return suiCache[gy];
    // winter solstices bounding: Dec (gy-1) and Dec (gy) and Dec (gy+1)
    function solsticeJdn(year) {
      var guess = jdnFromDate(year, 12, 21) + 0.5;
      var t = findTerm(270, guess);
      return jdTTtoCstJdn(t, year);
    }
    var ws = [solsticeJdn(gy - 1), solsticeJdn(gy), solsticeJdn(gy + 1)];
    var moons = newMoonsInRange(ws[0] - 40, ws[2] + 40);
    // major terms (zhongqi: multiples of 30 deg) as CST JDNs across the span
    var zq = termsInRange(ws[0] - 45, ws[2] + 45).filter(function (t) { return t.lon % 30 === 0; })
      .map(function (t) { return jdTTtoCstJdn(t.jdTT, dateFromJdn(Math.floor(t.jdTT)).y); });
    function monthIndexAt(jdn) { // index of moon starting the month containing jdn
      var idx = -1;
      for (var i = 0; i < moons.length; i++) { if (moons[i].jdn <= jdn) idx = i; else break; }
      return idx;
    }
    var months = [];
    for (var suiIdx = 0; suiIdx < 2; suiIdx++) {
      var a = monthIndexAt(ws[suiIdx]), b = monthIndexAt(ws[suiIdx + 1]);
      var count = b - a; // 12 or 13 lunations in the sui
      var leapUsed = false, num = 11, leapHere;
      for (var i = a; i < b; i++) {
        var start = moons[i].jdn, end = moons[i + 1].jdn; // [start, end)
        var hasZq = zq.some(function (z) { return z >= start && z < end; });
        leapHere = false;
        if (i > a) {
          if (count === 13 && !leapUsed && !hasZq) { leapHere = true; leapUsed = true; }
          else { num = num === 12 ? 1 : num + 1; }
        }
        months.push({ start: start, end: end, num: num, leap: leapHere, days: end - start });
      }
    }
    // de-dup overlap between suis (first sui already covered months up to ws[1])
    var seen = {}, unique = [];
    months.forEach(function (mo) { var key = mo.start; if (!seen[key]) { seen[key] = 1; unique.push(mo); } });
    unique.sort(function (x, y2) { return x.start - y2.start; });
    suiCache[gy] = unique;
    return unique;
  }
  var LUNAR_DAY = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  var LUNAR_MON = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "臘月"];
  function lunarDate(y, m, d) {
    var jdn = jdnFromDate(y, m, d);
    var months = buildMonths(y).concat(buildMonths(y + 1));
    for (var i = 0; i < months.length; i++) {
      var mo = months[i];
      if (jdn >= mo.start && jdn < mo.end) {
        return { monthNum: mo.num, leap: mo.leap, day: jdn - mo.start + 1,
          monthCn: (mo.leap ? "闰" : "") + LUNAR_MON[mo.num - 1], dayCn: LUNAR_DAY[jdn - mo.start], daysInMonth: mo.days };
      }
    }
    return null;
  }

  /* ---------------- pillars, officers, relations ---------------- */
  // same verified formula as js/bazi.js
  function dayCycleIdx(y, m, d) { return mod(jdnFromDate(y, m, d) - 2451545 + 54, 60); }
  // CN year (for the year animal) starts at Li Chun; zodiac-year helper:
  function cnYearFor(y, m, d, lichunJdn) {
    return jdnFromDate(y, m, d) >= lichunJdn ? y : y - 1;
  }
  var CLASH = function (b) { return mod(b + 6, 12); };
  var HARMONY = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 }; // liu he
  var TRINES = [[8, 0, 4], [5, 9, 1], [2, 6, 10], [11, 3, 7]];
  function sameTrine(a, b) {
    if (a === b) return false;
    return TRINES.some(function (t) { return t.indexOf(a) >= 0 && t.indexOf(b) >= 0; });
  }

  /* ---------------- year view assembly ---------------- */
  // Everything the UI needs for a gregorian year, computed once and cached.
  var yearCache = {};
  function yearData(gy) {
    if (yearCache[gy]) return yearCache[gy];
    var jd0 = jdnFromDate(gy, 1, 1) - 0.5 - 3, jd1 = jdnFromDate(gy, 12, 31) + 0.5 + 3;
    var rawTerms = termsInRange(jd0, jd1);
    var terms = {};   // key jdn -> term entry
    var jieList = []; // month-boundary terms for pillar month branch
    var lichun = null;
    rawTerms.forEach(function (t) {
      var jdn = jdTTtoCstJdn(t.jdTT, gy);
      var info = termByLon(t.lon);
      if (!info) return;
      var dt = dateFromJdn(jdn);
      if (dt.y === gy) terms[jdn] = info;
      // the 12 jie (month boundaries) have lon ≡ 315 (mod 30)
      if (mod(t.lon - 315, 30) === 0) jieList.push({ jdn: jdn, lon: t.lon });
      if (t.lon === 315 && dt.y === gy) lichun = jdn;
    });
    jieList.sort(function (a, b) { return a.jdn - b.jdn; });
    // moons for phase markers
    var nm = newMoonsInRange(jdnFromDate(gy, 1, 1), jdnFromDate(gy, 12, 31));
    var newMoonSet = {}, fullMoonSet = {};
    nm.forEach(function (x) {
      newMoonSet[x.jdn] = true;
      var fj = jdTTtoCstJdn(moonPhaseJd(x.k, 0.5), gy);
      fullMoonSet[fj] = true;
    });
    var out = { terms: terms, jieList: jieList, lichun: lichun, newMoons: newMoonSet, fullMoons: fullMoonSet };
    yearCache[gy] = out;
    return out;
  }
  function monthBranchFor(jdn, gy) {
    // walk jie boundaries (lon ≡ 315 mod 30): 315 => Tiger(2), 345 => Rabbit(3)...
    var list = yearData(gy).jieList.concat(yearData(gy + 1).jieList);
    var branch = null, lon = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].jdn <= jdn) lon = list[i].lon; else break;
    }
    if (lon == null) { // before first boundary of gy: use prior year
      var prev = yearData(gy - 1).jieList;
      lon = prev.length ? prev[prev.length - 1].lon : 285;
    }
    return mod(2 + mod(lon - 315, 360) / 30, 12);
  }

  /* ---------------- festivals ---------------- */
  function festivalsFor(y, m, d, lunar, termToday) {
    var out = [];
    if (lunar) {
      var L = (lunar.leap ? "L" : "") + lunar.monthNum + "/" + lunar.day;
      var map = {
        "1/1": ["春節", "Lunar New Year", "The year turns. Family, red envelopes, a fresh start."],
        "1/15": ["元宵節", "Lantern Festival", "First full moon of the year. Lanterns, riddles, sweet rice balls."],
        "2/2": ["龍抬頭", "Dragon Raises Its Head", "The dragon wakes. Haircuts for luck, spring begins in earnest."],
        "5/5": ["端午節", "Dragon Boat Festival", "Race the boats, hang mugwort, eat zongzi."],
        "7/7": ["七夕", "Qixi Festival", "The Weaver Girl and the Cowherd cross the bridge of magpies."],
        "7/15": ["中元節", "Hungry Ghost Festival", "The gates open. Honor ancestors, float lanterns."],
        "8/15": ["中秋節", "Mid-Autumn Festival", "The roundest moon. Mooncakes and reunion."],
        "9/9": ["重陽節", "Double Ninth", "Climb high, honor elders, chrysanthemum wine."],
        "12/8": ["臘八節", "Laba Festival", "Laba porridge and the countdown to the new year."],
        "12/23": ["小年", "Kitchen God Day", "Sweep the year out, sweeten the Kitchen God's report."]
      };
      if (map[L]) out.push({ cn: map[L][0], en: map[L][1], note: map[L][2], kind: "lunar" });
      if (lunar.monthNum === 12 && lunar.day === lunar.daysInMonth) {
        out.push({ cn: "除夕", en: "Lunar New Year's Eve", note: "Reunion dinner. Stay up to guard the year.", kind: "lunar" });
      }
    }
    if (termToday) {
      if (termToday.lon === 15) out.push({ cn: "清明節", en: "Qingming Festival", note: "Tomb-sweeping day. Remember the ancestors.", kind: "solar" });
      if (termToday.lon === 270) out.push({ cn: "冬至", en: "Dongzhi Festival", note: "Longest night. Dumplings in the north, tangyuan in the south.", kind: "solar" });
    }
    return out;
  }

  /* ---------------- day reading ---------------- */
  function dayInfo(y, m, d) {
    var Y = yearData(y);
    var jdn = jdnFromDate(y, m, d);
    var cyc = dayCycleIdx(y, m, d);
    var ds = cyc % 10, db = cyc % 12;
    var lunar = lunarDate(y, m, d);
    var term = Y.terms[jdn] || null;
    var mBr = monthBranchFor(jdn, y);
    var officer = OFFICERS[mod(db - mBr, 12)];
    var cnY = cnYearFor(y, m, d, Y.lichun || jdnFromDate(y, 2, 4));
    var yStem = mod(cnY - 4, 10), yBr = mod(cnY - 4, 12);
    var nayin = NAYIN[Math.floor(cyc / 2)];
    return {
      y: y, m: m, d: d, jdn: jdn,
      dayStem: ds, dayBranch: db, cycleIdx: cyc,
      ganzhiDay: STEMS[ds] + BRANCHES[db],
      ganzhiDayPy: STEM_PY[ds] + " " + BRANCH_PY[db],
      dayAnimal: ANIMALS[db], dayAnimalCn: ANIMAL_CN[db],
      stemEl: Math.floor(ds / 2), nayin: { cn: nayin[0], en: nayin[1], el: nayin[2] },
      lunar: lunar, term: term,
      officer: officer, officerIdx: mod(db - mBr, 12), monthBranch: mBr,
      yearStem: yStem, yearBranch: yBr,
      ganzhiYear: STEMS[yStem] + BRANCHES[yBr], yearAnimal: ANIMALS[yBr], yearAnimalCn: ANIMAL_CN[yBr],
      newMoon: !!Y.newMoons[jdn], fullMoon: !!Y.fullMoons[jdn],
      festivals: festivalsFor(y, m, d, lunar, term)
    };
  }
  function personalRelation(dayBranch, userBranch) {
    if (userBranch == null) return null;
    if (CLASH(userBranch) === dayBranch) return { key: "clash", label: "Clash day (冲)", text: "This day's animal clashes with yours. Keep plans light. Not the day to sign, launch, or move." };
    if (HARMONY[userBranch] === dayBranch) return { key: "harmony", label: "Harmony day (六合)", text: "This day's animal pairs with yours in quiet harmony. Favors partnerships, asks, and mending fences." };
    if (sameTrine(userBranch, dayBranch)) return { key: "trine", label: "Trine day (三合)", text: "This day's animal sits in your trine. Momentum comes easier. Good for pushing work forward." };
    if (userBranch === dayBranch) return { key: "own", label: "Own-sign day", text: "The day wears your animal. Strong for self-directed work, but do not overcommit." };
    return { key: "even", label: "Even day", text: "No strong pull either way between this day and your animal. Judge it by the officer and the term." };
  }

  var ENGINE = {
    dayInfo: dayInfo, lunarDate: lunarDate, yearData: yearData, dayCycleIdx: dayCycleIdx,
    monthBranch: function (y, m, d) { return monthBranchFor(jdnFromDate(y, m, d), y); },
    personalRelation: personalRelation, jdnFromDate: jdnFromDate, dateFromJdn: dateFromJdn,
    STEMS: STEMS, BRANCHES: BRANCHES, ANIMALS: ANIMALS, ANIMAL_CN: ANIMAL_CN,
    PHASES: PHASES, PHASE_CN: PHASE_CN, EL_COLOR: EL_COLOR, TERMS: TERMS, OFFICERS: OFFICERS,
    STEM_PY: STEM_PY, BRANCH_PY: BRANCH_PY
  };
  if (typeof module !== "undefined" && module.exports) { module.exports = ENGINE; return; }
  window.ZodiAlmanac = ENGINE;
})();
