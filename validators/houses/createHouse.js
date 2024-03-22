const validator = require("express-validator");

const houseStatus = require("../../enums/houseStatus.js");

const houseInputValidator = [
  validator.body("title").notEmpty().withMessage("Tiêu đề không được để trống"),
  validator.body("description").isString().withMessage("Mô tả không hợp lệ"),
  validator
    .body("location.address")
    .isString()
    .withMessage("Địa chỉ không hợp lệ"),
  validator
    .body("location.district")
    .isString()
    .withMessage("Khu vực không hợp lệ"),
  validator.body("price").isInt({ min: 0 }).withMessage("Giá không hợp lệ"),
  validator
    .body("area")
    .isInt({ min: 0 })
    .withMessage("Diện tích không hợp lệ"),

  validator
    .body("status")
    .isIn(Object.keys(houseStatus))
    .withMessage("Trạng thái không hợp lệ"),
];

module.exports = houseInputValidator;
