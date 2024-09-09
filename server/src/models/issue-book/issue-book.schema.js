const mongoose = require("mongoose");

const issuedBooksSchema = new mongoose.Schema({
  bookAccessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookAccession",
    required: true,
  },
  libraryCardId: {
    type: mongoose.Types.ObjectId,
    ref: "libraryCard",
    required: true,
  },
  issueDate: { type: Date, required: true },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff",
    required: true,
  },
  issueRemark: { type: String, default: "None" },
});

module.exports = mongoose.model("issuedBook", issuedBooksSchema, "issuedBooks");
