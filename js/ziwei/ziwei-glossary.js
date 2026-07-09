/* ziwei-glossary.js: core technical terms for the Purple Star Astrology hub.
   Generated from docs/purple-star-hub/PSA-TERMINOLOGY.md §1.5 (core technical terms table)
   and §7 (annotation rules). Editorial titles are always flagged editorial: true and never
   sit in the literal slot. Palace and star ladders live in their own files; this glossary
   covers the mechanics vocabulary.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.glossary) return;

  var GLOSSARY = [
    {
      id: "zi-wei-dou-shu",
      hant: "紫微斗數", /* 紫微斗數 */
      pinyin: "Zǐwēi Dǒushù",
      rubyPinyin: ["zǐ", "wēi", "dǒu", "shù"],
      literal: "Purple Subtlety Dipper Calculation",
      standard: "Zi Wei Dou Shu, commonly rendered Purple Star Astrology",
      editorial: { title: "Purple Star Astrology", editorial: true },
      plain: "A Chinese chart system that maps a life as twelve palaces with symbolic stars placed by birth date and hour.",
      sourceNote: "There is no purple star; 紫微 names the pole star region associated with the emperor (docs/zwds/01).",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.1"]
    },
    {
      id: "san-fang-si-zheng",
      hant: "三方四正", /* 三方四正 */
      pinyin: "Sān Fāng Sì Zhèng",
      rubyPinyin: ["sān", "fāng", "sì", "zhèng"],
      literal: "Three Directions, Four Cardinals",
      standard: "the San Fang Si Zheng court",
      editorial: { title: "The Palace Triangle", editorial: true },
      plain: "No room is read alone: every palace is judged with three companions.",
      practitioner: "Focal palace plus the two palaces four positions away (trines) plus the opposite palace, which is the strongest single influence. Applies at natal, decade, and annual layers.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5"]
    },
    {
      id: "dui-gong",
      hant: "對宮", /* 對宮 */
      pinyin: "Duìgōng",
      rubyPinyin: ["duì", "gōng"],
      literal: "facing palace",
      standard: "opposite palace",
      editorial: { title: "the mirror palace", editorial: true },
      plain: "The room directly across the chart.",
      practitioner: "Exerts the strongest companion influence. The six fixed pairs follow the wheel geometry: Life-Travel, Siblings-Friends (classically 奴僕宮, the Servants Palace), Spouse-Career, Children-Property, Wealth-Fortune, Health-Parents.",
      sourceNote: "PSA-TERMINOLOGY §1.5 lists Wealth-Health and Fortune-Parents among the pairs; those palaces are adjacent, not facing, so ruling D3 (geometry wins) stores the geometric pairs, matching the C2 corrected courts. See ziwei-relationships.js.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "purple-star-hub/PSA-MASTER-PLAN.md#D3"]
    },
    {
      id: "ming-gong",
      hant: "命宮", /* 命宮 */
      pinyin: "Mìng Gōng",
      rubyPinyin: ["mìng", "gōng"],
      literal: "Life or Destiny Palace",
      standard: "Life Palace",
      editorial: { title: "The Command Palace", editorial: true },
      plain: "The anchor room of the chart: who you are and the overall shape of your life. Full record in ziwei-palaces.js.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2"]
    },
    {
      id: "shen-gong",
      hant: "身宮", /* 身宮 */
      pinyin: "Shēn Gōng",
      rubyPinyin: ["shēn", "gōng"],
      literal: "Body Palace",
      standard: "Body Palace",
      editorial: { title: "The Action Seat", editorial: true },
      plain: "A second marker showing where life gets most hands-on.",
      practitioner: "Not a thirteenth palace: it co-locates within one of the twelve, calculated from birth month and hour. Where destiny is enacted rather than latent.",
      needsSource: true,
      sourceNote: "The exact Body Palace calculation formula is not in the docs corpus (doc 04 mentions it exists but does not give it). Nothing built on it renders without a 'different schools teach' wrapper.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5"]
    },
    {
      id: "miao",
      hant: "廟", /* 廟 */
      pinyin: "miào",
      rubyPinyin: ["miào"],
      literal: "temple",
      standard: "Temple (brightness)",
      editorial: null,
      plain: "The star at full strength.",
      practitioner: "Peak expression; the star's qualities are reliably present.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/02"]
    },
    {
      id: "wang",
      hant: "旺", /* 旺 */
      pinyin: "wàng",
      rubyPinyin: ["wàng"],
      literal: "flourishing",
      standard: "Thriving (brightness)",
      editorial: null,
      plain: "Strong, slightly off peak.",
      practitioner: "Well supported and highly functional.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/02"]
    },
    {
      id: "li",
      hant: "利", /* 利 */
      pinyin: "lì",
      rubyPinyin: ["lì"],
      literal: "advantageous",
      standard: "Favorable (brightness)",
      editorial: null,
      plain: "Serviceable middle strength.",
      practitioner: "Neither greatly helping nor hindering.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/02"]
    },
    {
      id: "xian",
      hant: "陷", /* 陷 */
      pinyin: "xiàn",
      rubyPinyin: ["xiàn"],
      literal: "sunken or trapped",
      standard: "Fallen (brightness)",
      editorial: null,
      plain: "The star's shadow side leads.",
      practitioner: "Weakened or inverted expression. Never phrase as doom; phrase as which traits lead.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/02"]
    },
    {
      id: "miao-wang-li-xian",
      hant: "廟旺利陷", /* 廟旺利陷 */
      pinyin: "miào wàng lì xiàn",
      rubyPinyin: ["miào", "wàng", "lì", "xiàn"],
      literal: "temple-flourishing-advantageous-sunken",
      standard: "the four brightness levels",
      editorial: { title: "Star brightness", editorial: true },
      plain: "How loudly a star speaks in a given palace.",
      practitioner: "The brightness scale, read per star per palace branch.",
      needsSource: true,
      sourceNote: "Per-star brightness-by-branch tables exist on the live star pages but are not in the docs corpus (PSA-TERMINOLOGY §7.3). They do not render without a 'different schools teach' wrapper.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5"]
    },
    {
      id: "wu-xing-ju",
      hant: "五行局", /* 五行局 */
      pinyin: "Wǔxíng Jú",
      rubyPinyin: ["wǔ", "xíng", "jú"],
      literal: "Five-Phases Bureau",
      standard: "Five Element Bureau",
      editorial: { title: "The Bureau", editorial: true },
      plain: "Your chart's element class, which sets when your first decade starts.",
      practitioner: "Water 2, Wood 3, Metal 4, Earth 5, Fire 6 (水二局 木三局 金四局 土五局 火六局). Sets the first decade's starting age and anchors Zi Wei's placement.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    },
    {
      id: "da-xian",
      hant: "大限", /* 大限 */
      pinyin: "Dà Xiàn",
      rubyPinyin: ["dà", "xiàn"],
      literal: "great limit",
      standard: "Decade Cycle (Da Xian)",
      editorial: { title: "The Decade Door", editorial: true },
      plain: "The ten-year chapter each palace hosts in turn.",
      practitioner: "Each decade palace becomes the temporary Life Palace, and its stem generates a decade set of Four Transformations.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    },
    {
      id: "liu-nian",
      hant: "流年", /* 流年 */
      pinyin: "Liú Nián",
      rubyPinyin: ["liú", "nián"],
      literal: "flowing year",
      standard: "Annual Cycle (Liu Nian)",
      editorial: { title: "The Year Wave", editorial: true },
      plain: "The palace under this year's spotlight.",
      practitioner: "The year branch sets the annual Life Palace; the year stem generates the annual Four Transformations. Convergence with the natal and decade layers is where events concentrate.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    },
    {
      id: "tian-gan",
      hant: "天干", /* 天干 */
      pinyin: "Tiāngān",
      rubyPinyin: ["tiān", "gān"],
      literal: "heavenly stems",
      standard: "Heavenly Stems",
      editorial: null,
      plain: "The ten-part cycle that drives the transformations.",
      practitioner: "甲乙丙丁戊己庚辛壬癸. Each stem assigns Lu, Quan, Ke, and Ji to four specific stars (see ziwei-transformations.js). Used at natal, decade, and annual layers, plus per-palace stems in Flying Star work.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    },
    {
      id: "di-zhi",
      hant: "地支", /* 地支 */
      pinyin: "Dìzhī",
      rubyPinyin: ["dì", "zhī"],
      literal: "earthly branches",
      standard: "Earthly Branches",
      editorial: null,
      plain: "The twelve fixed positions of the chart.",
      practitioner: "子丑寅卯辰巳午未申酉戌亥. The immovable palace skeleton, arranged counterclockwise; also the birth-hour system (時辰 shíchen, twelve two-hour periods).",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5"]
    },
    {
      id: "si-hua",
      hant: "四化", /* 四化 */
      pinyin: "Sì Huà",
      rubyPinyin: ["sì", "huà"],
      literal: "four transformations",
      standard: "the Four Transformations",
      editorial: { title: "The Four Forces", editorial: true },
      plain: "The four ways a year's stem recolors specific stars: prosperity, power, merit, obstruction. Full records in ziwei-transformations.js.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.4"]
    },
    {
      id: "fei-hua",
      hant: "飛化", /* 飛化 */
      pinyin: "Fēi Huà",
      rubyPinyin: ["fēi", "huà"],
      literal: "flying transformations",
      standard: "Flying Stars technique (Fei Hua)",
      editorial: { title: "Flying Stars", editorial: true },
      plain: "Palaces sending transformation energy to each other.",
      practitioner: "Each palace's own stem transforms stars elsewhere, linking sender and receiver palaces. Signature of the northern Si Hua school.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    },
    {
      id: "ge-ju",
      hant: "格局", /* 格局 */
      pinyin: "Géjú",
      rubyPinyin: ["gé", "jú"],
      literal: "frame-arrangement",
      standard: "pattern / configuration",
      editorial: { title: "The Pattern", editorial: true },
      plain: "A special star combination that changes the whole reading.",
      practitioner: "Valid only when its full conditions are met.",
      schoolNote: "Qualifying conditions for individual patterns differ across schools; each pattern record must carry its own school note (PSA-TERMINOLOGY §7.2).",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/05"]
    },
    {
      id: "ming-zhu",
      hant: "命主", /* 命主 */
      pinyin: "Mìngzhǔ",
      rubyPinyin: ["mìng", "zhǔ"],
      literal: "Life Master",
      standard: "Life Master Star",
      editorial: null,
      plain: "A secondary indicator star drawn from the Life Palace branch.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    },
    {
      id: "shen-zhu",
      hant: "身主", /* 身主 */
      pinyin: "Shēnzhǔ",
      rubyPinyin: ["shēn", "zhǔ"],
      literal: "Body Master",
      standard: "Body Master Star",
      editorial: null,
      plain: "A secondary indicator star drawn from the birth-year branch.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.5", "zwds/04"]
    }
  ];

  var byId = {};
  GLOSSARY.forEach(function (g) { byId[g.id] = g; });

  window.ZiweiData.glossary = GLOSSARY;
  window.ZiweiData.glossaryById = byId;
})();
