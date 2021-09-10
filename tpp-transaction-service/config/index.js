// import environment variables
require("dotenv").config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: process.env.TPP_TRANSACTION_SERVICE_DB_URL,
};
