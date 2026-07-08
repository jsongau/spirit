/* ============================================================
   Zodi Animal — homepage v4 adapter
   Drives the ORIGINAL index.html identity rail (now living below the
   sub-nav) from the V3/V2 profile. It never computes a crossing and
   never rewires the reveal form: the reveal stays owned by
   homepage-v2.js. This adapter reads "zodi:home-v2:profile",
   subscribes to the reveal + recast, and paints the rail's
   identity card, moon card, and share row. No birth date leaves it.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var NS = "zodi:home-v2:";
  function get(k) { try { return localStorage.getItem(NS + k); } catch (e) { return null; } }
  function track(name, params) { try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {} }

  var WEST = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  var EAST = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var EAST_ZI = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];

  function loadProfile() {
    try { var raw = get("profile"); if (!raw) return null; var p = JSON.parse(raw);
      if (typeof p.w === "number" && typeof p.e === "number" && p.name && p.slug) return p; } catch (e) {}
    return null;
  }
  var PROFILE = loadProfile();

  function shareText() {
    if (!PROFILE) return "Find your Primal Zodiac Animal, one of 144: https://www.zodianimal.com/";
    return "My Zodi Animal is the " + PROFILE.name + " (" + WEST[PROFILE.w] + " × " + EAST[PROFILE.e] + "). Find yours: https://www.zodianimal.com/";
  }

  /* ---------- render the rail ---------- */
  function render() {
    var named = !!PROFILE;
    var main = $("#pn-main"); if (main) main.classList.toggle("is-named", named);

    var card = $("#identity-card"); if (card) card.setAttribute("data-state", named ? "revealed" : "invitation");
    var name = $("#identity-name"); if (name) name.textContent = named ? ("The " + PROFILE.name) : "Not yet named";
    var sigil = $("#identity-sigil");
    if (sigil) sigil.innerHTML = named
      ? '<span style="font-family:\'Ma Shan Zheng\',serif;font-size:2.1rem;line-height:1">' + (EAST_ZI[PROFILE.e] || "獸") + '</span>'
      : '<span class="identity-sigil-wait">✦</span>';
    var pair = $(".identity-pairing");
    if (pair) { if (named) { pair.textContent = WEST[PROFILE.w] + " × " + EAST[PROFILE.e] + (PROFILE.el ? " · " + PROFILE.el : ""); pair.hidden = false; } else { pair.hidden = true; } }

    // primary CTA: before -> scroll to the form; after -> read the animal
    var cta = $("#identity-share");
    if (cta) {
      if (named) {
        cta.innerHTML = "Read the " + PROFILE.name + ' <span aria-hidden="true">✦</span>';
        cta.onclick = function () { track("homepage_returning_result_opened", { animal_slug: PROFILE.slug }); location.href = "/animals/" + PROFILE.slug + "/"; };
      } else {
        cta.innerHTML = 'Reveal my animal <span aria-hidden="true">✦</span>';
        cta.onclick = function () {
          var mm = $("#mm"), hero = $("#animal");
          if (hero && hero.scrollIntoView) hero.scrollIntoView({ behavior: "smooth", block: "start" });
          if (mm) setTimeout(function () { try { mm.focus(); } catch (e) {} }, 380);
          track("homepage_rail_focus_form");
        };
      }
    }

    // share block: only meaningful once there's an animal
    var shareBlock = $("#rail-share"); if (shareBlock) shareBlock.hidden = !named;
    if (named) wireShare();

    // moon card
    renderMoon();
  }

  /* ---------- share row ---------- */
  function wireShare() {
    var txt = shareText(), url = "https://www.zodianimal.com/";
    var sms = $('[data-share="sms"]'); if (sms) sms.href = "sms:&body=" + encodeURIComponent(txt);
    var email = $('[data-share="email"]'); if (email) email.href = "mailto:?subject=" + encodeURIComponent("My Zodi Animal") + "&body=" + encodeURIComponent(txt);
    var x = $('[data-share="x"]'); if (x) x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(txt);
    var copy = $('[data-share="copy"]');
    if (copy && !copy._wired) {
      copy._wired = true;
      copy.addEventListener("click", function () {
        track("homepage_compatibility_opened", { via: "rail_share_copy" });
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () {
          var lbl = copy.querySelector(".lbl"); if (lbl) { var o = lbl.textContent; lbl.textContent = "Copied"; setTimeout(function () { lbl.textContent = o; }, 1800); }
        }).catch(function () {});
      });
    }
  }

  /* ---------- moon card ---------- */
  function renderMoon() {
    var box = $("#moon-rail"); if (!box) return;
    var SYN = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14);
    var age = ((Date.now() - ref) / 86400000) % SYN; if (age < 0) age += SYN;
    var f = age / SYN;
    var T = [[0.03, "New Moon", "opening and planting a private intention"],
      [0.22, "Waxing Crescent", "gathering what you need and saying one yes"],
      [0.28, "First Quarter", "acting through the first resistance"],
      [0.47, "Waxing Gibbous", "refining and staying the course"],
      [0.53, "Full Moon", "being seen, then releasing what is finished"],
      [0.72, "Waning Gibbous", "sharing, teaching, giving thanks"],
      [0.78, "Last Quarter", "cutting a loss and forgiving"],
      [0.97, "Waning Crescent", "resting without guilt"],
      [1.01, "New Moon", "opening and planting a private intention"]];
    var glyphs = ["●","◐","◑","◑","○","◒","◓","◐"];
    var name = "New Moon", advice = T[0][2];
    for (var i = 0; i < T.length; i++) { if (f <= T[i][0]) { name = T[i][1]; advice = T[i][2]; break; } }
    var g = $(".moon-rail-glyph", box); if (g) g.textContent = "☽";
    var l = $(".moon-rail-label", box); if (l) l.textContent = name;
    var m = $(".moon-rail-meaning", box); if (m) m.textContent = "Good for " + advice + ".";
    box.hidden = false;
  }

  /* ---------- reset (two-step) ---------- */
  function wireReset() {
    var btn = $("#identity-reset"), confirm = $(".identity-reset-confirm"),
        yes = $("#identity-reset-yes"), no = $("#identity-reset-no");
    if (btn && confirm) btn.addEventListener("click", function () { confirm.hidden = false; btn.hidden = true; });
    if (no && confirm && btn) no.addEventListener("click", function () { confirm.hidden = true; btn.hidden = false; });
    if (yes) yes.addEventListener("click", function () {
      try { var ks = [], i; for (i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(NS) === 0) ks.push(k); } ks.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
      track("homepage_recast_started", { via: "rail" });
      location.reload();
    });
  }

  /* ---------- reveal subscription (no engine here) ---------- */
  function onRevealMaybe() {
    var p = loadProfile();
    if (p) {
      PROFILE = p;
      var plate = $("#roCard"); if (plate) plate.classList.remove("is-dormant");
      render();
      // the third eye opens fully + bursts when the animal is named
      var eye = $("#rvEye");
      if (eye) {
        eye.style.setProperty("--ap", "1");
        var card = eye.closest ? eye.closest(".v4-reveal") : null;
        if (card) { card.classList.add("rv-burst"); setTimeout(function () { card.classList.remove("rv-burst"); }, 850); }
      }
    }
  }

  /* ---------- third eye opens as the birth date is typed ---------- */
  function revealEye() {
    var eye = $("#rvEye"); if (!eye) return;
    var mm = $("#mm"), dd = $("#dd"), yy = $("#yy");
    function upd() {
      var n = (mm ? mm.value.length : 0) + (dd ? dd.value.length : 0) + (yy ? yy.value.length : 0);
      var ap = Math.min(1, n / 8);
      eye.style.setProperty("--ap", ap.toFixed(2));
      eye.setAttribute("aria-label", ap >= 1 ? "The eye of awakening — open" : (ap > 0 ? "The eye of awakening — opening" : "The eye of awakening — closed"));
    }
    [mm, dd, yy].forEach(function (el) { if (el) el.addEventListener("input", upd); });
    upd();
  }

  /* ---------- 24 solar terms ring (二十四节气), today's term lit ---------- */
  function solarTermsRing() {
    var dial = $(".dial"); if (!dial || document.getElementById("v4-solar-terms")) return;
    var TERMS = ["立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至","小寒","大寒"];
    var STARTS = [[2,4],[2,19],[3,6],[3,21],[4,5],[4,20],[5,6],[5,21],[6,6],[6,21],[7,7],[7,23],[8,8],[8,23],[9,8],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,21],[1,6],[1,20]];
    var d = new Date(), key = (d.getMonth() + 1) * 100 + d.getDate(), cur = 23, i;
    for (i = 0; i < STARTS.length; i++) { if (key >= STARTS[i][0] * 100 + STARTS[i][1]) cur = i; }
    if (d.getMonth() + 1 === 1 && key < 106) cur = 21;
    var SVGNS = "http://www.w3.org/2000/svg";
    var g = document.createElementNS(SVGNS, "g"); g.setAttribute("id", "v4-solar-terms"); g.setAttribute("aria-hidden", "true");
    var R = 254;
    for (i = 0; i < 24; i++) {
      var a = (-90 + i * 15) * Math.PI / 180, x = 270 + R * Math.cos(a), y = 270 + R * Math.sin(a);
      var t = document.createElementNS(SVGNS, "text");
      t.setAttribute("x", x.toFixed(1)); t.setAttribute("y", (y + 3).toFixed(1));
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("class", "v4-term" + (i === cur ? " is-now" : ""));
      t.textContent = TERMS[i];
      g.appendChild(t);
    }
    var ticks = document.getElementById("ticks");
    if (ticks && ticks.parentNode) ticks.parentNode.insertBefore(g, ticks); else dial.appendChild(g);
  }

  function init() {
    if (!PROFILE) { var plate = $("#roCard"); if (plate) plate.classList.add("is-dormant"); }
    solarTermsRing();
    revealEye();
    render();
    wireReset();

    var form = $("#sightForm");
    if (form) form.addEventListener("submit", function () { setTimeout(onRevealMaybe, 0); });
    ["#mm", "#dd", "#yy"].forEach(function (sel) {
      var el = $(sel); if (el) el.addEventListener("input", function () { var plate = $("#roCard"); if (plate) plate.classList.remove("is-dormant"); }, { once: true });
    });
    // any dial turn (a seal click, or a drag — which clicks the seals) wakes the plate
    document.addEventListener("click", function (e) {
      if (e.target && e.target.closest && e.target.closest(".turnbtn")) { var p = $("#roCard"); if (p) p.classList.remove("is-dormant"); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
