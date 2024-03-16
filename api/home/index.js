const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  return res.render("common/home.view.ejs");
});

module.exports = homeRouter;
