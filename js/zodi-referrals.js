/* ============================================================
   ZODI REFERRALS — the Animal Kingdom layer.
   Five allies who create accounts through your link open the
   Awakened State of your animal.

   What this file does, on every page it loads on:
     1. Catches ?ref=CODE from the address bar and keeps it in
        localStorage("zodi_pending_ref") until an account exists.
     2. After sign-in, claims the referral once via the
        zodi_claim_referral RPC (idempotent server-side; safe to
        retry). Mirrors the zodi_wandering claim pattern.
     3. Exposes window.ZodiRef for the dashboard and awakened
        pages: state(), link(), stageLine(), pending(), GOAL.
     4. On the homepage, adds a small "Save this animal" card
        under the reveal readout (#roCard).

   Works with or without zodi-auth.js on the page: capture and
   the nudge need nothing; claiming and state() need window.Zodi.
   Depends on (optional): zodi-config.js, zodi-auth.js.
   ============================================================ */
(function () {
  "use strict";

  var GOAL = 5;
  var CFG = window.ZODI_CONFIG || {};
  var LINK_BASE = CFG.siteUrl || "https://www.zodianimal.com";

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ---- 1. Catch ?ref= on any landing page ---- */
  (function capture() {
    var code = null;
    try { code = new URLSearchParams(location.search).get("ref"); } catch (e) {}
    if (!code) return;
    code = String(code).toUpperCase().replace(/[^A-Z0-9-]/g, "");
    if (!/^[A-Z0-9-]{4,40}$/.test(code)) return;
    if (!lsGet("zodi_pending_ref")) lsSet("zodi_pending_ref", code);
    /* a fresh invitation reopens the claim for accounts that settled earlier */
    lsDel("zodi_ref_settled");
  })();

  function pending() { return lsGet("zodi_pending_ref"); }

  /* ---- 2. Claim once, after the first signed-in session ----
     The RPC also reads the code stashed in signup metadata, so a
     confirmation link opened on another device still credits the
     ally. Statuses that end the matter locally: */
  var PERMANENT = { claimed: 1, already_referred: 1, self_referral: 1, code_not_found: 1, no_code: 1 };
  var claiming = false;

  function attemptClaim() {
    if (!window.Zodi || claiming) return;
    if (lsGet("zodi_ref_settled")) return;
    var client = window.Zodi.client(), session = window.Zodi.session();
    if (!client || !session) return;
    claiming = true;
    client.rpc("zodi_claim_referral", { p_ref_code: pending() }).then(function (r) {
      claiming = false;
      if (r.error) return; /* transient; retried on the next auth event */
      var status = r.data && r.data.status;
      if (PERMANENT[status]) { lsSet("zodi_ref_settled", "1"); lsDel("zodi_pending_ref"); }
      if (status === "claimed") {
        try { document.dispatchEvent(new CustomEvent("zodi:ally-claimed", { detail: r.data })); } catch (e) {}
      }
    }).catch(function () { claiming = false; });
  }

  if (window.Zodi) {
    window.Zodi.onAuth(function (session) { if (session) attemptClaim(); });
  }

  /* ---- 3. Kingdom state for logged-in pages ---- */
  var _state = null;
  function state(force) {
    if (!window.Zodi) return Promise.resolve(null);
    if (_state && !force) return Promise.resolve(_state);
    return window.Zodi.ready.then(function () {
      var client = window.Zodi.client(), session = window.Zodi.session();
      if (!client || !session) return null;
      return client.rpc("zodi_referral_state").then(function (r) {
        if (r.error || !r.data || r.data.status !== "ok") return null;
        _state = r.data;
        return _state;
      });
    });
  }

  function link(code) { return LINK_BASE + "/?ref=" + encodeURIComponent(code || ""); }

  /* ---- The twelve medallions: every soul picks a mark ---- */
  var AVATARS = [
    { key: "north-star", glyph: "✦", hue: "brass" },
    { key: "ember-star", glyph: "✧", hue: "rose"  },
    { key: "young-moon", glyph: "☽", hue: "moon"  },
    { key: "old-moon",   glyph: "☾", hue: "violet"},
    { key: "half-moon",  glyph: "◐", hue: "sky"   },
    { key: "dark-moon",  glyph: "●", hue: "ink"   },
    { key: "full-moon",  glyph: "○", hue: "moon"  },
    { key: "sun-disc",   glyph: "☉", hue: "brass" },
    { key: "moon-bloom", glyph: "❋", hue: "jade"  },
    { key: "flare",      glyph: "✺", hue: "rose"  },
    { key: "six-rays",   glyph: "✶", hue: "sky"   },
    { key: "lantern",    glyph: "❂", hue: "violet"}
  ];
  function avatar(key) {
    for (var i = 0; i < AVATARS.length; i++) if (AVATARS[i].key === key) return AVATARS[i];
    return AVATARS[0];
  }

  function stageLine(n) {
    n = Number(n) || 0;
    if (n <= 0) return "No allies yet. The deeper form of your animal sleeps until five stand with you.";
    if (n === 1) return "One ally has crossed. Four more and your Awakened State opens.";
    if (n < GOAL) return n + " of 5 allies stand with you. The Awakened State is forming.";
    return "Five allies stand with you. Your Awakened State is open.";
  }

  window.ZodiRef = {
    GOAL: GOAL,
    AVATARS: AVATARS,
    avatar: avatar,
    pending: pending,
    claim: attemptClaim,
    state: state,
    link: link,
    stageLine: stageLine
  };

  /* ---- 4. Homepage nudge under the reveal ---- */
  function nudgeCss() {
    if (document.getElementById("zref-style")) return;
    var st = document.createElement("style");
    st.id = "zref-style";
    st.textContent =
      ".zref-save{margin-top:14px;padding:16px 20px;border:1px dashed var(--line,rgba(214,193,140,.18));" +
      "border-radius:14px;background:var(--panel,#151728);display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}" +
      ".zref-save p{margin:0;font-size:.88rem;color:var(--muted,#adaec2)}" +
      ".zref-btn{display:inline-block;padding:9px 20px;border-radius:999px;border:1px solid var(--brass,#d6c18c);" +
      "color:var(--brass-bright,#efe2b4);font-size:.85rem;font-weight:600;white-space:nowrap}" +
      ".zref-btn:hover{background:rgba(214,193,140,.12)}";
    document.head.appendChild(st);
  }

  function revealNudge(profile) {
    var host = document.getElementById("roCard");
    if (!host || !host.parentNode || document.getElementById("zref-save")) return;
    if (!profile || !profile.name) return;
    nudgeCss();
    var card = document.createElement("div");
    card.id = "zref-save";
    card.className = "zref-save";
    var p = document.createElement("p");
    p.textContent = "The wheel keeps the " + profile.name + " on this device only. Your account keeps it everywhere.";
    var a = document.createElement("a");
    a.className = "zref-btn";
    a.href = "/account.html";
    a.textContent = "Save this animal";
    a.addEventListener("click", function () {
      try { localStorage.setItem("zodi_pending_animal", JSON.stringify(profile)); } catch (e) {}
      lsSet("zodi_next", "/dashboard.html");
    });
    card.appendChild(p);
    card.appendChild(a);
    host.parentNode.insertBefore(card, host.nextSibling);
  }

  window.addEventListener("zodi:revealed", function (ev) { revealNudge(ev.detail); });
  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("roCard")) return;
    var p = null;
    try { p = JSON.parse(localStorage.getItem("zodi:home-v2:profile") || "null"); } catch (e) {}
    if (p) revealNudge(p);
  });
})();
