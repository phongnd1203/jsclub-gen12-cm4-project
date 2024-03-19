const UserModel = require("../../models/users/user.model.js");

const updateUser = async (id, name, phone, email, password, role) => {
  const user = await UserModel.findById(id).lean().exec();

  if (!user) {
    throw new Error("User not found");
  }

  if (!role) {
    role = user.role;
  }

  user.name = name;
  user.phone = phone;
  user.email = email;
  user.password = password;
  user.role = role;

  await user.save();

  return user;
};

module.exports = { updateUser };
