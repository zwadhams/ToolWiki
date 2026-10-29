import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSelection, comparisonHref, catalogHref, catalogParams } from '../src/lib/comparison.mjs';

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

test('a comparison returns to the originating filtered catalog with its current selection', () => {
  const filters = 'input=Source+code&language=Python&q=type+errors&cost=Free&sort=az';
  const comparison = new URL(comparisonHref('/ToolWiki', ids.slice(0, 2), filters), 'https://example.com');
  const result = new URL(catalogHref('/ToolWiki', ids.slice(1, 3), comparison.searchParams.get('catalog')), 'https://example.com');
  assert.equal(result.pathname, '/ToolWiki/');
  for (const [key, value] of new URLSearchParams(filters)) assert.equal(result.searchParams.get(key), value);
  assert.equal(result.searchParams.get('compare'), ids.slice(1, 3).join(','));
});

test('catalog context cannot redirect navigation or retain nested context', () => {
  const raw = 'language=C%2B%2B&q=a%26b&return=https%3A%2F%2Felsewhere.example&catalog=nested&tools=bad&sort=relevance';
  assert.equal(catalogParams(raw).toString(), 'q=a%26b&language=C%2B%2B');
  assert.equal(new URL(catalogHref('/ToolWiki', [], raw), 'https://example.com').origin, 'https://example.com');
});
