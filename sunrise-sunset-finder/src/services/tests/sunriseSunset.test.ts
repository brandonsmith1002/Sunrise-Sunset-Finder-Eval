import axios from 'axios';
import { getSunriseSunset } from '../sunriseSunset';

jest.mock('axios');

describe('sunriseSunset', () => {
  it('makes a GET request with lat and lng using Axios', async () => {
    const lat = 53.3478;
    const lng = -6.2597;
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;
    const responseData = { data: {} };

    (axios as any).mockImplementationOnce(() => Promise.resolve(responseData));

    await getSunriseSunset(lat, lng);
    expect(axios).toHaveBeenCalledWith({ url, method: 'GET' });
  });

  it('handles error cases', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockRejectedValue({});

    try {
      await getSunriseSunset(-1000, -1000);
      fail('Should not get in here since should throw an error');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
