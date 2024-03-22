const argon2 = require("argon2");

const UserModel = require("../../models/users/user.js");

const login = async (email, password) => {
  const user = await UserModel.findOne({ email }).select("+password").exec();

  if (!user || !(await argon2.verify(user.password, password))) {
    throw new Error("Email hoặc mật khẩu không chính xác");
  }

  delete user.password;

  return user;
};

module.exports = { login };
