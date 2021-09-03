/* eslint-disable no-underscore-dangle */
const { Transform } = require("json2csv");
const { Readable } = require("stream");

const { dateFormatter: formatDate } = require(".");

/**
 * Export the file as HTTP response attachment
 * @param {object} file - includes file config, fields and data
 */
module.exports = (file) => {
  try {
    const input = new Readable({
      objectMode: true,
    });
    input._read = () => {};

    file.data.forEach((el) => {
      input.push({
        id: el.id,
        _id: el._id,
        amount: el.amount,
        counterpart_name: el.counterpart_name,
        counterpart_iban: el.counterpart_iban,
        date: formatDate(el.date),
        createdAt: formatDate(el.createdAt),
      });
    });
    // Close the stream
    input.push(null);

    const transform = new Transform(
      {
        fields: file.fields,
      },
      {
        objectMode: true,
        encoding: "utf-8",
        writableObjectMode: true,
      }
    );

    return { input, transform };
  } catch (err) {
    throw new Error(err.message);
  }
};
