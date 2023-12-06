const { createCurrentMonthDateRange } = require("../../utils/functions");
const {
  getBookAccountIdFromBookAccountNumber,
} = require("../book-accounts/book-accounts.controllers");
const {
  fetchLibraryCardIdByCardNumber,
} = require("../library-cards/library-cards.controllers");
const issueBookMongo = require("./issue-book.schema");

const issueNewBook = async (issueBookDetails) => {
  return await issueBookMongo.create(issueBookDetails);
};

const fetchIssuedBookByBookAccountId = async (bookAccountId) => {
  return await issueBookMongo
    .findOne({ bookAccountId })
    .populate({
      path: "bookAccountId",
      populate: { path: "bookId", select: "title author ISBN -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name program -_id" },
    });
};

const fetchIssuedBookDocById = async (_id) => {
  return await issueBookMongo.findById(_id);
};

const deleteIssuedBookDoc = async (_id) => {
  return await issueBookMongo.findByIdAndDelete(_id);
};

const fetchAllIssuedBooks = async (filter) => {
  const { sortSelect, sortValue } = filter;

  const query = issueBookMongo.find();

  switch (sortSelect) {
    case "issueDate":
      query.where({ issueDate: sortValue });
      break;

    case "accountNumber":
      const accountNumber = await getBookAccountIdFromBookAccountNumber(
        sortValue
      );

      if (accountNumber != null) {
        query.where({
          bookAccountId: accountNumber._id,
        });
      } else {
        query.where({
          bookAccountId: null,
        });
      }

      break;

    case "cardNumber":
      const cardNumber = await fetchLibraryCardIdByCardNumber(sortValue);
      if (cardNumber != null) {
        query.where({ libraryCardId: cardNumber._id });
      } else {
        query.where({ libraryCardId: null });
      }

      break;

    case "currentMonth":
      const date = createCurrentMonthDateRange();
      query.where({
        issueDate: { $gte: date.startingDate, $lte: date.endingDate },
      });
      break;

    case "dateRange":
      const { startingDate, endingDate } = sortValue;
      query.where({ issueDate: { $gte: startingDate, $lte: endingDate } });
      break;

    default:
      break;
  }

  return await query
    .populate({
      path: "bookAccountId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name -_id" },
    });
};

module.exports = {
  issueNewBook,
  fetchIssuedBookByBookAccountId,
  fetchIssuedBookDocById,
  deleteIssuedBookDoc,
  fetchAllIssuedBooks,
};
