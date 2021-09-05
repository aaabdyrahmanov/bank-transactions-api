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

    return res.status(200).json(health);
  } catch (err) {
    console.error(err.message);
    return res.status(503);
  }
}

/**
 * @desc clear redis cache
 * @param object req - http request
 * @param object res - http response
 */
async function clearCache(req, res) {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await redis.flushall(); 
    }
    return res
      .status(200)
      .json({ status: "success", message: "Data cleared successully!" });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
}

module.exports = {
  checkHealth,
  clearCache
};
