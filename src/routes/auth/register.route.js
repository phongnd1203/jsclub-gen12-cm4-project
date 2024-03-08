const argon2 = require("argon2");
const express = require("express");
const validator = require("express-validator");

const UserModel = require("../../models/users/user.model.js");

const registerRouter = express.Router();

// Render register page
registerRouter.get("/", async (req, res) => {
  res.render("auth/register.view.ejs");
});

// Handle register form submission
registerRouter.post("/", async (req, res) => {});

module.exports = registerRouter;
