const UserModel = require("../../models/users/user.js");

const getUserById = async (id) => {
  const user = await UserModel.findById(id).exec();

  return user;
};

module.exports = { getUserById };
