/* ============================================================
   Zodi Animals — psychic-reading veil (animal pages)
   ------------------------------------------------------------
   The full psychic text ships in the served HTML, so crawlers and
   no-JS readers always see every word (never display:none in the
   initial markup). With JS live, this veils the reading body behind
   the same blur/one-line-clip pattern as the homepage unlock cards
   (home-v4.js initVeils, adapted for animal pages) and inserts a
   "Part the veil" affordance; clicking the card or the button parts
   it. Parting is remembered per lunation, so the layer re-veils at
   each new moon, exactly as the copy line promises. All motion in
   the transition lives in CSS behind a reduced-motion guard.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "po:psychicVeil";

  /* Lunation index: whole synodic months since the reference new moon
     of 2000-01-06 18:14 UTC (epoch ms 947182440000), mean synodic
     month 29.530588853 days = 2551442876.9 ms. Coarse is fine here;
     the veil only needs to know when a new moon has passed. */
  function lunation() {
    return Math.floor((Date.now() - 947182440000) / 2551442876.9);
  }

  function init() {
    var cards = document.querySelectorAll(".pf-psy-card");
    if (!cards.length) return;

    var parted = false;
    try { parted = localStorage.getItem(KEY) === String(lunation()); } catch (e) {}
    if (parted) return; /* same lunar cycle: the veil stays open */

    Array.prototype.forEach.call(cards, function (card) {
      var body = card.querySelector(".pf-psy-body");
      if (!body) return;
      card.classList.add("is-veiled");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pf-psy-reveal";
      btn.textContent = "Part the veil";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Part the veil and read the psychic reading");
      body.insertAdjacentElement("afterend", btn);

      function partTheVeil() {
        card.classList.remove("is-veiled");
        btn.setAttribute("aria-expanded", "true");
        try { localStorage.setItem(KEY, String(lunation())); } catch (e) {}
      }
      btn.addEventListener("click", function (e) { e.stopPropagation(); partTheVeil(); });
      card.addEventListener("click", function () {
        if (card.classList.contains("is-veiled")) partTheVeil();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
