const HouseModel = require("../../models/houses/house.model.js");

const createHouse = async (
  user,
  title,
  description,
  address,
  district,
  price,
  area,
  availability,
) => {
  const newHouse = new HouseModel({
    title,
    description,
    address,
    district: district,
    price,
    area,
    availability,
    createdBy: user._id,
  });

  await newHouse.save();

  return newHouse;
};

module.exports = { createHouse };
