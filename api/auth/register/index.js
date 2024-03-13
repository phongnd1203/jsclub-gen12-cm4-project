const express = require("express");

const validator = require("express-validator");

const argon2 = require("argon2");

const UserModel = require("../../../models/users/user.model");

const registerRouter = express.Router();

registerRouter.get("/", async (req, res) => {
  res.render("auth/register.view.ejs");
});

registerRouter.post(
  "/",
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
  validator.body("passwordConfirmation").custom((value, { req }) => {
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

    const { name, email, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const user = new UserModel({ name, email, password: hashedPassword });

    await user.save();

    res.redirect("/login");
  },
);

module.exports = registerRouter;