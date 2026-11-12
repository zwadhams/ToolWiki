import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import os from 'node:os';

const syft = process.argv[2] || 'syft';
await mkdir('reports', { recursive: true });
const environment = { ...process.env, SYFT_CHECK_FOR_APP_UPDATE: 'false' };
const version = spawnSync(syft, ['version', '-o', 'json'], { encoding: 'utf8', env: environment });
if (version.error) throw version.error;
assert.equal(version.status, 0, version.stderr);
const toolVersion = JSON.parse(version.stdout);
assert.equal(toolVersion.version, '1.57.1', 'This fixture was recorded with Syft 1.57.1; review changed output before updating the pin.');
const inventories = {};
const runs = [];
for (const name of ['baseline', 'changed']) {
  const args = ['scan', `dir:${name}`, '--override-default-catalogers', 'javascript-lock-cataloger', '-o', `syft-json=reports/${name}.syft.json`];
  const result = spawnSync(syft, args, { encoding: 'utf8', env: environment, timeout: 60000 });
  if (result.error) throw result.error;
  await writeFile(`reports/${name}.stdout.txt`, result.stdout);
  await writeFile(`reports/${name}.stderr.txt`, result.stderr);
  assert.equal(result.status, 0, result.stderr);
  const sbom = JSON.parse(await readFile(`reports/${name}.syft.json`, 'utf8'));
  assert.ok(sbom.artifacts.every(artifact => artifact.foundBy === 'javascript-lock-cataloger'));
  inventories[name] = sbom.artifacts.map(artifact => `${artifact.name}@${artifact.version}`).sort();
  runs.push({ name, command: ['syft', ...args], exitCode: result.status });
}
assert.deepEqual(inventories.baseline, ['is-number@7.0.0', 'toolwiki-inventory-fixture@1.0.0']);
assert.deepEqual(inventories.changed, ['is-number@6.0.0', 'is-number@7.0.0', 'is-odd@3.0.1', 'toolwiki-inventory-fixture@1.0.0']);
const inputsSha256 = {};
for (const file of ['baseline/package.json', 'baseline/package-lock.json', 'changed/package.json', 'changed/package-lock.json', 'verify.mjs']) inputsSha256[file] = createHash('sha256').update(await readFile(file)).digest('hex');
await writeFile('reports/run.json', JSON.stringify({
  executedAt: new Date().toISOString(),
  environment: { platform: process.platform, nodeArchitecture: process.arch, node: process.version, machine: os.machine(), osRelease: os.release(), syft: toolVersion },
  scope: 'Two local npm lockfile inventories, with only javascript-lock-cataloger enabled. No packages installed or application code executed; no vulnerability database or scanner invoked.',
  runs, inventories, inputsSha256,
}, null, 2) + '\n');
console.log(JSON.stringify(inventories, null, 2));
