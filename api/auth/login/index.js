const express = require("express");

const validator = require("express-validator");

const argon2 = require("argon2");

const UserModel = require("../../../models/users/user.model");

const loginRouter = express.Router();

loginRouter.get("/", async (req, res) => {
  res.render("auth/login.view.ejs");
});

loginRouter.post(
  "/",
  validator
    .body("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  validator
    .body("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải chứa ít nhất 8 ký tự"),
  async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("auth/login.view.ejs", {
        errors: validationErrors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })
      .select({ password: 1 })
      .lean()
      .exec();

    if (!user || !(await argon2.verify(user.password, password))) {
      return res.status(400).render("auth/login.view.ejs", {
        errors: [{ msg: "Email hoặc mật khẩu không chính xác" }],
      });
    }

    // TODO: Handle user session

    res.redirect("/");
  },
);

module.exports = loginRouter;
