// tests/utils/makeStore.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favorites from 'shakafront/store/favoritesSlice';

/** Build a proper root reducer so TS doesn't confuse the reducers-map with a single reducer */
export const rootReducer = combineReducers({
  favorites,
});

export type RootState = ReturnType<typeof rootReducer>;

/** Use Partial<RootState> for convenient preloading in tests */
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
