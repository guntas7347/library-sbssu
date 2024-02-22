const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const {
  verifyBookAccessionAvailability,
  verifyLibraryCardAvailability,
  processIssuingBook,
  sendIssuedConfirmationEmail,
  fetchIssuedBookById,
  calculateFine,
  fetchIssuedBookByAccessionNumber,
  fetchIssuedBookDocById,
  fetchIssuedBooks,
} = require("./issue-book.middlewares");
const { createExcel, dateTimeString } = require("../../../utils/functions");

const issueBookRouter = express.Router();

issueBookRouter.post(
  "/issue-new-book",
  verifyBookAccessionAvailability,
  verifyLibraryCardAvailability,
  processIssuingBook,
  sendIssuedConfirmationEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200INB());
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //issue-new-book

issueBookRouter.post(
  "/fetch-issued-book-by-accession-number",
  fetchIssuedBookByAccessionNumber,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200FIBBAN(req.cust));
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-issued-book-by-accession-number

issueBookRouter.post(
  "/calculate-issue-book-fine",
  fetchIssuedBookById,
  calculateFine,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200CIBF(req.cust.fine));
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //calculate-issue-book-fine

issueBookRouter.post(
  "/fetch-all-issued-books",
  fetchIssuedBooks,
  async (req, res) => {
    try {
      res.status(200).json(crs.ISB200FAIB(req.cust.issuedBooks));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-all-issued-books

issueBookRouter.post(
  "/fetch-issued-book",
  fetchIssuedBookDocById,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200FIB(req.cust.issuedBook));
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-issued-book

issueBookRouter.post(
  "/download-all-issued-books",
  fetchIssuedBooks,
  async (req, res) => {
    try {
      const xl = createExcel(req.cust.issuedBooks, [
        ["accessionNumber", "Accession Number"],
        ["bookTitle", "Book Title", 50],
        ["cardNumber", "Card Number"],
        ["issueDate", "Issue Date", 15],
        ["studentName", "Student Name"],
        ["rollNumber", "Roll Number"],
      ]);

      const excelBuffer = await xl.writeToBuffer();
      const fileName = `Issued_Books_${dateTimeString()}`;

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
); //download-all-issued-books

module.exports = { issueBookRouter };
