const FavoriteModel = require("../../../models/houses/favorite/favoriteModel.js");
const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: ["House"],
};

const createFavorite = async (userId, houseId) => {
  try {
    const favoriteHouse = new FavoriteModel({
      user: userId,
      house: houseId,
    });
    await favoriteHouse.save();
    return favoriteHouse;
  } catch (error) {
    throw new Error(error);
  }
};

// get one favor
const getFavorite = async (userId, houseId) => {
  try {
    const favoriteHouse = await FavoriteModel.findOne({
      user: userId,
      house: houseId,
    })
      .populate("house")
      .exec();
    return favoriteHouse;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteFavorite = async (userId, houseId) => {
  try {
    await FavoriteModel.findOneAndDelete({
      user: userId,
      house: houseId,
    }).exec();
  } catch (error) {
    throw new Error(error);
  }
};

const getAllFavorite = async (userId) => {
  try {
    const favoritedHouses = await FavoriteModel.find({
      user: userId,
    })
      .populate("house")
      .exec();

    return favoritedHouses;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createFavorite,
  getFavorite,
  deleteFavorite,
  getAllFavorite,
};
