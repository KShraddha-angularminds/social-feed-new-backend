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
module.exports = {
  createComment,
  getComment,
};
