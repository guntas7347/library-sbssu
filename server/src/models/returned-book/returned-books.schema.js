const { Schema, model, models } = require("mongoose");

const ReturnedBooksSchema = new Schema({
  bookAccessionId: {
    type: Schema.Types.ObjectId,
    ref: "Accession",
    required: true,
  },
  libraryCardId: {
    type: Schema.Types.ObjectId,
    ref: "LibraryCard",
    required: true,
  },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  fine: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    default: null,
  },
  issuedBy: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  returnedBy: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
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

const ReturnedBook =
  models.ReturnedBook || model("ReturnedBook", ReturnedBooksSchema);

module.exports = ReturnedBook;
