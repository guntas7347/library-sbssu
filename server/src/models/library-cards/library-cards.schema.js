const mongoose = require("mongoose");

const LibraryCardsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available",
  },
});

module.exports = mongoose.model(
  "libraryCard",
  LibraryCardsSchema,
  "libraryCards"
);
