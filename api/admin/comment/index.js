const express = require("express");
const { model } = require("mongoose");
const adminRouter = require("..");

const adminCommentRouter = express.Router();

const Comment = require("../models/comment");

const isAdmin = (req, res, next) => {
  
  if (req.user && req.user.role === "admin") {
    next(); 
  } else {
    res
      .status(403)
      .json({ message: "Từ chối quyền truy cập." });
  }
};

// Get all comments 
adminCommentRouter.get("/", isAdmin, async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Không tim được bình luận", error });
  }
});

// Delete a comment by ID 
adminCommentRouter.delete("/:commentId", isAdmin, async (req, res) => {
  const { commentId } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Không thấy bình luận" });
    }
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Không thể xóa", error });
  }
});

module.exports = adminCommentRouter;
