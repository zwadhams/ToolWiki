/** @typedef {{id: string, title: string, description: string, aliases?: string[], searchTerms?: string[], modes: string[], inputTypes: string[], findings: string[], techniques: string[], languages: string[], targets: string[], licenseCategory: string, cost: string[], costNote: string, verified: string}} Tool */
/** @typedef {{q?: string, mode?: string, finding?: string, input?: string, language?: string, technique?: string, license?: string, cost?: string, sort?: string}} Filters */

const synonyms = new Map([
  ['js', 'javascript'], ['ts', 'typescript'], ['py', 'python'], ['golang', 'go'],
  ['fuzzer', 'fuzzing'], ['fuzzers', 'fuzzing'], ['linter', 'linting'], ['linters', 'linting'],
  ['checker', 'checking'], ['checkers', 'checking'], ['races', 'race'], ['conditions', 'condition'],
]);

/** Preserve language distinctions before treating punctuation as word separators. @param {string} value */
export function normalizeSearch(value) {
  return value.toLocaleLowerCase('en')
    .replace(/\bc\s*\+\s*\+/g, ' cpp ')
    .replace(/\bc\s*#/g, ' csharp ')
    .replace(/\bc\s+plus\s+plus\b/g, ' cpp ')
    .replace(/\bc\s+sharp\b/g, ' csharp ')
    .replace(/(^|[^a-z0-9])\.net\b/g, '$1 dotnet ')
    .replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/)
    .map((word) => synonyms.get(word) || word).join(' ');
}

const exactTerms = new Set(['java', 'cpp', 'csharp', 'dotnet']);
/** @param {string} token @param {string} word */
const matchesWord = (token, word) => token === word
  || (word.length >= 3 && !exactTerms.has(word) && token.startsWith(word));

/** Search positive metadata only: limitations and cost caveats can mention unsupported features. @param {Tool} tool @param {string} query */
function relevance(tool, query) {
  if (!query) return 0;
  const names = [tool.title, ...(tool.aliases || [])].map(normalizeSearch);
  const fields = [
    { text: names.join(' '), weight: 40 },
    { text: [...tool.languages, ...tool.findings, ...tool.techniques, ...(tool.searchTerms || [])].join(' '), weight: 20 },
    { text: [tool.description, ...tool.modes, ...tool.inputTypes, ...tool.targets, tool.licenseCategory, ...tool.cost].join(' '), weight: 5 },
  ].map(({ text, weight }) => ({ words: normalizeSearch(text).split(' '), weight }));
  const scores = query.split(' ').map((word) => Math.max(0, ...fields.map((field) =>
    field.words.some((token) => matchesWord(token, word)) ? field.weight : 0)));
  if (scores.some((score) => score === 0)) return -1;
  const nameBonus = names.some((name) => name === query) ? 1000
    : names.some((name) => name.startsWith(query + ' ')) ? 500 : 0;
  return nameBonus + scores.reduce((sum, score) => sum + score, 0);
}

/** @param {Tool[]} tools @param {Filters} filters */
export function selectTools(tools, filters = {}) {
  const query = normalizeSearch(filters.q || '');
  const scores = new Map();
  const result = tools.filter((tool) => {
    const score = relevance(tool, query);
    scores.set(tool.id, score);
    return score >= 0
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
    : filters.sort === 'verified' ? b.verified.localeCompare(a.verified) || byName(a, b)
    : filters.sort === 'az' ? byName(a, b)
    : scores.get(b.id) - scores.get(a.id) || byName(a, b));
}

/** Allow one insertion, deletion, replacement, or adjacent transposition. @param {string} a @param {string} b */
function closeSpelling(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1)
    || (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

/** Suggest names without silently changing a query or relaxing edition filters. @param {Tool[]} tools @param {Filters} filters */
export function suggestTools(tools, filters = {}) {
  const query = normalizeSearch(filters.q || '');
  if (query.length < 4 || query.length > 80) return [];
  return selectTools(tools, { ...filters, q: '', sort: 'az' }).filter((tool) => {
    const names = [tool.title, ...(tool.aliases || [])].map(normalizeSearch);
    const candidates = query.includes(' ') ? names : names.flatMap((name) => name.split(' '));
    return candidates.some((name) => name.length >= 4 && closeSpelling(query, name));
  }).slice(0, 3);
}
