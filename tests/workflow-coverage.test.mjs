import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { analyzeSystem, newComponent, newProfile } from '../src/lib/system-builder.mjs';

async function authoredTool(slug) {
  const { frontmatter } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
  return { id: `tools/${slug}`, title: frontmatter.title, ...toolSchema.parse(frontmatter.tool) };
}

function profileFor(component) {
  return {
    ...newProfile(),
    components: [{ ...newComponent('subject'), ...component }],
    connections: [],
  };
}

test('Python coverage needs callable source and workload access, not only a running service', async () => {
  const tool = await authoredTool('coverage-py');
  const profile = profileFor({ languages: ['Python'], inputs: ['Source code', 'Callable code'], inputsComplete: true, hostPlatform: 'Windows' });
  profile.components[0].access.testInstance = 'yes';
  profile.components[0].access.instrument = 'yes';
  assert.equal(analyzeSystem(profile, [tool]).matches[0]?.status, 'candidate');
  profile.components[0].access.testInstance = 'unknown';
  assert.equal(analyzeSystem(profile, [tool]).matches[0]?.status, 'details');
  profile.components[0].access.testInstance = 'no';
  assert.equal(analyzeSystem(profile, [tool]).matches[0]?.status, 'blocked');
  profile.components[0].access.testInstance = 'yes';
  profile.components[0].inputs = ['Running applications'];
  assert.equal(analyzeSystem(profile, [tool]).matches[0]?.status, 'blocked');
  profile.components[0].inputs = ['Source code', 'Callable code'];
  profile.components[0].languages = ['JavaScript'];
  assert.equal(analyzeSystem(profile, [tool]).matches.length, 0);
});

test('PVS-Studio matching retains the reviewed JS/TS diagnostic scope', async () => {
  const tool = await authoredTool('pvs-studio');
  const profile = profileFor({ languages: ['TypeScript'], inputs: ['Source code'], inputsComplete: true, hostPlatform: 'Linux' });
  const result = analyzeSystem(profile, [tool]);
  assert.equal(result.matches[0]?.status, 'candidate');
  assert.deepEqual(result.matches[0].findings, ['Logic errors']);
  assert.ok(!result.matches[0].findings.includes('Memory safety'));
  profile.components[0].languages = ['C++'];
  profile.components[0].access.rebuild = 'yes';
  assert.equal(analyzeSystem(profile, [tool]).matches.length, 0);
  profile.components[0].languages = ['JavaScript'];
  profile.components[0].inputs = ['Binaries'];
  profile.components[0].binaryFormat = 'Native executable';
  assert.equal(analyzeSystem(profile, [tool]).matches[0]?.status, 'blocked');
});

test('Sonar editions match Python source separately and retain distinct cost boundaries', async () => {
  const tools = await Promise.all(['sonarqube-community', 'sonarqube'].map(authoredTool));
  const profile = profileFor({ languages: ['Python'], inputs: ['Source code'], inputsComplete: true, hostPlatform: 'Linux' });
  profile.components[0].access = { rebuild: 'no', instrument: 'no', harness: 'no', testInstance: 'no' };
  assert.deepEqual(analyzeSystem(profile, tools).matches.map(match => match.status), ['candidate', 'candidate']);
  profile.preferences.cost = 'Free';
  const matches = analyzeSystem(profile, tools).matches;
  assert.equal(matches.find(match => match.toolId === 'tools/sonarqube-community')?.status, 'candidate');
  assert.equal(matches.find(match => match.toolId === 'tools/sonarqube')?.status, 'blocked');
  profile.preferences.cost = '';
  profile.components[0].languages = ['Java'];
  assert.equal(analyzeSystem(profile, tools).matches.length, 0);
});

test('unrepresented prerequisites do not become candidates from broad source and access answers', async () => {
  const excluded = ['coverity-scan', 'coverity', 'gitleaks', 'mobsf', 'py-spy', 'semgrep-code', 's-taliro', 'strykerjs'];
  const tools = await Promise.all(excluded.map(authoredTool));
  const profile = profileFor({
    languages: ['C', 'C++', 'Python', 'JavaScript', 'MATLAB', 'Simulink'],
    inputs: ['Source code', 'Callable code', 'Running applications', 'Binaries', 'Executable models'],
    inputsComplete: true,
    hostPlatform: 'Linux',
    targetPlatform: 'Android',
    binaryFormat: 'Other',
    technologies: ['Docker', 'MATLAB', 'Simulink'],
    access: { rebuild: 'yes', instrument: 'yes', harness: 'yes', testInstance: 'yes' },
  });
  assert.equal(analyzeSystem(profile, tools).matches.length, 0);
  for (const slug of excluded) {
    const body = await readFile(`src/content/docs/tools/${slug}.md`, 'utf8');
    assert.ok(body.includes('## System builder scope'), slug);
  }
});
