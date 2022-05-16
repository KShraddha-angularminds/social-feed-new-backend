const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { postService } = require("../services");

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser({
//     _org: req.user._org,
//     ...req.body,
//   });
//   res.status(httpStatus.CREATED).send(user);
// });

const createPost = catchAsync(async (req, res) => {
  let post;
  try {
    post = await postService.createPost({
      ...req.body,
      image: req.img,
      user_id: req.user._id,
    });
  } catch (e) {
    throw e;
  }
  res.status(httpStatus.CREATED).send({
    post,
  });
});

//get all posts
const getPost = catchAsync(async (req, res) => {
  // console.log("reached controller");
  // const posts = await postService.getPost();

  // if (!posts) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "post not found");
  // }
  // res.send(posts);

  const filter = pick(req.query, ["_id", "caption"]);
  const options = pick(req.query, ["limit", "page"]);
  // const result = await postService.queryPosts(filter, {
  //   ...options,
  // });

  const result = await postService.queryPosts(filter, {
    ...options,
    populate: [
      {
        path: "user_id",
      },
    ],
  });
  res.send(result);
});

const likeUnlikePost = catchAsync(async (req, res) => {
  const userId = req.user._id.valueOf();
  const updatedPost = await postService.updatePostById(
    userId,
    req.params.postId
  );

  res.send(updatedPost);
});

module.exports = {
  createPost,
  getPost,
  likeUnlikePost,
};
