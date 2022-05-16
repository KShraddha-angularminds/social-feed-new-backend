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

const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);

  return posts;
};
// const getPost = async () => {
//   const posts = await Post.find().populate("user_id");
//   return posts;
// };

const updatePostById = async (userId, postId) => {
  // const uid = req.user._id;
  const post = await Post.findById(postId);
  const flag = post.likes.filter((id) => {
    return id === userId;
  });
  console.log(flag);

  if (flag == "") {
    post.likes.push(userId);
    Object.assign(post, { likes: post.likes });
    await post.save();
    return post;
  } else {
    var newLikeArr = post.likes.filter((id) => id !== userId);

    Object.assign(post, { likes: newLikeArr });
    await post.save();
    return post;
  }
};

module.exports = {
  createPost,
  // getPost,
  updatePostById,
  queryPosts,
};
