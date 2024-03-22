const express = require("express");

const adminRouter = express.Router();

const adminDashboardController = require("../../controllers/admin/dashboard.controller.js");

const adminEditUserController = require("../../controllers/admin/users/updateUser.js")
const adminDeleteUserController = require("../../controllers/admin/users/deleteUser.js")

const checkAuth = require("../../middlewares/checkAuth.js");
const userRoles = require("../../enums/userRoles.js");

adminRouter.use(checkAuth(userRoles.admin));

adminRouter.get("/", adminDashboardController.getDashboardPage);

adminRouter.use("admin/users/:userId", require("./users"));

adminRouter.get("/admin/users/edit/:userId", adminEditUserController.getUpdateUserPage);

adminRouter.post("admin/users/:userId", adminEditUserController.postUpdateUser);

adminRouter.post("admin/users", adminDeleteUserController.postDeleteUser);

module.exports = adminRouter;
