const express = require("express");

const createHouseController = require("../../controllers/houses/createHouse.js");
const getHouseDetailController = require("../../controllers/houses/getHouseDetail.js");
const editHouseController = require("../../controllers/houses/editHouse.js");
const deleteHouseController = require("../../controllers/houses/deleteHouse.js");

const validateData = require("../../middlewares/validateRequest.js");
const createHouseValidator = require("../../validators/houses/createHouse.js");
const updateHouseValidator = require("../../validators/houses/updateHouse.js");

const housesRouter = express.Router();

housesRouter.get("/create", createHouseController.getCreateHousePage);

housesRouter.post(
  "/create",
  validateData(createHouseValidator),
  createHouseController.postCreateHouse,
);

housesRouter.get("/:id", getHouseDetailController.getHouseDetailPage);

housesRouter.get("/:id/edit", editHouseController.getEditHousePage);

housesRouter.post(
  "/:id/edit",
  validateData(updateHouseValidator),
  editHouseController.postEditHouse,
);

housesRouter.post("/:id/delete", deleteHouseController.postDeleteHouse);

module.exports = housesRouter;
