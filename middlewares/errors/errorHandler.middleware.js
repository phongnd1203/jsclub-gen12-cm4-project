const errorHandler = async (err, req, res, next) => {
  console.error("Error Handler Middleware");
  console.error(err);
  res.status(err.statusCode).json(err);

  next();
};

module.exports = errorHandler;
