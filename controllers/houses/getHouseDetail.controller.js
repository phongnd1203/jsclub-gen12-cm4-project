const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.service.js");

const getHouseDetailPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const house = await getHousesService.getHouseById(id);
      res.render("pages/houses/detail.view.ejs", { house });
    } catch (error) {
      throw new HttpException(StatusCodes.NOT_FOUND, error.message);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHouseDetailPage,
};
