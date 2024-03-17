const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const appConfig = require("../configs/app.config.js");

const { env } = appConfig();

class HttpException extends Error {
  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    errors = [],
    data = undefined,
  ) {
    super(message || getReasonPhrase(statusCode));
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = undefined ? env === "production" : data;
  }
}

module.exports = HttpException;
