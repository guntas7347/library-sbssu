const { default: mongoose } = require("mongoose");
const {
  getBookAccessionByAccessionNumber,
  getAccession,
  createBookAccession,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  getBookByIsbn,
  getBook,
  addBookAccessionToBook,
} = require("../../../models/books/books.controllers");
const crs = require("../../../utils/custom-response-codes");
const Accession = require("../../../models/book-accessions/book-accessions.schema");

const fetchBookByIsbn = async (req, res, next) => {
  try {
    if (req.body.isbn === "") return res.status(404).json(crs.MDW404FBBI());
    const bookDoc = await getBookByIsbn(
      req.body.isbn,
      "isbn title author publicationYear cost"
    );
    if (bookDoc === null) return res.status(404).json(crs.MDW404FBBI());
    if (!req.cust) req.cust = {};
    req.cust.bookDoc = bookDoc;
    next();
  } catch (err) {
    return res
      .status(500)
      .json(crs.SERR500REST({ err, path: "middleware_fetchBookByIsbn" }));
  }
};

const fetchBookAccByAccNum = async (req, res, next) => {
  try {
    const bookAccessionDoc = await getBookAccessionByAccessionNumber(
      req.body.accessionNumber,
      true
    );
    if (bookAccessionDoc === null)
      return res.status(404).json(crs.MDW404FBBAN());
    if (!req.cust) req.cust = {};
    req.cust.bookAccessionDoc = bookAccessionDoc;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchBookForIssue = async (req, res, next) => {
  try {
    const d = await Accession.findOne({
      accessionNumber: req.body.accessionNumber,
    })
      .populate("bookId", "title author -_id")
      .select("accessionNumber status -_id")
      .lean();

    if (!d) return res.status(404).json(crs.MDW404FBBAN());
    if (!req.cust) req.cust = {};
    req.cust.book = {
      accessionNumber: d.accessionNumber,
      status: d.status,
      title: d.bookId.title,
      author: d.bookId.author,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyAccessionNumberAvailability = async (req, res, next) => {
  try {
    const bookAccessionDoc = await getAccession({
      accessionNumber: req.body.accessionNumber,
    });
    if (bookAccessionDoc) return res.status(404).json(crs.BKS409ABA());
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyIsbnAvailability = async (req, res, next) => {
  try {
    const isbn = await getBook({ isbn: req.body.isbn });
    if (isbn && isbn.isbn) return res.status(409).json(crs.BKS409ANB());
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyIsbnExistance = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const isbn = await getBook({ isbn: req.body.isbn });
    if (isbn && isbn.isbn) {
      await session.withTransaction(async () => {
        const bookAccessionDoc = await createBookAccession(
          { accessionNumber: req.body.accessionNumber, bookId: isbn._id },
          session
        );
        await addBookAccessionToBook(
          isbn._id,
          bookAccessionDoc[0]._id,
          session
        );
      });
      await session.commitTransaction();
      return res.status(200).json(crs.BKS200ABA());
    }
    next();
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(200).json(crs.SERR500REST(err));
  } finally {
    await session.endSession();
  }
};

module.exports = {
  fetchBookByIsbn,
  fetchBookAccByAccNum,
  verifyAccessionNumberAvailability,
  verifyIsbnAvailability,
  verifyIsbnExistance,
  fetchBookForIssue,
};
