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

test('profile return round-trips category, filters and zero to three known selections', () => {
  for (const [category, pathname] of [['all', '/ToolWiki/'], ['static', '/ToolWiki/static/'], ['dynamic', '/ToolWiki/dynamic/']]) {
    for (let length = 0; length <= 3; length++) {
      const selection = ids.slice(0, length);
      const filters = new URLSearchParams({ category, q: 'a&b + c', language: 'C++', input: 'Source code', cost: 'Free', sort: 'za', compare: selection.join(',') });
      const context = catalogParams(filters, ids).toString();
      assert.ok(context, 'Even an empty selection retains an originating category');
      const result = new URL(catalogHref('/ToolWiki/', null, context, ids), 'https://example.com');
      assert.equal(result.pathname, pathname);
      assert.equal(result.searchParams.get('q'), 'a&b + c');
      assert.equal(result.searchParams.get('language'), 'C++');
      assert.equal(result.searchParams.get('input'), 'Source code');
      assert.equal(result.searchParams.get('cost'), 'Free');
      assert.equal(result.searchParams.get('sort'), 'za');
      assert.deepEqual(normalizeSelection(result.searchParams.get('compare'), ids), selection);
      assert.ok(!result.searchParams.has('category'), 'The catalog category belongs in its route');
    }
  }
});

test('selection-only profile context has a return path and explicit clearing never restores stale IDs', () => {
  const context = catalogParams('compare=tools%2Fstatic%2Ctools%2Fdynamic', ids);
  const inherited = new URL(catalogHref('/ToolWiki', null, context, ids), 'https://example.com');
  assert.equal(inherited.pathname, '/ToolWiki/');
  assert.equal(inherited.searchParams.get('compare'), 'tools/static,tools/dynamic');
  assert.equal(catalogHref('/ToolWiki', [], context, ids), '/ToolWiki/');
  assert.equal(catalogHref('/ToolWiki', [], 'category=dynamic&compare=tools%2Fstatic', ids), '/ToolWiki/dynamic/');
});

test('comparison choices replace inherited selection while preserving the catalog origin', () => {
  const origin = 'category=static&language=C%2B%2B&compare=tools%2Fstatic%2Ctools%2Fdynamic';
  const changed = ids.slice(2);
  const comparison = new URL(comparisonHref('/ToolWiki', changed, origin, ids), 'https://example.com');
  assert.equal(comparison.searchParams.get('tools'), changed.join(','));
  const context = catalogParams(comparison.searchParams.get('catalog'), ids);
  assert.equal(context.get('compare'), changed.join(','));
  assert.equal(context.get('category'), 'static');
  const result = new URL(catalogHref('/ToolWiki', null, context, ids), 'https://example.com');
  assert.equal(result.pathname, '/ToolWiki/static/');
  assert.equal(result.searchParams.get('compare'), changed.join(','));
  assert.equal(result.searchParams.get('language'), 'C++');

  const cleared = new URL(comparisonHref('/ToolWiki', [], origin, ids), 'https://example.com');
  assert.ok(!cleared.searchParams.has('tools'));
  assert.ok(!catalogParams(cleared.searchParams.get('catalog'), ids).has('compare'));
  assert.equal(new URL(catalogHref('/ToolWiki', null, cleared.searchParams.get('catalog'), ids), 'https://example.com').pathname, '/ToolWiki/static/');
});

test('URL builders normalize context IDs against the full catalog rather than current results', () => {
  const raw = 'category=static&compare=missing,tools%2Fdynamic,tools%2Fdynamic,tools%2Fbinary,tools%2Fother,tools%2Fstatic';
  const context = catalogParams(raw, ids);
  assert.equal(context.get('compare'), 'tools/dynamic,tools/binary,tools/other');
  assert.equal(catalogParams(raw).has('compare'), false, 'No IDs are trusted without an allowlist');
  const comparison = new URL(comparisonHref('/ToolWiki', ['missing', ...ids, ids[0]], raw, ids), 'https://example.com');
  assert.equal(comparison.searchParams.get('tools'), ids.slice(0, 3).join(','));
  const returned = new URL(catalogHref('/ToolWiki', ['missing', ...ids], raw, ids), 'https://example.com');
  assert.equal(returned.searchParams.get('compare'), ids.slice(0, 3).join(','));
});

test('invalid categories cannot change the destination and nested or foreign context is discarded', () => {
  for (const category of ['//elsewhere.example', '../dynamic', 'https://elsewhere.example/', 'Static', '']) {
    const raw = new URLSearchParams({ category, compare: '../outside,tools/static', catalog: 'category=dynamic', return: 'https://elsewhere.example', tools: 'tools/other', q: '<script>&' });
    const context = catalogParams(raw, ids);
    assert.equal(context.get('category'), 'all');
    assert.equal(context.get('compare'), 'tools/static');
    assert.deepEqual([...context.keys()], ['q', 'category', 'compare']);
    const result = new URL(catalogHref('/ToolWiki', null, context, ids), 'https://example.com');
    assert.equal(result.origin, 'https://example.com');
    assert.equal(result.pathname, '/ToolWiki/');
    assert.equal(result.searchParams.get('q'), '<script>&');
  }
});
