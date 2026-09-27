import assert from 'node:assert/strict';
import test from 'node:test';
import { selectTools, suggestTools } from '../src/lib/catalog.mjs';

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

test('ranks names and aliases before descriptive mentions while retaining explicit sorts', () => {
  const asan = { ...tools[2], id: 'asan', title: 'AddressSanitizer (Clang)', aliases: ['ASan', 'Address Sanitizer'], searchTerms: ['buffer overflow'] };
  const mention = { ...tools[0], id: 'mention', title: 'A companion', description: 'Use with ASan instrumentation.' };
  assert.deepEqual(selectTools([mention, asan], { q: 'ASan' }).map(t => t.id), ['asan', 'mention']);
  assert.equal(selectTools([asan], { q: 'address sanitizer' })[0].id, 'asan');
  assert.equal(selectTools([asan], { q: 'buffer overflow' })[0].id, 'asan');
  assert.deepEqual(selectTools([mention, asan], { q: 'ASan', sort: 'az' }).map(t => t.id), ['mention', 'asan']);
});

test('language names stay distinct and common abbreviations find the same candidates', () => {
  const candidates = [
    { ...tools[0], id: 'c', title: 'Native checker', description: '', languages: ['C'] },
    { ...tools[0], id: 'cpp', title: 'Native checker', description: '', languages: ['C++'] },
    { ...tools[0], id: 'cs', title: 'Managed checker', description: '', languages: ['C#'] },
    { ...tools[0], id: 'go', title: 'Go checker', description: '', languages: ['Go'] },
    { ...tools[0], id: 'rust', title: 'cargo-audit', description: '', languages: ['Rust'] },
    { ...tools[0], id: 'java', title: 'JVM checker', description: '', languages: ['Java'] },
    { ...tools[0], id: 'js', title: 'Script checker', description: '', languages: ['JavaScript'] },
  ];
  for (const [query, id] of [['C', 'c'], ['C++', 'cpp'], ['cpp', 'cpp'], ['c plus plus', 'cpp'], ['c#', 'cs'], ['csharp', 'cs'], ['C sharp', 'cs'], ['go', 'go'], ['golang', 'go'], ['java', 'java'], ['js', 'js']]) {
    assert.deepEqual(selectTools(candidates, { q: query }).map(t => t.id), [id], query);
  }
  assert.equal(selectTools(tools, { q: 'py checker flow' })[0].id, 'python');
});

test('punctuation and partial names work without requiring exact formatting', () => {
  const candidates = [{ ...tools[0], title: 'OSV-Scanner' }, { ...tools[1], title: 'AFL++', aliases: ['AFL plus plus'] }];
  assert.equal(selectTools(candidates, { q: 'osv scanner' })[0].id, 'python');
  assert.equal(selectTools(candidates, { q: 'OSV scann' })[0].id, 'python');
  assert.equal(selectTools(candidates, { q: 'AFL plus plus' })[0].id, 'http');
  assert.equal(selectTools(candidates, { q: 'AFL++' })[0].id, 'http');
});

test('cost caveats and unsupported platform notes do not become capabilities', () => {
  const candidate = { ...tools[1], environment: 'Windows is not supported.', costNote: 'No free edition; paid trial only.' };
  assert.deepEqual(selectTools([candidate], { q: 'free' }), []);
  assert.deepEqual(selectTools([candidate], { q: 'windows' }), []);
});

test('typo suggestions are explicit and obey cost, language, and mode filters', () => {
  const candidates = [
    { ...tools[0], id: 'ce', title: 'Semgrep CE' },
    { ...tools[1], id: 'pro', title: 'Semgrep Code' },
  ];
  assert.deepEqual(selectTools(candidates, { q: 'semgerp' }), []);
  for (const q of ['semgerp', 'semgrp', 'semgrepp', 'semgrap']) {
    assert.deepEqual(suggestTools(candidates, { q }).map(t => t.id), ['ce', 'pro']);
  }
  assert.deepEqual(suggestTools(candidates, { q: 'semgerp', cost: 'Free', language: 'Python', mode: 'Static' }).map(t => t.id), ['ce']);
  assert.deepEqual(suggestTools(candidates, { q: 'semgerp', cost: 'Free', mode: 'Dynamic' }), []);
  assert.deepEqual(suggestTools(candidates, { q: 'go' }), []);
  assert.deepEqual(suggestTools(candidates, { q: 'totally unrelated query' }), []);
  assert.deepEqual(suggestTools(candidates, { q: 'semgrep cod' }).map(t => t.id), ['pro']);
});
