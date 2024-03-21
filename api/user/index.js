const express = require("express");

const userRouter = express.Router();

const getUserProfileController = require("../../controllers/user/getUserProfile.controller.js");
const updateUserProfileController = require('../../controllers/user/updateUserProfile.controller.js');

userRouter.get("/profile", getUserProfileController.getUserProfilePage);

userRouter.get('/edit', updateUserProfileController.getUpdateUserProfilePage);

userRouter.post('/edit/save', updateUserProfileController.postUpdateUserProfile);

module.exports = userRouter;
