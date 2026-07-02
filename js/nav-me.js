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

  var STORE_KEY = "primal_oracle_v1";
  var ENGINE = ctx.ENGINE || window.ENGINE;

  /* read saved state safely */
  var birth = "";
  try {
    var raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      var data = JSON.parse(raw);
      if (data && typeof data.birth === "string") birth = data.birth;
    }
  } catch (e) {
    birth = "";
  }

  var result = null;
  if (birth && ENGINE && typeof ENGINE.compute === "function") {
    try {
      result = ENGINE.compute(birth);
    } catch (e) {
      result = null;
    }
  }

  /* no reveal (or no engine on this page): hide the chip entirely */
  if (!result || !result.primal) {
    slot.hidden = true;
    return;
  }

  var slug = result.primal
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
