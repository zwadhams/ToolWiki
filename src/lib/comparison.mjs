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
const CATALOG_CATEGORIES = ['all', 'static', 'dynamic'];

/** Carry allowlisted catalog state, never a destination URL or nested context.
 * Selection needs the complete published catalog, not the filtered result set.
 * @param {string | URLSearchParams | null} raw
 * @param {string[]} allowedIds
 */
export function catalogParams(raw = '', allowedIds = []) {
  const input = new URLSearchParams(raw || ''), params = new URLSearchParams();
  for (const key of CATALOG_FILTERS) {
    const value = input.get(key);
    if (value && !(key === 'sort' && value === 'relevance')) params.set(key, value);
  }
  const category = input.get('category');
  if (category !== null) params.set('category', CATALOG_CATEGORIES.includes(category) ? category : 'all');
  const selected = normalizeSelection(input.get('compare'), allowedIds);
  if (selected.length) params.set('compare', selected.join(','));
  return params;
}

/** @param {string} base @param {string[]} ids @param {string | URLSearchParams | null} context @param {string[]} allowedIds */
export function comparisonHref(base, ids, context = '', allowedIds = ids) {
  const params = new URLSearchParams();
  const selected = normalizeSelection(ids, allowedIds);
  if (selected.length) params.set('tools', selected.join(','));
  const origin = catalogParams(context, allowedIds);
  if (origin.size) {
    if (selected.length) origin.set('compare', selected.join(',')); else origin.delete('compare');
  }
  const catalog = origin.toString();
  if (catalog) params.set('catalog', catalog);
  return `${base.replace(/\/$/, '')}/compare/${params.size ? `?${params}` : ''}`;
}

/** A null selection inherits context; an explicit empty list clears it.
 * @param {string} base
 * @param {string[] | null} ids
 * @param {string | URLSearchParams | null} context
 * @param {string[]} allowedIds
 */
export function catalogHref(base, ids = null, context = '', allowedIds = ids || []) {
  const params = catalogParams(context, allowedIds);
  const category = params.get('category');
  params.delete('category');
  const selected = normalizeSelection(ids === null ? params.get('compare') : ids, allowedIds);
  if (selected.length) params.set('compare', selected.join(',')); else params.delete('compare');
  const categoryPath = category === 'static' ? 'static/' : category === 'dynamic' ? 'dynamic/' : '';
  return `${base.replace(/\/$/, '')}/${categoryPath}${params.size ? `?${params}` : ''}`;
}
