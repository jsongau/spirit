# Reference — progress, comprehension events, and ranks (`ziwei-progress.js`)

The store that tracks a learner's path. It is a new key that builds on the old one without breaking it, tracks understanding rather than clicks, and earns ranks by mastery.

## Two keys, one direction of sync

- `zwdsSchool.v1` — the old flat key the chart page still reads: `{ wheel, case, drills, timing, exam, examScore }` (the five "halls" plus the Foundation Exam score).
- `zwdsSchool.v2` — the new key. On first load it **imports v1 once** (`migratedFromV1`) and records any legacy exam rank. It **mirrors the five hall flags back to v1** whenever they change, so the un-rebuilt chart page keeps painting its progress strip during the transition. v1 is never deleted or restructured.

## The v2 shape

```json
{
  "v": 2, "migratedFromV1": true,
  "legacy": { "wheel": true, "exam": true, "examScore": 9,
              "legacyRank": "Imperial Astrologer 欽天監", "legacyRankGrandfathered": true },
  "lessons": { "1.3": { "done": true, "ts": 0 } },
  "checks":  { "L8": { "teachback_teach-the-triangle": true } },
  "levels":  { "L1": true },
  "rank":    { "current": "Star Keeper 司星", "history": [ ... ] },
  "exams":   { "foundation": { "best": 9, "sittings": 1 }, "readers": { "best": 18, "sittings": 1 } },
  "charts":  { "study": null },
  "prefs":   {}
}
```

Unknown fields are preserved on read-modify-write (forward compatible); every write is wrapped in try/catch.

## Comprehension events (never clicks)

The API dispatches a `psa:progress` document event for each. Clicks, scrolls, hovers, and audio plays are never tracked.

| Method | Event | Fired when |
|---|---|---|
| `completeLesson(id, meta)` | `lesson_completed` | a lesson's one meaningful action is performed |
| `completeLevel(levelId)` | `level_completed` | a whole level's checks pass |
| `passCheck(levelId, part, value)` | `check_passed` | a mastery-check part passes (also used for teach-back submissions) |
| `recordExam(which, score)` | `exam_passed` | the Foundation (10q) or Reader's/Imperial (20q) exam is completed; the Foundation path mirrors the exam hall to v1 |
| `castChart(isMei)` | `chart_cast` | a study chart is cast (once per chart) |
| `markHall(name)` | — | mirrors a chart-page-equivalent hall flag (wheel/case/drills/timing/exam) into v1 |

Query methods: `hasProgress()` (gates the account CTA), `isLessonDone(id)`, `lessonsDone()`, `rank()`, `rankObj()`, `isLegacyRank()`, `raw()`, `getPref`/`setPref`.

## The six ranks

Court Novice 入門 → Palace Scribe 宮書 → Star Keeper 司星 → Warden of the Forces 司化 → Keeper of the Doors 司門 → Imperial Astrologer 欽天監.

Earned by level mastery: L1 → Novice, L2 → Scribe, L3 → Keeper, L4+L5 → Warden, L6+L7 → Keeper of the Doors, L8 (with the 20-question exam at 18+) → Imperial Astrologer. The Foundation Exam at 9+ confers at least Star Keeper. **Legacy ranks are grandfathered forever as a floor** (`legacyRankGrandfathered`): a rank granted under the old exam is never revoked, so an existing Imperial Astrologer stays one even before completing the new path.

## The Foundation Exam vs the Imperial Exam

- **Foundation Exam** — the chart page's ten questions, rebranded in Wave 3. Caps at Star Keeper (9+). It records through `recordExam("foundation", …)`, which mirrors the exam hall to v1 and floors the displayed rank at any legacy rank ("honored from the first graduating class").
- **Imperial Exam** — the hub Level 8 capstone's twenty questions. Eighteen or better, with all five teach-backs submitted, marks Level 8 complete, which the store resolves to Imperial Astrologer.

## Karma stays dark (ruling D10)

The store emits `psa:progress` so a Karma bridge could later map lesson/level/exam/rank/chart events to `ZodiKarma.award` earn kinds. But those `zwds_*` kinds do not yet exist in the server `zodi_award` allowlist, so **no `ZodiKarma` call is made and no Karma copy appears anywhere**. When the server kinds ship, the bridge can be added without touching lesson code.

## Rules

Learning is never account-gated: accounts save progress, they do not unlock it. "Save this path" appears only after `hasProgress()` is true. No streaks, no urgency, no decay; ranks never expire. Birth data lives only in a cast chart object and only if the learner casts; casting works without saving.
