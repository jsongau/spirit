/* ziwei-principal-stars.js: the 14 principal stars of Purple Star Astrology (紫微斗數).
   Generated from docs/purple-star-hub/PSA-TERMINOLOGY.md §1.3 (canonical table), §6.2 (slugs),
   rulings C1 (Zi Wei transformations), C5 (Sun and Moon family), and docs/zwds/04 (stem table
   determines each star's transformation eligibility, per PSA-MASTER-PLAN ruling D7).
   series.group: "zi-wei-group" (Northern Dipper, 紫微星系) or "tian-fu-group" (Southern Dipper, 天府星系).
   series.configuration: "sha-po-lang" (殺破狼), "ji-yue-tong-liang" (機月同梁), or null.
   placements: zi-wei carries the 12-palace beginner readings from the indexv6.html teaser
   (the drag mini-game data); the Parents line uses the corrected wording from PSA-TERMINOLOGY
   §3.2 item 7. The other 13 stars ship placements: null. Wave 2 fills them from the star pages
   plus docs/zwds/02.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.principalStars) return;

  var STARS = [
    {
      id: "zi-wei",
      hant: "紫微", /* 紫微 */
      pinyin: "Zǐwēi",
      rubyPinyin: ["zǐ", "wēi"],
      literal: "Purple Subtlety / Purple Pole",
      standard: "Zi Wei (classical title 帝星 Dìxīng, Emperor Star)",
      editorial: { title: "The Emperor Star", editorial: true },
      essence: "The organizer everyone ends up orbiting.",
      element: "yin-earth",
      dipper: "north",
      series: { group: "zi-wei-group", configuration: null, groupEditorial: "The Emperor's Court" },
      transforms: ["quan", "ke"],
      schoolNote: "Ruling C1: in the orthodox Northern (Qin Tian Pai) stem table Zi Wei receives the Power in Ren years and the Shine in Yi years, and never receives the Flow or the Hook. Some texts state it does not transform at all; the doc 04 table wins.",
      placements: null, /* filled below from PLACEMENTS (wave 2) */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "purple-star-hub/PSA-TERMINOLOGY.md#C1", "zwds/02#zi-wei"]
    },
    {
      id: "tian-ji",
      hant: "天機", /* 天機 */
      pinyin: "Tiānjī",
      rubyPinyin: ["tiān", "jī"],
      literal: "Heavenly Mechanism",
      standard: "Tian Ji",
      editorial: { title: "The Strategist", editorial: true },
      essence: "The quick planner who rarely sits still.",
      element: "yin-wood",
      dipper: "north",
      series: { group: "zi-wei-group", configuration: "ji-yue-tong-liang", groupEditorial: "The Emperor's Court" },
      transforms: ["lu", "quan", "ke", "ji"],
      placements: null, /* wave 2 fills per-palace readings from the star page + docs/zwds/02 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#tian-ji"]
    },
    {
      id: "tai-yang",
      hant: "太陽", /* 太陽 */
      pinyin: "Tàiyáng",
      rubyPinyin: ["tài", "yáng"],
      literal: "The Great Yang / The Sun",
      standard: "Tai Yang (Sun Star)",
      editorial: { title: "The Sun Star", editorial: true },
      essence: "Shines for others; public by nature.",
      element: "yang-fire",
      dipper: "north",
      series: { group: "zi-wei-group", configuration: null, groupEditorial: "The Emperor's Court" },
      transforms: ["lu", "quan", "ji"],
      schoolNote: "Ruling C5: kept in the Zi Wei group (Northern Dipper) per the doc 02 group listing and every live page. Some classifications treat the Sun and Moon as central luminaries rather than Dipper members.",
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "purple-star-hub/PSA-TERMINOLOGY.md#C5", "zwds/02#tai-yang"]
    },
    {
      id: "wu-qu",
      hant: "武曲", /* 武曲 */
      pinyin: "Wǔqū",
      rubyPinyin: ["wǔ", "qū"],
      literal: "Military Song",
      standard: "Wu Qu",
      editorial: { title: "The Finance General", editorial: true },
      essence: "Earns through discipline and decisiveness.",
      element: "yin-metal",
      dipper: "north",
      series: { group: "zi-wei-group", configuration: null, groupEditorial: "The Emperor's Court" },
      transforms: ["lu", "quan", "ke", "ji"],
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#wu-qu"]
    },
    {
      id: "tian-tong",
      hant: "天同", /* 天同 */
      pinyin: "Tiāntóng",
      rubyPinyin: ["tiān", "tóng"],
      literal: "Heavenly Sameness",
      standard: "Tian Tong",
      editorial: { title: "The Harmony Star", editorial: true },
      essence: "Content, gentle, allergic to conflict.",
      element: "yang-water",
      dipper: "north",
      series: { group: "zi-wei-group", configuration: "ji-yue-tong-liang", groupEditorial: "The Emperor's Court" },
      transforms: ["lu", "quan", "ji"],
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#tian-tong"]
    },
    {
      id: "lian-zhen",
      hant: "廉貞", /* 廉貞 */
      pinyin: "Liánzhēn",
      rubyPinyin: ["lián", "zhēn"],
      literal: "Chaste Purity / Upright Virtue",
      standard: "Lian Zhen",
      editorial: { title: "The Diplomat", editorial: true },
      essence: "Charming navigator of politics and gray zones.",
      element: "yin-fire",
      dipper: "north",
      series: { group: "zi-wei-group", configuration: null, groupEditorial: "The Emperor's Court" },
      transforms: ["lu", "ji"],
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#lian-zhen"]
    },
    {
      id: "tian-fu",
      hant: "天府", /* 天府 */
      pinyin: "Tiānfǔ",
      rubyPinyin: ["tiān", "fǔ"],
      literal: "Heavenly Treasury / Storehouse",
      standard: "Tian Fu",
      editorial: { title: "The Treasury Star", editorial: true },
      essence: "The steward who keeps and grows what exists.",
      element: "yang-earth",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: null, groupEditorial: "The Treasury's Court" },
      transforms: [],
      schoolNote: "Ruling C1: Tian Fu undergoes no transformation in the orthodox Northern (Qin Tian Pai) table.",
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "purple-star-hub/PSA-TERMINOLOGY.md#C1", "zwds/02#tian-fu"]
    },
    {
      id: "tai-yin",
      hant: "太陰", /* 太陰 */
      pinyin: "Tàiyīn",
      rubyPinyin: ["tài", "yīn"],
      literal: "The Great Yin / The Moon",
      standard: "Tai Yin (Moon Star)",
      editorial: { title: "The Moon Star", editorial: true },
      essence: "Quiet accumulator, deep feeler.",
      element: "yin-water",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: "ji-yue-tong-liang", groupEditorial: "The Treasury's Court" },
      transforms: ["lu", "quan", "ke", "ji"],
      schoolNote: "Ruling C5: kept in the Tian Fu group (Southern Dipper). Some classifications treat the Sun and Moon as central luminaries rather than Dipper members.",
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "purple-star-hub/PSA-TERMINOLOGY.md#C5", "zwds/02#tai-yin"]
    },
    {
      id: "tan-lang",
      hant: "貪狼", /* 貪狼 */
      pinyin: "Tānláng",
      rubyPinyin: ["tān", "láng"],
      literal: "Greedy Wolf",
      standard: "Tan Lang",
      editorial: { title: "The Desire Star", editorial: true },
      essence: "Wants much, charms easily, does many things.",
      element: "yang-wood",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: "sha-po-lang", groupEditorial: "The Treasury's Court" },
      transforms: ["lu", "quan", "ji"],
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#tan-lang"]
    },
    {
      id: "ju-men",
      hant: "巨門", /* 巨門 */
      pinyin: "Jùmén",
      rubyPinyin: ["jù", "mén"],
      literal: "Great Gate / Giant Door",
      standard: "Ju Men",
      editorial: { title: "The Dark Gate", editorial: true },
      essence: "Sees what is hidden; lives by words.",
      element: "yin-water",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: null, groupEditorial: "The Treasury's Court" },
      transforms: ["lu", "quan", "ji"],
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#ju-men"]
    },
    {
      id: "tian-xiang",
      hant: "天相", /* 天相 */
      pinyin: "Tiānxiàng",
      rubyPinyin: ["tiān", "xiàng"],
      literal: "Heavenly Minister / Seal",
      standard: "Tian Xiang",
      editorial: { title: "The Prime Minister", editorial: true },
      essence: "The trusted executor and mediator.",
      element: "yang-water",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: null, groupEditorial: "The Treasury's Court" },
      transforms: [],
      schoolNote: "Ruling C1: Tian Xiang undergoes no transformation in the orthodox Northern (Qin Tian Pai) table.",
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "purple-star-hub/PSA-TERMINOLOGY.md#C1", "zwds/02#tian-xiang"]
    },
    {
      id: "tian-liang",
      hant: "天梁", /* 天梁 */
      pinyin: "Tiānliáng",
      rubyPinyin: ["tiān", "liáng"],
      literal: "Heavenly Roof Beam",
      standard: "Tian Liang",
      editorial: { title: "The Elder Star", editorial: true },
      essence: "The protector who has seen it all.",
      element: "yang-earth",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: "ji-yue-tong-liang", groupEditorial: "The Treasury's Court" },
      transforms: ["lu", "quan", "ke"],
      overinterpretationWarning: "The shelter quality (化蔭) is a described tendency in classical texts, never a promise of rescue or protection.",
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#tian-liang"]
    },
    {
      id: "qi-sha",
      hant: "七殺", /* 七殺 */
      pinyin: "Qīshā",
      rubyPinyin: ["qī", "shā"],
      literal: "Seven Killings",
      standard: "Qi Sha",
      editorial: { title: "The Warrior", editorial: true },
      essence: "Confronts directly; thrives on pressure.",
      element: "yang-metal",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: "sha-po-lang", groupEditorial: "The Treasury's Court" },
      transforms: [],
      sourceNote: "Qi Sha receives none of the four transformations in the orthodox Northern (Qin Tian Pai) stem table (docs/zwds/04).",
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#qi-sha", "zwds/04"]
    },
    {
      id: "po-jun",
      hant: "破軍", /* 破軍 */
      pinyin: "Pòjūn",
      rubyPinyin: ["pò", "jūn"],
      literal: "Army Breaker",
      standard: "Po Jun",
      editorial: { title: "The Vanguard", editorial: true },
      essence: "Breaks the old formation so the new can exist.",
      element: "yin-water",
      dipper: "south",
      series: { group: "tian-fu-group", configuration: "sha-po-lang", groupEditorial: "The Treasury's Court" },
      transforms: ["lu", "quan"],
      placements: null, /* wave 2 */
      source: ["purple-star-hub/PSA-TERMINOLOGY.md#1.3", "zwds/02#po-jun"]
    }
  ];

  /* Star groupings ladder, PSA-TERMINOLOGY §1.3. Editorial titles stay flagged. */
  var GROUPS = {
    "zi-wei-group": {
      hant: "紫微星系", pinyin: "Zǐwēi xīngxì", rubyPinyin: ["zǐ", "wēi", "xīng", "xì"], literal: "Zi Wei star system",
      standard: "Zi Wei group (Northern Dipper group)",
      editorial: { title: "The Emperor's Court", editorial: true }
    },
    "tian-fu-group": {
      hant: "天府星系", pinyin: "Tiānfǔ xīngxì", rubyPinyin: ["tiān", "fǔ", "xīng", "xì"], literal: "Tian Fu star system",
      standard: "Tian Fu group (Southern Dipper group)",
      editorial: { title: "The Treasury's Court", editorial: true }
    },
    "sha-po-lang": {
      hant: "殺破狼", pinyin: "Shā Pò Láng", rubyPinyin: ["shā", "pò", "láng"], literal: "Kill-Break-Wolf",
      standard: "Sha-Po-Lang configuration",
      editorial: { title: "The Vanguard Trio", editorial: true }
    },
    "ji-yue-tong-liang": {
      hant: "機月同梁", pinyin: "Jī Yuè Tóng Liáng", rubyPinyin: ["jī", "yuè", "tóng", "liáng"], literal: "Mechanism-Moon-Sameness-Beam",
      standard: "Ji-Yue-Tong-Liang configuration",
      editorial: { title: "The Four of Stability", editorial: true }
    }
  };

  var byId = {};
  STARS.forEach(function (s) { byId[s.id] = s; });


  /* ---- Wave 2: per-palace placements (14 stars x 12 palaces x 4 layers). ----
     zi-wei beginner layer from the teaser; the other 13 stars and all deeper layers
     extracted from each star page's "Across the 12 Palaces" grid + docs/zwds/02,
     rewritten to non-deterministic voice per PSA-TERMINOLOGY §3.2/§7. */
  var PLACEMENTS = {
    "zi-wei": {
      "placements": {
        "ming-gong": {
          "beginner": "The Emperor's own throne, its most auspicious seat. You preside over your life with a natural authority others defer to, so long as you gather a court and never rule alone.",
          "intermediate": "Zi Wei in the Life Palace sets the tone for the whole chart, so the reading leans on which supporting stars sit with it and answer from the triangle. Alone it can read as dignified distance.",
          "practitioner": "Check the Life court for helpers such as Zuo Fu and You Bi; the classical caution 尊而不孤 means the throne works well only when it is supported.",
          "misread": "Read as a promise of status or a born leader, when it describes a way of carrying responsibility that still depends on the rest of the court."
        },
        "xiong-di-gong": {
          "beginner": "Among peers and siblings you are the one who sets the structure. Cooperation flows when you lead by dignity rather than decree.",
          "intermediate": "The Emperor in the Peer Circle organises the people around it, and the mirror with the Friends room shows whether that steadiness is returned.",
          "practitioner": "Read it with its opposite, the Friends Palace, to see whether the native leads peers or quietly manages them from behind.",
          "misread": "Taken to mean powerful siblings, when it more often describes the native's own organising role among equals."
        },
        "fu-qi-gong": {
          "beginner": "You seek a partner of standing and want to steer the union. Marriage thrives when the throne is shared, not defended.",
          "intermediate": "Zi Wei in the Spouse Palace looks for a capable, respected partner, and the balance of the union depends on whether the native can share the seat rather than rule it.",
          "practitioner": "Read across to the Career Palace, its mirror, since a Zi Wei marriage often mixes partnership with status and public role.",
          "misread": "Taken as a promise of a high-status marriage, when it describes what the native looks for and the sharing the union asks of them."
        },
        "zi-nu-gong": {
          "beginner": "You raise children and creative work to high standards. The legacy is built to last, though the court needs room to grow on its own.",
          "intermediate": "The Emperor in the Legacy Garden sets a high bar for children and creations, and the reading watches whether that structure gives them room to become their own.",
          "practitioner": "Read with the Property Palace opposite, which colours how the native holds and passes on what they build.",
          "misread": "Read as a promise of accomplished children, when it describes the native's standards and how much room they leave others to grow."
        },
        "cai-bo-gong": {
          "beginner": "Wealth arrives through status and position, not speculation. You scale what already exists, and money follows rank.",
          "intermediate": "Zi Wei in the Treasury earns through standing and stewardship rather than risk, and the Fortune mirror shows whether that money buys real contentment.",
          "practitioner": "Read across to the Fortune Palace on the 財福線 axis, since a Zi Wei Wealth reading is about how position converts to security, not about a fixed sum.",
          "misread": "Read as a promise of riches, when it describes how money tends to arrive and be managed."
        },
        "ji-e-gong": {
          "beginner": "A steady constitution that governs itself well, as long as the sovereign rests. Strain tends to show when you carry the whole court alone.",
          "intermediate": "The Emperor in the Constitution Map reads as a generally robust make-up whose weak point is overwork and carrying too much, checked against the Parents mirror.",
          "practitioner": "Read with the Parents Palace opposite on the 父疾線 axis, and treat every health note as a described tendency, never a diagnosis.",
          "misread": "Taken as a promise of good health, when it points to the strain that comes from refusing to delegate."
        },
        "qian-yi-gong": {
          "beginner": "Abroad and in public you are received as someone of rank. You flourish on a larger stage than home alone.",
          "intermediate": "Zi Wei in the Travel Palace, the direct mirror of the Life Palace, describes a person who reads as significant away from home and often grows into a bigger arena.",
          "practitioner": "Read it tightly with the Life Palace opposite, since the Travel seat is the strongest single companion to who the native is.",
          "misread": "Read as constant travel, when it is more about the standing and reception the native carries into new rooms."
        },
        "nu-pu-gong": {
          "beginner": "You attract loyal supporters and capable allies. A real court forms around you when you lead them with dignity.",
          "intermediate": "The Emperor among friends and allies gathers capable people, and the Siblings mirror shows whether those alliances are mutual or one-directional.",
          "practitioner": "Read with the Siblings Palace opposite to weigh loyalty against the classical risk that a lone sovereign attracts followers but few equals.",
          "misread": "Read as a promise of loyal helpers, when it depends on whether the native leads them with dignity or by command."
        },
        "guan-lu-gong": {
          "beginner": "The throne finds its hall. You rise to command inside large organisations and scale what others began. Authority is your vocation.",
          "intermediate": "Zi Wei in the Career Palace is close to home for the Emperor: it points to institutional authority, and the Spouse mirror shows the private cost of that public seat.",
          "practitioner": "Read across to the Spouse Palace opposite, since a strong Career throne often trades against attention at home.",
          "misread": "Read as a promise of high office, when it describes a vocation for authority that still needs the chart's support to arrive."
        },
        "tian-zhai-gong": {
          "beginner": "You build a stable, well ordered home and holdings that last. The house you keep becomes the seat of the family fortune.",
          "intermediate": "The Emperor in the Property Palace tends toward solid, well kept holdings, and the Children mirror links what is built to what is passed on.",
          "practitioner": "Read with the Children Palace opposite on the 子田線 axis, which ties the home to legacy and creative output.",
          "misread": "Read as a promise of property wealth, when it describes the ordering instinct the native brings to home and holdings."
        },
        "fu-de-gong": {
          "beginner": "Inner sovereignty. Contentment comes from meaning and virtue rather than possessions, and this palace steadies all the others.",
          "intermediate": "Zi Wei in the Soul Palace seeks contentment through purpose and dignity, and because the Fortune Palace colours every other room, this seat steadies the whole chart.",
          "practitioner": "Read it early, since classical protocol checks the Fortune Palace before the family rooms, and read it across the Wealth mirror on the 財福線 axis.",
          "misread": "Read as a promise of peace of mind, when it describes where the native's contentment tends to come from."
        },
        "fu-mu-gong": {
          "beginner": "Classically read as standing in the family line: either elders of rank, or you growing into that role. Ties to elders and institutions carry weight.",
          "intermediate": "The Emperor in the Origin Gate points to authority in the family line, whether inherited from elders or grown into by the native, and reads with the Health mirror.",
          "practitioner": "Read with the Health Palace opposite on the 父疾線 axis, and keep parent readings to described tendencies rather than verdicts about family.",
          "misread": "Read as a fixed claim about the parents, when it describes standing and authority in the family line that the native may also grow into."
        }
      },
      "placementsSource": "site/indexv6.html teaser READ data (beginner layer, fu-mu-gong corrected per PSA-TERMINOLOGY §3.2 item 7); intermediate/practitioner/misread from docs/zwds/02 §1 and PSA-TERMINOLOGY §1.3."
    },
    "tian-ji": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to think fast and adapt fast, reading patterns and angles other people walk past. The restlessness that comes with a mind that never settles is the flip side of the same gift.",
          "intermediate": "Tian Ji's nature is movement and analysis, so in the Life Palace it shows up as a mind that categorizes automatically and keeps searching for the deeper problem inside a simple one. Whether that reads as sharp strategy or anxious overthinking often depends on the star's brightness and the wider chart.",
          "practitioner": "Check the Career and Wealth palaces in the triangle to see where all that mental motion actually lands, since Tian Ji on its own tends to plan more than it commits.",
          "misread": "Reading the restlessness as instability or flakiness misses that the same trait is what makes this person a strong planner and pattern-reader."
        },
        "xiong-di-gong": {
          "beginner": "Sibling and peer bonds here tend to run on shared intelligence and mutual respect more than on open warmth. There can be a competitive, comparing edge between you and the people closest to your level.",
          "intermediate": "Because Tian Ji connects through the mind, this room favours peers you can think with, and the classical texts even name it the Lord of Siblings. Bonds shift and re-form as your interests move, rather than staying fixed for life.",
          "practitioner": "Read this palace alongside the Life Palace and the opposite room, since Tian Ji's sibling significations often say as much about your own restlessness as about the siblings themselves.",
          "misread": "Assuming a lack of visible warmth means a lack of closeness overlooks that intellectual respect is how this placement expresses loyalty."
        },
        "fu-qi-gong": {
          "beginner": "You tend to be drawn to a partner who is clever, adaptable, and mentally engaging, and intellectual chemistry matters a lot to you. Classical readings associate this placement with marrying later or with relationships that change as both people grow.",
          "intermediate": "Tian Ji's changeable nature can show up here as a partnership that needs conversation and novelty to stay alive, and different schools read the shifting quality as either healthy evolution or difficulty settling. The reading depends heavily on brightness and on what sits in the opposite palace.",
          "practitioner": "Always read the Spouse Palace together with its opposite career axis and the triangle before drawing conclusions, since Tian Ji alone describes a tendency toward change, not a verdict on the marriage.",
          "misread": "Taking talk of later marriage or multiple relationships as a fixed prediction ignores that these are tendencies classical readers describe, not fixed outcomes."
        },
        "zi-nu-gong": {
          "beginner": "This placement is classically linked with clever, quick-minded children, and with a legacy built on ideas rather than possessions. Teaching, mentoring, and passing on how you think can become part of what you leave behind.",
          "intermediate": "Tian Ji's intelligence in the Children Palace often reads as a bond formed through curiosity and learning, and the significations extend to students and disciples as much as to biological children. How it expresses depends on the wider chart, not on this star alone.",
          "practitioner": "Check the opposite palace and the triangle for the fuller picture, since Children Palace readings in this system speak to creativity and mentorship, not only to whether or how many children arrive.",
          "misread": "Treating the star as a count or promise of children mistakes a description of tendency and legacy for a literal prediction."
        },
        "cai-bo-gong": {
          "beginner": "Money here tends to come through ideas and services such as consulting, strategy, planning, and analysis. Income often moves in more than one stream and rises and falls with where your attention goes.",
          "intermediate": "Because Tian Ji earns through the mind, this room favours knowledge work over steady fixed pay, and the fluctuation reflects the star's restless, adaptive nature. Brightness and the wider chart shape whether that variability feels like opportunity or instability.",
          "practitioner": "Read the Wealth Palace with its triangle, especially the Career and Property palaces, to see whether the mental movement is being turned into something that accumulates.",
          "misread": "Reading fluctuating income as failure misses that variety and adaptation are how this placement is designed to earn."
        },
        "ji-e-gong": {
          "beginner": "The area classically watched here is the nervous system, with mental overload, sleep, and anxiety as the things to keep an eye on. Joints and mobility are also worth tending.",
          "intermediate": "Tian Ji's constant mental motion is the thread, so classical readings associate this placement with strain that starts in the mind and shows up in the body when the thinking never stops. These are patterns to be aware of, not fixed outcomes.",
          "practitioner": "Treat this as a prompt to check the wider chart and the opposite palace rather than a diagnosis, and note where rest and mental quiet would ease the load.",
          "misread": "Turning a note about nervous-system sensitivity into a fixed medical prediction goes well beyond what the placement actually says."
        },
        "qian-yi-gong": {
          "beginner": "You tend to come alive with movement and change, and new environments stimulate rather than drain you. This is often the makeup of a natural traveler who does well abroad.",
          "intermediate": "Tian Ji's restlessness finds a good outlet in the Travel Palace, where adapting to new places becomes a strength rather than a strain. The wider chart shapes whether that movement is productive exploration or scattered drifting.",
          "practitioner": "Read this against the Life Palace it opposes, since the Travel Palace describes how you meet the outer world and often colours the Life reading more than beginners expect.",
          "misread": "Assuming this only means literal travel overlooks that the palace is really about change, environment, and how you move through the world."
        },
        "nu-pu-gong": {
          "beginner": "Your circle here tends to be built around people who stimulate you intellectually, and it evolves as you evolve. You value cleverness in the people around you almost above anything else.",
          "intermediate": "Because Tian Ji bonds through the mind, the Network Palace favours associates you can trade ideas with, and the circle naturally refreshes as your thinking changes. Brightness and the wider chart shape whether that means a rich network or a restless one.",
          "practitioner": "Read this palace with its opposite wealth axis, since who you gather often connects to how opportunity and income reach you.",
          "misread": "Reading an evolving social circle as disloyalty misses that changing company is how this placement grows."
        },
        "guan-lu-gong": {
          "beginner": "Work that suits you here involves strategy, planning, analysis, and advisory roles, often in consulting, research, or technology. The career itself tends to involve constant change and continuous learning.",
          "intermediate": "Tian Ji in the Career Palace channels the restless, pattern-seeing mind into roles where you figure things out and others carry them out. How far it goes depends on brightness and on the Wealth and Life palaces in its triangle.",
          "practitioner": "Check the Wealth Palace opposite and the triangle to see whether the strategic mind is being paid and positioned well, since Tian Ji advises best when someone else executes.",
          "misread": "Expecting one fixed lifelong job overlooks that change and re-learning are built into how this placement works."
        },
        "tian-zhai-gong": {
          "beginner": "This placement is linked with multiple homes or frequent moves, and with a home that works as a thinking space more than a settled sanctuary. Accumulating property may simply not be a priority.",
          "intermediate": "Tian Ji's changeable nature shows up in the Property Palace as movement and rearrangement rather than putting down heavy roots. The wider chart shapes whether that reads as freedom or as never quite settling.",
          "practitioner": "Read this with its opposite palace and the triangle, since the Property Palace in this system also speaks to family stability and stored resources, not only to real estate.",
          "misread": "Taking frequent moves as instability misses that a flexible relationship with home suits this mind."
        },
        "fu-de-gong": {
          "beginner": "Your inner life here tends toward constant analysis, and contentment comes through learning and understanding. Spiritual seeking often runs through philosophy and study rather than devotion or stillness.",
          "intermediate": "Tian Ji's ceaseless thinking lives most openly in the Fortune Palace, where the mind both feeds and unsettles your sense of peace. Whether it brings restlessness or genuine depth depends on brightness and the wider chart.",
          "practitioner": "Read the Fortune Palace with the Wealth Palace it opposes, since inner ease and how resources flow are traditionally read together.",
          "misread": "Assuming a busy mind rules out peace overlooks that, for this placement, understanding is the path to calm rather than its enemy."
        },
        "fu-mu-gong": {
          "beginner": "This placement is linked with clever parents and with a relationship to authority that carries intellectual challenge. You may have felt misunderstood by conventional authority figures.",
          "intermediate": "Tian Ji's fast mind in the Parents Palace often reads as a young mind outpacing the room, where the bond with elders runs through ideas and questioning. The wider chart shapes whether that becomes friction or genuine respect.",
          "practitioner": "Read this palace with its opposite and the triangle, since the Parents Palace also touches your relationship with institutions and superiors, not only your literal parents.",
          "misread": "Reading intellectual friction as a broken relationship misses that questioning is how this placement engages the people it respects."
        }
      },
      "placementsSource": "star page 'Across the 12 Palaces' grid + 'In the Command Palace' and Essence prose + docs/zwds/02 §2"
    },
    "tai-yang": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to be generous, outward-facing, and warm, giving freely of your time and energy. The shadow is running yourself down by giving too much, so learning when to withdraw becomes lifelong work.",
          "intermediate": "Tai Yang radiates outward like the sun, so in the Life Palace it shows up as a public warmth that draws people in and a pull toward visible contribution. Classical readings note that a daytime birth tends to express this brightness more fully, though the whole chart still matters.",
          "practitioner": "Check the opposite and triangle palaces to see where the giving is replenished, since Tai Yang's central risk is shining for everyone and leaving nothing for itself.",
          "misread": "Reading the generosity as endless strength misses that depletion, not weakness, is this star's real vulnerability."
        },
        "xiong-di-gong": {
          "beginner": "This placement is classically tied to male siblings, older brothers in particular, and to generous peer relationships. There is a tendency to give and sacrifice for siblings without keeping score.",
          "intermediate": "Tai Yang's warmth in the Siblings Palace reads as brotherhood in the widest sense, loyalty offered freely rather than tracked. How fully it expresses depends on brightness and the wider chart.",
          "practitioner": "Note the classical link to male figures here and read the palace with its opposite before drawing conclusions about any specific sibling.",
          "misread": "Taking the male-sibling emphasis as a fixed rule about who your siblings are reads a tendency as a certainty."
        },
        "fu-qi-gong": {
          "beginner": "Your partner here tends to be public-facing, and possibly older or paternal in energy, with the relationship tied to duty and public life. Classical readings caution that career or civic obligations can overshadow the marriage.",
          "intermediate": "Tai Yang's outward pull can mean the sun's light falls on the wider world before it falls on a partner, so different schools read this as devotion to purpose or as a partner left in shadow. Brightness and the opposite palace shape which way it leans.",
          "practitioner": "Always read the Spouse Palace with its opposite and the triangle, since Tai Yang here describes a tendency for public life to compete with private, not a fixed outcome for the marriage.",
          "misread": "Treating talk of an eclipsed partner as a certain troubled marriage mistakes a caution for a verdict."
        },
        "zi-nu-gong": {
          "beginner": "This placement is classically linked with generous, gifted children, and it is often noted as significant for sons. The legacy tends to be one of public impact, including students and disciples who become visible.",
          "intermediate": "Tai Yang's radiance in the Children Palace often reads as offspring or protégés who carry a public-facing mission forward. The significations describe tendency and legacy, not a count or promise of children.",
          "practitioner": "Read this with the opposite palace and the triangle, since the Children Palace speaks to creative legacy and mentorship as much as to literal children.",
          "misread": "Reading the emphasis on sons or gifted children as a promise turns a described tendency into a prediction it cannot support."
        },
        "cai-bo-gong": {
          "beginner": "Money here tends to arrive through public service, government, corporate leadership, and large institutions. Income can be generous, but so is spending, so accumulation takes intention.",
          "intermediate": "Tai Yang gives outward, so in the Wealth Palace money flows in and back out with equal ease, and wealth tends to come tied to honour and recognition more than to hoarding. The wider chart shapes whether the overflow is managed or simply spent.",
          "practitioner": "Read the Wealth Palace with its triangle to see where the outflow can be checked, since Tai Yang rarely accumulates without a deliberate structure.",
          "misread": "Reading generous income as automatic wealth overlooks that the same generosity carries money straight back out."
        },
        "ji-e-gong": {
          "beginner": "The areas classically watched here are the eyes, especially the left eye, and the heart and cardiovascular system. The signature pattern to notice is depletion from over-giving.",
          "intermediate": "Tai Yang is the sun, so classical readings associate this placement with the strain of burning bright for others, and they name rest as the correction rather than an indulgence. These are areas to be aware of, not fixed outcomes.",
          "practitioner": "Treat this as a cue to check the wider chart and the opposite palace rather than a diagnosis, and note where genuine rest would ease the pattern.",
          "misread": "Turning the classical note about eyes or heart into a fixed medical prediction goes far beyond what the placement says."
        },
        "qian-yi-gong": {
          "beginner": "The sun shines abroad here, so recognition in foreign or distant settings tends to come naturally. Travel often connects to public service, international leadership, and cross-cultural visibility.",
          "intermediate": "Tai Yang's outward radiance suits the Travel Palace, where you may be better regarded at a distance than close to home. The wider chart shapes how fully that visibility lands.",
          "practitioner": "Read this against the Life Palace it opposes, since the Travel Palace describes how the world receives you and often colours the self-reading.",
          "misread": "Assuming this only means literal trips overlooks that the palace is about your standing and reach in the wider, outer world."
        },
        "nu-pu-gong": {
          "beginner": "You tend to attract many supporters and admirers, and to build community and loyalty without much effort. The shadow is that generosity can draw in people who lean on you.",
          "intermediate": "Tai Yang's warmth makes the Network Palace a natural gathering point, so the caution is discernment rather than reach. Brightness and the wider chart shape whether the crowd gives back or only takes.",
          "practitioner": "Read this palace with its opposite wealth axis, since who gathers around you often connects to how support and resources arrive.",
          "misread": "Reading a large following as pure benefit overlooks the placement's own caution about attracting dependency."
        },
        "guan-lu-gong": {
          "beginner": "Work that suits you here serves the public at scale, including government, politics, administration, law, education, and healthcare. Leadership and visibility are the natural orientation.",
          "intermediate": "Tai Yang is classically the Career Lord, so the Career Palace is close to home for it, expressing as public leadership built through responsibility and visible contribution. How far it reaches depends on brightness and the wider chart.",
          "practitioner": "Check the Wealth Palace opposite and the triangle to confirm the public role is supported, since Tai Yang seeks genuine influence more than a title alone.",
          "misread": "Reading the drive for visibility as ego overlooks that this placement is built to lead by serving in public."
        },
        "tian-zhai-gong": {
          "beginner": "The home here tends to be large, warm, and open to many people, with generosity of space reflecting the star's nature. Significant property may not accumulate, simply because what comes in tends to flow back out.",
          "intermediate": "Tai Yang gives outward even at home, so the Property Palace favours a welcoming household over careful hoarding of assets. The wider chart shapes whether that openness costs long-term accumulation.",
          "practitioner": "Read this with its opposite palace and the triangle, since the Property Palace also speaks to family stability and stored resources, not only real estate.",
          "misread": "Taking a generous, open home as a sign of wealth overlooks that this placement spends space and money as freely as it earns them."
        },
        "fu-de-gong": {
          "beginner": "Your inner life here is oriented toward service and contribution, and genuine fulfillment comes through a purpose larger than yourself. Restlessness tends to appear when there is no meaningful cause to serve.",
          "intermediate": "Tai Yang needs a mission, so in the Fortune Palace peace depends on having somewhere to shine rather than on withdrawing from the world. The wider chart shapes whether that longing feeds contentment or restlessness.",
          "practitioner": "Read the Fortune Palace with the Wealth Palace it opposes, since inner ease and how resources flow are traditionally read as one axis.",
          "misread": "Assuming contentment should come from rest alone misses that this placement finds peace through purpose, not withdrawal."
        },
        "fu-mu-gong": {
          "beginner": "The father figure is classically significant and formative here, whether present and commanding or defining by absence. That relationship with paternal authority shapes how you understand leadership and public duty.",
          "intermediate": "Tai Yang carries the father and the male principle, so the Parents Palace often reads through the father's influence on your sense of authority. The wider chart shapes whether that influence is felt as support or as pressure.",
          "practitioner": "Read this palace with its opposite and the triangle, since the Parents Palace also touches your relationship with superiors and institutions, not only your literal father.",
          "misread": "Reading the father emphasis as a fixed story about your family mistakes a classical significance for a certainty."
        }
      },
      "placementsSource": "star page 'Across the 12 Palaces' grid + Life Palace and Essence prose + docs/zwds/02 §3"
    },
    "wu-qu": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to be self-reliant, disciplined, and set on building through your own effort, with decisiveness that comes instinctively. The shadow is rigidity, and a solitude that can harden into isolation if left unexamined.",
          "intermediate": "Wu Qu is the finance general, so in the Life Palace it shows up as steady execution and results earned rather than handed over. Whether that reads as quiet strength or cold stubbornness depends on brightness and the wider chart.",
          "practitioner": "Check the opposite and triangle palaces for softening or supporting influences, since Wu Qu alone tends toward a solitary, single-minded focus that can crowd out the emotional dimension.",
          "misread": "Reading the self-reliance as pure strength overlooks that isolation is this star's real cost."
        },
        "xiong-di-gong": {
          "beginner": "Peer and sibling bonds here tend to rest on respect for competence rather than on open warmth, and there may be fewer siblings. Trust is earned and demonstrated rather than assumed.",
          "intermediate": "Wu Qu values proven capability, so in the Siblings Palace relationships are transactional in the best sense, built on reliability rather than sentiment. Brightness and the wider chart shape whether that feels solid or distant.",
          "practitioner": "Read this palace with its opposite before drawing conclusions, since Wu Qu's sibling significations describe the quality of the bond more than a fixed sibling count.",
          "misread": "Reading a lack of open warmth as a lack of loyalty misses that earned respect is how this placement stays committed."
        },
        "fu-qi-gong": {
          "beginner": "Classical readings associate this placement with marrying later or with a partnership that takes work, and with a partner who needs to be capable and independent. Your own self-sufficiency can crowd the space a relationship needs.",
          "intermediate": "Wu Qu's solitary, self-reliant nature can leave little room for another person, so different schools read this room as demanding a partnership of parallel strength. Some classical texts note harsher solitude patterns here, which careful readers treat as tendencies to weigh against the whole chart, not as fixed fates.",
          "practitioner": "Always read the Spouse Palace with its opposite and the triangle, and hold the darker classical notes as one factor among many rather than a verdict on the marriage.",
          "misread": "Taking the old talk of solitude or loss as a fixed outcome mistakes a classical caution for a prediction."
        },
        "zi-nu-gong": {
          "beginner": "This placement is classically linked with children who are disciplined, capable, and carry a strong work ethic. The parent-child relationship may run more formal than demonstrative.",
          "intermediate": "Wu Qu tends to show love through provision and high standards rather than open affection, so in the Children Palace the bond often expresses as steadiness and support rather than softness. The significations describe tendency, not a count or promise of children.",
          "practitioner": "Read this with the opposite palace and the triangle, since the Children Palace speaks to the quality of the bond and to legacy, not only to whether or how many children arrive.",
          "misread": "Reading a formal, less demonstrative style as a lack of love misses how this placement actually shows care."
        },
        "cai-bo-gong": {
          "beginner": "This is one of the strong wealth placements in the system, built on disciplined accumulation through fields like finance, investment, and precision work. Money here tends to be earned, tracked, and deliberately grown rather than gifted.",
          "intermediate": "Wu Qu is the finance general, so in the Wealth Palace it favours methodical building over luck or windfall. How fully that potential expresses depends on brightness and on the Career and Property palaces in its triangle.",
          "practitioner": "Note the classical caution that Wu Qu meeting the obstruction transformation is a commonly discussed difficult configuration, so always check the four transformations before reading this as smooth wealth.",
          "misread": "Treating a strong wealth placement as certain riches ignores that the transformations and the wider chart can turn discipline into obstruction."
        },
        "ji-e-gong": {
          "beginner": "The areas classically watched here are the metal organs, the lungs, large intestine, and respiratory system. Surgery themes can appear in classical readings, whether as a profession such as surgery or as a health event to stay aware of.",
          "intermediate": "Wu Qu's metal nature is the thread, and classical readings note that the body responds well to discipline and consistent routine while neglect tends to cost more here than elsewhere. These are areas to be aware of, not fixed outcomes.",
          "practitioner": "Treat this as a prompt to check the wider chart and the four transformations rather than a diagnosis, and note where steady routine would support the body.",
          "misread": "Turning the classical mention of surgery or the lungs into a fixed prediction goes well beyond what the placement actually says."
        },
        "qian-yi-gong": {
          "beginner": "Success here comes through disciplined work in foreign or distant settings, often in military, financial, or engineering fields. Movement is purposeful rather than for pleasure.",
          "intermediate": "Wu Qu brings results precisely because its travel is focused, so in the Travel Palace distance serves the work rather than relaxation. The wider chart shapes how far that focused movement carries.",
          "practitioner": "Read this against the Life Palace it opposes, since the Travel Palace describes how you meet the outer world and often colours the self-reading.",
          "misread": "Expecting leisure travel from this placement overlooks that its movement is about purpose and results, not rest."
        },
        "nu-pu-gong": {
          "beginner": "Your circle here tends to be made of competent, professional, and proven people. Relationships are built on demonstrated merit and kept through mutual respect.",
          "intermediate": "Wu Qu does not gather for social pleasure, so in the Network Palace incompetence is not tolerated for long and ties form around capability. Brightness and the wider chart shape whether that network is strong or simply narrow.",
          "practitioner": "Read this palace with its opposite wealth axis, since who you keep close often connects to how resources and results reach you.",
          "misread": "Reading a small, selective circle as coldness misses that proven merit is this placement's basis for trust."
        },
        "guan-lu-gong": {
          "beginner": "Work that suits you here demands precision, discipline, and decisive execution, in fields like finance, engineering, law, or military strategy. Authority is earned through demonstrated competence rather than politics or charisma.",
          "intermediate": "Wu Qu leads by capability, so the Career Palace expresses as command earned through results rather than persuasion. How far it reaches depends on brightness and on the Wealth and Life palaces in its triangle.",
          "practitioner": "Check the Wealth Palace opposite and the triangle, and watch the transformations, since Wu Qu's career and money significations are tightly linked and rise or stall together.",
          "misread": "Reading a lack of political skill as weakness overlooks that this placement commands through competence, not charm."
        },
        "tian-zhai-gong": {
          "beginner": "Property here tends to be accumulated through disciplined saving and deliberate investment, and to be functional and well-built. Self-acquisition is more likely than inheritance.",
          "intermediate": "Wu Qu's discipline shows up in the Property Palace as a home that is efficient, quality, and maintained with care. The wider chart shapes how much is built and held over time.",
          "practitioner": "Read this with its opposite palace and the triangle, since the Property Palace also speaks to family stability and stored resources, not only to real estate.",
          "misread": "Expecting inherited wealth from this placement overlooks that its property is characteristically built rather than received."
        },
        "fu-de-gong": {
          "beginner": "Your inner life here runs on discipline and quiet, with contentment arriving through achievement and self-mastery more than through pleasure or connection. Any spiritual life tends toward practice and craft.",
          "intermediate": "Wu Qu finds peace in form and refinement, so in the Fortune Palace ease comes from mastery rather than from letting go. The wider chart shapes whether that discipline brings calm or a restless drive to do more.",
          "practitioner": "Read the Fortune Palace with the Wealth Palace it opposes, since inner ease and how resources flow are traditionally read as one axis.",
          "misread": "Assuming contentment must come from relaxation misses that this placement finds peace through mastery and craft."
        },
        "fu-mu-gong": {
          "beginner": "This placement is linked with demanding parental standards that shaped your discipline, and with a parent relationship built on respect more than warmth. The high standards passed down are treated as the real inheritance.",
          "intermediate": "Wu Qu's exacting nature in the Parents Palace often reads as expectations that forged your work ethic, where whether that gift is accepted or resisted can shape much of the chart. The wider chart shapes whether it felt like pressure or foundation.",
          "practitioner": "Read this palace with its opposite and the triangle, since the Parents Palace also touches your relationship with superiors and institutions, not only your literal parents.",
          "misread": "Reading high standards as a cold or broken bond misses that demand, not distance, is how this placement expressed care."
        }
      },
      "placementsSource": "star page 'Across the 12 Palaces' grid + Life Palace and Essence prose + docs/zwds/02 §4"
    },
    "tian-tong": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to be gentle, easy-going, and warmly liked, someone who puts others at ease without trying. Your main work is finding enough ambition to match your good fortune, since comfort can keep you from asking more of yourself.",
          "intermediate": "Tian Tong is the blessed child, so in the Life Palace it shows up as warmth and fortunate momentum that carries you toward good places once you commit. Whether that ease becomes drive or drift depends on brightness and the wider chart.",
          "practitioner": "Check the opposite and triangle palaces for the push that Tian Tong lacks on its own, since this star's central risk is contentment sliding into inertia.",
          "misread": "Reading the easy-going nature as lack of capability misses that, once committed, this placement is unexpectedly effective."
        },
        "xiong-di-gong": {
          "beginner": "Sibling and peer bonds here tend to be warm, affectionate, and genuinely close. You often become the peacemaker who smooths over disputes before they escalate.",
          "intermediate": "Tian Tong bonds through shared ease rather than shared purpose, so in the Siblings Palace the dynamic is comfortable and non-competitive, with warmth that feels authentic. Brightness and the wider chart shape how central that closeness becomes.",
          "practitioner": "Read this palace with its opposite before drawing conclusions, since Tian Tong's sibling significations describe the tone of the bond more than a fixed sibling count.",
          "misread": "Reading the peacemaking as conflict-avoidance overlooks that the closeness it creates is genuine, not merely a way to dodge tension."
        },
        "fu-qi-gong": {
          "beginner": "Your partner here tends to be gentle, kind, and reliable, with the relationship built on warmth and comfortable sufficiency rather than drama. You may choose steadiness over intense passion when picking a partner.",
          "intermediate": "Tian Tong prefers harmony over conflict, so in the Spouse Palace the partnership tends to wear well over time, quiet and sustaining rather than spectacular. Different schools read the calm as either lasting comfort or a lack of spark, and the opposite palace helps tell which.",
          "practitioner": "Always read the Spouse Palace with its opposite and the triangle, since Tian Tong here describes a tendency toward gentle, steady partnership, not a fixed outcome for the marriage.",
          "misread": "Reading the absence of drama as an absence of depth misses that quiet sufficiency is what makes this partnership durable."
        },
        "zi-nu-gong": {
          "beginner": "This placement is classically linked with gentle, content children and a harmonious, unhurried family atmosphere. You tend to be an emotionally available parent who prioritises connection over pressure to perform.",
          "intermediate": "Tian Tong's warmth in the Children Palace often reads as a home that is playful and present, though the risk is too little structure, where everyone is content but no one is stretched to grow. The significations describe tendency, not a count or promise of children.",
          "practitioner": "Read this with the opposite palace and the triangle, since the Children Palace speaks to the family atmosphere and the bond as much as to whether or how many children arrive.",
          "misread": "Reading the easy warmth as ideal parenting overlooks the placement's own caution about a home with plenty of comfort and little challenge."
        },
        "cai-bo-gong": {
          "beginner": "Money here tends to arrive without excessive struggle, with enough appearing when it is most needed. The catch is that the same ease can make building and saving feel unnecessary.",
          "intermediate": "Tian Tong's fortune nature means the Wealth Palace rarely feels urgent, so the native can under-use real earning potential simply because there is always enough. When that ease is channeled into deliberate planning, the fortunate momentum tends to support it.",
          "practitioner": "Read the Wealth Palace with its triangle to see whether any structure is turning the easy flow into accumulation, since Tian Tong rarely builds without a deliberate reason to.",
          "misread": "Reading effortless-enough income as a reason not to plan overlooks how easily this placement leaves potential on the table."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate this placement with generally good vitality, with the main things to watch being the comforts, over-indulgence in food or drink and a sedentary tendency. Emotional wellbeing here is closely tied to a harmonious environment.",
          "intermediate": "Tian Tong's water constitution carries a fortunate, resilient quality in classical readings, while the vulnerabilities gather around ease rather than strain. When surrounded by conflict or chronic discomfort, this placement's wellbeing tends to suffer noticeably, so harmony functions almost as a health requirement.",
          "practitioner": "Treat this as a cue to check the wider chart and the opposite palace rather than a diagnosis, and note how much environment and emotional harmony shape the picture here.",
          "misread": "Reading the fortunate note as a promise of trouble-free health overlooks that the comforts themselves are what this placement most needs to watch."
        },
        "qian-yi-gong": {
          "beginner": "Travel here tends to be genuinely enjoyable and fortunate, and you adapt easily to new places and connect naturally with local people. Adventures abroad often go unusually well.",
          "intermediate": "Tian Tong's warmth is its native currency, so in the Travel Palace chance encounters and unexpected hospitality tend to open doors. Fields like tourism, hospitality, and international relations can suit this placement well, though the wider chart still shapes how it lands.",
          "practitioner": "Read this against the Life Palace it opposes, since the Travel Palace describes how the outer world meets you and often colours the self-reading.",
          "misread": "Reading the good fortune in travel as luck alone overlooks that the warmth this placement carries is what opens most of those doors."
        },
        "nu-pu-gong": {
          "beginner": "This is one of the most natural homes for Tian Tong, producing someone warm, widely liked, and surrounded by authentic friendships across different worlds. Your gift is bringing people together and introducing those who need to know each other.",
          "intermediate": "Tian Tong creates the warm environment where connections form on their own, so in the Network Palace help often returns years later from someone you once helped simply because it was pleasant to. Brightness and the wider chart shape how wide and reliable that circle becomes.",
          "practitioner": "Read this palace with its opposite wealth axis, since the goodwill you build often connects to how support and opportunity reach you.",
          "misread": "Reading the easy popularity as shallow overlooks that these bonds are authentic and tend to return real support."
        },
        "guan-lu-gong": {
          "beginner": "Work thrives here in harmonious, service-oriented settings where warmth and emotional intelligence are genuinely valued, such as hospitality, counselling, the arts, education, and social work. Highly competitive, metrics-driven environments tend to suit this placement poorly.",
          "intermediate": "Tian Tong makes institutions feel human, so in the Career Palace it expresses as the therapist whose clients feel heard or the teacher students remember for decades. The mismatch with cutthroat environments is about values clashing, not a lack of ability, and the wider chart shapes the fit.",
          "practitioner": "Check the Wealth Palace opposite and the triangle to confirm the environment matches the values, since Tian Tong is most effective where warmth is genuinely valued.",
          "misread": "Reading discomfort in aggressive, metrics-driven work as incapability misses that the issue is a values clash, not a lack of skill."
        },
        "tian-zhai-gong": {
          "beginner": "The home here is a sanctuary whose atmosphere matters as much as its market value. You tend to choose the place that feels right over the one that looks best on paper.",
          "intermediate": "Tian Tong prioritises the quality of the living environment over maximising returns, so in the Property Palace the result is often a warm, easy home that others enjoy visiting. The wider chart shapes how much investment value is traded for that comfort.",
          "practitioner": "Read this with its opposite palace and the triangle, since the Property Palace also speaks to family stability and stored resources, not only to real estate.",
          "misread": "Reading a comfort-first home as poor judgment overlooks that this placement is often genuinely content with the trade-off it made."
        },
        "fu-de-gong": {
          "beginner": "This is one of the most resonant placements for Tian Tong, where genuine contentment, presence, and the ability to find meaning in the ordinary arrive naturally. You are often drawn to traditions that emphasise acceptance and the sufficiency of what is.",
          "intermediate": "Tian Tong's ease lives most fully in the Fortune Palace, so the peace that other paths work lifetimes to reach can come without strain here. The subtle challenge is telling genuine contentment apart from using acceptance to avoid what actually needs to change.",
          "practitioner": "Read the Fortune Palace with the Wealth Palace it opposes, and watch for spiritual bypassing, since Tian Tong's ease can quietly become avoidance.",
          "misread": "Reading every calm as growth overlooks the placement's own caution that the language of acceptance can cover an unmade change."
        },
        "fu-mu-gong": {
          "beginner": "This placement is linked with a harmonious relationship with parents and a protected, supportive upbringing whose fundamental note was safety and ease. You may have been somewhat indulged as a child.",
          "intermediate": "Tian Tong's fortune often arrives early in the Parents Palace, as a childhood that did not harden you unnecessarily and parents who remain a source of genuine support. The wider chart shapes how much that early ease carries forward.",
          "practitioner": "Read this palace with its opposite and the triangle, since the Parents Palace also touches your relationship with superiors and institutions, not only your literal parents.",
          "misread": "Reading an easy, indulged upbringing as a lack of substance overlooks that the security it built is a genuine, lasting support."
        }
      },
      "placementsSource": "star page 'Across the 12 Palaces' grid + Life Palace and Essence prose + docs/zwds/02 §5"
    },
    "lian-zhen": {
      "placements": {
        "ming-gong": {
          "beginner": "You carry a composed, polished surface over a private inner life that runs intense. There is a natural legal and political intelligence here, and a real gap between the public face and everything it holds.",
          "intermediate": "Lian Zhen's double nature expresses in the self as the ability to read a room and manage what stays unsaid, so the calm exterior is genuine even while it contains a great deal.",
          "practitioner": "Read the whole triangle and the opposite palace before judging tone, since classical texts note that Lian Zhen meeting a challenging transformation shifts from directed intensity toward legal or reputational friction.",
          "misread": "Reading the calm surface as the whole person and missing the depth and intensity it manages."
        },
        "xiong-di-gong": {
          "beginner": "Sibling ties here tend to carry weight and history, with real intensity beneath them. Estrangements and reconciliations are part of the pattern.",
          "intermediate": "Because Lian Zhen holds complexity under composure, sibling relationships here often look composed on the surface while carrying unspoken currents underneath.",
          "practitioner": "Check the opposite palace to see whether the sibling intensity is being expressed or held back, and note whether supportive stars soften the friction.",
          "misread": "Assuming quiet between siblings means distance, when it often means feeling held back rather than absent."
        },
        "fu-qi-gong": {
          "beginner": "Partnership here tends to be passionate and complex rather than simple. Attraction can be intense and can outlast the early complications.",
          "intermediate": "Lian Zhen's gap between public and private can show up as a relationship that holds hidden dynamics, and classical readings associate the partner coming from different circumstances than the native.",
          "practitioner": "Read the triangle and opposite palace together, and recall the classical caution that Lian Zhen with an adverse transformation is linked to relationship dynamics that are hard to keep contained.",
          "misread": "Treating the intensity as a red flag rather than the material the relationship is asking both people to integrate."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to have strong characters and real depth. There can be complications in the early stages that ease as the relationship matures.",
          "intermediate": "Lian Zhen's intensity in this room often means the bond rewards patience, since the depth that makes it complex early is the same depth that makes it rich later.",
          "practitioner": "Check the opposite and triangle before reading early friction as lasting, and weigh whether steadying stars are present.",
          "misread": "Taking early difficulty as the fixed shape of the bond rather than a phase that tends to soften with patience."
        },
        "cai-bo-gong": {
          "beginner": "Income here tends to move through political, legal, and social channels rather than plain transactions. Money often carries hidden complexity.",
          "intermediate": "Because Lian Zhen works in the space between what is true and what is sayable, the financial life may involve costs or resources that are not discussed openly, such as legal or political ones.",
          "practitioner": "Trace the wealth triangle and note the classical caution that Lian Zhen meeting an adverse transformation is associated with legal or reputational cost around money.",
          "misread": "Reading a complicated money picture as dishonesty rather than the political texture this star brings to resources."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate this placement with the blood, liver, and reproductive system as areas worth tending. The theme is that held-in intensity eventually looks for release.",
          "intermediate": "Lian Zhen's pattern of managing pressure under a calm surface can, in classical thinking, show in the body when the interior has no other outlet.",
          "practitioner": "Read the Health triangle rather than one star alone, and treat classical accident or surgery notes as areas to watch with care, not as predictions.",
          "misread": "Turning classical vulnerability notes into a fixed diagnosis instead of gentle areas to monitor."
        },
        "qian-yi-gong": {
          "beginner": "Time away tends to involve complex or official dealings rather than simple tourism. There is skill in reading unfamiliar rooms quickly.",
          "intermediate": "Lian Zhen's political intelligence travels well, so success abroad often comes through diplomacy and the ability to navigate foreign systems and their unspoken rules.",
          "practitioner": "Check the opposite palace, since the Travel and Life axis together shows how the native's read-the-room instinct lands in new settings.",
          "misread": "Expecting relaxing getaways when the pattern points toward engagement with complex environments."
        },
        "nu-pu-gong": {
          "beginner": "Your circle tends to include people in legal, political, or otherwise complex fields. These relationships often carry hidden dimensions.",
          "intermediate": "Because Lian Zhen values discretion, the network here is usually selective, made of allies who understand how power and confidentiality work.",
          "practitioner": "Read the triangle to see whether these sophisticated allies are supportive or entangling in a given period.",
          "misread": "Mistaking a small, discreet circle for a lack of connections rather than a curated one."
        },
        "guan-lu-gong": {
          "beginner": "Work here fits law, politics, diplomacy, psychology, investigation, and intelligence. Reading between the lines is the actual job.",
          "intermediate": "Lian Zhen's talent for navigating complex human systems becomes a career engine in any field where the real map differs from the official version.",
          "practitioner": "Read the Career triangle for supporting stars, and recall the classical note that Lian Zhen with an adverse transformation raises the stakes of ethical exposure at work.",
          "misread": "Assuming this points to ordinary office work rather than fields built on discretion and complexity."
        },
        "tian-zhai-gong": {
          "beginner": "Property here tends to come with legal or complicated circumstances. A home may carry a history that needs navigating.",
          "intermediate": "Lian Zhen's link to legal texture can show in real estate that involves formal arrangements, inheritance through official channels, or situations that are not straightforward.",
          "practitioner": "Check the Property triangle before reading complexity as trouble, since supportive stars can turn a tangled situation into a managed one.",
          "misread": "Reading legal complexity around property as automatic loss rather than something this star is equipped to handle."
        },
        "fu-de-gong": {
          "beginner": "The inner life here runs unusually deep, with genuine passion held behind a composed public face. Spiritual seeking tends to come through intensity rather than calm.",
          "intermediate": "Lian Zhen's core gap lives most fully in this room, so the interior is often richer and more turbulent than anything the outside world sees.",
          "practitioner": "Read the Fortune palace with its opposite to gauge whether the inner intensity is integrated or split off in a given phase.",
          "misread": "Assuming a calm exterior means a calm interior, when this placement points the other way."
        },
        "fu-mu-gong": {
          "beginner": "Relationships with parents tend to be complex and carry hidden dimensions. Authority figures in the early story are often politically astute.",
          "intermediate": "Lian Zhen's theme of surface and depth often traces back here, where family patterns or long-held family matters shaped how the native learned to manage what is shown.",
          "practitioner": "Check the opposite palace to weigh how the parental complexity influences the native's own public and private style.",
          "misread": "Taking a smooth family surface at face value and missing the shaping influence underneath."
        }
      },
      "placementsSource": "Adapted from the Lian Zhen star page 'Across the 12 Palaces', 'In the Command Palace', and 'Essence' sections, cross-checked against docs/zwds/02-fourteen-major-stars.md section 6 (Lian Zhen)."
    },
    "tian-fu": {
      "placements": {
        "ming-gong": {
          "beginner": "You bring natural stability and conservative wisdom, and people tend to trust you with resources. The steadiness is real, and the shadow is over-caution or holding on too tightly.",
          "intermediate": "Tian Fu is the treasury, so in the self it expresses as the reliable anchor others find in a crisis, someone who preserves and steadies rather than gambles.",
          "practitioner": "Read the whole triangle and the opposite palace, and apply the classical treasury check for whether the vault reads as filled or empty in context.",
          "misread": "Reading steadiness as dullness and missing how much quiet capability it holds."
        },
        "xiong-di-gong": {
          "beginner": "Siblings tend to be stable and reliable, with family dynamics on the conservative side. The bond rests on trust and steady stewardship rather than drama.",
          "intermediate": "Because Tian Fu preserves and protects, sibling relationships here often function as a dependable support base rather than a source of excitement.",
          "practitioner": "Check the opposite palace to see whether the steadiness is mutual or whether the native is carrying most of the stewardship.",
          "misread": "Expecting excitement or rivalry and overlooking the quiet dependability that defines these ties."
        },
        "fu-qi-gong": {
          "beginner": "Partnership here tends to be stable and enduring, built on shared trust and resources. The partner is often conservative or traditionally minded.",
          "intermediate": "Tian Fu's preserving nature expresses in a relationship that values security and practicality, and different schools teach that this tends toward the lasting rather than the dramatic.",
          "practitioner": "Read the triangle and opposite palace, and check whether the treasury reads as full, since an empty-vault pattern can leave the partnership feeling secure in form but thin in substance.",
          "misread": "Mistaking calm reliability for lack of feeling rather than a different, steadier expression of it."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to be stable and responsible, and the bond centers on teaching and stewardship. Legacy and continuity are valued over novelty.",
          "intermediate": "Tian Fu's role as keeper of resources shows in a household where children absorb financial and practical wisdom almost by osmosis.",
          "practitioner": "Check the Children triangle to weigh whether the steadying influence is nurturing or tips into over-control.",
          "misread": "Reading a calm, orderly bond as distant when it is expressing care through structure."
        },
        "cai-bo-gong": {
          "beginner": "This is one of the great wealth placements, strong at preserving and growing what is accumulated. Income often comes through financial management, real estate, or family business.",
          "intermediate": "Tian Fu governs the storehouse, so money tends to be handled through stewardship and steady accumulation rather than speculation.",
          "practitioner": "Apply the classical filled-versus-empty treasury check across the wealth triangle, since a vault without wealth stars present reads very differently from one with them.",
          "misread": "Assuming the treasury label means money arrives on its own, when it describes skill at keeping and growing what is earned."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate this placement with a generally stable constitution and with earth-element areas such as digestion, pancreas, and spleen. A steady approach to health tends to suit the native.",
          "intermediate": "Tian Fu's conservative nature often shows as a body that responds well to routine and moderation rather than extremes.",
          "practitioner": "Read the Health triangle as a whole and treat the earth-element notes as areas to tend, not as fixed outcomes.",
          "misread": "Turning general constitutional notes into a specific diagnosis rather than gentle maintenance cues."
        },
        "qian-yi-gong": {
          "beginner": "You tend to prefer familiar environments and trusted networks over constant new territory. Quality of connection matters more than number of destinations.",
          "intermediate": "Tian Fu's preference for security means success away from home usually comes from building stable bases rather than restless movement.",
          "practitioner": "Check the opposite palace to see how the home-and-away axis balances the native's need for a secure base.",
          "misread": "Reading a homebody preference as a lack of ambition rather than a strategy of steady footing."
        },
        "nu-pu-gong": {
          "beginner": "You tend to attract reliable, trustworthy associates. The circle is small, deeply trusted, and rarely refreshed.",
          "intermediate": "Because Tian Fu curates and preserves, the social ecosystem here favors quality and long tenure over breadth.",
          "practitioner": "Read the triangle to judge whether the tight circle is a source of support or a limit on new opportunity in a given period.",
          "misread": "Seeing a small network as a weakness rather than a deliberately trusted inner circle."
        },
        "guan-lu-gong": {
          "beginner": "Work here fits banking, real estate, accounting, treasury, administration, and family business. Authority tends to build through demonstrated dependability over time.",
          "intermediate": "Tian Fu's stewardship nature makes any role that manages accumulated resources a natural fit, and standing grows steadily rather than in leaps.",
          "practitioner": "Read the Career triangle for the wealth and property links, since Tian Fu's authority is strongest where it can steward real resources.",
          "misread": "Expecting fast, flashy advancement when this placement rewards patience and proven reliability."
        },
        "tian-zhai-gong": {
          "beginner": "This placement tends toward strong property accumulation, often across generations. The ancestral home reads as an anchor rather than an asset to sell.",
          "intermediate": "Tian Fu is closely tied to holding and preserving, so real estate here is usually maintained and grown with care rather than traded.",
          "practitioner": "Check the Property triangle and the filled-treasury question to see how fully the accumulation potential is supported.",
          "misread": "Assuming property arrives automatically instead of through steady, deliberate accumulation."
        },
        "fu-de-gong": {
          "beginner": "The inner life here tends toward stability and quiet, with contentment found in security and preservation. There is genuine peace in the role of steward.",
          "intermediate": "Tian Fu's nature settles the interior around what endures, so fulfillment tends to come from knowing what was built will hold.",
          "practitioner": "Read the Fortune palace with its opposite to see whether the desire for security brings peace or tips into anxious hoarding.",
          "misread": "Reading contentment with security as complacency rather than a real source of inner steadiness."
        },
        "fu-mu-gong": {
          "beginner": "Parents here tend to offer stability and material security, and the family of origin passes on conservation values. Reliability and prudence were taught as virtues.",
          "intermediate": "Tian Fu's steward theme often traces to a household that modeled careful management, shaping the native's own relationship to resources.",
          "practitioner": "Check the opposite palace to weigh how the family's stability shaped the native's own steadiness or caution.",
          "misread": "Taking material security in the family for emotional closeness, which is a separate reading."
        }
      },
      "placementsSource": "Adapted from the Tian Fu star page 'Across the 12 Palaces' and 'Essence' sections, cross-checked against docs/zwds/02-fourteen-major-stars.md section 7 (Tian Fu)."
    },
    "tai-yin": {
      "placements": {
        "ming-gong": {
          "beginner": "You bring deep sensitivity, intuition, and aesthetic intelligence. Nighttime births tend to run stronger, and the shadow is emotional overwhelm or leaning too hard on others.",
          "intermediate": "Tai Yin is the Moon, so in the self it expresses as a reflective, receptive intelligence that reads feeling and beauty before it reads facts.",
          "practitioner": "Read the whole triangle and recall that classical schools treat day and night birth as changing how brightly this Moon shines, so weigh the birth context in general terms.",
          "misread": "Reading sensitivity as fragility rather than a form of perception and intelligence."
        },
        "xiong-di-gong": {
          "beginner": "Sibling bonds here tend to be emotionally close, with female siblings often especially significant. Understanding flows between you with little need to explain.",
          "intermediate": "Tai Yin's receptive, intuitive nature makes these ties quietly attuned, held together by feeling more than by words.",
          "practitioner": "Check the opposite palace to see whether the emotional closeness stays balanced or leans toward dependency in a given period.",
          "misread": "Expecting spoken closeness and missing the unspoken, intuitive rapport that carries these bonds."
        },
        "fu-qi-gong": {
          "beginner": "Partnership here tends to be romantic and sensitive, with attraction built on emotional resonance. The partner may be artistic or intuitive.",
          "intermediate": "Because Tai Yin is the Moon, love here can carry idealization, so the beloved may be seen partly as a dream, which is a tendency to notice rather than a fault.",
          "practitioner": "Read the triangle and opposite palace, and watch for the classical caution that the Moon can gild a partner, so check what tempers the idealizing pull.",
          "misread": "Taking early idealization for the full truth of the person rather than a lens to grow aware of."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to be sensitive and perceptive, with a deep emotional bond. The relationship is intuitively tuned and emotionally rich.",
          "intermediate": "Tai Yin's receptive nature makes this a bond of felt understanding, where much passes between parent and child without being said.",
          "practitioner": "Check the Children triangle to weigh whether the emotional closeness stays nourishing or tips into over-attunement.",
          "misread": "Reading a quiet, feeling-based bond as passive rather than deeply connected."
        },
        "cai-bo-gong": {
          "beginner": "Money here tends to come through receptive channels such as property, relationships, inheritance, or the beauty economy rather than direct effort. Nighttime birth tends to amplify this.",
          "intermediate": "Tai Yin is the Estate Lord, so wealth often flows through what is held and tended, like real estate and quiet accumulation, more than through open pursuit.",
          "practitioner": "Trace the wealth triangle and weigh the day-or-night birth context in general terms, since classical schools tie the Moon's strength to it.",
          "misread": "Assuming yin wealth means passive luck rather than value built through tending relationships and assets."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate this placement with the kidney and reproductive system, and with hormonal balance as an area worth tending. Emotional and physical health tend to move together here.",
          "intermediate": "Because Tai Yin links body and feeling closely, the native's physical state often mirrors emotional states with unusual fidelity.",
          "practitioner": "Read the Health triangle as a whole and treat the emotional-physical link as a care cue, not a fixed prediction.",
          "misread": "Separating mood from body when this placement asks you to read them together."
        },
        "qian-yi-gong": {
          "beginner": "Travel here tends to serve beauty and inspiration, and you do well in settings that value sensitivity and aesthetic intelligence. Being abroad can feel like breathing room.",
          "intermediate": "Tai Yin's receptive nature opens creative and emotional connections away from home, so new places often widen the inner world.",
          "practitioner": "Check the opposite palace to see how the home-and-away axis supports the native's need for a nourishing environment.",
          "misread": "Reading a wish for beautiful, restful travel as escapism rather than genuine replenishment."
        },
        "nu-pu-gong": {
          "beginner": "You tend toward emotionally attuned connections and prefer close, intimate friendship circles over wide networks. Relationships rest on deep understanding.",
          "intermediate": "Tai Yin's inward, feeling-based nature makes the social life selective, built on unspoken rapport rather than reach.",
          "practitioner": "Read the triangle to judge whether the intimate circle is nourishing or whether it narrows the native's exposure in a given phase.",
          "misread": "Treating a small, close circle as antisocial rather than as the native's preferred depth."
        },
        "guan-lu-gong": {
          "beginner": "Work here fits the arts, music, fashion, beauty, psychology, counseling, healing, and real estate. Sensitivity and aesthetic intelligence are the core skill, not a bonus.",
          "intermediate": "Tai Yin's receptive perception becomes a career engine wherever the job is to feel accurately and shape beauty or emotional experience.",
          "practitioner": "Read the Career triangle for the property and wealth links, since the Estate Lord often threads real estate through the working life.",
          "misread": "Filing sensitivity under soft skills instead of recognizing it as the central competency here."
        },
        "tian-zhai-gong": {
          "beginner": "This placement tends toward strong real estate accumulation, particularly for nighttime births. The home reads as a sanctuary of beauty and emotional resonance.",
          "intermediate": "Tai Yin is the Estate Lord, so property here is both a wealth vehicle and an emotional anchor, tended as much for feeling as for value.",
          "practitioner": "Check the Property triangle and weigh the day-or-night context in general terms, since classical schools tie the Moon's property strength to it.",
          "misread": "Reading the home only as an asset and missing its role as an emotional refuge."
        },
        "fu-de-gong": {
          "beginner": "The inner life here is rich with sensitivity and beauty, and spiritual life tends to come through aesthetic experience, nature, and emotional depth. Contentment is found through beauty more than achievement.",
          "intermediate": "Tai Yin settles the interior around felt, receptive experience, so peace tends to arrive through resonance rather than accomplishment.",
          "practitioner": "Read the Fortune palace with its opposite to see whether the emotional depth brings nourishment or tips into overwhelm.",
          "misread": "Reading a beauty-led inner life as unserious rather than as this native's real spiritual path."
        },
        "fu-mu-gong": {
          "beginner": "The maternal relationship here tends to be emotionally significant, and the mother-figure is often prominent in the life story. The family of origin carries strong yin energy.",
          "intermediate": "Tai Yin's Moon nature draws attention to the nurturing side of the family, shaping how the native learned to perceive and feel the world.",
          "practitioner": "Check the opposite palace to weigh how the maternal influence shaped the native's own receptivity.",
          "misread": "Reading the mother's prominence as the whole story and overlooking how it tuned the native's perception."
        }
      },
      "placementsSource": "Adapted from the Tai Yin star page 'Across the 12 Palaces' and 'Essence' sections, cross-checked against docs/zwds/02-fourteen-major-stars.md section 8 (Tai Yin)."
    },
    "tan-lang": {
      "placements": {
        "ming-gong": {
          "beginner": "You are multi-talented, charismatic, and driven by desire and appetite for experience. There is often a late-blooming pattern, and the shadow is scattered energy or over-indulgence.",
          "intermediate": "Tan Lang is the star of desire, so in the self it expresses as magnetism and many gifts that reward focus, since desire is the fuel and direction is the work.",
          "practitioner": "Read the whole triangle and recall the classical note that Tan Lang's gifts sharpen dramatically when certain catalysing stars give the desire a direction.",
          "misread": "Reading many talents as a lack of seriousness rather than energy waiting for a channel."
        },
        "xiong-di-gong": {
          "beginner": "Siblings here tend to be charismatic and talented, and the bonds can be both competitive and magnetic. Many people in your wider field can feel like siblings.",
          "intermediate": "Tan Lang runs with a pack, so this room often widens beyond blood siblings into a lively circle held together by shared vitality.",
          "practitioner": "Check the opposite palace to see whether the magnetic pull among siblings supports the native or scatters focus.",
          "misread": "Reading competitiveness as conflict rather than the charged, magnetic energy this star brings to peers."
        },
        "fu-qi-gong": {
          "beginner": "The romantic life here tends to be intense, and this placement carries strong magnetism that draws many admirers. Choosing well tends to take time, and later commitment is a common pattern.",
          "intermediate": "As the lead Peach Blossom star, Tan Lang expresses in relationships as attraction and appetite, so the growth edge is self-knowledge about what the native actually wants.",
          "practitioner": "Read the triangle and opposite palace, and treat the peach blossom pull as a tendency toward magnetism to understand, not a fixed romantic outcome.",
          "misread": "Reading strong attraction as instability rather than energy that steadies once desire finds a clear direction."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to be creative, multi-talented, and to have strong lives of their own. The bond works best when both sides respect each other's independence.",
          "intermediate": "Tan Lang's nature does not cage its cubs, so parenting here tends to thrive on freedom and shared creativity rather than tight control.",
          "practitioner": "Check the Children triangle to weigh whether the emphasis on independence is nourishing or tips into too little structure.",
          "misread": "Reading a child's strong independent streak as defiance rather than the vitality this placement carries."
        },
        "cai-bo-gong": {
          "beginner": "Wealth here tends to come through creative fields, entertainment, and multiple income streams. Money can come and go with the native's desires.",
          "intermediate": "Because Tan Lang follows appetite, the financial life often has range and movement, and different schools teach that it tends to steady in the second half of life.",
          "practitioner": "Trace the wealth triangle and recall that catalysing stars can turn Tan Lang's fluctuating income into sudden gains, which is a tendency to read in context.",
          "misread": "Reading variable income as failure rather than the natural rhythm of a desire-led earner."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate this placement with indulgence as the main area to watch, and with the liver and kidney under excess. The body tends to reflect a life of appetite.",
          "intermediate": "Tan Lang's link to sensuality means the native benefits from conscious pacing, since the wolf does well to know when to rest.",
          "practitioner": "Read the Health triangle as a whole and treat the indulgence notes as pacing cues, not as fixed outcomes.",
          "misread": "Treating classical indulgence notes as moral judgment rather than practical cues about balance."
        },
        "qian-yi-gong": {
          "beginner": "Travel here tends to be adventurous and pleasure-seeking, and your magnetism opens doors in new places. Entertainment and creative work abroad tend to go well.",
          "intermediate": "Tan Lang's charm travels, so the native is often welcomed easily and finds opportunity through personality as much as plan.",
          "practitioner": "Check the opposite palace to see how the outward magnetism balances the native's core drives at home.",
          "misread": "Reading pleasure-seeking travel as aimlessness rather than the way this star gathers experience and contacts."
        },
        "nu-pu-gong": {
          "beginner": "You tend to have a large, diverse network with many admirers and followers. The social life is rich and rewards discernment.",
          "intermediate": "Tan Lang draws people like a flame, so the work here is telling who belongs in the inner circle from who is simply drawn to the warmth.",
          "practitioner": "Read the triangle to judge whether the wide network is feeding opportunity or diluting the native's focus in a given period.",
          "misread": "Assuming a big following means many true allies rather than a crowd that needs sorting."
        },
        "guan-lu-gong": {
          "beginner": "Work here fits arts, entertainment, music, creative entrepreneurship, design, philosophy, marketing, luxury goods, and hospitality. Charisma, creativity, and desire are the assets.",
          "intermediate": "Tan Lang's magnetism and appetite become a career engine wherever drawing people and generating fresh ideas is the point.",
          "practitioner": "Read the Career triangle for focusing influences, since Tan Lang's scattered range converts to achievement when the work gives desire a direction.",
          "misread": "Reading a wide range of interests as inability to commit rather than energy seeking the right stage."
        },
        "tian-zhai-gong": {
          "beginner": "Property here tends to involve multiple homes or frequent changes, often bought through creative earnings rather than conservative saving. The home reflects a life of desire, beautiful and changeable.",
          "intermediate": "Tan Lang's appetite for the new shows in real estate that moves with the native's phases rather than staying fixed.",
          "practitioner": "Check the Property triangle to weigh whether the movement is opportunity or restlessness in a given period.",
          "misread": "Reading frequent moves as instability rather than the changeable, desire-led relationship this star has with home."
        },
        "fu-de-gong": {
          "beginner": "The inner life here is rich with desire and aspiration, and spiritual seeking often ranges across many traditions. Real contentment tends to come from joining desire with wisdom.",
          "intermediate": "Tan Lang's appetite reaches into the interior, so the search for meaning is wide and hungry until the native gives it direction.",
          "practitioner": "Read the Fortune palace with its opposite to see whether the seeking is integrating or scattering in a given phase.",
          "misread": "Reading spiritual restlessness as shallowness rather than a genuine, wide-ranging search."
        },
        "fu-mu-gong": {
          "beginner": "A parental figure here tends to be charismatic, and the family of origin can carry strong desires and dramatic dynamics. The young native learns about desire and its consequences early.",
          "intermediate": "Tan Lang's theme of appetite often traces to a vivid household, where the native first met both the pull of desire and its costs.",
          "practitioner": "Check the opposite palace to weigh how the family's intensity shaped the native's own relationship to desire.",
          "misread": "Reading a colorful family only as difficulty and missing what it taught the native about appetite and direction."
        }
      },
      "placementsSource": "Adapted from the Tan Lang star page 'Across the 12 Palaces' and 'Essence' sections, cross-checked against docs/zwds/02-fourteen-major-stars.md section 9 (Tan Lang)."
    },
    "ju-men": {
      "placements": {
        "ming-gong": {
          "beginner": "You are an analytical truth-seeker whose life organizes around understanding. Verbal intelligence is central to who you are, and directness is a gift when calibrated and a liability when not.",
          "intermediate": "Ju Men absorbs and investigates rather than radiates, so the self here is known for what it knows and how it communicates it, with an insecurity-as-drive pattern that fuels constant growth.",
          "practitioner": "Read the whole triangle and note the classical point that Ju Men does well when light reaches it, so check what illuminates and steadies the Dark Gate.",
          "misread": "Reading the questioning, self-doubting drive as weakness rather than the engine of the native's depth."
        },
        "xiong-di-gong": {
          "beginner": "Sibling relationships here tend to be intellectually engaged, with conversations that go deep. Precision or directness can get misread as criticism.",
          "intermediate": "Ju Men's speech dynamic shows up in this room as substantive talk that carries real warmth underneath, even when the delivery reads as sharp.",
          "practitioner": "Check the opposite palace to see whether the sibling communication friction is softened or amplified by surrounding stars.",
          "misread": "Taking blunt honesty between siblings as coldness rather than the native's way of engaging."
        },
        "fu-qi-gong": {
          "beginner": "There is a deep need for intellectual connection in relationships here, and you are drawn to complex, interesting partners. Communication friction is a real pattern to manage.",
          "intermediate": "Ju Men's directness can land as criticism even when it is meant as engagement, so the relationship that lasts tends to be one where honesty is received without feeling like an attack.",
          "practitioner": "Read the triangle and opposite palace, and weigh whether the speech friction is calmed or heightened, since the Dark Gate reads very differently when light reaches it.",
          "misread": "Reading the need for deep conversation as being hard to please rather than a genuine requirement for connection."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to be intellectually sharp and verbally gifted, and the household prizes honest communication. The native may need to soften directness in the parenting role.",
          "intermediate": "Ju Men's analytical depth carries across generations here, so the environment rewards substance, while children still need room to be wrong without feeling cross-examined.",
          "practitioner": "Check the Children triangle to weigh whether the emphasis on honesty nourishes the bond or tips into too much scrutiny.",
          "misread": "Reading a child's need for gentleness as a lack of rigor rather than a healthy balance to the native's directness."
        },
        "cai-bo-gong": {
          "beginner": "This placement points to wealth through words, with income from teaching, consulting, law, medicine, writing, or research. Analytical capability is the main earning asset.",
          "intermediate": "Ju Men turns insight into income, so earnings often track the quality of what is delivered rather than seniority, and multiple intellectual income streams are common.",
          "practitioner": "Trace the wealth triangle and check what illuminates the Dark Gate, since Ju Men earns most steadily when its insight is well received rather than merely correct.",
          "misread": "Assuming income should be smooth and salaried when it tends to track the value of insights delivered."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate this placement with stress from mental and emotional depth, and flag speech-related areas such as the throat and upper respiratory system as watch-points. Overthinking is the main pattern to tend.",
          "intermediate": "Ju Men's inward, analytical mind can produce anxiety or exhaustion from processing too much, so the body tends to need what the mind resists, like rest and unanalyzed experience.",
          "practitioner": "Read the Health triangle as a whole and treat the throat and overthinking notes as care cues rather than fixed outcomes.",
          "misread": "Ignoring the mind-to-body link and treating overthinking as harmless rather than a real source of strain."
        },
        "qian-yi-gong": {
          "beginner": "Your analytical intelligence tends to be valued in foreign contexts, and distance from home can free up your expression. Directness lands differently across cultures.",
          "intermediate": "Ju Men's depth translates across settings, so the native may have significant intellectual or professional experiences abroad where a fresh audience receives the insight well.",
          "practitioner": "Check the opposite palace to see how the Travel and Life axis shapes where the native's directness is welcomed.",
          "misread": "Assuming bluntness travels unchanged when its reception shifts a lot from culture to culture."
        },
        "nu-pu-gong": {
          "beginner": "Your network tends to be smaller and quality-focused, and you are respected for genuine knowledge rather than social ease. You may be known for saying what others will not.",
          "intermediate": "Ju Men invests finite social energy in connections that match its depth, so friendships built on substance last while surface ones tend to fade.",
          "practitioner": "Read the triangle to judge whether the native's reputation for directness is opening doors or narrowing the circle in a given period.",
          "misread": "Reading a small circle as social failure rather than a deliberate investment in depth."
        },
        "guan-lu-gong": {
          "beginner": "Work here fits law, medicine, consulting, teaching, media, and research, where analytical depth is the engine. You advance through the quality of what you actually know.",
          "intermediate": "Ju Men's wealth through words shows in professional form here, so contribution is measured by insight rather than networking or maneuvering.",
          "practitioner": "Read the Career triangle for what tempers the speech friction, since the main career risk is insight delivered without enough cushioning.",
          "misread": "Assuming advancement comes from politics when this placement rewards depth and honest contribution."
        },
        "tian-zhai-gong": {
          "beginner": "Property decisions here tend to be carefully researched and analytically sound, rarely overpaying for sentiment. The home matters as a private refuge from the busy analytical mind.",
          "intermediate": "Ju Men brings rigor to real estate, so arrangements may be complex or unconventional but are arrived at through thorough consideration rather than convention.",
          "practitioner": "Check the Property triangle to weigh whether the home functions as genuine rest for the Dark Gate or becomes another place to overthink.",
          "misread": "Reading unconventional property choices as impulsive when they are usually the result of careful analysis."
        },
        "fu-de-gong": {
          "beginner": "The inner life here is drawn to deep philosophical and spiritual inquiry, favoring traditions with real intellectual depth over easy comfort. The examined life feels less like a choice than a compulsion.",
          "intermediate": "Ju Men turns its investigative nature inward here, so the interior must be understood, not merely lived in, which at its best becomes a wisdom others seek out.",
          "practitioner": "Read the Fortune palace with its opposite to see whether the inner questioning brings insight or tips into restless doubt.",
          "misread": "Reading constant self-examination as unhappiness rather than the native's genuine path to wisdom."
        },
        "fu-mu-gong": {
          "beginner": "The family of origin here tends to have a defining communication theme, either deep intellectual engagement passed down or significant verbal friction. Those early speech patterns leave a lasting mark.",
          "intermediate": "Ju Men's relationship to truth and directness is shaped in this earliest environment, for good or ill, and the native often spends time metabolizing it.",
          "practitioner": "Check the opposite palace to weigh how the family's verbal patterns shaped the native's own relationship to honesty and words.",
          "misread": "Reading early verbal friction as the whole story and missing how it formed the native's relationship to truth."
        }
      },
      "placementsSource": "Adapted from the Ju Men star page 'Across the 12 Palaces' and 'Life Palace' sections, cross-checked against docs/zwds/02-fourteen-major-stars.md section 10 (Ju Men)."
    },
    "tian-xiang": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to be the trusted, level-headed one people bring their hard situations to. Your standing grows slowly, through steady service and fair dealing rather than showmanship.",
          "intermediate": "Tian Xiang works like a mediator here, so its influence shows up as credibility that accumulates over time, and reading it well means checking the whole triangle to see what supports or strains that steady authority.",
          "practitioner": "Check the opposite Po Jun influence and the triangle for how much disruption the chart carries, since that tension is what keeps the steady nature from tipping into mere conventionality.",
          "misread": "Reading the quiet, non-flashy style as a lack of ambition rather than a slow, durable way of building authority."
        },
        "xiong-di-gong": {
          "beginner": "You often play the fair, balancing voice among siblings, the one called on to hear both sides and keep the peace.",
          "intermediate": "Tian Xiang's due-process nature expresses here as even-handed sibling ties, and the surrounding palaces in the triangle color how much that mediating role is asked of you.",
          "practitioner": "Check the triangle for stress that would load the mediator with more family disputes than is fair to carry.",
          "misread": "Assuming fair sibling relations mean no conflict, when the role is really about handling conflict well."
        },
        "fu-qi-gong": {
          "beginner": "You tend to be a loyal, steady partner, drawn to reliable and principled people, with commitment shown through consistency more than grand gestures.",
          "intermediate": "Tian Xiang reads here as partnership built on mutual respect and dependable behavior over time, and the triangle shows what supports or tests that steadiness.",
          "practitioner": "Check the opposite and triangle before reading the reserve as coldness, since classical readings associate this placement with deep loyalty expressed through action rather than display.",
          "misread": "Mistaking emotional reserve for a lack of feeling, when the commitment tends to show in steady conduct."
        },
        "zi-nu-gong": {
          "beginner": "You tend to parent by modeling integrity rather than only demanding it, so children often feel secure around consistent behavior.",
          "intermediate": "Tian Xiang's fairness expresses here as a values-based bond where word matches deed, and the triangle colors how demonstrative or reserved that bond feels.",
          "practitioner": "Check the triangle rather than reading a single palace as a fixed statement about children, since classical texts describe tendencies of the bond, not outcomes.",
          "misread": "Reading a reserved, undemonstrative style as distance, when the security tends to come from reliability."
        },
        "cai-bo-gong": {
          "beginner": "Money tends to come steadily through professional service or institutional work, comfortable and solid rather than dramatic.",
          "intermediate": "The star of food and clothing quality expresses here as income earned and protected with care, and reading the triangle shows whether that steadiness holds or gets pulled toward risk.",
          "practitioner": "Check the opposite Po Jun influence for pressure toward speculation that runs against this placement's steady grain.",
          "misread": "Expecting dramatic wealth peaks and reading their absence as underperformance, when the pattern favors consistency."
        },
        "ji-e-gong": {
          "beginner": "Classical readings link this placement with generally steady health supported by routine and structure.",
          "intermediate": "Tian Xiang here suggests a body that responds well to order, and the triangle points to where accumulated responsibility and stress may need managing.",
          "practitioner": "Check the triangle for stress-loading from over-responsibility rather than treating any single palace as a fixed health verdict.",
          "misread": "Treating steady health as permission to ignore the strain of carrying too much without boundaries."
        },
        "qian-yi-gong": {
          "beginner": "Away from home you tend to carry an institutional or diplomatic presence, trusted across different settings.",
          "intermediate": "Tian Xiang's reliability travels well, and the triangle shows which foreign or public contexts most reward that trustworthiness.",
          "practitioner": "Check the opposite palace to see how movement and disruption abroad interact with the steady, order-keeping nature.",
          "misread": "Assuming the reserved style limits reach abroad, when integrity tends to translate across cultures."
        },
        "nu-pu-gong": {
          "beginner": "Your circle tends to be small but deep, and people know you as the fair one who can hold sensitive matters.",
          "intermediate": "Tian Xiang reads here as trust-based relationships rather than broad social cultivation, and the triangle colors how reciprocal that trust proves.",
          "practitioner": "Check the triangle and opposite for where a betrayal of trust would land hardest, since given trust is this placement's currency.",
          "misread": "Measuring the network by size instead of the depth of trust it actually holds."
        },
        "guan-lu-gong": {
          "beginner": "You tend to do well in roles where institutional trust matters, such as management, counsel, advisory work, or diplomacy.",
          "intermediate": "Tian Xiang expresses here as advancement earned through demonstrated competence, and the triangle shows what supports that slow, credibility-based climb.",
          "practitioner": "Check the opposite Po Jun influence for whether the chart also asks for disruption the steady path tends to resist.",
          "misread": "Reading slow, promotion-through-competence progress as being passed over, when it is how this authority builds."
        },
        "tian-zhai-gong": {
          "beginner": "You tend to value a dignified, well-kept home acquired through saving and planning rather than windfall.",
          "intermediate": "Tian Xiang's stewardship expresses here as conservative, sound property choices, and the triangle shows how anchored or mobile the home base tends to be.",
          "practitioner": "Check the opposite for pressure toward sudden property change that cuts against this placement's preference for a maintained foundation.",
          "misread": "Reading caution about property as timidity, when it reflects a stewardship instinct."
        },
        "fu-de-gong": {
          "beginner": "Your inner life tends to settle around fairness, principle, and the quiet satisfaction of things done well.",
          "intermediate": "Tian Xiang here reads as contentment found in proper order and completed work, and the triangle shows what disturbs or supports that inner steadiness.",
          "practitioner": "Check the triangle for where the drive to keep everything in order becomes a private burden rather than a comfort.",
          "misread": "Mistaking a calm, order-loving inner life for a lack of depth or feeling."
        },
        "fu-mu-gong": {
          "beginner": "Your family of origin likely emphasized proper conduct and reliable responsibility, and you tend to carry those values forward.",
          "intermediate": "Tian Xiang reads here as an ethical rather than mainly financial inheritance, and the triangle colors how present and formative that influence feels.",
          "practitioner": "Check the opposite and triangle for how much the inherited emphasis on duty supports the native versus weighs on them.",
          "misread": "Reading the inheritance as material when it tends to be about values and conduct."
        }
      },
      "placementsSource": "Star page 'Tian Xiang Across the 12 Palaces' accordion and 'In the Command Palace' prose, cross-checked with docs/zwds/02 section 11."
    },
    "tian-liang": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to carry an old-soul, mentor quality, drawn to guiding and protecting others from early on.",
          "intermediate": "Tian Liang's sheltering nature expresses here as wisdom that others notice and return to, and the triangle shows how heavily the protective role is asked of you.",
          "practitioner": "Check the triangle for over-responsibility, the classical shadow where carrying others crowds out the native's own life.",
          "misread": "Reading the caretaker role as selflessness alone, when the real work is also learning to receive care."
        },
        "xiong-di-gong": {
          "beginner": "You tend to take an elder-sibling role regardless of birth order, protecting and guiding the others.",
          "intermediate": "Tian Liang's mentor quality expresses in sibling ties as guidance rather than rivalry, and the triangle colors how mutual that support becomes.",
          "practitioner": "Check the triangle for whether the protective role is reciprocated or quietly one-sided.",
          "misread": "Reading the elder role as automatic authority rather than a responsibility that can tip into overprotection."
        },
        "fu-qi-gong": {
          "beginner": "You tend to be drawn to a wise, protective partner, and the bond often carries an elder-younger quality even between equals.",
          "intermediate": "Tian Liang reads here as an enduring partnership built on respect and care, and the triangle shows what deepens or strains that mentoring dynamic.",
          "practitioner": "Check the opposite and triangle before reading the protective streak as control, since it can shade into meddling when overextended.",
          "misread": "Mistaking the caretaking dynamic for imbalance, when it can be a stable form of mutual respect."
        },
        "zi-nu-gong": {
          "beginner": "Children here are often described as carrying wisdom beyond their years, with the parent acting as a mentor figure.",
          "intermediate": "Tian Liang expresses as multigenerational wisdom passing through the family, and the triangle colors how that guidance is given and received.",
          "practitioner": "Check the triangle rather than reading one palace as a fixed statement about children, since the star describes a mentoring tendency, not an outcome.",
          "misread": "Reading the mentor-parent style as pressure on children rather than steady guidance."
        },
        "cai-bo-gong": {
          "beginner": "Money tends to come through wisdom-based work such as medicine, law, academia, or guidance, and sometimes through benefactors or inheritance.",
          "intermediate": "Tian Liang's protective grace expresses here as support arriving through people the native has helped, and the triangle shows how reliable that support proves.",
          "practitioner": "Check the triangle for how much wealth leans on benefactors versus the native's own steady practice.",
          "misread": "Assuming support from benefactors or inheritance is assured, when classical readings describe it as a tendency, not a certainty."
        },
        "ji-e-gong": {
          "beginner": "Classical readings associate Tian Liang with resilience and long life, treating recovery as a described tendency rather than a promise.",
          "intermediate": "Tian Liang's sheltering quality reads here as a body that tends to weather chronic conditions, and the triangle shows what supports that resilience.",
          "practitioner": "Check the triangle rather than treating any single palace as a fixed health verdict, since different schools teach this as tendency, not certainty.",
          "misread": "Treating the longevity association as a promise of health rather than a tendency that still needs care."
        },
        "qian-yi-gong": {
          "beginner": "Away from home you tend to be sought as a respected expert, sharing wisdom across settings.",
          "intermediate": "Tian Liang reads here as guidance that travels, and the triangle shows which foreign contexts most value that counsel.",
          "practitioner": "Check the opposite palace for how movement interacts with the settled, advisory nature.",
          "misread": "Assuming the teacher role only works at home, when the expertise tends to translate abroad."
        },
        "nu-pu-gong": {
          "beginner": "Your connections tend to run deep and multigenerational, and over time you become the elder of your circle.",
          "intermediate": "Tian Liang expresses here as trusted, wise associates rather than a wide crowd, and the triangle colors how much the network leans on your guidance.",
          "practitioner": "Check the triangle for whether you are supported by the network or mainly supporting it.",
          "misread": "Reading the elder-of-the-group role as status rather than accumulated responsibility."
        },
        "guan-lu-gong": {
          "beginner": "You tend to thrive in medicine, teaching, counseling, law, or academia, and the career often improves with age.",
          "intermediate": "Tian Liang reads here as work where accumulated wisdom is the core competency, and the triangle shows what supports that long-tenure path.",
          "practitioner": "Check the triangle for whether the field lets wisdom compound or forces early, fast-moving turnover that suits this star less.",
          "misread": "Expecting quick career peaks and reading their absence as failure, when this path tends to deepen slowly."
        },
        "tian-zhai-gong": {
          "beginner": "You tend toward solid, multigenerational property, with the home as a stable sanctuary.",
          "intermediate": "Tian Liang's steadiness expresses here as property held and passed down, and the triangle shows how anchored the family estate tends to be.",
          "practitioner": "Check the triangle for how much property ties to inherited or family obligation versus the native's own choice.",
          "misread": "Reading attachment to a family home as being stuck rather than a chosen anchor."
        },
        "fu-de-gong": {
          "beginner": "Your inner life tends to hold real spiritual depth that grows with lived experience.",
          "intermediate": "Tian Liang reads here as contentment found in passing on wisdom and protecting others, and the triangle shows what feeds or drains that inner life.",
          "practitioner": "Check the triangle for where spiritual depth tips into escapism, the classical caution for this star fallen.",
          "misread": "Mistaking a contemplative inner life for withdrawal from the world."
        },
        "fu-mu-gong": {
          "beginner": "Parents here are often wise or authoritative figures, sometimes older or grandparent-like, carrying traditional wisdom.",
          "intermediate": "Tian Liang reads here as wisdom handed across generations, and the triangle colors how present and supportive that lineage feels.",
          "practitioner": "Check the opposite and triangle for how much the parental wisdom supports the native versus sets a standard hard to meet.",
          "misread": "Reading traditional family wisdom as constraint rather than a resource to draw on."
        }
      },
      "placementsSource": "Star page 'Across the 12 Palaces' palace-desc cards and Life Palace prose, cross-checked with docs/zwds/02 section 12."
    },
    "qi-sha": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend toward fierce independence and decisive action, moving first while others are still assessing.",
          "intermediate": "Qi Sha's warrior nature expresses here as authority earned through performance under pressure, and the triangle shows whether that force has a worthy outlet.",
          "practitioner": "Check the opposite Tian Fu influence and the triangle for the stabilizing counterweight, since without it the drive can tip into recklessness.",
          "misread": "Reading the outsider intensity as arrogance rather than a genuine mismatch with slow systems."
        },
        "xiong-di-gong": {
          "beginner": "Siblings here tend to be independent and strong-willed, each going their own dramatic way.",
          "intermediate": "Qi Sha expresses as high-voltage sibling ties that can run competitive or distant, and the triangle colors how that intensity plays out.",
          "practitioner": "Check the opposite and triangle before reading distance as hostility, since it often reflects each sibling's separate intensity.",
          "misread": "Assuming estrangement means conflict, when it can simply be siblings operating at very different frequencies."
        },
        "fu-qi-gong": {
          "beginner": "Classical readings associate this placement with marrying later and with a partnership that works best between two independent people; it describes a dynamic to manage, not a verdict.",
          "intermediate": "Qi Sha reads here as a union of two strong, self-directed wills, and the triangle shows what helps that ongoing negotiation hold.",
          "practitioner": "Check the opposite and triangle rather than reading any single palace as a fixed statement about marriage, since schools differ on how this placement plays out.",
          "misread": "Taking the independent dynamic as a sign the relationship cannot work, when it describes a balance to manage."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to be strong-willed and independent, forging their own paths.",
          "intermediate": "Qi Sha expresses as a bond that needs mutual respect for independence, and the triangle colors how much room the relationship allows.",
          "practitioner": "Check the triangle rather than reading one palace as a fixed outcome, since the star describes a dynamic of independence, not a verdict on children.",
          "misread": "Trying to contain or direct strong-willed children too rigidly, which tends to turn the same energy against the parent."
        },
        "cai-bo-gong": {
          "beginner": "Money tends to come through bold, pioneering ventures in large, sudden movements rather than steady accumulation.",
          "intermediate": "Qi Sha reads here as high-risk, high-reward income, and the triangle shows whether strategy tempers the boldness.",
          "practitioner": "Check the opposite Tian Fu influence for the holding-and-protecting counterweight that keeps bold action from undoing itself.",
          "misread": "Reading dramatic swings as instability rather than the way this placement tends to earn."
        },
        "ji-e-gong": {
          "beginner": "Classical readings link this placement with a strong constitution that also needs physical outlets, and with accident or surgery risk given the energy involved.",
          "intermediate": "Qi Sha reads here as a body that wants motion, and the triangle shows where contained energy without an outlet may create strain.",
          "practitioner": "Check the triangle rather than treating any single palace as a fixed health verdict, and note the classical caution to give this energy a physical channel.",
          "misread": "Reading the iron-constitution association as invulnerability rather than energy that needs an outlet."
        },
        "qian-yi-gong": {
          "beginner": "You tend to thrive in new territory, at your best where no path exists yet.",
          "intermediate": "Qi Sha expresses here as pioneering in unfamiliar settings, and the triangle shows which environments challenge the native enough to bring out their best.",
          "practitioner": "Check the opposite and triangle for whether established settings under-challenge the drive and leave it restless.",
          "misread": "Assuming any move helps, when the energy really wants genuinely unknown terrain."
        },
        "nu-pu-gong": {
          "beginner": "Your circle tends to be small and elite, made of peers who match your intensity.",
          "intermediate": "Qi Sha reads here as a tight group of exceptional allies, and the triangle colors how the native tolerates or pushes away those who don't match that level.",
          "practitioner": "Check the triangle for where intolerance of mediocrity in allies isolates the native from useful support.",
          "misread": "Reading a small network as a weakness rather than a deliberate filter for intensity."
        },
        "guan-lu-gong": {
          "beginner": "You tend to fit fields that need decisive, independent action under real pressure, such as strategy, surgery, high-stakes work, or entrepreneurship.",
          "intermediate": "Qi Sha reads here as work that rewards transformative action, and the triangle shows what keeps the drive aimed at worthy targets.",
          "practitioner": "Check the opposite Tian Fu influence for the stabilizing structure that lets decisive action build rather than burn.",
          "misread": "Placing this energy in conventional management and reading the resulting restlessness as a personal flaw."
        },
        "tian-zhai-gong": {
          "beginner": "Property here tends to come through dramatic action rather than patient accumulation, sometimes with sudden changes of living situation.",
          "intermediate": "Qi Sha reads here as bold or sudden property moves, and the triangle shows how much upheaval accompanies them.",
          "practitioner": "Check the opposite Tian Fu influence for the anchoring pull that steadies otherwise abrupt property shifts.",
          "misread": "Reading sudden housing changes as chaos rather than this placement's characteristic way of acquiring."
        },
        "fu-de-gong": {
          "beginner": "Your inner life tends to run intense and urgent, rarely quiet in the conventional sense.",
          "intermediate": "Qi Sha reads here as contentment found in mastery and the sense of having truly been tested, and the triangle shows what channels that intensity.",
          "practitioner": "Check the triangle for practices demanding enough to hold this energy, since idle intensity tends to turn inward.",
          "misread": "Reading inner restlessness as a problem to fix rather than a drive that wants a demanding channel."
        },
        "fu-mu-gong": {
          "beginner": "The parental relationship here tends to be complex, possibly distant or dramatic, and the native often builds their own authority.",
          "intermediate": "Qi Sha reads here as a family that could not fully contain the native's energy, and the triangle colors how that shaped their independence.",
          "practitioner": "Check the opposite and triangle for how early authority dynamics fed the native's self-built strength.",
          "misread": "Reading a difficult parental bond as pure loss, when it often forged the native's independence."
        }
      },
      "placementsSource": "Star page palace list (palace-body cards) and Life Palace archetype prose, cross-checked with docs/zwds/02 section 13; the Spouse Palace reading follows the non-deterministic phrasing required by the brief."
    },
    "po-jun": {
      "placements": {
        "ming-gong": {
          "beginner": "You tend to live unconventionally, reinventing yourself more than once, with a life that does not follow the expected arc.",
          "intermediate": "Po Jun's breaking-and-building nature expresses here as a strong comeback signature, and the triangle shows how the artistic and disruptive sides combine.",
          "practitioner": "Check the opposite Tian Xiang influence and the triangle for the order-keeping counterweight that keeps breaking from becoming pure destruction.",
          "misread": "Reading the unconventional path as instability rather than a repeated cycle of clearing and rebuilding."
        },
        "xiong-di-gong": {
          "beginner": "Sibling relationships here tend to be complex and changeable, sometimes involving a break that later reshapes.",
          "intermediate": "Po Jun expresses as sibling ties that transform over time, and the triangle colors how those breaks resolve.",
          "practitioner": "Check the opposite and triangle for whether a break tends toward repair or lasting distance.",
          "misread": "Reading a sibling estrangement as permanent, when this star's pattern often reshapes ties rather than ends them."
        },
        "fu-qi-gong": {
          "beginner": "Relationships here tend to be intense and transformative, and often ask both partners to keep evolving.",
          "intermediate": "Po Jun reads here as a partnership that changes shape over time and carries real cost in energy and attention, and the triangle shows what helps it hold through change.",
          "practitioner": "Check the opposite and triangle before reading change as failure, since classical readings describe a relationship that reinvents rather than stays fixed.",
          "misread": "Taking the need for evolution as instability, when it describes how this partnership tends to work."
        },
        "zi-nu-gong": {
          "beginner": "Children here tend to be independent and unconventional, and may challenge expectations in productive ways.",
          "intermediate": "Po Jun expresses as a bond that encourages creative, non-traditional thinking, and the triangle colors how the parenting style itself evolves.",
          "practitioner": "Check the triangle rather than reading one palace as a fixed outcome, since the star describes a tendency toward reinvention, not a verdict on children.",
          "misread": "Reading a child's unconventional path as rebellion rather than the independence this placement tends to encourage."
        },
        "cai-bo-gong": {
          "beginner": "Money here tends to be volatile, with significant gains and losses, and income through creative or unconventional channels.",
          "intermediate": "The star's expenditure quality expresses here as wealth spent as readily as it is earned, and the triangle shows what steadies or amplifies the swings.",
          "practitioner": "Check the opposite Tian Xiang influence for the order and restraint that helps rebuilding hold after a fall.",
          "misread": "Reading financial swings as ruin, when this placement tends to carry a strong rebuilding capacity."
        },
        "ji-e-gong": {
          "beginner": "The body here tends to reflect the life's intensity, with cycles of high output and recovery.",
          "intermediate": "Po Jun reads here as a risk of burnout through overspending energy, and the triangle shows where restorative rhythm needs building in.",
          "practitioner": "Check the triangle rather than treating any single palace as a fixed health verdict, and note the classical caution against depleting the body in pursuit of a goal.",
          "misread": "Reading the recovery pattern as a reason to ignore burnout rather than to build in real rest."
        },
        "qian-yi-gong": {
          "beginner": "Time abroad here tends to be transformative, and relocation is a recurring theme.",
          "intermediate": "Po Jun expresses as foreign settings serving as the canvas for reinvention, and the triangle shows how far from home the native's key changes happen.",
          "practitioner": "Check the opposite and triangle for how movement interacts with the drive to break and rebuild.",
          "misread": "Reading frequent relocation as rootlessness rather than a pattern that enables reinvention."
        },
        "nu-pu-gong": {
          "beginner": "Your network tends to be diverse and unconventional, spanning many fields and stages of life.",
          "intermediate": "Po Jun reads here as attracting fellow innovators, with some short but significant ties, and the triangle colors which relationships require real upkeep.",
          "practitioner": "Check the triangle for which connections are released during a reinvention versus which endure it.",
          "misread": "Reading short-lived but meaningful connections as failed friendships rather than timely ones."
        },
        "guan-lu-gong": {
          "beginner": "You tend to fit fields that need the courage to disrupt, such as arts, PR, entrepreneurship, creative direction, or innovation-driven work.",
          "intermediate": "Po Jun reads here as career paths with genuine discontinuity that cohere from the inside, and the triangle shows what supports those pivots.",
          "practitioner": "Check the opposite Tian Xiang influence for the structure that turns disruption into something that lasts.",
          "misread": "Reading radical career pivots as a lack of direction rather than a coherent pattern of reinvention."
        },
        "tian-zhai-gong": {
          "beginner": "Property here tends to involve significant change, such as buying, selling, renovating, or relocating.",
          "intermediate": "Po Jun expresses as homes that get substantially reimagined, and the triangle shows how dynamic the property base tends to be.",
          "practitioner": "Check the opposite Tian Xiang influence for the stabilizing pull that keeps a shifting property base grounded.",
          "misread": "Reading frequent property change as instability rather than a solid foundation that keeps changing form."
        },
        "fu-de-gong": {
          "beginner": "Your inner and spiritual life tends to involve real transformation rather than comfortable tradition.",
          "intermediate": "Po Jun reads here as drawn to practices that disrupt the habitual self, and the triangle shows what channels that depth.",
          "practitioner": "Check the triangle for where the urge to break old beliefs needs the patient work of building new ones.",
          "misread": "Reading the drive to dismantle old beliefs as mere restlessness rather than a spiritual path."
        },
        "fu-mu-gong": {
          "beginner": "The parental relationship here tends to be complex, sometimes involving a break or an unconventional dynamic from the start.",
          "intermediate": "Po Jun expresses as parents who may have modeled non-traditional paths, and the triangle colors how that shaped the native's own independence.",
          "practitioner": "Check the opposite and triangle for how early family patterns became the first formation the native needed to break.",
          "misread": "Reading an unconventional or broken parental dynamic as only damage, when it often seeded the native's independence."
        }
      },
      "placementsSource": "Star page palace accordion (palace-body-inner) and 'In the Command Palace' prose, cross-checked with docs/zwds/02 section 14."
    }
  };
  STARS.forEach(function (s) {
    var rec = PLACEMENTS[s.id];
    if (!rec) return;
    s.placements = rec.placements;
    s.placementsSource = rec.placementsSource;
    if (rec.placementsSourceNote) s.placementsSourceNote = rec.placementsSourceNote;
  });

  window.ZiweiData.principalStars = STARS;
  window.ZiweiData.starById = byId;
  window.ZiweiData.starGroups = GROUPS;
})();
