// tests/screens.FavoritesScreen.test.tsx
import React from 'react';
import * as api from 'shakafront/api/surfspotApi';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { renderWithNav } from 'shakafront1/test-utils';
import FavoritesScreen from 'shakafront/screens/FavoritesScreen';
import { store } from 'shakafront/store';
import { addFavorite } from 'shakafront/store/favoritesSlice';

jest.mock('shakafront/api/surfspotApi');

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
    (api.fetchSurfSpots as jest.Mock).mockResolvedValue(mockSpots);
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

    // Only Fav B is shown
    expect(await findByText('Fav B')).toBeTruthy();
    expect(queryByText('Fav A')).toBeNull();

    // Toggle favorite off (use testID instead of a11yRole)
    const hearts = getAllByTestId('favorite-toggle');
    fireEvent.press(hearts[0]);

    await waitFor(() => {
      expect(store.getState().favorites.ids).not.toContain('2');
      expect(queryByText('Fav B')).toBeNull();
    });
  });
});
