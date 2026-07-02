/* proverbs-study.js: flashcards, the path, the quiz, Mandarin TTS. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- data ---------- */
  var DATA = [], PROMPTS = {}, DEFAULT_PROMPT = "";
  try {
    var raw = JSON.parse(document.getElementById("pv-study-data").textContent);
    DATA = raw.proverbs || [];
    PROMPTS = raw.prompts || {};
    DEFAULT_PROMPT = raw.defaultPrompt || "";
  } catch (e) { DATA = []; }
  var ANIMAL_HANZI = {Rat:"鼠",Ox:"牛",Tiger:"虎",Rabbit:"兔",Dragon:"龍",Snake:"蛇",Horse:"馬",Goat:"羊",Monkey:"猴",Rooster:"雞",Dog:"狗",Pig:"豬"};

  function rubyHTML(p) {
    return p.chars.map(function (c) {
      return c[1] ? "<ruby>" + c[0] + "<rt>" + c[1] + "</rt></ruby>" : '<span class="cx-punct">' + c[0] + "</span>";
    }).join("");
  }
  function animalHref(a) { return "/chinese-zodiac/" + String(a).toLowerCase() + "/"; }
  function animalLabel(a) { return (ANIMAL_HANZI[a] || "") + " Year of the " + a; }
  function promptFor(p) { return PROMPTS[p.theme] || DEFAULT_PROMPT; }

  /* ---------- Mandarin speech (zh-CN, slow, mirrors the hub) ---------- */
  var zhVoice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return;
    var vs = speechSynthesis.getVoices() || [];
    zhVoice = vs.filter(function (v) { return /^zh\b|zh[-_]/i.test(v.lang) || /Chinese|中文|普通话|國語/i.test(v.name); })[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, btn) {
    if (!window.speechSynthesis || !text) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN"; u.rate = 0.78; u.pitch = 1;
      if (zhVoice) u.voice = zhVoice;
      if (btn) { btn.classList.add("is-saying"); u.onend = u.onerror = function () { btn.classList.remove("is-saying"); }; }
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  /* delegated: any element carrying data-say speaks its text */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-say]");
    if (!b) return;
    e.stopPropagation();
    var t = b.getAttribute("data-say");
    if (t) speak(t, b);
  });

  /* ---------- storage (one key, three sub-states) ---------- */
  var KEY = "za_proverbs_study";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var store = load();
  if (!store.marks) store.marks = {};      // id -> "known" | "learning"
  if (typeof store.path !== "number") store.path = 0;
  if (!store.quiz) store.quiz = { right: 0, answered: 0 };

  /* ---------- mode tabs ---------- */
  var tabs = {
    cards: { btn: document.getElementById("tabCards"), pane: document.getElementById("paneCards") },
    path: { btn: document.getElementById("tabPath"), pane: document.getElementById("panePath") },
    quiz: { btn: document.getElementById("tabQuiz"), pane: document.getElementById("paneQuiz") }
  };
  function showMode(name) {
    Object.keys(tabs).forEach(function (k) {
      var on = k === name;
      if (tabs[k].btn) { tabs[k].btn.classList.toggle("is-on", on); tabs[k].btn.setAttribute("aria-selected", on ? "true" : "false"); }
      if (tabs[k].pane) { tabs[k].pane.classList.toggle("is-on", on); tabs[k].pane.hidden = !on; }
    });
    if (name === "quiz") ensureQuiz();
  }
  if (tabs.cards.btn) tabs.cards.btn.addEventListener("click", function () { showMode("cards"); });
  if (tabs.path.btn) tabs.path.btn.addEventListener("click", function () { showMode("path"); });
  if (tabs.quiz.btn) tabs.quiz.btn.addEventListener("click", function () { showMode("quiz"); });

  /* ================= FLASHCARDS ================= */
  var order = DATA.map(function (_, i) { return i; }); // indices into DATA, filtered + shuffled
  var pos = 0;
  var themeFilter = "";
  var card = document.getElementById("psCard");
  var cardInner = document.getElementById("psCardInner");
  var cZh = document.getElementById("psCardZh"), cTheme = document.getElementById("psCardTheme"),
      cPy = document.getElementById("psCardPinyin"), cLit = document.getElementById("psCardLit"),
      cMean = document.getElementById("psCardMean"), cSoul = document.getElementById("psCardSoul"),
      cAnimal = document.getElementById("psCardAnimal"), cCount = document.getElementById("psCount"),
      cTally = document.getElementById("psTally");
  var cSay = card ? card.querySelector(".ps-say") : null;

  function rebuildOrder() {
    order = [];
    for (var i = 0; i < DATA.length; i++) {
      if (!themeFilter || DATA[i].theme === themeFilter) order.push(i);
    }
    if (pos >= order.length) pos = 0;
  }
  function currentCard() { return order.length ? DATA[order[pos]] : null; }
  function markOf(id) { return store.marks[id] || ""; }
  function tally() {
    var known = 0, learning = 0;
    for (var id in store.marks) {
      if (store.marks[id] === "known") known++;
      else if (store.marks[id] === "learning") learning++;
    }
    return { known: known, learning: learning };
  }
  function paintTally() {
    if (!cTally) return;
    var t = tally();
    cTally.textContent = "Known " + t.known + " · Still learning " + t.learning;
  }
  function paintCard() {
    var p = currentCard();
    if (!card) return;
    card.classList.remove("is-flipped");
    if (!p) {
      if (cZh) cZh.textContent = "";
      if (cCount) cCount.textContent = "0 of 0";
      return;
    }
    if (cTheme) cTheme.textContent = p.theme;
    if (cZh) cZh.innerHTML = rubyHTML(p);
    if (cSay) cSay.setAttribute("data-say", p.trad);
    if (cPy) cPy.textContent = p.pinyin;
    if (cLit) cLit.textContent = "“" + p.literal + "”";
    if (cMean) cMean.textContent = p.meaning;
    if (cSoul) cSoul.textContent = p.soul;
    if (cAnimal) { cAnimal.textContent = animalLabel(p.animal); cAnimal.setAttribute("href", animalHref(p.animal)); }
    if (cCount) cCount.textContent = (pos + 1) + " of " + order.length;
    card.setAttribute("data-mark", markOf(p.id));
    paintTally();
  }
  function flip() { if (card) card.classList.toggle("is-flipped"); }
  function nextCard() { if (!order.length) return; pos = (pos + 1) % order.length; paintCard(); }
  function prevCard() { if (!order.length) return; pos = (pos - 1 + order.length) % order.length; paintCard(); }
  function shuffleCards() {
    for (var i = order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    pos = 0; paintCard();
  }
  function mark(kind) {
    var p = currentCard();
    if (!p) return;
    if (store.marks[p.id] === kind) delete store.marks[p.id];
    else store.marks[p.id] = kind;
    save(store);
    if (card) card.setAttribute("data-mark", markOf(p.id));
    paintTally();
    if (kind === "known") nextCard();
  }

  if (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest("[data-say]") || e.target.closest("a")) return;
      flip();
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); nextCard(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prevCard(); }
    });
  }
  var elNext = document.getElementById("psNext"), elPrev = document.getElementById("psPrev"),
      elShuffle = document.getElementById("psShuffle"), elReset = document.getElementById("psReset"),
      elKnown = document.getElementById("psKnown"), elLearning = document.getElementById("psLearning");
  if (elNext) elNext.addEventListener("click", nextCard);
  if (elPrev) elPrev.addEventListener("click", prevCard);
  if (elShuffle) elShuffle.addEventListener("click", shuffleCards);
  if (elKnown) elKnown.addEventListener("click", function () { mark("known"); });
  if (elLearning) elLearning.addEventListener("click", function () { mark("learning"); });
  if (elReset) elReset.addEventListener("click", function () {
    store.marks = {}; save(store);
    if (card) card.setAttribute("data-mark", "");
    paintCard();
  });
  var chipWrap = document.querySelector(".ps-chips");
  if (chipWrap) chipWrap.addEventListener("click", function (e) {
    var chip = e.target.closest(".ps-chip");
    if (!chip) return;
    themeFilter = chip.getAttribute("data-theme") || "";
    var sibs = chipWrap.querySelectorAll(".ps-chip");
    for (var i = 0; i < sibs.length; i++) sibs[i].classList.toggle("is-on", sibs[i] === chip);
    rebuildOrder(); pos = 0; paintCard();
  });

  rebuildOrder();
  paintCard();

  /* ================= THE PATH ================= */
  var pathBar = document.getElementById("psPathBar"), pathLabel = document.getElementById("psPathLabel");
  var mZh = document.getElementById("psMedZh"), mTheme = document.getElementById("psMedTheme"),
      mPy = document.getElementById("psMedPinyin"), mMean = document.getElementById("psMedMean"),
      mSoul = document.getElementById("psMedSoul"), mPrompt = document.getElementById("psMedPrompt"),
      mAnimal = document.getElementById("psMedAnimal"), medBox = document.getElementById("psMed");
  var mSay = medBox ? medBox.querySelector(".ps-say") : null;

  function clampPath() {
    if (store.path < 0) store.path = 0;
    if (store.path > DATA.length - 1) store.path = DATA.length - 1;
  }
  function paintMed() {
    if (!medBox || !DATA.length) return;
    clampPath();
    var p = DATA[store.path];
    if (mTheme) mTheme.textContent = p.theme;
    if (mZh) mZh.innerHTML = rubyHTML(p);
    if (mSay) mSay.setAttribute("data-say", p.trad);
    if (mPy) mPy.textContent = p.pinyin;
    if (mMean) mMean.textContent = p.meaning;
    if (mSoul) mSoul.textContent = p.soul;
    if (mPrompt) mPrompt.textContent = promptFor(p);
    if (mAnimal) { mAnimal.textContent = animalLabel(p.animal); mAnimal.setAttribute("href", animalHref(p.animal)); }
    var step = store.path + 1, total = DATA.length;
    if (pathLabel) pathLabel.textContent = "Step " + step + " of " + total;
    if (pathBar) pathBar.style.width = Math.round((step / total) * 100) + "%";
    if (medBox) {
      medBox.classList.remove("is-in");
      void medBox.offsetWidth;
      medBox.classList.add("is-in");
    }
  }
  function pathNext() {
    if (store.path < DATA.length - 1) store.path++;
    save(store); paintMed();
  }
  function pathPrev() {
    if (store.path > 0) store.path--;
    save(store); paintMed();
  }
  var elMedNext = document.getElementById("psMedNext"), elMedPrev = document.getElementById("psMedPrev"),
      elMedRestart = document.getElementById("psMedRestart");
  if (elMedNext) elMedNext.addEventListener("click", pathNext);
  if (elMedPrev) elMedPrev.addEventListener("click", pathPrev);
  if (elMedRestart) elMedRestart.addEventListener("click", function () {
    store.path = 0; save(store); paintMed();
  });
  paintMed();

  /* ================= THE QUIZ ================= */
  var qZh = document.getElementById("psQuizZh"), qTheme = document.getElementById("psQuizTheme"),
      qPy = document.getElementById("psQuizPinyin"), qOpts = document.getElementById("psQuizOpts"),
      qFeedback = document.getElementById("psQuizFeedback"), qScore = document.getElementById("psQuizScore"),
      qNext = document.getElementById("psQuizNext"), quizBox = document.getElementById("psQuiz");
  var qSay = quizBox ? quizBox.querySelector(".ps-say") : null;
  var quizAnswer = null, quizLocked = false, quizStarted = false;
  var CALM_RIGHT = ["That is the one.", "Yes, that fits.", "Settled, and rightly.", "That reading holds.", "Quietly correct."];
  var CALM_WRONG = ["Not quite. The truer sense is shown below.", "Close, though another fits better. See it below.", "That one drifts. The fuller meaning is below.", "A near miss. The line means what is shown below."];

  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function newQuestion() {
    if (!quizBox || DATA.length < 4) return;
    quizLocked = false;
    if (qFeedback) { qFeedback.textContent = ""; qFeedback.className = "ps-quiz-feedback"; }
    if (qNext) qNext.hidden = true;
    var correct = DATA[Math.floor(Math.random() * DATA.length)];
    quizAnswer = correct.id;
    if (qTheme) qTheme.textContent = correct.theme;
    if (qZh) qZh.innerHTML = rubyHTML(correct);
    if (qSay) qSay.setAttribute("data-say", correct.trad);
    if (qPy) qPy.textContent = correct.pinyin;
    // three distractors, meanings from other proverbs
    var pool = shuffled(DATA.filter(function (p) { return p.id !== correct.id; })).slice(0, 3);
    var opts = shuffled([correct].concat(pool));
    if (qOpts) {
      qOpts.innerHTML = "";
      opts.forEach(function (p) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "ps-quiz-opt";
        b.setAttribute("data-id", p.id);
        b.textContent = p.meaning;
        qOpts.appendChild(b);
      });
    }
  }
  function paintScore() {
    if (qScore) qScore.textContent = store.quiz.right + " right of " + store.quiz.answered + " answered";
  }
  function answer(btn) {
    if (quizLocked) return;
    quizLocked = true;
    var chosen = btn.getAttribute("data-id");
    var right = chosen === quizAnswer;
    store.quiz.answered++;
    if (right) store.quiz.right++;
    save(store);
    var opts = qOpts ? qOpts.querySelectorAll(".ps-quiz-opt") : [];
    for (var i = 0; i < opts.length; i++) {
      var id = opts[i].getAttribute("data-id");
      if (id === quizAnswer) opts[i].classList.add("is-right");
      else if (opts[i] === btn) opts[i].classList.add("is-wrong");
      opts[i].disabled = true;
    }
    if (qFeedback) {
      if (right) { qFeedback.textContent = CALM_RIGHT[Math.floor(Math.random() * CALM_RIGHT.length)]; qFeedback.className = "ps-quiz-feedback is-right"; }
      else { qFeedback.textContent = CALM_WRONG[Math.floor(Math.random() * CALM_WRONG.length)]; qFeedback.className = "ps-quiz-feedback is-wrong"; }
    }
    if (qNext) qNext.hidden = false;
    paintScore();
  }
  function ensureQuiz() {
    if (quizStarted) return;
    quizStarted = true;
    paintScore();
    newQuestion();
  }
  if (qOpts) qOpts.addEventListener("click", function (e) {
    var b = e.target.closest(".ps-quiz-opt");
    if (b) answer(b);
  });
  if (qNext) qNext.addEventListener("click", newQuestion);
  var qReset = document.getElementById("psQuizReset");
  if (qReset) qReset.addEventListener("click", function () {
    store.quiz = { right: 0, answered: 0 }; save(store);
    paintScore(); newQuestion();
  });

  /* ---------- background starfield behind the whole page ---------- */
  (function () {
    var cv = document.getElementById("sky"); if (!cv || !cv.getContext) return;
    var x = cv.getContext("2d");
    function sz() { cv.width = innerWidth; cv.height = Math.max(innerHeight, document.body.scrollHeight); }
    sz(); addEventListener("resize", sz);
    var n = reduce ? 40 : 90;
    var st = Array.from({ length: n }, function () { return { x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.2 + 0.2, a: Math.random(), s: Math.random() * 0.02 + 0.004 }; });
    (function f() {
      x.clearRect(0, 0, cv.width, cv.height);
      for (var i = 0; i < st.length; i++) { var s = st[i]; if (!reduce) s.a += s.s; var al = 0.25 + Math.abs(Math.sin(s.a)) * 0.5; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fillStyle = "rgba(245,236,210," + al + ")"; x.fill(); }
      if (!document.hidden && !reduce) requestAnimationFrame(f);
    })();
  })();
})();
