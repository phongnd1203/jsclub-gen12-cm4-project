const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const { validationResult } = require("express-validator");

const resetPasswordService = require("../../services/auth/resetPassword.service.js");

const getForgotPasswordPage = (req, res) => {
  return res.render("pages/auth/forgot-password.view.ejs");
};

const postForgotPassword = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Thông tin đã nhập không hợp lệ",
        validationErrors.array(),
      );
    }

    const { email } = req.body;

    try {
      const resetPasswordToken =
        await resetPasswordService.createResetPasswordToken(email);
      req.session.resetPasswordToken = resetPasswordToken;
    } catch (error) {
      throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
    }

    return res.redirect("/auth/login");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getForgotPasswordPage,
  postForgotPassword,
};
