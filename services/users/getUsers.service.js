const UserModel = require("../../models/users/user.model.js");

const getUserById = async (id) => {
  const user = await UserModel.findById(id).lean().exec();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = { getUserById };
