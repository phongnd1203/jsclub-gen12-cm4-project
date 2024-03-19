const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const loginService = require("../../services/auth/login.service.js");

const getLoginPage = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("pages/auth/login.view.ejs");
};

const postLogin = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Thông tin đã nhập không hợp lệ",
        {
          errors: validationErrors.array(),
        },
      );
    }

    const { email, password } = req.body;

    try {
      const user = await loginService.login(email, password);
      req.session.user = user;
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
