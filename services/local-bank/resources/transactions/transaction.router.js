const router = require("express").Router();

const controllers = require("./transaction.controllers");

/**
    /v1/transactions
 */
router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createMany)
  .delete(controllers.removeMany);

module.exports = router;
