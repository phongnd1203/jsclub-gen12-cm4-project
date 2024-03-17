const express = require("express");
const validator = require("express-validator");
const userModel = require("../../models/users/user.model.js");
const userRouter = express.Router();

//profile
userRouter.get(
  "/profile",
  // validator.param('id').isMongoId(),
  async (req, res) => {
    const id = req.session.user._id;
    const user = await userModel.findById(id).exec();
    console.log(user);
    res.render("pages/users/profile.view.ejs", { user: user });
  },
);

// update
userRouter.get("/edit", async (req, res) => {
  const currentUser = req.session.user;

  if (!currentUser) {
    return res.redirect("/auth/login");
  }

  const user = await userModel.findById(currentUser._id).lean().exec();

  res.render("pages/users/edit.view.ejs", { user: user });
});

userRouter.post(
  "/edit",
  validator.body("name").notEmpty().withMessage("Vui lòng nhập tên mới"),
  validator.body("phone").notEmpty().isNumeric().isMobilePhone(),
  validator.body("email").notEmpty().isEmail().normalizeEmail().trim(),
  validator.body("password").notEmpty().isLength({ min: 8 }),
  async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("pages/users/edit.view.ejs", {
        errors: validationErrors.array(),
      });
    }

    const currentUser = req.session.user;

    if (!currentUser) {
      return res.redirect("/auth/login");
    }

    const user = await userModel.findById(currentUser).exec();

    if (!user) {
      return res.status(404).render("pages/common/errors/not-found.view.ejs");
    }

    res.status(304).redirect("/user/profile");
  },
);

// delete
userRouter.get("/delete/:id", async (req, res) => {
  await userModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

module.exports = userRouter;
