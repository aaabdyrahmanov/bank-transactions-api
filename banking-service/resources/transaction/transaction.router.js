const router = require("express").Router();

const controllers = require("./transaction.controllers");

const { cache } = require("../../middleware");

/**
    /v1/transaction
 */
router
  .route("/")
  .get(cache, controllers.getMany)
  .post(controllers.createAll)
  .delete(controllers.removeMany);

module.exports = router;
