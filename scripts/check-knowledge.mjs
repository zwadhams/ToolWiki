import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parseFrontmatter } from 'astro/markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { loadKnowledge } from '../mcp/knowledge.mjs';
import { manifestSchema } from '../src/lib/knowledge-schema.mjs';
import { readDocumentationSources } from '../src/lib/tool-inventory.mjs';
import { sha256 } from '../src/lib/knowledge-format.mjs';

const base = path.resolve('dist/knowledge/v1');
const manifest = manifestSchema.parse(JSON.parse(await readFile(path.join(base, 'manifest.json'), 'utf8')));
const snapshot = await loadKnowledge(path.join(base, 'manifest.json'));
const inventory = JSON.parse(await readFile('.astro/tool-profile-inventory.json', 'utf8'));
const current = await readDocumentationSources(path.resolve('.'));
assert.deepEqual(current.map(({ filePath, digest }) => ({ filePath, digest })), inventory.sources, 'Sources changed since the build');
const sourceMap = new Map(current.filter(s => !s.data.draft && s.relativePath !== '404.md').map(s => [s.filePath, s]));
assert.deepEqual([...sourceMap.keys()].sort(), inventory.documents.map(d => d.filePath).sort(), 'Loaded IDs must cover every published source');
assert.deepEqual(snapshot.documents.map(d => d.id), inventory.documents.map(d => d.id), 'Export inventory must match loader-resolved IDs');
const files = new Set();
for (const file of manifest.files) {
  assert.match(file.path, /^(?:index\.json|snapshots\/[a-f0-9]{64}\.json|documents\/[a-z0-9/_-]+\.(?:json|md))$/);
  assert.ok(!files.has(file.path), `Duplicate export path ${file.path}`); files.add(file.path);
  const bytes = await readFile(path.join(base, file.path));
  assert.equal(bytes.length, file.bytes); assert.equal(sha256(bytes), file.sha256);
}
assert.equal(files.size, 2 + snapshot.documents.length * 2);
const index = JSON.parse(await readFile(path.join(base, 'index.json'), 'utf8'));
assert.equal(index.revision, snapshot.revision);
assert.deepEqual(index.documents.map(d => d.id), snapshot.documents.map(d => d.id));
const parser = unified().use(remarkParse).use(remarkGfm);
const code = text => { const blocks = []; visit(parser.parse(text), 'code', node => { blocks.push({ lang: node.lang, value: node.value }); }); return blocks; };
const semanticText = (text, exported = false) => {
  const tree = parser.parse(text), values = [];
  if (exported) tree.children.shift(); // The export adds the page's frontmatter title.
  visit(tree, node => { if (['text', 'inlineCode', 'code', 'html'].includes(node.type)) values.push({ type: node.type, value: node.type === 'text' ? node.value.replace(/\s+/g, ' ') : node.value }); });
  return values;
};
let sections = 0, codeBlocks = 0;
for (const doc of snapshot.documents) {
  const source = sourceMap.get(inventory.documents.find(entry => entry.id === doc.id).filePath);
  const raw = parseFrontmatter(await readFile(source.filePath, 'utf8')).content.replaceAll('\r\n', '\n');
  assert.deepEqual(code(doc.markdown), code(raw), `Changed fenced code in ${doc.id}`);
  assert.deepEqual(semanticText(doc.markdown, true), semanticText(raw), `Changed prose or caveats in ${doc.id}`);
  codeBlocks += code(raw).length;
  assert.deepEqual(JSON.parse(await readFile(path.join(base, `documents/${doc.id}.json`), 'utf8')), doc);
  assert.equal(await readFile(path.join(base, `documents/${doc.id}.md`), 'utf8'), doc.markdown);
  const page = path.resolve('dist', doc.id === 'index' ? 'index.html' : `${doc.id}/index.html`);
  const html = await readFile(page, 'utf8');
  assert.ok(html.includes(`href="${doc.url}"`), `Canonical URL mismatch for ${doc.id}`);
  for (const section of doc.sections) { assert.ok(html.includes(`id="${section.id}"`), `Missing website anchor ${doc.id}#${section.id}`); sections++; }
  const links = [];
  visit(parser.parse(doc.markdown), node => {
    if (!['link', 'image', 'definition'].includes(node.type)) return;
    const url = new URL(node.url);
    if (url.href.startsWith(snapshot.site)) links.push(url);
  });
  for (const url of links) {
    const relative = decodeURIComponent(url.pathname.slice(new URL(snapshot.site).pathname.length));
    let target = path.resolve('dist', relative);
    assert.ok(target.startsWith(path.resolve('dist') + path.sep) || target === path.resolve('dist'));
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    await stat(target);
    if (url.hash && target.endsWith('.html')) assert.ok((await readFile(target, 'utf8')).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Broken exported anchor ${url}`);
  }
  assert.equal(doc.evidence.documentationReviewedOn, source.data.tool?.verified || null);
  if (source.data.executionEvidence) assert.deepEqual(doc.evidence.execution, source.data.executionEvidence);
  else assert.equal(doc.evidence.execution.status, 'not-recorded');
}
console.log(`Verified ${snapshot.documents.length} exported documents, ${sections} website anchors, ${codeBlocks} unchanged code blocks, all files and links. Snapshot ${snapshot.revision}`);
