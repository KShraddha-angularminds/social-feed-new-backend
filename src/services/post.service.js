const httpStatus = require("http-status");
const { Post } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createPost = async (postBody, postImage) => {
  console.log(postImage);
  const post = new Post(postBody, JSON.stringify(postImage));
  console.log(post);
  const savedPost = await post.save();

  return savedPost;
};

module.exports = {
  createPost,
};
