import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const output = process.argv[2];
const inspector = path.resolve('node_modules/@modelcontextprotocol/inspector/clients/launcher/build/index.js');
const prefix = [inspector, '--cli', process.execPath, '--experimental-strip-types', path.resolve('mcp/server.ts')];
const checks = [
  { name: 'discovery', args: ['--method', 'tools/list', '--strict'], validate: value => assert.equal(value.result.tools.length, 4) },
  { name: 'search', args: ['--method', 'tools/call', '--tool-name', 'search_knowledge', '--tool-args-json', '{"query":"Windows memory","filters":{"kind":"guide"}}'], validate: value => assert.ok(JSON.stringify(value).includes('guides/windows-memory-check')) },
  { name: 'resource', args: ['--method', 'resources/read', '--uri', 'toolwiki://snapshot'], validate: value => assert.ok(JSON.stringify(value).includes('revision')) },
];
const ascii = text => text.replace(/[^\x00-\x7f]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
if (output) mkdirSync(output, { recursive: true });
for (const check of checks) {
  const args = [...prefix, ...check.args, '--format', 'json', '--quiet'];
  const run = spawnSync(process.execPath, args, { encoding: 'utf8', timeout: 30000, windowsHide: true, maxBuffer: 2 * 1024 * 1024 });
  if (output) writeFileSync(path.join(output, `${check.name}.json`), ascii(JSON.stringify({ command: [process.execPath, ...args], status: run.status, stderr: run.stderr, stdout: run.stdout }, null, 2)) + '\n');
  assert.equal(run.status, 0, run.stderr || run.error?.message); check.validate(JSON.parse(run.stdout));
  console.log(`MCP Inspector ${check.name}: passed`);
}
