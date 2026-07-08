/* ziwei-auxiliary-stars.js: the supporting (auxiliary) stars of Purple Star Astrology.
   Generated from docs/zwds/05 Topic 1 (六吉星, 六煞星, 祿存, 四馬星 / romance stars) and
   PSA-CURRICULUM Level 6. The conditioning layer: never read one alone. Every entry carries a
   productive face and a corrosive face, per doc 05's "auspicious is not always good, malefic is not
   always bad." Non-deterministic voice throughout. Traditional characters only.
   Placement formulas (S10) are not in the corpus and are out of scope this wave; meanings are fully sourced.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.auxiliaryStars) return;

  function s(o) { return o; }
  var GROUPS = [
    {
      id: "assistants", hant: "左輔右弼", pinyin: "Zuǒ Fǔ Yòu Bì", rubyPinyin: ["zuǒ", "fǔ", "yòu", "bì"],
      standard: "The Two Assistants", lead: "Direct support and quiet support. Together with a strong main star, especially Zi Wei, they form a classic high-grade configuration of social backing.",
      stars: [
        s({ id: "zuo-fu", hant: "左輔", pinyin: "Zuǒ Fǔ", rubyPinyin: ["zuǒ", "fǔ"], literal: "Left Assistant", standard: "Zuo Fu", plain: "Help from a position of standing: forceful, visible, immediate, like a mentor stepping in.", productive: "Strengthens commanding stars into more decisive, authoritative expressions and draws benefactors.", corrosive: "Its directness can read as aloof or unapproachable." }),
        s({ id: "you-bi", hant: "右弼", pinyin: "Yòu Bì", rubyPinyin: ["yòu", "bì"], literal: "Right Assistant", standard: "You Bi", plain: "Quiet help from behind the scenes: attentive, harmonising, the peacemaker.", productive: "Softens the edges of forceful stars and adds artistic feeling and receptivity to advice.", corrosive: "Easily swayed by others, so an already indecisive chart can become overly hesitant." })
      ]
    },
    {
      id: "nobles", hant: "天魁天鉞", pinyin: "Tiān Kuí Tiān Yuè", rubyPinyin: ["tiān", "kuí", "tiān", "yuè"],
      standard: "The Two Nobles", lead: "Benefactor stars, one for the day chart and one for the night. Their help is real, and classical readings say it works best alongside your own effort.",
      stars: [
        s({ id: "tian-kui", hant: "天魁", pinyin: "Tiān Kuí", rubyPinyin: ["tiān", "kuí"], literal: "Heavenly Chief", standard: "Tian Kui (day noble)", plain: "A commanding, institutional kind of help; recognition through influential people. Stronger in day births.", productive: "Advancement through connections and reputation, especially in literary and organising work.", corrosive: "Addresses the immediate problem only, treating the symptom rather than the root; it needs your active effort." }),
        s({ id: "tian-yue", hant: "天鉞", pinyin: "Tiān Yuè", rubyPinyin: ["tiān", "yuè"], literal: "Heavenly Halberd", standard: "Tian Yue (night noble)", plain: "The quieter noble: thinks, analyses, and works the root of a problem. Stronger in night births.", productive: "If Tian Kui lends the cash, Tian Yue negotiates the discount so you need not borrow.", corrosive: "Alone, without Tian Kui, the support is real but lacks public-facing impact." })
      ]
    },
    {
      id: "scholars", hant: "文昌文曲", pinyin: "Wén Chāng Wén Qū", rubyPinyin: ["wén", "chāng", "wén", "qū"],
      standard: "The Two Scholars", lead: "The orthodox path and the artistic path to being seen. Together they mark exceptional cultural talent. Both turn sensitive under the Hook.",
      stars: [
        s({ id: "wen-chang", hant: "文昌", pinyin: "Wén Chāng", rubyPinyin: ["wén", "chāng"], literal: "Literary Flourishing", standard: "Wen Chang", plain: "The orthodox scholar: memory, credentials, the roads to success society validates.", productive: "Strong retention and a refined, credentialled impression; charm when paired with romance stars.", corrosive: "Under Hua Ji the Hook it flags care with documents, contracts, and examinations. Phrase as caution, never as a fixed loss." }),
        s({ id: "wen-qu", hant: "文曲", pinyin: "Wén Qū", rubyPinyin: ["wén", "qū"], literal: "Literary Song", standard: "Wen Qu", plain: "The artistic path: intuition, performance, emotional expression, captivating others.", productive: "Flexible, emotionally intelligent expression and creative reach.", corrosive: "The expressive gift cuts both ways, so it is also linked to gossip and verbal disputes; under the Hook, care with written agreements." })
      ]
    },
    {
      id: "four-sha", hant: "四煞", pinyin: "Sì Shà", rubyPinyin: ["sì", "shà"],
      standard: "The Four Sha", lead: "The friction stars. A Sha in the Career palace of a surgeon, soldier, or athlete can be highly productive; in a relationship palace it tends to grate. Read where it sits, not whether it is present.",
      stars: [
        s({ id: "qing-yang", hant: "擎羊", pinyin: "Qíng Yáng", rubyPinyin: ["qíng", "yáng"], literal: "Raised Ram, the Yang Blade", standard: "Qing Yang", plain: "Sharp, impulsive drive that acts from determination without pausing.", productive: "Relentless motivation in Career and Wealth; the cutting professions can thrive with it.", corrosive: "Obstinate and blunt; in relationship palaces it creates tension and misunderstandings." }),
        s({ id: "tuo-luo", hant: "陀羅", pinyin: "Tuó Luó", rubyPinyin: ["tuó", "luó"], literal: "Spinning Top", standard: "Tuo Luo", plain: "The top that never settles: acts too slowly, gets caught in loops, returns compulsively.", productive: "Endurance and meticulous mastery; suited to long research and artisanal work precisely because it cannot let go.", corrosive: "Overthinking, procrastination, and staying too long where release is hardest." }),
        s({ id: "huo-xing", hant: "火星", pinyin: "Huǒ Xīng", rubyPinyin: ["huǒ", "xīng"], literal: "Fire Star", standard: "Huo Xing", plain: "Burns intensely and suddenly, then fizzles; feeling shows openly on the surface.", productive: "With emotional discipline and a stabilising main star, it makes trailblazers who break through roadblocks.", corrosive: "Quick-tempered and impetuous when provoked; the temperature runs hot and cold." }),
        s({ id: "ling-xing", hant: "鈴星", pinyin: "Líng Xīng", rubyPinyin: ["líng", "xīng"], literal: "Bell Star", standard: "Ling Xing", plain: "Fire's cold counterpart: internalises and calculates, unflappable under pressure.", productive: "Precision and endurance for intelligence work, long strategy, and complex situations.", corrosive: "Over-calculation can slide into manipulation, especially beside already-introspective stars." })
      ]
    },
    {
      id: "wealth-retainer", hant: "祿存", pinyin: "Lù Cún", rubyPinyin: ["lù", "cún"],
      standard: "The Wealth Retainer", lead: "The star of stored prosperity, and a rule worth memorising.",
      stars: [
        s({ id: "lu-cun", hant: "祿存", pinyin: "Lù Cún", rubyPinyin: ["lù", "cún"], literal: "Salary Stored", standard: "Lu Cun", plain: "Accumulated, retained wealth and a steady, careful relationship with resources.", productive: "A reliable anchor for saving and holding what is earned.", corrosive: "It always travels flanked by Qing Yang on one side and Tuo Luo on the other: prosperity flanked by blades. Wherever you accumulate, there is sharpness on both sides." })
      ]
    },
    {
      id: "voids", hant: "地空地劫", pinyin: "Dì Kōng Dì Jié", rubyPinyin: ["dì", "kōng", "dì", "jié"],
      standard: "The Two Voids", lead: "One works at the level of thought, the other at the level of matter. Doc 05's coping guidance is concrete: short stages and visible checkpoints.",
      stars: [
        s({ id: "di-kong", hant: "地空", pinyin: "Dì Kōng", rubyPinyin: ["dì", "kōng"], literal: "Earth Void", standard: "Di Kong", plain: "Breaking wings mid-flight: full of ideas, thinks rather than acts, leaves projects interrupted.", productive: "Philosophical thinking, artistic vision, and genuine detachment from material anxiety.", corrosive: "A hollow-wealth feeling where foundations seem unreal; with Tian Ma the imagination loses all grounding." }),
        s({ id: "di-jie", hant: "地劫", pinyin: "Dì Jié", rubyPinyin: ["dì", "jié"], literal: "Earth Calamity", standard: "Di Jie", plain: "Sailing rough seas: scrutinises opportunities so hard that good ones slip past.", productive: "Sharp for quick, concrete, clearly defined results.", corrosive: "Sudden gain-and-loss cycles; long commitments are hard. Break large projects into short stages with visible checkpoints." })
      ]
    },
    {
      id: "movement-romance", hant: "天馬紅鸞", pinyin: "Tiān Mǎ Hóng Luán", rubyPinyin: ["tiān", "mǎ", "hóng", "luán"],
      standard: "Movement and Romance stars", lead: "Movement, and the romance stars taught with timing-activation framing and zero destiny claims.",
      stars: [
        s({ id: "tian-ma", hant: "天馬", pinyin: "Tiān Mǎ", rubyPinyin: ["tiān", "mǎ"], literal: "Heavenly Horse", standard: "Tian Ma", plain: "The star that cannot sit still: movement, change, the search for variety.", productive: "With Lu Cun it forms 祿馬交馳, a classical wealth-through-movement pattern (travel, trade, mobile work).", corrosive: "Picking up sesame seeds while dropping watermelons; in Property or Wealth it turns what should be fixed turbulent." }),
        s({ id: "hong-luan", hant: "紅鸞", pinyin: "Hóng Luán", rubyPinyin: ["hóng", "luán"], literal: "Red Phoenix", standard: "Hong Luan", plain: "Committed romantic turning points, on a roughly twelve-year cycle. A timing marker, never a promise.", productive: "Marks seasons that favour commitment and celebration.", corrosive: "Read as timing, not fate; it names a season, not an outcome." }),
        s({ id: "tian-xi", hant: "天喜", pinyin: "Tiān Xǐ", rubyPinyin: ["tiān", "xǐ"], literal: "Heavenly Joy", standard: "Tian Xi", plain: "Celebrations and happy occasions, the companion to Hong Luan.", productive: "Brightens the seasons it activates.", corrosive: "A mood marker, not a promise of events." }),
        s({ id: "tian-yao", hant: "天姚", pinyin: "Tiān Yáo", rubyPinyin: ["tiān", "yáo"], literal: "Heavenly Charm", standard: "Tian Yao", plain: "Playful magnetism and social charm, distinct from Hong Luan's committed turning points.", productive: "Ease with people and a light, attractive presence.", corrosive: "Charm without direction can scatter; read it as energy to steer, not a verdict." })
      ]
    }
  ];

  /* Chart patterns 格局, taught as: conditions must be fully met or the pattern loses force. */
  var PATTERNS = {
    hant: "格局", pinyin: "Géjú", rubyPinyin: ["gé", "jú"], standard: "Chart patterns",
    lead: "A pattern is a named star combination that changes a whole reading, and it only counts when its full conditions are met. Doc 05's honest framing: a partial pattern is not the pattern.",
    note: "The auspicious set includes 紫府同宮, 明珠出海, 石中隱玉, 雄宿朝元, 日月並明; the challenge set includes 刑囚夾印, reframed for modern law, medicine, and military work. Chart-quality tiers are taught with doc 05's closing principle: Purple Star is not fatalism, it is a life schedule."
  };

  var byId = {};
  GROUPS.forEach(function (g) { g.stars.forEach(function (st) { st.group = g.id; byId[st.id] = st; }); });

  /* Register speak strings so pronounce buttons work on the supporting-stars page (pronunciation.js
     must be loaded first). Traditional characters, zh-CN, same one-voice pattern. */
  if (window.ZiweiData.pronunciation) {
    Object.keys(byId).forEach(function (id) { if (!window.ZiweiData.pronunciation[id]) window.ZiweiData.pronunciation[id] = { text: byId[id].hant, pinyin: byId[id].pinyin, lang: "zh-CN" }; });
  }

  window.ZiweiData.auxiliaryStars = GROUPS;
  window.ZiweiData.auxiliaryStarById = byId;
  window.ZiweiData.auxiliaryPatterns = PATTERNS;
})();
