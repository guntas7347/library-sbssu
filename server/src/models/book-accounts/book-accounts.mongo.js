const mongoose = require("mongoose");

const bookAccountsSchema = new mongoose.Schema({
  bookId: {
    type: String,
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
  bookAccountsSchema,
  "BookAccounts"
);
