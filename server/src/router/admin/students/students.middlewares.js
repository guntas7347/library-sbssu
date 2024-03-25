const { default: mongoose } = require("mongoose");
const {
  getApplicationById,
  deleteApplicationById,
} = require("../../../models/applications/applications.controllers");
const crs = require("../../../utils/custom-response-codes");
const {
  deleteAuthApplicantById,
  getAuthApplicantById,
} = require("../../../models/auth/applicant/auth_applicant.controllers");
const {
  createStudent,
  getStudentByRollNumber,
  addLibraryCardToStudent,
} = require("../../../models/students/students.controllers");
const {
  createAuthStudent,
} = require("../../../models/auth/student/auth_student.controllers");
const {
  getLibraryCardByCardNumber,
  createLibraryCard,
} = require("../../../models/library-cards/library-cards.controllers");

const fetchStudentByRollNumber = async (req, res, next) => {
  try {
    const studentDoc = await getStudentByRollNumber(req.body.rollNumber, true);
    if (studentDoc === null) return res.status(404).json(crs.STU404FSBRN());
    if (!req.cust) req.cust = {};
    req.cust.studentDoc = studentDoc;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST());
  }
};

const verifyRollNumberAvailability = async (req, res, next) => {
  try {
    const studentDoc = await getStudentByRollNumber(req.body.rollNumber);
    if (studentDoc !== null) return res.status(409).json(crs.CONFL409CNS());
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST());
  }
};

const allotLibraryCard = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { _id, libraryCards, category } = req.cust.studentDoc;

    // Check if Student already has maximum Library Cards
    if (libraryCards.length >= 2)
      return res.status(409).json(crs.STU409ALCTS());

    // Check if Library Card Number already exists
    const libraryCard = await getLibraryCardByCardNumber(req.body.cardNumber);
    if (libraryCard != null) return res.status(409).json(crs.STU4091ALCTS());

    await session.withTransaction(async () => {
      const libraryCardDoc = await createLibraryCard(
        {
          cardNumber: req.body.cardNumber,
          studentId: _id,
        },
        session
      );
      await addLibraryCardToStudent(
        libraryCardDoc[0].studentId,
        libraryCardDoc[0]._id,
        session
      );
    });
    await session.commitTransaction();
    return res.status(200).json(crs.STU200ALCTS());
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    await session.endSession();
  }
};

const fetchApplicationById = async (req, res, next) => {
  try {
    const applicantionDoc = await getApplicationById(req.body._id);
    if (applicantionDoc === null) return res.status(404).json(crs.APP404FA());
    if (!req.cust) req.cust = {};
    req.cust.applicantionDoc = applicantionDoc;
    req.cust.applicantionDocId = applicantionDoc._doc._id;

    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST());
  }
};

const processDecision = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { applicantionDoc, applicantionDocId } = req.cust;
    console.log(req.body.decision);
    if (req.body.decision === "REJECT") {
      await session.withTransaction(async () => {
        await deleteApplicationById(applicantionDocId, session);
        await deleteAuthApplicantById(applicantionDocId, session);
      });
      await session.commitTransaction();
      return res.status(200).json(crs.APP200RPA());
    }
    const applicantAuthDoc = await getAuthApplicantById(applicantionDocId);
    delete applicantionDoc._doc._id;
    delete applicantAuthDoc._doc._id;
    await session.withTransaction(async () => {
      const studentDoc = await createStudent(applicantionDoc._doc, session);
      const authStudentDoc = {
        studentId: studentDoc[0].id,
        ...applicantAuthDoc._doc,
      };
      await createAuthStudent(authStudentDoc, session);
      await deleteApplicationById(applicantionDocId, session);
      await deleteAuthApplicantById(applicantionDocId, session);
    });
    await session.commitTransaction();
    return res.status(200).json(crs.APP200APA());
  } catch (err) {
    console.log(err);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    await session.endSession();
  }
};

module.exports = {
  fetchApplicationById,
  processDecision,
  fetchStudentByRollNumber,
  allotLibraryCard,
  verifyRollNumberAvailability,
};
