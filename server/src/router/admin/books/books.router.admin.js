const express = require("express");
const {
  addNewBook,
  fetchAllBooks,
  fetchBookByISBN,
  fetchBookById,
  addBookAccountToBook,
} = require("../../../models/books/books.controllers");
const {
  addBookAccount,
  fetchBookAccountByAccountNumber,
} = require("../../../models/book-accounts/book-accounts.controllers");
const { issueBookRouter } = require("../issue-book/issue-book.router.admin");
const { formatObjectValues } = require("../../../utils/functions");

const booksRouter = express.Router();

booksRouter.post("/add-new-book", async (req, res) => {
  try {
    const book = await fetchBookByISBN(req.body.ISBN);

    if (book != null) {
      return res.status(400).json({
        success: false,
        status: "ISBN provided already exists!",
        payload: null,
      });
    }

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
    const booksArray = await fetchAllBooks(req.body);
    return res.status(200).json({
      success: true,
      payload: booksArray,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
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

booksRouter.post("/add-book-account", async (req, res) => {
  try {
    const bookAccount = await fetchBookAccountByAccountNumber(
      req.body.accountNumber
    );
    if (bookAccount != null) {
      return res.status(400).json({
        success: false,
        status: "Account Number already exists!",
        payload: null,
      });
    }
    await fetchBookByISBN(req.body.isbn).then(
      async (bookDoc) =>
        await addBookAccount({
          accountNumber: req.body.accountNumber,
          bookId: bookDoc._id,
          status: "available",
        }).then(
          async (bookAccountDoc) =>
            await addBookAccountToBook(bookDoc._id, bookAccountDoc._id)
        )
    );

    return res.status(200).json({
      success: true,
      status: "Book Account added successfully",
      payload: null,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, status: "Operation Failed", payload: null });
  }
});

booksRouter.post("/fetch-book-by-account-number", async (req, res) => {
  try {
    const bookAccountDoc = await fetchBookAccountByAccountNumber(
      req.body.accountNumber,
      true
    );

    if (bookAccountDoc != null) {
      const { accountNumber, status, bookId } = bookAccountDoc;
      return res.status(200).json({
        success: true,
        payload: {
          accountNumber,
          status,
          ...bookId._doc,
        },
        status: "Operation Successful",
      });
    }
    return res.status(400).json({
      success: false,
      payload: null,
      status: "Book Account Not Found",
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
