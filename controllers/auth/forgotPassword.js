const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const resetPasswordService = require("../../services/auth/resetPassword.js");

const mailer = require("../../utils/mailer.js");

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
    const resetPasswordLink = `${req.protocol}://${req.get(
      "host",
    )}/auth/reset-password?token=${resetPasswordToken}`;

    mailer.sendMail(email, "Đặt lại mật khẩu", "action-template", {
      action: {
        name: "Đặt lại mật khẩu",
        link: resetPasswordLink,
      },
    });

    return res.redirect("/auth/login");
  } catch (err) {
    return next(err);
  }
};

const getResetPasswordPage = async (req, res, next) => {
  try {
    const metadata = {
      title: "Đặt lại mật khẩu",
    };

    const { token } = req.query;

    try {
      await resetPasswordService.verifyResetPasswordToken(token);
      return res.render("auth/reset-password.ejs", { metadata, token });
    } catch (err) {
      throw new HttpException(StatusCodes.BAD_REQUEST, err.message);
    }
  } catch (err) {
    return next(err);
  }
};

const postResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    await resetPasswordService.resetPassword(token, password);

    return res.redirect("/auth/login");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getForgotPasswordPage,
  postForgotPassword,
  getResetPasswordPage,
  postResetPassword,
};
