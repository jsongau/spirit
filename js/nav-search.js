/* ============================================================
   THE PRIMAL ORACLE — nav-search
   A command-palette search for the mega navigation.
   Mounted by the orchestrator: PNAV.features.search(ctx).
   ctx provides: tools, explore, MAP (array of {h, items:[[href,title,desc]]}).
   Fully defensive: missing ctx or MAP returns quietly.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };

(function () {
  "use strict";
  const PNAV = window.PNAV;

  PNAV.features.search = function (ctx) {
    if (!ctx || !Array.isArray(ctx.MAP)) return;

    /* ---- one-time CSS injection (every class prefixed pns-) ---- */
    if (!document.getElementById("pns-style")) {
      const style = document.createElement("style");
      style.id = "pns-style";
      style.textContent = `
.pns-overlay{
  position:fixed; inset:0; z-index:200;
  display:none; align-items:flex-start; justify-content:center;
  padding:14vh 18px 18px;
  background:rgba(7,8,16,.66);
  backdrop-filter:blur(6px) saturate(120%);
  -webkit-backdrop-filter:blur(6px) saturate(120%);
}
.pns-overlay.pns-open{display:flex}
.pns-card{
  width:100%; max-width:560px;
  background:linear-gradient(180deg,#191b30,#14162a);
  border:1px solid rgba(214,193,140,.22);
  border-radius:16px;
  box-shadow:0 24px 70px rgba(0,0,0,.55);
  overflow:hidden;
  font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
.pns-field{
  display:flex; align-items:center; gap:11px;
  padding:15px 18px;
  border-bottom:1px solid rgba(214,193,140,.16);
}
.pns-field svg{flex:0 0 auto; color:#d6c18c}
.pns-input{
  flex:1 1 auto; min-width:0;
  background:transparent; border:0; outline:none;
  color:#ece7d8; font-size:1rem; line-height:1.3;
  font-family:inherit;
}
.pns-input::placeholder{color:#9a9bb0}
.pns-list{
  list-style:none; margin:0; padding:6px;
  max-height:46vh; overflow:auto;
}
.pns-row{
  display:flex; align-items:baseline; justify-content:space-between; gap:12px;
  padding:11px 13px; border-radius:10px;
  cursor:pointer;
  border:1px solid transparent;
}
.pns-row:hover,.pns-row.pns-active{
  background:rgba(214,193,140,.1);
  border-color:rgba(214,193,140,.28);
}
.pns-title{
  font-family:"Cormorant Garamond",Georgia,"Times New Roman",serif;
  font-size:1.16rem; color:#f5ecd2; letter-spacing:.3px;
}
.pns-group{
  flex:0 0 auto;
  font-size:.7rem; letter-spacing:.08em; text-transform:uppercase;
  color:#d6c18c; opacity:.85;
}
.pns-empty{
  padding:22px 16px; text-align:center;
  color:#9a9bb0; font-size:.9rem;
}
`;
      document.head.appendChild(style);
    }

    /* ---- flatten the MAP into a searchable index ---- */
    const items = [];
    ctx.MAP.forEach((group) => {
      if (!group || !Array.isArray(group.items)) return;
      const groupName = group.h || "";
      group.items.forEach((it) => {
        if (!Array.isArray(it)) return;
        const href = it[0] || "";
        const title = it[1] || "";
        const desc = it[2] || "";
        if (!href || !title) return;
        items.push({ href, title, desc, group: groupName });
      });
    });

    const MAX = 8;

    /* ---- trigger chip, inserted into tools before explore ---- */
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "pn-chip";
    chip.setAttribute("aria-label", "Search the Oracle");
    chip.innerHTML =
      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">` +
      `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` +
      `</svg><span class="lbl">Search</span>`;
    if (ctx.tools && ctx.explore && ctx.explore.parentNode === ctx.tools) {
      ctx.tools.insertBefore(chip, ctx.explore);
    } else if (ctx.tools) {
      ctx.tools.appendChild(chip);
    }

    /* ---- overlay card ---- */
    const overlay = document.createElement("div");
    overlay.className = "pns-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Search the Oracle");
    overlay.innerHTML =
      `<div class="pns-card">
         <div class="pns-field">
           <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
             <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
             <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
           </svg>
           <input class="pns-input" type="text" placeholder="Search the Oracle"
                  autocomplete="off" spellcheck="false" aria-label="Search the Oracle">
         </div>
         <ul class="pns-list" role="listbox"></ul>
       </div>`;
    document.body.appendChild(overlay);

    const input = overlay.querySelector(".pns-input");
    const list = overlay.querySelector(".pns-list");

    let results = [];
    let active = -1;

    function esc(s) {
      return String(s).replace(/[&<>"]/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    }

    function filter(q) {
      const query = (q || "").trim().toLowerCase();
      if (!query) return items.slice(0, MAX);
      return items
        .filter((it) =>
          (it.title + " " + it.desc + " " + it.group).toLowerCase().includes(query))
        .slice(0, MAX);
    }

    function render() {
      if (!results.length) {
        list.innerHTML = `<li class="pns-empty">No matches yet. Try another word.</li>`;
        return;
      }
      list.innerHTML = results
        .map((it, i) =>
          `<li class="pns-row${i === active ? " pns-active" : ""}" role="option"` +
          ` data-i="${i}" data-href="${esc(it.href)}">` +
          `<span class="pns-title">${esc(it.title)}</span>` +
          `<span class="pns-group">${esc(it.group)}</span></li>`)
        .join("");
    }

    function update() {
      results = filter(input.value);
      active = results.length ? 0 : -1;
      render();
    }

    function setActive(i) {
      if (!results.length) return;
      active = (i + results.length) % results.length;
      render();
      const row = list.querySelector(`.pns-row[data-i="${active}"]`);
      if (row && row.scrollIntoView) row.scrollIntoView({ block: "nearest" });
    }

    function go(href) {
      if (href) location.href = href;
    }

    function open() {
      overlay.classList.add("pns-open");
      document.body.style.overflow = "hidden";
      input.value = "";
      update();
      setTimeout(() => input.focus(), 0);
    }

    function close() {
      overlay.classList.remove("pns-open");
      document.body.style.overflow = "";
    }

    function isOpen() {
      return overlay.classList.contains("pns-open");
    }

    /* ---- wiring ---- */
    chip.addEventListener("click", open);

    input.addEventListener("input", update);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    list.addEventListener("click", (e) => {
      const row = e.target.closest(".pns-row");
      if (row) go(row.getAttribute("data-href"));
    });

    list.addEventListener("mousemove", (e) => {
      const row = e.target.closest(".pns-row");
      if (row) {
        const i = parseInt(row.getAttribute("data-i"), 10);
        if (i !== active) { active = i; render(); }
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        if (active >= 0 && results[active]) go(results[active].href);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });

    document.addEventListener("keydown", (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        isOpen() ? close() : open();
        return;
      }
      if (isOpen() && e.key === "Escape") { close(); return; }
      if (e.key === "/" && !isOpen()) {
        const t = e.target;
        const tag = t && t.tagName ? t.tagName.toLowerCase() : "";
        const typing = tag === "input" || tag === "textarea" || tag === "select" ||
                       (t && t.isContentEditable);
        if (!typing) { e.preventDefault(); open(); }
      }
    });
  };
})();
