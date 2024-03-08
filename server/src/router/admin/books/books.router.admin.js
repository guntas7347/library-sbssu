const express = require("express");
const {
  addBookAccessionToBook,
  getBookByIsbn,
  findBooks,
  getBookById,
  createBook,
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
} = require("./books.middlewares.admin");
const { default: mongoose } = require("mongoose");
const { issueBookRouter } = require("../issue-book/issue-book.router.admin");
const { returnBookRouter } = require("../return-book/return-book.router.admin");

const booksRouter = express.Router();

booksRouter.post("/add-new-book", async (req, res) => {
  try {
    const isbn = await getBookByIsbn(req.body.isbn);
    if (isbn !== null) return res.status(409).json(crs.BKS409ANB());
    const formatedData = formatObjectValues(req.body);
    await createBook(formatedData);
    return res.status(200).json(crs.BKS200ANB());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

booksRouter.post("/fetch-all-books", async (req, res) => {
  try {
    const booksArray = await findBooks(
      req.body,
      "title author placeAndPublishers publicationYear accessionNumbers",
      100,
      true,
      "accessionNumber -_id"
    );
    return res.status(200).json(crs.BKS200FAB(booksArray));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

booksRouter.post("/fetch-book-by-id", async (req, res) => {
  try {
    const bookDoc = await getBookById(req.body._id, true);
    if (bookDoc == null) return res.status(404).json(crs.BKS404FBDBI());
    return res.status(200).json(crs.BKS200FBDBI(bookDoc));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

booksRouter.post("/fetch-book-by-isbn", fetchBookByIsbn, async (req, res) => {
  try {
    return res.status(200).json(crs.BKS200FBBI(req.cust.bookDoc));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

booksRouter.post(
  "/add-book-accession",
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
  fetchBookAccByAccNum,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BKS200FBBAN(req.cust.bookAccessionDoc));
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post("/count-book-accessions", async (req, res) => {
  try {
    const numberOfBookAccessions = await countBookAccessionDocs();
    return res.status(200).json(crs.BKS200CTBA(numberOfBookAccessions));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

booksRouter.use("/issue-books", issueBookRouter);
booksRouter.use("/return-books", returnBookRouter);

module.exports = { booksRouter };
