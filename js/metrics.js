/* ============================================================
   THE PRIMAL ORACLE / Zodianimal.com : metrics.js

   A tiny, privacy-first, self-contained instrumentation shim.
   It measures ONLY the doc 08 browsing signals the redesign is
   built to move, and it measures them WITHOUT ever touching
   personal data:

     - pages per session      (a per-tab counter in sessionStorage)
     - hop-path depth          (a short breadcrumb of path-only hops)
     - descent-axis mix        (which .pf-descent cluster gets clicked)
     - per-cluster module CTR   (clicks per cluster, aggregate counts)
     - vertical / nav pulls     (clicks on .pn-row and .beast cells)

   HARD PRIVACY CONTRACT (never relaxed):
     - No PII. No birth data. No dates of birth. Ever.
     - No name, no email, no reveal result, no share URL, no query
       string, no fragment. Only path components already visible in
       the URL bar (which are public, crawlable page routes), and
       only as short, truncated breadcrumbs.
     - Nothing is SENT anywhere by default. Counters live only in
       sessionStorage / localStorage on this device. A pluggable
       window.METRICS.sink hook exists so a real, privacy-respecting
       analytics backend COULD be wired later, but it is a no-op
       until the owner explicitly sets it.
     - navigator.doNotTrack is honored: DNT on means the shim is a
       complete no-op (no storage, no listeners, no sink).
     - A global opt-out is honored: window.METRICS_OPTOUT === true,
       a <html data-metrics="off"> attribute, or a stored opt-out
       flag each fully disable the shim.
     - Degrades to nothing with JS off (this file never runs) and to
       nothing when storage is blocked (all reads/writes are guarded;
       a blocked-storage tab simply records nothing and never throws).

   No dependency on any other script. Load after DOM (defer is fine).
   Idempotent: loading twice does not double-count or double-bind.
   ============================================================ */

(function () {
  "use strict";

  /* Guard against double-injection. */
  if (window.METRICS && window.METRICS.__installed) return;

  /* ---------- storage keys (aggregate only, no PII) ---------- */
  var SESSION_KEY = "zm_session";   // per-tab: pages count + hop breadcrumb
  var TALLY_KEY   = "zm_tally";     // device-local aggregate counters
  var OPTOUT_KEY  = "zm_optout";    // persisted opt-out flag

  /* How many hops we keep in the breadcrumb. Short by design: enough
     to measure descent depth, never a full browsing history. */
  var HOP_MAX = 12;
  /* Max length of any single stored path token, truncated hard so a
     freak long URL can never balloon storage or smuggle data. */
  var PATH_MAX = 64;
  /* Max length of a cluster label we store (from the heading text). */
  var LABEL_MAX = 48;

  /* ---------- opt-out and Do-Not-Track gate ---------- */

  function dntOn() {
    try {
      var v = navigator.doNotTrack || window.doNotTrack ||
              (navigator.msDoNotTrack);
      // Browsers report "1" or "yes" when DNT is enabled.
      return v === "1" || v === 1 || v === "yes" || v === true;
    } catch (e) { return false; }
  }

  function storedOptOut() {
    try { return localStorage.getItem(OPTOUT_KEY) === "1"; }
    catch (e) { return false; }
  }

  function optedOut() {
    // A global flag any embedding page can set before load.
    try { if (window.METRICS_OPTOUT === true) return true; } catch (e) {}
    // A declarative attribute: <html data-metrics="off">.
    try {
      var root = document.documentElement;
      if (root && root.getAttribute("data-metrics") === "off") return true;
    } catch (e) {}
    // A persisted device-local choice.
    if (storedOptOut()) return true;
    return false;
  }

  /* If tracking is refused, install a fully inert no-op API and stop.
     Every method still exists so callers never crash, but nothing is
     stored, bound, or sent. */
  function installNoop(reason) {
    window.METRICS = {
      __installed: true,
      enabled: false,
      reason: reason,
      sink: function () {},          // no-op sink
      report: function () { return null; },
      optOut: persistOptOut,          // still lets a user opt out harder
      optIn: clearOptOut,             // and opt back in for next load
      note: function () {}            // manual event hook, inert here
    };
  }

  function persistOptOut() {
    try { localStorage.setItem(OPTOUT_KEY, "1"); } catch (e) {}
    // Best-effort wipe of anything already stored this session.
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    try { localStorage.removeItem(TALLY_KEY); } catch (e) {}
  }
  function clearOptOut() {
    try { localStorage.removeItem(OPTOUT_KEY); } catch (e) {}
  }

  if (dntOn())   { installNoop("dnt");    return; }
  if (optedOut()) { installNoop("optout"); return; }

  /* ---------- safe storage helpers ---------- */
  /* Every read and write is wrapped. In-memory mirrors let a
     storage-blocked tab still function within the session. */

  var memSession = null;   // in-memory fallback for the session record
  var memTally   = null;   // in-memory fallback for the tally

  function readJSON(store, key, mem) {
    try {
      var raw = store.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return mem;
  }
  function writeJSON(store, key, obj, setMem) {
    setMem(obj);
    try { store.setItem(key, JSON.stringify(obj)); } catch (e) {}
  }

  function getSession() {
    var s = readJSON(safeSession(), SESSION_KEY, memSession);
    if (!s || typeof s !== "object") s = { pages: 0, hops: [] };
    if (typeof s.pages !== "number") s.pages = 0;
    if (!Array.isArray(s.hops)) s.hops = [];
    return s;
  }
  function putSession(s) {
    writeJSON(safeSession(), SESSION_KEY, s, function (v) { memSession = v; });
  }

  function getTally() {
    var t = readJSON(safeLocal(), TALLY_KEY, memTally);
    if (!t || typeof t !== "object") t = {};
    if (!t.cluster) t.cluster = {};   // per descent-axis click counts
    if (!t.vertical) t.vertical = {}; // nav / vertical pull counts
    if (typeof t.sessions !== "number") t.sessions = 0;
    if (typeof t.pageviews !== "number") t.pageviews = 0;
    if (!t.depth) t.depth = {};       // histogram of session depths reached
    return t;
  }
  function putTally(t) {
    writeJSON(safeLocal(), TALLY_KEY, t, function (v) { memTally = v; });
  }

  /* Wrap the two Storage objects so a throwing access degrades to a
     harmless in-memory stub rather than crashing the shim. */
  function safeSession() {
    try { if (window.sessionStorage) { window.sessionStorage.getItem(SESSION_KEY); return window.sessionStorage; } } catch (e) {}
    return memStore(function (v) { memSession = v; }, function () { return memSession; });
  }
  function safeLocal() {
    try { if (window.localStorage) { window.localStorage.getItem(TALLY_KEY); return window.localStorage; } } catch (e) {}
    return memStore(function (v) { memTally = v; }, function () { return memTally; });
  }
  function memStore() {
    // Minimal Storage-shaped stub; JSON strings held in the mem mirrors
    // above via writeJSON's setMem, so getItem here just returns null and
    // lets readJSON fall back to the passed-in mem value.
    return {
      getItem: function () { return null; },
      setItem: function () {},
      removeItem: function () {}
    };
  }

  /* ---------- privacy-safe path handling ---------- */

  /* Take ONLY the pathname. Drop query and hash entirely, so no
     ?dob=, no #read?dob=, no share token, nothing personal can ride
     along. Truncate hard. This is a public route, not personal data. */
  function safePath() {
    try {
      var p = location.pathname || "/";
      // Never keep query or fragment; pathname already excludes them,
      // but truncate defensively.
      if (p.length > PATH_MAX) p = p.slice(0, PATH_MAX);
      return p;
    } catch (e) { return "/"; }
  }

  /* Same, for an in-site link href: pathname only, cross-origin
     collapsed to a neutral token so we never store an external URL. */
  function safeHrefPath(href) {
    try {
      var u = new URL(href, location.href);
      if (u.origin !== location.origin) return "(offsite)";
      var p = u.pathname || "/";
      if (p.length > PATH_MAX) p = p.slice(0, PATH_MAX);
      return p;
    } catch (e) { return "(unknown)"; }
  }

  /* ---------- session-depth capture ---------- */
  /* Fires once per page load. Increments the per-tab page counter and
     appends this page's path to a short hop breadcrumb, so we can read
     pages-per-session and hop-path depth without any personal data. */

  function recordPageView() {
    var s = getSession();
    var t = getTally();

    var firstOfSession = s.pages === 0;
    s.pages += 1;

    var path = safePath();
    // Only append when the path actually changed, so a reload does not
    // inflate hop depth (pages-per-session still counts the reload).
    var last = s.hops.length ? s.hops[s.hops.length - 1] : null;
    if (path !== last) s.hops.push(path);
    if (s.hops.length > HOP_MAX) s.hops = s.hops.slice(-HOP_MAX);

    putSession(s);

    // Device-local aggregates (never sent by default).
    t.pageviews += 1;
    if (firstOfSession) t.sessions += 1;
    // Depth histogram: bucket the current session depth.
    var b = depthBucket(s.pages);
    t.depth[b] = (t.depth[b] || 0) + 1;
    putTally(t);

    emit("pageview", {
      path: path,
      sessionPages: s.pages,
      hopDepth: s.hops.length,
      firstOfSession: firstOfSession
    });
  }

  /* Bucket labels chosen to match the doc 08 depth-3 / 5 / 10 watch. */
  function depthBucket(n) {
    if (n >= 10) return "10plus";
    if (n >= 5)  return "5to9";
    if (n >= 3)  return "3to4";
    if (n >= 2)  return "2";
    return "1";
  }

  /* ---------- descent-axis and cluster attribution ---------- */

  /* Resolve the cluster identity for a clicked descent card.
     Preference order (per scope): an explicit data attribute on the
     card or an ancestor, else the nearest cluster heading text. All
     values are non-personal UI labels. */
  function clusterOf(cardEl) {
    try {
      // 1) explicit data attribute if the generator ever stamps one.
      var withData = closestWithAttr(cardEl, "data-cluster") ||
                     closestWithAttr(cardEl, "data-axis");
      if (withData) {
        var dv = withData.getAttribute("data-cluster") ||
                 withData.getAttribute("data-axis");
        if (dv) return trimLabel(dv);
      }
      // 2) nearest cluster container's heading text.
      var cluster = closestClass(cardEl, "pf-descent-cluster") ||
                    closestClass(cardEl, "pf-descent");
      if (cluster) {
        var head = cluster.querySelector(".pf-descent-head, h2, h3");
        if (head && head.textContent) return trimLabel(head.textContent);
      }
    } catch (e) {}
    return "(unlabeled)";
  }

  function trimLabel(s) {
    s = String(s).replace(/\s+/g, " ").trim();
    if (s.length > LABEL_MAX) s = s.slice(0, LABEL_MAX);
    return s;
  }

  function closestWithAttr(el, attr) {
    while (el && el.getAttribute) {
      if (el.hasAttribute && el.hasAttribute(attr)) return el;
      el = el.parentNode;
    }
    return null;
  }
  function closestClass(el, cls) {
    while (el && el.classList) {
      if (el.classList.contains(cls)) return el;
      el = el.parentNode;
    }
    return null;
  }
  /* Walk up to the nearest element matching any of the given selectors. */
  function closestAny(el, selectors) {
    while (el && el.nodeType === 1) {
      for (var i = 0; i < selectors.length; i++) {
        if (matches(el, selectors[i])) return { el: el, sel: selectors[i] };
      }
      el = el.parentNode;
    }
    return null;
  }
  function matches(el, sel) {
    try {
      var fn = el.matches || el.msMatchesSelector || el.webkitMatchesSelector;
      return fn ? fn.call(el, sel) : false;
    } catch (e) { return false; }
  }

  /* One delegated click listener for every internal-CTR signal. */
  function onClick(ev) {
    var target = ev.target;
    if (!target) return;

    // Descent module card: attribute the click to its cluster.
    var descent = closestAny(target, [".pf-descent-card"]);
    if (descent) {
      var label = clusterOf(descent.el);
      var t = getTally();
      t.cluster[label] = (t.cluster[label] || 0) + 1;
      putTally(t);
      emit("descentClick", {
        cluster: label,
        to: safeHrefPath(descent.el.getAttribute("href"))
      });
      return;
    }

    // Vertical / nav pulls: nav rows and menagerie cells.
    var vert = closestAny(target, [".pn-row", ".beast"]);
    if (vert) {
      var kind = vert.sel === ".pn-row" ? "nav-row" : "menagerie-cell";
      var tt = getTally();
      tt.vertical[kind] = (tt.vertical[kind] || 0) + 1;
      putTally(tt);
      emit("verticalClick", {
        kind: kind,
        to: safeHrefPath(vert.el.getAttribute("href"))
      });
    }
  }

  /* ---------- the pluggable sink (default no-op) ---------- */
  /* emit() updates local aggregates already; then it offers the event
     to window.METRICS.sink. By default sink is a no-op, so NOTHING
     leaves the device. A privacy-respecting backend can be wired by
     the owner later simply by assigning window.METRICS.sink. The
     payloads passed here are already PII-free (paths and UI labels
     only), but a real sink is still responsible for its own consent
     and transport. */
  function emit(type, payload) {
    try {
      if (window.METRICS && typeof window.METRICS.sink === "function") {
        window.METRICS.sink(type, payload);
      }
    } catch (e) {}
  }

  /* ---------- public API ---------- */
  window.METRICS = {
    __installed: true,
    enabled: true,
    /* Default no-op sink. Assign your own (type, payload) => void to
       forward the already-anonymous events to a real backend. */
    sink: function () {},
    /* Read the device-local aggregates (for a private, on-device
       debug view). Returns a plain object; never sent anywhere. */
    report: function () {
      try {
        var s = getSession();
        var t = getTally();
        return {
          sessionPages: s.pages,
          hopDepth: s.hops.length,
          hops: s.hops.slice(),          // path-only breadcrumb
          totalSessions: t.sessions,
          totalPageviews: t.pageviews,
          depthHistogram: t.depth,
          descentAxisMix: t.cluster,       // per-cluster CTR counts
          verticalPulls: t.vertical
        };
      } catch (e) { return null; }
    },
    /* A manual, PII-free event hook other scripts may call. Only a
       type and a plain, non-personal detail object are accepted; it
       is forwarded to the sink and never persisted with any identity. */
    note: function (type, detail) {
      if (!type) return;
      emit(String(type), detail && typeof detail === "object" ? detail : {});
    },
    /* Let a user turn tracking off (persists) or back on. */
    optOut: function () {
      persistOptOut();
      window.METRICS.enabled = false;
    },
    optIn: clearOptOut
  };

  /* ---------- boot ---------- */
  function boot() {
    try { recordPageView(); } catch (e) {}
    try {
      document.addEventListener("click", onClick, true);
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
