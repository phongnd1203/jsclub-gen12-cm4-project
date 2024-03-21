const DistrictModel = require("../../models/districts/district.js");

const getDistricts = async () => {
  return await DistrictModel.find().exec();
};

const getDistrictById = async (id) => {
  return await DistrictModel.findById(id).exec();
};

const getDistrictByCode = async (code) => {
  return await DistrictModel.findOne({ code }).exec();
};

module.exports = {
  getDistricts,
  getDistrictById,
  getDistrictByCode,
};
