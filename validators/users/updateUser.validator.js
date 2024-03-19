const validator = require("express-validator");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const userInputValidator = [
  validator
    .body("name")
    .optional()
    .notEmpty()
    .withMessage("Tên không được để trống")
    .trim(),
  validator
    .body("phone")
    .optional()
    .isMobilePhone("vi-VN")
    .withMessage("Số điện thoại không hợp lệ"),
  validator
    .body("email")
    .optional()
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  validator
    .body("password")
    .optional()
    .optional()
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải chứa ít nhất 8 ký tự"),
  validator
    .body("confirmPassword")
    .optional()
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
    .optional()
    .isIn(Object.keys(userRoles))
    .withMessage("Vai trò không hợp lệ"),
];

module.exports = userInputValidator;
