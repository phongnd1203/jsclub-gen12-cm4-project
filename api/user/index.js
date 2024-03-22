const express = require("express");

const userRouter = express.Router();

const getUserProfileController = require("../../controllers/user/getUserProfile.js");
const updateUserProfileController = require("../../controllers/user/updateUserProfile.js");

const validateData = require("../../middlewares/validateRequest.js");
const updateUserValidator = require("../../validators/users/updateUser.js");

userRouter.get("/profile", getUserProfileController.getUserProfilePage);

userRouter.get("/edit", updateUserProfileController.getUpdateUserProfilePage);

userRouter.post(
  "/edit",
  validateData(updateUserValidator),
  updateUserProfileController.postUpdateUserProfile,
);

module.exports = userRouter;
