/* ziwei-progress.js: the Reader's Path progress store (zwdsSchool.v2) for Purple Star Astrology.
   Spec: PSA-CURRICULUM.md Part 4 (progress data), Part 2 (six-rank ladder + legacy grandfathering),
   PSA-MASTER-PLAN rulings D8 (ranks) and D9 (storage), D10 (Karma stays dark until server kinds exist).

   Design:
   - New key "zwdsSchool.v2". Imports the flat "zwdsSchool.v1" once (never deletes or restructures it).
   - Mirrors the five legacy hall flags (wheel/case/drills/timing/exam) back to v1 on change, so the
     un-rebuilt chart page keeps painting its "X of 5 halls" strip during the transition.
   - Comprehension events only (never clicks): lesson_completed, check_passed, teachback_submitted,
     exam_passed, level_completed, rank_earned, chart_cast. Each emit dispatches a document
     "psa:progress" CustomEvent so any surface can react.
   - Six-rank ladder earned by level mastery; the old 10-question exam becomes the Foundation Exam
     (9+ confers at least Star Keeper); legacy exam ranks are grandfathered forever as a floor.
   - Karma bridge is NOT wired here (D10): the zwds_* earn kinds do not yet exist in the server
     zodi_award allowlist, and no Karma copy ships until they do. psa:progress events are emitted so
     the bridge can be added later without touching lesson code.

   Plain browser JS. No modules. Attaches to window.ZiweiData and window.ZiweiProgress. Idempotent. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiProgress) return;

  var V2_KEY = "zwdsSchool.v2";
  var V1_KEY = "zwdsSchool.v1";
  var HALLS = ["wheel", "case", "drills", "timing", "exam"];

  /* Rank ladder, low to high. index = rung strength. */
  var RANK_LADDER = [
    { id: "novice",  name: "Court Novice 入門" },
    { id: "scribe",  name: "Palace Scribe 宮書" },
    { id: "keeper",  name: "Star Keeper 司星" },
    { id: "warden",  name: "Warden of the Forces 司化" },
    { id: "doors",   name: "Keeper of the Doors 司門" },
    { id: "imperial", name: "Imperial Astrologer 欽天監" }
  ];
  function rankIndexByName(name) {
    for (var i = 0; i < RANK_LADDER.length; i++) { if (RANK_LADDER[i].name === name) return i; }
    return -1;
  }
  /* Old chart-page exam ranks, for grandfathering a legacy examScore. */
  function legacyRankFromScore(score) {
    if (score >= 9) return "Imperial Astrologer 欽天監";
    if (score >= 7) return "Star Keeper 司星";
    if (score >= 4) return "Palace Scribe 宮書";
    return "Court Novice 入門";
  }

  function readJSON(key) {
    try { return JSON.parse(window.localStorage.getItem(key) || "null"); } catch (e) { return null; }
  }
  function writeJSON(key, val) {
    try { window.localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
  }

  function freshV2() {
    return {
      v: 2, migratedFromV1: false,
      legacy: null,
      lessons: {}, checks: {}, levels: {},
      rank: { current: null, history: [] },
      exams: { foundation: { best: 0, sittings: 0 }, readers: { best: 0, sittings: 0 } },
      charts: { study: null },
      prefs: {}
    };
  }

  var store = readJSON(V2_KEY);
  if (!store || store.v !== 2) {
    store = freshV2();
    var v1 = readJSON(V1_KEY);
    if (v1 && typeof v1 === "object") {
      var legacy = { wheel: !!v1.wheel, case: !!v1.case, drills: !!v1.drills, timing: !!v1.timing, exam: !!v1.exam };
      if (typeof v1.examScore === "number") {
        legacy.examScore = v1.examScore;
        legacy.legacyRank = legacyRankFromScore(v1.examScore);
        legacy.legacyRankGrandfathered = true;
        store.exams.foundation.best = v1.examScore;
        store.exams.foundation.sittings = 1;
      }
      store.legacy = legacy;
      store.migratedFromV1 = true;
    }
    persist();
  }

  function persist() {
    /* forward-compat: unknown fields already live on `store`, so a plain write preserves them */
    writeJSON(V2_KEY, store);
  }
  /* Mirror the five hall flags back into v1 so the chart page's progress strip keeps working. */
  function mirrorHallToV1(name) {
    var v1 = readJSON(V1_KEY) || {};
    if (!v1[name]) { v1[name] = true; writeJSON(V1_KEY, v1); }
  }

  function emit(type, detail) {
    detail = detail || {};
    detail.type = type;
    try { document.dispatchEvent(new CustomEvent("psa:progress", { detail: detail })); } catch (e) {}
    /* Karma bridge intentionally absent until the server zwds_* kinds exist (D10). */
  }

  /* -------- level mastery → rank -------- */
  function levelDone(levelId) { return !!store.levels[levelId]; }
  function computeRank() {
    var idx = -1;
    if (levelDone("L1")) idx = Math.max(idx, 0);
    if (levelDone("L2")) idx = Math.max(idx, 1);
    if (levelDone("L3")) idx = Math.max(idx, 2);
    if (levelDone("L4") && levelDone("L5")) idx = Math.max(idx, 3);
    if (levelDone("L6") && levelDone("L7")) idx = Math.max(idx, 4);
    if (levelDone("L8") && store.exams.readers.best >= 18) idx = Math.max(idx, 5);
    /* Foundation Exam 9+ confers at least Star Keeper. */
    if (store.exams.foundation.best >= 9) idx = Math.max(idx, 2);
    /* Legacy rank is a floor, never revoked. */
    if (store.legacy && store.legacy.legacyRank) idx = Math.max(idx, rankIndexByName(store.legacy.legacyRank));
    return idx < 0 ? null : RANK_LADDER[idx];
  }
  function refreshRank() {
    var r = computeRank();
    var name = r ? r.name : null;
    if (name !== store.rank.current) {
      store.rank.current = name;
      if (name) { store.rank.history.push({ rank: name, ts: Date.now() }); persist(); emit("rank_earned", { id: name }); }
      else persist();
      return true;
    }
    return false;
  }

  /* -------- public API -------- */
  var API = {
    RANK_LADDER: RANK_LADDER,
    raw: function () { return store; },

    hasProgress: function () {
      if (store.legacy && (store.legacy.wheel || store.legacy.exam || store.legacy.legacyRank)) return true;
      for (var k in store.lessons) { if (store.lessons[k] && store.lessons[k].done) return true; }
      for (var l in store.levels) { if (store.levels[l]) return true; }
      if (store.charts.study) return true;
      return false;
    },
    isLessonDone: function (id) { return !!(store.lessons[id] && store.lessons[id].done); },
    lessonsDone: function () { var n = 0; for (var k in store.lessons) { if (store.lessons[k] && store.lessons[k].done) n++; } return n; },

    /* the one meaningful action of a lesson was performed correctly */
    completeLesson: function (id, meta) {
      if (this.isLessonDone(id)) return false;
      store.lessons[id] = { done: true, ts: Date.now() };
      persist();
      emit("lesson_completed", { id: id, meta: meta || null });
      refreshRank();
      return true;
    },
    completeLevel: function (levelId) {
      if (store.levels[levelId]) return false;
      store.levels[levelId] = true; persist();
      emit("level_completed", { id: levelId });
      refreshRank();
      return true;
    },
    passCheck: function (levelId, part, value) {
      store.checks[levelId] = store.checks[levelId] || {};
      store.checks[levelId][part] = value; store.checks[levelId].ts = Date.now();
      persist(); emit("check_passed", { id: levelId, part: part });
      return true;
    },
    /* Foundation (10q) or Reader's (20q) exam completed with a score. Mirrors the exam hall to v1. */
    recordExam: function (which, score) {
      var slot = which === "readers" ? store.exams.readers : store.exams.foundation;
      slot.best = Math.max(slot.best || 0, score); slot.sittings = (slot.sittings || 0) + 1;
      if (which === "foundation") mirrorHallToV1("exam");
      persist(); emit("exam_passed", { id: which, score: score });
      refreshRank();
    },
    castChart: function (isMei) {
      if (!store.charts.study) { store.charts.study = { cast: true, isMei: !!isMei, ts: Date.now() }; persist(); emit("chart_cast", { id: "study" }); refreshRank(); }
    },
    /* generic hall mirror for chart-page-equivalent actions performed on the hub */
    markHall: function (name) {
      if (HALLS.indexOf(name) < 0) return;
      store.legacy = store.legacy || {};
      if (!store.legacy[name]) { store.legacy[name] = true; persist(); }
      mirrorHallToV1(name);
    },

    rank: function () { return store.rank.current; },
    rankObj: function () { return computeRank(); },
    isLegacyRank: function () { return !!(store.legacy && store.legacy.legacyRankGrandfathered); },
    levelState: function (levelId, orderIndex, firstUndoneLevelIndex) {
      if (store.levels[levelId]) return "done";
      if (orderIndex === firstUndoneLevelIndex) return "current";
      return "ahead";
    },
    firstUndoneLevelIndex: function (levelIds) {
      for (var i = 0; i < levelIds.length; i++) { if (!store.levels[levelIds[i]]) return i; }
      return levelIds.length; /* all done */
    },
    getPref: function (k) { return store.prefs ? store.prefs[k] : undefined; },
    setPref: function (k, v) { store.prefs = store.prefs || {}; store.prefs[k] = v; persist(); }
  };

  /* initialize rank from imported state without emitting a spurious rank_earned on a fresh store */
  (function initRank() {
    var r = computeRank();
    store.rank.current = r ? r.name : null;
    persist();
  }());

  window.ZiweiProgress = API;
  window.ZiweiData.progress = API;
})();
