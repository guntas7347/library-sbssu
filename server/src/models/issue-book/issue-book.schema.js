const mongoose = require("mongoose");

const issuedBooksSchema = new mongoose.Schema({
  bookAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookAccount",
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
});

module.exports = mongoose.model("IssuedBook", issuedBooksSchema, "IssuedBooks");
