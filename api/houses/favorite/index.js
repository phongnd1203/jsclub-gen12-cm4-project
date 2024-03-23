const express = require("express");

const favoriteController = require("../../../controllers/houses/favorite/favouriteController");

const favoriteRouter = express.Router();

favoriteRouter.get(
  "/favorite/page/:num",
  favoriteController.getAllFavoriteHouse,
);

favoriteRouter.post(
  "/:houseId/change/favorite",
  favoriteController.postChangeStatusFavoriteHouse,
);

module.exports = favoriteRouter;
