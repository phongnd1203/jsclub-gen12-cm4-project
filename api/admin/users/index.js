const express = require("express");

const adminCreateUserController = require("../../../controllers/admin/users/createUser.js");
const adminGetUsersController = require("../../../controllers/admin/users/getUsers.js");
const adminUpdateUserController = require("../../../controllers/admin/users/updateUser.js");
const adminDeleteUserController = require("../../../controllers/admin/users/deleteUser.js");

const adminUsersRouter = express.Router();

adminUsersRouter.get("/create", adminCreateUserController.getCreateUserPage);

adminUsersRouter.post("/create", adminCreateUserController.postCreateUser);

adminUsersRouter.get("/", adminGetUsersController.getUsersPage);

adminUsersRouter.get("/:userId", adminGetUsersController.getUserDetailPage);

adminUsersRouter.get(
  "/:userId/edit",
  adminUpdateUserController.getUpdateUserPage,
);

adminUsersRouter.post(
  "/:userId/edit",
  adminUpdateUserController.postUpdateUser,
);

adminUsersRouter.post(
  "/:userId/delete",
  adminDeleteUserController.postDeleteUser,
);

module.exports = adminUsersRouter;
