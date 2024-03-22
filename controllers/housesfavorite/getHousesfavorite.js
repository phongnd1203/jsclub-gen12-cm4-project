const getHousesfavoriteServices = require("../../services/housesfavorite/getHousesfavorite.service.js");

const getFavorite = async (req, res) => {
  try {
    const { houseId } = req.params.houseId;
    const { userId } = req.params.userId;
    await getHousesfavoriteServices.getHousesfavorite(userId, houseId);
    res.status(201).send({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { getFavorite };
