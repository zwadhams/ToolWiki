import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { analyzeSystem, newComponent, newProfile } from '../src/lib/system-builder.mjs';

async function authoredTool(slug) {
  const { frontmatter } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
  return { id: `tools/${slug}`, title: frontmatter.title, ...toolSchema.parse(frontmatter.tool) };
}
const profileFor = component => ({ ...newProfile(), components: [{ ...newComponent('subject'), ...component }], connections: [] });

test('TLC matches a supplied TLA+ model, not arbitrary implementation source', async () => {
  const tlc = await authoredTool('tlc');
  const profile = profileFor({ languages: ['TLA+'], inputs: ['Executable models'], inputsComplete: true, hostPlatform: 'Windows' });
  assert.equal(analyzeSystem(profile, [tlc]).matches[0]?.status, 'candidate');
  profile.components[0].languages = ['C'];
  assert.equal(analyzeSystem(profile, [tlc]).matches.length, 0);
  profile.components[0].languages = ['TLA+'];
  profile.components[0].inputs = ['Source code'];
  assert.equal(analyzeSystem(profile, [tlc]).matches[0]?.status, 'blocked');
});

test('heaptrack distinguishes native artifacts, workload access, and unreviewed hosts', async () => {
  const heaptrack = await authoredTool('heaptrack');
  const profile = profileFor({ languages: ['C++'], inputs: ['Binaries'], inputsComplete: true, binaryFormat: 'Native executable', hostPlatform: 'Linux', targetPlatform: 'Linux' });
  profile.components[0].access.testInstance = 'yes';
  assert.equal(analyzeSystem(profile, [heaptrack]).matches[0]?.status, 'candidate');
  profile.components[0].access.testInstance = 'no';
  assert.equal(analyzeSystem(profile, [heaptrack]).matches[0]?.status, 'blocked');
  profile.components[0].access.testInstance = 'yes';
  profile.components[0].hostPlatform = 'Windows';
  assert.equal(analyzeSystem(profile, [heaptrack]).matches[0]?.status, 'details');
  profile.components[0].binaryFormat = 'JVM bytecode';
  assert.equal(analyzeSystem(profile, [heaptrack]).matches.length, 0);
});

test('PIT remains catalog-only until build and test-runner prerequisites can be confirmed', async () => {
  const pit = await authoredTool('pit');
  const profile = profileFor({ languages: ['Java'], inputs: ['Binaries', 'Callable code'], binaryFormat: 'JVM bytecode', inputsComplete: true });
  profile.components[0].access = { rebuild: 'yes', instrument: 'yes', harness: 'yes', testInstance: 'yes' };
  assert.equal(analyzeSystem(profile, [pit]).matches.length, 0);
  assert.deepEqual(pit.inputTypes, ['Binaries', 'Callable code']);
});

test('TLC execution evidence retains the actual inputs and distinct faulty/corrected outcomes', async () => {
  const dir = 'audits/formal-tools/tlc-run';
  const record = JSON.parse(await readFile(`${dir}/run.json`, 'utf8'));
  for (const [file, expected] of Object.entries(record.inputSha256)) {
    const bytes = await readFile(`examples/tlc/${file}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, file);
  }
  const [faulty, corrected] = record.runs;
  assert.equal(faulty.status, 'completed-findings');
  assert.equal(faulty.exitCode, 12);
  assert.equal(corrected.status, 'completed-no-findings');
  assert.equal(corrected.exitCode, 0);
  assert.deepEqual(corrected.stateCounts, { generated: 5, distinct: 3, remaining: 0 });
  const trace = await readFile(`${dir}/${faulty.stdout}`, 'utf8');
  assert.ok(trace.includes('Invariant WithinCapacity is violated.'));
  assert.deepEqual([...trace.matchAll(/^queued = (\d+)$/gm)].map(match => Number(match[1])), [0, 1, 2, 3]);
  assert.ok((await readFile(`${dir}/${corrected.stdout}`, 'utf8')).includes('Model checking completed. No error has been found.'));
  for (const slug of ['tlc', '../guides/model-checking']) {
    const path = slug.startsWith('../') ? `src/content/docs/guides/model-checking.md` : `src/content/docs/tools/${slug}.md`;
    const { frontmatter } = parseFrontmatter(await readFile(path, 'utf8'));
    assert.equal(frontmatter.executionEvidence.status, 'recorded');
    assert.ok(frontmatter.executionEvidence.scope.includes('capacity-2'));
  }
});
