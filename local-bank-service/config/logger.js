const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { basename } = require("path");

const NUMBER_OF_DAYS_TO_KEEP_LOG = 30;
const FILE_SIZE_TO_ROTATE = 1; // in megabyte
const LOG_DIR = "log";
const DATE_PATTERN_CONFIG = {
  default: "YYYY-MM-DD",
  everHour: "YYYY-MM-DD-HH",
  everMinute: "YYYY-MM-DD-THH-mm",
};

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `../${LOG_DIR}/%DATE%-results.log`,
  datePattern: DATE_PATTERN_CONFIG.everHour,
  zippedArchive: true,
  maxSize: `${FILE_SIZE_TO_ROTATE}m`,
  maxFiles: `${NUMBER_OF_DAYS_TO_KEEP_LOG}d`,
});

const logger = createLogger({
  level: "info",
  handleExceptions: true,
  format: format.combine(
    format.label({ label: basename(module.parent.filename) }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf(
      (info) =>
        `${info.timestamp}[${info.label}] ${info.level}: ${JSON.stringify(
          info.message
        )}`
    )
  ),
  transports: [
    new transports.Console({
      level: "info",
      handleExceptions: true,
      format: format.combine(
        format.label({ label: basename(module.parent.filename) }),
        format.colorize(),
        format.printf(
          (info) =>
            `${info.timestamp}[${info.label}] ${info.level}: ${info.message}`
        )
      ),
    }),
    dailyRotateFileTransport,
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
