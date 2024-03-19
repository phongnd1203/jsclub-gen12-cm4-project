const express = require("express");

const createHouseController = require("../../controllers/houses/createHouse.controller.js");
const listHousesController = require("../../controllers/houses/listHouses.controller.js");
const getHouseDetailController = require("../../controllers/houses/getHouseDetail.controller.js");
const editHouseController = require("../../controllers/houses/editHouse.controller.js");
const deleteHouseController = require("../../controllers/houses/deleteHouse.controller.js");

const createHouseValidator = require("../../validators/houses/createHouse.validator.js");

const uploadHandler = require("../../middlewares/files/uploadHandler.middleware.js");

const housesRouter = express.Router();

housesRouter.get("/house/create", createHouseController.getCreateHousePage);

housesRouter.post(
  "/house/create",
  createHouseValidator,
  uploadHandler().single("image"),
  createHouseController.postCreateHouse,
);

housesRouter.get("/houses", listHousesController.getListHousesPage);

housesRouter.get("/house/:id", getHouseDetailController.getHouseDetailPage);

housesRouter.get(
  "/house/:id/edit",

  editHouseController.getEditHousePage,
);

housesRouter.post(
  "/house/:id/edit",
  createHouseValidator,

  editHouseController.postEditHouse,
);

housesRouter.get(
  "/house/:id/delete",

  deleteHouseController.getDeleteHousePage,
);

housesRouter.post(
  "/house/:id/delete",

  deleteHouseController.postDeleteHouse,
);

module.exports = housesRouter;
