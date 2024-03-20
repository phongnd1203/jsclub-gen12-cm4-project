const express = require("express");

const adminRouter = express.Router();

const dashboardController = require("../../controllers/admin/dashboard.controller.js");
const usersDataController = require("../../controllers/admin/usersData.controller.js");

const checkAuth = require("../../middlewares/checkAuth.middleware.js");
const userRoles = require("../../enums/userRoles.enum.js");

adminRouter.use(checkAuth(userRoles.admin));

adminRouter.get("/", dashboardController.getDashboardPage);

adminRouter.get("/users", usersDataController.getUsersDataPage);

module.exports = adminRouter;
