const { Schema, model, models } = require("mongoose");

const BookSchema = new Schema({
  isbn: { type: Number, required: false },
  title: { type: String, required: false },
  author: { type: String, required: false },
  placeAndPublishers: { type: String, required: false },
  publicationYear: { type: Number, required: false },
  pages: { type: Number, required: false },
  volume: { type: Number, required: false },
  source: { type: String, required: false },
  cost: { type: Number, required: false },
  callNumber: { type: Number, required: false },
  createdAt: { type: Date, default: new Date() },
  accessionNumbers: [{ type: Schema.Types.ObjectId, ref: "Accession" }],
});

const Book = models.Book || model("Book", BookSchema);

module.exports = Book;
