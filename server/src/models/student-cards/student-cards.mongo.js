const mongoose = require("mongoose");

const studentCardsSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "StudentCard",
  studentCardsSchema,
  "StudentCards"
);
