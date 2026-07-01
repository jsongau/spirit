/* ============================================================
   micro.js  —  Zodianimal.com micro-interaction enhancement (Phase 7)
   ------------------------------------------------------------
   Builder 2 of 4. Tiny, guarded, progressive-enhancement hook for
   the native glyph tooltips in micro.css. It NEVER gates content and
   NEVER runs work that the platform already does for free:

     1. Popover fallback: if the Popover API is missing, copy each
        .glyph-pop's text onto its trigger as a title attribute so
        the meaning is still conveyed. (The panel stays inert.)
     2. Anchor pairing: give each trigger/panel pair a unique
        anchor-name so multiple tooltips on one page tether cleanly.
        Only runs where CSS anchor positioning is supported.

   No effect gates keyboard access: popovertarget already wires the
   button to the panel with full keyboard + Escape + light dismiss.
   This file is a no-op when there are no .glyph-trigger elements.
   node --check clean.
   ============================================================ */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    var triggers = document.querySelectorAll(".glyph-trigger[popovertarget]");
    if (!triggers.length) return; /* nothing to enhance */

    /* feature-detect the Popover API and CSS anchor positioning */
    var hasPopover =
      typeof HTMLElement !== "undefined" &&
      Object.prototype.hasOwnProperty.call(HTMLElement.prototype, "popover");
    var hasAnchor =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("anchor-name: --a");

    Array.prototype.forEach.call(triggers, function (trigger, i) {
      var id = trigger.getAttribute("popovertarget");
      var panel = id ? document.getElementById(id) : null;
      if (!panel) return;

      /* 1. No Popover support: fall back to a native title tooltip so
            the definition is still reachable. Do not touch the panel. */
      if (!hasPopover) {
        if (!trigger.hasAttribute("title")) {
          var text = (panel.textContent || "").trim();
          if (text) trigger.setAttribute("title", text);
        }
        return;
      }

      /* 2. Popover works. Pair the anchor names uniquely so several
            tooltips on the page each tether to their own trigger. */
      if (hasAnchor) {
        var name = "--glyphAnchor" + i;
        trigger.style.setProperty("anchor-name", name);
        panel.style.setProperty("position-anchor", name);
        trigger.style.setProperty("--glyph-anchor", name);
        panel.style.setProperty("--glyph-anchor", name);
      }
    });
  });
})();
