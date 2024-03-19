const validator = require("express-validator");

const houseInputValidator = [
  validator.body("title").optional().isString(),
  validator.body("description").optional().isString(),
  validator.body("address").optional().isString(),
  validator.body("district").optional().isString(),
  validator.body("price").optional().isInt({ min: 0 }),
  validator.body("area").optional().isInt({ min: 0 }),
  validator.body("visible").optional().isString().equals("true"),
];

module.exports = houseInputValidator;
