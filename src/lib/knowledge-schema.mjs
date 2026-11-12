import { z } from 'zod';
import { toolSchema } from './tool-schema.mjs';
import { PLATFORMS } from './system-schema.mjs';

export const hashSchema = z.string().regex(/^[a-f0-9]{64}$/);
export const idSchema = z.string().regex(/^[a-z0-9][a-z0-9/_-]*$/).max(200);
export const evidenceSchema = z.object({
  documentationReviewedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  execution: z.object({
    status: z.enum(['recorded', 'not-recorded']),
    scope: z.string(),
    sources: z.array(z.url()),
  }).strict(),
}).strict();
export const documentSchema = z.object({
  id: idSchema, kind: z.enum(['tool', 'guide', 'concept', 'research', 'page']),
  title: z.string().min(1), description: z.string(), url: z.url(), revision: hashSchema,
  markdown: z.string().max(200000),
  sections: z.array(z.object({ id: z.string(), title: z.string(), depth: z.number().int().min(1).max(6), start: z.number().int().nonnegative(), end: z.number().int().nonnegative() }).strict()),
  sources: z.array(z.object({ label: z.string(), url: z.url() }).strict()),
  evidence: evidenceSchema, tool: toolSchema.optional(),
}).strict();
export const snapshotSchema = z.object({
  version: z.literal(1), revision: hashSchema, site: z.url(),
  documents: z.array(documentSchema).min(1).max(2000),
}).strict();
export const manifestSchema = z.object({
  version: z.literal(1), revision: hashSchema, documentCount: z.number().int().positive(),
  snapshot: z.object({ path: z.string().regex(/^snapshots\/[a-f0-9]{64}\.json$/), sha256: hashSchema, bytes: z.number().int().positive() }).strict(),
  files: z.array(z.object({ path: z.string(), sha256: hashSchema, bytes: z.number().int().positive() }).strict()),
}).strict();

export const catalogToolSchema = z.object({
  id: idSchema, title: z.string().min(1), description: z.string(), url: z.url(), revision: hashSchema,
  evidence: evidenceSchema,
  record: z.string().regex(/^documents\/[a-z0-9/_-]+\.json$/),
  markdown: z.string().regex(/^documents\/[a-z0-9/_-]+\.md$/),
  ...Object.fromEntries([
    'aliases', 'searchTerms', 'modes', 'inputTypes', 'findings', 'findingNote',
    'techniques', 'languages', 'languageNote', 'targets', 'licenseCategory',
    'cost', 'costNote', 'environment', 'scope',
  ].map(key => [key, toolSchema.shape[key]])),
  reviewedHostPlatforms: z.array(z.enum(PLATFORMS)),
  reviewedTargetPlatforms: z.array(z.enum(PLATFORMS)),
}).strict();
export const catalogSchema = z.object({
  version: z.literal(1), revision: hashSchema, tools: z.array(catalogToolSchema),
}).strict();

export const indexDocumentSchema = documentSchema.omit({ markdown: true, tool: true, sources: true, sections: true }).extend({
  sections: z.array(documentSchema.shape.sections.element.omit({ start: true, end: true })),
  record: catalogToolSchema.shape.record, markdown: catalogToolSchema.shape.markdown,
}).strict();
export const indexSchema = z.object({
  version: z.literal(1), revision: hashSchema, documents: z.array(indexDocumentSchema),
}).strict();
export const citationSchema = documentSchema.pick({ id: true, title: true, url: true, revision: true, evidence: true });
