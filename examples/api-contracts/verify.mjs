import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

await mkdir('reports', { recursive: true });
await rm('reports/pacts/ParcelClient-ParcelAPI.json', { force: true });
const cases = [
  { name: 'spectral-bad', args: ['node_modules/@stoplight/spectral-cli/dist/index.js', 'lint', 'openapi.bad.json', '--ruleset', '.spectral.yaml', '--format', 'json', '--output', 'reports/spectral-bad.json', '--fail-severity', 'error'], expected: 1 },
  { name: 'spectral-good', args: ['node_modules/@stoplight/spectral-cli/dist/index.js', 'lint', 'openapi.good.json', '--ruleset', '.spectral.yaml', '--format', 'json', '--output', 'reports/spectral-good.json', '--fail-severity', 'error'], expected: 0 },
  { name: 'consumer', args: ['consumer.mjs'], expected: 0 },
  { name: 'provider-bad', args: ['provider-check.mjs', 'bad'], expected: 1 },
  { name: 'provider-good', args: ['provider-check.mjs', 'good'], expected: 0 },
];
const results = [];
for (const item of cases) {
  const result = spawnSync(process.execPath, item.args, { encoding: 'utf8', timeout: 120000, env: { ...process.env, PACT_DO_NOT_TRACK: '1', NO_COLOR: '1' } });
  await writeFile(`reports/${item.name}.stdout.txt`, result.stdout || '');
  await writeFile(`reports/${item.name}.stderr.txt`, result.stderr || '');
  if (result.error) throw result.error;
  assert.equal(result.status, item.expected, `${item.name}: ${result.stderr || result.stdout}`);
  if (item.name === 'spectral-bad') {
    const diagnostics = JSON.parse(await readFile('reports/spectral-bad.json', 'utf8'));
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].code, 'operation-id-required');
    assert.deepEqual(diagnostics[0].path, ['paths', '/parcels/1', 'get']);
  }
  if (item.name === 'spectral-good') assert.deepEqual(JSON.parse(await readFile('reports/spectral-good.json', 'utf8')), []);
  if (item.name === 'provider-bad') {
    assert.match(result.stdout + result.stderr, /\$\.status/);
    assert.match(result.stdout + result.stderr, /Expected 7 \(Integer\) to be the same type as 'queued' \(String\)/);
  }
  results.push({ name: item.name, command: ['node', ...item.args], exitCode: result.status });
  console.log(`${item.name}: expected exit ${item.expected}, observed ${result.status}`);
}
const inputs = ['package.json', 'package-lock.json', '.spectral.yaml', 'openapi.bad.json', 'openapi.good.json', 'client.mjs', 'consumer.mjs', 'provider-check.mjs', 'verify.mjs'];
const hashes = {};
for (const file of inputs) hashes[file] = createHash('sha256').update(await readFile(file)).digest('hex');
const readPackage = async name => JSON.parse(await readFile(path.join('node_modules', name, 'package.json'), 'utf8')).version;
await writeFile('reports/run.json', JSON.stringify({
  executedAt: new Date().toISOString(),
  environment: { platform: process.platform, nodeArchitecture: process.arch, machine: os.machine(), osRelease: os.release(), node: process.version, spectral: await readPackage('@stoplight/spectral-cli'), pact: await readPackage('@pact-foundation/pact'), pactCore: await readPackage('@pact-foundation/pact-core') },
  scope: 'One custom document-lint rule and one consumer-generated HTTP interaction with a type-mismatched and corrected local provider. No broker, published result, or external target.',
  results, inputsSha256: hashes,
}, null, 2) + '\n');
