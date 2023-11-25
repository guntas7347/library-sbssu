const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Book", booksSchema, "Books");
