import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import { documentSchema, snapshotSchema, indexSchema } from './knowledge-schema.mjs';
import { json, sha256, revisionOf } from './knowledge-format.mjs';
import { profileMarkdown, evidenceMarkdown } from './knowledge-markdown.mjs';
import { buildCatalog } from './catalog-export.mjs';
import { buildContract } from './knowledge-contract.mjs';
import { staticComparisonMarkdown } from './static-comparison.mjs';

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkStringify, { fences: true, bullet: '-' });
const nodeText = node => node.value ?? (node.children || []).map(nodeText).join('');

/** Parse Markdown so rewriting links never alters a fenced command or sample. */
export function cleanMarkdown(body, url, title) {
  const tree = processor.parse(body.replaceAll('\r\n', '\n'));
  visit(tree, node => {
    if (['link', 'image', 'definition'].includes(node.type)) node.url = new URL(node.url, url).href;
  });
  return `# ${title}\n\n${processor.stringify(tree)}`;
}

export function sectionsOf(markdown, aliases = {}) {
  const tree = processor.parse(markdown), slugger = new GithubSlugger(), headings = [];
  visit(tree, 'heading', node => {
    // The page title is not a Starlight content anchor.
    if (node.position.start.offset === 0) return;
    const title = nodeText(node);
    const slug = slugger.slug(title);
    headings.push({ id: aliases[slug] || slug, title, depth: node.depth, start: node.position.start.offset, end: markdown.length });
  });
  for (let i = 0; i < headings.length; i++) {
    const next = headings.slice(i + 1).find(h => h.depth <= headings[i].depth);
    if (next) headings[i].end = next.start;
  }
  return headings;
}

export function exportDocument(entry, site, entries = []) {
  const { id, data } = entry;
  const url = new URL(`${id === 'index' ? '' : id + '/'}`, site).href;
  const evidence = {
    documentationReviewedOn: data.tool?.verified || null,
    execution: data.executionEvidence || { status: 'not-recorded', scope: 'No structured execution record for this document. Read the text for illustrative examples and limitations.', sources: [] },
  };
  const markdown = cleanMarkdown(entry.body || '', url, data.title)
    + staticComparisonMarkdown(data.staticComparison, entries, site)
    + profileMarkdown(data.tool, site, data.description || '')
    + evidenceMarkdown(evidence, url, new URL(`knowledge/v1/documents/${id}.json`, site).href);
  const sources = new Map((data.tool?.sources || []).map(source => [source.url, source]));
  visit(processor.parse(markdown), node => {
    if (['link', 'definition'].includes(node.type) && /^https?:/.test(node.url) && !sources.has(node.url)) sources.set(node.url, { label: nodeText(node) || node.url, url: node.url });
  });
  const document = {
    id, kind: data.tool ? 'tool' : id.startsWith('guides/') ? 'guide' : id.startsWith('concepts/') ? 'concept' : id === 'research' || id.startsWith('research/') ? 'research' : 'page',
    title: data.title, description: data.description || '', url, markdown,
    sections: sectionsOf(markdown, data.tool ? { 'compatibility-and-scope': 'technical-details', 'sources-and-evidence': 'tool-sources' } : {}),
    sources: [...sources.values()], evidence,
    ...(data.tool ? { tool: data.tool } : {}),
  };
  return documentSchema.parse({ ...document, revision: revisionOf(document) });
}

export function buildKnowledge(entries, site) {
  const documents = entries.filter(entry => !entry.data.draft && entry.id !== '404').map(entry => exportDocument(entry, site, entries)).sort((a, b) => a.id.localeCompare(b.id, 'en'));
  if (new Set(documents.map(d => d.id)).size !== documents.length) throw new Error('Duplicate knowledge ID');
  const payload = { version: 1, site, documents };
  const snapshot = snapshotSchema.parse({ ...payload, revision: revisionOf(payload) });
  const files = buildContract(snapshot);
  const index = documents.map(({ markdown, tool, sections, sources, ...doc }) => ({ ...doc, sections: sections.map(({ start, end, ...section }) => section), record: `documents/${doc.id}.json`, markdown: `documents/${doc.id}.md` }));
  files.set('index.json', json(indexSchema.parse({ version: 1, revision: snapshot.revision, documents: index })));
  files.set('catalog.json', json(buildCatalog(snapshot)));
  for (const document of documents) {
    files.set(`documents/${document.id}.json`, json(document));
    files.set(`documents/${document.id}.md`, document.markdown);
  }
  const snapshotPath = `snapshots/${snapshot.revision}.json`;
  files.set(snapshotPath, json(snapshot));
  const inventory = [...files].map(([path, content]) => ({ path, sha256: sha256(content), bytes: Buffer.byteLength(content) }));
  files.set('manifest.json', json({ version: 1, revision: snapshot.revision, documentCount: documents.length, snapshot: inventory.find(file => file.path === snapshotPath), files: inventory }));
  return { files, snapshot };
}
