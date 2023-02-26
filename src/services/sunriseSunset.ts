import axios from 'axios';

// service API request for getting sunrise and sunset from geo data
export function getSunriseSunset(lat: number, lng: number) {
  return new Promise((resolve, reject) => {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}
