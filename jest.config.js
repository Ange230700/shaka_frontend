// jest.config.js

export default {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^shakafront/(.*)$': '<rootDir>/src/$1',
    '^shakafront1/(.*)$': '<rootDir>/tests/$1',
  },
};
