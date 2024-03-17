const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  const currentUser = req.session.user;

  return res.render("pages/home.view.ejs", {
    user: currentUser,
  });
});

module.exports = homeRouter;
