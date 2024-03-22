const listHousesfavoriteServices = require("../../services/housesfavorite/listHousesfavorite.service.js");

const listFavorite = async (req, res) => {
  try {
    const { userId } = req.params.userId;
    const followedHouses =
      await listHousesfavoriteServices.listHousesfavorite(userId);
    res.send(followedHouses);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { listFavorite };
