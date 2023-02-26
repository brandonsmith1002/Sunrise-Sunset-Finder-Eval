import axios from 'axios';

// Service API request for getting computer's geo data
export function getGeoLocation() {
  return new Promise((resolve, reject) => {
    const url = 'https://geolocation-db.com/json/';
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
