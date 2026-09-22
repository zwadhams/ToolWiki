import fs from 'node:fs';
import crypto from 'node:crypto';
import yaml from '../../node_modules/.pnpm/js-yaml@4.3.2/node_modules/js-yaml/index.js';
import { reviews } from './assessments.mjs';
import { rebase } from './rebase-links.mjs';
const base = JSON.parse(fs.readFileSync('audits/tool-review/baseline.json','utf8'));
const date='2026-09-22';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('|','\\|').replaceAll('\n','<br>');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const totals={};
fs.mkdirSync('audits/tool-review/records',{recursive:true});
for(const original of base.files.filter(r=>r.metadata?.tool)) {
  const slug=original.file.split('/').at(-1).replace('.md','');
  const assessment=reviews[slug];
  const text=fs.readFileSync(original.file,'utf8');
  const front=text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data=yaml.load(front[1]);
  const sources=[...data.tool.sources.map(s=>s.url),...(assessment?.additional||[])];
  const rows=[];
  const push=(location,claim,kind='fact')=> {
    let verdict=assessment?'supported':'unresolved';
    let rationale=assessment?'See evidence assessment E1.':'Not yet assessed; retrieval alone is not verification.';
    if(kind==='administrative' && assessment){verdict='supported with qualification';rationale='Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence.';}
    if(kind==='example' && assessment){verdict='supported with qualification';rationale='Documentation/static reasoning only; this example has not been executed. See E1.';}
    if(kind==='advice' && assessment){verdict='supported with qualification';rationale='Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1.';}
    if(/Related research/.test(location)&&assessment){verdict='supported with qualification';rationale='Historical attribution only; see the research reconciliation record. No current-edition performance inference.';}
    if(assessment?.unresolved?.some(x=>new RegExp(x.match,'i').test(location+' '+claim))){verdict='unresolved';rationale=assessment.unresolved.filter(x=>new RegExp(x.match,'i').test(location+' '+claim)).map(x=>x.reason).join(' ');}
    rows.push({location,claim,verdict,rationale});
  };
  for(const key of ['title','description'])push(key,data[key]);
  for(const [key,value] of Object.entries(data.tool)) {
    if(key==='sources'){value.forEach((s,i)=>push(`tool.sources[${i}]`,`${s.label}: ${s.url}`,'administrative'));continue;}
    const kind=['verified','scope','editionGroup'].includes(key)?'administrative':'fact';
    if(Array.isArray(value))value.forEach((v,i)=>push(`tool.${key}[${i}]`,v,kind));
    else push(`tool.${key}`,value,kind);
  }
  let section='Notes', fenced=false, block=[], start=0;
  const lines=text.split(/\r?\n/);const first=text.slice(0,front[0].length).split(/\r?\n/).length;
  const flush=()=>{if(!block.length)return;const content=block.join('\n');
    const kind=content.startsWith('```')?'example':/example|evaluation|experiment|getting started|useful|when to use/i.test(section)?'advice':'fact';
    // Keep code blocks and paragraphs intact so qualifications travel with claims.
    push(`${section}, line ${start}`,content,kind);block=[];
  };
  for(let i=first;i<lines.length;i++){
    const line=lines[i];
    if(line.startsWith('```')){if(!fenced){flush();start=i+1;}block.push(line);fenced=!fenced;if(!fenced)flush();continue;}
    if(fenced){block.push(line);continue;}
    if(/^## / .test(line)){flush();section=line.slice(3);continue;}
    if(!line.trim()){flush();continue;}
    if(!block.length)start=i+1;block.push(line);
  }flush();
  const counts=Object.fromEntries(['supported','supported with qualification','contradicted','unresolved'].map(k=>[k,rows.filter(r=>r.verdict===k).length]));
  totals[slug]={...counts,assessed:!!assessment,sha256:hash(fs.readFileSync(original.file))};
  const md=[`# ${data.title}: evidence record`,'',`Access/review date: ${date}. Existing scope: ${data.tool.scope}`,'',`File: \`${original.file}\`. Baseline SHA-256: \`${original.sha256}\`. Reviewed SHA-256: \`${totals[slug].sha256}\`. Original text is preserved in baseline.json.`,'',`Status: ${assessment?'Assessed against primary documentation; see qualifications below.':'Pending manual assessment.'}`,'','## E1: evidence assessment','',assessment?.evidence||'Pending.','',`Source sections: ${assessment?.sections||'Pending.'}`,'',...sources.map((s,i)=>`- [S${i+1}](${s})`),'',`Correction: ${assessment?.corrections||'No content correction recorded.'}`,'','## Claims and dispositions','',`Counts: ${JSON.stringify(counts)}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.`,'','| Location | Claim as reviewed | Verdict | Evidence / limitation |','| --- | --- | --- | --- |',...rows.map(r=>`| ${esc(r.location)} | ${esc(rebase(r.claim,original.file,`audits/tool-review/records/${slug}.md`))} | ${r.verdict} | ${esc(r.rationale)} |`),''].join('\n');
  fs.writeFileSync(`audits/tool-review/records/${slug}.md`,md);
}
fs.writeFileSync('audits/tool-review/coverage.json',JSON.stringify(totals,null,2)+'\n');
console.log(JSON.stringify({assessed:Object.values(totals).filter(t=>t.assessed).length,total:Object.keys(totals).length}));
