const mongoose = require("mongoose");

const BookAccessionsSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
  accessionNumber: { type: Number, required: true },
  status: { type: String, default: "available" },
});

module.exports = mongoose.model(
  "bookAccession",
  BookAccessionsSchema,
  "bookAccessions"
);
