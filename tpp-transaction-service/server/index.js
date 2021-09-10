const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");

// import API routes
const adminRouter = require("../resources/admin/admin.router");
const balancesRouter = require("../resources/balances/balance.router");
const transactionsRouter = require("../resources/transactions/transaction.router");

const app = express();

// CORS config
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    method: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

// request body parser middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// attach routes
app.use("/api/admin", adminRouter);
app.use("/api/balances", balancesRouter);
app.use("/api/transactions", transactionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
