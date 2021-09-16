const server = require("./server");
const { HOST, PORT } = require("./config");
const { connect } = require("./utils/bootstrap");

// run the server
server.listen(PORT, HOST, async (err) => {
  if (err) console.error(err);

  // connect on db
  await connect();

  console.info("Database connected.");
  
  console.info(`REST API started on http://${HOST}:${PORT}`);
});
