/* ============================================================
   THE PRIMAL ORACLE — share-image cards
   Draws a luxury 1080x1350 card to canvas and lets the visitor
   download it or share the image file directly.
   window.PCARD.downloadAnimal(c) / shareAnimal(c)
   window.PCARD.downloadMatch(a,b,m) / shareMatch(a,b,m)
   ============================================================ */

window.PCARD = (function () {
  "use strict";
  const W = 1080, H = 1350;
  const C = { bg1:"#0a0b14", bg2:"#15172b", brass:"#d6c18c", brassB:"#efe2b4",
              moon:"#f5ecd2", ivory:"#ece7d8", muted:"#9a9bb0", east:"#ffd98a",
              eastBg:"#5a1512", west:"#e8edff", westBg:"#161e46", twin:"#7fe0c8", rose:"#c98aa6" };

  function ctxOf(){ const cv=document.createElement("canvas"); cv.width=W; cv.height=H; return { cv, x:cv.getContext("2d") }; }

  async function fonts(){
    try{ await Promise.all([
      document.fonts.load('600 140px "Cormorant Garamond"'),
      document.fonts.load('500 40px "Inter"'),
      document.fonts.ready ]); }catch(e){}
  }
  const serif = (w,s)=>`${w} ${s}px "Cormorant Garamond", Georgia, serif`;
  const sans  = (w,s)=>`${w} ${s}px "Inter", system-ui, sans-serif`;

  function bg(x){
    const g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,C.bg1); g.addColorStop(1,C.bg2);
    x.fillStyle=g; x.fillRect(0,0,W,H);
    // stars
    for(let i=0;i<160;i++){ const sx=Math.random()*W, sy=Math.random()*H, r=Math.random()*1.6+0.2;
      x.globalAlpha=Math.random()*0.7+0.15; x.beginPath(); x.arc(sx,sy,r,0,7); x.fillStyle=C.moon; x.fill(); }
    x.globalAlpha=1;
    // frame
    x.strokeStyle="rgba(214,193,140,.55)"; x.lineWidth=2; round(x,40,40,W-80,H-80,22); x.stroke();
    x.strokeStyle="rgba(214,193,140,.18)"; x.lineWidth=1; round(x,54,54,W-108,H-108,16); x.stroke();
  }
  function round(x,rx,ry,w,h,r){ x.beginPath(); x.moveTo(rx+r,ry);
    x.arcTo(rx+w,ry,rx+w,ry+h,r); x.arcTo(rx+w,ry+h,rx,ry+h,r); x.arcTo(rx,ry+h,rx,ry,r); x.arcTo(rx,ry,rx+w,ry,r); x.closePath(); }
  function eyebrow(x,txt,y){ x.fillStyle=C.brass; x.font=sans(600,24); x.textAlign="center";
    x.save(); x.translate(W/2,y); drawSpaced(x,txt.toUpperCase(),12); x.restore(); }
  function drawSpaced(x,txt,sp){ const ws=txt.split("").map(ch=>x.measureText(ch).width+sp);
    const total=ws.reduce((a,b)=>a+b,0)-sp; let cx=-total/2; x.textAlign="left";
    for(let i=0;i<txt.length;i++){ x.fillText(txt[i],cx,0); cx+=ws[i]; } x.textAlign="center"; }
  function fit(x,txt,max,weight,start){ let s=start; do{ x.font=serif(weight,s); if(x.measureText(txt).width<=max) break; s-=6; }while(s>50); return s; }
  function wrap(x,txt,max){ const w=txt.split(" "); const lines=[]; let ln="";
    for(const word of w){ const t=ln?ln+" "+word:word; if(x.measureText(t).width>max&&ln){ lines.push(ln); ln=word; } else ln=t; }
    if(ln)lines.push(ln); return lines; }

  function medallion(x,cx,cy,r,bgc,ring,glyph,size,gcol){
    const g=x.createRadialGradient(cx,cy-r*0.2,r*0.2,cx,cy,r);
    g.addColorStop(0,bgc); g.addColorStop(1,"#0a0b14"); x.fillStyle=g;
    x.beginPath(); x.arc(cx,cy,r,0,7); x.fill();
    x.strokeStyle=ring; x.lineWidth=2; x.beginPath(); x.arc(cx,cy,r,0,7); x.stroke();
    x.fillStyle=gcol; x.font=serif(600,size); x.textAlign="center"; x.textBaseline="middle";
    x.fillText(glyph,cx,cy+2); x.textBaseline="alphabetic";
  }
  function moonDisc(x,cx,cy,r,frac){
    x.save(); x.beginPath(); x.arc(cx,cy,r,0,7); x.fillStyle="#0c0e1a"; x.fill();
    const k=(1-Math.cos(2*Math.PI*frac))/2; const waxing=frac<0.5;
    x.beginPath(); x.arc(cx,cy,r,0,7); x.clip();
    x.fillStyle="#f3ead0";
    // lit portion via two arcs
    x.beginPath();
    x.arc(cx,cy,r,-Math.PI/2,Math.PI/2,!waxing);
    const rx=(1-2*k)* r;
    x.ellipse(cx,cy,Math.abs(rx),r,0,Math.PI/2,-Math.PI/2,(rx>0)===waxing);
    x.fill();
    x.restore();
    x.strokeStyle="rgba(245,236,210,.4)"; x.lineWidth=1.5; x.beginPath(); x.arc(cx,cy,r,0,7); x.stroke();
  }

  async function drawAnimal(c){
    await fonts(); const { cv, x } = ctxOf(); bg(x);
    const E = window.ENGINE;
    const ess = E ? E.essence(c.sign,c.animal,c.primal) : "";
    const mp = E ? E.moonPhase() : null;

    eyebrow(x,"The Primal Oracle",150);

    // medallions
    medallion(x, W/2-150, 320, 96, C.eastBg, "rgba(240,180,106,.65)", c.cn||"", 96, C.east);
    medallion(x, W/2+150, 320, 96, C.westBg, "rgba(170,184,255,.6)", c.glyph||"", 92, C.west);
    x.fillStyle=C.muted; x.font=sans(600,20); x.textAlign="center";
    x.fillText((c.element?c.element+" ":"")+c.animal, W/2-150, 452);
    x.fillText(c.sign+" Sun", W/2+150, 452);

    // name
    const size=fit(x,c.primal,W-200,600,150);
    x.fillStyle=C.moon; x.font=serif(600,size); x.textAlign="center"; x.fillText(c.primal, W/2, 650);

    // essence
    x.fillStyle=C.brassB; x.font=`italic 500 40px "Cormorant Garamond", Georgia, serif`;
    wrap(x,ess,W-260).slice(0,3).forEach((ln,i)=>x.fillText(ln, W/2, 730+i*52));

    // moon
    if(mp){
      moonDisc(x, W/2, 1000, 60, mp.frac);
      x.fillStyle=C.moon; x.font=serif(600,44); x.fillText(mp.name, W/2, 1110);
      x.fillStyle=C.muted; x.font=sans(400,26);
      wrap(x,"A good night to "+mp.advice+".",W-320).forEach((ln,i)=>x.fillText(ln,W/2,1150+i*36));
    }

    // footer
    x.fillStyle=C.brass; x.font=sans(600,26); x.fillText("Find your Primal Animal", W/2, 1258);
    x.fillStyle=C.muted; x.font=sans(400,22); x.fillText("ZodiAnimal.com", W/2, 1292);
    return cv;
  }

  async function drawMatch(a,b,m){
    await fonts(); const { cv, x } = ctxOf(); bg(x);
    const tierCol = { "Deep Recognition":C.twin, "Strong":C.brassB, "Workable":C.ivory, "Friction":C.rose, "Hard Teacher":"#c97f7f" }[m.tier]||C.brassB;
    eyebrow(x,"The Primal Oracle",150);
    x.fillStyle=C.muted; x.font=sans(600,26); x.textAlign="center"; drawWith(x,"A match reading",250);

    // two animals
    function one(name,sub,cy){ const s=fit(x,name,W-260,600,116); x.fillStyle=C.moon; x.font=serif(600,s); x.fillText(name,W/2,cy);
      x.fillStyle=C.muted; x.font=sans(500,26); x.fillText(sub,W/2,cy+52); }
    one(a.primal, a.sign+" "+a.animal, 430);
    x.fillStyle=C.brass; x.font=serif(600,64); x.fillText("&", W/2, 560);
    one(b.primal, b.sign+" "+b.animal, 700);

    // tier badge
    x.fillStyle=tierCol; x.font=serif(600,96); x.fillText(m.tier, W/2, 920);
    x.fillStyle=C.muted; x.font=sans(500,34); x.fillText(m.score+" of 18", W/2, 985);

    // top note
    if(m.notes&&m.notes[0]){ x.fillStyle=C.brassB; x.font=`italic 500 36px "Cormorant Garamond", Georgia, serif`;
      wrap(x,m.notes[0]+".",W-300).slice(0,2).forEach((ln,i)=>x.fillText(ln,W/2,1090+i*48)); }

    x.fillStyle=C.brass; x.font=sans(600,26); x.fillText("Test your match", W/2, 1258);
    x.fillStyle=C.muted; x.font=sans(400,22); x.fillText("ZodiAnimal.com", W/2, 1292);
    return cv;
  }
  function drawWith(x,txt,y){ x.fillText(txt,W/2,y); }

  function toBlob(cv){ return new Promise(res=>cv.toBlob(res,"image/png")); }
  function save(cv,name){ cv.toBlob(b=>{ const u=URL.createObjectURL(b); const a=document.createElement("a");
    a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),1000); },"image/png"); }
  async function share(cv,name,text){
    try{ const blob=await toBlob(cv); const file=new File([blob],name,{type:"image/png"});
      if(navigator.canShare&&navigator.canShare({files:[file]})){ await navigator.share({files:[file],text}); return true; } }catch(e){}
    save(cv,name); return false;
  }
  const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-");

  return {
    async downloadAnimal(c){ const cv=await drawAnimal(c); save(cv,"primal-"+slug(c.primal)+".png"); },
    async shareAnimal(c){ const cv=await drawAnimal(c); return share(cv,"primal-"+slug(c.primal)+".png","My Primal Animal is the "+c.primal+". Find yours at ZodiAnimal.com."); },
    async downloadMatch(a,b,m){ const cv=await drawMatch(a,b,m); save(cv,"match-"+slug(a.primal)+"-"+slug(b.primal)+".png"); },
    async shareMatch(a,b,m){ const cv=await drawMatch(a,b,m); return share(cv,"match-"+slug(a.primal)+"-"+slug(b.primal)+".png","We are a "+m.tier+" match on the Primal Oracle."); },
    _drawAnimal:drawAnimal, _drawMatch:drawMatch
  };
})();
