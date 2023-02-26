import axios from 'axios';
import { getGeoFromIp } from '../geoIp';

jest.mock('axios');

describe('getGeoFromIp', () => {
  it('makes a GET request with URL and APIKEY using Axios', async () => {
    const ip = '8.8.8.8';
    const url = `https://api.ipbase.com/v2/info?ip=${ip}&apikey=3U7Rd1lrPFmC5M3waJYNHv2YT6bOWfpEPdTxs9GK`;
    const responseData = { data: {} };

    (axios as any).mockImplementationOnce(() => Promise.resolve(responseData));

    await getGeoFromIp(ip);
    expect(axios).toHaveBeenCalledWith({ url, method: 'GET' });
  });

  it('handles error cases', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockRejectedValue({});

    try {
      const ip = 'someIP';
      await getGeoFromIp(ip);
      fail('Should not get in here since should throw an error');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
