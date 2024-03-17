const House = require("../../models/houses/house.model.js");

const getHouse = async (id) => {
  const house = await House.findById(id).populate("owner").lean().exec();

  if (!house) {
    throw new Error("Không tìm thấy nhà");
  }

  return house;
};
