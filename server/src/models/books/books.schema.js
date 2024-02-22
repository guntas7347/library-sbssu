const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  isbn: { type: Number, required: false },
  title: { type: String, required: false },
  author: { type: String, required: false },
  placeAndPublishers: { type: String, required: false },
  publicationYear: { type: Number, required: false },
  pages: { type: Number, required: false },
  volume: { type: String, required: false },
  source: { type: String, required: false },
  cost: { type: Number, required: false },
  callNumber: { type: Number, required: false },
  createdAt: { type: Date, default: new Date() },
  accessionNumbers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "bookAccession" },
  ],
});

module.exports = mongoose.model("book", BooksSchema, "books");
