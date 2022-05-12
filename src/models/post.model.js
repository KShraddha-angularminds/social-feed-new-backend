const mongoose = require("mongoose");
const validator = require("validator");

const { private, paginate, softDelete } = require("./plugins");
const { roles } = require("../config/roles");

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(softDelete);
// userSchema.plugin(private);
// userSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
