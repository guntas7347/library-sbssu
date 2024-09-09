const mongoose = require("mongoose");

const BookAccessionsSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
  accessionNumber: { type: Number, required: true },
  status: { type: String, default: "available" },
  category: {
    type: String,
    default: "GENERAL",
    enum: ["GENERAL", "BOOK BANK"],
  },
});

module.exports = mongoose.model(
  "bookAccession",
  BookAccessionsSchema,
  "bookAccessions"
);
