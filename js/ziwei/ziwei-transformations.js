/* ziwei-transformations.js: the Four Transformations (四化 Sì Huà) of Purple Star Astrology.
   Generated from docs/purple-star-hub/PSA-TERMINOLOGY.md §1.4 (ladder), §5 (season ruling),
   §7 (annotation rules) and docs/zwds/04 (Qin Tian Pai orthodox Northern school stem table).
   Standard English for the set: the Four Transformations. "The Four Forces" is the Zodi
   editorial title and stays flagged editorial wherever it appears alone (ruling C4).
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.transformations) return;

  var SET = {
    hant: "四化", /* 四化 */
    pinyin: "Sì Huà",
    rubyPinyin: ["sì", "huà"],
    literal: "four transformations",
    standard: "the Four Transformations",
    editorial: { title: "The Four Forces", editorial: true }
  };

  var TRANSFORMATIONS = [
    {
      id: "lu",
      hant: "化祿", /* 化祿, never the simplified form */
      pinyin: "Huà Lù",
      rubyPinyin: ["huà", "lù"],
      literal: "transforms to salary or prosperity",
      standard: "Prosperity Transformation (Hua Lu)",
      editorial: { title: "The Flow", editorial: true },
      linePattern: "solid",
      thread: "resources flow through what this star governs",
      natalFrame: "In a birth chart",
      timingFrame: "In a year",
      natalEffect: "resources arrive through {star} and circulate more easily",
      timingEffect: "the room {star} sits in opens for the year, and things move through it",
      plain: "The channel opens; things get easier in that room.",
      practitioner: "Resource arrival and smooth circulation. Classical texts pair it with over-indulgence risk.",
      caution: "Ease is not a free pass. Classical readings pair the Flow with over-indulgence risk, and a smooth room can still be handled badly.",
      heTuElement: "metal",
      seasonMetaphor: { season: "spring", note: "A teaching metaphor, not a correspondence table. The He Tu elements and the season metaphor are two separate teachings that do not line up (PSA-TERMINOLOGY §5)." },
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.4", "zwds/04"]
    },
    {
      id: "quan",
      hant: "化權", /* 化權, never the simplified or shinjitai forms */
      pinyin: "Huà Quán",
      rubyPinyin: ["huà", "quán"],
      literal: "transforms to power or authority",
      standard: "Power Transformation (Hua Quan)",
      editorial: { title: "The Power", editorial: true },
      linePattern: "double",
      thread: "authority and initiative gather around this star",
      natalFrame: "In a birth chart",
      timingFrame: "In a year",
      natalEffect: "{star} gains a lever, and the responsibility that comes with it",
      timingEffect: "the room {star} sits in is where you push and take charge for the year",
      plain: "You get the lever, and the responsibility.",
      practitioner: "Initiative, control, amplification. Classical texts warn of an authoritarian tip-over when unsupported.",
      caution: "Amplified authority is not earned authority. Classical readings warn that the Power tips into control for its own sake when the rest of the chart does not support it.",
      heTuElement: "fire",
      seasonMetaphor: { season: "summer", note: "A teaching metaphor, not a correspondence table (PSA-TERMINOLOGY §5)." },
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.4", "zwds/04"]
    },
    {
      id: "ke",
      hant: "化科", /* 化科 */
      pinyin: "Huà Kē",
      rubyPinyin: ["huà", "kē"],
      literal: "transforms to merit or examination rank",
      standard: "Merit Transformation (Hua Ke)",
      editorial: { title: "The Shine", editorial: true },
      linePattern: "dashed",
      thread: "recognition settles on what this star already does",
      natalFrame: "In a birth chart",
      timingFrame: "In a year",
      natalEffect: "{star} gets seen for what is already there, quietly polished",
      timingEffect: "the room {star} sits in brings recognition, documents, and reputation for the year",
      plain: "You get seen for what is already there.",
      practitioner: "Recognition, reputation, documents. The mildest of the four; it polishes rather than creates.",
      caution: "The mildest force. It polishes what already exists rather than creating anything new; do not read it as a windfall or a promise of fame.",
      heTuElement: "wood",
      seasonMetaphor: { season: "autumn", note: "A teaching metaphor, not a correspondence table (PSA-TERMINOLOGY §5)." },
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.4", "zwds/04"]
    },
    {
      id: "ji",
      hant: "化忌", /* 化忌 */
      pinyin: "Huà Jì",
      rubyPinyin: ["huà", "jì"],
      literal: "transforms to taboo or obstruction",
      standard: "Obstruction Transformation (Hua Ji)",
      editorial: { title: "The Hook", editorial: true },
      linePattern: "dotted",
      thread: "the unfinished work attaches to this star",
      natalFrame: "In a birth chart",
      timingFrame: "In a year",
      natalEffect: "{star} becomes the room that never feels finished, the chart's fixed pressure point",
      timingEffect: "the room {star} sits in is where the year's work concentrates",
      plain: "The room that never feels finished; where the work is.",
      practitioner: "A void or deficiency that creates drive. The natal Ji is the chart's fixed pressure point and the most weighted of the four.",
      caution: "The Hook is a pressure point, not a punishment. Classical readings treat it as the place a life keeps working on, never as a fixed loss or a verdict on health, money, or marriage.",
      heTuElement: "water",
      seasonMetaphor: { season: "winter", note: "A teaching metaphor, not a correspondence table (PSA-TERMINOLOGY §5)." },
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.4", "zwds/04"]
    }
  ];

  /* Heavenly Stem → four stars. Qin Tian Pai orthodox Northern school table, docs/zwds/04,
     recorded in PSA-TERMINOLOGY §7.2. Star values are ids in ziwei-principal-stars.js;
     wen-chang 文昌, wen-qu 文曲, you-bi 右弼, zuo-fu 左輔 are auxiliary stars (wave 4 file). */
  var STEM_TABLE = [
    { stem: "甲", pinyin: "jiǎ", lu: "lian-zhen", quan: "po-jun", ke: "wu-qu", ji: "tai-yang" },
    { stem: "乙", pinyin: "yǐ", lu: "tian-ji", quan: "tian-liang", ke: "zi-wei", ji: "tai-yin" },
    { stem: "丙", pinyin: "bǐng", lu: "tian-tong", quan: "tian-ji", ke: "wen-chang", ji: "lian-zhen" },
    { stem: "丁", pinyin: "dīng", lu: "tai-yin", quan: "tian-tong", ke: "tian-ji", ji: "ju-men" },
    {
      stem: "戊", pinyin: "wù", lu: "tan-lang", quan: "tai-yin", ke: "you-bi", ji: "tian-ji",
      schoolNote: "Different schools vary here; this site follows the orthodox Northern (Qin Tian Pai) table. Wu-year Hua Ke is 右弼 You Bi, an auxiliary star."
    },
    { stem: "己", pinyin: "jǐ", lu: "wu-qu", quan: "tan-lang", ke: "tian-liang", ji: "wen-qu" },
    {
      stem: "庚", pinyin: "gēng", lu: "tai-yang", quan: "wu-qu", ke: "tai-yin", ji: "tian-tong",
      schoolNote: "Different schools vary here; this site follows the orthodox Northern (Qin Tian Pai) table. Geng-year Hua Lu is 太陽 Tai Yang; some schools assign 武曲 Wu Qu."
    },
    { stem: "辛", pinyin: "xīn", lu: "ju-men", quan: "tai-yang", ke: "wen-qu", ji: "wen-chang" },
    {
      stem: "壬", pinyin: "rén", lu: "tian-liang", quan: "zi-wei", ke: "zuo-fu", ji: "wu-qu",
      schoolNote: "Different schools vary here; this site follows the orthodox Northern (Qin Tian Pai) table. Ren-year Hua Ke is 左輔 Zuo Fu, an auxiliary star."
    },
    { stem: "癸", pinyin: "guǐ", lu: "po-jun", quan: "ju-men", ke: "tai-yin", ji: "tan-lang" }
  ];

  /* Auxiliary stars referenced by the stem table (full auxiliary file ships wave 4). */
  var STEM_TABLE_AUXILIARIES = {
    "wen-chang": { hant: "文昌", pinyin: "Wén Chāng", rubyPinyin: ["wén", "chāng"], literal: "Literary Flourishing", auxiliary: true },
    "wen-qu": { hant: "文曲", pinyin: "Wén Qū", rubyPinyin: ["wén", "qū"], literal: "Literary Song", auxiliary: true },
    "zuo-fu": { hant: "左輔", pinyin: "Zuǒ Fǔ", rubyPinyin: ["zuǒ", "fǔ"], literal: "Left Assistant", auxiliary: true },
    "you-bi": { hant: "右弼", pinyin: "Yòu Bì", rubyPinyin: ["yòu", "bì"], literal: "Right Assistant", auxiliary: true }
  };

  var byId = {};
  TRANSFORMATIONS.forEach(function (t) { byId[t.id] = t; });
  var byStem = {};
  STEM_TABLE.forEach(function (row) { byStem[row.stem] = row; });

  window.ZiweiData.transformationsSet = SET;
  window.ZiweiData.transformations = TRANSFORMATIONS;
  window.ZiweiData.transformationById = byId;
  window.ZiweiData.stemTable = STEM_TABLE;
  window.ZiweiData.stemTableByStem = byStem;
  window.ZiweiData.stemTableAuxiliaries = STEM_TABLE_AUXILIARIES;
})();
