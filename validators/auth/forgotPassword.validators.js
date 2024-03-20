const validator = require("express-validator");

const forgotPasswordValidator = [
  validator
    .body("email")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail(),
];

module.exports = forgotPasswordValidator;
