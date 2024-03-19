const express = require("express");

const adminRouter = express.Router();

const dashboardController = require("../../controllers/admin/dashboard.controller.js");

const checkAdmin = require("../../middlewares/auth/checkAdmin.middleware.js");

// adminRouter.use(checkAdmin());

adminRouter.get("/admin", (req, res) => {
  res.redirect(301, "/admin/dashboard");
});

adminRouter.get("/admin/dashboard", dashboardController.getDashboardPage);

module.exports = adminRouter;
