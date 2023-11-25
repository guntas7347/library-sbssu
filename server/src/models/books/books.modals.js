const booksMongo = require("./books.mongo");

const addNewBook = async (bookDetails) => {
  return await booksMongo.create(bookDetails);
};

const fetchAllBooks = async () => {
  return await booksMongo.find();
};

const fetchBookByISBN = async (isbn) => {
  return await booksMongo.findOne({ ISBN: isbn });
};

const fetchBookById = async (id) => {
  return await booksMongo.findById(id);
};

module.exports = { addNewBook, fetchAllBooks, fetchBookByISBN, fetchBookById };
