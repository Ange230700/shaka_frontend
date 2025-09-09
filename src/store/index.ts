// src\store\index.ts

import { configureStore } from '@reduxjs/toolkit';
import favorites from './favoritesSlice';

export const store = configureStore({
  reducer: { favorites },
  // (optional) middleware: (getDefault) => getDefault(),  // keep default
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

