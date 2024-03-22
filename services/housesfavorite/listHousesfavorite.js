const HousesfavoriteModel = require("../../models/houses/housesfavorite.model.js");

const listHousesfavorite = async (userId) => {
  const user = await HousesfavoriteModel.findById(userId).populate("favorite");
  if (!user) {
    throw new Error("User not found");
  }
  return user.favorite;
};

module.exports = { listHousesfavorite };
