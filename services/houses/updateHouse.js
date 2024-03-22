const HouseModel = require("../../models/houses/house.js");

async function updateHouse(houseId, updatedData) {
  try {
    const house = await HouseModel.findByIdAndUpdate(houseId, updatedData, {
      new: true,
      omitUndefined: true,
    });
    return house;
  } catch (error) {
    throw new Error(`Failed to update house: ${error.message}`);
  }
}

module.exports = { updateHouse };
