const argon2 = require("argon2");

const UserModel = require("../../models/users/user.js");

const register = async (name, phone, email, password) => {
  if (await UserModel.exists({ phone })) {
    throw new Error("Số điện thoại đã tồn tại");
  }

  if (await UserModel.exists({ email })) {
    throw new Error("Email đã tồn tại");
  }

  const hashedPassword = await argon2.hash(password);

  const user = new UserModel({
    name,
    phone,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

module.exports = { register };
