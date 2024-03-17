const validator = require("express-validator");

const houseInputValidator = [
  validator.body("title").isString(),
  validator.body("description").isString(),
  validator.body("address").isString(),
  validator.body("districtCode").isString(),
  validator.body("price").isNumeric(),
  validator.body("area").isNumeric(),
  validator.body("availability").isBoolean(),
];

module.exports = houseInputValidator;
