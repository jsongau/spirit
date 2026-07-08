/* Engine anchor tests. Run: node test-engine.js
   Anchors verified against at least two independent published sources. */
"use strict";
const A = require("../engine.js");
function fmt(o){return o.y+"-"+String(o.m).padStart(2,"0")+"-"+String(o.d).padStart(2,"0");}
function findLunar(gy,mn,dy,leap){for(let j=A.jdnFromDate(gy,1,1);j<=A.jdnFromDate(gy,12,31);j++){const g=A.dateFromJdn(j),l=A.lunarDate(g.y,g.m,g.d);if(l&&l.leap===!!leap&&l.monthNum===mn&&l.day===dy)return fmt(g);}return "NOT FOUND";}
let pass=0,fail=0;
function eq(name,got,want){const ok=got===want;ok?pass++:fail++;console.log((ok?"PASS":"FAIL")+" "+name+": "+got+(ok?"":" expected "+want));}
eq("CNY 2025",findLunar(2025,1,1),"2025-01-29");
eq("CNY 2026",findLunar(2026,1,1),"2026-02-17");
eq("CNY 2027",findLunar(2027,1,1),"2027-02-06");
eq("Lantern 2026",findLunar(2026,1,15),"2026-03-03");
eq("Dragon Boat 2027",findLunar(2027,5,5),"2027-06-09");
eq("Qixi 2026",findLunar(2026,7,7),"2026-08-19");
eq("Mid-Autumn 2026",findLunar(2026,8,15),"2026-09-25");
eq("Mid-Autumn 2027",findLunar(2027,8,15),"2027-09-15");
eq("Double Ninth 2026",findLunar(2026,9,9),"2026-10-18");
eq("Leap month 6 of 2025 begins",findLunar(2025,6,1,true),"2025-07-25");
const d=A.dayInfo(2026,7,7);
eq("2026-07-07 day pillar",d.ganzhiDay,"壬午");
eq("2026-07-07 na yin",d.nayin.cn,"楊柳木");
eq("2026-07-07 lunar",d.lunar.monthCn+d.lunar.dayCn,"五月廿三");
eq("2026-07-07 term",d.term&&d.term.cn,"小暑");
eq("2026-07-07 officer idx",String(d.officerIdx),"11");
eq("Qingming 2026 boundary",A.dayInfo(2026,4,5).term&&A.dayInfo(2026,4,5).term.cn,"清明");
eq("Dongzhi 2026",A.dayInfo(2026,12,22).term&&A.dayInfo(2026,12,22).term.cn,"冬至");
eq("Li Chun boundary: 1996-01-20 animal",A.dayInfo(1996,1,20).yearAnimal,"Pig");
eq("Li Chun boundary: 1996-02-19 animal",A.dayInfo(1996,2,19).yearAnimal,"Rat");
eq("Leap year Feb 29 valid",A.dayInfo(2024,2,29).ganzhiDay.length===2?"ok":"bad","ok");
console.log(pass+" passed, "+fail+" failed");
process.exitCode=fail?1:0;
