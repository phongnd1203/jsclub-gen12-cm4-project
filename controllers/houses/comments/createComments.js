const createCommentService = require("../../../services/houses/comments/createComment.js");

const postCreateComment = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { houseId } = req.params;
    const { content } = req.body;
    console.log(userId, houseId, content);
    const comment = await createCommentService.createComment(userId, houseId, content);
    console.log(comment);
    return res.redirect(`/houses/${houseId}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCreateComment,
};