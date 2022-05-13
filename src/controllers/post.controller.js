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
    });
  } catch (e) {
    throw e;
  }
  res.status(httpStatus.CREATED).send({
    post,
  });
});

module.exports = {
  createPost,
};
