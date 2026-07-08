/* ziwei-caster.js: the Purple Star Astrology (紫微斗數) chart-casting engine.
   Implements the standard, deterministic Zi Wei Dou Shu construction described in docs/zwds/04
   (Topic 2 Bureau, Topic 3 Chart Construction) and PSA-MASTER-PLAN §4.

   PROVENANCE / NEEDS-SOURCE (PSA-CURRICULUM Part 6, ruling D14): doc 04 describes the *method*
   but not the numeric tables (S1 Zi Wei placement, S2 star sequences, S3 Body Palace, S4 Ming/Shen
   Zhu tables, S6 decade direction, S9 Gregorian->lunar, S10 auxiliaries). The tables below are the
   orthodox construction algorithm, and their correctness is established the way the master plan asks:
   the engine reproduces the shipped worked chart (Mei) exactly, plus two independently hand-checked
   Zi Wei cases, all asserted in the test at the bottom of this file's companion node run. Nothing here
   is a claim about a person's life; it is deterministic positional math.

   Inputs are LUNAR: month (1-12), day (1-30), birth-hour branch, birth-year stem+branch, gender.
   Gregorian->lunar conversion (S9) is intentionally out of scope this wave, so casting from a
   calendar birthday is not wired yet; the sample charts (Mei, Rui) are defined by their lunar inputs.

   FOUND DISCREPANCY (logged, not silently patched): the chart page narrates Mei as 火六局 Fire Bureau
   with her first decade door at age 6. A 丙子 (Bing Zi, 1996) year with the Life Palace in 午 Wu derives
   to 金四局 Metal Bureau (first door age 4) under the orthodox nayin rule below. Mei's *star layout and
   four transformations* are algorithm-consistent and reproduced exactly; her stated bureau/first-door
   age are a chart-page teaching liberty. Recommend correcting the chart-page bureau in a later pass.

   Plain browser JS. No modules. Attaches to window.ZiweiData.caster. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.caster) return;

  /* Earthly Branches, index 0-11. The palace skeleton never rotates. */
  var BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  var BRANCH_PY = ["zǐ", "chǒu", "yín", "mǎo", "chén", "sì", "wǔ", "wèi", "shēn", "yǒu", "xū", "hài"];
  /* Heavenly Stems, index 0-9. */
  var STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

  /* Palace ids in counterclockwise sequence from the Life Palace (doc 04 Topic 3). */
  var PALACE_SEQ = [
    "ming-gong", "xiong-di-gong", "fu-qi-gong", "zi-nu-gong", "cai-bo-gong", "ji-e-gong",
    "qian-yi-gong", "nu-pu-gong", "guan-lu-gong", "tian-zhai-gong", "fu-de-gong", "fu-mu-gong"
  ];

  function mod12(n) { return ((n % 12) + 12) % 12; }

  /* --- Five Tigers Escaping (五虎遁): the stem of the 寅 (index 2) month, given the year stem. --- */
  /* 甲己->丙, 乙庚->戊, 丙辛->庚, 丁壬->壬, 戊癸->甲 (stem index of 寅). */
  function yinMonthStem(yearStemIdx) {
    var map = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; /* by yearStem 甲..癸 -> stem index at 寅 */
    return map[yearStemIdx];
  }
  /* The Heavenly Stem sitting on a given branch, derived from the year stem (used for the bureau). */
  function palaceStem(branchIdx, yearStemIdx) {
    var yin = yinMonthStem(yearStemIdx);            /* stem at branch 寅 (index 2) */
    return ((yin + (branchIdx - 2)) % 10 + 10) % 10;
  }

  /* --- Nayin (納音) five-element of a stem-branch -> bureau number. 30 nayin, each covers two
     consecutive stem-branches of the 60 jiazi. Element -> bureau: Water2 Wood3 Metal4 Earth5 Fire6. --- */
  var ELEM_BUREAU = { "water": 2, "wood": 3, "metal": 4, "earth": 5, "fire": 6 };
  var ELEM_HANT = { "water": "水二局", "wood": "木三局", "metal": "金四局", "earth": "土五局", "fire": "火六局" };
  var ELEM_STD = { "water": "Water Bureau", "wood": "Wood Bureau", "metal": "Metal Bureau", "earth": "Earth Bureau", "fire": "Fire Bureau" };
  /* Nayin element by jiazi index (0-59), stem-branch order 甲子,乙丑,... Each element spans 2 entries. */
  var NAYIN_ELEM = [
    "metal", "metal", "fire", "fire", "wood", "wood", "earth", "earth", "metal", "metal",   /* 0-9  */
    "fire", "fire", "water", "water", "earth", "earth", "metal", "metal", "wood", "wood",     /* 10-19 */
    "water", "water", "earth", "earth", "fire", "fire", "wood", "wood", "water", "water",     /* 20-29 */
    "metal", "metal", "wood", "wood", "earth", "earth", "metal", "metal", "fire", "fire",     /* 30-39 */
    "wood", "wood", "water", "water", "earth", "earth", "metal", "metal", "fire", "fire",     /* 40-49 */
    "water", "water", "earth", "earth", "wood", "wood", "water", "water", "fire", "fire"      /* 50-59 */
  ];
  function jiaziIndex(stemIdx, branchIdx) {
    /* find n in 0..59 with n%10==stemIdx and n%12==branchIdx (CRT; exists iff parities match) */
    for (var n = 0; n < 60; n++) { if (n % 10 === stemIdx && n % 12 === branchIdx) return n; }
    return -1;
  }
  function bureauFromLifePalace(lifeBranchIdx, yearStemIdx) {
    var st = palaceStem(lifeBranchIdx, yearStemIdx);
    var jz = jiaziIndex(st, lifeBranchIdx);
    var elem = NAYIN_ELEM[jz];
    return { num: ELEM_BUREAU[elem], element: elem, hant: ELEM_HANT[elem], standard: ELEM_STD[elem], lifePalaceStem: STEMS[st] };
  }

  /* --- Life & Body palaces from lunar month + birth-hour branch (doc 04 Topic 3). --- */
  /* Month 1 (正月) sits at 寅 (index 2). Life = month position counted back by the hour; Body = counted forward. */
  function lifePalaceIndex(month, hourBranchIdx) { return mod12(2 + (month - 1) - hourBranchIdx); }
  function bodyPalaceIndex(month, hourBranchIdx) { return mod12(2 + (month - 1) + hourBranchIdx); }

  /* --- Zi Wei placement from bureau number + lunar day (the 起紫微 method). --- */
  function ziWeiIndex(bureauNum, day) {
    var quotient = Math.ceil(day / bureauNum);
    var remainder = quotient * bureauNum - day;
    var base = mod12(2 + (quotient - 1));   /* count `quotient` from 寅 (寅 = 1st) */
    if (remainder === 0) return base;
    return (remainder % 2 === 0) ? mod12(base + remainder) : mod12(base - remainder);
  }
  /* Tian Fu is Zi Wei reflected across the 寅(2)-申(8) axis: index -> (4 - index). */
  function tianFuIndex(ziIdx) { return mod12(4 - ziIdx); }

  /* --- The 14 principal stars as offsets from Zi Wei (north group) and Tian Fu (south group). --- */
  var ZIWEI_GROUP = { "zi-wei": 0, "tian-ji": -1, "tai-yang": -3, "wu-qu": -4, "tian-tong": -5, "lian-zhen": -8 };
  var TIANFU_GROUP = { "tian-fu": 0, "tai-yin": 1, "tan-lang": 2, "ju-men": 3, "tian-xiang": 4, "tian-liang": 5, "qi-sha": 6, "po-jun": 10 };

  /* --- Ming Zhu / Shen Zhu tables (branch -> star). Standard tables; needs-source S4, decorative here. --- */
  var MING_ZHU = ["tan-lang", "ju-men", "lu-cun", "wen-qu", "lian-zhen", "wu-qu", "po-jun", "wu-qu", "lian-zhen", "wen-qu", "lu-cun", "ju-men"]; /* by Life-Palace branch */
  var SHEN_ZHU = ["huo-xing", "tian-xiang", "tian-liang", "tian-tong", "wen-chang", "tian-ji", "huo-xing", "tian-xiang", "tian-liang", "tian-tong", "wen-chang", "tian-ji"]; /* by year branch */

  /* --- Decade-door direction: 陽男陰女順(forward), 陰男陽女逆(backward). Stem parity: even index = yang. --- */
  function doorDirection(yearStemIdx, gender) {
    var yang = (yearStemIdx % 2 === 0);
    var male = (gender === "male" || gender === "m");
    var forward = (yang && male) || (!yang && !male);
    return forward ? 1 : -1;
  }

  /* ============================================================
     castChart: the whole chart from lunar inputs.
     opts: { month, day, hourBranch (0-11 or branch char), yearStem, yearBranch, gender, bureau (optional override) }
  ============================================================ */
  function idxOfBranch(b) { return typeof b === "number" ? mod12(b) : BRANCHES.indexOf(b); }
  function idxOfStem(s) { return typeof s === "number" ? ((s % 10) + 10) % 10 : STEMS.indexOf(s); }

  function castChart(opts) {
    var month = opts.month, day = opts.day;
    var hour = idxOfBranch(opts.hourBranch);
    var yStem = idxOfStem(opts.yearStem);
    var yBranch = idxOfBranch(opts.yearBranch);
    var life = lifePalaceIndex(month, hour);
    var body = bodyPalaceIndex(month, hour);
    var bureau = opts.bureau ? normalizeBureau(opts.bureau) : bureauFromLifePalace(life, yStem);
    var derivedBureau = bureauFromLifePalace(life, yStem);
    var zi = ziWeiIndex(bureau.num, day);
    var tf = tianFuIndex(zi);

    /* place stars onto branches */
    var starsByBranch = {}; for (var i = 0; i < 12; i++) starsByBranch[i] = [];
    Object.keys(ZIWEI_GROUP).forEach(function (id) { starsByBranch[mod12(zi + ZIWEI_GROUP[id])].push(id); });
    Object.keys(TIANFU_GROUP).forEach(function (id) { starsByBranch[mod12(tf + TIANFU_GROUP[id])].push(id); });

    /* four transformations by year stem */
    var stemChar = STEMS[yStem];
    var row = (window.ZiweiData.stemTableByStem || {})[stemChar] || null;
    var natalHua = {};
    if (row) { ["lu", "quan", "ke", "ji"].forEach(function (f) { natalHua[row[f]] = f; }); }

    /* map the 12 palaces (counterclockwise from Life) to branches + seated stars */
    var palaces = {};
    for (var k = 0; k < 12; k++) {
      var bIdx = mod12(life - k);
      var pid = PALACE_SEQ[k];
      palaces[pid] = {
        branch: BRANCHES[bIdx], branchIndex: bIdx, branchPinyin: BRANCH_PY[bIdx],
        stem: STEMS[palaceStem(bIdx, yStem)],
        stars: starsByBranch[bIdx].map(function (id) { return natalHua[id] ? { id: id, hua: natalHua[id] } : { id: id }; }),
        isBody: bIdx === body
      };
    }

    /* decade doors: first door is the Life Palace, ages [bureau, bureau+9], stepping in the door direction */
    var dir = doorDirection(yStem, opts.gender);
    var doors = [];
    for (var d = 0; d < 12; d++) {
      var bIdx2 = mod12(life + dir * d);
      var fromAge = bureau.num + d * 10;
      doors.push({ branch: BRANCHES[bIdx2], branchIndex: bIdx2, from: fromAge, to: fromAge + 9 });
    }

    return {
      inputs: { month: month, day: day, hourBranch: BRANCHES[hour], yearStem: stemChar, yearBranch: BRANCHES[yBranch], gender: opts.gender || null },
      lifeBranch: BRANCHES[life], lifeIndex: life, bodyBranch: BRANCHES[body], bodyIndex: body,
      bureau: bureau, derivedBureau: derivedBureau,
      bureauMatchesDerived: bureau.num === derivedBureau.num,
      ziWeiBranch: BRANCHES[zi], ziWeiIndex: zi, tianFuBranch: BRANCHES[tf],
      palaces: palaces, natalHua: natalHua,
      doorDirection: dir, doors: doors,
      mingZhu: MING_ZHU[life], shenZhu: SHEN_ZHU[yBranch]
    };
  }

  function normalizeBureau(b) {
    if (typeof b === "number") { for (var e in ELEM_BUREAU) { if (ELEM_BUREAU[e] === b) return { num: b, element: e, hant: ELEM_HANT[e], standard: ELEM_STD[e] }; } }
    if (b && b.num) return b;
    return { num: 6, element: "fire", hant: ELEM_HANT.fire, standard: ELEM_STD.fire };
  }

  window.ZiweiData.caster = {
    castChart: castChart,
    lifePalaceIndex: lifePalaceIndex, bodyPalaceIndex: bodyPalaceIndex,
    ziWeiIndex: ziWeiIndex, tianFuIndex: tianFuIndex,
    bureauFromLifePalace: bureauFromLifePalace,
    BRANCHES: BRANCHES, STEMS: STEMS, PALACE_SEQ: PALACE_SEQ,
    ZIWEI_GROUP: ZIWEI_GROUP, TIANFU_GROUP: TIANFU_GROUP
  };
})();
