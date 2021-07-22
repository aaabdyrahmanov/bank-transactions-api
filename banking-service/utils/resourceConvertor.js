const { Parser } = require('json2csv')

module.exports.convertResource = (fields, data) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);

  return csv
}