const router = require("express").Router();

/**
  /api/health
 */
router.use("/health", (req, res) => {
  let health;

  try {
    health = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };
  } catch (err) {
    console.error(err.message);
    return res.status(503).send({ status: "failure", message: err.message });
  }

  return res.status(200).send(health);
});

module.exports = router;
