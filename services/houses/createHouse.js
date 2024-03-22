const HouseModel = require("../../models/houses/house.js");

async function createHouse(userId, houseData) {
  try {
    console.log(houseData);
    const newHouse = await HouseModel.create({
      ...houseData,
      owner: userId,
    });

    return newHouse;
  } catch (error) {
    throw new Error(`Failed to create house: ${error.message}`);
  }
}

module.exports = { createHouse };
