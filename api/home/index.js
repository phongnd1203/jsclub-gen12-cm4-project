const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  return res.render("pages/home.view.ejs");
});

module.exports = homeRouter;
