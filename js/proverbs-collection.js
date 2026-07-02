/* proverbs-collection.js - Your Collection: kept, streak, study, milestones. */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var DATA = [];
  try { DATA = JSON.parse(document.getElementById("pv-coll-data").textContent); } catch (e) { DATA = []; }
  var byId = {};
  DATA.forEach(function (p) { byId[p.id] = p; });
  var ANIMAL_HANZI = {Rat:"鼠",Ox:"牛",Tiger:"虎",Rabbit:"兔",Dragon:"龍",Snake:"蛇",Horse:"馬",Goat:"羊",Monkey:"猴",Rooster:"雞",Dog:"狗",Pig:"豬"};

  /* ---------- milestone tiers (mirror of the generator) ---------- */
  var TIERS = [
    { need: 1, name: "Novice of the Pond" },
    { need: 5, name: "Adept of the Water" },
    { need: 12, name: "Keeper of Lines" },
    { need: 25, name: "Sage of the Still Pond" }
  ];

  /* ---------- Mandarin speech (zh-CN, same pattern as the hub) ---------- */
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
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-say]");
    if (!b) return;
    var t = b.getAttribute("data-say");
    if (t) speak(t, b);
  });

  /* ---------- storage reads (all defensive) ---------- */
  function readKept() {
    try {
      var v = JSON.parse(localStorage.getItem("za_proverbs_kept") || "[]");
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function knownCount() {
    try {
      var s = JSON.parse(localStorage.getItem("za_proverbs_study") || "{}") || {};
      var marks = s && s.marks;
      if (!marks || typeof marks !== "object") return 0;
      var n = 0;
      for (var id in marks) { if (Object.prototype.hasOwnProperty.call(marks, id) && marks[id] === "known") n++; }
      return n;
    } catch (e) { return 0; }
  }

  /* ---------- streak (update on load; same logic the hub uses) ---------- */
  function todayStr(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (day < 10 ? "0" + day : day);
  }
  function updateStreak() {
    var today = todayStr();
    var yd = new Date(); yd.setDate(yd.getDate() - 1);
    var yesterday = todayStr(yd);
    var st = { last: "", count: 0 };
    try { st = JSON.parse(localStorage.getItem("za_proverbs_streak") || "null") || st; } catch (e) {}
    if (typeof st.count !== "number" || st.count < 0) st.count = 0;
    if (st.last === today) {
      /* already counted for today, no change */
      if (st.count < 1) st.count = 1;
    } else if (st.last === yesterday) {
      st.count = st.count + 1;
    } else {
      st.count = 1;
    }
    st.last = today;
    try { localStorage.setItem("za_proverbs_streak", JSON.stringify(st)); } catch (e) {}
    return st;
  }

  /* ---------- render: streak banner ---------- */
  function renderStreak(st) {
    var wrap = document.getElementById("pcStreak");
    if (!wrap) return;
    var n = st.count || 1;
    var elN = document.getElementById("pcStreakN");
    var elHead = document.getElementById("pcStreakHead");
    var elSub = document.getElementById("pcStreakSub");
    if (elN) elN.textContent = String(n);
    if (elHead) elHead.textContent = n === 1 ? "One day by the pond" : (n + " days by the pond");
    if (elSub) elSub.textContent = n === 1
      ? "Return tomorrow and the count grows."
      : "You have come back " + n + " days running. Keep the thread unbroken.";
    wrap.hidden = false;
  }

  /* ---------- render: kept cards ---------- */
  function rubyHTML(p) {
    if (!p.chars || !p.chars.length) return p.trad || "";
    return p.chars.map(function (c) {
      return c[1] ? "<ruby>" + c[0] + "<rt>" + c[1] + "</rt></ruby>" : '<span class="cx-punct">' + c[0] + "</span>";
    }).join("");
  }
  function sayIcon() {
    return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
      '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>' +
      '<path d="M16.5 8.5a4 4 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="M18.8 6.2a7 7 0 0 1 0 11.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }
  function makeCard(p) {
    var a = String(p.animal || "");
    var art = document.createElement("article");
    art.className = "pc-card";
    art.setAttribute("role", "listitem");

    var zh = document.createElement("p");
    zh.className = "pc-card-zh";
    zh.setAttribute("lang", "zh-Hant");
    var span = document.createElement("span");
    span.className = "pc-zh-text";
    span.innerHTML = rubyHTML(p);
    zh.appendChild(span);

    var say = document.createElement("button");
    say.type = "button";
    say.className = "pc-say";
    say.setAttribute("data-say", p.trad || "");
    say.setAttribute("aria-label", "Hear it read in Mandarin");
    say.setAttribute("title", "Hear it in Mandarin");
    say.innerHTML = sayIcon();
    zh.appendChild(say);
    art.appendChild(zh);

    var py = document.createElement("p");
    py.className = "pc-pinyin";
    py.textContent = p.pinyin || "";
    art.appendChild(py);

    var mean = document.createElement("p");
    mean.className = "pc-mean";
    mean.textContent = p.meaning || "";
    art.appendChild(mean);

    var foot = document.createElement("div");
    foot.className = "pc-card-foot";
    if (a) {
      var al = document.createElement("a");
      al.className = "pc-card-animal";
      al.setAttribute("href", "/chinese-zodiac/" + a.toLowerCase() + "/");
      al.textContent = (ANIMAL_HANZI[a] || "") + " Year of the " + a;
      foot.appendChild(al);
    }
    var link = document.createElement("a");
    link.className = "pc-card-animal pc-card-say";
    link.setAttribute("href", "/proverbs/say/" + p.id + "/");
    link.textContent = "Read the whole line";
    foot.appendChild(link);
    art.appendChild(foot);

    return art;
  }
  function renderKept(ids) {
    var grid = document.getElementById("pcKeptGrid");
    var empty = document.getElementById("pcEmpty");
    var sub = document.getElementById("pcKeptSub");
    if (!grid) return;
    grid.textContent = "";
    var kept = ids.map(function (id) { return byId[id]; }).filter(Boolean);
    if (!kept.length) {
      grid.hidden = true;
      if (empty) empty.hidden = false;
      if (sub) sub.textContent = "Nothing kept yet. The ones you keep will gather here.";
      return;
    }
    grid.hidden = false;
    if (empty) empty.hidden = true;
    if (sub) sub.textContent = kept.length === 1
      ? "One line, held here for a quieter hour."
      : kept.length + " lines, held here for a quieter hour.";
    var frag = document.createDocumentFragment();
    kept.forEach(function (p) { frag.appendChild(makeCard(p)); });
    grid.appendChild(frag);
  }

  /* ---------- render: study mastery ---------- */
  function renderStudy(known) {
    var section = document.getElementById("pcStudySection");
    if (!section) return;
    if (!known) { section.hidden = true; return; }
    section.hidden = false;
    var num = document.getElementById("pcStudyNum");
    var line = document.getElementById("pcStudyLine");
    if (num) num.textContent = String(known);
    if (line) line.textContent = known === 1
      ? "You know one proverb by heart. Hold it close, then add another."
      : "You know " + known + " proverbs by heart. Each one is yours now.";
  }

  /* ---------- render: milestones ---------- */
  function currentTier(n) {
    var cur = null;
    for (var i = 0; i < TIERS.length; i++) { if (n >= TIERS[i].need) cur = TIERS[i]; }
    return cur;
  }
  function nextTier(n) {
    for (var i = 0; i < TIERS.length; i++) { if (n < TIERS[i].need) return TIERS[i]; }
    return null;
  }
  function renderTiers(n) {
    var cur = currentTier(n);
    var nxt = nextTier(n);
    var rank = document.getElementById("pcTierRank");
    var name = document.getElementById("pcTierName");
    var line = document.getElementById("pcTierLine");
    var fill = document.getElementById("pcProgFill");
    var cap = document.getElementById("pcProgCap");

    if (rank) rank.textContent = cur ? "Your standing" : "Your standing";
    if (name) name.textContent = cur ? cur.name : "Not yet begun";

    if (line) {
      if (!cur && nxt) {
        line.innerHTML = "Keep your first proverb to become a <b>" + nxt.name + "</b>.";
      } else if (cur && nxt) {
        var remain = nxt.need - n;
        line.innerHTML = "Keep " + remain + " more to rise to <b>" + nxt.name + "</b>.";
      } else if (cur && !nxt) {
        line.innerHTML = "You hold the highest standing by the water, <b>" + cur.name + "</b>. The pond is yours.";
      }
    }

    /* progress bar spans from the current tier's floor to the next tier's need */
    if (fill && cap) {
      if (nxt) {
        var floor = cur ? cur.need : 0;
        var span = nxt.need - floor;
        var into = n - floor;
        var pct = span > 0 ? Math.max(0, Math.min(100, Math.round((into / span) * 100))) : 0;
        fill.style.width = pct + "%";
        cap.textContent = n + " of " + nxt.need + " kept";
      } else {
        fill.style.width = "100%";
        cap.textContent = n + " kept";
      }
    }

    /* the ladder of rungs */
    var ladder = document.getElementById("pcLadder");
    if (ladder) {
      ladder.textContent = "";
      TIERS.forEach(function (t) {
        var earned = n >= t.need;
        var here = cur && cur.need === t.need;
        var rung = document.createElement("div");
        rung.className = "pc-rung" + (earned ? " is-earned" : " is-locked") + (here ? " is-here" : "");
        var nm = document.createElement("p");
        nm.className = "pc-rung-name";
        nm.textContent = t.name;
        rung.appendChild(nm);
        var need = document.createElement("p");
        need.className = "pc-rung-need";
        need.textContent = t.need === 1 ? "1 kept" : t.need + " kept";
        rung.appendChild(need);
        if (earned) {
          var badge = document.createElement("span");
          badge.className = "pc-rung-badge";
          badge.textContent = "Earned";
          rung.appendChild(badge);
        }
        ladder.appendChild(rung);
      });
    }
  }

  /* ---------- background starfield behind the whole page ---------- */
  (function () {
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  /* ---------- go ---------- */
  var st = updateStreak();
  renderStreak(st);
  var ids = readKept();
  renderKept(ids);
  renderStudy(knownCount());
  renderTiers(ids.length);
})();
