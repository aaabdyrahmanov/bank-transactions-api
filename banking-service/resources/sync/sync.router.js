const router = require("express").Router();

const controllers = require("./sync.controllers");

const { cache, validateFormat } = require("../../middleware");

/**
    /v1/sync/launch
 */
router.get("/launch", validateFormat, controllers.launchSync);

/**
    /v1/sync
 */
router
  .route("/")
  .get(cache, controllers.getMany)
  .delete(controllers.removeMany);

module.exports = router;
