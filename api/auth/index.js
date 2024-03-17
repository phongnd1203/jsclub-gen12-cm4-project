const express = require("express");

const loginController = require("../../controllers/auth/login.controller.js");
const registerController = require("../../controllers/auth/register.controller.js");
const logoutController = require("../../controllers/auth/logout.controller.js");

const loginValidator = require("../../middlewares/validators/auth/login.validators.js");
const registerValidator = require("../../middlewares/validators/auth/register.validators.js");

const authRouter = express.Router();

authRouter.get("/login", loginController.getLoginPage);

authRouter.post("/login", loginValidator, loginController.postLogin);

authRouter.get("/register", registerController.getRegisterPage);

authRouter.post(
  "/register",
  registerValidator,
  registerController.postRegister,
);

authRouter.post("/logout", logoutController.postLogout);

module.exports = authRouter;
