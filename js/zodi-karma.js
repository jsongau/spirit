/* ============================================================
   ZODI KARMA — the behavior currency of the Primal Oracle.

   Earn map (server-enforced caps live in the zodi_award RPC):
     daily_visit      100 + streak bonus (streak × 25, cap 500) — 1/day
     reveal_animal    500 — 1/day
     proverb_read      60 — 3/day
     moon_check        80 — 1/day
     match_test       120 — 2/day
     share            150 — 1/day
     profile_complete 400 — once
     account_created 1000 — automatic on signup

   Logged out, earns accrue to localStorage("zodi_wandering"),
   capped at 2000, and are claimed automatically at first login
   (endowment: "you already carry karma — bank it").

   Public API window.ZodiKarma:
     award(kind, meta)     -> Promise<{awarded, balance, streak}>
     board(zodiac, limit)  -> Promise<rows>
     myRank()              -> Promise<{global_rank, zodiac_rank, total}>
     wandering()           -> current unclaimed anonymous karma
     fmt(n)                -> "118,000"
   Fires document event "zodi:karma" with detail {awarded, balance,
   kind} after every successful earn, and renders a floating
   "+100 Zodi Karma" toast unless data-zodi-quiet is on <body>.

   Depends on: zodi-config.js, zodi-auth.js.
   ============================================================ */
(function () {
  "use strict";
  if (!window.Zodi) return;

  var WANDER_CAP = 2000;
  var WANDER_AMTS = { daily_visit: 100, reveal_animal: 500, proverb_read: 60, moon_check: 80, match_test: 120, share: 150, daily_oracle: 25 };

  function fmt(n) {
    try { return Number(n || 0).toLocaleString("en-US"); } catch (e) { return String(n); }
  }

  function wandering() {
    try { return parseInt(localStorage.getItem("zodi_wandering") || "0", 10) || 0; } catch (e) { return 0; }
  }

  function wanderKey(kind) {
    var d = new Date();
    return "zodi_w_" + kind + "_" + d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();
  }

  function toast(text) {
    if (document.body && document.body.hasAttribute("data-zodi-quiet")) return;
    var el = document.createElement("div");
    el.className = "zodi-toast";
    el.setAttribute("role", "status");
    el.textContent = text;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("on"); });
    setTimeout(function () {
      el.classList.remove("on");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
    }, 2600);
  }

  function emit(detail) {
    try { document.dispatchEvent(new CustomEvent("zodi:karma", { detail: detail })); } catch (e) {}
  }

  function awardWandering(kind) {
    var amt = WANDER_AMTS[kind] || 0;
    if (!amt) return Promise.resolve({ awarded: 0, balance: wandering(), streak: 0 });
    try {
      if (localStorage.getItem(wanderKey(kind))) return Promise.resolve({ awarded: 0, balance: wandering(), streak: 0 });
      var cur = wandering();
      var next = Math.min(cur + amt, WANDER_CAP);
      var got = next - cur;
      localStorage.setItem("zodi_wandering", String(next));
      localStorage.setItem(wanderKey(kind), "1");
      if (got > 0) {
        toast("+" + fmt(got) + " Zodi Karma · unclaimed. Create an account to bank it.");
        emit({ awarded: got, balance: next, kind: kind, wandering: true });
      }
      return Promise.resolve({ awarded: got, balance: next, streak: 0 });
    } catch (e) {
      return Promise.resolve({ awarded: 0, balance: 0, streak: 0 });
    }
  }

  function award(kind, meta) {
    return window.Zodi.ready.then(function () {
      var client = window.Zodi.client();
      var session = window.Zodi.session();
      if (!client || !session) return awardWandering(kind);
      return client.rpc("zodi_award", { p_kind: kind, p_meta: meta || {} }).then(function (r) {
        if (r.error) return { awarded: 0, balance: 0, streak: 0 };
        var row = (r.data && r.data[0]) || { awarded: 0, balance: 0, streak: 0 };
        if (row.awarded > 0) {
          toast("+" + fmt(row.awarded) + " Zodi Karma");
          emit({ awarded: row.awarded, balance: row.balance, kind: kind, wandering: false });
          window.Zodi.refreshProfile();
        }
        return row;
      });
    });
  }

  function board(zodiac, limit) {
    return window.Zodi.ready.then(function () {
      var client = window.Zodi.client();
      if (!client) return [];
      return client.rpc("zodi_board", { p_zodiac: zodiac || null, p_limit: limit || 20 })
        .then(function (r) { return r.error ? [] : (r.data || []); });
    });
  }

  function myRank() {
    return window.Zodi.ready.then(function () {
      var client = window.Zodi.client();
      var session = window.Zodi.session();
      if (!client || !session) return null;
      return client.rpc("zodi_my_rank").then(function (r) {
        return r.error ? null : ((r.data && r.data[0]) || null);
      });
    });
  }

  window.ZodiKarma = { award: award, board: board, myRank: myRank, wandering: wandering, fmt: fmt };

  /* ---- Ambient earns wired on every page that loads this file ---- */
  document.addEventListener("DOMContentLoaded", function () {
    /* The return loop: showing up is worth something every day. */
    award("daily_visit");

    /* Proverb engagement: "Another proverb" button on the homepage. */
    var pv = document.getElementById("proverb-another");
    if (pv) pv.addEventListener("click", function () { award("proverb_read"); });

    /* Reveal: the oracle form is the core action. */
    var bf = document.getElementById("birthForm");
    if (bf) bf.addEventListener("submit", function () { setTimeout(function () { award("reveal_animal"); }, 900); });

    /* Share buttons. */
    var sh = document.getElementById("shareBtn");
    if (sh) sh.addEventListener("click", function () { award("share"); });
  });
})();
