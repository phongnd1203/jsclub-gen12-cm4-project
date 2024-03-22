const HouseRatingModel = require("../../../models/houses/ratings/rating.js");
const HouseCommentModel = require("../../../models/houses/comments/comment.js");

const deleteRating = async (ratingId) => {
  const rating = await HouseRatingModel.findById(ratingId);

  if (!rating) {
    return;
  }

  if (rating.comment) {
    await HouseCommentModel.findByIdAndDelete(rating.comment).exec();
  }

  await HouseRatingModel.findByIdAndDelete(ratingId).exec();

  return;
};

module.exports = {
  deleteRating,
};