const express = require("express");

const adminRouter = express.Router();

const dashboardController = require("../../controllers/admin/dashboard.js");
const usersDataController = require("../../controllers/admin/usersData.js");

const checkAuth = require("../../middlewares/checkAuth.js");
const userRoles = require("../../enums/userRoles.js");

adminRouter.use(checkAuth(userRoles.admin));

adminRouter.get("/", dashboardController.getDashboardPage);

adminRouter.get("/users", usersDataController.getUsersDataPage);

module.exports = adminRouter;
