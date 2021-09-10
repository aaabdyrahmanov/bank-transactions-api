const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");

const controllers = require("./admin.controller");
const { setDocs } = require("../../middleware");

/**
  /api/health
 */
router.get("/health", controllers.checkHealth);

/**
  /api/documentation
 */
router.use("/documentation", setDocs, swaggerUi.serve, swaggerUi.setup());

module.exports = router;
