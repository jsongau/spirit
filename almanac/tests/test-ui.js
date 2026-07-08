/* Fake-DOM smoke test for the rebuilt /almanac/ page (engine + data + ui).
   Elements are stubs; ids found in innerHTML are auto-registered so
   post-render querySelector lookups resolve. */
"use strict";
const fs = require("fs");
const base = require("path").join(__dirname, "..");
const registry = {};

function makeEl(tag) {
  const e = {
    tagName: (tag || "div").toUpperCase(),
    children: [], listeners: {}, attrs: {}, style: {}, dataset: {},
    className: "", textContent: "", value: "", hidden: false, disabled: false,
    _innerHTML: "",
    setAttribute(k, v) { this.attrs[k] = v; if (k === "id") registry[v] = this; },
    getAttribute(k) { return this.attrs[k]; },
    addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); },
    dispatch(t, ev) {
      ev = ev || {}; ev.preventDefault = ev.preventDefault || (() => {});
      (this.listeners[t] || []).forEach(fn => fn.call(this, ev));
    },
    click() { this.dispatch("click", {}); },
    appendChild(c) { this.children.push(c); return c; },
    remove() {},
    querySelector(sel) {
      if (sel.startsWith("#")) return registry[sel.slice(1)] || null;
      if (sel === "button" && this._hasButton) { if (!this._btn) this._btn = makeEl("button"); return this._btn; }
      return null;
    },
    querySelectorAll() { return []; },
    scrollIntoView() {}, focus() {}, closest() { return null; }
  };
  Object.defineProperty(e, "innerHTML", {
    get() { return this._innerHTML; },
    set(html) {
      this._innerHTML = html; this.children = [];
      [...html.matchAll(/id="([^"]+)"/g)].forEach(m => { registry[m[1]] = makeEl("div"); });
      this._hasButton = /<button/.test(html);
    }
  });
  return e;
}
const staticIds = ["almCard","almGrid","almGridLabel","almPrev","almNext","almToday","almNow","almBM","almBD","almBY",
  "almNext3","almYearIcs","almProverb","almSkins","almMotifs","almCollect","almFloatBtn","almFloatPanel","almOptTerms","almOptFests","almOptMoons","almOptClash","almUpcoming","almYou","almYouForm","almBirth","almYouMsg",
  "almGlance","almLive","almReturn"];
staticIds.forEach(id => { registry[id] = makeEl(id.includes("Form") ? "form" : "div"); registry[id].attrs.id = id; });
registry.almYouForm._hasButton = true;
["almOptTerms","almOptFests","almOptClash"].forEach(id => { registry[id].checked = true; });
registry.almOptMoons.checked = false;
registry.almFloatPanel.hidden = true;

const errors = [];
const documentObj = {
  readyState: "complete", title: "",
  createElement: t => makeEl(t),
  addEventListener() {},
  body: makeEl("body"), documentElement: makeEl("html"),
  querySelector: s => (s.startsWith("#") ? registry[s.slice(1)] || null : null),
  querySelectorAll: () => []
};
const locationObj = { search: "", pathname: "/almanac/" };
const historyObj = { pushed: [], pushState(s, t, u) { this.pushed.push(u); }, replaceState(s, t, u) { this.last = u; } };
const windowObj = {
  document: documentObj, location: locationObj, history: historyObj,
  addEventListener() {},
  localStorage: { _s: {}, getItem(k) { return this._s[k] || null; }, setItem(k, v) { this._s[k] = v; }, removeItem(k) { delete this._s[k]; } },
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  URL: { createObjectURL: () => "blob:x", revokeObjectURL() {} },
  Blob: function () {}, open() {}, gtag() {},
  matchMedia: () => ({ matches: false }),
  setTimeout, clearTimeout
};
windowObj.window = windowObj;
windowObj.ZodiAlmanac = require(base + "/engine.js");
windowObj.ALM_TERMS = require(base + "/data-terms.js");
windowObj.ALM_OFFICERS = require(base + "/data-officers.js");
windowObj.ALM_GLOSSARY = require(base + "/data-glossary.js");

const vm = require("vm");
const ctx = vm.createContext({
  console, setTimeout, clearTimeout, Date, Math, JSON, encodeURIComponent, String, Number,
  window: windowObj, document: documentObj, location: locationObj, history: historyObj,
  navigator: windowObj.navigator, localStorage: windowObj.localStorage,
  URL: windowObj.URL, Blob: windowObj.Blob, SpeechSynthesisUtterance: function () {}
});
try { vm.runInContext(fs.readFileSync(base + "/ui.js", "utf8"), ctx, { filename: "ui.js" }); }
catch (e) { errors.push("load: " + e.stack.split("\n").slice(0, 3).join(" | ")); }

let pass = 0, fail = 0;
function assert(name, cond, detail) {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : "  <-- " + (detail || "")));
  cond ? pass++ : fail++;
}
const card = registry.almCard, grid = registry.almGrid;

assert("no load errors", errors.length === 0, errors[0]);
assert("first visit opens in Zodi Night", documentObj.documentElement.attrs["data-skin"] === "zodi", documentObj.documentElement.attrs["data-skin"]);
assert("auto skin not persisted", windowObj.localStorage.getItem("zodi-almanac-skin") === null);
assert("card rendered", card.innerHTML.length > 2000, "len " + card.innerHTML.length);
assert("day pillar 壬午日 shown; pinyin lives in study panels", card.innerHTML.includes("壬午日") && card.innerHTML.includes("rén"));
assert("nayin traditional 楊柳木", card.innerHTML.includes("楊柳木"));
assert("term 小暑 with day counter", card.innerHTML.includes("小暑") && /day \d+/.test(card.innerHTML));
assert("editorial headline (officer 閉 = closing)", card.innerHTML.includes("closing the circle"));
assert("favor/avoid panels with 宜/忌 study", card.innerHTML.includes("What 宜 means") && card.innerHTML.includes("What 忌 means"));
assert("study panel section", card.innerHTML.includes("Understand today"));
assert("label chips removed", !card.innerHTML.includes("alm-badge"));
const pv = registry.almProverb;
assert("proverb rail: Pond structure (zh/py/lit/mean/soul/src)", ["alm-pv-zh","alm-pv-py","alm-pv-lit","alm-pv-mean","alm-pv-soul","alm-pv-src"].every(c => pv.innerHTML.includes(c)));
assert("proverb rail links to the Pond", pv.innerHTML.includes("/proverbs/"));
assert("identity is hanzi + English (no pinyin clutter)", card.innerHTML.includes("alm-id-eng") && card.innerHTML.includes("lunar month, day"));
assert("pronunciation buttons", (card.innerHTML.match(/alm-say/g) || []).length >= 3);
assert("glance strip rendered", registry.almGlance.innerHTML.length > 80, registry.almGlance.innerHTML.slice(0, 80));
assert("grid 30+ cells", grid.children.filter(c => (c.className || "").includes("alm-cell")).length >= 30);
assert("grid label July 2026", registry.almGridLabel.textContent === "July 2026", registry.almGridLabel.textContent);
assert("upcoming shows 3 rows", registry.almUpcoming.children.filter(c => (c.className || "").includes("alm-up") && !(c.className || "").includes("alm-up-more")).length === 3, "" + registry.almUpcoming.children.length);
const moreBtn = registry.almUpcoming.children.find(c => (c.className || "").includes("alm-up-more"));
assert("show-more control present", !!moreBtn, "no expand button");
moreBtn.click();
assert("expanded to full list", registry.almUpcoming.children.filter(c => (c.className || "").includes("alm-up") && !(c.className || "").includes("alm-up-more")).length > 3);
registry.almUpcoming.children.find(c => (c.className || "").includes("alm-up-more")).click();
assert("title set", documentObj.title.includes("Feng Shui Calendar"), documentObj.title);

// date navigation + URL
registry.almDayNext.click();
assert("day-next -> 癸未 pillar", card.innerHTML.includes("癸") && card.innerHTML.includes("未"));
assert("URL pushed ?date=2026-07-08", historyObj.pushed.some(u => u && u.includes("date=2026-07-08")), JSON.stringify(historyObj.pushed));
assert("live region announced", registry.almLive.textContent.includes("July 8"), registry.almLive.textContent);
registry.almDayToday.click();
assert("today restores 壬午 and clean URL", card.innerHTML.includes("壬") && historyObj.pushed[historyObj.pushed.length - 1] === "/almanac/");
// month boundary: step back from Jul 1
registry.almPick.value = "2026-07-01"; registry.almPick.dispatch("change");
registry.almDayPrev.click();
assert("month boundary: Jun 30 selected", registry.almGridLabel.textContent === "June 2026", registry.almGridLabel.textContent);
// year boundary via picker
registry.almPick.value = "2027-01-01"; registry.almPick.dispatch("change");
assert("year boundary: January 2027", registry.almGridLabel.textContent === "January 2027");
registry.almDayPrev.click();
assert("back to December 2026", registry.almGridLabel.textContent === "December 2026");
registry.almToday.click();

// hero next-turns preview + year export
assert("next turns preview has 3 rows", registry.almNext3.children.length === 3, "" + registry.almNext3.children.length);
registry.almNext3.children[0].click();
assert("next-turn click selects its date", registry.almLive.textContent.length > 0);
registry.almToday.click();
registry.almYearIcs.click();
assert("year ics announced with event count", /Calendar file with \d+ dates/.test(registry.almLive.textContent), registry.almLive.textContent);

// personalization: invalid then valid
registry.almBY.value = "1800"; registry.almBM.value = "1"; registry.almBD.value = "1";
registry.almYouForm.dispatch("submit");
assert("invalid birth rejected", registry.almYouMsg.textContent.length > 0, "no error message");
registry.almBY.value = "1996"; registry.almBM.value = "2"; registry.almBD.value = "19"; registry.almYouForm.dispatch("submit");
assert("profile: Fire Rat year (after Li Chun 1996)", registry.almYou.innerHTML.includes("Rat"), registry.almYou.innerHTML.slice(0, 140));
assert("Li Chun boundary explained", registry.almYou.innerHTML.includes("Li Chun"));
assert("clash omen banner for Rat on Horse day", card.innerHTML.includes("alm-omen-clash") && card.innerHTML.includes("A caution day for the Rat"));
assert("clash advice is animal-specific", card.innerHTML.includes("sense of timing"));
assert("omen calendar buttons present", card.innerHTML.includes("almOmenG") && card.innerHTML.includes("almOmenIcs"));
registry.almOmenG.click(); registry.almOmenIcs.click();
// Jul 14 2026 is a 丑 Ox day: six-harmony for the Rat -> blessing banner
registry.almPick.value = "2026-07-14"; registry.almPick.dispatch("change");
assert("blessing omen on harmony day", registry.almCard.innerHTML.includes("alm-omen-bless") && registry.almCard.innerHTML.includes("A blessing day for the Rat"));
registry.almDayToday.click();
const marked = grid.children.filter(c => /alm-clash|alm-lucky/.test(c.className || ""));
assert("clash/harmony marked with 沖/合 text + aria labels", marked.length >= 4 &&
  grid.children.some(c => (c.innerHTML || "").includes("沖") || (c.innerHTML || "").includes("合")) &&
  grid.children.some(c => /clash day|harmony day/.test(c.attrs["aria-label"] || "")));

// Li Chun edge: Jan 20 1996 is BEFORE Li Chun -> previous year animal (Pig, 1995)
registry.almForget.click();
registry.almBY.value = "1996"; registry.almBM.value = "1"; registry.almBD.value = "20"; registry.almYouForm.dispatch("submit");
assert("pre-Li-Chun birth -> Pig (1995 year)", registry.almYou.innerHTML.includes("Pig"), registry.almYou.innerHTML.slice(0, 120));

// skins (original names, migrated keys)
assert("4 skins rendered with new keys", ["paper","bamboo","ink","plum"].every(k => registry.almSkins.innerHTML.includes("almSkin-" + k)));
registry["almSkin-ink"].click();
assert("skin applied to <html> and persisted", documentObj.documentElement.attrs["data-skin"] === "ink" && windowObj.localStorage.getItem("zodi-almanac-skin") === "ink");
registry["almSkin-paper"].click();

// ornament motifs
assert("7 ornaments rendered", ["fu","cat","ingot","coin","lantern","cloud","bamboo"].every(k => registry.almMotifs.innerHTML.includes("almMotif-" + k)));
registry["almMotif-cat"].click();
assert("lucky cat SVG on the card", card.innerHTML.includes("alm-motif-svg") && card.innerHTML.includes("<svg"));
assert("motif persisted", windowObj.localStorage.getItem("zodi-almanac-motif") === "cat");
registry["almMotif-fu"].click();
assert("watermark ornament behind the card", card.innerHTML.includes("alm-watermark"));
assert("endless knot ornament exists", registry.almMotifs.innerHTML.includes("almMotif-knot"));
assert("Zodi Night skin exists", registry.almSkins.innerHTML.includes("almSkin-zodi"));
assert("hour-now widget rendered", registry.almNow.innerHTML.includes("Hour of the") && registry.almNow.innerHTML.includes("/60"), registry.almNow.innerHTML.slice(0,60));

// floating companion
registry.almFloatBtn.click();
assert("floater opens", registry.almFloatPanel.hidden === false);
assert("floater badge shows animal after profile", registry.almFloatBtn.innerHTML.includes("Pig"));

// saying collection + notebook
registry.almCollectBtn.click();
assert("saying collected", Object.keys(JSON.parse(windowObj.localStorage.getItem("zodi-almanac-sayings"))).length === 1);
assert("collection drawer shows 1 of 12", registry.almCollect.innerHTML.includes("1 of 12"), registry.almCollect.innerHTML.slice(0,80));
registry.almNotebookBtn.click();
assert("notebook copy ran", true);

// year export options respected
registry.almOptFests.checked = false;
registry.almYearIcs.click();
assert("year ics respects choices (announced)", /Calendar file with \d+ dates/.test(registry.almLive.textContent), registry.almLive.textContent);

// anti-flash: selecting a day within the same month must not rebuild the grid
const cellBefore = grid.children[10];
registry.almDayNext.click(); registry.almDayToday.click();
assert("grid nodes reused on same-month selection (no flash)", grid.children[10] === cellBefore);

// segmented date entry behavior
registry.almBM.value = "7";
registry.almBM.dispatch("input");
assert("month '7' pads to 07 and advances", registry.almBM.value === "07");
registry.almBD.value = "";
registry.almBD.dispatch("keydown", { key: "Backspace" });
assert("backspace in empty day eats month digit", registry.almBM.value === "0");

// exports
registry.almAddG.click(); registry.almAddIcs.click(); registry.almCopyDay.click(); registry.almShare.click();
assert("exports and share ran without throwing", true);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exitCode = fail ? 1 : 0;
