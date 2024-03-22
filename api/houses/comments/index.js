const express = require("express");

const getCommentsController = require("../../../controllers/houses/comments/getComments.js");
const createCommentController = require("../../../controllers/houses/comments/createComments.js");
const deleteCommentController = require("../../../controllers/houses/comments/deleteComments.js");

const houseCommentRouter = express.Router();

houseCommentRouter.post(
  "/:houseId/comments/create",
  createCommentController.postCreateComment,
);

// houseCommentRouter.get("/:houseId", getCommentsController.getCommentsPage);

houseCommentRouter.post(
  "/:houseId/comments/:commentId/delete",
  deleteCommentController.postDeleteComment,
);

module.exports = houseCommentRouter;
