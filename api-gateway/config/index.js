// import environment variables
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  LOCAL_BANK_SERVICE_URL: process.env.LOCAL_BANK_SERVICE_URL
};
