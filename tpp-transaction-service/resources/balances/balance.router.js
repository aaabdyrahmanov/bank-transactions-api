const router = require("express").Router();

const controllers = require("./balance.controllers");

/**
  /api/balances
 */
router.route("/").get(controllers.getMany);

module.exports = router;
