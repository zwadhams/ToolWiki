// Launch a fresh, task-scoped Codex reader with a real stdio MCP connection.
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import path from 'node:path';
import { StringDecoder } from 'node:string_decoder';

const [name, promptFile] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(name || '') || !promptFile) throw new Error('Usage: node scripts/run-agent-audit.mjs NAME PROMPT_FILE');
const root = process.cwd(), evidence = path.resolve('audits/agent-knowledge/readers', name), work = path.resolve('audits/agent-knowledge/work', name);
mkdirSync(evidence, { recursive: true }); mkdirSync(work, { recursive: true });
const ascii = text => text.replace(/[^\x00-\x7f]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
const toml = value => JSON.stringify(value.replaceAll('\\', '/'));
const args = ['exec', '--ignore-user-config', '--ephemeral', '--json', '--color', 'never', '--approve-for-me', '--skip-git-repo-check', '-C', work, '--add-dir', evidence,
  '-c', `mcp_servers.toolwiki.command=${toml(process.execPath)}`,
  '-c', `mcp_servers.toolwiki.args=${JSON.stringify([path.join(root, 'scripts/record-mcp.mjs'), path.join(evidence, 'mcp.jsonl'), path.join(root, 'dist/knowledge/v1/manifest.json')].map(s => s.replaceAll('\\', '/')))}`,
  '-c', 'mcp_servers.toolwiki.startup_timeout_sec=30', '-c', 'mcp_servers.toolwiki.tool_timeout_sec=30',
  '-o', path.join(evidence, 'final.txt'), '-'];
const prompt = readFileSync(promptFile, 'utf8').replaceAll('{{EVIDENCE}}', evidence).replaceAll('{{WORK}}', work);
writeFileSync(path.join(evidence, 'prompt.txt'), prompt);
writeFileSync(path.join(evidence, 'launch.json'), JSON.stringify({ startedAt: new Date().toISOString(), node: process.version, command: 'codex', args, work }, null, 2) + '\n');
const child = spawn('codex', args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
child.stdin.end(prompt);
for (const [stream, file] of [[child.stdout, 'events.jsonl'], [child.stderr, 'stderr.txt']]) {
  const decoder = new StringDecoder('utf8');
  stream.on('data', chunk => appendFileSync(path.join(evidence, file), ascii(decoder.write(chunk))));
  stream.on('end', () => appendFileSync(path.join(evidence, file), ascii(decoder.end())));
}
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('close', (code, signal) => {
  writeFileSync(path.join(evidence, 'completion.json'), JSON.stringify({ completedAt: new Date().toISOString(), code, signal }, null, 2) + '\n');
  console.log(`${name}: exit ${code}. Evidence: ${evidence}`); process.exitCode = code ?? 1;
});
console.log(`${name}: started Codex reader PID ${child.pid}`);
