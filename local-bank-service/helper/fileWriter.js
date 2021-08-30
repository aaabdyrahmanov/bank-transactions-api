const { createWriteStream } = require("fs");

/**
 * Create write stream and create a new file
 * @param {object} file - includes file name, type and data
 */
module.exports = ({ name, type, data }) => {
  const writeStream = createWriteStream(`./${name}.${type}`);

  writeStream.on("finish", () => {
    console.log(`Exporting ${name}.${type} completed!`);
  });

  writeStream.write(JSON.stringify(data));
};
