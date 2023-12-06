const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  bookAccounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookAccount",
    },
  ],
});

module.exports = mongoose.model("Book", BooksSchema, "Books");
