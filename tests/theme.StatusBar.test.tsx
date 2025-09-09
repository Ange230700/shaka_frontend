// tests/theme.StatusBar.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';

// 1) Mock expo-status-bar BEFORE loading App
jest.mock('expo-status-bar', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    StatusBar: (props: any) => <View testID="StatusBar" {...props} />,
  };
});

test('uses dark theme (light status bar text)', () => {
  // 2) Mock useColorScheme, then load App in an isolated module scope
  jest.isolateModules(() => {
    jest.doMock('react-native', () => ({
      ...jest.requireActual('react-native'),
      useColorScheme: () => 'dark',
    }));

    // 3) Now require App so it picks up the mocks
    const App = require('../App').default;

    const { getByTestId } = render(<App />);
    const sb = getByTestId('StatusBar');

    expect(sb.props.style).toBe('light'); // dark scheme -> light bar text
    expect(sb.props.backgroundColor).toBe('#0b0f14'); // from MyDarkTheme.colors.background
  });
});
