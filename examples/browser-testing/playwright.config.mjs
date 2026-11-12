import { defineConfig } from '@playwright/test';

const mode = process.env.FIXTURE_MODE;
if (!['bad', 'good'].includes(mode)) throw new Error('Use pnpm test:bad or pnpm test:good.');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 15000,
  expect: { timeout: 2000 },
  outputDir: `.results/${mode}/artifacts`,
  reporter: [['list'], ['json', { outputFile: `.results/${mode}/report.json` }]],
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'http://127.0.0.1:8837',
    viewport: { width: 1000, height: 720 },
    screenshot: 'only-on-failure',
    trace: 'off',
  },
  webServer: {
    command: `node server.mjs ${mode}`,
    url: 'http://127.0.0.1:8837/health',
    reuseExistingServer: false,
    timeout: 10000,
  },
});
