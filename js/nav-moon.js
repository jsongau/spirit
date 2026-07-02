/* ============================================================
   THE PRIMAL ORACLE — nav-moon feature
   The bar's Moon chip is PRE-RENDERED by build/apply-nav.mjs
   ([data-moon-chip] + popover skeleton) and hydrated by nav.js
   initMoonChip() from PNAV.DYN.moonInfo(): glyph + % on the chip,
   phase name and meaning in the popover. This feature therefore
   mounts NOTHING when that chip exists — the duplicate labeled
   moon chip this module used to insert was the bar-cramp bug.

   Legacy fallback only: on a page whose bar somehow lacks the
   pre-rendered chip, build one compact glyph + % link (no phase
   name in the bar; that copy lives on /moon.html) and place it
   before the theme toggle. Styles come from nav-core.css
   (.pn-moon), tokens only. Pure, defensive, no external deps.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };

PNAV.features.moon = function (ctx) {
  "use strict";
  if (!ctx || !ctx.tools) return;

  var scope = ctx.bar || document;
  if (scope.querySelector("[data-moon-chip]")) return; /* nav.js owns it */

  var dyn = window.PNAV && PNAV.DYN;
  if (!dyn || typeof dyn.moonInfo !== "function") return;

  var m;
  try { m = dyn.moonInfo(); } catch (e) { return; }
  if (!m || !m.glyph) return;

  var a = document.createElement("a");
  a.className = "pn-moon";
  a.href = "/moon.html";
  a.title = m.name || "The Moon tonight";
  a.setAttribute("aria-label",
    "The Moon tonight: " + (m.name || "Moon") + ", " + m.pct + " illuminated");

  var g = document.createElement("span");
  g.className = "g";
  g.setAttribute("aria-hidden", "true");
  g.textContent = m.glyph;

  var v = document.createElement("span");
  v.className = "v";
  v.textContent = m.pct;

  a.appendChild(g);
  a.appendChild(v);

  var theme = ctx.tools.querySelector(".pn-theme");
  if (theme) ctx.tools.insertBefore(a, theme);
  else ctx.tools.appendChild(a);
};
