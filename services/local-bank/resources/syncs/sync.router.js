const router = require("express").Router();

const controllers = require("./sync.controllers");

const { validateFormat } = require("../../middleware");

/**
  /v1/syncs/init
 */
router.post("/init", validateFormat, controllers.initializeSync);

/**
  /v1/syncs/terminate
 */
router.post("/terminate", controllers.terminateSync);

/**
  /v1/syncs
 */
router
  .route("/")
  .get(controllers.getMany)
  .delete(controllers.removeMany);

module.exports = router;
