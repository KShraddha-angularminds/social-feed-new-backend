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
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],

    replies: [
      {
        text: {
          type: String,
        },
        created_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        timestamps: true,
      },
    ],
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
