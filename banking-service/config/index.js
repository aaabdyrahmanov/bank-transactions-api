// import environment variables
const dotenv = require('dotenv')
const { join } = require('path')

const result = dotenv.config({ path: join(__dirname, '../../.env') })
if (result.error) {
  throw result.error
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  TPP_API_URL: process.env.TPP_API_URL,
  DB_URL: process.env.DB_URL
}