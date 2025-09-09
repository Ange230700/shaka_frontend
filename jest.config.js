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
    '^react-native-maps$': '<rootDir>/tests/mocks/reactNativeMaps.js',
    '^react-leaflet$': '<rootDir>/tests/mocks/reactLeaflet.js',
    '\\.(css)$': '<rootDir>/tests/mocks/emptyModule.js',
    'leaflet/dist/leaflet.css': '<rootDir>/tests/mocks/emptyModule.js',
  },
};
