const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const { config } = require("../configs/appConfig.js");

const errorHandler = async (error, req, res, next) => {
  console.error(error);

  const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const reason = error.reason || getReasonPhrase(status);
  const message = error.message || reason;

  res
    .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .render(`pages/error.ejs`, {
      metadata: {
        title: reason,
        description: `Error ${status} (${reason}): ${message}`,
      },
      error: {
        status,
        reason,
        message,
      },
    });

  return next();
};

module.exports = errorHandler;
