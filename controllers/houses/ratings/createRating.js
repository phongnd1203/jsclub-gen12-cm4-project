const ratingService = require("../../../services/houses/ratings/rating.js");

const postCreateRating = async (req, res) => {
  try {
    const { userId } = req.session;
    const { houseId } = req.params;
    const { rating } = req.body;
    const rate = await ratingService.createRating(houseId, userId, rating);
    return res.redirect(`/houses/${houseId}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postCreateRating,
};
