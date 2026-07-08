/* Zodi Almanac: Chinese calendar terminology, educational data.
   Traditional characters, tone-marked pinyin. Stem/branch order is engine order. */
(function (root) {
  "use strict";
  var DATA = {
    stems: [ // order 甲乙丙丁戊己庚辛壬癸
      { hant: "甲", pinyin: "jiǎ", phase: "Wood", polarity: "yang", note: "Tall timber, the seed pushing straight up." },
      { hant: "乙", pinyin: "yǐ", phase: "Wood", polarity: "yin", note: "Vines and grasses that bend around obstacles." },
      { hant: "丙", pinyin: "bǐng", phase: "Fire", polarity: "yang", note: "The sun at midday, open and radiant." },
      { hant: "丁", pinyin: "dīng", phase: "Fire", polarity: "yin", note: "A lamp flame, small but steady in the dark." },
      { hant: "戊", pinyin: "wù", phase: "Earth", polarity: "yang", note: "A mountain, broad and unmoving." },
      { hant: "己", pinyin: "jǐ", phase: "Earth", polarity: "yin", note: "Garden soil, soft and ready for planting." },
      { hant: "庚", pinyin: "gēng", phase: "Metal", polarity: "yang", note: "Raw ore and the axe blade, strength before polish." },
      { hant: "辛", pinyin: "xīn", phase: "Metal", polarity: "yin", note: "Fine jewelry, precise and refined." },
      { hant: "壬", pinyin: "rén", phase: "Water", polarity: "yang", note: "The ocean and great rivers, deep and always moving." },
      { hant: "癸", pinyin: "guǐ", phase: "Water", polarity: "yin", note: "Rain, dew, and hidden springs." }
    ],
    branches: [ // order 子丑寅卯辰巳午未申酉戌亥
      { hant: "子", pinyin: "zǐ", animal: "Rat", hours: "11pm-1am", phase: "Water", note: "Midnight, when the old day turns into the new." },
      { hant: "丑", pinyin: "chǒu", animal: "Ox", hours: "1am-3am", phase: "Earth", note: "The ox is up before dawn, patient and steady." },
      { hant: "寅", pinyin: "yín", animal: "Tiger", hours: "3am-5am", phase: "Wood", note: "The first stirring before sunrise, bold and awake early." },
      { hant: "卯", pinyin: "mǎo", animal: "Rabbit", hours: "5am-7am", phase: "Wood", note: "Sunrise hours, quick and alert." },
      { hant: "辰", pinyin: "chén", animal: "Dragon", hours: "7am-9am", phase: "Earth", note: "Morning mist rising, home of the one mythical animal." },
      { hant: "巳", pinyin: "sì", animal: "Snake", hours: "9am-11am", phase: "Fire", note: "Late morning warmth, quiet and deliberate." },
      { hant: "午", pinyin: "wǔ", animal: "Horse", hours: "11am-1pm", phase: "Fire", note: "High noon, full sun and full motion." },
      { hant: "未", pinyin: "wèi", animal: "Goat", hours: "1pm-3pm", phase: "Earth", note: "Afternoon grazing, gentle and unhurried." },
      { hant: "申", pinyin: "shēn", animal: "Monkey", hours: "3pm-5pm", phase: "Metal", note: "Late afternoon cleverness and play." },
      { hant: "酉", pinyin: "yǒu", animal: "Rooster", hours: "5pm-7pm", phase: "Metal", note: "Sunset, when the birds come home to roost." },
      { hant: "戌", pinyin: "xū", animal: "Dog", hours: "7pm-9pm", phase: "Earth", note: "The evening watch at the gate, loyal and alert." },
      { hant: "亥", pinyin: "hài", animal: "Pig", hours: "9pm-11pm", phase: "Water", note: "Night rest, the cycle winding down to begin again." }
    ],
    phases: [ // order Wood Fire Earth Metal Water (matches engine index 0..4)
      { hant: "木", pinyin: "mù", name: "Wood", note: "growth, expansion, beginnings" },
      { hant: "火", pinyin: "huǒ", name: "Fire", note: "heat, activity, visibility" },
      { hant: "土", pinyin: "tǔ", name: "Earth", note: "stability, nourishment, the center" },
      { hant: "金", pinyin: "jīn", name: "Metal", note: "structure, harvest, refinement" },
      { hant: "水", pinyin: "shuǐ", name: "Water", note: "depth, storage, quiet movement" }
    ],
    terms: {
      wannianli: { hant: "萬年曆", chars: [["萬","wàn"],["年","nián"],["曆","lì"]], pinyin: "wàn nián lì", literal: "ten-thousand-year calendar", name: "the perpetual calendar", meaning: "A reference calendar that covers many years of dates, stem-branch pairs, and lunar conversions. This page follows that tradition in digital form." },
      huangli:   { hant: "黃曆", chars: [["黃","huáng"],["曆","lì"]], pinyin: "huáng lì", literal: "imperial (yellow) calendar", name: "the Chinese almanac", meaning: "The traditional almanac that marks which days are considered favorable or unfavorable for common activities. It is the day-selection tradition this calendar draws from." },
      tongshu:   { hant: "通書", chars: [["通","tōng"],["書","shū"]], pinyin: "tōng shū", literal: "all-encompassing book", name: "the Tong Shu almanac", meaning: "The fuller printed almanac book published each year, with day listings plus reference material. In everyday speech huangli and tongshu overlap, but they are not perfectly interchangeable." },
      yi:        { hant: "宜", chars: [["宜","yí"]], pinyin: "yí", literal: "suitable", name: "Favor", meaning: "Activities traditionally considered supported by the day." },
      ji:        { hant: "忌", chars: [["忌","jì"]], pinyin: "jì", literal: "to avoid, refrain from", name: "Avoid", meaning: "Activities traditionally considered poorly matched to the day." },
      jieqi:     { hant: "節氣", chars: [["節","jié"],["氣","qì"]], pinyin: "jié qì", literal: "seasonal nodes and breaths", name: "solar terms", meaning: "The 24 points that divide the solar year, each tied to the sun's position along its path. Farmers used them to time planting, and the traditional calendar still turns on them." },
      nongli:    { hant: "農曆", chars: [["農","nóng"],["曆","lì"]], pinyin: "nóng lì", literal: "farming calendar", name: "the lunar calendar", meaning: "The traditional Chinese calendar, which follows the moon for months and the sun for seasons. Lunisolar is the more precise word, but lunar calendar is the common name." },
      tiangan:   { hant: "天干", chars: [["天","tiān"],["干","gān"]], pinyin: "tiān gān", literal: "heavenly trunks", name: "Heavenly Stems", meaning: "The cycle of ten signs that pairs with the twelve branches to name days and years. Each stem carries one of the Five Phases in its yang or yin form." },
      dizhi:     { hant: "地支", chars: [["地","dì"],["支","zhī"]], pinyin: "dì zhī", literal: "earthly branches", name: "Earthly Branches", meaning: "The cycle of twelve signs that also names the zodiac animals and the twelve double hours of the day." },
      wuxing:    { hant: "五行", chars: [["五","wǔ"],["行","xíng"]], pinyin: "wǔ xíng", literal: "five movements", name: "the Five Phases", meaning: "Wood, Fire, Earth, Metal, and Water, understood as five kinds of movement rather than five substances. Phases is a closer translation than the familiar elements." },
      nayin:     { hant: "納音", chars: [["納","nà"],["音","yīn"]], pinyin: "nà yīn", literal: "received tones", name: "Na Yin", meaning: "The melodic element assigned to each two-pillar pair in the sixty cycle, giving poetic names like Gold in the Sea. It is a separate layer from the ordinary stem and branch phases." },
      ganzhi:    { hant: "干支", chars: [["干","gān"],["支","zhī"]], pinyin: "gān zhī", literal: "stems and branches", name: "the stem-branch cycle", meaning: "The sixty combinations of stems and branches, used as an unbroken count of days and years for centuries." },
      shengxiao: { hant: "生肖", chars: [["生","shēng"],["肖","xiào"]], pinyin: "shēng xiào", literal: "birth likeness", name: "the zodiac animals", meaning: "The twelve animals assigned to birth years, one for each Earthly Branch. In China your animal is everyday shorthand for the year you were born." },
      richu:     { hant: "日柱", chars: [["日","rì"],["柱","zhù"]], pinyin: "rì zhù", literal: "day pillar", name: "the Day Pillar", meaning: "The stem-branch pair of the day itself. In BaZi it represents the self, which is why the day column carries the most weight in a birth chart." },
      lichun:    { hant: "立春", chars: [["立","lì"],["春","chūn"]], pinyin: "lì chūn", literal: "spring is established", name: "Li Chun", meaning: "The start of spring, falling around February 3 to 5. This calendar uses it as the boundary for the zodiac year, so a late January birthday can still belong to the previous animal." },
      yinyang:   { hant: "陰陽", chars: [["陰","yīn"],["陽","yáng"]], pinyin: "yīn yáng", literal: "shade and sunlight", name: "yin and yang", meaning: "The paired qualities that run through the whole system. Every stem, branch, and phase is read as either yin or yang, the receptive side and the active side of one cycle." }
    },
    lunarMonths: ["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","臘月"],
    lunarMonthPinyin: ["zhēng yuè","èr yuè","sān yuè","sì yuè","wǔ yuè","liù yuè","qī yuè","bā yuè","jiǔ yuè","shí yuè","dōng yuè","là yuè"]
  };
  root.ALM_GLOSSARY = DATA;
  if (typeof module !== "undefined" && module.exports) module.exports = DATA;
})(typeof window !== "undefined" ? window : globalThis);
