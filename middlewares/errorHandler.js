const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const { config } = require("../configs/appConfig.js");

const errorHandler = async (err, req, res, next) => {
  console.error(err);

  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const reason = err.reason || getReasonPhrase(status);
  const message = err.message || reason;

  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .render(`error.ejs`, {
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
