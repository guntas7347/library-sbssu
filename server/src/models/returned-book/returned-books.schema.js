const { default: mongoose, Schema, model } = require("mongoose");

const ReturnedBooksSchema = new Schema({
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
  returnDate: { type: Date, required: true },
  fine: {
    type: mongoose.Types.ObjectId,
    ref: "fine",
    default: null,
  },
  issuedBy: {
    type: mongoose.Types.ObjectId,
    ref: "staff",
    required: true,
  },
  returnedBy: {
    type: mongoose.Types.ObjectId,
    ref: "staff",
    required: true,
  },
  issueRemark: {
    type: String,
    default: "None",
  },
  returnRemark: {
    type: String,
    default: "None",
  },
});

module.exports = model("returnedBook", ReturnedBooksSchema, "returnedBooks");
