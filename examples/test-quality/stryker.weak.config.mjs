import base from './stryker.base.mjs';

export default {
  ...base,
  jest: { projectType: 'custom', configFile: 'jest.weak.config.cjs', enableFindRelatedTests: false },
  jsonReporter: { fileName: 'reports/weak/mutation.json' },
};
