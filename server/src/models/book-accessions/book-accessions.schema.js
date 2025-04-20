const { Schema, model, models } = require("mongoose");

const AccessionSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  accessionNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: "available" },
  category: {
    type: String,
    default: "GENERAL",
    enum: ["GENERAL", "BOOK BANK"],
  },
});

const Accession = models.Accession || model("Accession", AccessionSchema);

module.exports = Accession;
