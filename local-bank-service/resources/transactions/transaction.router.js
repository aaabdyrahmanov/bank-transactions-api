const router = require("express").Router();

const controllers = require("./transaction.controllers");

const { cache } = require("../../middleware");

/**
    /v1/transactions
 */
router
  .route("/")
  .get(cache, controllers.getMany)
  .post(controllers.createMany)
  .delete(controllers.removeMany);

module.exports = router;
