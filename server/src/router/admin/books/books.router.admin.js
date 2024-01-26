const express = require("express");
const {
  addNewBook,
  fetchAllBooks,
  fetchBookByISBN,
  fetchBookById,
  addBookAccessionToBook,
  countTotalBooks,
  fetchBookDetailsById,
} = require("../../../models/books/books.controllers");
const {
  addBookAccession,
  fetchBookAccessionByAccessionNumber,
} = require("../../../models/book-accessions/book-accessions.controllers");
const { issueBookRouter } = require("../issue-book/issue-book.router.admin");
const { formatObjectValues } = require("../../../utils/functions");

const booksRouter = express.Router();

booksRouter.post("/add-new-book", async (req, res) => {
  try {
    // const book = await fetchBookByISBN(req.body.ISBN);

    // if (book != null) {
    //   return res.status(400).json({
    //     success: false,
    //     status: "ISBN provided already exists!",
    //     payload: null,
    //   });
    // }

    const formatedData = formatObjectValues(req.body);
    await addNewBook(formatedData);
    return res.status(200).json({
      success: true,
      status: "Book added successfully",
      payload: null,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, status: "Operation Failed", payload: error });
  }
});

booksRouter.post("/fetch-all-books", async (req, res) => {
  try {
    const booksArray = await fetchAllBooks(
      req.body,
      "title author placeAndPublishers publicationYear"
    );

    const books = [];
    booksArray.forEach(({ _doc }) => {
      accessionNumbers = [];
      _doc.accessionNumbers.forEach(({ accessionNumber }) => {
        accessionNumbers.push(accessionNumber);
      });
      books.push({ ..._doc, accessionNumbers });
    });

    return res.status(200).json({
      success: true,
      payload: { totalBooks: await countTotalBooks(), books: books },
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, status: "Operation Failed", payload: null });
  }
});

booksRouter.post("/fetch-book-details", async (req, res) => {
  try {
    const bookDoc = await fetchBookDetailsById(req.body.id);

    if (bookDoc == null) {
      return res
        .status(404)
        .json({ success: false, status: "Book not found", payload: null });
    }

    const { _doc } = bookDoc;

    accessionNumbers = [];
    _doc.accessionNumbers.forEach(({ accessionNumber }) => {
      accessionNumbers.push(accessionNumber);
    });

    return res.status(200).json({
      success: false,
      status: "Success",
      payload: { ..._doc, accessionNumbers },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, status: "Operation Failed", payload: null });
  }
});

booksRouter.post("/fetch-book-by-isbn", async (req, res) => {
  try {
    const bookDoc = await fetchBookByISBN(req.body.isbn);

    if (bookDoc != null) {
      return res.status(200).json({
        success: true,
        payload: bookDoc,
        status: "Operation Successful",
      });
    }
    return res
      .status(404)
      .json({ success: false, status: "Invalid ISBN", payload: null });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, status: "Operation Failed", payload: null });
  }
});

booksRouter.post("/add-book-accession", async (req, res) => {
  try {
    const bookAccession = await fetchBookAccessionByAccessionNumber(
      req.body.accessionNumber
    );
    if (bookAccession != null) {
      return res.status(400).json({
        success: false,
        status: "Accession Number already exists!",
        payload: null,
      });
    }
    await fetchBookByISBN(req.body.isbn).then(
      async (bookDoc) =>
        await addBookAccession({
          accessionNumber: req.body.accessionNumber,
          bookId: bookDoc._id,
          status: "available",
        }).then(
          async (bookAccessionDoc) =>
            await addBookAccessionToBook(bookDoc._id, bookAccessionDoc._id)
        )
    );

    return res.status(200).json({
      success: true,
      status: "Book Accession added successfully",
      payload: null,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, status: "Operation Failed", payload: null });
  }
});

booksRouter.post("/fetch-book-by-accession-number", async (req, res) => {
  try {
    const bookAccessionDoc = await fetchBookAccessionByAccessionNumber(
      req.body.accessionNumber,
      true
    );
    if (bookAccessionDoc != null) {
      const { accessionNumber, status, bookId } = bookAccessionDoc;
      console.log(status);
      return res.status(200).json({
        success: true,
        payload: { ...bookId._doc, accessionNumber, status },
        status: "Operation Successful",
      });
    }
    return res.status(400).json({
      success: false,
      payload: null,
      status: "Book Accession Not Found",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, status: "Operation Failed", payload: null });
  }
});

booksRouter.use("/issue-books", issueBookRouter);

module.exports = { booksRouter };
