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

/** @param {string} base @param {string[]} ids */
export function comparisonHref(base, ids) {
  const params = new URLSearchParams();
  if (ids.length) params.set('tools', ids.join(','));
  return `${base.replace(/\/$/, '')}/compare/${params.size ? `?${params}` : ''}`;
}
