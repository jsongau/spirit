/* ============================================================
   saju-engine.js ,  deterministic Saju Palja chart engine
   ------------------------------------------------------------
   Consumes birth input, returns CHART FACTS + ASSUMPTIONS + AUDIT
   TRACE. No interpretation. Implements the Korean conventions in
   docs/saju/research-v2/SAJU_CALCULATION_ASSUMPTIONS.md and the
   defaults in SAJU_RULE_CONFLICT_MATRIX.md.

   Korea-specific behavior (NOT generic BaZi):
     - True solar time correction ON by default (longitude + EoT).
     - Standard meridian selected by Korean era (127.5E / 135E).
     - Ipchun (315 deg) year boundary via exact solar-term instant.
     - Solar-term month segments (not calendar months).
     - Day rollover: midnight default; zi2300 (jo-ja-si) alternate.
     - Unknown hour to three pillars, never a fabricated hour.

   Depends on saju-astro.js. UMD (browser window.SajuEngine + Node).
   Day-pillar anchor VERIFIED: 2024-01-01 (KST civil date) = 甲子.
   Solar-term precision ~±15 min (Meeus low-precision); births near
   any boundary are flagged and offered a variant comparison.
   ============================================================ */
(function (root, factory) {
  var Astro = (typeof require !== "undefined") ? require("./saju-astro.js")
            : root.SajuAstro;
  var api = factory(Astro);
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SajuEngine = api;
})(typeof self !== "undefined" ? self : this, function (Astro) {
  "use strict";

  var ENGINE_VERSION = "saju-engine/1.0.0";

  // ---- reference tables -------------------------------------------------
  var STEMS = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
  var STEM_KO = ["갑","을","병","정","무","기","경","신","임","계"];
  var STEM_ROM = ["Gap","Eul","Byeong","Jeong","Mu","Gi","Gyeong","Sin","Im","Gye"];
  var STEM_EL  = ["Wood","Wood","Fire","Fire","Earth","Earth","Metal","Metal","Water","Water"];
  var STEM_YIN = [false,true,false,true,false,true,false,true,false,true]; // true = yin

  var BRANCHES = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
  var BRANCH_KO = ["자","축","인","묘","진","사","오","미","신","유","술","해"];
  var BRANCH_ROM= ["Ja","Chuk","In","Myo","Jin","Sa","O","Mi","Sin","Yu","Sul","Hae"];
  var BRANCH_EL = ["Water","Earth","Wood","Wood","Earth","Fire","Fire","Earth","Metal","Metal","Earth","Water"];
  var BRANCH_ANIMAL = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var BRANCH_YIN = [false,true,false,true,false,true,false,true,false,true,false,true];

  // hidden stems (지장간) by branch, ordered [residual, middle, main]; stem indices
  var HIDDEN = {
    0:[9],            // 子: 癸
    1:[9,7,5],        // 丑: 癸 辛 己
    2:[4,2,0],        // 寅: 戊 丙 甲
    3:[0,1],          // 卯: 甲 乙 (residual 甲, main 乙)
    4:[1,9,4],        // 辰: 乙 癸 戊
    5:[4,6,2],        // 巳: 戊 庚 丙
    6:[2,5,3],        // 午: 丙 己 丁
    7:[3,1,5],        // 未: 丁 乙 己
    8:[4,8,6],        // 申: 戊 壬 庚
    9:[6,7],          // 酉: 庚 辛 (residual 庚, main 辛)
    10:[7,3,4],       // 戌: 辛 丁 戊
    11:[4,0,8]        // 亥: 戊 甲 壬
  };

  function mod(n, m) { return ((n % m) + m) % m; }

  // integer Julian Day Number for a Gregorian civil date (Fliegel-Van Flandern)
  function jdnCivil(y, m, d) {
    var a = Math.floor((14 - m) / 12);
    var yy = y + 4800 - a;
    var mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy
             + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  var ANCHOR_JDN = jdnCivil(2024, 1, 1); // = 甲子 (index 0), verified

  // ---- Korean standard meridian by era (SAJU_CALCULATION_ASSUMPTIONS §2.3) ----
  // returns { meridian:Number|null, offsetHours:Number, label, era, lowPrecision:bool }
  function eraStandard(y, m, d) {
    var t = Date.UTC(y, m - 1, d);
    if (t < Date.UTC(1908, 3, 1)) return { meridian: null, offsetHours: null, label: "local mean time", era: "pre-standardization (before 1908-04-01)", lowPrecision: true };
    if (t < Date.UTC(1912, 0, 1)) return { meridian: 127.5, offsetHours: 8.5, label: "GMT+8:30", era: "Korean Empire (1908–1911)" };
    if (t < Date.UTC(1954, 2, 21)) return { meridian: 135, offsetHours: 9, label: "GMT+9", era: "Japanese-imposed standard (1912–1954)" };
    if (t < Date.UTC(1961, 7, 10)) return { meridian: 127.5, offsetHours: 8.5, label: "GMT+8:30", era: "Republic of Korea (1954–1961)" };
    return { meridian: 135, offsetHours: 9, label: "GMT+9", era: "current KST (1961– )" };
  }

  // conservative DST: auto-apply only the well-documented 1987/1988 windows;
  // flag other historical DST years rather than applying a guessed range.
  function dstInfo(y, m, d) {
    var t = Date.UTC(y, m - 1, d);
    if (y === 1987 && t >= Date.UTC(1987, 4, 10) && t < Date.UTC(1987, 9, 11)) return { offset: 60, applied: true };
    if (y === 1988 && t >= Date.UTC(1988, 4, 8)  && t < Date.UTC(1988, 9, 9))  return { offset: 60, applied: true };
    var flagYears = [1948, 1949, 1950, 1951, 1955, 1956, 1957, 1958, 1959, 1960];
    if (flagYears.indexOf(y) >= 0 && m >= 5 && m <= 9) return { offset: 0, applied: false, uncertain: true };
    return { offset: 0, applied: false };
  }

  function stemObj(i) { return { char: STEMS[i], ko: STEM_KO[i], rom: STEM_ROM[i], element: STEM_EL[i], yin: STEM_YIN[i], index: i }; }
  function branchObj(i) { return { char: BRANCHES[i], ko: BRANCH_KO[i], rom: BRANCH_ROM[i], element: BRANCH_EL[i], animal: BRANCH_ANIMAL[i], yin: BRANCH_YIN[i], index: i,
      hidden_stems: (HIDDEN[i] || []).map(function (h) { return { char: STEMS[h], element: STEM_EL[h], index: h }; }) }; }

  // Ten Gods (십신) of a target stem relative to the Day Master
  function tenGod(dayIdx, otherIdx) {
    var de = STEM_EL[dayIdx], oe = STEM_EL[otherIdx];
    var order = ["Wood","Fire","Earth","Metal","Water"];
    var di = order.indexOf(de), oi = order.indexOf(oe);
    var rel = mod(oi - di, 5); // 0 same,1 I generate,2 I control,4 generates me,3 controls me
    var samePol = (STEM_YIN[dayIdx] === STEM_YIN[otherIdx]);
    switch (rel) {
      case 0: return samePol ? "Companion (비견 Bigyeon)" : "Rob Wealth (겁재 Geopjae)";
      case 1: return samePol ? "Eating God (식신 Siksin)" : "Hurting Officer (상관 Sanggwan)";
      case 2: return samePol ? "Indirect Wealth (편재 Pyeonjae)" : "Direct Wealth (정재 Jeongjae)";
      case 3: return samePol ? "Seven Killings (편관 Pyeongwan)" : "Direct Officer (정관 Jeonggwan)";
      case 4: return samePol ? "Indirect Resource (편인 Pyeonin)" : "Direct Resource (정인 Jeongin)";
    }
  }

  // The 12 "jie" (節) that start each Saju month, by ecliptic longitude.
  var TERMS = {
    315: ["입춘", "立春", "Ipchun", "Start of Spring"],
    345: ["경칩", "驚蟄", "Gyeongchip", "Awakening of Insects"],
    15:  ["청명", "淸明", "Cheongmyeong", "Pure Brightness"],
    45:  ["입하", "立夏", "Ipha", "Start of Summer"],
    75:  ["망종", "芒種", "Mangjong", "Grain in Ear"],
    105: ["소서", "小暑", "Soseo", "Minor Heat"],
    135: ["입추", "立秋", "Ipchu", "Start of Autumn"],
    165: ["백로", "白露", "Baengno", "White Dew"],
    195: ["한로", "寒露", "Hallo", "Cold Dew"],
    225: ["입동", "立冬", "Ipdong", "Start of Winter"],
    255: ["대설", "大雪", "Daeseol", "Major Snow"],
    285: ["소한", "小寒", "Sohan", "Minor Cold"]
  };

  // JD (UTC) of the term at termLon whose crossing is nearest seedJD (checks ±1 year).
  function termInstantNear(termLon, seedJD, seedYear) {
    var best = null, bestGap = Infinity;
    [seedYear - 1, seedYear, seedYear + 1].forEach(function (yy) {
      var jd = Astro.solarTermJD(yy, termLon);
      var g = Math.abs(jd - seedJD);
      if (g < bestGap) { bestGap = g; best = jd; }
    });
    return best;
  }

  function termLabel(lon) { var t = TERMS[lon]; return t ? (t[0] + " " + t[1] + " " + t[2]) : ("term " + lon + "°"); }

  // shallow diff of two pillar sets to array of changed keys
  function pillarDiff(a, b) {
    var out = [];
    ["year", "month", "day", "hour"].forEach(function (k) {
      var pa = a[k], pb = b[k];
      var sa = pa ? pa.stem.char + pa.branch.char : null;
      var sb = pb ? pb.stem.char + pb.branch.char : null;
      if (sa !== sb) out.push(k);
    });
    return out;
  }

  // ---- Wu Xing / 오행 relationships (single source of truth for the diagram) ----
  var WUXING = {
    order: ["Wood", "Fire", "Earth", "Metal", "Water"],
    ko:  { Wood: "목", Fire: "화", Earth: "토", Metal: "금", Water: "수" },
    han: { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" },
    // 상생 (相生) generating cycle
    generates: { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" },
    // 상극 (相剋) controlling cycle
    controls:  { Wood: "Earth", Fire: "Metal", Earth: "Water", Metal: "Wood", Water: "Fire" }
  };
  function generatedByOf(el) { for (var k in WUXING.generates) if (WUXING.generates[k] === el) return k; }
  function controlledByOf(el) { for (var k in WUXING.controls) if (WUXING.controls[k] === el) return k; }
  function elementRelations(el) {
    return { same: el, generates: WUXING.generates[el], generatedBy: generatedByOf(el),
             controls: WUXING.controls[el], controlledBy: controlledByOf(el) };
  }
  // Ten God category of otherEl seen from the Day Master element
  function tenGodByElement(dmEl, otherEl) {
    if (otherEl === dmEl) return { en: "Companion", ko: "비겁", han: "比劫" };
    if (WUXING.generates[otherEl] === dmEl) return { en: "Resource", ko: "인성", han: "印星" };
    if (WUXING.generates[dmEl] === otherEl) return { en: "Output", ko: "식상", han: "食傷" };
    if (WUXING.controls[dmEl] === otherEl) return { en: "Wealth", ko: "재성", han: "財星" };
    if (WUXING.controls[otherEl] === dmEl) return { en: "Officer", ko: "관성", han: "官星" };
  }

  // ---- Day Master strength (신강/신약) + 용신 via 억부 (one documented method) ----
  // Weighted model per practitioner doctrine: month branch (seasonal command) is heaviest.
  // NOT icon-counting. Reasoning is returned; the verdict is a lens, never advice.
  function branchMainEl(branch) { var hs = branch && branch.hidden_stems; return (hs && hs.length) ? hs[hs.length - 1].element : (branch ? branch.element : null); }
  function isSupport(tg) { return tg && (tg.ko === "비겁" || tg.ko === "인성"); }
  function assessStrength(pillars, dmEl) {
    var POS = [];
    function add(el, w, name) { if (el) POS.push({ el: el, w: w, name: name }); }
    add(pillars.month && branchMainEl(pillars.month.branch), 30, "month branch (월령)");
    add(pillars.day && branchMainEl(pillars.day.branch), 20, "day branch (일지)");
    add(pillars.hour && pillars.hour.branch ? branchMainEl(pillars.hour.branch) : null, 10, "hour branch");
    add(pillars.year && branchMainEl(pillars.year.branch), 8, "year branch");
    add(pillars.month && pillars.month.stem.element, 12, "month stem");
    add(pillars.hour && pillars.hour.stem ? pillars.hour.stem.element : null, 10, "hour stem");
    add(pillars.year && pillars.year.stem.element, 10, "year stem");
    var supW = 0, total = 0;
    POS.forEach(function (p) { var tg = tenGodByElement(dmEl, p.el); p.support = isSupport(tg); total += p.w; if (p.support) supW += p.w; });
    var index = total ? Math.round(supW / total * 100) : 50;
    var verdict, extreme = false;
    if (index < 20) { verdict = { ko: "극신약", han: "極身弱", en: "very weak" }; extreme = true; }
    else if (index < 40) { verdict = { ko: "신약", han: "身弱", en: "weak" }; }
    else if (index <= 60) { verdict = { ko: "중화", han: "中和", en: "balanced" }; }
    else if (index <= 80) { verdict = { ko: "신강", han: "身强", en: "strong" }; }
    else { verdict = { ko: "극신강", han: "極身强", en: "very strong" }; extreme = true; }

    var W = WUXING;
    var resourceEl = generatedByOf(dmEl), companionEl = dmEl, outputEl = W.generates[dmEl], wealthEl = W.controls[dmEl], officerEl = controlledByOf(dmEl);
    var leansWeak = index < 50, favorable, unfavorable, direction, primary;
    if (leansWeak) { favorable = [resourceEl, companionEl]; unfavorable = [outputEl, wealthEl, officerEl]; direction = "support"; primary = resourceEl; }
    else { favorable = [outputEl, wealthEl, officerEl]; unfavorable = [resourceEl, companionEl]; direction = "drain"; primary = outputEl; }

    var monthEl = pillars.month ? branchMainEl(pillars.month.branch) : null;
    var dayEl = pillars.day ? branchMainEl(pillars.day.branch) : null;
    var deukryeong = monthEl ? isSupport(tenGodByElement(dmEl, monthEl)) : false;
    var deukji = dayEl ? isSupport(tenGodByElement(dmEl, dayEl)) : false;
    var deukse = supW >= total * 0.5;
    function hanOf(e) { return e ? (W.ko[e] + " " + W.han[e]) : ", "; }
    var reasoning = [
      "Seasonal command (월령 · 득령): the month branch is " + hanOf(monthEl) + ", which " + (deukryeong ? "supports" : "drains") + " your " + hanOf(dmEl) + " Day Master, " + (deukryeong ? "born in season" : "born out of season") + ".",
      "Its seat (일지 · 득지): the day branch is " + hanOf(dayEl) + ", " + (deukji ? "a root for the Day Master" : "not a root for the Day Master") + ".",
      "Allies vs drainers (득세): supporting weight " + supW + " against " + (total - supW) + " weakening, out of " + total + ", " + (deukse ? "allied" : "outnumbered") + "."
    ];
    return {
      method: "억부 (抑扶), strength balancing",
      method_note: "One of several traditional methods (also 조후 climate, 통관 mediation, 병약); readers weight the factors differently.",
      index: index, support_weight: supW, weakening_weight: total - supW, total_weight: total,
      verdict: verdict, extreme: extreme,
      deukryeong: deukryeong, deukji: deukji, deukse: deukse,
      favorable: { primary: primary, primaryTenGod: tenGodByElement(dmEl, primary), group: favorable, direction: direction },
      unfavorable: unfavorable,
      reasoning: reasoning,
      confidence: extreme ? "low" : "medium",
      caveat: "Strong is not “good” and weak is not “bad”; the aim is balance (중화 中和). This is one method’s lens for reflection, not a prediction or a prescription, it does not tell you what to wear, do, or decide." + (extreme ? " This chart is extreme, where 억부 may not apply (a 종격 follow-pattern); read with extra caution." : "")
    };
  }

  // ---- 조후 (調候) climate layer: temperature (한난) + humidity (조습) ----
  // Codeable simplification of 궁통보감 climate logic. Practitioner doctrine, labeled as such.
  var HEAT  = { "子": -3, "亥": -2, "丑": -2, "寅": -1, "卯": 0, "辰": 0, "巳": 2, "午": 3, "未": 2, "申": -1, "酉": 0, "戌": 1 };
  var MOIST = { "亥": 2, "子": 2, "丑": 2, "辰": 2, "午": -2, "巳": -1, "未": -2, "戌": -2, "寅": 0, "卯": 0, "申": 0, "酉": 0 };
  var SEASON = { "寅": "spring", "卯": "spring", "辰": "spring", "巳": "summer", "午": "summer", "未": "summer", "申": "autumn", "酉": "autumn", "戌": "autumn", "亥": "winter", "子": "winter", "丑": "winter" };
  function assessClimate(pillars, balance, dmEl) {
    var mb = pillars.month.branch.char, W = WUXING;
    var fire = balance.Fire || 0, water = balance.Water || 0;
    var heat = (HEAT[mb] || 0) + (fire - water);
    var branches = ["year", "month", "day", "hour"].filter(function (k) { return pillars[k]; }).map(function (k) { return pillars[k].branch.char; });
    var dampE = branches.filter(function (c) { return c === "辰" || c === "丑"; }).length;
    var dryE = branches.filter(function (c) { return c === "未" || c === "戌"; }).length;
    var moisture = (MOIST[mb] || 0) + (water - fire) + (dampE - dryE);
    var temp = heat <= -2 ? { ko: "한", han: "寒", en: "cold" } : heat >= 2 ? { ko: "난", han: "暖", en: "hot" } : { ko: "온화", han: "溫和", en: "temperate" };
    var damp = moisture >= 2 ? { ko: "습", han: "濕", en: "damp" } : moisture <= -2 ? { ko: "조", han: "燥", en: "dry" } : { ko: "중", han: "中", en: "balanced" };
    var primary = null, primaryStem = null, need = "a balanced climate";
    if (temp.en === "cold") { primary = "Fire"; primaryStem = "丙"; need = "warmth"; }
    else if (temp.en === "hot") { primary = "Water"; primaryStem = "壬"; need = "cooling"; }
    else if (damp.en === "damp") { primary = "Fire"; primaryStem = "丙"; need = "drying warmth"; }
    else if (damp.en === "dry") { primary = "Water"; primaryStem = "癸"; need = "moisture"; }
    var extreme = Math.abs(heat) >= 3 || Math.abs(moisture) >= 3;
    function hanOf(e) { return e ? (W.ko[e] + " " + W.han[e]) : ", "; }
    var reasoning = [
      "Season (월지 · 月支): born in the " + mb + " month, " + SEASON[mb] + ", a " + temp.en + " time (heat " + heat + ").",
      "Humidity (조습 · 燥濕): the chart reads " + damp.en + " (moisture " + moisture + ").",
      primary ? ("Climate lean (조후): a " + temp.en + (damp.en !== "balanced" ? ", " + damp.en : "") + " chart is said to want " + hanOf(primary) + " (" + need + "), classically " + primaryStem + ".")
              : "Climate lean (조후): temperate and balanced, no strong climate pull; the 억부 read stands."
    ];
    return {
      method: "조후 (調候), climate balancing", method_note: "A codeable simplification of the 궁통보감 climate tradition; practitioner doctrine, not a formula.",
      heat: heat, moisture: moisture, temp: temp, damp: damp,
      season: { branch: mb, name: SEASON[mb] }, primary: primary, primaryStem: primaryStem, need: need, extreme: extreme,
      reasoning: reasoning, confidence: extreme ? "medium" : "low",
      caveat: "조후 describes the chart’s temperature and humidity tendency, not a life instruction, it does not tell you where to live, what to wear, or what work to take. A symbolic temperament lens."
    };
  }
  // reconcile 억부 (strength) vs 조후 (climate) useful-element reads
  function combineYongsin(strength, climate) {
    var eokbu = (strength && strength.favorable) ? strength.favorable.primary : null;
    var johu = climate ? climate.primary : null;
    if (!johu) return { mode: "eokbu-only", eokbu: eokbu, johu: null, agree: null, lead: "억부", leadElement: eokbu, note: "Climate is temperate; the 억부 strength read stands on its own." };
    if (eokbu === johu) return { mode: "agree", eokbu: eokbu, johu: johu, agree: true, lead: "both", leadElement: eokbu, note: "Both methods point to the same element, a reinforced signal." };
    return {
      mode: "tension", eokbu: eokbu, johu: johu, agree: false,
      lead: climate.extreme ? "조후" : ", ", leadElement: climate.extreme ? johu : eokbu,
      note: climate.extreme
        ? "The two lenses diverge. In this climatic extreme, 조후 (climate) traditionally takes precedence, so it leads here."
        : "The two lenses diverge. Neither strictly overrides the other, hold both as perspectives."
    };
  }

  // ---- Daeun (대운) luck pillars ----
  function ganzhiIndex(s, b) { for (var i = 0; i < 60; i++) if (i % 10 === s && i % 12 === b) return i; return 0; }
  // step the month pillar forward/back through the 60-cycle; overlay favorable/challenging (non-fatalistic)
  function luckPillars(mStemIdx, mBranchIdx, dmEl, forward, daesu, favSet, unfavSet, ageNow, count) {
    var mi = ganzhiIndex(mStemIdx, mBranchIdx), out = [];
    for (var i = 1; i <= count; i++) {
      var idx = mod(mi + (forward ? i : -i), 60), s = idx % 10, b = idx % 12;
      var start = daesu + (i - 1) * 10, end = start + 10;
      var sEl = STEM_EL[s], bEl = BRANCH_EL[b];
      var fav = favSet.indexOf(sEl) >= 0 || favSet.indexOf(bEl) >= 0;
      var unf = unfavSet.indexOf(sEl) >= 0 || unfavSet.indexOf(bEl) >= 0;
      var tone = (fav && !unf) ? "supportive" : (unf && !fav) ? "challenging" : "mixed";
      out.push({
        index: i, stem: stemObj(s), branch: branchObj(b),
        age_start: start, age_end: end,
        ten_god: tenGodByElement(dmEl, sEl), tone: tone,
        current: (ageNow != null && ageNow >= start && ageNow < end)
      });
    }
    return out;
  }

  // ---------------------------------------------------------------------
  //  main entry
  // ---------------------------------------------------------------------
  function castChart(input, profile, opts) {
    input = input || {};
    opts = opts || {};
    profile = Object.assign({
      dayBoundary: "midnight",      // "midnight" | "zi2300"
      trueSolarTime: true,
      equationOfTime: true,
      meridianMode: "era"           // "era" | "fixed135"
    }, profile || {});

    var trace = [], warnings = [], variantSpecs = [];
    function log(step, detail) { trace.push({ step: step, detail: detail }); }

    // ---- parse date/time ----
    if (!input.date) return { error: "birth date required" };
    var dp = input.date.split("-").map(Number);
    var Y = dp[0], Mo = dp[1], D = dp[2];
    var unknownTime = !!input.unknownTime || !input.time;
    var clockMin = null;
    if (!unknownTime) {
      var tp = input.time.split(":").map(Number);
      clockMin = tp[0] * 60 + tp[1];
    }
    log("input", { date: input.date, time: unknownTime ? null : input.time, lon: input.lon != null ? input.lon : null, calendar: input.calendar || "solar" });

    if (input.calendar === "lunar" || input.calendar === "lunar-leap") {
      warnings.push({ code: "LUNAR_NOT_CONVERTED", level: "block",
        message: "Lunar input needs conversion to a solar date before casting. This engine build does not convert lunar dates; enter the solar (양력) date." });
      log("calendar", "lunar conversion not implemented, flagged");
    }

    // ---- era standard time + DST ----
    var era = profile.meridianMode === "fixed135"
      ? { meridian: 135, offsetHours: 9, label: "GMT+9 (forced)", era: "fixed 135°E (profile override)" }
      : eraStandard(Y, Mo, D);
    var dst = dstInfo(Y, Mo, D);
    log("era", { era: era.era, standard: era.label, meridian: era.meridian, dstApplied: dst.applied });
    if (era.lowPrecision) warnings.push({ code: "PRE_STANDARD_TIME", level: "warn", message: "Born before Korea adopted a standard time (1908). Clock time treated as local mean time; reduced precision." });
    if (dst.uncertain) warnings.push({ code: "DST_UNCERTAIN", level: "warn", message: "Born in a year South Korea observed summer time. Verify whether daylight saving was in effect; it is not auto-applied here." });
    if (dst.applied) warnings.push({ code: "DST_APPLIED", level: "note", message: "Daylight saving time (+60 min) was in effect and has been removed before correction." });

    // ---- UT instant of birth (for sun longitude / solar terms) ----
    var offH = (era.offsetHours != null ? era.offsetHours : 9); // pre-1908 fallback for astronomy only
    var utFracDay, birthJD_UT, sunLong = null;
    if (!unknownTime) {
      var effMinForUT = clockMin - dst.offset;                 // remove DST to get standard clock
      utFracDay = (effMinForUT - offH * 60) / 1440;            // standard clock to UT
      birthJD_UT = Astro.julianDayUTC(Y, Mo, D, 0) + utFracDay;
    } else {
      // no time: use local noon as a stable instant for year/month assignment
      birthJD_UT = Astro.julianDayUTC(Y, Mo, D, 0) + (12 - offH) / 24;
    }
    sunLong = Astro.sunApparentLongitude(birthJD_UT);
    log("sun", { jd_ut: round(birthJD_UT, 6), apparent_longitude_deg: round(sunLong, 4) });

    // ---- YEAR pillar (Ipchun boundary) ----
    var ipchunThis = Astro.solarTermJD(Y, 315);
    var yearForPillar;
    if (birthJD_UT < ipchunThis) yearForPillar = Y - 1; else yearForPillar = Y;
    if (opts.yearForPillarOverride != null) { yearForPillar = opts.yearForPillarOverride; log("year_override", yearForPillar); }
    var yStemIdx = mod(yearForPillar - 4, 10), yBranchIdx = mod(yearForPillar - 4, 12);
    // nearest Ipchun (for the dateline + offset), may be prior or this year's
    var ipchunNear = termInstantNear(315, birthJD_UT, Y);
    var ipchunNearKST = Astro.jdToUTC(ipchunNear + offH / 24);
    var ipchunOffsetMin = Math.round((birthJD_UT - ipchunNear) * 1440);
    log("year", { solar_year: yearForPillar, ipchun_boundary_kst: fmtDT(ipchunNearKST), offset_min: ipchunOffsetMin, stem: STEMS[yStemIdx], branch: BRANCHES[yBranchIdx] });
    // Ipchun proximity warning (±1 day)
    if (Math.abs(birthJD_UT - ipchunNear) < 1.0 && !opts._noVariants) {
      warnings.push({ code: "NEAR_IPCHUN", level: "warn",
        message: "Born within a day of Ipchun (입춘). The YEAR pillar can fall on either side depending on the exact solar-term minute (precision ~±15 min). Compare both charts below." });
      var otherYear = (yearForPillar === Y) ? Y - 1 : Y;
      variantSpecs.push({ code: "NEAR_IPCHUN", label: (otherYear < yearForPillar ? "If before Ipchun" : "If after Ipchun") + " (" + otherYear + " year)", note: "The solar-term minute decides the year pillar; both are shown because we can't be sure to the minute.", opts: { yearForPillarOverride: otherYear } });
    }

    // ---- MONTH pillar (solar-term segment from sun longitude) ----
    var seg = Math.floor(mod(sunLong - 315, 360) / 30);       // 0 => 寅
    if (opts.monthSegOverride != null) { seg = mod(opts.monthSegOverride, 12); log("month_override", seg); }
    var mBranchIdx = mod(2 + seg, 12);
    var mStemIdx = mod((yStemIdx % 5) * 2 + 2 + mod(mBranchIdx - 2, 12), 10); // 五虎遁
    // the jie that opened this month segment + when the sun crossed it
    var monthStartLon = mod(315 + seg * 30, 360);
    var monthTermNear = termInstantNear(monthStartLon, birthJD_UT, Y);
    var monthTermKST = Astro.jdToUTC(monthTermNear + offH / 24);
    var monthOffsetMin = Math.round((birthJD_UT - monthTermNear) * 1440);
    log("month", { sun_segment: seg, opened_at: termLabel(monthStartLon), boundary_kst: fmtDT(monthTermKST), offset_min: monthOffsetMin, stem: STEMS[mStemIdx], branch: BRANCHES[mBranchIdx] });
    // month-boundary proximity (~2.4h of solar motion)
    var nearestJieGap = 999, nearestJieLon = null;
    Astro.JIE_LONS.forEach(function (L) { var g = Math.abs(Astro.norm180(sunLong - L)); if (g < nearestJieGap) { nearestJieGap = g; nearestJieLon = L; } });
    if (nearestJieGap < 0.1 && !opts._noVariants) {
      warnings.push({ code: "NEAR_MONTH_TERM", level: "warn", message: "Born close to a monthly solar-term boundary; the MONTH pillar is sensitive to the exact term minute (~±15 min). Compare the adjacent-month variant below." });
      var fracSeg = mod(sunLong - 315, 360) / 30 - Math.floor(mod(sunLong - 315, 360) / 30);
      var altSeg = fracSeg < 0.5 ? seg - 1 : seg + 1;
      variantSpecs.push({ code: "NEAR_MONTH_TERM", label: "Adjacent month", note: "Born near a solar-term edge; the neighbouring month pillar is the alternative.", opts: { monthSegOverride: altSeg } });
    }

    // ---- DAY pillar (with rollover rule) ----
    var dayShift = 0, ziNote = null;
    if (!unknownTime && clockMin >= 23 * 60) {
      if (profile.dayBoundary === "zi2300") { dayShift = 1; ziNote = "zi2300 (조자시/子正): 23:00+ takes the NEXT day's Ilju"; }
      else { ziNote = "midnight: 23:00–24:00 keeps this day's Ilju (야자시). Alternate rule would change it."; }
      warnings.push({ code: "ZI_HOUR_ROLLOVER", level: "warn",
        message: "Born in the 23:00 hour, the 야자시/조자시 dispute. Default keeps this calendar day's Day Master; the zi2300 profile assigns the next day's. This changes the Day Master itself." });
      if (!opts._noVariants) {
        var flipDay = profile.dayBoundary === "zi2300" ? "midnight" : "zi2300";
        variantSpecs.push({ code: "ZI_HOUR_ROLLOVER",
          label: flipDay === "zi2300" ? "Next day's Ilju (조자시)" : "This day's Ilju (야자시)",
          note: "Korean schools disagree whether a 23:00–24:00 birth takes this day's or the next day's Day Master.",
          profilePatch: { dayBoundary: flipDay } });
      }
    }
    var dayIndex = mod(jdnCivil(Y, Mo, D) + dayShift - ANCHOR_JDN, 60);
    var dStemIdx = mod(dayIndex, 10), dBranchIdx = mod(dayIndex, 12);
    log("day", { anchor: "2024-01-01 = 甲子", rollover: profile.dayBoundary, shift: dayShift, note: ziNote, stem: STEMS[dStemIdx], branch: BRANCHES[dBranchIdx] });

    // ---- HOUR pillar (true solar time) ----
    var hourPillar = null, solar = null;
    if (!unknownTime) {
      var lonCorr = 0, eot = 0, applied = false;
      if (profile.trueSolarTime && input.lon != null && era.meridian != null) {
        lonCorr = (input.lon - era.meridian) * 4;             // minutes
        applied = true;
      }
      if (profile.equationOfTime && applied) {
        eot = Astro.equationOfTimeMinutes(birthJD_UT);
      }
      var trueSolarMin = clockMin - dst.offset + lonCorr + eot;
      var hBranchIdx = Math.floor(mod(trueSolarMin + 60, 1440) / 120);
      if (opts.hourBranchOverride != null) { hBranchIdx = mod(opts.hourBranchOverride, 12); log("hour_override", hBranchIdx); }
      var hStemIdx = mod(dStemIdx * 2 + hBranchIdx, 10);
      hourPillar = { stem: stemObj(hStemIdx), branch: branchObj(hBranchIdx) };
      solar = {
        applied: applied,
        longitude_correction_min: round(lonCorr, 1),
        equation_of_time_min: round(eot, 1),
        dst_removed_min: dst.offset,
        clock: fmtHM(clockMin),
        true_solar: fmtHM(mod(trueSolarMin, 1440))
      };
      log("hour", { true_solar: solar.true_solar, correction_min: round(lonCorr + eot, 1), stem: STEMS[hStemIdx], branch: BRANCHES[hBranchIdx] });
      // hour-branch edge (±20 min of a 2-hour boundary)
      var posInBranch = mod(trueSolarMin + 60, 120);
      if (Math.min(posInBranch, 120 - posInBranch) < 20 && !opts._noVariants) {
        warnings.push({ code: "NEAR_HOUR_EDGE", level: "warn", message: "True solar time sits within 20 minutes of an hour-branch boundary; confirm the recorded minute. The adjacent hour is shown as a variant." });
        var altBranch = posInBranch < 60 ? hBranchIdx - 1 : hBranchIdx + 1;
        variantSpecs.push({ code: "NEAR_HOUR_EDGE", label: "Adjacent hour", note: "Born within 20 minutes of an hour-branch edge; the neighbouring hour pillar is the alternative.", opts: { hourBranchOverride: altBranch } });
      }
      if (profile.trueSolarTime && input.lon == null) {
        warnings.push({ code: "NO_LONGITUDE", level: "warn", message: "Birthplace/longitude unknown, true solar time correction skipped. Hour pillar uses clock time and is lower confidence." });
      }
    } else {
      warnings.push({ code: "NO_HOUR", level: "note", message: "No birth time, three-pillar chart. The hour pillar is intentionally omitted rather than invented." });
    }

    // ---- assemble pillars ----
    var pillars = {
      year:  { label: "Year (년주 Nyeonju)",  stem: stemObj(yStemIdx), branch: branchObj(yBranchIdx) },
      month: { label: "Month (월주 Wolju)",   stem: stemObj(mStemIdx), branch: branchObj(mBranchIdx) },
      day:   { label: "Day (일주 Ilju)",      stem: stemObj(dStemIdx), branch: branchObj(dBranchIdx), is_day_master: true }
    };
    if (hourPillar) pillars.hour = { label: "Hour (시주 Siju)", stem: hourPillar.stem, branch: hourPillar.branch };

    // ---- day master + ten gods across visible stems ----
    var dm = stemObj(dStemIdx);
    var order = ["year", "month", "day", "hour"];
    var tenGods = [];
    order.forEach(function (k) {
      if (!pillars[k]) return;
      var si = pillars[k].stem.index;
      tenGods.push({ pillar: k, stem: STEMS[si], ten_god: (k === "day") ? "Day Master (일간)" : tenGod(dStemIdx, si) });
    });

    // ---- element balance (visible stems + branch main elements) ----
    var balance = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
    order.forEach(function (k) {
      if (!pillars[k]) return;
      balance[pillars[k].stem.element] += 1;
      balance[pillars[k].branch.element] += 1;
    });

    // ---- interpretation-preview layers: strength (억부) + climate (조후) + cross-check ----
    var strengthObj = assessStrength(pillars, dm.element);
    var climateObj = assessClimate(pillars, balance, dm.element);
    var yongsinObj = combineYongsin(strengthObj, climateObj);

    // ---- Daeun (대운), computed only when a direction basis (sex) is given ----
    var daeunObj = null, daeunBoth = null;
    if (!opts._noVariants && (input.sex === "male" || input.sex === "female" || input.sex === "both")) {
      var yStemYang = !STEM_YIN[yStemIdx];
      var nextJieLon = mod(monthStartLon + 30, 360);
      var nextJieJD = termInstantNear(nextJieLon, birthJD_UT, Y);
      var daysToNext = nextJieJD - birthJD_UT;
      var daysFromPrev = birthJD_UT - monthTermNear;
      var favSet = (strengthObj.favorable.group || []).slice();
      if (yongsinObj.leadElement && favSet.indexOf(yongsinObj.leadElement) < 0) favSet.push(yongsinObj.leadElement);
      var unfavSet = strengthObj.unfavorable || [];
      var today = new Date();
      var ageNow = today.getFullYear() - Y - (((today.getMonth() + 1) < Mo || ((today.getMonth() + 1) === Mo && today.getDate() < D)) ? 1 : 0);
      if (ageNow < 0) ageNow = null;
      var cy = today.getFullYear(), syS = mod(cy - 4, 10), syB = mod(cy - 4, 12);
      var sewoon = { year: cy, stem: stemObj(syS), branch: branchObj(syB), ten_god: tenGodByElement(dm.element, STEM_EL[syS]) };
      var resolveDaeun = function (sex) {
        var isMale = sex === "male", forward = (yStemYang === isMale);
        var days = forward ? daysToNext : daysFromPrev;
        var daesu = Math.max(0, Math.round(days / 3));
        return {
          sex: sex, isMale: isMale, forward: forward,
          direction: forward ? "순행 (順行) forward" : "역행 (逆行) reverse",
          daesu: daesu, start_days: Math.round(days * 10) / 10,
          start_precise: { years: Math.floor(days / 3), months: Math.round((days / 3 - Math.floor(days / 3)) * 12) },
          periods: luckPillars(mStemIdx, mBranchIdx, dm.element, forward, daesu, favSet, unfavSet, ageNow, 8),
          current_age: ageNow, sewoon: sewoon
        };
      };
      if (input.sex === "both") daeunBoth = { male: resolveDaeun("male"), female: resolveDaeun("female") };
      else daeunObj = resolveDaeun(input.sex);
    }

    // ---- boundaries: exact solar-term instants + signed offset from birth ----
    var boundaries = {
      ipchun: { name: termLabel(315), longitude: 315, instant_kst: fmtDT(ipchunNearKST), offset_min: ipchunOffsetMin },
      month_start: { name: termLabel(monthStartLon), longitude: monthStartLon, instant_kst: fmtDT(monthTermKST), offset_min: monthOffsetMin }
    };

    // ---- variants: alternate charts for boundary births (side-by-side comparison) ----
    var variants = [];
    if (!opts._noVariants) {
      variantSpecs.forEach(function (spec) {
        var vp = Object.assign({}, profile, spec.profilePatch || {});
        var vo = Object.assign({ _noVariants: true }, spec.opts || {});
        var vc = castChart(input, vp, vo);
        if (vc && vc.pillars) {
          variants.push({ code: spec.code, label: spec.label, note: spec.note,
            pillars: vc.pillars, day_master: vc.day_master, changed: pillarDiff(pillars, vc.pillars) });
        }
      });
    }
    var primaryLabel = "As calculated";
    if (variantSpecs.some(function (s) { return s.code === "ZI_HOUR_ROLLOVER"; }))
      primaryLabel = profile.dayBoundary === "zi2300" ? "Next day's Ilju (조자시)" : "This day's Ilju (야자시)";
    else if (variantSpecs.some(function (s) { return s.code === "NEAR_IPCHUN"; }))
      primaryLabel = "(" + yearForPillar + " year)";

    return {
      engine_version: ENGINE_VERSION,
      method_version: Astro.METHOD_VERSION,
      rule_profile: profile,
      day_pillar_anchor: "2024-01-01 KST = 甲子",
      boundaries: boundaries,
      variants: variants,
      primary_label: primaryLabel,
      input: { date: input.date, time: unknownTime ? null : input.time, longitude: input.lon != null ? input.lon : null, calendar: input.calendar || "solar" },
      time_resolution: {
        era: era.era, standard_time: era.label, meridian_e: era.meridian,
        birth_jd_ut: round(birthJD_UT, 6), sun_apparent_longitude_deg: round(sunLong, 4)
      },
      solar_time: solar,
      pillars: pillars,
      three_pillar_mode: unknownTime,
      day_master: dm,
      ten_gods: tenGods,
      element_balance: balance,
      strength: strengthObj,
      climate: climateObj,
      yongsin: yongsinObj,
      daeun: daeunObj,
      daeun_both: daeunBoth,
      warnings: warnings,
      audit_trace: trace
    };
  }

  // ---- helpers ----
  function round(n, d) { var p = Math.pow(10, d); return Math.round(n * p) / p; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtHM(min) { min = mod(Math.round(min), 1440); return pad(Math.floor(min / 60)) + ":" + pad(min % 60); }
  function fmtDT(o) { return o.year + "-" + pad(o.month) + "-" + pad(o.day) + " " + pad(o.hour) + ":" + pad(o.minute) + " KST"; }

  return {
    ENGINE_VERSION: ENGINE_VERSION,
    castChart: castChart,
    WUXING: WUXING,
    elementRelations: elementRelations,
    tenGodByElement: tenGodByElement,
    assessStrength: assessStrength,
    assessClimate: assessClimate,
    combineYongsin: combineYongsin,
    stemObj: stemObj, branchObj: branchObj, tenGod: tenGod,
    REF: {
      STEMS: STEMS, STEM_KO: STEM_KO, STEM_ROM: STEM_ROM, STEM_EL: STEM_EL, STEM_YIN: STEM_YIN,
      BRANCHES: BRANCHES, BRANCH_KO: BRANCH_KO, BRANCH_ROM: BRANCH_ROM, BRANCH_EL: BRANCH_EL, BRANCH_ANIMAL: BRANCH_ANIMAL, BRANCH_YIN: BRANCH_YIN,
      HIDDEN: HIDDEN
    },
    _tables: { STEMS: STEMS, BRANCHES: BRANCHES, HIDDEN: HIDDEN },
    _jdnCivil: jdnCivil, _eraStandard: eraStandard
  };
});
