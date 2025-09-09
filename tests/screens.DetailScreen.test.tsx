// tests/screens.DetailScreen.test.tsx

import * as api from 'shakafront/api/surfspotApi';
import { renderWithNav } from 'shakafront1/test-utils';
import DetailScreen from 'shakafront/screens/DetailScreen';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useRoute: jest.fn(),
  };
});

jest.mock('shakafront/components/UniversalMap', () => {
  const { View, Text } = require('react-native');
  return function UniversalMapMock({ latitude, longitude, label }: any) {
    return (
      <View>
        <Text testID="lat">{latitude}</Text>
        <Text testID="lng">{longitude}</Text>
        <Text testID="label">{label}</Text>
      </View>
    );
  };
});

jest.mock('shakafront/api/surfspotApi');

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

describe('DetailScreen', () => {
  beforeEach(() => {
    (api.fetchSurfSpotById as jest.Mock).mockResolvedValue(spot);

    // set the return of the mocked useRoute
    const { useRoute } = require('@react-navigation/native') as {
      useRoute: jest.Mock;
    };
    useRoute.mockReturnValue({
      key: 'k',
      name: 'Detail',
      params: { surfSpotId: '99' },
    });
  });

  afterEach(() => {
    // clean the mocked hook between tests
    const { useRoute } = require('@react-navigation/native') as {
      useRoute: jest.Mock;
    };
    useRoute.mockReset();
    jest.resetAllMocks();
  });

  it('decodes geocodeRaw and passes coords to UniversalMap', async () => {
    const { findByTestId } = renderWithNav(<DetailScreen />);

    // Either remove this line or make it non-ambiguous:
    // expect(await findByText('Detail X')).toBeTruthy();

    // ✅ Unambiguous assertions via testIDs from the UniversalMap mock
    const labelEl = await findByTestId('label');
    const latEl = await findByTestId('lat');
    const lngEl = await findByTestId('lng');

    expect(labelEl.props.children).toBe('Detail X');
    expect(Number(latEl.props.children)).toBeCloseTo(43.67);
    expect(Number(lngEl.props.children)).toBeCloseTo(-1.44);
  });
});
