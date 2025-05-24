const { Schema, model, models } = require("mongoose");

const LibraryCardsSchema = new Schema({
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "available",
  },
  category: {
    type: String,
    default: "GENERAL",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  autoAlloted: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const LibraryCard =
  models.LibraryCards || model("LibraryCard", LibraryCardsSchema);

module.exports = LibraryCard;
