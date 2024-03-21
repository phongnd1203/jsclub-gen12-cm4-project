const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");
const deleteHouseService = require("../../services/houses/deleteHouse.js");

const postDeleteHouse = async (req, res, next) => {
  const { id } = req.params;

  const { userId } = req.session;

  const house = await getHousesService.getHouseById(id);

  if (!(house.owner._id === userId)) {
    throw new HttpException(StatusCodes.FORBIDDEN);
  }

  await deleteHouseService.deleteHouse(id);

  return res.redirect("/houses");
};

module.exports = {
  postDeleteHouse,
};
