const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },

  placeAndPublishers: {
    type: String,
    required: false,
  },
  publicationYear: {
    type: Number,
    required: false,
  },
  pages: {
    type: String,
    required: false,
  },

  volume: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  cost: {
    type: String,
    required: false,
  },
  callNumber: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  accessionNumbers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookAccession",
    },
  ],
});

module.exports = mongoose.model("Book", BooksSchema, "Books");
