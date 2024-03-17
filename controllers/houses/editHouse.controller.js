const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHouseService = require("../../services/houses/getHouse.service.js");
const updateHouseService = require("../../services/houses/updateHouse.service.js");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const getEditHousePage = async (req, res) => {
  const { id } = req.params;

  const { user } = req.session;

  if (!user) {
    return res.redirect("/auth/login");
  }

  const house = await getHouseService.getHouse(id);

  if (!house) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Nhà không tồn tại");
  }

  if (
    user._id.toString() !== house.owner.toString() ||
    userRoles[user.role] > userRoles.admin
  ) {
    throw new HttpException(StatusCodes.FORBIDDEN, "Không có quyền truy cập");
  }

  return res.status(200).render("pages/houses/edit.view.ejs", {
    house,
  });
};

const postEditHouse = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

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

  const {
    title,
    description,
    address,
    districtCode,
    price,
    area,
    availability,
  } = req.body;

  const { user } = req.session;

  await updateHouseService(
    id,
    title,
    description,
    address,
    districtCode,
    price,
    area,
    availability,
  );

  return res.redirect(`/houses/${id}`);
};

module.exports = {
  getEditHousePage,
  postEditHouse,
};
