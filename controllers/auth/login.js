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

  return res.render("pages/auth/login.ejs", { metadata });
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    try {
      const user = await loginService.login(email, password);
      req.session.user = user;
      req.session.userId = user._id;
    } catch (error) {
      throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
    }

    return res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getLoginPage,
  postLogin,
};
