const HouseRatingModel = require("../../../models/houses/ratings/rating.js");
const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const createRating = async (houseId, userId, rating) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Đánh giá phải từ 1 đến 5 sao");
  }

  const newRating = new HouseRatingModel({
    house: houseId,
    user: userId,
    score: rating,
  });

  await newRating.save();
  return newRating;
};

module.exports = {
  createRating,
};
