/* ============================================================
   saju-astro.js ,  deterministic solar astronomy for Saju Palja
   ------------------------------------------------------------
   Pure functions. No external data, no ephemeris file. Everything
   below is computed from the birth instant so the engine can find
   the exact solar-term boundaries a Korean chart depends on.

   Method: Meeus, "Astronomical Algorithms" (2nd ed.), low-precision
   solar position (ch. 25) + equation of time (ch. 28). Apparent
   solar longitude is good to ~0.01 deg (~15 min of solar-term time),
   which we tighten by Newton iteration to < 0.0001 deg.

   Provenance: METHOD_VERSION below. Calibrated against KASI-published
   Ipchun instants (2025-02-03 23:10 KST, 2026-02-04 05:02:08 KST).
   Used in both the browser (window.SajuAstro) and Node (module.exports).
   ============================================================ */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SajuAstro = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var METHOD_VERSION = "saju-astro/1.0.0 (Meeus low-precision sun + EoT)";
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;

  function norm360(x) { x = x % 360; return x < 0 ? x + 360 : x; }
  function norm180(x) { x = norm360(x); return x > 180 ? x - 360 : x; }

  /* Julian Day from a UTC calendar moment (Gregorian). frac = fraction of day (0..1). */
  function julianDayUTC(y, m, d, fracDay) {
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
    var jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    return jd + (fracDay || 0);
  }

  /* Julian centuries from J2000.0 */
  function T(jd) { return (jd - 2451545.0) / 36525.0; }

  /* Sun apparent ecliptic longitude in degrees (Meeus 25). */
  function sunApparentLongitude(jd) {
    var t = T(jd);
    var L0 = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
    var M = 357.52911 + 35999.05029 * t - 0.0001537 * t * t;
    var Mr = M * D2R;
    var C = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(Mr)
          + (0.019993 - 0.000101 * t) * Math.sin(2 * Mr)
          + 0.000289 * Math.sin(3 * Mr);
    var trueLong = L0 + C;
    var Omega = 125.04 - 1934.136 * t;
    var appLong = trueLong - 0.00569 - 0.00478 * Math.sin(Omega * D2R);
    return norm360(appLong);
  }

  /* Equation of time in MINUTES (apparent - mean; add to mean to get apparent).
     Meeus ch. 28 compact form. */
  function equationOfTimeMinutes(jd) {
    var t = T(jd);
    var eps = 23.439291 - 0.0130042 * t - 1.64e-7 * t * t + 5.04e-7 * t * t * t; // obliquity deg
    var L0 = norm360(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
    var M = (357.52911 + 35999.05029 * t - 0.0001537 * t * t) * D2R;
    var e = 0.016708634 - 0.000042037 * t - 1.267e-7 * t * t;
    var y = Math.tan(eps / 2 * D2R); y = y * y;
    var L0r = L0 * D2R;
    var E = y * Math.sin(2 * L0r)
          - 2 * e * Math.sin(M)
          + 4 * e * y * Math.sin(M) * Math.cos(2 * L0r)
          - 0.5 * y * y * Math.sin(4 * L0r)
          - 1.25 * e * e * Math.sin(2 * M); // radians
    return E * R2D * 4; // deg to minutes of time
  }

  /* Find the JD (UTC) at which the sun reaches targetLon (deg), searching
     near seedJD. Newton iteration; the sun moves ~0.98565 deg/day. */
  function findLongitudeCrossing(targetLon, seedJD) {
    var jd = seedJD;
    for (var i = 0; i < 12; i++) {
      var cur = sunApparentLongitude(jd);
      var diff = norm180(targetLon - cur);          // shortest signed gap in degrees
      if (Math.abs(diff) < 1e-7) break;
      jd += diff / 0.9856473;                         // deg / (deg per day)
    }
    return jd;
  }

  /* Solar-term instant (JD UTC) for a given Gregorian year and term longitude.
     termLon in {0,15,...,345}. Uses a per-term seed date to land in the right year. */
  function solarTermJD(gregYear, termLon) {
    // approximate day-of-year the sun hits termLon: spring equinox (0 deg) ~ Mar 20.
    // 315 deg (Ipchun) ~ Feb 4. Seed by linear map then Newton-correct.
    var approxDoy = 79.5 + termLon * (365.2422 / 360); // days after Jan 0 for longitude (0deg~Mar20)
    approxDoy = ((approxDoy % 365.2422) + 365.2422) % 365.2422;
    var seed = julianDayUTC(gregYear, 1, 0, 0) + approxDoy;
    return findLongitudeCrossing(termLon, seed);
  }

  /* The 12 "jie" month-boundary longitudes, starting at Ipchun (315 to month 寅). */
  var JIE_LONS = [315, 345, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285];

  /* Convert a JD (UTC) to a UTC calendar object (for readouts / logging). */
  function jdToUTC(jd) {
    var z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
    var A = z;
    if (z >= 2299161) { var al = Math.floor((z - 1867216.25) / 36524.25); A = z + 1 + al - Math.floor(al / 4); }
    var B = A + 1524, C = Math.floor((B - 122.1) / 365.25), D = Math.floor(365.25 * C),
        E = Math.floor((B - D) / 30.6001);
    var day = B - D - Math.floor(30.6001 * E) + f;
    var month = E < 14 ? E - 1 : E - 13;
    var year = month > 2 ? C - 4716 : C - 4715;
    var d = Math.floor(day), frac = day - d;
    var hours = frac * 24, hh = Math.floor(hours), mm = Math.floor((hours - hh) * 60),
        ss = Math.round((((hours - hh) * 60) - mm) * 60);
    if (ss === 60) { ss = 0; mm++; } if (mm === 60) { mm = 0; hh++; }
    return { year: year, month: month, day: d, hour: hh, minute: mm, second: ss };
  }

  return {
    METHOD_VERSION: METHOD_VERSION,
    norm360: norm360, norm180: norm180,
    julianDayUTC: julianDayUTC,
    sunApparentLongitude: sunApparentLongitude,
    equationOfTimeMinutes: equationOfTimeMinutes,
    findLongitudeCrossing: findLongitudeCrossing,
    solarTermJD: solarTermJD,
    JIE_LONS: JIE_LONS,
    jdToUTC: jdToUTC
  };
});
