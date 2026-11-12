import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { manifestSchema } from '../src/lib/knowledge-schema.mjs';
import { validateSnapshot } from '../mcp/knowledge.mjs';
import { sha256, json } from '../src/lib/knowledge-format.mjs';

const [location, capturedOn, label] = process.argv.slice(2);
if (!location || !/^\d{4}-\d{2}-\d{2}$/.test(capturedOn || '') || !label) throw new Error('Usage: node scripts/retain-knowledge.mjs <manifest path or HTTPS URL> <YYYY-MM-DD capture date> <label>');
const captureDate = new Date(capturedOn);
if (Number.isNaN(captureDate.valueOf()) || captureDate.toISOString().slice(0, 10) !== capturedOn) throw new Error('Use a valid capture date');
const maxBytes = 16 * 1024 * 1024;
async function read(location) {
  if (!/^https:\/\//.test(location)) {
    if ((await stat(location)).size > maxBytes) throw new Error('Knowledge file exceeds 16 MiB');
    return readFile(location);
  }
  const response = await fetch(location, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${location}`);
  const chunks = []; let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > maxBytes) throw new Error('Knowledge file exceeds 16 MiB');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
const manifest = manifestSchema.parse(JSON.parse((await read(location)).toString('utf8')));
const snapshotLocation = /^https:\/\//.test(location) ? new URL(manifest.snapshot.path, location).href : path.resolve(path.dirname(location), manifest.snapshot.path);
const bytes = await read(snapshotLocation);
if (bytes.length !== manifest.snapshot.bytes || sha256(bytes) !== manifest.snapshot.sha256) throw new Error('Snapshot does not match manifest bytes');
const snapshot = validateSnapshot(JSON.parse(bytes.toString('utf8')));
if (snapshot.revision !== manifest.revision || snapshot.documents.length !== manifest.documentCount) throw new Error('Snapshot and manifest disagree');
const ledgerPath = 'data/knowledge-history.json';
let ledger = [];
try { ledger = JSON.parse(await readFile(ledgerPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
if (ledger.some(entry => entry.revision === snapshot.revision)) throw new Error('This revision is already retained; no archive bytes were changed');
const directory = 'public/knowledge/v1/snapshots';
await mkdir(directory, { recursive: true }); await mkdir('data', { recursive: true });
await writeFile(path.join(directory, snapshot.revision + '.json'), bytes, { flag: 'wx' });
ledger.push({ revision: snapshot.revision, capturedOn, label, source: location, sha256: sha256(bytes), bytes: bytes.length });
await writeFile(ledgerPath, json(ledger));
console.log(`Retained ${snapshot.documents.length} documents at ${snapshot.revision}`);
