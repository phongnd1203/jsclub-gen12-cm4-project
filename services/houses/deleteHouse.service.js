const HouseModel = require("../../models/houses/house.model.js");

const deleteHouse = async (id) => {
  await HouseModel.findByIdAndDelete(id).lean().exec();
  return;
};

const deleteHouseByOwnerId = async (ownerId) => {
  await HouseModel.deleteMany({ owner: ownerId }).lean().exec();
  return;
};

module.exports = { deleteHouse, deleteHouseByOwnerId };
