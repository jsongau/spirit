/* ============================================================
   ZODI AWAKEN — "The Path of Awakening", a site-wide module.

   The third eye is the instrument: a nazar-ringed eye whose
   lids OPEN to the exact degree the visitor has awakened
   (Sleeper 0 → Awakened 100). Collapsing the card closes the
   eye, slowly; opening it lets the lids part to the earned
   aperture, then a soft beam walks the rites not yet done.

   Mounts into #zodi-awaken-slot (rail: starts open) or floats
   bottom-left (starts closed). data-zodi-no-awaken on <body>
   opts a page out.

   Reads (never writes): localStorage primal_oracle_v1
   { birth, rites:{...} }; window.ENGINE for the animal name;
   window.Zodi / window.ZodiKarma for the karma line.
   ============================================================ */
(function () {
  "use strict";

  if (document.body && document.body.hasAttribute("data-zodi-no-awaken")) return;

  var REDUCE = false;
  try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  /* ---------- state ---------- */
  function oracle() {
    try { return JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}") || {}; }
    catch (e) { return {}; }
  }
  function rites(o) {
    var r = (o && o.rites) || {};
    return {
      revealed: !!r.revealed, read: !!r.read, stones: !!r.stones,
      match: !!r.match, shared: !!r.shared, returned: !!r.returned
    };
  }
  function animalOf(o) {
    if (!o || !o.birth || !window.ENGINE) return null;
    try { var c = window.ENGINE.compute(o.birth); return c && c.primal ? c : null; }
    catch (e) { return null; }
  }
  function slugify(n) {
    return String(n).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  /* ---------- the six rites ---------- */
  var READER = /index-v2\.html/.test(location.pathname) ? "index-v2.html#read" : "index.html#read";
  var RITES = [
    { id: "revealed", label: "Name your animal",           zk: "+500", href: READER },
    { id: "read",     label: "Read your five gates",       zk: "",     href: "menagerie.html", gates: true },
    { id: "stones",   label: "Receive your keeper stones", zk: "",     href: "stones.html" },
    { id: "match",    label: "Test a bond",                zk: "+120", href: "match.html" },
    { id: "shared",   label: "Pass the Oracle onward",     zk: "+150", href: "vs.html" },
    { id: "returned", label: "Return on a new day",        zk: "+100", href: "moon.html" }
  ];
  var WEIGHT = { revealed: 30, read: 25, stones: 10, match: 15, shared: 10, returned: 10 };

  var TIERS = [
    { min: 85, name: "Awakened", whisper: "is awake in you. Wear it lightly." },
    { min: 55, name: "Waking",   whisper: "is waking. The last veils are thin." },
    { min: 26, name: "Stirring", whisper: "stirs in you. It knows the way onward." },
    { min: 0,  name: "Sleeper",  whisper: "is still a rumor. One date names it." }
  ];
  function tierFor(pct) {
    for (var i = 0; i < TIERS.length; i++) if (pct >= TIERS[i].min) return TIERS[i];
    return TIERS[TIERS.length - 1];
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- the living eye (inline SVG, lids animate) ---------- */
  var LID_TRAVEL = 27; /* px each lid travels to close the almond */
  function eyeSVG() {
    return '' +
    '<svg class="zaw-eye3" viewBox="0 0 120 84" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="zeiC" cx="50%" cy="42%" r="60%">' +
          '<stop offset="0%" stop-color="#2b4bd8"/><stop offset="72%" stop-color="#122a86"/><stop offset="100%" stop-color="#0a1750"/>' +
        '</radialGradient>' +
        '<radialGradient id="zeiI" cx="45%" cy="40%" r="65%">' +
          '<stop offset="0%" stop-color="#b79bf0"/><stop offset="55%" stop-color="#7a55c8"/><stop offset="100%" stop-color="#3d2a78"/>' +
        '</radialGradient>' +
        '<linearGradient id="zeiL" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#efe2b4"/><stop offset="100%" stop-color="#b99c5e"/>' +
        '</linearGradient>' +
        '<clipPath id="zeiClip"><path d="M8 48 C28 20, 92 20, 112 48 C92 76, 28 76, 8 48 Z"/></clipPath>' +
      '</defs>' +
      '<g stroke="url(#zeiL)" stroke-width="1.6" stroke-linecap="round" opacity=".85" class="zaw-rays">' +
        '<line x1="60" y1="10" x2="60" y2="2"/><line x1="41" y1="14" x2="37" y2="7"/>' +
        '<line x1="79" y1="14" x2="83" y2="7"/><line x1="25" y1="24" x2="18" y2="19"/>' +
        '<line x1="95" y1="24" x2="102" y2="19"/>' +
      '</g>' +
      '<g clip-path="url(#zeiClip)">' +
        '<rect x="0" y="18" width="120" height="60" fill="oklch(0.13 0.02 275)"/>' +
        '<g class="zaw-iris">' +
        '<circle cx="60" cy="48" r="22" fill="url(#zeiC)"/>' +
        '<circle cx="60" cy="48" r="15.5" fill="#eef2f7"/>' +
        '<circle cx="60" cy="48" r="11" fill="#57c8d8"/>' +
        '<circle cx="60" cy="48" r="7.4" fill="url(#zeiI)"/>' +
        '<circle cx="60" cy="48" r="3.4" fill="#0a0c18"/>' +
        '<path d="M63.5 42.2 l1 2.3 2.3 1 -2.3 1 -1 2.3 -1-2.3 -2.3-1 2.3-1 Z" fill="#efe2b4"/>' +
        '<ellipse cx="54.5" cy="42.5" rx="3.4" ry="2.1" fill="#ffffff" opacity=".55"/>' +
        '</g>' +
        /* the lids: card-ink shapes that meet at the centerline when closed */
        '<g class="zaw-lid zaw-lid-top">' +
          '<path d="M8 48 C28 20, 92 20, 112 48 L120 48 L120 -10 L0 -10 L0 48 Z" fill="oklch(0.17 0.03 274)"/>' +
          '<path d="M30 44 C46 38.5, 74 38.5, 90 44" fill="none" stroke="url(#zeiL)" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>' +
          '<path class="zaw-lashline" d="M14 48 C36 38.5, 84 38.5, 106 48" fill="none" stroke="url(#zeiL)" stroke-width="2.6" stroke-linecap="round"/>' +
          '<g class="zaw-lashes" stroke="url(#zeiL)" stroke-width="1.2" stroke-linecap="round" opacity=".62">' +
            '<line x1="37" y1="48" x2="34" y2="53.4"/><line x1="49" y1="48.6" x2="47" y2="54"/>' +
            '<line x1="71" y1="48.6" x2="73" y2="54"/><line x1="83" y1="48" x2="86" y2="53.4"/>' +
          '</g>' +
        '</g>' +
        '<path class="zaw-lid zaw-lid-bot" d="M8 48 C28 76, 92 76, 112 48 L120 48 L120 94 L0 94 L0 48 Z" fill="oklch(0.17 0.03 274)"/>' +
      '</g>' +
      '<path d="M8 48 C28 20, 92 20, 112 48 C92 76, 28 76, 8 48 Z" fill="none" stroke="url(#zeiL)" stroke-width="2.4"/>' +
    '</svg>';
  }

  function eyeClosedSVG() { return '<svg class="zaw-eye3 zaw-eye-closed" viewBox="0 0 120 84" aria-hidden="true"><defs><linearGradient id="zec-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#efe2b4"/><stop offset="100%" stop-color="#b99c5e"/></linearGradient><filter id="zec-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g stroke="url(#zec-lid)" stroke-width="1.6" stroke-linecap="round" opacity=".85"><line x1="60" y1="10" x2="60" y2="2"/><line x1="41" y1="14" x2="37" y2="7"/><line x1="79" y1="14" x2="83" y2="7"/><line x1="25" y1="24" x2="18" y2="19"/><line x1="95" y1="24" x2="102" y2="19"/></g><path d="M8 48 C28 20, 92 20, 112 48 C92 74, 28 74, 8 48 Z" fill="oklch(0.16 0.03 275)" stroke="url(#zec-lid)" stroke-width="2.4" filter="url(#zec-glow)"/><path d="M30 44 C46 38.5, 74 38.5, 90 44" fill="none" stroke="url(#zec-lid)" stroke-width="1.3" stroke-linecap="round" opacity=".3"/><path d="M14 50 C36 40.5, 84 40.5, 106 50" fill="none" stroke="url(#zec-lid)" stroke-width="2.8" stroke-linecap="round" filter="url(#zec-glow)"/><g stroke="url(#zec-lid)" stroke-width="1.3" stroke-linecap="round" opacity=".6"><line x1="37" y1="50.4" x2="34" y2="55.6"/><line x1="49" y1="51.1" x2="47" y2="56.4"/><line x1="71" y1="51.1" x2="73" y2="56.4"/><line x1="83" y1="50.4" x2="86" y2="55.6"/></g></svg>'; }

  /* aperture: 0 = shut, 1 = lids fully parted */
  function setAperture(card, frac) {
    var top = card.querySelector(".zaw-lid-top");
    var bot = card.querySelector(".zaw-lid-bot");
    if (!top || !bot) return;
    var f = Math.max(0, Math.min(1, frac));
    /* closed = lids pushed to the centerline (travel inward) */
    top.style.transform = "translateY(" + (-f * LID_TRAVEL).toFixed(1) + "px)";
    bot.style.transform = "translateY(" + (f * LID_TRAVEL).toFixed(1) + "px)";
  }

  /* ---------- render ---------- */
  function render(host, floating, startOpen) {
    var o = oracle(), r = rites(o), c = animalOf(o);
    var pct = 0; for (var k in WEIGHT) if (r[k]) pct += WEIGHT[k];
    var t = tierFor(pct);
    var allDone = RITES.every(function (it) { return r[it.id]; });
    var name = c ? c.primal : null;
    var slug = name ? slugify(name) : null;

    if (slug) {
      var gates = document.querySelectorAll("[data-zodi-gates]");
      for (var gi = 0; gi < gates.length; gi++) {
        if (gates[gi].tagName === "A") gates[gi].setAttribute("href", "animals/" + slug + "/");
      }
    }

    var head = name
      ? '<p class="zaw-whisper"><em>The ' + esc(name) + '</em> ' + t.whisper + '</p>'
      : '<p class="zaw-whisper">An animal is waiting for its name. ' + t.whisper.replace("is still a rumor. ", "") + '</p>';

    var items = "", nextFound = false;
    for (var i = 0; i < RITES.length; i++) {
      var it = RITES[i], done = r[it.id];
      var href = it.href;
      if (it.gates && slug) href = "animals/" + slug + "/";
      var isNext = !done && !nextFound; if (isNext) nextFound = true;
      items += '<li class="' + (done ? "done" : isNext ? "next" : "") + '">' +
        '<a href="' + href + '">' +
        '<span class="zaw-mark" aria-hidden="true">' + (done ? "&#10022;" : "&#9675;") + "</span>" +
        '<span class="zaw-lbl">' + it.label + "</span>" +
        (it.zk && !done ? '<span class="zaw-zk">' + it.zk + ' ZK</span>' : "") +
        (isNext ? '<span class="zaw-go" aria-hidden="true">&rarr;</span>' : "") +
        "</a></li>";
    }

    host.innerHTML =
      '<div class="zaw-card' + (floating ? " zaw-float" : "") + '" data-tier="' + t.name.toLowerCase() + '">' +
      '<button class="zaw-head" type="button" aria-expanded="false">' +
        eyeSVG() +
        '<span class="zaw-head-txt"><span class="zaw-head-kicker">The Path of Awakening</span>' +
        '<span class="zaw-head-tier">' + t.name + ' <b>&middot; ' + pct + '%</b></span></span>' +
        '<span class="zaw-chev" aria-hidden="true"></span>' +
      "</button>" +
      '<div class="zaw-bodywrap"><div class="zaw-body">' +
        head +
        '<ul class="zaw-rites">' + items + "</ul>" +
        '<p class="zaw-streak">Return streak: <b id="zaw-streak-n">' + (o.streak || 1) + (o.streak === 1 || !o.streak ? " day" : " days") + "</b></p>" +
        '<p class="zaw-karma" id="zaw-karma"><a href="karmic-board.html">The Karmic Board awaits &rarr;</a></p>' +
      "</div></div></div>";

    var card = host.querySelector(".zaw-card");
    var headBtn = host.querySelector(".zaw-head");
    var aperture = pct / 100;

    function setOpen(open, instant) {
      card.classList.toggle("open", open);
      headBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        /* lids part, slowly, to the EARNED aperture */
        setAperture(card, instant ? aperture : 0);
        if (!instant) requestAnimationFrame(function () {
          requestAnimationFrame(function () { setAperture(card, aperture); });
        });
      } else {
        setAperture(card, 0); /* the eye closes with the card */
      }
    }

    headBtn.addEventListener("click", function () {
      setOpen(!card.classList.contains("open"));
    });

    var wantOpen = (startOpen === "auto") ? allDone : !!startOpen;
    setOpen(wantOpen, true);

    /* karma line, softly */
    (function karmaLine() {
      var el = host.querySelector("#zaw-karma");
      if (!el || !window.Zodi) return;
      window.Zodi.onAuth(function (session, profile) {
        if (session && profile) {
          el.innerHTML = Number(profile.zodi_karma).toLocaleString("en-US") +
            ' ZK banked &middot; <a href="karmic-board.html">your place on the board &rarr;</a>';
          var sn = host.querySelector("#zaw-streak-n");
          if (sn && profile.streak_days) sn.textContent = profile.streak_days + (profile.streak_days === 1 ? " day" : " days");
        } else if (window.ZodiKarma && window.ZodiKarma.wandering() > 0) {
          el.innerHTML = window.ZodiKarma.wandering().toLocaleString("en-US") +
            ' ZK unclaimed &middot; <a href="' + ((document.body.getAttribute("data-zodi-account")) || "account.html") + '">bank it &rarr;</a>';
        }
      });
    })();
  }

  document.addEventListener("DOMContentLoaded", function () {
    (function eyeCss(){ if (document.getElementById("zaw-eye-css")) return; var st=document.createElement("style"); st.id="zaw-eye-css"; st.textContent=".zaw-rays{transition:opacity .9s ease,transform .9s ease;transform-box:fill-box;transform-origin:center}.zaw-card:not(.open) .zaw-rays{opacity:.28;transform:scale(.8)}.zaw-card.open .zaw-rays{opacity:.95}.zaw-lashes,.zaw-lashline{transition:opacity .8s ease}.zaw-card.open .zaw-lashes{opacity:.16}.zaw-card.open .zaw-lashline{opacity:.4}.zaw-iris{transition:transform 1.2s cubic-bezier(.5,.05,.2,1),opacity 1s ease;transform-box:fill-box;transform-origin:center}.zaw-card:not(.open) .zaw-iris{transform:scale(.7);opacity:.4}"; document.head.appendChild(st); })();
    var slot = document.getElementById("zodi-awaken-slot");
    var floating = false;
    if (!slot) {
      floating = true;
      slot = document.createElement("div");
      slot.id = "zodi-awaken-slot";
      document.body.appendChild(slot);
    }
    render(slot, floating, floating ? "auto" : true); /* floating starts minimized unless every rite is done */

    /* the float never sits ON the footer: it glides up to rest above it */
    if (floating) {
      var foot = document.querySelector("footer.v2-foot");
      if (foot) {
        var raf = null;
        var dodge = function () {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            raf = null;
            var card = slot.querySelector(".zaw-card");
            if (!card) return;
            var r = foot.getBoundingClientRect();
            var overlap = window.innerHeight - r.top;
            card.style.bottom = (overlap > 0 ? overlap + 14 : 18) + "px";
          });
        };
        window.addEventListener("scroll", dodge, { passive: true });
        window.addEventListener("resize", dodge);
        dodge();
      }
    }

    var last = "";
    try { last = localStorage.getItem("primal_oracle_v1") || ""; } catch (e) {}
    setInterval(function () {
      try {
        var now = localStorage.getItem("primal_oracle_v1") || "";
        if (now !== last) {
          last = now;
          var wasOpen = !!slot.querySelector(".zaw-card.open");
          render(slot, floating, wasOpen ? true : "auto");
        }
      } catch (e) {}
    }, 2500);
  });
})();
