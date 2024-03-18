const HouseModel = require("../../models/houses/house.model.js");

const createHouse = async (
  user,
  title,
  description,
  address,
  district,
  price,
  area,
  visible,
) => {
  const newHouse = new HouseModel({
    title,
    description,
    address: {
      path: address,
      district,
    },
    price,
    area,
    visible,
    owner: user._id,
  });

  await newHouse.save();

  return newHouse;
};

module.exports = { createHouse };
