/* ============================================================
   THE PRIMAL ORACLE — home page logic
   Uses window.ENGINE (engine.js) and window.CINEMA (reveal.js).
   Owns the Third Eye, result render, share, email, starfield.
   ============================================================ */

(function () {
  "use strict";
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ---------- THE THIRD EYE — awakening + retention ---------- */
  const KEY = "primal_oracle_v1";
  function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } }
  function save(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }

  const RITES = [
    { id:"revealed", label:"Name your animal",       pts:20 },
    { id:"read",     label:"Read your five gates",   pts:20 },
    { id:"stones",   label:"Receive your stones",    pts:15 },
    { id:"match",    label:"Test a match",           pts:20 },
    { id:"shared",   label:"Pass the Oracle onward", pts:15 },
    { id:"returned", label:"Return on a new day",    pts:10 }
  ];
  const LEVELS = [
    [0,"Sleeper","The eye is closed. The animal is still a rumor."],
    [25,"Stirring","The eye flickers. You have met your animal."],
    [50,"Seeing","The eye half-opens. The pattern starts to rhyme."],
    [75,"Awakened","The eye is open. You read yourself from the outside."],
    [100,"All-Seeing","The eye is full. Every sky agrees on you."]
  ];
  let state = load(); state.rites = state.rites || {};

  function awaken(id){
    if (!state.rites[id]) { const r = RITES.find(x=>x.id===id); if (r){ state.rites[id]=true; save(state); pulse(r.label,"+"+r.pts); } }
    renderEye();
  }
  function openness(){ let p=0; RITES.forEach(r=>{ if(state.rites[r.id]) p+=r.pts; }); return Math.min(100,p); }
  function levelOf(p){ let cur=LEVELS[0]; for (const L of LEVELS) if (p>=L[0]) cur=L; return cur; }

  function checkReturn(){
    const today = new Date().toDateString();
    if (state.lastVisit && state.lastVisit !== today){
      const diff=(new Date(today)-new Date(state.lastVisit))/86400000;
      state.streak=(diff<=2)?(state.streak||1)+1:1; awaken("returned");
    } else if (!state.lastVisit){ state.streak=1; }
    state.lastVisit=today; save(state);
  }
  function renderEye(){
    const p=openness(), L=levelOf(p);
    const lid=$("#eyeLid"), label=$("#eyeLabel"), bar=$("#eyeBar"), desc=$("#eyeDesc"), streak=$("#streak");
    if(lid) lid.style.transform=`scaleY(${1-p/100})`;
    if(bar) bar.style.width=p+"%";
    if(label) label.textContent=L[1]+" · "+p+"%";
    if(desc) desc.textContent=L[2];
    if(streak) streak.textContent=(state.streak||1)+(state.streak===1?" day":" days");
    $$(".rite").forEach(el=>el.classList.toggle("done",!!state.rites[el.dataset.rite]));
  }
  function pulse(title,sub){
    const t=$("#toast"); if(!t) return;
    t.innerHTML=`<strong>${title}</strong><span>${sub}</span>`; t.classList.add("show");
    clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2600);
  }

  /* ---------- RENDER RESULT ---------- */
  let last=null;
  function renderResult(c){
    last=c;
    // save the profile locally so the whole site personalizes from the first reveal
    try{ const v=$("#birthDate").value; if(v){ state.birth=v; } }catch(e){}
    // record recently opened animals (this visitor's own history, local only)
    try{
      const sg=c.primal.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
      state.recent=(state.recent||[]).filter(r=>r.primal!==c.primal);
      state.recent.unshift({primal:c.primal,slug:sg});
      state.recent=state.recent.slice(0,5); save(state); renderRecent(); renderToday();
    }catch(e){}
    // viral challenge link + gamified discovery
    const shareSlug=c.primal.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    try{ const cb=$("#challengeBtn"); if(cb) cb.href="vs.html?with="+shareSlug; }catch(e){}
    try{ if(window.GAME){ GAME.discovered(shareSlug,c.primal); GAME.celebrate({text:"You met the "+c.primal}); } }catch(e){}
    const r=ENGINE.reading(c), mp=ENGINE.moonPhase();
    $("#animalName").textContent=c.primal;
    $("#animalEssence").textContent=r.essence;
    $("#cross").innerHTML=`<span>${c.sign}</span><i>Sun</i><b>+</b><span>${c.element} ${c.animal}</span><i>Year</i>`;
    const g=$("#gates"); g.innerHTML="";
    r.gates.forEach((x,i)=>{ const a=document.createElement("article"); a.className="gate"; a.style.animationDelay=(0.08*i)+"s";
      a.innerHTML=`<h4>${x.t}</h4><p>${x.b}</p>`; g.appendChild(a); });
    $("#stones").innerHTML=r.stones.map(s=>`<li>${s}</li>`).join("");
    $("#moonNow").innerHTML=`Tonight the Moon is a <strong>${mp.name}</strong> (${mp.age} days into its cycle). A good night to ${mp.advice}.`;
    $("#shareLine").value=`My Primal Animal is the ${c.primal} (${c.sign} + ${c.element} ${c.animal}). Find yours at the Primal Oracle.`;
    $("#animalLink").href="animals/"+c.primal.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")+"/";
    awaken("revealed");
    $("#resultWrap").classList.add("show");
    $("#resultWrap").scrollIntoView({behavior:"smooth",block:"start"});
  }

  /* ---------- WIRE ---------- */
  function renderToday(){
    const strip=$("#todayStrip"); if(!strip||!window.ENGINE) return;
    const mp=ENGINE.moonPhase();
    if(state.birth){
      const c=ENGINE.compute(state.birth); if(!c){ strip.hidden=true; return; }
      const e=ORACLE.EAST[c.animal], da=ENGINE.dayAnimal(new Date());
      const fav=e.trine.indexOf(da)>=0||e.secret===da, cau=e.clash===da||e.harm===da;
      const quality=fav?"a favorable day":cau?"a day to move gently":"a steady day";
      $("#todayLead").textContent="You are the "+c.primal+". Today is "+quality+".";
      $("#todaySub").innerHTML="Day of the "+da+". Tonight the Moon is a "+mp.name+", a good night to "+mp.advice+".";
      $("#todayCta").hidden=false;
    } else {
      $("#todayLead").textContent="Tonight the Moon is a "+mp.name+".";
      $("#todaySub").textContent="A good night to "+mp.advice+". Find your animal to make today personal.";
      $("#todayCta").hidden=true;
    }
    strip.hidden=false;
  }

  function renderRecent(){
    const el=$("#recentOpened"); if(!el) return;
    if(!state.recent||!state.recent.length){ el.textContent=""; return; }
    el.innerHTML="You recently opened: "+state.recent.map(r=>'<a href="animals/'+r.slug+'/">'+r.primal+'</a>').join(", ");
  }

  function init(){
    checkReturn(); renderEye(); renderRecent(); renderToday();

    const form=$("#birthForm");
    if(form) form.addEventListener("submit",(e)=>{
      e.preventDefault();
      const c=ENGINE.compute($("#birthDate").value), msg=$("#formMsg");
      if(!c){ msg.textContent="Please enter your date of birth to read the wheel."; return; }
      msg.textContent="";
      if(window.CINEMA){ CINEMA.run(c, renderResult); } else { renderResult(c); }
    });

    const gatesEl=$("#gates");
    if(gatesEl){ const o=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ awaken("read"); o.disconnect(); }}),{threshold:0.4}); o.observe(gatesEl); }
    const stonesEl=$("#stonesSection");
    if(stonesEl){ const o2=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting&&last){ awaken("stones"); o2.disconnect(); }}),{threshold:0.5}); o2.observe(stonesEl); }

    const matchForm=$("#matchForm");
    if(matchForm) matchForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      const a=ENGINE.compute($("#mDateA").value), b=ENGINE.compute($("#mDateB").value), out=$("#matchResult");
      if(!a||!b){ out.innerHTML=`<p class="hint">Enter two dates of birth to test the match.</p>`; return; }
      const m=ENGINE.compatibility(a,b);
      out.innerHTML=`<div class="matchHead">
          <div class="pair">${a.primal}<small>${a.sign} ${a.animal}</small></div>
          <div class="amp">&amp;</div>
          <div class="pair">${b.primal}<small>${b.sign} ${b.animal}</small></div></div>
        <div class="tierBadge tier-${m.tier.replace(/\s/g,'')}">${m.tier} · ${m.score}/18</div>
        <ul class="matchNotes">${m.notes.map(n=>`<li>${n}</li>`).join("")}</ul>`;
      out.classList.add("show"); awaken("match");
    });

    const shareBtn=$("#shareBtn");
    if(shareBtn) shareBtn.addEventListener("click",async()=>{
      const text=$("#shareLine").value;
      try{ if(navigator.share){ await navigator.share({title:"The Primal Oracle",text}); } else { await navigator.clipboard.writeText(text); pulse("Copied to clipboard","share it with a friend"); } awaken("shared"); }catch(e){}
    });
    const copyBtn=$("#copyBtn");
    if(copyBtn) copyBtn.addEventListener("click",async()=>{ try{ await navigator.clipboard.writeText($("#shareLine").value); pulse("Copied to clipboard","send it to someone you wonder about"); awaken("shared"); }catch(e){} });

    const cardBtn=$("#cardBtn");
    if(cardBtn) cardBtn.addEventListener("click",async()=>{
      if(!last||!window.PCARD) return;
      cardBtn.textContent="Drawing your card"; cardBtn.disabled=true;
      try{ await PCARD.shareAnimal(last); pulse("Your card is ready","save it or send it on"); awaken("shared"); }catch(e){}
      cardBtn.textContent="Download my card"; cardBtn.disabled=false;
    });

    const mailForm=$("#mailForm");
    if(mailForm) mailForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      const email=$("#email").value.trim();
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ $("#mailMsg").textContent="Enter a valid email to receive your moon notes."; return; }
      state.email=email; save(state);
      $("#mailMsg").textContent="Saved on this device. Moon Notes are not live yet, so nothing is sent until the mailing is connected.";
      mailForm.reset(); pulse("You are on the waitlist","nothing is sent yet");
    });

    $$(".rite").forEach(el=>el.addEventListener("click",()=>{
      const map={revealed:"#read",read:"#resultWrap",stones:"#stonesSection",match:"#matchSection",shared:"#shareSection",returned:"#read"};
      const t=$(map[el.dataset.rite]); if(t) t.scrollIntoView({behavior:"smooth"});
    }));

    runStars();
  }

  /* ---------- STARFIELD ---------- */
  function runStars(){
    const cv=$("#sky"); if(!cv) return; const ctx=cv.getContext("2d");
    function size(){ cv.width=innerWidth; cv.height=Math.max(innerHeight,document.body.scrollHeight); }
    size(); addEventListener("resize",size);
    const N=Math.min(180,Math.floor(innerWidth/8));
    const stars=Array.from({length:N},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+0.2,a:Math.random(),s:Math.random()*0.02+0.004}));
    (function frame(){ ctx.clearRect(0,0,cv.width,cv.height);
      for(const st of stars){ st.a+=st.s; const al=0.35+Math.abs(Math.sin(st.a))*0.55;
        ctx.beginPath(); ctx.arc(st.x,st.y,st.r,0,7); ctx.fillStyle=`rgba(245,236,210,${al})`; ctx.fill(); }
      requestAnimationFrame(frame); })();
  }

  document.addEventListener("DOMContentLoaded",init);
})();
