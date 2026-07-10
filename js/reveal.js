/* ============================================================
   THE PRIMAL ORACLE — cinematic reveal driver
   window.CINEMA.run(computeResult, onDone)
   Builds its own overlay so any page can trigger it.
   ============================================================ */

window.CINEMA = (function () {
  "use strict";
  let soundOn = true, actx = null, built = false, root, cv, ctx, parts = [], raf = null;

  function build() {
    if (built) return;
    root = document.createElement("div");
    root.id = "cinema";
    root.innerHTML = `
      <canvas class="cv"></canvas>
      <button class="sound-toggle" type="button">Sound on</button>
      <button class="skip" type="button">Skip</button>
      <section class="half east"><p class="ph">Eastern sky</p>
        <div class="mark" data-cn>蛇</div><div class="nm" data-en>Snake</div><div class="sub" data-el>Year animal</div></section>
      <section class="half west"><p class="ph">Western sky</p>
        <div class="mark" data-glyph>♋</div><div class="nm" data-sign>Cancer</div><div class="sub">Sun sign</div></section>
      <div class="flash"></div>
      <div class="cinema-stage">
        <div class="bloom"><div class="rays"></div>
          <div class="cross"><span data-cs></span><b>+</b><span data-ce></span></div>
          <h2 data-name>…</h2><div class="ess" data-ess></div></div>
        <div class="cinema-actions">
          <button class="cinema-btn cinema-btn--primary cinema-cta" type="button">See my full reading</button>
          <div class="cinema-btnrow">
            <button class="cinema-btn cinema-btn--ghost cinema-share" type="button">Share with a friend</button>
            <button class="cinema-btn cinema-btn--ghost cinema-home" type="button">Back to home</button>
          </div>
          <p class="cinema-toast" data-toast role="status" aria-live="polite"></p>
        </div>
      </div>`;
    document.body.appendChild(root);
    cv = root.querySelector(".cv"); ctx = cv.getContext("2d");
    root.querySelector(".skip").addEventListener("click", finishNow);
    root.querySelector(".cinema-cta").addEventListener("click", seeFullReading);
    root.querySelector(".cinema-share").addEventListener("click", doShare);
    root.querySelector(".cinema-home").addEventListener("click", goHome);
    const st = root.querySelector(".sound-toggle");
    st.addEventListener("click", ()=>{ soundOn = !soundOn; st.textContent = soundOn ? "Sound on" : "Sound off"; });
    built = true;
  }

  function size(){ cv.width = innerWidth; cv.height = innerHeight; }

  /* ---- audio (synth, created on user gesture) ---- */
  function audio(){ if (!actx) { try { actx = new (window.AudioContext||window.webkitAudioContext)(); } catch(e){ actx=null; } } return actx; }
  function chime(delay=0){
    const a = audio(); if (!a || !soundOn) return;
    [0,4,7,12].forEach((semi,i)=>{
      const o=a.createOscillator(), g=a.createGain(), t=a.currentTime+delay+i*0.12;
      o.type="sine"; o.frequency.value=261.6*Math.pow(2,semi/12);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.13,t+0.02); g.gain.exponentialRampToValueAtTime(0.001,t+0.9);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t+1);
    });
  }
  function boom(){
    const a = audio(); if (!a || !soundOn) return;
    const t=a.currentTime;
    // low sine drop
    const o=a.createOscillator(), g=a.createGain();
    o.type="sine"; o.frequency.setValueAtTime(180,t); o.frequency.exponentialRampToValueAtTime(34,t+0.7);
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.5,t+0.02); g.gain.exponentialRampToValueAtTime(0.001,t+1.1);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t+1.2);
    // noise crack
    const n=a.createBuffer(1,a.sampleRate*0.5,a.sampleRate), ch=n.getChannelData(0);
    for(let i=0;i<ch.length;i++) ch[i]=(Math.random()*2-1)*Math.pow(1-i/ch.length,2);
    const src=a.createBufferSource(); src.buffer=n;
    const f=a.createBiquadFilter(); f.type="lowpass"; f.frequency.value=1100;
    const ng=a.createGain(); ng.gain.setValueAtTime(0.5,t); ng.gain.exponentialRampToValueAtTime(0.001,t+0.5);
    src.connect(f); f.connect(ng); ng.connect(a.destination); src.start(t);
  }
  function shimmer(delay){
    const a=audio(); if(!a||!soundOn) return;
    const o=a.createOscillator(), g=a.createGain(), t=a.currentTime+delay;
    o.type="triangle"; o.frequency.setValueAtTime(880,t); o.frequency.exponentialRampToValueAtTime(2200,t+0.6);
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.08,t+0.05); g.gain.exponentialRampToValueAtTime(0.001,t+0.8);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t+0.9);
  }

  /* ---- particles ---- */
  function burst(){
    const W=cv.width, H=cv.height, cx=W/2, cy=H/2;
    const cols=["#ffd98a","#ffb14a","#d63a28","#e8edff","#aab8ff","#f5ecd2","#8fce9b"];
    const pick=()=>cols[(Math.random()*cols.length)|0];
    parts=[];
    // 1) radial pop from the center (the original burst)
    for(let i=0;i<150;i++){ const ang=Math.random()*Math.PI*2, sp=Math.random()*13+3;
      parts.push({t:"dot",x:cx,y:cy,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,r:Math.random()*3+1,life:1,dl:0.013,c:pick()}); }
    // 2) confetti ribbons raining from above, swaying + tumbling
    for(let i=0;i<140;i++){ parts.push({t:"rib",x:Math.random()*W,y:-20-Math.random()*H*0.5,
      vx:(Math.random()-0.5)*1.8,vy:Math.random()*3+2.2,rot:Math.random()*6.28,vr:(Math.random()-0.5)*0.32,
      w:Math.random()*5+4,h:Math.random()*9+6,life:1,dl:0.004,c:pick()}); }
    // 3) sparkles: four-point stars twinkling around the name
    for(let i=0;i<36;i++){ parts.push({t:"spk",x:cx+(Math.random()-0.5)*W*0.72,y:cy+(Math.random()-0.5)*H*0.5,
      vy:-(Math.random()*0.4+0.1),ph:Math.random()*6.28,sp:Math.random()*0.16+0.06,sz:Math.random()*2+1.6,life:1,dl:0.006,c:"#fff8e6"}); }
    let ring=0;
    cancelAnimationFrame(raf);
    (function frame(){
      ctx.clearRect(0,0,W,H);
      if(ring<1){ ring+=0.03;
        ctx.beginPath(); ctx.arc(cx,cy,ring*Math.max(W,H)*0.6,0,7);
        ctx.strokeStyle=`rgba(245,236,210,${0.6*(1-ring)})`; ctx.lineWidth=6*(1-ring)+1; ctx.stroke(); }
      let alive=false;
      for(const p of parts){
        if(p.life<=0) continue; alive=true; p.life-=p.dl;
        if(p.t==="dot"){ p.vy+=0.12; p.vx*=0.985; p.vy*=0.985; p.x+=p.vx; p.y+=p.vy;
          ctx.globalAlpha=Math.max(0,p.life); ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fillStyle=p.c; ctx.fill(); }
        else if(p.t==="rib"){ p.x+=p.vx+Math.sin(p.y*0.02)*0.7; p.y+=p.vy; p.rot+=p.vr; if(p.y>H+30) p.life=0;
          ctx.save(); ctx.globalAlpha=Math.max(0,Math.min(1,p.life*1.5)); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
          ctx.fillStyle=p.c; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); }
        else { p.ph+=p.sp; p.y+=p.vy; const tw=(Math.sin(p.ph)+1)/2, s=p.sz*(0.55+0.9*tw);
          ctx.globalAlpha=Math.max(0,p.life)*(0.25+0.75*tw); ctx.fillStyle=p.c; ctx.beginPath();
          ctx.moveTo(p.x,p.y-s*2.2); ctx.lineTo(p.x+s*0.5,p.y-s*0.5); ctx.lineTo(p.x+s*2.2,p.y);
          ctx.lineTo(p.x+s*0.5,p.y+s*0.5); ctx.lineTo(p.x,p.y+s*2.2); ctx.lineTo(p.x-s*0.5,p.y+s*0.5);
          ctx.lineTo(p.x-s*2.2,p.y); ctx.lineTo(p.x-s*0.5,p.y-s*0.5); ctx.closePath(); ctx.fill(); }
      }
      ctx.globalAlpha=1;
      if(alive||ring<1) raf=requestAnimationFrame(frame); else ctx.clearRect(0,0,W,H);
    })();
  }

  let timers=[], doneCb=null, current=null;
  function clearTimers(){ timers.forEach(clearTimeout); timers=[]; }
  function at(ms,fn){ timers.push(setTimeout(fn,ms)); }

  function run(c, onDone){
    build(); size(); addEventListener("resize",size);
    current=c; doneCb=onDone;
    // fill content
    root.querySelector("[data-cn]").textContent=c.cn;
    root.querySelector("[data-en]").textContent=c.animal;
    root.querySelector("[data-el]").textContent=(c.element?c.element+" ":"")+"Year animal";
    root.querySelector("[data-glyph]").textContent=c.glyph;
    root.querySelector("[data-sign]").textContent=c.sign;
    root.querySelector("[data-cs]").textContent=c.sign;
    root.querySelector("[data-ce]").textContent=(c.element?c.element+" ":"")+c.animal;
    root.querySelector("[data-name]").textContent=c.primal;
    const ess = (window.ENGINE? ENGINE.essence(c.sign,c.animal,c.primal):"");
    root.querySelector("[data-ess]").textContent=ess;
    const tt = root.querySelector("[data-toast]"); if(tt){ tt.textContent=""; }

    const east=root.querySelector(".east"), west=root.querySelector(".west"),
          flash=root.querySelector(".flash"), bloom=root.querySelector(".bloom"), cta=root.querySelector(".cinema-actions");
    [east,west].forEach(e=>e.className=e.className.replace(/ (in|rush)/g,""));
    bloom.classList.remove("go"); flash.classList.remove("go"); cta.classList.remove("go");
    east.style.opacity=west.style.opacity="0";

    root.classList.add("on");
    document.body.style.overflow="hidden";
    audio();

    // sequence
    clearTimers();
    at(60,  ()=>{ east.classList.add("in"); chime(0); });
    at(950, ()=>{ west.classList.add("in"); chime(0.0); });
    at(2100,()=>{ shimmer(0); });
    at(2150,()=>{ east.classList.add("rush"); west.classList.add("rush"); });
    at(2600,()=>{ flash.classList.add("go"); boom(); burst(); });
    at(2780,()=>{ bloom.classList.add("go"); });
    at(3700,()=>{ cta.classList.add("go"); });
  }

  function finishNow(){
    clearTimers(); cancelAnimationFrame(raf);
    root.classList.remove("on"); document.body.style.overflow="";
    if(ctx) ctx.clearRect(0,0,cv.width,cv.height);
    if(doneCb){ const cb=doneCb; doneCb=null; cb(current); }
  }

  function slugify(s){ return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }
  /* "See my full reading" now goes to the animal's own page (the full reading),
     not back to the homepage observatory. Uses the passed slug, falling back to
     a slug built from the animal name. */
  function seeFullReading(){
    const slug = (current && current.slug) ? current.slug : (current ? slugify(current.primal) : "");
    if(slug){ clearTimers(); cancelAnimationFrame(raf); document.body.style.overflow=""; location.href = "/animals/" + slug + "/"; return; }
    finishNow();
  }

  /* ---- share / home actions on the reveal end-state ---- */
  function shareLine(c){
    if(!c) return "";
    return "My Zodi Animal is the " + c.primal + ". " + c.sign +
           " crossed with " + (c.element?c.element+" ":"") + c.animal +
           ". What's yours? ZodiAnimal.com";
  }
  function toast(msg){
    const t = root && root.querySelector("[data-toast]"); if(!t) return;
    t.textContent = msg;                 // persistent live region — text set while in a11y tree
    clearTimeout(toast._t); toast._t = setTimeout(()=>{ t.textContent = ""; }, 3400);
  }
  function doShare(){
    const text = shareLine(current);
    if(navigator.share){
      navigator.share({ title:"Zodi Animal", text:text }).catch(()=>{});
    } else if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(()=>toast("Link copied — send it to a friend.")).catch(()=>toast("Couldn't copy. Try again."));
    } else {
      toast("Sharing isn't available on this browser.");
    }
  }
  function goHome(){
    finishNow();
    const p = location.pathname;
    if(p==="/"||/\/index\.html$/.test(p)){
      try{ window.scrollTo({top:0,behavior:"smooth"}); }catch(e){ window.scrollTo(0,0); }
    } else {
      location.href = "/";
    }
  }

  return { run };
})();
