const axios = require("axios");

module.exports = (baseURL) =>
  axios.create({
    baseURL,
  });
