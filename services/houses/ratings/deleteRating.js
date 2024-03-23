const HouseRatingModel = require("../../../models/houses/ratings/rating.js");

const deleteRating = async (ratingId) => {
  const rating = await HouseRatingModel.findById(ratingId);

  if (!rating) {
    return;
  }

  await HouseRatingModel.findByIdAndDelete(ratingId).exec();

  return;
};

module.exports = {
  deleteRating,
};
