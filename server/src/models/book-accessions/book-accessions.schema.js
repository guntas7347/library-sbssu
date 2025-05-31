const { Schema, model, models } = require("mongoose");

const AccessionSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  accessionNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: "AVAILABLE" },
  category: {
    type: String,
    default: "GENERAL",
  },
});

const Accession = models.Accession || model("Accession", AccessionSchema);

module.exports = Accession;

// async function updateStatusToUpperCase() {
//   try {
//     const result = await Accession.updateMany(
//       { status: "available" }, // filter documents with lowercase "available"
//       { $set: { status: "AVAILABLE" } } // update to uppercase "AVAILABLE"
//     );

//     console.log(`Matched ${result.matchedCount} documents.`);
//     console.log(`Modified ${result.modifiedCount} documents.`);
//   } catch (err) {
//     console.error("Error updating statuses:", err);
//   }
// }

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
