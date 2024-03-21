const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.js");
const updateHouseService = require("../../services/houses/updateHouse.js");

const userRoles = require("../../enums/userRoles.js");

const getEditHousePage = async (req, res, next) => {
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

    return res.status(200).render("houses/edit.ejs", {
      house,
    });
  } catch (err) {
    return next(err);
  }
};

const postEditHouse = async (req, res, next) => {
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

  const { id } = req.params;

  const { title, description, address, districtCode, price, area, visible } =
    req.body;

  const { user } = req.session;

  await updateHouseService(
    id,
    title,
    description,
    address,
    districtCode,
    price,
    area,
    visible,
  );

  return res.redirect(`/houses/${id}`);
};

module.exports = {
  getEditHousePage,
  postEditHouse,
};
