/* ============================================================
   Zodi Animal — homepage v3 SUPPLEMENT
   Loaded AFTER nav.js and homepage-v2.js. Scope is deliberately
   tiny: light analytics + a couple of accessibility safety nets.
   It does NOT rewire the reveal form, the wheel, the nav, or the
   returning-user state — homepage-v2.js and nav.js keep ownership.
   No birth date is ever sent to analytics.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function track(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {}
  }

  function init() {
    /* --- reveal: observe, never rewire --- */
    var form = $("#sightForm");
    if (form) {
      // additive listener; does not preventDefault, so v2's handler runs normally
      form.addEventListener("submit", function () { track("homepage_reveal_submitted"); });
      // first keystroke in any date field = intent started
      var started = false;
      ["#mm", "#dd", "#yy"].forEach(function (sel) {
        var el = $(sel);
        if (el) el.addEventListener("input", function () {
          if (!started) { started = true; track("homepage_reveal_started"); }
        });
      });
    }

    // the creature name updates when a reveal settles (typed date, submit, or ring turn).
    // Report only the animal name — never the birth date.
    var nameEl = $("#roName");
    if (nameEl && "MutationObserver" in window) {
      var last = (nameEl.textContent || "").trim();
      new MutationObserver(function () {
        var now = (nameEl.textContent || "").trim();
        if (now && now !== last && !/^[.…\s]*$/.test(now)) {
          last = now;
          track("homepage_reveal_success", { animal: now });
        }
      }).observe(nameEl, { childList: true, characterData: true, subtree: true });
    }

    /* --- FAQ open (native <details>) --- */
    document.querySelectorAll(".faq-v3 details").forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) {
          var q = d.querySelector("summary");
          track("homepage_faq_opened", { question: q ? q.textContent.trim().slice(0, 80) : "" });
        }
      });
    });

    /* --- newsletter submit (footer form) --- */
    var news = $("#zf-news-form");
    if (news) news.addEventListener("submit", function () { track("homepage_newsletter_submitted"); });

    /* --- a11y safety net: mark that JS/reduced-motion is active (CSS already covers motion) --- */
    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.classList.add("reduced-motion");
      }
    } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
