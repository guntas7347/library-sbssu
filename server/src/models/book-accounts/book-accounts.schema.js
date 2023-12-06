const mongoose = require("mongoose");

const BookAccountsSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "BookAccount",
  BookAccountsSchema,
  "BookAccounts"
);
