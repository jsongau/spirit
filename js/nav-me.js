/* ============================================================
   nav-me.js — The Primal Oracle
   THE one account chip in the nav bar (v3, Jul 2026): identity and
   account merged into the single pre-rendered [data-id-chip] slot so
   the tools cluster never grows a second pill and never wraps.

   The build (apply-nav.mjs) pre-renders an empty, hidden slot
   <a class="pn-id" data-id-chip hidden> in .pn-tools; this feature
   FILLS that slot (never inserts a new element), so the right cluster
   keeps one deterministic flex order: [chip] [moon] [ring] [theme] [CTA].

   Three states:
     nothing revealed, signed out  ->  "Sign up · free"     -> /account.html
     animal revealed,  signed out  ->  animal + "save it"   -> /account.html
     animal revealed,  signed in   ->  animal + "my kingdom"-> /dashboard.html
     nothing revealed, signed in   ->  "My kingdom"         -> /dashboard.html

   Auth state is the cheap localStorage flag "zodi_signed_in", written
   by js/zodi-auth.js on pages that carry the full session layer. This
   module never loads supabase and never throws. nav-auth.js is retired
   (a no-op stub); its account pill lives here now.
   Styles live in nav-core.css, tokens only.
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

  var signedIn = false;
  try { signedIn = window.localStorage.getItem("zodi_signed_in") === "1"; } catch (e0) {}

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

  function fill(glyphChar, label, hint, href, title) {
    slot.textContent = "";
    var glyph = document.createElement("span");
    glyph.className = "pn-id-glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = glyphChar;
    var lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label;
    slot.appendChild(glyph);
    slot.appendChild(lbl);
    if (hint) {
      var h = document.createElement("span");
      h.className = "pn-id-hint";
      h.textContent = hint;
      slot.appendChild(h);
    }
    slot.setAttribute("href", href);
    slot.title = title;
    slot.setAttribute("aria-label", title);
    slot.hidden = false;
  }

  /* ---- no animal yet: the account door ---- */
  if (!result || !result.primal) {
    if (signedIn) {
      fill("✦", "My kingdom", "",
        "/dashboard.html",
        "Your kingdom: your animal, your allies, your climb");
    } else {
      fill("☽", "Sign up", "free",
        "/account.html",
        "Create your free account: save your animal, gather allies, earn Zodi Karma");
    }
    return;
  }

  /* ---- animal revealed: the animal wears the chip ---- */
  var full = "You are the " + result.primal;
  if (result.sign || result.animal) {
    full += " (" + (result.sign || "") +
      (result.sign && result.animal ? " × " : "") +
      (result.animal || "") + ")";
  }
  if (signedIn) {
    fill(result.glyph || "✦", result.primal, "my kingdom",
      "/dashboard.html",
      full + ". Open your kingdom: your allies, your ledger, your climb.");
  } else {
    fill(result.glyph || "✦", result.primal, "save it",
      "/account.html",
      full + ". Create a free account to save your animal and bank your Zodi Karma.");
  }

  /* First time this animal appears lit (the page after a reveal), play a one-time
     glow so the handoff feels earned. It never replays for the same animal. */
  try {
    var slug = result.slug || (result.primal
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    var LIT_KEY = "zodi:home-v2:chipLit";
    if (window.localStorage.getItem(LIT_KEY) !== slug) {
      injectLitStyle();
      slot.classList.add("pn-id-lit");
      window.localStorage.setItem(LIT_KEY, slug);
      window.setTimeout(function () { slot.classList.remove("pn-id-lit"); }, 2600);
    }
  } catch (e3) {}
};

function injectLitStyle() {
  if (document.getElementById("pn-id-lit-css")) return;
  var st = document.createElement("style");
  st.id = "pn-id-lit-css";
  st.textContent =
    "@media (prefers-reduced-motion:no-preference){" +
    ".pn-id.pn-id-lit{animation:pnIdLit 2.2s ease-out}" +
    "@keyframes pnIdLit{0%{opacity:0;transform:translateY(-3px) scale(.95);box-shadow:0 0 0 0 rgba(214,193,140,0)}" +
    "25%{opacity:1;transform:none;box-shadow:0 0 20px 2px rgba(214,193,140,.5)}" +
    "55%{box-shadow:0 0 26px 3px rgba(214,193,140,.42)}" +
    "100%{opacity:1;transform:none;box-shadow:0 0 0 0 rgba(214,193,140,0)}}" +
    ".pn-id.pn-id-lit .pn-id-glyph{animation:pnIdGlyph 2.2s ease-out}" +
    "@keyframes pnIdGlyph{0%{filter:none}30%{filter:drop-shadow(0 0 8px rgba(239,226,180,.9))}100%{filter:none}}" +
    "}";
  document.head.appendChild(st);
}
