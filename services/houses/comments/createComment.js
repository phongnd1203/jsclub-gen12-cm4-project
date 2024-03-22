const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const createComment = async (userId, houseId, content) => {
  const comment = new HouseCommentModel({
    house: houseId,
    owner: userId,
    content,
  });
  await comment.save();

  return comment;
};

module.exports = {
  createComment,
};
