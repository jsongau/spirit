/* ============================================================
   ZODI AUTH — Supabase session layer for the Primal Oracle.
   Email (password) + Google OAuth only. Progressive enhancement:
   every page works logged-out; this layer adds identity on top.

   Exposes window.Zodi:
     ready            Promise that resolves once the client exists
     client()         supabase client (or null)
     session()        current session (or null)
     profile()        cached zodi_profiles row (or null)
     signUpEmail(email, pass, name)
     signInEmail(email, pass)
     signInGoogle()
     signOut()
     refreshProfile()
     onAuth(fn)       subscribe; fn(session, profile) fires on change
     tier(karma)      blessing tier object for a karma balance
     TIERS            the ladder

   Depends on: js/zodi-config.js (must load first).
   Loads @supabase/supabase-js v2 UMD from jsDelivr on demand.
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.ZODI_CONFIG || {};
  var SB_SRC = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";

  var _client = null;
  var _session = null;
  var _profile = null;
  var _subs = [];

  /* ---- Blessing ladder: karma thresholds -> status ---- */
  var TIERS = [
    { min: 100000, name: "Blessed by the Gods of Zodi", glyph: "✦", cls: "t-blessed" },
    { min: 60000,  name: "Karmic Sage",                 glyph: "☯", cls: "t-sage" },
    { min: 30000,  name: "Moonbound",                   glyph: "☽", cls: "t-moon" },
    { min: 10000,  name: "Awakened",                    glyph: "◉", cls: "t-awake" },
    { min: 2000,   name: "Seeker",                      glyph: "○", cls: "t-seeker" },
    { min: 0,      name: "Wanderer",                    glyph: "·", cls: "t-wander" }
  ];
  function tier(karma) {
    var k = Number(karma) || 0;
    for (var i = 0; i < TIERS.length; i++) if (k >= TIERS[i].min) return TIERS[i];
    return TIERS[TIERS.length - 1];
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      if (window.supabase && window.supabase.createClient) return res();
      var s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = res; s.onerror = function () { rej(new Error("supabase-js failed to load")); };
      document.head.appendChild(s);
    });
  }

  function notify() {
    for (var i = 0; i < _subs.length; i++) {
      try { _subs[i](_session, _profile); } catch (e) {}
    }
  }

  function refreshProfile() {
    if (!_client || !_session) { _profile = null; notify(); return Promise.resolve(null); }
    return _client
      .from("zodi_profiles")
      .select("id,display_name,username,avatar_key,primal_name,primal_slug,chinese_zodiac,western_sign,zodi_karma,streak_days,best_streak")
      .eq("user_id", _session.user.id)
      .maybeSingle()
      .then(function (r) { _profile = r.data || null; notify(); return _profile; })
      .catch(function () { return null; });
  }

  /* Claim karma earned while wandering (pre-account), once. */
  function claimWandering() {
    var amt = 0;
    try { amt = parseInt(localStorage.getItem("zodi_wandering") || "0", 10) || 0; } catch (e) {}
    if (!amt || !_client || !_session) return Promise.resolve();
    return _client.rpc("zodi_claim_wandering", { p_amount: amt }).then(function (r) {
      if (!r.error) { try { localStorage.removeItem("zodi_wandering"); } catch (e) {} }
    }).catch(function () {});
  }

  var ready = (function init() {
    if (!CFG.url || !CFG.anonKey) return Promise.resolve(null);
    return loadScript(SB_SRC).then(function () {
      _client = window.supabase.createClient(CFG.url, CFG.anonKey);
      _client.auth.onAuthStateChange(function (_evt, session) {
        var hadSession = !!_session;
        _session = session || null;
        if (_session && !hadSession) {
          claimWandering().then(refreshProfile);
        } else {
          refreshProfile();
        }
      });
      return _client.auth.getSession().then(function (r) {
        _session = (r.data && r.data.session) || null;
        if (_session) return claimWandering().then(refreshProfile).then(function () { return _client; });
        notify();
        return _client;
      });
    }).catch(function (e) {
      try { console.warn("[zodi-auth]", e && e.message); } catch (_e) {}
      return null;
    });
  })();

  window.Zodi = {
    ready: ready,
    TIERS: TIERS,
    tier: tier,
    client: function () { return _client; },
    session: function () { return _session; },
    profile: function () { return _profile; },
    refreshProfile: refreshProfile,
    onAuth: function (fn) { _subs.push(fn); if (_client) { try { fn(_session, _profile); } catch (e) {} } },
    signUpEmail: function (email, pass, name) {
      return ready.then(function () {
        if (!_client) throw new Error("Accounts are waking up. Try again in a moment.");
        /* Carry a pending referral code into signup metadata so the
           server can credit the ally even when the confirmation link
           is opened on another device. Harmless when absent. */
        var ref = "";
        try { ref = localStorage.getItem("zodi_pending_ref") || ""; } catch (e) {}
        return _client.auth.signUp({
          email: email, password: pass,
          options: {
            data: { full_name: name || "", ref: ref },
            emailRedirectTo: (CFG.siteUrl || location.origin) + "/account.html"
          }
        });
      });
    },
    signInEmail: function (email, pass) {
      return ready.then(function () {
        if (!_client) throw new Error("Accounts are waking up. Try again in a moment.");
        return _client.auth.signInWithPassword({ email: email, password: pass });
      });
    },
    signInGoogle: function () {
      return ready.then(function () {
        if (!_client) throw new Error("Accounts are waking up. Try again in a moment.");
        return _client.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: (CFG.siteUrl || location.origin) + "/account.html" }
        });
      });
    },
    signOut: function () {
      return ready.then(function () { if (_client) return _client.auth.signOut(); });
    }
  };
})();
