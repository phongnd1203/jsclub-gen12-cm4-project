const { StatusCodes } = require("http-status-codes");
const HttpException = require("../utils/httpException.js");

const { validationResult } = require("express-validator");

const validateRequest = (validators) => [
  ...validators,
  (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          "Thông tin đã nhập không hợp lệ",
          validationErrors.array(),
        );
      }

      return next();
    } catch (error) {
      return next(error);
    }
  },
];

module.exports = validateRequest;
