const mongoose = require("mongoose");
const validator = require("validator");

const { private, paginate, softDelete } = require("./plugins");
const { roles } = require("../config/roles");

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    createdBy: {
      type: String,
    },
    text: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],
    user_id: {
      type: String,
    },
    user_image: {
      type: String,
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
 * @typedef Comment
 */
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
