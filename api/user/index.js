const express = require("express");

const userRouter = express.Router();

const getUserProfileController = require("../../controllers/user/getUserProfile.js");
const updateUserProfileController = require("../../controllers/user/updateUserProfile.js");

userRouter.get("/profile", getUserProfileController.getUserProfilePage);

userRouter.get("/edit", updateUserProfileController.getUpdateUserProfilePage);

userRouter.post("/edit", updateUserProfileController.postUpdateUserProfile);

module.exports = userRouter;
