const express = require("express");
const { json, urlencoded } = require("body-parser");
const createError = require("http-errors");

// import API routes
const routes = require("../route");

const app = express();

// request body parser middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// attach routes
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
