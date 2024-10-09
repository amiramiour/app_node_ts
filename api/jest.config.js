module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.tsx'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  