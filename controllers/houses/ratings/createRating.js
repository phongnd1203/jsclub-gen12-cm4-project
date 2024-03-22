const createRatingService = require("../../../services/houses/ratings/createRating.js");

const postCreateRating = async (req, res) => {
  try {
    const { userId } = req.session;
    const { houseId } = req.params;
    const { rating, comment } = req.body;

    await createRatingService.createRating(houseId, userId, rating, comment);

    return res.redirect(`/houses/${houseId}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postCreateRating,
};
