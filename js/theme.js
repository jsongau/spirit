/* ============================================================
   theme.js — Zodi Animal dual-personality theme engine (doc 14 §2).
   Two themes, one skeleton: dark celestial (default, JS-off safe)
   and Barbie light. Auto = light by day (07:00 to 18:59), dark by
   night. Manual override persists in localStorage("zn_theme").
   Season (spring/summer/autumn/winter) sets html[data-season] so
   tokens.css can shift the dark theme's second hue and the light
   theme's sky wash.

   A pre-paint boot snippet (injected into <head> by
   build/apply-assets.mjs, data-pn-assets="theme-boot") sets the
   initial data-theme/data-season before first paint; this file
   owns everything after: the toggle chip, the auto boundary
   re-check, and the ZNTheme API.
   Toggle cycle: auto -> light -> dark -> auto.
   ============================================================ */
(function () {
  "use strict";
  var KEY = "zn_theme";
  var root = document.documentElement;
  /* Pages audited for the light theme. Everything else stays dark
     celestial until its template is redesigned to the v4 canvas
     language (legacy page CSS assumes a dark ground). Keep in sync
     with the LIGHT_OK list in build/apply-assets.mjs THEME_BOOT. */
  var LIGHT_OK = ["/", "/index.html"];
  var lightAllowed = LIGHT_OK.indexOf(location.pathname) > -1;

  function autoTheme() {
    /* Dark celestial is the brand default; day/night auto-light is
       retired (owner decision 2026-07-01). Light is manual opt-in. */
    return "dark";
  }
  function season() {
    var m = new Date().getMonth();
    return m >= 2 && m <= 4 ? "spring"
         : m >= 5 && m <= 7 ? "summer"
         : m >= 8 && m <= 10 ? "autumn" : "winter";
  }
  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function mode() {
    var t = stored();
    return t === "light" || t === "dark" ? t : "auto";
  }
  function apply() {
    var m = mode();
    var t = m === "auto" ? autoTheme() : m;
    if (!lightAllowed) t = "dark";
    root.dataset.theme = t;
    root.dataset.season = season();
    sync();
  }
  function sync() {
    var b = document.querySelector("[data-theme-toggle]");
    if (!b) return;
    var m = mode();
    b.textContent = m === "auto" ? "◐" : m === "light" ? "☀" : "☾";
    var label = m === "auto"
      ? "Theme: auto. Light by day, dark by night. Click for light."
      : m === "light"
        ? "Theme: light. Click for dark."
        : "Theme: dark. Click for auto.";
    b.setAttribute("aria-label", label);
    b.title = label;
  }
  function cycle() {
    var next = mode() === "light" ? "dark" : "light";
    try {
      if (next === "dark") localStorage.removeItem(KEY); /* dark = default */
      else localStorage.setItem(KEY, next);
    } catch (e) {}
    apply();
  }

  window.ZNTheme = { apply: apply, cycle: cycle, mode: mode };

  function init() {
    var b = document.querySelector("[data-theme-toggle]");
    if (b) {
      if (!lightAllowed) b.hidden = true; /* no dead toggle on dark-only pages */
      else b.addEventListener("click", cycle);
    }
    apply();
    /* catch the 07:00/19:00 boundary while a tab stays open */
    setInterval(function () { if (mode() === "auto") apply(); }, 9e5);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
