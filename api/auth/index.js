const express = require("express");

const loginController = require("../../controllers/auth/login.js");
const registerController = require("../../controllers/auth/register.js");
const forgotPasswordController = require("../../controllers/auth/forgotPassword.js");
const logoutController = require("../../controllers/auth/logout.js");

const validateData = require("../../middlewares/validateRequest.js");
const loginValidator = require("../../validators/auth/login.js");
const registerValidator = require("../../validators/auth/register.js");
const forgotPasswordValidator = require("../../validators/auth/forgotPassword.js");
const resetPasswordValidator = require("../../validators/auth/resetPassword.js");

const authRouter = express.Router();

authRouter.get("/login", loginController.getLoginPage);

authRouter.post(
  "/login",
  validateData(loginValidator),
  loginController.postLogin,
);

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
