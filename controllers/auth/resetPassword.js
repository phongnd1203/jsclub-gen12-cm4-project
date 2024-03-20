const resetPasswordService = require("../../services/auth/resetPassword.js");

const getResetPasswordPage = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect("/auth/forgot-password");
  }

  return res.render("users/reset-password.ejs", { token });
};

const postResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    try {
      await resetPasswordService.resetPassword(token, password);
    } catch (err) {
      throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
    }

    return res.redirect("/auth/login");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getResetPasswordPage,
  postResetPassword,
};
