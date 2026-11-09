// Audit-only transparent stdio recorder. The production server never writes logs.
import { spawn } from 'node:child_process';
import { appendFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [output, manifest] = process.argv.slice(2);
if (!output || !manifest) throw new Error('Usage: node scripts/record-mcp.mjs TRANSCRIPT_PATH MANIFEST_PATH');
mkdirSync(path.dirname(output), { recursive: true });
const write = (direction, message) => appendFileSync(output, JSON.stringify({ at: new Date().toISOString(), pid: process.pid, direction, message }).replace(/[^\x00-\x7f]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')) + '\n');
const child = spawn(process.execPath, ['--experimental-strip-types', fileURLToPath(new URL('../mcp/server.ts', import.meta.url)), '--manifest', manifest], { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
write('start', { node: process.version, manifest });
function record(stream, direction) {
  let buffer = '';
  stream.on('data', chunk => {
    buffer += chunk.toString(); let end;
    while ((end = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, end); buffer = buffer.slice(end + 1);
      try { write(direction, JSON.parse(line)); } catch { write(direction, { invalidLine: line }); }
    }
  });
}
record(process.stdin, 'request'); record(child.stdout, 'response');
process.stdin.pipe(child.stdin); child.stdout.pipe(process.stdout); child.stderr.pipe(process.stderr);
child.stdin.on('error', error => { if (error.code !== 'EPIPE') throw error; });
child.on('error', error => { write('error', error.message); process.exitCode = 1; });
child.on('exit', (code, signal) => { write('exit', { code, signal }); process.exit(code ?? 1); });
process.on('SIGTERM', () => child.kill());
