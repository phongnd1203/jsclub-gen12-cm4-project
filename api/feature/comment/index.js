// Tạo API endpoints cho comment
const express = require('express');
const commentRouter = express.Router();
const CommentModel = require('../../../models/feature/comment.model');
const commentService = require('../../../services/features/comment.service')

commentRouter.post('/:id', async (req, res) => {
    try {
        const { comment } = req.body;
        const house = req.params.id;
        const owner = req.session.user._id;
        const newComment = commentService.createComment(
            house,
            owner,
            comment
        );
        res.redirect(`/${req.params.id}`);
    }
    catch (err) {
        res.status(404).send(err);
    }
})


module.exports = commentRouter;
