// tests/screens.FavoritesScreen.test.tsx
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { renderWithNav } from 'shakafront1/test-utils';
import FavoritesScreen from 'shakafront/screens/FavoritesScreen';
import { store } from 'shakafront/store';
import { addFavorite } from 'shakafront/store/favoritesSlice';

// ✅ Explicit factory mock so exports are jest.fn
jest.mock('shakafront/api/surfspotApi', () => ({
  __esModule: true,
  fetchSurfSpots: jest.fn(),
  fetchSurfSpotById: jest.fn(),
}));

// Grab the mocked functions to set return values
const { fetchSurfSpots } = require('shakafront/api/surfspotApi') as {
  fetchSurfSpots: jest.Mock;
};

const mockSpots = [
  {
    surfSpotId: '1',
    destination: 'Fav A',
    address: 'A',
    photoUrls: [],
    breakTypes: [],
    influencers: [],
  },
  {
    surfSpotId: '2',
    destination: 'Fav B',
    address: 'B',
    photoUrls: [],
    breakTypes: [],
    influencers: [],
  },
] as any;

describe('FavoritesScreen', () => {
  beforeEach(() => {
    fetchSurfSpots.mockResolvedValue(mockSpots);
    store.dispatch({ type: 'favorites/clearFavorites' });
  });

  it('shows empty when no favorites', async () => {
    const { findByText } = renderWithNav(<FavoritesScreen />);
    expect(await findByText(/No favorites yet/i)).toBeTruthy();
  });

  it('lists only favorites and supports toggle removal', async () => {
    store.dispatch(addFavorite('2'));

    const { findByText, queryByText, getAllByTestId } = renderWithNav(
      <FavoritesScreen />,
    );

    expect(await findByText('Fav B')).toBeTruthy();
    expect(queryByText('Fav A')).toBeNull();

    const hearts = getAllByTestId('favorite-toggle');
    fireEvent.press(hearts[0]);

    await waitFor(() => {
      expect(store.getState().favorites.ids).not.toContain('2');
      expect(queryByText('Fav B')).toBeNull();
    });
  });
});
