// tests/surfspotApi.test.ts
import { fetchSurfSpots, fetchSurfSpotById } from 'shakafront/api/surfspotApi';

// ✅ Mock the axios instance module directly
jest.mock('shakafront/services/http', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

// Grab the mocked http to set expectations & return values
const http = require('shakafront/services/http').default as {
  get: jest.Mock;
};

describe('surfspotApi', () => {
  afterEach(() => {
    http.get.mockReset();
  });

  it('fetchSurfSpots hits /surfspot/all', async () => {
    http.get.mockResolvedValueOnce({ data: [{ surfSpotId: '1' }] });

    const res = await fetchSurfSpots();

    expect(http.get).toHaveBeenCalledWith('/surfspot/all');
    expect(res[0].surfSpotId).toBe('1');
  });

  it('fetchSurfSpotById hits /surfspot/:id', async () => {
    http.get.mockResolvedValueOnce({ data: { surfSpotId: '42' } });

    const res = await fetchSurfSpotById('42');

    expect(http.get).toHaveBeenCalledWith('/surfspot/42');
    expect(res.surfSpotId).toBe('42');
  });
});
