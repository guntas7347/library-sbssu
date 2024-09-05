const mongoose = require("mongoose");

const LibraryCardsSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
    unique: true,
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
