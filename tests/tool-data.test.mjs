import assert from 'node:assert/strict';
import test from 'node:test';
import { readDocumentationSources } from '../src/lib/tool-inventory.mjs';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { publishedTools, catalogTools, comparisonTools, builderData } from '../src/lib/tool-data.mjs';
import { selectTools, suggestTools } from '../src/lib/catalog.mjs';
import { analyzeSystem, newComponent, newProfile } from '../src/lib/system-builder.mjs';
import { profileSchema } from '../src/lib/system-schema.mjs';
import { COSTS, LICENSES, INPUTS, EDITION_GROUPS } from '../src/lib/tool-vocabulary.mjs';

const entries = (await readDocumentationSources(process.cwd())).filter(source => source.data.tool).map(source => ({
  id: source.relativePath.replace(/\.[^.]+$/, ''),
  data: { ...source.data, tool: toolSchema.parse(source.data.tool) },
}));
const tools = publishedTools(entries);
const projected = catalogTools(tools);
const ids = values => values.map(value => value.id);

test('native runtime workflows honor instrumentation access without requiring a rebuild', () => {
  const affected = tools.filter(tool => ['tools/dr-memory', 'tools/heaptrack', 'tools/valgrind-memcheck', 'tools/valgrind-helgrind'].includes(tool.id));
  assert.equal(affected.length, 4);
  const profile = newProfile();
  const component = { ...newComponent('native'), languages: ['Not sure'], inputs: ['Binaries'], inputsComplete: true, binaryFormat: 'Native executable', hostPlatform: 'Linux', targetPlatform: 'Linux', access: { rebuild: 'no', instrument: 'no', harness: 'no', testInstance: 'yes' } };
  profile.components = [component];
  for (const [instrument, expected] of [['no', 'blocked'], ['unknown', 'details'], ['yes', 'candidate']]) {
    component.access.instrument = instrument;
    const result = analyzeSystem(profile, builderData(affected).tools);
    assert.equal(result.matches.length, 4);
    for (const match of result.matches) {
      assert.equal(match.status, expected, `${match.toolId}: ${instrument}`);
      if (instrument === 'unknown') assert.ok(match.questions.some(question => question.field === 'instrument'));
    }
  }
  component.access.testInstance = 'no';
  assert.ok(analyzeSystem(profile, affected).matches.every(match => match.status === 'blocked'));
});

test('runtime coverage and JVM fuzzing also require instrumentation access', () => {
  for (const [id, languages, inputs, binaryFormat] of [
    ['tools/coverage-py', ['Python'], ['Source code', 'Callable code'], ''],
    ['tools/jazzer', ['Java'], ['Binaries'], 'JVM bytecode'],
  ]) {
    const tool = tools.find(tool => tool.id === id);
    const profile = newProfile();
    const component = { ...newComponent('runtime'), languages, inputs, binaryFormat, inputsComplete: true, hostPlatform: 'Windows', access: { rebuild: 'no', instrument: 'no', harness: 'yes', testInstance: 'yes' } };
    profile.components = [component];
    for (const [instrument, expected] of [['no', 'blocked'], ['unknown', 'details'], ['yes', 'candidate']]) {
      component.access.instrument = instrument;
      assert.equal(analyzeSystem(profile, [tool]).matches[0]?.status, expected, `${id}: ${instrument}`);
    }
  }
});

test('shared adapter excludes drafts and plain documentation and preserves authored identities', () => {
  const [entry] = entries;
  const result = publishedTools([
    { ...entry, id: 'custom/id' },
    { ...entry, id: 'draft', data: { ...entry.data, draft: true } },
    { id: 'guide', data: { title: 'Guide' } },
  ]);
  assert.deepEqual(ids(result), ['custom/id']);
  assert.equal(result[0].title, entry.data.title);
});

test('catalog projection preserves names, aliases, capability queries and filter combinations', () => {
  const filters = [{}, { q: 'null pointer' }, { q: 'static analysis' }, { q: 'dynamic analysis' }, { q: 'semgerp' }];
  for (const tool of tools) {
    for (const q of [tool.title, ...tool.aliases, ...tool.searchTerms]) filters.push({ q });
    for (const mode of tool.modes) filters.push({ mode, input: tool.inputTypes[0], language: tool.languages[0], cost: tool.cost[0], license: tool.licenseCategory });
  }
  for (const filter of filters) {
    assert.deepEqual(ids(selectTools(projected, filter)), ids(selectTools(tools, filter)), JSON.stringify(filter));
    assert.deepEqual(ids(suggestTools(projected, filter)), ids(suggestTools(tools, filter)), JSON.stringify(filter));
  }
  assert.ok(projected.every(tool => !('analysisWorkflows' in tool) && !('sources' in tool) && !('costNote' in tool)));
  assert.ok(Buffer.byteLength(JSON.stringify(projected)) < Buffer.byteLength(JSON.stringify(tools)));
});

test('taxonomy queries recall all corresponding profiles without becoming hard mode filters', () => {
  for (const mode of ['Static', 'Dynamic']) {
    const matches = new Set(ids(selectTools(projected, { q: `${mode} analysis` })));
    assert.ok(tools.filter(tool => tool.modes.includes(mode)).every(tool => matches.has(tool.id)));
  }
});

test('comparison projection retains concrete summaries, fallback meaning and source details', () => {
  const ruff = tools.find(tool => tool.id === 'tools/ruff');
  const output = comparisonTools([ruff])[0];
  assert.equal(output.useWhen, ruff.decision.useWhen);
  assert.equal(output.result, ruff.decision.result);
  assert.equal(output.limit, ruff.decision.limit);
  assert.deepEqual(output.sources, ruff.sources);
  const fallback = comparisonTools([{ ...ruff, decision: undefined, description: 'Source checks', findings: ['Logic errors'], findingNote: 'Selected rules only.' }])[0];
  assert.equal(fallback.useWhen, 'Source checks');
  assert.deepEqual(fallback.result, ['Logic errors']);
  assert.equal(fallback.limit, 'Selected rules only.');
  assert.ok(!('analysisWorkflows' in output));
});

test('builder projection preserves matching while languages include catalog-only tools', () => {
  const data = builderData(tools);
  assert.deepEqual(ids(data.tools), ids(tools.filter(tool => tool.analysisWorkflows.length)));
  for (const tool of tools) for (const language of tool.languages) if (language !== 'Language independent') assert.ok(data.languages.includes(language));
  for (const language of ['Python', 'C++', 'Java']) {
    for (const hostPlatform of ['', 'Windows', 'Linux']) {
      const profile = newProfile();
      profile.components = [{ ...newComponent('sample'), languages: [language], inputs: ['Source code'], hostPlatform }];
      assert.deepEqual(analyzeSystem(profile, data.tools), analyzeSystem(profile, tools));
    }
  }
  const catalogOnly = { ...tools[0], id: 'catalog-only', languages: ['Distinct language'], analysisWorkflows: [] };
  assert.ok(builderData([...tools, catalogOnly]).languages.includes('Distinct language'));
  assert.ok(!builderData([...tools, catalogOnly]).tools.some(tool => tool.id === catalogOnly.id));
});

test('shared vocabulary keeps preference sentinels out of tool metadata', () => {
  const raw = entries[0].data.tool;
  for (const cost of COSTS) assert.ok(toolSchema.safeParse({ ...raw, cost: [cost] }).success);
  for (const licenseCategory of LICENSES) assert.ok(toolSchema.safeParse({ ...raw, licenseCategory }).success);
  for (const input of INPUTS) assert.ok(profileSchema.safeParse({ ...newProfile(), components: [{ ...newComponent('sample'), inputs: [input] }] }).success);
  for (const editionGroup of EDITION_GROUPS) assert.ok(toolSchema.safeParse({ ...raw, editionGroup }).success);
  assert.ok(!toolSchema.safeParse({ ...raw, cost: ['any-free'] }).success);
  assert.ok(!toolSchema.safeParse({ ...raw, licenseCategory: '' }).success);
  assert.ok(profileSchema.safeParse({ ...newProfile(), preferences: { cost: 'any-free', license: '' } }).success);
});
