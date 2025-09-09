// tests\screens.DetailScreen.test.tsx

import React from 'react';
import * as api from 'shakafront/api/surfspotApi';
import { renderWithNav } from 'shakafront1/test-utils';
import DetailScreen from 'shakafront/screens/DetailScreen';

// Mock UniversalMap to capture props
jest.mock('shakafront/components/UniversalMap', () => {
  return ({ latitude, longitude, label }: any) => {
    // Render values into the tree so we can assert them
    return (
      // @ts-ignore
      <div>
        <span data-testid="lat">{latitude}</span>
        <span data-testid="lng">{longitude}</span>
        <span data-testid="label">{label}</span>
      </div>
    );
  };
});

function b64(obj: any) {
  return Buffer.from(JSON.stringify(obj), 'utf-8').toString('base64');
}

const spot = {
  surfSpotId: '99',
  destination: 'Detail X',
  address: 'Somewhere',
  geocodeRaw: b64({ o: { lat: 43.67, lng: -1.44 } }),
  photoUrls: [],
  breakTypes: [],
  influencers: [],
} as any;

jest.mock('shakafront/api/surfspotApi');

describe('DetailScreen', () => {
  it('decodes geocodeRaw and passes coords to UniversalMap', async () => {
    (api.fetchSurfSpotById as jest.Mock).mockResolvedValue(spot);

    // Render DetailScreen by itself with a fake nav route param
    // Simplest: mount the screen and stub useRoute if needed
    // Alternative: push params via initial state in a navigator; we’ll monkey-patch useRoute:
    jest
      .spyOn(require('@react-navigation/native'), 'useRoute')
      .mockReturnValue({
        key: 'k',
        name: 'Detail',
        params: { surfSpotId: '99' },
      } as any);

    const { findByTestId, findByText } = renderWithNav(<DetailScreen />);

    expect(await findByText('Detail X')).toBeTruthy();
    expect(
      Number(await (await findByTestId('lat')).props.children),
    ).toBeCloseTo(43.67);
    expect(
      Number(await (await findByTestId('lng')).props.children),
    ).toBeCloseTo(-1.44);
  });
});
