import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { buildKnowledge } from '../src/lib/knowledge-export.mjs';

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
