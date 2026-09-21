import assert from 'node:assert/strict';
import test from 'node:test';
import { selectTools } from '../src/lib/catalog.mjs';

const tools = [
  { id: 'python', title: 'Python checker', description: 'Checks untrusted data flow', modes: ['Static'], inputTypes: ['Source code'], findings: ['Injection risks'], languages: ['Python'], targets: ['Source code'], techniques: ['SAST'], licenseCategory: 'Open source', cost: ['Free'], costNote: 'Local engine.', verified: '2026-09-20' },
  { id: 'http', title: 'HTTP scanner', description: 'Inspects web responses', modes: ['Dynamic'], inputTypes: ['Running applications'], findings: ['Injection risks', 'Security misconfiguration'], languages: ['Language independent'], targets: ['HTTP APIs'], techniques: ['DAST'], licenseCategory: 'Proprietary', cost: ['Paid'], costNote: 'Paid license; trial available.', verified: '2026-09-21' },
  { id: 'hybrid', title: 'Combined analyzer', description: 'Static and runtime checks', modes: ['Static', 'Dynamic'], inputTypes: ['Source code', 'Binaries'], findings: ['Memory safety', 'Specification violations'], languages: ['Python'], targets: ['Source code', 'Native programs'], techniques: ['SAST', 'Runtime memory checking'], licenseCategory: 'Open source', cost: ['Free with limits', 'Paid'], costNote: 'Hosted usage conditions.', verified: '2026-09-21' },
];
test('combines filters and all search terms instead of returning their union', () => {
  assert.deepEqual(selectTools(tools, { language: 'Python', input: 'Source code', technique: 'SAST', license: 'Open source', q: 'CHECKER flow' }).map((t) => t.id), ['python']);
});
test('multi-mode tools appear in either relevant category', () => {
  assert.deepEqual(selectTools(tools, { mode: 'Dynamic', language: 'Python' }).map((t) => t.id), ['hybrid']);
});
test('finding categories combine with input, language, and cost filters', () => {
  assert.deepEqual(selectTools(tools, { finding: 'Injection risks', input: 'Source code', language: 'Python', cost: 'Free' }).map((t) => t.id), ['python']);
  assert.deepEqual(selectTools(tools, { finding: 'Memory safety', input: 'Binaries' }).map((t) => t.id), ['hybrid']);
  assert.deepEqual(selectTools(tools, { finding: 'Memory safety', cost: 'Free' }), []);
});
test('finding descriptions are searchable and clearing the filter restores results', () => {
  assert.deepEqual(selectTools(tools, { q: 'specification violations' }).map((t) => t.id), ['hybrid']);
  assert.equal(selectTools(tools, { finding: '' }).length, tools.length);
});
test('input types support multiple workflows and combine with other filters', () => {
  assert.deepEqual(selectTools(tools, { input: 'Binaries' }).map((t) => t.id), ['hybrid']);
  assert.deepEqual(selectTools(tools, { input: 'Source code', cost: 'Free' }).map((t) => t.id), ['python']);
  assert.deepEqual(selectTools(tools, { input: 'Binaries', technique: 'DAST' }), []);
  assert.deepEqual(selectTools(tools, { q: 'binaries' }).map((t) => t.id), ['hybrid']);
});
test('dependency ecosystem tags do not imply source analysis', () => {
  const inventory = { ...tools[0], id: 'inventory', title: 'Inventory scanner', inputTypes: ['Binaries', 'Dependency metadata'], targets: ['Software packages', 'SBOMs'], techniques: ['Software composition analysis'] };
  const candidates = [tools[0], inventory];
  assert.deepEqual(selectTools(candidates, { language: 'Python', input: 'Source code' }).map((t) => t.id), ['python']);
  assert.deepEqual(selectTools(candidates, { language: 'Python', input: 'Dependency metadata' }).map((t) => t.id), ['inventory']);
  assert.deepEqual(selectTools(candidates, { input: 'Binaries', technique: 'SAST' }), []);
});
test('language-independent HTTP tools are not falsely tagged for source languages', () => {
  assert.equal(selectTools(tools, { language: 'Python', input: 'Running applications' }).length, 0);
  assert.equal(selectTools(tools, { language: 'Language independent', input: 'Running applications' }).length, 1);
  assert.deepEqual(selectTools(tools, { q: 'HTTP APIs' }).map((t) => t.id), ['http']);
});
test('sorts without mutating input and breaks date ties by name', () => {
  const original = tools.map((t) => t.id);
  assert.deepEqual(selectTools(tools, { sort: 'za' }).map((t) => t.id), ['python', 'http', 'hybrid']);
  assert.deepEqual(selectTools(tools, { sort: 'verified' }).map((t) => t.id), ['hybrid', 'http', 'python']);
  assert.deepEqual(tools.map((t) => t.id), original);
});
test('empty searches restore the full catalog and impossible filters return nothing', () => {
  assert.equal(selectTools(tools, { q: '  ' }).length, 3);
  assert.deepEqual(selectTools(tools, { q: 'nothing-matches' }), []);
});
test('free options include restricted free use but exclude paid trials', () => {
  assert.deepEqual(selectTools(tools, { cost: 'any-free' }).map((t) => t.id), ['hybrid', 'python']);
  assert.deepEqual(selectTools(tools, { cost: 'Free' }).map((t) => t.id), ['python']);
  assert.deepEqual(selectTools(tools, { cost: 'Free with limits' }).map((t) => t.id), ['hybrid']);
  assert.deepEqual(selectTools(tools, { cost: 'Paid' }).map((t) => t.id), ['hybrid', 'http']);
});
test('free proprietary manual tools do not inherit automated scanning from paid editions', () => {
  const community = { ...tools[1], id: 'community', title: 'Manual edition', techniques: ['Manual web testing'], cost: ['Free'] };
  const editions = [...tools, community];
  assert.deepEqual(selectTools(editions, { cost: 'Free', license: 'Proprietary' }).map((t) => t.id), ['community']);
  assert.deepEqual(selectTools(editions, { cost: 'any-free', technique: 'DAST' }), []);
});
test('cost and language filters must match the same edition', () => {
  const commercial = { ...tools[0], id: 'commercial', languages: ['C++'], cost: ['Paid'] };
  const community = { ...tools[0], id: 'community', languages: ['Java'], cost: ['Free'] };
  assert.deepEqual(selectTools([commercial, community], { cost: 'any-free', language: 'C++' }), []);
  assert.deepEqual(selectTools([commercial, community], { cost: 'any-free', language: 'Java' }).map((t) => t.id), ['community']);
});
