/* ============================================================
   nav-me.js — The Primal Oracle
   A personalization chip in the nav showing the visitor's
   own Primal Animal. Mounted via PNAV.features.me(ctx).
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };
PNAV.features = PNAV.features || {};

PNAV.features.me = function (ctx) {
  if (!ctx || !ctx.tools) return;

  var STORE_KEY = "primal_oracle_v1";
  var ENGINE = ctx.ENGINE || window.ENGINE;

  /* tiny style only for the glyph */
  if (!document.getElementById("pnme-style")) {
    var st = document.createElement("style");
    st.id = "pnme-style";
    st.textContent =
      ".pnme-glyph{font-size:1rem;line-height:1}" +
      ".pnme-spark{width:14px;height:14px;display:block}";
    document.head.appendChild(st);
  }

  /* read saved state safely */
  var birth = "";
  try {
    var raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      var data = JSON.parse(raw);
      if (data && typeof data.birth === "string") birth = data.birth;
    }
  } catch (e) {
    birth = "";
  }

  var chip;
  var result = null;

  if (birth && ENGINE && typeof ENGINE.compute === "function") {
    try {
      result = ENGINE.compute(birth);
    } catch (e) {
      result = null;
    }
  }

  if (result && result.primal) {
    chip = document.createElement("a");
    chip.className = "pn-chip";
    chip.href = "/animals/" + result.primal.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "/";

    var glyph = document.createElement("span");
    glyph.className = "v pnme-glyph";
    glyph.textContent = result.glyph || "";

    var lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = result.primal;

    chip.appendChild(glyph);
    chip.appendChild(lbl);
    chip.title =
      "Your animal: " + result.primal +
      " (" + (result.sign || "") + " " + (result.animal || "") + ")";
  } else {
    chip = document.createElement("a");
    chip.className = "pn-chip";
    chip.href = "/index.html";

    var spark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    spark.setAttribute("viewBox", "0 0 24 24");
    spark.setAttribute("class", "v pnme-spark");
    spark.setAttribute("aria-hidden", "true");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute(
      "d",
      "M12 2l1.8 5.6L19 9.4l-4.4 3.2L16.2 18 12 14.7 7.8 18l1.6-5.4L5 9.4l5.2-1.8z"
    );
    spark.appendChild(path);

    var lbl2 = document.createElement("span");
    lbl2.className = "lbl";
    lbl2.textContent = "Find your animal";

    chip.appendChild(spark);
    chip.appendChild(lbl2);
    chip.title = "Find your Primal Animal";
  }

  ctx.tools.insertBefore(chip, ctx.tools.firstChild);
};
