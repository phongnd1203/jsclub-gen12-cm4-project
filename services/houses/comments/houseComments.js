const CommentModel = require("../../../models/houses/comments/comment.js");

const createComment = async (houseId, userId, comment) => {
  const newComment = new CommentModel({
    house: houseId,
    owner: userId,
    comment: comment,
  });

  await newComment.save();
  return newComment;
};

const getComments = async (houseId) => {
  const comments = await CommentModel.find({ house: houseId })
    .populate("owner")
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
