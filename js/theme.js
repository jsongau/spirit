/* ============================================================
   theme.js — Zodi Animal theme stub (dark celestial ONLY).
   The dual-personality engine (auto day/night + Barbie light) is
   retired (owner decision 2026-07-01). This file stays so the
   sitewide <script src="/js/theme.js"> reference never 404s, and
   it still owns two small jobs after the pre-paint boot snippet
   (build/apply-assets.mjs, data-pn-assets="theme-boot"):
     1. pin html[data-theme="dark"], always;
     2. set html[data-season] (spring/summer/autumn/winter) so
        tokens.css can shift the celestial second hue.
   A minimal ZNTheme API survives for any caller that probes it.
   ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;

  function season() {
    var m = new Date().getMonth();
    return m >= 2 && m <= 4 ? "spring"
         : m >= 5 && m <= 7 ? "summer"
         : m >= 8 && m <= 10 ? "autumn" : "winter";
  }
  function apply() {
    root.dataset.theme = "dark";
    root.dataset.season = season();
  }

  window.ZNTheme = {
    apply: apply,
    cycle: apply,               /* no-op: there is nothing to cycle to */
    mode: function () { return "dark"; }
  };

  function init() {
    /* if a stale page still ships a toggle chip, retire it quietly */
    var b = document.querySelector("[data-theme-toggle]");
    if (b) b.hidden = true;
    apply();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
