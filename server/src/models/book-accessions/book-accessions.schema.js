const { Schema, model, models } = require("mongoose");

const AccessionSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  accessionNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: "available" },
  category: {
    type: String,
    default: "GENERAL",
  },
});

const Accession = models.Accession || model("Accession", AccessionSchema);

module.exports = Accession;

// async function updateBookBankCategory() {
//   try {
//     const result = await Accession.updateMany(
//       { category: "BOOK BANK" },
//       { $set: { category: "BOOK-BANK" } }
//     );

//     console.log(`${result.modifiedCount} documents updated.`);
//   } catch (err) {
//     console.error("Error updating documents:", err);
//   }
// }
