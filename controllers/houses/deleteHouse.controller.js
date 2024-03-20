const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.service.js");
const deleteHouseService = require("../../services/houses/deleteHouse.service.js");

const getDeleteHousePage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { user } = req.session;

    if (!user) {
      return res.redirect("/auth/login");
    }

    const house = await getHousesService.getHouseById(id);

    if (!house) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Nhà không tồn tại");
    }

    if (
      user._id.toString() !== house.owner.toString() ||
      userRoles[user.role] > userRoles.admin
    ) {
      throw new HttpException(StatusCodes.FORBIDDEN, "Không có quyền truy cập");
    }

    return res.status(200).render("houses/delete.ejs", {
      house,
    });
  } catch (error) {
    return next(error);
  }
};

const postDeleteHouse = async (req, res, next) => {
  const { id } = req.params;

  const { user } = req.session;

  if (!user) {
    return res.redirect("/auth/login");
  }

  const house = await deleteHouseService.deleteHouse(id, user);

  return res.redirect("/houses");
};

module.exports = {
  getDeleteHousePage,
  postDeleteHouse,
};
