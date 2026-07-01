/* ============================================================
   THE PRIMAL ORACLE — theme (light default, dark toggle)
   Include in <head> BEFORE stylesheets to avoid a flash:
     <script src="js/theme.js"></script>
   Sets data-theme from saved choice, else the OS preference.
   ============================================================ */
(function () {
  try {
    var t = localStorage.getItem("po_theme");
    if (t !== "light" && t !== "dark") {
      t = (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
  window.THEME = {
    current: function () { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; },
    set: function (t) {
      document.documentElement.setAttribute("data-theme", t);
      try { localStorage.setItem("po_theme", t); } catch (e) {}
      if (window.PNAV && PNAV.syncTheme) PNAV.syncTheme();
    },
    toggle: function () { this.set(this.current() === "dark" ? "light" : "dark"); }
  };
})();
