const { default: mongoose, Schema, model } = require("mongoose");

const ReturnedBooksSchema = new Schema({
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
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  fine: { type: Number, required: true },
  issuedBy: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  returnedBy: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

module.exports = model("ReturnedBook", ReturnedBooksSchema, "ReturnedBooks");
