/** @typedef {{id: string, title: string, description: string, modes: string[], inputTypes: string[], findings: string[], techniques: string[], languages: string[], targets: string[], licenseCategory: string, cost: string[], costNote: string, verified: string}} Tool */
/** @typedef {{q?: string, mode?: string, finding?: string, input?: string, language?: string, technique?: string, license?: string, cost?: string, sort?: string}} Filters */

/** @param {Tool[]} tools @param {Filters} filters */
export function selectTools(tools, filters = {}) {
  const words = (filters.q || '').trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
  const result = tools.filter((tool) => {
    const haystack = [tool.title, tool.description, ...tool.modes, ...tool.inputTypes, ...tool.findings, ...tool.techniques, ...tool.languages, ...tool.targets, tool.licenseCategory, ...tool.cost, tool.costNote].join(' ').toLocaleLowerCase('en');
    return words.every((word) => haystack.includes(word))
      && (!filters.mode || tool.modes.includes(filters.mode))
      && (!filters.input || tool.inputTypes.includes(filters.input))
      && (!filters.finding || tool.findings.includes(filters.finding))
      && (!filters.language || tool.languages.includes(filters.language))
      && (!filters.technique || tool.techniques.includes(filters.technique))
      && (!filters.license || tool.licenseCategory === filters.license)
      && (!filters.cost || (filters.cost === 'any-free'
        ? tool.cost.some((cost) => cost === 'Free' || cost === 'Free with limits')
        : tool.cost.includes(filters.cost)));
  });
  const byName = (/** @type {Tool} */ a, /** @type {Tool} */ b) => a.title.localeCompare(b.title, 'en');
  return result.sort((a, b) => filters.sort === 'za' ? byName(b, a)
    : filters.sort === 'verified' ? b.verified.localeCompare(a.verified) || byName(a, b) : byName(a, b));
}
