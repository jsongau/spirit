/* ziwei-pronunciation.js: speak strings and pronunciation helper for the Purple Star hub.
   Carries the system name, twelve palaces, fourteen principal stars, the four
   transformation-target auxiliaries (文昌 文曲 左輔 右弼), and the technical terms.
   Generated from docs/purple-star-hub/PSA-TERMINOLOGY.md §6 (pronunciation spec).
   Speak strings are traditional characters; display strings are tone-marked pinyin.
   Lang is zh-CN per the spec (widest voice coverage; zh-TW voices still match the zh prefix).
   Pattern follows the shipped #say-ziwei button in indexv6.html: rate 0.78, zh voice pick,
   no autoplay ever. speak(id) respects window.ZIWEI_SOUND_OPTOUT.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.pronunciation) return;

  var LANG = "zh-CN";

  var MAP = {
    /* The system name */
    "zi-wei-dou-shu": { text: "紫微斗數", pinyin: "Zǐwēi Dǒushù", lang: LANG },

    /* Palaces (§6.1) */
    "ming-gong": { text: "命宮", pinyin: "Mìng Gōng", lang: LANG },
    "xiong-di-gong": { text: "兄弟宮", pinyin: "Xiōngdì Gōng", lang: LANG },
    "fu-qi-gong": { text: "夫妻宮", pinyin: "Fūqī Gōng", lang: LANG },
    "zi-nu-gong": { text: "子女宮", pinyin: "Zǐnǚ Gōng", lang: LANG },
    "cai-bo-gong": { text: "財帛宮", pinyin: "Cáibó Gōng", lang: LANG },
    "ji-e-gong": { text: "疾厄宮", pinyin: "Jí'è Gōng", lang: LANG },
    "qian-yi-gong": { text: "遷移宮", pinyin: "Qiānyí Gōng", lang: LANG },
    "nu-pu-gong": { text: "奴僕宮", pinyin: "Núpú Gōng", lang: LANG },
    "jiao-you-gong": { text: "交友宮", pinyin: "Jiāoyǒu Gōng", lang: LANG },
    "guan-lu-gong": { text: "官祿宮", pinyin: "Guānlù Gōng", lang: LANG },
    "tian-zhai-gong": { text: "田宅宮", pinyin: "Tiánzhái Gōng", lang: LANG },
    "fu-de-gong": { text: "福德宮", pinyin: "Fúdé Gōng", lang: LANG },
    "fu-mu-gong": { text: "父母宮", pinyin: "Fùmǔ Gōng", lang: LANG },

    /* Principal stars (§6.2) */
    "zi-wei": { text: "紫微", pinyin: "Zǐwēi", lang: LANG, folkPhonetic: "dzuh-way" },
    "tian-ji": { text: "天機", pinyin: "Tiānjī", lang: LANG },
    "tai-yang": { text: "太陽", pinyin: "Tàiyáng", lang: LANG },
    "wu-qu": { text: "武曲", pinyin: "Wǔqū", lang: LANG },
    "tian-tong": { text: "天同", pinyin: "Tiāntóng", lang: LANG },
    "lian-zhen": { text: "廉貞", pinyin: "Liánzhēn", lang: LANG },
    "tian-fu": { text: "天府", pinyin: "Tiānfǔ", lang: LANG },
    "tai-yin": { text: "太陰", pinyin: "Tàiyīn", lang: LANG },
    "tan-lang": { text: "貪狼", pinyin: "Tānláng", lang: LANG },
    "ju-men": { text: "巨門", pinyin: "Jùmén", lang: LANG },
    "tian-xiang": { text: "天相", pinyin: "Tiānxiàng", lang: LANG },
    "tian-liang": { text: "天梁", pinyin: "Tiānliáng", lang: LANG },
    "qi-sha": { text: "七殺", pinyin: "Qīshā", lang: LANG },
    "po-jun": { text: "破軍", pinyin: "Pòjūn", lang: LANG },

    /* Auxiliary stars that appear as four-transformation targets (§6.2) */
    "wen-chang": { text: "文昌", pinyin: "Wén Chāng", lang: LANG },
    "wen-qu": { text: "文曲", pinyin: "Wén Qū", lang: LANG },
    "zuo-fu": { text: "左輔", pinyin: "Zuǒ Fǔ", lang: LANG },
    "you-bi": { text: "右弼", pinyin: "Yòu Bì", lang: LANG },

    /* Transformations and technical terms (§6.3) */
    "si-hua": { text: "四化", pinyin: "Sì Huà", lang: LANG },
    "hua-lu": { text: "化祿", pinyin: "Huà Lù", lang: LANG },
    "hua-quan": { text: "化權", pinyin: "Huà Quán", lang: LANG },
    "hua-ke": { text: "化科", pinyin: "Huà Kē", lang: LANG },
    "hua-ji": { text: "化忌", pinyin: "Huà Jì", lang: LANG },
    "san-fang-si-zheng": { text: "三方四正", pinyin: "Sān Fāng Sì Zhèng", lang: LANG },
    "dui-gong": { text: "對宮", pinyin: "Duìgōng", lang: LANG },
    "shen-gong": { text: "身宮", pinyin: "Shēn Gōng", lang: LANG },
    "miao": { text: "廟", pinyin: "miào", lang: LANG },
    "wang": { text: "旺", pinyin: "wàng", lang: LANG },
    "li": { text: "利", pinyin: "lì", lang: LANG },
    "xian": { text: "陷", pinyin: "xiàn", lang: LANG },
    "wu-xing-ju": { text: "五行局", pinyin: "Wǔxíng Jú", lang: LANG },
    "da-xian": { text: "大限", pinyin: "Dà Xiàn", lang: LANG },
    "liu-nian": { text: "流年", pinyin: "Liú Nián", lang: LANG },
    "liu-yue": { text: "流月", pinyin: "Liú Yuè", lang: LANG },
    "tian-gan": { text: "天干", pinyin: "Tiāngān", lang: LANG },
    "di-zhi": { text: "地支", pinyin: "Dìzhī", lang: LANG },
    "fei-hua": { text: "飛化", pinyin: "Fēi Huà", lang: LANG },
    "ge-ju": { text: "格局", pinyin: "Géjú", lang: LANG },
    "ming-zhu": { text: "命主", pinyin: "Mìngzhǔ", lang: LANG },
    "shen-zhu": { text: "身主", pinyin: "Shēnzhǔ", lang: LANG }
  };

  /* Best-quality Mandarin voice, same ranking as the Proverbs Pond speaker (js/proverbs-share.js
     zaSpeak): Apple's Tingting/Meijia win in Safari, Google's Mandarin voice wins in Chrome,
     otherwise the clearest zh voice available. One voice across the whole site. */
  function bestVoice() {
    var vs = window.speechSynthesis.getVoices() || [];
    var best = null, bs = -1;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i], nm = (v.name || "").toLowerCase(), lg = (v.lang || "").toLowerCase();
      if (!(/^zh\b|zh[-_]/.test(lg) || /chinese|中文|普通话|国语|國語|mandarin/i.test(v.name || ""))) continue;
      var sc = 0;
      if (/tingting|ting-ting|meijia|mei-jia|sinji|li-mu|yu-shu|han-?yu/.test(nm)) sc += 100;
      if (/google/.test(nm)) sc += 60;
      if (/普通话|mandarin|zh-cn|zh_cn|cmn/.test(nm + lg)) sc += 25;
      if (v.localService === false) sc += 12;
      if (/female|woman/.test(nm)) sc += 4;
      if (sc > bs) { bs = sc; best = v; }
    }
    return best;
  }

  /* speak(id): pronounce one term. Never autoplays; call it only from a user gesture.
     Uses the shared zaSpeak when a page loads proverbs-share.js, else the same ranking locally.
     Returns true if speech was queued, false otherwise (opt-out, unknown id, no support). */
  function speak(id) {
    if (window.ZIWEI_SOUND_OPTOUT) return false;
    var entry = MAP[id];
    if (!entry) return false;
    if (typeof window.zaSpeak === "function") { window.zaSpeak(entry.text); return true; }
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") return false;
    var u = new window.SpeechSynthesisUtterance(entry.text);
    u.lang = entry.lang;
    u.rate = 0.78;
    var v = bestVoice();
    if (v) u.voice = v;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return true;
  }
  if (window.speechSynthesis) { try { window.speechSynthesis.getVoices(); } catch (e) {} }

  window.ZiweiData.pronunciation = MAP;
  window.ZiweiData.speak = speak;
})();
