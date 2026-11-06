export default {
  mutate: ['src/discount.js'],
  ignorePatterns: ['reports', 'evidence', '*.md', 'pnpm-lock.yaml'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  concurrency: 1,
  inPlace: false,
  reporters: ['clear-text', 'json'],
  thresholds: { high: 80, low: 60, break: 0 },
};
