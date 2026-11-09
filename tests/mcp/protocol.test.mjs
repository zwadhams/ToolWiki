import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { createKnowledge, loadKnowledge } from '../../mcp/knowledge.mjs';
import { analyzeSystem, newComponent, newConnection, newProfile } from '../../src/lib/system-builder.mjs';
import { comparisonTools } from '../../src/lib/tool-data.mjs';

const manifestPath = path.resolve('dist/knowledge/v1/manifest.json');
const snapshot = await loadKnowledge(manifestPath);
const toolData = snapshot.documents.filter(d => d.tool).map(d => ({ id: d.id, title: d.title, description: d.description, ...d.tool }));
const knowledge = createKnowledge(snapshot);
const decode = result => { assert.ok(!result.isError, JSON.stringify(result)); return result.structuredContent || JSON.parse(result.content[0].text); };

test('real stdio discovery, all four tools, resources, input errors, and shutdown', { timeout: 30000 }, async () => {
  const client = new Client({ name: 'toolwiki-test', version: '1.0.0' });
  const transport = new StdioClientTransport({ command: process.execPath, args: ['--experimental-strip-types', path.resolve('mcp/server.ts'), '--manifest', manifestPath], cwd: path.dirname(manifestPath), stderr: 'pipe' });
  let stderr = ''; transport.stderr?.on('data', chunk => { stderr += chunk; });
  await client.connect(transport);
  const pid = transport.pid;
  try {
    assert.deepEqual((await client.listTools()).tools.map(t => t.name).sort(), ['compare_tools', 'get_document', 'recommend_checks', 'search_knowledge']);
    const search = decode(await client.callTool({ name: 'search_knowledge', arguments: { query: 'Python', filters: { kind: 'guide' } } }));
    assert.equal(search.snapshotRevision, snapshot.revision);
    assert.ok(search.results.some(d => d.id === 'guides/python-checks'));
    const doc = decode(await client.callTool({ name: 'get_document', arguments: { id: 'guides/python-checks' } }));
    assert.equal(doc.evidence.execution.status, 'recorded');
    assert.ok(doc.markdown.includes('Python 3.13'));
    const section = decode(await client.callTool({ name: 'get_document', arguments: { id: doc.id, section: doc.sections[0].id } }));
    assert.ok(section.markdown.startsWith('## '));
    const comparison = decode(await client.callTool({ name: 'compare_tools', arguments: { ids: ['tools/ruff', 'tools/mypy'] } }));
    assert.deepEqual(comparison.tools.map(({ citation, ...tool }) => tool), comparisonTools(['tools/ruff', 'tools/mypy'].map(id => toolData.find(t => t.id === id))));
    const profile = newProfile(); profile.components = [{ ...newComponent('python'), languages: ['Python'], inputs: ['Source code'], hostPlatform: 'Windows' }];
    const recommended = decode(await client.callTool({ name: 'recommend_checks', arguments: { profile, limit: 20 } }));
    assert.ok(recommended.matches.some(m => m.toolId === 'tools/ruff'));
    const resources = await client.listResources(); assert.equal(resources.resources[0].uri, 'toolwiki://snapshot');
    const resource = JSON.parse((await client.readResource({ uri: 'toolwiki://snapshot' })).contents[0].text);
    assert.equal(resource.revision, snapshot.revision); assert.equal(resource.documents.length, snapshot.documents.length);
    for (const request of [
      { name: 'get_document', arguments: { id: 'does-not-exist' } },
      { name: 'get_document', arguments: { id: 'guides/python-checks', section: 'bad-section' } },
      { name: 'search_knowledge', arguments: { filters: { language: 'Imaginary' } } },
      { name: 'search_knowledge', arguments: { query: 'x'.repeat(301) } },
      { name: 'compare_tools', arguments: { ids: ['tools/ruff', 'tools/ruff'] } },
    ]) {
      let response;
      try { response = await client.callTool(request); }
      catch (error) { assert.match(error.message, /Invalid|validation|arguments/i); continue; }
      assert.equal(response.isError, true, JSON.stringify(request));
    }
    assert.equal(decode(await client.callTool({ name: 'search_knowledge', arguments: { query: 'qwertyuiop-nonexistent' } })).total, 0);
  } finally { await client.close(); }
  assert.equal(transport.pid, null, `Child should terminate: ${pid}; ${stderr}`);
});

test('recommendations preserve website results for unknown, blocked, unsupported and API environments', () => {
  const profiles = [
    { ...newProfile(), components: [newComponent('unknown')] },
    { ...newProfile(), components: [{ ...newComponent('windows-c'), languages: ['C'], inputs: ['Source code'], hostPlatform: 'Windows', access: { rebuild: 'no', instrument: 'no', harness: 'no', testInstance: 'no' } }] },
    { ...newProfile(), components: [{ ...newComponent('other-host'), languages: ['C'], inputs: ['Source code'], hostPlatform: 'Other', targetPlatform: 'Other' }] },
    { ...newProfile(), components: [], connections: [{ ...newConnection('api'), interface: 'HTTP API', definition: 'OpenAPI', testInstance: 'unknown' }] },
  ];
  for (const profile of profiles) {
    const expected = analyzeSystem(profile, toolData), matches = []; let offset = 0;
    do { const result = knowledge.call('recommend_checks', { profile, offset, limit: 20 }); matches.push(...result.matches.map(({ citation, ...match }) => match)); offset = result.nextOffset; } while (offset !== null);
    assert.deepEqual(matches, expected.matches);
  }
  assert.ok(analyzeSystem(profiles[1], toolData).matches.some(m => m.status === 'blocked'));
  assert.ok(analyzeSystem(profiles[3], toolData).matches.some(m => m.status === 'details'));
});

test('published snapshot can be loaded over HTTP with integrity and version checks', { timeout: 10000 }, async () => {
  let mode = 'ok';
  const server = createServer(async (req, res) => {
    if (mode === 'redirect') { res.writeHead(302, { Location: '/other' }); res.end(); return; }
    const filename = req.url.endsWith('manifest.json') ? manifestPath : path.join(path.dirname(manifestPath), JSON.parse(await readFile(manifestPath, 'utf8')).snapshot.path);
    const bytes = await readFile(filename);
    if (mode === 'corrupt' && !req.url.endsWith('manifest.json')) res.end(Buffer.concat([bytes, Buffer.from(' ')]));
    else if (mode === 'version' && req.url.endsWith('manifest.json')) res.end(bytes.toString().replace('"version": 1', '"version": 99'));
    else if (mode === 'traversal' && req.url.endsWith('manifest.json')) { const manifest = JSON.parse(bytes); manifest.snapshot.path = '../secret.json'; res.end(JSON.stringify(manifest)); }
    else res.end(bytes);
  }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  const url = `http://127.0.0.1:${server.address().port}/manifest.json`;
  try {
    assert.equal((await loadKnowledge(url)).revision, snapshot.revision);
    mode = 'corrupt'; await assert.rejects(loadKnowledge(url), /do not match/);
    mode = 'version'; await assert.rejects(loadKnowledge(url));
    mode = 'traversal'; await assert.rejects(loadKnowledge(url));
    mode = 'redirect'; await assert.rejects(loadKnowledge(url));
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});

test('startup with an absent snapshot fails clearly without stdout contamination', { timeout: 10000 }, async () => {
  const child = spawn(process.execPath, ['--experimental-strip-types', 'mcp/server.ts', '--manifest', 'missing-manifest.json'], { windowsHide: true });
  let stdout = '', stderr = ''; child.stdout.on('data', c => { stdout += c; }); child.stderr.on('data', c => { stderr += c; });
  const [code] = await once(child, 'close');
  assert.equal(code, 1); assert.equal(stdout, ''); assert.match(stderr, /ToolWiki startup failed/);
});
