const express = require("express");
const { json, urlencoded } = require("body-parser");
const createError = require("http-errors");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

// import API routes
const adminRouter = require("../resources/admin/admin.router");
const balanceRouter = require("../resources/balances/balance.router");
const exportRouter = require("../resources/export/export.router");
const syncRouter = require("../resources/syncs/sync.router");
const transactionRouter = require("../resources/transactions/transaction.router");

const app = express();

// CORS config
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    method: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    exposeHeaders: ["banking-api-cache", "banking-api-cache-online"],
  })
);

// security headers middleware
app.use(helmet());

// request body parser middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// HTTP request logger middleware
app.use(logger("dev"));

// compacting responses using GZIP middleware
app.use(compression());

// // attach routes
app.use("/v1/admin", adminRouter);
app.use("/v1/balances", balanceRouter);
app.use("/v1/export", exportRouter);
app.use("/v1/syncs", syncRouter);
app.use("/v1/transactions", transactionRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error-handling middleware functions
app.use((err, req, res) => {
  console.error(err);

  // If err has no specified error code,
  // set error code to 'Internal Server Error (500)'
  res.status(err.status || 500);
  res.send(
    req.app.get("env") === "development"
      ? { message: err.message, stack: err.stack }
      : { message: err.message }
  );
});

module.exports = app;
