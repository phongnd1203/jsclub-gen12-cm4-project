const DistrictModel = require("../../models/districts/district.model.js");

const getDistricts = async () => {
  return await DistrictModel.find().lean().exec();
};

const getDistrictById = async (id) => {
  return await DistrictModel.findById(id).lean().exec();
};

const getDistrictByCode = async (code) => {
  return await DistrictModel.findOne({ code }).lean().exec();
};

module.exports = {
  getDistricts,
  getDistrictById,
  getDistrictByCode,
};
