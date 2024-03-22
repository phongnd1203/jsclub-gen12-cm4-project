const argon2 = require("argon2");

const UserModel = require("../../models/users/user.js");

const updateUser = async (id, userData) => {
  const hashedPassword = await argon2.hash(userData.password);

  const user = await UserModel.findByIdAndUpdate(
    id,
    { ...userData, password: userData.password && hashedPassword },
    { new: true },
  );

  return user;
};

module.exports = { updateUser };
