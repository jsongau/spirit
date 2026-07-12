/* ============================================================
   Zodi Animal — homepage v5 birth-hour continuation
   After the animal is revealed, the left column offers the two
   destiny doors: Zi Wei Dou Shu and Saju Palja. The visitor sets
   a birth hour + time zone once, and either door carries the whole
   birth moment forward (date from the reveal + hour + zone) so the
   destiny page casts on arrival.

   Handoff contract: writes the shared ZodiBirth record
   { year, month, day, hour, minute, tz } — the destiny pages'
   zodi-birth.js prefill reads it and casts. Purely additive:
   never edits homepage-v2.js or homepage-v5.js.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function track(n, p) { try { if (typeof window.gtag === "function") window.gtag("event", n, p || {}); } catch (e) {} }

  var DATE_KEY = "zodi:home-date";     // {y,m,d} captured at reveal, so the door works on return visits
  var BIRTH_KEY = "zodi_birth";        // shared record read by the destiny pages (see js/zodi-birth.js)

  /* Time-zone menu — mirrors the Purple Star caster exactly so the two pages agree. */
  var TZ = [
    ["auto", "Auto (your device)"],
    ["-10", "Hawaii (UTC−10)"], ["-9", "Alaska (UTC−9)"], ["-8", "Pacific Time (UTC−8)"],
    ["-7", "Mountain Time (UTC−7)"], ["-6", "Central Time (UTC−6)"], ["-5", "Eastern Time (UTC−5)"],
    ["-4", "Atlantic (UTC−4)"], ["-3", "Brazil / Argentina (UTC−3)"],
    ["0", "UTC / London (UTC+0)"], ["1", "Central Europe (UTC+1)"], ["2", "Eastern Europe (UTC+2)"],
    ["3", "Moscow / Istanbul (UTC+3)"], ["3.5", "Iran (UTC+3:30)"], ["4", "Gulf (UTC+4)"],
    ["5", "Pakistan (UTC+5)"], ["5.5", "India (UTC+5:30)"], ["7", "Thailand / Vietnam (UTC+7)"],
    ["8", "China / Taiwan / Singapore (UTC+8)"], ["9", "Japan / Korea (UTC+9)"],
    ["9.5", "Central Australia (UTC+9:30)"], ["10", "Sydney (UTC+10)"], ["12", "New Zealand (UTC+12)"]
  ];

  function deviceOffset() {
    try { return String(-(new Date().getTimezoneOffset()) / 60); } catch (e) { return "auto"; }
  }

  var gate = $("#hourGate");
  if (!gate) return;

  var elH = $("#hgH"), elM = $("#hgM"), elMer = $("#hgMer"), fmtWrap = $("#hgFmt"),
      elTz = $("#hgTz"), noTime = $("#hgNoTime"), form = $("#hourForm"),
      ctaZiwei = $("#hgZiwei"), ctaSaju = $("#hgSaju");

  var fmt = "24";        // "24" | "ampm"
  var mer = "AM";        // when ampm

  /* ---------- populate the time-zone menu ---------- */
  (function fillTz() {
    if (!elTz) return;
    var dev = deviceOffset(), frag = document.createDocumentFragment(), matched = false;
    for (var i = 0; i < TZ.length; i++) {
      var o = document.createElement("option");
      o.value = TZ[i][0]; o.textContent = TZ[i][1];
      if (TZ[i][0] === dev) { o.selected = true; matched = true; }
      frag.appendChild(o);
    }
    elTz.appendChild(frag);
    if (!matched) elTz.value = "auto";
  })();

  /* ---------- numeric hygiene on the two time segments ---------- */
  function digits(s) { return (s || "").replace(/[^0-9]/g, ""); }
  function clampH(v) {
    if (v === "") return "";
    var n = parseInt(v, 10); if (isNaN(n)) return "";
    if (fmt === "ampm") { if (n > 12) n = 12; if (n < 1 && v.length >= 2) n = 12; }
    else { if (n > 23) n = 23; }
    return String(n);
  }
  function clampM(v) {
    if (v === "") return "";
    var n = parseInt(v, 10); if (isNaN(n)) return "";
    if (n > 59) n = 59; return String(n);
  }
  if (elH) elH.addEventListener("input", function () {
    var d = digits(elH.value).slice(0, 2); elH.value = d;
    if (d.length === 2) { elH.value = clampH(d); if (elM) elM.focus(); }
  });
  if (elH) elH.addEventListener("blur", function () { elH.value = clampH(digits(elH.value)); });
  if (elM) elM.addEventListener("input", function () { elM.value = digits(elM.value).slice(0, 2); });
  if (elM) elM.addEventListener("blur", function () { elM.value = clampM(digits(elM.value)); });

  /* ---------- 24h / AM·PM toggle ---------- */
  function setFmt(next) {
    fmt = next;
    if (fmtWrap) {
      var btns = fmtWrap.querySelectorAll(".hg-fmt-btn");
      for (var i = 0; i < btns.length; i++) {
        var on = btns[i].getAttribute("data-fmt") === next;
        btns[i].classList.toggle("is-on", on);
        btns[i].setAttribute("aria-pressed", on ? "true" : "false");
      }
    }
    if (elMer) elMer.hidden = (next !== "ampm");
    if (elH) { elH.setAttribute("placeholder", "--"); elH.value = clampH(digits(elH.value)); }
  }
  if (fmtWrap) fmtWrap.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest(".hg-fmt-btn") : null;
    if (b) setFmt(b.getAttribute("data-fmt"));
  });
  function setMer(next) {
    mer = next;
    if (!elMer) return;
    var btns = elMer.querySelectorAll(".hg-mer-btn");
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-mer") === next;
      btns[i].classList.toggle("is-on", on);
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }
  if (elMer) elMer.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest(".hg-mer-btn") : null;
    if (b) setMer(b.getAttribute("data-mer"));
  });

  /* ---------- "I don't know my birth time" ---------- */
  if (noTime) noTime.addEventListener("change", function () {
    var off = noTime.checked;
    [elH, elM].forEach(function (n) { if (n) { n.disabled = off; if (off) n.value = ""; } });
    if (fmtWrap) fmtWrap.classList.toggle("is-off", off);
    if (elMer) elMer.classList.toggle("is-off", off);
    gate.classList.toggle("hg-notime", off);
  });

  /* ---------- read the hour the visitor entered, as 0–23 (or null) ---------- */
  function readHour() {
    if (noTime && noTime.checked) return { hour: null, minute: null };
    var h = parseInt(digits(elH ? elH.value : ""), 10);
    var m = parseInt(digits(elM ? elM.value : ""), 10);
    if (isNaN(h)) return { hour: null, minute: null };
    if (isNaN(m)) m = 0;
    if (fmt === "ampm") {
      h = h % 12;                    // 12 -> 0
      if (mer === "PM") h += 12;     // PM -> +12 (12 PM => 12)
    }
    if (h < 0) h = 0; if (h > 23) h = 23;
    if (m < 0) m = 0; if (m > 59) m = 59;
    return { hour: h, minute: m };
  }

  /* ---------- the birth date, captured at reveal and remembered ---------- */
  function saveDate(d) { try { localStorage.setItem(DATE_KEY, JSON.stringify(d)); } catch (e) {} }
  function loadDate() {
    try { var r = JSON.parse(localStorage.getItem(DATE_KEY)); if (r && r.y && r.m && r.d) return r; } catch (e) {}
    // fall back to the shared record if a fuller one already exists
    try { var b = JSON.parse(localStorage.getItem(BIRTH_KEY)); if (b && b.year && b.month && b.day) return { y: b.year, m: b.month, d: b.day }; } catch (e) {}
    return null;
  }
  function captureDate() {
    var mm = $("#mm"), dd = $("#dd"), yy = $("#yy");
    if (!mm || !dd || !yy) return null;
    var m = parseInt(digits(mm.value), 10), d = parseInt(digits(dd.value), 10), y = parseInt(digits(yy.value), 10);
    if (isNaN(m) || isNaN(d) || isNaN(y) || y < 1900) return null;
    var rec = { y: y, m: m, d: d };
    saveDate(rec);
    return rec;
  }

  /* ---------- write the shared record + navigate ---------- */
  function handoff(href, tradition) {
    var date = loadDate() || captureDate();
    if (date) {
      var t = readHour();
      var tzVal = elTz ? elTz.value : "auto";
      if (tzVal === "auto") tzVal = deviceOffset();
      var rec = { year: date.y, month: date.m, day: date.d, hour: t.hour, minute: t.minute, place: "", tz: tzVal };
      try { localStorage.setItem(BIRTH_KEY, JSON.stringify(rec)); } catch (e) {}   // synchronous cache the destiny page reads
      if (window.ZodiBirth && typeof window.ZodiBirth.set === "function") {
        try { window.ZodiBirth.set(rec); } catch (e) {}                            // DB sync when signed in (async, non-blocking)
      }
    }
    track("v5_destiny_door", { tradition: tradition, has_hour: !!(date && readHour().hour != null) });
    // let the anchor navigate normally
  }
  if (ctaZiwei) ctaZiwei.addEventListener("click", function () { handoff(ctaZiwei.getAttribute("href"), "ziwei"); });
  if (ctaSaju) ctaSaju.addEventListener("click", function () { handoff(ctaSaju.getAttribute("href"), "saju"); });

  /* ---------- reveal the gate the moment the crossing lands ---------- */
  var shown = false;
  function showGate() {
    if (shown) return; shown = true;
    gate.hidden = false;
    gate.classList.add("hg-in");
    track("v5_hourgate_shown");
  }

  // 1) capture the date on reveal submit (the profile is written synchronously by then)
  var sight = $("#sightForm");
  if (sight) sight.addEventListener("submit", function () { setTimeout(captureDate, 0); });

  // 2) surface the gate exactly when the compact result unhides
  var result = $("#v5Result");
  if (result) {
    if (!result.hidden) showGate();
    try {
      var mo = new MutationObserver(function () { if (!result.hidden) showGate(); });
      mo.observe(result, { attributes: true, attributeFilter: ["hidden"] });
    } catch (e) {}
  }

  // 3) returning visitor: a crossing is already known, so the door is already earned
  function init() {
    try {
      var p = localStorage.getItem("zodi:home-v2:profile");
      if (p && result && !result.hidden) showGate();
    } catch (e) {}
    setFmt("24");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
