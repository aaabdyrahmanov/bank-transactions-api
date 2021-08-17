// import environment variables
const dotenv = require('dotenv')
const { join } = require('path')

const result = dotenv.config({ path: join(__dirname, '../.env') })
if (result.error) {
  throw result.error
}

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT
}