import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

const nonempty = z.array(z.string().min(1)).min(1);
const tool = z.object({
  modes: z.array(z.enum(['Static', 'Dynamic'])).min(1),
  inputTypes: z.array(z.enum(['Source code', 'Binaries', 'Dependency metadata', 'Running applications', 'Callable code', 'Executable models', 'Execution traces'])).min(1),
  findings: nonempty,
  findingNote: z.string().min(1),
  environment: z.string().min(1),
  setup: z.string().min(1),
  techniques: nonempty,
  languages: nonempty,
  languageNote: z.string().min(1),
  targets: nonempty,
  licenseCategory: z.enum(['Open source', 'Proprietary']),
  license: z.string().min(1),
  cost: z.array(z.enum(['Free', 'Free with limits', 'Paid'])).min(1),
  costNote: z.string().min(1),
  editionGroup: z.enum(['codeql', 'sonarqube', 'semgrep', 'burp', 'cppcheck', 'pvs-studio', 'phpstan']).optional(),
  website: z.url(),
  verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const date = new Date(value);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, 'Use a valid date in YYYY-MM-DD format.'),
  scope: z.string().min(1),
  sources: z.array(z.object({ label: z.string().min(1), url: z.url() })).min(1),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: z.object({ tool: tool.optional(), catalog: z.boolean().default(false), comparison: z.boolean().default(false), catalogMode: z.enum(['Static', 'Dynamic']).optional() }) }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
