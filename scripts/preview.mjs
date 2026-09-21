import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const cli = path.join(root, 'node_modules', 'astro', 'bin', 'astro.mjs');
const url = 'http://127.0.0.1:4321/ToolWiki/';
if (!existsSync(cli)) {
  console.error('Install the dependencies first: pnpm install. See README.md for setup.');
  process.exit(1);
}
const stop = process.argv.includes('--stop');
const noOpen = process.argv.includes('--no-open');
const run = (args) => spawnSync(process.execPath, [cli, ...args], {
  cwd: root, stdio: 'inherit', windowsHide: true,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
});
if (stop) {
  const result = run(['dev', 'stop']);
  process.exit(result.status ?? 1);
}
async function ready() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
    return response.ok && (await response.text()).includes('Software Analysis Wiki');
  } catch { return false; }
}
if (!await ready()) {
  const result = run(['dev', '--background', '--host', '127.0.0.1', '--port', '4321']);
  if (result.status !== 0) process.exit(result.status ?? 1);
}
let available = false;
for (let attempt = 0; attempt < 40; attempt++) {
  if (await ready()) { available = true; break; }
  await new Promise((resolve) => setTimeout(resolve, 500));
}
if (!available) {
  console.error('The preview did not respond at ' + url + '. Check astro dev logs and whether port 4321 is in use.');
  process.exit(1);
}
console.log('Live preview: ' + url);
console.log('Edits update automatically. To stop, run Stop preview.cmd or node scripts/preview.mjs --stop.');
if (!noOpen) {
  const command = process.platform === 'win32' ? 'cmd.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  const child = spawn(command, args, { detached: true, stdio: 'ignore', windowsHide: true });
  child.on('error', () => console.error('Open the preview URL above in your browser.'));
  child.unref();
}
