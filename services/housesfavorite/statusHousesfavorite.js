const HousesfavoriteModel = require("../../models/houses/housesfavorite.model.js");

const statusHousesfavorite = async (userId, houseId) => {
  const user = await HousesfavoriteModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.favorite.includes(houseId);
};
module.exports = { statusHousesfavorite };
