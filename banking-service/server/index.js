const express = require('express')
const { json, urlencoded } = require("body-parser")
const createError = require('http-errors')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

// import API routes
const balanceRouter = require('../resources/balance/balance.router.js')
const exportRouter = require('../resources/export/export.router.js')
const syncRouter = require('../resources/sync/sync.router.js')
const transactionRouter = require('../resources/transaction/transaction.router.js')

const app = express()

// CORS config
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    method: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
)

// security headers middleware
app.use(helmet())

// request body parser middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// HTTP request logger middleware
app.use(logger("dev"));

// compacting responses using GZIP middleware
app.use(compression())

// // attach routes
app.use('/v1/balance', balanceRouter)
app.use('/v1/export', exportRouter)
app.use('/v1/sync', syncRouter)
app.use('/v1/transaction', transactionRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error-handling middleware functions
app.use(function (err, req, res, next) {
  console.error(err)

  // If err has no specified error code, 
  // set error code to 'Internal Server Error (500)'
  res.status(err.status || 500)
  res.send(req.app.get('env') === 'development' ? { message: err.message, stack: err.stack } : { message: err.message })
})

module.exports = app