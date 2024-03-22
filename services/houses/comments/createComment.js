const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const createComment = async (userId, houseId, content) => {
  const comment = HouseCommentModel.create({
    user: userId,
    house: houseId,
    content,
  });

  return comment;
};

module.exports = {
  createComment,
};
