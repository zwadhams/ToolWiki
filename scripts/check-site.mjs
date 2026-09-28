import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { selectTools, suggestTools } from '../src/lib/catalog.mjs';
import { analyzeSystem, newComponent, newConnection, newProfile } from '../src/lib/system-builder.mjs';

const root = path.resolve('dist');
const base = '/ToolWiki/';
const origin = 'https://zwadhams.github.io';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const pages = (await walk(root)).filter((file) => file.endsWith('.html'));
const errors = [];
const contents = new Map(await Promise.all(pages.map(async (file) => [file, await readFile(file, 'utf8')])));
for (const [file, html] of contents) {
  const route = '/' + path.relative(root, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  const current = new URL(base.slice(0, -1) + route, origin);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Expected one page title: ${file}`);
  for (const tag of html.matchAll(/<(?:a|link|script|img)\b[^>]*>/g)) {
    if (/\brel="(?:canonical|alternate)"/.test(tag[0])) continue;
    const match = tag[0].match(/\b(?:href|src)="([^"]+)"/);
    if (!match) continue;
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const url = new URL(raw, current);
    if (url.origin !== origin || !url.pathname.startsWith(base)) continue;
    const relative = decodeURIComponent(url.pathname.slice(base.length));
    let target = path.join(root, relative);
    if (!target.startsWith(root + path.sep) && target !== root) { errors.push(`Invalid target: ${raw}`); continue; }
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = contents.get(target) || await readFile(target, 'utf8');
        const fragment = decodeURIComponent(url.hash.slice(1));
        if (!targetHtml.includes(`id="${fragment}"`)) errors.push(`${route}: missing fragment ${raw}`);
      }
    } catch { errors.push(`${route}: missing ${raw}`); }
  }
}
assert.equal(errors.length, 0, errors.join('\n'));
await stat(path.join(root, 'pagefind', 'pagefind.js'));
const catalogHtml = contents.get(path.join(root, 'index.html'));
const catalog = JSON.parse(catalogHtml.match(/<script[^>]*data-catalog-data[^>]*>([\s\S]*?)<\/script>/)[1]);
for (const tool of catalog) {
  for (const q of [tool.title, ...(tool.aliases || [])]) {
    assert.ok(selectTools(catalog, { q }).some(({ id }) => id === tool.id), `${q} must find ${tool.id}`);
  }
}
for (const [q, id] of [
  ['ASan', 'tools/address-sanitizer'], ['TSan', 'tools/thread-sanitizer'],
  ['AFL plus plus', 'tools/afl-plus-plus'], ['buffer overflow', 'tools/address-sanitizer'],
  ['C sharp', 'tools/dotnet-analyzers'],
]) assert.equal(selectTools(catalog, { q })[0]?.id, id, `${q} should rank ${id} first`);
assert.ok(!selectTools(catalog, { q: 'go' }).some(({ id }) => id === 'tools/cargo-audit'));
assert.ok(!selectTools(catalog, { q: 'java' }).some(({ id }) => id === 'tools/eslint'));
assert.ok(suggestTools(catalog, { q: 'semgerp', cost: 'Free' }).some(({ id }) => id === 'tools/semgrep-ce'));
assert.ok(!suggestTools(catalog, { q: 'semgerp', cost: 'Free' }).some(({ id }) => id === 'tools/semgrep-code'));
for (const [q, id, filters] of [
  ['Python type checker', 'tools/mypy', { input: 'Source code', language: 'Python', finding: 'Type errors' }],
  ['bash linter', 'tools/shellcheck', { input: 'Source code', language: 'Bash' }],
  ['clang tidy', 'tools/clang-tidy', { input: 'Source code', language: 'C++' }],
  ['UBSan', 'tools/undefined-behavior-sanitizer', { mode: 'Dynamic', input: 'Binaries' }],
  ['container scanner', 'tools/trivy', { mode: 'Static', input: 'Container images' }],
  ['IaC', 'tools/trivy', { input: 'Configuration files', finding: 'Security misconfiguration' }],
  ['Python type checker', 'tools/pyright', { input: 'Source code', language: 'Python' }],
  ['Ruby linter', 'tools/rubocop', { input: 'Source code', language: 'Ruby' }],
  ['SQL linting', 'tools/sqlfluff', { language: 'SQL', technique: 'Linting' }],
  ['CSS linter', 'tools/stylelint', { language: 'CSS', input: 'Source code' }],
  ['Dockerfile linting', 'tools/hadolint', { input: 'Configuration files' }],
  ['Terraform security', 'tools/checkov', { input: 'Configuration files', finding: 'Security misconfiguration' }],
  ['GitHub Actions', 'tools/actionlint', { input: 'Configuration files' }],
  ['Go CVE', 'tools/govulncheck', { language: 'Go', finding: 'Known vulnerable dependencies' }],
  ['SBOM', 'tools/grype', { input: 'Dependency metadata', finding: 'Known vulnerable dependencies' }],
  ['secret scanning', 'tools/detect-secrets', { finding: 'Exposed secrets' }],
  ['MSan', 'tools/memory-sanitizer', { mode: 'Dynamic', input: 'Binaries' }],
  ['race conditions', 'tools/thread-sanitizer', { mode: 'Dynamic', language: 'C++' }],
  ['race conditions', 'tools/valgrind-helgrind', { mode: 'Dynamic', language: 'C++' }],
  ['go test -race', 'tools/go-race-detector', { mode: 'Dynamic', language: 'Go' }],
  ['unsafe Rust', 'tools/miri', { mode: 'Dynamic', input: 'Callable code' }],
  ['Python fuzzing', 'tools/atheris', { mode: 'Dynamic', language: 'Python' }],
  ['TypeScript property testing', 'tools/fast-check', { input: 'Callable code' }],
  ['LLVM bitcode', 'tools/klee', { mode: 'Static', input: 'Binaries' }],
  ['C verification', 'tools/cpachecker', { input: 'Source code', language: 'C' }],
  ['C++ verification', 'tools/esbmc', { input: 'Source code', language: 'C++' }],
]) assert.ok(selectTools(catalog, { q, cost: 'Free', ...filters }).some((tool) => tool.id === id), `${q} must find ${id} with its scope filters`);
assert.ok(!selectTools(catalog, { q: 'Trivy', input: 'Source code', language: 'Python' }).length, 'Dependency ecosystem support must not imply source analysis');
assert.ok(!selectTools(catalog, { q: 'UBSan', mode: 'Static' }).length, 'UBSan needs instrumented execution');
for (const q of ['Grype', 'Dependency-Check', 'Hadolint', 'Checkov', 'actionlint']) {
  assert.ok(!selectTools(catalog, { q, input: 'Source code' }).some(({ id }) => id === `tools/${q.toLowerCase()}`), `${q} must not imply general source-code defect analysis`);
}
assert.ok(!selectTools(catalog, { q: 'Miri', input: 'Binaries' }).length, 'Miri must not appear as an arbitrary native-binary checker');
assert.ok(!selectTools(catalog, { q: 'MSan', mode: 'Static' }).length, 'MSan needs instrumented execution');
console.log(`Verified ${pages.length} built pages, local links, fragments, assets, search index, and discovery for ${catalog.length} tools.`);

const builderHtml = contents.get(path.join(root, 'analysis-suite', 'index.html'));
assert.ok(builderHtml?.includes('<system-builder'), 'Builder page must render its component');
assert.ok(catalogHtml.includes('/ToolWiki/analysis-suite/'), 'Builder must appear in navigation');
const builder = JSON.parse(builderHtml.match(/<script[^>]*data-builder-data[^>]*>([\s\S]*?)<\/script>/)[1]);
assert.equal(builder.totalTools, catalog.length);
assert.ok(builder.tools.length >= 80, 'Keep the reviewed workflow catalog available');
assert.ok(builder.tools.every(t => t.analysisWorkflows.length));
const system = newProfile();
system.components = [{ ...newComponent('service'), languages: ['Python'], inputs: ['Source code'], inputsComplete: true, hostPlatform: 'Linux' }, { ...newComponent('device'), languages: ['C++'], inputs: ['Binaries'], inputsComplete: true, binaryFormat: 'Native executable', targetPlatform: 'Linux', access: { rebuild: 'no', instrument: 'no', harness: 'no', testInstance: 'yes' } }];
system.connections = [{ ...newConnection('api', 'service', 'device'), interface: 'HTTP API', definition: 'OpenAPI', testInstance: 'yes', hostPlatform: 'Linux' }];
const candidates = (id, data = analyzeSystem(system, builder.tools)) => data.subjects.find(s => s.subjectId === id).candidates.map(c => c.toolId);
assert.ok(candidates('service').includes('tools/ruff'));
assert.ok(!candidates('service').includes('tools/cppcheck'));
assert.ok(candidates('device').includes('tools/valgrind-memcheck'));
assert.ok(!candidates('device').includes('tools/address-sanitizer'));
assert.ok(!candidates('device').includes('tools/spotbugs'));
assert.ok(candidates('api').includes('tools/schemathesis'));
system.connections[0].interface = 'MQTT'; system.connections[0].transport = 'TCP';
assert.equal(candidates('api').length, 0, 'MQTT over TCP must not inherit HTTP or custom-protocol support');
assert.ok(!candidates('service').includes('tools/trivy'), 'Python source must not imply a Trivy dependency workflow');
console.log(`Verified builder navigation and real-catalog recommendations for ${builder.tools.length} reviewed tools.`);
