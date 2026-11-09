import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { manifestSchema, snapshotSchema, idSchema } from '../src/lib/knowledge-schema.mjs';
import { sha256, revisionOf } from '../src/lib/knowledge-format.mjs';
import { profileSchema } from '../src/lib/system-schema.mjs';
import { analyzeSystem } from '../src/lib/system-builder.mjs';
import { comparisonTools } from '../src/lib/tool-data.mjs';

const MAX_BYTES = 16 * 1024 * 1024;
async function boundedRead(location) {
  if (/^https?:/.test(location)) {
    const url = new URL(location);
    if (url.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) throw new Error('Remote exports require HTTPS.');
    const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'error' });
    if (!response.ok) throw new Error(`Knowledge fetch failed: HTTP ${response.status}`);
    const chunks = []; let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > MAX_BYTES) throw new Error('Knowledge file exceeds 16 MiB.');
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  if ((await stat(location)).size > MAX_BYTES) throw new Error('Knowledge file exceeds 16 MiB.');
  const bytes = await readFile(location);
  if (bytes.length > MAX_BYTES) throw new Error('Knowledge file exceeds 16 MiB.');
  return bytes;
}
function freeze(value) {
  if (value && typeof value === 'object') { Object.freeze(value); Object.values(value).forEach(freeze); }
  return value;
}
export function validateSnapshot(raw) {
  const snapshot = snapshotSchema.parse(raw);
  if (revisionOf(snapshot) !== snapshot.revision) throw new Error('Snapshot revision mismatch.');
  const ids = new Set(), urls = new Set();
  for (const doc of snapshot.documents) {
    if (ids.has(doc.id) || urls.has(doc.url)) throw new Error('Duplicate document identity.');
    ids.add(doc.id); urls.add(doc.url);
    if (!doc.url.startsWith(snapshot.site) || revisionOf(doc) !== doc.revision) throw new Error(`Document integrity mismatch: ${doc.id}`);
    const sections = new Set();
    for (const section of doc.sections) {
      if (!section.id || sections.has(section.id) || section.start >= section.end || section.end > doc.markdown.length) throw new Error(`Invalid section: ${doc.id}`);
      sections.add(section.id);
    }
    if (doc.evidence.execution.status === 'recorded' && !doc.evidence.execution.sources.length) throw new Error(`Missing execution source: ${doc.id}`);
  }
  return freeze(snapshot);
}
export async function loadKnowledge(manifestLocation) {
  const manifest = manifestSchema.parse(JSON.parse((await boundedRead(manifestLocation)).toString('utf8')));
  const location = /^https?:/.test(manifestLocation) ? new URL(manifest.snapshot.path, manifestLocation).href : path.resolve(path.dirname(manifestLocation), manifest.snapshot.path);
  const bytes = await boundedRead(location);
  if (bytes.length !== manifest.snapshot.bytes || sha256(bytes) !== manifest.snapshot.sha256) throw new Error('Snapshot bytes do not match the manifest. Rebuild or retry after deployment.');
  const snapshot = validateSnapshot(JSON.parse(bytes.toString('utf8')));
  if (snapshot.revision !== manifest.revision || snapshot.documents.length !== manifest.documentCount) throw new Error('Manifest and snapshot disagree.');
  return snapshot;
}

export function createKnowledge(snapshot) {
  snapshot = validateSnapshot(snapshot);
  const documents = new Map(snapshot.documents.map(d => [d.id, d]));
  const tools = snapshot.documents.filter(d => d.tool).map(d => ({ id: d.id, title: d.title, description: d.description, ...d.tool }));
  const enumValues = field => [...new Set(tools.flatMap(t => t[field]))].sort();
  const filterSchema = z.object({
    kind: z.enum(['tool', 'guide', 'concept', 'research', 'page']).optional(),
    language: z.enum(enumValues('languages')).optional(), input: z.enum(enumValues('inputTypes')).optional(),
    mode: z.enum(enumValues('modes')).optional(), finding: z.enum(enumValues('findings')).optional(),
  }).strict();
  const schemas = {
    search_knowledge: z.object({ query: z.string().trim().max(300).default(''), filters: filterSchema.default({}), offset: z.number().int().min(0).max(2000).default(0), limit: z.number().int().min(1).max(20).default(8) }).strict(),
    get_document: z.object({ id: idSchema, section: z.string().max(200).optional(), offset: z.number().int().min(0).max(200000).default(0), maxChars: z.number().int().min(1000).max(40000).default(20000) }).strict(),
    compare_tools: z.object({ ids: z.array(idSchema).min(2).max(4).refine(ids => new Set(ids).size === ids.length, 'Use distinct tool IDs.') }).strict(),
    recommend_checks: z.object({ profile: profileSchema, subjectId: z.string().max(80).optional(), offset: z.number().int().min(0).max(20000).default(0), limit: z.number().int().min(1).max(20).default(10) }).strict(),
  };
  const citation = doc => ({ id: doc.id, title: doc.title, url: doc.url, revision: doc.revision, evidence: doc.evidence });
  const lookup = id => { const doc = documents.get(id); if (!doc) throw new Error(`Unknown document ID: ${id}. Use search_knowledge.`); return doc; };
  const handlers = {
    search_knowledge({ query, filters, offset, limit }) {
      const terms = query.toLowerCase().match(/[a-z0-9+#.]+/g) || [];
      const matches = snapshot.documents.flatMap(doc => {
        if (filters.kind && doc.kind !== filters.kind) return [];
        for (const [key, field] of [['language', 'languages'], ['input', 'inputTypes'], ['mode', 'modes'], ['finding', 'findings']]) if (filters[key] && !doc.tool?.[field]?.includes(filters[key])) return [];
        const title = `${doc.title} ${doc.id} ${(doc.tool?.aliases || []).join(' ')}`.toLowerCase();
        const summary = `${doc.description} ${(doc.tool?.searchTerms || []).join(' ')}`.toLowerCase();
        const body = doc.markdown.toLowerCase();
        if (!terms.every(term => title.includes(term) || summary.includes(term) || body.includes(term))) return [];
        return [{ doc, score: terms.reduce((s, term) => s + (title.includes(term) ? 10 : summary.includes(term) ? 4 : 1), 0) }];
      }).sort((a, b) => b.score - a.score || a.doc.id.localeCompare(b.doc.id, 'en'));
      return { total: matches.length, nextOffset: offset + limit < matches.length ? offset + limit : null, results: matches.slice(offset, offset + limit).map(({ doc }) => ({ ...citation(doc), kind: doc.kind, description: doc.description, sections: doc.sections.slice(0, 20).map(({ id, title }) => ({ id, title })) })) };
    },
    get_document({ id, section, offset, maxChars }) {
      const doc = lookup(id), selected = section === undefined ? null : doc.sections.find(s => s.id === section);
      if (section !== undefined && !selected) throw new Error(`Unknown section. Available: ${doc.sections.map(s => s.id).join(', ')}`);
      const markdown = selected ? doc.markdown.slice(selected.start, selected.end) : doc.markdown;
      if (offset > markdown.length) throw new Error('Offset exceeds document or section length.');
      return { ...citation(doc), section: section ?? null, sections: doc.sections.map(({ start, end, ...s }) => s), sources: doc.sources, totalChars: markdown.length, offset, nextOffset: offset + maxChars < markdown.length ? offset + maxChars : null, markdown: markdown.slice(offset, offset + maxChars) };
    },
    compare_tools({ ids }) {
      const selected = ids.map(id => { const doc = lookup(id); if (!doc.tool) throw new Error(`${id} is not a tool profile.`); return tools.find(t => t.id === id); });
      return { tools: comparisonTools(selected).map(tool => ({ ...tool, citation: citation(lookup(tool.id)) })), limitation: 'Documentation comparison, not a benchmark or execution guarantee.' };
    },
    recommend_checks({ profile, subjectId, offset, limit }) {
      const result = analyzeSystem(profile, tools);
      if (subjectId && !result.subjects.some(s => s.subjectId === subjectId)) throw new Error('Unknown or excluded subjectId.');
      const matches = result.matches.filter(m => !subjectId || m.subjectId === subjectId);
      return { total: matches.length, nextOffset: offset + limit < matches.length ? offset + limit : null, subjects: result.subjects.filter(s => !subjectId || s.subjectId === subjectId).map(({ candidates, ...s }) => s), gaps: result.gaps.filter(g => !subjectId || g.subjectId === subjectId).map(g => ({ ...g, reasons: g.reasons.slice(0, 20), totalReasons: g.reasons.length })), matches: matches.slice(offset, offset + limit).map(match => ({ ...match, citation: citation(lookup(match.toolId)) })), limitation: 'Candidates require checking the documented prerequisites and platform scope; unknown details are not confirmed support.' };
    },
  };
  function call(name, input) {
    if (!schemas[name]) throw new Error(`Unknown knowledge tool: ${name}`);
    const result = { snapshotRevision: snapshot.revision, ...handlers[name](schemas[name].parse(input)) };
    if (Buffer.byteLength(JSON.stringify(result)) > 120000) throw new Error('Result exceeds response limit. Narrow the request or reduce limit/maxChars.');
    return result;
  }
  return { snapshot, schemas, call };
}
