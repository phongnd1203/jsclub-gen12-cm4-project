const deleteRatingService = require("../../../services/houses/ratings/deleteRating.js");

const postDeleteRating = async (req, res, next) => {
  try {
    const { houseId, ratingId } = req.params;

    await deleteRatingService.deleteRating(ratingId);

    res.redirect(`/houses/${houseId}/ratings`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postDeleteRating,
};
