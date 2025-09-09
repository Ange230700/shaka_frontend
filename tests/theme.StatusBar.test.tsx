// tests/theme.StatusBar.test.tsx
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';

// Mock expo-status-bar so we can query by testID and inspect props
jest.mock('expo-status-bar', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    StatusBar: (props: any) => <View testID="StatusBar" {...props} />,
  };
});

test('uses dark theme (light status bar text)', () => {
  // force dark scheme so App picks MyDarkTheme
  jest.resetModules();
  jest.doMock('react-native', () => ({
    ...jest.requireActual('react-native'),
    useColorScheme: () => 'dark',
  }));

  const { getByTestId } = render(<App />);
  const sb = getByTestId('StatusBar');

  // style should be 'light' in dark mode (white icons/text)
  expect(sb.props.style).toBe('light');

  // You also set backgroundColor={theme.colors.background} in App
  // so in dark mode it should be your dark background ('#0b0f14' from MyDarkTheme)
  expect(sb.props.backgroundColor).toBe('#0b0f14');
});
