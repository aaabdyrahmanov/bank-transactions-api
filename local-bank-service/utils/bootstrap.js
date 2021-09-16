const mongoose = require("mongoose");
const options = require("../config");

module.exports.connect = (url = options.DB_URL, opts = {}) => mongoose.connect(url, {
  ...opts,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
