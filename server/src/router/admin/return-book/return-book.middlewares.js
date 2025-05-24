const { default: mongoose } = require("mongoose");
const {
  getAuthAdminById,
} = require("../../../models/auth/aduth_admin.controllers");
const {
  updateBookAccession,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  deleteIssuedBook,
} = require("../../../models/issue-book/issue-book.controllers");
const {
  updateLibraryCardById,
  getLibraryCardById,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  updateReturnBookById,
  createReturnBook,
  getReturnedBookById,
  getReturnedBooks,
} = require("../../../models/returned-book/returned-books.controllers.models");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const {
  createReturnFine,
  addTransaction,
} = require("../../../models/transaction/transaction.controllers");
const ReturnedBook = require("../../../models/returned-book/returned-books.schema");
const { createLog } = require("../../../utils/functions");

const processReturningBook = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const issuedBook = req.cust.issuedBook;
    const { libraryCardId, bookAccessionId } = issuedBook;
    const StaffDoc = await getAuthAdminById(req.user.uid, "staffId -_id");
    const returningBookDetails = {
      ...issuedBook,
      returnDate: req.cust.returnDate,
      returnedBy: StaffDoc.staffId,
    };
    let returnedBookDoc = null;
    await session.withTransaction(async () => {
      returnedBookDoc = await createReturnBook(returningBookDetails, session);
      const { memberId } = await getLibraryCardById(libraryCardId);
      if (req.cust.fine > 0) {
        const fineDoc = await createReturnFine(
          {
            memberId,
            returnedBookId: returnedBookDoc[0]._id,
            amount: req.cust.fine,
          },
          session
        );

        updateReturnBookById(
          returnedBookDoc[0]._id,
          { fine: fineDoc[0]._id },
          session
        );
        req.cust.transactionId = fineDoc[0]._id;
      }

      await deleteIssuedBook(issuedBook._id, session);
      await updateLibraryCardById(
        libraryCardId,
        { status: "available" },
        session
      );
      await updateBookAccession(
        bookAccessionId,
        { status: "available" },
        session
      );
    });
    req.cust.returnedBookId = returnedBookDoc[0]._id;
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(error));
  } finally {
    session.endSession();
  }
};

const sendReturnedConfirmationEmail = async (req, res, next) => {
  try {
    const returnedBookDoc = await getReturnedBookById(req.cust.returnedBookId);
    const { bookAccessionId, libraryCardId } = returnedBookDoc._doc;
    const { bookId } = bookAccessionId;
    const { memberId } = libraryCardId;

    const fine = returnedBookDoc._doc.fine?.amount
      ? returnedBookDoc._doc.fine?.amount
      : "NULL";

    const emailContent = {
      issueDate: new Date(returnedBookDoc._doc.issueDate).toDateString(),
      returnDate: new Date(returnedBookDoc._doc.returnDate).toDateString(),
      fine: "₹" + fine,
      name: memberId.fullName,
      title: bookId.title,
      author: bookId.author,
      cardNumber: libraryCardId.cardNumber,
      accessionNumber: bookAccessionId.accessionNumber,
    };

    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: memberId.email,
      subject: "Confirmation: Book Return to SBSSU Central Library",
      html: generateEmailTemplate.returnBookConfirmation(emailContent),
    });

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.MDW500SRCE(error));
  }
};

const fetchReturnedBooks = async (req, res, next) => {
  try {
    const returnedBooksCol = await getReturnedBooks({
      filter: req.body.name,
      filterValue: req.body.value,
      page: req.body.page || 1,
    });
    const data = returnedBooksCol.returnedBooksArray.map((returnedBook) => {
      return {
        _id: returnedBook._id,
        issueDate: returnedBook.issueDate.toDateString(),
        returnDate: returnedBook.returnDate.toDateString(),
        fine: returnedBook.fine ? returnedBook.fine.amount : "None",
        cardNumber: returnedBook.libraryCardId.cardNumber,
        studentName: returnedBook.libraryCardId.memberId.fullName,
        rollNumber: returnedBook.libraryCardId.memberId.rollNumber,
        accessionNumber: returnedBook.bookAccessionId.accessionNumber,
        bookTitle: returnedBook.bookAccessionId.bookId.title,
      };
    });
    if (!req.cust) req.cust = {};
    req.cust.returnedBooks = {
      returnedBooksArray: data,
      totalPages: returnedBooksCol.totalPages,
    };
    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const fetchReturnedBookDocById = async (req, res, next) => {
  try {
    const returnedBookDoc = await ReturnedBook.findById(req.body._id)
      .populate({
        path: "bookAccessionId",
        select: "accessionNumber -_id",
        populate: { path: "bookId", select: "title author -_id" },
      })
      .populate({
        path: "libraryCardId",
        select: "cardNumber -_id",
        populate: {
          path: "memberId",
          select: "membershipId fullName -_id",
        },
      })
      .populate({ path: "issuedBy", select: "idNumber fullName -_id" })
      .populate({ path: "returnedBy", select: "idNumber fullName -_id" })
      .populate({ path: "fine", select: "amount -_id" })
      .select("issueDate returnDate -_id")
      .lean();

    const { bookAccessionId, libraryCardId } = returnedBookDoc;

    const issuer = returnedBookDoc.issuedBy;
    const returner = returnedBookDoc.returnedBy;

    const returnedBook = {
      accessionNumber: bookAccessionId.accessionNumber,
      title: bookAccessionId.bookId.title,
      author: bookAccessionId.bookId.author,
      cardNumber: libraryCardId.cardNumber,
      issueDate: returnedBookDoc.issueDate,
      issuedBy: issuer.fullName + " " + "|" + " " + issuer.idNumber,
      returnDate: returnedBookDoc.returnDate,
      returnedBy: returner.fullName + " " + "|" + " " + returner.idNumber,
      rollNumber: libraryCardId.memberId.membershipId,
      fullName: libraryCardId.memberId.fullName,
      fine: returnedBookDoc.fine ? returnedBookDoc.fine.amount : "Null",
    };

    if (!req.cust) req.cust = {};
    req.cust.returnedBook = returnedBook;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = {
  processReturningBook,
  sendReturnedConfirmationEmail,
  fetchReturnedBooks,
  fetchReturnedBookDocById,
};
