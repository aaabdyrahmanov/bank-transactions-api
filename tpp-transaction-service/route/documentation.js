const express = require("express");

const router = express.Router({ mergeParams: true });

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../tpp-service-docs.json");

/**
  /api/documentation
 */
router.use(
  "/documentation",
  (req, res, next) => {
    swaggerDocument.host = req.get("host");
    req.swaggerDoc = swaggerDocument;

    next();
  },
  swaggerUi.serve,
  swaggerUi.setup()
);

module.exports = router;
