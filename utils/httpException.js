const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class HttpException extends Error {
  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    data = undefined,
  ) {
    super(message || getReasonPhrase(statusCode));
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = HttpException;
