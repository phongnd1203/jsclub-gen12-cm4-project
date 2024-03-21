const HouseModel = require("../../models/houses/house.js");

const createHouse = async (
  userId,
  { title, description, location: { address, district }, price, area, status },
) => {
  const newHouse = new HouseModel({
    title,
    description,
    location: {
      address,
      district,
    },
    price,
    area,
    status,
    owner: userId,
  });

  await newHouse.save();

  return newHouse;
};

module.exports = { createHouse };
