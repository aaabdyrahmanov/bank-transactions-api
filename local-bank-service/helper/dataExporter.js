const { createReadStream } = require("fs");
const { Transform } = require("json2csv");
const writeFile = require("./fileWriter");

/**
 * Export the file as HTTP response attachment
 * @param {object} res - HTTP response object
 * @param {object} file - includes file config, fields and data
 */
module.exports = (res, file) => {
  // write the data as in expected file format
  writeFile(file);

  const transformOpts = { highWaterMark: 16384, encoding: "utf-8" };
  const json2csv = new Transform({ fields: file.fields }, transformOpts);

  const readStream = createReadStream(`${file.name}.${file.type}`, {
    encoding: "utf8",
  });
  readStream.on("data", (chunk) => {
    console.log(`${chunk.length} : Data reeceived successfully!`);
  });

  // set response header
  // attach file to response object
  res.header("Content-Type", "text/csv");
  res.attachment(`${file.name}.${file.type}`);

  // pipe the read stream to the response object
  readStream.pipe(json2csv).pipe(res);
};
