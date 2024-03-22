const HousesfavoriteModel = require("../../models/houses/housesfavorite.model.js");

const getHousesfavorite = async (userId, houseId) => {
  const user = await HousesfavoriteModel.findByIdAndUpdate(
    userId,
    { $addToSet: { favorite: houseId } },
    { new: true },
  );
  if (!user) {
    throw new Error("User not found");
  }
};
module.exports = { getHousesfavorite };
