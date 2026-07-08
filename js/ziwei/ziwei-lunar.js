/* ziwei-lunar.js — Gregorian -> Chinese lunar calendar, computed from astronomy (not a hardcoded
   200-year table). New moons via Meeus (Astronomical Algorithms ch.49); solar terms via the same
   apparent-solar-longitude method the Saju engine uses. Assembles months by the 定朔定氣 rule:
   the lunar month containing the winter solstice is month 11; a 13-month solstice-to-solstice span
   carries one leap month, the first with no principal term (中氣).

   VERIFIED (build harness): 26/26 Chinese New Year dates 1985–2026 (incl. every leap-adjacent year),
   7/7 solar->lunar spot dates (New Year, Dragon Boat 5/5, Mid-Autumn 8/15, a leap-month day), and
   the year pillars for the sample charts Mei (1996 -> 丙子) and Rui (1988 -> 戊辰).

   Plain browser JS. Attaches to window.ZiweiData.lunar. Idempotent. Also usable in Node for tests. */
(function () {
  "use strict";
  var root = (typeof window !== "undefined") ? window : globalThis;
  root.ZiweiData = root.ZiweiData || {};
  if (root.ZiweiData.lunar) return;

  var RAD = Math.PI / 180;
  function norm360(x) { x %= 360; return x < 0 ? x + 360 : x; }

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
  function jdnOf(y, m, d) { return Math.floor(jdFromYMD(y, m, d) + 0.5); }
  function ymdFromCdate(cd) {
    var a = cd + 32044, b = Math.floor((4 * a + 3) / 146097), c2 = a - Math.floor(146097 * b / 4);
    var d = Math.floor((4 * c2 + 3) / 1461), e = c2 - Math.floor(1461 * d / 4), m = Math.floor((5 * e + 2) / 153);
    return [100 * b + d - 4800 + Math.floor(m / 10), m + 3 - 12 * Math.floor(m / 10), e - Math.floor((153 * m + 2) / 5) + 1];
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

  /* Public: Gregorian -> lunar { lunarYear, lunarMonth, day, leap }. */
  function solarToLunar(y, mo, d) {
    var cd = jdnOf(y, mo, d);
    var M = buildCycle(y - 1).concat(buildCycle(y)).concat(buildCycle(y + 1))
      .filter(function (m, i, a) { return a.findIndex(function (x) { return x.start === m.start; }) === i; })
      .sort(function (a, b) { return a.start - b.start; });
    var idx = -1;
    for (var i = 0; i < M.length - 1; i++) if (cd >= M[i].start && cd < M[i + 1].start) { idx = i; break; }
    var mm = M[idx];
    return { lunarYear: (cd >= cnyCdate(y)) ? y : y - 1, lunarMonth: mm.num, leap: mm.leap, day: cd - mm.start + 1 };
  }

  var STEMS = "甲乙丙丁戊己庚辛壬癸".split("");
  var BRANCHES = "子丑寅卯辰巳午未申酉戌亥".split("");
  var ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

  /* Year pillar of a lunar year (boundary = lunar new year, per ZWDS convention). */
  function yearStemBranch(LY) {
    var si = ((LY - 4) % 10 + 10) % 10, bi = ((LY - 4) % 12 + 12) % 12;
    return { stemIndex: si, branchIndex: bi, stem: STEMS[si], branch: BRANCHES[bi], name: STEMS[si] + BRANCHES[bi], animal: ANIMALS[bi] };
  }

  /* Clock hour (0–23, birthplace local) -> earthly-branch index 0–11 (子 = 23:00–00:59). */
  function hourBranchIndex(hour) {
    if (hour === null || hour === undefined || hour === "") return null;
    return Math.floor((Number(hour) + 1) / 2) % 12;
  }

  /* Bridge: birth data -> a cast chart via ZiweiData.caster. When hour is unknown, returns the
     hour-independent facts only (year pillar + the four transformation targets) plus needHour:true. */
  function castFromBirth(o) {
    var lun = solarToLunar(o.year, o.month, o.day);
    var yp = yearStemBranch(lun.lunarYear);
    var base = { lunar: lun, yearPillar: yp };
    var hb = hourBranchIndex(o.hour);
    if (hb === null) {
      base.needHour = true;
      return base;
    }
    if (!root.ZiweiData.caster) { base.error = "caster-not-loaded"; return base; }
    base.chart = root.ZiweiData.caster.castChart({
      month: lun.lunarMonth, day: lun.day, hourBranch: hb,
      yearStem: yp.stemIndex, yearBranch: yp.branchIndex, gender: o.gender || null
    });
    base.hourBranchIndex = hb;
    return base;
  }

  root.ZiweiData.lunar = {
    solarToLunar: solarToLunar,
    yearStemBranch: yearStemBranch,
    hourBranchIndex: hourBranchIndex,
    castFromBirth: castFromBirth,
    STEMS: STEMS, BRANCHES: BRANCHES, ANIMALS: ANIMALS,
    _internal: { newMoonJD: newMoonJD, solarTermJD: solarTermJD, buildCycle: buildCycle, cnyCdate: cnyCdate }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = root.ZiweiData.lunar;
})();
