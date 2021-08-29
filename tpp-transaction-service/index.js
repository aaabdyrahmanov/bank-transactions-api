const server = require("./server")
const { HOST, PORT } = require("./config")

// run the server
server.listen(3004, 'localhost', async (err) => {
  if (err) console.error(err)

  console.info(`REST API started on http://${HOST}:${PORT}/api/documentation`)
});