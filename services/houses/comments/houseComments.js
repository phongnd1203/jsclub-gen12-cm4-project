const CommentModel = require("../../../models/houses/comments/comment.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: [],
};

const createComment = async (houseId, userId, comment) => {
  const newComment = new CommentModel({
    house: houseId,
    owner: userId,
    comment: comment,
  });

  await newComment.save();
  return newComment;
};

const getComments = async (houseId, options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const comments = await CommentModel.find({ house: houseId })
    .populate('owner')
    .limit(limit)
    .skip(skip)
    .exec();
  return comments;
};

const deleteComment = async (commentId) => {
  await CommentModel.findByIdAndDelete(commentId).exec();
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
};
