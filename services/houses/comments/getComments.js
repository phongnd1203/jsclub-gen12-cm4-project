const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: [],
};

const getComments = async (options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const comments = HouseCommentModel.find()
    .skip(skip)
    .limit(limit)
    .sort(options.sort)
    .populate(options.populate)
    .exec();

  return comments;
};

module.exports = {
  getComments,
};
