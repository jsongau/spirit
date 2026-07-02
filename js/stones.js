/* ============================================================
   stones.js  —  Keeper Stones gem interaction (progressive enhancement)
   ------------------------------------------------------------
   Pointer + keyboard. No libraries, no localStorage, no network.
   Loaded with `defer`. Idempotent and defensive.

   The PM renders each gem card as:
     <div class="pf-stone" tabindex="0" role="button"
          aria-label="Charge the {stone}"> ... </div>
   so it is already focusable and operable. This script adds:
     press/hold (pointerdown or Enter/Space) -> charge, ramping the
       --charge custom prop 0->1 over ~600ms;
     release (pointerup/leave/cancel or keyup) -> stop; if charge
       crossed ~0.5, fire the release shimmer (add .is-shimmer,
       removed on animationend) + a glow pulse, then reset --charge.
   prefers-reduced-motion: skip the ramp + sweep; on activate just
   flash a brief .is-lit class (glow on, then fade). No transform,
   no sweep.
   ============================================================ */
(function () {
  "use strict";

  if (typeof document === "undefined") return;

  var CHARGE_MS = 600;     // press-and-hold ramp to full
  var FIRE_AT = 0.5;       // charge threshold that triggers release
  var LIT_MS = 620;        // reduced-motion activate flash

  var reduce = false;
  try {
    reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { reduce = false; }

  function init() {
    var cards = document.querySelectorAll(".pf-stone");
    if (!cards || !cards.length) return;
    for (var i = 0; i < cards.length; i++) wire(cards[i]);
  }

  function wire(card) {
    if (!card || card.__gemWired) return;   // idempotent
    card.__gemWired = true;

    var raf = 0;
    var start = 0;
    var charge = 0;
    var charging = false;

    function setCharge(v) {
      charge = v < 0 ? 0 : v > 1 ? 1 : v;
      card.style.setProperty("--charge", String(charge));
    }

    function step(now) {
      if (!charging) return;
      var t = (now - start) / CHARGE_MS;
      setCharge(t);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;                              // held past full; hold at 1
      }
    }

    function startCharge() {
      if (charging) return;
      // reduced motion: no ramp, no hold state
      if (reduce) return;
      charging = true;
      card.classList.add("is-charging");
      start = (window.performance && performance.now)
        ? performance.now() : Date.now();
      raf = requestAnimationFrame(step);
    }

    function endCharge(activated) {
      // reduced-motion path: just a brief lit flash on a real activation
      if (reduce) {
        if (activated) flashLit();
        return;
      }
      if (!charging) return;
      charging = false;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      card.classList.remove("is-charging");

      if (charge >= FIRE_AT) {
        fireShimmer();
      }
      setCharge(0);
    }

    function fireShimmer() {
      // one finite sheen sweep; CSS owns the keyframes, JS clears the class
      card.classList.remove("is-shimmer");
      // force reflow so re-adding restarts the animation if fired twice fast
      void card.offsetWidth;
      card.classList.add("is-shimmer");
    }

    function onShimmerEnd(ev) {
      // only clear when the sheen band's own animation ends (longest)
      if (ev && ev.animationName && ev.animationName.indexOf("gem-shimmer") === -1) return;
      card.classList.remove("is-shimmer");
    }

    var litTimer = 0;
    function flashLit() {
      card.classList.add("is-lit");
      if (litTimer) clearTimeout(litTimer);
      litTimer = setTimeout(function () {
        card.classList.remove("is-lit");
        litTimer = 0;
      }, LIT_MS);
    }

    /* ---- pointer ---- */
    card.addEventListener("pointerdown", function (ev) {
      // primary button / touch / pen only
      if (ev.button != null && ev.button !== 0) return;
      startCharge();
    });
    card.addEventListener("pointerup", function () { endCharge(true); });
    card.addEventListener("pointerleave", function () { endCharge(false); });
    card.addEventListener("pointercancel", function () { endCharge(false); });

    /* ---- keyboard (Enter / Space) ---- */
    var keyHeld = false;
    card.addEventListener("keydown", function (ev) {
      var k = ev.key;
      if (k === "Enter" || k === " " || k === "Spacebar" || ev.keyCode === 32 || ev.keyCode === 13) {
        if (k === " " || k === "Spacebar" || ev.keyCode === 32) ev.preventDefault(); // no scroll
        if (keyHeld) return;                  // ignore auto-repeat
        keyHeld = true;
        startCharge();
      }
    });
    card.addEventListener("keyup", function (ev) {
      var k = ev.key;
      if (k === "Enter" || k === " " || k === "Spacebar" || ev.keyCode === 32 || ev.keyCode === 13) {
        keyHeld = false;
        // a keyboard tap is instantaneous; treat as a full activation
        if (!reduce && !charging) { fireShimmer(); }
        else endCharge(true);
      }
    });
    // if focus is lost mid-hold
    card.addEventListener("blur", function () { keyHeld = false; endCharge(false); });

    card.addEventListener("animationend", onShimmerEnd);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
