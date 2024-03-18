const express = require("express");

const homeController = require("../../controllers/home/home.controller.js");

const homeRouter = express.Router();

homeRouter.get("/", homeController.getHomePage);

module.exports = homeRouter;
