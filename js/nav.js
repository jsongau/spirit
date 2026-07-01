/* ============================================================
   THE PRIMAL ORACLE — mega navigation ORCHESTRATOR
   One include per page: <script src="js/nav.js"></script>
   Dropdown mega-nav: top-level groups open a roomy panel under
   the bar. Single-item groups render as plain links.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };

(function () {
  "use strict";
  const PNAV = window.PNAV;

  // Root-relative asset paths so the nav works from any URL depth (no <base> reliance).
  const CSS = ["/css/nav-core.css", "/css/nav-mega.css", "/css/nav-drawer.css"];
  const JS  = ["/js/nav-data.js", "/js/nav-search.js", "/js/nav-moon.js",
               "/js/nav-me.js", "/js/nav-progress.js", "/js/nav-drawer.js", "/js/nav-a11y.js"];

  const FALLBACK_MAP = [
    { h:"Discover", items:[
      ["/index.html","Find your animal","Read your birth date into one of 144 animals"],
      ["/menagerie.html","All 144 animals","Browse every Sun sign and year animal"],
      ["/daily.html","Today's reading","A short reading keyed to tonight's Moon"]]},
    { h:"Connect", items:[["/match.html","Test a match","Score any two people across both zodiacs"]]},
    { h:"Practice", items:[
      ["/moon.html","The Moon","Phases, charging, and the lunar calendar"],
      ["/stones.html","Your stones","Keeper stones and the crystal library"],
      ["/awakening.html","Awakening","The Third Eye path and sacred practice"]]},
    { h:"Understand", items:[["/learn.html","How it works","The two zodiacs, the Moon, and the reading"]]}
  ];

  // Normalize any href/path to its bare page key for active-state comparison.
  function baseOf(s){ s=(s||"").toLowerCase().replace(/[#?].*$/,""); if(s.endsWith("/")) s+="index.html"; return s.split("/").filter(Boolean).pop()||"index.html"; }
  const here = baseOf(window.PN_HERE || location.pathname);
  PNAV.here = here;
  PNAV.isActive = (href) => baseOf(href) === here;

  function loadCss(href){
    return new Promise((res)=>{
      if (document.querySelector(`link[data-pn="${href}"]`)) return res();
      const l=document.createElement("link"); l.rel="stylesheet"; l.href=href; l.setAttribute("data-pn",href);
      l.onload=()=>res(); l.onerror=()=>res(); document.head.appendChild(l);
    });
  }
  function loadJs(src){
    return new Promise((res)=>{
      if (document.querySelector(`script[data-pn="${src}"]`)) return res();
      const s=document.createElement("script"); s.src=src; s.async=false; s.setAttribute("data-pn",src);
      s.onload=()=>res(); s.onerror=()=>res(); document.body.appendChild(s);
    });
  }

  function groupActive(g){ return g.items.some(it=>PNAV.isActive(it[0])); }

  function buildSkeleton(){
    document.body.classList.add("pn-has-bar");
    const old = document.querySelector("header.top");
    if (old) old.style.display = "none";

    const MAP = PNAV.MAP || FALLBACK_MAP;

    const bar = document.createElement("header");
    bar.className = "pn-bar"; bar.setAttribute("role","banner");
    bar.innerHTML =
      `<div class="pn-inner">
         <a class="pn-brand" href="/index.html">The Primal <b>Oracle</b></a>
         <nav class="pn-nav" aria-label="Primary"></nav>
         <div class="pn-tools"></div>
         <button class="pn-burger" type="button" aria-label="Open menu">&#9776;</button>
       </div>
       <div class="pn-dd" data-dd><div class="pn-dd-mount"></div></div>`;
    document.body.insertBefore(bar, document.body.firstChild);

    const navEl = bar.querySelector(".pn-nav");
    const dd    = bar.querySelector(".pn-dd");
    const ddMount = bar.querySelector(".pn-dd-mount");

    // build top-level items
    MAP.forEach((g, i) => {
      if (g.items.length === 1) {
        const [h,t] = g.items[0];
        const a = document.createElement("a");
        a.className = "pn-link" + (PNAV.isActive(h) ? " active" : "");
        a.href = h; a.textContent = t;
        navEl.appendChild(a);
      } else {
        const item = document.createElement("div");
        item.className = "pn-item";
        item.innerHTML = `<button class="pn-trigger${groupActive(g)?' active':''}" type="button" aria-haspopup="true" aria-expanded="false" data-group="${i}">${g.h}<span class="chev" aria-hidden="true"></span></button>`;
        navEl.appendChild(item);
      }
    });

    function ddHTML(g){
      return `<div class="pn-dd-inner">
        <div class="pn-dd-eyebrow">${g.h}</div>
        <div class="pn-dd-cards">
          ${g.items.map(it=>{ const [h,t,d]=it; return `<a class="dd-card${PNAV.isActive(h)?' active':''}" href="${h}"><span class="t">${t}</span><span class="d">${d||''}</span></a>`; }).join("")}
        </div>
      </div>`;
    }

    let openIdx = -1, closeTimer = null;
    const triggers = () => Array.from(navEl.querySelectorAll(".pn-trigger"));
    function openGroup(i){
      clearTimeout(closeTimer);
      if (openIdx === i && dd.classList.contains("open")) return;
      openIdx = i;
      ddMount.innerHTML = ddHTML(MAP[i]);
      dd.classList.add("open");
      triggers().forEach(t=>{ const on = +t.dataset.group===i; t.classList.toggle("expanded",on); t.setAttribute("aria-expanded",on?"true":"false"); });
    }
    function closeDD(){
      dd.classList.remove("open"); openIdx=-1;
      triggers().forEach(t=>{ t.classList.remove("expanded"); t.setAttribute("aria-expanded","false"); });
    }
    function softClose(){ clearTimeout(closeTimer); closeTimer=setTimeout(closeDD,160); }

    navEl.addEventListener("mouseover",(e)=>{ const t=e.target.closest(".pn-trigger"); if(t) openGroup(+t.dataset.group); else if(e.target.closest(".pn-link")) softClose(); });
    navEl.addEventListener("focusin",(e)=>{ const t=e.target.closest(".pn-trigger"); if(t) openGroup(+t.dataset.group); });
    navEl.addEventListener("click",(e)=>{ const t=e.target.closest(".pn-trigger"); if(!t) return; e.preventDefault(); (openIdx===+t.dataset.group && dd.classList.contains("open"))?closeDD():openGroup(+t.dataset.group); });
    navEl.addEventListener("mouseleave", softClose);
    dd.addEventListener("mouseenter",()=>clearTimeout(closeTimer));
    dd.addEventListener("mouseleave", softClose);
    document.addEventListener("keydown",(e)=>{ if(e.key==="Escape"){ closeDD(); closeDrawer(); }});
    document.addEventListener("click",(e)=>{ if(!bar.contains(e.target)) closeDD(); });

    // tools row gets the chips from feature modules; keep a slot ref
    const tools = bar.querySelector(".pn-tools");
    const burger = bar.querySelector(".pn-burger");

    // theme toggle (light default, dark on request)
    const themeBtn = document.createElement("button");
    themeBtn.type = "button"; themeBtn.className = "pn-chip pn-theme";
    themeBtn.setAttribute("aria-label", "Toggle light or dark theme");
    function syncTheme(){
      const d = (window.THEME && THEME.current) ? THEME.current() : (document.documentElement.getAttribute("data-theme") || "light");
      themeBtn.innerHTML = '<span class="v" aria-hidden="true">' + (d === "dark" ? "☾" : "☀") + '</span><span class="lbl">' + (d === "dark" ? "Dark" : "Light") + '</span>';
      themeBtn.setAttribute("aria-pressed", d === "dark" ? "true" : "false");
    }
    themeBtn.addEventListener("click", function(){
      if (window.THEME) { THEME.toggle(); }
      else { const el = document.documentElement; el.setAttribute("data-theme", el.getAttribute("data-theme") === "dark" ? "light" : "dark"); }
      syncTheme();
    });
    tools.appendChild(themeBtn);
    PNAV.syncTheme = syncTheme; syncTheme();

    // mobile drawer
    const drawer = document.createElement("div");
    drawer.className="pn-drawer"; drawer.setAttribute("role","dialog"); drawer.setAttribute("aria-label","Menu");
    drawer.innerHTML = `<div class="drawer-sheet"></div>`;
    document.body.appendChild(drawer);

    const openDrawer = ()=>{ drawer.classList.add("open"); document.body.style.overflow="hidden"; document.dispatchEvent(new CustomEvent("pn:drawer-open")); };
    const closeDrawer = ()=>{ drawer.classList.remove("open"); document.body.style.overflow=""; document.dispatchEvent(new CustomEvent("pn:drawer-close")); };
    burger.addEventListener("click", openDrawer);
    drawer.addEventListener("click",(e)=>{ if(e.target===drawer) closeDrawer(); });

    const ctx = { bar, inner:bar.querySelector(".pn-inner"), nav:navEl, tools, explore:null, burger,
                  dd, mega:dd, drawer, drawerSheet:drawer.querySelector(".drawer-sheet"),
                  MAP, here, ENGINE: window.ENGINE,
                  openDrawer, closeDrawer, closeDD };
    PNAV.ctx = ctx;

    ["me","moon","progress","search","drawer","a11y"].forEach((name)=>{
      const fn = PNAV.features && PNAV.features[name];
      if (typeof fn === "function") { try { fn(ctx); } catch(e){} }
    });
  }

  async function boot(){
    await Promise.all(CSS.map(loadCss));
    for (const s of JS) { await loadJs(s); }
    buildSkeleton();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
