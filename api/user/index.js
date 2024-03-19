const express = require("express");

const userProfileController = require("../../controllers/user/userProfile.controller.js");

const userRouter = express.Router();

userRouter.get("/profile", userProfileController.getUserProfilePage);

module.exports = userRouter;
