const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "request.log" })],
});

const errorLogger = expressWinston.errorLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

module.exports = { requestLogger, errorLogger };
