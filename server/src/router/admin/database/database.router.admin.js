const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const { fetchIssuedBookById } = require("../issue-book/issue-book.middlewares");
const {
  findReturnedBookById,
} = require("../../../models/returned-book/returned-books.controllers.models");
const {
  findIssuedBookById,
} = require("../../../models/issue-book/issue-book.controllers");
const {
  findBookAccessionById,
} = require("../../../models/book-accessions/book-accessions.controllers");
const {
  fetchLibraryCardById,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  findBookDetailsById,
} = require("../../../models/books/books.controllers");
const {
  fetchStudentById,
} = require("../../../models/students/students.controllers");
const {
  findApplicationById,
} = require("../../../models/applications/applications.controllers");
const { fetchStaffById } = require("../../../models/staff/staff.controllers");
const {
  findAdminAuthById,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const {
  findAuthStudentById,
} = require("../../../models/auth/student/auth_student.controllers");
const {
  findAuthApplicantById,
} = require("../../../models/auth/applicant/auth_applicant.controllers");

const databaseRouter = express.Router();

databaseRouter.post("/get-issued-book", async (req, res) => {
  try {
    const issuedBook = await findIssuedBookById(req.body._id);
    if (issuedBook === null) return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200ISB(issuedBook));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-returned-book", async (req, res) => {
  try {
    const returnedBookDoc = await findReturnedBookById(req.body._id);
    if (returnedBookDoc === null)
      return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200RSB(returnedBookDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-book-accession", async (req, res) => {
  try {
    const bookAccessionDoc = await findBookAccessionById(req.body._id);
    if (bookAccessionDoc === null)
      return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200BA(bookAccessionDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-library-card", async (req, res) => {
  try {
    const libraryCardDoc = await fetchLibraryCardById(req.body._id);
    if (libraryCardDoc === null)
      return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200LC(libraryCardDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-book", async (req, res) => {
  try {
    const bookDoc = await findBookDetailsById(req.body._id);
    if (bookDoc === null) return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200BKS(bookDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-student", async (req, res) => {
  try {
    const studentDoc = await fetchStudentById(req.body._id);
    if (studentDoc === null) return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200STU(studentDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-application", async (req, res) => {
  try {
    const applicationDoc = await findApplicationById(req.body._id);
    if (applicationDoc === null)
      return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200APP(applicationDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-staff", async (req, res) => {
  try {
    const staffDoc = await fetchStaffById(req.body._id);
    if (staffDoc === null) return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200STF(staffDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-auth-admin", async (req, res) => {
  try {
    const authAdminDoc = await findAdminAuthById(req.body._id);
    if (authAdminDoc === null) return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200AUAD(authAdminDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-auth-student", async (req, res) => {
  try {
    const authStudentDoc = await findAuthStudentById(req.body._id);
    if (authStudentDoc === null)
      return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200AUST(authStudentDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

databaseRouter.post("/get-auth-applicant", async (req, res) => {
  try {
    const authApplicantDoc = await findAuthApplicantById(req.body._id);
    if (authApplicantDoc === null)
      return res.status(404).json(crs.DBSF404GLOBAL());
    return res.status(200).json(crs.DBSF200AUAP(authApplicantDoc));
  } catch (err) {
    if (err.name === "CastError")
      return res.status(500).json(crs.DBSF400GLOBAL(err));
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { databaseRouter };
