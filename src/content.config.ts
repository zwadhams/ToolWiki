import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { toolSchema } from './lib/tool-schema.mjs';
import { withToolInventory } from './lib/tool-inventory.mjs';

export const collections = {
  docs: defineCollection({
    loader: withToolInventory(docsLoader()),
    schema: docsSchema({ extend: z.object({ tool: toolSchema.optional(), executionEvidence: z.object({ status: z.literal('recorded'), scope: z.string().min(1), sources: z.array(z.url()).min(1) }).strict().optional(), dataAccess: z.boolean().default(false), catalog: z.boolean().default(false), comparison: z.boolean().default(false), systemBuilder: z.boolean().default(false), catalogMode: z.enum(['Static', 'Dynamic']).optional() }) }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
