const moment = require("moment-timezone");

module.exports = (date) =>
  moment(date).tz("GMT").format("H:mm:ss A, Do MMM YYYY (UTC Z)");
