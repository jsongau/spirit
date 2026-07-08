# Reference — the casting engine (`ziwei-caster.js`)

The deterministic Zi Wei Dou Shu chart-construction engine. It takes lunar birth inputs and returns a full chart: the twelve palaces on their branches, the fourteen principal stars placed, the four transformations, the Five Element Bureau, the decade doors, and the Life/Body master stars.

## Why the tables are what they are (provenance)

Doc 04 describes the *method* of construction but not the numeric tables. The curriculum's Needs-Source list flags this: the Zi Wei placement table (S1), the star sequences (S2), the Body Palace formula (S3), the Ming/Shen Zhu tables (S4), and the decade-direction rule (S6) are not in the corpus. Per ruling D14 we do not invent content, but a construction algorithm is deterministic math, not a claim about a person. So the tables here are the standard orthodox algorithm, and their correctness is **established by reproduction**: the engine reproduces the shipped worked chart (Mei) exactly, plus independently hand-checked cases. This is the same standard the master plan asks for.

Gregorian-to-lunar conversion (S9) is out of scope, so the engine casts from lunar inputs. The sample charts are defined by theirs.

## The API

```js
ZiweiData.caster.castChart({
  month,        // lunar month 1–12
  day,          // lunar day 1–30
  hourBranch,   // 0–11 or a branch char ("子".."亥")
  yearStem,     // 0–9 or a stem char ("甲".."癸")
  yearBranch,   // 0–11 or a branch char
  gender,       // "male" | "female"
  bureau        // optional override (number 2–6); else derived
})
```

Returns `{ inputs, lifeBranch, lifeIndex, bodyBranch, bodyIndex, bureau, derivedBureau, bureauMatchesDerived, ziWeiBranch, ziWeiIndex, tianFuBranch, palaces, natalHua, doorDirection, doors, mingZhu, shenZhu }`. Each `palaces[id]` carries `{ branch, branchIndex, branchPinyin, stem, stars: [{id, hua?}], isBody }`.

Also exported: `lifePalaceIndex`, `bodyPalaceIndex`, `ziWeiIndex`, `tianFuIndex`, `bureauFromLifePalace`, `BRANCHES`, `STEMS`, `PALACE_SEQ`, `ZIWEI_GROUP`, `TIANFU_GROUP`.

## The algorithm, step by step

Branch indices: 子0 丑1 寅2 卯3 辰4 巳5 午6 未7 申8 酉9 戌10 亥11.

1. **Life Palace** `= (2 + (month − 1) − hourBranch) mod 12`. Month 1 (正月) sits at 寅 (index 2); count forward to the month, then back by the birth hour (子=0). **Body Palace** is the same but counts the hour forward.
2. **Palace stems** come from the year stem by the Five Tigers rule (五虎遁): the stem of the 寅 month is fixed by the year stem (甲己→丙, 乙庚→戊, 丙辛→庚, 丁壬→壬, 戊癸→甲), and stems increase with the branches from there.
3. **Bureau** is the nayin (納音) five-element of the Life-Palace stem-branch, mapped Water→2, Wood→3, Metal→4, Earth→5, Fire→6. The number is the first decade door's starting age.
4. **Zi Wei** by the 起紫微 method: with `q = ceil(day / bureau)` and `r = q·bureau − day`, start `q` positions from 寅; if `r` is 0 land there, if even advance `r`, if odd retreat `r`.
5. **Tian Fu** `= (4 − ziWeiIndex) mod 12` — Zi Wei reflected across the 寅-申 axis.
6. **The 14 stars** by fixed offsets. North group from Zi Wei: 紫微 0, 天機 −1, 太陽 −3, 武曲 −4, 天同 −5, 廉貞 −8. South group from Tian Fu: 天府 0, 太陰 +1, 貪狼 +2, 巨門 +3, 天相 +4, 天梁 +5, 七殺 +6, 破軍 +10.
7. **Transformations** from the year stem via `stemTableByStem` (orthodox Northern table).
8. **Decade doors**: the first door is the Life Palace, ages `[bureau, bureau+9]`; doors step in the direction set by year-stem polarity and gender (陽男陰女 forward, 陰男陽女 backward).

## Validation

- **Mei (1996), star layout: 0 mismatches.** Cast with her published Fire Bureau and a compatible day, the engine reproduces all twelve palaces' stars and the three principal-star transformations exactly.
- **Rui (1988): 0 mismatches** against the sample data (which was itself produced by the engine).
- **Hand-checked Zi Wei cases:** Water 2 day 1 → 丑, Water 2 day 2 and 3 → 寅, Metal 4 day 10 → 午, Fire 6 day 2 → 午.
- **Stress-test:** 4,320 casts (12 months × 30 days × 12 hours, varied years) with 0 invariant failures. Every chart has twelve distinct palace branches, each of the fourteen stars placed exactly once, Tian Fu on the reflection of Zi Wei, a bureau in {2,3,4,5,6}, and twelve doors.

## The Mei bureau discrepancy (a real finding, logged not patched)

The chart page narrates Mei as a **Fire Bureau** with her first decade door at age 6. A strict cast of her **丙子 (Bing Zi, 1996)** year with the Life Palace in **午** derives a **Metal Bureau** (first door age 4): the Life-Palace stem-branch works out to 甲午, whose nayin is 沙中金, Metal. Her *star layout and transformations are algorithm-consistent and reproduced exactly*; her stated bureau is a chart-page teaching liberty. `castChart` returns both the stated and the derived bureau and a `bureauMatchesDerived: false` flag, and the chart page now carries a transparent note. A full re-cast to Metal 4 (which would also shift her door age ranges from 26–35 to 24–33) is optional future polish.

## How Rui was constructed

Rui is `戊辰` (1988), lunar month 3, day 7, 子 hour, male. That derives an Earth Bureau (first door age 5) with Zi Wei in 子, which places 天府 in the Command Palace — the steward, not the emperor, the intended contrast with Mei. The natal Hua Ji (戊 year) lands on 天機 in the Health palace, and two palaces (Siblings, Children) are empty and borrow. The spec sketched "Hua Ji on 貪狼 in Spouse" and "an empty Wealth palace," neither of which is possible for a real 戊辰 chart with 天府 in 命宮 (戊's Hua Ji is 天機, and Wealth holds 紫微); the engine's true output is used and the deviation is logged. This is why the spec said it fixes the pedagogical contrasts, not the arithmetic.

## What is not here yet

Auxiliary-star placement formulas (S10), the exact Body-Palace and Ming/Shen-Zhu source tables (S3/S4, present as standard tables and flagged), and Gregorian-to-lunar conversion (S9). Casting from a calendar birthday awaits S9.
