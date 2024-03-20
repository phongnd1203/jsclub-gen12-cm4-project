const express = require("express");

const adminRouter = express.Router();

const dashboardController = require("../../controllers/admin/dashboard.controller.js");
const usersDataController = require("../../controllers/admin/usersData.controller.js");

const checkAdmin = require("../../middlewares/auth/checkAdmin.middleware.js");

adminRouter.use(checkAdmin);

adminRouter.get("/", dashboardController.getDashboardPage);

adminRouter.get("/users", usersDataController.getUsersDataPage);

module.exports = adminRouter;
