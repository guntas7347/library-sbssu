const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  getBookAccessionByAccessionNumber,
  updateBookAccession,
  getAccession,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  getLibraryCardByCardNumber,
  updateLibraryCardById,
  getLibraryCard,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  getAuthAdminById,
} = require("../../../models/auth/aduth_admin.controllers");
const {
  createIssueBook,
  getIssuedBookById,
  getIssuedBooks,
  getIssuedBook,
} = require("../../../models/issue-book/issue-book.controllers");
const {
  createDateGap,
  checkDateGap,
  getBookReturnPeriodDays,
  createLog,
  isIssueAllowed,
} = require("../../../utils/functions");
const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");
const Accession = require("../../../models/book-accessions/book-accessions.schema");
const LibraryCard = require("../../../models/library-cards/library-cards.schema");
const IssuedBook = require("../../../models/issue-book/issue-book.schema");
const Auth = require("../../../models/auth/auth.schema");

const FINE_PER_DAY = 1;

const verifyBookAccessionAvailability = async (req, res, next) => {
  try {
    const bookAccession = await Accession.findOne({
      accessionNumber: req.body.accessionNumber,
    })
      .select("status _id category")
      .lean();

    if (!bookAccession) return res.status(404).json();
    const { status, _id, category } = bookAccession;
    if (status != "available") return res.status(409).json(crs.MDW409VBAA());
    if (!req.cust) req.cust = {};
    req.cust.bookAccessionId = _id;
    req.cust.bookCategory = category;
    next();
  } catch (err) {
    createLog(err);

    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyLibraryCardAvailability = async (req, res, next) => {
  try {
    const card = await LibraryCard.findOne({
      cardNumber: req.body.cardNumber,
    })
      .select("status _id category")
      .lean();

    if (!card) return res.status(404).json();
    const { status, _id, category } = card;
    if (status != "available") return res.status(409).json(crs.MDW409VLCA());
    if (!req.cust) req.cust = {};
    req.cust.libraryCardId = _id;
    req.cust.cardCategory = category;

    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyBookBank = async (req, res, next) => {
  try {
    if (
      (req.cust.cardCategory === "BOOK BANK" &&
        req.cust.bookCategory === "BOOK BANK") ||
      (req.cust.cardCategory !== "BOOK BANK" &&
        req.cust.bookCategory !== "BOOK BANK")
    )
      return next();
    else return res.status(401).json(crs.MDW401VBBB());
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const processIssuingBook = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const adminDoc = await Auth.findById(req.user.uid)
      .select("staffId -_id")
      .lean();
    const { bookAccessionId, libraryCardId } = req.cust;
    const issueBookDetails = {
      bookAccessionId,
      libraryCardId,
      issueDate: req.body.issueDate,
      issuedBy: adminDoc.staffId,
    };
    await session.withTransaction(async () => {
      await updateBookAccession(bookAccessionId, { status: "issued" }, session);
      await updateLibraryCardById(libraryCardId, { status: "issued" }, session);
      await createIssueBook(issueBookDetails, session);
    });
    await session.commitTransaction();
    next();
  } catch (err) {
    createLog(err);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    session.endSession();
  }
};

const sendIssuedConfirmationEmail = async (req, res, next) => {
  try {
    const { accessionNumber, cardNumber, issueDate } = req.body;
    const bookDoc = await Accession.findOne({ accessionNumber })
      .populate({
        path: "bookId",
      })
      .lean();

    const Libdoc = await LibraryCard.findOne({
      cardNumber,
    })
      .populate({
        path: "memberId",
        select: "category role fullName email",
      })
      .lean();

    const BOOK_RETURN_PERIOD_DAYS = await getBookReturnPeriodDays(
      Libdoc.memberId.role,
      Libdoc.memberId.category,
      bookDoc.category
    );

    const emailContent = {
      name: Libdoc.memberId.fullName,
      accessionNumber,
      issueDate: new Date(issueDate).toDateString(),
      dueDate: createDateGap(issueDate, BOOK_RETURN_PERIOD_DAYS).toDateString(),
      cardNumber,
      title: bookDoc.bookId.title,
      author: bookDoc.bookId.author,
    };

    transporter.sendMail({
      from: "librarysbssu@gmail.com",
      to: Libdoc.memberId.email,
      subject: "Confirmation: Book Issuance from SBSSU Central Library",
      html: generateEmailTemplate.issueBookConfirmation(emailContent),
    });
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.MDW500SICE(err));
  }
};

const fetchIssuedBookByAccessionNumber = async (req, res) => {
  try {
    const accessionDoc = await Accession.findOne({
      accessionNumber: req.body.accessionNumber,
    })
      .select("_id accessionNumber status")
      .lean();

    if (!accessionDoc) return res.status(404).json(crs.MDW404FIBBAN());
    if (accessionDoc.status === "available")
      return res.status(409).json(crs.MDW409FIBBAN());

    const issuedBookDoc = await getIssuedBook({
      bookAccessionId: accessionDoc._id,
    });

    const { cardNumber, memberId } = issuedBookDoc.libraryCardId;

    const { bookId } = issuedBookDoc.bookAccessionId;
    const issuedBook = {
      _id: issuedBookDoc._id,
      accessionNumber: accessionDoc.accessionNumber,
      ...bookId,
      libraryCard: cardNumber,
      ...memberId,
      issueDate: issuedBookDoc.issueDate,
      issuedBy: issuedBookDoc.issuedBy.fullName,
    };
    return res.status(200).json(crs.ISB200FIBBAN(issuedBook));
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchIssuedBookById = async (req, res, next) => {
  try {
    const issuedBook = await getIssuedBookById(req.body._id);
    if (issuedBook == null) return res.status(404).json(crs.MDW404FIBBI());
    const issuedBookDoc = await getIssuedBookById(req.body._id, true);
    if (!req.cust) req.cust = {};
    req.cust.issuedBook = issuedBook;
    req.cust.role = issuedBookDoc.libraryCardId.memberId.role;
    req.cust.category = issuedBookDoc.libraryCardId.category;
    req.cust.cast = issuedBookDoc.libraryCardId.memberId.category;
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const calculateFine = async (req, res, next) => {
  try {
    const returnDate = new Date();
    const { issueDate } = req.cust.issuedBook._doc;
    let dateGap = checkDateGap(issueDate, returnDate);
    const BOOK_RETURN_PERIOD_DAYS = await getBookReturnPeriodDays(
      req.cust.role,
      req.cust.cast,
      req.cust.category
    );
    console.log(BOOK_RETURN_PERIOD_DAYS);
    dateGap -= BOOK_RETURN_PERIOD_DAYS;
    if (dateGap < 0) dateGap = 0;
    req.cust.fine = dateGap * FINE_PER_DAY;
    req.cust.returnDate = returnDate;
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyIssuePermission = async (req, res, next) => {
  try {
    const doc = await LibraryCard.findOne({ cardNumber: req.body.cardNumber })
      .populate({
        path: "memberId",
        select: "category role",
      })
      .lean();
    const permission = await isIssueAllowed(
      doc.memberId.role,
      doc.memberId.category
    );
    if (permission) return next();
    else return res.status(403).json(crs.ISB403PD());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const fetchIssuedBooks = async (req, res, next) => {
  try {
    const issuedBooksCol = await getIssuedBooks({
      filter: req.body.name,
      filterValue: req.body.value,
      page: req.body.page || 1,
    });

    const data = issuedBooksCol.issuedBooksArray.map(
      ({ bookAccessionId, libraryCardId, issueDate, _id }) => {
        return {
          _id,
          issueDate: issueDate.toDateString(),
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.memberId.fullName,
          rollNumber: libraryCardId.memberId.rollNumber,
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
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchIssuedBookDocById = async (req, res, next) => {
  try {
    const returnedBookDoc = await IssuedBook.findById(req.body._id)
      .populate({
        path: "bookAccessionId",
        select: "accessionNumber -_id",
        populate: { path: "bookId", select: "title author -_id" },
      })
      .populate({
        path: "libraryCardId",
        select: "cardNumber -_id",

        populate: { path: "memberId", select: "membershipId fullName -_id" },
      })
      .populate({ path: "issuedBy", select: "idNumber fullName -_id" })
      .lean();

    const { bookAccessionId, libraryCardId } = returnedBookDoc;
    const issuer = returnedBookDoc.issuedBy;
    const issuedBook = {
      accessionNumber: bookAccessionId.accessionNumber,
      title: bookAccessionId.bookId.title,
      author: bookAccessionId.bookId.author,
      cardNumber: libraryCardId.cardNumber,
      issueDate: returnedBookDoc.issueDate,
      issuedBy: issuer.fullName + " " + "|" + " " + issuer.idNumber,
      rollNumber: libraryCardId.memberId.membershipId,
      fullName: libraryCardId.memberId.fullName,
      remark: bookAccessionId.issueRemark,
    };

    return res.status(200).json(crs.ISB200FIB(issuedBook));
  } catch (err) {
    createLog(err);
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
  verifyBookBank,
  verifyIssuePermission,
};
