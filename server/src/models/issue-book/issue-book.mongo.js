const mongoose = require("mongoose");

const issuedBooksSchema = new mongoose.Schema({
  bookAccountId: {
    type: String,
    required: true,
  },
  studentCardId: {
    type: String,
    required: true,
  },
  issueDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("IssuedBook", issuedBooksSchema, "IssuedBooks");
