const { default: mongoose, Schema, model } = require("mongoose");

const ReturnedBooksSchema = new Schema({
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
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  fine: { type: Number, required: true },
});

module.exports = model("ReturnedBook", ReturnedBooksSchema, "ReturnedBooks");
