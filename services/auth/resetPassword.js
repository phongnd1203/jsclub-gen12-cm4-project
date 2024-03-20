const argon2 = require("argon2");

const UsersModel = require("../../models/users/user.js");
const RevokedTokenModel = require("../../models/tokens/revokedToken.js");

const jwt = require("../../utils/jwt.js");

const createResetPasswordToken = async (email) => {
  const user = await UsersModel.findOne({ email }).select("_id").lean().exec();

  if (!user) {
    throw new Error("Tài khoản không tồn tại");
  }

  const resetPasswordToken = jwt.sign({
    sub: user._id,
    action: "reset-password",
  });

  return resetPasswordToken;
};

const resetPassword = async (token, password) => {
  const payload = jwt.verify(token);

  if (payload.action !== "reset-password") {
    throw new Error("Token không hợp lệ");
  }

  if (await RevokedTokenModel.exists({ token })) {
    throw new Error("Token đã bị thu hồi");
  }

  const hashedPassword = await argon2.hash(password);

  await UsersModel.updateOne(
    { _id: payload.sub },
    { password: hashedPassword },
  );

  await RevokedTokenModel.create({ token, expiresAt: payload.exp });

  return true;
};

module.exports = {
  createResetPasswordToken,
  resetPassword,
};
