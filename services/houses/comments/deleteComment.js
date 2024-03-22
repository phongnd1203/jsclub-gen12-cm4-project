const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const deleteComment = async (commentId) => {
  await HouseCommentModel.findByIdAndDelete(commentId);
  return;
};

module.exports = {
  deleteComment,
};
