const express = require("express");

const adminRouter = express.Router();

const dashboardController = require("../../controllers/admin/dashboard.controller.js");
const createUserController = require("../../controllers/admin/users/createUser.controller.js");
const updateUserController = require("../../controllers/admin/users/updateUser.controller.js");
const deleteUserController = require("../../controllers/admin/users/deleteUser.controller.js");
const usersdashboardController = require("../../controllers/admin/users/usersdashboard.js");
const usersDetailController = require("../../controllers/admin/users/usersDetail.controller.js");

const checkAuth = require("../../middlewares/checkAuth.middleware.js");
const userRoles = require("../../enums/userRoles.enum.js");

adminRouter.use(checkAuth(userRoles.admin));

adminRouter.get("/", dashboardController.getDashboardPage);

adminRouter.post("/user/create", createUserController.createUserByAdmin);

adminRouter.get("user/edit", updateUserController.getUpdateUserByAdmin);

adminRouter.post("/user/edit", updateUserController.postUpdateUserByAdmin);

adminRouter.get("user/:id/edit", updateUserController.getCurrentUpdateUserPage);

adminRouter.get("user/delete", deleteUserController.getDeleteUserByAdmin);

adminRouter.post("user/delete", deleteUserController.postDeleteUserByAdmin);

adminRouter.get("user/:id/delete", deleteUserController.getDeleteCurrentUserPageByAdmin)

adminRouter.get("/users/dashboard", usersdashboardController.getUserDashboardPage)

adminRouter.get("/users", usersDetailController.getUsersDataPage);

module.exports = adminRouter;
