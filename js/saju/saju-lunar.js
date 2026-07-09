/* ============================================================
   saju-lunar.js — 음력 → 양력 (lunar → solar/Gregorian) converter
   ------------------------------------------------------------
   Supplies the lunar converter that saju-engine.js feature-detects
   (window.SajuLunar.lunarToSolar, or opts.lunar injection). Without
   it the engine REFUSES lunar input rather than misread a lunar date
   string as a solar one. This module makes 음력-only birthdays castable.

   STRATEGY (a): reuse the new-moon / solar-term machinery.
   ------------------------------------------------------------
   ziwei-lunar.js already assembles the Chinese lunar month table from
   astronomy (Meeus new moons + apparent-solar-longitude terms, 定朔定氣
   numbering, the no-中氣 leap rule). We do NOT invent an ephemeris and we
   do NOT edit ziwei-lunar.js. Instead we RE-DERIVE the identical machinery
   here (verbatim copies of its newMoonJD / solarTermJD / buildCycle /
   cnyCdate, etc.) so this file is self-contained, file:// safe, and does
   not depend on ziwei being loaded first. We then build the numbered
   month table for the requested lunar year and index straight into it —
   O(1)-ish, no search, and the month boundaries are the SAME civil-day
   (UTC+8) boundaries ziwei-lunar uses, so lunarToSolar is the exact
   inverse of ziwei-lunar's solarToLunar by construction.

   Why not strategy (b) (invert solarToLunar by bounded search): it is
   slower and would silently inherit any bug in solarToLunar. Re-deriving
   the tables is direct AND we still guard against drift: the test suite
   round-trips MY lunarToSolar against ziwei-lunar's SHIPPED solarToLunar
   for hundreds of dates, so if the two ephemerides ever diverge the round
   trip goes red immediately.

   윤달 (leap months) are never guessed. isLeapMonth is an explicit
   argument; asking for a leap month in a year that has none THROWS. A lunar
   30th in a 29-day month does not exist and is rejected, never clamped.
   Supported lunar years: 1900–2100 (Meeus low-precision range); outside
   that we throw. Only 1985–2026 is independently harness-verified in
   ziwei-lunar; the wider range is astronomy, not a lookup table.

   Plain browser JS. UMD (module.exports + browser global SajuLunar).
   var/function only, no arrows, no template literals. Idempotent, zero deps.
   ============================================================ */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else if (!root.SajuLunar) root.SajuLunar = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var MIN_YEAR = 1900, MAX_YEAR = 2100;

  var RAD = Math.PI / 180;
  function norm360(x) { x %= 360; return x < 0 ? x + 360 : x; }

  /* --- astronomy: verbatim from ziwei-lunar.js (which we may not edit) --- */

  /* Sun apparent ecliptic longitude (deg), low-precision Meeus ch.25 (~0.01°). */
  function sunLon(jd) {
    var T = (jd - 2451545) / 36525;
    var L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    var M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * RAD)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * M * RAD)
          + 0.000289 * Math.sin(3 * M * RAD);
    var om = 125.04 - 1934.136 * T;
    return norm360(L0 + C - 0.00569 - 0.00478 * Math.sin(om * RAD));
  }

  /* JD at 00:00 UT for a Gregorian date. */
  function jdFromYMD(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4)
      - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045 - 0.5;
  }

  /* JD when the Sun reaches ecliptic longitude `t` (deg) in the given year. */
  function solarTermJD(year, t) {
    var jd = jdFromYMD(year, 1, 1) + ((t - 280 + 360) % 360);
    for (var i = 0; i < 8; i++) { var diff = ((t - sunLon(jd) + 540) % 360) - 180; jd += diff * 365.25 / 360; }
    return jd;
  }

  /* New moon JD for lunation index k (Meeus 49). */
  function newMoonJD(k) {
    var T = k / 1236.85;
    var jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T * T - 0.00000015 * T * T * T + 0.00000000073 * T * T * T * T;
    var M = norm360(2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T * T * T);
    var Mp = norm360(201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T * T * T - 0.000000058 * T * T * T * T);
    var F = norm360(160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T * T * T + 0.000000011 * T * T * T * T);
    var Om = norm360(124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T);
    var E = 1 - 0.002516 * T - 0.0000074 * T * T, c = 0;
    c += -0.40720 * Math.sin(Mp * RAD);
    c += 0.17241 * E * Math.sin(M * RAD);
    c += 0.01608 * Math.sin(2 * Mp * RAD);
    c += 0.01039 * Math.sin(2 * F * RAD);
    c += 0.00739 * E * Math.sin((Mp - M) * RAD);
    c += -0.00514 * E * Math.sin((Mp + M) * RAD);
    c += 0.00208 * E * E * Math.sin(2 * M * RAD);
    c += -0.00111 * Math.sin((Mp - 2 * F) * RAD);
    c += -0.00057 * Math.sin((Mp + 2 * F) * RAD);
    c += 0.00056 * E * Math.sin((2 * Mp + M) * RAD);
    c += -0.00042 * Math.sin(3 * Mp * RAD);
    c += 0.00042 * E * Math.sin((M + 2 * F) * RAD);
    c += 0.00038 * E * Math.sin((M - 2 * F) * RAD);
    c += -0.00024 * E * Math.sin((2 * Mp - M) * RAD);
    c += -0.00017 * Math.sin(Om * RAD);
    c += -0.00007 * Math.sin((Mp + 2 * M) * RAD);
    c += 0.00004 * Math.sin((2 * Mp - 2 * F) * RAD);
    c += 0.00004 * Math.sin(3 * M * RAD);
    c += 0.00003 * Math.sin((Mp + M - 2 * F) * RAD);
    c += 0.00003 * Math.sin((2 * Mp + 2 * F) * RAD);
    c += -0.00003 * Math.sin((Mp + M + 2 * F) * RAD);
    c += 0.00003 * Math.sin((Mp - M + 2 * F) * RAD);
    c += -0.00002 * Math.sin((Mp - M - 2 * F) * RAD);
    c += -0.00002 * Math.sin((3 * Mp + M) * RAD);
    c += 0.00002 * Math.sin(4 * Mp * RAD);
    return jde + c;
  }

  /* Civil date number (JDN) in China standard time (UTC+8) for an instant JD. */
  function cdate8(jd) { return Math.floor(jd + 0.5 + 8 / 24); }

  /* Gregorian [y,m,d] from a civil day number (JDN). Inverse of jdFromYMD's
     integer part; verified in-suite as the exact inverse of jdnCivil. */
  function ymdFromCdate(cd) {
    var a = cd + 32044, b = Math.floor((4 * a + 3) / 146097), c2 = a - Math.floor(146097 * b / 4);
    var d = Math.floor((4 * c2 + 3) / 1461), e = c2 - Math.floor(1461 * d / 4), m = Math.floor((5 * e + 2) / 153);
    return { year: 100 * b + d - 4800 + Math.floor(m / 10), month: m + 3 - 12 * Math.floor(m / 10), day: e - Math.floor((153 * m + 2) / 5) + 1 };
  }

  function nmStarts(gy) {
    var k0 = Math.floor((gy - 2000 - 0.1) * 12.3685) - 2, a = [];
    for (var k = k0; k < k0 + 20; k++) a.push(cdate8(newMoonJD(k)));
    return a;
  }
  function wsCdate(gy) { return cdate8(solarTermJD(gy, 270)); }
  function allStarts(gy) {
    return nmStarts(gy - 1).concat(nmStarts(gy)).concat(nmStarts(gy + 1))
      .filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
  }
  function m11Start(gy, st) { return st.filter(function (s) { return s <= wsCdate(gy); }).pop(); }
  function zhongqi(gy) {
    var z = [];
    for (var yy = gy - 1; yy <= gy + 1; yy++) for (var i = 0; i < 12; i++) z.push(cdate8(solarTermJD(yy, (270 + i * 30) % 360)));
    return z;
  }
  /* Numbered lunar months for the solstice cycle whose month 11 sits in (gy-1). */
  function buildCycle(gy) {
    var st = allStarts(gy), a = m11Start(gy - 1, st), b = m11Start(gy, st);
    var seq = st.filter(function (s) { return s >= a && s <= b; });
    var leapYear = (seq.length - 1 === 13), zq = zhongqi(gy), out = [], num = 11, used = false;
    for (var j = 0; j < seq.length - 1; j++) {
      var s0 = seq[j], s1 = seq[j + 1];
      if (j === 0) { out.push({ start: s0, num: 11, leap: false }); continue; }
      var hz = zq.some(function (z) { return z >= s0 && z < s1; });
      if (leapYear && !used && !hz) { out.push({ start: s0, num: num, leap: true }); used = true; }
      else { num++; if (num > 12) num = 1; out.push({ start: s0, num: num, leap: false }); }
    }
    return out;
  }
  function cnyCdate(gy) { var m1 = buildCycle(gy).find(function (x) { return x.num === 1 && !x.leap; }); return m1 ? m1.start : null; }

  /* --- our layer: build the month table for one lunar year, index into it --- */

  function assertYear(LY) {
    if (typeof LY !== "number" || !isFinite(LY) || Math.floor(LY) !== LY)
      throw new Error("lunar year must be an integer, got " + LY);
    if (LY < MIN_YEAR || LY > MAX_YEAR)
      throw new Error("lunar year " + LY + " is outside the supported range " + MIN_YEAR + "–" + MAX_YEAR);
  }

  /* Global sorted, de-duplicated month list spanning lunar year LY (with
     neighbours so a month's successor is always present for length math). */
  function assembleMonths(LY) {
    var raw = buildCycle(LY - 1).concat(buildCycle(LY)).concat(buildCycle(LY + 1)).concat(buildCycle(LY + 2));
    var seen = {}, M = [];
    for (var i = 0; i < raw.length; i++) {
      var s = raw[i].start;
      if (!seen[s]) { seen[s] = 1; M.push(raw[i]); }
    }
    M.sort(function (a, b) { return a.start - b.start; });
    return M;
  }

  /* Locate the (num, isLeap) month of lunar year LY inside the global list.
     Returns { M, idx } or throws a descriptive Error. LY's months are exactly
     those with start in [cnyCdate(LY), cnyCdate(LY+1)) — the same partition
     ziwei-lunar's solarToLunar uses, since Lunar New Year IS a month boundary. */
  function locate(LY, lunarMonth, isLeap) {
    var M = assembleMonths(LY), lo = cnyCdate(LY), hi = cnyCdate(LY + 1);
    var idx = -1;
    for (var i = 0; i < M.length; i++) {
      var m = M[i];
      if (m.start >= lo && m.start < hi && m.num === lunarMonth && (!!m.leap === !!isLeap)) { idx = i; break; }
    }
    if (idx < 0) {
      if (isLeap) {
        var lp = leapMonthOf(LY);
        throw new Error("lunar year " + LY + " has " + (lp === null ? "no leap month" : "a leap month at month " + lp)
          + ", so there is no 윤달 (leap) month " + lunarMonth);
      }
      throw new Error("lunar month " + lunarMonth + " not found in lunar year " + LY);
    }
    return { M: M, idx: idx };
  }

  /* Leap month number of a lunar year, or null when the year has none. */
  function leapMonthOf(lunarYear) {
    assertYear(lunarYear);
    var M = assembleMonths(lunarYear), lo = cnyCdate(lunarYear), hi = cnyCdate(lunarYear + 1);
    for (var i = 0; i < M.length; i++) {
      var m = M[i];
      if (m.start >= lo && m.start < hi && m.leap) return m.num;
    }
    return null;
  }

  /* Length in days (29 or 30) of a given lunar month. */
  function monthLengthOf(lunarYear, lunarMonth, isLeap) {
    assertYear(lunarYear);
    if (typeof lunarMonth !== "number" || lunarMonth < 1 || lunarMonth > 12 || Math.floor(lunarMonth) !== lunarMonth)
      throw new Error("lunar month must be an integer 1–12, got " + lunarMonth);
    var loc = locate(lunarYear, lunarMonth, isLeap);
    return loc.M[loc.idx + 1].start - loc.M[loc.idx].start;
  }

  /* 음력 → 양력. Returns { year, month, day } in the Gregorian calendar. */
  function lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeapMonth) {
    assertYear(lunarYear);
    if (typeof lunarMonth !== "number" || lunarMonth < 1 || lunarMonth > 12 || Math.floor(lunarMonth) !== lunarMonth)
      throw new Error("lunar month must be an integer 1–12, got " + lunarMonth);
    if (typeof lunarDay !== "number" || lunarDay < 1 || lunarDay > 30 || Math.floor(lunarDay) !== lunarDay)
      throw new Error("lunar day must be an integer 1–30, got " + lunarDay);
    var leap = !!isLeapMonth;

    /* Leap months are never guessed: if the caller flags 윤달, the year MUST
       actually have that leap month, else we throw (no silent fallback). */
    if (leap) {
      var lp = leapMonthOf(lunarYear);
      if (lp === null)
        throw new Error("lunar year " + lunarYear + " has no leap month (윤달); do not pass isLeapMonth:true for it");
      if (lp !== lunarMonth)
        throw new Error("lunar year " + lunarYear + "'s leap month is month " + lp + ", not month " + lunarMonth
          + "; isLeapMonth:true is only valid for month " + lp);
    }

    var loc = locate(lunarYear, lunarMonth, leap);
    var start = loc.M[loc.idx].start;
    var len = loc.M[loc.idx + 1].start - start;
    /* A 30th day in a 29-day month does not exist — reject, never clamp. */
    if (lunarDay > len)
      throw new Error("lunar " + lunarYear + "/" + (leap ? "leap " : "") + lunarMonth + "/" + lunarDay
        + " does not exist: that month has only " + len + " days");
    return ymdFromCdate(start + lunarDay - 1);
  }

  return {
    lunarToSolar: lunarToSolar,
    leapMonthOf: leapMonthOf,
    monthLengthOf: monthLengthOf,
    MIN_YEAR: MIN_YEAR,
    MAX_YEAR: MAX_YEAR,
    /* re-derived astronomy, exposed for tests / re-use (not the public contract) */
    _internal: { newMoonJD: newMoonJD, solarTermJD: solarTermJD, buildCycle: buildCycle, cnyCdate: cnyCdate, ymdFromCdate: ymdFromCdate }
  };
});
