// Kept dependency-free so the deployment verifier can run without node_modules.
export const SCHEMA_NAMES = ['manifest', 'index', 'document', 'tool', 'snapshot', 'catalog', 'system-profile', 'catalog-results', 'recommendations'];
export const CONTRACT_PATHS = [...SCHEMA_NAMES.map(name => `schemas/${name}.schema.json`), 'schemas/index.json', 'vocabulary.json'];
