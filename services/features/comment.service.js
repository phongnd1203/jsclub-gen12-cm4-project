const CommentModel = require('../../models/feature/comment.model');

const createComment = async (house, owner, comment) => {
    const newComment = new CommentModel({
        house,
        owner,
        comment
    });
    await newComment.save();
    return newComment;
}

const getAllComment = async (house) => {
    const comments = await CommentModel.find({house}).populate('owner', 'name').exec();
    return comments;
}


const deleteComment = async (id) => {
    await CommentModel.findByIdAndDelete(id).lean().exec();
}


module.exports = {
    getAllComment,
    createComment,
    deleteComment
};