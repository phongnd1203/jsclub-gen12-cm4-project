const express = require("express");

const loginController = require("../../controllers/auth/login.controller.js");
const registerController = require("../../controllers/auth/register.controller.js");
const forgotPasswordController = require("../../controllers/auth/forgotPassword.controller.js");
const logoutController = require("../../controllers/auth/logout.controller.js");

const validateData = require("../../middlewares/validateRequest.middleware.js")
const loginValidator = require("../../validators/auth/login.validators.js");
const registerValidator = require("../../validators/auth/register.validators.js");
const forgotPasswordValidator = require("../../validators/auth/forgotPassword.validators.js");
const resetPasswordValidator = require("../../validators/auth/resetPassword.validators.js");

const authRouter = express.Router();

authRouter.get("/login", loginController.getLoginPage);

authRouter.post("/login", validateData(loginValidator), loginController.postLogin);

authRouter.get("/register", registerController.getRegisterPage);

authRouter.post(
  "/register",
  validateData(registerValidator),
  registerController.postRegister,
);

authRouter.get(
  "/forgot-password",
  forgotPasswordController.getForgotPasswordPage,
);

authRouter.post(
  "/forgot-password",
  validateData(forgotPasswordValidator),
  forgotPasswordController.postForgotPassword,
);

authRouter.get(
  "/reset-password",
  forgotPasswordController.getResetPasswordPage,
);
authRouter.post(
  "/reset-password",
  validateData(resetPasswordValidator),
  forgotPasswordController.postResetPassword,
);

authRouter.get("/logout", logoutController.postLogout);
authRouter.post("/logout", logoutController.postLogout);

module.exports = authRouter;
