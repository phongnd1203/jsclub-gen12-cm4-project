const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const loginService = require("../../services/auth/login.service.js");

const getLoginPage = (req, res) => {
  res.render("pages/auth/login.view.ejs");
};

const postLogin = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).render("auth/login.view.ejs", {
      errors: validationErrors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await loginService(email, password);
    req.session.user = user;
  } catch (error) {
    throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
  }

  return res.redirect("/");
};

module.exports = {
  getLoginPage,
  postLogin,
};
