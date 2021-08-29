/**
 * create API call on TPP-banking API
 * @param {object} options - specified operation options
 * @return {Promise<Object>} - Retrieved operation data
 * @throws {Exception} - Promise rejection depending on the fatality status
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
