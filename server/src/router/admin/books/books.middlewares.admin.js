const mongoose = require("mongoose");
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
const Book = require("../../../models/books/books.schema");
const { createLog } = require("../../../utils/functions");

const createBook = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { accessionNumbers, category } = req.body.book;
    delete req.body.book.accessionNumbers;
    await session.withTransaction(async () => {
      const [{ _id: bookId }] = await Book.create([req.body.book], {
        session,
      });

      for (const accessionNumber of accessionNumbers) {
        const [{ _id: accessionId }] = await Accession.create(
          [{ bookId, accessionNumber, category }],
          {
            session,
          }
        );
        await Book.findByIdAndUpdate(
          bookId,
          { $push: { accessionNumbers: accessionId } },
          { session }
        );
      }
    });
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(200).json(crs.SERR500REST(error));
  } finally {
    await session.endSession();
  }
};

const createAccession = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { accessionNumbers, category, _id: bookId } = req.body;
    await session.withTransaction(async () => {
      for (const accessionNumber of accessionNumbers) {
        const [{ _id: accessionId }] = await Accession.create(
          [{ bookId, accessionNumber, category }],
          {
            session,
          }
        );
        await Book.findByIdAndUpdate(
          bookId,
          { $push: { accessionNumbers: accessionId } },
          { session }
        );
      }
    });
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    if (error.code === 11000) return res.status(200).json(crs.BKS409ABA(error));
    return res.status(200).json(crs.SERR500REST(error));
  } finally {
    await session.endSession();
  }
};

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
  } catch (error) {
    return res.status(500).json(crs.SERR500REST());
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
  } catch (error) {
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const fetchBookForIssue = async (req, res, next) => {
  try {
    const d = await Accession.findOne({
      accessionNumber: req.body.accessionNumber,
    })
      .populate("bookId", "title author -_id")
      .select("accessionNumber status category -_id")
      .lean();

    if (!d) return res.status(404).json(crs.MDW404FBBAN());
    if (!req.cust) req.cust = {};
    req.cust.book = {
      ...d,
      ...d.bookId,
    };
    delete req.cust.book.bookId;

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const verifyAccessionNumberAvailability = async (req, res, next) => {
  try {
    const bookAccessionDoc = await getAccession({
      accessionNumber: req.body.accessionNumber,
    });
    if (bookAccessionDoc) return res.status(404).json(crs.BKS409ABA());
    next();
  } catch (error) {
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const checkAccessionsAvailability = async (req, res, next) => {
  try {
    const { accessionNumbers } = req.body.book;
    for (const accessionNumber of accessionNumbers) {
      const doc = await Accession.findOne({ accessionNumber }).lean();
      if (doc) return res.status(404).json(crs.BKS409ABA());
    }
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const verifyIsbnAvailability = async (req, res, next) => {
  try {
    const isbn = await getBook({ isbn: req.body.isbn });
    if (isbn && isbn.isbn) return res.status(409).json(crs.BKS409ANB());
    next();
  } catch (error) {
    return res.status(500).json(crs.SERR500REST(error));
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
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(200).json(crs.SERR500REST(error));
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
  createBook,
  checkAccessionsAvailability,
  createAccession,
};
