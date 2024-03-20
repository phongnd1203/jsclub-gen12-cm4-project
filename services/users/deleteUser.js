const UserModel = require("../../models/users/user.js");

const deleteHouseService = require("../houses/deleteHouse.js");

const deleteUser = async (id) => {
  await UserModel.findByIdAndDelete(id).exec();
  await deleteHouseService.deleteHouseByOwnerId(id);
};

module.exports = { deleteUser };
