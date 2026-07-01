/* The Primal Oracle: Third Eye awakening meter for the nav bar.
   Contract: PNAV.features.progress(ctx)
   - ctx.tools: right-side slot. Insert the chip BEFORE ctx.explore.
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

  function injectStyle() {
    try {
      if (document.getElementById("pnp-style")) return;
      var css =
        ".pnp-ring{display:inline-block;vertical-align:middle;line-height:0}" +
        ".pnp-ring svg{display:block;transform:rotate(-90deg)}" +
        ".pnp-track{stroke:rgba(140,120,170,0.30)}" +
        ".pnp-fill{stroke:#b08d57;transition:stroke-dasharray .4s ease}" +
        ".pn-chip[data-pnp] .lbl{margin-left:6px;font-size:12px;font-weight:600;letter-spacing:.02em;color:#7c5cbf}";
      var style = document.createElement("style");
      style.id = "pnp-style";
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      (document.head || document.documentElement).appendChild(style);
    } catch (e) {
      /* never throw */
    }
  }

  function buildRing(openness) {
    // ~20px ring. radius chosen so circumference is friendly.
    var size = 20;
    var stroke = 3;
    var r = (size - stroke) / 2; // 8.5
    var c = 2 * Math.PI * r; // circumference
    var dash = (Math.max(0, Math.min(100, openness)) / 100) * c;
    var cx = size / 2;

    var svgns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);

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

    var wrap = document.createElement("span");
    wrap.className = "pnp-ring";
    wrap.appendChild(svg);
    return wrap;
  }

  PNAV.features.progress = function (ctx) {
    try {
      if (!ctx || !ctx.tools) return;

      injectStyle();

      var openness = readOpenness();
      var level = levelFor(openness);

      var chip = document.createElement("a");
      chip.className = "pn-chip";
      chip.setAttribute("href", "awakening.html");
      chip.setAttribute("data-pnp", "1");
      chip.title = "Awakening: " + level + " (" + openness + "%)";

      chip.appendChild(buildRing(openness));

      var lbl = document.createElement("span");
      lbl.className = "lbl";
      lbl.textContent = openness + "%";
      chip.appendChild(lbl);

      if (ctx.explore && ctx.explore.parentNode === ctx.tools) {
        ctx.tools.insertBefore(chip, ctx.explore);
      } else {
        ctx.tools.appendChild(chip);
      }
    } catch (e) {
      /* never throw */
    }
  };
})();
