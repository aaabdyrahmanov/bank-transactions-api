const server = require("./server");
const { HOST, PORT } = require("./config");
const { Logger } = require("./helper");
const { connect } = require("./utils/bootstrap");

// run the server
server.listen(PORT, HOST, async (err) => {
  if (err) Logger.error(err);

  // connect on db
  await connect();

  Logger.info("Database connected.");

  Logger.info(`REST API started on http://${HOST}:${PORT}`);
});
