const validator = require("express-validator");

const editHouseValidator = [
  validator.body("title").optional().isString(),
  validator.body("description").optional().isString(),
  validator.body("address").optional().isString(),
  validator.body("districtCode").optional().isString(),
  validator.body("price").optional().isNumeric(),
  validator.body("area").optional().isNumeric(),
  validator.body("availability").optional().isBoolean(),
];

module.exports = editHouseValidator;
