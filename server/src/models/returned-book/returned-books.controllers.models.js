const {
  createCurrentMonthDateRange,
  createDateRange,
} = require("../../utils/functions");
const {
  getBookAccessionIdFromBookAccessionNumber,
  getAccession,
} = require("../book-accessions/book-accessions.controllers");
const { fetchStudentById } = require("../students/students.controllers");
const returnedBooksMongo = require("./returned-books.schema");
const issueBookMongo = require("../issue-book/issue-book.schema");
const {
  getLibraryCard,
} = require("../library-cards/library-cards.controllers");

const createReturnBook = async (returningBookDetails, session) => {
  return await returnedBooksMongo.create([returningBookDetails], { session });
};

const updateReturnBookById = async (_id, update, session) => {
  return await returnedBooksMongo.findByIdAndUpdate(_id, update, { session });
};

const getReturnedBooks = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let totalPages = 1;
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const query = returnedBooksMongo.find();

  switch (filter) {
    case "fetchAllReturnedBooks":
      query.where();
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
        returnDate: { $gte: date.startingDate, $lte: date.endingDate },
      });
      break;

    case "dateRange":
      const { startingDate, endingDate } = createDateRange(filterValue);
      query.where({ returnDate: { $gte: startingDate, $lte: endingDate } });
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
      populate: { path: "studentId", select: "rollNumber fullName -_id" },
    })
    .populate({ path: "fine", select: "amount -_id" });

  return { returnedBooksArray: await query.exec(), totalPages };
};

const getIssueHistory = async (student_Id, filter) => {
  const studentDoc = await fetchStudentById(student_Id);

  if (studentDoc === null) {
    return [];
  }
  const { sortSelect, sortValue } = filter;

  const { libraryCards } = studentDoc;

  const query1 = issueBookMongo.find({
    $or: [
      { libraryCardId: libraryCards[0] },
      { libraryCardId: libraryCards[1] },
    ],
  });

  const query2 = returnedBooksMongo.find({
    $or: [
      { libraryCardId: libraryCards[0] },
      { libraryCardId: libraryCards[1] },
    ],
  });

  switch (sortSelect) {
    case "fine":
      query1.where({ issueDate: null });
      query2.where({ fine: { $ne: 0 } });
      break;

    case "accessionNumber":
      const accessionNumber = await getBookAccessionIdFromBookAccessionNumber(
        sortValue
      );

      if (accessionNumber != null) {
        query1.where({
          bookAccessionId: accessionNumber._id,
        });
        query2.where({
          bookAccessionId: accessionNumber._id,
        });
      } else {
        query1.where({
          bookAccessionId: null,
        });
        query2.where({
          bookAccessionId: null,
        });
      }

      break;

    case "dateRange":
      const { startingDate, endingDate } = sortValue;
      query1.where({ issueDate: { $gte: startingDate, $lte: endingDate } });
      query2.where({ issueDate: { $gte: startingDate, $lte: endingDate } });
      break;

    default:
      break;
  }

  query1
    .populate({
      path: "bookAccessionId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name -_id" },
    });
  query2
    .populate({
      path: "bookAccessionId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name -_id" },
    });

  return [...(await query1.exec()), ...(await query2.exec())];
};

const getReturnedBookById = async (_id, populate = false) => {
  const query = returnedBooksMongo.findById(_id);
  if (populate)
    query
      .populate({
        path: "bookAccessionId",
        populate: { path: "bookId", select: "title author -_id" },
      })
      .populate({
        path: "libraryCardId",
        populate: { path: "studentId", select: "rollNumber fullName -_id" },
      })
      .populate({ path: "issuedBy", select: "idNumber fullName -_id" })
      .populate({ path: "returnedBy", select: "idNumber fullName -_id" })
      .populate({ path: "fine", select: "amount -_id" });

  return await query.exec();
};

const countReturnedBookDocs = async (filter) =>
  await returnedBooksMongo.countDocuments(filter);

module.exports = {
  createReturnBook,
  getReturnedBooks,
  getIssueHistory,
  getReturnedBookById,
  updateReturnBookById,
  countReturnedBookDocs,
};
