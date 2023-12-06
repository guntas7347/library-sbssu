const {
  getBookIdFromAccountNumber,
} = require("../book-accounts/book-accounts.controllers");
const booksMongo = require("./books.schema");

const addNewBook = async (bookDetails) => {
  return await booksMongo.create(bookDetails);
};

const fetchAllBooks = async (filter) => {
  const { sortSelect, sortValue } = filter;

  const query = booksMongo.find();
  switch (sortSelect) {
    case "ISBN":
      query.where({ ISBN: sortValue });
      break;

    case "accountNumber":
      const accountNumber = await getBookIdFromAccountNumber(sortValue);
      if (accountNumber != null) {
        query.where({
          _id: accountNumber.bookId,
        });
      } else {
        query.where({
          _id: null,
        });
      }
      break;

    default:
      break;
  }

  return await query.exec();
};

const fetchBookByISBN = async (isbn, populate = false) => {
  const query = booksMongo.findOne({ ISBN: isbn });

  if (populate) query.populate("bookAccounts");

  return await query.exec();
};

const fetchBookById = async (id) => {
  return await booksMongo.findById(id);
};

const addBookAccountToBook = async (bookId, bookAccountId) => {
  return await booksMongo.updateOne(
    { _id: bookId },
    { $push: { bookAccounts: bookAccountId } }
  );
};

module.exports = {
  addNewBook,
  fetchAllBooks,
  fetchBookByISBN,
  fetchBookById,
  addBookAccountToBook,
};
