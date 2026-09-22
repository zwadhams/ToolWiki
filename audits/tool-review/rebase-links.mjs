import fs from 'node:fs';
import path from 'node:path';
// Rebase quoted Wiki links to repository Markdown locations in audit records.
export function rebase(text, sourceFile, auditFile) {
  const slug=sourceFile.replace('src/content/docs/','').replace(/\.md$/,'').replace(/(?:^|\/)index$/,'');
  const base=`https://wiki.invalid/${slug}${slug&&!slug.endsWith('/')?'/':''}`;
  return String(text).replace(/\]\(([^)]+)\)/g,(whole,target)=>{
    if(!/^(?:\.\.?\/|\/|#)/.test(target))return whole;
    const url=new URL(target,base);
    const route=decodeURIComponent(url.pathname).replace(/^\/|\/$/g,'');
    const direct=`src/content/docs/${route}.md`;
    const file=fs.existsSync(direct)?direct:`src/content/docs/${route?route+'/':''}index.md`;
    if(!fs.existsSync(file))throw new Error(`Cannot rebase ${sourceFile}: ${target}`);
    return `](${path.relative(path.dirname(auditFile),file).replaceAll('\\','/')}${url.hash})`;
  });
}
