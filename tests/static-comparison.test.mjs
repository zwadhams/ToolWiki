import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { buildKnowledge } from '../src/lib/knowledge-export.mjs';
import { readDocumentationSources } from '../src/lib/tool-inventory.mjs';
import { STATIC_COMPARISON_ROWS, staticComparisonTools, staticComparisonValue } from '../src/lib/static-comparison.mjs';
import { comparisonTools, publishedTools } from '../src/lib/tool-data.mjs';

test('every published static comparison retains the interactive decision facts', async () => {
  const entries = (await readDocumentationSources(process.cwd())).map(source => ({
    id: source.relativePath.replace(/\.[^.]+$/, ''),
    data: { ...source.data, ...(source.data.tool ? { tool: toolSchema.parse(source.data.tool) } : {}) },
  }));
  const comparisons = entries.filter(entry => entry.data.staticComparison);
  assert.ok(comparisons.length >= 9);
  const interactive = new Map(comparisonTools(publishedTools(entries)).map(tool => [tool.id, tool]));
  for (const page of comparisons) {
    const tools = staticComparisonTools(page.data.staticComparison, entries, 'https://example.com/ToolWiki/');
    for (const tool of tools) for (const [, key] of STATIC_COMPARISON_ROWS) {
      assert.ok(staticComparisonValue(tool[key]).trim(), `${page.id}: ${tool.id} ${key} is blank`);
      assert.deepEqual(tool[key], interactive.get(tool.id)[key]);
    }
  }
});

test('static comparisons retain scoped source requirements and change with their profiles', async () => {
  const entries = await Promise.all(['ruff', 'mypy'].map(async slug => {
    const { frontmatter, content } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
    return { id: `tools/${slug}`, data: { ...frontmatter, tool: toolSchema.parse(frontmatter.tool) }, body: content };
  }));
  const page = { id: 'comparisons/ruff-and-mypy', body: 'Lint rules and types answer different questions.', data: { title: 'Python checks', description: 'Compare requirements.', staticComparison: entries.map(entry => entry.id) } };
  const build = items => buildKnowledge([...items, page], 'https://example.com/ToolWiki/').snapshot.documents.find(doc => doc.id === page.id);
  const before = build(entries);
  assert.ok(before.markdown.includes(entries[0].data.tool.setup));
  assert.ok(before.markdown.includes('## Comparison sources and evidence'));
  assert.ok(before.sources.some(source => source.url === entries[0].data.tool.sources[0].url));
  const changed = structuredClone(entries); changed[0].data.tool.setup = 'Changed project preparation.';
  const after = build(changed);
  assert.notEqual(after.revision, before.revision);
  assert.ok(after.markdown.includes('Changed project preparation.'));
  assert.throws(() => build(entries.slice(1)), /Missing static comparison tool/);
});
