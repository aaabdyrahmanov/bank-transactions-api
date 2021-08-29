const router = require("express").Router();

const controllers = require("./sync.controllers");

const { cache, validateFormat } = require("../../middleware");

/**
  /v1/sync/init
 */
router.post("/init", validateFormat, controllers.initializeSync);

/**
  /v1/sync/terminate
 */
router.post("/terminate", controllers.terminateSync);

/**
  /v1/sync
 */
router
  .route("/")
  .get(cache, controllers.getMany)
  .delete(controllers.removeMany);

module.exports = router;
