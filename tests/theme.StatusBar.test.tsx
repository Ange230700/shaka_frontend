// tests/theme.StatusBar.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import App from '../App';

// Mock expo-status-bar so we can query by testID and inspect props
jest.mock('expo-status-bar', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    StatusBar: (props: any) => <View testID="StatusBar" {...props} />,
  };
});

test('uses dark theme (light status bar text)', () => {
  // 👇 Only override the hook, do not re-mock the whole module
  const schemeSpy = jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');

  const { getByTestId } = render(<App />);
  const sb = getByTestId('StatusBar');

  // dark scheme -> light text/icons
  expect(sb.props.style).toBe('light');
  // backgroundColor comes from MyDarkTheme.colors.background
  expect(sb.props.backgroundColor).toBe('#0b0f14');

  schemeSpy.mockRestore();
});
