require("dotenv").config();
const request = require("request");

const getMyLocation = () => {
  // Get my IP
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    // Get location info
    const ip = JSON.parse(body).ip;
    request(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`,
      (error, response, body) => {
        // Format output
        const json = JSON.parse(body);
        console.log(
          `I live in ${json.city}, ${json.country_name}. Latitude: ${json.latitude}. Longitude: ${json.longitude}`
        );
      }
    );
  });
};

// Cleaner way
const getMyLocationNew = () => {
  getMyIP((ip) => {
    getMyLocationInfo(ip, (body) => {
      formatOutput(body, (string) => {
        console.log(string);
      });
    });
  });
};

const getMyIP = (callback) => {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      // ...
    }
    callback(JSON.parse(body).ip);
  });
};

const getMyLocationInfo = (ip, callback) => {
  request(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`,
    (error, response, body) => {
      if (error) {
        // ...
      }
      callback(JSON.parse(body));
    }
  );
};

const formatOutput = (json, callback) => {
  const string = `I live in ${json.city}, ${json.country_name}. Latitude: ${json.latitude}. Longitude: ${json.longitude}`;

  callback(string);
};

// getMyLocation();
getMyLocationNew();
