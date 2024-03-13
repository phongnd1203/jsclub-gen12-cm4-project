const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const DistrictModel = mongoose.model("District", districtSchema);

module.exports = DistrictModel;
