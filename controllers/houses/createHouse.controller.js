const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const createHouseService = require("../../services/houses/createHouse.service.js");

const getCreateHousePage = (req, res) => {
  const { user } = req.session;
  res.render("pages/houses/create.view.ejs", {
    user,
  });
};

const postCreateHouse = async (req, res, next) => {
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

    const { title, description, address, district, price, area, visible } =
      req.body;

    const { user } = req.session;

    const house = await createHouseService.createHouse(
      user,
      title,
      description,
      address,
      district,
      price,
      area,
      visible,
    );

    return res.redirect(`/houses/${house._id}`);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCreateHousePage,
  postCreateHouse,
};