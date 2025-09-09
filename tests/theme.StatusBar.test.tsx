// tests\theme.StatusBar.test.tsx

import React from 'react';
import App from '../App';
import * as rn from 'react-native';
import { render } from '@testing-library/react-native';

jest.spyOn(rn, 'useColorScheme').mockReturnValue('dark');

it('uses dark theme (light status bar text)', () => {
  const { UNSAFE_getByType } = render(<App />);
  // expo-status-bar renders a StatusBar component we can find by type
  const StatusBar = UNSAFE_getByType(require('expo-status-bar').StatusBar);
  expect(StatusBar.props.style).toBe('light');
});
