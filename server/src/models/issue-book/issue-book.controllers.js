const {
  createCurrentMonthDateRange,
  createDateRange,
} = require("../../utils/functions");
const {
  getBookAccessionIdFromBookAccessionNumber,
  getAccession,
} = require("../book-accessions/book-accessions.controllers");
const {
  fetchLibraryCardIdByCardNumber,
  getLibraryCard,
} = require("../library-cards/library-cards.controllers");
const issueBookMongo = require("./issue-book.schema");

const createIssueBook = async (issueBookDetails, session) => {
  return await issueBookMongo.create([issueBookDetails], { session });
};

const getIssuedBook = async (filter) => {
  return await issueBookMongo
    .findOne(filter)
    .populate({
      path: "bookAccessionId",
      populate: { path: "bookId", select: "title author -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "memberId", select: "rollNumber fullName -_id" },
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
        populate: { path: "memberId", select: "rollNumber fullName -_id" },
      })
      .populate({ path: "issuedBy", select: "idNumber fullName -_id" });
  }

  return await query.exec();
};

const deleteIssuedBook = async (_id, session) => {
  return await issueBookMongo.findByIdAndDelete(_id, { session });
};

const getIssuedBooks = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let totalPages = 1;
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const query = issueBookMongo.find();

  switch (filter) {
    case "fetchAllIssuedBooks":
      query.where();
      totalPages = Math.ceil((await countIssuedBookDocs()) / pageSize);
      break;

    case "accessionNumber":
      const accession = await getAccession({ accessionNumber: filterValue });
      if (!accession) query.where({ _id: { $exists: false } });
      else
        query.where({
          bookAccessionId: accession._id,
        });
      break;

    case "cardNumber":
      const libraryCard = await getLibraryCard({ cardNumber: filterValue });
      if (!libraryCard) query.where({ _id: { $exists: false } });
      else
        query.where({
          libraryCardId: libraryCard._id,
        });
      break;

    case "currentMonth":
      const date = createCurrentMonthDateRange();
      query.where({
        issueDate: { $gte: date.startingDate, $lte: date.endingDate },
      });
      break;

    case "dateRange":
      const { startingDate, endingDate } = createDateRange(filterValue);
      query.where({ issueDate: { $gte: startingDate, $lte: endingDate } });
      break;

    default:
      break;
  }

  query.skip(skip).limit(pageSize);

  query
    .populate({
      path: "bookAccessionId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "memberId", select: "rollNumber fullName -_id" },
    });

  return { issuedBooksArray: await query.exec(), totalPages };
};

const countIssuedBookDocs = async (filter) => {
  return await issueBookMongo.countDocuments(filter);
};

module.exports = {
  createIssueBook,
  getIssuedBook,
  getIssuedBookById,
  deleteIssuedBook,
  getIssuedBooks,
  countIssuedBookDocs,
};
