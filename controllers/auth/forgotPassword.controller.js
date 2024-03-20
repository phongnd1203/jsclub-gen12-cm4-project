const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const { validationResult } = require("express-validator");

const resetPasswordService = require("../../services/auth/resetPassword.service.js");

const getForgotPasswordPage = (req, res) => {
  if (req.session.userId) {
    return res.redirect("/");
  }

  const metadata = {
    title: "Quên mật khẩu",
  };

  return res.render("auth/forgot-password.ejs", { metadata });
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
