import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseFrontmatter } from 'astro/markdown';
import { exportDocument } from '../src/lib/knowledge-export.mjs';
import { markdownText } from '../src/lib/knowledge-markdown.mjs';
import { toolSchema } from '../src/lib/tool-schema.mjs';

const json = async path => JSON.parse(await readFile(path, 'utf8'));
const metadata = await json('audits/execution-evidence/metadata.json');
const review = await json('audits/execution-evidence/review.json');
const base = 'https://github.com/zwadhams/ToolWiki/blob/main/';

test('reviewed legacy execution scopes and sources survive profile and agent export', async () => {
  for (const record of metadata.records) {
    const { frontmatter, content } = parseFrontmatter(await readFile(`src/content/docs/tools/${record.slug}.md`, 'utf8'));
    const expected = { status: 'recorded', scope: record.scope, sources: record.sources.map(path => base + path) };
    assert.deepEqual(frontmatter.executionEvidence, expected, `${record.slug}: reviewed execution metadata`);
    const doc = exportDocument({ id: `tools/${record.slug}`, body: content, data: { ...frontmatter, tool: toolSchema.parse(frontmatter.tool) } }, 'https://example.com/ToolWiki/');
    assert.deepEqual(doc.evidence.execution, expected, `${record.slug}: exported execution metadata`);
    assert.ok(doc.markdown.includes(markdownText(record.scope)), `${record.slug}: standalone scope`);
    for (const source of expected.sources) assert.ok(doc.markdown.includes(source), `${record.slug}: standalone provenance`);
  }
});

test('retained provenance files match reviewed repository or checkout bytes', async () => {
  const retained = new Map(review.retainedFiles.map(file => [file.path, [file.sha256, file.observedWorkingTreeSha256]]));
  for (const record of metadata.records) {
    for (const path of [...record.sources, ...record.supportingFiles]) assert.ok(retained.has(path), `${path}: missing digest`);
  }
  for (const [path, expected] of retained) {
    assert.ok(expected.includes(createHash('sha256').update(await readFile(path)).digest('hex')), `${path}: historical evidence changed`);
  }
});

test('execution inventory records decisions for the original profiles without promoting omitted tools', async () => {
  assert.equal(review.inventory.length, review.baselineProfiles);
  assert.equal(new Set(review.inventory.map(record => record.slug)).size, review.baselineProfiles);
  assert.deepEqual(review.inventory.filter(record => record.disposition === 'recorded-execution-metadata').map(record => record.slug).sort(), metadata.records.map(record => record.slug).sort());
  for (const slug of ['codeql', 'restler', 'semgrep-code']) {
    const { frontmatter, content } = parseFrontmatter(await readFile(`src/content/docs/tools/${slug}.md`, 'utf8'));
    const doc = exportDocument({ id: `tools/${slug}`, body: content, data: { ...frontmatter, tool: toolSchema.parse(frontmatter.tool) } }, 'https://example.com/ToolWiki/');
    assert.equal(doc.evidence.execution.status, 'not-recorded', `${slug}: another tool's run is not execution evidence`);
  }
});

test('recorded outcomes distinguish findings and measurement gates from process success', async () => {
  const mutation = await json('examples/test-quality/evidence/run.json');
  assert.deepEqual(mutation.runs.map(run => ({ exit: run.mutation_exit_code, counts: run.counts })), [
    { exit: 0, counts: { Killed: 5, Survived: 1 } },
    { exit: 0, counts: { Killed: 6 } },
  ]);
  const coverage = await json('examples/python-coverage/evidence/run.json');
  assert.deepEqual(coverage.runs.map(run => run.test_exit_code), [0, 0, 0]);
  assert.deepEqual(coverage.coverage_gates.map(gate => gate.return_code), [2, 0]);
  const semgrep = await json('audits/remaining-work/expansion-runs/semgrep.json');
  assert.deepEqual(semgrep.results.map(run => [run.input, run.return_code, run.findings]), [
    ['bad.py', 1, 1], ['good.py', 0, 0], ['not-covered.py', 0, 0],
  ]);
  assert.ok(semgrep.results.every(run => run.errors.length === 0 && run.scanned.includes(run.input)));
  const rtamt = await json('audits/remaining-work/executions/rtamt.json');
  assert.equal(rtamt.exit_code, 0);
  assert.deepEqual(rtamt.outcomes, { violating_at_zero: [0, -5], corrected_at_zero: [0, 1] });
});
