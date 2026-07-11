/* ziwei-study-chart.js — the shared study-chart state for the Purple Star hub.
   One source of truth for the visitor's own cast chart. The hero form writes here,
   the sticky bottom chart dock edits here, and every learning-track model re-renders
   from the single "psa:studychart" document event this module dispatches. No parallel
   state anywhere else.

   Persistence: ZiweiProgress prefs (localStorage zwdsSchool.v2) when the progress
   store is present, with a local fallback key ("zwdsStudyChart.v1") when it is not.

   birth = { year, month, day, hour (null | 0-23), minute (null | 0-59, display only),
             tzOffset (number | null; "auto" resolves to the device offset), gender }

   Plain browser JS. No modules. file:// safe. Idempotent. Attaches window.ZiweiStudyChart. */
(function () {
  "use strict";
  if (window.ZiweiStudyChart) return;

  var FALLBACK_KEY = "zwdsStudyChart.v1";
  var PREF_BIRTH = "studyBirth";
  var HOURS = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  var HOUR_RANGE = ["23–01", "01–03", "03–05", "05–07", "07–09", "09–11", "11–13", "13–15", "15–17", "17–19", "19–21", "21–23"];

  function prog() { return window.ZiweiProgress || null; }
  function readFallback() { try { return JSON.parse(window.localStorage.getItem(FALLBACK_KEY) || "null"); } catch (e) { return null; } }
  function writeFallback(o) { try { window.localStorage.setItem(FALLBACK_KEY, JSON.stringify(o)); } catch (e) {} }
  function deviceTz() { try { return -new Date().getTimezoneOffset() / 60; } catch (e) { return null; } }

  function normalize(b) {
    if (!b || !b.year || !b.month || !b.day) return null;
    var tzo = b.tzOffset;
    if (tzo === "auto" || tzo === "" || tzo === undefined) tzo = deviceTz();
    if (tzo !== null) { tzo = Number(tzo); if (isNaN(tzo)) tzo = null; }
    return {
      year: +b.year, month: +b.month, day: +b.day,
      hour: (b.hour === null || b.hour === undefined || b.hour === "") ? null : +b.hour,
      minute: (b.minute === null || b.minute === undefined || b.minute === "") ? null : +b.minute,
      tzOffset: tzo,
      gender: b.gender || null,
      calendar: (b.calendar === "lunar" || b.calendar === "lunar-leap") ? b.calendar : "solar"
    };
  }
  function stamp(b) { return b ? [b.year, b.month, b.day, b.hour, b.minute, b.tzOffset, b.gender, b.calendar].join("|") : ""; }

  /* cache the last cast so hour-scrubbing stays cheap */
  var castCache = { stamp: null, out: null };
  function castOf(b) {
    if (!b || !window.ZiweiData || !window.ZiweiData.lunar) return null;
    var s = stamp(b);
    if (castCache.stamp === s) return castCache.out;
    var out = null;
    try { out = window.ZiweiData.lunar.castFromBirth(b); } catch (e) { out = null; }
    castCache.stamp = s; castCache.out = out;
    return out;
  }

  function readBirth() {
    var p = prog();
    var b = p ? p.getPref(PREF_BIRTH) : null;
    if (!b) { var f = readFallback(); b = f ? f.birth : null; }
    return normalize(b);
  }
  function writeBirth(b) {
    var p = prog();
    if (p) { p.setPref(PREF_BIRTH, b); return; }
    var f = readFallback() || {};
    f.birth = b; writeFallback(f);
  }
  function broadcast(b) {
    try { document.dispatchEvent(new CustomEvent("psa:studychart", { detail: { birth: b, out: castOf(b) } })); } catch (e) {}
  }

  var API = {
    /* Save a birth (resolving tz "auto") and tell the whole page. Returns the stored birth. */
    save: function (b) {
      var n = normalize(b);
      if (!n) return null;
      writeBirth(n); broadcast(n);
      return n;
    },
    get: readBirth,
    cast: function () { return castOf(readBirth()); },
    setHour: function (hour) {
      var b = readBirth(); if (!b) return null;
      b.hour = (hour === null || hour === undefined || hour === "") ? null : +hour;
      b.minute = null; /* branch-picked hours have no exact minutes */
      writeBirth(b); broadcast(b);
      return b;
    },
    setTz: function (off) {
      var b = readBirth(); if (!b) return null;
      if (off === "auto") off = deviceTz();
      b.tzOffset = (off === null || off === undefined || off === "") ? null : Number(off);
      if (b.tzOffset !== null && isNaN(b.tzOffset)) b.tzOffset = null;
      writeBirth(b); broadcast(b);
      return b;
    },
    stamp: stamp,

    /* prefs ride the progress store when present, the fallback key when not */
    getPref: function (k) {
      var p = prog();
      if (p) return p.getPref(k);
      var f = readFallback() || {};
      return (f.prefs || {})[k];
    },
    setPref: function (k, v) {
      var p = prog();
      if (p) { p.setPref(k, v); return; }
      var f = readFallback() || {};
      f.prefs = f.prefs || {}; f.prefs[k] = v; writeFallback(f);
    },

    /* Convenience for consumers: birth + cast + display labels, or null when no chart. */
    summary: function () {
      var b = readBirth(); if (!b) return null;
      var out = castOf(b);
      var pad = function (n) { return (n < 10 ? "0" : "") + n; };
      var hi = (b.hour == null) ? null : Math.floor((b.hour + 1) / 2) % 12;
      return {
        birth: b, out: out,
        chart: out && out.chart ? out.chart : null,
        dateStr: pad(b.month) + "/" + pad(b.day) + "/" + b.year,
        hourIndex: hi,
        hourStr: hi == null ? null : HOURS[hi] + "時",
        hourRange: hi == null ? null : HOUR_RANGE[hi],
        yearName: out && out.yearPillar ? out.yearPillar.name : null,
        stamp: stamp(b)
      };
    },

    /* Small shared UI helper: a "Your chart / Worked example" pill pair.
       Hidden until setAvailable(true); the choice persists per prefKey. */
    makeToggle: function (prefKey, onChange) {
      var wrap = document.createElement("div");
      wrap.className = "psa-src-toggle"; wrap.hidden = true;
      wrap.setAttribute("role", "group"); wrap.setAttribute("aria-label", "Chart source");
      var mode = API.getPref(prefKey) === "mei" ? "mei" : "your";
      [["your", "Your chart"], ["mei", "Worked example"]].forEach(function (m) {
        var btn = document.createElement("button");
        btn.type = "button"; btn.className = "psa-src-btn"; btn.setAttribute("data-mode", m[0]);
        btn.textContent = m[1];
        btn.addEventListener("click", function () {
          if (mode === m[0]) return;
          mode = m[0]; API.setPref(prefKey, mode); paint();
          if (onChange) onChange(mode);
        });
        wrap.appendChild(btn);
      });
      function paint() {
        Array.prototype.forEach.call(wrap.children, function (btn) {
          var on = btn.getAttribute("data-mode") === mode;
          btn.classList.toggle("is-on", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
      paint();
      return {
        el: wrap,
        mode: function () { return mode; },
        setAvailable: function (ok) { wrap.hidden = !ok; }
      };
    }
  };
  window.ZiweiStudyChart = API;

  /* Restore on revisit: one broadcast, deferred a tick past DOMContentLoaded so every
     consumer (parse-time inline scripts and DOMContentLoaded initializers alike) is listening. */
  function restore() {
    window.setTimeout(function () {
      var b = readBirth();
      if (b) broadcast(b);
    }, 0);
  }
  if (document.readyState !== "loading") restore();
  else document.addEventListener("DOMContentLoaded", restore);
})();
