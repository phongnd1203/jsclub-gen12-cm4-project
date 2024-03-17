const express = require("express");

const validator = require("express-validator");

const argon2 = require("argon2");

const UserModel = require("../../models/users/user.model.js");

const authRouter = express.Router();

authRouter.get("/login", async (req, res) => {
  res.render("pages/auth/login.view.ejs");
});

authRouter.post(
  "/login",
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

    req.session.user = user;

    res.redirect("/");
  },
);

authRouter.get("/register", async (req, res) => {
  res.render("pages/auth/register.view.ejs");
});

authRouter.post(
  "/register",
  validator
    .body("name")
    .notEmpty()
    .withMessage("Tên không được để trống")
    .trim(),
  validator
    .body("phone")
    .isMobilePhone("vi-VN")
    .withMessage("Số điện thoại không hợp lệ")
    .custom(async (value) => {
      const user = await UserModel.findOne({ phone: value })
        .limit(1)
        .lean()
        .exec();
      if (user) {
        throw new Error("Số điện thoại đã được sử dụng");
      }
      return true;
    }),
  validator
    .body("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value })
        .limit(1)
        .lean()
        .exec();
      if (user) {
        throw new Error("Email đã được sử dụng");
      }
      return true;
    }),
  validator
    .body("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải chứa ít nhất 8 ký tự"),
  validator.body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Mật khẩu không khớp");
    }
    return true;
  }),
  async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("auth/register.view.ejs", {
        errors: validationErrors.array(),
      });
    }

    const { name, phone, email, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const user = new UserModel({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.redirect("/login");
  },
);

authRouter.post("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = authRouter;
