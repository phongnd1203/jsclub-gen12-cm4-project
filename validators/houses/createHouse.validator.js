const validator = require("express-validator");

const houseInputValidator = [
  validator.body("title").isString(),
  validator.body("description").isString(),
  validator.body("address").isString(),
  validator.body("district").isString(),
  validator.body("price").isInt({ min: 0 }),
  validator.body("area").isInt({ min: 0 }),
  validator.body("visible").optional().isString().equals("true"),
];

module.exports = houseInputValidator;
