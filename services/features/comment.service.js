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
    const comments = await CommentModel.find({house}).exec();
    return comments;
}


// const deleteComment = async (id) => {
//     await commentModel.findByIdAndDelete(id).lean().exec();
//     return;
// }


module.exports = {
    getAllComment,
    createComment,
    // deleteComment
};