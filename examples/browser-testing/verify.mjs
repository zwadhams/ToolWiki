import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const directory = fileURLToPath(new URL('./', import.meta.url));
const ascii = text => text.replace(/\u001b\[[0-9;]*m/g, '').replace(/[^\x00-\x7f]/g, character => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);
const json = data => ascii(JSON.stringify(data, null, 2)) + '\n';
const flatten = suites => suites.flatMap(suite => [...suite.specs, ...flatten(suite.suites || [])]);
const packageVersion = async name => JSON.parse(await readFile(new URL(`node_modules/${name}/package.json`, import.meta.url), 'utf8')).version;
const cases = [];
for (const mode of ['bad', 'good']) {
  const command = ['node', 'run.mjs', mode];
  const outcome = spawnSync(process.execPath, command.slice(1), { cwd: directory, encoding: 'utf8', timeout: 60000 });
  if (outcome.error) throw outcome.error;
  const resultDirectory = new URL(`.results/${mode}/`, import.meta.url);
  await mkdir(resultDirectory, { recursive: true });
  await writeFile(new URL('stdout.txt', resultDirectory), ascii(outcome.stdout || ''));
  await writeFile(new URL('stderr.txt', resultDirectory), ascii(outcome.stderr || ''));
  assert.equal(outcome.status, mode === 'bad' ? 1 : 0, `${mode}: unexpected process status; inspect .results/${mode}`);
  const report = JSON.parse(await readFile(new URL('report.json', resultDirectory), 'utf8'));
  assert.deepEqual(report.errors, [], `${mode}: runner infrastructure errors are not expected findings`);
  const specs = flatten(report.suites);
  assert.equal(specs.length, 2);
  const tests = specs.map(spec => {
    assert.equal(spec.tests.length, 1);
    const test = spec.tests[0];
    assert.equal(test.results.length, 1, 'Retries must stay disabled in this example');
    const result = test.results[0];
    assert.equal(result.status, mode === 'bad' ? 'failed' : 'passed');
    const axe = result.attachments.find(attachment => attachment.name === 'axe-summary');
    return {
      title: spec.title, status: result.status,
      browserVersion: test.annotations.find(annotation => annotation.type === 'browser-version')?.description,
      errors: (result.errors || []).map(error => ascii(error.message)),
      ...(axe ? { axe: JSON.parse(Buffer.from(axe.body, 'base64').toString('utf8')) } : {}),
    };
  });
  const capability = tests.find(test => test.title.startsWith('search finds'));
  const accessibility = tests.find(test => test.axe);
  assert.ok(capability && accessibility);
  assert.ok(tests.every(test => test.browserVersion), 'The browser must have started');
  assert.deepEqual(accessibility.axe.violationIds, mode === 'bad' ? ['label'] : []);
  if (mode === 'bad') assert.ok(capability.errors.some(message => message.includes('toHaveCount') && message.includes('Received: 0')));
  cases.push({ mode, command, exitCode: outcome.status, durationMs: report.stats.duration, tests });
}
const inputPaths = ['package.json', 'pnpm-lock.yaml', 'run.mjs', 'verify.mjs', 'playwright.config.mjs', 'server.mjs', 'tests/search.spec.mjs', 'fixtures/bad.html', 'fixtures/good.html'];
const inputs = await Promise.all(inputPaths.map(async path => {
  const bytes = await readFile(new URL(path, import.meta.url));
  return { path, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}));
const record = {
  recordedAt: new Date().toISOString(),
  environment: { os: os.type(), release: os.release(), node: process.version, nodeArchitecture: process.arch },
  versions: { playwrightTest: await packageVersion('@playwright/test'), axePlaywright: await packageVersion('@axe-core/playwright') },
  target: 'http://127.0.0.1:8837/',
  scope: 'Bundled headless Chromium, one 1000x720 viewport, authored search checks, and the initial page with wcag2a/wcag2aa/wcag21a/wcag21aa axe rule tags. No manual accessibility assessment or other browser/platform was executed.',
  inputs, cases,
};
await writeFile(new URL('.results/verification.json', import.meta.url), json(record));
console.log('Verified two intended failures on the faulty page and two passing checks on the corrected page.');
console.log('Evidence: .results/verification.json; full reports and axe attachments: .results/{bad,good}/report.json.');
