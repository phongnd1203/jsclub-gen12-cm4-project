const UserModel = require("../../models/users/user.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: [],
};

const getUsers = async (options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const users = UserModel.find()
    .skip(skip)
    .limit(limit)
    .sort(options.sort)
    .populate(options.populate)
    .exec();

  return users;
};

const getUserById = async (id) => {
  const user = await UserModel.findById(id).exec();

  return user;
};

module.exports = { getUsers, getUserById };
