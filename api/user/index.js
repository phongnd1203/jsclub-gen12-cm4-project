const express = require("express");

const userRouter = express.Router();

const getUserProfileController = require("../../controllers/user/getUserProfile.controller.js");

userRouter.get("/profile", getUserProfileController.getUserProfilePage);

module.exports = userRouter;
