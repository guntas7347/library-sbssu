const express = require("express");
const {
  addBookAccessionToBook,
  getBookByIsbn,
  getBooks,
  getBookById,
  createBook,
  updateBookById,
} = require("../../../models/books/books.controllers");
const {
  createBookAccession,
  countBookAccessionDocs,
} = require("../../../models/book-accessions/book-accessions.controllers");
const { formatObjectValues } = require("../../../utils/functions");
const crs = require("../../../utils/custom-response-codes");
const {
  fetchBookByIsbn,
  fetchBookAccByAccNum,
  verifyAccessionNumberAvailability,
  verifyIsbnAvailability,
  verifyIsbnExistance,
} = require("./books.middlewares.admin");
const { default: mongoose } = require("mongoose");
const { issueBookRouter } = require("../issue-book/issue-book.router.admin");
const { returnBookRouter } = require("../return-book/return-book.router.admin");
const { authorisationLevel } = require("../../auth/auth.middlewares");

const booksRouter = express.Router();

booksRouter.post(
  "/add-new-book",
  authorisationLevel(4),
  verifyIsbnAvailability,
  async (req, res) => {
    try {
      const formatedData = formatObjectValues(req.body);
      await createBook(formatedData);
      return res.status(200).json(crs.BKS200ANB());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/fetch-all-books",
  authorisationLevel(2),
  async (req, res) => {
    try {
      console.log(req.query);
      const booksArray = await getBooks({
        filter: req.query.filter,
        filterValue: req.query.filterValue,
        page: req.query.page || 1,
      });

      return res.status(200).json(crs.BKS200FAB(booksArray));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/fetch-book-by-id",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const bookDoc = await getBookById(req.body._id, true);
      if (bookDoc == null) return res.status(404).json(crs.BKS404FBDBI());
      return res.status(200).json(crs.BKS200FBDBI(bookDoc));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/fetch-book-by-isbn",
  authorisationLevel(4),
  fetchBookByIsbn,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BKS200FBBI(req.cust.bookDoc));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/add-book-accession",
  authorisationLevel(4),
  verifyAccessionNumberAvailability,
  fetchBookByIsbn,
  async (req, res) => {
    const session = await mongoose.startSession();
    try {
      const { bookDoc } = req.cust;
      await session.withTransaction(async () => {
        const bookAccessionDoc = await createBookAccession(
          {
            accessionNumber: req.body.accessionNumber,
            bookId: bookDoc._id,
          },
          session
        );
        await addBookAccessionToBook(
          bookDoc._id,
          bookAccessionDoc[0]._id,
          session
        );
      });
      await session.commitTransaction();
      return res.status(200).json(crs.BKS200ABA());
    } catch (err) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(200).json(crs.SERR500REST(err));
    } finally {
      await session.endSession();
    }
  }
);

booksRouter.post(
  "/fetch-book-by-accession-number",
  authorisationLevel(1),
  fetchBookAccByAccNum,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BKS200FBBAN(req.cust.bookAccessionDoc));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post("/count-book-accessions", async (req, res) => {
  try {
    const numberOfBookAccessions = await countBookAccessionDocs();
    return res.status(200).json(crs.BKS200CTBA(numberOfBookAccessions));
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

booksRouter.post(
  "/edit-existing-book",
  authorisationLevel(4),
  async (req, res) => {
    try {
      const bookDoc = await getBookByIsbn(req.body.isbn);
      if (bookDoc !== null) {
        const { isbn } = await getBookById(req.body._id, true);
        if (bookDoc._doc.isbn !== isbn)
          return res.status(409).json(crs.BKS409ANB());
      }
      await updateBookById(req.body._id, req.body);
      return res.status(200).json(crs.BKS200EB());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/quick-add",
  authorisationLevel(1),
  verifyAccessionNumberAvailability,
  verifyIsbnExistance,
  async (req, res) => {
    const session = await mongoose.startSession();

    try {
      const formatedData = formatObjectValues(req.body);

      await session.withTransaction(async () => {
        const bookDoc = await createBook(formatedData, session);
        const bookAccessionDoc = await createBookAccession(
          { accessionNumber: req.body.accessionNumber, bookId: bookDoc[0]._id },
          session
        );
        const a = await addBookAccessionToBook(
          bookDoc[0]._id,
          bookAccessionDoc[0]._id,
          session
        );
        console.log(a);
      });
      await session.commitTransaction();
      return res.status(200).json(crs.BKS200ABA());
    } catch (err) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(200).json(crs.SERR500REST(err));
    } finally {
      await session.endSession();
    }
  }
);

booksRouter.use("/issue-books", issueBookRouter);
booksRouter.use("/return-books", returnBookRouter);

module.exports = { booksRouter };
