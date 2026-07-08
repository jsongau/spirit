/* ziwei-relationships.js: court math (三方四正 Sān Fāng Sì Zhèng) for Purple Star Astrology.
   Geometry per PSA-MASTER-PLAN ruling D3 and PSA-TERMINOLOGY C2: a court is the focal palace
   plus the two palaces four positions away (trines) plus the palace six positions away (opposite).
   Everything below is derived from the branch order, never hand-listed per palace.

   Corrected court sets (ruling C2), used as the test cases for this file:
     Life court:     ming-gong, cai-bo-gong, guan-lu-gong, qian-yi-gong  (Life, Wealth, Career, Travel, 命財官遷)
     Siblings court: xiong-di-gong, ji-e-gong, tian-zhai-gong, nu-pu-gong (Siblings, Health, Property, Servants)
     Spouse court:   fu-qi-gong, qian-yi-gong, fu-de-gong, guan-lu-gong  (Spouse, Travel, Fortune, Career)
     Children court: zi-nu-gong, nu-pu-gong, fu-mu-gong, tian-zhai-gong  (Children, Servants, Parents, Property)

   Mirror pairs (對宮 Duìgōng), derived as +6 on the wheel:
     ming-gong/qian-yi-gong, xiong-di-gong/nu-pu-gong, fu-qi-gong/guan-lu-gong,
     zi-nu-gong/tian-zhai-gong, cai-bo-gong/fu-de-gong, ji-e-gong/fu-mu-gong.
   Note: PSA-TERMINOLOGY §1.5 lists Wealth-Health and Fortune-Parents as pairs; those four
   palaces are adjacent, not facing, so ruling D3 (geometry wins) re-pairs them as
   Wealth-Fortune and Health-Parents, consistent with the C2 corrected courts above.

   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.relationships) return;

  /* Canonical branch order, index 0-11, matching ziwei-palaces.js branchOrder and the
     chart page PALACES array. Embedded here so this file is standalone. */
  var ORDER = [
    "ming-gong", "xiong-di-gong", "fu-qi-gong", "zi-nu-gong",
    "cai-bo-gong", "ji-e-gong", "qian-yi-gong", "nu-pu-gong",
    "guan-lu-gong", "tian-zhai-gong", "fu-de-gong", "fu-mu-gong"
  ];

  var INDEX = {};
  ORDER.forEach(function (id, i) { INDEX[id] = i; });

  function resolve(id) {
    /* Accept canonical ids directly; fall back to palace aliases if ziwei-palaces.js is loaded. */
    if (INDEX.hasOwnProperty(id)) return id;
    if (window.ZiweiData.resolvePalaceId) return window.ZiweiData.resolvePalaceId(id);
    return null;
  }

  function at(i) { return ORDER[((i % 12) + 12) % 12]; }

  /* The palace directly across the chart (對宮), six positions away. */
  function opposite(id) {
    var pid = resolve(id);
    if (pid === null) return null;
    return at(INDEX[pid] + 6);
  }

  /* The two trine companions, four positions away in each direction. */
  function trine(id) {
    var pid = resolve(id);
    if (pid === null) return null;
    return [at(INDEX[pid] + 4), at(INDEX[pid] - 4)];
  }

  /* The full court (三方四正): focal palace + trines + opposite. */
  function court(id) {
    var pid = resolve(id);
    if (pid === null) return null;
    return {
      focal: pid,
      trines: trine(pid),
      opposite: opposite(pid),
      members: [pid, at(INDEX[pid] + 4), at(INDEX[pid] - 4), at(INDEX[pid] + 6)]
    };
  }

  /* The six mirror pairs, derived from the geometry (each palace with its opposite). */
  var MIRROR_PAIRS = [];
  for (var i = 0; i < 6; i++) {
    MIRROR_PAIRS.push([ORDER[i], ORDER[i + 6]]);
  }

  window.ZiweiData.relationships = {
    order: ORDER,
    mirrorPairs: MIRROR_PAIRS,
    opposite: opposite,
    trine: trine,
    court: court,
    source: ["purple-star-hub/PSA-MASTER-PLAN.md#D3", "purple-star-hub/PSA-TERMINOLOGY.md#C2", "purple-star-hub/PSA-TERMINOLOGY.md#C3"]
  };
})();
