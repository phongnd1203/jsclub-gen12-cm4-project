const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getHousesService = require("../../services/houses/getHouses.service.js");
const updateHouseService = require("../../services/houses/updateHouse.service.js");
const getUserService = require('../../services/users/getUsers.service.js');

const userRoles = require("../../enums/userRoles.enum.js");

const getEditHousePage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { userId } = req.session;
    const user = await getUserService.getUserById(userId);
    
    if (!userId) {
      return res.redirect("/auth/login");
    }

    const house = await getHousesService.getHouseById(id);

    if (!house) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Nhà không tồn tại");
    }

    if ( userId != house.owner._id ) 
      throw new HttpException(StatusCodes.FORBIDDEN, "Không có quyền truy cập");
    

    // res.json(house);
    return res.status(200).render("houses/edit.ejs", {
      house,
      user
    });
  } catch (error) {
    return next(error);
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
