const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(__dirname, 'tsconfig.jest.json'),
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '^.*/__tests__/.*\\.test\\.tsx?$',
};
