/* ============================================================
   nav-auth.js — The Primal Oracle
   RETIRED (v3, Jul 2026). The separate account pill this module used
   to inject caused the tools cluster to wrap to a second line once the
   identity chip lit up. The account states (Sign up / save it / my
   kingdom) merged into the ONE [data-id-chip] slot, owned by
   js/nav-me.js. This stub stays so cached pages that still load
   nav-auth.js get a harmless no-op instead of a 404.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };
PNAV.features = PNAV.features || {};

PNAV.features.auth = function () { /* merged into PNAV.features.me */ };
