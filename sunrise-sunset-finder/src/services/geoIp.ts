import axios from 'axios';

// Service API request for getting geo data from ip address
export function getGeoFromIp(ip: string) {
  return new Promise((resolve, reject) => {
    const url = `https://api.ipbase.com/v2/info?ip=${ip}&apikey=3U7Rd1lrPFmC5M3waJYNHv2YT6bOWfpEPdTxs9GK`;
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
