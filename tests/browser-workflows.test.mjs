import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { analyzeSystem, newProfile, newComponent } from '../src/lib/system-builder.mjs';

const entries = await Promise.all(['playwright', 'axe-core'].map(async slug => {
  const { frontmatter } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
  return { id: `tools/${slug}`, title: frontmatter.title, ...toolSchema.parse(frontmatter.tool), evidence: frontmatter.executionEvidence };
}));
const profile = () => ({ ...newProfile(), components: [{
  ...newComponent('web'), languages: ['Python'], inputs: ['Running applications'],
  inputsComplete: true, hostPlatform: 'Windows',
  access: { rebuild: 'unknown', instrument: 'unknown', harness: 'yes', testInstance: 'yes' },
}], connections: [] });

test('browser workflows require explicit UI confirmation independently of backend language', () => {
  const p = profile();
  const unconfirmed = analyzeSystem(p, entries).matches;
  assert.equal(unconfirmed.length, 2);
  assert.ok(unconfirmed.every(match => match.status === 'details' && match.questions.some(question => question.field === 'technologies')));
  p.components[0].technologies = ['Browser UI'];
  assert.ok(analyzeSystem(p, entries).matches.every(match => match.status === 'candidate'));
  p.components[0].access.harness = 'no';
  assert.ok(analyzeSystem(p, entries).matches.every(match => match.status === 'blocked'));
});

test('browser profiles retain distinct findings and the recorded example matches its source inputs', async () => {
  assert.deepEqual(entries[0].findings, ['Specification violations']);
  assert.deepEqual(entries[1].findings, ['Accessibility issues']);
  for (const tool of entries) assert.equal(tool.evidence.status, 'recorded');
  const record = JSON.parse(await readFile('audits/browser-testing/record.json', 'utf8'));
  for (const input of record.inputs) {
    const bytes = await readFile(`examples/browser-testing/${input.path}`);
    assert.equal(bytes.length, input.bytes, input.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), input.sha256, input.path);
  }
  assert.deepEqual(record.cases.map(result => result.exitCode), [1, 0]);
  assert.deepEqual(record.cases[0].tests.find(result => result.axe).axe.violationIds, ['label']);
  assert.deepEqual(record.cases[1].tests.find(result => result.axe).axe.violationIds, []);
});
