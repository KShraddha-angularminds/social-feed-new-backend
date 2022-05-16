const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { commentService } = require("../services");

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser({
//     _org: req.user._org,
//     ...req.body,
//   });
//   res.status(httpStatus.CREATED).send(user);
// });

const createComment = catchAsync(async (req, res) => {
  let comment;
  try {
    comment = await commentService.createComment({
      ...req.body,
      postId: req.params.postId,
    });
  } catch (e) {
    throw e;
  }
  res.status(httpStatus.CREATED).send({
    comment,
  });
});

const getCommentById = catchAsync(async (req, res) => {
  // const user = await (
  //   await userService.getUserById(req.params.userId)
  // ).populate("_org", "_id name email");
  console.log(req.params.postId);
  console.log("reached controller");
  const comment = await commentService.getCommentById(req.params.postId);

  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "comment not found");
  }
  res.send(comment);
});

const likeUnlikeComment = catchAsync(async (req, res) => {
  const userId = req.user._id.valueOf();
  const updatedComment = await commentService.updateCommentById(
    userId,
    req.params.commentId
  );

  res.send(updatedComment);
});

module.exports = {
  createComment,
  getCommentById,
  likeUnlikeComment,
};
