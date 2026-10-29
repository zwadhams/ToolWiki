/**
 * Keep only unique, known tool IDs, in the requested order.
 * @param {string | string[] | null | undefined} raw
 * @param {string[]} allowedIds
 * @param {number} limit
 * @returns {string[]}
 */
export function normalizeSelection(raw, allowedIds, limit = 3) {
  const allowed = new Set(allowedIds);
  const items = Array.isArray(raw) ? raw : String(raw || '').split(',');
  return [...new Set(items.map((id) => id.trim()).filter((id) => allowed.has(id)))].slice(0, limit);
}

export const CATALOG_FILTERS = ['q', 'finding', 'input', 'language', 'technique', 'license', 'cost', 'sort'];

/** Carry only catalog fields, never a destination URL or nested context.
 * @param {string | URLSearchParams} raw
 */
export function catalogParams(raw = '') {
  const input = new URLSearchParams(raw), params = new URLSearchParams();
  for (const key of CATALOG_FILTERS) {
    const value = input.get(key);
    if (value && !(key === 'sort' && value === 'relevance')) params.set(key, value);
  }
  return params;
}

/** @param {string} base @param {string[]} ids @param {string | URLSearchParams} context */
export function comparisonHref(base, ids, context = '') {
  const params = new URLSearchParams();
  if (ids.length) params.set('tools', ids.join(','));
  const catalog = catalogParams(context).toString();
  if (catalog) params.set('catalog', catalog);
  return `${base.replace(/\/$/, '')}/compare/${params.size ? `?${params}` : ''}`;
}

/** @param {string} base @param {string[]} ids @param {string | URLSearchParams} context */
export function catalogHref(base, ids = [], context = '') {
  const params = catalogParams(context);
  if (ids.length) params.set('compare', ids.join(','));
  return `${base.replace(/\/$/, '')}/${params.size ? `?${params}` : ''}`;
}
