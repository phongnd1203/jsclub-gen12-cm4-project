const express = require("express");

const loginController = require("../../controllers/auth/login.controller.js");
const registerController = require("../../controllers/auth/register.controller.js");
const forgotPasswordController = require("../../controllers/auth/forgotPassword.controller.js");
const logoutController = require("../../controllers/auth/logout.controller.js");

const loginValidator = require("../../middlewares/validators/auth/login.validators.js");
const registerValidator = require("../../middlewares/validators/auth/register.validators.js");
const forgotPasswordValidator = require("../../middlewares/validators/auth/forgotPassword.validators.js");

const authRouter = express.Router();

authRouter.get("/login", loginController.getLoginPage);

authRouter.post("/login", loginValidator, loginController.postLogin);

authRouter.get("/register", registerController.getRegisterPage);

authRouter.post(
  "/register",
  registerValidator,
  registerController.postRegister,
);

authRouter.get(
  "/forgot-password",
  forgotPasswordController.getForgotPasswordPage,
);

authRouter.post(
  "/forgot-password",
  forgotPasswordValidator,
  forgotPasswordController.postForgotPassword,
);

authRouter.get("/logout", logoutController.postLogout);
authRouter.post("/logout", logoutController.postLogout);

module.exports = authRouter;
