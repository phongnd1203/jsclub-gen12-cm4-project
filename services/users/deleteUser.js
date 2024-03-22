const UserModel = require("../../models/users/user.js");

const deleteUserById = async (userId) => {
  await UserModel.findByIdAndDelete(userId).exec();
};

module.exports = { deleteUserById };
