import test from 'node:test';
import assert from 'node:assert/strict';
import { buildKnowledge, cleanMarkdown } from '../src/lib/knowledge-export.mjs';
import { revisionOf } from '../src/lib/knowledge-format.mjs';
import { validateSnapshot, createKnowledge } from '../mcp/knowledge.mjs';
import { boundedToolResult } from '../mcp/result.mjs';
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { markdownText } from '../src/lib/knowledge-markdown.mjs';

const site = 'https://example.com/ToolWiki/';
const entry = { id: 'guides/custom-slug', body: 'Intro [relative](../other/)\n\n## Setup\n\n```powershell\n$Path = "../original/"\n```\n\n### Detail\nKeep this caveat.\n\n## Setup\nAnother heading.\n', data: { title: 'Example', description: 'A workflow.' } };

test('standalone Markdown includes tool decisions, compatibility, editions, sources and evidence', async () => {
  for (const slug of ['ruff', 'coverity-scan']) {
    const { frontmatter, content } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
    const tool = toolSchema.parse(frontmatter.tool);
    const { snapshot } = buildKnowledge([{ id: `tools/${slug}`, data: { ...frontmatter, tool }, body: content }], site);
    const doc = snapshot.documents[0];
    for (const field of ['setup', 'environment', 'languageNote', 'scope', 'costNote', 'license', 'findingNote']) assert.ok(doc.markdown.includes(markdownText(tool[field])), field);
    for (const source of tool.sources) assert.ok(doc.markdown.includes(source.url));
    assert.ok(doc.markdown.includes(`**Execution evidence:** ${slug === 'ruff' ? 'recorded' : 'not-recorded'}`));
    assert.ok(doc.markdown.includes(`**Documentation reviewed:** ${tool.verified}`));
    assert.ok(doc.sections.some(s => s.id === 'technical-details'));
    assert.ok(doc.sections.some(s => s.id === 'tool-sources'));
    if (slug === 'coverity-scan') {
      assert.ok(doc.markdown.includes('| Edition or use | Cost | Capabilities and limits |'));
      assert.ok(doc.markdown.includes('Commercial Coverity'));
      assert.ok(doc.markdown.includes(site + 'tools/coverity/'));
    }
  }
});

test('compact catalog filters locally and links to complete records with scope qualifiers', async () => {
  const entries = await Promise.all(['ruff', 'osv-scanner', 'coverity-scan'].map(async slug => {
    const { frontmatter, content } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
    return { id: `tools/${slug}`, body: content, data: { ...frontmatter, tool: toolSchema.parse(frontmatter.tool) } };
  }));
  const { files, snapshot } = buildKnowledge([...entries, entry], site);
  const catalog = JSON.parse(files.get('catalog.json'));
  assert.equal(catalog.revision, snapshot.revision);
  assert.equal(catalog.tools.length, 3);
  assert.deepEqual(catalog.tools.filter(t => t.languages.includes('Python') && t.inputTypes.includes('Source code') && t.cost.includes('Free')).map(t => t.id), ['tools/ruff']);
  const ruff = catalog.tools.find(t => t.id === 'tools/ruff');
  assert.ok(ruff.reviewedHostPlatforms.includes('Windows'));
  assert.ok(ruff.languageNote.includes('Python'));
  assert.ok(ruff.findingNote.includes('configuration'));
  for (const tool of catalog.tools) {
    const record = JSON.parse(files.get(tool.record));
    assert.equal(record.revision, tool.revision);
    assert.equal(files.get(tool.markdown), record.markdown);
    assert.equal('sections' in tool, false);
    assert.equal('analysisWorkflows' in tool, false);
  }
});

test('exports loader IDs, excludes drafts and error pages, and preserves commands and section nesting', () => {
  const { files, snapshot } = buildKnowledge([entry, { ...entry, id: 'draft', data: { ...entry.data, draft: true } }, { ...entry, id: '404' }], site);
  assert.deepEqual(snapshot.documents.map(d => d.id), ['guides/custom-slug']);
  const doc = snapshot.documents[0];
  assert.equal(doc.url, site + 'guides/custom-slug/');
  assert.ok(doc.markdown.includes('$Path = "../original/"'));
  assert.ok(doc.markdown.includes('https://example.com/ToolWiki/guides/other/'));
  assert.deepEqual(doc.sections.map(s => s.id), ['setup', 'detail', 'setup-1']);
  assert.ok(doc.markdown.slice(doc.sections[0].start, doc.sections[0].end).includes('Keep this caveat.'));
  assert.equal(files.has('documents/draft.json'), false);
  assert.equal(doc.evidence.execution.status, 'not-recorded');
  assert.equal(doc.evidence.documentationReviewedOn, null);
  assert.deepEqual(buildKnowledge([entry], site), { files, snapshot });
});

test('reference links are absolute while fenced literal Markdown stays unchanged', () => {
  const markdown = cleanMarkdown('[guide][g]\n\n[g]: ../target/#setup\n\n```md\n[local](../literal)\n```', site + 'guides/start/', 'Title');
  assert.ok(markdown.includes('[g]: https://example.com/ToolWiki/guides/target/#setup'));
  assert.ok(markdown.includes('[local](../literal)'));
});

test('the response bound includes both structured and text representations with JSON escaping', () => {
  const value = { markdown: 'a'.repeat(40000) };
  assert.ok(Buffer.byteLength(JSON.stringify(boundedToolResult(value))) < 120000);
  assert.throws(() => boundedToolResult({ markdown: '\\'.repeat(40000) }), /response exceeds/);
  assert.throws(() => boundedToolResult({ markdown: 'a'.repeat(60000) }), /response exceeds/);
});

test('validated snapshots reject corrupted content, duplicate identities and invalid section bounds', () => {
  const { snapshot } = buildKnowledge([entry], site);
  assert.equal(Object.isFrozen(validateSnapshot(snapshot).documents[0]), true);
  const corrupt = structuredClone(snapshot); corrupt.documents[0].markdown += 'changed';
  assert.throws(() => validateSnapshot(corrupt), /revision mismatch/);
  const duplicate = structuredClone(snapshot); duplicate.documents.push(duplicate.documents[0]); duplicate.revision = revisionOf(duplicate);
  assert.throws(() => validateSnapshot(duplicate), /Duplicate/);
  const bounds = structuredClone(snapshot); bounds.documents[0].sections[0].end = 999999; bounds.documents[0].revision = revisionOf(bounds.documents[0]); bounds.revision = revisionOf(bounds);
  assert.throws(() => validateSnapshot(bounds), /Invalid section/);
});

test('document pagination reassembles exactly and rejects bad IDs, sections and bounds', () => {
  const { snapshot } = buildKnowledge([{ ...entry, body: entry.body.repeat(20) }], site);
  const knowledge = createKnowledge(snapshot); let offset = 0, text = '';
  do { const result = knowledge.call('get_document', { id: entry.id, offset, maxChars: 1000 }); text += result.markdown; offset = result.nextOffset; } while (offset !== null);
  assert.equal(text, snapshot.documents[0].markdown);
  assert.throws(() => knowledge.call('get_document', { id: 'absent' }), /Unknown document/);
  assert.throws(() => knowledge.call('get_document', { id: entry.id, section: 'absent' }), /Unknown section/);
  assert.throws(() => knowledge.call('get_document', { id: entry.id, offset: 199999 }), /Offset exceeds/);
  assert.throws(() => knowledge.call('search_knowledge', { query: 'x'.repeat(301) }));
  assert.throws(() => knowledge.call('search_knowledge', { filters: { kind: 'unknown' } }));
  assert.throws(() => knowledge.call('search_knowledge', { unexpected: true }));
});
