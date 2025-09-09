// tests\screens.HomeScreen.test.tsx

import React from 'react';
import * as api from 'shakafront/api/surfspotApi';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { renderWithNav } from 'shakafront1/test-utils';
import HomeScreen from 'shakafront/screens/HomeScreen';
import { store } from 'shakafront/store';

jest.mock('shakafront/api/surfspotApi');

const mockSpots = [
  {
    surfSpotId: '1',
    destination: 'Spot A',
    address: 'Addr A',
    photoUrls: [],
    breakTypes: [],
    influencers: [],
  },
  {
    surfSpotId: '2',
    destination: 'Spot B',
    address: 'Addr B',
    photoUrls: [],
    breakTypes: [],
    influencers: [],
  },
] as any;

describe('HomeScreen', () => {
  beforeEach(() => {
    (api.fetchSurfSpots as jest.Mock).mockResolvedValue(mockSpots);
  });

  it('renders spots from API', async () => {
    const { getByText } = renderWithNav(<HomeScreen />);
    await waitFor(() => {
      expect(getByText('Spot A')).toBeTruthy();
      expect(getByText('Spot B')).toBeTruthy();
    });
  });

  it('toggles favorite in the store', async () => {
    const { getAllByTestId, getByText } = renderWithNav(<HomeScreen />);
    await waitFor(() => getByText('Spot A'));

    const hearts = getAllByTestId('favorite-toggle'); // ✅ stable query
    fireEvent.press(hearts[0]);

    expect(store.getState().favorites.ids).toContain('1');
  });
});
