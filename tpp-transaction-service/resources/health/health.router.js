const router = require("express").Router();

const controllers = require("./health.controller");

/**
  /api/health
 */
router.get("/health", controllers.checkHealth);

module.exports = router;
