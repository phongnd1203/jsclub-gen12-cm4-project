const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const createHouseService = require("../../services/houses/createHouse.js");

const getCreateHousePage = (req, res) => {
  return res.render("houses/create.ejs");
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

    const { userId } = req.session;

    const house = await createHouseService.createHouse(userId, req.body);

    return res.redirect(`/houses/${house._id}`);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getCreateHousePage,
  postCreateHouse,
};