const HouseModel = require("../../models/houses/house.js");

async function createHouse(houseData) {
  try {
    const newHouse = await HouseModel.create(houseData);
    return newHouse;
  } catch (error) {
    throw new Error(`Failed to create house: ${error.message}`);
  }
}

module.exports = { createHouse };
