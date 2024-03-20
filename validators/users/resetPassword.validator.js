const validator = require("express-validator");

const resetPasswordValidator = [
  validator.body("token").isJWT().withMessage("Token không hợp lệ"),
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

module.exports = resetPasswordValidator;
