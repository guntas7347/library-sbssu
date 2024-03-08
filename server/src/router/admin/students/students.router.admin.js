const express = require("express");
const {
  addLibraryCardToStudent,

  getStudentById,
  getStudentByRollNumber,
  createStudent,
  findStudents,
  countStudentDocs,
} = require("../../../models/students/students.controllers");
const {
  createLibraryCard,
} = require("../../../models/library-cards/library-cards.controllers");
const { formatObjectValues } = require("../../../utils/functions");
const {
  getApplicationById,
  findApplications,
} = require("../../../models/applications/applications.controllers");
const {} = require("../../../models/auth/applicant/auth_applicant.controllers");
const {
  createAuthStudent,
} = require("../../../models/auth/student/auth_student.controllers");

const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  fetchApplicationById,
  processDecision,
  fetchStudentByRollNumber,
  allotLibraryCard,
  verifyRollNumberAvailability,
} = require("./students.middlewares");
const {
  verifyEmailAvailabilityByEmail,
} = require("../../auth/applicants/applicants.middlewares.auth");

const studentsRoute = express.Router();

studentsRoute.post(
  "/create-new-student",
  verifyRollNumberAvailability,
  verifyEmailAvailabilityByEmail,
  async (req, res) => {
    const session = await mongoose.startSession();
    try {
      const rollNumber = req.cust;
      if (rollNumber != null) return res.status(409).json(crs.CONFL409CNS());

      const formatedData = formatObjectValues(req.body, [
        "gender",
        "specialization",
        "program",
        "email",
      ]);
      await session.withTransaction(async () => {
        const studentDoc = await createStudent(formatedData, session);
        const { _id, email, rollNumber, fullName } = studentDoc[0];
        const authStudentDoc = {
          studentId: _id,
          email,
          password: rollNumber,
          userName: fullName,
        };
        await createAuthStudent(authStudentDoc, session);
      });
      await session.commitTransaction();
      return res.status(201).json(crs.STU201CNS());
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(422).json(crs.MONGO422CNS());
      }

      if (session.inTransaction()) await session.abortTransaction();
      return res.status(500).json(crs.SERR500REST(err));
    } finally {
      await session.endSession();
    }
  }
);

studentsRoute.post(
  "/fetch-student-by-roll-number",
  fetchStudentByRollNumber,
  async (req, res) => {
    try {
      return res.status(200).json(crs.STU200FSBRN(req.cust.studentDoc));
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-student-by-roll-number

studentsRoute.post(
  "/allot-library-card-to-student",
  fetchStudentByRollNumber,
  allotLibraryCard
);

studentsRoute.post("/fetch-all-applications", async (req, res) => {
  try {
    const ApplicantCol = await findApplications(req.body);
    return res.status(200).json(crs.STU200FAA(ApplicantCol));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

studentsRoute.post("/fetch-all-students", async (req, res) => {
  try {
    const select = "rollNumber fullName batch program";
    const StudentsCol = await findStudents(req.body, select);
    return res.status(200).json(crs.STU200FAS(StudentsCol));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

studentsRoute.post("/fetch-student-by-id", async (req, res) => {
  try {
    const studentDoc = await getStudentById(req.body._id, true);
    if (studentDoc != null)
      return res.status(200).json(crs.STU200FSBI(studentDoc));
    return res.status(404).json(crs.STU404FSBI());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

studentsRoute.post(
  "/fetch-one-application",
  fetchApplicationById,
  async (req, res) => {
    try {
      return res.status(200).json(crs.APP200FA(req.cust.applicantionDoc));
    } catch (err) {
      return res.status(500).json(crs.SERR500REST());
    }
  }
);

studentsRoute.post(
  "/process-application",
  fetchApplicationById,
  processDecision
);

studentsRoute.post("/count-total-students", async (req, res) => {
  try {
    const numberOfStudentDocs = await countStudentDocs(req.body.filter);
    return res.status(200).json(crs.STU200CTS(numberOfStudentDocs));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { studentsRoute };
