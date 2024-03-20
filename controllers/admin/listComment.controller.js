const Comment = require("../../models/comment"); 

const listCommentsController = async (req, res, next) => {
  try {
    const comments = await Comment.find(); 

    const pageMetadata = {
      title: "List of Comments",
    };

    return res.render("admin/comments", {
      page: pageMetadata,
      comments,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listCommentsController,
};
