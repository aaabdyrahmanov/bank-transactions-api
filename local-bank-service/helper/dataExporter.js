/* eslint-disable no-underscore-dangle */
const { Transform: TransformJSON2CSV } = require("json2csv");
const { Readable, Transform: TransformParser } = require("stream");

const { dateFormatter: formatDate } = require(".");

/**
 * Export the streams for piping
 * @param {object} file - includes file config, fields and data
 */
module.exports = (file) => {
  // read the data with stream
  const dataReadable = new Readable({
    objectMode: true,
  });
  dataReadable.push(file.data);
  dataReadable.push(null); // no more data

  // parse and convert the data into expected format
  const dataParser = new TransformParser({
    objectMode: true,
    transform(chunk, encoding, callback) {
      chunk.forEach((el) => {
        this.push({
          id: el.id,
          _id: el._id,
          amount: el.amount,
          counterpart_name: el.counterpart_name,
          counterpart_iban: el.counterpart_iban,
          date: formatDate(el.date),
          createdAt: formatDate(el.createdAt),
        });
      });
      callback();
    },
  });

  // convert the json data into csv
  const JSON2CSV = new TransformJSON2CSV(
    {
      fields: file.fields,
    },
    {
      objectMode: true,
      encoding: "utf-8",
    }
  );

  return { dataReadable, dataParser, JSON2CSV };
};
