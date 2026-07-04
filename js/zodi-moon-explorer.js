/* ============================================================
   ZODI MOON EXPLORER — "Eight Phase Explorer" widget.
   A large shaded moon sphere beside eight selectable phase
   glyphs. Loads showing TONIGHT's real phase (synodic calc),
   and lets the visitor walk the whole cycle; each phase names
   what it favors and links to its page. Interacting with it is
   the moon rite: +80 Zodi Karma when the karma layer is loaded.

   Mounts into every element with [data-zodi-moon-explorer].
   No dependencies; uses ZodiKarma softly if present.
   ============================================================ */
(function () {
  "use strict";

  var SYNODIC = 29.530588853;
  var EPOCH = Date.UTC(2000, 0, 6, 18, 14); /* known new moon */

  var PHASES = [
    { name: "New Moon",        slug: "new-moon",        favors: "Dark phases favor intention, rest, and the first quiet yes." },
    { name: "Waxing Crescent", slug: "waxing-crescent", favors: "Building phases favor initiation, planting, and stated intent." },
    { name: "First Quarter",   slug: "first-quarter",   favors: "The half-light favors decisions, friction met head-on, and follow-through." },
    { name: "Waxing Gibbous",  slug: "waxing-gibbous",  favors: "Refining phases favor editing, tuning, and holding the course." },
    { name: "Full Moon",       slug: "full-moon",       favors: "The full light favors peaks, gratitude, charging your stones, and release." },
    { name: "Waning Gibbous",  slug: "waning-gibbous",  favors: "Releasing phases favor sorting, sharing out, and quiet decisions." },
    { name: "Last Quarter",    slug: "last-quarter",    favors: "The waning half favors endings done kindly and debts settled." },
    { name: "Waning Crescent", slug: "waning-crescent", favors: "The thinning light favors rest, forgiveness, and emptying the cup." }
  ];

  function tonight() {
    var days = (Date.now() - EPOCH) / 86400000;
    var frac = ((days % SYNODIC) + SYNODIC) % SYNODIC / SYNODIC; /* 0..1 through the cycle */
    var illum = Math.round((1 - Math.cos(2 * Math.PI * frac)) / 2 * 100);
    var idx = Math.round(frac * 8) % 8;
    return { idx: idx, illum: illum };
  }

  /* representative illumination per phase for the readout when browsing */
  var REP = [0, 22, 50, 78, 100, 78, 50, 22];

  /* small phase glyph (SVG disc) for the selector row */
  function glyph(i) {
    var light = "var(--silver-bright, #dfe3f0)", dark = "oklch(0.13 0.02 275)";
    var c = '<circle cx="12" cy="12" r="9" fill="' + dark + '"/>';
    var shapes = [
      "", /* new */
      '<path d="M12 3 A9 9 0 0 1 12 21 A6.3 9 0 0 0 12 3 Z"/>',
      '<path d="M12 3 A9 9 0 0 1 12 21 Z"/>',
      '<path d="M12 3 A9 9 0 0 1 12 21 A6.3 9 0 0 1 12 3 Z"/>',
      '<circle cx="12" cy="12" r="9"/>',
      '<path d="M12 3 A9 9 0 0 0 12 21 A6.3 9 0 0 0 12 3 Z"/>',
      '<path d="M12 3 A9 9 0 0 0 12 21 Z"/>',
      '<path d="M12 3 A9 9 0 0 0 12 21 A6.3 9 0 0 1 12 3 Z"/>'
    ];
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + c +
      (shapes[i] ? '<g fill="' + light + '">' + shapes[i] + "</g>" : "") +
      '<circle cx="12" cy="12" r="9" fill="none" stroke="oklch(0.8 0.02 275 / .35)" stroke-width=".8"/></svg>';
  }

  function mount(host) {
    var t = tonight();
    var html =
      '<div class="zme">' +
      '<div class="zme-stage"><div class="zme-sphere" data-phase="' + t.idx + '"><i class="zme-shadow"></i></div></div>' +
      '<div class="zme-panel">' +
      '<div class="zme-head"><p class="zme-kicker">Eight Phase Explorer</p><span class="zme-illum">Illumination <b>' + t.illum + '%</b></span></div>' +
      '<div class="zme-row" role="tablist" aria-label="Choose a moon phase">' +
      PHASES.map(function (p, i) {
        return '<button class="zme-dot" role="tab" aria-selected="' + (i === t.idx) + '" data-i="' + i + '" title="' + p.name + '" aria-label="' + p.name + '">' + glyph(i) + "</button>";
      }).join("") +
      "</div>" +
      '<p class="zme-name"></p>' +
      '<p class="zme-favors"></p>' +
      '<p class="zme-links"><a class="zme-open" href="#">Read this phase &rarr;</a>' +
      '<button class="zme-tonight" type="button" hidden>Back to tonight’s moon</button></p>' +
      "</div></div>";
    host.innerHTML = html;

    var sphere = host.querySelector(".zme-sphere");
    var dots = [].slice.call(host.querySelectorAll(".zme-dot"));
    var nameEl = host.querySelector(".zme-name");
    var favEl = host.querySelector(".zme-favors");
    var illumEl = host.querySelector(".zme-illum b");
    var openEl = host.querySelector(".zme-open");
    var backBtn = host.querySelector(".zme-tonight");
    var touched = false;

    function show(i, isTonight) {
      var p = PHASES[i];
      sphere.setAttribute("data-phase", i);
      dots.forEach(function (d, j) { d.setAttribute("aria-selected", j === i ? "true" : "false"); });
      nameEl.textContent = p.name + (isTonight ? " · tonight" : "");
      favEl.textContent = p.favors;
      illumEl.textContent = (isTonight ? t.illum : REP[i]) + "%";
      openEl.setAttribute("href", "/moon/phases/" + p.slug + "/");
      backBtn.hidden = !!isTonight;
    }
    show(t.idx, true);

    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        var i = parseInt(d.getAttribute("data-i"), 10);
        show(i, i === t.idx);
        if (!touched) {
          touched = true;
          if (window.ZodiKarma) window.ZodiKarma.award("moon_check");
        }
      });
    });
    backBtn.addEventListener("click", function () { show(t.idx, true); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var hosts = document.querySelectorAll("[data-zodi-moon-explorer]");
    for (var i = 0; i < hosts.length; i++) mount(hosts[i]);
  });
})();
