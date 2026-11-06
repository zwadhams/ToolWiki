// Temporary fixtures for an isolated production-preview origin. Never deploy them.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAX_IMPORT_BYTES, newComponent, newConnection, newProfile, serializeProfile } from '../../src/lib/system-builder.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = path.join(root, 'dist', '__first-batch__');
const bytes = raw => Buffer.byteLength(raw, 'utf8');
function largeProfile(notesLength = 0) {
  const profile = newProfile();
  profile.components = Array.from({ length: 50 }, (_, i) => ({
    ...newComponent(`c${i}`), languages: Array.from({ length: 80 }, (_, j) => `L${String(j).padStart(2, '0')}${'x'.repeat(197)}`), notes: 'n'.repeat(notesLength),
  }));
  profile.connections = Array.from({ length: 100 }, (_, i) => ({ ...newConnection(`e${i}`, 'c0', 'c1'), notes: 'n'.repeat(notesLength) }));
  return profile;
}
const small = newProfile();
small.name = 'Browser QA saved description';
small.components = [{ ...newComponent('qa-service'), name: 'QA Python service', languages: ['Python'], inputs: ['Source code'], inputsComplete: true, hostPlatform: 'Linux' }];
const nearLimit = largeProfile();
let remaining = MAX_IMPORT_BYTES - 100 - bytes(JSON.stringify(nearLimit, null, 2));
for (const part of [...nearLimit.components, ...nearLimit.connections]) {
  const count = Math.min(2000, remaining); part.notes = 'n'.repeat(count); remaining -= count;
}
assert.equal(remaining, 0);
const fixtures = {
  'valid.json': serializeProfile(small),
  'compact-expansion.json': JSON.stringify(largeProfile(1000)),
  'near-limit.json': serializeProfile(nearLimit),
  'oversized-recovery.json': JSON.stringify(largeProfile(2000), null, 2),
  'malformed.txt': '{broken synthetic saved description',
};
assert.equal(bytes(fixtures['compact-expansion.json']), 996723);
assert.equal(bytes(fixtures['near-limit.json']), MAX_IMPORT_BYTES - 100);
assert.equal(bytes(fixtures['oversized-recovery.json']), 1203365);
await mkdir(output, { recursive: true });
for (const [name, raw] of Object.entries(fixtures)) await writeFile(path.join(output, name), raw, 'utf8');
await writeFile(path.join(output, 'index.html'), `<!doctype html>
<html lang="en"><meta charset="utf-8"><title>First-batch browser fixtures</title>
<style>body{font:18px system-ui;max-width:850px;margin:2rem auto;padding:1rem}button,a{margin:.4rem;padding:.5rem}pre{white-space:pre-wrap}</style>
<h1>First-batch browser fixtures</h1>
<p>Test-only controls. Use a dedicated preview port. These buttons replace only the synthetic system at this origin.</p>
<p><button data-seed="valid.json">Seed valid saved description</button><button data-seed="malformed.txt">Seed unreadable saved data</button><button data-seed="oversized-recovery.json">Seed oversized saved data</button><button data-seed="near-limit.json">Seed near-limit valid data</button></p>
<p><button id="refresh">Refresh stored summary</button><a href="../analysis-suite/">Open system builder</a><a href="../">Open catalog</a></p>
<p>Import fixtures: <a href="valid.json" download>Valid import</a><a href="compact-expansion.json" download>Compact expansion rejection</a><a href="near-limit.json" download>Near-limit valid import</a></p>
<pre id="status" role="status"></pre>
<script>
const key='toolwiki.analysis-suite.v1', status=document.querySelector('#status');
async function summary(){
 const raw=localStorage.getItem(key);
 if(raw===null){status.textContent='No saved fixture.';return;}
 const data=new TextEncoder().encode(raw);
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data))).map(v=>v.toString(16).padStart(2,'0')).join('');
 let shape;try{const p=JSON.parse(raw);shape={name:p.name,components:p.components?.length,connections:p.connections?.length};}catch{shape='Invalid JSON';}
 status.textContent=JSON.stringify({bytes:data.length,sha256:digest,shape},null,2);
}
if(location.origin==='http://127.0.0.1:4333'){
 document.querySelectorAll('[data-seed]').forEach(button=>button.addEventListener('click',async()=>{const response=await fetch(button.dataset.seed);if(!response.ok)throw Error('Fixture unavailable');localStorage.setItem(key,await response.text());await summary();}));
 document.querySelector('#refresh').addEventListener('click',summary);
 summary();
}else{
 document.querySelectorAll('button').forEach(button=>button.disabled=true);
 status.textContent='Fixture controls only run on the isolated http://127.0.0.1:4333 origin.';
}
</script></html>`, 'utf8');
console.log(`Created isolated browser fixtures in ${output}`);
console.log(JSON.stringify(Object.fromEntries(Object.entries(fixtures).map(([name, raw]) => [name, bytes(raw)]))));
