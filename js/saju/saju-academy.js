/* ============================================================
   saju-academy.js, the Sage Academy drill engine
   ------------------------------------------------------------
   Auto-generates practice drills that teach a learner to DERIVE
   chart facts themselves. Every answer key comes straight from
   saju-engine.js, so drills are correct by construction (no
   hand-authored keys that could drift). Distractors are plausible
   near-misses. Advancement is earned by correct answers, never clicks.

   Curriculum (7 ranks): Visitor to Chart Keeper to Relationship Reader  to 
   Season Reader to Pattern Reader to Time Reader to Sage Practitioner.

   Depends on saju-engine.js. UMD (browser window.SajuAcademy + Node).
   ============================================================ */
(function (root, factory) {
  var Engine = (typeof require !== "undefined") ? require("./saju-engine.js") : root.SajuEngine;
  var api = factory(Engine);
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SajuAcademy = api;
})(typeof self !== "undefined" ? self : this, function (Engine) {
  "use strict";

  var VERSION = "saju-academy/1.0.0";
  var R = Engine.REF, W = Engine.WUXING;
  var ELS = ["Wood", "Fire", "Earth", "Metal", "Water"];

  function pick(rng, a) { return a[Math.floor(rng() * a.length)]; }
  function shuffle(rng, a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function othersEl(el) { return ELS.filter(function (e) { return e !== el; }); }
  function elName(el) { return W.ko[el] + " " + W.han[el]; }

  // build a multiple-choice item from options + the correct string
  function mc(rng, o) {
    var seen = {}, uniq = [];
    o.options.forEach(function (x) { if (!seen[x]) { seen[x] = 1; uniq.push(x); } });
    if (uniq.indexOf(o.correct) < 0) uniq.unshift(o.correct);
    var choices = shuffle(rng, uniq).map(function (x) { return { text: x, correct: x === o.correct }; });
    return { type: o.type, skill: o.skill, prompt: o.prompt, choices: choices, explanation: o.explanation, glossary: o.glossary || [] };
  }

  // ---- generators (one per skill) ----
  var GEN = {
    "stem-id": function (rng) {
      var i = Math.floor(rng() * 10), el = R.STEM_EL[i], yin = R.STEM_YIN[i];
      var correct = el + " · " + (yin ? "yin" : "yang");
      var opts = [correct, pick(rng, othersEl(el)) + " · " + (yin ? "yin" : "yang"),
        el + " · " + (yin ? "yang" : "yin"), pick(rng, othersEl(el)) + " · " + (yin ? "yang" : "yin")];
      return mc(rng, {
        type: "stem-id", skill: "recognition",
        prompt: "The Heavenly Stem " + R.STEMS[i] + " (" + R.STEM_KO[i] + ", " + R.STEM_ROM[i] + "), its element and polarity?",
        options: opts, correct: correct,
        explanation: R.STEMS[i] + " is " + (yin ? "yin" : "yang") + " " + el + ". The ten stems run through the five elements, each in a yang then a yin form.",
        glossary: ["천간", "오행"]
      });
    },
    "branch-id": function (rng) {
      var i = Math.floor(rng() * 12), el = R.BRANCH_EL[i], an = R.BRANCH_ANIMAL[i];
      var correct = el + " · " + an;
      var opts = [correct, pick(rng, othersEl(el)) + " · " + an,
        el + " · " + R.BRANCH_ANIMAL[(i + 1) % 12], pick(rng, othersEl(el)) + " · " + R.BRANCH_ANIMAL[(i + 11) % 12]];
      return mc(rng, {
        type: "branch-id", skill: "recognition",
        prompt: "The Earthly Branch " + R.BRANCHES[i] + " (" + R.BRANCH_KO[i] + "), its element and zodiac animal?",
        options: opts, correct: correct,
        explanation: R.BRANCHES[i] + " is the " + an + ", an " + el + " branch. In Saju the branches carry seasons and hours, not only animals.",
        glossary: ["지지"]
      });
    },
    "gen": function (rng) {
      var el = pick(rng, ELS), correct = elName(W.generates[el]);
      var opts = [correct].concat(othersEl(W.generates[el]).map(elName));
      return mc(rng, {
        type: "gen", skill: "derivation",
        prompt: "In the generating cycle (상생), " + elName(el) + " generates which element?",
        options: opts.slice(0, 4), correct: correct,
        explanation: elName(el) + " generates " + elName(W.generates[el]) + ". The generating order is Wood, Fire, Earth, Metal, Water, and back to Wood.",
        glossary: ["오행", "상생"]
      });
    },
    "ctrl": function (rng) {
      var el = pick(rng, ELS), correct = elName(W.controls[el]);
      var opts = [correct].concat(othersEl(W.controls[el]).map(elName));
      return mc(rng, {
        type: "ctrl", skill: "derivation",
        prompt: "In the controlling cycle (상극), " + elName(el) + " controls which element?",
        options: opts.slice(0, 4), correct: correct,
        explanation: elName(el) + " controls " + elName(W.controls[el]) + ". Each element controls the one two steps ahead in the generating order.",
        glossary: ["오행", "상극"]
      });
    },
    "tengod": function (rng) {
      var dm = pick(rng, ELS), other = pick(rng, ELS);
      var tg = Engine.tenGodByElement(dm, other);
      var correct = tg.en + " (" + tg.ko + ")";
      var all = ["Companion (비겁)", "Resource (인성)", "Output (식상)", "Wealth (재성)", "Officer (관성)"];
      return mc(rng, {
        type: "tengod", skill: "derivation",
        prompt: "Your Day Master is " + elName(dm) + ". Another " + elName(other) + " element is your…?",
        options: [correct].concat(all.filter(function (x) { return x !== correct; })).slice(0, 4), correct: correct,
        explanation: "Relative to a " + dm + " Day Master, " + other + " is " + tg.en + " (" + tg.ko + "). Same element = Companion; it generates you = Resource; you generate it = Output; you control it = Wealth; it controls you = Officer.",
        glossary: ["십신", tg.ko]
      });
    },
    "hidden": function (rng) {
      var i = Math.floor(rng() * 12);
      function setOf(bi) { return (R.HIDDEN[bi] || []).map(function (h) { return R.STEMS[h]; }).join(" "); }
      var correct = setOf(i);
      var opts = [correct, setOf((i + 1) % 12), setOf((i + 11) % 12), setOf((i + 6) % 12)];
      return mc(rng, {
        type: "hidden", skill: "derivation",
        prompt: "Which stems are hidden inside the branch " + R.BRANCHES[i] + " (지장간)?",
        options: opts, correct: correct,
        explanation: R.BRANCHES[i] + " hides " + correct + ". Each branch conceals one to three stems; the last is its main qi (정기).",
        glossary: ["지장간"]
      });
    },
    "season": function (rng) {
      var dmI = Math.floor(rng() * 10), dmEl = R.STEM_EL[dmI];
      var mb = Math.floor(rng() * 12);
      var mainH = R.HIDDEN[mb][R.HIDDEN[mb].length - 1];
      var monthEl = R.STEM_EL[mainH];
      var tg = Engine.tenGodByElement(dmEl, monthEl);
      var supported = (tg.ko === "비겁" || tg.ko === "인성");
      var correct = supported ? "In season (득령)" : "Out of season (실령)";
      return mc(rng, {
        type: "season", skill: "judgement",
        prompt: "A " + elName(dmEl) + " Day Master (" + R.STEMS[dmI] + ") born in the " + R.BRANCHES[mb] + " month (main element " + elName(monthEl) + "), is it in season?",
        options: [correct, supported ? "Out of season (실령)" : "In season (득령)"], correct: correct,
        explanation: "The month's main element is " + monthEl + ", which is " + tg.en + " (" + tg.ko + ") to the Day Master, so it " + (supported ? "supports it (득령, in season)." : "does not support it (실령, out of season)."),
        glossary: ["월령", "득령"]
      });
    },
    "daymaster-locate": function (rng, chart) {
      var c = chart || sampleChart(rng);
      var p = c.pillars, day = p.day.stem.char;
      var opts = [day, p.year.stem.char, p.month.stem.char, p.hour ? p.hour.stem.char : p.year.branch.char];
      return mc(rng, {
        type: "daymaster-locate", skill: "recognition",
        prompt: "In this chart, Year " + p.year.stem.char + p.year.branch.char + ", Month " + p.month.stem.char + p.month.branch.char + ", Day " + p.day.stem.char + p.day.branch.char + (p.hour ? ", Hour " + p.hour.stem.char + p.hour.branch.char : "") + ", which stem is the Day Master?",
        options: opts, correct: day,
        explanation: "The Day Master is always the stem of the Day pillar (일간), here " + day + ". The whole reading turns around it.",
        glossary: ["일간", "일주"]
      });
    },
    "strength": function (rng, chart) {
      var c = chart && (chart.strength.index < 30 || chart.strength.index > 70) && !chart.strength.extreme ? chart : unambiguousStrengthChart(rng);
      var s = c.strength, weak = s.index < 50;
      var correct = weak ? "Weak (신약)" : "Strong (신강)";
      var p = c.pillars;
      return mc(rng, {
        type: "strength", skill: "synthesis",
        prompt: "Day Master " + p.day.stem.char + " (" + p.day.stem.element + "), born in the " + p.month.branch.char + " month, support index " + s.index + "/100. Strong or weak?",
        options: [correct, weak ? "Strong (신강)" : "Weak (신약)"], correct: correct,
        explanation: "By 억부, a support index of " + s.index + "/100 reads " + s.verdict.ko + " (" + s.verdict.en + "). Above ~60 leans strong, below ~40 leans weak; the month branch weighs heaviest.",
        glossary: ["억부", "신강", "신약"]
      });
    },
    "facts": function (rng) {
      var item = pick(rng, FACTS.concat(INTERPS));
      var isFact = FACTS.indexOf(item) >= 0;
      var correct = isFact ? "Computed fact" : "Interpretation";
      return mc(rng, {
        type: "facts", skill: "discrimination",
        prompt: "Fact or interpretation?  “" + item + "”",
        options: ["Computed fact", "Interpretation"], correct: correct,
        explanation: isFact ? "This is a computed fact, it reads directly off the chart and can be checked." : "This is an interpretation, a reading laid on top of the facts, which the tradition treats as reflective, not certain.",
        glossary: ["통변"]
      });
    },
    "nonfatal": function (rng) {
      var good = pick(rng, NONFATAL_GOOD);
      var bads = shuffle(rng, NONFATAL_BAD).slice(0, 2);
      return mc(rng, {
        type: "nonfatal", skill: "judgement",
        prompt: "Which states the timing responsibly?",
        options: [good].concat(bads), correct: good,
        explanation: "Responsible timing language describes climate, pressure, and choice, a lens for reflection. It never promises events or hands out instructions.",
        glossary: ["대운", "세운"]
      });
    },
    "critique": function (rng) {
      var bad = pick(rng, OVERREACH);
      var goods = shuffle(rng, SAFE_LINES).slice(0, 2);
      return mc(rng, {
        type: "critique", skill: "teaching",
        prompt: "One of these sentences overreaches the safe-reading rules. Which one?",
        options: [bad].concat(goods), correct: bad,
        explanation: "That line makes a hard prediction or hands out life advice. A responsible reading stays with tendency and timing, and never claims a certain outcome.",
        glossary: []
      });
    },
    "daeun-dir": function (rng) {
      var yang = rng() < 0.5, male = rng() < 0.5;
      var forward = (yang === male);
      var correct = forward ? "Forward (순행)" : "Reverse (역행)";
      return mc(rng, {
        type: "daeun-dir", skill: "derivation",
        prompt: "A " + (yang ? "yang" : "yin") + "-year chart, sex at birth " + (male ? "male" : "female") + ", do the luck pillars run forward or reverse?",
        options: [correct, forward ? "Reverse (역행)" : "Forward (순행)"], correct: correct,
        explanation: "Direction = (year-stem is yang) matches (sex is male). " + (yang ? "Yang" : "Yin") + " year with " + (male ? "male" : "female") + " runs " + (forward ? "forward 순행." : "reverse 역행."),
        glossary: ["대운", "순행", "역행"]
      });
    }
  };

  // ---- sample-chart helpers (varied charts so learners don't overfit one example) ----
  function randDateInput(rng) {
    var y = 1955 + Math.floor(rng() * 60), m = 1 + Math.floor(rng() * 12), d = 1 + Math.floor(rng() * 27);
    var hh = Math.floor(rng() * 24), mm = Math.floor(rng() * 60);
    return { date: y + "-" + pad(m) + "-" + pad(d), time: pad(hh) + ":" + pad(mm), lon: 127.0, calendar: "solar" };
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function sampleChart(rng) { return Engine.castChart(randDateInput(rng), {}); }
  function unambiguousStrengthChart(rng) {
    for (var t = 0; t < 40; t++) { var c = sampleChart(rng); if (!c.strength.extreme && (c.strength.index < 30 || c.strength.index > 70)) return c; }
    return sampleChart(rng);
  }

  // ---- statement pools ----
  var FACTS = [
    "The Day Master is 丙, a yang Fire stem.",
    "The month branch is 午.",
    "戊 is Wealth to a Water Day Master.",
    "The branch 子 hides the stem 癸.",
    "This chart reads 신약 by the 억부 method.",
    "The first Daeun begins at age 7.",
    "Wood generates Fire in the 상생 cycle."
  ];
  var INTERPS = [
    "You are a natural leader.",
    "This is a lucky year to marry.",
    "Your weak Fire means you lack confidence.",
    "This season favors patient, steady effort.",
    "You tend to think before you speak.",
    "A cold chart can feel slow to warm up."
  ];
  var NONFATAL_GOOD = [
    "This decade leans toward more responsibility; it can reward steady pacing.",
    "This year may bring relationship themes forward, worth reflecting on.",
    "A demanding season like this asks for more patience, not a verdict."
  ];
  var NONFATAL_BAD = [
    "You will get married in 2027.",
    "This is a disaster year; expect losses.",
    "Avoid signing any contracts in March.",
    "Your fate this decade is fixed.",
    "You are guaranteed wealth this year."
  ];
  var OVERREACH = [
    "You will divorce within three years.",
    "Take a job in finance and you will succeed.",
    "Your weak Water means you will always struggle with money.",
    "This year guarantees a promotion.",
    "You should marry a Fire person."
  ];
  var SAFE_LINES = [
    "Your Day Master is yin Water, which can run from adaptable to restless.",
    "By 억부 this chart reads weak and leans on its Resource element.",
    "The current Daeun is a Wealth season, a climate to work with.",
    "This chart runs cold, so warmth is the balancing theme.",
    "Fire controls Metal in the 상극 cycle."
  ];

  // ---- ranks + mastery ----
  var RANKS = [
    { n: 1, key: "visitor", name: "Visitor", ko: "방문자", han: "訪問者", skills: ["stem-id", "branch-id"], need: 6, teach: "Recognize the vocabulary, stems, branches, elements." },
    { n: 2, key: "chart-keeper", name: "Chart Keeper", ko: "명식지기", han: "命式知己", skills: ["daymaster-locate", "stem-id", "branch-id"], need: 6, teach: "Read the four pillars off a chart and find the Day Master." },
    { n: 3, key: "relationship-reader", name: "Relationship Reader", ko: "관계독해", han: "關係讀解", skills: ["gen", "ctrl", "tengod"], need: 8, teach: "Derive the five-element relations and the Ten Gods." },
    { n: 4, key: "season-reader", name: "Season Reader", ko: "계절독해", han: "季節讀解", skills: ["hidden", "season", "strength"], need: 8, teach: "Locate hidden stems, judge seasonal command and Day Master strength." },
    { n: 5, key: "pattern-reader", name: "Pattern Reader", ko: "패턴독해", han: "格局讀解", skills: ["facts", "tengod", "strength"], need: 8, teach: "Separate fact from interpretation; hold more than one method." },
    { n: 6, key: "time-reader", name: "Time Reader", ko: "시간독해", han: "時間讀解", skills: ["daeun-dir", "nonfatal"], need: 6, teach: "Read timing, luck pillars and years, without fatalism." },
    { n: 7, key: "sage", name: "Sage Practitioner", ko: "명리사범", han: "命理師範", skills: ["critique", "facts", "nonfatal"], need: 8, teach: "Critique a weak reading and teach a beginner." }
  ];
  function rankByKey(k) { for (var i = 0; i < RANKS.length; i++) if (RANKS[i].key === k) return RANKS[i]; return RANKS[0]; }

  // generate one drill for a rank (uses the learner's chart where a skill wants one)
  function drill(rankKey, chart, rng) {
    rng = rng || Math.random;
    var rank = rankByKey(rankKey);
    var skill = rank.skills[Math.floor(rng() * rank.skills.length)];
    var d = GEN[skill](rng, chart);
    d.rank = rank.name; d.rank_key = rank.key;
    return d;
  }

  return { VERSION: VERSION, RANKS: RANKS, GEN: GEN, drill: drill, rankByKey: rankByKey, _sampleChart: sampleChart };
});
