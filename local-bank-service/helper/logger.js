const dayjs = require("dayjs");
const logger = require("../config/logger");

class Logger {
  static async info(data = {}) {
    logger.info(this.generateMessage(data));
  }

  static async warn(data = {}) {
    logger.warn(this.generateMessage(data));
  }

  static error(data = {}) {
    logger.error(this.generateMessage(data));
  }

  static generateMessage(error) {
    const { message } = error;
    const datetime = dayjs().format("HH:mm:ss DD.MM.YY");
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
