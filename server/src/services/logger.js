const { createLogger, format, transports } = require("winston");

const logger_7 = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: "logs/login.log" })],
});

module.exports = { logger_7 };
