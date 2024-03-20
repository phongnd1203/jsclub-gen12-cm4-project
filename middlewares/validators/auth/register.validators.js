const validator = require("express-validator");

const registerValidator = [
  validator
    .body("name")
    .notEmpty()
    .withMessage("Tên không được để trống")
    .trim(),
  validator
    .body("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  validator
    .body("phone")
    .isMobilePhone("vi-VN")
    .withMessage("Số điện thoại không hợp lệ"),
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
];

module.exports = registerValidator;
