// jest.config.js

export default {
  preset: 'jest-expo',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.(test|spec).[tj]s?(x)',
    '**/?(*.)+(test|spec).[tj]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^shakafront/(.*)$': '<rootDir>/src/$1',
    '^shakafront1/(.*)$': '<rootDir>/tests/$1',
  },
};
