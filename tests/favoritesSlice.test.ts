// tests/favoritesSlice.test.ts

import reducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} from 'shakafront/store/favoritesSlice';

describe('favoritesSlice', () => {
  it('add/remove/toggle/clear', () => {
    let state = reducer(undefined, { type: '@@INIT' });

    state = reducer(state, addFavorite('a'));
    expect(state.ids).toEqual(['a']);

    state = reducer(state, addFavorite('a')); // no dup
    expect(state.ids).toEqual(['a']);

    state = reducer(state, toggleFavorite('b')); // add b
    // ✅ Sort separately with localeCompare
    const sortedIds = [...state.ids].sort((a, b) => a.localeCompare(b));
    expect(sortedIds).toEqual(['a', 'b']);

    state = reducer(state, toggleFavorite('a')); // remove a
    expect(state.ids).toEqual(['b']);

    state = reducer(state, removeFavorite('b'));
    expect(state.ids).toEqual([]);

    state = reducer(state, clearFavorites());
    expect(state.ids).toEqual([]);
  });
});
