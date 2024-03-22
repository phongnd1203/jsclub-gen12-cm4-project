const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");
const favoriteService = require('../../services/houses/favorite/favoriteService.js')

const getHouseDetailPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;
    const house = await getHousesService.getHouseById(id);
    const isFavorite = await favoriteService.getFavorite(userId, id);
    if (!house) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Không tìm thấy nhà");
    }

    return res.render("pages/houses/detail.ejs", { house, isFavorite});
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHouseDetailPage,
};
