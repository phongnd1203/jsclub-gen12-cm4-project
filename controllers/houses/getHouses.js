const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");

const getHousesPage = async (req, res, next) => {
  try {
    const { page } = req.query;

    const maxPage = Math.floor((await getHousesService.countHouses()) / 30);

    const _page = Math.max(1, Math.min(maxPage, parseInt(page, 10) || 1));

    try {
      const houses = await getHousesService.getHouses({
        page: _page,
        limit: 30,
        populate: ["images"],
      });

      return res.render("pages/houses/list.ejs", {
        houses,
        page: _page,
        maxPage,
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
