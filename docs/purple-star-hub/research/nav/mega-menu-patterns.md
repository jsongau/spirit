# Mega-menu and secondary-nav patterns (2025-2026) — research

Scope: actionable guidance for redesigning a section subnav that is currently plain dropdown lists, aimed at a dark, editorial, colorblind-safe astrology hub. Synthesised from Nielsen Norman Group, Smashing Magazine, Baymard, Level Access / accessibility practitioners, and current design-showcase writeups. Dates noted where the source is older but still the canonical reference.

---

## When to use a mega-menu (and when a simple dropdown is better)

Use a mega-menu when a section has **many destinations that benefit from being seen side by side**. NN/G's core finding is that mega-menus beat regular dropdowns on larger sites because a plain dropdown *hides* most options (you scroll, and scrolling pushes earlier options out of view), forcing users to lean on short-term memory. A mega-panel shows everything at once, supports visual grouping, and can reveal two levels of the information architecture (top-level category + its children) in one glance. That is exactly the situation for 12 palaces + 14 stars + study/reference groups: too many peers for a single scannable column, and they fall into natural groups.

Stay with a **simple dropdown** when:
- A section has roughly 7 or fewer flat items with no meaningful sub-grouping.
- The list is truly one-dimensional (no categories to chunk).
- The trigger is a utility item (account, settings) rather than a content hub.

Do **not** turn a mega-panel into an app surface. NN/G is explicit: keep it a navigation menu, not a mini-dialog. Avoid embedding search boxes, form fields, filters, or other GUI widgets — those belong on a real page or in a dialog with a proper dismiss model. A mega-menu is a fleeting hover/focus surface and should only contain links (optionally with short descriptions and one promoted cell).

Rule of thumb on total size: keep the whole panel scannable. Practitioner consensus lands around **an upper bound in the high-20s to mid-30s of links** across all columns; past that, split into more than one top-level entry or move detail onto a landing page. More important than the raw cap is that every item earns its place — unstructured length raises cognitive load and scanning cost.

---

## Column layout and grouping rules (with item-count guidance)

**Column count.** Two to four columns is the working range; **three to four is the sweet spot** for a content hub. NN/G and downstream UX writeups warn that going past four columns pushes users into "choice overload" — more time scanning, less time clicking. One column is just a dropdown; five-plus columns read as a spreadsheet.

**Grouping logic (from NN/G's grouping guidelines):**
- Chunk items into **related sets** that match the user's mental model. If you have run or can run a card sort, use those clusters.
- Keep **medium granularity**: groups should be neither one giant list nor a swarm of tiny 2-item groups. If a group has 2 items and another has 15, rebalance.
- Give every column/group a **concise, descriptive heading**. Baymard-style findings and practitioner writeups repeatedly tie missing group headings to higher abandonment — without a heading users cannot tell which column holds what. Headings must be visually distinct from the child links (different weight, size, colour, or letter-spacing), not just the first line of the list.
- **Front-load the labels**: start each label with its most information-carrying word so a vertical scan of first words works. Differentiate labels from each other (avoid "X by interest" / "X by occasion" style near-duplicates that all start the same).
- **Order the groups** deliberately — by inherent sequence (a workflow) or by importance/frequency, with the most important group top-left in a left-to-right layout.
- **Show each item once.** Duplicated links make users wonder whether the two are different, and bloat the panel.

**Showing 12–16 items without overwhelming.** The mechanism is grouping plus typographic hierarchy, not a flat grid. Break the set into 3–4 labelled columns of ~4–6 items each. Use size/weight/colour to signal importance rather than treating everything as equal. When items have a natural visual identity (like the animal signs or star glyphs here), small thumbnails or glyphs let users compare and locate by recognition instead of reading every label (NN/G's Moleskine example). Twelve palaces sit comfortably as one 3-column or 4-column block; fourteen stars as a second block; study/reference as a slim third region or a footer row.

---

## Iconography: helps vs hurts

Icons help scanning **only when they add a distinct, recognisable visual cue paired with a text label** — never as a replacement for the label. Findings across the UX literature:

- **Helps** when the icon set is visually distinct per item (e.g., the 12 animal signs, or star glyphs that users already learn on the site). Distinct imagery supports recognition-over-recall and speeds location of a known target.
- **Hurts** when icons are generic and near-identical (a wall of similar grey squares adds noise, lengthens rows, and slows scanning), or when they replace text so screen-reader users and anyone unsure of the glyph get nothing.
- **Style matters for scan speed.** Research summarised in the UX press ranks **outline icons highest for scanning efficiency**, then solid, then flat, with skeuomorphic worst. For a nav, favour simple line/outline glyphs at a consistent grid size.
- **Sizing.** Keep glyphs small and consistent (roughly 16–24px in a text-row context; a featured cell can go larger). Align them on a shared baseline/left rail so labels still form a clean vertical edge for first-word scanning.
- **Accessibility.** Decorative icons should be `aria-hidden="true"` so they are not announced; the text label carries meaning. If an icon ever stands alone, it needs an accessible name. Do not encode meaning in icon colour alone (see colorblind section).

Net: for this hub, icons are a genuine asset for the palaces and stars because each has a unique symbol; use them as recognition aids next to always-present labels, in a single consistent outline style, and hide them from assistive tech.

---

## The featured/promoted cell pattern

A common, high-converting mega-menu pattern is one **highlighted cell** inside the panel — visually set apart by background shading, a larger image/illustration, a short blurb, and a clear call to action. Observed uses: HubSpot ends product columns with a prominent CTA button; e-commerce panels (Adidas, eBay, Moleskine) dedicate a promoted region to a seasonal campaign or featured item with a thumbnail. The pattern works because it uses size/colour/spacing to guide attention toward one high-value next step instead of leaving the user to weigh a flat list.

How to apply it without cheapening an editorial feel:
- **One featured cell per panel, max.** Multiple "specials" cancel out.
- Set it apart with a **subtle tonal panel** (a slightly lighter/tinted card on a dark background), a single image or large glyph, a one-line description, and a directive CTA ("Read the full guide", "Start your chart"). Keep CTA copy plain and action-first.
- Place it in a **stable location** — commonly the right-most column or a full-width footer strip of the panel — so it reads as "editor's pick", not an ad injected into the link list.
- Keep it a link/CTA, not a form. Honour the "no heavyweight widgets in the menu" rule.
- Ensure it is reachable and announced in the keyboard/focus order like any other item, and that its contrast passes independently of the tint.

For the astrology hub this is the natural home for a rotating "reading of the month", a flagship guide, or the paid-app funnel entry — one promoted cell, editorial styling, honest copy.

---

## Interaction model (hover vs click, intent delay)

**Prefer click/tap-to-open, or hover-with-real-intent-handling.** Pure hover menus are the classic source of frustration (Smashing's "when hover menus fail"): they open by accident, close when the pointer strays, and don't exist on touch. Current best practice:

- **Top-level trigger should also be clickable** and should work on tap and via keyboard (Enter/Space). Never make hover the *only* way in.
- If you open on hover, respect **hover intent with a delay**. NN/G's timing: the pointer should rest ~**0.5s** before the panel appears (then reveal within ~0.1s); keep it open until the pointer has been outside both trigger and panel for ~0.5s, then hide within ~0.1s. Baymard's benchmark is a **300–500ms** hover delay and notes ~60% of sites get this wrong, causing flicker.
- **Solve the diagonal problem.** When the user moves diagonally from the trigger into the panel, the cursor briefly exits the active area; the panel must not vanish. Implement a **"safe triangle"** (Amazon's technique, originally an Apple menu trick): build a triangle from the current pointer position to the panel's near corners, and if the next move stays inside it, keep the panel open rather than switching on the item the cursor grazes. This is more robust than delay alone and avoids "menu rage".
- On **touch**, first tap opens, tap on an item navigates; make sure a parent that is itself a link is still reachable (e.g., a dedicated "view all" link inside the panel).

Net for this hub: click-to-open is the safest primary model; if hover is added for pointer users as an enhancement, pair it with a 300–500ms intent delay and a safe-triangle so the 12/14-item panels don't flicker or slam shut mid-reach.

---

## Accessibility must-haves (roles, keyboard, focus, Escape)

The modern practitioner consensus (Level Access, MDN, Adobe's accessible mega-menu, WAI patterns) is that **a site nav mega-menu should be built as a set of disclosure widgets inside a `<nav>`, not as a desktop-application `menu`/`menuitem` widget.** The ARIA `menu` role implies application menu semantics and arrow-key-only navigation, which fights how people use web nav and is easy to get wrong. Use it only if the thing genuinely behaves like an app menu.

Recommended structure:
- Wrap the whole thing in `<nav aria-label="…">`. Each top-level item is a **`<button>` that toggles its panel**, with `aria-expanded="true|false"` and `aria-controls` pointing at the panel's id. Use `aria-haspopup` to signal a popup where appropriate.
- The panel's contents are ordinary lists of links (`<ul><li><a>`), with real `<h2>/<h3>`-level or visually-styled group headings that are programmatically associated where possible.
- **Keyboard model:** Tab moves between top-level triggers and into/through the links (predictable DOM order). Enter/Space on a trigger opens/closes its panel. **Escape closes the open panel and returns focus to its trigger.** Optionally support arrow keys within a panel as an enhancement, but Tab must always work.
- **Focus management:** focus must never land on hidden items — panels that are closed should be removed from the tab order (`display:none`/`hidden`, not just visually offscreen). When a panel opens, focus can move into it; when it closes (Escape, outside click, blur), focus returns to the trigger.
- **Provide a plain-page fallback (NN/G "simple" approach):** every top-level trigger should also lead to a real landing page that lists the same links in fully accessible HTML. This rescues screen-magnifier and low-vision users who may only see a sliver of a big panel, and is the cheapest robust safety net.
- **Low-vision / magnifier:** give the panel a **strong visible border/edge** (not a faint drop shadow) so magnified users can tell where it ends and don't assume the visible slice is everything.
- **Decorative icons** get `aria-hidden="true"`; meaning lives in text.
- **Touch targets** must be large enough (avoid tiny finicky hit areas); overly sensitive show/hide hurts users with motor impairments.

Sticky-nav specific accessibility (from Smashing's sticky-menu guidelines): a sticky secondary bar must not trap or obscure focus. Keep it compact, ensure focused elements remain visible beneath it, add `scroll-padding-top` in CSS so in-page anchor jumps aren't hidden under the bar, and ensure it survives zoom without breaking.

---

## Premium/editorial visual treatments to borrow

The goal is "editorial magazine", not "generic SaaS dropdown". Treatments that read as premium:

- **Generous whitespace and breathing room** inside the panel. Density is the enemy of the editorial feel; let groups sit apart with clear gutters.
- **Typographic hierarchy as the main structure**: a refined type scale where group headings use a display/serif or a distinct weight, and child links sit in a clean sans. Contrast comes from size/weight/letter-spacing, not boxes and borders everywhere. Editorial-style sites lean on big-personality type and mixed typefaces for rhythm.
- **Restrained, purposeful motion**: a short, calm reveal (roughly 150–300ms ease) rather than bouncy animation. For partially-persistent sticky bars, NN/G suggests a slide-in around 300–400ms so it feels natural, not distracting.
- **One clear focal point** (the featured cell) rather than uniform grey rows — an art-directed image or large glyph gives the panel a cover-story feel.
- **Considered surface treatment on dark**: a slightly elevated panel (subtle tonal shift, soft shadow or hairline border) that separates the menu from content, with a strong enough edge to satisfy low-vision users.
- **Deliberate scroll-state transition** for the nav bar itself: decide whether the bar keeps the same look, gains a background, or condenses as content scrolls under it — polished navs handle this transition intentionally rather than by accident.
- **Selective, not maximal**: the best editorial sites adopt trends strategically. Pick a couple of signature moves (type + one featured cell + calm motion) and keep the rest quiet.

---

## Concrete recommendations for a dark, editorial, colorblind-safe astrology hub with 12 palaces + 14 stars + study/reference groups

**Overall structure.** Replace the plain dropdown lists with a **click-to-open mega-panel** per major section, built as disclosure buttons inside `<nav>` (not `role="menu"`). Layout the panel as **three regions**:
1. **The 12 Palaces** — a 3-column or 4-column block (4 rows × 3, or 3 rows × ~4), each item = small outline glyph + label, grouped under a "Palaces" heading. Twelve items fit one tidy block.
2. **The 14 Stars** — a second labelled block, likewise glyph + label. If 14 in one block feels heavy, split into "Major stars" / "Other stars" sub-headings so no single column exceeds ~5–6.
3. **Study & Reference** — a slim third column or a full-width footer strip: guides, glossary, how-to-read, method notes.

**Featured cell.** Reserve the right column or the footer strip for **one promoted cell**: an editorial "start here" guide, reading-of-the-month, or the Zodi Almanac app entry — tinted card, one image/large glyph, one line of plain copy, one action-first CTA. Only one per panel.

**Item counts.** ~4–6 items per column, 3–4 columns, total kept in the high-20s to low-30s including study/reference. If it grows past that, push detail to the section landing page.

**Icons.** Use the unique palace and star glyphs as recognition aids in a **single consistent outline style**, small and baseline-aligned, always beside a text label, `aria-hidden` for decoration. Do not let icon colour carry meaning.

**Colorblind-safe on dark (this is load-bearing given the memory note about colorblind-safety):**
- **Never rely on colour alone** for state (active section, current page, "new"). Pair colour with a second cue: a shape, an underline-free weight change, a left-rail bar, a dot/asterisk, or a glyph. (Respect the site rule: no underlined text links and no fake border-bottom underlines — signal active state with weight + colour + a non-underline marker such as a left indicator bar or filled glyph.)
- **Meet contrast**: 4.5:1 for normal text, 3:1 for large text and meaningful non-text UI, tested in **grayscale**. On dark, avoid stacking several near-equal dark greys — ensure real brightness separation between panel, headings, and body links.
- If a contrasting accent pair is needed, **blue/orange** survives the common CVD types far better than red/green; never encode status as red-vs-green without an icon.
- Give the panel a **strong visible edge** for magnifier users.

**Interaction.** Primary = click/tap and full keyboard (Enter/Space to open, Tab through, **Escape to close and return focus to the trigger**). If hover is layered on for mouse users, add a **300–500ms intent delay** and a **safe-triangle** so the 12/14-item panels don't flicker or close mid-diagonal. Closed panels leave the tab order.

**Sticky secondary nav.** If the section subnav is sticky, keep it **compact (≤ ~5 primary items, overflow into a "more")**, ensure focused content stays visible beneath it, add `scroll-padding-top` for anchor jumps, and consider a **partially-persistent** bar (hide on scroll-down, reveal on scroll-up, ~300–400ms slide) so it doesn't eat editorial reading space. Provide a real landing page per section as the accessible fallback for the full menu.

**Editorial polish.** Display/serif group headings vs clean sans links, generous gutters, one art-directed featured cell, calm 150–300ms reveal, deliberate scroll-state for the bar. Signature moves only — keep the rest quiet.

---

## Sources (bulleted URLs, short note each)

- https://www.nngroup.com/articles/mega-menus-work-well/ — NN/G canonical: why mega-menus beat dropdowns, grouping rules, 0.5s hover timing, the diagonal problem, keep-it-simple, simple-vs-advanced accessibility, magnifier/border caution.
- https://www.nngroup.com/articles/menu-design/ — NN/G 17-guideline menu-design checklist (labels, scannability, structure).
- https://www.nngroup.com/articles/sticky-headers/ — NN/G on sticky headers: when useful, slide-in ~300–400ms, partial persistence, contrast issues.
- https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/ — Smashing: when sticky helps vs harms, ≤5 items + overflow, accordion on mobile, zoom/keyboard/anchor (scroll-padding) accessibility, partially-persistent pattern.
- https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-mega-dropdown-hover-menus/ — Smashing: why pure hover mega-dropdowns fail; intent and click alternatives.
- https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/ — Smashing: safe-triangle technique for forgiving diagonal mouse paths.
- https://baymard.com/blog/dropdown-menu-flickering-issue — Baymard: provide a 300–500ms hover delay (60% of sites don't); flicker fix.
- https://css-tricks.com/dropdown-menus-with-more-forgiving-mouse-movement-paths/ — CSS-Tricks: implementing forgiving mouse paths / mouse-trajectory triangle.
- https://www.levelaccess.com/blog/challenges-mega-menus-standard-menus-make-accessible/ — Level Access: making mega-menus accessible; disclosure vs application-menu semantics.
- https://www.levelaccess.com/blog/accessible-navigation-menus-pitfalls-and-best-practices/ — Level Access: keyboard model (Tab/Enter/Esc), aria-expanded/haspopup, focus rules, when NOT to use role=menu.
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role — MDN: menu role semantics and why site nav usually shouldn't use it.
- https://adobe-accessibility.github.io/Accessible-Mega-Menu/ — Adobe: reference implementation of a keyboard/screen-reader accessible mega-menu.
- https://github.com/AllThingsSmitty/accessible-mega-menu — Working accessible mega-menu code reference.
- https://uxmovement.com/mobile/which-icon-style-is-most-efficient-for-scanning/ — Icon-style scanning efficiency: outline > solid > flat > skeuomorphic.
- https://www.nngroup.com/articles/hamburger-menus/ — NN/G: hidden/icon-only nav hurts discoverability; keep labels visible.
- https://www.webstacks.com/blog/mega-menu-examples — Featured-cell / promoted-CTA examples (HubSpot columns ending in a CTA).
- https://www.tilipmandigital.com/resource-center/articles/mega-menu-examples — 2025 B2B/e-comm mega-menu examples incl. promoted product/campaign cells (eBay, Adidas).
- https://atmos.style/blog/color-blindness-in-ui-design — Colorblind UI: never rely on colour alone, redundant cues, grayscale testing.
- https://www.lyssna.com/blog/color-blind-friendly-palette/ — Colorblind-safe palettes; blue/orange over red/green.
- https://developerux.com/2025/07/28/best-practices-for-accessible-color-contrast-in-ux/ — 2025 contrast best practices (4.5:1 / 3:1), dark-theme grey-on-grey pitfall.
- https://www.awwwards.com/inspiration/editorial-layout — Editorial layout inspiration: type-led hierarchy, whitespace, art direction.
- https://www.awwwards.com/websites/typography/ — Editorial typography treatments that read premium.
