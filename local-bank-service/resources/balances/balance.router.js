const router = require("express").Router();

const controllers = require("./balance.controllers");

const { cache } = require("../../middleware");

/**
    /v1/balances
 */
router
  .route("/")
  .get(cache, controllers.getMany)
  .post(controllers.createMany)
  .delete(controllers.removeMany);

module.exports = router;
