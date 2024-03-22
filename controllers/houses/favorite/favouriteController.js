const HouseModel = require("../../../models/houses/house.js");
const favoriteService = require("../../../services/houses/favorite/favoriteService.js");
const getHousesService = require("../../../services/houses/getHouses.js");
//R
const getAllFavoriteHouse = async (req, res) => {
  const { metadata } = { title: "Nhà yêu thích của bạn" };
  const page = 1;
  const { userId } = req.session;
  const favorites = await favoriteService.getAllFavorite(userId);
  res.render("pages/houses/favorite/favorite.ejs", {
    metadata,
    favorites,
    page,
  });
};

// 2 trang thai : 0 1
const postChangeStatusFavoriteHouse = async (req, res) => {
  try {
    const { userId } = req.session;
    const { houseId } = req.params;

    const isExist = await favoriteService.getFavorite(userId, houseId);
    if (isExist && isExist.length) {
      await favoriteService.deleteFavorite(userId, houseId);
    } else {
      await favoriteService.createFavorite(userId, houseId);
    }
    res.redirect(`/houses/${houseId}`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllFavoriteHouse,
  postChangeStatusFavoriteHouse,
};
