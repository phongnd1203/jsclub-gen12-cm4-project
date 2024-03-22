const HouseRatingModel = require("../../../models/houses/ratings/rating.js");
const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const createRating = async (houseId, userId, rating, comment) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Đánh giá phải từ 1 đến 5 sao");
  }

  const newRating = new HouseRatingModel({
    houseId,
    userId,
    rating,
  });

  if (comment) {
    const newComment = new HouseCommentModel({
      houseId,
      userId,
      content: comment,
    });

    await newComment.save();
    newRating.comment = newComment._id;
  }

  await newRating.save();
};

module.exports = {
  createRating,
};
