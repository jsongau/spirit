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
     animal revealed,  signed out  ->  animal only          -> opens the id modal
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
    fill(result.glyph || "✦", result.primal, "",
      "/account.html",
      full + ". Save it with a free account, or start over.");
    slot.addEventListener("click", function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button === 1) return;
      ev.preventDefault();
      pnMeOpenModal(result.primal);
    });
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

/* ============================================================
   The identity modal. Opens from the chip once an animal is revealed
   and the visitor is signed out. Two doors: go deeper (a free account
   saves the animal and opens the Primal Mirror) or start over (clear
   the saved animal and return to the birth-date entry). Built once,
   appended to <body>, dismissible by X, click outside, and Esc.
   ============================================================ */

var PN_ME_CLEAR_KEYS = [
  "zodi:home-v2:profile",  /* the homepage reveal (name + slug), homepage-v2.js */
  "primal_oracle_v1",      /* legacy oracle store (birth + engine) */
  "zodi:home-v2:chipLit",  /* the one-time chip glow marker */
  "zodi_birth"             /* the saved birth date, zodi-birth.js */
];

function pnMeStartOver() {
  try {
    for (var i = 0; i < PN_ME_CLEAR_KEYS.length; i++) {
      window.localStorage.removeItem(PN_ME_CLEAR_KEYS[i]);
    }
  } catch (e) {}
  window.location.href = "/index.html";
}

function pnMeCloseModal() {
  var m = document.getElementById("pn-me-modal");
  if (m) m.hidden = true;
  document.removeEventListener("keydown", pnMeOnKey);
  var chip = document.querySelector("[data-id-chip]");
  if (chip) { try { chip.focus(); } catch (e) {} }
}

function pnMeOnKey(ev) {
  if (ev.key === "Escape") pnMeCloseModal();
}

function pnMeAct(el, title, sub) {
  var t = document.createElement("span");
  t.className = "pnme-act-t";
  t.textContent = title;
  var s = document.createElement("span");
  s.className = "pnme-act-s";
  s.textContent = sub;
  el.appendChild(t);
  el.appendChild(s);
  return el;
}

function pnMeBuildModal() {
  if (!document.getElementById("pn-me-modal-css")) {
    var st = document.createElement("style");
    st.id = "pn-me-modal-css";
    st.textContent =
      "#pn-me-modal{position:fixed;inset:0;z-index:6000;display:flex;align-items:center;justify-content:center;padding:20px}" +
      "#pn-me-modal[hidden]{display:none}" +
      ".pnme-veil{position:absolute;inset:0;background:rgba(8,8,14,.62)}" +
      ".pnme-card{position:relative;width:100%;max-width:26rem;background:var(--panel,#232134);" +
        "border:1px solid var(--line,rgba(214,193,140,.2));border-radius:14px;padding:26px 24px 22px;" +
        "color:var(--ivory,#e9e4d8);box-shadow:0 24px 60px rgba(0,0,0,.5);outline:none}" +
      ".pnme-x{position:absolute;top:10px;right:10px;background:none;border:0;padding:6px 9px;" +
        "font-size:1.05rem;line-height:1;color:var(--muted,#9b97a8);cursor:pointer;border-radius:8px}" +
      ".pnme-x:hover,.pnme-x:focus-visible{color:var(--moon,#f5ecd2)}" +
      ".pnme-h{margin:0 0 14px;padding-right:26px;font:600 1.3rem/1.25 var(--serif,Georgia,serif);color:var(--moon,#f5ecd2)}" +
      ".pnme-act{display:block;width:100%;text-align:left;box-sizing:border-box;background:var(--field,rgba(0,0,0,.25));" +
        "border:1px solid var(--line,rgba(214,193,140,.2));border-radius:10px;padding:12px 14px;margin-top:10px;" +
        "color:inherit;font:inherit;cursor:pointer}" +
      ".pnme-act:hover,.pnme-act:focus-visible{border-color:var(--brass,#c9a961)}" +
      "a.pnme-act{text-decoration:none}" +
      ".pnme-act-t{display:block;font-weight:600;color:var(--brass-bright,#e8d5a4)}" +
      ".pnme-act-s{display:block;margin-top:3px;font-size:.9rem;color:var(--muted,#9b97a8)}";
    document.head.appendChild(st);
  }
  var m = document.createElement("div");
  m.id = "pn-me-modal";
  m.hidden = true;
  var veil = document.createElement("div");
  veil.className = "pnme-veil";
  veil.addEventListener("click", pnMeCloseModal);
  var card = document.createElement("div");
  card.className = "pnme-card";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-modal", "true");
  card.setAttribute("aria-labelledby", "pn-me-modal-h");
  card.tabIndex = -1;
  var x = document.createElement("button");
  x.type = "button";
  x.className = "pnme-x";
  x.setAttribute("aria-label", "Close");
  x.textContent = "✕";
  x.addEventListener("click", pnMeCloseModal);
  var h = document.createElement("h2");
  h.className = "pnme-h";
  h.id = "pn-me-modal-h";
  var go = document.createElement("a");
  go.className = "pnme-act";
  go.href = "/account.html";
  pnMeAct(go, "Go deeper",
    "Create a free account to save your animal and open the Primal Mirror.");
  var over = document.createElement("button");
  over.type = "button";
  over.className = "pnme-act";
  over.addEventListener("click", pnMeStartOver);
  pnMeAct(over, "Start over",
    "Clear this animal and enter a new birth date.");
  card.appendChild(x);
  card.appendChild(h);
  card.appendChild(go);
  card.appendChild(over);
  m.appendChild(veil);
  m.appendChild(card);
  document.body.appendChild(m);
  return m;
}

function pnMeOpenModal(animal) {
  var m = document.getElementById("pn-me-modal") || pnMeBuildModal();
  var h = document.getElementById("pn-me-modal-h");
  if (h) h.textContent = "You are the " + animal;
  m.hidden = false;
  document.addEventListener("keydown", pnMeOnKey);
  var card = m.querySelector(".pnme-card");
  if (card) { try { card.focus(); } catch (e) {} }
}
