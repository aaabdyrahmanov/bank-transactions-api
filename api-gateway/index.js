const express = require("express");
const { json, urlencoded } = require("body-parser");

const { PORT, HOST } = require("./config");
const router = require("./router");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bank Transactions API Gateway");
});

app.use(router);

// run the server
app.listen(PORT, HOST, async (err) => {
  if (err) console.error(err);

  console.info(`REST API started on http://${HOST}:${PORT}`);
});
