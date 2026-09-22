// Read-only HTTP retrieval. Source bodies are temporary, never published in the Wiki.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
const dir = path.join(os.tmpdir(), 'toolwiki-review-2026-09-22');
fs.mkdirSync(dir, { recursive: true });
const prior = fs.existsSync('audits/tool-review/link-check.json') ? JSON.parse(fs.readFileSync('audits/tool-review/link-check.json','utf8')) : [];
const requested = process.argv.slice(2);
const candidates = requested.length ? requested : JSON.parse(fs.readFileSync('audits/tool-review/source-inventory.json', 'utf8'));
const urls = candidates.filter(url => !prior.some(r=>r.url===url) && !/^https?:\/\/(127\.|localhost)/.test(url));
const results = prior.filter(r=>!/^https?:\/\/(127\.|localhost)/.test(r.url));
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    const id = crypto.createHash('sha256').update(url).digest('hex').slice(0,16);
    try {
      const response = await fetch(url, {signal:AbortSignal.timeout(20000), headers:{'User-Agent':'ToolWiki documentation review (source verification)'}});
      const bytes = Buffer.from(await response.arrayBuffer());
      const type = response.headers.get('content-type') || '';
      fs.writeFileSync(path.join(dir, `${id}${type.includes('pdf') ? '.pdf' : '.html'}`), bytes);
      const text = type.includes('pdf') ? '' : bytes.toString('utf8').replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<\/(p|div|li|h[1-6]|tr|pre)>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/[ \t]+/g,' ').replace(/\n\s*\n/g,'\n');
      fs.writeFileSync(path.join(dir, `${id}.txt`), text);
      results.push({url, finalUrl:response.url, status:response.status, type, bytes:bytes.length, cacheId:id, accessed:'2026-09-22'});
    } catch(error) { results.push({url, error:String(error), accessed:'2026-09-22'}); }
  }
}
await Promise.all(Array.from({length:8},worker));
fs.writeFileSync('audits/tool-review/link-check.json', JSON.stringify(results.sort((a,b)=>a.url.localeCompare(b.url)),null,2)+'\n');
console.log(JSON.stringify({cache:dir,total:results.length,failures:results.filter(r=>r.error||r.status>=400)},null,2));
