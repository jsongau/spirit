/* ziwei-sample-charts.js: worked example charts for the Purple Star Astrology hub.
   Mei (born 1996) is the shipped fictional study chart from the Reader's School
   (site/elements/purple-star-astrology/chart/index.html). Her placements are copied
   verbatim from that page's PALACES array so the hub and the school agree exactly.
   Rui (born 1988) is added in wave 4. No real birth data ever enters this file (PSA-TERMINOLOGY §7.8).

   Mei's frame: 1996 is a 丙 Bing year, Fire Bureau (火六局), first Decade Door at age 6,
   yang-year woman so the doors advance counterclockwise toward the Siblings palace.
   1996 Four Transformations (丙 stem, orthodox Northern table): Flow 化祿 → Tian Tong (Health),
   Power 化權 → Tian Ji (Siblings), Shine 化科 → Wen Chang (auxiliary), Hook 化忌 → Lian Zhen (Career).

   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.sampleCharts) return;

  /* Mei's chart, palace id → seated star ids (canonical order). Empty rooms borrow
     from their opposite (借星), noted with borrowFrom. Brightness only where the school
     page states it (Zi Wei in Wu = Temple); everything else is left null (needs-source
     per PSA-TERMINOLOGY §7.3: per-branch brightness tables are not in the docs corpus). */
  var mei = {
    id: "mei",
    name: "Mei",
    born: 1996,
    yearStem: "丙",
    yearStemPinyin: "bǐng",
    bureau: { hant: "火六局", pinyin: "Huǒ Liù Jú", standard: "Fire Bureau", firstDoorAge: 6, direction: "counterclockwise", note: "Fire Bureau opens the first Decade Door at age 6; as a yang-year woman Mei's doors advance counterclockwise toward the Siblings palace." },
    fictional: true,
    palaces: {
      "ming-gong":     { branch: "午", branchPinyin: "wǔ", stars: [{ id: "zi-wei", brightness: "miao" }] },
      "xiong-di-gong": { branch: "巳", branchPinyin: "sì", stars: [{ id: "tian-ji" }] },
      "fu-qi-gong":    { branch: "辰", branchPinyin: "chén", stars: [{ id: "qi-sha" }] },
      "zi-nu-gong":    { branch: "卯", branchPinyin: "mǎo", stars: [{ id: "tai-yang" }, { id: "tian-liang" }] },
      "cai-bo-gong":   { branch: "寅", branchPinyin: "yín", stars: [{ id: "wu-qu" }, { id: "tian-xiang" }] },
      "ji-e-gong":     { branch: "丑", branchPinyin: "chǒu", stars: [{ id: "tian-tong" }, { id: "ju-men" }] },
      "qian-yi-gong":  { branch: "子", branchPinyin: "zǐ", stars: [{ id: "tan-lang" }] },
      "nu-pu-gong":    { branch: "亥", branchPinyin: "hài", stars: [{ id: "tai-yin" }] },
      "guan-lu-gong":  { branch: "戌", branchPinyin: "xū", stars: [{ id: "lian-zhen" }, { id: "tian-fu" }] },
      "tian-zhai-gong":{ branch: "酉", branchPinyin: "yǒu", stars: [], borrowFrom: "zi-nu-gong" },
      "fu-de-gong":    { branch: "申", branchPinyin: "shēn", stars: [{ id: "po-jun" }] },
      "fu-mu-gong":    { branch: "未", branchPinyin: "wèi", stars: [], borrowFrom: "ji-e-gong" }
    },
    /* 1996 birth-year transformations, star id → force id. */
    natalHua: { "tian-tong": "lu", "tian-ji": "quan", "lian-zhen": "ji" },
    natalHuaNote: "The 1996 Shine 化科 flies to 文昌 Wen Chang, an auxiliary star added in wave 4; only the three principal-star transformations are marked here.",
    source: ["elements/purple-star-astrology/chart/index.html PALACES", "zwds/04"]
  };

  /* Read the Triangle (Model 5) scenario: Mei's Career palace (官祿宮) read alone,
     then with each companion added. The court of Career is focal Career + trine Life
     + trine Wealth + mirror Spouse (geometry per ziwei-relationships.js). The verdict
     grows more qualified as rooms are added, which is the lesson. Non-deterministic
     throughout: office politics is the recurring exam, never a fixed misfortune. */
  var meiTriangle = {
    chartId: "mei",
    focal: "guan-lu-gong",
    scenarioTitle: "Mei's Imperial Hall (Career)",
    focalStars: ["lian-zhen", "tian-fu"],
    focalHua: { star: "lian-zhen", force: "ji" },
    mirror: "fu-qi-gong",
    trines: ["ming-gong", "cai-bo-gong"],
    base: {
      verdict: "Read alone, the Career room holds Lian Zhen, the Diplomat, with the 1996 Hook on it, and Tian Fu, the Treasury, beside it. On its own that looks like a career defined by office politics and a steadying, resourceful streak.",
      caution: "This is one room out of context. A trained reader never stops here."
    },
    withMirror: {
      addsPalace: "fu-qi-gong",
      addsStars: ["qi-sha"],
      verdict: "Add the mirror, the Spouse room with Qi Sha the Warrior, and the picture shifts. A confrontational partner sits directly across from a political workplace, so home and office pull on the same nerve. The reading is now about balance between the two, not just the job."
    },
    withTri1: {
      addsPalace: "ming-gong",
      addsStars: ["zi-wei"],
      verdict: "Bring in the first triangle partner, the Life palace with Zi Wei the Emperor in its strongest seat. Now the office politics reads differently: this is a person built to preside, so the Career Hook is less a threat and more the exam an organiser keeps having to pass."
    },
    withTri2: {
      addsPalace: "cai-bo-gong",
      addsStars: ["wu-qu", "tian-xiang"],
      verdict: "Add the second triangle partner, the Wealth room with Wu Qu the Finance General and Tian Xiang the Prime Minister. Money sense and steady administration back the throne, so the whole coalition reads as authority supported by resources, with politics as the cost of the seat rather than a warning about it."
    },
    full: {
      verdict: "Reading all four rooms together: Mei is built to lead (Life), backed by money sense and administration (Wealth), balancing a strong-willed partner at home (Spouse), and the recurring exam is workplace politics (the Career Hook). That is a whole-court verdict, held with uncertainty language, not a one-room guess.",
      method: "This is the five-step reading in miniature: find the room, read its stars, weigh the triangle and the mirror, apply the year's forces, then speak the verdict with care."
    },
    source: ["elements/purple-star-astrology/chart/index.html case steps", "purple-star-hub/PSA-HUB-EXPERIENCE.md#6.5"]
  };

  /* Rui, born 1988 (戊辰 Wu Chen), constructed with ziwei-caster.js and validated by it
     (lunar inputs month 3, day 7, 子 hour, male). Designed to contrast Mei on every axis the
     curriculum teaches. Earth Bureau (土五局), first Decade Door at age 5, doors advancing forward.
     Pedagogical contrasts that hold under the orthodox algorithm:
       - 命宮 holds 天府 (the steward), not 紫微 (the emperor): a different center of gravity.
       - Two empty palaces (Siblings 卯, Children 丑) must borrow their opposite's stars (借星).
       - The natal Hua Ji (戊 year) falls on 天機 in the Health palace: a constitution-and-mind
         recurring lesson, where Mei's Hook is a career lesson.
       - First Decade Door at age 5 and advancing forward, where Mei's opens at 6 and runs backward.
     DELTA FROM PSA-HUB-EXPERIENCE §6.7 (logged, arithmetic wins per the spec's own instruction):
     the spec sketched "Hua Ji on 貪狼 in the Spouse palace" and "an empty Wealth palace." Neither is
     possible for a real 戊辰 chart with 天府 in 命宮: 戊's Hua Ji is 天機 (not 貪狼), and Wealth here
     holds 紫微. The engine's true output is used; the steward-not-emperor contrast is preserved. */
  var rui = {
    id: "rui",
    name: "Rui",
    born: 1988,
    yearStem: "戊",
    yearStemPinyin: "wù",
    yearBranch: "辰",
    lunarInputs: { month: 3, day: 7, hourBranch: "子", gender: "male" },
    bureau: { hant: "土五局", pinyin: "Tǔ Wǔ Jú", standard: "Earth Bureau", firstDoorAge: 5, direction: "forward", note: "Earth Bureau opens the first Decade Door at age 5; as a yang-year man Rui's doors advance forward." },
    fictional: true,
    ziWeiBranch: "子",
    palaces: {
      "ming-gong":     { branch: "辰", branchPinyin: "chén", stars: [{ id: "lian-zhen" }, { id: "tian-fu" }] },
      "xiong-di-gong": { branch: "卯", branchPinyin: "mǎo", stars: [], borrowFrom: "nu-pu-gong" },
      "fu-qi-gong":    { branch: "寅", branchPinyin: "yín", stars: [{ id: "po-jun" }] },
      "zi-nu-gong":    { branch: "丑", branchPinyin: "chǒu", stars: [], borrowFrom: "tian-zhai-gong" },
      "cai-bo-gong":   { branch: "子", branchPinyin: "zǐ", stars: [{ id: "zi-wei" }] },
      "ji-e-gong":     { branch: "亥", branchPinyin: "hài", stars: [{ id: "tian-ji" }] },
      "qian-yi-gong":  { branch: "戌", branchPinyin: "xū", stars: [{ id: "qi-sha" }] },
      "nu-pu-gong":    { branch: "酉", branchPinyin: "yǒu", stars: [{ id: "tai-yang" }, { id: "tian-liang" }] },
      "guan-lu-gong":  { branch: "申", branchPinyin: "shēn", stars: [{ id: "wu-qu" }, { id: "tian-xiang" }] },
      "tian-zhai-gong":{ branch: "未", branchPinyin: "wèi", stars: [{ id: "tian-tong" }, { id: "ju-men" }] },
      "fu-de-gong":    { branch: "午", branchPinyin: "wǔ", stars: [{ id: "tan-lang" }] },
      "fu-mu-gong":    { branch: "巳", branchPinyin: "sì", stars: [{ id: "tai-yin" }] }
    },
    /* 1988 戊-year transformations, principal stars only (Hua Ke flies to the auxiliary 右弼 You Bi). */
    natalHua: { "tan-lang": "lu", "tai-yin": "quan", "tian-ji": "ji" },
    natalHuaNote: "The 1988 Hua Ke 化科 flies to 右弼 You Bi, an auxiliary star; only the three principal-star transformations are marked here.",
    source: ["js/ziwei/ziwei-caster.js (constructed + validated)", "zwds/04"]
  };

  var byId = { mei: mei, rui: rui };

  window.ZiweiData.sampleCharts = byId;
  window.ZiweiData.sampleChartById = byId;
  window.ZiweiData.triangleLessons = { mei: meiTriangle };
})();
