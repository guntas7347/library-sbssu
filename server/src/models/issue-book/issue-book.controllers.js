const { createCurrentMonthDateRange } = require("../../utils/functions");
const {
  getBookAccessionIdFromBookAccessionNumber,
} = require("../book-accessions/book-accessions.controllers");
const {
  fetchLibraryCardIdByCardNumber,
} = require("../library-cards/library-cards.controllers");
const issueBookMongo = require("./issue-book.schema");

const createIssueBook = async (issueBookDetails, session) => {
  return await issueBookMongo.create([issueBookDetails], { session });
};

const getIssuedBookByBookAccessionId = async (bookAccessionId) => {
  return await issueBookMongo
    .findOne({ bookAccessionId })
    .populate({
      path: "bookAccessionId",
      populate: { path: "bookId", select: "title author -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber fullName -_id" },
    })
    .populate({
      path: "issuedBy",
    });
};

const getIssuedBookById = async (_id, populate = false) => {
  const query = issueBookMongo.findById(_id);
  if (populate) {
    query
      .populate({
        path: "bookAccessionId",
        populate: { path: "bookId", select: "title author -_id" },
      })
      .populate({
        path: "libraryCardId",
        populate: { path: "studentId", select: "rollNumber fullName -_id" },
      })
      .populate({ path: "issuedBy", select: "idNumber fullName -_id" });
  }

  return await query.exec();
};

const deleteIssuedBook = async (_id, session) => {
  return await issueBookMongo.findByIdAndDelete(_id, { session });
};

const findIssuedBooks = async (filter) => {
  const { sortSelect, sortValue } = filter;

  const query = issueBookMongo.find();

  switch (sortSelect) {
    case "issueDate":
      query.where({ issueDate: sortValue });
      break;

    case "accessionNumber":
      const accessionNumber = await getBookAccessionIdFromBookAccessionNumber(
        sortValue
      );

      if (accessionNumber != null) {
        query.where({
          bookAccessionId: accessionNumber._id,
        });
      } else {
        query.where({
          bookAccessionId: null,
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
      path: "bookAccessionId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber fullName -_id" },
    });
};

module.exports = {
  createIssueBook,
  getIssuedBookByBookAccessionId,
  getIssuedBookById,
  deleteIssuedBook,
  findIssuedBooks,
};
