const { StatusCodes } = require("http-status-codes");

const errorHandler = async (err, req, res, next) => {
  console.error("Error Handler Middleware");
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  console.error(err);
  return next();
};

module.exports = errorHandler;
