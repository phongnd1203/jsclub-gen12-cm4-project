const CommentModel = require('../../models/feature/comment.model');
const commentService = require('../../services/features/comment.service')

const createCommentPage = async (req, res) => {
    try {
        const { comment } = req.body;
        const house = req.params.id;
        const owner = req.session.user._id;
        const newComment = commentService.createComment(
            house,
            owner,
            comment
        );
        res.redirect('back');
    }
    catch (err) {
        res.status(404).send(err);
    }
}

const deleteCommentPage = async (req, res) => {
    try {
        const houseId = req.params.houseId;
        const commentId = req.params.commentId;
        commentService.deleteComment(commentId);
        res.redirect(`/house/${houseId}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createCommentPage,
    deleteCommentPage
}