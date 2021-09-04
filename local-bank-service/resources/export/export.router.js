const router = require("express").Router();
const controllers = require("./export.controllers");

/**
    /v1/export/transactions
 */
router.route("/transactions").get(controllers.transactions);

/**
    /v1/export/balances
 */
router.route("/balances").get(controllers.balances);

module.exports = router;
