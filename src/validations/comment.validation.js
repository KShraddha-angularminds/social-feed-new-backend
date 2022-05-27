const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createComment = {
  query: Joi.object().keys({
    text: Joi.string(),
  }),
};
const getComment = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};
const replyToComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};
module.exports = {
  createComment,
  getComment,
  replyToComment,
};
