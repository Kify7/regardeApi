// Clase que representa un comentario
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rate: { type: Number, min: 0, max: 5, required: true },
  },
  { collection: "comments", timestamps: true }
);

CommentSchema.methods.publicData = function () {
  return {
    id: this.id,
    userId: this.userId,
    movieId: this.movieId,
    text: this.text,
  };
};

mongoose.model("Comment", CommentSchema);
