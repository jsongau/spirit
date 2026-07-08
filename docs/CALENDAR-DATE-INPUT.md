# Calendar date input — universal recipe

A drop-in **free-type date field + custom calendar popover** for any page. Plain browser JS,
no libraries, no build step, `file://`-safe, themeable with CSS variables. Copy the three blocks
below (HTML hook, JS, CSS) and call `createCalendarInput(inputEl, options)`.

Use this whenever you'd otherwise reach for `<input type="date">` but want: full typing control
(type the whole date, backspace clears through), a themed calendar, fast far-back year picking,
and a mobile bottom-sheet.

---

## 1. Markup

Just a text input. Everything else is generated.

```html
<label for="mydate">Date</label>
<input id="mydate" type="text" inputmode="numeric" autocomplete="off" placeholder="MM / DD / YYYY">
```

```js
createCalendarInput(document.getElementById("mydate"), {
  format: "MM/DD/YYYY",   // or "DD/MM/YYYY" or "YYYY-MM-DD"
  minYear: 1900,
  maxYear: new Date().getFullYear() + 1,
  weekStart: 0,           // 0 = Sunday, 1 = Monday
  value: null,            // {year,month,day} or null
  onChange: function (d) { /* d is {year,month,day} or null */ }
});
```

---

## 2. JavaScript (self-contained)

```js
/* createCalendarInput — free-type date field + calendar popover. No dependencies. */
(function (root) {
  "use strict";

  function pad(n, w) { n = String(n); while (n.length < w) n = "0" + n; return n; }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function makeFormat(format) {
    var sep = (format.match(/[^A-Za-z]/) || ["/"])[0];
    var tokens = format.split(sep);                     // ["MM","DD","YYYY"]
    return {
      sep: sep,
      tokens: tokens,
      widths: tokens.map(function (t) { return t.length; }),   // [2,2,4]
      order: tokens.map(function (t) { return t[0].toUpperCase(); }) // ["M","D","Y"]
    };
  }
  function autoFormat(str, F) {
    var digits = str.replace(/\D/g, "");
    var total = F.widths.reduce(function (a, b) { return a + b; }, 0);
    digits = digits.slice(0, total);
    var out = "", i = 0;
    for (var s = 0; s < F.widths.length && i < digits.length; s++) {
      if (s > 0) out += F.sep;
      out += digits.slice(i, i + F.widths[s]);
      i += F.widths[s];
    }
    return out;
  }
  function parse(v, F) {
    var parts = (v || "").split(F.sep);
    if (parts.length !== F.order.length) return null;
    var o = {};
    for (var s = 0; s < F.order.length; s++) {
      if (!/^\d+$/.test(parts[s].trim())) return null;
      o[F.order[s]] = +parts[s];
    }
    var y = o.Y, m = o.M, d = o.D;
    if (!y || !m || !d || m < 1 || m > 12 || d < 1 || d > 31) return null;
    var dt = new Date(y, m - 1, d);                     // reject Feb 30, etc.
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return { year: y, month: m, day: d };
  }
  function formatOut(o, F) {
    return F.tokens.map(function (t) {
      var c = t[0].toUpperCase();
      var val = c === "Y" ? o.year : c === "M" ? o.month : o.day;
      return pad(val, t.length);
    }).join(F.sep);
  }

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DOW = ["S", "M", "T", "W", "T", "F", "S"];

  function createCalendarInput(input, opts) {
    opts = opts || {};
    var F = makeFormat(opts.format || "MM/DD/YYYY");
    var minY = opts.minYear || 1900;
    var maxY = opts.maxYear || (new Date().getFullYear() + 1);
    var weekStart = opts.weekStart || 0;
    var onChange = opts.onChange || function () {};

    input.setAttribute("inputmode", "numeric");
    input.setAttribute("autocomplete", "off");
    input.maxLength = 14;

    // wrap: <div.dp-wrap><input><button.dp-btn></div> + <div.dp-cal hidden>
    var wrap = el("div", "dp-wrap");
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    var btn = el("button", "dp-btn"); btn.type = "button"; btn.setAttribute("aria-label", "Open calendar");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    wrap.appendChild(btn);
    var cal = el("div", "dp-cal"); cal.hidden = true; wrap.appendChild(cal);
    cal.addEventListener("click", function (e) { e.stopPropagation(); }); // KEY: see "gotcha" in the doc

    var state = { y: Math.min(maxY, Math.max(minY, 1995)), m: 0, sel: null };
    if (opts.value) { input.value = formatOut(opts.value, F); sync(); }

    function emit() { onChange(parse(input.value, F)); }
    function sync() { var p = parse(input.value, F); if (p) { state.y = p.year; state.m = p.month - 1; state.sel = { y: p.year, m: p.month - 1, d: p.day }; } }

    input.addEventListener("input", function () {
      input.value = autoFormat(input.value, F);
      if (parse(input.value, F) && !cal.hidden) { sync(); render(); }
      emit();
    });
    btn.addEventListener("click", function (e) { e.stopPropagation(); if (cal.hidden) { sync(); cal.hidden = false; render(); } else { cal.hidden = true; } });
    document.addEventListener("click", function (e) { if (!cal.hidden && !wrap.contains(e.target)) cal.hidden = true; });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") cal.hidden = true; });

    function nav(dir) { state.m += dir; if (state.m < 0) { state.m = 11; state.y--; } if (state.m > 11) { state.m = 0; state.y++; } state.y = Math.min(maxY, Math.max(minY, state.y)); render(); }

    function render() {
      cal.innerHTML = "";
      var head = el("div", "dp-head");
      var prev = el("button", "dp-nav", "‹"); prev.type = "button"; prev.addEventListener("click", function () { nav(-1); });
      var next = el("button", "dp-nav", "›"); next.type = "button"; next.addEventListener("click", function () { nav(1); });
      var mSel = document.createElement("select"); mSel.className = "dp-sel"; mSel.setAttribute("aria-label", "Month");
      MONTHS.forEach(function (nm, i) { var o = new Option(nm, i, false, i === state.m); mSel.appendChild(o); });
      mSel.addEventListener("change", function () { state.m = +mSel.value; render(); });
      var ySel = document.createElement("select"); ySel.className = "dp-sel"; ySel.setAttribute("aria-label", "Year");
      for (var yy = maxY; yy >= minY; yy--) ySel.appendChild(new Option(yy, yy, false, yy === state.y));
      ySel.addEventListener("change", function () { state.y = +ySel.value; render(); });
      var mid = el("div", "dp-selwrap"); mid.appendChild(mSel); mid.appendChild(ySel);
      head.appendChild(prev); head.appendChild(mid); head.appendChild(next); cal.appendChild(head);

      var dow = el("div", "dp-dow");
      for (var w = 0; w < 7; w++) dow.appendChild(el("span", null, DOW[(w + weekStart) % 7]));
      cal.appendChild(dow);

      var grid = el("div", "dp-grid");
      var first = (new Date(state.y, state.m, 1).getDay() - weekStart + 7) % 7;
      var days = new Date(state.y, state.m + 1, 0).getDate();
      for (var i = 0; i < first; i++) grid.appendChild(el("span", "dp-empty"));
      for (var d = 1; d <= days; d++) {
        var b = el("button", "dp-day", String(d)); b.type = "button";
        if (state.sel && state.sel.y === state.y && state.sel.m === state.m && state.sel.d === d) b.classList.add("is-sel");
        (function (dd) { b.addEventListener("click", function () { input.value = formatOut({ year: state.y, month: state.m + 1, day: dd }, F); state.sel = { y: state.y, m: state.m, d: dd }; cal.hidden = true; emit(); }); })(d);
        grid.appendChild(b);
      }
      cal.appendChild(grid);
    }
  }

  root.createCalendarInput = createCalendarInput;
})(typeof window !== "undefined" ? window : this);
```

---

## 3. CSS (themeable, zero-config defaults)

Set the four `--dp-*` variables to match your site, or leave them for the neutral dark defaults.

```css
:root{
  --dp-bg:#181a2e; --dp-fg:#e8e8f0; --dp-line:rgba(255,255,255,.16);
  --dp-accent:#d6c18c;      /* selected day + focus */
  --dp-accent-soft:rgba(168,85,200,.18); /* hover halo */
  --dp-radius:12px;
}
.dp-wrap{position:relative;display:flex;gap:8px}
.dp-wrap>input{flex:1 1 auto;background:var(--dp-bg);border:1px solid var(--dp-line);border-radius:8px;color:var(--dp-fg);font:inherit;padding:9px 10px;min-height:44px}
.dp-wrap>input:focus-visible{outline:2px solid var(--dp-accent);outline-offset:1px}
.dp-btn{flex:0 0 auto;width:44px;min-height:44px;border:1px solid var(--dp-line);border-radius:8px;background:var(--dp-bg);color:var(--dp-accent);cursor:pointer;display:grid;place-items:center}
.dp-btn:hover{border-color:var(--dp-accent)}
.dp-cal{position:absolute;z-index:80;top:calc(100% + 8px);left:0;width:min(346px,calc(100vw - 40px));background:var(--dp-bg);border:1px solid var(--dp-line);border-top:2px solid var(--dp-accent);border-radius:var(--dp-radius);box-shadow:0 16px 44px rgba(0,0,0,.5);padding:14px 16px}
@media(min-width:900px){.dp-cal{left:calc(100% + 14px);top:0}} /* open beside the field on wide screens */
.dp-head{display:flex;align-items:center;gap:8px;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid var(--dp-line)}
.dp-selwrap{flex:1 1 auto;display:flex;gap:6px}
.dp-sel{flex:1 1 auto;min-width:0;background:var(--dp-bg);border:1px solid var(--dp-line);border-radius:8px;color:var(--dp-fg);font:inherit;font-size:.86rem;padding:6px 28px 6px 10px;min-height:40px;text-overflow:ellipsis}
.dp-sel:hover{border-color:var(--dp-accent)}
.dp-nav{flex:0 0 auto;width:40px;min-height:40px;border:1px solid var(--dp-line);border-radius:50%;background:var(--dp-bg);color:var(--dp-accent);font-size:1.1rem;cursor:pointer;display:grid;place-items:center;transition:background .15s,border-color .15s,transform .1s}
.dp-nav:hover{background:var(--dp-accent-soft);border-color:var(--dp-accent);color:var(--dp-fg)}
.dp-nav:active{transform:scale(.9)}
.dp-dow{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:4px}
.dp-dow span{text-align:center;font-size:.62rem;letter-spacing:.06em;color:rgba(255,255,255,.45)}
.dp-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
.dp-day{min-height:40px;border:0;border-radius:8px;background:transparent;color:var(--dp-fg);font:inherit;font-size:.9rem;cursor:pointer;transition:background .12s,color .12s}
.dp-day:hover{background:var(--dp-accent-soft)}
.dp-day.is-sel{background:var(--dp-accent);color:#1a1406;font-weight:600;box-shadow:0 0 0 2px var(--dp-accent-soft)}
.dp-empty{min-height:40px}
@media(max-width:560px){
  .dp-cal{position:fixed;left:0;right:0;bottom:0;top:auto;width:100%;max-width:100%;border-radius:var(--dp-radius) var(--dp-radius) 0 0;box-shadow:0 -12px 44px rgba(0,0,0,.6);padding:16px 16px calc(16px + env(safe-area-inset-bottom))}
  .dp-day,.dp-empty{min-height:46px}
}
@media(prefers-reduced-motion:reduce){.dp-nav,.dp-day{transition:none}}
```

---

## The one gotcha (do not remove `stopPropagation`)

The popover closes on any click **outside** it via a document handler:
`if (!cal.hidden && !wrap.contains(e.target)) cal.hidden = true;`

But the arrows and dropdowns call `render()`, which does `cal.innerHTML = ""` and rebuilds —
**detaching the element you just clicked**. The click keeps bubbling to `document`, where
`wrap.contains(e.target)` is now `false` (the target is orphaned), so the calendar hides itself.
Symptom: "the arrows don't work" (the month advanced, but the popover closed and reopening reset it).

Fix, already in the code above: `cal.addEventListener("click", e => e.stopPropagation())` — one
listener on the container, added once, so inside-clicks never reach the document handler.
Day-selection still closes the popover because its own handler sets `cal.hidden = true`.

General rule: **if a handler rebuilds its own subtree, don't trust `container.contains(e.target)`
afterward.** Stop propagation at the container, or re-render only the changed part (see below).

## Design rules baked in

- **Free typing + clean backspace**: always reformat from raw digits, so deleting a digit shortens
  the string instead of getting stuck at a segment boundary.
- **One validator**: `parse()` is the single source of truth (used on input, on read, and it rejects
  impossible dates like Feb 30). Never split on the separator anywhere else.
- **Fast far-back years**: month + year `<select>` dropdowns, not just steppers — critical for
  birthdays. Give the selects `padding-right` so the chevron doesn't crowd the text.
- **Placement**: opens beside the field on desktop (never covers adjacent content), becomes a
  bottom sheet on mobile with 46px tap targets and safe-area padding.
- **Accessibility**: real `<button>`/`<select>` elements (keyboard + screen-reader friendly),
  `aria-label`s, visible `:focus-visible` rings, Escape closes, `prefers-reduced-motion` respected.
  44px minimum hit targets.

## Config reference

| option | default | notes |
|---|---|---|
| `format` | `"MM/DD/YYYY"` | any order + separator, e.g. `"DD/MM/YYYY"`, `"YYYY-MM-DD"` |
| `minYear` | `1900` | earliest year in the dropdown |
| `maxYear` | this year + 1 | latest year |
| `weekStart` | `0` | 0 = Sunday, 1 = Monday |
| `value` | `null` | initial `{year,month,day}` |
| `onChange(d)` | — | fires on every valid change; `d` is `{year,month,day}` or `null` |

## Cleaner variant (optional)

For heavy reuse, split `render()` into `buildChrome()` (header + weekday row, built once when opened)
and `paintGrid()` (only the day cells). Arrows/dropdowns then update state and call `paintGrid()`
only — they never destroy the control being interacted with, so the detach race can't happen and the
`stopPropagation` guard becomes optional. The single-`render()` version above is simpler and battle-
tested; the split is the tidier long-term shape.

---

*Live reference implementation (birth-date field with these exact patterns):
`site/js/ziwei/ziwei-cast-ui.js` in this repo.*
