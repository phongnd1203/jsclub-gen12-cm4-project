const express = require("express");

const getUserController = require("../../controllers/users/getUsers.controller.js");
const updateUserController = require("../../controllers/users/updateUser.controller.js");
const deleteUserController = require("../../controllers/users/deleteUser.controller.js");
const resetPasswordController = require("../../controllers/users/resetPassword.controller.js");

const updateUserValidator = require("../../middlewares/validators/users/updateUser.validator.js");
const resetPasswordValidator = require("../../middlewares/validators/users/resetPassword.validator.js");

const usersRouter = express.Router();

usersRouter.get("/profile", getUserController.getCurrentUserProfilePage);

usersRouter.get("/:id/profile", getUserController.getUserProfilePage);

usersRouter.get("/edit", updateUserController.getUpdateCurrentUserPage);

usersRouter.post(
  "/edit",
  updateUserValidator,
  updateUserController.postUpdateCurrentUser,
);

usersRouter.get(
  "/:id/edit",

  updateUserController.getUpdateUserPage,
);

usersRouter.post(
  "/:id/edit",
  updateUserValidator,
  updateUserController.postUpdateUser,
);

usersRouter.get("/delete", deleteUserController.getDeleteCurrentUserPage);

usersRouter.post("/delete", deleteUserController.postDeleteCurrentUser);

usersRouter.get("/:id/delete", deleteUserController.getDeleteUserPage);

usersRouter.post("/:id/delete", deleteUserController.postDeleteUser);

usersRouter.get(
  "/reset-password",
  resetPasswordController.getResetPasswordPage,
);

usersRouter.post(
  "/reset-password",
  resetPasswordValidator,
  resetPasswordController.postResetPassword,
);

usersRouter.post("/follow", (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true },
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    },
  );
});
usersRouter.post("/unfollow", (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true },
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    },
  );
});

module.exports = usersRouter;
