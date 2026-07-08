# Zodi Animal — working context for Claude

Read this first. It carries the conventions and in-flight work that used to live only in one
person's private assistant memory, so any Claude opening this repo starts from the same place.

## What this repo is
Static site for **zodianimal.com** (Chinese + Western astrology, feng shui, an almanac, and a
Purple Star Astrology teaching hub). This folder (`site/`) is the git root and the Vercel deploy
root (`vercel.json` is here). Deploy = commit + `git push` from `site/`; Vercel auto-builds. Remote:
`github.com/jsongau/spirit`.

Pages are `file://`-safe where reviewed: prefer no build step, no ES modules, no `fetch`; shared
data attaches to `window.ZiweiData`. Note that on Safari `file://`, cross-directory `<script src>`
can fail to load — build a self-contained single-file preview to review a widget in isolation.

## Hard writing/UI rules (always apply, to copy AND to chat)
- **Never underline text links.** No `text-decoration:underline`, no fake border-bottom underline.
  Use colour + weight for links.
- **Never add an external-link / new-tab arrow icon (↗)** to links.
- **Anti-AI writing pass on everything.** Plain English. No em-dash "separator" tics, no hype words
  ("unlock", "elevate", "seamless", "delve"…), no arrows in copy, direct CTAs. Short, specific,
  human. This applies to page copy and to chat replies.
- **Chinese always ships with pinyin + a Mandarin pronounce button** (the site is also a
  Chinese-language/culture hub for Western readers).
- Colour must never be the only signal (state also needs a shape/label/pattern).

## Deploy
From this folder: `git push`. It pushes every local commit not yet on `origin/main`, and Vercel
builds on push. Stage narrowly (there are often many unrelated dirty files); commit only the files
you changed.

## Purple Star Astrology hub — cast-chart architecture
Hub lives at `elements/purple-star-astrology/`. The "cast your chart" widget:
- `js/ziwei/ziwei-lunar.js` — Gregorian→Chinese-lunar converter, computed from astronomy (Meeus new
  moons + solar terms), **verified** against 26 Chinese-New-Year dates (1985–2026) and spot
  conversions. Exposes `ZiweiData.lunar.castFromBirth({year,month,day,hour,gender})`.
- `js/ziwei/ziwei-caster.js` — `ZiweiData.caster.castChart(...)` places palaces + stars.
- `js/ziwei/ziwei-cast-ui.js` — the hero form + personalized reading (Life Palace focus, Four
  Transformations, room-by-room), the interactive board (click a room → light triangle + mirror),
  a Beginner⟷Chart layout toggle, and a sticky birth-hour rail.
- The teaching models below the reading still run on the **sample chart (Mei, 1996)** on purpose:
  their lessons are hand-written worked examples, not swappable data.

## Parked / next work (start here when returning to the PSA hub)
See **`docs/purple-star-hub/NEXT-connect-reading-to-modules.md`** — an execution-ready spec to
connect the personal reading to the rest of the hub: move the birth-hour control to a bottom bar
(desktop + mobile), default to a noon hour (午時) when time is unknown, show the timezone → 時辰
conversion, pre-fill the Four Transformations module from the cast (`psa:cast` event +
`window.ZiweiData.userChart`), and add "how this connects to your reading" notes to the modules.

## Reference docs
`docs/purple-star-hub/` — build plan, changelog, and reference (`reference/CASTING-ENGINE.md`,
`DATA-FILES.md`, `INTERACTIVE-LAYER.md`, decisions/rulings, voice/known-issues).
`docs/CALENDAR-DATE-INPUT.md` — the reusable, dependency-free calendar/date-input recipe used by the
cast form (also packaged as a shareable skill).

## Not in the repo (so a fresh Claude/account won't have them)
Per-account assistant memory and installed skills/plugins don't travel with git. If a convention or
plan matters long-term, write it into this file or `docs/` so it ships with the code.
