// Print cached source excerpts for manual assessment; retrieval is not verification.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const records = JSON.parse(fs.readFileSync('audits/tool-review/link-check.json','utf8'));
const [urlPattern, textPattern = '.', limit = '24000'] = process.argv.slice(2);
for (const r of records.filter(r=>new RegExp(urlPattern,'i').test(r.url))) {
  console.log('\nSOURCE '+r.url+' => '+r.finalUrl+' HTTP '+r.status);
  if (!r.cacheId) {console.log(r.error);continue;}
  const text=fs.readFileSync(path.join(os.tmpdir(),'toolwiki-review-2026-09-22',r.cacheId+'.txt'),'utf8');
  const lines=text.split('\n');
  const matching = new Set();
  lines.forEach((line,i)=>{if(new RegExp(textPattern,'i').test(line)) for(let j=Math.max(0,i-1);j<=Math.min(lines.length-1,i+2);j++)matching.add(j);});
  console.log([...matching].sort((a,b)=>a-b).map(i=>`${i+1}: ${lines[i]}`).join('\n').slice(0,Number(limit)));
}
