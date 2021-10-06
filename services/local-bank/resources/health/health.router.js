const router = require("express").Router();

const controllers = require("./health.controller");

/**
  /v1/health
 */
router.get("/health", controllers.checkHealth);

module.exports = router;
