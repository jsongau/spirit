# Mobile secondary-nav patterns (2025-2026) — research

Scope: patterns for a content-rich SECONDARY / section navigation (a section mega-nav), not the global site header. Target: phones down to 320px wide, one-handed use. Sources are listed at the bottom; key sources are NN/G, Smashing Magazine, Material 3, and W3C WCAG.

Design constraint for our case (referenced throughout): a Purple Star / Zi Wei section nav that must expose 12 palaces + 14 major stars + study/reference groups — roughly 30+ destinations. That count is past the point where any single flat list or accordion stack works cleanly on a 320px screen, so most of this doc is about how to chunk and reveal, not just how to style a nav row.

---

## Horizontal scroller rows: when and how (with affordance cues)

A horizontal scroller row (chips or tabs that scroll sideways) is the right tool for a SMALL, roughly peer-level set (about 3-8 items) where the user picks one active view and the set is stable. Think of it as a filter/segment control, not as the whole site map. It fails as a primary way to reach 30 destinations because most items are off-screen and undiscovered.

When it works:
- Few items (3-8), all of similar importance, one active at a time.
- The list is browsable/scannable rather than requiring the user to hunt a specific rarely-used item.
- You can keep the most important item first (left edge) since that is always visible.

The core problem: hidden overflow. If the row fills the screen edge-to-edge with no cut-off item, users assume there is nothing more and never scroll. NN/G and tab-UX guidance both stress that you must SIGNAL more content.

Affordance cues that work (use more than one):
- Partial-peek: let the next item be visibly clipped at the right edge so a sliver of a chip shows. This is the single strongest cue that the row scrolls.
- Edge fade / gradient mask: a `linear-gradient` fading the row's right edge (and left edge once scrolled) to the background color. Implement with a `::after` pseudo-element or a CSS `mask-image`, `pointer-events: none` so it never blocks taps. Show the left fade only after `scrollLeft > 0` and hide the right fade at the end, so the fades double as position indicators.
- Scroll-snap for tidy stops: `scroll-snap-type: x proximity` (proximity, not mandatory, so users can rest between items) plus `scroll-padding-left` so a snapped item is not jammed against the edge. Add `overscroll-behavior-x: contain` so a horizontal swipe does not trigger browser back/refresh or scroll the page.
- Do NOT rely on tiny arrow buttons alone; on touch they are small targets and are easy to miss. Arrows can supplement the fade on larger screens but the peek+fade is what carries mobile.

Pitfalls:
- Accidental horizontal page scroll: the scroll container must be the ONLY horizontally scrollable thing; the page/body must stay at `overflow-x: hidden` / `100%` width (see the 320px section).
- Active item scrolled off-screen: when a row is the current-section indicator, programmatically scroll the active chip into view on load (`scrollIntoView({inline: 'center'})`) so users see where they are.
- Vertical-vs-horizontal gesture conflict: a horizontal row inside a vertically scrolling page can eat vertical drags. Keep the row short (one line) and let vertical drags pass through.
- View-tap asymmetry (NN/G): chips can be readable but too short to tap. Keep the full chip height >=44px and add horizontal padding so the tap area is generous.

Accessibility for scroller rows:
- If the row is genuinely tabs that swap a panel in place, use the ARIA tabs pattern (`role="tablist"` / `role="tab"` / `role="tabpanel"`, arrow-key roving tabindex, `aria-selected`). If the chips are just links to other pages, they are a `<nav>` with a plain list of links; do NOT bolt on tab roles you do not implement. Picking the wrong model is a common a11y bug.
- A scroll container needs keyboard access. If it is a focusable scroll region, give it `tabindex="0"` and a label so keyboard/AT users can reach and arrow through it; otherwise ensure every item is itself a focusable link/button.
- Never signal the active item by color alone (WCAG 1.4.1) — pair color with weight, an underline-free indicator bar, or a filled chip background.

---

## Bottom sheets vs full-screen menus vs accordions

Three ways to present a larger section nav on mobile. They are not interchangeable; the choice follows item count and how users move through the section.

Bottom sheet (modal, slides up from the bottom):
- Best when the nav has more items than a chip row can hold but you want to keep the user in context and within thumb reach. The sheet opens near the thumb, and the top of the list sits in the easy-reach zone rather than at the far top of the screen.
- Material 3 specifics: use a MODAL bottom sheet for navigation choices (it has a scrim and must be dismissed before touching content below — correct for a menu). Include a drag handle at the top; Material sizes the handle's touch target at 48dp minimum, so reserve ~48px of header height for it. The handle allows drag-to-expand / drag-to-dismiss and is also a visible affordance that the surface is draggable.
- Sizing: open at a partial height (a "half sheet" / detent) that shows several items plus a peek of more so the list is obviously scrollable; allow drag to a full-height detent for the long list. Keep a comfortable dismiss target (swipe down on the handle, tap the scrim, and a visible close control for a11y).
- Focus + a11y: on open, move focus into the sheet and TRAP focus inside it (Tab cycles within the sheet); on close, return focus to the trigger. `Esc` and scrim-tap must close it. Give the sheet `role="dialog"` + `aria-modal="true"` + a label. Set `inert`/`aria-hidden` on the background so AT does not wander behind the scrim.
- Good when: many items, but the user will likely make ONE choice and get back to reading. Better than a full-screen takeover because it is less disruptive and lands in the thumb zone.

Full-screen menu (takeover):
- Best when the nav itself is a browsing destination — deep, multi-level, or when the user will make several selections in a row. It gives room for large targets, grouping headers, and drill-down without cramping.
- Downsides: it fully hides content, and the top items land in the hard-to-reach top of the screen. For a quick single jump it feels heavy.
- Same modal a11y rules apply (focus trap, restore focus, `Esc`, labelled dialog).

Accordions (expand-in-place groups):
- Best when there are a FEW groups each with a FEW items. NN/G's threshold: accordions/submenus work well only when each primary category has fewer than ~6 subcategories; beyond that the expanded menu runs several screenfuls and finding one item becomes tedious (their SBNation example spans 3+ screenfuls).
- Strength: everything stays on one surface, no page loads, users can compare groups by opening/closing. Good for "reference"-type grouping where the user scans headers.
- Weakness at our scale: 12 palaces + 14 stars + study/reference under one accordion stack = a very tall column; expanding two or three groups pushes items far below the fold and loses the overview. Use accordions only WITHIN a chosen group, not as the top-level container for all 30+ items.

Rule of thumb from the sources: accordion for <6 per group; a section menu (a dedicated secondary menu surface, e.g., a bottom sheet or a section landing) for ~6-15; a category landing page when a single group exceeds ~15.

---

## Handling many items (12-16) on a small screen

NN/G's mobile subnavigation decision algorithm maps directly onto "many items":
- < 6 subcategories per group -> accordion/submenu is fine.
- 6-15 per group -> use a dedicated section menu (a separate surface from the global nav).
- > 15 per group -> use a category landing page (a real page that acts as a navigation hub).

Practical tactics for 12-16 peer items:
- Chunk into labelled groups first. 14 stars is too many to scan as a flat list; grouping (e.g., by function/element) turns one 14-item scan into a few short scans. Group headers give "information scent."
- Prefer a two-step structure over one giant flat list: pick a group, then see that group's items. This is the "section menu" idea, and it keeps any single view short.
- Sequential / drill-down (tap a category, the list is replaced by its children, with a Back control) can traverse a deep tree quickly and is popular on mobile. BUT NN/G cautions: it disorients low-spatial-ability users, hides sibling groups, and users frequently hit the browser/OS Back button and get thrown out of the menu. If you use drill-down, show a breadcrumb or clear in-menu Back label (not just "Back"), and do not over-nest — 1-2 levels max.
- For a browse-heavy hub, a category landing page (a scannable grid/list of all destinations with short labels) often beats any menu widget: it is linkable, indexable, back-button-safe, and has no focus-trap complexity. NN/G recommends this when a group exceeds ~15 items.
- Text lists generally beat image grids for scannability of many labelled destinations (NN/G), though a compact 2-column text grid can be efficient at 320px for short labels.

---

## Touch targets, thumb reach, one-hand use

Sizes (converging guidance):
- WCAG 2.5.8 Target Size (Minimum), Level AA: at least 24x24 CSS px (with spacing exceptions). This is a floor, not a goal.
- WCAG 2.5.5 Target Size (Enhanced), Level AAA: 44x44 CSS px.
- Apple HIG: 44x44 pt. Material: 48x48 dp. NN/G: at least 1cm x 1cm physical (~0.4in), which is why "44-48px" is the practical target.
- Smashing / Steven Hoober's research: edges of the screen need BIGGER targets than the center because input is least precise at top and bottom — aim ~42-46px at top/bottom (sticky bars), and you can go as low as ~27px only for small links inside body content. Personal recommendation in that piece: 30x30 minimum for inline, 48x48 for top/bottom bars.

Spacing and hit area:
- Size alone is not enough — crowding causes mis-taps (NN/G). Keep clear space between adjacent targets; ~8px minimum gap, more for stacked rows.
- Maximize the clickable area: make nav rows/list items full-width and put the tap handler on the whole row, not just the text. Pad icons out to the full target size. Avoid tiny icon-only controls (dismiss "x", carousel dots) — classic view-tap-asymmetry failures.

Thumb reach / one-hand:
- ~49% of people use a phone one-handed; the comfortable reach is a curved arc, not a rectangle. On modern 6.1-6.9" phones the top corners are a stretch and the bottom ~40% is the easy zone.
- Put the primary trigger for the section nav (the button that opens the sheet/menu) and the most-used destinations toward the bottom / within thumb reach. This is a strong argument for a bottom sheet over a top-anchored full-screen menu for the frequent single-jump case.
- Bottom-anchored patterns (bottom sheet, bottom tab bar) put the actionable surface where the thumb already is.

---

## Avoiding 320px overflow

320px (iPhone SE / small Android, and the reference floor) is where horizontal-overflow bugs surface. Rules:
- Never let a horizontal scroller leak to the page. The scroll must live in an inner container with `overflow-x: auto`; the page/body should not scroll sideways. As a safety net, set `overflow-x: hidden` on a wrapping container and ensure no child forces width (`max-width: 100%` on media, `min-width: 0` on flex children so long labels can shrink/wrap instead of pushing width).
- Use `box-sizing: border-box` everywhere and avoid fixed pixel widths that exceed ~288px (320 minus typical 16px gutters).
- Use logical/relative units and modern viewport units. Prefer `svh`/`svw` (small-viewport units) for anything that must stay fully visible regardless of the mobile browser's expanding/collapsing address bar; `svh` is the safe default for sticky bars and sheets so they are never clipped by browser chrome.
- For a chip row: `flex-wrap: nowrap` + `overflow-x: auto` + `overscroll-behavior-x: contain`; give it explicit horizontal padding so the first/last chips are not glued to the edges (`scroll-padding-inline`).
- Long single-word labels (star/palace names, and pinyin) can force overflow — allow wrapping (`overflow-wrap: anywhere`) or truncate with an accessible full label. Test with the LONGEST label, not a typical one.
- Test at 320px AND 360px, in both portrait, and with the browser address bar both shown and hidden.

---

## Accessibility on mobile web

Mobile web still gets keyboards (Bluetooth, switch access) and screen readers (VoiceOver, TalkBack), so the same rules as desktop apply plus touch specifics:
- Semantics first: a nav is `<nav aria-label="...">` containing a list of links. Only use the tabs pattern (`role="tablist"`/`tab`/`tabpanel`, roving tabindex, arrow keys, `aria-selected`) if you actually swap panels in place. Mislabeling links as tabs is a frequent error.
- Keyboard: every destination must be reachable and operable by keyboard, with a VISIBLE focus indicator (WCAG 2.4.7). Roving tabindex or arrow-key support for chip/tab rows; ensure a horizontally-scrolled item scrolls into view when focused.
- Modal surfaces (bottom sheet, full-screen menu): `role="dialog"` + `aria-modal="true"` + accessible name; move focus in on open, TRAP focus while open, restore focus to the trigger on close; `Esc` closes; background gets `inert`/`aria-hidden` so AT and Tab do not escape behind the scrim.
- State without color: active/current item needs a non-color cue (`aria-current="page"` for the current section link; weight, a shape, or an indicator bar) in addition to color (WCAG 1.4.1). No underline is required to convey a link here — use color+weight per house style — but ensure a non-color distinction for the CURRENT item.
- Announce dynamic changes: if a selection updates content in place, use `aria-live`/manage focus so screen-reader users know something changed.
- Drag handles and swipe-to-dismiss must have a non-gesture alternative: a visible, labelled close button, and tappable list items (never require a drag to operate the menu).
- Meet at least WCAG 2.5.8 (24px) target size; aim for 44-48px on the primary nav controls.
- Respect `prefers-reduced-motion` for sheet slide / snap animations.

---

## Concrete recommendations for a section mega-nav with 12 palaces + 14 stars + study/reference groups

The set is ~30+ destinations across three conceptually different buckets (Palaces, Stars, Study/Reference). That is past the flat-list and single-accordion thresholds, so use a chunked, two-tier structure.

Recommended structure:
1. Top-level entry = 3-4 GROUPS, not 30 items. Surface the buckets first: Palaces (12), Stars (14), Study & Reference (the rest). This respects NN/G's "6-15 -> section menu, >15 -> landing" thresholds by never showing all items at once.
2. A short sticky chip row for the buckets. A horizontal scroller with 3-4 chips (Palaces / Stars / Study / Reference) is ideal here: few, peer-level, one active at a time. Keep the active bucket's chip scrolled into view and marked with `aria-current` + a non-color indicator. Because it is only 3-4 chips, it will usually fit 320px without scrolling — but still add the edge-fade affordance in case labels are long.
3. Reveal the chosen bucket's items in a bottom sheet (preferred) or a section landing.
   - Bottom sheet: modal, drag handle (48px), opens at a half detent showing several items with a peek of more, drag to full height for the 12/14-item list. Lands in the thumb zone, keeps reading context, full focus-trap a11y. Best for the "jump to one palace/star and get back" behavior.
   - If users tend to browse many stars in a session, a Stars LANDING PAGE (scannable, grouped, linkable, back-safe) is the more robust choice for that bucket specifically — it sidesteps focus-trap complexity and is indexable/SEO-friendly.
4. Group the 14 stars inside their view. Do not show 14 as a flat scroll; add 2-4 sub-headers (e.g., by element or by nature) so each scan is <6 items — matching the accordion-friendly threshold and improving scent. The 12 palaces have an inherent order (natal chart order) — present them in that fixed order, optionally 2-column at 320px for short labels.
5. Avoid deep drill-down. Keep it to two levels (bucket -> items). If you ever nest further, add a breadcrumb/back label inside the surface (not a bare "Back") because of the browser-Back confusion NN/G documents.
6. Sizing/overflow: every item is a full-width, >=44px tappable row (48px if it lives in a sticky bar); 8px+ gaps; test with the longest star/palace label plus pinyin at 320px; page/body `overflow-x` locked; use `svh` for the sheet and any sticky bar so browser chrome never clips them; `overscroll-behavior-x: contain` on the chip row.
7. Sticky behavior: if the bucket chip row is sticky, keep it to a single ~48px line and consider hide-on-scroll-down / show-on-scroll-up so it does not permanently eat the small viewport. Add `scroll-margin-top` to anchor targets so sticky height does not hide headings.
8. A11y bundle: `<nav aria-label="Purple Star sections">` for the chip row (links, not fake tabs); dialog semantics + focus trap for the sheet; `aria-current="page"` on the active destination; visible focus rings; non-color active indicator; `prefers-reduced-motion` honored; a real close button in addition to swipe/scrim.

Net: buckets as a tiny chip row -> a modal bottom sheet (or a landing page for the browse-heavy Stars bucket) that lists a grouped, thumb-reachable set of >=44px destinations. This keeps every individual view short, keeps actions in the thumb zone, and stays within the 320px width and mobile-a11y constraints.

---

## Sources (bulleted URLs, short note each)

- https://www.nngroup.com/articles/mobile-subnavigation/ — NN/G. The core reference: accordions vs sequential menus vs section menus vs category landing pages, plus the <6 / 6-15 / >15 decision thresholds and drill-down/back-button pitfalls.
- https://www.nngroup.com/articles/touch-target-size/ — NN/G. Minimum 1cm x 1cm physical targets, crowding/spacing errors, view-tap asymmetry, when to go bigger.
- https://www.nngroup.com/articles/mobile-navigation-patterns/ — NN/G. Primer on mobile nav patterns incl. navigation-hub/landing pages.
- https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/ — Smashing / Vitaly Friedman + Hoober research. Edge-of-screen targets need to be larger (42-46px top/bottom, ~27px center); why only ~5 items fit a bottom tab bar and to use a bottom sheet beyond that; maximize clickable area (full-width rows).
- https://m3.material.io/components/bottom-sheets/specs — Material Design 3. Standard vs modal bottom sheets, drag handle (48dp touch target), detents, when modal is the right choice for menus.
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html — W3C. WCAG 2.5.8 Target Size (Minimum) AA = 24x24 CSS px; contrast with 2.5.5 AAA = 44x44.
- https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-2-tablist/ — W3C APG. Tabs/tablist pattern for slide/segment control: roles, roving tabindex, arrow keys — the correct model IF you swap panels in place.
- https://www.a11y-collective.com/blog/accessible-carousel/ — Accessibility guide for horizontal scrollers/carousels: keyboard prev/next, screen-reader announcements (aria-live), focusable labelled controls, min target sizes.
- https://www.smashingmagazine.com/2023/02/guide-building-accessible-carousels/ — Smashing. Step-by-step accessible carousel/scroller build (keyboard, focus, ARIA).
- https://dev.to/web_dev-usman/the-new-css-viewport-units-that-finally-fix-mobile-layouts-2cjd — New CSS viewport units (svh/lvh/dvh); use svh for sticky bars/sheets so browser chrome never clips them.
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap — MDN. scroll-snap-type, scroll-padding, overscroll-behavior-x for tidy, contained horizontal scroller rows.
- https://labex.io/tutorials/overflow-scroll-gradient-35228 — Technique for edge-fade/gradient affordance on scroll containers (::after linear-gradient, pointer-events:none) to signal more content.
- https://www.eleken.co/blog-posts/tabs-ux — Tab UX: cap visible tabs (~5), always signal horizontal overflow with a partial-peek/arrow, active state must not rely on color alone, 44px targets.
- https://blog.logrocket.com/ux-design/designing-accordion-menus-complex-content/ — Accordion UX best practices and when accordions stop scaling for complex content.
- https://www.72technologies.com/blog/tap-targets-thumb-zones-mobile-ux — Thumb-zone / reachability beyond the 44px rule; primary actions belong in the bottom ~40% on modern large phones.
