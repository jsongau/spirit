/* home-fx.js — tasteful interactive polish for the Primal Animal homepage.
   Self-contained, no libraries, no storage. Safe on pages missing #todayMoon/.wheel. */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

    /* Inject styles (prefixed hfx-) */
    var style = document.createElement("style");
    style.textContent =
      ".hfx-reveal{opacity:0;transform:translateY(12px);transition:opacity .5s ease,transform .5s ease}" +
      ".hfx-in{opacity:1;transform:none}" +
      ".hfx-wheel{transition:transform .18s ease-out;will-change:transform}";
    document.head.appendChild(style);

    /* 1) Real moon phase drawn as inline SVG into #todayMoon */
    var moonEl = document.getElementById("todayMoon");
    if (moonEl && window.ENGINE && typeof ENGINE.moonPhase === "function") {
      var frac = ENGINE.moonPhase().frac;
      var k = (1 - Math.cos(2 * Math.PI * frac)) / 2; // illuminated fraction 0..1
      var R = 22, C = 23; // radius / center within 46px box
      // Terminator ellipse half-width: 0 at half-lit, R at new/full.
      var rx = Math.abs(R * (1 - 2 * k));
      var waxing = frac < 0.5; // waxing lights the RIGHT limb
      // Build the lit region as: full disc arc + terminator arc.
      // Lit side sweep flags chosen so the correct limb is illuminated.
      var litRight = waxing;
      var half = k < 0.5
        ? // crescent: lit region is a lune on one side
          (litRight
            ? "M " + C + " 1 A " + R + " " + R + " 0 0 1 " + C + " 45 A " + rx + " " + R + " 0 0 " + (k < 0.5 ? 1 : 0) + " " + C + " 1 Z"
            : "M " + C + " 1 A " + R + " " + R + " 0 0 0 " + C + " 45 A " + rx + " " + R + " 0 0 " + (k < 0.5 ? 0 : 1) + " " + C + " 1 Z")
        : // gibbous: lit region is disc minus a lune on the dark side
          (litRight
            ? "M " + C + " 1 A " + R + " " + R + " 0 0 1 " + C + " 45 A " + rx + " " + R + " 0 0 0 " + C + " 1 Z"
            : "M " + C + " 1 A " + R + " " + R + " 0 0 0 " + C + " 45 A " + rx + " " + R + " 0 0 1 " + C + " 1 Z");
      moonEl.innerHTML =
        '<svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true" style="display:block">' +
          '<circle cx="' + C + '" cy="' + C + '" r="' + R + '" fill="var(--line)" opacity="0.5"/>' +
          '<path d="' + half + '" fill="var(--moon)"/>' +
          '<circle cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="var(--line)" stroke-width="1" opacity="0.6"/>' +
        '</svg>';
      moonEl.style.background = "transparent";
    }

    /* 2) Reveal-on-scroll for .band sections */
    var bands = document.querySelectorAll(".band");
    if (!reduce && "IntersectionObserver" in window && bands.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("hfx-in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      bands.forEach(function (b) { b.classList.add("hfx-reveal"); io.observe(b); });
    }

    /* 3) Hero wheel parallax (desktop, fine pointer only) */
    var wheel = document.querySelector(".wheel");
    if (wheel && !reduce && fine) {
      wheel.classList.add("hfx-wheel");
      var tx = 0, ty = 0, rot = 0, cx = 0, cy = 0, raf = 0, active = false;
      function draw() {
        raf = 0;
        if (document.hidden) return;
        wheel.style.transform =
          "translate(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px) rotate(" + rot.toFixed(2) + "deg)";
      }
      function onMove(ev) {
        if (document.hidden) return;
        var w = window.innerWidth, h = window.innerHeight;
        cx = (ev.clientX / w) - 0.5;
        cy = (ev.clientY / h) - 0.5;
        tx = cx * 10; ty = cy * 10; rot = cx * 4;
        if (!raf) raf = requestAnimationFrame(draw);
      }
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
      });
    }
  });
})();
