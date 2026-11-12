import test from 'node:test';
import assert from 'node:assert/strict';
import { diffDocuments, buildHistory, readArchive, historyMarkdown } from '../src/lib/knowledge-history.mjs';
import { buildKnowledge } from '../src/lib/knowledge-export.mjs';

const site = 'https://example.com/ToolWiki/';
const entry = (id, body = 'Text.') => ({ id, body, data: { title: id, description: 'Example' } });
const snapshot = entries => buildKnowledge(entries, site).snapshot;

test('history distinguishes added, changed, removed, and unchanged document revisions', () => {
  const before = snapshot([entry('keep'), entry('change'), entry('remove')]);
  const after = snapshot([entry('keep'), entry('change', 'Revised.'), entry('add')]);
  const delta = diffDocuments(before, after);
  assert.deepEqual(delta.added.map(doc => doc.id), ['add']);
  assert.deepEqual(delta.changed.map(doc => doc.id), ['change']);
  assert.deepEqual(delta.removed.map(doc => doc.id), ['remove']);
  assert.equal(delta.changed[0].previousRevision, before.documents.find(doc => doc.id === 'change').revision);
  const archive = [{ snapshot: before, revision: before.revision, label: 'Baseline', capturedOn: '2026-11-12', path: 'baseline.json' }];
  const history = buildHistory(after, archive);
  assert.equal(history.entries[0].previousRevision, before.revision);
  assert.equal(history.entries[1].changes, null);
  assert.equal(buildHistory(before, archive).entries.length, 1);
  assert.ok(historyMarkdown(history, site).includes('Removed (1)'));
  assert.throws(() => buildHistory({ ...after, site: 'https://different.test/' }, archive), /another site/);
});

test('retained public snapshot bytes validate independently of current content', async () => {
  const archive = await readArchive();
  assert.ok(archive.length > 0);
  for (const entry of archive) assert.equal(entry.revision, entry.snapshot.revision);
});
