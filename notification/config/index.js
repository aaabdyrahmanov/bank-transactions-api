// import environment variables
require("dotenv").config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  AMQP_URL: process.env.AMQP_URL,
  AMQP_QUEUE: process.env.AMQP_QUEUE_NAME,
  LOCAL_BANK_SERVICE_URL: process.env.LOCAL_BANK_SERVICE_URL,
  EMAIL: {
    SERVICE: process.env.EMAIL_SERVICE,
    HOST: process.env.EMAIL_HOST,
    USERNAME: process.env.EMAIL_ID,
    PASSWORD: process.env.EMAIL_PASSWORD,
    FROM: process.env.EMAIL_FROM,
    TO: process.env.EMAIL_TO,
  },
};
