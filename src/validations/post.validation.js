const Joi = require("joi");

const createPost = {
  query: Joi.object().keys({
    image: Joi.string(),
    caption: Joi.string(),
  }),
};

module.exports = {
  createPost,
};
