import { createHash } from 'node:crypto';
import { existsSync, realpathSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from './tool-schema.mjs';

export const TOOL_INVENTORY_PATH = '.astro/tool-profile-inventory.json';
// Starlight's supported Markdown filenames; Markdoc is included only when configured.
export const DOC_EXTENSIONS = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'];
const slash = value => value.replaceAll('\\', '/');

// realpath preserves a filesystem's case rules; simply lowercasing every Windows
// path would conflate distinct files in a case-sensitive directory.
function canonicalPath(root, filePath) {
  const absolute = path.resolve(root, filePath);
  try { return realpathSync.native(absolute); }
  catch { return absolute; }
}
function sameSource(root, left, right) {
  const a = path.resolve(root, left), b = path.resolve(root, right);
  return a === b || (a.toLowerCase() === b.toLowerCase() && canonicalPath(root, left) === canonicalPath(root, right));
}
function assertSourceOwner(store, root, id, filePath) {
  const previous = store.get(id);
  if (previous?.filePath && !sameSource(root, previous.filePath, filePath) && existsSync(path.resolve(root, previous.filePath))) {
    throw new Error(`Duplicate loaded ID ${id}: ${previous.filePath} and ${filePath}`);
  }
}

/** Validate raw metadata before optional fields can be stripped or a cache can bypass parsing. */
export function validateToolSource({ filePath, relativePath, data }) {
  if (slash(relativePath).startsWith('tools/') && data.draft !== true && data.tool === undefined) {
    throw new Error(`${filePath}: published tool profiles require the tool metadata object.`);
  }
  if (data.tool !== undefined) {
    const result = toolSchema.safeParse(data.tool);
    if (!result.success) {
      const issues = result.error.issues.map(issue => `tool${issue.path.length ? '.' + issue.path.join('.') : ''}: ${issue.message}`);
      throw new Error(`${filePath}: ${issues.join('; ')}`);
    }
  }
}

/** Uses Astro's frontmatter parser; no second YAML parser or duplicated slug generator. */
export async function readDocumentationSources(root, docsDirectory = 'src/content/docs', extensions = DOC_EXTENSIONS) {
  const docsRoot = path.resolve(root, docsDirectory), sources = [];
  const visit = async directory => {
    for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith('.')) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) { await visit(absolute); continue; }
      if (!entry.isFile() || entry.name.startsWith('_') || !extensions.includes(path.extname(entry.name).slice(1))) continue;
      const contents = await readFile(absolute, 'utf8');
      const filePath = slash(path.relative(root, absolute));
      let data;
      try { data = parseFrontmatter(contents).frontmatter; }
      catch (error) { throw new Error(`${filePath}: ${error.message}`, { cause: error }); }
      const source = { filePath, relativePath: slash(path.relative(docsRoot, absolute)), data, digest: createHash('sha256').update(contents).digest('hex') };
      validateToolSource(source);
      sources.push(source);
    }
  };
  await visit(docsRoot);
  return sources;
}

/** Resolve source identity through the actual loader, including custom slugs and nested index files. */
export function createToolInventory(sources, entries) {
  const byFile = new Map(), byId = new Map();
  for (const entry of entries) {
    const filePath = slash(entry.filePath || '');
    if (byId.has(entry.id)) throw new Error(`Duplicate loaded ID ${entry.id}: ${byId.get(entry.id)} and ${filePath}`);
    if (byFile.has(filePath)) throw new Error(`More than one loaded ID for ${filePath}`);
    byId.set(entry.id, filePath); byFile.set(filePath, entry);
  }
  const profiles = [];
  for (const source of sources) {
    if (source.data.draft === true || source.data.tool === undefined) continue;
    const entry = byFile.get(source.filePath);
    if (!entry) throw new Error(`${source.filePath}: no unique loaded entry; check for duplicate slugs or unsupported content extensions.`);
    if (!entry.data.tool || entry.data.draft) throw new Error(`${source.filePath}: published tool metadata was lost before catalog generation.`);
    profiles.push({ id: entry.id, filePath: source.filePath });
  }
  const expectedFiles = new Set(profiles.map(profile => profile.filePath));
  for (const entry of entries) {
    if (entry.data.tool && !entry.data.draft && !expectedFiles.has(slash(entry.filePath || ''))) {
      throw new Error(`${entry.filePath}: loaded tool is absent from the source inventory; review supported content extensions.`);
    }
  }
  return profiles.sort((a, b) => a.id.localeCompare(b.id));
}

export function assertCatalogInventory(profiles, catalog) {
  const expected = new Map();
  for (const profile of profiles) {
    if (expected.has(profile.id)) throw new Error(`Duplicate published tool ID ${profile.id}: ${expected.get(profile.id)} and ${profile.filePath}`);
    expected.set(profile.id, profile.filePath);
  }
  const actual = new Set();
  for (const tool of catalog) {
    if (actual.has(tool.id)) throw new Error(`Duplicate catalog tool ID: ${tool.id}`);
    actual.add(tool.id);
  }
  const missing = [...expected].filter(([id]) => !actual.has(id)).map(([id, file]) => `${id} (${file})`);
  const unexpected = [...actual].filter(id => !expected.has(id));
  if (missing.length || unexpected.length) throw new Error(`Catalog inventory mismatch. Missing: ${missing.join(', ') || 'none'}. Unexpected: ${unexpected.join(', ') || 'none'}.`);
}

/** @param {import('astro/loaders').Loader} loader @returns {import('astro/loaders').Loader} */
export function withToolInventory(loader) {
  return {
    ...loader,
    name: 'toolwiki-checked-docs-loader',
    async load(context) {
      const root = fileURLToPath(context.config.root);
      const docsRoot = fileURLToPath(new URL('content/docs/', context.config.srcDir));
      const docsDirectory = slash(path.relative(root, docsRoot));
      const extensions = [...DOC_EXTENSIONS, ...(context.config.integrations.some(({ name }) => name === '@astrojs/markdoc') ? ['mdoc'] : [])];
      const sources = await readDocumentationSources(root, docsDirectory, extensions);
      await loader.load({
        ...context,
        parseData: async (entry) => {
          if (entry.filePath) {
            const filePath = slash(path.relative(root, entry.filePath));
            validateToolSource({ filePath, relativePath: slash(path.relative(docsRoot, entry.filePath)), data: entry.data });
            assertSourceOwner(context.store, root, entry.id, filePath);
          }
          return context.parseData(entry);
        },
        store: {
          ...context.store,
          get(id) {
            const entry = context.store.get(id);
            if (!entry?.filePath) return entry;
            // Starlight's digest fast path precedes parseData and associates a
            // source path with its ID even when no store write occurs. Always
            // validate ownership first, including identical-content additions.
            // Keep the real stored digest; only this loader's cache view changes.
            return { ...entry, digest: undefined, filePath: slash(path.relative(root, canonicalPath(root, entry.filePath))) };
          },
          set(entry) {
            const previous = context.store.get(entry.id);
            if (entry.filePath) assertSourceOwner(context.store, root, entry.id, entry.filePath);
            const refresh = previous && (previous.digest === entry.digest || (previous.filePath && entry.filePath && previous.filePath !== entry.filePath));
            // The underlying store also skips equal digests. Refresh accepted
            // entries so renamed paths and deferred module/asset registrations
            // are updated even though the loader's fast path was bypassed.
            if (refresh) context.store.delete(entry.id);
            let result;
            try { result = context.store.set(entry); }
            catch (error) {
              if (refresh) context.store.set(previous);
              throw error;
            }
            // A valid slug change replaces the prior ID only after validation
            // and the new store write succeed.
            if (entry.filePath) for (const old of context.store.values()) {
              if (old.id !== entry.id && old.filePath && sameSource(root, old.filePath, entry.filePath)) context.store.delete(old.id);
            }
            return result;
          },
          delete(id) {
            const entry = context.store.get(id);
            // An unlink for a rejected duplicate never owns the original ID.
            // Also preserve case-only renames and defer slug-change deletion
            // until the replacement entry has passed parseData and set.
            if (entry?.filePath && existsSync(path.resolve(root, entry.filePath))) return;
            context.store.delete(id);
          },
        },
      });
      const profiles = createToolInventory(sources, context.store.values());
      const documents = [...context.store.values()].filter(entry => !entry.data.draft && entry.id !== '404').map(entry => ({ id: entry.id, filePath: slash(entry.filePath) })).sort((a, b) => a.id.localeCompare(b.id, 'en'));
      const inventory = { version: 1, docsDirectory, extensions, sources: sources.map(({ filePath, digest }) => ({ filePath, digest })), profiles, documents };
      const destination = path.resolve(root, TOOL_INVENTORY_PATH);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, JSON.stringify(inventory, null, 2) + '\n', 'utf8');
    },
  };
}

/** The generated-site check uses a fresh source snapshot, never just the catalog's own count. */
export async function verifyCatalogSources(root, catalog) {
  const inventory = JSON.parse(await readFile(path.resolve(root, TOOL_INVENTORY_PATH), 'utf8'));
  if (inventory.version !== 1) throw new Error('Unsupported tool inventory. Rebuild the site.');
  const current = await readDocumentationSources(root, inventory.docsDirectory, inventory.extensions);
  const snapshot = current.map(({ filePath, digest }) => ({ filePath, digest }));
  if (JSON.stringify(snapshot) !== JSON.stringify(inventory.sources)) throw new Error('Documentation sources changed after content loading. Rebuild before checking catalog membership.');
  assertCatalogInventory(inventory.profiles, catalog);
  return inventory.profiles;
}
