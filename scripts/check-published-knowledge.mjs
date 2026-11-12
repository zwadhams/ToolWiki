import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { sha256, revisionOf } from '../src/lib/knowledge-format.mjs';

const base = process.argv[3] || 'https://zwadhams.github.io/ToolWiki/knowledge/v1/';
const expectedManifestHash = process.argv[2] || sha256(await readFile('dist/knowledge/v1/manifest.json'));
assert.match(expectedManifestHash, /^[a-f0-9]{64}$/);
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function fetchVerified(file, expectedHash, expectedBytes, attempts = 4) {
  let failure;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(new URL(file, base), { signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' }, redirect: 'error' });
      assert.equal(response.status, 200, `${file}: HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      assert.equal(sha256(bytes), expectedHash, `${file}: does not match the tested build`);
      if (expectedBytes !== undefined) assert.equal(bytes.length, expectedBytes, `${file}: byte count mismatch`);
      return bytes;
    } catch (error) { failure = error; if (attempt + 1 < attempts) await pause(3000); }
  }
  throw failure;
}

const manifest = JSON.parse((await fetchVerified('manifest.json', expectedManifestHash, undefined, 10)).toString('utf8'));
assert.equal(manifest.version, 1);
assert.equal(manifest.files.length, manifest.documentCount * 2 + 3);
assert.equal(new Set(manifest.files.map(f => f.path)).size, manifest.files.length);
for (const file of manifest.files) assert.match(file.path, /^(?:(?:index|catalog)\.json|snapshots\/[a-f0-9]{64}\.json|documents\/[a-z0-9/_-]+\.(?:json|md))$/);
let cursor = 0, snapshot;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (cursor < manifest.files.length) {
    const file = manifest.files[cursor++];
    const bytes = await fetchVerified(file.path, file.sha256, file.bytes);
    if (file.path === manifest.snapshot.path) snapshot = JSON.parse(bytes.toString('utf8'));
  }
}));
assert.ok(snapshot); assert.equal(snapshot.revision, manifest.revision);
assert.equal(revisionOf(snapshot), snapshot.revision); assert.equal(snapshot.documents.length, manifest.documentCount);
for (const document of snapshot.documents) assert.equal(revisionOf(document), document.revision);
console.log(JSON.stringify({ verifiedAt: new Date().toISOString(), manifestUrl: base + 'manifest.json', manifestSha256: expectedManifestHash, snapshotRevision: snapshot.revision, documents: manifest.documentCount, files: manifest.files.length + 1, directStaticAccess: 'passed' }, null, 2));
