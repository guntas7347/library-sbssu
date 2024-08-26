const { default: mongoose } = require("mongoose");
const {
  getAuthAdminById,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const {
  updateBookAccession,
} = require("../../../models/book-accessions/book-accessions.controllers");
const { createFine } = require("../../../models/fines/fines.controllers");
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

const processReturningBook = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const issuedBook = req.cust.issuedBook._doc;
    const { libraryCardId, bookAccessionId } = issuedBook;
    const StaffDoc = await getAuthAdminById(req.user.uid, "staffId -_id");
    const returningBookDetails = {
      ...issuedBook,
      returnDate: new Date(),
      returnedBy: StaffDoc._doc.staffId,
    };
    let returnedBookDoc = null;
    await session.withTransaction(async () => {
      returnedBookDoc = await createReturnBook(returningBookDetails, session);
      const { studentId } = await getLibraryCardById(libraryCardId);
      if (req.cust.fine > 0) {
        const fineDoc = await createFine({
          returnedBookId: returnedBookDoc[0]._id,
          amount: req.cust.fine,
          category: "Late Fees",
          studentId,
        });

        updateReturnBookById(
          returnedBookDoc[0]._id,
          { fine: fineDoc[0]._id },
          session
        );
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
  } catch (err) {
    console.log(err);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    session.endSession();
  }
};

const sendReturnedConfirmationEmail = async (req, res, next) => {
  try {
    const returnedBookDoc = await getReturnedBookById(
      req.cust.returnedBookId,
      true
    );
    const { bookAccessionId, libraryCardId } = returnedBookDoc._doc;
    const { bookId } = bookAccessionId;
    const { studentId } = libraryCardId;
    const emailContent = {
      issueDate: new Date(returnedBookDoc._doc.issueDate).toDateString(),
      returnDate: new Date(returnedBookDoc._doc.returnDate).toDateString(),
      fine: "₹" + returnedBookDoc._doc.fine,
      name: studentId.fullName,
      title: bookId.title,
      author: bookId.author,
      cardNumber: libraryCardId.cardNumber,
      accessionNumber: bookAccessionId.accessionNumber,
    };

    // transporter.sendMail({
    //   from: "sandhugameswithjoy@gmail.com",
    //   to: "guntas7347@gmail.com",
    //   subject: "Confirmation: Book Return to SBSSU Central Library",
    //   html: generateEmailTemplate.createReturnBookConfirmation(emailContent),
    // });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.MDW500SRCE(err));
  }
};

const fetchReturnedBooks = async (req, res, next) => {
  try {
    const returnedBooksCol = await getReturnedBooks({
      filter: req.query.filter,
      filterValue: req.query.filterValue,
      page: req.query.page || 1,
    });
    const data = returnedBooksCol.returnedBooksArray.map((returnedBook) => {
      return {
        _id: returnedBook._id,
        issueDate: returnedBook.issueDate.toDateString(),
        returnDate: returnedBook.returnDate.toDateString(),
        fine: returnedBook.fine ? returnedBook.fine.amount : "Null",
        cardNumber: returnedBook.libraryCardId.cardNumber,
        studentName: returnedBook.libraryCardId.studentId.fullName,
        rollNumber: returnedBook.libraryCardId.studentId.rollNumber,
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
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchReturnedBookDocById = async (req, res, next) => {
  try {
    const returnedBookDoc = await getReturnedBookById(req.body._id, true);

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
      rollNumber: libraryCardId.studentId.fullName,
      name: libraryCardId.studentId.rollNumber,
      fine: returnedBookDoc._doc.fine
        ? returnedBookDoc._doc.fine.amount
        : "Null",
    };

    if (!req.cust) req.cust = {};
    req.cust.returnedBook = returnedBook;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  processReturningBook,
  sendReturnedConfirmationEmail,
  fetchReturnedBooks,
  fetchReturnedBookDocById,
};
