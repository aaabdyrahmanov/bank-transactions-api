const moment = require("moment-timezone");
const logger = require("../config/logger");

class Logger {
  static info(data = {}) {
    logger.info(this.generateMessage(data));
  }

  static warn(data = {}) {
    logger.warn(this.generateMessage(data));
  }

  static error(data = {}) {
    logger.error(this.generateMessage(data));
  }

  static generateMessage(error) {
    const { message } = error;
    const datetime = moment(Date.now()).tz("GMT").format("HH:mm:ss DD.MM.YY");
    let text = message;

    if (!text) {
      text = JSON.stringify(error);
      text = `${datetime} - ${text}`;
    } else {
      text = `${datetime}\n${text}`;
    }

    return text;
  }
}

module.exports = Logger;
