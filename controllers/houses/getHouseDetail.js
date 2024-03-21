const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");

const getHouseDetailPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const house = await getHousesService.getHouseById(id);

    if (!house) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Không tìm thấy nhà");
    }

    return res.render("pages/houses/detail.ejs", { house });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHouseDetailPage,
};
