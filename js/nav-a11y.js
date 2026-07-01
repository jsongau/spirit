/* The Primal Oracle — nav-a11y.js
 * Accessibility & keyboard polish for the mega navigation.
 * Behavior-only module. Registers PNAV.features.a11y, called last by the orchestrator.
 */
(function () {
  "use strict";

  var PNAV = (window.PNAV = window.PNAV || {});
  PNAV.features = PNAV.features || {};

  var FOCUSABLE = [
    'input:not([disabled]):not([type="hidden"])',
    "a[href]",
    "button:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");

  function isVisible(el) {
    if (!el) return false;
    // offsetParent is null for display:none; also tolerate elements with size.
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function getFocusable(container) {
    if (!container || typeof container.querySelectorAll !== "function") return [];
    var nodes;
    try {
      nodes = container.querySelectorAll(FOCUSABLE);
    } catch (e) {
      return [];
    }
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      if (isVisible(nodes[i])) out.push(nodes[i]);
    }
    return out;
  }

  function safeFocus(el) {
    if (el && typeof el.focus === "function") {
      try {
        el.focus();
      } catch (e) {}
    }
  }

  function setExpanded(el, val) {
    if (el && typeof el.setAttribute === "function") {
      try {
        el.setAttribute("aria-expanded", val ? "true" : "false");
      } catch (e) {}
    }
  }

  // Wire a dialog container: aria-expanded toggling, focus move + trap, focus return.
  function wireDialog(opts) {
    var trigger = opts.trigger; // button whose aria-expanded reflects state
    var container = opts.container; // dialog element
    var openEvent = opts.openEvent;
    var closeEvent = opts.closeEvent;

    setExpanded(trigger, false);

    var trapHandler = null;

    function removeTrap() {
      if (trapHandler && container && typeof container.removeEventListener === "function") {
        container.removeEventListener("keydown", trapHandler, true);
      }
      trapHandler = null;
    }

    function onOpen() {
      setExpanded(trigger, true);
      if (!container) return;

      var focusables = getFocusable(container);
      // Move focus to first focusable (input/a/button preference handled by DOM order).
      if (focusables.length) {
        safeFocus(focusables[0]);
      } else {
        safeFocus(container);
      }

      removeTrap();
      trapHandler = function (e) {
        if (!e || e.key !== "Tab" && e.keyCode !== 9) return;
        var list = getFocusable(container);
        if (!list.length) {
          // Nothing to tab to; keep focus inside.
          e.preventDefault();
          safeFocus(container);
          return;
        }
        var first = list[0];
        var last = list[list.length - 1];
        var active = document.activeElement;

        // If focus is somehow outside the container, pull it back in.
        var inside = container.contains && container.contains(active);
        if (!inside) {
          e.preventDefault();
          safeFocus(e.shiftKey ? last : first);
          return;
        }

        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            safeFocus(last);
          }
        } else {
          if (active === last) {
            e.preventDefault();
            safeFocus(first);
          }
        }
      };
      if (typeof container.addEventListener === "function") {
        container.addEventListener("keydown", trapHandler, true);
      }
    }

    function onClose() {
      setExpanded(trigger, false);
      removeTrap();
      safeFocus(trigger);
    }

    if (openEvent) document.addEventListener(openEvent, onOpen);
    if (closeEvent) document.addEventListener(closeEvent, onClose);
  }

  // Mark the active nav link as the current page.
  function markCurrentPage() {
    var selectors = [".pn-primary a.active", ".pn-col a.active"];
    for (var s = 0; s < selectors.length; s++) {
      var nodes;
      try {
        nodes = document.querySelectorAll(selectors[s]);
      } catch (e) {
        nodes = [];
      }
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (el && typeof el.setAttribute === "function") {
          try {
            el.setAttribute("aria-current", "page");
          } catch (e2) {}
        }
      }
    }
  }

  PNAV.features.a11y = function (ctx) {
    ctx = ctx || {};

    try {
      wireDialog({
        trigger: ctx.explore,
        container: ctx.mega,
        openEvent: "pn:mega-open",
        closeEvent: "pn:mega-close"
      });
    } catch (e) {}

    try {
      wireDialog({
        trigger: ctx.burger,
        container: ctx.drawer,
        openEvent: "pn:drawer-open",
        closeEvent: "pn:drawer-close"
      });
    } catch (e) {}

    try {
      markCurrentPage();
    } catch (e) {}
  };
})();
