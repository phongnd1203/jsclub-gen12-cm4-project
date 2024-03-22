const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const createHouseService = require("../../services/houses/createHouse.js");
const uploadFileService = require("../../services/files/uploadFile.js");

const getCreateHousePage = (req, res) => {
  return res.render("pages/houses/create.ejs", {
    title: "Đăng tin nhà",
  });
};

const postCreateHouse = async (req, res, next) => {
  try {
    const { userId } = req.session;

    const files = await uploadFileService.uploadFiles(req.files);

    const house = await createHouseService.createHouse(userId, {
      ...req.body,
      images: files,
    });

    return res.redirect(`/houses/${house._id}`);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCreateHousePage,
  postCreateHouse,
};
