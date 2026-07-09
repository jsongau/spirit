/* ============================================================
   nav-auth.js — The Primal Oracle
   The account chip in the nav bar. Injected as its own element
   (data-acct-chip) into .pn-tools, just before the primary CTA,
   so the identity chip (nav-me.js, data-id-chip) keeps its own
   slot and its own meaning: who you are vs where your kingdom is.

   Auth state is read from the cheap localStorage flag
   "zodi_signed_in", written by js/zodi-auth.js on pages that
   carry the full session layer. This module never loads
   supabase and never throws:
     signed out  ->  "Sign up"      -> /account.html
     signed in   ->  "My kingdom"   -> /dashboard.html

   Reuses the .pn-id pill styling from nav-core.css (tokens only,
   single dark theme). The drawer picks the chip up through the
   [data-acct-chip] clone in nav.js syncChips.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };
PNAV.features = PNAV.features || {};

PNAV.features.auth = function (ctx) {
  if (!ctx || !ctx.tools) return;

  var scope = ctx.bar || document;
  if (scope.querySelector("[data-acct-chip]")) return; /* once */

  var signedIn = false;
  try { signedIn = localStorage.getItem("zodi_signed_in") === "1"; } catch (e) {}

  var a = document.createElement("a");
  a.className = "pn-id";
  a.setAttribute("data-acct-chip", "");
  if (signedIn) {
    a.href = "/dashboard.html";
    a.title = "Your kingdom: your animal, your allies, your climb";
    a.innerHTML = '<span class="pn-id-glyph" aria-hidden="true">&#10022;</span><span class="lbl">My kingdom</span>';
  } else {
    a.href = "/account.html";
    a.title = "Create your free account: save your animal, gather allies, earn the Awakened reading";
    a.innerHTML = '<span class="pn-id-glyph" aria-hidden="true">&#9789;</span><span class="lbl">Sign up</span>';
  }

  var cta = ctx.tools.querySelector(".pn-cta");
  if (cta) { ctx.tools.insertBefore(a, cta); }
  else { ctx.tools.appendChild(a); }
};
