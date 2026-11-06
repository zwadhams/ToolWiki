import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseFrontmatter } from 'astro/markdown';
import { toolSchema } from '../src/lib/tool-schema.mjs';
import { selectTools } from '../src/lib/catalog.mjs';
import { analyzeSystem, newComponent, newProfile } from '../src/lib/system-builder.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
async function profile(slug) {
  const { frontmatter } = parseFrontmatter(await readFile(new URL(`../src/content/docs/tools/${slug}.md`, import.meta.url), 'utf8'));
  return { id: `tools/${slug}`, title: frontmatter.title, description: frontmatter.description, ...toolSchema.parse(frontmatter.tool) };
}
const [typescript, powershell, shellcheck, codeql, ce, code] = await Promise.all([
  'typescript', 'psscriptanalyzer', 'shellcheck', 'codeql', 'semgrep-ce', 'semgrep-code',
].map(profile));
const system = (language, hostPlatform) => ({
  ...newProfile(),
  components: [{ ...newComponent('source'), languages: [language], inputs: ['Source code'], inputsComplete: true, hostPlatform }],
});
const match = (description, tool) => analyzeSystem(description, [tool]).matches[0];

test('new source-language entries are discoverable without changing ShellCheck language scope', () => {
  assert.deepEqual(selectTools([typescript], { language: 'TypeScript', input: 'Source code', finding: 'Type errors' }).map(t => t.id), ['tools/typescript']);
  assert.deepEqual(selectTools([powershell, shellcheck], { language: 'PowerShell', input: 'Source code' }).map(t => t.id), ['tools/psscriptanalyzer']);
});

test('TypeScript and PowerShell workflows distinguish known, missing, and unavailable prerequisites', () => {
  for (const [tool, language] of [[typescript, 'TypeScript'], [powershell, 'PowerShell']]) {
    const description = system(language, 'Windows');
    assert.equal(match(description, tool).status, 'candidate');
    description.components[0].hostPlatform = '';
    assert.equal(match(description, tool).status, 'details');
    description.components[0].hostPlatform = 'Windows';
    description.components[0].inputs = [];
    assert.equal(match(description, tool).status, 'blocked');
    description.components[0].inputsComplete = false;
    assert.equal(match(description, tool).status, 'details');
    description.components[0].languages = ['Java'];
    assert.equal(match(description, tool), undefined);
  }
  // The catalog documents conditional JS checking; the reviewed builder route is TS only.
  assert.ok(typescript.languages.includes('JavaScript'));
  assert.equal(match(system('JavaScript', 'Windows'), typescript), undefined);
});

test('Python query and pattern matching expose only the reviewed finding categories', () => {
  const python = system('Python', 'Linux');
  const ql = match(python, codeql), pattern = match(python, ce);
  assert.equal(ql.status, 'candidate');
  assert.equal(ql.workflowId, 'python-sql-injection');
  assert.deepEqual(ql.findings, ['Injection risks']);
  assert.equal(pattern.status, 'candidate');
  assert.equal(pattern.workflowId, 'python-shell-call');
  assert.deepEqual(pattern.findings, ['Unsafe API use']);
  for (const tool of [codeql, ce]) {
    const missing = system('Python', '');
    assert.equal(match(missing, tool).status, 'details');
    const unavailable = system('Python', 'Linux');
    unavailable.components[0].inputs = ['Binaries'];
    assert.equal(match(unavailable, tool).status, 'blocked');
    assert.equal(match(system('Java', 'Linux'), tool), undefined);
    assert.equal(match(system('C++', 'Linux'), tool), undefined);
  }
});

test('Python workflows retain cost, license, and CE/Code separation', () => {
  const python = system('Python', 'Linux');
  python.preferences.cost = 'Free';
  assert.equal(match(python, codeql).status, 'blocked');
  assert.equal(match(python, ce).status, 'candidate');
  python.preferences.cost = '';
  python.preferences.license = 'Open source';
  assert.equal(match(python, codeql).status, 'blocked');
  assert.equal(match(python, ce).status, 'candidate');
  assert.equal(match(python, code), undefined);
  assert.deepEqual(ce.analysisWorkflows.map(w => w.findings), [['Unsafe API use']]);
});

test('TypeScript fixture activates the intended diagnostic and its correction without emitting files', async () => {
  const packageInfo = JSON.parse(await readFile(new URL('../examples/typescript-check/package.json', import.meta.url), 'utf8'));
  const installed = JSON.parse(await readFile(new URL('../node_modules/typescript/package.json', import.meta.url), 'utf8'));
  assert.equal(installed.version, packageInfo.devDependencies.typescript);
  const run = variant => spawnSync(process.execPath, ['node_modules/typescript/bin/tsc', '--project', `examples/typescript-check/tsconfig.${variant}.json`, '--pretty', 'false'], { cwd: root, encoding: 'utf8', timeout: 30_000, windowsHide: true });
  const bad = run('bad'), good = run('good');
  assert.equal(bad.error, undefined);
  assert.equal(good.error, undefined);
  assert.equal(bad.status, 2);
  assert.match(bad.stdout, /error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'/);
  assert.equal(good.status, 0, good.stdout + good.stderr);
  assert.equal(good.stdout, '');
  for (const variant of ['bad', 'good']) {
    assert.deepEqual(await readdir(new URL(`../examples/typescript-check/${variant}/`, import.meta.url)), ['greeting.ts']);
  }
});
