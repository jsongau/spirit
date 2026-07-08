/* ziwei-palaces.js: the 12 palaces of Purple Star Astrology (Zi Wei Dou Shu 紫微斗數).
   Generated from docs/purple-star-hub/PSA-TERMINOLOGY.md §1.2, §6.1 (slugs), §7 (annotation rules).
   Geometry per PSA-MASTER-PLAN ruling D3: opposite = 6 positions away, trines = 4 positions away
   in either direction. branchOrder matches the chart page PALACES array index (0-11), which
   GRID_ORDER maps onto the 4x4 perimeter clockwise from top-left.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.palaces) return;

  var PALACES = [
    {
      id: "ming-gong",
      hant: "命宮", /* 命宮 */
      pinyin: "Mìng Gōng",
      rubyPinyin: ["mìng", "gōng"],
      literal: "Life or Destiny Palace",
      standard: "Life Palace",
      editorial: { title: "The Command Palace", editorial: true },
      question: "Who am I built to be?",
      domain: "The room of who you are and the overall shape of your life.",
      oppositeId: "qian-yi-gong",
      trineIds: ["cai-bo-gong", "guan-lu-gong"],
      branchOrder: 0,
      aliases: ["life", "destiny"],
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "zwds/03"]
    },
    {
      id: "xiong-di-gong",
      hant: "兄弟宮", /* 兄弟宮 */
      pinyin: "Xiōngdì Gōng",
      rubyPinyin: ["xiōng", "dì", "gōng"],
      literal: "Brothers Palace",
      standard: "Siblings Palace",
      editorial: { title: "The Peer Circle", editorial: true },
      question: "Who are my true peers?",
      domain: "Siblings, peers, and equal-standing relationships.",
      oppositeId: "nu-pu-gong",
      trineIds: ["ji-e-gong", "tian-zhai-gong"],
      branchOrder: 1,
      aliases: ["siblings", "peers"],
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "zwds/03"]
    },
    {
      id: "fu-qi-gong",
      hant: "夫妻宮", /* 夫妻宮 */
      pinyin: "Fūqī Gōng",
      rubyPinyin: ["fū", "qī", "gōng"],
      literal: "Husband-Wife Palace",
      standard: "Spouse Palace",
      editorial: { title: "The Mirror of Union", editorial: true },
      question: "How do I love and commit?",
      domain: "Marriage and long-term partnership.",
      oppositeId: "guan-lu-gong",
      trineIds: ["qian-yi-gong", "fu-de-gong"],
      branchOrder: 2,
      aliases: ["spouse", "marriage"],
      overinterpretationWarning: "This palace describes the partner archetype and the dynamic of the union, not a verdict on any marriage.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "zwds/03"]
    },
    {
      id: "zi-nu-gong",
      hant: "子女宮", /* 子女宮 */
      pinyin: "Zǐnǚ Gōng",
      rubyPinyin: ["zǐ", "nǚ", "gōng"],
      literal: "Sons-and-Daughters Palace",
      standard: "Children Palace",
      editorial: { title: "The Legacy Garden", editorial: true },
      question: "What do I leave growing?",
      domain: "Children, and everything you create that outlasts you.",
      oppositeId: "tian-zhai-gong",
      trineIds: ["nu-pu-gong", "fu-mu-gong"],
      branchOrder: 3,
      aliases: ["children", "legacy"],
      overinterpretationWarning: "Classical readings speak of fertility and the parent-child bond. Read them as described tendencies, never as predictions about any family.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "zwds/03"]
    },
    {
      id: "cai-bo-gong",
      hant: "財帛宮", /* 財帛宮 */
      pinyin: "Cáibó Gōng",
      rubyPinyin: ["cái", "bó", "gōng"],
      literal: "Wealth-and-Silk Palace",
      standard: "Wealth Palace",
      editorial: { title: "The Celestial Treasury", editorial: true },
      question: "How does money move through me?",
      domain: "Money: how it arrives and how you handle it.",
      oppositeId: "fu-de-gong",
      trineIds: ["guan-lu-gong", "ming-gong"],
      branchOrder: 4,
      aliases: ["wealth", "money"],
      sourceNote: "PSA-TERMINOLOGY §1.2 lists Health as this palace's opposite, but Wealth and Health sit next to each other on the wheel and cannot face each other. Ruling D3 (geometry wins) sets the opposite to the Fortune Palace, matching the C2 corrected courts.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "purple-star-hub/PSA-MASTER-PLAN.md#D3"]
    },
    {
      id: "ji-e-gong",
      hant: "疾厄宮", /* 疾厄宮 */
      pinyin: "Jí'è Gōng",
      rubyPinyin: ["jí", "è", "gōng"],
      literal: "Illness-and-Adversity Palace",
      standard: "Health Palace",
      editorial: { title: "The Constitution Map", editorial: true },
      question: "Where is my body strong or exposed?",
      domain: "The body's constitution and where to be vigilant.",
      oppositeId: "fu-mu-gong",
      trineIds: ["tian-zhai-gong", "xiong-di-gong"],
      branchOrder: 5,
      aliases: ["health"],
      overinterpretationWarning: "Constitutional tendencies and recovery patterns only. Never a diagnosis and never a prediction of illness.",
      sourceNote: "PSA-TERMINOLOGY §1.2 gives conflicting opposites for this palace. Ruling D3 (geometry wins) sets the opposite to the Parents Palace, six positions across the wheel.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "purple-star-hub/PSA-MASTER-PLAN.md#D3"]
    },
    {
      id: "qian-yi-gong",
      hant: "遷移宮", /* 遷移宮 */
      pinyin: "Qiānyí Gōng",
      rubyPinyin: ["qiān", "yí", "gōng"],
      literal: "Migration Palace",
      standard: "Travel Palace",
      editorial: { title: "The World Stage", editorial: true },
      question: "How do I land in new rooms?",
      domain: "Life away from home and how the world receives you.",
      oppositeId: "ming-gong",
      trineIds: ["fu-de-gong", "fu-qi-gong"],
      branchOrder: 6,
      aliases: ["travel", "migration"],
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "zwds/03"]
    },
    {
      id: "nu-pu-gong",
      hant: "奴僕宮", /* 奴僕宮 */
      pinyin: "Núpú Gōng",
      rubyPinyin: ["nú", "pú", "gōng"],
      literal: "Servants Palace",
      standard: "Servants Palace",
      editorial: { title: "The Alliance Court", editorial: true },
      question: "Who gathers under my banner?",
      domain: "Your supporters, staff, and social base.",
      oppositeId: "xiong-di-gong",
      trineIds: ["fu-mu-gong", "zi-nu-gong"],
      branchOrder: 7,
      aliases: ["network", "friends", "servants"],
      schoolNote: "Modern schools often rename this palace 交友宮 Jiāoyǒu Gōng, the Friends Palace. This site keeps the classical 奴僕宮 and records the variant here (ruling C6).",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "purple-star-hub/PSA-TERMINOLOGY.md#C6"]
    },
    {
      id: "guan-lu-gong",
      hant: "官祿宮", /* 官祿宮 */
      pinyin: "Guānlù Gōng",
      rubyPinyin: ["guān", "lù", "gōng"],
      literal: "Official-Salary Palace",
      standard: "Career Palace",
      editorial: { title: "The Imperial Hall", editorial: true },
      question: "What is my rightful post?",
      domain: "Work, vocation, and public standing.",
      oppositeId: "fu-qi-gong",
      trineIds: ["ming-gong", "cai-bo-gong"],
      branchOrder: 8,
      aliases: ["career", "office"],
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "zwds/03"]
    },
    {
      id: "tian-zhai-gong",
      hant: "田宅宮", /* 田宅宮 */
      pinyin: "Tiánzhái Gōng",
      rubyPinyin: ["tián", "zhái", "gōng"],
      literal: "Fields-and-Dwelling Palace",
      standard: "Property Palace",
      editorial: { title: "The Ancestral Foundation", editorial: true },
      question: "What holds me steady?",
      domain: "Home, real estate, and what the family passes down.",
      oppositeId: "zi-nu-gong",
      trineIds: ["xiong-di-gong", "ji-e-gong"],
      branchOrder: 9,
      aliases: ["property", "home"],
      sourceNote: "PSA-TERMINOLOGY §1.2 gives conflicting opposites for this palace. Ruling D3 (geometry wins) sets the opposite to the Children Palace, matching the pair table Children-Property.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "purple-star-hub/PSA-MASTER-PLAN.md#D3"]
    },
    {
      id: "fu-de-gong",
      hant: "福德宮", /* 福德宮 */
      pinyin: "Fúdé Gōng",
      rubyPinyin: ["fú", "dé", "gōng"],
      literal: "Fortune-and-Virtue Palace",
      standard: "Fortune Palace",
      editorial: { title: "The Soul Palace", editorial: true },
      question: "What does my spirit feed on?",
      domain: "Inner life and the capacity for real contentment.",
      oppositeId: "cai-bo-gong",
      trineIds: ["fu-qi-gong", "qian-yi-gong"],
      branchOrder: 10,
      aliases: ["fortune", "soul"],
      sourceNote: "PSA-TERMINOLOGY §1.2 lists Parents as this palace's opposite, but Fortune and Parents are adjacent on the wheel. Ruling D3 (geometry wins) sets the opposite to the Wealth Palace, matching the C2 corrected Spouse court which places Fortune as a trine of Spouse.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "purple-star-hub/PSA-MASTER-PLAN.md#D3", "purple-star-hub/PSA-MASTER-PLAN.md#D5"]
    },
    {
      id: "fu-mu-gong",
      hant: "父母宮", /* 父母宮 */
      pinyin: "Fùmǔ Gōng",
      rubyPinyin: ["fù", "mǔ", "gōng"],
      literal: "Father-and-Mother Palace",
      standard: "Parents Palace",
      editorial: { title: "The Origin Gate", editorial: true },
      question: "What did I arrive carrying?",
      domain: "Parents, elders, institutions, and your starting conditions.",
      oppositeId: "ji-e-gong",
      trineIds: ["zi-nu-gong", "nu-pu-gong"],
      branchOrder: 11,
      aliases: ["parents", "origins"],
      sourceNote: "PSA-TERMINOLOGY §1.2 lists Fortune as this palace's opposite, but the two are adjacent on the wheel. Ruling D3 (geometry wins) sets the opposite to the Health Palace.",
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.2", "purple-star-hub/PSA-MASTER-PLAN.md#D3"]
    }
  ];

  /* Lookup helpers: by id and by alias (teaser labels and chart-page slugs resolve here). */
  var byId = {};
  var byAlias = {};
  PALACES.forEach(function (p) {
    byId[p.id] = p;
    byAlias[p.id] = p.id;
    p.aliases.forEach(function (a) { byAlias[a] = p.id; });
  });

  window.ZiweiData.palaces = PALACES;
  window.ZiweiData.palaceById = byId;
  window.ZiweiData.resolvePalaceId = function (idOrAlias) {
    if (!idOrAlias) return null;
    return byAlias[String(idOrAlias).toLowerCase()] || null;
  };

  /* Shared per-character ruby renderer for every ZWDS surface (Proverbs Pond pattern).
     rubyHtml("遷移宮", ["qiān", "yí", "gōng"]) returns
     <ruby>遷<rt>qiān</rt></ruby><ruby>移<rt>yí</rt></ruby><ruby>宮<rt>gōng</rt></ruby>.
     Non-CJK characters pass through unwrapped. If the syllable array is missing
     or its length does not match the CJK character count, the string returns
     unannotated rather than guessing. */
  window.ZiweiData.rubyHtml = function (hant, rubyPinyin) {
    var s = hant == null ? "" : String(hant);
    var CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
    var chars = s.split("");
    var cjkCount = 0;
    var i;
    for (i = 0; i < chars.length; i++) { if (CJK.test(chars[i])) cjkCount++; }
    if (!rubyPinyin || rubyPinyin.length !== cjkCount || cjkCount === 0) return s;
    var out = "";
    var k = 0;
    for (i = 0; i < chars.length; i++) {
      if (CJK.test(chars[i])) {
        out += "<ruby>" + chars[i] + "<rt>" + rubyPinyin[k] + "</rt></ruby>";
        k++;
      } else {
        out += chars[i];
      }
    }
    return out;
  };
})();
