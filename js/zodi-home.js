/* ============================================================
   ZODI HOME — hydrates the Karmic Board and the identity-rail
   karma card on the homepage. Server-rendered rows stay in place
   when JS or the network fails; this layer only replaces them
   with live standings once real data arrives.
   Depends on: zodi-config.js, zodi-auth.js, zodi-karma.js.
   ============================================================ */
(function () {
  "use strict";
  if (!window.Zodi || !window.ZodiKarma) return;

  var fmt = window.ZodiKarma.fmt;
  var ACCOUNT_URL = (document.body && document.body.getAttribute("data-zodi-account")) || "account.html";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Karmic Board ---------- */
  function renderRows(rows) {
    var tbody = document.getElementById("kb-rows");
    if (!tbody || !rows || !rows.length) return;
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var t = window.Zodi.tier(r.zodi_karma);
      html += "<tr>" +
        '<td class="kb-rank">' + r.rank + "</td>" +
        '<td><span class="kb-name">' + esc(r.display_name) + "</span><br>" +
        '<span class="zodi-tier ' + t.cls + '"><span class="g">' + t.glyph + "</span>" + esc(t.name) + "</span></td>" +
        '<td class="kb-animal">' + esc(r.primal_name || "Unnamed") +
        (r.chinese_zodiac ? " &middot; " + esc(r.chinese_zodiac) : "") +
        (r.western_sign ? " " + esc(r.western_sign) : "") + "</td>" +
        '<td class="kb-karma">' + fmt(r.zodi_karma) + '<span class="u">ZK</span></td>' +
        "</tr>";
    }
    tbody.innerHTML = html;
  }

  function loadBoard(zodiac) {
    window.ZodiKarma.board(zodiac || null, 12).then(renderRows);
  }

  function wireTabs() {
    var tabs = document.querySelectorAll(".kb-tab");
    for (var i = 0; i < tabs.length; i++) {
      (function (tab) {
        tab.addEventListener("click", function () {
          for (var j = 0; j < tabs.length; j++) tabs[j].setAttribute("aria-selected", "false");
          tab.setAttribute("aria-selected", "true");
          loadBoard(tab.getAttribute("data-zodiac") || null);
        });
      })(tabs[i]);
    }
  }

  function showMyRank() {
    window.ZodiKarma.myRank().then(function (r) {
      var el = document.getElementById("kb-you");
      if (!el || !r) return;
      var p = window.Zodi.profile();
      el.innerHTML = "You stand <strong>#" + r.global_rank + "</strong> of " + r.total +
        " souls on the board" +
        (p && p.chinese_zodiac ? ", <strong>#" + r.zodiac_rank + "</strong> among the " + esc(p.chinese_zodiac) : "") + ".";
      el.classList.add("on");
    });
  }

  /* ---------- identity-rail karma card ---------- */
  function paintRail(session, profile) {
    var card = document.getElementById("zodi-rail");
    if (!card) return;
    if (session && profile) {
      var t = window.Zodi.tier(profile.zodi_karma);
      card.innerHTML =
        '<p class="rail-kicker rail-kicker--sec">Zodi Karma</p>' +
        '<p class="zr-balance">' + fmt(profile.zodi_karma) + ' <span class="u">ZK</span></p>' +
        '<p><span class="zodi-tier ' + t.cls + '"><span class="g">' + t.glyph + "</span>" + esc(t.name) + "</span></p>" +
        '<p class="zr-meta">' + esc(profile.display_name) +
        (profile.streak_days > 1 ? " &middot; " + profile.streak_days + "-day return streak" : "") + "</p>" +
        '<a class="zr-cta" href="' + ACCOUNT_URL + '">Open your ledger</a>';
    } else {
      var w = window.ZodiKarma.wandering();
      card.innerHTML =
        '<p class="rail-kicker rail-kicker--sec">Zodi Karma</p>' +
        (w > 0
          ? '<p class="zr-wander">You carry <b>' + fmt(w) + " unclaimed karma</b> from your wandering. An account banks it before it fades.</p>"
          : '<p class="zr-wander">Every return, reveal, and proverb earns karma. The board remembers who shows up.</p>') +
        '<a class="zr-cta" href="' + ACCOUNT_URL + '">Create your account</a>';
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireTabs();
    loadBoard(null);
    window.Zodi.onAuth(function (session, profile) {
      paintRail(session, profile);
      if (session) showMyRank();
    });
    paintRail(null, null);
    document.addEventListener("zodi:karma", function () {
      var sel = document.querySelector('.kb-tab[aria-selected="true"]');
      loadBoard(sel ? sel.getAttribute("data-zodiac") : null);
    });
  });
})();
