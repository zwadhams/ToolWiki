import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { buildKnowledge } from '../src/lib/knowledge-export.mjs';
import { comparisonTools } from '../src/lib/tool-data.mjs';
import { newProfile, newComponent } from '../src/lib/system-builder.mjs';
import { catalogSelection, catalogCsv, csvCell, comparisonMarkdown, recommendationReport, recommendationMarkdown } from '../src/lib/result-exports.mjs';

const site = 'https://example.com/ToolWiki/';
const entries = await Promise.all(['ruff', 'mypy'].map(async slug => {
  const { frontmatter, content } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
  return { id: `tools/${slug}`, body: content, data: { ...frontmatter, tool: toolSchema.parse(frontmatter.tool) } };
}));
const { files, snapshot } = buildKnowledge(entries, site);
const tools = snapshot.documents.map(({ id, title, description, url, revision, evidence, tool }) => ({ id, title, description, ...tool, citation: { id, title, url, revision, evidence } }));

test('filtered downloads retain exact selection order and qualifiers and reject a changed deployment', () => {
  const catalog = JSON.parse(files.get('catalog.json'));
  const ids = ['tools/ruff', 'tools/mypy'];
  const selection = catalogSelection(catalog, ids, { language: 'Python', input: 'Source code' }, site, site + 'knowledge/v1/', snapshot.revision);
  assert.deepEqual(selection.tools.map(t => t.id), ids);
  assert.equal(selection.count, 2);
  assert.equal(selection.filters.language, 'Python');
  const csv = catalogCsv(selection);
  assert.ok(csv.includes('languageNote'));
  assert.ok(csv.includes(site + 'knowledge/v1/documents/tools/ruff.json'));
  assert.ok(csv.includes(snapshot.revision));
  assert.ok(csv.includes('Security') || csv.includes('security'));
  assert.throws(() => catalogSelection(catalog, ids, {}, site, site, 'b'.repeat(64)), /Reload/);
  assert.throws(() => catalogSelection(catalog, ['absent'], {}, site, site, snapshot.revision), /missing/);
  const empty = catalogSelection(catalog, [], {}, site, site, snapshot.revision);
  assert.equal(catalogCsv(empty).split('\r\n').length, 2);
});

test('CSV handles quotes, separators, newlines and formula-like text', () => {
  assert.equal(csvCell('a,"b"\nc'), '"a,""b""\nc"');
  assert.equal(csvCell(' =1+1'), '"\' =1+1"');
  assert.equal(csvCell('@SUM(A1)'), '"\'@SUM(A1)"');
  assert.equal(csvCell(['C', 'C++']), '"C / C++"');
});

test('comparison export retains collapsed details, relationships, citations and execution limits', () => {
  const compared = comparisonTools(tools).map(t => ({ ...t, citation: tools.find(tool => tool.id === t.id).citation }));
  const choices = [{ tools: ['tools/ruff', 'tools/mypy'], title: 'Complementary checks', summary: 'Lint and types have different scopes.', href: 'guides/python-checks/', linkText: 'Python guide' }];
  const text = comparisonMarkdown(compared, choices, site + 'compare/', snapshot.revision, site);
  for (const expected of ['Language support', 'Cost and edition limits', 'Complementary checks', 'recorded', 'Execution evidence', snapshot.revision, tools[0].citation.revision, tools[0].sources[0].url]) assert.ok(text.includes(expected), expected);
  assert.throws(() => comparisonMarkdown(compared.slice(0, 1), [], site, snapshot.revision, site), /at least two/);
});

test('recommendation reports preserve candidates, unknowns, blocked matches, gaps and the input', () => {
  const profile = { ...newProfile(), name: 'Report example', components: [
    { ...newComponent('ready'), name: 'Ready', languages: ['Python'], inputs: ['Source code'], inputsComplete: true, hostPlatform: 'Windows' },
    { ...newComponent('unknown'), name: 'Unknown host', languages: ['Python'], inputs: ['Source code'], inputsComplete: true },
    { ...newComponent('blocked'), name: 'Missing source', languages: ['Python'], inputs: ['Binaries'], inputsComplete: true },
    { ...newComponent('gap'), name: 'No match', languages: ['COBOL'], inputs: ['Source code'] },
    { ...newComponent('empty'), name: 'Undescribed' },
  ], connections: [] };
  const report = recommendationReport(profile, tools, ['tools/ruff'], site + 'analysis-suite/', snapshot.revision);
  assert.deepEqual(report.profile, profile);
  assert.deepEqual(new Set(report.results.matches.map(m => m.status)), new Set(['candidate', 'details', 'blocked']));
  assert.ok(report.results.gaps.some(g => g.status === 'gap'));
  assert.ok(report.results.subjects.some(s => s.needsDescription));
  assert.deepEqual(report.selectedToolIds, ['tools/ruff']);
  const text = recommendationMarkdown(report);
  for (const expected of ['Ready', 'Unknown host', 'Missing source', 'No match', 'Undescribed', 'Information needed:', 'Unmet requirements:', 'Workflow limits:', 'System description', snapshot.revision, tools[0].citation.revision]) assert.ok(text.includes(expected), expected);
  assert.ok(text.includes('Execution evidence: recorded'));
  for (const tool of tools) assert.ok(text.includes(tool.citation.evidence.execution.scope));
});
