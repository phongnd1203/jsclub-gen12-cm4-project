const Comment = require("../../models/comment"); 

const deleteCommentController = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Không thấy bình luận" });
    }
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  deleteCommentController,
};
