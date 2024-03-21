const HouseModel = require("../../models/houses/house.js");

const deleteHouse = async (id) => {
  await HouseModel.findByIdAndDelete(id).exec();
  return;
};

const deleteHouseByOwnerId = async (ownerId) => {
  await HouseModel.deleteMany({ owner: ownerId }).exec();
  return;
};

module.exports = { deleteHouse, deleteHouseByOwnerId };
