/* ============================================================
   nav-dock.js — The Reveal Dock (mobile)
   A thumb-close bottom bar that carries the visitor's revealed
   Zodi Animal on every page. Before a reveal it shows a pulsing
   "Unlock Your Zodi Animal" CTA that leads to the homepage
   birth-date form; after a reveal it shows the animal with a
   share icon. Tapping the animal opens a short action sheet
   (read / compare / reveal another); tapping share opens a
   share modal with 12 platforms, GA attribution, and a
   copy-link fallback.

   It re-renders live when the homepage fires "zodi:revealed"
   (or another tab writes the profile), so the animal pins to the
   bottom the moment it is named — no reload needed.

   Pure progressive enhancement, mobile only (nav-dock.css scopes
   it to <=900px). Reads the same profile nav-me.js uses
   (zodi:home-v2:profile). Never throws.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };
PNAV.features = PNAV.features || {};

PNAV.features.dock = function (ctx) {
  "use strict";

  var WEST = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra",
              "Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  var EAST = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse",
              "Goat","Monkey","Rooster","Dog","Pig"];
  var EAST_Z = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function slugify(s) {
    return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function isHome() {
    var p = location.pathname.replace(/index\.html$/, "");
    return p === "/" || p === "";
  }

  function readProfile() {
    try {
      var raw = window.localStorage.getItem("zodi:home-v2:profile");
      if (raw) { var p = JSON.parse(raw); if (p && p.name) return p; }
    } catch (e) {}
    return null;
  }

  function cdn(name) { return '<img src="https://cdn.simpleicons.org/' + name + '/d6c18c" alt="" aria-hidden="true">'; }
  var ICON_SMS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a1.6 1.6 0 0 1 1.6 1.6v7.8A1.6 1.6 0 0 1 20 16H9l-4 3v-3H4a1.6 1.6 0 0 1-1.6-1.6V6.6A1.6 1.6 0 0 1 4 5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8.5" cy="10.5" r="1" fill="currentColor"/><circle cx="12" cy="10.5" r="1" fill="currentColor"/><circle cx="15.5" cy="10.5" r="1" fill="currentColor"/></svg>';
  var ICON_EMAIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 7.2l8 5.4 8-5.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_LINKEDIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

  var PLATFORMS = [
    { id: "sms",       label: "SMS",       icon: ICON_SMS },
    { id: "email",     label: "Email",     icon: ICON_EMAIL },
    { id: "instagram", label: "Instagram", icon: cdn("instagram") },
    { id: "facebook",  label: "Facebook",  icon: cdn("facebook") },
    { id: "reddit",    label: "Reddit",    icon: cdn("reddit") },
    { id: "x",         label: "X",         icon: cdn("x") },
    { id: "telegram",  label: "Telegram",  icon: cdn("telegram") },
    { id: "discord",   label: "Discord",   icon: cdn("discord") },
    { id: "snapchat",  label: "Snapchat",  icon: cdn("snapchat") },
    { id: "tiktok",    label: "TikTok",    icon: cdn("tiktok") },
    { id: "linkedin",  label: "LinkedIn",  icon: ICON_LINKEDIN },
    { id: "threads",   label: "Threads",   icon: cdn("threads") }
  ];
  var COPY_ONLY = { instagram: 1, discord: 1, snapchat: 1, tiktok: 1 };

  /* ================================================================
     render() — (re)build the dock from the current profile.
     ================================================================ */
  function render() {
    try {
      /* tear down any prior instance */
      var old = document.getElementById("pn-dock");
      if (old && old.parentNode) old.parentNode.removeChild(old);
      var oldModal = document.querySelector(".pn-dock-modalwrap");
      if (oldModal && oldModal.parentNode) oldModal.parentNode.removeChild(oldModal);
      document.documentElement.classList.remove("pn-dock-lock");

      var prof = readProfile();
      var revealed = !!(prof && prof.name);

      var name = "", slug = "", glyph = "✦", sub = "";
      if (revealed) {
        name = prof.name;
        slug = prof.slug || slugify(name);
        if (typeof prof.e === "number" && EAST_Z[prof.e]) glyph = EAST_Z[prof.e];
        var wN = (typeof prof.w === "number") ? WEST[prof.w] : "";
        var eN = (typeof prof.e === "number") ? EAST[prof.e] : "";
        sub = [ (wN && eN) ? (wN + " × " + eN) : (wN || eN || ""), prof.el || "" ]
                .filter(Boolean).join(" · ");
      }

      var origin = (location.protocol.indexOf("http") === 0)
        ? location.origin : "https://www.zodianimal.com";
      var SHARE_PATH = revealed ? ("/animals/" + slug + "/") : "/";
      var SHARE_SLUG = slug || "zodi-animal";
      var TEXT = revealed
        ? ("My Zodi Animal is the " + name + "." + (sub ? (" " + sub + ".") : "") + " What's yours?")
        : "Reveal your Zodi Animal, the primal mirror of your birth. What's yours?";

      function tagged(source) {
        var u = origin + SHARE_PATH;
        var q = "utm_source=" + encodeURIComponent(source)
              + "&utm_medium=social_share&utm_campaign=zodi_reveal"
              + "&utm_content=" + encodeURIComponent(SHARE_SLUG);
        return u + (u.indexOf("?") > -1 ? "&" : "?") + q;
      }
      function track(method) {
        try {
          if (typeof window.gtag === "function") {
            window.gtag("event", "share", { method: method, content_type: "zodi_animal", item_id: SHARE_SLUG });
          }
        } catch (e) {}
      }
      var INTENTS = {
        sms:      function (u) { return "sms:?&body=" + encodeURIComponent(TEXT + " " + u); },
        email:    function (u) { return "mailto:?subject=" + encodeURIComponent("My Zodi Animal") + "&body=" + encodeURIComponent(TEXT + "\n\n" + u); },
        facebook: function (u) { return "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(u); },
        reddit:   function (u) { return "https://www.reddit.com/submit?url=" + encodeURIComponent(u) + "&title=" + encodeURIComponent(TEXT); },
        x:        function (u) { return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(TEXT) + "&url=" + encodeURIComponent(u); },
        telegram: function (u) { return "https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(TEXT); },
        linkedin: function (u) { return "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(u); },
        threads:  function (u) { return "https://www.threads.net/intent/post?text=" + encodeURIComponent(TEXT + " " + u); }
      };

      /* ---- dock element ------------------------------------------ */
      var dock = document.createElement("div");
      dock.id = "pn-dock";
      dock.className = "pn-dock" + (revealed ? "" : " is-pre");
      dock.setAttribute("role", "region");
      dock.setAttribute("aria-label", "Your Zodi Animal");

      if (!revealed) {
        var cta = document.createElement("a");
        cta.className = "pn-dock-cta";
        cta.href = "/";
        cta.innerHTML = '<span class="pn-dock-spark" aria-hidden="true">✦</span> Unlock Your Zodi Animal';
        cta.addEventListener("click", function (e) {
          if (isHome()) {
            var field = document.getElementById("mm") || document.getElementById("read");
            if (field) {
              e.preventDefault();
              try { field.scrollIntoView({ behavior: (ctx && ctx.reduceMotion) ? "auto" : "smooth", block: "center" }); }
              catch (er) { location.hash = "read"; }
              window.setTimeout(function () {
                var mm = document.getElementById("mm"); if (mm) try { mm.focus(); } catch (e2) {}
              }, 480);
            }
          }
          /* off-homepage: default navigation to "/" lands on the form */
        });
        dock.appendChild(cta);
      } else {
        var animal = document.createElement("button");
        animal.type = "button";
        animal.className = "pn-dock-animal";
        animal.setAttribute("aria-haspopup", "true");
        animal.setAttribute("aria-expanded", "false");
        animal.innerHTML =
          '<span class="pn-dock-gl" aria-hidden="true">' + esc(glyph) + '</span>' +
          '<span class="pn-dock-nm">' + esc(name) +
            (sub ? '<small>' + esc(sub) + '</small>' : '') + '</span>' +
          '<span class="pn-dock-chev" aria-hidden="true">▲</span>';
        dock.appendChild(animal);

        var share = document.createElement("button");
        share.type = "button";
        share.className = "pn-dock-share";
        share.setAttribute("aria-label", "Share your Zodi Animal");
        share.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.1" fill="currentColor"/><circle cx="17" cy="6" r="2.1" fill="currentColor"/><circle cx="17" cy="18" r="2.1" fill="currentColor"/><path d="M8 11 15 7M8 13l7 4" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>';
        dock.appendChild(share);

        var sheet = document.createElement("div");
        sheet.className = "pn-dock-sheet";
        sheet.hidden = true;
        sheet.innerHTML =
          '<div class="pn-dock-sheet-cap">Reveal Your Primal Mirror</div>' +
          '<a class="pn-dock-act primary" href="/animals/' + esc(slug) + '/">' +
            '<span class="pn-dock-ic">' + SHEET_ICON_READ + '</span>' +
            '<span><b>Read your primal mirror</b><small>the full reading, gates and elements</small></span></a>' +
          '<a class="pn-dock-act" href="/match.html">' +
            '<span class="pn-dock-ic">' + SHEET_ICON_COMPARE + '</span>' +
            '<span>Compare with a friend<small>see where two skies cross</small></span></a>' +
          '<a class="pn-dock-act" href="/">' +
            '<span class="pn-dock-ic">' + SHEET_ICON_AGAIN + '</span>' +
            '<span>Reveal another animal<small>try a different birth date</small></span></a>';
        dock.appendChild(sheet);

        var sheetOpen = false;
        function toggleSheet(force) {
          sheetOpen = (typeof force === "boolean") ? force : !sheetOpen;
          sheet.hidden = !sheetOpen;
          animal.setAttribute("aria-expanded", sheetOpen ? "true" : "false");
          dock.classList.toggle("sheet-open", sheetOpen);
        }
        animal.addEventListener("click", function (e) { e.preventDefault(); toggleSheet(); });
        document.addEventListener("click", function (e) {
          if (sheetOpen && !dock.contains(e.target)) toggleSheet(false);
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && sheetOpen) toggleSheet(false);
        });
        share.addEventListener("click", function (e) { e.preventDefault(); openShareModal(); });
      }

      document.body.appendChild(dock);

      /* ---- share modal (lazy) ------------------------------------ */
      var modal = null, lastFocus = null;
      function buildModal() {
        if (modal) return modal;
        modal = document.createElement("div");
        modal.className = "pn-dock-modalwrap";
        modal.hidden = true;
        var tiles = PLATFORMS.map(function (pl) {
          return '<button class="pn-dock-tile" data-share="' + pl.id + '">' +
            '<span class="pn-dock-bd">' + pl.icon + '</span>' + esc(pl.label) + '</button>';
        }).join("");
        modal.innerHTML =
          '<div class="pn-dock-modal" role="dialog" aria-modal="true" aria-label="Share your Zodi Animal">' +
            '<button class="pn-dock-modal-close" aria-label="Close">&#10005;</button>' +
            '<p class="pn-dock-k">Pass it on</p>' +
            '<h3 class="pn-dock-h">Share your crossing</h3>' +
            '<div class="pn-dock-card"><p>' + esc(TEXT) + '</p></div>' +
            '<div class="pn-dock-tiles">' + tiles + '</div>' +
            '<div class="pn-dock-copywrap"><button class="pn-dock-copy" data-share="copy">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 8.5V6.4A1.9 1.9 0 0 0 13.6 4.5H6.4A1.9 1.9 0 0 0 4.5 6.4v7.2A1.9 1.9 0 0 0 6.4 15.5h2.1" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>' +
              '<span class="pn-dock-cl">Copy</span></button></div>' +
          '</div>';
        modal.addEventListener("click", function (e) {
          var t = e.target.closest ? e.target.closest("[data-share]") : null;
          if (t) {
            e.preventDefault();
            var pid = t.getAttribute("data-share");
            var url = tagged(pid);
            track(pid);
            if (pid === "copy" || COPY_ONLY[pid]) {
              try { if (navigator.clipboard) navigator.clipboard.writeText(TEXT + " " + url); } catch (er) {}
              var lbl = t.querySelector(".pn-dock-cl");
              t.classList.add("done");
              if (lbl) lbl.textContent = "Copied";
              setTimeout(function () { t.classList.remove("done"); if (lbl) lbl.textContent = "Copy"; }, 1600);
              return;
            }
            window.open(INTENTS[pid] ? INTENTS[pid](url) : url, "_blank", "noopener");
            return;
          }
          if ((e.target.closest && e.target.closest(".pn-dock-modal-close")) || e.target === modal) closeShareModal();
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && modal && !modal.hidden) closeShareModal();
        });
        document.body.appendChild(modal);
        return modal;
      }
      function openShareModal() {
        buildModal();
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.documentElement.classList.add("pn-dock-lock");
        var c = modal.querySelector(".pn-dock-modal-close");
        if (c) try { c.focus(); } catch (e) {}
      }
      function closeShareModal() {
        if (!modal) return;
        modal.hidden = true;
        document.documentElement.classList.remove("pn-dock-lock");
        if (lastFocus) try { lastFocus.focus(); } catch (e) {}
      }
    } catch (e) { /* never break the page */ }
  }

  /* build now, and again whenever the animal is (re)named */
  render();
  if (!window.__pnDockBound) {
    window.__pnDockBound = true;
    window.addEventListener("zodi:revealed", render);
    window.addEventListener("storage", function (e) {
      if (!e || e.key === "zodi:home-v2:profile") render();
    });
  }
};

/* sheet icons (module scope) */
var SHEET_ICON_READ = '<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="pnmA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe2b4"/><stop offset="1" stop-color="#a8925c"/></linearGradient><radialGradient id="pnmAi" cx="45%" cy="40%" r="60%"><stop offset="0" stop-color="#b79bf0"/><stop offset="100%" stop-color="#3d2a78"/></radialGradient></defs><ellipse cx="16" cy="12.5" rx="8.4" ry="9.6" fill="none" stroke="url(#pnmA)" stroke-width="1.6"/><path d="M16 22.2 V27.4 M12.5 28.6 h7" stroke="url(#pnmA)" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M9.2 12.5 C11.8 8.6,20.2 8.6,22.8 12.5 C20.2 16.4,11.8 16.4,9.2 12.5Z" fill="none" stroke="#efe2b4" stroke-width="1.1"/><circle cx="16" cy="12.5" r="3.2" fill="url(#pnmAi)"/><circle cx="16" cy="12.5" r="1.1" fill="#0a0c18"/></svg>';
var SHEET_ICON_COMPARE = '<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="pnmB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe2b4"/><stop offset="1" stop-color="#a8925c"/></linearGradient></defs><circle cx="12" cy="16" r="7.6" fill="none" stroke="url(#pnmB)" stroke-width="1.5"/><circle cx="20" cy="16" r="7.6" fill="none" stroke="#78b3c6" stroke-width="1.5"/><path d="M10.4 13 V19 M7.4 16 H13.4" stroke="#efe2b4" stroke-width="1.15" stroke-linecap="round"/><path d="M21.6 13 V19 M18.6 16 H24.6" stroke="#bfe4ee" stroke-width="1.15" stroke-linecap="round"/><circle cx="16" cy="16" r="1.5" fill="#8b7bff"/></svg>';
var SHEET_ICON_AGAIN = '<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="pnmC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe2b4"/><stop offset="1" stop-color="#a8925c"/></linearGradient></defs><path d="M24.5 12.5 A9 9 0 1 0 25 18.5" fill="none" stroke="url(#pnmC)" stroke-width="1.7" stroke-linecap="round"/><path d="M21.6 9.2 L24.9 12.4 L20.9 13.8" fill="none" stroke="url(#pnmC)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 11.4 l1.5 3.6 3.6 1.5 -3.6 1.5 -1.5 3.6 -1.5-3.6 -3.6-1.5 3.6-1.5Z" fill="#efe2b4"/></svg>';
