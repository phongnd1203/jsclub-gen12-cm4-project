const UserModel = require("../../models/users/user.model.js");

const getUserById = async (id) => {
  const user = await UserModel.findById(id).exec();
  return user;
};

const getUsers = async () => {
  const user = await UserModel.find().exec();
  return user;
};

module.exports = {getUserById , getUsers};
