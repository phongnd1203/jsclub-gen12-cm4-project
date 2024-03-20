const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const loginService = require("../../services/auth/login.service.js");

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
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Thông tin đã nhập không hợp lệ",
        validationErrors.array(),
      );
    }

    const { email, password } = req.body;

    try {
      const user = await loginService.login(email, password);
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
