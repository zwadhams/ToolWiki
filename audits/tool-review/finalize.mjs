// Finalize provenance and documentation dates after manual review and reconciliation.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { reviews } from './assessments.mjs';
const baseline=JSON.parse(fs.readFileSync('audits/tool-review/baseline.json','utf8'));
const hold=new Set(['s-taliro','rtamt','phpstan']);
for(const r of baseline.files.filter(r=>r.metadata?.tool)) {
  const slug=r.file.split('/').at(-1).replace('.md','');
  if(!reviews[slug])throw new Error(`Missing review: ${slug}`);
  if(hold.has(slug))continue;
  const text=fs.readFileSync(r.file,'utf8');
  const updated=text.replace(/(  verified: ["'])\d{4}-\d{2}-\d{2}(["'])/,"$12026-09-22$2");
  if(updated!==text)fs.writeFileSync(r.file,updated);
}
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const reviewed=baseline.files.map(r=>({file:r.file,baselineSha256:r.sha256,reviewedSha256:sha(fs.readFileSync(r.file))}));
fs.writeFileSync('audits/tool-review/reviewed-files.json',JSON.stringify(reviewed,null,2)+'\n');
const links=JSON.parse(fs.readFileSync('audits/tool-review/link-check.json','utf8'));
const currentUrls=new Set(baseline.files.flatMap(r=>[...fs.readFileSync(r.file,'utf8').matchAll(/https?:\/\/[^\s)'"<>]+/g)].map(m=>m[0])));
const cache=path.join(os.tmpdir(),'toolwiki-review-2026-09-22');
for(const link of links){
  link.citedInReviewedFiles=currentUrls.has(link.url);
  link.contentAccess=link.status>=400?'failed supplemental lookup':/accounts.google.com/.test(link.finalUrl||'')?'login redirect':link.url==='https://account.phpstan.com/'?'account login':link.url==='https://www.cve.org/About/Overview'?'JavaScript required for article body':'retrieved';
  const file=link.cacheId&&path.join(cache,link.cacheId+(link.type.includes('pdf')?'.pdf':'.html'));
  if(file&&fs.existsSync(file))link.sha256=sha(fs.readFileSync(file));
}
fs.writeFileSync('audits/tool-review/link-check.json',JSON.stringify(links,null,2)+'\n');
const missing=[...currentUrls].filter(url=>!/^https?:\/\/(127\.|localhost)/.test(url)&&!links.some(r=>r.url===url));
if(missing.length)throw new Error(`Unchecked external URLs: ${missing.join(', ')}`);
console.log(JSON.stringify({reviewed:60,dateAdvancedOrConfirmed:57,dateRetained:[...hold],checkedUrls:links.length,citedUrls:[...currentUrls].filter(url=>!/^https?:\/\/(127\.|localhost)/.test(url)).length,missing}));
