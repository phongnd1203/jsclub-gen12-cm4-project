const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  const { user } = req.session;

  return res.render("pages/home.view.ejs", {
    user,
  });
});

module.exports = homeRouter;
