const { redis } = require("../../middleware");
/**
 * @desc check server health status
 * @param object req - http request
 * @param object res - http response
 * @returns {object} health object - server status
 */
async function checkHealth(req, res) {
  let health;

  try {
    health = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };

    return res.status(200).send(health);
  } catch (err) {
    console.error(err.message);
    return res.status(503).send({ status: "failure", message: err.message });
  }
}

/**
 * @desc clear redis cache
 * @param object req - http request
 * @param object res - http response
 */
async function clearCache(req, res) {
  try {
    await redis.flushall();
    res.status(200).send({ status: "success", message: "Data cleared successully!"})
  } catch (err) {
    console.error(err.message);
    return res.status(400).send({ status: "failure", message: err.message });     
  }
}

module.exports = {
  checkHealth,
  clearCache
};
