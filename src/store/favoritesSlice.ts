// src\store\favoritesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = { ids: string[] };

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (!state.ids.includes(id)) state.ids.push(id);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.ids = state.ids.filter((x) => x !== id);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const i = state.ids.indexOf(id);
      if (i === -1) state.ids.push(id);
      else state.ids.splice(i, 1);
    },
    clearFavorites(state) {
      state.ids = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
