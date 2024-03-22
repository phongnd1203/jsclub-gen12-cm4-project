const argon2 = require("argon2");

const UserModel = require("../../models/users/user.js");

const createUser = async (userData) => {
  if (
    await UserModel.exists({
      phone: userData.phone,
    })
  ) {
    throw new Error("Số điện thoại đã tồn tại");
  }

  if (
    await UserModel.exists({
      email: userData.email,
    })
  ) {
    throw new Error("Email đã tồn tại");
  }

  const hashedPassword = await argon2.hash(userData.password);
  delete userData.password;

  const user = new UserModel({
    ...userData,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

module.exports = { createUser };
