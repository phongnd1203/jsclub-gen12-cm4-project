const argon2 = require("argon2");

const UserModel = require("../../models/users/user.model.js");

const login = async (email, password) => {
  const user = await UserModel.findOne({ email })
    .select({ password: 1 })
    .lean()
    .exec();

  if (!user || !(await argon2.verify(user.password, password))) {
    throw new Error("Email hoặc mật khẩu không chính xác");
  }

  return user;
};

module.exports = login;
