const HousesfavoriteModel = require("../../models/houses/housesfavorite.model.js");

const deleteHousesfavorite = async (userId, houseId) => {
  const user = await HousesfavoriteModel.findByIdAndUpdate(
    userId,
    { $pull: { favorite: houseId } },
    { new: true },
  );
  if (!user) {
    throw new Error("User not found");
  }
};

module.exports = { deleteHousesfavorite };
