require("dotenv").config();
const request = require("request-promise-native");

const getMyLocation = () => {
  // Get my IP
  request("https://api.ipify.org/?format=json")
    .then((body) => {
      return JSON.parse(body).ip;
    })
    // Get locatio info
    .then((ip) => {
      return request(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`
      );
    })
    // Format output
    .then((json) => {
      const body = JSON.parse(json);
      console.log(
        `I live in ${body.city}, ${body.country_name}. Latitude: ${body.latitude}. Longitude: ${body.longitude}`
      );
    });
};

// Cleaner way
const getMyLocationNew = () => {
  getMyIP()
    .then((body) => JSON.parse(body).ip)
    .then((ip) => getLocationInfo(ip))
    .then((json) => formatOutput(json))
    .then((string) => console.log(string))
    .catch((error) => console.log(error))
    .finally(() => console.log("--- DONE ---"));
};

const getMyIP = () => {
  return request("https://api.ipfy.org/?format=json");
};

const getLocationInfo = (ip) => {
  return request(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`
  );
};

const formatOutput = (json) => {
  const body = JSON.parse(json);
  return `I live in ${body.city}, ${body.country_name}. Latitude: ${body.latitude}. Longitude: ${body.longitude}`;
};

// getMyLocation();
getMyLocationNew();
