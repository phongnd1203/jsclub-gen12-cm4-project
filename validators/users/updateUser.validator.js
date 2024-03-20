const validator = require("express-validator");

const userRoles = require("../../../enums/userRoles.enum.js");

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
  validator
    .body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải chứa ít nhất 8 ký tự"),
  validator
    .body("confirmPassword")
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Mật khẩu không khớp");
      }
      return true;
    }),
  validator
    .body("role")
    .optional()
    .isIn(Object.keys(userRoles))
    .withMessage("Vai trò không hợp lệ"),
];

module.exports = userInputValidator;
