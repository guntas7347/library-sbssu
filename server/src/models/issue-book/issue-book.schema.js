const mongoose = require("mongoose");

const issuedBooksSchema = new mongoose.Schema({
  bookAccessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookAccession",
    required: true,
  },
  libraryCardId: {
    type: mongoose.Types.ObjectId,
    ref: "LibraryCard",
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

module.exports = mongoose.model("IssuedBook", issuedBooksSchema, "IssuedBooks");
