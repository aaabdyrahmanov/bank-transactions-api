const express = require("express");
const { HOST, PORT } = require("./config");

const app = express();

require("./subscriptions/sync.initialized").start();

app.listen(PORT, HOST, async (err) => {
  if (err) console.error(err);

  console.info(`TPP Notification successfully intitialized!`);
});
