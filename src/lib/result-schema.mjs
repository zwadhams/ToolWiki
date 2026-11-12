import { z } from 'zod';
import { catalogToolSchema, citationSchema, hashSchema, idSchema } from './knowledge-schema.mjs';
import { toolSchema } from './tool-schema.mjs';
import { profileSchema, workflowSchema } from './system-schema.mjs';

export const catalogResultSchema = z.object({
  version: z.literal(1), kind: z.literal('catalog-results'), snapshotRevision: hashSchema,
  sourceUrl: z.url(), knowledgeBase: z.url(),
  filters: z.object(Object.fromEntries(['q', 'finding', 'input', 'language', 'technique', 'license', 'cost', 'sort', 'mode'].map(key => [key, z.string().optional()]))).strict(),
  count: z.number().int().nonnegative(), tools: z.array(catalogToolSchema),
}).strict();

const strings = z.array(z.string());
const subjectIdentity = { subjectId: z.string(), subjectType: z.enum(['component', 'connection']) };
export const matchSchema = z.object({
  ...subjectIdentity, toolId: idSchema, workflowId: z.string(), goalIds: strings, findings: strings,
  reasons: strings, unresolved: strings, blocked: strings,
  questions: z.array(z.object({ field: z.string(), message: z.string(), kind: z.enum(['answer', 'compatibility']) }).strict()),
  status: z.enum(['candidate', 'details', 'blocked']),
}).strict();
export const analysisResultSchema = z.object({
  matches: z.array(matchSchema),
  gaps: z.array(z.object({ ...subjectIdentity, status: z.enum(['candidate', 'details', 'blocked', 'gap']), reasons: strings }).strict()),
  subjects: z.array(z.object({
    ...subjectIdentity, name: z.string(), needsDescription: z.boolean(),
    candidates: z.array(z.object({ toolId: idSchema, status: z.enum(['candidate', 'details']), matches: z.array(matchSchema) }).strict()),
  }).strict()),
}).strict();
const reportToolSchema = z.object({
  id: idSchema, title: z.string(), description: z.string(), citation: citationSchema,
  ...Object.fromEntries(['setup', 'environment', 'scope', 'cost', 'costNote', 'licenseCategory', 'verified'].map(key => [key, toolSchema.shape[key]])),
  analysisWorkflows: z.array(workflowSchema),
  decision: z.object({ useWhen: z.string() }).optional(),
});
export const recommendationReportSchema = z.object({
  version: z.literal(1), kind: z.literal('recommendations'), snapshotRevision: hashSchema,
  sourceUrl: z.url(), limitation: z.string(), profile: profileSchema,
  selectedToolIds: z.array(idSchema), results: analysisResultSchema, tools: z.array(reportToolSchema),
}).strict();
