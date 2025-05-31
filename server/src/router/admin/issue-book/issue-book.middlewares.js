const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  updateBookAccession,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  updateLibraryCardById,
} = require("../../../models/library-cards/library-cards.controllers");

const {
  createIssueBook,
  getIssuedBookForReturning,
  getIssuedBooks,
  getIssuedBook,
} = require("../../../models/issue-book/issue-book.controllers");
const {
  createDateGap,
  checkDateGap,
  createLog,
  isIssueAllowed,
  getFinePerDay,
} = require("../../../utils/functions");
const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");
const Accession = require("../../../models/book-accessions/book-accessions.schema");
const LibraryCard = require("../../../models/library-cards/library-cards.schema");
const IssuedBook = require("../../../models/issue-book/issue-book.schema");
const Auth = require("../../../models/auth/auth.schema");
const Setting = require("../../../models/setting/setting.schema");

const verifyBookAccessionAvailability = async (req, res, next) => {
  try {
    const bookAccession = await Accession.findOne({
      accessionNumber: req.body.accessionNumber,
    })
      .select("status _id category")
      .lean();

    if (!bookAccession) return res.status(404).json();
    const { status, _id, category } = bookAccession;
    if (status != "AVAILABLE") return res.status(409).json(crs.MDW409VBAA());
    if (!req.cust) req.cust = {};
    req.cust.bookAccessionId = _id;
    req.cust.bookCategory = category;
    next();
  } catch (error) {
    createLog(error);

    return res.status(500).json(crs.SERR500REST(error));
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
    if (status != "AVAILABLE") return res.status(409).json(crs.MDW409VLCA());
    if (!req.cust) req.cust = {};
    req.cust.libraryCardId = _id;
    req.cust.cardCategory = category;

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const checkIssueCompatibility = async (req, res, next) => {
  try {
    const libraryCardCategory = req.cust.cardCategory;
    const BookCategory = req.cust.bookCategory;

    const { value } = await Setting.findOne({
      key: "ISSUE-COMPATIBILITY",
    }).lean();

    const allowedBookCategories = value[libraryCardCategory] || [];
    const allowed = allowedBookCategories.includes(BookCategory);

    if (allowed) return next();

    return res.status(401).json(crs.MDW401VBBB());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const processIssuingBook = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const adminDoc = await Auth.findById(req.user.uid)
      .select("staffId -_id")
      .lean();
    const { bookAccessionId, libraryCardId } = req.cust;

    const dueDate = createDateGap(req.body.issueDate, req.body.issueDuration);
    if (!req.cust) req.cust = {};
    req.cust.dueDate = dueDate;

    const issueBookDetails = {
      bookAccessionId,
      libraryCardId,
      issueDate: req.body.issueDate,
      issuedBy: adminDoc.staffId,
      dueDate,
    };
    await session.withTransaction(async () => {
      await updateBookAccession(bookAccessionId, { status: "ISSUED" }, session);
      await updateLibraryCardById(libraryCardId, { status: "ISSUED" }, session);
      await createIssueBook(issueBookDetails, session);
    });
    await session.commitTransaction();
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(error));
  } finally {
    session.endSession();
  }
};

const sendIssuedConfirmationEmail = async (req, res, next) => {
  try {
    const { accessionNumber, cardNumber, issueDate } = req.body;
    const bookDoc = await Accession.findOne({ accessionNumber })
      .populate("bookId")
      .lean();

    const Libdoc = await LibraryCard.findOne({
      cardNumber,
    })
      .populate("memberId", "category role fullName email")
      .lean();

    const emailContent = {
      name: Libdoc.memberId.fullName,
      accessionNumber,
      issueDate: new Date(issueDate).toDateString(),
      dueDate: req.cust.dueDate.toDateString(),
      cardNumber,
      title: bookDoc.bookId.title,
      author: bookDoc.bookId.author,
    };

    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: Libdoc.memberId.email,
      subject: "Confirmation: Book Issuance from SBSSU Central Library",
      html: generateEmailTemplate.issueBookConfirmation(emailContent),
    });
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.MDW500SICE(error));
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
    if (accessionDoc.status === "AVAILABLE")
      return res.status(409).json(crs.MDW409FIBBAN());

    const issuedBookDoc = await getIssuedBook({
      bookAccessionId: accessionDoc._id,
    });

    const { dueDate, issueDate } = issuedBookDoc;
    const issueDuration = checkDateGap(issueDate, dueDate);

    const { cardNumber, memberId } = issuedBookDoc.libraryCardId;
    const { bookId } = issuedBookDoc.bookAccessionId;
    const issuedBook = {
      _id: issuedBookDoc._id,
      accessionNumber: accessionDoc.accessionNumber,
      ...bookId,
      libraryCard: cardNumber,
      ...memberId,
      issueDate,
      dueDate,
      issueDuration,
      issuedBy: issuedBookDoc.issuedBy.fullName,
    };
    return res.status(200).json(crs.ISB200FIBBAN(issuedBook));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const fetchIssuedBookById = async (req, res, next) => {
  try {
    const issuedBookDoc = await getIssuedBookForReturning(req.body._id);
    if (!issuedBookDoc) return res.status(404).json(crs.MDW404FIBBI());
    if (!req.cust) req.cust = {};
    req.cust.issuedBook = issuedBookDoc;
    req.cust.role = issuedBookDoc.libraryCardId.memberId.role;
    req.cust.category = issuedBookDoc.libraryCardId.category;
    req.cust.cast = issuedBookDoc.libraryCardId.memberId.category;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const calculateFine = async (req, res, next) => {
  try {
    const returnDate = new Date();
    const { issueDate, dueDate, libraryCardId } = req.cust.issuedBook;
    let dateGap = checkDateGap(issueDate, returnDate);
    const issueDuration = checkDateGap(issueDate, dueDate);

    const FINE_PER_DAY = await getFinePerDay(
      libraryCardId.memberId.role,
      libraryCardId.memberId.category
    );

    dateGap -= issueDuration;
    if (dateGap < 0) dateGap = 0;
    req.cust.fine = dateGap * FINE_PER_DAY;
    req.cust.returnDate = returnDate;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
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
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
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
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
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
  checkIssueCompatibility,
  verifyIssuePermission,
};
