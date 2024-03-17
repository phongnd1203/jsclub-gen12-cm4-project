const express = require("express");

const getUserController = require("../../controllers/users/getUser.controller.js");
const updateUserController = require("../../controllers/users/updateUser.controller.js");
const deleteUserController = require("../../controllers/users/deleteUser.controller.js");

const userInputValidator = require("../../middlewares/validators/users/userInput.validator.js");

const usersRouter = express.Router();

usersRouter.get(
  "/profile",

  getUserController.getCurrentUserProfilePage,
);

usersRouter.get("/:id/profile", getUserController.getUserProfilePage);

usersRouter.get(
  "/edit",

  updateUserController.getUpdateCurrentUserPage,
);

usersRouter.post(
  "/edit",
  userInputValidator,

  updateUserController.postUpdateCurrentUser,
);

usersRouter.get(
  "/:id/edit",

  updateUserController.getUpdateUserPage,
);

usersRouter.post(
  "/:id/edit",
  userInputValidator,

  updateUserController.postUpdateUser,
);

usersRouter.get(
  "/delete",

  deleteUserController.getDeleteCurrentUserPage,
);

usersRouter.post(
  "/delete",

  deleteUserController.postDeleteCurrentUser,
);

usersRouter.get(
  "/:id/delete",

  deleteUserController.getDeleteUserPage,
);

usersRouter.post(
  "/:id/delete",

  deleteUserController.postDeleteUser,
);

module.exports = usersRouter;
