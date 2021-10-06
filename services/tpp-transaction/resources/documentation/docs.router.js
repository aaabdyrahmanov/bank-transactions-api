const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");

const { setDocs } = require("../../middleware");

/**
  /api/documentation
 */
router.use("/documentation", setDocs, swaggerUi.serve, swaggerUi.setup());

module.exports = router;
