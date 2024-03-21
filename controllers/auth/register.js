const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const registerService = require("../../services/auth/register.js");

const getRegisterPage = (req, res) => {
  if (req.session.userId) {
    return res.redirect("/");
  }

  const metadata = {
    title: "Đăng ký",
  };

  return res.render("pages/auth/register.ejs", { metadata });
};

const postRegister = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Dữ liệu đầu vào không hợp lệ",
        {
          errors: validationErrors.array(),
        },
      );
    }

    const { name, phone, email, password } = req.body;

    try {
      await registerService.register(name, phone, email, password);
    } catch (error) {
      throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
    }

    return res.redirect("/auth/login");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getRegisterPage,
  postRegister,
};
