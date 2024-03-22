const validator = require("express-validator");

const userRoles = require("../../enums/userRoles.js");
const userInputValidator = [
  validator
    .body("name")
    .notEmpty()
    .withMessage("Tên không được để trống")
    .trim(),
  validator
    .body("phone")
    .isMobilePhone("vi-VN")
    .withMessage("Số điện thoại không hợp lệ"),
  validator
    .body("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  validator.body("password").custom((value, { req }) => {
    if (value && value.length < 8) {
      throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
    }
    return true;
  }),
  validator.body("confirmPassword").custom((value, { req }) => {
    const { password } = req.body;

    if (!password && !value) {
      return true;
    }

    if (password !== value) {
      throw new Error("Mật khẩu không trùng khớp");
    }

    return true;
  }),
];

module.exports = userInputValidator;
