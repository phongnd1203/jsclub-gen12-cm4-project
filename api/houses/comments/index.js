const express = require("express");

const getCommentsController = require("../../../controllers/houses/comments/getComments.js");
const createCommentController = require("../../../controllers/houses/comments/createComment.js");
const deleteCommentController = require("../../../controllers/houses/comments/deleteComment.js");

const houseCommentRouter = express.Router();

houseCommentRouter.post("/create", createCommentController.postCreateComment);

houseCommentRouter.get("/", getCommentsController.getCommentsPage);

houseCommentRouter.post(
  "/:commentId/delete",
  deleteCommentController.postDeleteComment,
);

module.exports = houseCommentRouter;
