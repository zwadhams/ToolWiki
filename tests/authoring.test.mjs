import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { DOC_EXTENSIONS, TOOL_INVENTORY_PATH, assertCatalogInventory, createToolInventory, readDocumentationSources, validateToolSource, verifyCatalogSources, withToolInventory } from '../src/lib/tool-inventory.mjs';

const sample = parseFrontmatter(await readFile(new URL('../src/content/docs/tools/ruff.md', import.meta.url), 'utf8')).frontmatter.tool;
const bareTool = () => {
  const tool = structuredClone(sample);
  for (const key of ['analysisWorkflows', 'aliases', 'searchTerms', 'decision', 'cardRequirement', 'editionGroup']) delete tool[key];
  return tool;
};
const source = data => ({ filePath: 'src/content/docs/tools/example.md', relativePath: 'tools/example.md', data });
const fullSchema = (tool = toolSchema) => docsSchema({ extend: z.object({ tool: tool.optional() }) })({ image: () => z.any() });

async function fixture(t) {
  const parent = path.resolve(os.tmpdir());
  const root = await mkdtemp(path.join(parent, 'toolwiki-authoring-'));
  t.after(async () => {
    const resolved = path.resolve(root);
    assert.equal(path.dirname(resolved), parent);
    assert.ok(path.basename(resolved).startsWith('toolwiki-authoring-'));
    await rm(resolved, { recursive: true, force: true });
  });
  await mkdir(path.join(root, 'src/content/docs'), { recursive: true });
  return root;
}
async function put(root, relative, data) {
  const file = path.resolve(root, 'src/content/docs', relative);
  assert.ok(file.startsWith(path.join(root, 'src/content/docs') + path.sep));
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `---\n${JSON.stringify(data, null, 2)}\n---\nFixture content.\n`);
}
function loaderContext(root, schema = fullSchema()) {
  const values = new Map();
  const rootUrl = pathToFileURL(root + path.sep);
  return {
    collection: 'docs',
    config: { root: rootUrl, srcDir: new URL('src/', rootUrl), integrations: [], prerenderConflictBehavior: 'warn' },
    logger: { info() {}, warn() {}, error() {} },
    store: {
      get: id => values.get(id), values: () => [...values.values()], keys: () => [...values.keys()],
      entries: () => [...values.entries()], has: id => values.has(id), clear: () => values.clear(),
      delete: id => values.delete(id), set: entry => { values.set(entry.id, entry); return true; },
      addModuleImport() {}, addAssetImports() {},
    },
    parseData: async ({ data }) => schema.parse(data),
    generateDigest: contents => createHash('sha256').update(contents).digest('hex'),
    entryTypes: new Map(DOC_EXTENSIONS.map(extension => ['.' + extension, {
      getEntryInfo({ contents }) {
        const parsed = parseFrontmatter(contents);
        return { data: parsed.frontmatter, body: parsed.content };
      },
    }])),
  };
}

test('every authored tool validates against the production strict schema', async () => {
  const sources = await readDocumentationSources(process.cwd());
  const profiles = sources.filter(entry => entry.data.tool);
  assert.ok(profiles.length > 0);
  for (const profile of profiles) assert.ok(toolSchema.safeParse(profile.data.tool).success, profile.filePath);
  assert.ok(profiles.some(profile => !profile.data.tool.analysisWorkflows), 'Catalog-only tools must remain valid');
});

test('optional-field typos fail with their file and unknown key instead of becoming empty defaults', () => {
  for (const key of ['analysisWorkflows', 'aliases', 'searchTerms', 'decision']) {
    const tool = structuredClone(sample);
    tool[`${key}Typo`] = tool[key]; delete tool[key];
    assert.equal(toolSchema.safeParse(tool).success, false);
    assert.throws(() => validateToolSource(source({ tool })), error => error.message.includes('tools/example.md') && error.message.includes(`${key}Typo`));
    assert.equal(fullSchema().safeParse({ title: 'Example', tool }).success, false);
  }
});

test('intentionally absent optionals and supported Starlight frontmatter remain valid', () => {
  const parsed = fullSchema().parse({ title: 'Example', tool: bareTool(), sidebar: { label: 'Friendly name', order: 2 }, editUrl: false, tableOfContents: false });
  assert.deepEqual(parsed.tool.analysisWorkflows, []);
  assert.deepEqual(parsed.tool.aliases, []);
  assert.deepEqual(parsed.tool.searchTerms, []);
  assert.equal(parsed.tool.decision, undefined);
  assert.equal(parsed.sidebar.label, 'Friendly name');
  assert.equal(parsed.editUrl, false);
  assert.equal(parsed.tableOfContents, false);
});

test('published tool paths require metadata while drafts and ordinary docs may omit it', () => {
  for (const relativePath of ['tools/missing.md', 'tools/nested/missing.mdx', 'tools/missing.markdown']) {
    assert.throws(() => validateToolSource({ filePath: `src/content/docs/${relativePath}`, relativePath, data: { title: 'Missing', toolTypo: bareTool() } }), /published tool profiles require the tool metadata/);
  }
  assert.doesNotThrow(() => validateToolSource(source({ title: 'Draft', draft: true })));
  assert.doesNotThrow(() => validateToolSource({ filePath: 'src/content/docs/guides/topic.md', relativePath: 'guides/topic.md', data: { title: 'Guide' } }));
  assert.equal(fullSchema().parse({ title: 'Draft', draft: true }).draft, true);
  assert.equal(fullSchema().parse({ title: 'Guide' }).tool, undefined);
  assert.throws(() => validateToolSource(source({ draft: true, tool: { ...bareTool(), aliasesTypo: [] } })), /aliasesTypo/);
});

test('source inventory uses actual Starlight IDs for slugs, nested MDX and Markdown extensions', async t => {
  const root = await fixture(t);
  await put(root, 'tools/nested/index.mdx', { title: 'Nested', tool: bareTool() });
  await put(root, 'tools/original.md', { title: 'Renamed', slug: 'chosen/analyzer', tool: bareTool() });
  await put(root, 'tools/legacy.markdown', { title: 'Legacy', tool: bareTool() });
  await put(root, 'tools/draft.md', { title: 'Draft', draft: true });
  await put(root, 'tools/_partial.md', { ignored: true });
  await put(root, 'guides/ordinary.md', { title: 'Guide' });
  const context = loaderContext(root);
  await withToolInventory(docsLoader()).load(context);
  const inventory = JSON.parse(await readFile(path.join(root, TOOL_INVENTORY_PATH), 'utf8'));
  assert.deepEqual(inventory.profiles.map(profile => profile.id), ['chosen/analyzer', 'tools/legacy', 'tools/nested']);
  assert.ok(inventory.profiles.every(profile => !profile.filePath.endsWith('draft.md')));
  assert.equal(inventory.sources.some(entry => entry.filePath.endsWith('_partial.md')), false);
  const catalog = inventory.profiles.map(({ id }) => ({ id }));
  assert.equal((await verifyCatalogSources(root, catalog)).length, 3);
  await put(root, 'tools/new.md', { title: 'New', tool: bareTool() });
  await assert.rejects(() => verifyCatalogSources(root, catalog), /changed after content loading/);
});

test('source preflight catches metadata previously stripped into a cached entry', async t => {
  const root = await fixture(t);
  const tool = bareTool(); tool.aliasesTypo = ['Unseen alias'];
  await put(root, 'tools/cached.md', { title: 'Cached', tool });
  const context = loaderContext(root, fullSchema(toolSchema.strip()));
  await docsLoader().load(context);
  assert.deepEqual(context.store.get('tools/cached').data.tool.aliases, []);
  await assert.rejects(() => withToolInventory(docsLoader()).load(context), /tools\/cached.md.*aliasesTypo/);
});

test('duplicate resolved source IDs fail even when identical contents could reuse a cached digest', async t => {
  const root = await fixture(t);
  const data = { title: 'Same', slug: 'tools/collision', tool: bareTool() };
  await put(root, 'tools/first.md', data);
  await put(root, 'tools/second.mdx', data);
  await assert.rejects(() => withToolInventory(docsLoader()).load(loaderContext(root)), /Duplicate loaded ID|no unique loaded entry/);
  assert.throws(() => createToolInventory([], [
    { id: 'same', filePath: 'tools/a.md', data: {} }, { id: 'same', filePath: 'tools/b.md', data: {} },
  ]), /Duplicate loaded ID same: tools\/a.md and tools\/b.md/);
});

test('dev changes and additions validate raw tool metadata before changing the store', async t => {
  const root = await fixture(t);
  await put(root, 'tools/edited.md', { title: 'Valid', tool: bareTool() });
  const context = loaderContext(root), errors = [];
  context.logger.error = message => errors.push(message);
  context.watcher = Object.assign(new EventEmitter(), { add() {} });
  await withToolInventory(docsLoader()).load(context);
  const previous = context.store.get('tools/edited');
  await put(root, 'tools/edited.md', { title: 'Invalid edit', tool: { ...bareTool(), searchTermsTypo: [] } });
  await context.watcher.listeners('change')[0](path.join(root, 'src/content/docs/tools/edited.md'));
  assert.ok(errors.some(message => message.includes('tools/edited.md') && message.includes('searchTermsTypo')));
  assert.equal(context.store.get('tools/edited'), previous);
  await put(root, 'tools/new.mdx', { title: 'Missing metadata' });
  await context.watcher.listeners('add')[0](path.join(root, 'src/content/docs/tools/new.mdx'));
  assert.ok(errors.some(message => message.includes('tools/new.mdx') && message.includes('require the tool metadata')));
  assert.equal(context.store.has('tools/new'), false);
});

for (const changed of [false, true]) test(`case-only source renames refresh cached paths with ${changed ? 'changed' : 'unchanged'} contents`, async t => {
  const root = await fixture(t);
  const data = { title: 'Fixture', slug: 'tools/fixture', tool: bareTool() };
  await put(root, 'tools/fixture.md', data);
  const context = loaderContext(root);
  await withToolInventory(docsLoader()).load(context);
  const oldPath = path.join(root, 'src/content/docs/tools/fixture.md');
  const newPath = path.join(root, 'src/content/docs/tools/Fixture.md');
  assert.equal(path.dirname(oldPath), path.dirname(newPath));
  assert.ok(newPath.startsWith(root + path.sep));
  await rename(oldPath, newPath);
  if (changed) await writeFile(newPath, (await readFile(newPath, 'utf8')) + '\nChanged content.\n');
  await withToolInventory(docsLoader()).load(context);
  assert.equal(context.store.get('tools/fixture').filePath, 'src/content/docs/tools/Fixture.md');
  const inventory = JSON.parse(await readFile(path.join(root, TOOL_INVENTORY_PATH), 'utf8'));
  assert.deepEqual(inventory.profiles, [{ id: 'tools/fixture', filePath: 'src/content/docs/tools/Fixture.md' }]);
  await verifyCatalogSources(root, [{ id: 'tools/fixture' }]);
});

test('a rejected identical dev duplicate cannot delete the original on unlink', async t => {
  const root = await fixture(t);
  const data = { title: 'Same', slug: 'tools/fixture', tool: bareTool() };
  await put(root, 'tools/fixture.md', data);
  const context = loaderContext(root), errors = [];
  context.logger.error = message => errors.push(message);
  context.watcher = Object.assign(new EventEmitter(), { add() {} });
  await withToolInventory(docsLoader()).load(context);
  const original = context.store.get('tools/fixture');
  await put(root, 'tools/duplicate.md', data);
  const duplicate = path.join(root, 'src/content/docs/tools/duplicate.md');
  await context.watcher.listeners('add')[0](duplicate);
  assert.ok(errors.some(message => /Duplicate loaded ID tools\/fixture/.test(message) && message.includes('tools/duplicate.md')));
  assert.equal(context.store.get('tools/fixture'), original);
  assert.ok(duplicate.startsWith(root + path.sep));
  await rm(duplicate);
  await context.watcher.listeners('unlink')[0](duplicate);
  assert.equal(context.store.get('tools/fixture'), original);
  const originalPath = path.join(root, 'src/content/docs/tools/fixture.md');
  assert.ok(originalPath.startsWith(root + path.sep));
  await rm(originalPath);
  await context.watcher.listeners('unlink')[0](originalPath);
  assert.equal(context.store.has('tools/fixture'), false, 'The genuine owner still controls deletion');
});

test('a dev slug change commits its new ID only after source ownership is validated', async t => {
  const root = await fixture(t);
  await put(root, 'tools/fixture.md', { title: 'Fixture', slug: 'tools/original', tool: bareTool() });
  await put(root, 'tools/other.md', { title: 'Other', slug: 'tools/occupied', tool: bareTool() });
  const context = loaderContext(root), errors = [];
  context.logger.error = message => errors.push(message);
  context.watcher = Object.assign(new EventEmitter(), { add() {} });
  await withToolInventory(docsLoader()).load(context);
  const original = context.store.get('tools/original'), other = context.store.get('tools/occupied');
  const filePath = path.join(root, 'src/content/docs/tools/fixture.md');
  await put(root, 'tools/fixture.md', { title: 'Fixture', slug: 'tools/occupied', tool: bareTool() });
  await context.watcher.listeners('change')[0](filePath);
  assert.ok(errors.some(message => message.includes('Duplicate loaded ID tools/occupied')));
  assert.equal(context.store.get('tools/original'), original);
  assert.equal(context.store.get('tools/occupied'), other);
  await put(root, 'tools/fixture.md', { title: 'Fixture', slug: 'tools/renamed', tool: bareTool() });
  await context.watcher.listeners('change')[0](filePath);
  assert.equal(context.store.has('tools/original'), false);
  assert.equal(context.store.get('tools/renamed').filePath, 'src/content/docs/tools/fixture.md');
  assert.equal(context.store.get('tools/occupied'), other);
});

test('revalidating cached MDX also refreshes deferred module registration', async t => {
  const root = await fixture(t);
  await put(root, 'tools/deferred.mdx', { title: 'Deferred', tool: bareTool() });
  const context = loaderContext(root), registered = [];
  context.entryTypes.get('.mdx').contentModuleTypes = [];
  const set = context.store.set;
  context.store.set = entry => {
    // Match the backing DataStore's equal-digest write shortcut. Registrations
    // must be refreshed through an accepted write when the loader is revalidated.
    if (entry.digest && context.store.get(entry.id)?.digest === entry.digest) return false;
    const result = set(entry);
    if (entry.deferredRender) registered.push(entry.filePath);
    return result;
  };
  await withToolInventory(docsLoader()).load(context);
  assert.equal(context.store.get('tools/deferred').deferredRender, true);
  registered.length = 0;
  await withToolInventory(docsLoader()).load(context);
  assert.deepEqual(registered, ['src/content/docs/tools/deferred.mdx']);
});

test('catalog reconciliation uses identity sets rather than matching counts', () => {
  const profiles = [{ id: 'tools/a', filePath: 'tools/a.md' }, { id: 'custom/b', filePath: 'tools/b.mdx' }];
  assert.doesNotThrow(() => assertCatalogInventory(profiles, [{ id: 'custom/b' }, { id: 'tools/a' }]));
  assert.throws(() => assertCatalogInventory(profiles, [{ id: 'tools/a' }, { id: 'tools/a' }]), /Duplicate catalog/);
  assert.throws(() => assertCatalogInventory(profiles, [{ id: 'tools/a' }, { id: 'tools/c' }]), /custom\/b.*tools\/b.mdx.*Unexpected: tools\/c/);
  assert.throws(() => assertCatalogInventory([...profiles, profiles[0]], []), /Duplicate published tool ID/);
});
