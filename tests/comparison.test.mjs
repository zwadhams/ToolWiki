import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSelection, comparisonHref } from '../src/lib/comparison.mjs';

const ids = ['tools/static', 'tools/dynamic', 'tools/binary', 'tools/other'];

test('comparison URLs ignore unknown IDs and repeated tools', () => {
  assert.deepEqual(normalizeSelection('tools/static,missing,tools/static, tools/dynamic ', ids), ids.slice(0, 2));
  assert.deepEqual(normalizeSelection('<script>,../../outside', ids), []);
});
test('comparisons preserve order and cap selection at three valid tools', () => {
  assert.deepEqual(normalizeSelection('missing,tools/binary,tools/static,tools/dynamic,tools/other', ids), ['tools/binary', 'tools/static', 'tools/dynamic']);
});
test('empty and single selections are supported without inventing a comparison', () => {
  assert.deepEqual(normalizeSelection(null, ids), []);
  assert.deepEqual(normalizeSelection('', ids), []);
  assert.deepEqual(normalizeSelection('tools/static', ids), ['tools/static']);
});
test('normalizing checkbox state leaves its input unchanged', () => {
  const selected = ['tools/dynamic', 'tools/static', 'tools/dynamic'];
  assert.deepEqual(normalizeSelection(selected, ids), ['tools/dynamic', 'tools/static']);
  assert.deepEqual(selected, ['tools/dynamic', 'tools/static', 'tools/dynamic']);
});
test('bookmark URLs round-trip tool IDs and the configured base path', () => {
  const path = comparisonHref('/ToolWiki/', ids.slice(0, 3));
  const url = new URL(path, 'https://example.com');
  assert.equal(url.pathname, '/ToolWiki/compare/');
  assert.deepEqual(normalizeSelection(url.searchParams.get('tools'), ids), ids.slice(0, 3));
  assert.equal(comparisonHref('/ToolWiki', []), '/ToolWiki/compare/');
});
