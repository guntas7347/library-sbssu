const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  getBookAccessionByAccessionNumber,
  updateBookAccession,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  getLibraryCardByCardNumber,
  updateLibraryCardById,
  getLibraryCardById,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  getAuthAdminById,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const {
  createIssueBook,
  getIssuedBookByBookAccessionId,
  getIssuedBookById,
  getIssuedBooks,
} = require("../../../models/issue-book/issue-book.controllers");
const { createDateGap, checkDateGap } = require("../../../utils/functions");
const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");

const BOOK_RETURN_PERIOD_DAYS = 14;
const FINE_PER_DAY = 1;

const verifyBookAccessionAvailability = async (req, res, next) => {
  try {
    const bookAccession = await getBookAccessionByAccessionNumber(
      req.body.accessionNumber
    );
    if (bookAccession === null) return res.status(404).json();
    const { status, _id } = bookAccession;
    if (status != "available") return res.status(409).json(crs.MDW409VBAA());
    if (!req.cust) req.cust = {};
    req.cust.bookAccessionId = _id;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyLibraryCardAvailability = async (req, res, next) => {
  try {
    const studentCard = await getLibraryCardByCardNumber(req.body.cardNumber);
    if (studentCard === null) return res.status(404).json();
    const { status, _id } = studentCard;
    if (status != "available") return res.status(409).json(crs.MDW409VLCA());
    if (!req.cust) req.cust = {};
    req.cust.libraryCardId = _id;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const processIssuingBook = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const adminDoc = await getAuthAdminById(req.user.uid, "staffId -_id");
    const { bookAccessionId, libraryCardId } = req.cust;
    const issueBookDetails = {
      bookAccessionId,
      libraryCardId,
      issueDate: req.body.issueDate,
      issuedBy: adminDoc._doc.staffId,
    };
    await session.withTransaction(async () => {
      await updateBookAccession(bookAccessionId, { status: "issued" }, session);
      await updateLibraryCardById(libraryCardId, { status: "issued" }, session);
      await createIssueBook(issueBookDetails, session);
    });
    await session.commitTransaction();
    next();
  } catch (err) {
    console.log(err);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    session.endSession();
  }
};

const sendIssuedConfirmationEmail = async (req, res, next) => {
  try {
    const { accessionNumber, cardNumber, issueDate } = req.body;
    const bookDoc = await getBookAccessionByAccessionNumber(
      accessionNumber,
      true,
      "title author"
    );
    const libraryCardDoc = await getLibraryCardByCardNumber(
      cardNumber,
      true,
      "fullName email"
    );
    const reciepientEmail = libraryCardDoc._doc.studentId.email;
    const emailContent = {
      name: libraryCardDoc._doc.studentId.name,
      accessionNumber,
      issueDate: new Date(issueDate).toDateString(),
      dueDate: createDateGap(issueDate, 14).toDateString(),
      cardNumber,
      title: bookDoc._doc.title,
      author: bookDoc._doc.author,
    };
    // transporter.sendMail({
    //   from: "sandhugameswithjoy@gmail.com",
    //   to: "guntas7347@gmail.com",
    //   subject: "Confirmation: Book Issuance from SBSSU Central Library",
    //   html: generateEmailTemplate.issueBookConfirmation(emailContent),
    // });
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.MDW500SICE(err));
  }
};

const fetchIssuedBookByAccessionNumber = async (req, res, next) => {
  try {
    const bookAccessionDoc = await getBookAccessionByAccessionNumber(
      req.body.accessionNumber
    );

    if (bookAccessionDoc === null)
      return res.status(404).json(crs.MDW404FIBBAN());
    if (bookAccessionDoc.status === "available")
      return res.status(409).json(crs.MDW409FIBBAN());

    const issuedBookDoc = await getIssuedBookByBookAccessionId(
      bookAccessionDoc._id
    );

    const { cardNumber, studentId } = issuedBookDoc.libraryCardId;
    const { bookId } = issuedBookDoc.bookAccessionId;
    req.cust = {
      _id: issuedBookDoc._id,
      accessionNumber: bookAccessionDoc.accessionNumber,
      ...bookId._doc,
      libraryCard: cardNumber,
      ...studentId._doc,
      issueDate: issuedBookDoc.issueDate,
      issuedBy: issuedBookDoc._doc.issuedBy.fullName,
    };

    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchIssuedBookById = async (req, res, next) => {
  try {
    const issuedBook = await getIssuedBookById(req.body._id);
    if (issuedBook == null) return res.status(404).json(crs.MDW404FIBBI());
    if (!req.cust) req.cust = {};
    req.cust.issuedBook = issuedBook;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const calculateFine = async (req, res, next) => {
  try {
    const { issueDate } = req.cust.issuedBook._doc;
    let dateGap = checkDateGap(issueDate, new Date());
    dateGap -= BOOK_RETURN_PERIOD_DAYS;
    if (dateGap < 0) dateGap = 0;
    req.cust.fine = dateGap * FINE_PER_DAY;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchIssuedBooks = async (req, res, next) => {
  try {
    const issuedBooksCol = await getIssuedBooks({
      filter: req.query.filter,
      filterValue: req.query.filterValue,
      page: req.query.page || 1,
    });
    const data = issuedBooksCol.issuedBooksArray.map(
      ({ bookAccessionId, libraryCardId, issueDate, _id }) => {
        return {
          _id,
          issueDate: issueDate.toDateString(),
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.studentId.fullName,
          rollNumber: libraryCardId.studentId.rollNumber,
          accessionNumber: bookAccessionId.accessionNumber,
          bookTitle: bookAccessionId.bookId.title,
        };
      }
    );
    if (!req.cust) req.cust = {};
    req.cust.issuedBooks = {
      issuedBooksArray: data,
      totalPages: issuedBooksCol.totalPages,
    };
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchIssuedBookDocById = async (req, res, next) => {
  try {
    console.log(req.body);
    const returnedBookDoc = await getIssuedBookById(req.body._id, true);
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
      name: libraryCardId.studentId.fullName,
    };
    if (!req.cust) req.cust = {};
    req.cust.issuedBook = issuedBook;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  verifyBookAccessionAvailability,
  verifyLibraryCardAvailability,
  processIssuingBook,
  sendIssuedConfirmationEmail,
  fetchIssuedBookByAccessionNumber,
  fetchIssuedBookById,
  calculateFine,
  fetchIssuedBooks,
  fetchIssuedBookDocById,
};
