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
const { validateObjectId } = require("../../validator");

const returnBookRouter = express.Router();

returnBookRouter.post(
  "/count-returned-books",
  authorisationLevel(),
  async (req, res) => {
    try {
      const numberOfReturnedBookDocs = await countReturnedBookDocs(
        req.body.filter
      );
      return res.status(200).json(crs.REB200CRBD(numberOfReturnedBookDocs));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

returnBookRouter.post(
  "/return-issued-book",
  authorisationLevel(["return-book"]),
  validateObjectId,
  fetchIssuedBookById,
  calculateFine,
  processReturningBook,
  sendReturnedConfirmationEmail,
  sendTransactionEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200RIB());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //return-issued-book

returnBookRouter.post(
  "/fetch-all-returned-books",
  authorisationLevel(["search-returned-books"]),
  fetchReturnedBooks,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200FARB(req.cust.returnedBooks));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //fetch-all-returned-books

returnBookRouter.post(
  "/fetch-returned-book",
  authorisationLevel(["view-returned-book"]),
  fetchReturnedBookDocById,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200FRB(req.cust.returnedBook));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
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
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //fetch-all-returned-books

module.exports = { returnBookRouter };
