/* ============================================================
   THE PRIMAL ORACLE — nav-moon feature
   A live Moon chip for the mega navigation bar.
   The orchestrator calls PNAV.features.moon(ctx) after the bar
   is built. We draw a small disc lit to tonight's true fraction
   and link to moon.html. Pure, defensive, no external deps.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };

PNAV.features.moon = function (ctx) {
  "use strict";
  if (!ctx || !ctx.ENGINE || typeof ctx.ENGINE.moonPhase !== "function") return;
  if (!ctx.tools) return;

  const mp = ctx.ENGINE.moonPhase();
  if (!mp || typeof mp.frac !== "number") return;

  const frac = mp.frac;
  const name = mp.name || "Moon";
  const advice = (mp.advice || "").trim();

  // Illuminated fraction across the synodic month.
  // k = (1 - cos(2*pi*frac)) / 2  (0 at new, 1 at full)
  let k = (1 - Math.cos(2 * Math.PI * frac)) / 2;
  if (!isFinite(k)) k = 0;
  k = Math.max(0, Math.min(1, k));

  // frac < 0.5 is waxing (light grows on the right limb);
  // frac >= 0.5 is waning (light grows on the left limb).
  const waxing = frac < 0.5;

  // Inject the disc-only style once. We do not restyle .pn-chip.
  if (!document.getElementById("pnm-style")) {
    const st = document.createElement("style");
    st.id = "pnm-style";
    st.textContent =
      ".pnm-disc{display:inline-block;width:18px;height:18px;flex:0 0 18px;line-height:0;vertical-align:middle;}" +
      ".pnm-disc svg{display:block;width:18px;height:18px;}" +
      ".pnm-dark{fill:rgba(255,255,255,.12);}" +
      ".pnm-lit{fill:#f4eecf;}" +
      ".pnm-rim{fill:none;stroke:rgba(255,255,255,.28);stroke-width:1;}";
    document.head.appendChild(st);
  }

  // Build the disc as an SVG on a 24-unit grid.
  // The lit region is the full disc clipped by the terminator,
  // an ellipse whose x-radius shrinks toward the centre as k -> 0.5.
  const R = 11;            // disc radius in the 24-unit box
  const cx = 12, cy = 12;
  const rx = Math.abs(1 - 2 * k) * R; // terminator half-width
  const sweepOuter = waxing ? 1 : 0;  // outer arc that bounds the lit limb
  const ellipseSweep = (k < 0.5) === waxing ? 0 : 1; // bulge direction of terminator

  // Path: from top of disc, down the lit outer limb, back up the terminator.
  const top = `${cx},${cy - R}`;
  const bot = `${cx},${cy + R}`;
  const litPath =
    `M ${top} ` +
    `A ${R} ${R} 0 0 ${sweepOuter} ${bot} ` +
    `A ${rx} ${R} 0 0 ${ellipseSweep} ${top} Z`;

  const svg =
    `<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">` +
    `<circle class="pnm-dark" cx="${cx}" cy="${cy}" r="${R}"></circle>` +
    `<path class="pnm-lit" d="${litPath}"></path>` +
    `<circle class="pnm-rim" cx="${cx}" cy="${cy}" r="${R}"></circle>` +
    `</svg>`;

  // Title: a short sentence from the phase name plus its advice.
  let sentence = name + ".";
  if (advice) sentence += " A good night to " + advice + ".";
  // Always read as sentence case after the leading proper name.

  const a = document.createElement("a");
  a.className = "pn-chip";
  a.href = "moon.html";
  a.setAttribute("title", sentence);
  a.setAttribute("aria-label", "The Moon tonight: " + sentence);
  a.innerHTML =
    `<span class="pnm-disc">${svg}</span>` +
    `<span class="lbl">${name}</span>`;

  // Insert before the Explore button so the chip sits left of it.
  if (ctx.explore && ctx.explore.parentNode === ctx.tools) {
    ctx.tools.insertBefore(a, ctx.explore);
  } else {
    ctx.tools.insertBefore(a, ctx.tools.firstChild);
  }
};
