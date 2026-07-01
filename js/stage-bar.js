/* ============================================================
   stage-bar.js — the stage-aware sticky action (mobile-first).
   One primary action at a time, chosen by the visitor's stage.
   The bar is created by JS (enhancement only), so there is never a
   dead button when JavaScript is off. Styled by .stageBar in
   css/descent.css (shown on mobile, hidden at >=768px).
   ============================================================ */
(function () {
  "use strict";
  if (!("IntersectionObserver" in window)) return;

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    var read = document.getElementById("read");         // hero + birth-date input
    var result = document.getElementById("resultWrap");  // the reveal result
    var peek = document.getElementById("peek");          // menagerie preview
    var match = document.getElementById("matchSection"); // test a bond
    var birth = document.getElementById("birthDate");
    if (!read || !result) return;

    // build the bar
    var bar = document.createElement("div");
    bar.className = "stageBar";
    bar.hidden = true;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn";
    btn.id = "stageAction";
    var live = document.createElement("span");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    bar.appendChild(btn);
    bar.appendChild(live);
    document.body.appendChild(bar);

    var vis = { read: false, result: false, peek: false };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.target === read) vis.read = e.isIntersecting;
        else if (e.target === result) vis.result = e.isIntersecting;
        else if (e.target === peek) vis.peek = e.isIntersecting;
      });
      update();
    }, { rootMargin: "-30% 0px -30% 0px" });
    io.observe(read);
    io.observe(result);
    if (peek) io.observe(peek);

    function scrollTo(el, focusEl) {
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (focusEl) setTimeout(function () { try { focusEl.focus(); } catch (e) {} }, 450);
    }

    var current = "";
    function set(label, handler) {
      if (label !== current) {
        current = label;
        btn.textContent = label;
        live.textContent = label;
      }
      btn.onclick = handler;
      bar.hidden = false;
    }
    function hide() { current = ""; bar.hidden = true; }

    function hasResult() { return document.body.hasAttribute("data-has-result"); }

    function update() {
      // the input is on screen: the real control is right there, hide the bar
      if (vis.read) { hide(); return; }
      if (!hasResult()) {
        set("Find my animal", function () { scrollTo(read, birth); });
        return;
      }
      // a result exists
      if (vis.result) {
        set("Test a bond", function () { scrollTo(match || peek); });
        return;
      }
      // scrolled away from the result
      set("Back to my animal", function () { scrollTo(result); });
    }

    // react when a reveal happens (app.js sets data-has-result)
    var mo = new MutationObserver(update);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-has-result"] });

    update();
  });
})();
