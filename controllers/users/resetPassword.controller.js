const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const { validationResult } = require("express-validator");

const resetPasswordService = require("../../services/auth/resetPassword.service.js");

const getResetPasswordPage = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect("/auth/forgot-password");
  }

  return res.render("users/reset-password.ejs", { token });
};

const postResetPassword = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Thông tin đã nhập không hợp lệ",
        validationErrors.array(),
      );
    }

    const { token, password } = req.body;

    try {
      await resetPasswordService.resetPassword(token, password);
    } catch (error) {
      throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
    }

    return res.redirect("/auth/login");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getResetPasswordPage,
  postResetPassword,
};
