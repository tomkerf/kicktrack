#!/usr/bin/env node
// patch3.cjs — Corrige le "Unexpected }" laissé par patch2.cjs
// Lance avec : node patch3.cjs && npm run build && git add -A && git commit -m "fix: Resultats clean build" && git push

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'kicktrack.jsx');
let src;
try { src = fs.readFileSync(file, 'utf8'); }
catch(e) { console.error('❌ Impossible de lire kicktrack.jsx :', e.message); process.exit(1); }

// ─── Marqueurs ──────────────────────────────────────────────────────────────
const START = 'const Resultats = () => {';
const END   = '\n};\n\n// === MAIN APP ===';

const startIdx = src.indexOf(START);
const endIdx   = src.indexOf(END);

if (startIdx === -1) { console.error('❌ START non trouvé'); process.exit(1); }
if (endIdx   === -1) { console.error('❌ END non trouvé');   process.exit(1); }

console.log('✓ START à index', startIdx);
console.log('✓ END   à index', endIdx);

// before = tout ce qui précède "const Resultats = () => {"
const before = src.slice(0, startIdx);

// after  = à partir de "\n\n// === MAIN APP ===" (on saute le "\n};" du END,
//          car notre nouveau composant se termine déjà par "};")
// END = '\n};\n\n// === MAIN APP ===' => length of '\n};' = 3 chars
const after = src.slice(endIdx + 3); // '\n};\n\n// === MAIN APP ===' -> '\n\n// === MAIN APP ==='

// ─── Nouveau composant Resultats ─────────────────────────────────────────────
const NEW_RESULTATS = `const Resultats = () => {
  const [allMatches,setAllMatches]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [journee,setJournee]=useState(null);
  const [lastFetch,setLastFetch]=useState(null);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const now=new Date();
      const from=new Date(now); from.setDate(from.getDate()-60);
      const to=new Date(now);   to.setDate(to.getDate()+60);
      const fmt=d=>d.toISOString().split("T")[0];
      const res=await fetch(\`/api/ligue1?dateFrom=\${fmt(from)}&dateTo=\${fmt(to)}\`);
      if(!res.ok) throw new Error(\`Erreur API (\${res.status})\`);
      const data=await res.json();
      const ms=data.matches||[];
      setAllMatches(ms);
      setLastFetch(Date.now());
      const finished=ms.filter(m=>m.status==="FINISHED");
      if(finished.length){
        const last=Math.max(...finished.map(m=>m.matchday));
        setJournee(prev=>prev||last);
      } else {
        const sched=ms.filter(m=>m.status==="SCHEDULED"||m.status==="TIMED");
        if(sched.length) setJournee(prev=>prev||Math.min(...sched.map(m=>m.matchday)));
      }
    } catch(e){ setError(e.message); }
    finally{ setLoading(false); }
  };

  useEffect(()=>{ fetchData(); },[]);

  const journees=[...new Set(allMatches.map(m=>m.matchday))].sort((a,b)=>a-b);
  const minJ=journees[0]||1;
  const maxJ=journees[journees.length-1]||38;
  const curJ=journee||minJ;

  const matchesJournee=allMatches.filter(m=>m.matchday===curJ)
    .sort((a,b)=>new Date(a.utcDate)-new Date(b.utcDate));

  const dateJournee=matchesJournee.length?fmtMatchDate(matchesJournee[0].utcDate):"";

  return <>
    <Header title="Ligue 1" sub="Résultats & Calendrier"/>
    <div style={{padding:"16px 16px 100px"}}>

      {/* Navigation journée */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <button onClick={()=>setJournee(j=>Math.max(minJ,j-1))} disabled={curJ<=minJ}
          style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",
            color:curJ<=minJ?C.g300:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:14,fontWeight:800,color:"#f1f5f9"}}>Journée {curJ}</div>
          {dateJournee&&<div style={{fontSize:10,color:C.g400}}>{dateJournee}</div>}
        </div>
        <button onClick={()=>setJournee(j=>Math.min(maxJ,j+1))} disabled={curJ>=maxJ}
          style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",
            color:curJ>=maxJ?C.g300:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
      </div>

      {/* Refresh */}
      <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:8,marginBottom:10}}>
        {lastFetch&&<span style={{fontSize:10,color:C.g300}}>
          Mis à jour {new Date(lastFetch).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
        </span>}
        <button onClick={fetchData} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,color:C.g400,cursor:"pointer"}}>
          ↻ Actualiser
        </button>
      </div>

      {loading&&<div style={{textAlign:"center",padding:"40px 0"}}>
        <div style={{display:"inline-block",width:28,height:28,borderRadius:"50%",
          border:"2px solid rgba(59,130,246,0.3)",borderTopColor:"#3b82f6",
          animation:"spin 1s linear infinite",marginBottom:12}}/>
        <div style={{color:C.g400,fontSize:13}}>Chargement…</div>
      </div>}

      {error&&<div style={{...card,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",textAlign:"center",padding:20}}>
        <div style={{fontSize:13,color:"#f87171",marginBottom:8}}>{error}</div>
        <button onClick={fetchData} style={{...btnP,padding:"8px 20px",fontSize:12}}>Réessayer</button>
      </div>}

      {!loading&&!error&&matchesJournee.length===0&&(
        <div style={{textAlign:"center",padding:"40px 0",color:C.g400,fontSize:13}}>
          Aucun match pour cette journée.
        </div>
      )}

      {!loading&&!error&&matchesJournee.map(m=><MatchCard key={m.id} m={m}/>)}
    </div>
  </>;
};`;   // <-- termine par }; pour que "after" n'ajoute pas un deuxième };

const newSrc = before + NEW_RESULTATS + after;

// Vérification rapide : pas de double "};"
const doubleBrace = newSrc.indexOf('};\n};\n');
if (doubleBrace !== -1) {
  console.error('❌ Détection de "};" doublon à index', doubleBrace);
  console.error('   Contexte:', JSON.stringify(newSrc.slice(doubleBrace-30, doubleBrace+30)));
  process.exit(1);
}

fs.writeFileSync(file, newSrc, 'utf8');
console.log('✅ patch3.cjs appliqué avec succès !');
console.log('   Lignes avant :', src.split('\n').length, '→ après :', newSrc.split('\n').length);
console.log('');
console.log('👉 Lance maintenant :');
console.log('   npm run build && git add -A && git commit -m "fix: Resultats clean build" && git push');
