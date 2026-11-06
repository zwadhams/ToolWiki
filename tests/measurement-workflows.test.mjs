import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parseFrontmatter } from 'astro/markdown';
import { analyzeSystem, newComponent, newConnection, newProfile } from '../src/lib/system-builder.mjs';
import { toolSchema } from '../src/lib/tool-schema.mjs';

async function authoredTool(slug) {
  const source = await readFile(new URL(`../src/content/docs/tools/${slug}.md`, import.meta.url), 'utf8');
  const { frontmatter } = parseFrontmatter(source);
  return { id: `tools/${slug}`, title: frontmatter.title, ...toolSchema.parse(frontmatter.tool) };
}

test('k6 matches a prepared HTTP connection without a schema or legacy performance goal', async () => {
  const tool = await authoredTool('k6');
  const profile = newProfile();
  profile.components = [newComponent('client'), newComponent('service')];
  profile.connections = [{ ...newConnection('http', 'client', 'service'), interface: 'HTTP API', definition: 'None', harness: 'yes', testInstance: 'yes', hostPlatform: 'Windows' }];
  const result = analyzeSystem(profile, [tool]);
  const match = result.matches.find(match => match.subjectId === 'http');
  assert.equal(match?.status, 'candidate');
  assert.deepEqual(match.goalIds, []);
  assert.deepEqual(match.findings, ['Performance threshold violations']);
  assert.equal(result.subjects.find(subject => subject.subjectId === 'http').candidates[0].toolId, 'tools/k6');
});

test('k6 does not promise readiness without a supplied script or for a non-HTTP connection', async () => {
  const tool = await authoredTool('k6');
  const profile = newProfile();
  profile.components = [newComponent('client'), newComponent('service')];
  profile.connections = [{ ...newConnection('http', 'client', 'service'), interface: 'HTTP API', harness: 'no', testInstance: 'yes', hostPlatform: 'Windows' }];
  assert.equal(analyzeSystem(profile, [tool]).matches.find(match => match.subjectId === 'http')?.status, 'blocked');
  profile.connections[0] = { ...profile.connections[0], interface: 'Custom protocol', transport: 'TCP', harness: 'yes' };
  assert.ok(!analyzeSystem(profile, [tool]).matches.some(match => match.status === 'candidate'));
});

test('coverage and mutation profiles remain catalog-only despite broad test-access answers', async () => {
  const tools = await Promise.all(['coverage-py', 'strykerjs'].map(authoredTool));
  const profile = newProfile();
  profile.components[0] = { ...profile.components[0], languages: ['Python', 'JavaScript'], inputs: ['Source code', 'Callable code'], inputsComplete: true, access: { rebuild: 'yes', instrument: 'yes', harness: 'yes', testInstance: 'yes' } };
  assert.equal(analyzeSystem(profile, tools).matches.length, 0);
});
