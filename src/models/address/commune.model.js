const mognoose = require("mongoose");

const communeSchema = mognoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  district: {
    type: mognoose.Schema.Types.ObjectId,
    ref: "District",
  },
});

const CommuneModel = mognoose.model("Commune", communeSchema);

module.exports = CommuneModel;
