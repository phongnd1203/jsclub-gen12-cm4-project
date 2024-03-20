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

    return res.render("houses/detail.ejs", { house });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHouseDetailPage,
};
