const express = require("express");
const {
  fetchIssueHistory,
} = require("../../../models/returned-book/returned-books.controllers.models");

const issueHistoryRouter = express.Router();

issueHistoryRouter.post("/fetch-issued-history", async (req, res) => {
  try {
    const returnedBooksCol = await fetchIssueHistory(req.user.id, req.body);
    const data = returnedBooksCol.map(
      ({ bookAccountId, libraryCardId, issueDate, returnDate, fine }) => {
        if (!returnDate) {
          returnDate = "Currently Issued";
        } else {
          returnDate = returnDate.toDateString();
        }

        return {
          issueDate: issueDate.toDateString(),
          returnDate,
          fine,
          cardNumber: libraryCardId.cardNumber,
          studentName: libraryCardId.studentId.name,
          rollNumber: libraryCardId.studentId.rollNumber,
          accountNumber: bookAccountId.accountNumber,
          bookTitle: bookAccountId.bookId.title,
        };
      }
    );

    return res
      .status(200)
      .json({ success: true, payload: data, status: "Operation Successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, payload: error, status: "Operation Failed" });
  }
});

module.exports = { issueHistoryRouter };
