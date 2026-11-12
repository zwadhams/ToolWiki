import { catalogSchema } from './knowledge-schema.mjs';

export const CATALOG_FIELDS = [
  'aliases', 'searchTerms', 'modes', 'inputTypes', 'findings', 'findingNote',
  'techniques', 'languages', 'languageNote', 'targets', 'licenseCategory',
  'cost', 'costNote', 'environment', 'scope',
];

/** A small discovery record; fetch the full record before selecting a workflow. */
export function buildCatalog(snapshot) {
  const tools = snapshot.documents.filter(doc => doc.tool).map(doc => {
    const { id, title, description, url, revision, evidence, tool } = doc;
    const platforms = key => [...new Set(tool.analysisWorkflows.flatMap(workflow => workflow[key]))].sort();
    return {
      id, title, description, url, revision, evidence,
      record: `documents/${id}.json`, markdown: `documents/${id}.md`,
      ...Object.fromEntries(CATALOG_FIELDS.map(key => [key, tool[key]])),
      reviewedHostPlatforms: platforms('hostPlatforms'),
      reviewedTargetPlatforms: platforms('targetPlatforms'),
    };
  });
  return catalogSchema.parse({ version: 1, revision: snapshot.revision, tools });
}
