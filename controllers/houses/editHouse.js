const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");
const updateHouseService = require("../../services/houses/updateHouse.js");

const userRoles = require("../../enums/userRoles.js");

const getEditHousePage = async (req, res, next) => {
  try {
    const { houseId } = req.params;

    const house = await getHousesService.getHouseById(houseId);

    if (!house) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Nhà không tồn tại");
    }

    console.log(req.user._id.toString() !== house.owner._id.toString());
    console.log(userRoles[req.user.role] > userRoles.admin);

    return res.status(StatusCodes.OK).render("pages/houses/edit.ejs", {
      house,
    });
  } catch (error) {
    return next(error);
  }
};

const postEditHouse = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Thông tin đã nhập không hợp lệ",
        validationErrors.array(),
        {
          path: req.originalUrl,
          body: req.body,
        },
      );
    }

    const { houseId } = req.params;

    const house = await updateHouseService.updateHouse(houseId, req.body);

    if (!house) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Nhà không tồn tại");
    }

    return res.redirect(`/houses/${houseId}`);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getEditHousePage,
  postEditHouse,
};
