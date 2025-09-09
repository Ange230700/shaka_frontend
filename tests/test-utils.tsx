// tests/test-utils.tsx

import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';

import favorites from 'shakafront/store/favoritesSlice';
import type { RootState } from 'shakafront/store';
import { store as defaultStore } from 'shakafront/store';

// If you want stricter typing, use `RootState`.
// If you want to pass partial slices in tests, use `Partial<RootState>`.
type AllowedPreloadedState = RootState; // or: Partial<RootState>

// factory for making a custom store
export function makeStore(preloadedState?: AllowedPreloadedState) {
  return configureStore({
    reducer: { favorites },
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;

export function renderWithNav(
  ui: React.ReactElement,
  { store = defaultStore as unknown as AppStore }: { store?: AppStore } = {},
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper });
}
