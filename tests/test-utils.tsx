// test-utils.tsx

import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from 'shakafront/store';
import { render } from '@testing-library/react-native';

export function renderWithNav(ui: React.ReactElement) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper });
}
