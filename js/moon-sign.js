/* ============================================================
   moon-sign.js — "The Moon in Your Sign Today"
   ------------------------------------------------------------
   Two things live here, both dependency-free and DOM-defensive:

     1. THE ASTRONOMY (window.MOONSIGN)
        A truncated Meeus series (Astronomical Algorithms, Ch. 47)
        that returns the Moon's apparent geocentric ecliptic
        longitude (tropical, mean equinox of date), accurate to
        about 0.1 to 0.3 degrees. That is well inside a 30-degree
        sign bin. The synodic PHASE (illumination, phase name) is
        NOT reinvented here: it reuses the exact reference epoch and
        cosine math that js/home-v4.js moonNow() and nav-data.js
        PNAV.DYN.moonInfo() already ship, so the readout matches the
        rest of the site to the last percent.

        Exported on window.MOONSIGN so build/ (Node) can bake the
        same current value into the server-rendered fallback:
            MOONSIGN.longitude(jde)  -> degrees
            MOONSIGN.signIndex(jde)  -> 0..11 (0 = Aries)
            MOONSIGN.signName(jde)   -> "Aquarius"
            MOONSIGN.phase(date)     -> { name, pct, illum, glyph, idx }
            MOONSIGN.now(date)       -> the full readout object

     2. THE WIDGET
        Progressive enhancement over a server-rendered fallback.
        The generator bakes today's answer sentence and the sun-sign
        picker into #msign-root; this script, when present, draws the
        silver Moon at its true illuminated fraction, refreshes the
        readout live, wires the picker, and personalizes the read by
        the element relationship between the Moon sign and the
        visitor's Sun sign. Reads (never writes) the site's own
        storage (primal_oracle_v1) so a known Sun sign auto-fills.

        Copy comes from window.MOON_SIGNS (data/moon-signs.json,
        inlined before this script). If that data is absent the
        widget still shows the correct Moon sign, phase, and moon
        art; only the prose read is withheld.

   Voice: meaning, not prediction. No promises. No em dashes, no
   exclamation marks. Motion is opacity plus transform only, guarded
   by prefers-reduced-motion. No network at runtime. No box-shadow
   loops, no filter blur on animating elements.
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     0. ASTRONOMY — Meeus Ch.47 (verified against Example 47.a)
     ============================================================ */
  var D2R = Math.PI / 180;
  var SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
               "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  var GLYPHS = { Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
                 Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
                 Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓" };
  var ELEMENT = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water"
  };

  function norm360(x) { x = x % 360; if (x < 0) x += 360; return x; }

  // Julian Day (Ephemeris) from a Date. delta-T is ignored on purpose:
  // at ~30 arcsec/hour a few seconds of TD offset is far below one bin.
  function toJDE(date) {
    return (date ? date.getTime() : Date.now()) / 86400000 + 2440587.5;
  }

  // Apparent geocentric ecliptic longitude of the Moon, degrees, of date.
  // Main periodic terms of Meeus table 47.A (the "sigma l" column / 1e6),
  // truncated to the terms that carry the first ~0.2 degrees.
  function longitude(jde) {
    var T = (jde - 2451545.0) / 36525;
    var T2 = T * T, T3 = T2 * T, T4 = T3 * T;

    var Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000;
    var D  = 297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000;
    var M  = 357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000;
    var Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000;
    var F  = 93.2720950  + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000;

    D = norm360(D) * D2R;
    M = norm360(M) * D2R;
    Mp = norm360(Mp) * D2R;
    F = norm360(F) * D2R;

    var s = 0;
    s += 6.288774 * Math.sin(Mp);
    s += 1.274027 * Math.sin(2 * D - Mp);
    s += 0.658314 * Math.sin(2 * D);
    s += 0.213618 * Math.sin(2 * Mp);
    s += -0.185116 * Math.sin(M);
    s += -0.114332 * Math.sin(2 * F);
    s += 0.058793 * Math.sin(2 * D - 2 * Mp);
    s += 0.057066 * Math.sin(2 * D - M - Mp);
    s += 0.053322 * Math.sin(2 * D + Mp);
    s += 0.045758 * Math.sin(2 * D - M);
    s += -0.040923 * Math.sin(M - Mp);
    s += -0.034720 * Math.sin(D);
    s += -0.030383 * Math.sin(M + Mp);
    s += 0.015327 * Math.sin(2 * D - 2 * F);
    s += -0.012528 * Math.sin(Mp + 2 * F);
    s += 0.010980 * Math.sin(Mp - 2 * F);
    s += 0.010675 * Math.sin(4 * D - Mp);
    s += 0.010034 * Math.sin(3 * Mp);
    // extra Meeus 47.A main terms, tightening toward ~0.1 degree
    s += 0.008548 * Math.sin(4 * D - M - Mp);
    s += -0.007888 * Math.sin(2 * D + M - Mp);
    s += -0.006766 * Math.sin(2 * D + M);
    s += -0.005163 * Math.sin(D - Mp);
    s += 0.004987 * Math.sin(D + M);
    s += 0.004036 * Math.sin(2 * D - M + Mp);
    s += 0.003994 * Math.sin(2 * D + 2 * Mp);
    s += 0.003861 * Math.sin(4 * D);
    s += 0.003665 * Math.sin(2 * D - 3 * Mp);

    return norm360(Lp + s);
  }

  function signIndex(jde) { return Math.floor(norm360(longitude(jde)) / 30); }
  function signName(jde) { return SIGNS[signIndex(jde)]; }
  function degreeInSign(jde) { return norm360(longitude(jde)) % 30; }

  /* ---- Synodic phase: the SAME math the rest of the site ships ----
     (home-v4.js moonNow / nav-data.js moonInfo: 2000-01-06 18:14 UTC
     reference new moon, 29.530588853-day synodic month, illumination
     from the phase-angle cosine). Do not reinvent; keep them equal. */
  var SYNODIC = 29.530588853;
  var PHASE_REF = Date.UTC(2000, 0, 6, 18, 14);
  var PHASE_NAMES = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
                     "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  var PHASE_GLYPHS = ["🌑", "🌒", "🌓", "🌔",
                      "🌕", "🌖", "🌗", "🌘"];

  function phase(date) {
    var t = date ? date.getTime() : Date.now();
    var days = (t - PHASE_REF) / 864e5;
    var frac = ((days % SYNODIC) + SYNODIC) % SYNODIC / SYNODIC; // 0 new .. 0.5 full
    var idx = Math.round(frac * 8) % 8;
    var illumFrac = (1 - Math.cos(frac * 2 * Math.PI)) / 2;      // 0..1 lit fraction
    return {
      frac: frac,
      idx: idx,
      name: PHASE_NAMES[idx],
      glyph: PHASE_GLYPHS[idx],
      illum: illumFrac,                     // 0..1
      pct: Math.round(illumFrac * 100),     // integer percent
      waxing: frac <= 0.5                    // true while the lit limb grows
    };
  }

  // The single readout object the widget and Node both consume.
  function now(date) {
    var jde = toJDE(date);
    var name = signName(jde);
    var ph = phase(date);
    return {
      sign: name,
      signIndex: SIGNS.indexOf(name),
      glyph: GLYPHS[name],
      element: ELEMENT[name],
      longitude: norm360(longitude(jde)),
      degreeInSign: degreeInSign(jde),
      phaseName: ph.name,
      phaseGlyph: ph.glyph,
      illum: ph.illum,
      pct: ph.pct,
      waxing: ph.waxing
    };
  }

  var MOONSIGN = {
    SIGNS: SIGNS, GLYPHS: GLYPHS, ELEMENT: ELEMENT,
    toJDE: toJDE, longitude: longitude, signIndex: signIndex, signName: signName,
    degreeInSign: degreeInSign, phase: phase, now: now
  };
  try { window.MOONSIGN = MOONSIGN; } catch (e) {}

  /* ============================================================
     1. WIDGET — progressive enhancement over the baked fallback
     ============================================================ */
  function $(sel, root) {
    try { return (root || document).querySelector(sel); } catch (e) { return null; }
  }
  function $all(sel, root) {
    try { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function on(el, ev, fn) { if (el && el.addEventListener) el.addEventListener(ev, fn); }
  function txt(el, s) { if (el) el.textContent = s; }

  var REDUCED = false;
  try { REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  try {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.addEventListener) mq.addEventListener("change", function (e) { REDUCED = e.matches; });
  } catch (e) {}

  var NS = "http://www.w3.org/2000/svg";
  function svg(name, attrs) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }

  var SIGN_SET = {}; // fast membership + canonical casing
  SIGNS.forEach(function (s) { SIGN_SET[s.toLowerCase()] = s; });

  function canonSign(raw) {
    if (!raw) return null;
    var k = String(raw).trim().toLowerCase();
    return SIGN_SET[k] || null;
  }

  // Sun sign read from the site's own storage. Read-only; two shapes:
  // a stored birth date (compute via ENGINE if available, else parse the
  // month/day directly), or a recent reveal carrying { sign }.
  function storedSunSign() {
    var o = null;
    try { o = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}"); } catch (e) { o = null; }
    if (!o) return null;
    // 1. an explicit recent reveal
    try {
      if (o.recent && o.recent.length && o.recent[0] && o.recent[0].sign) {
        var s0 = canonSign(o.recent[0].sign);
        if (s0) return s0;
      }
    } catch (e) {}
    // 2. a stored birth date -> sun sign
    if (typeof o.birth === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.birth)) {
      try {
        if (window.ENGINE && typeof window.ENGINE.compute === "function") {
          var c = window.ENGINE.compute(o.birth);
          if (c && c.sign) { var sc = canonSign(c.sign); if (sc) return sc; }
        }
      } catch (e) {}
      var mm = parseInt(o.birth.slice(5, 7), 10);
      var dd = parseInt(o.birth.slice(8, 10), 10);
      var s = sunSignByDate(mm, dd);
      if (s) return s;
    }
    return null;
  }

  // Self-contained Sun-sign-by-date (so the picker's memory does not
  // depend on ENGINE being loaded on this page). Standard tropical bands.
  function sunSignByDate(m, d) {
    var B = [
      [1, 20, "Capricorn"], [2, 19, "Aquarius"], [3, 21, "Pisces"], [4, 20, "Aries"],
      [5, 21, "Taurus"], [6, 21, "Gemini"], [7, 23, "Cancer"], [8, 23, "Leo"],
      [9, 23, "Virgo"], [10, 23, "Libra"], [11, 22, "Scorpio"], [12, 22, "Sagittarius"]
    ];
    // before the cutoff day of month m -> previous band's sign
    var names = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
                 "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
    if (!(m >= 1 && m <= 12) || !(d >= 1 && d <= 31)) return null;
    var cut = B[m - 1][1];
    return d < cut ? names[m - 1] : names[m];
  }

  // element relationship key between two signs -> a template in
  // MOON_SIGNS.relationships. Fire+Air / Earth+Water = complement.
  function relationKey(moonSign, sunSign) {
    if (moonSign === sunSign) return "same";
    var em = ELEMENT[moonSign], es = ELEMENT[sunSign];
    if (em === es) return "sameElement";
    var pair = [em, es].sort().join("+");
    if (pair === "Air+Fire" || pair === "Earth+Water") return "complement";
    return "tense";
  }

  function fill(tpl, map) {
    if (!tpl) return "";
    return String(tpl).replace(/\{(\w+)\}/g, function (whole, key) {
      return (map && map[key] != null) ? map[key] : whole;
    });
  }

  function moonData() {
    try {
      if (window.MOON_SIGNS && window.MOON_SIGNS.signs) return window.MOON_SIGNS;
    } catch (e) {}
    return null;
  }

  /* ---- The silver Moon disc, drawn at its true illuminated fraction.
     Two arcs bound the lit region: the outer limb (always a semicircle
     on the lit side) and the terminator (a half-ellipse whose x-radius
     tracks the phase). One path, filled with the lit gradient; the dark
     face is the disc beneath. No animation lives in the geometry; the
     calm breath is a CSS opacity loop on a static bloom layer. ---- */
  function drawMoon(mount, readout) {
    if (!mount) return;
    var illum = Math.max(0, Math.min(1, readout.illum));
    var waxing = readout.waxing;
    var R = 90, cx = 100, cy = 100;

    // clear
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    var root = svg("svg", {
      viewBox: "0 0 200 200", width: "100%", height: "100%",
      role: "img", "class": "msign-moon-svg",
      "aria-label": "The Moon tonight, " + readout.pct + " percent lit, " + readout.phaseName
    });

    var defs = svg("defs", null);
    // lit face gradient (silver to soft blue-white)
    var g = svg("radialGradient", { id: "msignLit", cx: "38%", cy: "34%", r: "78%" });
    [["0%", "var(--msign-moon-hi)"], ["55%", "var(--msign-moon-lit)"],
     ["100%", "var(--msign-moon-lo)"]].forEach(function (stop) {
      g.appendChild(svg("stop", { offset: stop[0], "stop-color": stop[1] }));
    });
    defs.appendChild(g);
    // the ambient bloom behind the disc (painted, never a box-shadow)
    var bloom = svg("radialGradient", { id: "msignBloom", cx: "50%", cy: "50%", r: "50%" });
    bloom.appendChild(svg("stop", { offset: "40%", "stop-color": "var(--msign-halo)", "stop-opacity": "0.55" }));
    bloom.appendChild(svg("stop", { offset: "100%", "stop-color": "var(--msign-halo)", "stop-opacity": "0" }));
    defs.appendChild(bloom);
    root.appendChild(defs);

    // bloom layer (its own group so CSS can breathe its opacity)
    var haloG = svg("g", { "class": "msign-moon-halo" });
    haloG.appendChild(svg("circle", { cx: cx, cy: cy, r: R + 44, fill: "url(#msignBloom)" }));
    root.appendChild(haloG);

    // dark face of the disc (the unlit body)
    root.appendChild(svg("circle", { cx: cx, cy: cy, r: R, fill: "var(--msign-moon-dark)" }));

    // the lit region as one filled path
    var path = svg("path", { fill: "url(#msignLit)", "class": "msign-moon-lit" });
    path.setAttribute("d", litPath(illum, waxing, R, cx, cy));
    root.appendChild(path);

    // a faint rim so the dark limb still reads against the sky
    root.appendChild(svg("circle", {
      cx: cx, cy: cy, r: R, fill: "none",
      stroke: "var(--msign-moon-rim)", "stroke-width": "1"
    }));

    mount.appendChild(root);
  }

  // Build the SVG path for the illuminated portion.
  // illum 0..1 lit fraction; waxing => lit limb on the RIGHT.
  function litPath(illum, waxing, R, cx, cy) {
    var top = (cy - R), bot = (cy + R);
    // terminator ellipse x-radius: 0 at full, R at new; sign gives its bulge.
    // cos(pi*illum) runs +1 (new) -> 0 (quarter) -> -1 (full).
    var rx = Math.abs(R * Math.cos(Math.PI * illum));
    var termConcave = illum < 0.5; // crescent: terminator bows toward the dark side

    // Outer limb: a semicircle on the lit side.
    // Sweep flags chosen so the lit half sits on the correct side.
    var litRight = waxing;
    // Start at top, arc down the outer (lit) limb to bottom.
    var outerSweep = litRight ? 1 : 0;
    var d = "M " + cx + " " + top + " ";
    d += "A " + R + " " + R + " 0 0 " + outerSweep + " " + cx + " " + bot + " ";

    // Return along the terminator from bottom to top.
    // For gibbous (illum>0.5) the terminator bulges INTO the dark side
    // (same sweep direction as the limb); for crescent it bulges back.
    var termSweep;
    if (litRight) {
      termSweep = termConcave ? 1 : 0;
    } else {
      termSweep = termConcave ? 0 : 1;
    }
    d += "A " + rx + " " + R + " 0 0 " + termSweep + " " + cx + " " + top + " ";
    d += "Z";
    return d;
  }

  /* ---- Copy button ---- */
  function copyPlain(text, done) {
    function legacy() {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "absolute"; ta.style.left = "-9999px";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy");
        ta.parentNode.removeChild(ta);
        if (done) done();
      } catch (e) {}
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { if (done) done(); }).catch(legacy);
        return;
      }
    } catch (e) {}
    legacy();
  }

  /* ---- Boot one #msign-root ---- */
  function initRoot(root) {
    if (!root || root.getAttribute("data-msign-live") === "1") return;
    root.setAttribute("data-msign-live", "1");

    var readout = now();
    var data = moonData();
    var host = location && location.host ? location.host : "www.zodianimal.com";

    // Build the enhanced surface once, inside the root, after the fallback.
    // The fallback answer sentence + picker are already in the DOM; we add
    // the live moon art and the read panel, and keep the picker working.
    var stage = $("[data-msign-stage]", root);
    var headline = $("[data-msign-headline]", root);
    var meta = $("[data-msign-meta]", root);
    var readPanel = $("[data-msign-read]", root);
    var relLine = $("[data-msign-rel]", root);
    var shareBtn = $("[data-msign-copy]", root);
    var live = $("[data-msign-live-region]", root);

    // 1. Draw the Moon
    if (stage) drawMoon(stage, readout);

    // 2. Headline + meta (live, overwrites the baked strings with the
    //    same value; keeps them fresh if the page was cached across a
    //    sign change). aria-live announces changes.
    if (headline) {
      headline.innerHTML = "";
      var lead = document.createElement("span");
      lead.className = "msign-headline-lead";
      lead.appendChild(document.createTextNode("The Moon is in "));
      var strong = document.createElement("strong");
      strong.className = "msign-signname";
      strong.appendChild(document.createTextNode(readout.sign + " "));
      var gl = document.createElement("span");
      gl.className = "msign-signglyph";
      gl.setAttribute("aria-hidden", "true");
      gl.textContent = readout.glyph;
      strong.appendChild(gl);
      lead.appendChild(strong);
      headline.appendChild(lead);
    }
    if (meta) {
      meta.innerHTML = "";
      meta.appendChild(chip(readout.phaseGlyph + " " + readout.phaseName, true));
      meta.appendChild(chip(readout.pct + "% lit", false));
      meta.appendChild(chip("changes sign about every 2.3 days", false));
    }

    function chip(label, glyphLead) {
      var c = document.createElement("span");
      c.className = "msign-chip" + (glyphLead ? " msign-chip--phase" : "");
      c.textContent = label;
      return c;
    }

    // 3. The base read for this Moon sign (from data)
    var baseRead = "";
    if (data && data.signs && data.signs[readout.sign] && data.signs[readout.sign].read) {
      baseRead = data.signs[readout.sign].read;
    }
    if (readPanel) {
      var baseEl = $("[data-msign-base]", readPanel);
      if (baseEl) txt(baseEl, baseRead);
      // hide the whole panel if we have no data at all (keeps the sign +
      // moon meaningful without an empty prose slot)
      if (!baseRead) readPanel.setAttribute("data-empty", "1");
    }

    // 4. Picker + personalization
    var picker = $("[data-msign-picker]", root);
    var currentSun = storedSunSign();

    function applySun(sun) {
      currentSun = sun || null;
      // mark the chosen radio
      $all("input[name=msign-sun]", root).forEach(function (r) {
        r.checked = (canonSign(r.value) === currentSun);
      });
      root.setAttribute("data-has-sun", currentSun ? "1" : "0");
      paintRelation();
      paintShare();
      if (live) {
        live.textContent = "The Moon is in " + readout.sign + ". " +
          (currentSun ? ("Read for a " + currentSun + " Sun.") : "");
      }
    }

    function paintRelation() {
      if (!relLine) return;
      if (!currentSun) { relLine.textContent = ""; relLine.setAttribute("hidden", "hidden"); return; }
      relLine.removeAttribute("hidden");
      var line = "";
      if (data && data.relationships) {
        var key = relationKey(readout.sign, currentSun);
        var tpl = data.relationships[key];
        line = fill(tpl, {
          moonSign: readout.sign,
          sunSign: currentSun,
          element: ELEMENT[readout.sign]
        });
      }
      relLine.textContent = line;
    }

    function shareText() {
      var s = "The Moon is in " + readout.sign + " today. " +
              readout.phaseName + ", " + readout.pct + "% lit.";
      if (currentSun && data && data.relationships) {
        var extra = fill(data.relationships[relationKey(readout.sign, currentSun)], {
          moonSign: readout.sign, sunSign: currentSun, element: ELEMENT[readout.sign]
        });
        if (extra) s = "The Moon is in " + readout.sign + " today. For a " + currentSun + ", " +
          extra.charAt(0).toLowerCase() + extra.slice(1);
      }
      return s + " " + host;
    }

    function paintShare() {
      if (!shareBtn) return;
      shareBtn.setAttribute("data-share-text", shareText());
    }

    // wire the radios (they exist in the baked fallback)
    on(picker, "change", function (e) {
      var t = e.target;
      if (t && t.name === "msign-sun") applySun(canonSign(t.value));
    });
    // also support click on a label-button pattern if used
    on(picker, "click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-msign-sign]") : null;
      if (b) applySun(canonSign(b.getAttribute("data-msign-sign")));
    });

    // share / copy
    if (shareBtn) {
      on(shareBtn, "click", function () {
        var text = shareBtn.getAttribute("data-share-text") || shareText();
        // Prefer the native share sheet where present, else copy.
        var used = false;
        try {
          if (navigator.share) {
            navigator.share({ text: text }).catch(function () {});
            used = true;
          }
        } catch (e) {}
        if (!used) {
          copyPlain(text, function () {
            var lbl = $(".msign-copy-lbl", shareBtn) || shareBtn;
            var was = lbl.textContent;
            lbl.textContent = "Copied";
            setTimeout(function () { lbl.textContent = was; }, 1600);
          });
        }
      });
      paintShare();
    }

    // seed personalization from storage (auto-fill when known)
    applySun(currentSun);

    // 5. Keep it honest across midnight / a sign ingress while the tab is
    //    open: re-check every 10 minutes and repaint if the sign changed.
    var lastSign = readout.sign;
    window.setInterval(function () {
      var fresh = now();
      if (fresh.sign !== lastSign || fresh.pct !== readout.pct) {
        readout = fresh; lastSign = fresh.sign;
        if (stage) drawMoon(stage, readout);
        if (headline) initHeadline();
        if (meta) initMeta();
        // refresh the base read for the new sign
        var d2 = moonData();
        if (readPanel && d2 && d2.signs && d2.signs[readout.sign]) {
          var b2 = $("[data-msign-base]", readPanel);
          if (b2) txt(b2, d2.signs[readout.sign].read || "");
          readPanel.removeAttribute("data-empty");
        }
        paintRelation();
        paintShare();
        if (live) live.textContent = "The Moon has moved into " + readout.sign + ".";
      }
    }, 600000);

    function initHeadline() {
      var strong = $(".msign-signname", headline);
      if (strong) strong.firstChild && (strong.firstChild.textContent = readout.sign + " ");
      var g2 = $(".msign-signglyph", headline);
      if (g2) g2.textContent = readout.glyph;
    }
    function initMeta() {
      meta.innerHTML = "";
      meta.appendChild(chip(readout.phaseGlyph + " " + readout.phaseName, true));
      meta.appendChild(chip(readout.pct + "% lit", false));
      meta.appendChild(chip("changes sign about every 2.3 days", false));
    }

    root.setAttribute("data-enhanced", "1");
  }

  function boot() {
    $all("[data-msign]").forEach(initRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
