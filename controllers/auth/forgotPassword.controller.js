const resetPasswordService = require("../../services/auth/resetPassword.service.js");

const getForgotPasswordPage = (req, res) => {
  const metadata = {
    title: "Quên mật khẩu",
  };

  return res.render("auth/forgot-password.ejs", { metadata });
};

const postForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const resetPasswordToken =
      await resetPasswordService.createResetPasswordToken(email);

    // TODO: Send reset password email

    return res.redirect("/auth/login");
  } catch (error) {
    return next(error);
  }
};

const getResetPasswordPage = (req, res) => {
  const metadata = {
    title: "Đặt lại mật khẩu",
  };

  const { token } = req.query;

  return res.render("auth/reset-password.ejs", { metadata, token });
};

const postResetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getForgotPasswordPage,
  postForgotPassword,
};
