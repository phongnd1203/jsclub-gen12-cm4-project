const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHouseService = require("../../services/houses/getHouse.service.js");

const getHouseDetailPage = async (req, res) => {
  const { id } = req.params;

  const { user } = req.session;

  try {
    const house = await getHouseService.getHouse(id, user);
    res.render("pages/houses/house-detail.view.ejs", { user, house });
  } catch (error) {
    throw new HttpException(StatusCodes.NOT_FOUND, error.message);
  }
};

module.exports = {
  getHouseDetailPage,
};
