/* ============================================================
   nav-me.js — The Primal Oracle
   The visitor's identity chip in the nav bar. The build
   (apply-nav.mjs) pre-renders an empty, hidden slot
   <a class="pn-id" data-id-chip hidden> in .pn-tools; this
   feature FILLS that slot (never inserts a new element), so the
   right cluster keeps one deterministic flex order:
   [identity] [moon] [ring] [theme] [CTA].

   Compact contract: glyph avatar + short animal name only. The
   name truncates with ellipsis via CSS (.pn-id .lbl); the full
   line lives in title/aria-label. Links to the animal's page.
   No reveal yet: the slot stays hidden entirely (no placeholder).
   Styles live in nav-core.css, tokens only. Never throws.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };
PNAV.features = PNAV.features || {};

PNAV.features.me = function (ctx) {
  if (!ctx || !ctx.tools) return;

  var scope = ctx.bar || document;
  var slot = scope.querySelector("[data-id-chip]");
  if (!slot) return; /* no pre-rendered slot: nothing to hydrate */

  var STORE_KEY = "primal_oracle_v1";        /* legacy oracle key: birth + engine */
  var HOME_KEY = "zodi:home-v2:profile";     /* what the live homepage reveal writes */
  var ENGINE = ctx.ENGINE || window.ENGINE;

  var result = null;

  /* 1) legacy path: a stored birthdate computed by the engine (only on pages that load engine.js) */
  try {
    var raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      var data = JSON.parse(raw);
      if (data && typeof data.birth === "string" && ENGINE && typeof ENGINE.compute === "function") {
        result = ENGINE.compute(data.birth);
      }
    }
  } catch (e) { result = null; }

  /* 2) fallback: the homepage profile already holds the named animal and its slug,
        so the chip renders on every page without needing the engine. */
  if (!result || !result.primal) {
    try {
      var rawH = window.localStorage.getItem(HOME_KEY);
      if (rawH) {
        var p = JSON.parse(rawH);
        if (p && p.name) result = { primal: p.name, glyph: "✦", slug: p.slug || "" };
      }
    } catch (e2) {}
  }

  /* still nothing revealed: hide the chip */
  if (!result || !result.primal) {
    slot.hidden = true;
    return;
  }

  var slug = result.slug || (result.primal
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  slot.setAttribute("href", "/animals/" + slug + "/");

  slot.textContent = "";

  var glyph = document.createElement("span");
  glyph.className = "pn-id-glyph";
  glyph.setAttribute("aria-hidden", "true");
  glyph.textContent = result.glyph || "✦";

  var lbl = document.createElement("span");
  lbl.className = "lbl";
  lbl.textContent = result.primal;

  slot.appendChild(glyph);
  slot.appendChild(lbl);

  var full = "You are the " + result.primal;
  if (result.sign || result.animal) {
    full += " (" + (result.sign || "") +
      (result.sign && result.animal ? " × " : "") +
      (result.animal || "") + ")";
  }
  slot.title = full;
  slot.setAttribute("aria-label", full + ". Read your animal.");

  slot.hidden = false;
};
