const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");

const getHousesPage = async (req, res, next) => {
  try {
    const { page } = req.query;

    try {
      const houses = await getHousesService.getHouses({ page });

      return res.render("pages/houses/list.ejs", {
        houses,
        page: parseInt(page, 10),
      });
    } catch (error) {
      throw new HttpException(StatusCodes.NOT_FOUND, error.message);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHousesPage,
};
