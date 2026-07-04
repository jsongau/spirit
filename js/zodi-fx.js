/* ============================================================
   ZODI FX — tactile interaction layer for cards and CTAs.
   Pointer-tracked tilt + moving specular glare on the cards
   that invite touch, and a slow light-sweep on primary CTAs.
   Pure enhancement: no layout shift, disabled for
   prefers-reduced-motion and touch-only devices.

   Auto-applies to: .zodi-earn, .unlockCard, .pathCard,
   .peekCard, .kb-throne, .lab-panel, .zodi-stat — plus anything
   marked data-tilt.
   ============================================================ */
(function () {
  "use strict";

  var REDUCE = false;
  try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var FINE = true;
  try { FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches; } catch (e) {}
  if (REDUCE || !FINE) return;

  var SEL = ".zodi-earn,.unlockCard,.pathCard,.peekCard,.kb-throne,.lab-panel,.zodi-stat,[data-tilt]";
  var MAX = 7; /* degrees */

  function wire(el) {
    if (el.__zfx) return;
    el.__zfx = true;
    el.classList.add("zfx");
    var raf = null;

    function move(e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;   /* 0..1 */
      var py = (e.clientY - r.top) / r.height;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        el.style.setProperty("--zfx-rx", ((py - 0.5) * -MAX).toFixed(2) + "deg");
        el.style.setProperty("--zfx-ry", ((px - 0.5) * MAX).toFixed(2) + "deg");
        el.style.setProperty("--zfx-gx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--zfx-gy", (py * 100).toFixed(1) + "%");
      });
    }
    function leave() {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      el.style.setProperty("--zfx-rx", "0deg");
      el.style.setProperty("--zfx-ry", "0deg");
    }
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
  }

  function scan() {
    var els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) wire(els[i]);
  }

  document.addEventListener("DOMContentLoaded", function () {
    scan();
    /* cards hydrated later (board rows, rail) get wired on a slow poll */
    setInterval(scan, 4000);
  });
})();
