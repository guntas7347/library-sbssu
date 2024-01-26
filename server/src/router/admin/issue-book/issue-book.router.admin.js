const express = require("express");
const {
  fetchBookAccessionByAccessionNumber,
  updateBookAccessionStatus,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  fetchLibraryCardByCardNumber,
  fetchLibraryCardById,
  updateLibraryCardStatus,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  issueNewBook,
  fetchIssuedBookByBookAccessionId,
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
  fetchReturnedBookById,
} = require("../../../models/returned-book/returned-books.controllers.models");
const {
  startTransaction,
  commitTransaction,
  abortTransaction,
} = require("../../../services/mongo");

const returnedBooksMongo = require("../../../models/returned-book/returned-books.schema");
const { checkDateGap, createDateGap } = require("../../../utils/functions");
const mongoose = require("mongoose");
const {
  fetchAdminDocById,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");

const issueBookRouter = express.Router();

const verifyBookAccessionAvailability = async (req, res, next) => {
  try {
    const bookAccession = await fetchBookAccessionByAccessionNumber(
      req.body.accessionNumber
    );

    const { status, _id } = bookAccession;

    if (status != "available") {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Book Accession is not available",
      });
    }

    req.body = { ...req.body, bookAccessionId: _id };

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      status: "Book Accession availability verification has failed.",
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

issueBookRouter.post(
  "/issue-new-book",
  verifyBookAccessionAvailability,
  verifyLibraryCardAvailability,
  async (req, res) => {
    const session = await mongoose.startSession();
    try {
      const adminDoc = await fetchAdminDocById(req.user.uid, "staffId -_id");

      await session.withTransaction(async () => {
        await updateBookAccessionStatus(
          req.body.bookAccessionId,
          "issued",
          session
        );
        await updateLibraryCardStatus(
          req.body.libraryCardId,
          "issued",
          session
        );
        await issueNewBook(
          { ...req.body, issuedBy: adminDoc._doc.staffId },
          session
        );
      });

      const { accessionNumber, cardNumber, issueDate } = req.body;

      const bookDoc = await fetchBookAccessionByAccessionNumber(
        accessionNumber,
        true,
        "title author"
      );
      const { bookId } = bookDoc._doc;

      const libraryCardDoc = await fetchLibraryCardByCardNumber(
        cardNumber,
        true,
        "name email"
      );

      const reciepientEmail = libraryCardDoc._doc.studentId.email;

      const emailContent = {
        name: libraryCardDoc._doc.studentId.name,
        accessionNumber,
        issueDate: new Date(issueDate).toDateString(),
        dueDate: createDateGap(issueDate, 14).toDateString(),
        cardNumber,
        title: bookId.title,
        author: bookId.author,
      };

      // transporter.sendMail({
      //   from: "sandhugameswithjoy@gmail.com",
      //   to: "guntas7347@gmail.com",
      //   subject: "Confirmation: Book Issuance from SBSSU Central Library",
      //   html: generateEmailTemplate.issueBookConfirmation(emailContent),
      // });

      await session.commitTransaction();

      return res.status(200).json({
        success: true,
        payload: null,
        status: "Book has been issued successfully",
      });
    } catch (error) {
      console.log(error);
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      return res
        .status(400)
        .json({ success: false, data: null, status: "Unable to issue book" });
    } finally {
      session.endSession();
    }
  }
);

const fetchIssuedBookDetailsByBookAccessionNumber = async (req, res, next) => {
  try {
    const bookAccessionDoc = await fetchBookAccessionByAccessionNumber(
      req.body.accessionNumber
    );

    if (bookAccessionDoc != null) {
      if (bookAccessionDoc.status != "available") {
        const issuedBookDoc = await fetchIssuedBookByBookAccessionId(
          bookAccessionDoc._id
        );
        const { cardNumber, studentId } = issuedBookDoc.libraryCardId;
        const { bookId } = issuedBookDoc.bookAccessionId;
        req.body = {
          _id: issuedBookDoc._id,
          accessionNumber: bookAccessionDoc.accessionNumber,
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
      status: "Invalid Book Accession Number",
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
  "/fetch-issued-book-by-accession-number",
  fetchIssuedBookDetailsByBookAccessionNumber,
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
  const session = await mongoose.startSession();
  try {
    const issuedBookDoc = await fetchIssuedBookDocById(req.body._id, false);

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
    const adminDoc = await fetchAdminDocById(req.user.uid, "staffId -_id");
    const returningBookDetails = {
      ...issuedBookDoc._doc,
      returnDate,
      fine,
      returnedBy: adminDoc._doc.staffId,
    };

    let returnedBookDoc = null;

    await session.withTransaction(async () => {
      returnedBookDoc = await returnBook(returningBookDetails, session);
      await deleteIssuedBookDoc(issuedBookDoc._doc._id, session);
      await updateLibraryCardStatus(
        issuedBookDoc._doc.libraryCardId,
        "available",
        session
      );
      await updateBookAccessionStatus(
        issuedBookDoc._doc.bookAccessionId,
        "available",
        session
      );
    });

    returnedBookDoc = await fetchReturnedBookById(returnedBookDoc[0]._id);
    const { bookAccessionId, libraryCardId } = returnedBookDoc._doc;
    const { bookId } = bookAccessionId;
    const { studentId } = libraryCardId;
    const emailContent = {
      issueDate: new Date(returnedBookDoc._doc.issueDate).toDateString(),
      returnDate: new Date(returnedBookDoc._doc.returnDate).toDateString(),
      fine: "₹" + returnedBookDoc._doc.fine,
      name: studentId.name,
      title: bookId.title,
      author: bookId.author,
      cardNumber: libraryCardId.cardNumber,
      accessionNumber: bookAccessionId.accessionNumber,
    };

    await session.commitTransaction();

    // transporter.sendMail({
    //   from: "sandhugameswithjoy@gmail.com",
    //   to: "guntas7347@gmail.com",
    //   subject: "Confirmation: Book Return to SBSSU Central Library",
    //   html: generateEmailTemplate.returnBookConfirmation(emailContent),
    // });

    return res
      .status(200)
      .json({ success: true, payload: null, status: "Book has been Returned" });
  } catch (error) {
    console.log(error);

    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return res
      .status(400)
      .json({ success: false, payload: null, status: "Unable to Return Book" });
  } finally {
    session.endSession();
  }
});

const processFetchAllIssuedBooks = async (req, res, next) => {
  try {
    const issuedBooksCol = await fetchAllIssuedBooks(req.body);
    const data = issuedBooksCol.map(
      ({ bookAccessionId, libraryCardId, issueDate, _id }) => {
        return {
          _id,
          issueDate: issueDate.toDateString(),
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.studentId.name,
          rollNumber: libraryCardId.studentId.rollNumber,
          accessionNumber: bookAccessionId.accessionNumber,
          bookTitle: bookAccessionId.bookId.title,
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
      ({
        bookAccessionId,
        libraryCardId,
        issueDate,
        returnDate,
        fine,
        _id,
      }) => {
        return {
          _id,
          issueDate: issueDate.toDateString(),
          returnDate: returnDate.toDateString(),
          fine,
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.studentId.name,
          rollNumber: libraryCardId.studentId.rollNumber,
          accessionNumber: bookAccessionId.accessionNumber,
          bookTitle: bookAccessionId.bookId.title,
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

    let dateGap = checkDateGap(issuedBookDoc._doc.issueDate, new Date());

    if (dateGap > 14) {
      dateGap -= 14;
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

issueBookRouter.post("/fetch-returned-book", async (req, res) => {
  try {
    const returnedBookDoc = await fetchReturnedBookById(req.body._id);

    const { bookAccessionId, libraryCardId } = returnedBookDoc._doc;

    const issuer = returnedBookDoc._doc.issuedBy;
    const returner = returnedBookDoc._doc.returnedBy;

    const returnedBook = {
      accessionNumber: bookAccessionId.accessionNumber,
      title: bookAccessionId.bookId.title,
      author: bookAccessionId.bookId.author,
      cardNumber: libraryCardId.cardNumber,
      issueDate: returnedBookDoc._doc.issueDate,
      issuedBy: issuer.fullName + " " + "|" + " " + issuer.idNumber,
      returnDate: returnedBookDoc._doc.returnDate,
      returnedBy: returner.fullName + " " + "|" + " " + returner.idNumber,
      rollNumber: libraryCardId.studentId.name,
      name: libraryCardId.studentId.rollNumber,
      fine: returnedBookDoc._doc.fine,
    };

    return res.status(200).json({
      payload: returnedBook,
      status: "Operation Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ payload: null, status: "Operation Failed" });
  }
});

issueBookRouter.post("/fetch-issued-book", async (req, res) => {
  try {
    const returnedBookDoc = await fetchIssuedBookDocById(req.body._id);

    const { bookAccessionId, libraryCardId } = returnedBookDoc._doc;

    const issuer = returnedBookDoc._doc.issuedBy;

    const issuedBook = {
      accessionNumber: bookAccessionId.accessionNumber,
      title: bookAccessionId.bookId.title,
      author: bookAccessionId.bookId.author,
      cardNumber: libraryCardId.cardNumber,
      issueDate: returnedBookDoc._doc.issueDate,
      issuedBy: issuer.fullName + " " + "|" + " " + issuer.idNumber,
      rollNumber: libraryCardId.studentId.rollNumber,
      name: libraryCardId.studentId.name,
    };

    return res.status(200).json({
      payload: issuedBook,
      status: "Operation Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ payload: null, status: "Operation Failed" });
  }
});

module.exports = { issueBookRouter };
