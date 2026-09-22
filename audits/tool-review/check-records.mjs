// Audit integrity checks, not a substitute for reading the primary evidence.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
const root='audits/tool-review';
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const reviewed=JSON.parse(fs.readFileSync(`${root}/reviewed-files.json`,'utf8'));
const coverage=JSON.parse(fs.readFileSync(`${root}/coverage.json`,'utf8'));
const related=JSON.parse(fs.readFileSync(`${root}/reconciliation-coverage.json`,'utf8'));
assert.equal(Object.keys(coverage).length,60);
assert.equal(related.editionGroups.length,9);
assert.equal(related.pages.length,20);
for(const r of reviewed)assert.equal(hash(fs.readFileSync(r.file)),r.reviewedSha256,`Content changed after review: ${r.file}`);
for(const [slug,r] of Object.entries(coverage)) {
  assert.equal(r.assessed,true,`Missing manual assessment: ${slug}`);
  const file=`src/content/docs/tools/${slug}.md`;
  assert.equal(hash(fs.readFileSync(file)),r.sha256,`Stale evidence record: ${slug}`);
  assert.ok(fs.readFileSync(`${root}/records/${slug}.md`,'utf8').includes(r.sha256));
}
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
for(const file of walk(root)) {
  const text=fs.readFileSync(file,'utf8');
  assert.ok(!/[^\x00-\x7f]/.test(text),`Non-ASCII audit file: ${file}`);
  assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text),`Hidden control character: ${file}`);
  if(file.endsWith('.md'))for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
    const target=match[1];
    if(/^https?:|^#/.test(target)||/\s/.test(target))continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(file),target.split('#')[0])),`Missing audit link: ${file} -> ${target}`);
  }
}
console.log('Audit integrity passed: 60 tool records, 9 edition groups, 20 related pages; all reviewed file hashes match; audit links resolve; audit files are ASCII.');
