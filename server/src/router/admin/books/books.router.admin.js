const express = require("express");
const {
  addBookAccessionToBook,
  getBookByIsbn,
  getBooks,
  getBookById,
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
  verifyAccessionNumberAvailability,
  verifyIsbnAvailability,
  verifyIsbnExistance,
  fetchBookForIssue,
  createBook,
  checkAccessionsAvailability,
  createAccession,
} = require("./books.middlewares.admin");
const { default: mongoose } = require("mongoose");
const { issueBookRouter } = require("../issue-book/issue-book.router.admin");
const { returnBookRouter } = require("../return-book/return-book.router.admin");
const { authorisationLevel } = require("../../auth/auth.middlewares");
const {
  validateAccessionNumber,
  validateBook,
  validate_books_accession_create,
} = require("./books.validator");
const Accession = require("../../../models/book-accessions/book-accessions.schema");

const booksRouter = express.Router();

booksRouter.post(
  "/create",
  authorisationLevel(4),
  validateBook,
  checkAccessionsAvailability,
  createBook,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BKS200ANB());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/fetch/add-accession",
  authorisationLevel(4),
  validateAccessionNumber,
  async (req, res) => {
    try {
      const d = await Accession.findOne({
        accessionNumber: req.body.accessionNumber,
      })
        .populate({
          path: "bookId",
          select: "title author accessionNumbers",
          populate: {
            path: "accessionNumbers",
            select: "accessionNumber -_id",
          },
        })
        .select("bookId -_id")
        .lean();

      if (!d) return res.status(200).json(crs.MDW404FIBBAN());

      const createAccessionNumbersString = (array = []) => {
        let string = "";
        let isFirst = true;
        array.forEach((element) => {
          if (isFirst) {
            string += `(${array.length}) ` + element.accessionNumber;
            isFirst = false;
          } else {
            string += ", " + element.accessionNumber;
          }
        });
        return string;
      };

      d.bookId.accessionNumbers = createAccessionNumbersString(
        d.bookId.accessionNumbers
      );

      return res.status(200).json(crs.BKS200FBBI(d.bookId));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

booksRouter.post(
  "/accession/create",
  authorisationLevel(2),
  validate_books_accession_create,
  createAccession,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BKS200ABA());
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
      const booksArray = await getBooks({
        filter: req.body.name,
        filterValue: req.body.value,
        page: req.body.page || 1,
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
  "/fetch-for-issue",
  authorisationLevel(1),
  validateAccessionNumber,
  fetchBookForIssue,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BKS200FBBAN(req.cust.book));
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
    createLog(err);
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
