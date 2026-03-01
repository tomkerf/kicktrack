import { useState, useEffect, useRef } from "react";

const LOGO = "data:image/png;base64,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";

const C = { navy:"#1a3a5c", blue:"#2563eb", blueL:"#3b82f6", blueP:"#1e3a5f", red:"#dc2626", w:"#1e293b", g50:"#0f172a", g100:"#1e293b", g200:"#334155", g300:"#475569", g400:"#94a3b8", g500:"#94a3b8", g700:"#cbd5e1", g900:"#f1f5f9" };

const store = {
  async get(k) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch { return null; } },
  async set(k, v) { try { await window.storage.set(k, JSON.stringify(v)); } catch(e) { console.error(e); } },
};
const today = () => new Date().toISOString().split("T")[0];
const fmtDate = d => new Date(d+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"short"});
const daysSince = d => Math.floor((Date.now()-new Date(d+"T12:00:00").getTime())/864e5);
const uid = () => Math.random().toString(36).slice(2,10);

const moods = [
  {d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M8 15s1.5-2 4-2 4 2 4 2","M8 8l2 1.5M16 8l-2 1.5","M9 10h.01","M15 10h.01"],l:"Frustré",v:1},
  {d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M9 14s1-1 3-1 3 1 3 1","M9 9h.01","M15 9h.01"],l:"Moyen",v:2},
  {d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M9 13h6","M9 9h.01","M15 9h.01"],l:"Neutre",v:3},
  {d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M8 13s1.5 3 4 3 4-3 4-3","M9 9h.01","M15 9h.01"],l:"Bien",v:4},
  {d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M7 13s2 4 5 4 5-4 5-4","M8 8h.01","M16 8h.01"],l:"En feu!",v:5},
];
const tTypes = [
  {id:"match",d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M8 12l2.5 2.5L16 9"],l:"Match"},
  {id:"collectif",d:["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M9 11a4 4 0 100-8 4 4 0 000 8z","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75"],l:"Collectif"},
  {id:"individuel",d:["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 11a4 4 0 100-8 4 4 0 000 8z"],l:"Individuel"},
  {id:"physique",d:"M22 12h-4l-3 9L9 3l-3 9H2",l:"Physique"},
  {id:"technique",d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M12 16a4 4 0 110-8 4 4 0 010 8z","M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0"],l:"Technique"},
  {id:"couloir",d:["M6 3v18","M18 3v18","M10 7l-4 5 4 5","M14 7l4 5-4 5"],l:"Couloir"},
];
const COACH_PRESETS = [
  {text:"Prendre des initiatives sur le terrain", cat:"mental"},
  {text:"Connaître et appliquer les 5 solutions", cat:"tactique"},
  {text:"Conserver le ballon sous pression", cat:"technique"},
  {text:"Jouer au maximum vers l'avant", cat:"tactique"},
  {text:"Dédoublement — apport offensif", cat:"tactique"},
  {text:"Améliorer la qualité de mes centres", cat:"technique"},
  {text:"Défendre l'axe ballon-but", cat:"tactique"},
];
const LATERAL_PRESETS = [
  {text:"Travailler les 5 premiers mètres (démarrage)", cat:"physique"},
  {text:"Développer ma vitesse de pointe", cat:"physique"},
  {text:"Fréquence des appuis — corde à sauter", cat:"physique"},
  {text:"Progresser en 1v1 défensif", cat:"technique"},
  {text:"Timing des montées et des replis", cat:"tactique"},
];
const PROGRAMME = [
  {repos:true, routines:["Cohérence cardiaque 5'","Étirements"]},
  {collectif:"18h30 – 20h00", individuel:"Corde à sauter — 5' · 10\" saut / 20\" récup", routines:["Cohérence cardiaque 5' × 3/jour"]},
  {individuel:"Échelle de rythme — 5' · 10\" appuis rapides / 20\" récup", routines:["Cohérence cardiaque 5' × 3/jour"]},
  {collectif:"14h00", individuel:"Corde à sauter — 5' · 10\" saut / 20\" récup", routines:["Cohérence cardiaque 5' × 3/jour"]},
  {collectif:"18h00", individuel:"Échelle de rythme — 5' · 10\" appuis rapides / 20\" récup", routines:["Cohérence cardiaque 5' × 3/jour","Affirmations · Reconnaissance · Visualisation"]},
  {individuel:"Vitesse-Force : ×5 sprints 5m + 1 sprint 30m · 1' récup entre chaque", routines:["Cohérence cardiaque 5' × 3/jour","Affirmations · Reconnaissance · Visualisation"]},
  {collectif:"Match !", routines:["Cohérence cardiaque 5' × 3/jour","Nadi Shodhana si besoin"]},
];
const objCats = [
  {id:"technique",d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M12 16a4 4 0 110-8 4 4 0 010 8z"],l:"Technique"},
  {id:"physique",d:"M22 12h-4l-3 9L9 3l-3 9H2",l:"Physique"},
  {id:"tactique",d:["M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z","M12 2v20M2 12h20"],l:"Tactique"},
  {id:"mental",d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M8 13s1.5 3 4 3 4-3 4-3","M9 9h.01","M15 9h.01"],l:"Mental"},
];

const LEVELS = [
  {min:0,   name:"Rookie",    c:"#94a3b8"},
  {min:60,  name:"Titulaire", c:"#22c55e"},
  {min:160, name:"Cadre",     c:"#3b82f6"},
  {min:320, name:"Espoir",    c:"#f59e0b"},
  {min:550, name:"Pro",       c:"#f97316"},
  {min:850, name:"Champion",  c:"#ef4444"},
];
const BADGES = [
  {id:"b1",ico:"⚽",l:"C'est parti !",   desc:"1ère séance loggée",         check:(s)=>s.length>=1},
  {id:"b2",ico:"🧠",l:"Mental de fer",   desc:"1er check-in mental",         check:(s,c)=>c.length>=1},
  {id:"b3",ico:"🎯",l:"Cap accompli",    desc:"1er objectif atteint",        check:(s,c,o)=>o.filter(x=>x.done).length>=1},
  {id:"b4",ico:"🔥",l:"En feu !",        desc:"7 jours d'affilée",           check:(s,c,o,r,st)=>st>=7},
  {id:"b5",ico:"💨",l:"Souffle d'acier", desc:"9 sessions cohérence card.",  check:(s,c,o,r)=>r>=9},
  {id:"b6",ico:"💪",l:"Guerrier",        desc:"20 séances au total",         check:(s)=>s.length>=20},
  {id:"b7",ico:"🏆",l:"Compétiteur",     desc:"5 matches loggés",            check:(s)=>s.filter(x=>x.type==="match").length>=5},
  {id:"b8",ico:"📅",l:"Semaine parfaite",desc:"4 séances en une semaine",   check:(s)=>new Set(s.filter(x=>daysSince(x.date)<7).map(x=>x.date)).size>=4},
];
const calcXP = (sess,chk,objs,resp) => sess.length*10 + chk.length*5 + objs.filter(o=>o.done).length*15 + resp*5;
const getLevel = xp => [...LEVELS].reverse().find(l=>xp>=l.min)||LEVELS[0];
const getNext  = xp => LEVELS.find(l=>l.min>xp)||null;

const glass = {background:"rgba(255,255,255,0.06)",backdropFilter:"blur(40px) saturate(200%)",WebkitBackdropFilter:"blur(40px) saturate(200%)",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)"};
const card = {...glass,borderRadius:24,padding:"18px 16px",marginBottom:12};
const btnP = {background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",color:"#fff",borderRadius:16,padding:"14px 24px",fontSize:15,fontWeight:700,cursor:"pointer",width:"100%",border:"none",boxShadow:"0 4px 24px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",letterSpacing:.2};
const inp = {width:"100%",padding:"10px 14px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,fontSize:14,background:"rgba(255,255,255,0.05)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",color:"#f1f5f9",boxSizing:"border-box",outline:"none",fontFamily:"inherit"};
const lbl = {fontSize:12,fontWeight:600,color:C.g500,textTransform:"uppercase",letterSpacing:.8,marginBottom:4,display:"block"};

const Ico = ({d,s=20,c=C.w}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const moodColors = {1:"#ef4444",2:"#f97316",3:"#94a3b8",4:"#22c55e",5:"#f59e0b"};
const MoodIco = ({d,v,s=28}) => { const c=moodColors[v]||C.g400; return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}</svg>; };
const TypeIco = ({d,s=24,c=C.blue}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}</svg>;
const iPlus="M12 5v14M5 12h14";
const iTrash="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6";
const iCheck="M20 6L9 17l-5-5";
const iBrain="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.2 6H8.2C6.3 13.7 5 11.5 5 9a7 7 0 017-7zM9 22h6M10 18v4M14 18v4";

const Header = ({title,sub}) => (
  <div style={{background:"linear-gradient(155deg,#0d2554 0%,#1d4ed8 55%,#1a3a6e 100%)",paddingTop:"calc(24px + env(safe-area-inset-top))",paddingBottom:30,paddingLeft:20,paddingRight:20,borderRadius:"0 0 30px 30px",color:"#fff",position:"sticky",top:0,zIndex:10,overflow:"hidden",boxShadow:"0 12px 48px rgba(29,78,216,0.4)"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)"}}/>
    <div style={{position:"absolute",bottom:-8,right:-10,opacity:.06,fontSize:120}}>⚓</div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <img src={LOGO} alt="USC" style={{width:44,height:52,objectFit:"contain"}} />
        <div>
          <div style={{fontSize:20,fontWeight:800,letterSpacing:-.5}}>{title}</div>
          {sub && <div style={{fontSize:13,opacity:.8,marginTop:2}}>{sub}</div>}
        </div>
      </div>
      <img src="/titouan.jpeg" alt="Titouan" style={{width:52,height:52,borderRadius:"50%",objectFit:"cover",border:"2px solid rgba(255,255,255,0.4)"}} />
    </div>
  </div>
);

const TabIco = ({d,active}) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={active?C.blue:C.g400} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}</svg>;

const TabBar = ({tab,set}) => {
  const ts=[
    {id:"home",d:["M3 12L12 3l9 9","M5 10v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10"],l:"Accueil"},
    {id:"train",d:"M22 12h-4l-3 9L9 3l-3 9H2",l:"Entraîne."},
    {id:"obj",d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M12 16a4 4 0 110-8 4 4 0 010 8z","M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0"],l:"Objectifs"},
    {id:"mental",d:["M12 22a10 10 0 110-20 10 10 0 010 20z","M8 13s1.5 3 4 3 4-3 4-3","M9 9h.01","M15 9h.01"],l:"Mental"},
    {id:"stats",d:"M18 20V10M12 20V4M6 20v-6",l:"Stats"},
  ];
  return <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"rgba(15,23,42,0.7)",backdropFilter:"blur(24px) saturate(180%)",WebkitBackdropFilter:"blur(24px) saturate(180%)",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",justifyContent:"space-around",padding:"6px 0 env(safe-area-inset-bottom,8px)",maxWidth:480,margin:"0 auto"}}>
    {ts.map(t=><button key={t.id} onClick={()=>set(t.id)} style={{background:tab===t.id?"rgba(59,130,246,0.18)":"none",border:tab===t.id?"1px solid rgba(59,130,246,0.28)":"1px solid transparent",borderRadius:14,padding:"6px 12px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all .25s",minWidth:52}}>
      <TabIco d={t.d} active={tab===t.id}/>
      <span style={{fontSize:10,fontWeight:700,color:tab===t.id?"#60a5fa":C.g400,transition:"color .25s"}}>{t.l}</span>
    </button>)}
  </div>;
};

const StatIco = ({d,c}) => <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}</svg>;
const Stat = ({l,v,d,c=C.blue}) => <div style={{background:`linear-gradient(145deg,${c}22,${c}08)`,border:`1px solid ${c}30`,borderRadius:20,padding:"16px 10px",flex:1,textAlign:"center",boxShadow:`0 4px 24px ${c}20, inset 0 1px 0 rgba(255,255,255,0.08)`}}>
  <div style={{marginBottom:8,display:"flex",justifyContent:"center"}}><StatIco d={d} c={c}/></div>
  <div style={{fontSize:24,fontWeight:800,color:"#f1f5f9",letterSpacing:-.5}}>{v}</div>
  <div style={{fontSize:9,color:"rgba(148,163,184,0.7)",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>{l}</div>
</div>;

const MoodPick = ({v,set}) => <div style={{display:"flex",gap:8,justifyContent:"center"}}>
  {moods.map(m=><button key={m.v} onClick={()=>set(m.v)} style={{background:v===m.v?`${moodColors[m.v]}18`:"rgba(255,255,255,0.04)",border:v===m.v?`2px solid ${moodColors[m.v]}60`:"2px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"10px 6px",cursor:"pointer",textAlign:"center",minWidth:52,transition:"all .2s"}}>
    <div style={{display:"flex",justifyContent:"center"}}><MoodIco d={m.d} v={m.v} s={26}/></div>
    <div style={{fontSize:9,color:v===m.v?moodColors[m.v]:C.g500,marginTop:4,fontWeight:700}}>{m.l}</div>
  </button>)}
</div>;

const Slider = ({label,v,set,max=10,c=C.blue}) => <div style={{marginBottom:12}}>
  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
    <span style={lbl}>{label}</span>
    <span style={{fontSize:14,fontWeight:700,color:c}}>{v}/{max}</span>
  </div>
  <input type="range" min={1} max={max} value={v} onChange={e=>set(+e.target.value)} style={{width:"100%",accentColor:c}} />
</div>;

const MiniChart = ({data,label,c=C.blue}) => {
  const mx=Math.max(...data.map(d=>d.v),1);
  return <div style={card}>
    <div style={lbl}>{label}</div>
    <div style={{display:"flex",alignItems:"flex-end",gap:4,height:80,marginTop:8}}>
      {data.map((d,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:"100%",maxWidth:28,borderRadius:6,height:`${(d.v/mx)*60}px`,minHeight:4,background:`linear-gradient(180deg,${c},${C.navy})`,transition:"height .3s"}} />
        <span style={{fontSize:9,color:C.g400,marginTop:3}}>{d.l}</span>
      </div>)}
    </div>
  </div>;
};

// === GAMIFICATION ===
const XPCard = ({sess,chk,objs,resp}) => {
  const xp=calcXP(sess,chk,objs,resp);
  const lvl=getLevel(xp); const nxt=getNext(xp);
  const pct=nxt?Math.round(((xp-lvl.min)/(nxt.min-lvl.min))*100):100;
  return <div style={{...card,background:`linear-gradient(145deg,${lvl.c}22,rgba(15,23,42,0.5))`,border:`1px solid ${lvl.c}40`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div>
        <div style={{fontSize:10,color:lvl.c,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2,marginBottom:2}}>Niveau</div>
        <div style={{fontSize:24,fontWeight:900,color:"#f1f5f9",letterSpacing:-.5}}>{lvl.name}</div>
      </div>
      <div style={{textAlign:"right",background:`${lvl.c}18`,border:`1px solid ${lvl.c}40`,borderRadius:16,padding:"8px 14px"}}>
        <div style={{fontSize:26,fontWeight:900,color:lvl.c,lineHeight:1}}>{xp}</div>
        <div style={{fontSize:9,color:C.g400,fontWeight:700,letterSpacing:.8}}>XP</div>
      </div>
    </div>
    <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden",marginBottom:6}}>
      <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${lvl.c},${lvl.c}99)`,borderRadius:4,transition:"width .6s"}}/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.g400}}>
      {nxt?<><span>+{nxt.min-xp} XP → {nxt.name}</span><span>{pct}%</span></>
          :<span style={{color:lvl.c,fontWeight:700,width:"100%",textAlign:"center"}}>Niveau maximum atteint !</span>}
    </div>
  </div>;
};

const ScoreSemaine = ({sess}) => {
  const TARGET=4;
  const wk=new Set(sess.filter(s=>daysSince(s.date)<7).map(s=>s.date)).size;
  const count=Math.min(wk,TARGET);
  const pct=(count/TARGET)*100;
  const ok=count>=TARGET;
  const msgs=["Allez, démarre ta semaine !","Bien lancé, continue !","Encore un effort !","Semaine parfaite 🔥"];
  return <div style={card}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <span style={lbl}>Programme de la semaine</span>
      <span style={{fontSize:16,fontWeight:800,color:ok?"#22c55e":C.blueL}}>{count}/{TARGET}</span>
    </div>
    <div style={{height:10,background:"rgba(255,255,255,0.07)",borderRadius:5,overflow:"hidden",marginBottom:8}}>
      <div style={{height:"100%",width:`${pct}%`,background:ok?"linear-gradient(90deg,#22c55e,#16a34a)":"linear-gradient(90deg,#3b82f6,#1d4ed8)",borderRadius:5,transition:"width .5s"}}/>
    </div>
    <div style={{fontSize:11,color:C.g400,textAlign:"center"}}>{msgs[Math.min(count,3)]}</div>
  </div>;
};

const BadgesCard = ({sess,chk,objs,resp,streak}) => {
  const unlocked=BADGES.filter(b=>b.check(sess,chk,objs,resp,streak));
  return <div style={card}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <span style={lbl}>Trophées</span>
      <span style={{fontSize:12,color:C.blueL,fontWeight:700}}>{unlocked.length}/{BADGES.length}</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {BADGES.map(b=>{
        const u=b.check(sess,chk,objs,resp,streak);
        return <div key={b.id} style={{background:u?"rgba(245,158,11,0.1)":"rgba(255,255,255,0.02)",border:u?"1px solid rgba(245,158,11,0.35)":"1px solid rgba(255,255,255,0.05)",borderRadius:16,padding:"12px 10px",textAlign:"center",opacity:u?1:0.38,transition:"opacity .3s"}}>
          <div style={{fontSize:26,marginBottom:4}}>{b.ico}</div>
          <div style={{fontSize:11,fontWeight:700,color:u?"#fbbf24":C.g400}}>{b.l}</div>
          <div style={{fontSize:9,color:C.g400,marginTop:2,lineHeight:1.3}}>{b.desc}</div>
        </div>;
      })}
    </div>
  </div>;
};

// === PROGRAMME DU JOUR ===
const ProgDuJour = () => {
  const j = new Date().getDay();
  const jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const p = PROGRAMME[j];
  const iCollectif = tTypes.find(x=>x.id==="collectif").d;
  const iIndiv = tTypes.find(x=>x.id==="individuel").d;
  return <div style={{...card,background:"linear-gradient(145deg,rgba(29,78,216,0.18),rgba(15,23,42,0.4))",border:"1px solid rgba(59,130,246,0.25)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <span style={lbl}>Programme du jour</span>
      <span style={{fontSize:13,fontWeight:800,color:C.blueL,letterSpacing:-.3}}>{jours[j]}</span>
    </div>
    {p.repos
      ? <div style={{textAlign:"center",padding:"10px 0",color:C.g400,fontSize:14,fontStyle:"italic"}}>Repos — récupère bien, tu le mérites.</div>
      : <>
        {p.collectif&&<div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:8,marginBottom:8,borderBottom:`1px solid ${C.g100}`}}>
          <TypeIco d={iCollectif} s={18} c={C.blue}/>
          <div><div style={{fontSize:12,fontWeight:700,color:C.g900}}>Séance collective</div><div style={{fontSize:11,color:C.g400}}>{p.collectif}</div></div>
        </div>}
        {p.individuel&&<div style={{display:"flex",alignItems:"flex-start",gap:10,paddingBottom:8,marginBottom:8,borderBottom:`1px solid ${C.g100}`}}>
          <TypeIco d={iIndiv} s={18} c={C.red}/>
          <div><div style={{fontSize:12,fontWeight:700,color:C.g900}}>Travail individuel</div><div style={{fontSize:11,color:C.g400,lineHeight:1.5}}>{p.individuel}</div></div>
        </div>}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{...lbl,margin:0}}>Routines</span></div>
        {p.routines.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:C.blueL,flexShrink:0}}/>
          <span style={{fontSize:11,color:C.g400}}>{r}</span>
        </div>)}
      </>}
  </div>;
};

// === PAGES ===
const Home = ({sess,objs,chk,go,resp}) => {
  const wk = sess.filter(s=>daysSince(s.date)<7).length;
  const streak = (()=>{if(!sess.length)return 0;const sorted=[...sess].sort((a,b)=>b.date.localeCompare(a.date));let c=0;for(const s of sorted){if(daysSince(s.date)<=c+1)c++;else break;}return c;})();
  const actObj = objs.filter(o=>!o.done).length;
  const lastM = chk.length?chk[chk.length-1]:null;
  return <>
    <Header title="KickTrack" sub="Titouan Kerfendal — U.S. Concarneau" />
    <div style={{padding:"16px 16px 100px"}}>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <Stat l="Cette sem." v={wk} d="M12 22a10 10 0 110-20 10 10 0 010 20zM8 12l2.5 2.5L16 9" c={C.blue} />
        <Stat l="Série" v={`${streak}j`} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" c={C.red} />
        <Stat l="Objectifs" v={actObj} d={["M12 22a10 10 0 110-20 10 10 0 010 20z","M12 16a4 4 0 110-8 4 4 0 010 8z"]} c={C.navy} />
      </div>
      <XPCard sess={sess} chk={chk} objs={objs} resp={resp}/>
      <div style={{...card,background:"linear-gradient(145deg,rgba(220,38,38,0.12),rgba(15,23,42,0.3))",border:"1px solid rgba(220,38,38,0.2)"}}>
        <div style={lbl}>Tes super-pouvoirs</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
          {["Intelligence de jeu","Maîtrise technique","Vitesse"].map(s=><span key={s} style={{background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700,color:"#fca5a5"}}>{s}</span>)}
        </div>
      </div>
      <ScoreSemaine sess={sess}/>
      <ProgDuJour />
      <div style={{display:"flex",gap:10}}>
        <button onClick={()=>go("train")} style={{...btnP,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Ico d={iPlus} s={18}/> Séance
        </button>
        <button onClick={()=>go("mental")} style={{...btnP,background:`linear-gradient(135deg,${C.red},${C.navy})`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Ico d={iBrain} s={18}/> Check-in
        </button>
      </div>
    </div>
  </>;
};

const Train = ({sess,setSess}) => {
  const [add,setAdd]=useState(false);
  const [f,sF]=useState({type:"collectif",dur:90,int:7,notes:"",date:today(),cote:"",centres_t:"",centres_r:""});
  const save=async()=>{const s={...f,id:uid()};const n=[...sess,s];setSess(n);await store.set("kt_s",n);setAdd(false);sF({type:"collectif",dur:90,int:7,notes:"",date:today(),cote:"",centres_t:"",centres_r:""});};
  const del=async id=>{const n=sess.filter(s=>s.id!==id);setSess(n);await store.set("kt_s",n);};
  return <>
    <Header title="Entraînements" sub="Log tes séances" />
    <div style={{padding:"16px 16px 100px"}}>
      {!add?<>
        <button onClick={()=>setAdd(true)} style={{...btnP,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <Ico d={iPlus} s={18}/> Ajouter une séance
        </button>
        {!sess.length?<div style={{textAlign:"center",padding:40,color:C.g400}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><TypeIco d={tTypes[0].d} s={48} c={C.g300}/></div>Commence à logger!</div>
        :[...sess].reverse().map(s=>{const t=tTypes.find(x=>x.id===s.type);return <div key={s.id} style={{...card,display:"flex",alignItems:"center",gap:12}}>
          <TypeIco d={t?.d||tTypes[0].d} s={28} c={C.blueL}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:15,color:C.g900}}>{t?.l}</div>
            <div style={{fontSize:12,color:C.g400}}>{fmtDate(s.date)} · {s.dur} min · Intensité {s.int}/10</div>
            {s.type==="match"&&s.cote&&<div style={{fontSize:11,color:C.blueL,marginTop:2,fontWeight:600}}>Côté {s.cote}{s.centres_t?` · ${s.centres_r||0}/${s.centres_t} centres`:""}</div>}
            {s.notes&&<div style={{fontSize:12,color:C.g500,marginTop:2,fontStyle:"italic"}}>{s.notes}</div>}
          </div>
          <button onClick={()=>del(s.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><Ico d={iTrash} s={16} c={C.g300}/></button>
        </div>;})}
      </>:<div style={card}>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14,color:C.navy}}>Nouvelle séance</div>
        <div style={{marginBottom:12}}>
          <span style={lbl}>Type</span>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:4}}>
            {tTypes.map(t=><button key={t.id} onClick={()=>sF(x=>({...x,type:t.id}))} style={{background:f.type===t.id?C.blueP:C.g50,border:f.type===t.id?`2px solid ${C.blue}`:`2px solid ${C.g200}`,borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:2}}><TypeIco d={t.d} s={20} c={f.type===t.id?C.blue:C.g400}/></div>
              <div style={{fontSize:10,fontWeight:600,color:f.type===t.id?C.blue:C.g500}}>{t.l}</div>
            </button>)}
          </div>
        </div>
        {f.type==="match"&&<div style={{marginBottom:12}}>
          <span style={lbl}>Côté joué</span>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            {["Gauche","Droite"].map(c=><button key={c} onClick={()=>sF(x=>({...x,cote:c}))} style={{flex:1,padding:"10px 0",borderRadius:12,border:f.cote===c?`2px solid ${C.blue}`:`2px solid ${C.g200}`,background:f.cote===c?C.blueP:C.g50,color:f.cote===c?C.blue:C.g400,fontWeight:700,fontSize:13,cursor:"pointer"}}>{c}</button>)}
          </div>
        </div>}
        {f.type==="match"&&<div style={{display:"flex",gap:8,marginBottom:12}}>
          <div style={{flex:1}}><span style={lbl}>Centres tentés</span><input type="number" min="0" value={f.centres_t} onChange={e=>sF(x=>({...x,centres_t:e.target.value}))} style={inp} placeholder="0"/></div>
          <div style={{flex:1}}><span style={lbl}>Centres réussis</span><input type="number" min="0" value={f.centres_r} onChange={e=>sF(x=>({...x,centres_r:e.target.value}))} style={inp} placeholder="0"/></div>
        </div>}
        <div style={{marginBottom:12}}><span style={lbl}>Date</span><input type="date" value={f.date} onChange={e=>sF(x=>({...x,date:e.target.value}))} style={inp}/></div>
        <div style={{marginBottom:12}}><span style={lbl}>Durée (min)</span><input type="number" value={f.dur} onChange={e=>sF(x=>({...x,dur:+e.target.value}))} style={inp}/></div>
        <Slider label="Intensité" v={f.int} set={v=>sF(x=>({...x,int:v}))} />
        <div style={{marginBottom:16}}><span style={lbl}>Notes</span><textarea value={f.notes} onChange={e=>sF(x=>({...x,notes:e.target.value}))} placeholder="Travail réalisé, ressenti..." rows={3} style={{...inp,resize:"vertical"}}/></div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setAdd(false)} style={{...btnP,background:C.g200,color:C.g700,flex:1}}>Annuler</button>
          <button onClick={save} style={{...btnP,flex:2}}>Enregistrer</button>
        </div>
      </div>}
    </div>
  </>;
};

const Obj = ({objs,setObjs}) => {
  const [add,setAdd]=useState(false);
  const [f,sF]=useState({text:"",cat:"technique",dl:""});
  const save=async()=>{if(!f.text.trim())return;const o={...f,id:uid(),done:false,cr:today()};const n=[...objs,o];setObjs(n);await store.set("kt_o",n);setAdd(false);sF({text:"",cat:"technique",dl:""});};
  const tog=async id=>{const n=objs.map(o=>o.id===id?{...o,done:!o.done}:o);setObjs(n);await store.set("kt_o",n);};
  const del=async id=>{const n=objs.filter(o=>o.id!==id);setObjs(n);await store.set("kt_o",n);};
  return <>
    <Header title="Objectifs" sub="Fixe-toi des caps" />
    <div style={{padding:"16px 16px 100px"}}>
      {!add?<>
        <button onClick={()=>setAdd(true)} style={{...btnP,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <Ico d={iPlus} s={18}/> Nouvel objectif
        </button>
        {!objs.length?<div style={{textAlign:"center",padding:40,color:C.g400}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><TypeIco d={["M12 22a10 10 0 110-20 10 10 0 010 20z","M12 16a4 4 0 110-8 4 4 0 010 8z","M12 2v3M12 19v3M2 12H5M19 12h3"]} s={48} c={C.g300}/></div>Définis tes premiers objectifs!</div>
        :<>{objs.filter(o=>!o.done).map(o=>{const c=objCats.find(x=>x.id===o.cat);return <div key={o.id} style={{...card,display:"flex",alignItems:"flex-start",gap:10}}>
          <button onClick={()=>tog(o.id)} style={{width:26,height:26,borderRadius:8,border:`2px solid ${C.blue}`,background:"none",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14,color:C.g900,display:"flex",alignItems:"center",gap:6}}>{c&&<TypeIco d={c.d} s={14} c={C.blue}/>}{o.text}</div>
            <div style={{fontSize:11,color:C.g400,marginTop:2}}>{c?.l}{o.dl?` · ${fmtDate(o.dl)}`:""}</div>
          </div>
          <button onClick={()=>del(o.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><Ico d={iTrash} s={14} c={C.g300}/></button>
        </div>;})}
        {objs.filter(o=>o.done).length>0&&<>
          <div style={{...lbl,marginTop:16,marginBottom:8,color:C.g400}}>✅ Accomplis ({objs.filter(o=>o.done).length})</div>
          {objs.filter(o=>o.done).map(o=>{const c=objCats.find(x=>x.id===o.cat);return <div key={o.id} style={{...card,opacity:.6,display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>tog(o.id)} style={{width:26,height:26,borderRadius:8,border:`2px solid ${C.blue}`,background:C.blue,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico d={iCheck} s={14}/></button>
            <span style={{fontSize:14,color:C.g500,textDecoration:"line-through",display:"flex",alignItems:"center",gap:6}}>{c&&<TypeIco d={c.d} s={14} c={C.g400}/>}{o.text}</span>
          </div>;})}
        </>}</>}
      </>:<div style={card}>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14,color:C.navy}}>Nouvel objectif</div>
        <div style={{marginBottom:12}}>
          <span style={lbl}>Catégorie</span>
          <div style={{display:"flex",gap:6,marginTop:4}}>
            {objCats.map(c=><button key={c.id} onClick={()=>sF(x=>({...x,cat:c.id}))} style={{background:f.cat===c.id?C.blueP:C.g50,border:f.cat===c.id?`2px solid ${C.blue}`:`2px solid ${C.g200}`,borderRadius:10,padding:"8px 10px",cursor:"pointer",flex:1,textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:2}}><TypeIco d={c.d} s={18} c={f.cat===c.id?C.blue:C.g400}/></div>
              <div style={{fontSize:9,fontWeight:600,color:f.cat===c.id?C.blue:C.g500}}>{c.l}</div>
            </button>)}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={lbl}>Objectifs fixés avec le coach</span>
            <span style={{fontSize:9,fontWeight:800,color:"#f59e0b",background:"rgba(245,158,11,0.15)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:10,padding:"2px 7px",letterSpacing:.5}}>COACH</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {COACH_PRESETS.map((p,i)=><button key={i} onClick={()=>sF(x=>({...x,text:p.text,cat:p.cat}))} style={{background:f.text===p.text?"rgba(245,158,11,0.2)":"rgba(245,158,11,0.06)",border:f.text===p.text?"1px solid rgba(245,158,11,0.7)":"1px solid rgba(245,158,11,0.25)",borderRadius:20,padding:"5px 12px",fontSize:11,color:f.text===p.text?"#fbbf24":C.g400,cursor:"pointer",fontWeight:f.text===p.text?700:500}}>{p.text}</button>)}
          </div>
          <span style={lbl}>Autres suggestions</span>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4,marginBottom:10}}>
            {LATERAL_PRESETS.map((p,i)=><button key={i} onClick={()=>sF(x=>({...x,text:p.text,cat:p.cat}))} style={{background:f.text===p.text?`${C.blue}22`:"rgba(255,255,255,0.04)",border:f.text===p.text?`1px solid ${C.blue}60`:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"5px 12px",fontSize:11,color:f.text===p.text?C.blueL:C.g400,cursor:"pointer",fontWeight:f.text===p.text?700:400}}>{p.text}</button>)}
          </div>
        </div>
        <div style={{marginBottom:12}}><span style={lbl}>Objectif</span><input value={f.text} onChange={e=>sF(x=>({...x,text:e.target.value}))} placeholder="Ou écris le tien…" style={inp}/></div>
        <div style={{marginBottom:16}}><span style={lbl}>Deadline (optionnel)</span><input type="date" value={f.dl} onChange={e=>sF(x=>({...x,dl:e.target.value}))} style={inp}/></div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setAdd(false)} style={{...btnP,background:C.g200,color:C.g700,flex:1}}>Annuler</button>
          <button onClick={save} style={{...btnP,flex:2}}>Ajouter</button>
        </div>
      </div>}
    </div>
  </>;
};

const Respiration = () => {
  const [running,setRunning]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const [breathExpanded,setBreathExpanded]=useState(false);
  const [sessToday,setSessToday]=useState(0);
  const [musicOn,setMusicOn]=useState(true);
  const audioRef=useRef(null);
  const DURATION=300;
  const timeLeft=DURATION-elapsed;
  const phase=breathExpanded?"inspire":"expire";
  const phaseSec=5-(elapsed%5)||5;

  // --- Web Audio ---
  const initAudio=()=>{
    if(audioRef.current)return audioRef.current;
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      const master=ctx.createGain();
      master.gain.setValueAtTime(0.001,ctx.currentTime);
      master.connect(ctx.destination);
      // Fondamentale (ré 146 Hz) + légèrement désaccordée (+3Hz = battement 3Hz méditatif)
      const mk=(f,vol)=>{const o=ctx.createOscillator();o.type="sine";o.frequency.setValueAtTime(f,ctx.currentTime);const g=ctx.createGain();g.gain.setValueAtTime(vol,ctx.currentTime);o.connect(g);g.connect(master);o.start();return o;};
      const o1=mk(146,0.55); // fondamentale
      const o2=mk(149,0.35); // +3Hz → battement méditatif
      const o3=mk(219,0.20); // quinte parfaite (harmonie)
      audioRef.current={ctx,master,o1,o2,o3};
      return audioRef.current;
    }catch(e){return null;}
  };

  const fadeAudio=(on)=>{
    if(!audioRef.current)return;
    const{ctx,master}=audioRef.current;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
    master.gain.linearRampToValueAtTime(on?0.18:0.001,ctx.currentTime+1.5);
  };

  useEffect(()=>{
    store.get("kt_resp_"+today()).then(v=>{if(v)setSessToday(v);});
    return()=>{
      if(audioRef.current){
        try{audioRef.current.o1.stop();audioRef.current.o2.stop();audioRef.current.o3.stop();audioRef.current.ctx.close();}catch(e){}
        audioRef.current=null;
      }
    };
  },[]);

  // Timer 1 seconde
  useEffect(()=>{
    if(!running)return;
    const iv=setInterval(()=>{
      setElapsed(e=>{
        if(e>=DURATION-1){
          setRunning(false);
          setSessToday(s=>{const n=Math.min(s+1,3);store.set("kt_resp_"+today(),n);return n;});
          store.get("kt_resp_total").then(t=>store.set("kt_resp_total",(t||0)+1));
          return 0;
        }
        return e+1;
      });
    },1000);
    return()=>clearInterval(iv);
  },[running]);

  // Cycle respiration
  useEffect(()=>{
    if(!running){setBreathExpanded(false);return;}
    setBreathExpanded(true);
    const iv=setInterval(()=>setBreathExpanded(x=>!x),5000);
    return()=>clearInterval(iv);
  },[running]);

  // Audio fade avec running
  useEffect(()=>{
    if(!musicOn)return;
    if(running){if(audioRef.current)audioRef.current.ctx.resume().catch(()=>{});fadeAudio(true);}
    else fadeAudio(false);
  },[running]);

  // Fréquences suivent le souffle
  useEffect(()=>{
    if(!audioRef.current||!running||!musicOn)return;
    const{ctx,master,o1,o2,o3}=audioRef.current;
    const now=ctx.currentTime;
    const dur=4.5;
    const ramp=(node,from,to)=>{node.cancelScheduledValues(now);node.setValueAtTime(from,now);node.linearRampToValueAtTime(to,now+dur);};
    if(breathExpanded){
      // INSPIRE — montée en fréquence + volume
      ramp(o1.frequency,o1.frequency.value,174);
      ramp(o2.frequency,o2.frequency.value,177);
      ramp(o3.frequency,o3.frequency.value,261);
      ramp(master.gain,master.gain.value,0.26);
    }else{
      // EXPIRE — descente en fréquence + volume doux
      ramp(o1.frequency,o1.frequency.value,136);
      ramp(o2.frequency,o2.frequency.value,139);
      ramp(o3.frequency,o3.frequency.value,204);
      ramp(master.gain,master.gain.value,0.09);
    }
  },[breathExpanded]);

  const mins=Math.floor(timeLeft/60);
  const secs=timeLeft%60;
  const pct=elapsed/DURATION;
  const started=elapsed>0||running;

  return <div style={{...card,background:"linear-gradient(145deg,rgba(59,130,246,0.12),rgba(15,23,42,0.4))",border:"1px solid rgba(59,130,246,0.25)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div>
        <div style={lbl}>Cohérence cardiaque</div>
        <div style={{fontSize:11,color:C.g400,marginTop:2}}>5 min · 5s inspire / 5s expire</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>{
          const next=!musicOn;setMusicOn(next);
          if(audioRef.current){const{ctx,master}=audioRef.current;master.gain.setTargetAtTime(next&&running?0.18:0.001,ctx.currentTime,0.5);}
        }} style={{background:"none",border:`1px solid ${musicOn?"rgba(59,130,246,0.4)":"rgba(148,163,184,0.2)"}`,borderRadius:14,padding:"4px 10px",color:musicOn?C.blueL:C.g400,fontSize:11,cursor:"pointer",fontWeight:700,lineHeight:1.4}}>
          {musicOn?"♫ Son":"♫ Off"}
        </button>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,color:sessToday>=3?"#22c55e":C.blueL}}>{sessToday}/3</div>
          <div style={{fontSize:9,color:C.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>aujourd'hui</div>
        </div>
      </div>
    </div>

    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
      <div style={{position:"relative",width:160,height:160,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid rgba(59,130,246,0.15)"}}/>
        <div style={{
          width:breathExpanded?140:80,
          height:breathExpanded?140:80,
          borderRadius:"50%",
          background:breathExpanded
            ?"radial-gradient(circle,rgba(59,130,246,0.35),rgba(29,78,216,0.1))"
            :"radial-gradient(circle,rgba(148,163,184,0.2),rgba(15,23,42,0.1))",
          border:breathExpanded?"2px solid rgba(59,130,246,0.6)":"2px solid rgba(148,163,184,0.3)",
          boxShadow:breathExpanded?"0 0 40px rgba(59,130,246,0.4)":"none",
          transition:"width 5s ease-in-out,height 5s ease-in-out,box-shadow 2s ease-in-out,border-color 2s ease-in-out",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,
        }}>
          {running&&<>
            <div style={{fontSize:13,fontWeight:800,color:breathExpanded?"#93c5fd":C.g400,letterSpacing:.5}}>{breathExpanded?"INSPIRE":"EXPIRE"}</div>
            <div style={{fontSize:22,fontWeight:800,color:breathExpanded?C.blueL:C.g300}}>{phaseSec}</div>
          </>}
          {!running&&!started&&<div style={{fontSize:11,color:C.g400,textAlign:"center",padding:"0 12px",lineHeight:1.5}}>Prêt à<br/>commencer</div>}
          {!running&&started&&<div style={{fontSize:11,color:C.g400}}>En pause</div>}
        </div>
      </div>

      <div style={{fontSize:36,fontWeight:800,color:C.g900,letterSpacing:-1,fontVariantNumeric:"tabular-nums"}}>
        {mins}:{String(secs).padStart(2,"0")}
      </div>

      <div style={{width:"100%",height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct*100}%`,background:"linear-gradient(90deg,#3b82f6,#1d4ed8)",borderRadius:2,transition:"width .5s linear"}}/>
      </div>

      <button onClick={()=>{
        if(!running){
          if(musicOn){if(!audioRef.current)initAudio();else audioRef.current.ctx.resume().catch(()=>{});}
        }
        setRunning(r=>!r);
      }} style={{...btnP,width:"auto",padding:"12px 40px",fontSize:14}}>
        {running?"Pause":elapsed===0?"Démarrer":"Reprendre"}
      </button>

      {(started&&!running)&&<button onClick={()=>{setElapsed(0);setRunning(false);}} style={{background:"none",border:"none",color:C.g400,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Recommencer</button>}
    </div>
  </div>;
};

const Mental = ({chk,setChk}) => {
  const [add,setAdd]=useState(false);
  const [f,sF]=useState({mood:3,conf:7,motiv:7,notes:"",date:today()});
  const save=async()=>{const c={...f,id:uid()};const n=[...chk,c];setChk(n);await store.set("kt_c",n);setAdd(false);sF({mood:3,conf:7,motiv:7,notes:"",date:today()});};
  const del=async id=>{const n=chk.filter(c=>c.id!==id);setChk(n);await store.set("kt_c",n);};
  return <>
    <Header title="Check-in Mental" sub="Comment tu te sens?" />
    <div style={{padding:"16px 16px 100px"}}>
      <Respiration />
      {!add?<>
        <button onClick={()=>setAdd(true)} style={{...btnP,background:`linear-gradient(135deg,${C.red},${C.navy})`,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <Ico d={iBrain} s={18}/> Nouveau check-in
        </button>
        {!chk.length?<div style={{textAlign:"center",padding:40,color:C.g400}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><TypeIco d={["M12 22a10 10 0 110-20 10 10 0 010 20z","M8 13s1.5 3 4 3 4-3 4-3","M9 9h.01","M15 9h.01"]} s={48} c={C.g300}/></div>Fais ton premier check-in!</div>
        :[...chk].reverse().map(c=><div key={c.id} style={card}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {(()=>{const m=moods.find(x=>x.v===c.mood);return m?<MoodIco d={m.d} v={m.v} s={28}/>:null;})()}
              <div><div style={{fontWeight:600,fontSize:14,color:C.g900}}>{moods.find(m=>m.v===c.mood)?.l}</div><div style={{fontSize:11,color:C.g400}}>{fmtDate(c.date)}</div></div>
            </div>
            <button onClick={()=>del(c.id)} style={{background:"none",border:"none",cursor:"pointer"}}><Ico d={iTrash} s={14} c={C.g300}/></button>
          </div>
          <div style={{display:"flex",gap:12,marginTop:10}}>
            <div style={{flex:1,textAlign:"center",background:C.g50,borderRadius:8,padding:"6px 4px"}}><div style={{fontSize:10,color:C.g400,fontWeight:600}}>Confiance</div><div style={{fontSize:16,fontWeight:700,color:C.navy}}>{c.conf}/10</div></div>
            <div style={{flex:1,textAlign:"center",background:C.g50,borderRadius:8,padding:"6px 4px"}}><div style={{fontSize:10,color:C.g400,fontWeight:600}}>Motivation</div><div style={{fontSize:16,fontWeight:700,color:C.red}}>{c.motiv}/10</div></div>
          </div>
          {c.notes&&<div style={{fontSize:12,color:C.g500,marginTop:8,fontStyle:"italic"}}>"{c.notes}"</div>}
        </div>)}
      </>:<div style={card}>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14,color:C.navy}}>Comment tu te sens?</div>
        <div style={{marginBottom:16}}><span style={lbl}>Humeur</span><MoodPick v={f.mood} set={v=>sF(x=>({...x,mood:v}))}/></div>
        <Slider label="Confiance" v={f.conf} set={v=>sF(x=>({...x,conf:v}))} c={C.navy} />
        <Slider label="Motivation" v={f.motiv} set={v=>sF(x=>({...x,motiv:v}))} c={C.red} />
        <div style={{marginBottom:16}}><span style={lbl}>Notes</span><textarea value={f.notes} onChange={e=>sF(x=>({...x,notes:e.target.value}))} placeholder="Ce qui va bien, ce qui peut s'améliorer..." rows={3} style={{...inp,resize:"vertical"}}/></div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setAdd(false)} style={{...btnP,background:C.g200,color:C.g700,flex:1}}>Annuler</button>
          <button onClick={save} style={{...btnP,flex:2,background:`linear-gradient(135deg,${C.red},${C.navy})`}}>Enregistrer</button>
        </div>
      </div>}
    </div>
  </>;
};

const CompetencesRadar = () => {
  const SKL=[{n:"Vitesse"},{n:"Tir"},{n:"Passe"},{n:"Défense"},{n:"Physique"}];
  const [vals,setVals]=useState([5,5,5,5,5]);
  useEffect(()=>{store.get("kt_comp").then(v=>{if(v)setVals(v);});},[]);
  const save=async nv=>{setVals(nv);await store.set("kt_comp",nv);};
  const cx=110,cy=110,R=78;
  const ang=SKL.map((_,i)=>(Math.PI*2*i/5)-Math.PI/2);
  const pt=(r,i)=>[cx+r*Math.cos(ang[i]),cy+r*Math.sin(ang[i])];
  const mkPath=pts=>pts.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")+"Z";
  const grid=[2,4,6,8,10].map(l=>SKL.map((_,i)=>pt(R*l/10,i)));
  const data=SKL.map((_,i)=>pt(R*vals[i]/10,i));
  const lblR=R+22;
  return <div style={card}>
    <div style={lbl}>Toile de compétences</div>
    <svg width="220" height="220" style={{display:"block",margin:"8px auto 0",overflow:"visible"}}>
      {/* Grille */}
      {grid.map((pts,li)=><path key={li} d={mkPath(pts)} fill={li===4?"rgba(37,99,235,0.04)":"none"} stroke="rgba(148,163,184,0.18)" strokeWidth="1"/>)}
      {/* Axes */}
      {ang.map((a,i)=><line key={i} x1={cx} y1={cy} x2={(cx+R*Math.cos(a)).toFixed(1)} y2={(cy+R*Math.sin(a)).toFixed(1)} stroke="rgba(148,163,184,0.2)" strokeWidth="1"/>)}
      {/* Zone compétences */}
      <path d={mkPath(data)} fill="rgba(37,99,235,0.22)" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Points */}
      {data.map((p,i)=><circle key={i} cx={p[0].toFixed(1)} cy={p[1].toFixed(1)} r="5" fill="#3b82f6" stroke="#0f172a" strokeWidth="2"/>)}
      {/* Labels */}
      {SKL.map(({n},i)=>{
        const lx=cx+lblR*Math.cos(ang[i]);
        const ly=cy+lblR*Math.sin(ang[i]);
        return <text key={i} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="700" fill="#cbd5e1">{n}</text>;
      })}
      {/* Valeurs */}
      {data.map((p,i)=>{
        const ox=((p[0]-cx)*0.18).toFixed(1);
        const oy=((p[1]-cy)*0.18).toFixed(1);
        return vals[i]>=4?<text key={i} x={(p[0]+parseFloat(ox)).toFixed(1)} y={(p[1]+parseFloat(oy)-8).toFixed(1)} textAnchor="middle" fontSize="10" fontWeight="800" fill="#93c5fd">{vals[i]}</text>:null;
      })}
    </svg>
    <div style={{marginTop:4}}>
      {SKL.map(({n},i)=><div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{fontSize:12,fontWeight:700,color:C.g700,width:60,flexShrink:0}}>{n}</span>
        <input type="range" min="1" max="10" value={vals[i]}
          onChange={e=>{const nv=[...vals];nv[i]=+e.target.value;save(nv);}}
          style={{flex:1,accentColor:"#3b82f6",cursor:"pointer"}}/>
        <span style={{fontSize:15,fontWeight:800,color:C.blueL,width:20,textAlign:"right"}}>{vals[i]}</span>
      </div>)}
    </div>
  </div>;
};

const Stats = ({sess,chk,objs,resp}) => {
  const tot=sess.length;
  const totMin=sess.reduce((a,s)=>a+(s.dur||0),0);
  const avgI=tot?(sess.reduce((a,s)=>a+s.int,0)/tot).toFixed(1):"-";
  const wkD=[3,2,1,0].map(w=>{const count=sess.filter(s=>{const d=daysSince(s.date);return d>=w*7&&d<(w+1)*7;}).length;return{l:w===0?"Sem.":`-${w}s`,v:count};}).reverse();
  const moodD=[...chk].slice(-7).map(c=>({l:fmtDate(c.date),v:c.mood}));
  const tc={};sess.forEach(s=>{tc[s.type]=(tc[s.type]||0)+1;});
  return <>
    <Header title="Statistiques" sub="Ta progression" />
    <div style={{padding:"16px 16px 100px"}}>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <Stat l="Séances" v={tot} d="M12 22a10 10 0 110-20 10 10 0 010 20zM8 12l2.5 2.5L16 9" c={C.blue} />
        <Stat l="Minutes" v={totMin} d="M12 22a10 10 0 110-20 10 10 0 010 20zM12 6v6l4 2" c={C.navy} />
        <Stat l="Int. moy." v={avgI} d={["M12 8v4","M12 16h.01","M3 12a9 9 0 1018 0A9 9 0 003 12z"]} c={C.red} />
      </div>
      <CompetencesRadar />
      <MiniChart data={wkD} label="Séances / semaine (4 dern.)" c={C.blue} />
      {moodD.length>0&&<MiniChart data={moodD} label="Évolution humeur" c={C.red} />}
      <div style={card}>
        <div style={lbl}>Répartition par type</div>
        {!Object.keys(tc).length?<div style={{textAlign:"center",padding:16,color:C.g400,fontSize:13}}>Pas encore de données</div>
        :<div style={{marginTop:8}}>{Object.entries(tc).sort((a,b)=>b[1]-a[1]).map(([type,count])=>{const t=tTypes.find(x=>x.id===type);const pct=Math.round((count/tot)*100);return <div key={type} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:3}}><span style={{display:"flex",alignItems:"center",gap:6}}>{t&&<TypeIco d={t.d} s={13} c={C.blue}/>}{t?.l||type}</span><span style={{fontWeight:700,color:C.navy}}>{count} ({pct}%)</span></div>
          <div style={{height:6,background:C.g100,borderRadius:3}}><div style={{height:"100%",borderRadius:3,width:`${pct}%`,background:`linear-gradient(90deg,${C.blue},${C.navy})`,transition:"width .3s"}}/></div>
        </div>;})}</div>}
      </div>
      <div style={card}>
        <div style={lbl}>Objectifs</div>
        <div style={{display:"flex",gap:12,marginTop:8}}>
          <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:28,fontWeight:800,color:C.blue}}>{objs.filter(o=>!o.done).length}</div><div style={{fontSize:11,color:C.g400}}>En cours</div></div>
          <div style={{width:1,background:C.g200}}/>
          <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:28,fontWeight:800,color:C.navy}}>{objs.filter(o=>o.done).length}</div><div style={{fontSize:11,color:C.g400}}>Accomplis</div></div>
        </div>
      </div>
      <BadgesCard sess={sess} chk={chk} objs={objs} resp={resp} streak={(()=>{if(!sess.length)return 0;const sorted=[...sess].sort((a,b)=>b.date.localeCompare(a.date));let c=0;for(const s of sorted){if(daysSince(s.date)<=c+1)c++;else break;}return c;})()}/>
    </div>
  </>;
};

// === MAIN APP ===
export default function KickTrack() {
  const [tab,setTab]=useState("home");
  const [sess,setSess]=useState([]);
  const [objs,setObjs]=useState([]);
  const [chk,setChk]=useState([]);
  const [ok,setOk]=useState(false);
  const [resp,setResp]=useState(0);
  useEffect(()=>{(async()=>{
    const [s,o,c,r]=await Promise.all([store.get("kt_s"),store.get("kt_o"),store.get("kt_c"),store.get("kt_resp_total")]);
    if(s)setSess(s);if(o)setObjs(o);if(c)setChk(c);if(r)setResp(r);setOk(true);
  })();},[]);
  if(!ok)return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a",flexDirection:"column",gap:20}}>
    <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:100,height:100}}>
      <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid transparent",borderTopColor:"#3b82f6",borderRightColor:"#3b82f6",animation:"spin 1.2s linear infinite"}}/>
      <img src={LOGO} alt="USC" style={{width:64,height:76,objectFit:"contain"}} />
    </div>
    <div style={{color:"#f1f5f9",fontSize:26,fontWeight:800,letterSpacing:-.5}}>KickTrack</div>
    <div style={{color:"rgba(148,163,184,0.6)",fontSize:13,letterSpacing:.5}}>Chargement des données...</div>
  </div>;
  return <div style={{maxWidth:480,margin:"0 auto",background:C.g50,minHeight:"100vh",fontFamily:"'Nunito','Segoe UI',system-ui,sans-serif",position:"relative"}}>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      html, body { background: #0f172a; margin: 0; padding: 0; }
      * { box-sizing: border-box; }
      :root { --sat: env(safe-area-inset-top); }
      @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} }
      @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,30px) scale(1.05)} 66%{transform:translate(30px,-40px) scale(1.1)} }
      @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,50px) scale(0.9)} 66%{transform:translate(-40px,-20px) scale(1.05)} }
      @keyframes spin { to { transform: rotate(360deg) } }
    `}</style>
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,maxWidth:480,margin:"0 auto",overflow:"hidden",zIndex:0,pointerEvents:"none"}}>
      <div style={{position:"absolute",top:"-80px",left:"-60px",width:280,height:280,borderRadius:"50%",background:"rgba(37,99,235,0.25)",filter:"blur(60px)",animation:"blob1 8s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"30%",right:"-80px",width:240,height:240,borderRadius:"50%",background:"rgba(124,58,237,0.2)",filter:"blur(60px)",animation:"blob2 10s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:"20%",left:"-40px",width:200,height:200,borderRadius:"50%",background:"rgba(6,182,212,0.15)",filter:"blur(50px)",animation:"blob3 12s ease-in-out infinite"}}/>
    </div>
    <div style={{position:"relative",zIndex:1}}>
      {tab==="home"&&<Home sess={sess} objs={objs} chk={chk} go={setTab} resp={resp}/>}
      {tab==="train"&&<Train sess={sess} setSess={setSess}/>}
      {tab==="obj"&&<Obj objs={objs} setObjs={setObjs}/>}
      {tab==="mental"&&<Mental chk={chk} setChk={setChk}/>}
      {tab==="stats"&&<Stats sess={sess} chk={chk} objs={objs} resp={resp}/>}
    </div>
    <TabBar tab={tab} set={setTab}/>
  </div>;
}
