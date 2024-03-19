const HouseModel = require("../../models/houses/house.model.js");

const updateHouse = async (
  id,
  title,
  description,
  address,
  districtCode,
  price,
  area,
  visible,
) => {
  const house = await HouseModel.findById(id).lean().exec();

  if (!house) {
    throw new Error("Không tìm thấy nhà");
  }

  house.title = title;
  house.description = description;
  house.address = address;
  house.districtCode = districtCode;
  house.price = price;
  house.area = area;
  house.visible = visible;

  await house.save();

  return house;
};

module.exports = { updateHouse };
