/* ============================================================
   THE PRIMAL ORACLE — mobile drawer content + accordion
   Feature: PNAV.features.drawer(ctx)
   ctx: { drawer, drawerSheet, MAP, closeDrawer, here }
   ============================================================ */
window.PNAV = window.PNAV || { features:{} };
PNAV.features = PNAV.features || {};

PNAV.features.drawer = function(ctx){
  if(!ctx || !ctx.drawerSheet || !Array.isArray(ctx.MAP)) return;

  var sheet = ctx.drawerSheet;
  var MAP = ctx.MAP;
  var here = ctx.here || "";

  function esc(s){
    return String(s == null ? "" : s)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }

  var html = "";

  // ---- top: brand + close ----
  html += '<div class="pn-dtop">';
  html +=   '<span class="pn-dbrand">The Primal <b>Oracle</b></span>';
  html +=   '<button type="button" class="pn-dclose" aria-label="Close menu">Close</button>';
  html += '</div>';

  // ---- accordion groups ----
  for(var g = 0; g < MAP.length; g++){
    var group = MAP[g] || {};
    var items = Array.isArray(group.items) ? group.items : [];
    var openClass = g === 0 ? " open" : "";

    html += '<div class="pn-dgroup' + openClass + '">';
    html +=   '<button type="button" class="pn-dhead">';
    html +=     '<span>' + esc(group.h) + '</span>';
    html +=     '<span class="chev" aria-hidden="true">▾</span>';
    html +=   '</button>';
    html +=   '<div class="pn-dbody">';

    for(var i = 0; i < items.length; i++){
      var row = items[i] || [];
      var href = row[0] || "#";
      var title = row[1] || "";
      var desc = row[2] || "";
      var active = href === here ? " active" : "";

      html += '<a class="pn-dlink' + active + '" href="' + esc(href) + '">';
      html +=   esc(title);
      if(desc){
        html += '<span class="d">' + esc(desc) + '</span>';
      }
      html += '</a>';
    }

    html +=   '</div>';
    html += '</div>';
  }

  // ---- bottom quick tools ----
  html += '<div class="pn-dtools">';
  html +=   '<a href="daily.html">Today</a>';
  html +=   '<a href="moon.html">The Moon</a>';
  html +=   '<a href="awakening.html">Awakening</a>';
  html += '</div>';

  sheet.innerHTML = html;

  // ---- behavior ----
  function close(){
    if(typeof ctx.closeDrawer === "function") ctx.closeDrawer();
  }

  var closeBtn = sheet.querySelector(".pn-dclose");
  if(closeBtn){
    closeBtn.addEventListener("click", function(e){
      e.preventDefault();
      close();
    });
  }

  // accordion: toggle the group's own open class (others may stay open)
  var heads = sheet.querySelectorAll(".pn-dhead");
  for(var h = 0; h < heads.length; h++){
    heads[h].addEventListener("click", function(){
      var grp = this.parentNode;
      if(grp && grp.classList) grp.classList.toggle("open");
    });
  }

  // links navigate normally; close the drawer first
  var links = sheet.querySelectorAll(".pn-dlink, .pn-dtools a");
  for(var l = 0; l < links.length; l++){
    links[l].addEventListener("click", function(){
      close();
    });
  }
};
