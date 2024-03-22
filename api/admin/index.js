const express = require("express");

const adminRouter = express.Router();

const adminDashboardController = require("../../controllers/admin/dashboard.controller.js");

const checkAuth = require("../../middlewares/checkAuth.js");
const userRoles = require("../../enums/userRoles.js");

adminRouter.use(checkAuth(userRoles.admin));

adminRouter.get("/", adminDashboardController.getDashboardPage);

adminRouter.use("/users", require("./users"));

module.exports = adminRouter;
