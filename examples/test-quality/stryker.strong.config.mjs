import base from './stryker.base.mjs';

export default {
  ...base,
  jest: { projectType: 'custom', configFile: 'jest.strong.config.cjs', enableFindRelatedTests: false },
  jsonReporter: { fileName: 'reports/strong/mutation.json' },
};
