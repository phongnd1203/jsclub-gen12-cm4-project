const validator = require("express-validator");

const loginValidator = [
  validator
    .body("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  validator
    .body("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải chứa ít nhất 8 ký tự"),
];

module.exports = loginValidator;
