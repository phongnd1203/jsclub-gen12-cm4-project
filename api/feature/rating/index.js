const express = require("express");
const ratingRouter = express.Router();
const UserModel = require("../../../models/users/user.model");
const ratingController = require("../../../controllers/features/rating.controller");

ratingRouter.post("/:houseId/rate/create", ratingController.createRatingPage);

ratingRouter.get('/:houseId/rate/delete', ratingController.deleteRatingPage);

module.exports = ratingRouter;
