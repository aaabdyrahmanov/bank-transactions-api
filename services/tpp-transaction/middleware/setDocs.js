const swaggerDocument = require("../data/tpp-service-docs.json");

/**
 * Set the API spec on request object as swaggerDoc
 *
 * @param object req - http request
 * @param object res - http response
 * @param function next - callback function
 * @returns void
 */
module.exports = async function setDocs(req, res, next) {
  swaggerDocument.host = req.get("host");
  req.swaggerDoc = swaggerDocument;

  // call next process
  next();
};
