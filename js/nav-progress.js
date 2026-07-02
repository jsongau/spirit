/* The Primal Oracle: Third Eye awakening ring for the nav bar.
   Contract: PNAV.features.progress(ctx)
   - The build (apply-nav.mjs) pre-renders an empty, hidden slot
     <a class="pn-ring" data-ring-slot href="/awakening.html" hidden>
     in .pn-tools, between the moon chip and the theme toggle. This
     feature FILLS that slot: a small SVG ring with the openness %
     centered inside it (grid stack in nav-core.css, no absolute
     positioning). Nothing is ever blind-inserted into the bar.
   - The tooltip (title/aria-label) explains the number. Clicking
     opens the page's Third Eye HUD (.eyeHud) when one is present
     and visible; otherwise the anchor navigates to /awakening.html.
   - All colors come from nav-core.css tokens (no injected styles).
   Defensive throughout: this module never throws. */
(function () {
  "use strict";

  var PNAV = (window.PNAV = window.PNAV || {});
  PNAV.features = PNAV.features || {};

  // Rite point values (exact, binding).
  var RITES = {
    revealed: 20,
    read: 20,
    stones: 15,
    match: 20,
    shared: 15,
    returned: 10
  };

  // Level thresholds (sentence case names).
  var LEVELS = [
    { at: 100, name: "All-Seeing" },
    { at: 75, name: "Awakened" },
    { at: 50, name: "Seeing" },
    { at: 25, name: "Stirring" },
    { at: 0, name: "Sleeper" }
  ];

  function readOpenness() {
    try {
      var raw = window.localStorage.getItem("primal_oracle_v1");
      if (!raw) return 0;
      var data = JSON.parse(raw);
      if (!data || typeof data !== "object") return 0;
      var rites = data.rites;
      if (!rites || typeof rites !== "object") return 0;
      var sum = 0;
      for (var key in RITES) {
        if (Object.prototype.hasOwnProperty.call(RITES, key) && rites[key] === true) {
          sum += RITES[key];
        }
      }
      if (sum > 100) sum = 100;
      if (sum < 0) sum = 0;
      return sum;
    } catch (e) {
      return 0;
    }
  }

  function levelFor(openness) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (openness >= LEVELS[i].at) return LEVELS[i].name;
    }
    return "Sleeper";
  }

  function buildRing(openness) {
    // 34px ring inside the 38px slot; stroke and colors from CSS
    // (.pnp-track / .pnp-fill in nav-core.css, tokens only).
    var size = 34;
    var stroke = 3;
    var r = (size - stroke) / 2;
    var c = 2 * Math.PI * r;
    var dash = (Math.max(0, Math.min(100, openness)) / 100) * c;
    var cx = size / 2;

    var svgns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    var track = document.createElementNS(svgns, "circle");
    track.setAttribute("class", "pnp-track");
    track.setAttribute("cx", String(cx));
    track.setAttribute("cy", String(cx));
    track.setAttribute("r", String(r));
    track.setAttribute("fill", "none");
    track.setAttribute("stroke-width", String(stroke));

    var fill = document.createElementNS(svgns, "circle");
    fill.setAttribute("class", "pnp-fill");
    fill.setAttribute("cx", String(cx));
    fill.setAttribute("cy", String(cx));
    fill.setAttribute("r", String(r));
    fill.setAttribute("fill", "none");
    fill.setAttribute("stroke-width", String(stroke));
    fill.setAttribute("stroke-linecap", "round");
    fill.setAttribute("stroke-dasharray", dash + " " + c);

    svg.appendChild(track);
    svg.appendChild(fill);
    return svg;
  }

  function hudVisible(hud) {
    if (!hud) return false;
    try {
      return !!(hud.offsetWidth || hud.offsetHeight || hud.getClientRects().length);
    } catch (e) {
      return false;
    }
  }

  PNAV.features.progress = function (ctx) {
    try {
      if (!ctx || !ctx.tools) return;

      var scope = ctx.bar || document;
      var slot = scope.querySelector("[data-ring-slot]");
      if (!slot) return; /* no pre-rendered slot: nothing to hydrate */

      var openness = readOpenness();
      var level = levelFor(openness);

      slot.textContent = "";
      slot.appendChild(buildRing(openness));

      var pct = document.createElement("span");
      pct.className = "pn-ring-pct";
      pct.setAttribute("aria-hidden", "true");
      pct.textContent = openness + "%";
      slot.appendChild(pct);

      var line = "Awakening: " + level + ", " + openness +
        "% of the rites complete. The Third Eye opens as you finish them.";
      slot.title = line;
      slot.setAttribute("aria-label", line);

      slot.hidden = false;

      // Click: open the page's HUD when it exists and is visible;
      // otherwise the anchor follows its href to /awakening.html.
      slot.addEventListener("click", function (e) {
        try {
          var hud = document.querySelector(".eyeHud");
          if (!hudVisible(hud)) return; /* navigate */
          e.preventDefault();
          if (hud.classList.contains("is-collapsed")) hud.click();
          try { hud.focus(); } catch (err) {}
        } catch (err) {
          /* fall through to navigation */
        }
      });
    } catch (e) {
      /* never throw */
    }
  };
})();
