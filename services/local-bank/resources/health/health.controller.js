/**
 * @desc check server health status
 * @param object req - http request
 * @param object res - http response
 * @returns {object} health object - server status
 */
async function checkHealth(req, res) {
  const health = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  return res.status(200).json(health);
}

module.exports = {
  checkHealth,
};
