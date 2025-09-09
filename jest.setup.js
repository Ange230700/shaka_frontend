// jest.setup.js
import 'react-native-gesture-handler/jestSetup.js';
import '@testing-library/jest-native/extend-expect';
jest.setTimeout(15000);

// Reanimated: use the official mock in tests
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// 🛑 Make Ionicons a no-op to avoid internal setState -> act() warnings
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const Noop = React.forwardRef(() => null);
  return { __esModule: true, Ionicons: Noop };
});

// 🌐 Prevent real network calls via the shared axios instance
jest.mock('axios', () => {
  const mock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };
  return {
    __esModule: true,
    default: Object.assign(mock, { create: () => mock }),
  };
});

jest.mock('shakafront/services/http', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  },
}));

// Optional: keep the console quiet for known noisy warnings (leave real errors)
const originalConsoleError = console.error;
console.error = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (/not wrapped in act|useNativeDriver|requires a host component/i.test(msg))
    return;
  originalConsoleError(...args);
};

afterEach(() => {
  jest.clearAllMocks();
});
