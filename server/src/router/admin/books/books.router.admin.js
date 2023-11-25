const express = require("express");
const {
  addNewBook,
  fetchAllBooks,
  fetchBookByISBN,
  fetchBookById,
} = require("../../../models/books/books.modals");
const {
  addBookAccount,
  fetchBookAccountByAccountNumber,
} = require("../../../models/book-accounts/book-accounts.modals");
const { issueBookRouter } = require("../issue-book/issue-book.router.admin");

const booksRouter = express.Router();

booksRouter.post("/add-new-book", async (req, res) => {
  try {
    await addNewBook(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

booksRouter.get("/fetch-all-books", async (req, res) => {
  try {
    const booksArray = await fetchAllBooks();
    return res.status(200).json({ success: true, message: booksArray });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

booksRouter.post("/fetch-book-by-isbn", async (req, res) => {
  try {
    const book = await fetchBookByISBN(req.body.isbn);

    if (book != null) {
      return res.status(200).json({ success: true, message: book });
    }
    return res.status(404).json({ success: false, message: "Invalid ISBN" });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

booksRouter.post("/add-book-account", async (req, res) => {
  try {
    const bookId = (await fetchBookByISBN(req.body.isbn)).id;
    await addBookAccount({ ...req.body, bookId: bookId, status: "available" });
    return res
      .status(200)
      .json({ success: true, message: "Book Account added successfully" });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

booksRouter.post("/fetch-book-by-account-number", async (req, res) => {
  try {
    const { _id, bookId, accountNumber, status } =
      await fetchBookAccountByAccountNumber(req.body.accountNumber);
    const book = await fetchBookById(bookId);

    if (book != null) {
      return res.status(200).json({
        success: true,
        message: { ...book._doc, accountNumber, status, accountId: _id },
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "Invalid Account Number" });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

booksRouter.use("/issue-books", issueBookRouter);

module.exports = { booksRouter };
