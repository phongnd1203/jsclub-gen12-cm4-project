const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class HttpException extends Error {
  constructor(status, message, errors, context) {
    super(
      message || getReasonPhrase(status || StatusCodes.INTERNAL_SERVER_ERROR),
    );

    this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.reason = getReasonPhrase(this.status);
    this.message = message || this.reason;
    this.errors = errors || [];
    this.context = context || {};

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpException;
