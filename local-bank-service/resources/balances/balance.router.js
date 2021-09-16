const router = require("express").Router();

const controllers = require("./balance.controllers");

/**
    /v1/balances
 */
router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createMany)
  .delete(controllers.removeMany);

module.exports = router;
