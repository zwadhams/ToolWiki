import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const mode = process.argv[2];
if (!['bad', 'good', 'install'].includes(mode)) {
  console.error('Use node run.mjs bad, good, or install.');
  process.exit(2);
}
const directory = fileURLToPath(new URL('./', import.meta.url));
const cli = fileURLToPath(import.meta.resolve('@playwright/test/cli'));
const environment = { ...process.env, FIXTURE_MODE: mode, PLAYWRIGHT_BROWSERS_PATH: fileURLToPath(new URL('.browsers/', import.meta.url)), NO_COLOR: '1' };
delete environment.FORCE_COLOR;
const result = spawnSync(process.execPath, [cli, ...(mode === 'install' ? ['install', 'chromium'] : ['test'])], {
  cwd: directory, stdio: 'inherit',
  env: environment,
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 2);
