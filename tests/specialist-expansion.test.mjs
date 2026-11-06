import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { selectTools } from '../src/lib/catalog.mjs';
import { analyzeSystem, newComponent, newProfile } from '../src/lib/system-builder.mjs';

const tools = await Promise.all(['gitleaks', 'mobsf', 'verilator', 'py-spy'].map(async slug => {
  const { frontmatter: data } = parseFrontmatter(await readFile(new URL(`../src/content/docs/tools/${slug}.md`, import.meta.url), 'utf8'));
  return { id: `tools/${slug}`, title: data.title, description: data.description, ...toolSchema.parse(data.tool) };
}));

test('specialist profiles are discoverable for their reviewed material', () => {
  for (const [id, filters] of [
    ['tools/gitleaks', { q: 'Git history', finding: 'Exposed secrets' }],
    ['tools/mobsf', { q: 'APK', input: 'Binaries', mode: 'Static' }],
    ['tools/verilator', { language: 'SystemVerilog', input: 'Source code', mode: 'Static' }],
    ['tools/py-spy', { q: 'profiling', language: 'Python', input: 'Running applications', mode: 'Dynamic' }],
  ]) assert.ok(selectTools(tools, filters).some(tool => tool.id === id), id);
  assert.ok(!selectTools(tools, { language: 'C++', input: 'Source code' }).some(tool => tool.id === 'tools/verilator'));
  assert.ok(!selectTools(tools, { q: 'C++' }).some(tool => tool.id === 'tools/verilator'));
});

test('history, APK and process-inspection profiles remain outside automatic matching', () => {
  const deferred = tools.filter(tool => tool.id !== 'tools/verilator');
  assert.ok(deferred.every(tool => tool.analysisWorkflows.length === 0));
  const profile = newProfile();
  profile.components = [{ ...newComponent('sample'), languages: ['Python'], inputs: ['Source code', 'Binaries', 'Running applications'], binaryFormat: 'Other', hostPlatform: 'Linux' }];
  assert.deepEqual(analyzeSystem(profile, deferred).matches, []);
});

test('HDL lint matches supported source without inheriting simulation or generated-language scope', () => {
  const tool = tools.find(tool => tool.id === 'tools/verilator');
  const profile = newProfile();
  profile.components = [{ ...newComponent('design'), languages: ['Verilog'], inputs: ['Source code'], inputsComplete: true, hostPlatform: 'Linux' }];
  const match = analyzeSystem(profile, [tool]).matches[0];
  assert.equal(match.workflowId, 'hdl-lint');
  assert.equal(match.status, 'candidate');
  assert.deepEqual(match.findings, ['Logic errors', 'Coding conventions']);
  profile.components[0].inputs = ['Binaries'];
  assert.equal(analyzeSystem(profile, [tool]).matches[0].status, 'blocked');
  profile.components[0].inputs = ['Source code'];
  profile.components[0].languages = ['C++'];
  assert.deepEqual(analyzeSystem(profile, [tool]).matches, []);
});
