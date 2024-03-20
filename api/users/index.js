const express = require("express");

const getUserController = require("../../controllers/users/getUsers.js");

const usersRouter = express.Router();

usersRouter.get("/:id", getUserController.getUserProfilePage);

module.exports = usersRouter;
