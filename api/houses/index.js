const express = require("express");

const createHouseController = require("../../controllers/houses/createHouse.js");
const getHousesController = require("../../controllers/houses/getHouses.js");
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

housesRouter.get("/", getHousesController.getHousesPage);

housesRouter.get("/:houseId", getHouseDetailController.getHouseDetailPage);

housesRouter.get("/:houseId/edit", editHouseController.getEditHousePage);

housesRouter.post(
  "/:houseId/edit",
  validateData(updateHouseValidator),
  editHouseController.postEditHouse,
);

housesRouter.post("/:houseId/delete", deleteHouseController.postDeleteHouse);

housesRouter.use("/:houseId/comments", require("./comments"));
housesRouter.use("/:houseId/ratings", require("./ratings"));

module.exports = housesRouter;
