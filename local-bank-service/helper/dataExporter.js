const { Transform } = require("json2csv");
const { Readable } = require('stream');

const { dateFormatter: formatDate } = require("./");

/**
 * Export the file as HTTP response attachment
 * @param {object} res - HTTP response object
 * @param {object} file - includes file config, fields and data
 */
module.exports = (res, file) => {
  const input = new Readable({
    objectMode: true
  });
  input._read = () => {};

  file.data.forEach((el, i) => {
    input.push({
      id: el.id,
      _id: el._id,
      amount: el.amount,
      counterpart_name: el.counterpart_name,
      counterpart_iban: el.counterpart_iban,
      date: formatDate(el.date),
      createdAt: formatDate(el.createdAt)
    });    
  });
  // Close the stream
  input.push(null); 

  const transform = new Transform({
    fields: file.fields
  }, {
    objectMode: true,
    encoding: 'utf-8',
    writableObjectMode: true
  });

  res.header("Content-Type", "text/csv");
  res.attachment(`${file.name}.${file.type}`);

  // pipe the read stream to the response object
  input.pipe(transform).pipe(res);
};
