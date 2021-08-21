const router = require("express").Router();
const controllers = require("./transaction.controllers");

/**
    /v1/transaction
 */
router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createAll)
  .delete(controllers.removeMany);

module.exports = router;
