const express = require("express");

const getUserController = require("../../controllers/users/getUsers.controller.js");
const resetPasswordController = require("../../controllers/users/resetPassword.controller.js");

const updateUserValidator = require("../../validators/users/updateUser.validator.js");
const resetPasswordValidator = require("../../validators/users/resetPassword.validator.js");

const usersRouter = express.Router();

usersRouter.get(
  "/reset-password",
  resetPasswordController.getResetPasswordPage,
);

usersRouter.post(
  "/reset-password",
  resetPasswordValidator,
  resetPasswordController.postResetPassword,
);
usersRouter.get("/users/:id", getUserController.getUserProfilePage);

module.exports = usersRouter;
