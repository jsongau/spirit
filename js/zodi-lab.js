/* ============================================================
   ZODI LAB — the Relationships Laboratory (homepage feature).
   Three chambers: One to One (the mirror), Challenge a Friend
   (a private invitation that carries your Zodi Animal), and
   Circle of Three. Copying an invitation is a rite: +150 ZK.
   Reads the reveal from primal_oracle_v1 + ENGINE; degrades to
   an invitation-to-reveal when no animal is named yet.
   ============================================================ */
(function () {
  "use strict";
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  document.addEventListener("DOMContentLoaded", function () {
    /* ---- chambers ---- */
    var tabs = $all(".lab-tab"), panels = $all(".lab-panel");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        var want = tab.getAttribute("aria-controls");
        /* crossfade in place — panels share one grid cell, so nothing reflows */
        panels.forEach(function (p) { p.classList.toggle("is-active", p.id === want); });
      });
    });

    /* ---- the invitation (Challenge a Friend) ---- */
    var box = $("#labShare"), copy = $("#labCopy"), state = $("#labShareState");
    function buildLink() {
      var o = {};
      try { o = JSON.parse(localStorage.getItem("primal_oracle_v1") || "{}") || {}; } catch (e) {}
      if (!o.birth || !window.ENGINE) return null;
      var c; try { c = window.ENGINE.compute(o.birth); } catch (e) { return null; }
      if (!c || !c.primal) return null;
      var slug = String(c.primal).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      var origin = (location.origin && location.origin !== "null") ? location.origin : "https://www.zodianimal.com";
      return { url: origin + "/vs.html?with=" + slug, name: c.primal };
    }
    function paint() {
      if (!box) return;
      var l = buildLink();
      if (l) {
        if (box.value !== l.url) box.value = l.url;
        if (state) state.innerHTML = "Your invitation carries the <b>" + l.name + "</b>. They reveal on their side; the crossing arrives back to you.";
      } else {
        box.value = "";
        box.placeholder = "Unlock your Zodi Animal above and your invitation appears here.";
        if (state) state.textContent = "";
      }
    }
    paint();
    setInterval(paint, 3000);

    if (copy) copy.addEventListener("click", function () {
      if (!box || !box.value) {
        if (state) state.textContent = "Unlock your Zodi Animal first — the reader waits at the top of this page.";
        return;
      }
      var ok = false;
      try { navigator.clipboard.writeText(box.value); ok = true; }
      catch (e) { try { box.select(); document.execCommand("copy"); ok = true; } catch (_e) {} }
      if (ok) {
        copy.textContent = "Copied";
        setTimeout(function () { copy.textContent = "Copy"; }, 1800);
        if (window.ZodiKarma) window.ZodiKarma.award("share");
      }
    });

    /* ---- the mirror is a rite too ---- */
    var mf = $("#matchForm");
    if (mf) mf.addEventListener("submit", function () {
      if (window.ZodiKarma) setTimeout(function () { window.ZodiKarma.award("match_test"); }, 600);
    });
  });
})();
