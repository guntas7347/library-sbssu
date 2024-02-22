const {
  getBookAccessionByAccessionNumber,
} = require("../../../models/book-accessions/book-accessions.controllers");
const { getBookByIsbn } = require("../../../models/books/books.controllers");
const crs = require("../../../utils/custom-response-codes");

const fetchBookByIsbn = async (req, res, next) => {
  try {
    if (req.body.isbn === "") return res.status(404).json(crs.MDW404FBBI());
    const bookDoc = await getBookByIsbn(
      req.body.isbn,
      "isbn title author publicationYear cost"
    );
    if (bookDoc === null) return res.status(404).json(crs.MDW404FBBI());
    if (!req.cust) req.cust = {};
    req.cust.bookDoc = bookDoc;
    next();
  } catch (err) {
    return res
      .status(500)
      .json(crs.SERR500REST({ err, path: "middleware_fetchBookByIsbn" }));
  }
};

const fetchBookAccByAccNum = async (req, res, next) => {
  try {
    const bookAccessionDoc = await getBookAccessionByAccessionNumber(
      req.body.accessionNumber,
      true
    );
    if (bookAccessionDoc === null)
      return res.status(404).json(crs.MDW404FBBAN());
    if (!req.cust) req.cust = {};
    req.cust.bookAccessionDoc = bookAccessionDoc;
    next();
  } catch (error) {
    return res.status(500).json(
      crs.SERR500REST({
        err,
        path: "middleware_fetchBookAccessionByAccessionNumber",
      })
    );
  }
};

const verifyAccessionNumberAvailability = async (req, res, next) => {
  try {
    const bookAccessionDoc = await getBookAccessionByAccessionNumber(
      req.body.accessionNumber
    );
    if (bookAccessionDoc != null) return res.status(404).json(crs.BKS409ABA());
    next();
  } catch (err) {
    return res.status(500).json(
      crs.SERR500REST({
        err,
        path: "middleware_fetchBookAccessionByAccessionNumber",
      })
    );
  }
};

module.exports = {
  fetchBookByIsbn,
  fetchBookAccByAccNum,
  verifyAccessionNumberAvailability,
};
