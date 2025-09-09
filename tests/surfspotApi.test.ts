// tests\surfspotApi.test.ts

import axios from 'axios';
import { fetchSurfSpots, fetchSurfSpotById } from 'shakafront/api/surfspotApi';

jest.mock('axios');
const mocked = axios as jest.Mocked<typeof axios>;

describe('surfspotApi', () => {
  afterEach(() => jest.resetAllMocks());

  it('fetchSurfSpots hits /surfspot/all', async () => {
    mocked.get.mockResolvedValueOnce({ data: [{ surfSpotId: '1' }] as any });
    const res = await fetchSurfSpots();
    expect(mocked.get).toHaveBeenCalledWith(
      expect.stringMatching(/\/surfspot\/all$/),
    );
    expect(res[0].surfSpotId).toBe('1');
  });

  it('fetchSurfSpotById hits /surfspot/:id', async () => {
    mocked.get.mockResolvedValueOnce({ data: { surfSpotId: '42' } as any });
    const res = await fetchSurfSpotById('42');
    expect(mocked.get).toHaveBeenCalledWith(
      expect.stringMatching(/\/surfspot\/42$/),
    );
    expect(res.surfSpotId).toBe('42');
  });
});
