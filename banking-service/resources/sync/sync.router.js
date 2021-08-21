const router = require("express").Router();
const controllers = require("./sync.controllers");
const validateFormat = require("../../middleware/validateFormat");

/**
    /v1/sync/launch
 */
router.get("/launch", validateFormat, controllers.launchSync);

/**
    /v1/sync
 */
router.route("/").get(controllers.getMany).delete(controllers.removeMany);

module.exports = router;
