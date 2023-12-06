const { createCurrentMonthDateRange } = require("../../utils/functions");
const {
  getBookAccountIdFromBookAccountNumber,
} = require("../book-accounts/book-accounts.controllers");
const { fetchStudentById } = require("../students/students.controllers");
const returnedBooksMongo = require("./returned-books.schema");
const issueBookMongo = require("../issue-book/issue-book.schema");

const returnBook = async (returningBookDetails) => {
  return await returnedBooksMongo.create(returningBookDetails);
};

const fetchAllReturnedBooks = async (filter) => {
  const { sortSelect, sortValue } = filter;
  let query = returnedBooksMongo.find();

  switch (sortSelect) {
    case "fine":
      query.where({ fine: { $ne: 0 } });
      break;

    case "returnDate":
      query.where({ returnDate: sortValue });
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

    case "currentMonth":
      const date = createCurrentMonthDateRange();
      query.where({
        returnDate: { $gte: date.startingDate, $lte: date.endingDate },
      });
      break;

    case "dateRange":
      const { startingDate, endingDate } = sortValue;
      query.where({ returnDate: { $gte: startingDate, $lte: endingDate } });
      break;

    default:
      break;
  }

  const results = await query
    .populate({
      path: "bookAccountId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name -_id" },
    });

  return results;
};

const fetchIssueHistory = async (student_Id, filter) => {
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

    case "accountNumber":
      const accountNumber = await getBookAccountIdFromBookAccountNumber(
        sortValue
      );

      if (accountNumber != null) {
        query1.where({
          bookAccountId: accountNumber._id,
        });
        query2.where({
          bookAccountId: accountNumber._id,
        });
      } else {
        query1.where({
          bookAccountId: null,
        });
        query2.where({
          bookAccountId: null,
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
      path: "bookAccountId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name -_id" },
    });
  query2
    .populate({
      path: "bookAccountId",
      populate: { path: "bookId", select: "title  -_id" },
    })
    .populate({
      path: "libraryCardId",
      populate: { path: "studentId", select: "rollNumber name -_id" },
    });

  return [...(await query1.exec()), ...(await query2.exec())];
};

module.exports = { returnBook, fetchAllReturnedBooks, fetchIssueHistory };
