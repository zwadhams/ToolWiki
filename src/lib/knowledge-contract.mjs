import { z } from 'zod';
import { manifestSchema, indexSchema, documentSchema, snapshotSchema, catalogSchema } from './knowledge-schema.mjs';
import { toolSchema } from './tool-schema.mjs';
import { profileSchema, COMPONENT_TYPES, PLATFORMS, FORMATS, TECHNOLOGIES, INTERFACES, TRANSPORTS, ACCESS } from './system-schema.mjs';
import { catalogResultSchema, recommendationReportSchema } from './result-schema.mjs';
import { INPUTS, COSTS, LICENSES, MODES } from './tool-vocabulary.mjs';
import { SCHEMA_NAMES } from './knowledge-paths.mjs';
import { json } from './knowledge-format.mjs';

export const PUBLIC_SCHEMAS = {
  manifest: { schema: manifestSchema, title: 'Knowledge manifest', description: 'Current snapshot pointer, document count, file checksums and byte counts.' },
  index: { schema: indexSchema, title: 'Document index', description: 'Document discovery entries, section names, and paths relative to the manifest.' },
  document: { schema: documentSchema, title: 'Document record', description: 'Complete Markdown, sections, sources, evidence and optional tool metadata.' },
  tool: { schema: toolSchema, title: 'Tool metadata', description: 'The tool property inside a document, including scoped analysis workflows.' },
  snapshot: { schema: snapshotSchema, title: 'Knowledge snapshot', description: 'All documents from one content revision.' },
  catalog: { schema: catalogSchema, title: 'Compact tool catalog', description: 'Tool discovery fields and links to complete records.' },
  'system-profile': { schema: profileSchema, io: 'input', title: 'Saved system profile', description: 'Input for the system builder. Optional goals default to empty arrays and do not filter matches.' },
  'catalog-results': { schema: catalogResultSchema, title: 'Filtered catalog results', description: 'Browser download containing filters, ordered tool records and source revisions.' },
  recommendations: { schema: recommendationReportSchema, title: 'Recommendation report', description: 'System input, selected tools, match explanations, gaps, workflow metadata and citations.' },
};

export function buildContract(snapshot) {
  const files = new Map();
  const schemas = SCHEMA_NAMES.map(name => {
    const { schema, title, description, io } = PUBLIC_SCHEMAS[name];
    const path = `schemas/${name}.schema.json`;
    const generated = z.toJSONSchema(schema, { target: 'draft-2020-12', io: io || 'output' });
    files.set(path, json({ ...generated, $id: new URL(`knowledge/v1/${path}`, snapshot.site).href, title, description,
      $comment: 'Structural validation only. Hash integrity, cross-record references and workflow scope invariants are checked separately; see the ToolWiki data reference.' }));
    return { name, title, description, path };
  });
  files.set('schemas/index.json', json({ version: 1, dialect: 'https://json-schema.org/draft/2020-12/schema', schemas }));
  const tools = snapshot.documents.filter(doc => doc.tool).map(doc => doc.tool);
  const values = key => [...new Set(tools.flatMap(tool => tool[key]))].sort();
  files.set('vocabulary.json', json({
    version: 1, snapshotRevision: snapshot.revision,
    documentKinds: ['tool', 'guide', 'concept', 'research', 'page'],
    catalog: { mode: [...MODES], input: [...INPUTS], language: values('languages'), finding: values('findings'), technique: values('techniques'), license: [...LICENSES], cost: [...COSTS] },
    filterSentinels: { all: '', anyFreeCost: 'any-free', sort: ['relevance', 'az', 'za', 'verified'] },
    system: { componentTypes: COMPONENT_TYPES, platforms: PLATFORMS, binaryFormats: FORMATS, technologies: TECHNOLOGIES, interfaces: INTERFACES, transports: TRANSPORTS, access: ACCESS, accessAnswers: ['unknown', 'yes', 'no'] },
    evidence: { executionStatus: ['recorded', 'not-recorded'] },
    recommendationStatus: ['candidate', 'details', 'blocked', 'gap'],
  }));
  return files;
}
