const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
  districtCode: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const DistrictModel = mongoose.model("District", districtSchema);

module.exports = DistrictModel;
