import { z } from 'zod';
import { workflowSchema } from './system-schema.mjs';
import { INPUTS, COSTS, LICENSES, MODES, EDITION_GROUPS } from './tool-vocabulary.mjs';

const nonempty = z.array(z.string().min(1)).min(1);

// Only project-owned tool metadata is strict. Starlight owns the surrounding frontmatter.
export const toolSchema = z.object({
  cardRequirement: z.string().min(1).optional(),
  decision: z.object({
    useWhen: z.string().min(1),
    result: z.string().min(1),
    limit: z.string().min(1),
  }).optional(),
  analysisWorkflows: z.array(workflowSchema).default([]),
  aliases: z.array(z.string().trim().min(1)).default([]),
  searchTerms: z.array(z.string().trim().min(1)).default([]),
  modes: z.array(z.enum(MODES)).min(1),
  inputTypes: z.array(z.enum(INPUTS)).min(1),
  findings: nonempty,
  findingNote: z.string().min(1),
  environment: z.string().min(1),
  setup: z.string().min(1),
  techniques: nonempty,
  languages: nonempty,
  languageNote: z.string().min(1),
  targets: nonempty,
  licenseCategory: z.enum(LICENSES),
  license: z.string().min(1),
  cost: z.array(z.enum(COSTS)).min(1),
  costNote: z.string().min(1),
  editionGroup: z.enum(EDITION_GROUPS).optional(),
  website: z.url(),
  verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const date = new Date(value);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, 'Use a valid date in YYYY-MM-DD format.'),
  scope: z.string().min(1),
  sources: z.array(z.object({ label: z.string().min(1), url: z.url() })).min(1),
}).strict().superRefine((tool, ctx) => {
  const ids = new Set();
  for (const workflow of tool.analysisWorkflows) {
    if (ids.has(workflow.id)) ctx.addIssue({ code: 'custom', message: `Repeated workflow ID: ${workflow.id}` });
    ids.add(workflow.id);
    if (workflow.findings.some(f => !tool.findings.includes(f))) ctx.addIssue({ code: 'custom', message: 'Workflow findings must be documented in the tool profile.' });
    if (workflow.sources.some(url => !tool.sources.some(source => source.url === url))) ctx.addIssue({ code: 'custom', message: 'Workflow evidence must reference the tool sources.' });
  }
});
