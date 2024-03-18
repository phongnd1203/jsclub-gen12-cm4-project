const validator = require("express-validator");

const houseInputValidator = [
  validator.body("title").isString(),
  validator.body("description").isString(),
  validator.body("address").isString(),
  validator.body("district").isString(),
  validator.body("price").isNumeric(),
  validator.body("area").isNumeric(),
  validator.body("availability").optional().isString().equals("true"),
];

module.exports = houseInputValidator;
