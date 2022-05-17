const Joi = require("joi");

const createPost = {
  body: Joi.object().keys({
    image: Joi.any(),
    caption: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
};
