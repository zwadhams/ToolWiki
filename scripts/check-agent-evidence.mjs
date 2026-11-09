import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { sha256 } from '../src/lib/knowledge-format.mjs';
import { loadKnowledge } from '../mcp/knowledge.mjs';

const root = path.resolve('audits/agent-knowledge');
const read = file => readFile(path.join(root, file), 'utf8');
const parse = async file => JSON.parse(await read(file));
const snapshot = await loadKnowledge(path.resolve('dist/knowledge/v1/manifest.json'));
const readers = [['python', 'guides/python-checks'], ['api', 'guides/api-testing'], ['memory', 'guides/windows-memory-check'], ['memory-results', 'guides/windows-memory-check']];
for (const [reader, guide] of readers) {
  assert.equal((await parse(`readers/${reader}/completion.json`)).code, 0);
  const events = (await read(`readers/${reader}/mcp.jsonl`)).trim().split('\n').map(JSON.parse);
  assert.ok(events.some(e => e.direction === 'request' && e.message.method === 'initialize' && e.message.params.clientInfo.name === 'codex-mcp-client'));
  assert.ok(events.some(e => e.direction === 'response' && e.message.result?.serverInfo?.name === 'toolwiki'));
  const requests = events.filter(e => e.direction === 'request' && e.message.method === 'tools/call');
  assert.ok(requests.some(e => e.message.params.name === 'search_knowledge'));
  const request = requests.find(e => e.message.params.name === 'get_document' && e.message.params.arguments.id === guide);
  assert.ok(request, `${reader} must read ${guide} through MCP`);
  const response = events.find(e => e.direction === 'response' && e.pid === request.pid && e.message.id === request.message.id).message.result;
  assert.ok(!response.isError);
  const doc = response.structuredContent || JSON.parse(response.content[0].text);
  assert.equal(doc.snapshotRevision, snapshot.revision, 'Audit snapshot changed: reassess affected reader scenarios.');
  assert.equal(doc.revision, snapshot.documents.find(d => d.id === guide).revision);
  assert.equal(doc.nextOffset, null, 'These reader scenarios must retain the full guide.');
}
assert.equal((await parse('readers/protocol-retest/completion.json')).code, 0);
const retest = (await read('readers/protocol-retest/mcp.jsonl')).trim().split('\n').map(JSON.parse);
assert.ok(retest.some(e => e.direction === 'response' && e.message.result?.isError && JSON.stringify(e.message.result).includes('MCP response exceeds 120000 bytes')));
for (const guide of ['guides/python-checks', 'guides/api-testing', 'guides/windows-memory-check']) {
  const chunks = new Map();
  for (const request of retest.filter(e => e.direction === 'request' && e.message.method === 'tools/call' && e.message.params.name === 'get_document' && e.message.params.arguments.id === guide && !e.message.params.arguments.section)) {
    const response = retest.find(e => e.direction === 'response' && e.pid === request.pid && e.message.id === request.message.id).message.result;
    assert.ok(!response.isError);
    const doc = response.structuredContent || JSON.parse(response.content[0].text);
    chunks.set(doc.offset, doc.markdown);
  }
  let combined = '';
  for (const [offset, markdown] of [...chunks].sort((a, b) => a[0] - b[0])) { assert.equal(offset, combined.length); combined += markdown; }
  assert.equal(combined, snapshot.documents.find(d => d.id === guide).markdown);
}

const python = 'readers/python/reader-20261109-091356';
const commands = await parse(`${python}/commands.json`);
for (const [name, code] of [['install', 0], ['fixture-bad', 1], ['fixture-good', 0], ['synthetic-bad-ruff', 1], ['synthetic-bad-mypy', 1], ['synthetic-good-ruff', 0], ['synthetic-good-mypy', 0]]) assert.equal(commands.find(c => c.name === name).exit_code, code);
for (const variant of ['bad', 'good']) {
  const run = await parse(`${python}/fixture-${variant}/run.json`);
  assert.equal(run.python, '3.13.15');
  assert.deepEqual(run.results.map(r => [r.tool, r.version, r.return_code]), [['ruff', '0.14.3', variant === 'bad' ? 1 : 0], ['mypy', '1.18.2', variant === 'bad' ? 1 : 0]]);
}
assert.match(await read(`${python}/synthetic-bad-ruff.stdout.txt`), /F401/);
assert.match(await read(`${python}/synthetic-bad-mypy.stdout.txt`), /arg-type/);
assert.deepEqual(JSON.parse(await read(`${python}/synthetic-good-ruff.stdout.txt`)), []);
assert.match(await read(`${python}/synthetic-good-mypy.stdout.txt`), /Success: no issues found/);

const api = 'readers/api/run-20261109-091329';
for (const [name, code] of [['original-faulty-replay', 0], ['original-fixed-replay', 0], ['original-faulty-generated', 1], ['original-fixed-generated', 0], ['adapted-faulty-positive', 1], ['adapted-fixed-positive', 0], ['adapted-fixed-negative', 1], ['adapted-method-fixed-positive', 0], ['adapted-method-fixed-negative', 0]]) assert.equal(Number(await read(`${api}/${name}/exit-code.txt`)), code);
assert.match(await read(`${api}/original-faulty-wrapper/stdout.txt`), /500/);
assert.match(await read(`${api}/adapted-fixed-negative/stdout.txt`), /501/);
const adaptedCommand = await read(`${api}/adapted-method-fixed-negative/command.json`);
for (const value of ['parcels', '8793', 'parcel-contract.json', 'negative_data_rejection', 'not_a_server_error']) assert.ok(adaptedCommand.includes(value));
assert.match(await read(`${api}/adapted-method-fixed-negative/stdout.txt`), /25/);
for (const service of ['original-faulty', 'original-fixed', 'adapted-faulty', 'adapted-fixed', 'adapted-method-fixed']) {
  const cleanup = await parse(`${api}/${service}-server/cleanup.json`);
  assert.equal(cleanup.own_process_exited, true); assert.equal(cleanup.port_refuses_connection, true);
}

const ci = await parse('ci/42653327079/run.json');
assert.equal(ci.host.osArchitecture, 'X64'); assert.equal(ci.host.processArchitecture, 'X64');
for (const name of ['bad-build', 'good-build', 'good-run']) assert.equal(ci.commands.find(c => c.name === name).exitCode, 0);
const bad = ci.commands.find(c => c.name === 'bad-run');
assert.notEqual(bad.exitCode, 0);
for (const pattern of [/AddressSanitizer: heap-buffer-overflow/, /WRITE of size 4/, /bounds\.c:5/, /0 bytes after 8-byte region/]) assert.match(bad.stderr, pattern);
assert.equal(ci.commands.find(c => c.name === 'good-run').stderr, '');
const source = await parse('ci/42653327079/source.json');
const script = execFileSync('git', ['show', `${source.commit}:${source.script}`]);
assert.equal(sha256(script), source.scriptSha256AtCommit);
assert.equal(sha256(await readFile(source.script)), source.scriptSha256AtCommit);
assert.equal(sha256(await readFile(path.join(root, 'ci/42653327079/run.json'))), source.runRecordSha256);
for (const [kind, index] of [['bad', 0], ['good', 1]]) assert.equal(sha256(await readFile(path.join(root, `readers/memory/fresh-${kind}-bounds.c`))).toUpperCase(), ci.inputs[index].sha256);

let hashesChecked = 0, auxiliaryOmissions = 0;
for (const [directory, manifest] of [[python, 'final-hashes.json'], [api, 'sha256.json']]) {
  for (const [filename, expected] of Object.entries(await parse(`${directory}/${manifest}`))) {
    if (filename.includes('mypy-cache') || filename === 'downloaded-examples.zip') { auxiliaryOmissions++; continue; }
    const file = path.join(root, directory, filename.replaceAll('\\', '/'));
    assert.ok((await stat(file)).isFile()); assert.equal(sha256(await readFile(file)), expected); hashesChecked++;
  }
}
const retained = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', 'audits/agent-knowledge'], { encoding: 'utf8' }).trim().split('\n');
for (const file of retained) assert.ok((await readFile(file)).every(byte => byte < 128), `Non-ASCII retained evidence: ${file}`);
console.log(`Verified 4 workflow/interpretation MCP sessions plus the fresh protocol retest, complete guide pagination, response-limit recovery, Python/API fault and adaptation results, service cleanup, native x64 memory diagnostics, script provenance, ${hashesChecked} retained file hashes and ${retained.length} ASCII files. ${auxiliaryOmissions} auxiliary cache/archive entries are intentionally not required.`);
