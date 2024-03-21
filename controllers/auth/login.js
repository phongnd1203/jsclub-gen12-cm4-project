const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const loginService = require("../../services/auth/login.js");

const getLoginPage = (req, res) => {
  if (req.session.userId) {
    return res.redirect("/");
  }

  const metadata = {
    title: "Đăng nhập",
  };

  return res.render("auth/login.ejs", { metadata });
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    try {
      const user = await loginService.login(email, password);
      req.session.user = user;
      req.session.userId = user._id;
    } catch (err) {
      throw new HttpException(StatusCodes.BAD_REQUEST, err.message);
    }

    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getLoginPage,
  postLogin,
};
