const router = require("express").Router();

const controllers = require("./admin.controller");

/**
  /v1/health
 */
router.get("/health", controllers.checkHealth);

/**
  /v1/cache
 */
router.delete('/cache', controllers.clearCache);

module.exports = router;
