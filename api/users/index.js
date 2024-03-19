const express = require("express");

const getUserController = require("../../controllers/users/getUsers.controller.js");
const updateUserController = require("../../controllers/users/updateUser.controller.js");
const deleteUserController = require("../../controllers/users/deleteUser.controller.js");
const resetPasswordController = require("../../controllers/users/resetPassword.controller.js");

const updateUserValidator = require("../../middlewares/validators/users/updateUser.validator.js");
const resetPasswordValidator = require("../../middlewares/validators/users/resetPassword.validator.js");

const usersRouter = express.Router();

usersRouter.get("/profile", getUserController.getCurrentUserProfilePage);

usersRouter.get("/:id/profile", getUserController.getUserProfilePage);

usersRouter.get("/edit", updateUserController.getUpdateCurrentUserPage);

usersRouter.post(
  "/edit",
  updateUserValidator,
  updateUserController.postUpdateCurrentUser,
);

usersRouter.get(
  "/:id/edit",

  updateUserController.getUpdateUserPage,
);

usersRouter.post(
  "/:id/edit",
  updateUserValidator,
  updateUserController.postUpdateUser,
);

usersRouter.get("/delete", deleteUserController.getDeleteCurrentUserPage);

usersRouter.post("/delete", deleteUserController.postDeleteCurrentUser);

usersRouter.get("/:id/delete", deleteUserController.getDeleteUserPage);

usersRouter.post("/:id/delete", deleteUserController.postDeleteUser);

usersRouter.get(
  "/reset-password",
  resetPasswordController.getResetPasswordPage,
);

usersRouter.post(
  "/reset-password",
  resetPasswordValidator,
  resetPasswordController.postResetPassword,
);

module.exports = usersRouter;
