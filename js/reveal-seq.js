/* ============================================================
   reveal-seq.js — Spirit Omega staged reveal (vanilla, no deps).
   Stages the result via class toggles. Transform/opacity only.
   Skip on tap/Enter/Escape. Reduced-motion shows the result at once.
   Static fallback: if this never runs, the result is simply visible.
   window.revealSequence(resultEl, { name, onComplete })
   ============================================================ */
(function (global) {
  "use strict";
  var REDUCED = global.matchMedia &&
    global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readMs(el, prop, fb) {
    var v = getComputedStyle(el).getPropertyValue(prop).trim();
    if (!v) return fb;
    if (v.slice(-2) === "ms") return parseFloat(v);
    if (v.slice(-1) === "s") return parseFloat(v) * 1000;
    return fb;
  }

  function revealSequence(resultEl, opts) {
    opts = opts || {};
    if (!resultEl) return { skip: function () {} };
    var descent = resultEl.closest(".descent") || resultEl;
    var live = resultEl.parentNode && resultEl.parentNode.querySelector("[data-seq-live]");
    var heading = resultEl.querySelector("#animalName");
    var skipBtn = resultEl.querySelector("[data-seq-skip]");
    var name = (opts.name || (heading && heading.textContent) || "").trim();
    var done = false, i = 0, startedAt = 0, rafId = 0;

    function announce() { if (live && name) live.textContent = "Your Primal Animal is the " + name; }
    function focusHeading() {
      if (!heading) return;
      if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
      try { heading.focus({ preventScroll: true }); } catch (e) { heading.focus(); }
    }
    function teardown() {
      if (rafId) cancelAnimationFrame(rafId);
      resultEl.removeEventListener("click", onTap);
      resultEl.removeEventListener("keydown", onKey);
      if (skipBtn) skipBtn.removeEventListener("click", onSkip);
    }
    function finish() {
      if (done) return; done = true;
      resultEl.classList.remove("seq");
      resultEl.classList.add("seq-done");
      teardown(); announce(); focusHeading();
      if (typeof opts.onComplete === "function") opts.onComplete();
    }
    function addIn(sel) { var el = resultEl.querySelector(sel); if (el) el.classList.add("is-in"); }
    function onTap(e) { if (e.target.closest("a, input, button:not([data-seq-skip])")) return; finish(); }
    function onKey(e) { if (e.key === "Enter" || e.key === " " || e.key === "Escape") finish(); }
    function onSkip(e) { e.preventDefault(); finish(); }

    if (REDUCED) {
      resultEl.classList.add("seq");
      requestAnimationFrame(function () {
        resultEl.classList.add("seq-done"); resultEl.classList.remove("seq");
        announce(); focusHeading();
        if (typeof opts.onComplete === "function") opts.onComplete();
      });
      return { skip: finish };
    }

    resultEl.classList.add("seq");
    var steps = [
      { hold: function () { return readMs(descent, "--seq-glyph", 420); }, run: function () { addIn("#cross"); } },
      { hold: function () { return readMs(descent, "--seq-name", 420); }, run: function () { addIn("#animalName"); } },
      { hold: function () { return readMs(descent, "--seq-essence", 380); }, run: function () { addIn("#animalEssence"); } },
      { hold: function () { return readMs(descent, "--seq-doors", 460); }, run: function () { addIn(".descent-doors"); } }
    ];
    function tick(now) {
      if (done) return;
      if (!startedAt) startedAt = now;
      if (now - startedAt >= steps[i].hold()) {
        i++; startedAt = 0;
        if (i >= steps.length) { finish(); return; }
        steps[i].run();
      }
      rafId = requestAnimationFrame(tick);
    }
    steps[0].run();
    rafId = requestAnimationFrame(tick);
    resultEl.addEventListener("click", onTap);
    resultEl.addEventListener("keydown", onKey);
    if (skipBtn) skipBtn.addEventListener("click", onSkip);
    return { skip: finish };
  }

  global.revealSequence = revealSequence;
})(typeof window !== "undefined" ? window : this);
