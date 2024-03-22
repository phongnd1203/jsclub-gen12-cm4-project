const statusHousesfavoriteServices = require("../../services/housesfavorite/statusHousesfavorite.service.js");

const statusFavorite = async (req, res) => {
  try {
    const { houseId } = req.params.houseId;
    const { userId } = req.params.userId;
    const status = await statusHousesfavoriteServices.statusHousesfavorite(
      userId,
      houseId,
    );
    res.send({ status });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { statusFavorite };
