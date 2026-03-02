#!/usr/bin/env node
const fs = require('fs');
const file = require('path').join(__dirname, 'kicktrack.jsx');
let src = fs.readFileSync(file, 'utf8');
const orig = src;

// 1. Remplacer fetch allorigins par /api/ligue1
src = src.replace(
  /const apiUrl=`[^`]+`;\s*\n\s*const res=await fetch\(`https:\/\/api\.allorigins\.win[^`]+`\);/,
  "const res=await fetch(`/api/ligue1?dateFrom=${fmt(from)}&dateTo=${fmt(to)}`);"
);

// 2. Étendre la plage de dates
src = src.replace('from.setDate(from.getDate()-21);', 'from.setDate(from.getDate()-60);');
src = src.replace('to.setDate(to.getDate()+14);', 'to.setDate(to.getDate()+60);');

// 3. Remplacer états matches/vue par allMatches/journee
src = src.replace(
  'const [matches,setMatches]=useState([]);',
  'const [allMatches,setAllMatches]=useState([]);'
);
src = src.replace(
  "const [vue,setVue]=useState(\"resultats\"); // \"resultats\" | \"avenir\"",
  'const [journee,setJournee]=useState(null);'
);

// 4. Remplacer setMatches par setAllMatches + auto-select journée
src = src.replace(
  'setMatches(data.matches||[]);',
  `const ms=data.matches||[];
      setAllMatches(ms);
      const fin2=ms.filter(m=>m.status==="FINISHED");
      if(fin2.length){const last=Math.max(...fin2.map(m=>m.matchday));setJournee(prev=>prev||last);}
      else{const sc=ms.filter(m=>m.status==="SCHEDULED"||m.status==="TIMED");if(sc.length)setJournee(prev=>prev||Math.min(...sc.map(m=>m.matchday)));}`
);

// 5. Remplacer le bloc toggle + calculs par navigation journée + calculs journée
const oldBlock = /\/\* Toggle résultats \/ à venir \*\/[\s\S]*?<\/div>\s*\n/;
const NAV = `/* Navigation journée */}
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
`;

// Trouver et remplacer le bloc toggle manuellement
const t1 = src.indexOf('{/* Toggle résultats / à venir */}');
if (t1 !== -1) {
  // Trouver la fin du bloc toggle (le </div> fermant)
  let depth = 0, i = t1;
  while (i < src.length) {
    if (src[i]==='<' && src.slice(i,i+4)==='<div') depth++;
    if (src[i]==='<' && src.slice(i,i+6)==='</div') {
      if (depth===0) { i+=6; break; }
      depth--;
    }
    i++;
  }
  src = src.slice(0,t1) + '{' + NAV + src.slice(i);
}

// 6. Remplacer les calculs fin/avenir/shown/grouped par calculs journée
// Chercher depuis "const fin=[" jusqu'au "return <>"
const retIdx = src.indexOf('  return <>\n    <Header title="Ligue 1"');
const finIdx = src.lastIndexOf('\n  const fin=', retIdx);
if (finIdx !== -1 && retIdx !== -1) {
  const journeeCalcs = `
  const journees=[...new Set(allMatches.map(m=>m.matchday))].sort((a,b)=>a-b);
  const minJ=journees[0]||1;
  const maxJ=journees[journees.length-1]||38;
  const curJ=journee||minJ;
  const matchesJournee=allMatches.filter(m=>m.matchday===curJ).sort((a,b)=>new Date(a.utcDate)-new Date(b.utcDate));
  const dateJournee=matchesJournee.length?fmtMatchDate(matchesJournee[0].utcDate):"";

`;
  src = src.slice(0, finIdx) + '\n' + journeeCalcs + src.slice(retIdx);
}

// 7. Remplacer le rendu grouped par rendu par journée
const groupedStart = src.indexOf('{!loading&&!error&&Object.keys(grouped)');
const groupedEnd   = src.indexOf('\n      ))}', groupedStart);
if (groupedStart !== -1 && groupedEnd !== -1) {
  const newRender = `{!loading&&!error&&matchesJournee.length===0&&(
        <div style={{textAlign:"center",padding:"40px 0",color:C.g400,fontSize:13}}>Aucun match pour cette journée.</div>
      )}
      {!loading&&!error&&matchesJournee.map(m=><MatchCard key={m.id} m={m}/>)}`;
  src = src.slice(0, groupedStart) + newRender + src.slice(groupedEnd + '\n      ))}' .length);
}

if (src === orig) {
  console.error('❌ Aucune modification — vérifiez le contenu du fichier');
  process.exit(1);
}

fs.writeFileSync(file, src, 'utf8');
console.log('✅ Patch appliqué avec succès !');
console.log('👉 Lance : npm run build && git add -A && git commit -m "Ligue1 fix" && git push');
