const UserModel = require("../../models/users/user.model.js");

const deleteHouseService = require("../houses/deleteHouse.service.js");

const deleteUser = async (id) => {
  await UserModel.findByIdAndDelete(id).exec();
  await deleteHouseService.deleteHouseByOwnerId(id);
};

module.exports = { deleteUser };
