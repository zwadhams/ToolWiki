import test from 'node:test';
import assert from 'node:assert/strict';
import { documentCopy } from '../src/lib/document-copy.mjs';

test('copy includes the fetched revision and refuses a record from another page or deployment', () => {
  const record = { id: 'tools/ruff', revision: 'a'.repeat(64), markdown: '# Ruff\n\nSource and evidence.\n' };
  assert.equal(documentCopy(record, record.id, record.revision), `${record.markdown}\nContent revision: ${record.revision}\n`);
  assert.throws(() => documentCopy(record, 'tools/mypy', record.revision), /Reload/);
  assert.throws(() => documentCopy(record, record.id, 'b'.repeat(64)), /Reload/);
  assert.throws(() => documentCopy({ ...record, markdown: null }, record.id, record.revision), /could not be read/);
});
