const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const registerService = require("../../services/auth/register.service.js");

const getRegisterPage = (req, res) => {
  res.render("pages/auth/register.view.ejs");
};

const postRegister = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).render("auth/register.view.ejs", {
      errors: validationErrors.array(),
    });
  }

  const { name, phone, email, password } = req.body;

  try {
    await registerService.register(name, phone, email, password);
  } catch (error) {
    throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
  }

  return res.redirect("/login");
};

module.exports = {
  getRegisterPage,
  postRegister,
};
