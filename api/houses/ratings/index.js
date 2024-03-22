const express = require("express");

const getRatingsController = require("../../../controllers/houses/ratings/getRatings.js");
const createRatingController = require("../../../controllers/houses/ratings/createRating.js");
const deleteRatingController = require("../../../controllers/houses/ratings/deleteRating.js");

const houseRatingRouter = express.Router();

houseRatingRouter.post("/create", createRatingController.postCreateRating);

houseRatingRouter.get("/", getRatingsController.getRatingsPage);

houseRatingRouter.get(
  "/:ratingId/delete",
  deleteRatingController.postDeleteRating,
);

module.exports = houseRatingRouter;
