/* ============================================================================
   homepage-v4-dial.js
   Continuous drag-to-rotate for the observatory dial (60fps follow + snap).

   THE ARCHITECTURE (why this version is smooth, not notchy)
   ---------------------------------------------------------
   The OLD version stepped the engine (clicked seal buttons) DURING the drag, so
   the ring jumped 30 degrees per notch under the engine's 1.2s CSS transition —
   twelve fighting hops, a notchy mush. This version separates the two jobs:

     • DURING the drag: WE own the ring visually. We write
         ring.style.transform = 'rotate(<free angle>deg)'
       on every pointermove, with transition:'none', so the rim tracks the
       finger 1:1 at 60fps. A light haptic tick fires each time the pointer
       crosses a 30-degree detent, purely as feel — the engine is untouched.

     • ON RELEASE: we compute the nearest of the 12 detents, turn on a short
       inline SNAP transition (.34s), then hand control back to the engine by
       CLICKING the existing seal buttons |Δsteps| times in the shortest
       direction. The engine's clicks set the SAME transform we would have —
       rotate(-30*target) — so under our .34s transition it settles once,
       smoothly, from the free angle to the snapped angle. No twelve hops.

   HARD RULE: js/homepage-v2.js OWNS the crossing math, the discrete step state,
   and the readout. We only ever (a) READ its DOM (.wglyph.lit / .eglyph.lit),
   (b) write #ringWest/#ringEast style.transform DIRECTLY *during an active drag
   and the release-snap only*, and (c) sync its discrete state by CLICKING the
   four existing turn buttons. We never re-implement rotation or the readout,
   and we never touch the birth-date fields or analytics.

   This file is additive, loads AFTER homepage-v2.js, and no-ops silently if
   anything it needs is missing. The seal buttons stay the full keyboard path.
   ============================================================================ */
(function () {
  "use strict";

  function init() {

    /* --- Grab everything up front; bail out silently if any of it is missing. */
    var dial = document.querySelector(".dial");
    if (!dial) { return; }

    var ringWest = document.querySelector("#ringWest");
    var ringEast = document.querySelector("#ringEast");
    if (!ringWest || !ringEast) { return; }

    var btnWplus  = document.querySelector('[data-turn="w+1"]');
    var btnWminus = document.querySelector('[data-turn="w-1"]');
    var btnEplus  = document.querySelector('[data-turn="e+1"]');
    var btnEminus = document.querySelector('[data-turn="e-1"]');
    if (!btnWplus || !btnWminus || !btnEplus || !btnEminus) { return; }

    /* The pointer sprite is a nice-to-have for the grab/tick pulse. Its absence
       must not break dragging, so we do not bail when it is missing. */
    var pointer = document.querySelector(".dial .pointer");

    /* --------------------------------------------------------------------------
       DIRECTION
       --------------------------------------------------------------------------
       CW_FORWARD: a clockwise drag advances the sign forward ("shùn / with").
       If clockwise feels like it turns the ring the wrong way in the browser,
       flip this single boolean to false. Nothing else needs to change.

       Geometry note: the engine maps step s to the visual angle -30*s. So a
       clockwise finger drag (positive angle delta) must DECREASE the visual
       angle for the step index to increase. We handle that in the release-sync
       shortest-path math, not here; this flag just lets you invert if the sign
       of the whole gesture ever feels inverted.
    -------------------------------------------------------------------------- */
    var CW_FORWARD = true;

    /* --------------------------------------------------------------------------
       SVG GEOMETRY
       --------------------------------------------------------------------------
       viewBox is "0 0 540 540", logical centre (270,270). Glyph radii from
       centre: west/outer ring ~215, east/inner ring ~152. We accept a generous
       band around each so the whole rim is grabbable:

           OUTER (west):  185 <= r <= 262
           INNER (east):   92 <= r < 185
           otherwise:      ignore (centre seal / outside the dial) — no capture.
    -------------------------------------------------------------------------- */
    var CX = 270, CY = 270;
    var OUTER_MIN = 185, OUTER_MAX = 262;
    var INNER_MIN = 92,  INNER_MAX = 185;

    var STEP = 30;                       /* degrees per detent (12 positions) */
    var SNAP_TRANSITION = "transform .34s cubic-bezier(.22,1,.36,1)";
    var SNAP_CLEAR_MS = 420;             /* when to hand transform back to engine */
    var TICK_PULSE_MS = 140;             /* how long the pointer .snap tick lasts */

    var reduceMotion = false;
    try {
      reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) { reduceMotion = false; }

    /* Default affordance cursor. is-dragging swaps to grabbing (also below). */
    dial.style.cursor = "grab";

    /* --------------------------------------------------------------------------
       client point -> SVG user (viewBox) coordinates.
       Primary: exact matrix inverse via getScreenCTM + DOMPoint (honours any
       CSS scaling of the SVG). Fallback: proportional map through the bounding
       box onto the 540x540 viewBox.
    -------------------------------------------------------------------------- */
    function clientToSvg(clientX, clientY) {
      if (typeof dial.getScreenCTM === "function") {
        var ctm = dial.getScreenCTM();
        if (ctm) {
          if (typeof window.DOMPoint === "function") {
            var p = new DOMPoint(clientX, clientY);
            var t = p.matrixTransform(ctm.inverse());
            return { x: t.x, y: t.y };
          }
          if (typeof dial.createSVGPoint === "function") {
            var sp = dial.createSVGPoint();
            sp.x = clientX; sp.y = clientY;
            var st = sp.matrixTransform(ctm.inverse());
            return { x: st.x, y: st.y };
          }
        }
      }
      var r = dial.getBoundingClientRect();
      var vb = 540;
      return {
        x: ((clientX - r.left) / r.width) * vb,
        y: ((clientY - r.top) / r.height) * vb
      };
    }

    /* Angle of a point about the centre, 0 at 12 o'clock, clockwise positive.
       Screen Y grows downward, so atan2(dx, -dy) gives 0 at top, cw increasing. */
    function angleOf(x, y) {
      return Math.atan2(x - CX, -(y - CY)) * 180 / Math.PI; /* -180..180 */
    }
    function radiusOf(x, y) {
      var dx = x - CX, dy = y - CY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    /* Shortest signed difference, wrapped to (-180, 180]. */
    function shortestAngleDiff(d) {
      while (d > 180) { d -= 360; }
      while (d <= -180) { d += 360; }
      return d;
    }
    function ringFromRadius(r) {
      if (r >= OUTER_MIN && r <= OUTER_MAX) { return "west"; }
      if (r >= INNER_MIN && r < INNER_MAX)  { return "east"; }
      return null;
    }

    /* Read the engine's CURRENT discrete step straight off the lit glyph. */
    function currentStep(ring) {
      var lit = document.querySelector(
        ring === "west" ? ".wglyph.lit" : ".eglyph.lit"
      );
      return lit ? +lit.dataset.i : 0;
    }

    function vibrate(ms) {
      if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
    }

    /* --------------------------------------------------------------------------
       Drag state
    -------------------------------------------------------------------------- */
    var dragging   = false;
    var activeRing = null;   /* "west" | "east" */
    var activeEl   = null;   /* the SVG <g> we drive during the drag */
    var baseAngle  = 0;      /* ring's visual angle at grab: -30 * currentStep */
    var grabAngle  = 0;      /* pointer angle at grab */
    var visual     = 0;      /* current free visual angle written to the ring */
    var lastDetent = 0;      /* last detent index crossed, for the haptic tick */
    var capturedId = null;
    var tickTimer  = null;
    var clearTimer = null;

    function tickPointer() {
      if (!pointer || reduceMotion) { return; }
      pointer.classList.add("snap");
      if (tickTimer) { clearTimeout(tickTimer); }
      tickTimer = setTimeout(function () {
        pointer.classList.remove("snap");
        tickTimer = null;
      }, TICK_PULSE_MS);
    }

    /* ---- 1. pointerdown: grab a ring and lock it -------------------------- */
    function onPointerDown(ev) {
      if (dragging) { return; }
      if (ev.button !== undefined && ev.button !== 0) { return; } /* primary only */

      var pt = clientToSvg(ev.clientX, ev.clientY);
      var ring = ringFromRadius(radiusOf(pt.x, pt.y));
      if (!ring) { return; } /* centre seal or outside: leave it, do not capture */

      dragging   = true;
      activeRing = ring;
      activeEl   = (ring === "west") ? ringWest : ringEast;

      var step   = currentStep(ring);
      baseAngle  = -STEP * step;            /* ring's current visual angle */
      grabAngle  = angleOf(pt.x, pt.y);
      visual     = baseAngle;
      lastDetent = Math.round(-visual / STEP);

      /* Take over the ring visually: kill the engine's slow transition so the
         rim tracks the finger 1:1, and hint the compositor. */
      activeEl.style.transition = "none";
      activeEl.style.willChange = "transform";

      /* Locked / grabbed state. Stop the page from scrolling on touch. */
      dial.style.touchAction = "none";
      dial.classList.add("is-dragging");
      dial.classList.add(ring === "west" ? "grab-west" : "grab-east");
      dial.style.cursor = "grabbing";
      if (pointer && !reduceMotion) { pointer.classList.add("grab"); }

      /* One firm "lock" cue. */
      vibrate(12);

      capturedId = ev.pointerId;
      if (dial.setPointerCapture) {
        try { dial.setPointerCapture(ev.pointerId); } catch (e) {}
      }
      ev.preventDefault();
    }

    /* ---- 2. pointermove: follow the finger continuously ------------------- */
    function onPointerMove(ev) {
      if (!dragging || !activeEl) { return; }

      var pt = clientToSvg(ev.clientX, ev.clientY);
      var a  = angleOf(pt.x, pt.y);
      var delta = shortestAngleDiff(a - grabAngle);
      /* CW_FORWARD lets us invert the whole gesture if it ever feels backwards. */
      visual = baseAngle + (CW_FORWARD ? delta : -delta);

      /* Continuous 1:1 follow — a direct write, no transition, every move. */
      activeEl.style.transform = "rotate(" + visual + "deg)";

      /* Magnetic detent feel: tick whenever we cross into a new 30-degree slot. */
      var detent = Math.round(-visual / STEP);
      if (detent !== lastDetent) {
        lastDetent = detent;
        vibrate(6);
        tickPointer();
      }

      ev.preventDefault();
    }

    /* ---- 3. pointerup / pointercancel: snap + re-sync the engine ---------- */
    function endDrag(ev) {
      if (!dragging || !activeEl) { return; }
      dragging = false;

      var ring = activeRing;
      var elRef = activeEl;

      /* Nearest of the 12 detents to where the finger left the ring. */
      var target  = ((Math.round(-visual / STEP)) % 12 + 12) % 12;
      var current = currentStep(ring);
      var engineAngle = -STEP * target;   /* the angle the engine will hold: rotate(-30*target) */

      /* FIX the "wheel of fortune" spin: the free `visual` angle can wind up past
         360deg, but engineAngle is always in [-330,0]. Re-express the current
         rotation as the equivalent angle NEAREST engineAngle (identical pixels on
         screen), with transition OFF, so the snap that follows only ever travels
         <=15deg instead of unwinding whole turns. */
      var d = visual - engineAngle;
      d = d - Math.round(d / 360) * 360;          /* wrap to (-180,180] */
      var normVisual = engineAngle + d;
      elRef.style.transition = "none";
      elRef.style.transform  = "rotate(" + normVisual + "deg)";
      void elRef.getBoundingClientRect();          /* commit the (invisible) re-express */

      /* Now glide the short way to the exact detent. */
      elRef.style.transition = SNAP_TRANSITION;
      elRef.style.transform  = "rotate(" + engineAngle + "deg)";

      /* Sync the engine's discrete state (lit glyph + readout) via the seals.
         Its transform write equals engineAngle, so it does not re-trigger a spin. */
      var diff = ((target - current) % 12 + 12) % 12; /* forward hops 0..11 */
      var btnFwd, btnBack, steps, btn;
      if (ring === "west") { btnFwd = btnWplus; btnBack = btnWminus; }
      else                 { btnFwd = btnEplus; btnBack = btnEminus; }
      if (diff <= 6) { steps = diff;      btn = btnFwd;  }  /* +1 forward */
      else           { steps = 12 - diff; btn = btnBack; }  /* -1 backward */
      for (var i = 0; i < steps; i++) { btn.click(); }

      /* Drop the grabbed state. */
      dial.classList.remove("is-dragging");
      dial.classList.remove("grab-west");
      dial.classList.remove("grab-east");
      if (pointer) { pointer.classList.remove("grab"); }
      dial.style.cursor = "grab";
      dial.style.touchAction = "";
      elRef.style.willChange = "";

      if (capturedId !== null && dial.releasePointerCapture) {
        try { dial.releasePointerCapture(capturedId); } catch (e) {}
      }
      capturedId = null;

      /* One soft "settle" cue. */
      vibrate(10);

      /* After the snap animation, clear our inline transition AND transform so
         the engine/CSS own them again. The engine already set the identical
         transform via the clicks, so nothing visually jumps when we let go. */
      if (clearTimer) { clearTimeout(clearTimer); }
      clearTimer = setTimeout(function () {
        elRef.style.transition = "";   /* keep the engine's inline transform (rotate(-30*target)); clearing it would drop the ring to 0deg and desync the lit glyph */
        clearTimer = null;
      }, SNAP_CLEAR_MS);

      activeRing = null;
      activeEl = null;
    }

    /* --------------------------------------------------------------------------
       Wire up. Pointer Events cover mouse, touch, and pen on one path.
    -------------------------------------------------------------------------- */
    if (window.PointerEvent) {
      dial.addEventListener("pointerdown", onPointerDown);
      dial.addEventListener("pointermove", onPointerMove);
      dial.addEventListener("pointerup", endDrag);
      dial.addEventListener("pointercancel", endDrag);
      dial.addEventListener("lostpointercapture", endDrag);
    }
    /* If PointerEvent is unavailable (very old browsers) we do nothing extra:
       the seal buttons remain the full, working control. */
  }

  /* homepage-v2.js loads with defer and builds the rings before DOMContentLoaded,
     so the rings and buttons exist by the time we run. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
