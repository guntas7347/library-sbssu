const express = require("express");
const {
  fetchIssuedBookById,
  calculateFine,
} = require("../issue-book/issue-book.middlewares");
const {
  processReturningBook,
  sendReturnedConfirmationEmail,
  fetchReturnedBooks,
  fetchReturnedBookDocById,
} = require("./return-book.middlewares");
const crs = require("../../../utils/custom-response-codes");
const { createExcel, dateTimeString } = require("../../../utils/functions");
const {
  countReturnedBookDocs,
} = require("../../../models/returned-book/returned-books.controllers.models");
const { authorisationLevel } = require("../../auth/auth.middlewares");
const {
  sendTransactionEmail,
  addTransactionMW,
} = require("../transactions/transactions.mw");

const returnBookRouter = express.Router();

returnBookRouter.post(
  "/count-returned-books",
  authorisationLevel(1),
  async (req, res) => {
    try {
      const numberOfReturnedBookDocs = await countReturnedBookDocs(
        req.body.filter
      );
      return res.status(200).json(crs.REB200CRBD(numberOfReturnedBookDocs));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

returnBookRouter.post(
  "/return-issued-book",
  authorisationLevel(1),
  fetchIssuedBookById,
  calculateFine,
  processReturningBook,
  sendReturnedConfirmationEmail,
  sendTransactionEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200RIB());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //return-issued-book

returnBookRouter.post(
  "/fetch-all-returned-books",
  authorisationLevel(2),
  fetchReturnedBooks,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200FARB(req.cust.returnedBooks));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-all-returned-books

returnBookRouter.post(
  "/fetch-returned-book",
  authorisationLevel(2),
  fetchReturnedBookDocById,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200FRB(req.cust.returnedBook));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-returned-book

returnBookRouter.post(
  "/download-all-returned-books",
  authorisationLevel(5),
  fetchReturnedBooks,
  async (req, res) => {
    try {
      const xl = createExcel(req.cust.returnedBooks.returnedBooksArray, [
        ["accessionNumber", "Accession Number"],
        ["bookTitle", "Book Title", 50],
        ["cardNumber", "Card Number"],
        ["issueDate", "Issue Date", 15],
        ["returnDate", "Return Date", 15],
        ["studentName", "Student Name"],
        ["rollNumber", "Roll Number"],
        ["fine", "Fine"],
      ]);

      const excelBuffer = await xl.writeToBuffer();

      const fileName = `Returned_Books_${dateTimeString()}`;

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}.xlsx"`
      );
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

      res.status(200).send(excelBuffer);
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-all-returned-books

module.exports = { returnBookRouter };
