import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { readArchive } from '../../src/lib/knowledge-history.mjs';

/** Load the integrity-checked export named by the original reader audit. */
export async function loadAgentEvidenceSnapshot(root = process.cwd()) {
  const audit = JSON.parse(await readFile(path.join(root, 'audits/agent-knowledge/static-local-check.json'), 'utf8'));
  assert.match(audit.snapshotRevision, /^[a-f0-9]{64}$/, 'The original audit must name a snapshot revision.');
  const entry = (await readArchive(root)).find(entry => entry.revision === audit.snapshotRevision);
  assert.ok(entry, `Missing retained snapshot for agent evidence: ${audit.snapshotRevision}`);
  assert.equal(entry.snapshot.documents.length, audit.documents, 'Retained snapshot document count differs from the original audit.');
  return entry.snapshot;
}
