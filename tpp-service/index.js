const server = require("./server")
const { HOST, PORT } = require("./config")

// run the server
server.listen(PORT, HOST, async (err) => {
  if (err) console.error(err)

  console.info(`REST API started on http://${HOST}:${PORT}/api/documentation`)
});