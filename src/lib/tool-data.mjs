/** @typedef {NonNullable<import('astro:content').CollectionEntry<'docs'>['data']['tool']> & { id: string, title: string, description: string }} ToolData */

/** Markdown metadata remains authoritative; each browser gets only what it uses.
 * @param {import('astro:content').CollectionEntry<'docs'>[]} entries
 * @returns {ToolData[]}
 */
export function publishedTools(entries) {
  return entries.flatMap(({ id, data }) => data.tool && !data.draft
    ? [{ id, title: data.title, description: data.description || '', ...data.tool }] : [])
    .sort((a, b) => a.title.localeCompare(b.title, 'en'));
}

/** @template {object} T @template {keyof T} K @param {T} tool @param {K[]} fields @returns {Pick<T, K>} */
const pick = (tool, fields) => /** @type {Pick<T, K>} */ (Object.fromEntries(fields.filter(key => tool[key] !== undefined).map(key => [key, tool[key]])));

/** @param {ToolData[]} tools */
export function catalogTools(tools) {
  return tools.map(tool => pick(tool, ['id', 'title', 'description', 'aliases', 'searchTerms', 'modes', 'inputTypes', 'findings', 'techniques', 'languages', 'targets', 'licenseCategory', 'cost', 'verified']));
}

/** @param {ToolData[]} tools */
export function comparisonTools(tools) {
  return tools.map(tool => ({
    ...pick(tool, ['id', 'title', 'setup', 'environment', 'cost', 'modes', 'inputTypes', 'languages', 'languageNote', 'techniques', 'costNote', 'license', 'scope', 'verified', 'sources']),
    useWhen: tool.decision?.useWhen || tool.description,
    result: tool.decision?.result || tool.findings,
    limit: tool.decision?.limit || tool.findingNote,
  }));
}

/** @param {ToolData[]} tools */
export function builderData(tools) {
  return {
    tools: tools.filter(tool => tool.analysisWorkflows.length).map(tool => ({
      ...pick(tool, ['id', 'title', 'description', 'setup', 'environment', 'scope', 'cost', 'costNote', 'licenseCategory', 'verified', 'analysisWorkflows']),
      ...(tool.decision ? { decision: { useWhen: tool.decision.useWhen } } : {}),
    })),
    languages: [...new Set(tools.flatMap(tool => tool.languages))].filter(language => language !== 'Language independent').sort(),
    totalTools: tools.length,
  };
}
