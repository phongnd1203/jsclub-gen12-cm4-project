const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const createHouseService = require("../../services/houses/createHouse.service.js");

const getCreateHousePage = (req, res) => {
  res.render("pages/houses/create-house.view.ejs");
};

const postCreateHouse = async (req, res) => {
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

  const house = await createHouseService.createHouse(
    user,
    title,
    description,
    address,
    districtCode,
    price,
    area,
    availability,
  );

  return res.redirect(`/houses/${house._id}`);
};

module.exports = {
  getCreateHousePage,
  postCreateHouse,
};
