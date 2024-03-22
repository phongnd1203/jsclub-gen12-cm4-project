const createCommentService = require("../../../services/houses/comments/createComment.js");

const postCreateComment = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { houseId } = req.params;
    const { content } = req.body;
    const comment = await createCommentService.createComment(
      userId,
      houseId,
      content,
    );
    return res.redirect(`/houses/${houseId}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCreateComment,
};
