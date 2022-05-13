const Joi = require("joi");

const createPost = {
  query: Joi.object().keys({
    image: Joi.any(),
    caption: Joi.string(),
  }),
};

module.exports = {
  createPost,
};
