const { Schema, model, models } = require("mongoose");

const IssuedBookSchema = new Schema({
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
  issuedBy: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  issueRemark: { type: String, default: "None" },
});

const IssuedBook = models.IssuedBook || model("IssuedBook", IssuedBookSchema);

module.exports = IssuedBook;
