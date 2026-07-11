/* ============================================================
   Zodi Almanac page UI (/almanac/ui.js)
   Rendering only. All calculations live in engine.js; all
   educational copy lives in data-terms.js, data-officers.js,
   data-glossary.js. Traditional characters, tone-marked pinyin.
   ============================================================ */
(function () {
  "use strict";
  var A = window.ZodiAlmanac, T = window.ALM_TERMS, O = window.ALM_OFFICERS, G = window.ALM_GLOSSARY;
  if (!A || !T || !O || !G) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function track(name, params) { try { if (window.gtag) window.gtag("event", name, params || {}); } catch (e) {} }
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(y, m, d) { return y + "-" + pad(m) + "-" + pad(d); }
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DOW_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var DOW_CN = ["日", "一", "二", "三", "四", "五", "六"];
  var ORDMON = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];

  /* ---------- pronunciation (shared component) ---------- */
  var canSpeak = ("speechSynthesis" in window);
  function speak(text) {
    if (!canSpeak || !text) return;
    if (window.zaSpeak) { window.zaSpeak(text); return; }
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN"; u.rate = 0.78;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch (e) {}
  }
  function sayBtn(text, pinyin) {
    if (!canSpeak) return '<span class="alm-say-off">pinyin: ' + esc(pinyin) + "</span>";
    return '<button type="button" class="alm-say" data-say="' + esc(text) + '" aria-label="Hear ' + esc(pinyin) + '">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a4 4 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      "<span>Hear " + esc(pinyin) + "</span></button>";
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".alm-say");
    if (b) { speak(b.dataset.say); track("almanac_pronounce", { text: b.dataset.say }); }
  });

  /* ---------- learning blocks ---------- */
  function ruby(chars) {
    return chars.map(function (c) {
      if (!c[1]) return '<span class="alm-punct">' + esc(c[0]) + "</span>";
      return "<ruby>" + esc(c[0]) + "<rt>" + esc(c[1]) + "</rt></ruby>";
    }).join("");
  }
  function badge() { return ""; } // label chips removed by request; methodology section explains the layers in prose
  // one expandable study panel: hant, chars, pinyin, literal, name, meaning, extra rows
  function studyPanel(o) {
    var rows = "";
    if (o.literal) rows += '<p class="alm-row"><b>Literal</b>' + esc(o.literal) + "</p>";
    if (o.name) rows += '<p class="alm-row"><b>Meaning</b>' + esc(o.name) + "</p>";
    if (o.meaning) rows += '<p class="alm-row alm-row-wide">' + esc(o.meaning) + "</p>";
    (o.extra || []).forEach(function (x) { rows += '<p class="alm-row"><b>' + esc(x[0]) + "</b>" + x[1] + "</p>"; });
    return '<details class="alm-learn"><summary><span lang="zh-Hant" class="alm-learn-han">' + esc(o.hant) +
      '</span><span class="alm-learn-py">' + esc(o.pinyin) + "</span><span class=\"alm-learn-nm\">" + esc(o.summary || o.name || "") + "</span></summary>" +
      '<div class="alm-learn-body"><p class="alm-learn-ruby" lang="zh-Hant">' + (o.chars ? ruby(o.chars) : esc(o.hant)) + "</p>" +
      '<p class="alm-learn-say">' + sayBtn(o.hant, o.pinyin) + "</p>" + rows +
      (o.method ? '<p class="alm-row"><span class="alm-method-note">' + esc(o.method) + "</span></p>" : "") +
      "</div></details>";
  }

  /* ---------- proverbs (paired to the Proverb Pond) ---------- */
  var PROVERBS = [
    { chars: [["上","shàng"],["善","shàn"],["若","ruò"],["水","shuǐ"]], pinyin: "shàng shàn ruò shuǐ", literal: "the highest good is like water", soul: "Water asks for nothing and shapes everything. It sinks to the low room others avoid and turns even that into a home. To be strong like water is to stop contending and still reach everywhere.", meaning: "The finest virtue is like water: it benefits all things and flows to the low places without contending.", url: "/proverbs/the-way-of-water/" },
    { chars: [["厚","hòu"],["德","dé"],["載","zài"],["物","wù"]], pinyin: "hòu dé zài wù", literal: "thick virtue carries things", soul: "The earth never refuses a thing set upon it. To carry others the way the ground carries you is not weakness; it is the deepest strength a person can hold.", meaning: "As the earth bears everything set upon it, deep virtue supports all around it.", url: "/proverbs/harmony-and-virtue/" },
    { chars: [["不","bù"],["入","rù"],["虎","hǔ"],["穴","xué"],["，",""],["焉","yān"],["得","dé"],["虎","hǔ"],["子","zǐ"]], pinyin: "bù rù hǔ xué, yān dé hǔ zǐ", literal: "without entering the tiger's den, how would you catch the cub", soul: "The cub is never in the safe field. What you want most sits inside the very den you are avoiding, and the only way to it is through the door you fear.", meaning: "Nothing worth having is won without entering the risk that guards it.", url: "/proverbs/courage/" },
    { chars: [["家","jiā"],["和","hé"],["萬","wàn"],["事","shì"],["興","xīng"]], pinyin: "jiā hé wàn shì xīng", literal: "family harmonious, all things flourish", soul: "Fix the house and the world grows quieter. When the people under one roof are at peace, the ten thousand small troubles outside lose their teeth.", meaning: "When the household is at peace, everything else succeeds.", url: "/proverbs/home-and-family/" },
    { chars: [["天","tiān"],["時","shí"],["地","dì"],["利","lì"],["人","rén"],["和","hé"]], pinyin: "tiān shí dì lì rén hé", literal: "heaven's timing, earth's advantage, human harmony", soul: "Nothing great stands on timing alone, or place alone, or people alone. It stands where the three lean together, and place is the one you can arrange with your own hands.", meaning: "Success aligns when timing, place, and people lean together.", url: "/proverbs/timing-and-fortune/" },
    { chars: [["千","qiān"],["里","lǐ"],["之","zhī"],["行","xíng"],["，",""],["始","shǐ"],["於","yú"],["足","zú"],["下","xià"]], pinyin: "qiān lǐ zhī xíng, shǐ yú zú xià", literal: "a thousand-li journey begins beneath the feet", soul: "The far place frightens only from a distance. Stand at your own threshold, take the single step in front of you, and the thousand miles begin to belong to you.", meaning: "Every great undertaking starts with a single step.", url: "/proverbs/perseverance/" },
    { chars: [["塞","sài"],["翁","wēng"],["失","shī"],["馬","mǎ"]], pinyin: "sài wēng shī mǎ", literal: "the frontier old man loses his horse", soul: "You cannot read a morning by noon. The loss that empties you today may be the door you walk through next spring, so hold both grief and hope loosely.", meaning: "A blessing can wear the face of loss; fortune cannot be judged in the moment.", url: "/proverbs/timing-and-fortune/" },
    { chars: [["落","luò"],["葉","yè"],["歸","guī"],["根","gēn"]], pinyin: "luò yè guī gēn", literal: "falling leaves return to the roots", soul: "However far the wind takes a leaf, the root is where it is going. There is no shame in the turn toward home; it is the shape the whole year was making.", meaning: "All things are drawn back toward their origin and their home.", url: "/proverbs/home-and-family/" },
    { chars: [["順","shùn"],["其","qí"],["自","zì"],["然","rán"]], pinyin: "shùn qí zì rán", literal: "follow its own way", soul: "A room has its own light and its own flow, and so do you. The art is not to force either into a shape, but to move with what is already there until the two agree.", meaning: "Let nature take its course; work with a thing rather than force it.", url: "/proverbs/the-way-of-water/" },
    { chars: [["聞","wén"],["雞","jī"],["起","qǐ"],["舞","wǔ"]], pinyin: "wén jī qǐ wǔ", literal: "hear the rooster, rise and practice", soul: "The rooster does not ask whether you slept well. It calls, and the disciplined heart rises to practice while the world is still dark, and that early hour becomes a life.", meaning: "Rise at the first call and put the hour to work; diligence answers the dawn.", url: "/proverbs/perseverance/" },
    { chars: [["白","bái"],["雲","yún"],["蒼","cāng"],["狗","gǒu"]], pinyin: "bái yún cāng gǒu", literal: "white clouds turn to grey dogs", soul: "Watch the sky long enough and the white cloud becomes a grey dog, then nothing at all. Hold your fortunes the same way, lightly, knowing every shape is only passing through.", meaning: "The world's affairs change shape without warning, like clouds drifting into new forms.", url: "/proverbs/" },
    { chars: [["飲","yǐn"],["水","shuǐ"],["思","sī"],["源","yuán"]], pinyin: "yǐn shuǐ sī yuán", literal: "when drinking water, think of the source", soul: "Every cup you drink was carried to you by someone. To remember the spring is to keep the water sweet, and to keep yourself whole.", meaning: "Remember your roots and honor those who made your good fortune possible.", url: "/proverbs/home-and-family/" }
  ];

  var HEADLINES = ["A day for laying first stones", "A day for clearing the way", "A day of fullness",
    "A day for keeping level", "A day for settling things", "A day for following through",
    "A day for tearing down, not building", "A day that asks for care", "A day for finishing well",
    "A day for gathering in", "A day for opening doors", "A day for closing the circle"];

  /* ---------- state and URL ---------- */
  var today = new Date();
  var TD = { y: today.getFullYear(), m: today.getMonth() + 1, d: today.getDate() };
  function parseDateParam() {
    var m = location.search.match(/[?&]date=(\d{4})-(\d{2})-(\d{2})\b/);
    if (!m) return null;
    var y = +m[1], mo = +m[2], d = +m[3];
    if (mo < 1 || mo > 12 || d < 1 || d > 31 || y < 1950 || y > 2100) return null;
    if (d > new Date(y, mo, 0).getDate()) return null;
    return { y: y, m: mo, d: d };
  }
  var state = {
    sel: parseDateParam() || { y: TD.y, m: TD.m, d: TD.d },
    view: null, mode: "month", profile: null
  };
  state.view = { y: state.sel.y, m: state.sel.m };
  try {
    state.profile = JSON.parse(localStorage.getItem("zodi-almanac-profile") || "null");
    state.mode = localStorage.getItem("zodi-almanac-view") || "month";
  } catch (e) {}
  function isToday(y, m, d) { return y === TD.y && m === TD.m && d === TD.d; }
  function setUrl(push) {
    var s = state.sel, u = isToday(s.y, s.m, s.d) ? location.pathname : location.pathname + "?date=" + iso(s.y, s.m, s.d);
    try { history[push ? "pushState" : "replaceState"]({ date: iso(s.y, s.m, s.d) }, "", u); } catch (e) {}
    document.title = (isToday(s.y, s.m, s.d) ? "Today" : MONTHS[s.m - 1] + " " + s.d + ", " + s.y) + " in the Feng Shui Calendar | Zodi Animal";
  }
  window.addEventListener("popstate", function () {
    var p = parseDateParam() || { y: TD.y, m: TD.m, d: TD.d };
    selectDate(p.y, p.m, p.d, { push: false });
  });
  function announce(msg) { var lv = $("#almLive"); if (lv) lv.textContent = msg; }

  /* ---------- helpers over the engine ---------- */
  function currentTermFor(info) {
    // last term boundary on or before this day (terms map holds boundary days only)
    for (var back = 0; back <= 17; back++) {
      var g = A.dateFromJdn(info.jdn - back);
      var t = A.yearData(g.y).terms[info.jdn - back];
      if (t) return { term: t, boundary: back === 0, since: back };
    }
    return null;
  }
  function termEntry(lon) {
    for (var i = 0; i < T.list.length; i++) if (T.list[i].lon === lon) return T.list[i];
    return null;
  }
  function relFor(info) {
    if (!state.profile) return null;
    var r = A.personalRelation(info.dayBranch, state.profile.branch);
    return r ? { key: r.key, data: O.relations[r.key] } : null;
  }

  /* ---------- glance strip ---------- */
  function renderGlance(info) {
    var g = $("#almGlance"); if (!g) return;
    var off = O.officers[info.officerIdx];
    var ph = G.phases[info.nayin.el];
    var rel = relFor(info);
    var bits = [
      MONTHS[info.m - 1].slice(0, 3) + " " + info.d,
      '<span lang="zh-Hant">' + info.lunar.monthCn + info.lunar.dayCn + "</span>",
      info.dayAnimal + ' day <span lang="zh-Hant">' + info.dayAnimalCn + "</span>",
      esc(ph.name) + ' <span lang="zh-Hant">' + ph.hant + "</span>",
      esc(off.title.replace("The ", "").replace(" Officer", "")) + ' <span lang="zh-Hant">' + off.hant + "</span>"
    ];
    if (rel) bits.push('<b class="alm-glance-' + rel.key + '">' + esc(rel.data.name) + "</b>");
    g.innerHTML = bits.map(function (b) { return "<span>" + b + "</span>"; }).join('<i aria-hidden="true">·</i>');
  }

  /* ---------- the daily reading ---------- */
  function renderCard() {
    var s = state.sel, info = A.dayInfo(s.y, s.m, s.d);
    var card = $("#almCard"); if (!card) return;
    var off = O.officers[info.officerIdx];
    var stem = G.stems[info.dayStem], br = G.branches[info.dayBranch];
    var ph = G.phases[info.nayin.el];
    var dow = new Date(s.y, s.m - 1, s.d).getDay();
    var ct = currentTermFor(info), ctE = ct ? termEntry(ct.term.lon) : null;
    var rel = relFor(info);
    var fests = info.festivals.map(function (f) {
      return '<span class="alm-fest"><span lang="zh-Hant">' + f.cn + "</span> " + esc(f.en) + "</span>";
    }).join("");

    /* Layer A: date identity */
    var layerA =
      '<div class="alm-card-top3">' +
        '<div class="alm-corner"><b>' + s.y + '</b><span class="alm-motif" lang="zh-Hant">' + info.yearAnimalCn + "</span></div>" +
        '<div class="alm-card-d">' + s.d + "</div>" +
        '<div class="alm-corner"><b>' + MONTHS[s.m - 1].slice(0, 3).toUpperCase() + '</b>' + motifHtml() + "</div>" +
      "</div>" +
      '<p class="alm-card-week">' + DOW_EN[dow].toUpperCase() + ' · <span lang="zh-Hant">星期' + DOW_CN[dow] + "</span>" + (isToday(s.y, s.m, s.d) ? ' <span class="alm-todaytag">Today</span>' : "") + "</p>" +
      '<div class="alm-identity">' +
        '<p class="alm-id-lunar"><span lang="zh-Hant">' + info.ganzhiYear + "年 · " + info.lunar.monthCn + info.lunar.dayCn + "</span>" +
          '<span class="alm-id-eng">Year of the ' + A.PHASES[Math.floor(info.yearStem / 2)] + " " + info.yearAnimal + " · " +
          (info.lunar.leap ? "leap " : "") + ORDMON[info.lunar.monthNum - 1] + " lunar month, day " + info.lunar.day + "</span></p>" +
        '<p class="alm-id-pillar"><span lang="zh-Hant">' + info.ganzhiDay + "日</span>" +
          '<span class="alm-id-sub">day of the ' + info.dayAnimal + " · " + esc(info.nayin.en) + ' <span lang="zh-Hant">' + info.nayin.cn + "</span></span></p>" +
        (ctE ? '<p class="alm-id-term"><span class="alm-termtag" lang="zh-Hant">' + ctE.hant + "</span> " + esc(ctE.name) +
          (ct.boundary ? " begins today" : ", day " + (ct.since + 1) + " of the term") + "</p>" : "") +
        (info.newMoon ? '<p class="alm-id-moon">● New moon tonight</p>' : "") +
        (info.fullMoon ? '<p class="alm-id-moon">○ Full moon tonight</p>' : "") +
        (fests ? '<div class="alm-card-fests">' + fests + "</div>" : "") +
      "</div>";

    /* Layer B: editorial summary */
    var layerB =
      '<div class="alm-summary">' +
        "<h3>" + esc(HEADLINES[info.officerIdx]) + "</h3>" +
        "<p>" + esc(off.title) + " traditionally favors " + esc(off.favors.slice(0, 3).join(", ").toLowerCase()) + ". " +
        esc(off.practical) + " Consider postponing " + esc(off.avoids.slice(0, 2).join(" and ").toLowerCase()) + ".</p>" +
        '<p class="alm-summary-note">' + esc(off.caution) + "</p>" +
      "</div>";

    /* Layer C: favor and avoid */
    var layerC =
      '<div class="alm-yiji">' +
        '<div class="alm-yi"><h4><span class="k" lang="zh-Hant">宜</span> Yí · Favor</h4><ul>' +
          off.favors.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
          studyPanel({ hant: "宜", chars: G.terms.yi.chars, pinyin: "yí", literal: G.terms.yi.literal, name: G.terms.yi.name, meaning: G.terms.yi.meaning, summary: "What 宜 means", badge: "trad" }) + "</div>" +
        '<div class="alm-ji"><h4><span class="k" lang="zh-Hant">忌</span> Jì · Avoid</h4><ul>' +
          off.avoids.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
          studyPanel({ hant: "忌", chars: G.terms.ji.chars, pinyin: "jì", literal: G.terms.ji.literal, name: G.terms.ji.name, meaning: G.terms.ji.meaning, summary: "What 忌 means", badge: "trad" }) + "</div>" +
      "</div>";

    /* personal relation: full omen banner for clash and harmony days */
    var relHtml = "";
    if (rel) {
      var myAnimal = A.ANIMALS[state.profile.branch];
      var isClash = rel.key === "clash";
      var isBless = rel.key === "harmony" || rel.key === "trine";
      if (isClash || isBless) {
        var advice = (O.dayAdvice && O.dayAdvice[isClash ? "clash" : "harmony"] || {})[myAnimal] || rel.data.interpret;
        relHtml =
          '<aside class="alm-omen ' + (isClash ? "alm-omen-clash" : "alm-omen-bless") + '" role="note">' +
            '<span class="alm-omen-seal" lang="zh-Hant">' + rel.data.hant + "</span>" +
            '<div class="alm-omen-body">' +
              "<b>" + (isClash ? "A caution day for the " : "A blessing day for the ") + myAnimal +
                ' <i>' + esc(rel.data.pinyin) + " · " + esc(rel.data.name) + "</i></b>" +
              "<p>" + esc(advice) + "</p>" +
              '<div class="alm-omen-acts">' +
                '<button class="alm-mini" type="button" id="almOmenG">' + (isClash ? "Add this caution to my calendar" : "Add this good day to my calendar") + "</button>" +
                '<button class="alm-mini" type="button" id="almOmenIcs">Save the reminder</button>' +
              "</div>" +
            "</div>" +
          "</aside>";
      } else {
        relHtml = '<div class="alm-rel alm-rel-' + rel.key + '"><b><span lang="zh-Hant">' + rel.data.hant + "</span> " + esc(rel.data.pinyin) + " · " + esc(rel.data.name) +
          " day for the " + myAnimal + "</b><p>" + esc(rel.data.interpret) + "</p></div>";
      }
    }

    /* Layer D: understand today's Chinese */
    var panels = [
      studyPanel({ hant: info.ganzhiDay + "日", chars: [[A.STEMS[info.dayStem], stem.pinyin], [A.BRANCHES[info.dayBranch], br.pinyin], ["日", "rì"]], pinyin: stem.pinyin + " " + br.pinyin + " rì", literal: stem.hant + " (" + stem.phase + " stem) + " + br.hant + " (" + br.animal + " branch)", name: "the Day Pillar", meaning: G.terms.richu.meaning + " " + stem.note + " " + br.note, summary: "The Day Pillar", badge: "calc", method: "Unbroken 60-day cycle, anchor 2000-01-01." }),
      studyPanel({ hant: off.hant, pinyin: off.pinyin, chars: [[off.hant, off.pinyin]], literal: off.literal, name: off.title, meaning: off.meaning, summary: "The Day Officer", badge: "trad" }),
      studyPanel({ hant: info.lunar.monthCn + info.lunar.dayCn, chars: null, pinyin: G.lunarMonthPinyin[info.lunar.monthNum - 1], literal: "month " + info.lunar.monthNum + (info.lunar.leap ? " (leap)" : "") + ", day " + info.lunar.day, name: "the lunar date", meaning: G.terms.nongli.meaning, summary: "The lunar date", badge: "calc", method: "Months begin at the astronomical new moon, days fixed to UTC+8." })
    ];
    if (ctE) panels.push(studyPanel({ hant: ctE.hant, chars: ctE.chars, pinyin: ctE.pinyin, literal: ctE.literal, name: ctE.name, meaning: ctE.season + " " + ctE.relevance, summary: "Solar term " + ctE.index + " of 24", badge: "calc", method: "The sun reaches " + ct.term.lon + "° of apparent ecliptic longitude." }));
    panels.push(studyPanel({ hant: br.hant, chars: [[br.hant, br.pinyin]], pinyin: br.pinyin, literal: br.animal + " branch, " + br.hours, name: "day of the " + br.animal, meaning: br.note + " " + G.terms.shengxiao.meaning, summary: "The day animal", badge: "trad" }));
    panels.push(studyPanel({ hant: info.nayin.cn, chars: null, pinyin: "nà yīn: " + ph.pinyin, literal: info.nayin.en, name: "Na Yin element: " + A.PHASES[info.nayin.el], meaning: G.terms.nayin.meaning, summary: "The day's element", badge: "trad" }));
    if (rel) panels.push(studyPanel({ hant: rel.data.hant, chars: null, pinyin: rel.data.pinyin, literal: rel.data.literal, name: rel.data.name, meaning: rel.data.meaning + " " + rel.data.interpret, summary: "Your relation to this day", badge: "trad" }));
    var layerD = '<details class="alm-study"><summary>Understand today’s Chinese</summary><div class="alm-study-list">' + panels.join("") + "</div></details>";

    /* nav + share */
    var nav =
      '<div class="alm-daynav" role="group" aria-label="Change day">' +
        '<button class="alm-fbtn" type="button" id="almDayPrev">Previous day</button>' +
        '<button class="alm-fbtn" type="button" id="almDayToday">Today</button>' +
        '<button class="alm-fbtn" type="button" id="almDayNext">Next day</button>' +
        '<label class="alm-pick">Choose a date <input type="date" id="almPick" value="' + iso(s.y, s.m, s.d) + '"></label>' +
      "</div>" +
      '<div class="alm-card-acts">' +
        '<button class="alm-mini" type="button" id="almShare">Share this day</button>' +
        '<button class="alm-mini" type="button" id="almCopyDay">Copy the reading</button>' +
        '<button class="alm-mini" type="button" id="almAddG">Add to my calendar</button>' +
        '<button class="alm-mini" type="button" id="almAddIcs">Download the event</button>' +
      "</div>" +
      '<p class="alm-toast" id="almToast" role="status" aria-live="polite" hidden></p>';

    var watermark = '<span class="alm-watermark" aria-hidden="true">' +
      (MOTIF_SVG[curMotif] || '<i lang="zh-Hant">福</i>') + "</span>";
    card.innerHTML = watermark + layerA + layerB + layerC + relHtml + layerD + nav;
    $("#almDayPrev").addEventListener("click", function () { stepDay(-1); });
    $("#almDayNext").addEventListener("click", function () { stepDay(1); });
    $("#almDayToday").addEventListener("click", function () { selectDate(TD.y, TD.m, TD.d, { push: true }); });
    $("#almPick").addEventListener("change", function () {
      var p = this.value.split("-").map(Number);
      if (p.length === 3 && p[0] >= 1950 && p[0] <= 2100) selectDate(p[0], p[1], p[2], { push: true });
    });
    var og = $("#almOmenG"), oi = $("#almOmenIcs");
    if (og) og.addEventListener("click", function () { omenToGoogle(info); track("almanac_omen_google"); });
    if (oi) oi.addEventListener("click", function () { omenIcs(info); track("almanac_omen_ics"); });
    $("#almShare").addEventListener("click", function () { shareDay(info); });
    $("#almCopyDay").addEventListener("click", function () { copyReading(info, false); });
    $("#almAddG").addEventListener("click", function () { addToGoogle(info); track("almanac_add_google"); });
    $("#almAddIcs").addEventListener("click", function () { downloadIcs(info); track("almanac_add_ics"); });
    renderGlance(info);
    renderProverb(info);
  }

  /* ---------- the saying, Pond-style, in its own rail ---------- */
  function sayIcon(text) {
    if (!canSpeak) return "";
    return '<button type="button" class="alm-say alm-say-ico" data-say="' + esc(text) + '" aria-label="Hear it read in Mandarin" title="Hear it in Mandarin">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a4 4 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.8 6.2a7 7 0 0 1 0 11.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>';
  }
  function renderProverb(info) {
    var wrap = $("#almProverb"); if (!wrap) return;
    var pv = PROVERBS[info.dayBranch];
    var txt = pv.chars.map(function (c) { return c[0]; }).join("");
    wrap.innerHTML =
      '<p class="alm-pv-k">A saying for the day</p>' +
      '<div class="alm-pv-card">' +
        '<span class="alm-pv-num" lang="zh-Hant">' + info.dayAnimalCn + "</span>" +
        '<p class="alm-pv-zh" lang="zh-Hant">' + ruby(pv.chars) + sayIcon(txt) + "</p>" +
        '<p class="alm-pv-py">' + esc(pv.pinyin) + "</p>" +
        '<p class="alm-pv-lit">' + esc(pv.literal) + "</p>" +
        '<p class="alm-pv-mean">' + esc(pv.meaning) + "</p>" +
        '<p class="alm-pv-soul">' + esc(pv.soul) + "</p>" +
        '<p class="alm-pv-src">Paired with the ' + info.dayAnimal + ' day · <a href="' + pv.url + '">Read it in the Proverb Pond</a></p>' +
        '<div class="alm-pv-acts">' +
          '<button type="button" class="alm-mini alm-pv-btn" id="almCollectBtn">' + (collected()[info.dayBranch] ? "In your collection" : "Collect this saying") + "</button>" +
          '<button type="button" class="alm-mini alm-pv-btn" id="almNotebookBtn">Copy for your notebook</button>' +
        "</div>" +
        '<p class="alm-toast" id="almPvToast" role="status" aria-live="polite" hidden></p>' +
      "</div>";
    $("#almCollectBtn").addEventListener("click", function () { collectSaying(info); });
    $("#almNotebookBtn").addEventListener("click", function () { notebookCopy(info); });
    renderCollection();
  }

  /* ---------- the saying collection: 12 to find, one per day animal ---------- */
  function collected() {
    try { return JSON.parse(localStorage.getItem("zodi-almanac-sayings") || "{}"); } catch (e) { return {}; }
  }
  function saveCollected(c) { try { localStorage.setItem("zodi-almanac-sayings", JSON.stringify(c)); } catch (e) {} }
  function pvToast(msg) {
    var t = $("#almPvToast"); if (!t) return;
    t.textContent = msg; t.hidden = false;
    clearTimeout(pvToast._t); pvToast._t = setTimeout(function () { t.hidden = true; }, 3600);
  }
  function collectSaying(info) {
    var c = collected();
    if (c[info.dayBranch]) { pvToast("Already in your collection."); return; }
    c[info.dayBranch] = iso(info.y, info.m, info.d);
    saveCollected(c);
    var n = Object.keys(c).length;
    pvToast(n === 12 ? "All twelve sayings collected. The pond is yours." : "Collected. " + (12 - n) + " animal days left to find.");
    var b = $("#almCollectBtn"); if (b) b.textContent = "In your collection";
    renderCollection();
    track("almanac_collect", { count: n });
  }
  function notebookText(info) {
    var pv = PROVERBS[info.dayBranch];
    return pv.chars.map(function (c) { return c[0]; }).join("") + " (" + pv.pinyin + ")\n" +
      pv.meaning + "\n" + pv.soul + "\n" +
      "From the Zodi Almanac, " + iso(info.y, info.m, info.d) + " · zodianimal.com/almanac/";
  }
  function notebookCopy(info) {
    var text = notebookText(info);
    if (navigator.share) { navigator.share({ title: "A saying for the day", text: text }).catch(function () {}); }
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { pvToast("Copied. Paste it into your notes."); });
    track("almanac_notebook");
  }
  function renderCollection() {
    var wrap = $("#almCollect"); if (!wrap) return;
    var c = collected(), n = Object.keys(c).length;
    if (!n) {
      wrap.innerHTML = '<p class="alm-collect-empty">Each of the twelve day animals keeps one saying. Visit their days and collect all twelve.</p>';
      return;
    }
    var rows = Object.keys(c).sort().map(function (k) {
      var pv = PROVERBS[+k];
      return '<li><span lang="zh-Hant">' + pv.chars.map(function (x) { return x[0]; }).join("") + "</span><i>" + esc(pv.pinyin) + "</i><em>found " + esc(c[k]) + " on a " + A.ANIMALS[+k] + " day</em></li>";
    }).join("");
    wrap.innerHTML =
      '<details class="alm-collectbox"><summary>Your saying collection · ' + n + ' of 12</summary>' +
        '<ul class="alm-collectlist">' + rows + "</ul>" +
        '<div class="alm-pv-acts"><button type="button" class="alm-mini alm-pv-btn" id="almCollectCopy">Copy the collection</button></div>' +
      "</details>";
    var cp = $("#almCollectCopy");
    if (cp) cp.addEventListener("click", function () {
      var text = Object.keys(c).sort().map(function (k) {
        var pv = PROVERBS[+k];
        return pv.chars.map(function (x) { return x[0]; }).join("") + " (" + pv.pinyin + "): " + pv.meaning;
      }).join("\n\n") + "\n\nCollected at zodianimal.com/almanac/";
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { pvToast("Collection copied."); });
    });
  }

  /* ---------- skins ---------- */
  var SKINS = [
    { k: "paper", cn: "朱", name: "Cinnabar Study" },
    { k: "zodi", cn: "夜", name: "Zodi Night" },
    { k: "bamboo", cn: "竹", name: "Bamboo Grove" },
    { k: "ink", cn: "墨", name: "Ink and Brass" },
    { k: "emerald", cn: "翠", name: "Jade Night" },
    { k: "plum", cn: "梅", name: "Plum Rain" }
  ];
  var SKIN_MIGRATE = { jade: "bamboo", midnight: "ink", blossom: "plum" };
  var skinChosen = false;
  function applySkin(k, opts) {
    opts = opts || {};
    if (!opts.auto) skinChosen = true;
    document.documentElement.setAttribute("data-skin", k);
    if (!opts.auto) try { localStorage.setItem("zodi-almanac-skin", k); } catch (e) {}
    var wrap = $("#almSkins");
    if (wrap) SKINS.forEach(function (sk) {
      var b = $("#almSkin-" + sk.k);
      if (b) b.setAttribute("aria-pressed", sk.k === k);
    });
    track("almanac_skin", { skin: k });
  }
  function renderSkins() {
    var wrap = $("#almSkins"); if (!wrap) return;
    wrap.innerHTML = SKINS.map(function (sk) {
      return '<button type="button" class="alm-skin alm-skin-' + sk.k + '" id="almSkin-' + sk.k + '" aria-pressed="false">' +
        '<i lang="zh-Hant" aria-hidden="true">' + sk.cn + "</i>" + sk.name + "</button>";
    }).join("");
    SKINS.forEach(function (sk) {
      $("#almSkin-" + sk.k).addEventListener("click", function () { applySkin(sk.k); });
    });
    var saved = null;
    try { saved = localStorage.getItem("zodi-almanac-skin"); } catch (e) {}
    saved = SKIN_MIGRATE[saved] || saved;
    if (saved && !SKINS.some(function (x) { return x.k === saved; })) saved = null;
    if (saved) { applySkin(saved); return; }
    // first visit: open in Ink and Brass, the house default
    applySkin("ink", { auto: true });
  }


  /* ---------- ornaments: our own SVG motifs for the card corners ---------- */
  var MOTIF_SVG = {
    fu: null,
    cat: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" fill=\"currentColor\" opacity=\".12\" d=\"M18.3 6.9 L21 8.9 C20 9.4 19.3 10.1 18.8 11 Z M29.7 6.9 L27 8.9 C28 9.4 28.7 10.1 29.2 11 Z M24 27 C27.8 27 30.2 29.8 30.2 33.4 C30.2 37.2 27.6 39.6 24 39.6 C20.4 39.6 17.8 37.2 17.8 33.4 C17.8 29.8 20.2 27 24 27 Z\"/><path d=\"M17.6 19.8 C13.6 23.6 11.4 28.4 11.4 33.2 C11.4 39.6 16.2 43 24 43 C31.8 43 36.6 39.6 36.6 33.2 C36.6 29.7 35.5 26.5 33.6 24.1\"/><path d=\"M17.2 16.2 C15.9 12.6 16 9 17.1 5.9 C17.3 5.3 18 5.1 18.5 5.5 L22 8.1 C23.3 7.8 24.7 7.8 26 8.1 L29.5 5.5 C30 5.1 30.7 5.3 30.9 5.9 C32 9 32.1 12.6 30.8 16.2 C29.7 19.2 27.2 20.9 24 20.9 C20.8 20.9 18.3 19.2 17.2 16.2 Z\"/><path d=\"M32.9 24.6 C35.2 22.2 36.3 18.3 36.3 13.8\"/><circle cx=\"36.3\" cy=\"11.4\" r=\"2.2\"/><path stroke-width=\"1.3\" d=\"M19.9 13.6 C20.5 12.5 21.9 12.5 22.5 13.6 M25.5 13.6 C26.1 12.5 27.5 12.5 28.1 13.6\"/><path stroke-width=\"1.2\" d=\"M23.4 15.4 H24.6 M24 15.7 C23.7 16.8 22.9 17.2 22.2 16.8 M24 15.7 C24.3 16.8 25.1 17.2 25.8 16.8\"/><path stroke-width=\"1.2\" d=\"M14.2 14.6 L17.6 15.1 M14.4 17.4 L17.7 16.9 M33.8 14.6 L30.4 15.1 M33.6 17.4 L30.3 16.9\"/><path stroke-width=\"1.4\" d=\"M18.6 20.2 C20.4 22.1 27.6 22.1 29.4 20.2 M24 23.7 V24.7\"/><circle cx=\"24\" cy=\"23.5\" r=\"1.7\" stroke-width=\"1.3\"/><path stroke-width=\"1.4\" d=\"M19.6 43 C19.6 41.2 21 40.2 22.6 40.2 C24.2 40.2 25.4 41.2 25.4 43 M25.4 43 C25.4 41.6 26.5 40.6 27.9 40.6 C29.3 40.6 30.4 41.6 30.4 43\"/><path d=\"M12 38.8 C9.6 38.2 8.8 35.6 10.5 34.2 C11.6 33.3 13.2 33.6 13.7 34.8\"/></g></svg>",
    lantern: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"5.9\" r=\"1.6\" stroke-width=\"1.4\"/><path d=\"M24 7.5 V8.7\"/><path fill=\"currentColor\" fill-opacity=\".12\" d=\"M13.4 11.9 C13.4 9.9 18.1 8.7 24 8.7 C29.9 8.7 34.6 9.9 34.6 11.9 L33.4 13.8 C30.4 14.8 17.6 14.8 14.6 13.8 Z\"/><ellipse cx=\"24\" cy=\"23.2\" rx=\"10.8\" ry=\"9.3\"/><path stroke-width=\"1.3\" d=\"M24 13.9 V19.6 M24 26.8 V32.5 M18.4 15.3 C15.9 19 15.9 27.4 18.4 31.1 M29.6 15.3 C32.1 19 32.1 27.4 29.6 31.1\"/><circle cx=\"24\" cy=\"23.2\" r=\"3.6\" fill=\"currentColor\" fill-opacity=\".12\" stroke-width=\"1.3\"/><path fill=\"currentColor\" fill-opacity=\".12\" d=\"M17.4 32.9 L18.3 34.7 H29.7 L30.6 32.9\"/><path stroke-width=\"1.3\" fill=\"currentColor\" fill-opacity=\".12\" d=\"M24 34.7 V36.1 M24 36.1 L25.3 37.4 L24 38.7 L22.7 37.4 Z\"/><path stroke-width=\"1.3\" d=\"M22.1 39.2 C21.5 40.9 21.6 42.5 22.3 44 M24 39.2 V44 M25.9 39.2 C26.5 40.9 26.4 42.5 25.7 44\"/></g></svg>",
    coin: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"20\" r=\"14\"/><circle cx=\"24\" cy=\"20\" r=\"11.5\" stroke-width=\"1.3\"/><path stroke=\"none\" fill=\"currentColor\" opacity=\".1\" fill-rule=\"evenodd\" d=\"M12.5 20 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0 Z M20.2 16.2 H27.8 V23.8 H20.2 Z\"/><path stroke-width=\"1.5\" d=\"M20.2 16.2 H27.8 V23.8 H20.2 Z\"/><path stroke-width=\"1.4\" d=\"M21.9 11 L24 12.3 L26.1 11 M24 13.2 V14.4 M21.9 29.9 L24 28.6 L26.1 29.9 M24 25.5 V26.7 M15 17.9 L16.3 20 L15 22.1 M17.8 19 V21 M33 17.9 L31.7 20 L33 22.1 M30.2 19 V21\"/><path stroke-width=\"1.4\" d=\"M22.7 23.6 V16.4 C22.9 14.9 25.1 14.9 25.3 16.4 V23.6\"/><path stroke-width=\"1.4\" fill=\"currentColor\" fill-opacity=\".12\" d=\"M24 34.8 L25.9 36.6 L24 38.4 L22.1 36.6 Z\"/><path stroke-width=\"1.4\" d=\"M22.7 38.9 C21.3 40.6 21.1 42.4 22.2 44 M25.3 38.9 C26.7 40.6 26.9 42.4 25.8 44\"/></g></svg>",
    ingot: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"currentColor\" stroke=\"none\" opacity=\".1\" d=\"M16 17.5C16 11 19.5 7.5 24 7.5C28.5 7.5 32 11 32 17.5Q24 21.5 16 17.5Z\"/><path fill=\"currentColor\" stroke=\"none\" opacity=\".12\" d=\"M9 26C13 33.5 18 36.5 24 36.5C30 36.5 35 33.5 39 26C34 30.5 29.5 32.5 24 32.5C18.5 32.5 14 30.5 9 26Z\"/><path stroke-width=\"1.8\" d=\"M6.5 13.5C10 12 12.5 14 14.5 16C17.5 18.5 30.5 18.5 33.5 16C35.5 14 38 12 41.5 13.5C43.5 17 43 22 41 26C37.5 33.5 31.5 38 24 38C16.5 38 10.5 33.5 7 26C5 22 4.5 17 6.5 13.5Z\"/><path stroke-width=\"1.6\" d=\"M16 17.5C16 11 19.5 7.5 24 7.5C28.5 7.5 32 11 32 17.5\"/><path stroke-width=\"1.4\" d=\"M16 17.5Q24 21.5 32 17.5\"/><path stroke-width=\"1.3\" d=\"M11 20.5C15.5 24 32.5 24 37 20.5\"/><path stroke-width=\"1.2\" d=\"M19.5 10.8C20.8 9.5 22.3 8.9 24 8.9\"/><path stroke-width=\"1.2\" d=\"M8.5 15.5C9.5 14.6 10.6 14.2 11.8 14.5M39.5 15.5C38.5 14.6 37.4 14.2 36.2 14.5\"/><path stroke-width=\"1.2\" d=\"M39.5 5.5V9.9M37.3 7.7H41.7M8 6V9.4M6.3 7.7H9.7\"/></g></svg>",
    cloud: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"currentColor\" stroke=\"none\" opacity=\".12\" d=\"M12 22.5C11.5 17.5 17.5 13.8 22 17C26.5 13.8 32.5 17.5 32 22.5C31.8 25.5 27.5 27.2 24.6 25.8L22 24.6L19.4 25.8C16.5 27.2 12.2 25.5 12 22.5Z\"/><path stroke-width=\"1.8\" d=\"M11.6 22.8C10.2 16.8 17.2 12.4 22 16C26.8 12.4 33.8 16.8 32.4 22.8\"/><path stroke-width=\"1.6\" d=\"M20.6 25.6C20.6 20.8 13.6 20.4 12.6 24.4C11.9 27.4 15.2 29.4 17.6 27.9C19.2 26.9 19.2 24.9 17.6 24.4\"/><path stroke-width=\"1.6\" d=\"M23.4 25.6C23.4 20.8 30.4 20.4 31.4 24.4C32.1 27.4 28.8 29.4 26.4 27.9C24.8 26.9 24.8 24.9 26.4 24.4\"/><path stroke-width=\"1.6\" d=\"M12.6 30.8Q22 34.2 31.4 30.8\"/><path stroke-width=\"1.4\" d=\"M33.6 26.5C38 27 41.5 26 43.5 23.5\"/><path stroke-width=\"1.4\" d=\"M31 31.5C36.5 33 41 31.5 43.4 28.5\"/><path stroke-width=\"1.4\" d=\"M10.4 26.6C7.6 27.2 5.6 26.2 4.6 24.4\"/><path stroke-width=\"1.6\" d=\"M15.2 25.2l.1.1M28.7 25.2l.1.1\"/></g></svg>",
    bamboo: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke-width=\"2\" d=\"M14 43.5C16 31 19 18.5 25 6.5\"/><path stroke-width=\"2\" d=\"M33 43.5C30 32 25.5 19.5 17.5 8.5\"/><path stroke-width=\"1.3\" d=\"M13.6 32.2q2.6 1.4 5.1.2M16.7 20.8q2.5 1.4 4.9.2\"/><path stroke-width=\"1.3\" d=\"M27.4 32.6q2.5 1.4 4.9.2M23.1 22q2.5 1.4 4.9.2\"/><path stroke-width=\"1.4\" fill=\"currentColor\" fill-opacity=\".12\" d=\"M25 7q8-2 13 1q-7 2.5-13-1ZM25 7q6.5 2 9 6.5q-6.5-1-9-6.5ZM25 7q4-3 8.5-3q-4 3-8.5 3Z\"/><path stroke-width=\"1.4\" fill=\"currentColor\" fill-opacity=\".12\" d=\"M22 15.3q-8-2.5-12.5.3q7 3 12.5-.3ZM22 15.3q-6 2.8-7.5 7.5q6-2 7.5-7.5Z\"/><path stroke-width=\"1.4\" fill=\"currentColor\" fill-opacity=\".12\" d=\"M31.3 37.5q8-1 12 2.2q-7.5 1.8-12-2.2ZM31.3 37.5q6.5-4 11.5-3.5q-5.5 4.5-11.5 3.5Z\"/></g></svg>",
    knot: "<svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><g transform=\"rotate(45 24 24)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"currentColor\" stroke=\"none\" opacity=\".08\" d=\"M18 14h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z\"/><path d=\"M12.4 14L11 14A4 4 0 0 0 11 22L20.4 22M23.6 22H32.4M35.6 22H37A4 4 0 0 0 37 14L27.6 14M15.6 14H24.4\"/><path d=\"M12.4 26L11 26A4 4 0 0 0 11 34L20.4 34M23.6 34H32.4M35.6 34H37A4 4 0 0 0 37 26L27.6 26M15.6 26H24.4\"/><path d=\"M14 20.4L14 11A4 4 0 0 1 22 11L22 12.4M22 15.6V24.4M22 27.6L22 37A4 4 0 0 1 14 37L14 35.6M14 32.4V23.6\"/><path d=\"M26 20.4L26 11A4 4 0 0 1 34 11L34 12.4M34 15.6V24.4M34 27.6L34 37A4 4 0 0 1 26 37L26 35.6M26 32.4V23.6\"/><path stroke-width=\"1.4\" d=\"M24 22.9L25.1 24L24 25.1L22.9 24Z\"/></g></svg>"
  };
  var MOTIFS = [
    { k: "fu", cn: "福", name: "Fortune" },
    { k: "cat", cn: "貓", name: "Lucky Cat" },
    { k: "ingot", cn: "錠", name: "Gold Ingot" },
    { k: "coin", cn: "錢", name: "Old Coin" },
    { k: "lantern", cn: "燈", name: "Lantern" },
    { k: "cloud", cn: "雲", name: "Cloud Scroll" },
    { k: "bamboo", cn: "竹", name: "Bamboo" },
    { k: "knot", cn: "結", name: "Endless Knot" }
  ];
  var curMotif = "fu";
  try { curMotif = localStorage.getItem("zodi-almanac-motif") || "fu"; } catch (e) {}
  function motifHtml() {
    if (curMotif !== "fu" && MOTIF_SVG[curMotif]) return '<span class="alm-motif alm-motif-svg">' + MOTIF_SVG[curMotif] + "</span>";
    return '<span class="alm-motif" lang="zh-Hant">福</span>';
  }
  function applyMotif(k) {
    curMotif = k;
    try { localStorage.setItem("zodi-almanac-motif", k); } catch (e) {}
    MOTIFS.forEach(function (m) { var b = $("#almMotif-" + m.k); if (b) b.setAttribute("aria-pressed", m.k === k); });
    renderCard();
    track("almanac_motif", { motif: k });
  }
  function renderMotifs() {
    var wrap = $("#almMotifs"); if (!wrap) return;
    wrap.innerHTML = MOTIFS.map(function (m) {
      return '<button type="button" class="alm-skin" id="almMotif-' + m.k + '" aria-pressed="false" title="' + m.name + '">' +
        '<i aria-hidden="true">' + (MOTIF_SVG[m.k] || '<span lang="zh-Hant">福</span>') + "</i>" + m.name + "</button>";
    }).join("");
    MOTIFS.forEach(function (m) { $("#almMotif-" + m.k).addEventListener("click", function () { applyMotif(m.k); }); });
    if (!MOTIFS.some(function (m) { return m.k === curMotif; })) curMotif = "fu";
    var cur = $("#almMotif-" + curMotif); if (cur) cur.setAttribute("aria-pressed", "true");
  }

  function stepDay(dir) {
    var g = A.dateFromJdn(A.jdnFromDate(state.sel.y, state.sel.m, state.sel.d) + dir);
    selectDate(g.y, g.m, g.d, { push: true });
  }
  function selectDate(y, m, d, opts) {
    opts = opts || {};
    state.sel = { y: y, m: m, d: d };
    if (m !== state.view.m || y !== state.view.y) state.view = { y: y, m: m };
    renderCard(); renderGrid(); renderNow();
    if (opts.push !== false) setUrl(true); else setUrl(false);
    announce("Showing " + DOW_EN[new Date(y, m - 1, d).getDay()] + ", " + MONTHS[m - 1] + " " + d + ", " + y);
    track("almanac_day_selected", { date: iso(y, m, d) });
  }

  /* ---------- exports and sharing ---------- */
  function dayTitle(info) {
    var t = [];
    info.festivals.forEach(function (f) { t.push(f.en + " " + f.cn); });
    if (info.term) t.push(info.term.en + " " + info.term.cn);
    var off = O.officers[info.officerIdx];
    if (!t.length) t.push(off.title + " day, " + info.ganzhiDay);
    return t.join(" · ");
  }
  function readingText(info, full) {
    var off = O.officers[info.officerIdx];
    var stem = G.stems[info.dayStem], br = G.branches[info.dayBranch];
    var pv = PROVERBS[info.dayBranch];
    var L = [];
    L.push(iso(info.y, info.m, info.d) + ": " + HEADLINES[info.officerIdx] + " (" + info.ganzhiDay + ", " + stem.pinyin + " " + br.pinyin + ", " + off.title + ")");
    L.push("Favor: " + off.favors.slice(0, full ? 9 : 3).join(", ").toLowerCase());
    L.push("Avoid: " + off.avoids.slice(0, full ? 9 : 2).join(", ").toLowerCase());
    if (full && info.lunar) L.push("Lunar date: " + info.lunar.monthCn + info.lunar.dayCn);
    if (full) L.push("Saying: " + pv.chars.map(function (c) { return c[0]; }).join("") + " (" + pv.pinyin + "): " + pv.meaning);
    L.push("https://www.zodianimal.com/almanac/?date=" + iso(info.y, info.m, info.d));
    return L.join("\n");
  }
  function shareDay(info) {
    var text = readingText(info, false);
    if (navigator.share) { navigator.share({ title: dayTitle(info), text: text }).catch(function () {}); track("almanac_share_native"); }
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { toast("Copied. Send it to someone."); });
  }
  function copyReading(info, full) {
    if (navigator.clipboard) navigator.clipboard.writeText(readingText(info, full)).then(function () { toast("Reading copied."); });
    track("almanac_copy_day");
  }
  function addToGoogle(info) {
    var d0 = "" + info.y + pad(info.m) + pad(info.d);
    var next = A.dateFromJdn(info.jdn + 1);
    var url = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(dayTitle(info)) +
      "&dates=" + d0 + "/" + next.y + pad(next.m) + pad(next.d) +
      "&details=" + encodeURIComponent(readingText(info, true));
    window.open(url, "_blank", "noopener");
  }
  function downloadIcs(info) {
    var d0 = "" + info.y + pad(info.m) + pad(info.d);
    var next = A.dateFromJdn(info.jdn + 1);
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Zodi Animal//Zodi Almanac//EN", "BEGIN:VEVENT",
      "UID:zodi-almanac-" + d0 + "@zodianimal.com", "DTSTAMP:" + d0 + "T000000Z",
      "DTSTART;VALUE=DATE:" + d0, "DTEND;VALUE=DATE:" + next.y + pad(next.m) + pad(next.d),
      "SUMMARY:" + dayTitle(info).replace(/,/g, "\\,"),
      "DESCRIPTION:" + readingText(info, true).replace(/,/g, "\\,").replace(/\n/g, "\\n"),
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var blob = new Blob([ics], { type: "text/calendar" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "zodi-almanac-" + iso(info.y, info.m, info.d) + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast("Saved. Open the file to add it to your calendar.");
  }
  function toast(msg) {
    var t = $("#almToast"); if (!t) return;
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 3600);
  }


  /* ---------- personal omen exports ---------- */
  function omenParts(info) {
    var rel = relFor(info);
    if (!rel) return null;
    var myAnimal = A.ANIMALS[state.profile.branch];
    var isClash = rel.key === "clash";
    var advice = (O.dayAdvice && O.dayAdvice[isClash ? "clash" : "harmony"] || {})[myAnimal] || rel.data.interpret;
    var off = O.officers[info.officerIdx];
    return {
      title: rel.data.hant + " " + (isClash ? "Caution day for the " : "Blessing day for the ") + myAnimal,
      desc: advice + "\n" + rel.data.name + " (" + rel.data.pinyin + "): " + rel.data.meaning +
        "\nDay pillar " + info.ganzhiDay + " (" + off.title + "). Favor: " + off.favors.slice(0, 3).join(", ").toLowerCase() +
        ". Avoid: " + off.avoids.slice(0, 2).join(", ").toLowerCase() +
        ".\nFull reading: https://www.zodianimal.com/almanac/?date=" + iso(info.y, info.m, info.d)
    };
  }
  function omenToGoogle(info) {
    var p = omenParts(info); if (!p) return;
    var d0 = "" + info.y + pad(info.m) + pad(info.d);
    var next = A.dateFromJdn(info.jdn + 1);
    window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(p.title) +
      "&dates=" + d0 + "/" + next.y + pad(next.m) + pad(next.d) +
      "&details=" + encodeURIComponent(p.desc.replace(/\\n/g, "\n")), "_blank", "noopener");
  }
  function omenIcs(info) {
    var p = omenParts(info); if (!p) return;
    var d0 = "" + info.y + pad(info.m) + pad(info.d);
    var next = A.dateFromJdn(info.jdn + 1);
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Zodi Animal//Zodi Almanac Omen//EN", "BEGIN:VEVENT",
      "UID:zodi-omen-" + d0 + "@zodianimal.com", "DTSTAMP:" + d0 + "T000000Z",
      "DTSTART;VALUE=DATE:" + d0, "DTEND;VALUE=DATE:" + next.y + pad(next.m) + pad(next.d),
      "SUMMARY:" + p.title.replace(/,/g, "\\,"),
      "DESCRIPTION:" + p.desc.replace(/,/g, "\\,"),
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var blob = new Blob([ics], { type: "text/calendar" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "zodi-omen-" + iso(info.y, info.m, info.d) + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast("Saved. Open the file to add the reminder.");
  }

  /* ---------- month grid + list ---------- */
  function cellMarks(info) {
    var out = [];
    if (info.festivals.length) out.push('<span class="alm-mk alm-mk-fest" lang="zh-Hant" title="' + esc(info.festivals[0].en) + '">' + info.festivals[0].cn.slice(0, 2) + "</span>");
    if (info.term) out.push('<span class="alm-mk alm-mk-term" lang="zh-Hant" title="' + esc(info.term.en) + '">' + info.term.cn + "</span>");
    if (info.newMoon) out.push('<span class="alm-mk alm-mk-moon" title="New moon">●</span>');
    if (info.fullMoon) out.push('<span class="alm-mk alm-mk-moon" title="Full moon">○</span>');
    var rel = relFor(info);
    if (rel && rel.key === "clash") out.push('<span class="alm-mk alm-mk-clash"><span lang="zh-Hant">沖</span> Clash</span>');
    if (rel && (rel.key === "harmony" || rel.key === "trine")) out.push('<span class="alm-mk alm-mk-harm"><span lang="zh-Hant">合</span> Harmony</span>');
    return out.join("");
  }
  var gridCache = { key: null, cells: {} };
  function renderGrid(force) {
    // compact sticky month picker: day number plus one marker line.
    // Rebuilt only when the month or profile changes; selection within a
    // month just swaps classes, so the sticky rail never flashes.
    var v = state.view, wrap = $("#almGrid"), label = $("#almGridLabel");
    if (!wrap) return;
    var key = v.y + "-" + v.m + (state.profile ? "-p" + state.profile.branch : "");
    if (!force && gridCache.key === key) {
      Object.keys(gridCache.cells).forEach(function (d) {
        var c = gridCache.cells[d];
        var sel = state.sel.y === v.y && state.sel.m === v.m && +d === state.sel.d;
        c.className = c.className.replace(/ alm-selected/g, "") + (sel ? " alm-selected" : "");
      });
      return;
    }
    gridCache.key = key; gridCache.cells = {};
    label.textContent = MONTHS[v.m - 1] + " " + v.y;
    wrap.innerHTML = "";
    var dim = new Date(v.y, v.m, 0).getDate();
    ["M", "T", "W", "T", "F", "S", "S"].forEach(function (w) { wrap.appendChild(el("div", "alm-dow", w)); });
    var lead = (new Date(v.y, v.m - 1, 1).getDay() + 6) % 7;
    for (var i = 0; i < lead; i++) wrap.appendChild(el("div", "alm-cell alm-empty", ""));
    for (var d = 1; d <= dim; d++) {
      (function (d) {
        var info = A.dayInfo(v.y, v.m, d);
        var rel = relFor(info);
        var isClash = rel && rel.key === "clash";
        var isHarm = rel && (rel.key === "harmony" || rel.key === "trine");
        var cell = el("button", "alm-cell" +
          (isClash ? " alm-clash" : "") + (isHarm ? " alm-lucky" : "") +
          (info.festivals.length ? " alm-hasfest" : "") +
          (state.sel.y === v.y && state.sel.m === v.m && state.sel.d === d ? " alm-selected" : ""), "");
        cell.type = "button";
        if (isToday(v.y, v.m, d)) { cell.className += " alm-today"; cell.setAttribute("aria-current", "date"); }
        cell.setAttribute("aria-label", MONTHS[v.m - 1] + " " + d +
          (info.term ? ", " + info.term.en : "") + (info.festivals.length ? ", " + info.festivals[0].en : "") +
          (info.newMoon ? ", new moon" : "") + (info.fullMoon ? ", full moon" : "") +
          (isClash ? ", your clash day" : "") + (isHarm ? ", your harmony day" : ""));
        // one compact marker: festival char beats term char beats moon beats relation
        var mark = "";
        if (info.festivals.length) mark = '<span class="alm-mk alm-mk-fest" lang="zh-Hant">' + info.festivals[0].cn.slice(0, 2) + "</span>";
        else if (info.term) mark = '<span class="alm-mk alm-mk-term" lang="zh-Hant">' + info.term.cn + "</span>";
        else if (info.newMoon) mark = '<span class="alm-mk alm-mk-moon">●</span>';
        else if (info.fullMoon) mark = '<span class="alm-mk alm-mk-moon">○</span>';
        var relMark = isClash ? '<span class="alm-mk alm-mk-clash" lang="zh-Hant">沖</span>' :
          (isHarm ? '<span class="alm-mk alm-mk-harm" lang="zh-Hant">合</span>' : "");
        cell.innerHTML = '<span class="alm-cell-d">' + d + "</span>" +
          '<span class="alm-cell-m">' + mark + relMark + "</span>";
        cell.addEventListener("click", function () { selectDate(v.y, v.m, d, { push: true }); });
        gridCache.cells[d] = cell;
        wrap.appendChild(cell);
      })(d);
    }
  }
  function stepMonth(dir) {
    var v = state.view;
    v.m += dir;
    if (v.m < 1) { v.m = 12; v.y--; }
    if (v.m > 12) { v.m = 1; v.y++; }
    renderGrid();
    announce(MONTHS[v.m - 1] + " " + v.y);
  }

  /* ---------- upcoming ---------- */
  var upFilter = "all";
  var upExpanded = false;
  function renderUpcoming() {
    var wrap = $("#almUpcoming"); if (!wrap) return;
    var startJdn = A.jdnFromDate(TD.y, TD.m, TD.d);
    var out = [];
    for (var i = 0; i < 430 && out.length < 40; i++) {
      var g = A.dateFromJdn(startJdn + i);
      var info = A.dayInfo(g.y, g.m, g.d);
      var rel = relFor(info);
      info.festivals.forEach(function (f) {
        out.push({ cat: "festivals", info: info, cn: f.cn, py: null, en: f.en, note: f.note, inDays: i });
      });
      if (info.term) {
        var e = termEntry(info.term.lon);
        out.push({ cat: "terms", info: info, cn: e.hant, py: e.pinyin, en: e.name, note: e.season.split(". ")[0] + ".", inDays: i });
      }
      if (info.newMoon) out.push({ cat: "moon", info: info, cn: "新月", py: "xīn yuè", en: "New moon", note: "A lunar month begins.", inDays: i });
      if (info.fullMoon) out.push({ cat: "moon", info: info, cn: "滿月", py: "mǎn yuè", en: "Full moon", note: "The middle of the lunar month.", inDays: i });
      if (rel && rel.key === "clash" && !renderUpcoming._c) { out.push({ cat: "mine", info: info, cn: "沖", py: "chōng", en: "Your next clash day", note: rel.data.interpret, inDays: i }); renderUpcoming._c = 1; }
      if (rel && rel.key === "harmony" && !renderUpcoming._h) { out.push({ cat: "mine", info: info, cn: "六合", py: "liù hé", en: "Your next harmony day", note: rel.data.interpret, inDays: i }); renderUpcoming._h = 1; }
    }
    renderUpcoming._c = renderUpcoming._h = 0;
    var full = out.filter(function (x) { return upFilter === "all" ? true : x.cat === upFilter; }).slice(0, upFilter === "all" ? 9 : 8);
    var list = upExpanded ? full : full.slice(0, 3);
    wrap.innerHTML = "";
    list.forEach(function (ev) {
      var row = el("div", "alm-up");
      row.innerHTML = '<div class="alm-up-date"><b>' + MONTHS[ev.info.m - 1].slice(0, 3) + " " + ev.info.d + "</b><span>" +
        (ev.inDays === 0 ? "today" : "in " + ev.inDays + (ev.inDays === 1 ? " day" : " days")) + "</span></div>" +
        '<div class="alm-up-body"><b><span lang="zh-Hant">' + ev.cn + "</span>" + (ev.py ? " " + esc(ev.py) : "") + " · " + esc(ev.en) + "</b><p>" + esc(ev.note) + "</p></div>" +
        '<button class="alm-mini" type="button">Read this day</button>';
      row.querySelector("button").addEventListener("click", function () {
        selectDate(ev.info.y, ev.info.m, ev.info.d, { push: true });
        var c = $("#almCard"); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      wrap.appendChild(row);
    });
    if (!list.length) wrap.innerHTML = '<p class="alm-up-empty">Enter a birth date and your clash and harmony days appear here.</p>';
    if (full.length > 3) {
      var more = el("button", "alm-ghost alm-up-more", upExpanded ? "Show fewer" : "Show " + (full.length - 3) + " more turns");
      more.type = "button";
      more.addEventListener("click", function () { upExpanded = !upExpanded; renderUpcoming(); });
      wrap.appendChild(more);
    }
  }

  /* ---------- personalization ---------- */
  function renderProfile() {
    var box = $("#almYou"), form = $("#almYouForm");
    if (!box || !form) return;
    if (state.profile) {
      var p = state.profile;
      form.hidden = true; box.hidden = false;
      var tInfo = A.dayInfo(TD.y, TD.m, TD.d);
      var rel = A.personalRelation(tInfo.dayBranch, p.branch);
      var rd = O.relations[rel.key];
      var br = G.branches[p.branch];
      box.innerHTML =
        '<p class="alm-you-line">Born ' + iso(p.y, p.m, p.d) + ": a <b>" + A.STEMS[p.yStem] + A.BRANCHES[p.branch] + "</b> year, so your animal is the <b>" +
          A.ANIMALS[p.branch] + ' <span lang="zh-Hant">' + A.ANIMAL_CN[p.branch] + "</span></b> (" + esc(br.pinyin) + ").</p>" +
        '<p class="alm-you-note">The zodiac year here turns at Li Chun (立春, the start of spring, around February 4), not at Lunar New Year. Someone born between January 1 and Li Chun belongs to the previous animal year. Some traditions turn the year at Lunar New Year instead; both are in use.</p>' +
        '<p class="alm-you-rel">Today is a <b><span lang="zh-Hant">' + rd.hant + "</span> " + esc(rd.name) + "</b> day for you. " + esc(rd.interpret) + "</p>" +
        '<p class="alm-you-note">Clash days are marked <span lang="zh-Hant">沖</span> and harmony days <span lang="zh-Hant">合</span> in the month view. ' +
        '<a href="../bazi/">Read your full BaZi chart</a> or <button class="alm-linkbtn" type="button" id="almForget">clear the birth date</button>.</p>';
      $("#almForget").addEventListener("click", function () {
        try { localStorage.removeItem("zodi-almanac-profile"); } catch (e) {}
        state.profile = null;
        renderProfile(); renderGrid(true); renderCard(); renderUpcoming();
      });
    } else { form.hidden = false; box.hidden = true; }
  }
  function wireProfileForm() {
    var f = $("#almYouForm"); if (!f) return;
    // segmented birth date: typing flows month -> day -> year,
    // backspace in an empty box steps back and eats the previous digit
    var segs = [$("#almBM"), $("#almBD"), $("#almBY")];
    function wireSeg(i) {
      var box = segs[i]; if (!box || !box.addEventListener) return;
      box.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        var max = i === 2 ? 4 : 2;
        if (this.value.length > max) this.value = this.value.slice(0, max);
        // jump forward when the box is full, or when one digit already settles it
        var early = (i === 0 && this.value.length === 1 && +this.value >= 2) ||
                    (i === 1 && this.value.length === 1 && +this.value >= 4);
        if ((this.value.length >= max || early) && segs[i + 1]) {
          if (early && this.value.length === 1) this.value = "0" + this.value;
          segs[i + 1].focus();
          if (segs[i + 1].select) segs[i + 1].select();
        }
      });
      box.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && segs[i - 1]) {
          e.preventDefault();
          var prev = segs[i - 1];
          prev.value = prev.value.slice(0, -1);
          prev.focus();
        }
      });
      box.addEventListener("blur", function () {
        if (i < 2 && this.value.length === 1) this.value = "0" + this.value;
      });
    }
    wireSeg(0); wireSeg(1); wireSeg(2);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = $("#almYouMsg");
      var p = [Number(segs[2] && segs[2].value), Number(segs[0] && segs[0].value), Number(segs[1] && segs[1].value)];
      if (!p[0] || !p[1] || !p[2] || p[1] < 1 || p[1] > 12 || p[0] < 1900 || p[0] > TD.y || p[2] < 1 || p[2] > new Date(p[0], p[1], 0).getDate()) {
        if (msg) msg.textContent = "That date does not exist. Check the day and month."; return;
      }
      if (msg) msg.textContent = "";
      var info = A.dayInfo(p[0], p[1], p[2]);
      state.profile = { y: p[0], m: p[1], d: p[2], branch: info.yearBranch, yStem: info.yearStem, dayStem: info.dayStem };
      try { localStorage.setItem("zodi-almanac-profile", JSON.stringify(state.profile)); } catch (err) {}
      renderProfile(); renderGrid(true); renderCard(); renderUpcoming(); floatBadge();
      track("almanac_personalized");
    });
  }

  /* ---------- next turns preview (hero) ---------- */
  function renderNext3() {
    var wrap = $("#almNext3"); if (!wrap) return;
    var startJdn = A.jdnFromDate(TD.y, TD.m, TD.d);
    var out = [];
    for (var i = 0; i < 120 && out.length < 3; i++) {
      var g = A.dateFromJdn(startJdn + i);
      var info = A.dayInfo(g.y, g.m, g.d);
      info.festivals.forEach(function (f) { if (out.length < 3) out.push({ info: info, cn: f.cn, en: f.en, inDays: i }); });
      if (out.length < 3 && info.term) {
        var e = termEntry(info.term.lon);
        out.push({ info: info, cn: e.hant, en: e.name, inDays: i });
      }
    }
    wrap.innerHTML = "";
    out.forEach(function (ev) {
      var row = el("button", "alm-n3", "");
      row.type = "button";
      row.innerHTML = '<b>' + MONTHS[ev.info.m - 1].slice(0, 3) + " " + ev.info.d + '</b><span lang="zh-Hant">' + ev.cn + "</span><span>" + esc(ev.en) + '</span><i>' +
        (ev.inDays === 0 ? "today" : "in " + ev.inDays + (ev.inDays === 1 ? " day" : " days")) + "</i>";
      row.addEventListener("click", function () {
        selectDate(ev.info.y, ev.info.m, ev.info.d, { push: true });
        var c = $("#almCard"); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      wrap.appendChild(row);
    });
  }

  /* ---------- the year as one calendar file ---------- */
  function yearOpts() {
    function on(id) { var x = $("#" + id); return !x || x.checked; }
    return { terms: on("almOptTerms"), fests: on("almOptFests"),
      moons: (function () { var x = $("#almOptMoons"); return x ? x.checked : false; })(),
      clash: on("almOptClash") };
  }
  function yearIcsEvents(opts) {
    opts = opts || yearOpts();
    var startJdn = A.jdnFromDate(TD.y, TD.m, TD.d);
    var evs = [];
    for (var i = 0; i < 366; i++) {
      var g = A.dateFromJdn(startJdn + i);
      var info = A.dayInfo(g.y, g.m, g.d);
      var off = O.officers[info.officerIdx];
      var base = "Day pillar " + info.ganzhiDay + " (" + off.title + "). Favor: " +
        off.favors.slice(0, 3).join(", ").toLowerCase() + ". Avoid: " + off.avoids.slice(0, 2).join(", ").toLowerCase() +
        ".\\nFull reading: https://www.zodianimal.com/almanac/?date=" + iso(g.y, g.m, g.d);
      if (opts.fests) info.festivals.forEach(function (f) {
        evs.push({ jdn: info.jdn, sum: f.cn + " " + f.en, desc: f.note + "\\n" + base });
      });
      if (opts.moons && info.newMoon) evs.push({ jdn: info.jdn, sum: "新月 New moon", desc: "A lunar month begins.\\n" + base });
      if (opts.moons && info.fullMoon) evs.push({ jdn: info.jdn, sum: "滿月 Full moon", desc: "The middle of the lunar month.\\n" + base });
      if (opts.terms && info.term) {
        var e = termEntry(info.term.lon);
        evs.push({ jdn: info.jdn, sum: e.hant + " " + e.name + " begins", desc: e.season + "\\n" + base });
      }
      if (opts.clash && state.profile) {
        var rel = A.personalRelation(info.dayBranch, state.profile.branch);
        if (rel && rel.key === "clash") {
          evs.push({ jdn: info.jdn, sum: "沖 Clash day for the " + A.ANIMALS[state.profile.branch], desc: O.relations.clash.interpret + "\\n" + base });
        }
      }
    }
    return evs;
  }
  function downloadYearIcs() {
    var evs = yearIcsEvents();
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Zodi Animal//Zodi Almanac Year//EN",
      "X-WR-CALNAME:Zodi Almanac", "X-WR-CALDESC:Solar terms, festivals" + (state.profile ? ", and your clash days" : "") + " from zodianimal.com/almanac/"];
    evs.forEach(function (ev, i) {
      var g = A.dateFromJdn(ev.jdn), n = A.dateFromJdn(ev.jdn + 1);
      var d0 = "" + g.y + pad(g.m) + pad(g.d);
      L.push("BEGIN:VEVENT", "UID:zodi-year-" + d0 + "-" + i + "@zodianimal.com",
        "DTSTAMP:" + d0 + "T000000Z", "DTSTART;VALUE=DATE:" + d0,
        "DTEND;VALUE=DATE:" + n.y + pad(n.m) + pad(n.d),
        "SUMMARY:" + ev.sum.replace(/,/g, "\\,"),
        "DESCRIPTION:" + ev.desc.replace(/,/g, "\\,"),
        "END:VEVENT");
    });
    L.push("END:VCALENDAR");
    var blob = new Blob([L.join("\r\n")], { type: "text/calendar" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "zodi-almanac-year.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    announce("Calendar file with " + evs.length + " dates saved.");
    track("almanac_year_ics", { events: evs.length, personalized: !!state.profile });
  }


  /* ---------- rail widgets: the hour now + the 60-day wheel ---------- */
  function renderNow() {
    var wrap = $("#almNow"); if (!wrap) return;
    var h = new Date().getHours();
    var bIdx = Math.floor(((h + 1) % 24) / 2);
    var br = G.branches[bIdx];
    var info = A.dayInfo(state.sel.y, state.sel.m, state.sel.d);
    var cyc = info.cycleIdx + 1;
    var pct = cyc / 60;
    var R = 15.9, C = 2 * Math.PI * R;
    wrap.innerHTML =
      '<div class="alm-now"><span class="alm-now-han" lang="zh-Hant">' + br.hant + "時</span>" +
        '<span class="alm-now-txt"><b>Hour of the ' + br.animal + "</b><i>" + esc(br.hours) + " · " + esc(br.pinyin) + "</i></span></div>" +
      '<div class="alm-wheel" role="img" aria-label="Day ' + cyc + ' of the 60-day cycle">' +
        '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="' + R + '" fill="none" stroke="currentColor" opacity=".18" stroke-width="3"/>' +
        '<circle cx="20" cy="20" r="' + R + '" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="' +
        (C * pct).toFixed(1) + " " + C.toFixed(1) + '" transform="rotate(-90 20 20)"/></svg>' +
        '<span class="alm-wheel-txt"><b>' + cyc + "</b>/60</span>" +
        '<span class="alm-wheel-cap">' + info.ganzhiDay + " in the sixty-day cycle</span>" +
      "</div>";
  }
  if (typeof setInterval === "function") setInterval(function () { try { renderNow(); } catch (e) {} }, 60000);


  /* ---------- the learn deck ---------- */
  function wireLearnDeck() {
    var grid = $("#almFcGrid"), prog = $("#almFcProgress");
    if (!grid || !grid.querySelectorAll) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".alm-fc"));
    if (!cards.length) return;
    var studied = {};
    try { studied = JSON.parse(localStorage.getItem("zodi-almanac-studied") || "{}"); } catch (e) {}
    function refresh() {
      var n = Object.keys(studied).length;
      if (prog) prog.textContent = n === 0 ? "" : (n >= cards.length ? "All ten studied. You can read the almanac." : n + " of " + cards.length + " studied.");
    }
    cards.forEach(function (c, i) {
      if (studied[i]) c.classList.add("alm-fc-done");
      c.addEventListener("click", function () {
        var open = c.getAttribute("aria-expanded") === "true";
        c.setAttribute("aria-expanded", String(!open));
        if (!open && !studied[i]) {
          studied[i] = 1;
          c.classList.add("alm-fc-done");
          try { localStorage.setItem("zodi-almanac-studied", JSON.stringify(studied)); } catch (e) {}
          refresh();
          track("almanac_study_card", { card: i });
        }
      });
    });
    refresh();
  }

  /* ---------- return behavior ---------- */
  function returnLine() {
    var slot = $("#almReturn"); if (!slot) return;
    var key = "zodi-almanac-seen", todayIso = iso(TD.y, TD.m, TD.d), prev = null;
    try { prev = localStorage.getItem(key); localStorage.setItem(key, todayIso); } catch (e) {}
    if (prev === todayIso) slot.textContent = "You have read today already. The next turn of the calendar arrives tomorrow.";
    else if (prev) slot.textContent = "Welcome back. The calendar has turned since your last visit.";
  }

  /* ---------- init ---------- */
  function wireFloat() {
    var btn = $("#almFloatBtn"), panel = $("#almFloatPanel");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      if (open) { var b = $("#almBM"); if (b && b.focus) b.focus(); }
    });
  }
  function floatBadge() {
    var btn = $("#almFloatBtn"); if (!btn) return;
    if (state.profile) {
      btn.innerHTML = '<span lang="zh-Hant">' + A.ANIMAL_CN[state.profile.branch] + "</span><b>Your " + A.ANIMALS[state.profile.branch] + " days</b>";
    } else {
      btn.innerHTML = '<span lang="zh-Hant">生</span><b>Mark my days</b>';
    }
  }
  function wireSubnavSpy() {
    var nav = $("#almSubnav"); if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll(".alm-sub-jump"));
    if (!links.length) return;
    var items = [];
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("data-spy") || "");
      if (sec) items.push({ a: a, sec: sec });
    });
    if (!items.length) return;
    var current = null;
    function setCurrent(a) {
      if (a === current) return; current = a;
      links.forEach(function (x) {
        var on = x === a;
        x.classList.toggle("is-current", on);
        if (on) x.setAttribute("aria-current", "true"); else x.removeAttribute("aria-current");
      });
    }
    var barH = 64;
    try { barH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pn-bar-h"), 10) || 64; } catch (e) {}
    var ticking = false;
    function update() {
      ticking = false;
      var line = barH + 72;
      var chosen = items[0];
      for (var i = 0; i < items.length; i++) {
        if (items[i].sec.getBoundingClientRect().top <= line) chosen = items[i]; else break;
      }
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 4)) chosen = items[items.length - 1];
      setCurrent(chosen.a);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    links.forEach(function (a) { a.addEventListener("click", function () { setCurrent(a); }); });
    update();
  }
  function init() {
    renderSkins(); renderMotifs(); wireFloat(); floatBadge(); renderCard(); renderGrid(); renderNext3(); renderUpcoming(); renderProfile(); wireProfileForm(); wireLearnDeck(); wireSubnavSpy(); returnLine();
    setUrl(false);
    $("#almPrev").addEventListener("click", function () { stepMonth(-1); });
    $("#almNext").addEventListener("click", function () { stepMonth(1); });
    $("#almToday").addEventListener("click", function () { selectDate(TD.y, TD.m, TD.d, { push: true }); });
    var yBtn = $("#almYearIcs");
    if (yBtn) yBtn.addEventListener("click", downloadYearIcs);
    document.querySelectorAll("[data-upfilter]").forEach(function (b) {
      b.addEventListener("click", function () {
        upFilter = b.dataset.upfilter; upExpanded = false;
        document.querySelectorAll("[data-upfilter]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        renderUpcoming();
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
