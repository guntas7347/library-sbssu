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
  verifyIssuePermission,
  checkIssueCompatibility,
} = require("./issue-book.middlewares");
const { createExcel, dateTimeString } = require("../../../utils/functions");
const {
  countIssuedBookDocs,
} = require("../../../models/issue-book/issue-book.controllers");
const { authorisationLevel } = require("../../auth/auth.middlewares");
const { validateIssueBookDetails } = require("./issue-book.validator");
const { validateAccessionNumber } = require("../books/books.validator");
const { validateObjectId } = require("../../validator");

const issueBookRouter = express.Router();

issueBookRouter.post("/count-issued-books", async (req, res) => {
  try {
    const numberOfIssuedBookDocs = await countIssuedBookDocs(req.body.filter);
    return res.status(200).json(crs.ISB200CIBD(numberOfIssuedBookDocs));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

issueBookRouter.post(
  "/issue-new-book",
  authorisationLevel(["issue-book"]),
  validateIssueBookDetails,
  verifyIssuePermission,
  verifyBookAccessionAvailability,
  verifyLibraryCardAvailability,
  checkIssueCompatibility,
  processIssuingBook,
  // sendIssuedConfirmationEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200INB());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //issue-new-book

issueBookRouter.post(
  "/fetch-issued-book-by-accession-number",
  authorisationLevel(["return-book"]),
  validateAccessionNumber,
  fetchIssuedBookByAccessionNumber
); //fetch-issued-book-by-accession-number

issueBookRouter.post(
  "/calculate-issue-book-fine",
  authorisationLevel(["return-book"]),
  validateObjectId,
  fetchIssuedBookById,
  calculateFine,
  async (req, res) => {
    try {
      return res.status(200).json(crs.ISB200CIBF(req.cust.fine));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //calculate-issue-book-fine

issueBookRouter.post(
  "/fetch-all-issued-books",
  authorisationLevel(["search-issued-books"]),
  fetchIssuedBooks,
  async (req, res) => {
    try {
      if (req.cust.issuedBooks.issuedBooksArray.length === 0)
        return res.status(200).json(crs.SRH404GLB());

      res.status(200).json(crs.ISB200FAIB(req.cust.issuedBooks));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //fetch-all-issued-books

issueBookRouter.post(
  "/fetch-issued-book",
  authorisationLevel(["view-issued-book"]),
  fetchIssuedBookDocById
); //fetch-issued-book

issueBookRouter.post(
  "/download-all-issued-books",
  authorisationLevel(5),
  fetchIssuedBooks,
  async (req, res) => {
    try {
      const xl = createExcel(req.cust.issuedBooks.issuedBooksArray, [
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
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //download-all-issued-books

module.exports = { issueBookRouter };
