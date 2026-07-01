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
      <div class="bloom"><div class="rays"></div>
        <div class="cross"><span data-cs></span><b>+</b><span data-ce></span></div>
        <h2 data-name>…</h2><div class="ess" data-ess></div></div>
      <button class="btn cinema-cta" type="button">See my full reading</button>`;
    document.body.appendChild(root);
    cv = root.querySelector(".cv"); ctx = cv.getContext("2d");
    root.querySelector(".skip").addEventListener("click", finishNow);
    root.querySelector(".cinema-cta").addEventListener("click", finishNow);
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
    const cx=cv.width/2, cy=cv.height/2;
    const cols=["#ffd98a","#ffb14a","#d63a28","#e8edff","#aab8ff","#f5ecd2"];
    parts=[];
    for(let i=0;i<170;i++){
      const ang=Math.random()*Math.PI*2, sp=Math.random()*13+3;
      parts.push({x:cx,y:cy,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,
        r:Math.random()*3+1,life:1,c:cols[(Math.random()*cols.length)|0]});
    }
    let ring=0;
    cancelAnimationFrame(raf);
    (function frame(){
      ctx.clearRect(0,0,cv.width,cv.height);
      // shockwave ring
      if(ring<1){ ring+=0.035;
        ctx.beginPath(); ctx.arc(cx,cy,ring*Math.max(cv.width,cv.height)*0.6,0,7);
        ctx.strokeStyle=`rgba(245,236,210,${0.6*(1-ring)})`; ctx.lineWidth=6*(1-ring)+1; ctx.stroke(); }
      let alive=false;
      for(const p of parts){
        if(p.life<=0) continue; alive=true;
        p.vy+=0.12; p.vx*=0.985; p.vy*=0.985; p.x+=p.vx; p.y+=p.vy; p.life-=0.012;
        ctx.globalAlpha=Math.max(0,p.life); ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7);
        ctx.fillStyle=p.c; ctx.fill();
      }
      ctx.globalAlpha=1;
      if(alive||ring<1) raf=requestAnimationFrame(frame); else ctx.clearRect(0,0,cv.width,cv.height);
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

    const east=root.querySelector(".east"), west=root.querySelector(".west"),
          flash=root.querySelector(".flash"), bloom=root.querySelector(".bloom"), cta=root.querySelector(".cinema-cta");
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

  return { run };
})();
