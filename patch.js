#!/usr/bin/env node
// Script de patch kicktrack.jsx — lance avec : node patch.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'kicktrack.jsx');
let src = fs.readFileSync(file, 'utf8');
const orig = src;

// 1. Remplacer le fetch allorigins par /api/ligue1
src = src.replace(
  /const apiUrl=`[^`]+`;\s*\n\s*const res=await fetch\(`https:\/\/api\.allorigins\.win[^`]+`\);/,
  "const res=await fetch(`/api/ligue1?dateFrom=${fmt(from)}&dateTo=${fmt(to)}`);"
);

// 2. Étendre la plage : -21j → -60j, +14j → +60j
src = src.replace('from.setDate(from.getDate()-21);', 'from.setDate(from.getDate()-60);');
src = src.replace('to.setDate(to.getDate()+14);', 'to.setDate(to.getDate()+60);');

// 3. Remplacer toggle Résultats/À venir par navigation journée
const toggleStart = src.indexOf('{/* Toggle résultats / à venir */}');
const toggleEnd   = src.indexOf('</div>', toggleStart) + 6;
// trouver la vraie fin du bloc toggle (2 divs fermants)
let depth = 0, pos = toggleStart;
while (pos < src.length) {
  if (src.slice(pos,pos+5) === '<div ') depth++;
  if (src.slice(pos,pos+6) === '</div>') { if(depth===0){pos+=6;break;} depth--; }
  pos++;
}

const NAV = `{/* Navigation journée */}
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
      </div>`;

if (toggleStart !== -1) {
  src = src.slice(0, toggleStart) + NAV + src.slice(pos);
}

// 4. Remplacer état "matches" par "allMatches" + ajouter état "journee"
src = src.replace('const [matches,setMatches]=useState([]);', 'const [allMatches,setAllMatches]=useState([]);\n  const [journee,setJournee]=useState(null);');
src = src.replace('setMatches(data.matches||[]);', `setAllMatches(ms);
      // Journée active = dernière avec au moins un FINISHED
      const finished=ms.filter(m=>m.status==="FINISHED");
      if(finished.length){ const last=Math.max(...finished.map(m=>m.matchday)); setJournee(prev=>prev||last); }
      else { const sc=ms.filter(m=>m.status==="SCHEDULED"||m.status==="TIMED"); if(sc.length) setJournee(prev=>prev||Math.min(...sc.map(m=>m.matchday))); }`);
src = src.replace('const data=await res.json();\n      setAllMatches(ms);', `const data=await res.json();\n      const ms=data.matches||[];\n      setAllMatches(ms);`);

// 5. Remplacer calculs fin/avenir/shown/grouped par calculs journée
const oldCalcs = /\s*const fin=\[\.\.\.matches[^\n]+\n\s*const avenir=[^\n]+\n\s*const shown=[^\n]+\n[\s\S]*?grouped[^\n]+\n[^\n]+\n[^\n]+\n\s*\}/;
// Plus simple : remplacer depuis "const fin=" jusqu'à "return <>"
const retIdx = src.indexOf('  return <>\n    <Header title="Ligue 1"');
const finIdx = src.lastIndexOf('\n  const fin=', retIdx);
if (finIdx !== -1) {
  const calcBlock = `
  const journees=[...new Set(allMatches.map(m=>m.matchday))].sort((a,b)=>a-b);
  const minJ=journees[0]||1;
  const maxJ=journees[journees.length-1]||38;
  const curJ=journee||minJ;
  const matchesJournee=allMatches.filter(m=>m.matchday===curJ).sort((a,b)=>new Date(a.utcDate)-new Date(b.utcDate));
  const dateJournee=matchesJournee.length?fmtMatchDate(matchesJournee[0].utcDate):"";

`;
  src = src.slice(0, finIdx) + '\n' + calcBlock + '  return <>\n    <Header title="Ligue 1"' + src.slice(retIdx + '  return <>\n    <Header title="Ligue 1"'.length);
}

// 6. Remplacer le rendu grouped par matchesJournee
src = src.replace(
  /\{!loading&&!error&&Object\.keys\(grouped\)[^}]+\}[^}]+\}\}\s*\{!loading&&!error&&Object\.entries\(grouped\)[^}]+\n[\s\S]*?\}\)\}\s*\n/,
  `{!loading&&!error&&matchesJournee.length===0&&(
        <div style={{textAlign:"center",padding:"40px 0",color:C.g400,fontSize:13}}>Aucun match pour cette journée.</div>
      )}
      {!loading&&!error&&matchesJournee.map(m=><MatchCard key={m.id} m={m}/>)}
`);

if (src === orig) {
  console.error('❌ Aucune modification appliquée — vérifiez le contenu du fichier');
  process.exit(1);
}

fs.writeFileSync(file, src, 'utf8');
console.log('✅ Patch appliqué !');
console.log('👉 Lance : npm run build && git add -A && git commit -m "Ligue1 fix" && git push');
