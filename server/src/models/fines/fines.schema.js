const mongoose = require("mongoose");

const FinesSchema = new mongoose.Schema({
  returnedBookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "returnedBook",
    default: null,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    default: null,
  },
  remark: { type: String, default: "none" },
  category: { type: String, required: true },
  recieptNumber: { type: Number, default: null },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("fine", FinesSchema, "fines");
