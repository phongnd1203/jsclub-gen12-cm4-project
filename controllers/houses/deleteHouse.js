const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");
const deleteHouseService = require("../../services/houses/deleteHouse.js");

const postDeleteHouse = async (req, res, next) => {
  const { houseId } = req.params;

  const { userId } = req.session;

  const house = await getHousesService.getHouseById(houseId);

  if (!(house.owner._id.toString() === userId)) {
    throw new HttpException(
      StatusCodes.FORBIDDEN,
      "Bạn không có quyền xóa nhà này",
    );
  }

  await deleteHouseService.deleteHouse(houseId);

  return res.redirect("/houses");
};

module.exports = {
  postDeleteHouse,
};
