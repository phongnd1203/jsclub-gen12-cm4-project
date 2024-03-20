const express = require('express');
const commentController = require('../../../controllers/features/comment.controller');
const commentRouter = express.Router();

commentRouter.post('/:id', commentController.createCommentPage)

//delete
commentRouter.get('/:houseId/delete/comment/:commentId', commentController.deleteCommentPage)


module.exports = commentRouter;
