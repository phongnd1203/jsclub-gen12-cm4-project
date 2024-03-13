const mongoose = require("mongoose");

const provinceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const ProvinceModel = mongoose.model("Province", provinceSchema);

module.exports = ProvinceModel;
