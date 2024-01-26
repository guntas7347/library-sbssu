const express = require("express");
const {
  createNewStudent,
  fetchAllStudents,
  fetchStudentByRollNumber,
  addLibraryCardToStudent,
  fetchStudentById,
} = require("../../../models/students/students.controllers");
const {
  createLibraryCard,
  fetchLibraryCardsByStudentId,
  fetchLibraryCardByCardNumber,
} = require("../../../models/library-cards/library-cards.controllers");
const { formatObjectValues } = require("../../../utils/functions");
const {
  fetchAllApplications,
  fetchOneApplication,
  updateApplicationStatus,
} = require("../../../models/applications/applications.controllers");
const { updateAuthRole } = require("../../../models/auth/auth.controllers");
const {
  getApplicantAuthIdById,
  deleteApplicantAuth,
} = require("../../../models/auth/applicant/auth_applicant.controllers");
const {
  createStudentAuth,
} = require("../../../models/auth/student/auth_student.controllers");

const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");

const studentsRoute = express.Router();

studentsRoute.post("/create-new-student", async (req, res) => {
  try {
    const rollNumber = await fetchStudentByRollNumber(req.body.rollNumber);

    if (rollNumber != null) {
      return res.status(409).json(crs.CONFL409CNS());
    }

    const formatedData = formatObjectValues(req.body, [
      "gender",
      "specialization",
      "program",
      "email",
    ]);

    await createNewStudent(formatedData);

    return res.status(201).json(crs.STU201CNS());
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json(crs.MONGO422CNS());
    }

    return res.status(500).json(crs.SERR500CNS());
  }
});

studentsRoute.post("/fetch-all-students", async (req, res) => {
  const StudentsCol = await fetchAllStudents(
    req.body,
    "rollNumber name batch program"
  );
  return res.status(200).json({
    success: true,
    payload: StudentsCol,
    status: "Operation Successful",
  });
});

studentsRoute.post("/fetch-student-by-roll-number", async (req, res) => {
  try {
    console.log("hello ");
    const studentDoc = await fetchStudentByRollNumber(
      req.body.rollNumber,
      true
    );

    if (studentDoc != null) {
      return res.status(200).json({
        success: true,
        payload: studentDoc,
        status: "Successful",
      });
    }
    return res
      .status(400)
      .json({ success: false, payload: null, status: "Invalid Roll Number" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, payload: null, status: error });
  }
});

studentsRoute.post("/fetch-student-by-id", async (req, res) => {
  try {
    const studentDoc = await fetchStudentById(req.body._id, true);

    if (studentDoc != null) {
      return res.status(200).json({
        success: true,
        payload: studentDoc,
        status: "Successful",
      });
    }
    return res
      .status(400)
      .json({ success: false, payload: null, status: "Invalid Roll Number" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, payload: null, status: error });
  }
});

studentsRoute.post("/create-library-card", async (req, res) => {
  try {
    const { _id, libraryCards } = await fetchStudentByRollNumber(
      req.body.rollNumber
    );
    if (libraryCards.length >= 2) {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Student alread holds two cards.",
      });
    }

    const libraryCard = await fetchLibraryCardByCardNumber(req.body.cardNumber);
    if (libraryCard != null) {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Card number already exists",
      });
    }

    if (_id != null) {
      await createLibraryCard({
        cardNumber: req.body.cardNumber,
        status: "available",
        studentId: _id,
      }).then(({ studentId, _id }) => {
        addLibraryCardToStudent(studentId, _id);
      });

      return res.status(200).json({
        success: true,
        payoad: null,
        status: "Library Card has been successfully created",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, payload: null, status: "Invalid Roll Number" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, payload: error, status: "Operation Failed" });
  }
});

studentsRoute.post("/fetch-all-applications", async (req, res) => {
  try {
    const ApplicantCol = await fetchAllApplications(req.body);
    return res.status(200).json({
      success: true,
      payload: ApplicantCol,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: null,
      status: "Operation Failed",
    });
  }
});

studentsRoute.post("/fetch-one-application", async (req, res) => {
  try {
    const applicantionDoc = await fetchOneApplication(
      req.body.applicationNumber
    );

    if (applicantionDoc === null) {
      return res.status(400).json({
        payload: null,
        status: "Invalid Application Number",
      });
    }

    return res.status(200).json({
      payload: applicantionDoc,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: null,
      status: "Operation Failed",
    });
  }
});

studentsRoute.post("/process-application", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const applicantionDoc = await fetchOneApplication(
      req.body.applicationNumber
    );
    const applicantId = applicantionDoc._doc._id;

    if (applicantionDoc._doc.status !== "PENDING") {
      return res.status(400).json({
        payload: null,
        status: "Application decision has already been made",
      });
    }

    if (req.body.decision === "REJECT") {
      await updateApplicationStatus(_id, "REJECTED");
      return res.status(200).json({
        payload: null,
        status: "Operation Successful",
      });
    }

    await session.withTransaction(async () => {
      await updateApplicationStatus(applicantId, "APPROVED", session);
      const applicantAuthDoc = await getApplicantAuthIdById(applicantId);
      await createNewStudent(applicantionDoc._doc, session);
      await deleteApplicantAuth(applicantId, session);
      await createStudentAuth(
        { ...applicantAuthDoc._doc, role: "STUDENT" },
        session
      );
    });

    await session.commitTransaction();

    return res.status(200).json({
      payload: null,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);

    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return res.status(500).json({
      payload: null,
      status: "Operation Failed",
    });
  } finally {
    await session.endSession();
  }
});

module.exports = { studentsRoute };
