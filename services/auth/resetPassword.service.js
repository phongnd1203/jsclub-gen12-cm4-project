const argon2 = require("argon2");

const UsersModel = require("../../models/users/user.model.js");

const jwt = require("../../utils/jwt.js");

const createResetPasswordToken = async (email) => {
  const user = await UsersModel.findOne({ email }).select("_id").lean().exec();

  if (!user) {
    throw new Error("Tài khoản không tồn tại");
  }

  delete user.password;

  await user.save();

  const resetPasswordToken = jwt.sign(
    {},
    {
      subject: user._id,
      expiresIn: "15m",
    },
  );

  return resetPasswordToken;
};

const resetPassword = async (token, password) => {
  const { sub: userId } = jwt.verify(token);

  const user = await getUsersService
    .getUser({ _id: userId })
    .select({
      _id: 1,
      password: 1,
    })
    .lean()
    .exec();

  if (!user || (user && !user.password)) {
    throw new Error("Yêu cầu không hợp lệ");
  }

  const hashedPassword = await argon2.hash(password);

  await UsersModel.updateOne(
    { _id: userId },
    {
      password: hashedPassword,
    },
  ).exec();
};

module.exports = {
  createResetPasswordToken,
  resetPassword,
};
