const express = require("express");

const createHouseController = require("../../controllers/houses/createHouse.js");
const getHouseDetailController = require("../../controllers/houses/getHouseDetail.js");
const editHouseController = require("../../controllers/houses/editHouse.js");
const deleteHouseController = require("../../controllers/houses/deleteHouse.js");

const createHouseValidator = require("../../validators/houses/createHouse.js");

const housesRouter = express.Router();

housesRouter.get("/create", createHouseController.getCreateHousePage);

housesRouter.post(
  "/create",
  createHouseValidator,
  createHouseController.postCreateHouse,
);

housesRouter.get("/:id", getHouseDetailController.getHouseDetailPage);

housesRouter.get("/:id/edit", editHouseController.getEditHousePage);

housesRouter.post(
  "/:id/edit",
  createHouseValidator,
  editHouseController.postEditHouse,
);

housesRouter.get("/:id/delete", deleteHouseController.getDeleteHousePage);

housesRouter.post("/:id/delete", deleteHouseController.postDeleteHouse);

module.exports = housesRouter;
