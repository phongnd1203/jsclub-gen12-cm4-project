const express = require("express");

const createHouseController = require("../../controllers/houses/createHouse.controller.js");
const getHouseDetailController = require("../../controllers/houses/getHouseDetail.controller.js");
const editHouseController = require("../../controllers/houses/editHouse.controller.js");
const deleteHouseController = require("../../controllers/houses/deleteHouse.controller.js");

const houseInputValidator = require("../../middlewares/validators/houses/houseInput.validator.js");

const housesRouter = express.Router();

housesRouter.get(
  "/create",

  createHouseController.getCreateHousePage,
);

housesRouter.post(
  "/create",
  houseInputValidator,

  createHouseController.postCreateHouse,
);

housesRouter.get("/", async (req, res, next) => {
  const houses = await HouseModel.find().lean().exec();

  return res.status(200).render("pages/houses/list.view.ejs", {
    houses,
  });
});

housesRouter.get("/:id", getHouseDetailController.getHouseDetailPage);

housesRouter.get(
  "/:id/edit",

  editHouseController.getEditHousePage,
);

housesRouter.post(
  "/:id/edit",
  houseInputValidator,

  editHouseController.postEditHouse,
);

housesRouter.get(
  "/:id/delete",

  deleteHouseController.getDeleteHousePage,
);

housesRouter.post(
  "/:id/delete",

  deleteHouseController.postDeleteHouse,
);

module.exports = housesRouter;
