/* ============================================================
   Zodi Animal — homepage v5 (hero only)
   Collapses the dial into an "Observatory" disclosure, shows a
   compact in-hero result, and personalizes the invitation after a
   reveal. Reuses the existing engine (homepage-v2.js) + profile
   (localStorage "zodi:home-v2:profile"). No duplicate reveal engine,
   no birth date read/sent. Scope: hero + observatory only.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var NS = "zodi:home-v2:";
  function get(k) { try { return localStorage.getItem(NS + k); } catch (e) { return null; } }
  function track(n, p) { try { if (typeof window.gtag === "function") window.gtag("event", n, p || {}); } catch (e) {} }
  var REDUCE = false; try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  var WEST = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  var WEST_G = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  var EAST = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var EAST_ZI = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
  var ELS  = ["Metal","Metal","Water","Water","Wood","Wood","Fire","Fire","Earth","Earth"];

  /* ---------- light ENGINE shim ----------
     card.js (share image) and reveal.js (cinematic essence line) read
     window.ENGINE.essence(sign,animal,primal) and window.ENGINE.moonPhase().
     v5 has no production engine, so supply just those two, keyed off the
     year animal. Never clobbers a real ENGINE if one is present. */
  var ESSENCE_BY_ANIMAL = {
    Rat:"the quick mind in the dark, carrying the instinct to find the way through",
    Ox:"the steady shoulder of the field, carrying the instinct to endure and build",
    Tiger:"the sudden nerve of the wild, carrying the instinct to leap and defend",
    Rabbit:"the soft watcher at the edge, carrying the instinct to sense and slip free",
    Dragon:"the storm that clears the sky, carrying the instinct to rise and remake",
    Snake:"the still coil in the grass, carrying the instinct to wait and strike true",
    Horse:"the open road at a gallop, carrying the instinct to move and run free",
    Goat:"the quiet grace on the hillside, carrying the instinct to tend and mend",
    Monkey:"the bright trick of the branches, carrying the instinct to solve and play",
    Rooster:"the first voice of the morning, carrying the instinct to notice and call it out",
    Dog:"the loyal heart at the gate, carrying the instinct to guard and stay true",
    Pig:"the full warmth of the harvest, carrying the instinct to give and enjoy"
  };
  if (!window.ENGINE) {
    window.ENGINE = {
      essence: function (sign, animal, primal) { return ESSENCE_BY_ANIMAL[animal] || ""; },
      moonPhase: function (date) {
        date = date || new Date();
        var synodic = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14);
        var age = ((date.getTime() - ref) / 86400000) % synodic; if (age < 0) age += synodic;
        var frac = age / synodic;
        var t = [
          [0.03, "New Moon", "open and plant a private intention"],
          [0.22, "Waxing Crescent", "gather what you need and say one yes"],
          [0.28, "First Quarter", "act through the first resistance"],
          [0.47, "Waxing Gibbous", "refine and stay the course"],
          [0.53, "Full Moon", "let yourself be seen, then release what is finished"],
          [0.72, "Waning Gibbous", "share, teach, give thanks"],
          [0.78, "Last Quarter", "cut a loss and forgive"],
          [0.97, "Waning Crescent", "rest without guilt and prepare the next seed"],
          [1.01, "New Moon", "open and plant a private intention"]
        ];
        for (var i = 0; i < t.length; i++) if (frac <= t[i][0]) return { name: t[i][1], advice: t[i][2], frac: frac, age: Math.round(age) };
        return { name: "New Moon", advice: "open and plant a private intention", frac: frac, age: Math.round(age) };
      }
    };
  }

  function loadProfile() {
    try { var raw = get("profile"); if (!raw) return null; var p = JSON.parse(raw);
      if (typeof p.w === "number" && typeof p.e === "number" && p.name && p.slug) return p; } catch (e) {}
    return null;
  }
  var PROFILE = loadProfile();

  var obs = $("#observatory"), toggle = $("#obsToggle");

  function toggleDefaultText() { return PROFILE ? "See my crossing" : "Open the observatory"; }

  function obsOpen(focusHead) {
    if (!obs || !toggle) return;
    obs.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "Close the observatory";
    if (!REDUCE) { obs.classList.remove("v5-anim-in"); void obs.offsetWidth; obs.classList.add("v5-anim-in"); }
    if (focusHead) { var h = $("#obsOpenHead"); if (h) { try { h.focus(); } catch (e) {} } }
    track("v5_observatory_open");
  }
  function obsClose(returnFocus) {
    if (!obs || !toggle) return;
    obs.hidden = true;
    obs.classList.remove("v5-anim-in");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = toggleDefaultText();
    if (returnFocus) { try { toggle.focus(); } catch (e) {} }
    track("v5_observatory_close");
  }

  /* ---------- compact in-hero result ---------- */
  function renderResult() {
    if (!PROFILE) return;
    var box = $("#v5Result"); if (!box) return;
    var set = function (id, t) { var n = $("#" + id); if (n) n.textContent = t; };
    var sun = $("#v5rSun"); if (sun) sun.textContent = WEST_G[PROFILE.w] || "";
    var yz = $("#v5rYearZi"); if (yz) yz.textContent = EAST_ZI[PROFILE.e] || "";
    set("v5rSunName", WEST[PROFILE.w] || "");
    set("v5rYearName", EAST[PROFILE.e] || "");
    set("v5rName", "The " + PROFILE.name);
    var el = PROFILE.el || (typeof PROFILE.year === "number" ? ELS[((PROFILE.year % 10) + 10) % 10] : "");
    set("v5rElem", el ? el + " element" : "");
    set("v5rSr", WEST[PROFILE.w] + " crosses the Year of the " + EAST[PROFILE.e] + " to reveal the " + PROFILE.name + ".");
    var rd = $("#v5rRead"); if (rd) { rd.href = "/animals/" + PROFILE.slug + "/"; rd.textContent = "Read the " + PROFILE.name; }
    box.hidden = false;
    var reward = $(".v4-hongbao .rv-reward"); if (reward) reward.style.display = "none";
  }

  function personalizeInvite() {
    if (!PROFILE) return;
    var e = $("#obsEyebrow"), h = $("#obsHeading"), d = $("#obsDesc"), t = $("#obsToggle");
    if (e) e.textContent = "Your crossing";
    if (h) h.textContent = "Your rings have aligned";
    if (d) d.textContent = WEST[PROFILE.w] + " crossed the Year of the " + EAST[PROFILE.e] + " to reveal the " + PROFILE.name + ". Open the observatory to see where the two rings met.";
    if (t) t.textContent = "See my crossing";
  }
  function resetInvite() {
    var e = $("#obsEyebrow"), h = $("#obsHeading"), d = $("#obsDesc"), t = $("#obsToggle");
    if (e) e.textContent = "The observatory";
    if (h) h.textContent = "See where the two rings meet";
    if (d) d.textContent = "Open the celestial dial to explore how 12 Sun signs and 12 Chinese zodiac years form a menagerie of 144 animals.";
    if (t) t.textContent = "Open the observatory";
  }

  function onReveal() {
    var p = loadProfile();
    if (p) { PROFILE = p; renderResult(); personalizeInvite(); }
  }

  function init() {
    // Returning visitor: keep the hero (state-first) with a compact result; dial stays closed.
    if (PROFILE) {
      var sf = $("#state-first"), sr = $("#state-return");
      if (sf) sf.hidden = false;
      if (sr) sr.hidden = true;
      renderResult(); personalizeInvite();
    }

    // disclosure wiring
    if (toggle && obs) toggle.addEventListener("click", function () { if (obs.hidden) obsOpen(true); else obsClose(true); });
    var ct = $("#obsCloseTop"), cb = $("#obsCloseBottom");
    if (ct) ct.addEventListener("click", function () { obsClose(true); });
    if (cb) cb.addEventListener("click", function () { obsClose(true); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && obs && !obs.hidden) obsClose(true); });

    var see = $("#v5rSee"); if (see) see.addEventListener("click", function () { obsOpen(true); });

    var rc = $("#v5rRecast");
    if (rc) rc.addEventListener("click", function () {
      var box = $("#v5Result"); if (box) box.hidden = true;
      var share = $("#v5Share"); if (share) share.hidden = true;   // the share card disappears on recast
      var reward = $(".v4-hongbao .rv-reward"); if (reward) reward.style.display = "";
      resetInvite();
      var mm = $("#mm"); if (mm) { try { mm.focus(); } catch (e) {} }
      track("v5_recast");
    });

    // subscribe to the reveal: v2 has written the profile by the time this fires.
    // Play the cinematic, then make a grand entrance on the page (open the observatory + confetti).
    var form = $("#sightForm"); if (form) form.addEventListener("submit", function () { setTimeout(onRevealCinematic, 0); });

    // share row handlers
    var cardBtn = $("#v5CardBtn");
    if (cardBtn) cardBtn.addEventListener("click", function () {
      if (!PROFILE || !window.PCARD) return;
      var orig = cardBtn.textContent; cardBtn.textContent = "Drawing…"; cardBtn.disabled = true;
      Promise.resolve(window.PCARD.shareAnimal(cinemaInput(PROFILE)))
        .then(function () { shareToast("Your card is ready — save it or send it on."); })
        .catch(function () {})
        .then(function () { cardBtn.textContent = orig; cardBtn.disabled = false; });
      track("v5_card_download");
    });
    var shareBtn = $("#v5ShareBtn");
    if (shareBtn) shareBtn.addEventListener("click", function () {
      var text = (($("#v5ShareLine") || {}).value) || (PROFILE ? shareText(PROFILE) : "");
      if (navigator.share) { navigator.share({ title: "Zodi Animal", text: text }).catch(function () {}); }
      else if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function () { shareToast("Copied. Send it to a friend."); }); }
      track("v5_share");
    });
    var copyBtn = $("#v5CopyBtn");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      var text = (($("#v5ShareLine") || {}).value) || "";
      if (navigator.clipboard && text) navigator.clipboard.writeText(text).then(function () { shareToast("Copied to clipboard."); });
      track("v5_copy");
    });

    // returning visitor: their animal is already known, so surface the share row + personalized learn
    if (PROFILE) { showShare(); personalizeLearn(); }

    enhancePlate();
  }

  /* ---------- cinematic reveal + grand entrance ---------- */
  function cinemaInput(p) {
    var el = p.el || (typeof p.year === "number" ? ELS[((p.year % 10) + 10) % 10] : "");
    return { cn: EAST_ZI[p.e] || "", animal: EAST[p.e] || "", element: el,
             glyph: WEST_G[p.w] || "", sign: WEST[p.w] || "", primal: p.name };
  }

  // After the cinematic (or on Skip / "See my full reading"): open the observatory
  // with the animal loaded and pop confetti — a grand entrance on the page itself.
  function grandEntrance() {
    // The crossing "drops down" in the red card (ribbon), the invite personalizes,
    // and the share block appears under it — sparkles + confetti land on all of it.
    // The observatory stays closed; "See my crossing" opens it on demand.
    renderResult();
    personalizeInvite();
    showShare();
    personalizeLearn();
    if (!REDUCE) popConfetti();
  }

  /* ---------- share row ---------- */
  function shareText(p) {
    var el = p.el || (typeof p.year === "number" ? ELS[((p.year % 10) + 10) % 10] : "");
    return "My Zodi Animal is the " + p.name + ". " + WEST[p.w] + " crossed with " + (el ? el + " " : "") + EAST[p.e] + ". What's yours? ZodiAnimal.com";
  }
  function shareToast(msg) {
    var t = $("#v5ShareToast"); if (!t) return;
    t.textContent = msg; t.hidden = false;
    clearTimeout(shareToast._t); shareToast._t = setTimeout(function () { t.hidden = true; }, 3400);
  }
  function showShare() {
    if (!PROFILE) return;
    var sec = $("#v5Share"); if (!sec) return;
    var line = $("#v5ShareLine"); if (line) line.value = shareText(PROFILE);
    var ch = $("#v5Challenge"); if (ch) ch.href = "vs.html?with=" + encodeURIComponent(PROFILE.slug);
    sec.hidden = false;
  }

  /* ---------- personalize the "What a Zodi Animal is" section after a reveal ---------- */
  var SIGN_TRAITS = ["drive","steadiness","curiosity","care","warmth","precision","balance","intensity","vision","discipline","independence","imagination"];
  var ANIMAL_TRAITS = ["resourcefulness","endurance","courage","sensitivity","boldness","insight","freedom","gentleness","cleverness","vigilance","loyalty","generosity"];
  function personalizeLearn() {
    if (!PROFILE) return;
    var w = PROFILE.w, e = PROFILE.e;
    var fill = function (cls, txt) { var ns = document.querySelectorAll("." + cls); for (var i = 0; i < ns.length; i++) ns[i].textContent = txt; };
    fill("pl-name", PROFILE.name);
    fill("pl-sign", WEST[w]);
    fill("pl-animal", EAST[e]);
    fill("pl-strait", SIGN_TRAITS[w] || "");
    fill("pl-atrait", ANIMAL_TRAITS[e] || "");
    var read = $("#pl-read"); if (read) read.href = "animals/" + PROFILE.slug + "/";
    var per = $("#v5Personal"); if (per) per.hidden = false;
    var fb = $("#faqBefore"), fa = $("#faqAfter"); if (fb) fb.hidden = true; if (fa) fa.hidden = false;
  }

  function onRevealCinematic() {
    var p = loadProfile();
    if (!p) return;
    PROFILE = p;
    if (window.CINEMA && !REDUCE) {
      try { window.CINEMA.run(cinemaInput(p), grandEntrance); return; } catch (e) {}
    }
    grandEntrance();
  }

  // one-shot celebratory confetti burst layered over the page
  function popConfetti() {
    try {
      var cv = document.createElement("canvas");
      cv.setAttribute("aria-hidden", "true");
      cv.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999";
      document.body.appendChild(cv);
      var ctx = cv.getContext("2d");
      cv.width = window.innerWidth; cv.height = window.innerHeight;
      var cols = ["#ffd98a", "#ffb14a", "#d63a28", "#e8edff", "#aab8ff", "#f5ecd2"];
      var cx = cv.width / 2, cy = cv.height * 0.42, parts = [];
      for (var i = 0; i < 180; i++) {
        var a = Math.random() * Math.PI * 2, s = Math.random() * 13 + 3;
        parts.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3,
                     r: Math.random() * 3 + 1, life: 1, c: cols[(Math.random() * cols.length) | 0] });
      }
      var ring = 0, raf;
      (function frame() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        if (ring < 1) {
          ring += 0.03;
          ctx.beginPath(); ctx.arc(cx, cy, ring * Math.max(cv.width, cv.height) * 0.55, 0, 7);
          ctx.strokeStyle = "rgba(245,236,210," + (0.55 * (1 - ring)) + ")";
          ctx.lineWidth = 6 * (1 - ring) + 1; ctx.stroke();
        }
        var alive = false;
        for (var j = 0; j < parts.length; j++) {
          var p2 = parts[j]; if (p2.life <= 0) continue; alive = true;
          p2.vy += 0.12; p2.vx *= 0.985; p2.vy *= 0.985; p2.x += p2.vx; p2.y += p2.vy; p2.life -= 0.011;
          ctx.globalAlpha = Math.max(0, p2.life); ctx.beginPath(); ctx.arc(p2.x, p2.y, p2.r, 0, 7);
          ctx.fillStyle = p2.c; ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (alive || ring < 1) raf = requestAnimationFrame(frame);
        else { cancelAnimationFrame(raf); if (cv.parentNode) cv.parentNode.removeChild(cv); }
      })();
    } catch (e) {}
  }

  /* ---------- sighting-plate enhancements ----------
     The v2 engine rewrites #roName / #roElem / #roRead on every dial turn.
     We reapply after each render (via MutationObserver, disconnecting while we
     write so we never loop): the animal name becomes the link (CTA removed),
     and the Element row shows the year animal's Wu Xing element + hanzi,
     linked to that element's hall. The engine is never edited. */
  function enhancePlate() {
    var card = $("#roCard"); if (!card) return;
    var nameEl = $("#roName"), readEl = $("#roRead"), elemEl = $("#roElem"), eastEl = $("#roEast");

    // element name -> { hanzi, page slug }
    var WX = {
      Wood:  { zi: "木", slug: "wood" },
      Fire:  { zi: "火", slug: "fire" },
      Earth: { zi: "土", slug: "earth" },
      Metal: { zi: "金", slug: "metal" },
      Water: { zi: "水", slug: "water" }
    };
    // the fixed (branch) element of each year animal, EAST order Rat..Pig
    var EAST_NAMES = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
    var FIXED = ["Water","Earth","Wood","Wood","Earth","Fire","Fire","Earth","Metal","Metal","Earth","Water"];

    function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

    function nameLink() {
      if (!nameEl) return;
      var txt = (nameEl.textContent || "").trim();
      var href = (readEl && readEl.getAttribute("href")) || "";
      if (!txt || !href) return;
      var want = '<a class="v5-name-link" href="' + esc(href) + '">' + esc(txt) + "</a>";
      if (nameEl.innerHTML !== want) nameEl.innerHTML = want;
    }

    function elemLink() {
      if (!elemEl) return;
      var t = (elemEl.textContent || "").trim();
      var name = null, note = "";
      var m = t.match(/^(Wood|Fire|Earth|Metal|Water)\b(.*)$/); // date set: engine gave the year element
      if (m) { name = m[1]; note = (m[2] || "").trim(); }
      else {                                                    // no date: use the year animal's fixed element
        var em = (eastEl ? eastEl.textContent : "").match(/Year of the (\w+)/);
        var idx = em ? EAST_NAMES.indexOf(em[1]) : -1;
        if (idx >= 0) name = FIXED[idx];
      }
      if (!name || !WX[name]) return;
      var wx = WX[name];
      var want = '<a class="v5-elem-link" href="elements/' + wx.slug + '/">'
               + '<span class="v5-elem-zi han" aria-hidden="true">' + wx.zi + "</span>"
               + '<span class="v5-elem-name">' + name + "</span></a>";
      if (note) want += ' <span class="v5-elem-note">' + esc(note) + "</span>";
      if (elemEl.innerHTML !== want) elemEl.innerHTML = want;
    }

    var mo = new MutationObserver(function () {
      mo.disconnect();
      try { nameLink(); elemLink(); }
      finally { mo.observe(card, { childList: true, subtree: true, characterData: true }); }
    });
    nameLink(); elemLink();
    mo.observe(card, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
