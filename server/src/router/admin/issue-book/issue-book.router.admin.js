const express = require("express");
const {
  fetchBookAccountByAccountNumber,
  updateBookAccountStatus,
} = require("../../../models/book-accounts/book-accounts.controllers");
const {
  fetchLibraryCardByCardNumber,
  fetchLibraryCardById,
  updateLibraryCardStatus,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  issueNewBook,
  fetchIssuedBookByBookAccountId,
  fetchIssuedBookDocById,
  deleteIssuedBookDoc,
  fetchAllIssuedBooks,
} = require("../../../models/issue-book/issue-book.controllers");
const { fetchBookById } = require("../../../models/books/books.controllers");
const {
  fetchStudentById,
} = require("../../../models/students/students.controllers");
const {
  returnBook,
  fetchAllReturnedBooks,
} = require("../../../models/returned-book/returned-books.controllers.models");
const {
  startTransaction,
  commitTransaction,
  abortTransaction,
} = require("../../../services/mongo");

const returnedBooksMongo = require("../../../models/returned-book/returned-books.schema");
const { checkDateGap } = require("../../../utils/functions");

const issueBookRouter = express.Router();

const verifyBookAccountAvailability = async (req, res, next) => {
  try {
    const bookAccount = await fetchBookAccountByAccountNumber(
      req.body.accountNumber
    );

    const { status, _id } = bookAccount;

    if (status != "available") {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Book Account is not available",
      });
    }

    req.body = { ...req.body, bookAccountId: _id };

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      status: "Book Account availability verification has failed.",
    });
  }
};

const verifyLibraryCardAvailability = async (req, res, next) => {
  try {
    const studentCard = await fetchLibraryCardByCardNumber(req.body.cardNumber);
    const { status, _id } = studentCard;

    if (status != "available") {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Library Card is not available",
      });
    }

    req.body = { ...req.body, libraryCardId: _id };

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      status: "Library Card availability verification has failed.",
    });
  }
};

const processBookIssuing = async (req, res, next) => {
  try {
    await issueNewBook(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      status: "Operation failed at processBookIssuing",
    });
  }
};

const processUpdateBookAccountStatus = async (req, res, next) => {
  try {
    await updateBookAccountStatus(req.body.bookAccountId, "issued");
    await updateLibraryCardStatus(req.body.libraryCardId, "issued");
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: null,
      status: "Operation failed at processUpdateBookAccountStatus",
    });
  }
};

issueBookRouter.post(
  "/issue-new-book",
  verifyBookAccountAvailability,
  verifyLibraryCardAvailability,
  processBookIssuing,
  processUpdateBookAccountStatus,
  async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        payload: null,
        status: "Book has been issued successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, data: null, status: "Unable to issue book" });
    }
  }
);

const fetchIssuedBookDetailsByBookAccountNumber = async (req, res, next) => {
  try {
    const bookAccountDoc = await fetchBookAccountByAccountNumber(
      req.body.accountNumber
    );

    if (bookAccountDoc != null) {
      if (bookAccountDoc.status != "available") {
        const issuedBookDoc = await fetchIssuedBookByBookAccountId(
          bookAccountDoc._id
        );

        const { cardNumber, studentId } = issuedBookDoc.libraryCardId;
        const { bookId } = issuedBookDoc.bookAccountId;
        req.body = {
          _id: issuedBookDoc._id,
          accountNumber: bookAccountDoc.accountNumber,
          ...bookId._doc,
          libraryCard: cardNumber,
          ...studentId._doc,
          issueDate: issuedBookDoc.issueDate,
        };

        return next();
      } else {
        return res.status(400).json({
          success: false,
          payload: null,
          status: "Book is not issued",
        });
      }
    }

    return res.status(400).json({
      success: false,
      payload: null,
      status: "Invalid Book Account Number",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      payload: null,
      status: "Error",
    });
  }
};

issueBookRouter.post(
  "/fetch-issued-book",
  fetchIssuedBookDetailsByBookAccountNumber,
  async (req, res) => {
    try {
      return res
        .status(200)
        .json({ success: true, payload: req.body, status: "Success" });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, payload: null, status: "Failed" });
    }
  }
);

issueBookRouter.post("/return-issued-book", async (req, res) => {
  try {
    const issuedBookDoc = await fetchIssuedBookDocById(req.body._id);

    if (issuedBookDoc == null) {
      return res
        .status(400)
        .json({ success: false, payload: null, status: "Invalid Issued Book" });
    }

    const returnDate = new Date();
    const dateGap = checkDateGap(issuedBookDoc._doc.issueDate, returnDate);
    let fine = 0;
    if (dateGap > 14) {
      fine = dateGap * 1;
    }

    delete issuedBookDoc._doc.__v;
    const returningBookDetails = {
      ...issuedBookDoc._doc,
      returnDate,
      fine,
    };

    await returnBook(returningBookDetails);

    await deleteIssuedBookDoc(issuedBookDoc._doc._id);

    await updateLibraryCardStatus(
      issuedBookDoc._doc.libraryCardId,
      "available"
    );

    await updateBookAccountStatus(
      issuedBookDoc._doc.bookAccountId,
      "available"
    );

    return res
      .status(200)
      .json({ success: true, payload: null, status: "Operation Successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, payload: null, status: "Operation Failed" });
  }
});

const processFetchAllIssuedBooks = async (req, res, next) => {
  try {
    const issuedBooksCol = await fetchAllIssuedBooks(req.body);
    const data = issuedBooksCol.map(
      ({ bookAccountId, libraryCardId, issueDate }) => {
        return {
          issueDate: issueDate.toDateString(),
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.studentId.name,
          rollNumber: libraryCardId.studentId.rollNumber,
          accountNumber: bookAccountId.accountNumber,
          bookTitle: bookAccountId.bookId.title,
        };
      }
    );
    req.issuedBooksCol = data;
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, payload: null, status: "Operation Failed" });
  }
};

issueBookRouter.post(
  "/fetch-all-issued-books",
  processFetchAllIssuedBooks,
  async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        payload: req.issuedBooksCol,
        status: "Operation Successful",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, payload: null, status: "Operation Failed" });
    }
  }
);

const processFetchAllReturnedBooks = async (req, res, next) => {
  try {
    const returnedBooksCol = await fetchAllReturnedBooks(req.body);
    const data = returnedBooksCol.map(
      ({ bookAccountId, libraryCardId, issueDate, returnDate, fine }) => {
        return {
          issueDate: issueDate.toDateString(),
          returnDate: returnDate.toDateString(),
          fine,
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.studentId.name,
          rollNumber: libraryCardId.studentId.rollNumber,
          accountNumber: bookAccountId.accountNumber,
          bookTitle: bookAccountId.bookId.title,
        };
      }
    );
    req.returnedBooksCol = data;
    return next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, payload: error, status: "Operation Failed" });
  }
};

issueBookRouter.post(
  "/fetch-all-returned-books",
  processFetchAllReturnedBooks,
  async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        payload: req.returnedBooksCol,
        status: "Operation Successful",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, payload: error, status: "Operation Failed" });
    }
  }
);

issueBookRouter.post("/issue-book-fine", async (req, res) => {
  try {
    const issuedBookDoc = await fetchIssuedBookDocById(req.body._id);

    if (issuedBookDoc == null) {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Invalid Issued Book",
      });
    }

    const dateGap = checkDateGap(issuedBookDoc._doc.issueDate, new Date());

    if (dateGap > 14) {
      return res.status(200).json({
        success: false,
        payload: dateGap,
        status: "Fine",
      });
    }

    return res.status(200).json({
      success: true,
      payload: null,
      status: "No Fine",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, payload: null, status: "Operation Failed" });
  }
});

module.exports = { issueBookRouter };
