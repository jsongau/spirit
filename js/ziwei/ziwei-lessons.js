/* ziwei-lessons.js: the Reader's Path lesson map for Purple Star Astrology.
   Generated from PSA-CURRICULUM.md Part 1 (8 levels, 67 lessons). Each lesson carries its id,
   title, the existing page/anchor that supplies its content (source), and, for the levels wired
   this wave (L1-L3 and the hub models), a `hub` hook naming the on-hub action that completes it.
   `rank` on each level is the rung earned by completing it (PSA-CURRICULUM Part 2). `ability` is the
   one-sentence "you can now..." for the #your-path ladder. Levels 6-8's home pages arrive in later
   waves; their lessons are listed (so #your-path is complete) and flagged coming where the page is not built.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.lessons) return;

  var HUB = "/elements/purple-star-astrology/";
  function L(id, title, href, hub) { return { id: id, title: title, href: href, hub: hub || null }; }

  var LEVELS = [
    {
      id: "L1", num: 1, name: "Orientation", rank: "Court Novice 入門",
      ability: "Name what a chart is and is not, and its four moving parts: palaces, stars, forces, timing.",
      lessons: [
        L("1.1", "What a chart reads", HUB + "#the-court"),
        L("1.2", "The court metaphor and the name", HUB + "history/"),
        L("1.3", "Palaces and stars at a glance", HUB + "#the-court", "court-explore"),
        L("1.4", "Natal vs timing, the chart is a movie", HUB + "chart/#timing-h"),
        L("1.5", "Why one placement is never the reading", HUB + "#read-the-triangle"),
        L("1.6", "Cast your study chart", HUB + "chart/", "cast")
      ]
    },
    {
      id: "L2", num: 2, name: "The Twelve Palaces", rank: "Palace Scribe 宮書",
      ability: "Walk every room, name its question and its opposite, and state that no palace is read alone.",
      lessons: [
        L("2.0", "How palaces work", HUB + "palaces/"),
        L("2.1", "命宮 The Command Palace", HUB + "palaces/", "court-palace:ming-gong"),
        L("2.2", "兄弟宮 The Peer Circle", HUB + "palaces/"),
        L("2.3", "夫妻宮 The Mirror of Union", HUB + "palaces/"),
        L("2.4", "子女宮 The Legacy Garden", HUB + "palaces/"),
        L("2.5", "財帛宮 The Celestial Treasury", HUB + "palaces/"),
        L("2.6", "疾厄宮 The Constitution Map", HUB + "palaces/"),
        L("2.7", "遷移宮 The World Stage", HUB + "palaces/"),
        L("2.8", "奴僕宮 The Alliance Court", HUB + "palaces/"),
        L("2.9", "官祿宮 The Imperial Hall", HUB + "palaces/"),
        L("2.10", "田宅宮 The Ancestral Foundation", HUB + "palaces/"),
        L("2.11", "福德宮 The Soul Palace", HUB + "palaces/"),
        L("2.12", "父母宮 The Origin Gate", HUB + "palaces/")
      ]
    },
    {
      id: "L3", num: 3, name: "The Fourteen Principal Stars", rank: "Star Keeper 司星",
      ability: "Meet any of the fourteen and describe its gift, its shadow, and a room where its meaning shifts.",
      lessons: [
        L("3.0", "The two star families", HUB + "stars/"),
        L("3.1", "Brightness levels 廟旺利陷", HUB + "stars/"),
        L("3.2", "紫微 The Emperor Star", HUB + "stars/zi-wei/", "star:zi-wei"),
        L("3.3", "天府 The Treasury Star", HUB + "stars/tian-fu/"),
        L("3.4", "天機 The Strategist", HUB + "stars/tian-ji/"),
        L("3.5", "太陽 The Sun Star", HUB + "stars/tai-yang/"),
        L("3.6", "太陰 The Moon Star", HUB + "stars/tai-yin/"),
        L("3.7", "武曲 The Finance General", HUB + "stars/wu-qu/"),
        L("3.8", "天同 The Harmony Star", HUB + "stars/tian-tong/"),
        L("3.9", "廉貞 The Diplomat", HUB + "stars/lian-zhen/"),
        L("3.10", "天相 The Prime Minister", HUB + "stars/tian-xiang/"),
        L("3.11", "天梁 The Elder Star", HUB + "stars/tian-liang/"),
        L("3.12", "巨門 The Dark Gate", HUB + "stars/ju-men/"),
        L("3.13", "貪狼 The Desire Star", HUB + "stars/tan-lang/"),
        L("3.14", "七殺 The Warrior", HUB + "stars/qi-sha/"),
        L("3.15", "破軍 The Vanguard", HUB + "stars/po-jun/")
      ]
    },
    {
      id: "L4", num: 4, name: "The Four Transformations", rank: "Warden of the Forces 司化",
      ability: "Find the four marked stars in any chart and say what each mark does, without claiming it dooms anything.",
      lessons: [
        L("4.0", "What a transformation is", HUB + "#four-transformations", "tf-two-stems"),
        L("4.1", "化祿 The Flow", HUB + "four-forces/"),
        L("4.2", "化權 The Power", HUB + "four-forces/"),
        L("4.3", "化科 The Shine", HUB + "four-forces/"),
        L("4.4", "化忌 The Hook", HUB + "four-forces/"),
        L("4.5", "The Stem Table lab, find your natal four", HUB + "four-forces/")
      ]
    },
    {
      id: "L5", num: 5, name: "Palace Relationships", rank: "Warden of the Forces 司化",
      ability: "See triangles instead of rooms: name any palace's full court and why the mirror outweighs the laterals.",
      lessons: [
        L("5.1", "The mirror, opposite pairs", HUB + "palaces/#mirrors-h2"),
        L("5.2", "The Triangle, visually", HUB + "#read-the-triangle", "triangle-full"),
        L("5.3", "The Primary Court 命財官遷", HUB + "chart/#method-h"),
        L("5.4", "Borrowing across the wheel 借星", HUB + "chart/"),
        L("5.5", "Read-together protocols and synthesis", HUB + "palaces/")
      ]
    },
    {
      id: "L6", num: 6, name: "Supporting Stars and Structure", rank: "Keeper of the Doors 司門",
      ability: "Read the conditioning layer without drowning in it: place any auxiliary in its group and check a pattern's conditions.",
      lessons: [
        L("6.0", "The conditioning layer", HUB + "supporting-stars/"),
        L("6.1", "The Assistants 左輔 右弼", HUB + "supporting-stars/"),
        L("6.2", "The Nobles 天魁 天鉞", HUB + "supporting-stars/"),
        L("6.3", "The Scholars 文昌 文曲", HUB + "supporting-stars/"),
        L("6.4", "The Four Sha 四煞", HUB + "supporting-stars/"),
        L("6.5", "The Voids 地空 地劫", HUB + "supporting-stars/"),
        L("6.6", "Movement and romance stars", HUB + "supporting-stars/"),
        L("6.7", "Patterns 格局", HUB + "supporting-stars/")
      ]
    },
    {
      id: "L7", num: 7, name: "Timing", rank: "Keeper of the Doors 司門",
      ability: "Say which chapter a chart is in, and refuse to say more than the method allows.",
      lessons: [
        L("7.1", "The Bureau and the decade clock 五行局", HUB + "chart/#timing-h"),
        L("7.2", "Decade Doors 大限", HUB + "chart/#timing-h"),
        L("7.3", "The Year Wave 流年", HUB + "chart/#timing-h"),
        L("7.4", "The twelve lifecycle phases", HUB + "chart/"),
        L("7.5", "Three layers and convergence", HUB + "chart/"),
        L("7.6", "Responsible forecasting", HUB + "chart/")
      ]
    },
    {
      id: "L8", num: 8, name: "Synthesis and the Reader's Path", rank: "Imperial Astrologer 欽天監",
      ability: "Teach the foundations and give a structured, responsible reading of an unfamiliar chart.",
      lessons: [
        L("8.1", "The full reading order", HUB + "#readers-path"),
        L("8.2", "Evidence hierarchy and conflicting signals", HUB + "chart/"),
        L("8.3", "Uncertainty language and what not to claim", HUB + "chart/"),
        L("8.4", "The consultation structure (house method)", HUB + "chart/"),
        L("8.5", "Practice chart two", HUB + "chart/"),
        L("8.6", "Teach-it-back", HUB + "chart/"),
        L("8.7", "The Reader's Exam, second sitting", HUB + "chart/#exam")
      ]
    }
  ];

  var levelById = {}, lessonById = {}, order = [];
  LEVELS.forEach(function (lv) {
    levelById[lv.id] = lv; order.push(lv.id);
    lv.lessons.forEach(function (ls) { ls.level = lv.id; lessonById[ls.id] = ls; });
  });

  window.ZiweiData.lessons = LEVELS;
  window.ZiweiData.levelById = levelById;
  window.ZiweiData.lessonById = lessonById;
  window.ZiweiData.levelOrder = order;
  window.ZiweiData.lessonCount = Object.keys(lessonById).length;
})();
