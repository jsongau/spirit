/* ============================================================
   nav.js  —  Zodianimal.com mega-nav HYDRATOR (Phase 3)
   One include per page: <script src="/js/nav.js" defer></script>
   ------------------------------------------------------------
   Everything routes with JS OFF: the panels are pre-rendered real
   anchors and the hidden nav.pn-crawl mirror lists every URL. This
   script is pure progressive enhancement. It:

     - hydrates the seven pre-rendered .pn-panel drop sheets (open on
       click or hover-intent, one at a time, [hidden] toggled, .open
       added, aria-expanded synced),
     - closes on click-outside and Escape (Escape returns focus to
       the trigger),
     - runs a roving keyboard model inside the open panel: Up/Down
       between rows, Left/Right jump columns, Home/End first/last,
       Left/Right at a bar trigger move between triggers (doc 03 s6),
     - builds a mobile accordion drawer FROM the pre-rendered panels,
       with a focus trap, body-scroll lock, Escape + burger close,
       and focus returned to the burger.

   All motion is guarded behind prefers-reduced-motion. If the static
   bar is absent (legacy page) it degrades quietly and just loads the
   feature modules; it never rebuilds panels from data.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };

(function () {
  "use strict";
  const PNAV = window.PNAV;
  const doc = document;

  const CSS = ["/css/nav-core.css", "/css/nav-mega.css", "/css/nav-drawer.css"];
  const JS  = ["/js/nav-data.js", "/js/nav-search.js", "/js/nav-moon.js",
               "/js/nav-me.js", "/js/nav-progress.js", "/js/nav-a11y.js"];

  const reduceMotion = () =>
    window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function norm(s) {
    s = (s || "").toLowerCase().replace(/[#?].*$/, "");
    if (!s.startsWith("/")) s = "/" + s;
    if (s.endsWith("/")) s += "index.html";
    return s;
  }
  const here = norm(location.pathname);
  PNAV.here = here;
  PNAV.isActive = (href) => norm(href) === here;

  function loadCss(href) {
    return new Promise((res) => {
      if (doc.querySelector(`link[data-pn="${href}"]`)) return res();
      const l = doc.createElement("link");
      l.rel = "stylesheet"; l.href = href; l.setAttribute("data-pn", href);
      l.onload = () => res(); l.onerror = () => res();
      doc.head.appendChild(l);
    });
  }
  function loadJs(src) {
    return new Promise((res) => {
      if (doc.querySelector(`script[data-pn="${src}"]`)) return res();
      const s = doc.createElement("script");
      s.src = src; s.async = false; s.setAttribute("data-pn", src);
      s.onload = () => res(); s.onerror = () => res();
      doc.body.appendChild(s);
    });
  }

  /* =========================================================
     DESKTOP PANELS: hydrate the pre-rendered drop sheets.
     ========================================================= */
  function wirePanels(bar) {
    const navEl   = bar.querySelector(".pn-nav");
    if (!navEl) return { openGroup: () => {}, closeAll: () => {} };

    const triggers = () => Array.from(navEl.querySelectorAll(".pn-trigger"));
    const panelFor = (g) => bar.querySelector(`.pn-panel[data-group="${g}"]`)
                         || doc.querySelector(`.pn-panel[data-group="${g}"]`);
    const rowsIn   = (panel) => Array.from(panel.querySelectorAll(".pn-row"));

    let openIdx = -1;
    let closeTimer = null;

    function markTrigger(i, on) {
      const t = triggers().find((b) => +b.dataset.group === i);
      if (t) t.setAttribute("aria-expanded", on ? "true" : "false");
    }

    function closeAll(returnFocus) {
      if (openIdx === -1) return;
      const panel = panelFor(openIdx);
      const prev = openIdx;
      openIdx = -1;
      if (panel) {
        panel.classList.remove("open");
        panel.setAttribute("hidden", "");
      }
      markTrigger(prev, false);
      if (returnFocus) {
        const t = triggers().find((b) => +b.dataset.group === prev);
        if (t) t.focus();
      }
    }

    function openGroup(i, focusFirstRow) {
      clearTimeout(closeTimer);
      if (openIdx === i) {
        if (focusFirstRow) {
          const rows = rowsIn(panelFor(i));
          if (rows[0]) rows[0].focus();
        }
        return;
      }
      if (openIdx !== -1) closeAll(false);
      const panel = panelFor(i);
      if (!panel) return;
      openIdx = i;
      panel.removeAttribute("hidden");
      panel.classList.add("open");
      markTrigger(i, true);
      if (focusFirstRow) {
        const rows = rowsIn(panel);
        if (rows[0]) rows[0].focus();
      }
    }

    function softClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => closeAll(false), 160);
    }

    /* ---- pointer: hover-intent open, soft close on leave ---- */
    navEl.addEventListener("mouseover", (e) => {
      const t = e.target.closest(".pn-trigger");
      if (t) openGroup(+t.dataset.group, false);
      else if (e.target.closest(".pn-link")) softClose();
    });
    navEl.addEventListener("mouseleave", softClose);

    /* keep open while pointer is inside a panel */
    triggers().forEach((t) => {
      const panel = panelFor(+t.dataset.group);
      if (!panel) return;
      panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
      panel.addEventListener("mouseleave", softClose);
    });

    /* ---- click: toggle (works with keyboard Enter/Space too) ---- */
    navEl.addEventListener("click", (e) => {
      const t = e.target.closest(".pn-trigger");
      if (!t) return;
      e.preventDefault();
      const g = +t.dataset.group;
      if (openIdx === g) closeAll(true);
      else openGroup(g, false);
    });

    /* ---- outside click + Escape ---- */
    doc.addEventListener("click", (e) => {
      if (!bar.contains(e.target)) closeAll(false);
    });
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && openIdx !== -1) { e.preventDefault(); closeAll(true); }
    });

    /* ---- roving keyboard model, doc 03 section 6 ---- */
    navEl.addEventListener("keydown", (e) => {
      const t = e.target.closest(".pn-trigger");
      if (!t) return;
      const list = triggers();
      const idx  = list.indexOf(t);
      const g    = +t.dataset.group;
      switch (e.key) {
        case "ArrowDown":
        case "Enter":
        case " ":
          e.preventDefault();
          openGroup(g, true);           // open and dive to first row
          break;
        case "ArrowRight":
          e.preventDefault();
          (list[idx + 1] || list[0]).focus();
          break;
        case "ArrowLeft":
          e.preventDefault();
          (list[idx - 1] || list[list.length - 1]).focus();
          break;
        case "ArrowUp":
        case "Escape":
          closeAll(false);
          break;
      }
    });

    /* keyboard within an open panel: rows + columns */
    bar.addEventListener("keydown", (e) => {
      const row = e.target.closest(".pn-row");
      if (!row) return;
      const panel = row.closest(".pn-panel");
      if (!panel || !panel.classList.contains("open")) return;
      const g = +panel.dataset.group;
      const cols = Array.from(panel.querySelectorAll(".pn-col"));
      const rows = rowsIn(panel);
      const flatIdx = rows.indexOf(row);

      const focusRow = (r) => { if (r) r.focus(); };
      const colOf = (r) => cols.findIndex((c) => c.contains(r));
      const rowsOfCol = (ci) => (cols[ci] ? Array.from(cols[ci].querySelectorAll(".pn-row")) : rows);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(); focusRow(rows[Math.min(flatIdx + 1, rows.length - 1)]); break;
        case "ArrowUp":
          e.preventDefault();
          if (flatIdx <= 0) {
            const t = triggers().find((b) => +b.dataset.group === g);
            closeAll(false); if (t) t.focus();
          } else focusRow(rows[flatIdx - 1]);
          break;
        case "ArrowRight": {
          e.preventDefault();
          const ci = colOf(row);
          if (ci < 0 || cols.length < 2) break;
          const within = rowsOfCol(ci).indexOf(row);
          const next = rowsOfCol(Math.min(ci + 1, cols.length - 1));
          focusRow(next[Math.min(within, next.length - 1)] || next[0]);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const ci = colOf(row);
          if (ci < 0 || cols.length < 2) break;
          const within = rowsOfCol(ci).indexOf(row);
          const prev = rowsOfCol(Math.max(ci - 1, 0));
          focusRow(prev[Math.min(within, prev.length - 1)] || prev[0]);
          break;
        }
        case "Home":
          e.preventDefault(); focusRow(rows[0]); break;
        case "End":
          e.preventDefault(); focusRow(rows[rows.length - 1]); break;
        case "Escape": {
          e.preventDefault();
          const t = triggers().find((b) => +b.dataset.group === g);
          closeAll(false); if (t) t.focus();
          break;
        }
      }
    });

    return { openGroup, closeAll };
  }

  /* =========================================================
     MOBILE DRAWER: accordion built from the pre-rendered panels.
     ========================================================= */
  function buildDrawer(bar) {
    const burger = bar.querySelector(".pn-burger");
    if (!burger) return { open: () => {}, close: () => {} };

    const panels = Array.from(bar.querySelectorAll(".pn-panel"));
    const brand  = bar.querySelector(".pn-brand");

    const drawer = doc.createElement("div");
    drawer.className = "pn-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", "Menu");

    const sheet = doc.createElement("div");
    sheet.className = "pn-drawer-sheet";
    drawer.appendChild(sheet);

    /* top: brand + close */
    const top = doc.createElement("div");
    top.className = "pn-drawer-top";
    const brandLink = doc.createElement("a");
    brandLink.className = "pn-drawer-brand";
    brandLink.href = "/index.html";
    brandLink.innerHTML = brand ? brand.innerHTML : "The Primal <b>Oracle</b>";
    const closeBtn = doc.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "pn-drawer-close";
    closeBtn.textContent = "Close";
    top.append(brandLink, closeBtn);
    sheet.appendChild(top);

    /* accordion: one group per pre-rendered panel */
    const acc = doc.createElement("div");
    acc.className = "pn-acc";
    sheet.appendChild(acc);

    // walk the bar nav in DOM order: .pn-item (panel trigger) or .pn-link
    // (single-destination group, rendered as a plain anchor by the build).
    const navEl = bar.querySelector(".pn-nav");
    const barKids = navEl ? Array.from(navEl.children) : [];

    barKids.forEach((kid) => {
      // single-destination group: a plain link becomes a plain accordion link
      const plainLink = kid.matches && kid.matches("a.pn-link") ? kid
                      : (kid.querySelector && kid.querySelector(":scope > a.pn-link"));
      if (plainLink && !kid.querySelector(".pn-trigger")) {
        const a = doc.createElement("a");
        a.className = "pn-acc-link";
        a.href = plainLink.getAttribute("href") || "#";
        a.textContent = (plainLink.textContent || "").trim();
        acc.appendChild(a);
        return;
      }

      const trig = kid.querySelector && kid.querySelector(".pn-trigger");
      if (!trig) return;
      const g = trig.dataset.group;
      const label = (trig.textContent || "").trim();
      const panel = panels.find((p) => p.dataset.group === g);
      if (!panel) {
        // trigger without a panel (shouldn't happen): render as a link if it has href
        const href = trig.getAttribute("data-href") || trig.getAttribute("href");
        if (href) {
          const a = doc.createElement("a");
          a.className = "pn-acc-link";
          a.href = href;
          a.textContent = label;
          acc.appendChild(a);
        }
        return;
      }
      const group = doc.createElement("div");
      group.className = "pn-acc-group";
      if (panel.dataset.accent) group.setAttribute("data-accent", panel.dataset.accent);

      const bodyId = "pn-acc-" + g;
      const head = doc.createElement("button");
      head.type = "button";
      head.className = "pn-acc-head";
      head.setAttribute("aria-expanded", "false");
      head.setAttribute("aria-controls", bodyId);
      head.innerHTML = `<span>${label}</span><span class="pn-acc-chev" aria-hidden="true"></span>`;

      const body = doc.createElement("div");
      body.className = "pn-acc-body";
      body.id = bodyId;

      const eyebrow = panel.querySelector(".pn-panel-eyebrow");
      if (eyebrow) {
        const p = doc.createElement("p");
        p.className = "pn-eyebrow-sub";
        p.textContent = eyebrow.textContent;
        body.appendChild(p);
      }
      // clone the real anchors so routing is identical to desktop
      panel.querySelectorAll(".pn-row").forEach((row) => {
        body.appendChild(row.cloneNode(true));
      });
      const foot = panel.querySelector(".pn-panel-foot");
      if (foot) body.appendChild(foot.cloneNode(true));

      head.addEventListener("click", () => {
        const open = group.classList.toggle("open");
        head.setAttribute("aria-expanded", open ? "true" : "false");
      });

      group.append(head, body);
      acc.appendChild(group);
    });

    doc.body.appendChild(drawer);

    /* ---- focus trap ---- */
    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    function focusables() {
      return Array.from(sheet.querySelectorAll(FOCUSABLE))
        .filter((el) => el.offsetParent !== null || el === doc.activeElement);
    }
    let lastFocus = null;

    function open() {
      lastFocus = doc.activeElement;
      drawer.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
      doc.body.style.overflow = "hidden";
      const f = focusables();
      (f[0] || closeBtn).focus();
      doc.dispatchEvent(new CustomEvent("pn:drawer-open"));
    }
    function close(returnFocus) {
      drawer.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      doc.body.style.overflow = "";
      if (returnFocus !== false) (lastFocus || burger).focus();
      doc.dispatchEvent(new CustomEvent("pn:drawer-close"));
    }

    burger.addEventListener("click", open);
    closeBtn.addEventListener("click", () => close());
    drawer.addEventListener("click", (e) => { if (e.target === drawer) close(); });

    drawer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    return { open, close, drawer };
  }

  /* =========================================================
     WIRE + FEATURE MODULES
     ========================================================= */
  function wire(bar) {
    doc.body.classList.add("pn-has-bar");
    const panels = wirePanels(bar);
    const drawer = buildDrawer(bar);

    // Escape also closes the drawer if it happens to be open (belt + braces)
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape") panels.closeAll(false);
    });

    const ctx = {
      bar,
      inner: bar.querySelector(".pn-inner"),
      nav: bar.querySelector(".pn-nav"),
      tools: bar.querySelector(".pn-tools"),
      burger: bar.querySelector(".pn-burger"),
      drawer: drawer.drawer,
      openDrawer: drawer.open,
      closeDrawer: drawer.close,
      openGroup: panels.openGroup,
      closeAll: panels.closeAll,
      here,
      reduceMotion: reduceMotion(),
      ENGINE: window.ENGINE,
    };
    PNAV.ctx = ctx;

    ["me", "moon", "progress", "search", "a11y"].forEach((name) => {
      const fn = PNAV.features && PNAV.features[name];
      if (typeof fn === "function") { try { fn(ctx); } catch (e) {} }
    });
  }

  async function boot() {
    const staticBar = doc.querySelector("header.pn-bar");
    await Promise.all(CSS.map(loadCss));
    for (const s of JS) { await loadJs(s); }
    if (!staticBar) return;      // no static bar: routing already works via crawl; nothing to hydrate
    wire(staticBar);
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
