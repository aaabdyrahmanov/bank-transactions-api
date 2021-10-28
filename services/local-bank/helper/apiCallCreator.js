/**
 * create API call on TPP-banking API
 * @param {object} options - specified operation options
 * @returns {object} - Retrieved operation data
 */
module.exports = function createAPICall({
  url,
  method,
  type,
  hasFilter,
  filterByName,
  filterByValue,
}) {
  const uri = hasFilter
    ? `/api/${type}?${filterByName}=${filterByValue}`
    : `/api/${type}`;

  return {
    url,
    uri,
    type,
    method,
  };
};
