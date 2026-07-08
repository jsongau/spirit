/* ============================================================
   Zodi Animal — Proverb of the Day (v5)
   Renders the "Proverb Pond" card (pf-proverb markup) and picks the
   proverb by the BaZi DAY animal (the day's earthly branch), resetting
   at midnight Pacific time. Each of the 12 branches maps to a proverb,
   so a Snake day shows a Snake proverb, and so on. "Another proverb"
   browses the rest. No dependency on the reveal engine.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var REDUCE = false; try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  var EAST_NAMES = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

  /* 15 proverbs transcribed from the site's proverb data + 3 added so every
     one of the 12 day branches (incl. Tiger, Rooster, Dog) has a proverb. */
  var IDS = ["tianshi", "water", "saiweng", "ziran", "jiahe", "qianli", "houde",
             "shuidao", "ningjing", "yinshui", "luoye", "shouzhu", "jishao", "wuji", "wenzhi",
             "huxue", "wenji", "canggou"];

  var PROVERBS = {
    tianshi: { chars: [["天","tiān"],["時","shí"],["地","dì"],["利","lì"],["人","rén"],["和","hé"]],
      literal: "heaven's timing, earth's advantage, human harmony",
      meaning: "The three conditions of success align: the right timing, a favorable place, and united people.",
      soul: "Nothing great stands on timing alone, or place alone, or people alone. It stands where the three lean together, and place is the one you can arrange with your own hands.",
      animal: "Dragon" },
    water: { chars: [["上","shàng"],["善","shàn"],["若","ruò"],["水","shuǐ"]],
      literal: "the highest good is like water",
      meaning: "The finest virtue is like water, which benefits all things and flows to the low places without contending.",
      soul: "Water asks for nothing and shapes everything. It sinks to the low room others avoid and turns even that into a home. To be strong like water is to stop contending and still reach everywhere.",
      animal: "Rat" },
    saiweng: { chars: [["塞","sài"],["翁","wēng"],["失","shī"],["馬","mǎ"]],
      literal: "the frontier old man loses his horse",
      meaning: "A blessing can wear the face of loss; fortune and misfortune cannot be judged in the moment.",
      soul: "You cannot read a morning by noon. The loss that empties you today may be the door you walk through next spring, so hold both grief and hope loosely.",
      animal: "Horse" },
    ziran: { chars: [["順","shùn"],["其","qí"],["自","zì"],["然","rán"]],
      literal: "follow its self-so",
      meaning: "Let nature take its course; work with a thing rather than force it.",
      soul: "A room has its own light and its own flow, and so do you. The art is not to force either into a shape, but to move with what is already there until the two agree.",
      animal: "Monkey" },
    jiahe: { chars: [["家","jiā"],["和","hé"],["萬","wàn"],["事","shì"],["興","xīng"]],
      literal: "family harmonious, ten thousand affairs flourish",
      meaning: "When the household is at peace, everything else succeeds.",
      soul: "Fix the house and the world grows quieter. When the people under one roof are at peace, the ten thousand small troubles outside lose their teeth.",
      animal: "Rabbit" },
    qianli: { chars: [["千","qiān"],["里","lǐ"],["之","zhī"],["行","xíng"],["，",""],["始","shǐ"],["於","yú"],["足","zú"],["下","xià"]],
      literal: "a thousand-li road begins beneath the feet",
      meaning: "Every great undertaking starts with a single step.",
      soul: "The far place frightens only from a distance. Stand at your own threshold, take the single step in front of you, and the thousand miles begin to belong to you.",
      animal: "Snake" },
    houde: { chars: [["厚","hòu"],["德","dé"],["載","zài"],["物","wù"]],
      literal: "thick virtue carries things",
      meaning: "As the earth bears everything, deep virtue supports all around it.",
      soul: "The earth never refuses a thing set upon it. To carry others the way the ground carries you is not weakness; it is the deepest strength a person can hold.",
      animal: "Ox" },
    shuidao: { chars: [["水","shuǐ"],["到","dào"],["渠","qú"],["成","chéng"]],
      literal: "the water arrives, the channel forms",
      meaning: "When conditions are ripe, results follow without forcing.",
      soul: "Stop digging the channel and tend the water instead. When the flow is full enough, the path it needs appears on its own, and what you wanted arrives without a fight.",
      animal: "Ox" },
    ningjing: { chars: [["寧","níng"],["靜","jìng"],["致","zhì"],["遠","yuǎn"]],
      literal: "through tranquility, reach the far",
      meaning: "Only a calm, undistracted mind accomplishes far-reaching aims.",
      soul: "You cannot see far from a shaking place. Quiet the room and quiet the mind, and the horizon you were straining toward comes into view on its own.",
      animal: "Snake" },
    yinshui: { chars: [["飲","yǐn"],["水","shuǐ"],["思","sī"],["源","yuán"]],
      literal: "drink water, think of its source",
      meaning: "Remember your roots and honor those who made your good fortune possible.",
      soul: "Every cup you drink was carried to you by someone. To remember the spring is to keep the water sweet, and to keep yourself whole.",
      animal: "Pig" },
    luoye: { chars: [["落","luò"],["葉","yè"],["歸","guī"],["根","gēn"]],
      literal: "fallen leaves return to the roots",
      meaning: "All things are drawn back toward their origin and their home.",
      soul: "However far the wind takes a leaf, the root is where it is going. There is no shame in the turn toward home; it is the shape the whole year was making.",
      animal: "Goat" },
    shouzhu: { chars: [["守","shǒu"],["株","zhū"],["待","dài"],["兔","tù"]],
      literal: "guard the stump, wait for the rabbit",
      meaning: "A caution against idle hope where effort is needed; arrange your space to act, not to wait.",
      soul: "Luck that came once will not return to the same still hand. Arrange your life to move toward what you want, not to sit by the stump waiting for it to fall again.",
      animal: "Rabbit" },
    jishao: { chars: [["積","jī"],["少","shǎo"],["成","chéng"],["多","duō"]],
      literal: "accumulate few, become many",
      meaning: "Many small things gathered steadily become much; abundance is built grain by grain.",
      soul: "No one gathers a harvest in a day. Abundance is patient arithmetic, a little added and a little kept, until the small becomes a weight you can lean on.",
      animal: "Ox" },
    wuji: { chars: [["物","wù"],["極","jí"],["必","bì"],["反","fǎn"]],
      literal: "when a thing reaches its extreme, it reverses",
      meaning: "Anything pushed to its limit turns into its opposite.",
      soul: "Push anything far enough and it turns into its opposite. The height that will not stop climbing is already leaning toward the fall, so learn when full is full.",
      animal: "Monkey" },
    wenzhi: { chars: [["溫","wēn"],["故","gù"],["知","zhī"],["新","xīn"]],
      literal: "warm the old, know the new",
      meaning: "Reviewing what you have learned yields fresh understanding.",
      soul: "The old ground still has new things in it. Turn over what you already know with fresh attention and it yields a harvest you missed the first time.",
      animal: "Ox" },
    huxue: { chars: [["不","bù"],["入","rù"],["虎","hǔ"],["穴","xué"],["，",""],["焉","yān"],["得","dé"],["虎","hǔ"],["子","zǐ"]],
      literal: "if you do not enter the tiger's den, how will you catch its cub",
      meaning: "Nothing worth having is won without entering the risk that guards it.",
      soul: "The cub is never in the safe field. What you want most sits inside the very den you are avoiding, and the only way to it is through the door you fear.",
      animal: "Tiger" },
    wenji: { chars: [["聞","wén"],["雞","jī"],["起","qǐ"],["舞","wǔ"]],
      literal: "hear the rooster, rise and train",
      meaning: "Rise at the first call and put the hour to work; diligence answers the dawn.",
      soul: "The rooster does not ask whether you slept well. It calls, and the disciplined heart rises to practice while the world is still dark, and that early hour becomes a life.",
      animal: "Rooster" },
    canggou: { chars: [["白","bái"],["雲","yún"],["蒼","cāng"],["狗","gǒu"]],
      literal: "white clouds shift into grey dogs",
      meaning: "The world's affairs change shape without warning, like clouds drifting into new forms.",
      soul: "Watch the sky long enough and the white cloud becomes a grey dog, then nothing at all. Hold your fortunes the same way, lightly, knowing every shape is only passing through.",
      animal: "Dog" }
  };

  /* animal -> [proverb ids] */
  var byAnimal = {};
  IDS.forEach(function (id) { var a = PROVERBS[id].animal; (byAnimal[a] = byAnimal[a] || []).push(id); });

  /* ---- the BaZi day branch, on the Pacific calendar day ---- */
  function jdn(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  function pacificYMD() {
    var y, m, d;
    try {
      var f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "numeric", day: "numeric" });
      f.formatToParts(new Date()).forEach(function (p) {
        if (p.type === "year") y = +p.value; else if (p.type === "month") m = +p.value; else if (p.type === "day") d = +p.value;
      });
    } catch (e) { var n = new Date(); y = n.getFullYear(); m = n.getMonth() + 1; d = n.getDate(); }
    return { y: y, m: m, d: d };
  }
  function dayBranch() {
    var t = pacificYMD(), J = jdn(t.y, t.m, t.d);
    return { J: J, idx: (((J + 1) % 12) + 12) % 12 };
  }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function render(id) {
    var p = PROVERBS[id]; if (!p) return "";
    var ruby = p.chars.map(function (pair) {
      var c = pair[0], py = pair[1];
      return py ? "<ruby>" + c + "<rt>" + py + "</rt></ruby>" : '<span class="cx-punct">' + c + "</span>";
    }).join("");
    var slug = p.animal.toLowerCase();
    var trad = p.chars.map(function (pair) { return pair[0]; }).join("");
    var sayBtn = '<button class="pf-say" type="button" data-say-proverb="' + trad + '" aria-label="Hear the proverb spoken in Mandarin"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6v4h3l4 3V3L5 6H2z" fill="currentColor"/><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>';
    return '<aside class="pf-proverb" aria-label="Chinese proverb">' +
      '<p class="pf-proverb-zh" lang="zh-Hant">' + ruby + sayBtn + "</p>" +
      '<p class="pf-proverb-lit"><span class="k">Literally</span> ' + esc(p.literal) + "</p>" +
      '<p class="pf-proverb-mean"><span class="k">Meaning</span> ' + esc(p.meaning) + "</p>" +
      '<p class="pf-proverb-soul">' + esc(p.soul) + "</p>" +
      '<p class="pf-proverb-note">A proverb we tie to the ' +
        '<a href="chinese-zodiac/' + slug + '/">Year of the ' + p.animal + "</a>." +
        " The pairing is our own reading, not tradition.</p>" +
      "</aside>";
  }

  var dailyId = null, curId = null;
  function dailyProverbId() {
    var db = dayBranch();
    var animal = EAST_NAMES[db.idx];
    var list = byAnimal[animal] || IDS;
    return list[(((db.J % list.length) + list.length) % list.length)];
  }
  function swap(id) {
    var slot = $("#proverb-slot"); if (!slot || !PROVERBS[id]) return;
    curId = id;
    var doSwap = function () { slot.innerHTML = render(id); slot.setAttribute("data-proverb-id", id); };
    if (!REDUCE) {
      slot.style.transition = "opacity .32s ease"; slot.style.opacity = "0";
      window.setTimeout(function () { doSwap(); void slot.offsetWidth; slot.style.opacity = "1"; }, 160);
    } else { doSwap(); slot.style.opacity = "1"; }
  }

  /* ---- Mandarin pronounce for the proverb (self-contained, delegated) ---- */
  function speak(t) {
    if (!window.speechSynthesis || !t) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(t);
      u.lang = "zh-CN"; u.rate = 0.78;
      var vs = speechSynthesis.getVoices() || [];
      for (var i = 0; i < vs.length; i++) { if (/^zh/i.test(vs[i].lang)) { u.voice = vs[i]; break; } }
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function injectSayStyle() {
    if (document.getElementById("pf-say-css")) return;
    var st = document.createElement("style"); st.id = "pf-say-css";
    st.textContent = ".pf-say{display:inline-grid;place-items:center;width:30px;height:30px;margin-left:12px;vertical-align:middle;border-radius:50%;border:1px solid rgba(214,193,140,.4);background:transparent;color:var(--brass,#d6c18c);cursor:pointer;transition:border-color .2s,color .2s,box-shadow .2s}.pf-say:hover{border-color:var(--brass-bright,#efe2b4);color:var(--brass-bright,#efe2b4);box-shadow:0 0 10px rgba(214,193,140,.25)}.pf-say svg{width:16px;height:16px}";
    if (!("speechSynthesis" in window)) st.textContent += ".pf-say{display:none}";
    document.head.appendChild(st);
  }

  function init() {
    if (!$("#proverb-slot")) return;
    injectSayStyle();
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".pf-say");
      if (b) speak(b.getAttribute("data-say-proverb"));
    });
    dailyId = dailyProverbId();
    swap(dailyId);
    var btn = $("#proverb-another");
    if (btn) btn.addEventListener("click", function () {
      var i = IDS.indexOf(curId); if (i < 0) i = 0;
      var next = IDS[(i + 1) % IDS.length];
      if (next === curId) next = IDS[(i + 2) % IDS.length];
      swap(next);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
