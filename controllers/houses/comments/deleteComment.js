const deleteCommentService = require("../../../services/houses/comments/deleteComment.js");

const postDeleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    await deleteCommentService.deleteComment(commentId);

    res.redirect(`/houses/${houseId}/comments`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postDeleteComment,
};
