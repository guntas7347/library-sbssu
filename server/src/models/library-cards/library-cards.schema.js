const mongoose = require("mongoose");

const LibraryCardsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "LibraryCard",
  LibraryCardsSchema,
  "LibraryCards"
);
