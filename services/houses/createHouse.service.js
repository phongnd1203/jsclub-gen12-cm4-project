const House = require("../../models/houses/house.model.js");

const createHouse = async (
  user,
  title,
  description,
  address,
  districtCode,
  price,
  area,
  availability,
) => {
  const newHouse = new House({
    title,
    description,
    address,
    districtCode,
    price,
    area,
    availability,
    createdBy: user._id,
  });

  await newHouse.save();

  return newHouse;
};

module.exports = { createHouse };
