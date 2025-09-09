// tests/theme.StatusBar.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import * as RN from 'react-native';

// ✅ Robust mock for react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');

  const SafeAreaInsetsContext = React.createContext({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const SafeAreaFrameContext = React.createContext({
    x: 0,
    y: 0,
    width: 320,
    height: 640,
  });

  const SafeAreaProvider = ({ children }: any) => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <SafeAreaFrameContext.Provider
        value={{ x: 0, y: 0, width: 320, height: 640 }}
      >
        {children}
      </SafeAreaFrameContext.Provider>
    </SafeAreaInsetsContext.Provider>
  );

  const SafeAreaView = ({ children }: any) => <>{children}</>;
  const useSafeAreaInsets = () => React.useContext(SafeAreaInsetsContext);
  const useSafeAreaFrame = () => React.useContext(SafeAreaFrameContext);

  return {
    __esModule: true,
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
    useSafeAreaFrame,
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    initialWindowMetrics: {
      frame: { x: 0, y: 0, width: 320, height: 640 },
      insets: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  };
});

// ✅ Silence act warnings from Ionicons by making it a no-op
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    __esModule: true,
    Ionicons: () => null,
  };
});

// ✅ Mock expo-status-bar with an in-factory jest.fn
jest.mock('expo-status-bar', () => {
  const mockStatusBar = jest.fn(() => null);
  return { __esModule: true, StatusBar: mockStatusBar };
});

describe('StatusBar theme', () => {
  afterEach(() => {
    const { StatusBar } = require('expo-status-bar') as {
      StatusBar: jest.Mock;
    };
    StatusBar.mockClear();
  });

  it('uses dark theme (light status bar text)', () => {
    const schemeSpy = jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');

    const App = require('../App').default;
    render(<App />);

    const { StatusBar } = require('expo-status-bar') as {
      StatusBar: jest.Mock;
    };

    // ✅ Was called at least once
    expect(StatusBar).toHaveBeenCalled();

    // ✅ Read the props from the first call’s first arg
    const firstCall = StatusBar.mock.calls[0] as unknown[]; // avoid TS tuple errors
    const props = (firstCall?.[0] ?? {}) as {
      style?: string;
      backgroundColor?: string;
      translucent?: boolean;
    };

    expect(props).toEqual(
      expect.objectContaining({
        style: 'light',
        backgroundColor: '#0b0f14',
        translucent: false,
      }),
    );

    schemeSpy.mockRestore();
  });
});
