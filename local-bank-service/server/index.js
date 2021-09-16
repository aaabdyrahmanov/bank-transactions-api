const express = require("express");
const { json, urlencoded } = require("body-parser");
const createError = require("http-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

// import API routes
const healthRouter = require("../resources/health/health.router");
const balanceRouter = require("../resources/balances/balance.router");
const exportRouter = require("../resources/export/export.router");
const syncRouter = require("../resources/syncs/sync.router");
const transactionRouter = require("../resources/transactions/transaction.router");

const logger = require("../config/logger");

const app = express();

// CORS config
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    method: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// security headers middleware
app.use(helmet());

// request body parser middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// HTTP request logger middleware
app.use(morgan("tiny", { stream: logger.stream }));

// compacting responses using GZIP middleware
app.use(compression());

// // attach routes
app.use("/v1", healthRouter);
app.use("/v1/balances", balanceRouter);
app.use("/v1/export", exportRouter);
app.use("/v1/syncs", syncRouter);
app.use("/v1/transactions", transactionRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
