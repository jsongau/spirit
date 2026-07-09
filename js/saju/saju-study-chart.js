/* saju-study-chart.js — the shared study-chart state for the Saju Palja (사주팔자) hub.
   One source of truth for the visitor's own cast chart. The hero/birth form writes here,
   the sticky bottom dock edits here, and every learning-track model re-renders from the
   single "saju:studychart" document event this module dispatches. No parallel state
   anywhere else. Mirrors js/ziwei/ziwei-study-chart.js; the concepts that transfer keep
   ziwei's names, the ones that do not are named for Saju (see the header notes below).

   birth = { year, month, day,
             hour (null | 0-23), minute (null | 0-59),
             calendar ("solar" | "lunar" | "lunar-leap"),
             place ({ key, lon, utcOffset (number | null) } | null),
             sex ("male" | "female" | null),
             dayBoundary ("midnight" | "zi2300") }

   Persistence: a local key ("sajuStudyChart.v1") holding { birth, prefs }, wrapped behind
   prog() so a future Saju progress store can be dropped in behind the same getPref/setPref
   seam without touching consumers. This page has NO progress store today (verified: no
   SajuProgress) — unlike ziwei, which rides ZiweiProgress when present.

   THE GUARD THE WHOLE PATTERN RESTS ON: stamp() INCLUDES THE HOUR. Any consumer that
   prefills an input the reader can also type into (a year box, an age box) must re-feed
   only when the birth DATE changes — guard on birthKey(birth) ("year-month-day"), NEVER
   on stamp(). Guarding on the stamp re-feeds on every hour-beam scrub and stomps whatever
   the reader typed. (ZWDS round 4; paid for in bugs.)

   Never fabricate: if the engine returns { error } or pillars:null (a lunar-refused birth
   with no converter, or an out-of-range date), summary() returns chart:null / element:null
   / animal:null and does NOT throw. A refused birth is a legitimate state, not an error.

   Plain browser JS. No modules. file:// safe. Idempotent. Attaches window.SajuStudyChart. */
(function () {
  "use strict";
  if (window.SajuStudyChart) return;

  var FALLBACK_KEY = "sajuStudyChart.v1";
  var PREF_BIRTH = "studyBirth";
  /* Korean two-hour branches, 자시 … 해시. Display labels for the naive clock→branch map. */
  var HOURS_KO = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  var HOUR_RANGE = ["23–01", "01–03", "03–05", "05–07", "07–09", "09–11", "11–13", "13–15", "15–17", "17–19", "19–21", "21–23"];

  /* Seam for a future Saju progress store; null today, so everything rides the fallback. */
  function prog() { return window.SajuProgress || null; }
  function readFallback() { try { return JSON.parse(window.localStorage.getItem(FALLBACK_KEY) || "null"); } catch (e) { return null; } }
  function writeFallback(o) { try { window.localStorage.setItem(FALLBACK_KEY, JSON.stringify(o)); } catch (e) {} }

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function num(v) { var n = Number(v); return isNaN(n) ? null : n; }

  function normPlace(p) {
    if (!p) return null;
    var lon = (p.lon === null || p.lon === undefined || p.lon === "") ? null : num(p.lon);
    if (lon === null) return null;
    var uo = (p.utcOffset === null || p.utcOffset === undefined || p.utcOffset === "") ? null : num(p.utcOffset);
    return { key: p.key || null, lon: lon, utcOffset: uo };
  }

  function normalize(b) {
    if (!b || !b.year || !b.month || !b.day) return null;
    var cal = (b.calendar === "lunar" || b.calendar === "lunar-leap") ? b.calendar : "solar";
    var db = (b.dayBoundary === "zi2300") ? "zi2300" : "midnight";
    return {
      year: +b.year, month: +b.month, day: +b.day,
      hour: (b.hour === null || b.hour === undefined || b.hour === "") ? null : +b.hour,
      minute: (b.minute === null || b.minute === undefined || b.minute === "") ? null : +b.minute,
      calendar: cal,
      place: normPlace(b.place),
      /* "both" is a real engine input, not a typo. castChart returns daeun_both —
         a male-forward AND a female-reverse timeline for the same chart — when
         sex === "both" (saju-engine.js:591). The form offers it. Omitting it here
         silently deleted the 대운 timeline: the store's schema was narrower than
         the engine's. Widen the store, never quietly drop a value the form sends. */
      sex: (b.sex === "male" || b.sex === "female" || b.sex === "both") ? b.sex : null,
      dayBoundary: db
    };
  }

  /* stamp() INCLUDES THE HOUR (and everything the cast depends on) so hour-scrubbing
     re-casts. Do not prefill-guard on it — use birthKey(). */
  function stamp(b) {
    if (!b) return "";
    var pl = b.place ? [b.place.key, b.place.lon, b.place.utcOffset].join(",") : "";
    return [b.year, b.month, b.day, b.hour, b.minute, b.calendar, pl, b.sex, b.dayBoundary].join("|");
  }
  /* The prefill key: birth DATE only. Stable across hour scrubs. */
  function birthKey(b) { return b ? (b.year + "-" + b.month + "-" + b.day) : ""; }

  /* Build the engine input from a normalized birth. This is where the Korean-longitude
     guard lives. */
  function buildInput(b) {
    if (!b) return null;
    var input = {
      date: b.year + "-" + pad(b.month) + "-" + pad(b.day),
      calendar: b.calendar || "solar"
    };
    if (b.hour === null || b.hour === undefined) input.unknownTime = true;
    else input.time = pad(b.hour) + ":" + pad(b.minute == null ? 0 : b.minute);
    if (b.sex) input.sex = b.sex;
    if (b.place && b.place.lon != null) {
      input.lon = Number(b.place.lon);
      /* KOREAN-LONGITUDE GUARD (a sibling worker already caught this regression):
         the engine derives stdMeridian = utcOffset * 15 whenever input.utcOffset is
         present, which forces 135°E and silently regresses its era-meridian table. For
         Korean longitudes (124–132°E) we must WITHHOLD utcOffset so the engine's era
         branch resolves the correct standard meridian — a 1955 Seoul birth must land on
         127.5°E / GMT+8:30, not 135. Foreign longitudes still need utcOffset, or the
         engine refuses the correction (FOREIGN_LONGITUDE_NO_OFFSET) rather than applying
         the Korean meridian to a foreign place. */
      var korean = input.lon >= 124 && input.lon <= 132;
      if (!korean && b.place.utcOffset != null) input.utcOffset = Number(b.place.utcOffset);
    }
    return input;
  }

  function profileOf(b) { return { dayBoundary: (b && b.dayBoundary === "zi2300") ? "zi2300" : "midnight" }; }
  /* Feature-detect the lunar converter; the engine takes it via opts.lunar and never imports it. */
  function lunarOpts() { return window.SajuLunar ? { lunar: window.SajuLunar } : {}; }

  /* Derived, never persisted: cache the last cast keyed on the stamp so hour-scrubbing
     stays cheap (one engine call per distinct birth+hour). */
  var castCache = { stamp: null, out: null };
  function castOf(b) {
    if (!b || !window.SajuEngine || !window.SajuEngine.castChart) return null;
    var s = stamp(b);
    if (castCache.stamp === s) return castCache.out;
    var out = null;
    try { out = window.SajuEngine.castChart(buildInput(b), profileOf(b), lunarOpts()); } catch (e) { out = null; }
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
    try { document.dispatchEvent(new CustomEvent("saju:studychart", { detail: { birth: b, out: castOf(b) } })); } catch (e) {}
  }

  var API = {
    /* Save a birth, persist it, and tell the whole page. Returns the stored (normalized) birth. */
    save: function (b) {
      var n = normalize(b);
      if (!n) return null;
      writeBirth(n); broadcast(n);
      return n;
    },
    get: readBirth,
    cast: function () { return castOf(readBirth()); },
    stamp: stamp,
    birthKey: birthKey,

    /* The hour beam calls this on every scrub: set the hour, clear the minute (a branch-picked
       hour has no exact minute), persist, broadcast. The whole page re-casts. */
    setHour: function (hour) {
      var b = readBirth(); if (!b) return null;
      b.hour = (hour === null || hour === undefined || hour === "") ? null : +hour;
      b.minute = null;
      writeBirth(b); broadcast(b);
      return b;
    },
    setPlace: function (place) {
      var b = readBirth(); if (!b) return null;
      b.place = normPlace(place);
      writeBirth(b); broadcast(b);
      return b;
    },
    setDayBoundary: function (v) {
      var b = readBirth(); if (!b) return null;
      b.dayBoundary = (v === "zi2300") ? "zi2300" : "midnight";
      writeBirth(b); broadcast(b);
      return b;
    },

    /* prefs ride the progress store when present, the fallback key when not.
       Known prefs: sajuPalette ("tradition"|"moonlight"), sajuDockState ("open"|"min"|"closed"),
       sajuSound (bool). */
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

    /* Convenience for consumers: birth + cast + display labels + the Day Master's element,
       or nulls where there is no chart. NEVER throws on a refused/erroring cast.
       NOTE: prefill guards must key on birthKey(birth), NOT on stamp — stamp includes the hour. */
    summary: function () {
      var b = readBirth(); if (!b) return null;
      var out = castOf(b);
      var ok = !!(out && !out.error && out.pillars);
      var hi = (b.hour == null) ? null : Math.floor((b.hour + 1) / 2) % 12; /* naive clock→branch, display only */
      var dm = ok && out.day_master ? out.day_master : null;
      var yearBranch = ok && out.pillars.year ? out.pillars.year.branch : null;
      return {
        birth: b,
        out: out,
        chart: ok ? out.pillars : null,
        dateStr: pad(b.month) + "/" + pad(b.day) + "/" + b.year,
        hourIndex: hi,
        hourStr: hi == null ? null : HOURS_KO[hi] + "시",
        hourRange: hi == null ? null : HOUR_RANGE[hi],
        dayMaster: dm,
        element: dm && dm.element ? String(dm.element).toLowerCase() : null,
        animal: yearBranch ? yearBranch.animal : null,
        stamp: stamp(b)
      };
    },

    /* Small shared UI helper: a two-state pill pair, hidden until setAvailable(true), choice
       persisted per prefKey. Unlike ziwei's fixed "Your chart / Worked example" pair, the
       labels are passed in — this toggle also drives the palette (전통 / Moonlight), etc.
         labels = [[valueA, "Label A"], [valueB, "Label B"]]  (valueA is the default). */
    makeToggle: function (prefKey, labels, onChange) {
      labels = labels || [["a", "A"], ["b", "B"]];
      var A = labels[0][0], B = labels[1][0];
      var wrap = document.createElement("div");
      wrap.className = "saju-src-toggle"; wrap.hidden = true;
      wrap.setAttribute("role", "group"); wrap.setAttribute("aria-label", "Chart source");
      var mode = API.getPref(prefKey) === B ? B : A;
      labels.forEach(function (m) {
        var btn = document.createElement("button");
        btn.type = "button"; btn.className = "saju-src-btn"; btn.setAttribute("data-mode", m[0]);
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
  window.SajuStudyChart = API;

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
