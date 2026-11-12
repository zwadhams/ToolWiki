import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, appendFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { buildKnowledge } from '../src/lib/knowledge-export.mjs';
import { json, sha256 } from '../src/lib/knowledge-format.mjs';
import { loadAgentEvidenceSnapshot } from '../scripts/lib/agent-evidence-snapshot.mjs';

async function fixture(t) {
  const parent = path.resolve(tmpdir());
  const root = await mkdtemp(path.join(parent, 'toolwiki-agent-evidence-'));
  t.after(async () => {
    assert.equal(path.dirname(root), parent);
    assert.ok(path.basename(root).startsWith('toolwiki-agent-evidence-'));
    await rm(root, { recursive: true, force: true });
  });
  const snapshot = body => buildKnowledge([{ id: 'guides/example', data: { title: 'Example', description: 'A workflow.' }, body }], 'https://example.com/ToolWiki/').snapshot;
  const original = snapshot('Original workflow.');
  const current = snapshot('Original workflow.\n\nNew export information.');
  await mkdir(path.join(root, 'data'), { recursive: true });
  await mkdir(path.join(root, 'audits/agent-knowledge'), { recursive: true });
  await mkdir(path.join(root, 'public/knowledge/v1/snapshots'), { recursive: true });
  const entries = [];
  for (const data of [original, current]) {
    const bytes = json(data);
    await writeFile(path.join(root, `public/knowledge/v1/snapshots/${data.revision}.json`), bytes);
    entries.push({ revision: data.revision, sha256: sha256(bytes), bytes: Buffer.byteLength(bytes) });
  }
  await writeFile(path.join(root, 'data/knowledge-history.json'), json(entries));
  const auditPath = path.join(root, 'audits/agent-knowledge/static-local-check.json');
  await writeFile(auditPath, json({ snapshotRevision: original.revision, documents: 1 }));
  return { root, original, current, auditPath };
}

test('historical evidence uses its original export despite newer archived content and no dist build', async t => {
  const { root, original, current } = await fixture(t);
  assert.notEqual(original.documents[0].revision, current.documents[0].revision);
  assert.deepEqual(await loadAgentEvidenceSnapshot(root), original);
});

test('historical evidence rejects a missing revision and an inconsistent document count', async t => {
  const { root, original, auditPath } = await fixture(t);
  await writeFile(auditPath, json({ snapshotRevision: '0'.repeat(64), documents: 1 }));
  await assert.rejects(loadAgentEvidenceSnapshot(root), /Missing retained snapshot/);
  await writeFile(auditPath, json({ snapshotRevision: original.revision, documents: 2 }));
  await assert.rejects(loadAgentEvidenceSnapshot(root), /document count differs/);
});

test('historical evidence rejects changed archive bytes even when JSON remains valid', async t => {
  const { root, original } = await fixture(t);
  await appendFile(path.join(root, `public/knowledge/v1/snapshots/${original.revision}.json`), ' ');
  await assert.rejects(loadAgentEvidenceSnapshot(root), /checksum mismatch/);
});
