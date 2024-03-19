const HouseModel = require("../../models/houses/house.model.js");

const getHouseById = async (id) => {
  const house = await HouseModel.findById(id).populate("owner").lean().exec();

  if (!house) {
    throw new Error("Không tìm thấy nhà");
  }

  return house;
};

module.exports = { getHouseById };
