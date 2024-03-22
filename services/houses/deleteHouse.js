const HouseModel = require("../../models/houses/house.js");

const deleteHouse = async (houseId) => {
  await HouseModel.findByIdAndDelete(houseId).exec();
};

const deleteHouseByOwnerId = async (ownerId) => {
  await HouseModel.deleteMany({ owner: ownerId }).exec();
  return;
};

module.exports = { deleteHouse, deleteHouseByOwnerId };
