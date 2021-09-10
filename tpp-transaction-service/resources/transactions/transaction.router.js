const router = require("express").Router();

const controllers = require("./transaction.controllers");

/**
  /api/transactions
 */
router.route("/").get(controllers.getMany);

module.exports = router;
