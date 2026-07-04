/* ============================================================
   Relationships Laboratory — segmented MM/DD/YYYY date entry.
   Mirrors the reader's #omSeg behavior (see home-v4.js §3):
   the native <input type="date"> stays the source of truth
   (app.js reads #mDateA/#mDateB .value on submit); the segments
   just mirror into it. Progressive enhancement — with JS off,
   the native date pickers are shown instead.
   ============================================================ */
(function () {
  "use strict";
  function $(s, r) { return (r || document).querySelector(s); }
  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }

  function initSeg(seg) {
    var native = $(seg.getAttribute("data-native"));
    if (!native) return;
    var mI = $(".om-seg-m", seg), dI = $(".om-seg-d", seg), yI = $(".om-seg-y", seg);
    if (!mI || !dI || !yI) return;

    seg.hidden = false;
    document.body.classList.add("js-seg");
    // a hidden required control would block submit; app.js handles empties
    try { native.removeAttribute("required"); } catch (e) {}

    function sync() {
      var mm = mI.value, dd = dI.value, yyyy = yI.value;
      native.value = (mm.length === 2 && dd.length === 2 && yyyy.length === 4)
        ? yyyy + "-" + mm + "-" + dd : "";
    }
    function advance(input, max, next) {
      on(input, "input", function () {
        input.value = input.value.replace(/[^0-9]/g, "").slice(0, max);
        sync();
        if (input.value.length === max && next) { try { next.focus(); } catch (e) {} }
      });
    }
    function back(input, prev) {
      on(input, "keydown", function (e) {
        if (e.key === "Backspace" && input.value === "" && prev) {
          try { prev.focus(); } catch (er) {}
        }
      });
    }
    advance(mI, 2, dI); advance(dI, 2, yI); advance(yI, 4, null);
    back(dI, mI); back(yI, dI);

    // seed segments from any existing native value
    if (/^\d{4}-\d{2}-\d{2}$/.test(native.value)) {
      yI.value = native.value.slice(0, 4);
      mI.value = native.value.slice(5, 7);
      dI.value = native.value.slice(8, 10);
    }
  }

  function boot() {
    var segs = document.querySelectorAll(".om-seg.lab-seg");
    for (var i = 0; i < segs.length; i++) initSeg(segs[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
