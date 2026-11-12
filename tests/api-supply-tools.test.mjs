import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { selectTools } from '../src/lib/catalog.mjs';
import { analyzeSystem, newProfile, newComponent } from '../src/lib/system-builder.mjs';

const tools = await Promise.all(['spectral', 'pact', 'syft'].map(async slug => {
  const { frontmatter } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
  return { id: `tools/${slug}`, title: frontmatter.title, description: frontmatter.description, ...toolSchema.parse(frontmatter.tool) };
}));
const profile = (languages, inputs) => ({ ...newProfile(), components: [{ ...newComponent('app'), languages, inputs, inputsComplete: true, hostPlatform: 'Windows' }], connections: [] });

test('API document, contract and inventory profiles do not promise general source analysis', () => {
  assert.deepEqual(selectTools(tools, { input: 'Source code' }), []);
  assert.deepEqual(selectTools(tools, { q: 'OpenAPI', input: 'Configuration files' }).map(tool => tool.id), ['tools/spectral']);
  assert.deepEqual(selectTools(tools, { q: 'SBOM', input: 'Dependency metadata' }).map(tool => tool.id), ['tools/syft']);
});

test('Spectral requires configuration material and Syft reports inventory rather than vulnerabilities', () => {
  const documents = analyzeSystem(profile(['OpenAPI'], ['Configuration files']), tools);
  assert.ok(documents.matches.some(match => match.toolId === 'tools/spectral' && match.status === 'candidate'));
  const source = analyzeSystem(profile(['JavaScript'], ['Source code']), tools);
  assert.ok(!source.subjects[0].candidates.some(candidate => candidate.toolId === 'tools/syft'));
  const dependencies = analyzeSystem(profile(['JavaScript'], ['Dependency metadata']), tools);
  const inventory = dependencies.matches.find(match => match.toolId === 'tools/syft' && match.workflowId === 'npm-declarations');
  assert.equal(inventory.status, 'candidate');
  assert.deepEqual(inventory.findings, ['Software component inventory']);
  const image = analyzeSystem(profile([], ['Container images']), tools);
  assert.ok(image.matches.some(match => match.toolId === 'tools/syft' && match.workflowId === 'image-inventory' && match.status === 'candidate'));
});

test('Pact is not recommended before the builder can represent consumer pact artifacts', () => {
  const pact = tools.find(tool => tool.id === 'tools/pact');
  assert.deepEqual(pact.analysisWorkflows, []);
  assert.equal(analyzeSystem(profile(['JavaScript'], ['Callable code', 'Running applications']), [pact]).matches.length, 0);
});

test('retained API and SBOM executions identify the current checked fixtures', async () => {
  for (const example of ['api-contracts', 'sbom-inventory']) {
    const record = JSON.parse(await readFile(`audits/api-supply-tools/evidence/${example}/run.json`, 'utf8'));
    for (const [file, expected] of Object.entries(record.inputsSha256)) {
      const actual = createHash('sha256').update(await readFile(`examples/${example}/${file}`)).digest('hex');
      assert.equal(actual, expected, `${example}/${file} changed after its recorded execution`);
    }
  }
});
