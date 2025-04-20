const { Schema, model, models } = require("mongoose");

const TransactionsSchema = new Schema({
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
    index: true,
  },
  returnedBookId: {
    type: Schema.Types.ObjectId,
    ref: "ReturnedBook",
    default: null,
  },
  transactionType: { type: String, enum: ["DEBIT", "CREDIT"], required: true },
  category: { type: String, required: true },
  remark: { type: String, default: "NONE" },
  amount: { type: Number, required: true, min: 0 },
  receiptNumber: { type: String, unique: true },
  paymentMethod: {
    type: String,
    enum: ["CASH", "CARD", "UPI", "ONLINE", "NONE"],
    default: "NONE",
  },
  closingBalance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionsSchema);

module.exports = Transaction;
