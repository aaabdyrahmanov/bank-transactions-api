// import environment variables
require("dotenv").config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  TPP_SERVICE_URL: process.env.TPP_TRANSACTION_SERVICE_URL,
  DB_URL: process.env.LOCAL_BANK_SERVICE_DB_URL,
  CACHE_URL: process.env.CACHE_URL,
  AMQP_URL: process.env.AMQP_URL,
  AMQP_EXCHANGE: process.env.AMQP_EXCHANGE_NAME,
  AMQP_QUEUE: process.env.AMQP_QUEUE_NAME,
  AMQP_ROUTING_KEY: process.env.AMQP_ROUTING_KEY,
  EMAIL: {
    SERVICE: process.env.EMAIL_SERVICE,
    HOST: process.env.EMAIL_HOST,
    USERNAME: process.env.EMAIL_ID,
    PASSWORD: process.env.EMAIL_PASSWORD,
    FROM: process.env.EMAIL_FROM,
    TO: process.env.EMAIL_TO,
  },
};
