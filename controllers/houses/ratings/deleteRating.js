const ratingService = require("../../../services/houses/ratings/rating.js");

const postDeleteRating = async (req, res, next) => {
  try {
    const { houseId, ratingId } = req.params;

    await ratingService.deleteRating(ratingId);

    return res.redirect(`/houses/${houseId}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postDeleteRating,
};
