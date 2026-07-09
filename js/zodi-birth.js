/* ============================================================
   ZODI BIRTH — the one birth record, shared by every chart.
   Saved from the dashboard (date, hour, minute, birthplace,
   timezone) into zodi_private, cached locally, and offered to
   the finer instruments: Purple Star, BaZi, and Saju casts.

   window.ZodiBirth:
     get()      Promise of the record or null (cache, then DB)
     cached()   the local copy or null (no network)
     set(rec)   cache + save to zodi_private when signed in
     clear()    forget the local copy (called on sign out)

   Record shape:
     { year, month, day, hour, minute, place, tz }
     hour is 0-23 or null when the birth time is unknown.

   Depends on (optional): zodi-config.js, zodi-auth.js. Works
   logged out from the cache alone.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "zodi_birth";

  function cached() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var r = JSON.parse(raw);
      return (r && r.year && r.month && r.day) ? r : null;
    } catch (e) { return null; }
  }

  function cache(rec) {
    try { localStorage.setItem(KEY, JSON.stringify(rec)); } catch (e) {}
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  function fromRow(row) {
    if (!row || !row.birth_year) return null;
    return {
      year: row.birth_year, month: row.birth_month, day: row.birth_day,
      hour: (typeof row.birth_hour === "number") ? row.birth_hour : null,
      minute: (typeof row.birth_minute === "number") ? row.birth_minute : 0,
      place: row.birth_place || "", tz: row.birth_tz || ""
    };
  }

  function get() {
    var local = cached();
    if (local) return Promise.resolve(local);
    if (!window.Zodi) return Promise.resolve(null);
    return window.Zodi.ready.then(function () {
      var client = window.Zodi.client(), session = window.Zodi.session(), profile = window.Zodi.profile();
      if (!client || !session || !profile) return null;
      return client.from("zodi_private")
        .select("birth_year,birth_month,birth_day,birth_hour,birth_minute,birth_place,birth_tz")
        .eq("profile_id", profile.id).maybeSingle()
        .then(function (r) {
          var rec = fromRow(r && r.data);
          if (rec) cache(rec);
          return rec;
        })
        .catch(function () { return null; });
    });
  }

  function set(rec) {
    if (!rec || !rec.year || !rec.month || !rec.day) return Promise.resolve(null);
    cache(rec);
    if (!window.Zodi) return Promise.resolve(rec);
    return window.Zodi.ready.then(function () {
      var client = window.Zodi.client(), session = window.Zodi.session(), profile = window.Zodi.profile();
      if (!client || !session || !profile) return rec;
      return client.from("zodi_private").upsert({
        profile_id: profile.id,
        birth_year: rec.year, birth_month: rec.month, birth_day: rec.day,
        birth_hour: (typeof rec.hour === "number") ? rec.hour : null,
        birth_minute: (typeof rec.minute === "number") ? rec.minute : null,
        birth_place: rec.place || null, birth_tz: rec.tz || null
      }, { onConflict: "profile_id" }).then(function () { return rec; }, function () { return rec; });
    });
  }

  window.ZodiBirth = { get: get, cached: cached, set: set, clear: clear };

  /* ============================================================
     Prefill the finer instruments from the saved record.
     Each tool keeps its own chart state; a chart the visitor
     already cast always wins over the saved record.
     ============================================================ */
  function pad2(n) { return ("0" + n).slice(-2); }

  function prefill() {
    var rec = cached();
    if (!rec) return;

    /* Saju Palja (elements/saju/): its study-chart store renders
       the whole report from one save(). */
    if (window.SajuStudyChart && document.getElementById("gateForm")) {
      if (!window.SajuStudyChart.get()) {
        window.SajuStudyChart.save({
          year: rec.year, month: rec.month, day: rec.day,
          hour: (typeof rec.hour === "number") ? rec.hour : null,
          minute: (typeof rec.minute === "number") ? rec.minute : null,
          calendar: "solar", place: null, sex: null, dayBoundary: "midnight"
        });
      }
      return;
    }

    /* Purple Star (elements/purple-star-astrology/): same pattern. */
    if (window.ZiweiStudyChart && document.getElementById("pcast-form")) {
      if (!window.ZiweiStudyChart.get()) {
        window.ZiweiStudyChart.save({
          year: rec.year, month: rec.month, day: rec.day,
          hour: (typeof rec.hour === "number") ? rec.hour : null,
          minute: (typeof rec.minute === "number") ? rec.minute : null,
          tzOffset: "auto", gender: null
        });
      }
      return;
    }

    /* BaZi (bazi/chart/): no store; fill the mounted controls and cast. */
    var tries = 0;
    (function bz() {
      var root = document.querySelector('[data-bz="cast"]');
      if (!root) return; /* not this page */
      var date = root.querySelector('[data-c="date"]');
      if (!date) { if (++tries < 20) setTimeout(bz, 150); return; }
      if (date.dataset.zodiFilled) return;
      date.dataset.zodiFilled = "1";
      date.value = rec.year + "-" + pad2(rec.month) + "-" + pad2(rec.day);
      if (typeof rec.hour === "number") {
        var mode = root.querySelector('.bz-mode[data-mode="known"]');
        if (mode) mode.click();
        var time = root.querySelector('[data-c="time"]');
        if (time) time.value = pad2(rec.hour) + ":" + pad2(rec.minute || 0);
      }
      var castBtn = root.querySelector(".pill.primary");
      if (castBtn) castBtn.click();
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(prefill, 60); });
  } else {
    setTimeout(prefill, 60);
  }
})();
