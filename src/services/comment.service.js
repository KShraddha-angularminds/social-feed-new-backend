const httpStatus = require("http-status");
const { Comment } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createComment = async (commentBody) => {
  const comment = new Comment(commentBody);

  const savedComment = await comment.save();

  return savedComment;
};

const getCommentById = async (postId) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  const comments = await Comment.find({
    postId: postId,
  }).populate("postId");
  return comments;
};

const updateCommentById = async (userId, commentId) => {
  // const uid = req.user._id;
  const comment = await Comment.findById(commentId);

  const flag = comment.likes.filter((id) => {
    return id === userId;
  });
  if (flag == "") {
    // res.send(comment.likes)
    comment.likes.push(userId);
    Object.assign(comment, { likes: comment.likes });
    await comment.save();
    return comment;
  } else {
    var newLikeArr = comment.likes.filter((id) => id !== userId);

    Object.assign(comment, { likes: newLikeArr });
    await comment.save();
    return comment;
  }
};

module.exports = {
  createComment,
  getCommentById,
  updateCommentById,
};
