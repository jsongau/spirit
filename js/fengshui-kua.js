/* ============================================================
   fengshui-kua.js — the Kua number calculator (八宅 Eight Mansions).
   Vanilla, no deps. Computes the Kua number from a birth date and
   sex, using the solar-year boundary at the start of spring (立春,
   about the fourth of February), and names the four favorable
   directions. Symbolic guidance, never a promise. Enhancement only:
   the page reads fine with no JS.
   Hooks: #kuaForm, #kuaDate, radio name="kuaSex", #kuaResult.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };

  // favorable directions per Kua, in order: Sheng Qi, Tian Yi, Yan Nian, Fu Wei
  var FAV = {
    1: ["SE", "E", "S", "N"],
    2: ["NE", "W", "NW", "SW"],
    3: ["S", "N", "SE", "E"],
    4: ["N", "S", "E", "SE"],
    6: ["W", "NE", "SW", "NW"],
    7: ["NW", "SW", "NE", "W"],
    8: ["SW", "NW", "W", "NE"],
    9: ["E", "SE", "N", "S"]
  };
  var FAV_LABEL = [
    ["Sheng Qi, 生氣", "the strongest, for vitality and momentum"],
    ["Tian Yi, 天醫", "the heavenly doctor, a category name, not medical advice"],
    ["Yan Nian, 延年", "for steadiness and relationships"],
    ["Fu Wei, 伏位", "for a settled foundation"]
  ];
  var DIRNAME = { N: "North", NE: "Northeast", E: "East", SE: "Southeast", S: "South", SW: "Southwest", W: "West", NW: "Northwest" };
  var EAST = { 1: 1, 3: 1, 4: 1, 9: 1 };

  function reduceDigit(n) { while (n > 9) { n = String(n).split("").reduce(function (a, d) { return a + (+d); }, 0); } return n; }

  function kuaFrom(dateStr, sex) {
    var d = new Date(dateStr + "T12:00:00");
    if (isNaN(d)) return null;
    var y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
    // solar-year boundary: before ~Feb 4 belongs to the previous year
    if (m < 2 || (m === 2 && day < 4)) y -= 1;
    var last2 = y % 100;
    var digit = reduceDigit(last2 < 10 ? last2 : (Math.floor(last2 / 10) + (last2 % 10)));
    digit = reduceDigit(digit);
    var k;
    if (y < 2000) k = (sex === "female") ? reduceDigit(5 + digit) : reduceDigit(10 - digit);
    else k = (sex === "female") ? reduceDigit(6 + digit) : reduceDigit(9 - digit);
    if (k === 0) k = 9;
    if (k === 5) k = (sex === "female") ? 8 : 2;
    return { kua: k, effYear: y };
  }

  function render(out, res) {
    if (!res) { out.innerHTML = '<p class="pf-note">Enter a full date of birth to find your Kua number.</p>'; return; }
    var k = res.kua, group = EAST[k] ? "East group, 東四命" : "West group, 西四命";
    var dirs = FAV[k];
    var rows = dirs.map(function (dir, i) {
      return '<li><strong style="color:var(--moon)">' + DIRNAME[dir] + ' (' + dir + ').</strong> ' +
        FAV_LABEL[i][0] + ', ' + FAV_LABEL[i][1] + '.</li>';
    }).join("");
    out.innerHTML =
      '<div class="pf-card">' +
        '<h3>Your Kua number is ' + k + '</h3>' +
        '<p>You are in the <strong style="color:var(--moon)">' + group + '</strong>. Your four favorable directions, strongest first:</p>' +
        '<ul class="pf-list">' + rows + '</ul>' +
        '<p class="pf-note">Face a favorable direction where it matters most: the head of the bed, the seat at a desk, the way a main door faces. The Kua uses the solar year that starts at 立春, so a birthday before early February counts as the year before (here, ' + res.effYear + '). This is one traditional school among several, offered for reflection, not a promise.</p>' +
      '</div>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = $("#kuaForm"); if (!form) return;
    var out = $("#kuaResult");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var date = $("#kuaDate") ? $("#kuaDate").value : "";
      var sexEl = form.querySelector('input[name="kuaSex"]:checked');
      var sex = sexEl ? sexEl.value : "male";
      render(out, kuaFrom(date, sex));
    });
  });
})();
