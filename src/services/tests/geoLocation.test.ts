import axios from 'axios';
import { getGeoLocation } from '../geoLocation';

jest.mock('axios');

describe('getGeoLocation', () => {
  it('makes a GET request to geolocation using Axios', async () => {
    const url = 'https://geolocation-db.com/json/';
    const responseData = { data: {} };

    (axios as any).mockImplementationOnce(() => Promise.resolve(responseData));

    await getGeoLocation();
    expect(axios).toHaveBeenCalledWith({ url, method: 'GET' });
  });

  it('handles error cases', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockRejectedValue({});

    try {
      await getGeoLocation();
      fail('Should not get in here since should throw an error');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
