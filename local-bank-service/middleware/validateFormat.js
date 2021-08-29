const { TPP_SERVICE_URL } = require("../config");

/**
 * Validate the date format
 * if valid set new operations
 *
 * @param object req - http request
 * @param object res - http response
 * @param function next - callback function
 * @returns void
 */
module.exports = async function validateFormat(req, res, next) {
  const { lastTransactionId, lastDate } = req.query;
  const isValidDate = isIsoDate(lastDate);

  if (lastDate && !isValidDate) {
    return res.status(400).json({
      status: "failure",
      message:
        "Invalid date format! Filtering balances by date would be ignored. Please, try again.",
    });
  }

  const operations = [
    operationData(
      TPP_SERVICE_URL,
      "transactions",
      "GET",
      !!lastTransactionId,
      "lastTransactionId",
      lastTransactionId
    ),
    operationData(
      TPP_SERVICE_URL,
      "balances",
      "GET",
      isValidDate,
      "lastDate",
      lastDate
    ),
  ];

  // set operations to the req object
  req.operations = operations;

  // call next process
  return next();
};

/**
 * @desc create new operation
 * @param {object} options - specified options
 * @return {object} operation - operation data
 */
function operationData(
  url,
  type,
  method,
  hasFilter,
  filterByName,
  filterByValue
) {
  return {
    url,
    type,
    method,
    hasFilter,
    filterByName,
    filterByValue,
  };
}

/**
 * check is given date is in ISO format
 * YYYY-MM-DDTHH:MN:SS.MSSZ
 *
 * @param {object} options - specified options
 * @return {boolean} status of the date format match
 */
function isIsoDate(date) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) return false;
  const recreatedDate = new Date(date);

  return recreatedDate != "Invalid Date";
}
