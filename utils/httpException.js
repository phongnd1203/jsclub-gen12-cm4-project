const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class HttpException extends Error {
  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    errors = [],
    data = {},
  ) {
    super(message || getReasonPhrase(statusCode));
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpException;
